// runtime/win32/dsound.js
//
// DSOUND.DLL — synthetic IDirectSound / IDirectSoundBuffer / IDirectSound3DListener
// COM objects backed by Web Audio. Just enough for RCT1's sound-effects path
// (DirectSoundCreate → SetCooperativeLevel → CreateSoundBuffer → SetFormat/Lock/
// Unlock/Play). MIDI music is handled separately via winmm; DirectSound here
// drives the sampled SFX (CSS*.dat content) only.
//
// COM dispatch is identical to runtime/win32/ddraw.js: COM object = heap
// pointer to a heap-allocated vtable; the translator emits
//
//     callIndirect(heap, heap.u32(heap.u32(self) + slot), self, ...args)
//
// to invoke each method. We populate vtable slots with synthetic procs
// registered via registerProc().
//
// Buffer model:
//   - Each IDirectSoundBuffer owns a heap-allocated PCM region; the game
//     calls Lock() to get a writable pointer, fills it with samples, then
//     Unlock() + Play(). On Play() we copy the PCM into an AudioBuffer,
//     route through a gain node (SetVolume / SetFrequency / SetPan), and
//     hand to an AudioBufferSourceNode.
//   - Primary buffer is treated as a no-op mixer placeholder; RCT uses it
//     only to set the listener format and to control 3D listener.
//   - Buffer format defaults to mono 8-bit unsigned PCM @ 22050 Hz, the
//     RCT default for CSS samples. SetFormat() overrides if the game
//     specifies otherwise.
//
// Web Audio constraints:
//   - AudioContext is created lazily on first DirectSoundCreate. If the
//     browser blocks playback until a user gesture, the context starts
//     suspended; runtime/input.js calls resumeAudioContext() on the first
//     pointer/key event, unblocking playback.
//   - In Node (vitest), AudioContext is undefined — we still complete the
//     COM dance but Play() is a silent no-op. Tests just check return
//     codes / state.

import { state, registerProc, callIndirect, getAudioCtx } from "./context.js";
import { heapAlloc } from "./kernel32.js";

const DS_OK = 0;
const DSERR_GENERIC = 0x80004005 | 0;
const DSBPLAY_LOOPING = 0x00000001;

// ---- Module state ----
//
// Tracks every secondary buffer we've allocated so PCM data, format, and
// active Web Audio source nodes can be recovered from the COM-object
// address the game holds.

const _buffers = new Map();      // self → { pcmAddr, byteSize, format, ... }
const _listeners = new Map();    // self → { params: Float32Array(40) }
let   _primaryBuffer = 0;        // COM addr of the singleton primary buffer
let   _heap = null;              // captured at DirectSoundCreate time
let   _resumeAttempted = false;  // gate user-gesture resume() to once per page

// Diagnostics — useful for "is the game even trying to play anything?"
// during browser debugging. Tests can read these via the module state.
export const _dsoundStats = {
  playCalls: 0,
  createdSecondary: 0,
  createdPrimary: 0,
  lastFormat: null,
  lastPlayAt: 0,
};

// ---- WAVEFORMATEX helpers ----
//
// WAVEFORMATEX (16 bytes minimum):
//   +0x00 wFormatTag (u16)         — 1 = PCM
//   +0x02 nChannels (u16)
//   +0x04 nSamplesPerSec (u32)
//   +0x08 nAvgBytesPerSec (u32)
//   +0x0C nBlockAlign (u16)
//   +0x0E wBitsPerSample (u16)
//   +0x10 cbSize (u16)
//
// RCT's primary-format struct at 0x005f0380 uses dword stores for u16
// fields (see ported/auto/4072f0.js), so we read u32 then narrow.

function readWaveFormat(heap, addr) {
  if (!addr) return defaultFormat();
  return {
    formatTag:      heap.u16(addr + 0x00) || 1,
    channels:       heap.u16(addr + 0x02) || 1,
    samplesPerSec:  heap.u32(addr + 0x04) || 22050,
    avgBytesPerSec: heap.u32(addr + 0x08) || 22050,
    blockAlign:     heap.u16(addr + 0x0C) || 1,
    bitsPerSample:  heap.u16(addr + 0x0E) || 8,
  };
}

function defaultFormat() {
  return { formatTag: 1, channels: 1, samplesPerSec: 22050,
           avgBytesPerSec: 22050, blockAlign: 1, bitsPerSample: 8 };
}

// ---- IDirectSound vtable methods ----

function IDS_QueryInterface(heap, self, lpRiid, ppvObj) {
  // RCT calls QueryInterface on a secondary buffer to obtain
  // IDirectSound3DListener (see ported/auto/4072f0.js line 77). We just
  // hand back a 3D listener regardless of GUID; the listener vtable
  // matches the slots RCT actually invokes (0x0c GetAllParameters,
  // 0x28 SetAllParameters, 0x44 CommitDeferredSettings).
  if (ppvObj) heap.setU32(ppvObj, allocListener());
  return DS_OK;
}

// DuplicateSoundBuffer(self, lpcDsbOriginal, lplpDsbDuplicate)
// Real DSound shares PCM between original and duplicate; we just alias
// (the duplicate is functionally identical for our purposes since we
// don't model independent play cursors per duplicate).
//
// R+9b: previously this slot was aliased to IDS_QueryInterface, which
// wrote a 3DListener to the duplicate pointer. FUN_004079d3 then
// returned "success" without populating the caller's buffer handle, so
// every IDirectSoundBuffer_Play call through this code path was a
// silent no-op (the handle was 0; FUN_00407c42 early-exits at the
// null-handle check).
function IDS_DuplicateSoundBuffer(heap, self, lpcOrig, lplpDup) {
  if (lplpDup) heap.setU32(lplpDup, lpcOrig);
  return DS_OK;
}
function IDS_AddRef(heap, self)  { return 1; }
function IDS_Release(heap, self) { return 0; }

// CreateSoundBuffer(self, lpcDSBufferDesc, lplpDirectSoundBuffer, pUnkOuter)
// DSBUFFERDESC:
//   +0x00 dwSize, +0x04 dwFlags, +0x08 dwBufferBytes,
//   +0x0c dwReserved, +0x10 lpwfxFormat (pointer to WAVEFORMATEX)
function IDS_CreateSoundBuffer(heap, self, lpDesc, lplpBuf, pUnkOuter) {
  const dwFlags = heap.u32(lpDesc + 0x04);
  const dwBytes = heap.u32(lpDesc + 0x08);
  const lpwfx   = heap.u32(lpDesc + 0x10);
  const isPrimary = (dwFlags & 0x00000001) !== 0;   // DSBCAPS_PRIMARYBUFFER

  const format = readWaveFormat(heap, lpwfx);
  const obj = allocBuffer({ isPrimary, byteSize: dwBytes, format });
  if (lplpBuf) heap.setU32(lplpBuf, obj);
  return DS_OK;
}

// SetCooperativeLevel(self, hwnd, dwLevel) — no-op success.
function IDS_SetCooperativeLevel(heap, self, hwnd, level) { return DS_OK; }

function IDS_GetCaps(heap, self, lpDSCaps) { return DS_OK; }
function IDS_Compact(heap, self) { return DS_OK; }
function IDS_GetSpeakerConfig(heap, self, lpSpkr) {
  if (lpSpkr) heap.setU32(lpSpkr, 0x00010004);   // DSSPEAKER_STEREO
  return DS_OK;
}
function IDS_SetSpeakerConfig(heap, self, cfg) { return DS_OK; }
function IDS_Initialize(heap, self, lpcGuid) { return DS_OK; }

// ---- IDirectSoundBuffer vtable methods ----

function IDSB_QueryInterface(heap, self, lpRiid, ppvObj) {
  if (ppvObj) heap.setU32(ppvObj, allocListener());
  return DS_OK;
}
function IDSB_AddRef(heap, self)  { return 1; }
function IDSB_Release(heap, self) {
  _buffers.delete(self);
  return 0;
}

function IDSB_GetCaps(heap, self, lpDSBCaps) {
  if (lpDSBCaps) {
    heap.setU32(lpDSBCaps + 0x00, 0x18);   // dwSize
    heap.setU32(lpDSBCaps + 0x04, 0);      // dwFlags
    const b = _buffers.get(self);
    heap.setU32(lpDSBCaps + 0x08, b ? b.byteSize : 0);
  }
  return DS_OK;
}

// GetCurrentPosition(self, lpdwCurrentPlayCursor, lpdwCurrentWriteCursor)
function IDSB_GetCurrentPosition(heap, self, lpPlay, lpWrite) {
  if (lpPlay) heap.setU32(lpPlay, 0);
  if (lpWrite) heap.setU32(lpWrite, 0);
  return DS_OK;
}

// GetFormat(self, lpwfxFormat, dwSizeAllocated, lpdwSizeWritten)
function IDSB_GetFormat(heap, self, lpwfx, dwSize, lpdwWritten) {
  const b = _buffers.get(self);
  if (!b) return DSERR_GENERIC;
  if (lpwfx && dwSize >= 0x10) {
    heap.setU16(lpwfx + 0x00, b.format.formatTag);
    heap.setU16(lpwfx + 0x02, b.format.channels);
    heap.setU32(lpwfx + 0x04, b.format.samplesPerSec);
    heap.setU32(lpwfx + 0x08, b.format.avgBytesPerSec);
    heap.setU16(lpwfx + 0x0C, b.format.blockAlign);
    heap.setU16(lpwfx + 0x0E, b.format.bitsPerSample);
  }
  if (lpdwWritten) heap.setU32(lpdwWritten, 0x10);
  return DS_OK;
}

function IDSB_GetVolume(heap, self, lpdwVolume) {
  const b = _buffers.get(self);
  if (lpdwVolume) heap.setI32(lpdwVolume, b ? b.volume : 0);
  return DS_OK;
}
function IDSB_GetPan(heap, self, lpdwPan) {
  const b = _buffers.get(self);
  if (lpdwPan) heap.setI32(lpdwPan, b ? b.pan : 0);
  return DS_OK;
}
function IDSB_GetFrequency(heap, self, lpdwFreq) {
  const b = _buffers.get(self);
  if (lpdwFreq) heap.setU32(lpdwFreq, b ? b.frequency : 0);
  return DS_OK;
}
function IDSB_GetStatus(heap, self, lpdwStatus) {
  const b = _buffers.get(self);
  if (lpdwStatus) heap.setU32(lpdwStatus, b && b.playing ? 0x1 : 0);  // DSBSTATUS_PLAYING
  return DS_OK;
}
function IDSB_Initialize(heap, self, lpDS, lpDesc) { return DS_OK; }

// Lock(self, dwOffset, dwBytes, lplpvAudioPtr1, lpdwAudioBytes1,
//      lplpvAudioPtr2, lpdwAudioBytes2, dwFlags)
function IDSB_Lock(heap, self, dwOffset, dwBytes,
                   ppPtr1, pSize1, ppPtr2, pSize2, dwFlags) {
  const b = _buffers.get(self);
  if (!b) return DSERR_GENERIC;
  if (dwBytes === 0 || dwBytes > b.byteSize) dwBytes = b.byteSize;
  const off = dwOffset | 0;
  const wrap = off + dwBytes > b.byteSize ? off + dwBytes - b.byteSize : 0;
  const first = dwBytes - wrap;
  if (ppPtr1) heap.setU32(ppPtr1, b.pcmAddr + off);
  if (pSize1) heap.setU32(pSize1, first);
  if (ppPtr2) heap.setU32(ppPtr2, wrap ? b.pcmAddr : 0);
  if (pSize2) heap.setU32(pSize2, wrap);
  b.locked = true;
  return DS_OK;
}

// Unlock(self, pvAudioPtr1, dwAudioBytes1, pvAudioPtr2, dwAudioBytes2)
function IDSB_Unlock(heap, self, p1, b1, p2, b2) {
  const b = _buffers.get(self);
  if (b) b.locked = false;
  return DS_OK;
}

// Play(self, dwReserved1, dwPriority, dwFlags)
function IDSB_Play(heap, self, dwReserved, dwPriority, dwFlags) {
  const b = _buffers.get(self);
  if (!b) return DSERR_GENERIC;
  _dsoundStats.playCalls++;
  _dsoundStats.lastPlayAt = Date.now();
  if (b.isPrimary) return DS_OK;   // primary doesn't drive sound, it's a mixer
  const loop = (dwFlags & DSBPLAY_LOOPING) !== 0;
  startPlayback(b, loop);
  return DS_OK;
}

// SetCurrentPosition(self, dwNewPosition)
function IDSB_SetCurrentPosition(heap, self, pos) {
  const b = _buffers.get(self);
  if (b) b.position = pos >>> 0;
  return DS_OK;
}

// SetFormat(self, lpcfxFormat) — primary-buffer only.
function IDSB_SetFormat(heap, self, lpwfx) {
  const b = _buffers.get(self);
  if (b) {
    b.format = readWaveFormat(heap, lpwfx);
    _dsoundStats.lastFormat = b.format;
  }
  return DS_OK;
}

// SetVolume(self, lVolume) — hundredths of dB, range -10000..0.
function IDSB_SetVolume(heap, self, lVolume) {
  const b = _buffers.get(self);
  if (!b) return DS_OK;
  // Two's-complement: lVolume comes in as a uint32 (callIndirect args).
  const signed = (lVolume | 0);
  b.volume = signed;
  if (b.gainNode) b.gainNode.gain.value = dbToLinear(signed);
  return DS_OK;
}

// SetPan(self, lPan) — -10000 (full left) .. 10000 (full right).
function IDSB_SetPan(heap, self, lPan) {
  const b = _buffers.get(self);
  if (!b) return DS_OK;
  const signed = (lPan | 0);
  b.pan = signed;
  if (b.panNode) b.panNode.pan.value = Math.max(-1, Math.min(1, signed / 10000));
  return DS_OK;
}

// SetFrequency(self, dwFrequency) — 0 means "use default for this buffer".
function IDSB_SetFrequency(heap, self, dwFreq) {
  const b = _buffers.get(self);
  if (!b) return DS_OK;
  b.frequency = dwFreq >>> 0;
  if (b.sourceNode) {
    const base = b.format.samplesPerSec || 22050;
    b.sourceNode.playbackRate.value = (b.frequency || base) / base;
  }
  return DS_OK;
}

function IDSB_Stop(heap, self) {
  const b = _buffers.get(self);
  if (b) stopPlayback(b);
  return DS_OK;
}

function IDSB_Restore(heap, self) { return DS_OK; }

// ---- IDirectSound3DListener vtable methods ----
//
// RCT only reads/writes the cached parameter struct then calls
// CommitDeferredSettings. We just track the bytes in the heap struct it
// pointed at, no actual 3D mixing.

function IDS3DL_QueryInterface(heap, self, lpRiid, ppvObj) {
  if (ppvObj) heap.setU32(ppvObj, self);
  return DS_OK;
}
function IDS3DL_AddRef(heap, self)  { return 1; }
function IDS3DL_Release(heap, self) { return 0; }
function IDS3DL_GetAllParameters(heap, self, lpDS3DL) { return DS_OK; }
function IDS3DL_SetAllParameters(heap, self, lpDS3DL, dwApply) { return DS_OK; }
function IDS3DL_CommitDeferredSettings(heap, self) { return DS_OK; }

// ---- vtable construction (shared with ddraw.js layout) ----

function buildVtable(slots) {
  // Allocate a generous 0x100-byte vtable. Unimplemented slots stay zero —
  // callIndirect treats 0 as a no-op return-zero.
  const addr = heapAlloc(0x100);
  for (let i = 0; i < 0x100; i += 4) _heap.setU32(addr + i, 0);
  for (const [offset, jsFn, name] of slots) {
    _heap.setU32(addr + offset, registerProc(name, jsFn));
  }
  return addr;
}

let _vtDS = 0, _vtBuf = 0, _vt3DL = 0;

function ensureVtables() {
  if (_vtDS) return;
  // Slot layout follows the official DSOUND.H IDirectSound vtable order.
  _vtDS = buildVtable([
    [0x00, IDS_QueryInterface,      "IDirectSound_QueryInterface"],
    [0x04, IDS_AddRef,              "IDirectSound_AddRef"],
    [0x08, IDS_Release,             "IDirectSound_Release"],
    [0x0C, IDS_CreateSoundBuffer,   "IDirectSound_CreateSoundBuffer"],
    [0x10, IDS_GetCaps,             "IDirectSound_GetCaps"],
    [0x14, IDS_DuplicateSoundBuffer, "IDirectSound_DuplicateSoundBuffer"],
    [0x18, IDS_SetCooperativeLevel, "IDirectSound_SetCooperativeLevel"],
    [0x1C, IDS_Compact,             "IDirectSound_Compact"],
    [0x20, IDS_GetSpeakerConfig,    "IDirectSound_GetSpeakerConfig"],
    [0x24, IDS_SetSpeakerConfig,    "IDirectSound_SetSpeakerConfig"],
    [0x28, IDS_Initialize,          "IDirectSound_Initialize"],
  ]);
  _vtBuf = buildVtable([
    [0x00, IDSB_QueryInterface,     "IDirectSoundBuffer_QueryInterface"],
    [0x04, IDSB_AddRef,             "IDirectSoundBuffer_AddRef"],
    [0x08, IDSB_Release,            "IDirectSoundBuffer_Release"],
    [0x0C, IDSB_GetCaps,            "IDirectSoundBuffer_GetCaps"],
    [0x10, IDSB_GetCurrentPosition, "IDirectSoundBuffer_GetCurrentPosition"],
    [0x14, IDSB_GetFormat,          "IDirectSoundBuffer_GetFormat"],
    [0x18, IDSB_GetVolume,          "IDirectSoundBuffer_GetVolume"],
    [0x1C, IDSB_GetPan,              "IDirectSoundBuffer_GetPan"],
    [0x20, IDSB_GetFrequency,       "IDirectSoundBuffer_GetFrequency"],
    [0x24, IDSB_GetStatus,          "IDirectSoundBuffer_GetStatus"],
    [0x28, IDSB_Initialize,         "IDirectSoundBuffer_Initialize"],
    [0x2C, IDSB_Lock,               "IDirectSoundBuffer_Lock"],
    [0x30, IDSB_Play,               "IDirectSoundBuffer_Play"],
    [0x34, IDSB_SetCurrentPosition, "IDirectSoundBuffer_SetCurrentPosition"],
    [0x38, IDSB_SetFormat,          "IDirectSoundBuffer_SetFormat"],
    [0x3C, IDSB_SetFrequency,       "IDirectSoundBuffer_SetFrequency"],
    [0x40, IDSB_SetPan,             "IDirectSoundBuffer_SetPan"],
    [0x44, IDSB_SetVolume,          "IDirectSoundBuffer_SetVolume"],
    [0x48, IDSB_Stop,               "IDirectSoundBuffer_Stop"],
    [0x4C, IDSB_Unlock,             "IDirectSoundBuffer_Unlock"],
    [0x50, IDSB_Restore,            "IDirectSoundBuffer_Restore"],
  ]);
  _vt3DL = buildVtable([
    [0x00, IDS3DL_QueryInterface,         "IDirectSound3DListener_QueryInterface"],
    [0x04, IDS3DL_AddRef,                 "IDirectSound3DListener_AddRef"],
    [0x08, IDS3DL_Release,                "IDirectSound3DListener_Release"],
    [0x0C, IDS3DL_GetAllParameters,       "IDirectSound3DListener_GetAllParameters"],
    [0x28, IDS3DL_SetAllParameters,       "IDirectSound3DListener_SetAllParameters"],
    [0x44, IDS3DL_CommitDeferredSettings, "IDirectSound3DListener_CommitDeferredSettings"],
  ]);
}

// ---- COM object allocation ----

function allocComObject(vtable) {
  // 4 bytes vtable pointer + 4 bytes scratch (identity).
  const obj = heapAlloc(8);
  _heap.setU32(obj + 0, vtable);
  _heap.setU32(obj + 4, 0);
  return obj;
}

function allocBuffer({ isPrimary, byteSize, format }) {
  ensureVtables();
  const obj = allocComObject(_vtBuf);
  // Allocate the PCM region itself. Primary buffers have no actual PCM
  // data (RCT only touches them for format/listener), but we give them
  // a placeholder so Lock() can hand back a valid pointer.
  const size = Math.max(byteSize | 0, 16);
  const pcmAddr = heapAlloc(size);
  for (let i = 0; i < size; i += 4) _heap.setU32(pcmAddr + i, 0);
  _buffers.set(obj, {
    isPrimary, byteSize: size, pcmAddr,
    format: format || defaultFormat(),
    frequency: 0, volume: 0, pan: 0, position: 0,
    locked: false, playing: false,
    sourceNode: null, gainNode: null, panNode: null,
  });
  if (isPrimary) { _primaryBuffer = obj; _dsoundStats.createdPrimary++; }
  else _dsoundStats.createdSecondary++;
  return obj;
}

function allocListener() {
  ensureVtables();
  const obj = allocComObject(_vt3DL);
  _listeners.set(obj, { params: new Float32Array(40) });
  return obj;
}

// ---- Web Audio playback ----

function dbToLinear(hundredthsOfDb) {
  // DirectSound: 0 = 100%, -10000 = silent. Convert to linear gain.
  if (hundredthsOfDb <= -10000) return 0;
  return Math.pow(10, hundredthsOfDb / 2000);
}

function startPlayback(b, loop) {
  const ac = getAudioCtx();
  if (!ac || typeof AudioBuffer === "undefined") return;     // Node — silent
  // Build a Float32 sample array from the locked PCM bytes. We snapshot at
  // Play() time (DirectSound semantics: buffer can be re-locked while
  // playing; we don't model that, just keep the simple snapshot).
  const samples = pcmToFloat32(b);
  if (samples.length === 0) return;
  // Tear down any previous active source for this buffer (Play after Play
  // restarts on the real API).
  stopPlayback(b);
  const ab = ac.createBuffer(b.format.channels, samples.length / b.format.channels,
                             b.format.samplesPerSec);
  if (b.format.channels === 1) {
    ab.getChannelData(0).set(samples);
  } else {
    // Interleaved → deinterleave.
    for (let ch = 0; ch < b.format.channels; ch++) {
      const out = ab.getChannelData(ch);
      for (let i = 0; i < out.length; i++) out[i] = samples[i * b.format.channels + ch];
    }
  }
  const src = ac.createBufferSource();
  src.buffer = ab;
  src.loop = !!loop;
  if (b.frequency) {
    src.playbackRate.value = b.frequency / b.format.samplesPerSec;
  }
  const gain = ac.createGain();
  gain.gain.value = dbToLinear(b.volume);
  let panNode = null;
  if (typeof ac.createStereoPanner === "function") {
    panNode = ac.createStereoPanner();
    panNode.pan.value = Math.max(-1, Math.min(1, b.pan / 10000));
    src.connect(panNode).connect(gain).connect(ac.destination);
  } else {
    src.connect(gain).connect(ac.destination);
  }
  b.sourceNode = src;
  b.gainNode = gain;
  b.panNode = panNode;
  b.playing = true;
  src.onended = () => {
    if (b.sourceNode === src) {
      b.sourceNode = null;
      b.gainNode = null;
      b.panNode = null;
      b.playing = false;
    }
  };
  try { src.start(0); } catch (_) { /* already-stopped contexts can throw */ }
}

function stopPlayback(b) {
  if (b.sourceNode) {
    try { b.sourceNode.stop(); } catch (_) {}
    b.sourceNode = null;
  }
  b.gainNode = null;
  b.panNode = null;
  b.playing = false;
}

function pcmToFloat32(b) {
  const { pcmAddr, byteSize, format } = b;
  const bytes = _heap.bytes;
  if (format.bitsPerSample === 8) {
    // Unsigned 8-bit PCM: 0..255, centred at 128.
    const out = new Float32Array(byteSize);
    for (let i = 0; i < byteSize; i++) out[i] = (bytes[pcmAddr + i] - 128) / 128;
    return out;
  }
  if (format.bitsPerSample === 16) {
    const n = byteSize >> 1;
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const lo = bytes[pcmAddr + i * 2];
      const hi = bytes[pcmAddr + i * 2 + 1];
      let s = (hi << 8) | lo;
      if (s & 0x8000) s -= 0x10000;
      out[i] = s / 32768;
    }
    return out;
  }
  return new Float32Array(0);
}

// ---- Module exports ----

const DSERR_NODRIVER = 0x88780078 | 0;

// DirectSoundCreate(lpcGuidDevice, ppDS, pUnkOuter)
// Returns DS_OK and writes the IDirectSound object pointer to *ppDS.
// In Node (no AudioContext), we still succeed at the COM level so the
// game's init path proceeds — tests can validate the COM dance without
// needing a Web Audio engine.
export function DirectSoundCreate(heap, lpcGuid, ppDS, pUnkOuter) {
  _heap = heap;
  ensureVtables();
  // Eagerly create the AudioContext in browsers so it's ready by the time
  // a user gesture lands (input handler calls resumeAudioContext()).
  if (typeof AudioContext !== "undefined") getAudioCtx();
  const obj = allocComObject(_vtDS);
  if (ppDS) heap.setU32(ppDS, obj);
  return DS_OK;
}

// DirectSoundEnumerateA(lpDSEnumCallback, lpContext)
// Invoke the callback once with our synthetic device. Callback signature:
//   BOOL CALLBACK Cb(LPGUID lpGuid, LPCSTR lpcstrDescription,
//                    LPCSTR lpcstrModule, LPVOID lpContext);
// Return zero from the callback to stop enumeration.
export function DirectSoundEnumerateA(heap, lpCb, lpContext) {
  if (lpCb) callIndirect(heap, lpCb, 0, 0, 0, lpContext);
  return DS_OK;
}

// DirectSoundCaptureCreate — capture (mic input) — RCT never records, so
// failure is fine and avoids spurious COM-objs hanging around.
export function DirectSoundCaptureCreate(heap, lpcGuid, ppDSC, pUnkOuter) {
  if (ppDSC) heap.setU32(ppDSC, 0);
  return DSERR_NODRIVER;
}

// resumeAudioContext — called by runtime/input.js (or the page) on the
// first user gesture to unblock playback per the browser's autoplay policy.
// Returns a Promise that resolves when the context is running.
export function resumeAudioContext() {
  if (_resumeAttempted) return Promise.resolve();
  _resumeAttempted = true;
  const ac = getAudioCtx();
  if (!ac || typeof ac.resume !== "function") return Promise.resolve();
  if (ac.state === "running") return Promise.resolve();
  return ac.resume().catch(() => {});
}

// Diagnostic accessor — tools/probe-sound-state.js inspects the live
// buffer map without poking at module internals.
export function _getDsoundBuffers() { return _buffers; }

// Test-only: reset internal state between cases.
export function _resetDsound() {
  _buffers.clear();
  _listeners.clear();
  _primaryBuffer = 0;
  _resumeAttempted = false;
  _heap = null;
  _vtDS = _vtBuf = _vt3DL = 0;
  _dsoundStats.playCalls = 0;
  _dsoundStats.createdSecondary = 0;
  _dsoundStats.createdPrimary = 0;
  _dsoundStats.lastFormat = null;
  _dsoundStats.lastPlayAt = 0;
}

// Pre-register the DLL-export entries so GetProcAddress can find them.
registerProc("DirectSoundCreate",        DirectSoundCreate);
registerProc("DirectSoundEnumerateA",    DirectSoundEnumerateA);
registerProc("DirectSoundCaptureCreate", DirectSoundCaptureCreate);

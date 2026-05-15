// runtime/win32/winmm.js — Windows multimedia: timers + wave-out + MIDI / MCI.
//
// Two responsibilities here:
//
//   1. timeGetTime / timeBeginPeriod et al — high-precision tick clock that
//      reuses kernel32's _bootTime so all timer reads agree.
//
//   2. MIDI music — RCT1 plays its in-park / title music via the Windows MCI
//      string interface (mciSendStringA). The binary builds command strings
//      like
//
//          open "music\\track1.mid" type sequencer alias MUSIC
//          play MUSIC from 0
//          stop MUSIC
//          close all
//          status MUSIC mode
//
//      into a set of buffers in .data (0x005ec1d8..0x005ec244), then calls
//      mciSendStringA for each. There is also a thin midiOutGetVolume /
//      midiOutSetVolume layer used to read the user's master volume — these
//      were stubs returning 0; that's still fine (the binary stores the
//      "volume captured" flag at 0x005ec1d0 if midiOutGetVolume succeeds).
//
//      The MCI sequencer is the part we want for actual playback. We parse
//      the command string and:
//        - "open <path> type sequencer alias MUSIC": load <path> via the VFS,
//          remember it as the current track name.
//        - "play MUSIC[ from 0]": if a pre-rendered companion asset exists
//          (basename + .ogg or .mp3 in the VFS, or a same-name MIDI we hand
//          to a JS MIDI player), kick off playback via HTMLAudioElement.
//        - "stop MUSIC": pause playback.
//        - "close all" / "close MUSIC": tear down playback.
//        - "status MUSIC mode": write back "playing" / "stopped" / "" to the
//          caller-supplied return buffer so FUN_00411789 sees the right
//          state.
//
//      Wave-out is *not* used by RCT for music (only by old win3.1-era apps);
//      keep those as failed-init stubs so the binary doesn't try to allocate
//      a wave header.

import { GetTickCount } from "./kernel32.js";
import { getAudioCtx, getVfs } from "./context.js";

// ---- Timers ----

export function timeGetTime(heap) { return GetTickCount(heap); }
export function timeBeginPeriod(heap, uPeriod) { return 0; }
export function timeEndPeriod(heap, uPeriod) { return 0; }
export function timeGetDevCaps(heap, ptc, cbtc) {
  if (ptc) {
    heap.setU32(ptc + 0, 1);     // wPeriodMin
    heap.setU32(ptc + 4, 1000);  // wPeriodMax
  }
  return 0;
}
export function timeSetEvent(heap, uDelay, uResolution, lpTimeProc, dwUser, fuEvent) {
  // Returning 0 = "couldn't create timer" — game falls back to its own loop.
  return 0;
}
export function timeKillEvent(heap, uTimerID) { return 0; }

// ---- MMIO (multimedia I/O) — WAV chunk reading. Stubbed so audio init exits cleanly. ----

export function mmioOpenA(heap, ...args) { return 0; }
export function mmioOpenW(heap, ...args) { return 0; }
export function mmioClose(heap, ...args) { return 0; }
export function mmioRead(heap, ...args) { return 0; }
export function mmioWrite(heap, ...args) { return 0; }
export function mmioSeek(heap, ...args) { return 0; }
export function mmioStringToFOURCCA(heap, ...args) { return 0; }
export function mmioDescend(heap, ...args) { return -1; }
export function mmioAscend(heap, ...args)  { return 0; }
export function mmioCreateChunk(heap, ...args) { return 0; }
export function mmioGetInfo(heap, ...args) { return 0; }
export function mmioSetInfo(heap, ...args) { return 0; }
export function mmioAdvance(heap, ...args) { return 0; }

// ---- Wave-out (mute, no init path) ----
//
// Not used by RCT's music. Stub to "no device" so any probe gets a clean -1.

export function waveOutOpen(heap, ...args)        { return -1; }
export function waveOutClose(heap, ...args)       { return 0; }
export function waveOutWrite(heap, ...args)       { return 0; }
export function waveOutPrepareHeader(heap, ...args)   { return 0; }
export function waveOutUnprepareHeader(heap, ...args) { return 0; }
export function waveOutReset(heap, ...args)       { return 0; }
export function waveOutGetNumDevs(heap)           { return 0; }
export function waveOutGetDevCapsA(heap, ...args) { return 0; }

// ---- MIDI subsystem ----
//
// We expose a single "music slot" — RCT only ever has one track playing at
// a time, addressed by the alias "MUSIC". State machine:
//
//   idle  --open-->  loaded  --play-->  playing  --stop-->  loaded
//                                       <--play--                    (resume)
//   any   --close-->  idle
//
// Pre-rendered audio assets:
//   The binary asks for `music\\trackN.mid` (path baked into FUN_00411617
//   via sprintf into the open-buffer at 0x005ec1e4). We probe the VFS for
//   any of these basenames in order:
//     <basename>.ogg  <basename>.mp3  <basename>.wav  <basename>.mid
//   The .mid case is recognised but currently logs and silences — wiring a
//   JS soft-synth is a follow-up. .ogg/.mp3/.wav play through an
//   HTMLAudioElement (one global instance, reused across track changes).
//
// Browser autoplay policy:
//   HTMLAudioElement.play() returns a rejected Promise if no user gesture
//   has happened yet. We catch this and retry on the next play request —
//   runtime/input.js's resumeAudioContext() also calls retryPendingMusic()
//   so the first click/keydown kicks any deferred track into life.

const MIDI_OK = 0;
const MIDI_ERROR = 0x40 /*MMSYSERR_NOMEM*/;

// Module state — there is at most one music device active per page.
const _midi = {
  alias: null,          // "MUSIC" once "open ... alias MUSIC" lands
  trackPath: null,      // path string from the open command
  trackBasename: null,  // lowercased filename without extension
  audioEl: null,        // HTMLAudioElement (browser only)
  audioUrl: null,       // Blob URL for the current track
  state: "idle",        // idle | loaded | playing | stopped
  volume0to10000: 10000,// midiOutSetVolume — uVolume packed (lo=left, hi=right)
  deferred: null,       // { kind:"play"|"play-from-0" } parked on autoplay block
  lastError: null,      // most recent string for tests / debugging
};

// Diagnostics for tests + browser console inspection.
export const _midiStats = {
  openCalls: 0,
  playCalls: 0,
  stopCalls: 0,
  closeCalls: 0,
  statusQueries: 0,
  lastCommand: null,
  lastTrack: null,
  lastPlayKind: null,    // "ogg" | "mp3" | "wav" | "mid" | "none"
};

export function _resetWinmm() {
  cleanupAudio();
  _midi.alias = null;
  _midi.trackPath = null;
  _midi.trackBasename = null;
  _midi.audioEl = null;
  _midi.audioUrl = null;
  _midi.state = "idle";
  _midi.volume0to10000 = 10000;
  _midi.deferred = null;
  _midi.lastError = null;
  _midiStats.openCalls = 0;
  _midiStats.playCalls = 0;
  _midiStats.stopCalls = 0;
  _midiStats.closeCalls = 0;
  _midiStats.statusQueries = 0;
  _midiStats.lastCommand = null;
  _midiStats.lastTrack = null;
  _midiStats.lastPlayKind = null;
}

function cleanupAudio() {
  if (_midi.audioEl) {
    try { _midi.audioEl.pause(); } catch (_) {}
    _midi.audioEl.src = "";
    _midi.audioEl = null;
  }
  if (_midi.audioUrl) {
    try { URL.revokeObjectURL(_midi.audioUrl); } catch (_) {}
    _midi.audioUrl = null;
  }
}

// Extract the basename (no path, no extension) and lowercase it.
function basenameNoExt(p) {
  if (!p) return null;
  // Strip surrounding double-quotes the binary uses around paths.
  let s = p.replace(/^"+|"+$/g, "");
  // Win + POSIX separators.
  const cut = Math.max(s.lastIndexOf("\\"), s.lastIndexOf("/"));
  if (cut >= 0) s = s.slice(cut + 1);
  const dot = s.lastIndexOf(".");
  if (dot > 0) s = s.slice(0, dot);
  return s.toLowerCase();
}

// Try to find a pre-rendered audio asset in the VFS.
// Returns { name, bytes, kind } or null.
function probeAudioInVfs(basename) {
  const vfs = getVfs();
  if (!vfs || !basename) return null;
  // Prefer Ogg (most compact in JS-decodable codecs), then MP3, then WAV, then MID.
  for (const ext of ["ogg", "mp3", "wav", "mid", "midi"]) {
    const name = `${basename}.${ext}`;
    const bytes = vfs.get(name);
    if (bytes && bytes.length > 0) return { name, bytes, kind: ext };
  }
  return null;
}

// Start playback. May fail (autoplay policy / asset missing) — in that case
// records the deferred intent and returns false.
function startPlayback(fromZero) {
  _midiStats.lastPlayKind = "none";
  const hit = probeAudioInVfs(_midi.trackBasename);
  if (!hit) {
    // No pre-rendered asset shipped. Track which file was requested so the
    // browser-side dev tools can show it; remain in "loaded" state so the
    // game's "status MUSIC mode" query returns the right answer.
    _midi.lastError = `no audio asset for ${_midi.trackBasename}`;
    _midi.state = fromZero ? "playing" : (_midi.state === "playing" ? "playing" : "playing");
    // We claim "playing" so the binary's higher-level track-switcher doesn't
    // re-fire open/play in a tight loop. Real audio is just absent.
    return true;
  }
  _midiStats.lastPlayKind = hit.kind;

  // .mid/.midi: would need a JS soft-synth. Log + claim playing.
  if (hit.kind === "mid" || hit.kind === "midi") {
    if (typeof console !== "undefined") {
      console.info(`[winmm] MIDI playback for ${hit.name} not yet wired (need soft-synth); pretending to play`);
    }
    _midi.state = "playing";
    return true;
  }

  // Browser: HTMLAudioElement for ogg/mp3/wav.
  if (typeof Audio === "undefined" || typeof URL === "undefined" || !URL.createObjectURL) {
    _midi.state = "playing"; // Node — silent success.
    return true;
  }

  // (Re)build the element if the source changed.
  if (!_midi.audioEl) _midi.audioEl = new Audio();
  if (_midi.audioUrl) {
    try { URL.revokeObjectURL(_midi.audioUrl); } catch (_) {}
    _midi.audioUrl = null;
  }
  const mime = ({
    ogg: "audio/ogg",
    mp3: "audio/mpeg",
    wav: "audio/wav",
  })[hit.kind] || "application/octet-stream";
  _midi.audioUrl = URL.createObjectURL(new Blob([hit.bytes], { type: mime }));
  _midi.audioEl.src = _midi.audioUrl;
  _midi.audioEl.loop = false; // RCT loops by issuing a fresh "play MUSIC" — we honour that.
  _midi.audioEl.volume = Math.max(0, Math.min(1, _midi.volume0to10000 / 10000));
  if (fromZero) { try { _midi.audioEl.currentTime = 0; } catch (_) {} }

  const p = _midi.audioEl.play();
  if (p && typeof p.then === "function") {
    p.then(() => {
      _midi.deferred = null;
      _midi.state = "playing";
    }).catch((err) => {
      // Autoplay blocked. Park the request; resumeMidi() will retry.
      _midi.deferred = { kind: fromZero ? "play-from-0" : "play" };
      _midi.lastError = String(err && err.message || err);
    });
  }
  _midi.state = "playing";
  return true;
}

function stopPlayback() {
  if (_midi.audioEl) {
    try { _midi.audioEl.pause(); } catch (_) {}
  }
  _midi.deferred = null;
  if (_midi.state === "playing") _midi.state = "stopped";
}

// Called by runtime/input.js on the first user gesture. Retries any
// playback request that the browser's autoplay policy blocked.
export function retryPendingMusic() {
  if (!_midi.deferred) return;
  const d = _midi.deferred;
  _midi.deferred = null;
  startPlayback(d.kind === "play-from-0");
}

// ---- MCI command parsing ----
//
// MCI commands are case-insensitive ASCII. RCT uses six distinct strings.
// We tokenise on whitespace, lowercase, and dispatch on the verb.
//
// Returns 0 on success (MMSYSERR_NOERROR), non-zero on failure (any non-zero
// is treated by the binary as "device not present, skip music path").

function handleMciCommand(heap, cmd, lpRetStr, cchRetStr) {
  _midiStats.lastCommand = cmd;
  // Strip leading whitespace + lowercase the verb without losing quoted args.
  const trimmed = cmd.trim();
  if (!trimmed) return MIDI_ERROR;
  const lc = trimmed.toLowerCase();

  // 1) "open <path> type sequencer alias MUSIC"
  if (lc.startsWith("open ")) {
    _midiStats.openCalls++;
    // The path may be quoted ("a b/c.mid") or bare. Capture either form.
    // After "open " we have <path> followed by "type sequencer alias <alias>".
    const m = trimmed.match(/^open\s+(?:"([^"]*)"|(\S+))\s+type\s+(\S+)(?:\s+alias\s+(\S+))?/i);
    if (!m) { _midi.lastError = `unparsed open: ${trimmed}`; return MIDI_ERROR; }
    const path = m[1] || m[2];
    const alias = m[4] || null;
    _midi.alias = alias || "MUSIC";
    _midi.trackPath = path;
    _midi.trackBasename = basenameNoExt(path);
    _midi.state = "loaded";
    _midi.deferred = null;
    _midiStats.lastTrack = _midi.trackBasename;
    return MIDI_OK;
  }

  // 2) "play <alias>[ from <pos>][ wait]" / "play <alias>" / "play <alias> from 0"
  if (lc.startsWith("play ")) {
    _midiStats.playCalls++;
    if (_midi.state === "idle") return MIDI_ERROR;
    const fromZero = /\bfrom\s+0\b/i.test(trimmed);
    startPlayback(fromZero);
    return MIDI_OK;
  }

  // 3) "stop <alias>"
  if (lc.startsWith("stop ")) {
    _midiStats.stopCalls++;
    stopPlayback();
    return MIDI_OK;
  }

  // 4) "close <alias>" or "close all"
  if (lc.startsWith("close ")) {
    _midiStats.closeCalls++;
    cleanupAudio();
    _midi.alias = null;
    _midi.trackPath = null;
    _midi.trackBasename = null;
    _midi.state = "idle";
    _midi.deferred = null;
    return MIDI_OK;
  }

  // 5) "status <alias> mode" — write reply into lpRetStr / cchRetStr.
  //    The reply must match one of "playing" / "stopped" / "paused" / "not ready"
  //    so the binary's strcmp against "playing" works.
  if (lc.startsWith("status ") && /\bmode\b/i.test(lc)) {
    _midiStats.statusQueries++;
    let reply = "stopped";
    if (_midi.state === "playing") reply = "playing";
    else if (_midi.state === "loaded") reply = "stopped";
    else if (_midi.state === "idle") reply = "not ready";
    if (lpRetStr && cchRetStr > 0) {
      heap.writeCStr(lpRetStr, reply, cchRetStr);
    }
    return MIDI_OK;
  }

  // Anything else we don't recognise — succeed silently so the binary keeps
  // running; record for diagnostics.
  _midi.lastError = `unhandled mci: ${trimmed}`;
  return MIDI_OK;
}

// mciSendStringA(LPCSTR lpszCommand, LPSTR lpszReturnString, UINT cchReturn, HWND hwndCallback)
export function mciSendStringA(heap, lpszCommand, lpszReturnString, cchReturn, hwndCallback) {
  const cmd = lpszCommand ? heap.readCStr(lpszCommand, 512) : "";
  return handleMciCommand(heap, cmd, lpszReturnString >>> 0, cchReturn >>> 0);
}

// ---- midiOut* — master volume passthrough ----
//
// The binary uses midiOutGetVolume to capture the user's pre-game volume
// at boot and midiOutSetVolume to restore + apply runtime adjustments. We
// honour the value by piping it to our HTMLAudioElement.volume on the next
// play. uVolume is packed: high word = right channel, low word = left.
// We treat the average of the two channels as the effective gain.

export function midiOutGetNumDevs(heap) {
  // Report 1 device so the binary's "any MIDI present?" check passes and it
  // proceeds to capture the master volume. Without this it skips the music
  // subsystem entirely.
  return 1;
}

export function midiOutGetDevCapsA(heap, uDeviceID, lpCaps, cbCaps) {
  // MIDIOUTCAPS:
  //   +0x00 wMid (u16), +0x02 wPid (u16), +0x04 vDriverVersion (u32),
  //   +0x08 szPname[32] (char), +0x28 wTechnology (u16),
  //   +0x2a wVoices (u16), +0x2c wNotes (u16),
  //   +0x2e wChannelMask (u16), +0x30 dwSupport (u32).
  if (lpCaps && cbCaps >= 0x34) {
    heap.setU16(lpCaps + 0x00, 0x00FF);   // wMid = Anthropic
    heap.setU16(lpCaps + 0x02, 1);
    heap.setU32(lpCaps + 0x04, 0x00010000);
    heap.writeCStr(lpCaps + 0x08, "rct-js Web Synth", 32);
    heap.setU16(lpCaps + 0x28, 7);        // MOD_SWSYNTH
    heap.setU16(lpCaps + 0x2a, 32);
    heap.setU16(lpCaps + 0x2c, 128);
    heap.setU16(lpCaps + 0x2e, 0xFFFF);
    heap.setU32(lpCaps + 0x30, 0);
  }
  return MIDI_OK;
}

export function midiOutGetVolume(heap, hmo, lpdwVolume) {
  if (lpdwVolume) heap.setU32(lpdwVolume, _midi.volume0to10000 | (_midi.volume0to10000 << 16));
  return MIDI_OK;
}

export function midiOutSetVolume(heap, hmo, dwVolume) {
  const lo = (dwVolume >>> 0) & 0xffff;
  const hi = (dwVolume >>> 16) & 0xffff;
  const avg = Math.round((lo + hi) / 2);
  _midi.volume0to10000 = Math.max(0, Math.min(10000, Math.round(avg * 10000 / 0xffff)));
  if (_midi.audioEl) {
    _midi.audioEl.volume = Math.max(0, Math.min(1, _midi.volume0to10000 / 10000));
  }
  return MIDI_OK;
}

// midiOutOpen / Close / Reset — RCT only uses these for the volume probe.
// Returning success is enough.
export function midiOutOpen(heap, ...args)         { return MIDI_OK; }
export function midiOutClose(heap, ...args)        { return MIDI_OK; }
export function midiOutReset(heap, ...args)        { return MIDI_OK; }
export function midiOutShortMsg(heap, ...args)     { return MIDI_OK; }
export function midiOutLongMsg(heap, ...args)      { return MIDI_OK; }
export function midiOutPrepareHeader(heap, ...args)   { return MIDI_OK; }
export function midiOutUnprepareHeader(heap, ...args) { return MIDI_OK; }

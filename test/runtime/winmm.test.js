// Validation suite for the winmm MIDI / MCI shim (runtime/win32/winmm.js).
//
// Exercises the MCI string-command flow RCT actually uses:
//
//   1. mciSendStringA("open <path> type sequencer alias MUSIC") → 0
//   2. mciSendStringA("play MUSIC from 0")                       → 0
//   3. mciSendStringA("status MUSIC mode", buf, 0x100)           → 0, buf="playing"
//   4. mciSendStringA("stop MUSIC")                              → 0
//   5. mciSendStringA("close all")                               → 0
//
// Also covers midiOut* (volume capture / set passthrough) and VFS-asset
// probing — if an .ogg/.mp3/.wav companion exists under the basename of the
// open-command's path, the shim picks it up; otherwise it claims success
// silently so the binary's music state machine stays consistent.

import { describe, it, expect, beforeEach } from "vitest";
import { Heap } from "../../runtime/heap.js";
import { initHeap } from "../../runtime/win32/kernel32.js";
import {
  mciSendStringA,
  midiOutGetNumDevs, midiOutGetDevCapsA,
  midiOutGetVolume, midiOutSetVolume,
  _resetWinmm, _midiStats,
  retryPendingMusic,
} from "../../runtime/win32/winmm.js";
import { resetState, setRuntimeContext } from "../../runtime/win32/context.js";

const MEM_SIZE = 16 * 1024 * 1024;

let heap;

beforeEach(() => {
  resetState();
  _resetWinmm();
  const memory = new Uint8Array(MEM_SIZE);
  heap = new Heap(memory, MEM_SIZE);
  initHeap(MEM_SIZE * 0.4, MEM_SIZE * 0.7);
  heap.sp = MEM_SIZE;
  setRuntimeContext({ vfs: new Map() });
});

// Helper — write a C string into heap and return the pointer.
function pushCStr(str) {
  const addr = heap.allocFrame(str.length + 1);
  for (let i = 0; i < str.length; i++) heap.setU8(addr + i, str.charCodeAt(i) & 0xff);
  heap.setU8(addr + str.length, 0);
  return addr;
}

describe("winmm — mciSendStringA: MUSIC open/play/status/stop/close", () => {
  it("open + play moves state to 'playing'; status writes 'playing' back", () => {
    expect(mciSendStringA(heap, pushCStr('open "music\\track1.mid" type sequencer alias MUSIC'), 0, 0, 0)).toBe(0);
    expect(_midiStats.openCalls).toBe(1);
    expect(_midiStats.lastTrack).toBe("track1");

    expect(mciSendStringA(heap, pushCStr("play MUSIC from 0"), 0, 0, 0)).toBe(0);
    expect(_midiStats.playCalls).toBe(1);

    const retBuf = heap.allocFrame(0x100);
    expect(mciSendStringA(heap, pushCStr("status MUSIC mode"), retBuf, 0x100, 0)).toBe(0);
    expect(heap.readCStr(retBuf)).toBe("playing");
  });

  it("status before open returns 'not ready'", () => {
    const retBuf = heap.allocFrame(0x100);
    expect(mciSendStringA(heap, pushCStr("status MUSIC mode"), retBuf, 0x100, 0)).toBe(0);
    expect(heap.readCStr(retBuf)).toBe("not ready");
  });

  it("stop transitions playing → stopped", () => {
    mciSendStringA(heap, pushCStr('open music\\title.mid type sequencer alias MUSIC'), 0, 0, 0);
    mciSendStringA(heap, pushCStr("play MUSIC"), 0, 0, 0);
    expect(mciSendStringA(heap, pushCStr("stop MUSIC"), 0, 0, 0)).toBe(0);
    const retBuf = heap.allocFrame(0x100);
    mciSendStringA(heap, pushCStr("status MUSIC mode"), retBuf, 0x100, 0);
    expect(heap.readCStr(retBuf)).toBe("stopped");
  });

  it("close all resets to idle", () => {
    mciSendStringA(heap, pushCStr('open music\\title.mid type sequencer alias MUSIC'), 0, 0, 0);
    mciSendStringA(heap, pushCStr("play MUSIC"), 0, 0, 0);
    expect(mciSendStringA(heap, pushCStr("close all"), 0, 0, 0)).toBe(0);
    const retBuf = heap.allocFrame(0x100);
    mciSendStringA(heap, pushCStr("status MUSIC mode"), retBuf, 0x100, 0);
    expect(heap.readCStr(retBuf)).toBe("not ready");
  });

  it("VFS asset lookup picks up an .ogg companion to the requested .mid", () => {
    const vfs = new Map();
    vfs.set("track2.ogg", new Uint8Array([1, 2, 3]));
    setRuntimeContext({ vfs });
    mciSendStringA(heap, pushCStr('open "music\\Track2.mid" type sequencer alias MUSIC'), 0, 0, 0);
    mciSendStringA(heap, pushCStr("play MUSIC"), 0, 0, 0);
    expect(_midiStats.lastPlayKind).toBe("ogg");
  });

  it("VFS asset lookup falls back to .mid when only a .mid is present", () => {
    const vfs = new Map();
    vfs.set("ambient.mid", new Uint8Array([0x4d, 0x54, 0x68, 0x64])); // "MThd" header
    setRuntimeContext({ vfs });
    mciSendStringA(heap, pushCStr('open ambient.mid type sequencer alias MUSIC'), 0, 0, 0);
    mciSendStringA(heap, pushCStr("play MUSIC"), 0, 0, 0);
    expect(_midiStats.lastPlayKind).toBe("mid");
  });

  it("retryPendingMusic with no deferred play is a no-op", () => {
    expect(() => retryPendingMusic()).not.toThrow();
  });
});

describe("winmm — midiOut* (volume probe)", () => {
  it("midiOutGetNumDevs reports a synthetic device so the binary's MIDI probe captures volume", () => {
    expect(midiOutGetNumDevs(heap)).toBe(1);
  });

  it("midiOutGetVolume returns the current packed left/right volume", () => {
    const pV = heap.allocFrame(4);
    expect(midiOutGetVolume(heap, 0xffffffff, pV)).toBe(0);
    const v = heap.u32(pV);
    expect(v & 0xffff).toBe(10000);
    expect((v >>> 16) & 0xffff).toBe(10000);
  });

  it("midiOutSetVolume clamps and round-trips through midiOutGetVolume", () => {
    // 0x80008000 → both channels at 50% of 0xffff → ~5000.
    expect(midiOutSetVolume(heap, 0xffffffff, 0x80008000)).toBe(0);
    const pV = heap.allocFrame(4);
    midiOutGetVolume(heap, 0xffffffff, pV);
    const v = heap.u32(pV) & 0xffff;
    // Allow ±1 for rounding around 5000.
    expect(Math.abs(v - 5000)).toBeLessThanOrEqual(1);
  });

  it("midiOutGetDevCapsA writes a MIDIOUTCAPS struct with MOD_SWSYNTH", () => {
    const buf = heap.allocFrame(0x34);
    expect(midiOutGetDevCapsA(heap, 0, buf, 0x34)).toBe(0);
    expect(heap.u16(buf + 0x28)).toBe(7);   // MOD_SWSYNTH
    expect(heap.u16(buf + 0x2c)).toBe(128); // wNotes
  });
});

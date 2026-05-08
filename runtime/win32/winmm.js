// runtime/win32/winmm.js — Windows multimedia: timers + wave-out + MMIO.
//
// timeGetTime gives milliseconds since boot — we already track that in
// kernel32 via _bootTime; reuse the same offset here. Wave-out / MIDI APIs
// are no-ops (the binary's audio path is mute since DSOUND fails too).

import { GetTickCount } from "./kernel32.js";

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

// MMIO (multimedia I/O) — used for WAV chunk reading. Stub them so
// audio init paths exit cleanly.
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

// Wave-out (mute)
export function waveOutOpen(heap, ...args)        { return -1; }
export function waveOutClose(heap, ...args)       { return 0; }
export function waveOutWrite(heap, ...args)       { return 0; }
export function waveOutPrepareHeader(heap, ...args)   { return 0; }
export function waveOutUnprepareHeader(heap, ...args) { return 0; }
export function waveOutReset(heap, ...args)       { return 0; }
export function waveOutGetNumDevs(heap)           { return 0; }
export function waveOutGetDevCapsA(heap, ...args) { return 0; }

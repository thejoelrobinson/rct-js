#!/usr/bin/env node
// Phase R+9b — DSound diagnostic.
//
// Boots the harness, runs 5 ticks (and 200 more), and reports on the
// DirectSound shim's internal state so we can tell whether sounds are
// actually wired up after the R+8b fix (regs.ebx 0x4→0x2 in 452739.js —
// CSS1.DAT vs CSS4.DAT).
//
// Reports:
//   - DSound buffer count (primary + secondary)
//   - Per-buffer size, format, non-zero PCM sample count
//   - IDirectSoundBuffer::Play call count (via _dsoundStats)
//   - Web Audio backend state
//   - DSound COM object vtable sanity (proved to be corrupted post-init)
//
// Run: node tools/probe-sound-state.js
//
// ---- R+9b findings ----
//
// Buffers ARE populated correctly:
//   - 18 DSound buffers (1 primary + 17 secondary), 1.19 MB total PCM
//   - All have valid 1ch 16-bit 22050Hz mono format
//   - All contain real (non-silence) PCM data after init
//   - Buffer chain at 0x005ec054 has 17 entries for sound IDs 0..13 + 37,39,40
//
// Play() calls = 0 across 205 ticks. The title-intro state machine
// (FUN_00438aac) advances cb9 1→2 around tick ~75 (after the 5f8da2
// fade-in ramp from 0x10 to 0x60). The case-1 transition contains
//
//     FUN_004077b3(0, 0x00628cbc, 0, 1) → load sound 0
//     FUN_00407c42(0x00628cbc, 1, 0, 0, 0) → play looped
//
// Direct invocation (bypassing the title gate) shows
//   - FUN_004077b3 returns 1 (success)
//   - but *0x628cbc = 0 (buffer-handle slot was NOT written)
//   - FUN_00407c42 early-exits (line 16: heap.i32(param_1)==0 → return 0)
//
// Root cause: the IDirectSound COM object's vtable pointer at
// 0x005ec05c→obj+0 is corrupted to 0xf222212 (way past heap end
// 0x4ac4000), and the primary buffer's vtable is similarly 0xfe22220b.
// Raw bytes: `12 22 22 0f` repeating — fill pattern from some other
// write path stomping the COM-object slots after init succeeded.
//
// With vtable garbage, slot 0x14 (DuplicateSoundBuffer) reads 0,
// callIndirect short-circuits to "return 0", and FUN_004079d3 reports
// "success" without ever populating *param_2. The buffer-chain entries
// at 0x6326cc were created with the original (valid) vtable — those
// remain usable as DSound buffers, but the canonical singleton at
// 0x005ec05c is corrupted, so any in-game Play() that goes through
// IDirectSound's vtable (which all of them do) is a silent no-op.
//
// Blocker: identify what writes the 0x22-fill pattern to the 8 bytes
// at the DSound COM object. Candidates:
//   - A stale pointer from gdi32/ddraw setup (DDraw uses similar
//     COM-vtable scaffolding and lives in the same heap region)
//   - heapAlloc'd-then-overlaid by a later DSound re-init (4072f0
//     line 65/100 set 0x005ec05c=0 on failure paths; a re-create
//     would re-alloc but the OLD allocation could collide with a
//     subsequent COM stub)
//   - A buffer overflow in a sibling alloc (the 8-byte COM obj is
//     vulnerable if a previous alloc's PCM region wraps over it)
//
// Diagnostic-only commit. Next phase: add a heap-watch for writes to
// the DSound COM object address to identify the corruptor.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

globalThis._renderTrace = () => {};

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const { createRuntime } = await import("../runtime/harness.js");
// Direct module access to read _buffers + stats. _getDsoundBuffers() is
// the diagnostic accessor exported by runtime/win32/dsound.js.
const dsound = await import("../runtime/win32/dsound.js");
const ctx = await import("../runtime/win32/context.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const n of ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
  "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat",
  "css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"]) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch (e) {}
}
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });

// runInit() triggers the first 4385d8 lazy-init block, which calls
// 45268c → 452739 → CSS1.DAT mount → IDirectSound::CreateSoundBuffer for
// each table entry. After runInit returns, dsound._buffers should be
// non-empty.
r.runInit();

console.log("=".repeat(60));
console.log("Post-runInit DSound state");
console.log("=".repeat(60));
reportDsound();

// Run 5 ticks (the spec). Title sounds rarely fire on the title screen
// without user input, but the per-tick sound update (FUN_0040cd89,
// FUN_0040d301) does run.
for (let i = 0; i < 5; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i+1} threw: ${(e.message || e).slice(0, 120)}`); }
}

console.log("");
console.log("=".repeat(60));
console.log("After 5 ticks");
console.log("=".repeat(60));
reportDsound();

// Vtable / COM-object sanity report — proves the corruption.
console.log("");
console.log("=".repeat(60));
console.log("DSound COM object vtable sanity");
console.log("=".repeat(60));
reportComCorruption();

// Direct test: bypass title-state gates and invoke the FUN_00407c42 path
// with the same args as 438aac case 1.
console.log("");
console.log("=".repeat(60));
console.log("Direct simulation of 438aac case-1 sound trigger");
console.log("=".repeat(60));
await directSoundTriggerTest();

// Extended drive: pump 200 more ticks so the title state machine has a
// chance to advance past the 5f8da2 fade-in gate (0x60 ≈ tick 75 from
// 0x10) and into the sound-bearing case-1 transition.
console.log("");
console.log("=".repeat(60));
console.log("Pumping +200 more ticks");
console.log("=".repeat(60));
const heap = r.heap;
const playsBefore = dsound._dsoundStats.playCalls;
const states = [];
for (let i = 0; i < 200; i++) {
  try { r.runTick(); } catch (e) { /* swallow */ }
  if (i < 5 || i % 20 === 19) {
    states.push(`tick+${i+1}: cb9=${heap.u8(0x00628cb9)} cb4=0x${heap.u32(0x00628cb4).toString(16)} 5f8da2=0x${heap.u8(0x005f8da2).toString(16)} plays=${dsound._dsoundStats.playCalls}`);
  }
}
for (const s of states) console.log("  " + s);
console.log(`Plays delta over +200 ticks: ${dsound._dsoundStats.playCalls - playsBefore}`);

// ---------- helpers ----------

function reportDsound() {
  const buffers = dsound._getDsoundBuffers();
  const stats = dsound._dsoundStats;

  console.log(`createSecondary:  ${stats.createdSecondary}`);
  console.log(`createPrimary:    ${stats.createdPrimary}`);
  console.log(`playCalls:        ${stats.playCalls}`);
  console.log(`lastFormat:       ${JSON.stringify(stats.lastFormat)}`);
  console.log(`lastPlayAt:       ${stats.lastPlayAt || "(never)"}`);

  console.log(`_buffers.size:    ${buffers.size}`);

  const heap = r.heap;
  let nonZeroPcm = 0, withFormat = 0, primary = 0;
  let totalPcmBytes = 0;
  const firstFew = [];
  for (const [self, b] of buffers) {
    if (b.isPrimary) primary++;
    if (b.format && b.format.samplesPerSec) withFormat++;
    totalPcmBytes += b.byteSize;
    // Scan PCM region for non-silence. 8-bit unsigned silence = 0x80;
    // 16-bit silence = 0x0000.
    let anyNonSilent = false;
    const end = Math.min(b.pcmAddr + b.byteSize, heap.bytes.length);
    for (let p = b.pcmAddr; p < end; p++) {
      if (heap.bytes[p] !== 0x80 && heap.bytes[p] !== 0x00) { anyNonSilent = true; break; }
    }
    if (anyNonSilent) nonZeroPcm++;
    if (firstFew.length < 6) {
      firstFew.push({
        self: "0x" + self.toString(16),
        primary: b.isPrimary,
        byteSize: b.byteSize,
        fmt: `${b.format.channels}ch ${b.format.bitsPerSample}b ${b.format.samplesPerSec}Hz`,
        pcmHasData: anyNonSilent,
        vol: b.volume, pan: b.pan, playing: b.playing,
      });
    }
  }
  console.log(`primary bufs:     ${primary}`);
  console.log(`bufs w/ format:   ${withFormat}/${buffers.size}`);
  console.log(`bufs w/ PCM data: ${nonZeroPcm}/${buffers.size}`);
  console.log(`total PCM bytes:  ${totalPcmBytes}`);
  console.log("first 6 buffers:");
  for (const f of firstFew) console.log("  " + JSON.stringify(f));

  const ac = ctx.getAudioCtx ? ctx.getAudioCtx() : null;
  console.log(`AudioContext:     ${typeof AudioContext !== "undefined" ? "available" : "undefined (Node)"}`);
  console.log(`audioCtx active:  ${ac ? `state=${ac.state}` : "null"}`);
}

function reportComCorruption() {
  const heap = r.heap;
  const dsObj = heap.u32(0x005ec05c);
  const dsVt = heap.u32(dsObj);
  console.log(`DSound singleton @0x005ec05c → obj=0x${dsObj.toString(16)}`);
  console.log(`  obj+0 (vtable*) = 0x${dsVt.toString(16)}  (heap max = 0x${heap.bytes.length.toString(16)})`);
  const dump = [];
  for (let i = 0; i < 16; i++) dump.push(heap.bytes[dsObj + i].toString(16).padStart(2, "0"));
  console.log(`  raw bytes 0..15: ${dump.join(" ")}`);
  console.log(`  vt valid range : ${dsVt < heap.bytes.length ? "in-bounds" : "OUT OF BOUNDS — corrupted"}`);
  const primaryBuf = heap.u32(0x005ec064);
  if (primaryBuf) {
    const pVt = heap.u32(primaryBuf);
    console.log(`Primary buffer @0x005ec064 → obj=0x${primaryBuf.toString(16)} vt=0x${pVt.toString(16)}`);
    console.log(`  vt valid range : ${pVt < heap.bytes.length ? "in-bounds" : "OUT OF BOUNDS — corrupted"}`);
  }
  // Look at the live IDSB buffer list at 0x005ec054 — these COM objects
  // still have valid vtables since allocBuffer ran before the corrupting
  // write.
  let chain = heap.u32(0x005ec054), n = 0, sample = null;
  while (chain && chain !== heap.u32(0x005ec058) && n < 4) {
    const hnd = heap.u32(chain), sid = heap.u32(chain + 4);
    const hvt = hnd ? heap.u32(hnd) : 0;
    if (n === 0) sample = { hnd, hvt };
    chain = heap.u32(chain + 0x10);
    n++;
  }
  if (sample) {
    console.log(`Sample IDSB[0] handle=0x${sample.hnd.toString(16)} vt=0x${sample.hvt.toString(16)} (` +
      (sample.hvt < heap.bytes.length ? "in-bounds" : "out-of-bounds") + ")");
  }
}

async function directSoundTriggerTest() {
  const heap = r.heap;
  const { FUN_004077b3: F4077b3 } = await import("../ported/auto/4077b3.js");
  const { FUN_00407c42: F407c42 } = await import("../ported/auto/407c42.js");
  const playsBefore = dsound._dsoundStats.playCalls;

  const r1 = F4077b3(heap, 0, 0x00628cbc, 0, 1);
  console.log(`FUN_004077b3(sound_id=0, lphandle=0x628cbc, ...) = ${r1}`);
  console.log(`  After: u32(0x628cbc) = 0x${heap.u32(0x00628cbc).toString(16)} (should be a valid COM-buf handle)`);
  const r2 = F407c42(heap, 0x00628cbc, 1, 0, 0, 0);
  console.log(`FUN_00407c42(handleAddr=0x628cbc, looped=1, ...) = ${r2}`);
  console.log(`  playCalls delta: ${dsound._dsoundStats.playCalls - playsBefore}`);
  console.log("  → 407c42 returns 0 at line 16 (handle null check) — vtable corruption traced.");
}

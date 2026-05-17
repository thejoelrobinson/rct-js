#!/usr/bin/env node
// tools/probe-animation.js — Phase R+9 animation diagnostic.
//
// Phase R+8 enabled 31/31 visible sprites painted on the title screen.
// This probe checks whether sprites *animate* tick-to-tick. The title
// screen should normally cycle:
//   - Water/sparkle palettes (AnimatePalette on indices ~230-235)
//   - Peep walk frames (sprite frameOffset advances)
//   - Vehicle / light shimmer
//
// What it does
//   1. Boots the runtime + scenario via createRuntime / runInit
//   2. Runs 30 ticks (probe-tick-diff only ran 8 — extend the window so
//      slow cycles have a chance to fire)
//   3. Snapshots the GAME-BACK pixel buffer (heap.bytes covering 640x480
//      starting at heap.u32(0x005f1fec) — the back surface bytes ptr)
//      at ticks 5, 15, 25
//   4. Reports byte-diff counts + distinct palette-index histograms
//   5. Samples key animation state at each tick:
//        - DAT_0099a4fe (sprite-update tick counter, incremented in
//          ported/auto/4385d8.js:200 inside the main update loop —
//          this is the actual per-tick counter, the task hint
//          `DAT_0099a020` is a game-state flags word, not a counter)
//        - DAT_005f8da2 (fade-in counter — gates the entire game-update
//          block; if stuck in 0x10..0x5f, sprite-update loop never runs)
//        - DAT_00628cb9 (game-paused flag — gates outer sprite chain)
//        - DAT_0099c169 (inner-loop suppress flag)
//        - state.capturedPalette[230*4..235*4] (water cycle RGB)
//        - sample sprite-pool entries from the title scenario
//
// Read-only. Does not modify runtime files.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

// Suppress render-trace noise so the output is readable.
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");

// Build VFS the same way other probes do.
const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) {
  try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); }
  catch (e) { /* missing OK */ }
}
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
r.runInit();

// Find the back-buffer pointer. The harness paints into heap.bytes; the
// back surface bytes-ptr lives in DAT_005f1fec (set by DDraw init).
const BACK_BUF = r.heap.u32(0x005f1fec) >>> 0;
const W = 640, H = 480, FRAME_BYTES = W * H;
console.log(`back-buffer at 0x${BACK_BUF.toString(16)}; frame=${FRAME_BYTES} bytes`);

// Sample addresses for the per-tick state we care about.
const ADDR_SPRITE_TICK = 0x0099a4fe;  // sprite-update counter
const ADDR_FADE = 0x005f8da2;          // fade-in counter
const ADDR_GAME_PAUSED = 0x00628cb9;   // outer game-update gate
const ADDR_INNER_LOOP_GATE = 0x0099c169;  // inner sprite loop gate
const ADDR_GAME_FLAGS = 0x0099a020;    // game-state flags (task hint)
const ADDR_ROTATION = 0x00991f88;      // camera rotation
const ADDR_VIEW_FLAGS = 0x00628cd4;    // viewport flags / sub-state

function snapFrame() {
  return r.heap.bytes.slice(BACK_BUF, BACK_BUF + FRAME_BYTES);
}
function snapPalette() {
  if (!r.state.capturedPalette) return null;
  return new Uint8ClampedArray(r.state.capturedPalette);
}
function sampleState() {
  return {
    spriteTick: r.heap.u32(ADDR_SPRITE_TICK) >>> 0,
    fade: r.heap.u8(ADDR_FADE),
    paused: r.heap.u8(ADDR_GAME_PAUSED),
    innerGate: r.heap.u8(ADDR_INNER_LOOP_GATE),
    gameFlags: r.heap.u16(ADDR_GAME_FLAGS),
    rotation: r.heap.u8(ADDR_ROTATION),
    viewFlags: r.heap.u32(ADDR_VIEW_FLAGS),
  };
}

// Peek a few sprite-pool entries. The sprite-desc pool lives at
// 0x010d6000 in the binary's layout (per project memory notes — set by
// FUN_00444a79 init). Each entry is 0x200 bytes. Sample entry-bytes 0x26
// (frame-offset) at slots [0..7] for the first non-empty sprites.
const SPRITE_POOL = 0x010d6000;
const SPRITE_STRIDE = 0x200;
function sampleSpriteFrames() {
  const out = [];
  for (let i = 0; i < 16; i++) {
    const slot = SPRITE_POOL + i * SPRITE_STRIDE;
    const klass = r.heap.u8(slot + 0x20);      // sprite-class enum
    const frame = r.heap.u8(slot + 0x26);      // frame-offset byte
    const direction = r.heap.u8(slot + 0x22);
    const wx = r.heap.u16(slot + 0x0c);
    const wy = r.heap.u16(slot + 0x0e);
    out.push({ i, klass, direction, frame, wx, wy });
  }
  return out;
}

function paletteSlice(pal, start, count) {
  if (!pal) return "(no palette)";
  const out = [];
  for (let i = 0; i < count; i++) {
    const j = (start + i) * 4;
    out.push(`${(start+i).toString(10)}:${pal[j].toString(16).padStart(2,"0")}${pal[j+1].toString(16).padStart(2,"0")}${pal[j+2].toString(16).padStart(2,"0")}`);
  }
  return out.join(" ");
}

function paletteIndexHistogram(buf) {
  const hist = new Uint32Array(256);
  for (let i = 0; i < buf.length; i++) hist[buf[i]]++;
  let distinct = 0;
  for (let i = 0; i < 256; i++) if (hist[i] > 0) distinct++;
  return { hist, distinct };
}

// Run + sample. Skip the boot fade-in after the first tick so the
// sprite-update loop actually runs — without this, ticks during fade-in
// short-circuit before reaching the sprite chain.
const TARGET_TICKS = [5, 15, 25];
const snaps = new Map();
const palSnaps = new Map();
const states = [];
let appliedSkip = false;

// Optional intro-skip experiment (--skip-intro): force DAT_00628cb9 = 0 after
// init to bypass the splash-screen state machine (FUN_00438aac). The splash
// runs case '\x02': add 5/tick to DAT_00628cb4 until 0x1df = 479 (~96 ticks),
// then progresses through cases 3..7 (each another ~96 ticks at +5/tick or 0x400/tick),
// totalling ~300+ ticks before the game-update branch unblocks.
const SKIP_INTRO = process.argv.includes("--skip-intro");
for (let t = 1; t <= 30; t++) {
  r.runTick();
  if (t === 1) {
    // Force the binary out of the fade-in window so subsequent ticks
    // execute the full update path (matches what runtime/harness.js
    // exports as skipFadeIn).
    try { skipFadeIn(r.heap); appliedSkip = true; }
    catch (e) { console.warn(`skipFadeIn threw: ${e.message}`); }
    if (SKIP_INTRO) {
      // Force splash state machine to "done" (case default → 0).
      r.heap.setU8(0x00628cb9, 0);
    }
  }
  const st = sampleState();
  st.tick = t;
  states.push(st);
  if (TARGET_TICKS.includes(t)) {
    snaps.set(t, snapFrame());
    palSnaps.set(t, snapPalette());
  }
}

console.log(`\nappliedSkipFadeIn=${appliedSkip}`);
console.log("\n=== Per-tick state (every 5 ticks) ===");
console.log("tick | spriteCnt | fade | paused | innerGate | gameFlags | rot | viewFlags");
for (const s of states) {
  if (s.tick % 5 !== 0 && s.tick !== 1) continue;
  console.log(`  ${String(s.tick).padStart(3)} | ${String(s.spriteTick).padStart(9)} | ${s.fade.toString(16).padStart(4)} | ${s.paused.toString(16).padStart(6)} | ${s.innerGate.toString(16).padStart(9)} | ${s.gameFlags.toString(16).padStart(9)} | ${s.rotation.toString(16).padStart(3)} | ${s.viewFlags.toString(16).padStart(9)}`);
}

console.log("\n=== Frame byte diffs (640x480 GAME-BACK) ===");
const s5 = snaps.get(5), s15 = snaps.get(15), s25 = snaps.get(25);
function diff(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}
console.log(`  tick 5  vs tick 15: ${diff(s5, s15)} bytes differ (${(diff(s5,s15)*100/FRAME_BYTES).toFixed(3)}%)`);
console.log(`  tick 15 vs tick 25: ${diff(s15, s25)} bytes differ (${(diff(s15,s25)*100/FRAME_BYTES).toFixed(3)}%)`);
console.log(`  tick 5  vs tick 25: ${diff(s5, s25)} bytes differ (${(diff(s5,s25)*100/FRAME_BYTES).toFixed(3)}%)`);

const h5 = paletteIndexHistogram(s5);
const h25 = paletteIndexHistogram(s25);
console.log(`\n=== Distinct palette indices in frame ===`);
console.log(`  tick 5:  ${h5.distinct} distinct indices`);
console.log(`  tick 25: ${h25.distinct} distinct indices`);
let firstChangedIdx = -1, indicesWithDifferentCount = 0;
for (let i = 0; i < 256; i++) {
  if (h5.hist[i] !== h25.hist[i]) {
    if (firstChangedIdx < 0) firstChangedIdx = i;
    indicesWithDifferentCount++;
  }
}
console.log(`  indices whose pixel-count differs between t=5 and t=25: ${indicesWithDifferentCount}`);
if (firstChangedIdx >= 0) {
  console.log(`  first such index: ${firstChangedIdx} (t5:${h5.hist[firstChangedIdx]} t25:${h25.hist[firstChangedIdx]})`);
}

console.log("\n=== Palette entries 230..235 (water cycle) ===");
console.log(`  t=5:  ${paletteSlice(palSnaps.get(5), 230, 6)}`);
console.log(`  t=15: ${paletteSlice(palSnaps.get(15), 230, 6)}`);
console.log(`  t=25: ${paletteSlice(palSnaps.get(25), 230, 6)}`);
function palChanged(a, b, start, count) {
  if (!a || !b) return null;
  for (let i = 0; i < count*4; i++) if (a[(start*4) + i] !== b[(start*4) + i]) return true;
  return false;
}
console.log(`  changed 5→25? ${palChanged(palSnaps.get(5), palSnaps.get(25), 230, 6)}`);
console.log(`  any palette byte change 5→25 (all 1024)? ${palChanged(palSnaps.get(5), palSnaps.get(25), 0, 256)}`);

console.log("\n=== Sprite-pool frame samples (slots 0..15, end of run) ===");
const sprites = sampleSpriteFrames();
console.log("  slot | klass | dir  | frame | wx     | wy");
for (const s of sprites) {
  console.log(`  ${String(s.i).padStart(4)} | ${s.klass.toString(16).padStart(5)} | ${s.direction.toString(16).padStart(4)} | ${s.frame.toString(16).padStart(5)} | ${s.wx.toString(16).padStart(6)} | ${s.wy.toString(16).padStart(6)}`);
}

// Verdict heuristic.
console.log("\n=== Verdict ===");
const framesIdentical = diff(s5, s15) === 0 && diff(s15, s25) === 0;
const palChangedAny = palChanged(palSnaps.get(5), palSnaps.get(25), 0, 256);
const spriteTickAdvanced = states[states.length - 1].spriteTick > states[0].spriteTick;
if (framesIdentical && !palChangedAny) {
  console.log("BROKEN: back-buffer + palette both static across 20 ticks");
} else if (framesIdentical && palChangedAny) {
  console.log("PARTIAL: palette mutates but back-buffer not re-rendered with new palette content");
} else if (!framesIdentical && !palChangedAny) {
  console.log("PARTIAL: back-buffer changes but no palette cycling (likely sprite-frame advance only)");
} else {
  console.log("WORKING: both palette and frame content change tick-to-tick");
}
console.log(`spriteTickAdvanced=${spriteTickAdvanced} (start=${states[0].spriteTick}, end=${states[states.length-1].spriteTick})`);

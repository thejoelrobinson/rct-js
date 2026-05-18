// Shared boot + frame-hash logic for the replay capture/verify pair.
// Lives in tools/lib so vitest can also import it from test/runtime/.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

const SURFACE_W = 640;
const SURFACE_H = 480;
const SURFACE_BYTES = SURFACE_W * SURFACE_H;

function loadVfs() {
  const vfs = new Map();
  for (const n of VFS_FILES) {
    try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
    catch (_) {}
  }
  for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));
  return vfs;
}

// Pick the highest-addressed 640x480 surface. By the time runInit finishes,
// state.ddrawSurfaces holds at least the primary (front) and the back buffer
// at distinct addresses; the back buffer is what the binary blits into, and
// heapAlloc returns it at a higher address than the primary.
function findBackSurfaceAddr(state) {
  if (!state.ddrawSurfaces) return null;
  const candidates = [];
  for (const [, s] of state.ddrawSurfaces) {
    if (s.width === SURFACE_W && s.height === SURFACE_H && typeof s.bytes === "number") {
      candidates.push(s.bytes);
    }
  }
  return candidates.length ? Math.max(...candidates) : null;
}

function fnv1a32(heap, addr, len) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < len; i++) {
    h ^= heap.u8(addr + i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `0x${h.toString(16).padStart(8, "0")}`;
}

/**
 * Boot the harness, advance N ticks, and return hash-per-sampled-tick.
 *
 * Boot sequence:
 *   1. createRuntime({ dataBin, vfs })
 *   2. runInit()                    — DDraw surfaces get created here
 *   3. runTick()                    — fires first-tick lazy init in 4385d8
 *   4. skipFadeIn(heap)             — fade=1, runs FUN_0042f3a2 post-fade init
 *   5. for t in 1..maxTick: runTick()
 *
 * Returns { surfaceAddr, ticks: { N: hash, ... } }.
 *
 * Does NOT call skipTitleIntro — opening the cb9==0 sprite-update gate makes
 * the harness's per-tick time explode (an interpreter-fallback path is hot
 * AND slow). The intro state machine in 438aac case 1→2→3 renders deterministic
 * blits that are sufficient for differential testing the rendering chain.
 *
 * @param {object} opts
 * @param {number[]} opts.tickSamples - which ticks to hash (e.g. [1,5,15,30])
 * @param {number} [opts.maxTick] - max tick to run (default: max of tickSamples)
 * @param {(msg: string) => void} [opts.log] - optional progress callback
 */
export async function bootAndHash({ tickSamples, maxTick, log }) {
  if (!Array.isArray(tickSamples) || tickSamples.length === 0) {
    throw new Error("tickSamples required");
  }
  maxTick = Math.max(maxTick || 0, ...tickSamples);
  const sampleSet = new Set(tickSamples);
  log = log || (() => {});

  // Determinism: monotonic-per-call clock so the fixture reproduces across
  // Node sessions. Win32 shims read wall-clock at module load (kernel32
  // _bootTime) and per-call (GetTickCount, message.time, dsound stats) and
  // that flows into the hashed state. Frozen-constant deadlocks the harness
  // (4385d8 spin-waits time advancement); monotonic-per-call exits those
  // loops in a fixed iteration count. Must be installed BEFORE module
  // imports below.
  let _tick = 1700000000000;
  Date.now = () => ++_tick;
  if (typeof performance !== "undefined") {
    performance.now = () => Date.now() - 1700000000000;
  }
  globalThis._renderTrace = () => {};

  const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
  const { state } = await import("../../runtime/win32/context.js");

  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();

  log("createRuntime");
  const r = createRuntime({ dataBin, vfs });
  const heap = r.heap;

  log("runInit");
  try { r.runInit(); }
  catch (e) { log(`runInit threw: ${(e.message || e).slice(0, 120)}`); }

  log("init runTick");
  try { r.runTick(); }
  catch (e) { log(`init runTick threw: ${(e.message || e).slice(0, 120)}`); }

  log("skipFadeIn");
  skipFadeIn(heap);

  const surfaceAddr = findBackSurfaceAddr(state);
  if (!surfaceAddr) {
    throw new Error("no 640x480 surface found in state.ddrawSurfaces after runInit");
  }

  const ticks = {};
  for (let t = 1; t <= maxTick; t++) {
    try { r.runTick(); }
    catch (e) { log(`tick ${t} threw: ${(e.message || e).slice(0, 80)}`); }
    if (sampleSet.has(t)) {
      ticks[t] = fnv1a32(heap, surfaceAddr, SURFACE_BYTES);
      log(`tick ${t} = ${ticks[t]}`);
    }
  }

  return { surfaceAddr, surfaceWidth: SURFACE_W, surfaceHeight: SURFACE_H, ticks };
}

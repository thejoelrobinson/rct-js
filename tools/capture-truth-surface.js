// Capture the BINARY's true tick-1 back-buffer surface — the ground truth for
// accuracy tests. Routes the entire in-game blit chain (9b438b and its callees)
// AND the terrain painter chain (421d2c / 431bb8 / 4368d8 + the palette-swizzle
// helpers) through the x86 interpreter running raw rct.exe, so the rendered
// surface is byte-for-byte what the original binary produces. Writes the raw
// 8bpp index surface to test/fixtures/title-truth-surface-tick1.bin.
//
// This is the authoritative oracle for test/runtime/title_accuracy.test.js:
// unlike the FNV replay fixture (which hashes whatever the current JS chain
// emits, bugs and all), this fixture is the interpreter's output — so the
// accuracy test passes only when the JS chain matches the actual binary.
//
// FAITHFULNESS (non-self-referential terrain truth): the runtime renders
// terrain via JS-port setEipHooks on the bridge cpu (extra_paint_421d2c /
// extra_paint_431bb8 / extra_paint_4368d8 + the four 0x420d9c/0x420f4c/
// 0x420502/0x42094b palette-swizzle helpers + 0x444e08/0x5ce7f8). If truth
// capture also rendered terrain through those JS ports, the fixture would
// ENCODE the very port bugs the accuracy test is meant to catch — e.g. the
// `sar si,1` drop in extra_paint_431bb8 (the base-tile painter). That would
// make the gate self-referential (force-green). So after createRuntime() has
// installed the bridge hooks, we clearEipHook ALL of those terrain-painter
// addresses, so the INTERPRETER runs the binary's own terrain painters during
// capture. The committed truth is then the binary's actual terrain geometry.
//
// Reproducible: temporarily swaps the 4 blit shims to interp routers, boots,
// clears the terrain-painter JS-port hooks, captures, and restores both in a
// finally block.
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const BLITS = ["9b438b", "9b4457", "9b4660", "9b4911"];
const routed = (f) =>
  `import { interpBlit } from "../../runtime/native/sprites/_interp_blit.js";\n` +
  `export const FUN_00${f} = (heap) => interpBlit(heap, 0x${f});\n`;

const backups = [];
try {
  for (const f of BLITS) {
    const p = resolve(ROOT, `ported/auto/${f}.js`);
    const bak = `${p}.truthbak`;
    copyFileSync(p, bak); backups.push([p, bak]);
    writeFileSync(p, routed(f));
  }

  let _t = 1700000000000; Date.now = () => ++_t;
  if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
  globalThis._renderTrace = () => {};

  const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
  const { state } = await import("../runtime/win32/context.js");
  const { clearEipHook } = await import("../harness/x86.js");

  // Terrain-painter JS-port hook addresses installed by installPainterBridge().
  // Clearing them routes the binary's own terrain painters through the
  // interpreter during capture (faithful, non-self-referential truth):
  //   0x421d2c               terrain surface per-element painter
  //   0x431bc8/d4b/edc/206f  base-tile rotation sub-painter (the sar-bug carrier)
  //   0x4368d8/e0/ec/ff      per-tile surface painter (PTR_LAB_004368c8)
  //   0x420d9c/0f4c/0502/094b palette-swizzle helpers (0x421d2c tail)
  //   0x444e08               fence/wall per-element painter
  //   0x5ce7f8               small-scenery per-element painter
  const TERRAIN_PAINTER_HOOKS = [
    0x421d2c,
    0x431bc8, 0x431d4b, 0x431edc, 0x43206f,
    0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
    0x420d9c, 0x420f4c, 0x420502, 0x42094b,
    0x444e08, 0x5ce7f8,
  ];

  const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
  const vfs = new Map();
  for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
  for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
  const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
  // createRuntime() ran installPainterBridge(), which installed the terrain-
  // painter JS-port eipHooks on the (module-global) hook map. Clear them so the
  // interpreter runs the binary's own terrain painters for the captured frame.
  for (const a of TERRAIN_PAINTER_HOOKS) clearEipHook(a >>> 0);
  try { r.runInit(); } catch {} try { r.runTick(); } catch {} skipFadeIn(r.heap);
  // runInit may re-install bridge hooks if it re-runs installPainterBridge;
  // re-clear defensively right before the captured tick.
  for (const a of TERRAIN_PAINTER_HOOKS) clearEipHook(a >>> 0);

  const W = 640, H = 480, N = W * H;
  let cands = [];
  for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
  const surf = Math.max(...cands);
  r.runTick(); // tick 1

  const raw = Buffer.alloc(N);
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < N; i++) { const b = r.heap.u8(surf + i); raw[i] = b; h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  const out = resolve(ROOT, "test/fixtures/title-truth-surface-tick1.bin");
  writeFileSync(out, raw);
  console.log(`wrote ${out}\n  ${N} bytes, FNV-1a hash=0x${(h >>> 0).toString(16).padStart(8, "0")}`);
  if (globalThis.__interpBlitStats) console.log(`  interp-router: ${globalThis.__interpBlitStats.calls} calls, ${globalThis.__interpBlitStats.errors} errors`);
} finally {
  for (const [p, bak] of backups) { if (existsSync(bak)) { copyFileSync(bak, p); unlinkSync(bak); } }
  console.log("restored original blit shims");
}

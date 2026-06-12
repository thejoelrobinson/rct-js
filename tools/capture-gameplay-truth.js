// Capture the BINARY's true gameplay back-buffer surface — Workstream B's
// ground truth (the gameplay sibling of tools/capture-truth-surface.js).
//
// Boots the deterministic harness, enters scenario play (enterScenarioPlay:
// play-mode bit + skipTitleIntro), runs TICKS gameplay ticks, and dumps the
// GAME-BACK 640x480 8bpp surface. Two modes:
//
//   node tools/capture-gameplay-truth.js                # MODE=interp (default)
//       Routes the entire blit chain (9b438b/9b4457/9b4660/9b4911) through
//       the x86 interpreter running raw rct.exe AND clears every terrain/
//       element-painter JS-port eip hook, so the rendered frame is
//       byte-for-byte what the original binary draws on the JS-simulated
//       game state. Writes test/fixtures/gameplay-truth-surface.bin —
//       the fixture for test/runtime/gameplay_accuracy.test.js.
//
//   MODE=js node tools/capture-gameplay-truth.js
//       Renders the same boot through the normal JS chain and byte-diffs
//       against the committed fixture (the same comparison the vitest gate
//       makes; handy for a quick measurement without vitest).
//
// FAITHFULNESS: identical to the title capture — if the truth frame were
// rendered through the JS-port hooks, the fixture would encode the very
// port bugs the accuracy gate exists to catch. The SIM runs as JS in both
// modes (only rendering is routed), so the two frames are drawn from the
// same simulated world; the diff isolates the render chain.
//
// The capture tick: TICKS (default 2) runTick() calls after
// enterScenarioPlay, surface read afterwards. The vitest gate must use the
// SAME boot + tick count.
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const MODE = process.env.MODE || "interp";
const TICKS = parseInt(process.env.TICKS || "2", 10);
const FIXTURE = resolve(ROOT, "test/fixtures/gameplay-truth-surface.bin");

const BLITS = ["9b438b", "9b4457", "9b4660", "9b4911"];
const routed = (f) =>
  `import { interpBlit } from "../../runtime/native/sprites/_interp_blit.js";\n` +
  `export const FUN_00${f} = (heap) => interpBlit(heap, 0x${f});\n`;

const backups = [];
try {
  if (MODE === "interp") {
    for (const f of BLITS) {
      const p = resolve(ROOT, `ported/auto/${f}.js`);
      const bak = `${p}.truthbak`;
      copyFileSync(p, bak); backups.push([p, bak]);
      writeFileSync(p, routed(f));
    }
  }

  let _t = 1700000000000; Date.now = () => ++_t;
  if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
  globalThis._renderTrace = () => {};

  const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
  const { state } = await import("../runtime/win32/context.js");
  const { clearEipHook } = await import("../harness/x86.js");

  // Every JS-port painter hook installed by installPainterBridge() (the
  // title-capture list plus the painters ported since: supports/walls and
  // the slot allocators). Cleared in interp mode so the binary's own
  // painters draw the truth frame.
  const PAINTER_HOOKS = [
    0x421d2c,
    0x431bc8, 0x431d4b, 0x431edc, 0x43206f,
    0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
    0x420d9c, 0x420f4c, 0x420502, 0x42094b,
    0x444e08, 0x5ce7f8,
    0x4238b4, 0x5dff38,
    0x432214, 0x4323b8, 0x43256d, 0x432727,   // PTR_LAB_00432204 rotation slots
    0x432ea0, 0x43300a, 0x433180, 0x4332f8,   // PTR_LAB_00432e90 attach slots
  ];

  const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
  const vfs = new Map();
  for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
  for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
  const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
  const clearHooks = () => { if (MODE === "interp") for (const a of PAINTER_HOOKS) clearEipHook(a >>> 0); };
  clearHooks();
  try { r.runInit(); } catch {} try { r.runTick(); } catch {}
  skipFadeIn(r.heap);
  enterScenarioPlay(r.heap);
  clearHooks();   // defensive re-clear before the captured ticks

  const W = 640, H = 480, N = W * H;
  let cands = [];
  for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
  const surf = Math.max(...cands);
  for (let i = 0; i < TICKS; i++) {
    try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
  }

  const raw = Buffer.alloc(N);
  let h = 0x811c9dc5 >>> 0, nz = 0;
  const idx = new Set();
  for (let i = 0; i < N; i++) {
    const b = r.heap.u8(surf + i);
    raw[i] = b; if (b) nz++; idx.add(b);
    h ^= b; h = Math.imul(h, 0x01000193) >>> 0;
  }
  console.log(`mode=${MODE} ticks=${TICKS} surface=0x${surf.toString(16)} nonzero=${nz}/${N} idx=${idx.size} FNV=0x${(h >>> 0).toString(16).padStart(8, "0")}`);

  if (MODE === "interp") {
    writeFileSync(FIXTURE, raw);
    console.log(`wrote ${FIXTURE}`);
    if (globalThis.__interpBlitStats) console.log(`  interp-router: ${globalThis.__interpBlitStats.calls} calls, ${globalThis.__interpBlitStats.errors} errors`);
  } else {
    const truth = readFileSync(FIXTURE);
    let diff = 0;
    for (let i = 0; i < N; i++) if (raw[i] !== truth[i]) diff++;
    console.log(`divergence vs committed truth: ${diff}/${N} px (${(100 * (1 - diff / N)).toFixed(2)}% match)`);
  }
} finally {
  for (const [p, bak] of backups) {
    if (existsSync(bak)) {
      copyFileSync(bak, p);
      // Some sandboxes deny unlink on the mounted repo; a stale .truthbak
      // is harmless (it is recreated/overwritten on the next capture).
      try { unlinkSync(bak); } catch { /* leave the backup file */ }
    }
  }
  if (backups.length) console.log("restored original blit shims");
}

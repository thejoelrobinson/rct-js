// Capture the BINARY's true tick-1 back-buffer surface — the ground truth for
// accuracy tests. Routes the entire in-game blit chain (9b438b and its callees)
// through the x86 interpreter running raw rct.exe, so the rendered surface is
// byte-for-byte what the original binary produces. Writes the raw 8bpp index
// surface to test/fixtures/title-truth-surface-tick1.bin.
//
// This is the authoritative oracle for test/runtime/title_accuracy.test.js:
// unlike the FNV replay fixture (which hashes whatever the current JS chain
// emits, bugs and all), this fixture is the interpreter's output — so the
// accuracy test passes only when the JS chain matches the actual binary.
//
// Reproducible: temporarily swaps the 4 blit shims to interp routers, boots,
// captures, and restores the originals in a finally block.
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

  const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
  const vfs = new Map();
  for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
  for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
  const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
  try { r.runInit(); } catch {} try { r.runTick(); } catch {} skipFadeIn(r.heap);

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

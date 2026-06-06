// β2 parameter-divergence trace. Boots the deterministic replay harness and
// watches the per-blit scratch-global block [0x9a2010, 0x9a2034) during tick 1,
// capturing the sequence of writes the CURRENTLY-WIRED blit chain makes while
// computing each sprite's clip parameters. Run once with the interpreter
// routers wired (ground truth) and once with the JS chain, then diff the first
// blit's parameter sequence to pinpoint the wrong computation.
//
// Interpreter writes go through x86.js (_x86Watch); JS writes through heap.js
// (_heapWatch). We arm BOTH with one shared log so it works for either config.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const LABEL = process.argv[2] || "chain";
const NBLITS = parseInt(process.argv[3] || "2", 10);

let _tick = 1700000000000;
Date.now = () => ++_tick;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const NAMES = {
  0x9a2010: "SRC_BASE", 0x9a2014: "SRC_WH", 0x9a2018: "SPR_XY", 0x9a201c: "SPR_FLAGS",
  0x9a2020: "ROW_SKIP", 0x9a2024: "COL_SKIP", 0x9a2028: "COL_COUNT", 0x9a202c: "ROW_COUNT",
  0x9a202e: "COL_SKIP_B", 0x9a2030: "ROW_STRIDE", 0x9a2032: "LZ/HDR",
};
const LO = 0x9a2010, HI = 0x9a2034;
const log = [];
const cb = (a, sz, v) => { log.push({ a: a >>> 0, sz, v: v >>> 0 }); };
globalThis._x86Watch = { lo: LO, hi: HI, cb };
globalThis._heapWatch = { lo: LO, hi: HI, cb };

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);

log.length = 0;            // discard init/fade writes; capture only tick 1
globalThis.__dumpBlit0 = true;   // arm the interp router's blit0 entry dump for tick 1
try { r.runTick(); } catch {}

// Segment the write log into per-blit bursts: a new burst starts when SRC_BASE
// (0x9a2010, the first thing 9b438b writes) is written again.
const blits = [];
for (const e of log) {
  if (e.a === 0x9a2010 && (blits.length === 0 || blits[blits.length-1].length > 0)) blits.push([]);
  if (blits.length) blits[blits.length-1].push(e);
}
console.log(`\n[${LABEL}] tick-1 captured ${log.length} param-writes across ${blits.length} blits`);
for (let i = 0; i < Math.min(NBLITS, blits.length); i++) {
  console.log(`\n--- blit #${i} (${blits[i].length} writes) ---`);
  for (const e of blits[i]) {
    const nm = NAMES[e.a] || `0x${e.a.toString(16)}`;
    console.log(`  ${nm.padEnd(11)} = 0x${e.v.toString(16).padStart(e.sz*2,"0")} (${e.sz}b, ${(e.v<<16>>16)})`);
  }
}

// Flat mode: dump every captured write as "addr:val" for cross-config diff.
if (process.env.FLAT) {
  const fs = await import("node:fs");
  fs.writeFileSync(process.env.FLAT, log.map(e => `${(e.a>>>0).toString(16)}:${(e.v>>>0).toString(16)}:${e.sz}`).join("\n"));
}

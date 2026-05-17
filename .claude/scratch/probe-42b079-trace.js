#!/usr/bin/env node
// Trace what 0x42b079 does — where does it throw, and does it write anything?

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
r.runInit();

// Find surfaces
let primary = null, back = null;
for (const [_, s] of state.ddrawSurfaces) {
  if (s.width >= 320) { if (s.isPrimary) primary = s; else back = s; }
}

// Wrap 42b079 to capture exception
const orig = state.fnDispatch.get(0x42b079);
state.fnDispatch.set(0x42b079, function (...args) {
  try { return orig(...args); }
  catch (e) {
    console.log(`\n42b079 EXC: ${e.message}`);
    console.log(`stack top (10):`);
    console.log(e.stack.split("\n").slice(0, 12).join("\n"));
    throw e;
  }
});

// Just run tick 1 with logging
console.log(`Before tick: back nz=${snapNz(back)} primary nz=${snapNz(primary)}`);
try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0, 80)}`); }
console.log(`After tick:  back nz=${snapNz(back)} primary nz=${snapNz(primary)}`);

function snapNz(s) {
  let nz = 0;
  for (let y = 0; y < s.height; y++)
    for (let x = 0; x < s.width; x++)
      if (heap.bytes[s.bytes + y * s.pitch + x] !== 0) nz++;
  return nz;
}

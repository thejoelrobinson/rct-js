#!/usr/bin/env node
// Walk the tick paint pump slot-by-slot and snapshot back-buffer after EACH
// iteration. Identify which slot fills the buffer.

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

let primary = null, back = null;
for (const [_, s] of state.ddrawSurfaces) {
  if (s.width >= 320) { if (s.isPrimary) primary = s; else back = s; }
}

function snap(s) {
  let nz = 0, distinct = 0;
  const h = new Uint8Array(256);
  for (let y = 0; y < s.height; y++)
    for (let x = 0; x < s.width; x++) {
      const v = heap.bytes[s.bytes + y * s.pitch + x];
      h[v]++;
      if (v !== 0) nz++;
    }
  for (let v = 0; v < 256; v++) if (h[v] > 0) distinct++;
  return { nz, distinct };
}

// Wrap state.fnDispatch.get(wndProcAddr) calls per slot, but the harness'
// runTick already does this — instead, hook each wndProc and log slot index.

let slotCallNum = 0;
const wndProcs = [0x42b079, 0x42afb5, 0x429f6c];
for (const a of wndProcs) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  state.fnDispatch.set(a, function (...args) {
    slotCallNum++;
    const idx = slotCallNum;
    const pre = snap(back);
    let ok = true, err = null;
    try { const r = orig(...args); return r; }
    catch (e) { ok = false; err = e; throw e; }
    finally {
      const post = snap(back);
      console.log(`[slot#${idx}] wndProc=0x${a.toString(16)} ${ok?"OK":"EXC:"+err?.message?.slice(0,50)} | back delta: nz ${pre.nz}->${post.nz} (Δ${post.nz-pre.nz})  distinct ${pre.distinct}->${post.distinct}`);
    }
  });
}

// Also hook 40179d (the presenter)
const orig40179d = state.fnDispatch.get(0x40179d);
state.fnDispatch.set(0x40179d, function (...args) {
  const preB = snap(back), preP = snap(primary);
  let r;
  try { r = orig40179d(...args); }
  catch (e) { console.log(`40179d threw: ${e.message?.slice(0,80)}`); throw e; }
  const postB = snap(back), postP = snap(primary);
  console.log(`40179d: back nz ${preB.nz}->${postB.nz}, primary nz ${preP.nz}->${postP.nz}`);
  return r;
});

console.log(`\n=== Pre-tick ===  back nz=${snap(back).nz} primary nz=${snap(primary).nz}`);
try { r.runTick(); } catch {}
console.log(`=== Post-tick === back nz=${snap(back).nz} primary nz=${snap(primary).nz}`);

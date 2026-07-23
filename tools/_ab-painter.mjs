#!/usr/bin/env node
// tools/_ab-painter.mjs — RE-ENTRANCY-SAFE per-crossing A/B oracle for painter
// functions whose JS body makes callBridge sub-calls that RE-ENTER the same
// address (e.g. 0x421d2c's water-edge walkers repaint neighbour tiles through
// 0x421d2c). The naive A/B shared its save/afterA snapshot buffers across
// crossings, so a nested crossing clobbered the outer comparison and produced
// CONTRADICTORY readings (the callBridge-oracle bug, ADDENDUM 89). The fix is
// an `inside` guard (as tools/_lockstep-cn.mjs already has): a nested crossing
// runs the production hook plainly and is not compared, so the outer buffers
// survive. Per crossing: snapshot heap, run the production hook (JS body),
// snapshot, restore, run the FULL binary body via the interpreter (native,
// left live), diff heap[0,CMP_END); bucket divergences by tile-shape.
//   ADDR=0x421d2c SCEN=sc2.SC4 T=3 node tools/_ab-painter.mjs
// The old dbg-421d2c.mjs shared save/afterA across crossings; paintBody's
// callBridge sub-painters re-enter 0x421d2c, clobbering the outer buffers.
// This version guards with `inside` (like tools/_lockstep-cn.mjs): a nested
// crossing runs the production hook plainly and is NOT compared.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis.__scenarioFile = (process.env.SCEN || "sc2.sc4").toLowerCase();
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "/runtime/harness.js");
const { getEipHook, setEipHook, clearEipHook, step } = await import(ROOT + "/harness/x86.js");
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(ROOT + "/web/assets/" + n)); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const scen = process.env.SCEN || "sc2.SC4";
vfs.set(scen.toLowerCase(), readFileSync(ROOT + "/web/assets/" + scen));
const r = createRuntime({ dataBin: readFileSync(ROOT + "/decompiled/data.bin"), vfs, exeBytes: readFileSync(ROOT + "/binary/rct.exe") });
const heap = r.heap, bytes = heap.bytes;
try { r.runInit(); } catch{} try { r.runTick(); } catch{}
skipFadeIn(heap); enterScenarioPlay(heap);
const CMP_END = bytes.byteLength - 64*1024;
const save = new Uint8Array(bytes.byteLength), afterA = new Uint8Array(bytes.byteLength);
const ADDR = parseInt(process.env.ADDR || "0x421d2c", 16) >>> 0;
let calls = 0, memMis = 0, inside = false;
const diffs = {};
const prev = getEipHook(ADDR);
setEipHook(ADDR, (c) => {
  if (inside) { return prev(c); }              // nested crossing: run plainly, no compare
  inside = true;
  try {
    calls++;
    const esi = c.regs.esi >>> 0;
    const r0 = {eax:c.regs.eax>>>0,ecx:c.regs.ecx>>>0,edx:c.regs.edx>>>0,ebx:c.regs.ebx>>>0,esi,edi:c.regs.edi>>>0,ebp:c.regs.ebp>>>0,esp:c.regs.esp>>>0};
    save.set(bytes);
    prev(c);                                   // leg A: production hook (JS)
    afterA.set(bytes);
    bytes.set(save);                           // restore for leg B
    c.regs.eax=r0.eax;c.regs.ecx=r0.ecx;c.regs.edx=r0.edx;c.regs.ebx=r0.ebx;c.regs.esi=r0.esi;c.regs.edi=r0.edi;c.regs.ebp=r0.ebp;c.regs.esp=r0.esp;
    const self = getEipHook(ADDR); clearEipHook(ADDR);
    const espE = c.regs.esp>>>0; c.regs.eip = ADDR; let n = 0;
    while (!((c.regs.esp>>>0)===espE && bytes[c.regs.eip>>>0]===0xc3)) { if(!step(c)||++n>50_000_000) break; }
    setEipHook(ADDR, self);                     // leg B: native, left live
    for (let i=0;i<CMP_END;i++) if (afterA[i]!==bytes[i]) {
      memMis++;
      const e5 = save[esi+5];
      const key = `e5=${e5.toString(16)} e5hi=${(e5&0xe0)?1:0} water=${(e5&0x1f)?1:0} c6=${save[esi+6]&7} corner=${(save[esi+7]&0xf)?1:0} @0x${i.toString(16)}`;
      diffs[key] = (diffs[key]||0)+1;
      break;
    }
  } finally { inside = false; }
});
const T = parseInt(process.env.T || "3", 10);
for (let i=0;i<T;i++){ try{ r.runTick(); }catch{} }
clearEipHook(ADDR);
console.log(`SCEN=${scen} calls=${calls} memMis=${memMis}`);
for (const [k,v] of Object.entries(diffs).sort((a,b)=>b[1]-a[1]).slice(0,8)) console.log(`  ${String(v).padStart(5)}x ${k}`);

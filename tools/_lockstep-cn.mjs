#!/usr/bin/env node
// tools/_lockstep-cn.mjs — differential oracle for eip-HOOKED fns reached via
// callNative/tail-jmp (ADDENDUM 86). tools/_lockstep-auto.mjs reports
// NOT-REACHED for this class (it instruments the fnDispatch path; these fns
// are dispatched by runFunction's eip-hook fast-path from an interp CALL, not
// through fnDispatch), so this tool installs the comparison hook DIRECTLY and
// drives it with a real scenario soak. Per crossing: snapshot heap+regs, run
// the JS leg (fold numeric return into eax), restore, run the interp leg to
// its top-level ret (left live), diff heap[0,CMP_END)+eax. memMis is the gate.
//   ADDR=0x43c210 SCEN=sc11.SC4 T=80 node tools/_lockstep-cn.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis.__scenarioFile = (process.env.SCEN || "sc11.sc4").toLowerCase();
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "/runtime/harness.js");
const { getEipHook, setEipHook, clearEipHook, step } = await import(ROOT + "/harness/x86.js");
const { regs } = await import(ROOT + "/runtime/regs.js");
const HEX = (process.env.ADDR || "0x43c210").replace(/^0x/, "");
const mod = await import(ROOT + "/ported/auto/" + HEX + ".js");
const JSFN = mod["FUN_00" + HEX] || mod["FUN_" + HEX];
if (typeof JSFN !== "function") { console.log(`no FUN export for 0x${HEX}`); process.exit(1); }
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(ROOT + "/web/assets/" + n)); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
vfs.set(globalThis.__scenarioFile, readFileSync(ROOT + "/web/assets/" + process.env.SCEN));
const r = createRuntime({ dataBin: readFileSync(ROOT + "/decompiled/data.bin"), vfs, exeBytes: readFileSync(ROOT + "/binary/rct.exe") });
const heap = r.heap, bytes = heap.bytes;
try { r.runInit(); } catch{} try { r.runTick(); } catch{}
skipFadeIn(heap); enterScenarioPlay(heap);
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);
const ADDR = parseInt("0x" + HEX, 16) >>> 0;
let calls = 0, memMis = 0, eaxMis = 0, jsThrew = 0, inside = false, firstDiff = null;
const runInterp = (c) => {
  const self = getEipHook(ADDR); clearEipHook(ADDR);
  const entryEsp = c.regs.esp >>> 0; c.regs.eip = ADDR; let n = 0;
  try { while (!((c.regs.esp>>>0)===entryEsp && bytes[c.regs.eip>>>0]===0xc3)) { if(!step(c)||++n>50_000_000) break; } }
  finally { if (self) setEipHook(ADDR, self); }
};
const prev = getEipHook(ADDR);
setEipHook(ADDR, (c) => {
  if (inside) { runInterp(c); return; }
  inside = true;
  try {
    calls++;
    const r0 = {eax:c.regs.eax>>>0,ecx:c.regs.ecx>>>0,edx:c.regs.edx>>>0,ebx:c.regs.ebx>>>0,esi:c.regs.esi>>>0,edi:c.regs.edi>>>0,ebp:c.regs.ebp>>>0,esp:c.regs.esp>>>0};
    save.set(bytes);
    // leg A: JS
    regs.eax=r0.eax;regs.ecx=r0.ecx;regs.edx=r0.edx;regs.ebx=r0.ebx;regs.esi=r0.esi;regs.edi=r0.edi;regs.ebp=r0.ebp;regs.esp=r0.esp;
    let jsEax=0, threw=false;
    try { const ret=JSFN(heap); if(typeof ret==="number") regs.eax=ret>>>0; jsEax=regs.eax>>>0; } catch(e){ threw=true; jsThrew++; if(!firstDiff) firstDiff="THREW: "+e.message.slice(0,60); }
    afterJS.set(bytes);
    // leg B: interp truth, left live
    bytes.set(save);
    c.regs.eax=r0.eax;c.regs.ecx=r0.ecx;c.regs.edx=r0.edx;c.regs.ebx=r0.ebx;c.regs.esi=r0.esi;c.regs.edi=r0.edi;c.regs.ebp=r0.ebp;c.regs.esp=r0.esp;
    runInterp(c);
    if(!threw){
      if(jsEax !== (c.regs.eax>>>0)) eaxMis++;
      for(let i=0;i<CMP_END;i++){ if(afterJS[i]!==bytes[i]){ memMis++; if(!firstDiff) firstDiff=`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`; break; } }
    }
  } finally { inside=false; }
});
const T = parseInt(process.env.T || "60", 10);
for(let i=0;i<T;i++){ try{ r.runTick(); }catch{} }
clearEipHook(ADDR);
console.log(`ADDR=0x${HEX} SCEN=${process.env.SCEN||"sc11.SC4"}: calls=${calls} memMis=${memMis} eaxMis=${eaxMis} jsThrew=${jsThrew}${firstDiff?" first="+firstDiff:""}`);

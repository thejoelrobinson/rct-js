import { readFileSync } from "fs";
import { resolve } from "path";
const ROOT = process.cwd();
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT,"web/assets",n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT,"decompiled/data.bin")), vfs });
try{r.runInit();}catch{} try{r.runTick();}catch{}
skipFadeIn(r.heap); enterScenarioPlay(r.heap); try{r.runTick();}catch{}
const b = r.heap.bytes, CMP_END = b.byteLength - 64*1024;
console.log("byteLength=0x"+b.byteLength.toString(16), "CMP_END=0x"+CMP_END.toString(16));
let runStart=-1, found=[];
for (let a=0x780000; a<CMP_END && found.length<4; a++){
  if (b[a]===0){ if(runStart<0)runStart=a; if(a-runStart>=63){ found.push(runStart); a=runStart+0x200; runStart=-1; } }
  else runStart=-1;
}
console.log("zero-runs(>=64B) @", found.map(a=>"0x"+a.toString(16)).join(" "));
const dv=new DataView(b.buffer);
const d=[]; for(let i=0;i<6;i++) d.push(dv.getInt32(0x5ee9f8+i*4,true));
console.log("DAT_005ee9f8[0..5] =", d.join(" "));
const e=[]; for(let i=0;i<6;i++) e.push(dv.getInt32(0x5ee9e0+i*4,true));
console.log("DAT_005ee9e0[0..5] =", e.join(" "));

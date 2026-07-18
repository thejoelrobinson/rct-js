// Instrument which dl/dh/eax-mode arms 0x5da274 takes during the soak.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t=1700000000000; Date.now=()=>++_t;
if (typeof performance!=="undefined") performance.now=()=>Date.now()-1700000000000;
globalThis._renderTrace=()=>{};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { getEipHook, setEipHook } = await import("../harness/x86.js");
const VFS=["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs=new Map();
for(const n of VFS){try{vfs.set(n.toLowerCase(),readFileSync(resolve(ROOT,"web/assets",n)));}catch{}}
for(const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"])vfs.set(n.toLowerCase(),new Uint8Array(0));
const r=createRuntime({dataBin:readFileSync(resolve(ROOT,"decompiled/data.bin")),vfs});
try{r.runInit();}catch{}try{r.runTick();}catch{}
skipFadeIn(r.heap); enterScenarioPlay(r.heap);
const prod=getEipHook(0x5da274);
const dlSeen=new Map(), dhSeen=new Map();
setEipHook(0x5da274,(c)=>{
  const dl=c.regs.edx&0xff, dh=(c.regs.edx>>>8)&0xff;
  dlSeen.set(dl,(dlSeen.get(dl)||0)+1);
  dhSeen.set(`${dl}/${dh}`,(dhSeen.get(`${dl}/${dh}`)||0)+1);
  return prod(c);
});
for(let i=0;i<8;i++){try{r.runTick();}catch(e){console.log('tick',i,'ERR',e.message);}}
console.log("dl values:", [...dlSeen.entries()].sort((a,b)=>a[0]-b[0]).map(([k,v])=>`dl=${k}:${v}`).join(" "));
console.log("dl/dh pairs:", [...dhSeen.entries()].map(([k,v])=>`${k}:${v}`).join(" "));

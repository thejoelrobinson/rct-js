// Single-sprite isolation: capture each blit's exact entry state (regs +
// scratch globals), then replay each blit through JS and through the x86
// interpreter on a BLANK surface from the identical state, and diff the two
// sprite outputs. No overdraw, no segmentation, no convention mismatch — a
// clean per-sprite JS-vs-binary comparison. Requires the capture wrapper in
// ported/auto/9b438b.js (delegating to 9b438b_impl.js).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = process.cwd();
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
globalThis.__capAll = false;
globalThis.__capRegs = [];
globalThis.__capScratch = [];
globalThis.__capDpi = [];

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { regs } = await import("../runtime/regs.js");
const { FUN_009b438b: jsImpl } = await import("../ported/auto/9b438b_impl.js");
const { makeCpu, runFunction } = await import("../harness/x86.js");

const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {} skipFadeIn(r.heap);

const W = 640, H = 480, NPX = W * H;
let cands = [];
for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
const surf = Math.max(...cands);
const bytes = r.heap.bytes;

// Snapshot the static heap (post-fade, pre-tick-1), then capture per-blit state.
const boot = bytes.slice();
globalThis.__capAll = true;
try { r.runTick(); } catch {}
globalThis.__capAll = false;
const regsArr = globalThis.__capRegs, scratchArr = globalThis.__capScratch, dpiArr = globalThis.__capDpi;
const SLO = 0x9a2000, SLEN = 0x9ab000 - 0x9a2000;
console.log(`captured ${regsArr.length} blit states`);

const cpu = makeCpu(bytes); cpu.bailOnWildJump = true;
// Sequential replay: maintain the REAL accumulating surface (so tint/shadow
// sprites see the right dest). Per blit, restore scratch+DPI to its pre-state,
// run JS → keep JS's surface for the sequence; separately re-run from the same
// pre-state through the interpreter and diff.
function restoreState(n) {
  bytes.set(scratchArr[n], SLO);           // scratch globals as-of-before-blit-n
  const [dEdi,dBuf]=dpiArr[n]; bytes.set(dBuf, dEdi);   // per-strip DPI struct
}
function setRegs(o, [eax,ebx,ecx,edx,esi,edi,ebp]) { o.eax=eax;o.ebx=ebx;o.ecx=ecx;o.edx=edx;o.esi=esi;o.edi=edi;o.ebp=ebp; }
function surfStats() {
  let minR=1e9,maxR=-1,minC=1e9,maxC=-1,cnt=0; const idx=new Set();
  for(let p=0;p<NPX;p++){ const v=bytes[surf+p]; if(v!==0){ const row=(p/W)|0,col=p%W; if(row<minR)minR=row;if(row>maxR)maxR=row;if(col<minC)minC=col;if(col>maxC)maxC=col;cnt++;idx.add(v);} }
  return {cnt,bbox:`${minR},${maxR},${minC},${maxC}`,idx:[...idx]};
}

const N = regsArr.length;
const ONLY = process.env.ONLY !== undefined ? parseInt(process.env.ONLY,10) : -1;
// Start the surface from the captured pre-tick-1 state (blank-ish post-fade).
bytes.set(boot);
let diverged = [];
const aggPairs = {};
for (let n = 0; n < N; n++) {
  const before = bytes.slice(surf, surf + NPX);  // real pre-N surface
  // JS replay
  restoreState(n); setRegs(regs, regsArr[n]); try { jsImpl(r.heap); } catch {}
  const jsSurf = bytes.slice(surf, surf + NPX);
  // interp replay from the same pre-state
  bytes.set(before, surf); restoreState(n);
  setRegs(cpu.regs, regsArr[n]);
  cpu.eflags.CF=0;cpu.eflags.ZF=0;cpu.eflags.SF=0;cpu.eflags.OF=0; cpu.fpuTop=0;cpu.fpuTags=0xffff;cpu.fpuSw=0;
  try { runFunction(cpu, 0x9b438b, { stackTop: bytes.length, limit: 5_000_000 }); } catch {}
  // diff JS vs interp; only count pixels at least one of them touched
  let d=0, firstP=-1; const pairs={};
  for(let p=0;p<NPX;p++){ if(jsSurf[p]!==bytes[surf+p]){ d++; if(firstP<0)firstP=p; const k=`${jsSurf[p]}->${bytes[surf+p]}`; pairs[k]=(pairs[k]||0)+1; aggPairs[k]=(aggPairs[k]||0)+1; } }
  if (d>0) diverged.push({n,d,firstP});
  if (n === ONLY) {
    const sc=scratchArr[n]; const rc=(sc[0]|sc[1]<<8|sc[2]<<16|sc[3]<<24)>>>0; const fl=(sc[0x1c]|sc[0x1d]<<8|sc[0x1e]<<16|sc[0x1f]<<24)>>>0;
    console.log(`blit #${n}: ${d}px  REMAP_CLASS=0x${rc.toString(16)} FLAGS=0x${fl.toString(16)} (bit2/RLE=${(fl&4)?1:0}) entry=[${regsArr[n].map(x=>"0x"+x.toString(16)).join(" ")}]`);
    console.log("  JS_idx->IP_idx:", Object.entries(pairs).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([k,v])=>`${k}(${v})`).join(" "));
    // Is the diff explained by a small (dx,dy) shift of JS vs interp?
    const ip = bytes.slice(surf, surf+NPX);
    let best=null;
    for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){
      let mism=0;
      for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){ const a=jsSurf[(y+dy)*W+(x+dx)], b=ip[y*W+x]; if(a!==b)mism++; }
      if(!best||mism<best.m)best={dx,dy,m:mism};
    }
    console.log(`  best JS-shift to match interp: dx=${best.dx} dy=${best.dy} (mismatch ${best.m} vs ${d} at 0,0)`);
    // spatial crop around first divergence: JS vs IP indices
    const fr=(firstP/W)|0, fc=firstP%W;
    console.log(`  crop @ r${fr} c${fc} (JS / IP):`);
    for(let y=fr;y<Math.min(fr+6,H);y++){
      let jl="",il="";
      for(let x=fc-1;x<Math.min(fc+11,W);x++){ jl+=String(jsSurf[y*W+x]).padStart(4); il+=String(ip[y*W+x]).padStart(4); }
      console.log(`    ${jl}   |${il}`);
    }
  }
  // continue the JS sequence (the real render is the JS one)
  bytes.set(jsSurf, surf);
}
if (ONLY<0) {
  console.log(`\ndivergent blits: ${diverged.length}/${N}, total diff px: ${Object.values(aggPairs).reduce((a,b)=>a+b,0)}`);
  diverged.sort((a,b)=>b.d-a.d);
  console.log("top by diff size:");
  for(const {n,d,firstP} of diverged.slice(0,12)) console.log(`  #${n}: ${d}px (r${(firstP/W)|0},c${firstP%W})`);
  console.log("\nAGGREGATE JS_idx->IP_idx (top 15):");
  for(const [k,v] of Object.entries(aggPairs).sort((a,b)=>b[1]-a[1]).slice(0,15)) console.log(`  ${k.padEnd(12)} ${v}`);
}

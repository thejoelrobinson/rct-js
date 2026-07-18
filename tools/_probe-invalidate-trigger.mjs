// Where do the 421d2c fires come from -- the binary's internal paint inside
// 4385d8, or the harness synthetic full-screen pump? Split the count by
// instrumenting the onProgress phase boundaries. Then on the hitch tick,
// report which phase ballooned.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const R = join(dirname(fileURLToPath(import.meta.url)), '..');
globalThis.__p421=0; globalThis._renderTrace=(n)=>{ if(n==='FUN_extra_paint_421d2c') globalThis.__p421++; }; globalThis._gotoWarn=()=>{};
const ow=console.warn; console.warn=(...a)=>{const s=String(a[0]??'');if(/^\[/.test(s))return;ow(...a);};
const { createRuntime, skipFadeIn, skipTitleIntro } = await import(R+'/runtime/harness.js');
const { state } = await import(R+'/runtime/win32/context.js');
const { postWindowMessage } = await import(R+'/runtime/win32/user32.js');
const vfs=new Map(); const A=R+'/web/assets';
for (const f of readdirSync(A)) { const p=join(A,f); if(statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p))); }
for (const n of ['css10.dat','css12.dat','css16.dat','tutl.dat']) if(!vfs.has(n)) vfs.set(n,new Uint8Array(0));
const r=createRuntime({ dataBin: readFileSync(R+'/decompiled/data.bin'), vfs });
globalThis.__painterStepLimit=8_000_000;
r.runInit(); r.runTick(()=>{}); skipFadeIn(r.heap); skipTitleIntro(r.heap); r.runTick(()=>{});
const h=r.heap; const hwnd=state.firstHwnd||0;
const t0=Date.now(); let lT=0,lP=0; let f=0;
while(Date.now()-t0<14000){
  const t=Date.now()-t0;
  if(hwnd&&t-lT>=16){postWindowMessage(hwnd,0x113,1,0);lT=t;}
  if(hwnd&&t-lP>=33){postWindowMessage(hwnd,0x0F,0,0);lP=t;}
  // phase-split counters
  let phaseStart=globalThis.__p421; const phase={};
  let cur='pre';
  const onProg=(p)=>{ const now=globalThis.__p421; phase[cur]=(phase[cur]||0)+(now-phaseStart); phaseStart=now; cur=p; };
  const p0=globalThis.__p421; r.runTick(onProg); onProg('end');
  const fires=globalThis.__p421-p0;
  if(fires>2000){
    console.log(`HITCH f${f} total=${fires}`);
    const ents=Object.entries(phase).filter(([k,v])=>v>0).sort((a,b)=>b[1]-a[1]);
    for(const [k,v] of ents) console.log('   ', k, v);
    if(f>40) break;
  }
  f++;
}

// Pan the viewport each frame so NEW terrain (incl. sloped tiles) scrolls
// into view — the browser condition my static soak missed. Count the
// 421d2c slope-extra cold fallback fires and time the slow frames.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { dirname, resolve } from 'node:path'; import { fileURLToPath } from 'node:url'; const R=resolve(dirname(fileURLToPath(import.meta.url)),'..');
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
globalThis.__slopeFallback=0; // bumped by an instrumented hook below if present
r.runInit(); r.runTick(()=>{}); skipFadeIn(r.heap); skipTitleIntro(r.heap); r.runTick(()=>{});
const h=r.heap; const hwnd=state.firstHwnd||0;
// find viewport slot: scan window records for one with +8/+0xa view coords near (976,1304)
// reuse harness's VP slot: it set VP_SLOT0+8/+0xa. We pan by writing those.
// brute: search 0x009a013c.. for a record whose u16@+8==976
let vp=0; for(let rec=0x9a013c; rec<h.u32(0x9a1164); rec+=0x178){ if(h.u16(rec+8)===976 && h.u16(rec+0xa)===1304){vp=rec;break;} }
console.log('vp slot:', vp?('0x'+vp.toString(16)):'NOT FOUND');
const t0=Date.now(); let f=0,lT=0,lP=0; const slow=[];
let vx=976, vy=1304;
while(Date.now()-t0<32000){ const t=Date.now()-t0;
  if(vp){ vx=(vx+ (f%2?13:-7))&0xffff; vy=(vy+ (f%3?5:-11))&0xffff; h.setU16(vp+8,vx); h.setU16(vp+0xa,vy); }
  if(hwnd&&t-lT>=16){postWindowMessage(hwnd,0x113,1,0);lT=t;}
  if(hwnd&&t-lP>=33){postWindowMessage(hwnd,0x0F,0,0);lP=t;}
  const p0=globalThis.__p421; const ts=Date.now(); try{r.runTick(()=>{});}catch(e){} const ms=Date.now()-ts; const p421=globalThis.__p421-p0;
  if(ms>120) slow.push({f,ms,p421,atSec:((Date.now()-t0)/1000).toFixed(1)});
  if(f%30===0) globalThis.__normP421=p421;
  f++;
}
console.log('frames',f,'=',(f/32).toFixed(1),'fps; slopeFallbackFires:',globalThis.__slopeFallback);
console.log('slow>120ms:',slow.length); console.log('normal-frame 421d2c fires ~', globalThis.__normP421);
  for(const s of slow.slice(0,8)) console.log(`  f${s.f} @${s.atSec}s ${s.ms}ms 421d2c_fires=${s.p421}`);

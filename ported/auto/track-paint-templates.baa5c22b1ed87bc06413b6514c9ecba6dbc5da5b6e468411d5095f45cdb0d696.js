// @manual — do not regenerate. Complete single/paired-sprite track paint recipes.
import { TRACK_PAINT_TEMPLATES } from './track-paint-template-data.js';
import { ridePaintContext } from './ride-paint-context.js';
export function paintTrackTemplate(heap,cpu,config,invoke) {
 const {r,f,word,push,pop,logic,compare,addWord}=ridePaintContext(heap,cpu,invoke);
 const byte=(name,value,shift=0)=>{r[name]=((r[name]&~(255<<shift))|((value&255)<<shift))>>>0;};
 const call=(target,ret)=>{push(ret);invoke(heap,cpu,target,ret);r.esp=(r.esp+4)>>>0;};
 r.ebx=logic((heap.u32(0x6522e8)|config.sprite)>>>0);
 if(config.mirror && logic(heap.u8(r.esi)&0x80,8)) {
   const before=r.ebx;r.ebx=(before+config.mirror)>>>0;
   Object.assign(f,{CF:+(before+config.mirror>0xffffffff),ZF:+(r.ebx===0),SF:r.ebx>>>31,OF:(~(before^config.mirror)&(before^r.ebx))>>>31});
 }
 const addSprite=delta=>{
   const before=r.ebx,amount=delta>>>0;r.ebx=(before+amount)>>>0;
   Object.assign(f,{CF:+(before+amount>0xffffffff),ZF:+(r.ebx===0),SF:r.ebx>>>31,OF:(~(before^amount)&(before^r.ebx))>>>31});
 };
 const paint=recipe=>{
   const [x,y,width,depth,height]=recipe.shape;
   byte('eax',x);byte('ecx',y);word('edi',width);word('esi',depth);byte('eax',height,8);
   heap.setU16(0x99a4e8,recipe.bounds[0]);heap.setU16(0x99a4ea,recipe.bounds[1]);
   if(recipe.raised)addWord('edx',recipe.raised);
   heap.setU16(0x99a4ec,r.edx);
   if(recipe.raised){compare(r.edx&65535,recipe.raised,16);word('edx',r.edx-recipe.raised);}
   r.ebp=heap.u32(0x991f88);call(heap.u32(recipe.paintTable+r.ebp*4),recipe.paintRet);
 };
 if(config.second?.saved)push(r.ebx);
 paint(config);
 if(config.second){
   if(config.second.saved)r.ebx=pop();
   if(config.second.parent){if(f.CF)r.ebp=logic(0);heap.setU32(0x99a4f0,r.ebp);}
   if(config.second.saved)addSprite(config.second.delta);
   else r.ebx=logic((heap.u32(0x6522e8)|config.second.sprite)>>>0);
   paint(config.second);
 }
 word('eax',config.supportZero?logic(0,16):config.support);
 if(config.supportEbx!==null)r.ebx=config.supportEbx;
 r.edi=config.supportEdi;r.ebp=heap.u32(0x6522ec);call(config.supportTarget,config.supportRet);
 const exclude=()=>{for(const address of config.segments)heap.setU16(address,65535);};
 if(config.segmentsBeforeTunnel)exclude();
 if(config.tunnel!==null){
   r.edi=heap.u8(config.tunnel.counter);r.eax=0xffffffff;word('eax',((r.edx+config.tunnel.offset)&65535)>>>4);byte('eax',config.tunnel.kind,8);
   heap.setU32(config.tunnel.buffer+r.edi*2,r.eax);heap.setU8(config.tunnel.counter,r.edi+1);
 }
 if(!config.segmentsBeforeTunnel)exclude();
 addWord('edx',config.height);compare(heap.u16(0x991f28),r.edx&65535,16);
 if(f.SF!==f.OF){heap.setU16(0x991f28,r.edx);heap.setU8(0x991f2a,0x20);}
 r.esi=pop();
}
export function installTrackPaintTemplates(heap,setEipHook,getEipHook,clearEipHook,step) {
 for(const [key,config] of Object.entries(TRACK_PAINT_TEMPLATES)) {
   const address=Number(key),flag='__forceInterpTrackPaintTemplates';
   (globalThis.__jsFnEipHooks||(globalThis.__jsFnEipHooks=new Map())).set(address,flag);
   setEipHook(address,cpu=>{
     const advance=ret=>{let n=0;do{if(!step(cpu)||++n>100000)throw new Error('track paint template did not return');}while(cpu.regs.eip!==ret);};
     if(globalThis[flag]||globalThis.__jsPaint===false){
       // Some recipes also match a suffix of a larger recipe. Suppress those
       // hooks while interpreting the outer body: their simulated RET would
       // otherwise skip the outer stop address and return to its caller.
       const suppressed=Object.keys(TRACK_PAINT_TEMPLATES).map(Number)
         .filter(a=>a>=address&&a<=config.ret).map(a=>[a,getEipHook(a)]);
       for(const [a] of suppressed)clearEipHook(a);
       try{advance(config.ret);}finally{for(const [a,hook] of suppressed)if(hook)setEipHook(a,hook);}
     }else paintTrackTemplate(heap,cpu,config,(h,c,target,ret)=>{c.regs.eip=target;c.callDepth++;advance(ret);c.regs.esp=(c.regs.esp-4)>>>0;});
   });
 }
}

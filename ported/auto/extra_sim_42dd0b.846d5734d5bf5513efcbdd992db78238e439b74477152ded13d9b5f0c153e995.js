// @manual — do not regenerate. Miscellaneous sprite animation at 42dd0b.
// Frame 11/16 selects the neighbor effect; frame 16 then releases the sprite.
export function advanceMiscAnimation(heap,cpu,invoke) {
 const r=cpu.regs,f=cpu.eflags;
 const add8=(address,amount,keepCarry=false)=>{
   const a=heap.u8(address),v=(a+amount)&255,cf=f.CF;heap.setU8(address,v);
   Object.assign(f,{CF:keepCarry?cf:+(a+amount>255),ZF:+(v===0),SF:v>>>7,OF:(~(a^amount)&(a^v))>>>7&1});
 };
 const cmp8=(a,b)=>{const v=(a-b)&255;Object.assign(f,{CF:+(a<b),ZF:+(v===0),SF:v>>>7,OF:((a^b)&(a^v))>>>7&1});};
 const testFlag=()=>{const v=heap.u8(r.esi+0x2f)&1;Object.assign(f,{CF:0,ZF:+(v===0),SF:0,OF:0});return v;};
 const call=(target,ret)=>{r.esp=(r.esp-4)>>>0;heap.setU32(r.esp,ret);invoke(heap,cpu,target,ret);r.esp=(r.esp+4)>>>0;};
 add8(r.esi+0x26,0xa0);if(!f.CF)return;
 call(0x5e5496,0x42dd17);add8(r.esi+0x27,1,true);
 cmp8(heap.u8(r.esi+0x27),11);if(f.ZF && testFlag())call(0x42e2b0,0x42dd2b);
 cmp8(heap.u8(r.esi+0x27),16);if(f.ZF && !testFlag())call(0x42e2b0,0x42dd3c);
 cmp8(heap.u8(r.esi+0x27),16);if(f.ZF)call(0x444d1f,0x42ddb8);
}
export function installMiscAnimation(heap,setEipHook,getEipHook,clearEipHook,step) {
 const address=0x42dd0b,flag='__forceInterp42dd0b';
 (globalThis.__jsFnEipHooks||(globalThis.__jsFnEipHooks=new Map())).set(address,flag);
 setEipHook(address,cpu=>{
   const advance=stop=>{let n=0;do{if(!step(cpu)||++n>100000)throw new Error('misc animation did not return');}while(!stop());};
   if(globalThis[flag]||globalThis.__jsPaint===false){
     const hook=getEipHook(address),esp=cpu.regs.esp;clearEipHook(address);
     try{advance(()=>cpu.regs.esp===esp && [0x42dd11,0x42dd42,0x42ddb8].includes(cpu.regs.eip));}finally{setEipHook(address,hook);}
   }else advanceMiscAnimation(heap,cpu,(h,c,target,ret)=>{
     c.regs.eip=target;c.callDepth++;advance(()=>c.regs.eip===ret);c.regs.esp=(c.regs.esp-4)>>>0;
   });
 });
}

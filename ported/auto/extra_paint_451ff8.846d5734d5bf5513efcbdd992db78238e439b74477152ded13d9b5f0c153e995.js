// @manual — do not regenerate. Large-scenery element painter, 451ff8..4521af.
import { ridePaintContext } from "./ride-paint-context.js";
import { paintBody432204 } from "./extra_paint_432204.js";
const SEGMENTS=[0x991f14,0x991f20,0x991f24,0x991f18,0x991f1c,0x991f08,0x991f0c,0x991f04,0x991f10];
export function paintLargeScenery(heap,cpu,invoke=(h,c,rotation)=>paintBody432204(h,c,rotation,false)) {
 const {r,f,word,push,pop,logic,compare}=ridePaintContext(heap,cpu,invoke);
 heap.setU8(0x991f78,10);word('edi',heap.u16(r.esi+4));r.ebp=r.edi&65535;r.edi&=0x3ff;r.ebp>>>=10;
 r.ebx=((r.ebp*4+heap.u16(0x632164+r.edi*8))&65535)+4;
 r.ebx=(r.ebx+r.ecx)>>>0;r.edi=heap.u32(0x631d74+r.edi*4);r.ebp*=9;r.edi=(r.edi+r.ebp)>>>0;
 r.eax=(heap.u8(r.esi+6)&31)<<17;r.ebx=(r.ebx|r.eax)>>>0;
 r.eax=(heap.u8(r.esi+7)&31)<<24>>>0;r.ebx=(r.ebx|r.eax|0xa0000000)>>>0;
 for(const n of ['ecx','edx','edi','esi'])push(r[n]);
 const height=Math.min(heap.u8(r.edi+6),128),reduced=(height-1)&255;
 r.eax=((r.eax&0xffff0000)|(reduced<<8))>>>0;r.ecx&=0xffffff00;
 // XOR AL/CL clear CF; DEC AH preserves it and defines the other flags.
 Object.assign(f,{CF:0,ZF:+(reduced===0),SF:reduced>>>7,OF:+(height===128)});
 word('edi',28);word('esi',28);heap.setU16(0x99a4e8,2);heap.setU16(0x99a4ea,2);heap.setU16(0x99a4ec,r.edx);
 r.ebp=heap.u32(0x991f88);push(0x45208b);invoke(heap,cpu,r.ebp);r.esp=(r.esp+4)>>>0;
 for(const n of ['esi','edi','edx','ecx'])r[n]=pop();
 word('edx',((heap.u8(r.esi+3)*4+15)&0xfff0));
 if(logic(heap.u16(r.edi+7)&0x20))return;
 const explicit=logic(heap.u16(r.edi+7)&0x40);
 for(const address of SEGMENTS){heap.setU16(address,explicit?r.edx:65535);if(explicit)heap.setU8(address+2,0x20);}
 compare(heap.u16(0x991f28),r.edx&65535,16);
 if(f.SF!==f.OF){heap.setU16(0x991f28,r.edx);heap.setU8(0x991f2a,0x20);}
}
export function installLargeScenery(heap,setEipHook,getEipHook,clearEipHook,step) {
 const address=0x451ff8,flag='__forceInterp451ff8';
 (globalThis.__jsFnEipHooks||(globalThis.__jsFnEipHooks=new Map())).set(address,flag);
 setEipHook(address,cpu=>{
   if(globalThis[flag]||globalThis.__jsPaint===false){
     const hook=getEipHook(address),esp=cpu.regs.esp;clearEipHook(address);
     try{let n=0;do{if(!step(cpu)||++n>100000)throw new Error('large scenery did not return');}while(cpu.regs.esp!==esp || ![0x452118,0x452119,0x4521af].includes(cpu.regs.eip));}
     finally{setEipHook(address,hook);}
   }else paintLargeScenery(heap,cpu);
 });
}

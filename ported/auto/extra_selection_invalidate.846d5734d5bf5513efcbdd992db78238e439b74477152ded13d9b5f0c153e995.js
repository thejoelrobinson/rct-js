// @manual — rct.exe 4363f1, 43642b and 5e5562: selection redraws.
import { regs } from '../../runtime/regs.js';
import { word, compare, logic } from './extra_ui_state.js';
import { FUN_005e117d_exact } from './5e117d.js';
const names=['eax','ebx','ecx','edx','esi','edi','ebp','esp'];
const signed=v=>v<<16>>16;
function preserved(body){const saved=Object.fromEntries(names.map(n=>[n,regs[n]]));try{body();return saved.eax>>>0;}finally{Object.assign(regs,saved);}}

export function invalidateSelectionRect(heap, invalidate=invalidateSelectionTile){
 return preserved(()=>{
  logic(heap.u16(0x99a020)&1);
  if(regs.zf)return;
  word('eax',heap.u16(0x99a022));
  do{
   word('ecx',heap.u16(0x99a026));
   do{
    invalidate(heap);
    word('ecx',regs.ecx+32);compare(regs.ecx&65535,heap.u16(0x99a028));
   }while(regs.zf||regs.sf!==regs.of);
   word('eax',regs.eax+32);compare(regs.eax&65535,heap.u16(0x99a024));
  }while(regs.zf||regs.sf!==regs.of);
 });
}
export function invalidateSelectionList(heap,invalidate=invalidateSelectionTile){
 return preserved(()=>{
  logic(heap.u16(0x99a020)&2);if(regs.zf)return;
  regs.esi=0;
  while(true){
   word('eax',heap.u16(0x99a02c+regs.esi*4));compare(regs.eax&65535,65535);
   if(regs.zf)return;
   word('ecx',heap.u16(0x99a02e+regs.esi*4));invalidate(heap);
   regs.esi=(regs.esi+1)>>>0;
  }
 });
}
export function invalidateSelectionTile(heap, invalidate=FUN_005e117d_exact){
 return preserved(()=>{
  let a=(regs.eax+16)&65535,b=(regs.ecx+16)&65535,c;
  // Each intermediate wraps at 16 bits before the signed projection shift.
  regs.ecx=heap.u32(0x991f88);
  switch(regs.ecx){
   case 0:c=a;a=(-a+b)&65535;b=(b+c)&65535;break;
   case 1:a=(-a)&65535;c=a;a=(a-b)&65535;b=(b+c)&65535;break;
   case 2:c=a;a=(a-b)&65535;b=(-b-c)&65535;break;
   case 3:c=a;a=(a+b)&65535;b=(-b+c)&65535;break;
   default:throw new Error('Invalid selection viewport rotation');
  }
  b=(signed(b)>>1)&65535;
  word('ecx',c);word('eax',a-32);word('ebx',b-0x420);
  word('edx',a+32);word('ebp',b+32);
  const bounds={eax:regs.eax,ebx:regs.ebx,edx:regs.edx,ebp:regs.ebp};
  for(let cursor=0x9a121c;;cursor=(cursor+4)>>>0){
   regs.edi=cursor;regs.esi=heap.u32(cursor);logic(regs.esi,32);
   if(regs.zf)return;
   const v=regs.esi,x=heap.u16(v+8),y=heap.u16(v+10);
   const right=(x+heap.u16(v+12))&65535,bottom=(y+heap.u16(v+14))&65535;
   const l=signed(bounds.eax),t=signed(bounds.ebx),r=signed(bounds.edx),bottomBound=signed(bounds.ebp);
   if(r<=signed(x)||bottomBound<=signed(y)||l>=signed(right)||t>=signed(bottom))continue;
   const zoom=heap.u8(v+16)&31;
   const project=(value,origin,screen)=>(signed(value-origin)>>zoom)+screen;
   Object.assign(regs,bounds);
   word('eax',project(Math.max(l,signed(x)),x,heap.u16(v+4)));
   word('ebx',project(Math.max(t,signed(y)),y,heap.u16(v+6)));
   word('edx',project(Math.min(r,signed(right)),x,heap.u16(v+4)));
   const bpBefore=(signed(Math.min(bottomBound,signed(bottom))-y)>>zoom)&65535;
   const screenY=heap.u16(v+6), bpResult=(bpBefore+screenY)&65535;
   word('ebp',bpResult);
   regs.cf=bpBefore+screenY>65535?1:0;regs.zf=bpResult===0?1:0;
   regs.sf=bpResult>>>15;regs.of=(~(bpBefore^screenY)&(bpBefore^bpResult))>>>15&1;
   const savedC=regs.ecx;
   regs.ecx=((regs.ecx&0xffffff00)|zoom)>>>0;
   word('edi',bottom);
   invalidate(heap);
   regs.ecx=savedC;Object.assign(regs,bounds);
  }
 });
}

// @manual — do not regenerate. Two station platform paint branches.
// Entry follows the caller's PUSH ESI; both branches restore it before RET.
import { ridePaintContext } from "./ride-paint-context.js";
const SEGMENTS=[0x991f20,0x991f14,0x991f1c,0x991f08,0x991f0c,0x991f04,0x991f10,0x991f18,0x991f24];
export function paintStationPlatform(heap,cpu,address,invoke) {
  const {r,f,word,push,pop,logic,compare,addWord}=ridePaintContext(heap,cpu,invoke);
  const first=address===0x49b800, delta=first?0:0x1fd;
  const byte=(name,value,high=false)=>{const shift=high?8:0;r[name]=((r[name]&~(255<<shift))|((value&255)<<shift))>>>0;};
  const call=(target,ret)=>{push(ret);invoke(heap,cpu,target,ret);r.esp=(r.esp+4)>>>0;};
  const paint=(table,ret)=>{r.ebp=heap.u32(0x991f88);call(heap.u32(table+r.ebp*4),ret);};
  const shape=(y,height,ah)=>{byte('eax',0);byte('ecx',y);word('edi',32);word('esi',height);byte('eax',ah,true);};
  r.ebx=logic((heap.u32(0x6522e8)|0x80007e02)>>>0);shape(0,20,1);
  heap.setU16(0x99a4e8,0);heap.setU16(0x99a4ea,6);
  addWord('edx',3);heap.setU16(0x99a4ec,r.edx);
  compare(r.edx&65535,3,16);word('edx',(r.edx&65535)-3);paint(0x432204,0x49b848+delta);
  r.ebx=logic(0x200091cc);shape(0,32,1);paint(0x431bb8,0x49b86e+delta);
  for(const [support,ret] of [[5,0x49b886],[8,0x49b89e]]) {
    word('eax',logic(0,16));r.ebx=support;r.edi=0;r.ebp=heap.u32(0x6522ec);call(0x423ffd,ret+delta);
  }
  for(const p of SEGMENTS)heap.setU16(p,65535);
  r.edi=heap.u8(0x99c165);r.eax=0xffffffff;word('eax',r.edx);
  word('eax',(r.eax&65535)>>>4);byte('eax',6,true);heap.setU32(0x999f9a+r.edi*2,r.eax);
  heap.setU8(0x99c165,r.edi+1);addWord('edx',5);
  r.ebx=logic((heap.u32(0x6522ec)|(first?0x9198:0x9192))>>>0);
  word('eax',heap.u16(0x991f72));word('ecx',heap.u16(0x991f76));
  word('eax',(r.eax&65535)>>>5);word('ecx',(r.ecx&65535)>>>5);byte('eax',r.ecx,true);
  r.esi=heap.u32(0x991f88);addWord('eax',heap.u16(0x49ab9e+r.esi*2));
  r.esi=heap.u32(r.esp);byte('ecx',heap.u8(r.esi+5));r.ecx=(r.ecx&0x70)>>>4;r.esi=heap.u8(r.esi+7)*0x260;
  compare(r.eax&65535,heap.u16(0x887462+r.esi+r.ecx*2),16);
  if(!f.ZF) {
    compare(r.eax&65535,heap.u16(0x88746a+r.esi+r.ecx*2),16);
    if(!f.ZF) {
      const before=r.ebx,amount=first?0xfffffffe:2;r.ebx=(before+amount)>>>0;
      Object.assign(f,{CF:+(before+amount>0xffffffff),ZF:+(r.ebx===0),SF:r.ebx>>>31,OF:(~(before^amount)&(before^r.ebx))>>>31});
    }
  }
  shape(0,8,1);paint(0x431bb8,0x49b98e+delta);
  r.ebx=logic((heap.u32(0x6522ec)|(first?0x9198:0x9192))>>>0);shape(24,8,1);paint(0x431bb8,0x49b9b5+delta);
  addWord('edx',2);r.ebx=logic((heap.u32(0x6522ec)|0x919a)>>>0);shape(31,1,7);paint(0x431bb8,0x49b9e0+delta);
  addWord('edx',25);compare(heap.u16(0x991f28),r.edx&65535,16);
  if(f.SF!==f.OF){heap.setU16(0x991f28,r.edx);heap.setU8(0x991f2a,0x20);}
  r.esi=pop();
}
export function installStationPlatforms(heap,setEipHook,getEipHook,clearEipHook,step) {
  for(const [address,end] of [[0x49b800,0x49b9fc],[0x49b9fd,0x49bbf9]]) {
    const flag=`__forceInterp${address.toString(16)}`;
    (globalThis.__jsFnEipHooks||(globalThis.__jsFnEipHooks=new Map())).set(address,flag);
    setEipHook(address,cpu=>{
      const advance=stop=>{let n=0;do{if(!step(cpu)||++n>100000)throw new Error('station platform call did not return');}while(cpu.regs.eip!==stop);};
      if(globalThis[flag]||globalThis.__jsPaint===false) {
        const hook=getEipHook(address);clearEipHook(address);
        try{advance(end);}finally{setEipHook(address,hook);}
      } else paintStationPlatform(heap,cpu,address,(h,c,target,ret)=>{
        c.regs.eip=target;c.callDepth++;advance(ret);c.regs.esp=(c.regs.esp-4)>>>0;
      });
    });
  }
}

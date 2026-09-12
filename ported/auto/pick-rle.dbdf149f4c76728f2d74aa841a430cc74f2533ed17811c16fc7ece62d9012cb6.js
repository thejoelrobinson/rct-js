// @manual — do not regenerate. RLE cursor hit testing, 9b380f/9b3c49/9b4102.
// Like the binary, tests encoded run coverage, not the run's pixel colours.
import { regs as r } from "../../runtime/regs.js";
export function canPickRle(heap) {
  const flags = heap.u16(0x8dc0c0 + (r.ebx & 0x1ffff) * 16);
  return !!(flags & 4) && !(heap.u16(r.edi + 14) && (flags & 0x10));
}
export function pickRle(heap) {
  const word = (n,v) => { r[n]=((r[n]&0xffff0000)|(v&65535))>>>0; };
  const logic = (v,bits=16) => { r.cf=r.of=0;r.zf=+(v===0);r.sf=v>>>(bits-1)&1;return v; };
  const sub = (a,b,bits=16) => {
    const v=((a-b)&(bits===32?0xffffffff:65535))>>>0;
    r.cf=+(a<b);r.zf=+(v===0);r.sf=v>>>(bits-1)&1;r.of=((a^b)&(a^v))>>>(bits-1)&1;return v;
  };
  const add = (a,b,bits=16) => {
    const v=((a+b)&(bits===32?0xffffffff:65535))>>>0;
    r.cf=+(a+b>(bits===32?0xffffffff:65535));r.zf=+(v===0);r.sf=v>>>(bits-1)&1;r.of=(~(a^b)&(a^v))>>>(bits-1)&1;return v;
  };
  const aw=(n,v)=>word(n,add(r[n]&65535,v));
  const sw=(n,v)=>word(n,sub(r[n]&65535,v));
  const le=()=>r.zf||r.sf!==r.of;
  const inc=(n,v)=>{const cf=r.cf;v===1?aw(n,1):sw(n,1);r.cf=cf;};
  const result=()=>r.eax>>>0;
  r.ebx=(r.ebx&0x1ffff)*16;
  const zoom=heap.u16(r.edi+14),shift=zoom===0?0:zoom===1?1:2;
  sub(zoom,1);
  if(shift) {
    if(logic(heap.u16(0x8dc0c0+r.ebx)&0x20))return result();
    logic(heap.u16(0x8dc0c0+r.ebx)&0x10);
  }
  r.eax=heap.u32(0x8dc0b4+r.ebx);r.ebp=heap.u32(0x8dc0b8+r.ebx);
  heap.setU32(0x9a2010,r.eax);heap.setU32(0x9a2014,r.ebp);
  r.eax=heap.u32(0x8dc0bc+r.ebx);r.ebp=heap.u32(0x8dc0c0+r.ebx);
  heap.setU32(0x9a2018,r.eax);heap.setU32(0x9a201c,r.ebp);
  logic(heap.u16(0x9a201c)&4);r.ebp=r.edi;r.esi=heap.u32(0x9a2010);
  aw('edx',heap.u16(0x9a201a));word('eax',heap.u16(0x9a2016));heap.setU16(0x9a2020,0);
  if(shift) {
    if(logic(r.eax&1)) {
      inc('eax',-1);if(r.zf)return result();
      const cf=r.cf;heap.setU16(0x9a2020,add(heap.u16(0x9a2020),1));r.cf=cf;
    }
    if(shift===2 && logic(r.eax&2)) {
      sw('eax',2);if(le())return result();heap.setU16(0x9a2020,add(heap.u16(0x9a2020),2));
    }
    word('edx',logic((r.edx&65535)&(65535<<shift)));
  }
  heap.setU16(0x9a202c,r.eax);sw('edx',heap.u16(r.ebp+6));
  if(r.sf) {
    heap.setU16(0x9a202c,add(heap.u16(0x9a202c),r.edx&65535));if(r.sf||r.zf)return result();
    heap.setU16(0x9a2020,sub(heap.u16(0x9a2020),r.edx&65535));word('edx',logic(0));
  }
  aw('edx',heap.u16(0x9a202c));sw('edx',1);
  if(!le()) {heap.setU16(0x9a202c,sub(heap.u16(0x9a202c),r.edx&65535));if(le())return result();}
  word('eax',heap.u16(0x9a2014));heap.setU32(0x9a2024,0);heap.setU16(0x9a2028,r.eax);
  aw('ecx',heap.u16(0x9a2018));if(shift)word('ecx',logic((r.ecx&65535)&(65535<<shift)));
  sw('ecx',heap.u16(r.ebp+4));
  if(r.sf) {
    heap.setU16(0x9a2028,add(heap.u16(0x9a2028),r.ecx&65535));if(r.sf||r.zf)return result();
    r.ecx=(r.ecx<<16>>16)>>>0;heap.setU32(0x9a2024,sub(heap.u32(0x9a2024),r.ecx,32));word('ecx',logic(0));
  }
  aw('ecx',heap.u16(0x9a2028));sw('ecx',1);
  if(!le()) {heap.setU16(0x9a2028,sub(heap.u16(0x9a2028),r.ecx&65535));if(le())return result();}
  const remap=logic((heap.u32(0x9a2000)&0x20000000)>>>0,32);
  if(remap || logic((heap.u32(0x9a2000)&0x40000000)>>>0,32))r.eax=logic(0,32);
  r.ebx=heap.u16(0x9a2020);r.ecx=logic(0,32);r.ebx=heap.u16(r.esi+r.ebx*2);r.ebx=add(r.ebx,r.esi,32);
  for(;;) {
    word('ecx',heap.u16(r.ebx));r.ebx=add(r.ebx,2,32);heap.setU8(0x9aa032,r.ecx);
    r.ecx=((r.ecx&0xffffff00)|logic(r.ecx&0x7f,8))>>>0;r.edx=logic(0,32);
    r.edx=r.ecx>>>8&255;r.ecx&=0xffff00ff;r.ebx=add(r.ebx,r.ecx,32);
    let skip=false;
    if(shift && logic(r.edx&1,8)) {inc('edx',1);inc('ecx',-1);skip=!!r.zf;}
    if(!skip && shift===2 && logic(r.edx&2,8)) {aw('edx',2);sw('ecx',2);skip=!!le();}
    if(!skip) {
      r.edx=sub(r.edx,heap.u32(0x9a2024),32);
      if(le()) {aw('ecx',r.edx&65535);skip=!!(r.sf||r.zf);if(!skip)word('edx',logic(0));}
      if(!skip) {
        aw('edx',r.ecx&65535);sw('edx',1);
        if(!le()) {sw('ecx',r.edx&65535);skip=!!le();}
        if(!skip && shift) {
          aw('ecx',(1<<shift)-1);const v=r.ecx&65535;
          word('ecx',v>>>shift);r.cf=v>>>(shift-1)&1;r.zf=+((r.ecx&65535)===0);r.sf=0;
          if(shift===1)r.of=v>>>15;skip=!!r.zf;
        }
        if(!skip){heap.setU8(0x99c164,1);return result();}
      }
    }
    if(logic(heap.u8(0x9aa032)&0x80,8))return result();
  }
}

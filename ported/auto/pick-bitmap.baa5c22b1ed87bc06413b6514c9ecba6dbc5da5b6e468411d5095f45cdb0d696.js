// @manual — do not regenerate. Uncompressed bitmap cursor hit testing at
// 0x9b35fa (zoom 0), 0x9b39e4 (zoom 1), and 0x9b3e87 (zoom >=2).
import { regs as r } from "../../runtime/regs.js";
export function canPickBitmap(heap) {
  const flags = heap.u16(0x8dc0c0 + (r.ebx & 0x1ffff) * 16);
  return !(flags & 6) && !(heap.u16(r.edi + 14) && (flags & 0x10));
}
export function pickBitmap(heap) {
  const word = (n, v) => { r[n] = ((r[n] & 0xffff0000) | (v & 65535)) >>> 0; };
  const logic = (v, bits = 16) => { r.cf = r.of = 0; r.zf = v === 0 ? 1 : 0; r.sf = v >>> (bits - 1) & 1; return v; };
  const sub = (a, b, bits = 16) => {
    const v = ((a - b) & (bits === 32 ? 0xffffffff : (1 << bits) - 1)) >>> 0;
    r.cf = a < b ? 1 : 0; r.zf = v === 0 ? 1 : 0; r.sf = v >>> (bits - 1) & 1; r.of = ((a ^ b) & (a ^ v)) >>> (bits - 1) & 1; return v;
  };
  const add = (a, b, bits = 16) => {
    const v = ((a + b) & (bits === 32 ? 0xffffffff : 65535)) >>> 0;
    r.cf = a + b > (bits === 32 ? 0xffffffff : 65535) ? 1 : 0; r.zf = v === 0 ? 1 : 0; r.sf = v >>> (bits - 1) & 1; r.of = (~(a ^ b) & (a ^ v)) >>> (bits - 1) & 1; return v;
  };
  const addWord = (n,v) => word(n,add(r[n]&65535,v));
  const subWord = (n,v) => word(n,sub(r[n]&65535,v));
  const result = () => r.eax >>> 0;
  r.ebx = (r.ebx & 0x1ffff) * 16;
  const zoom = heap.u16(r.edi + 14), shift = zoom === 0 ? 0 : zoom === 1 ? 1 : 2;
  sub(zoom,1);
  if (shift) {
    if (logic(heap.u16(0x8dc0c0+r.ebx) & 0x20)) return result();
    logic(heap.u16(0x8dc0c0+r.ebx) & 0x10);
  }
  r.eax = heap.u32(0x8dc0b4+r.ebx); r.ebp = heap.u32(0x8dc0b8+r.ebx);
  heap.setU32(0x9a2010,r.eax); heap.setU32(0x9a2014,r.ebp);
  r.eax = heap.u32(0x8dc0bc+r.ebx); r.ebp = heap.u32(0x8dc0c0+r.ebx);
  heap.setU32(0x9a2018,r.eax); heap.setU32(0x9a201c,r.ebp);
  logic(heap.u16(0x9a201c)&4); r.ebp = r.edi; r.esi = heap.u32(0x9a2010);
  addWord('edx',heap.u16(0x9a201a)); word('eax',heap.u16(0x9a2016));
  if (shift) {
    for (const bit of shift === 1 ? [1] : [1,2]) if (r.eax & bit) {
      r.ebx = heap.u16(0x9a2014) * bit; word('eax',r.eax-bit); r.esi = (r.esi+r.ebx)>>>0;
    }
    if (!logic(r.eax&65535)) return result();
    word('edx',logic((r.edx&65535)&(65535<<shift)));
  }
  heap.setU16(0x9a202c,r.eax); subWord('edx',heap.u16(r.ebp+6));
  if (r.sf) {
    heap.setU16(0x9a202c,add(heap.u16(0x9a202c),r.edx&65535));
    if (r.sf || r.zf) return result();
    word('edx',-(r.edx&65535)); word('eax',heap.u16(0x9a2014));
    r.eax = ((r.eax&65535)*(r.edx&65535))&65535; word('edx',0);
    r.esi = add(r.esi>>>0,r.eax,32);
  } else word('ebx',r.edx);
  addWord('edx',heap.u16(0x9a202c)); subWord('edx',1);
  if (!r.zf && r.sf === r.of) {
    heap.setU16(0x9a202c,sub(heap.u16(0x9a202c),r.edx&65535));
    if (r.zf || r.sf !== r.of) return result();
  }
  word('eax',heap.u16(0x9a2014)); heap.setU16(0x9a2028,r.eax); heap.setU16(0x9a202e,0);
  addWord('ecx',heap.u16(0x9a2018)); if (shift) word('ecx',logic((r.ecx&65535)&(65535<<shift)));
  subWord('ecx',heap.u16(r.ebp+4));
  if (r.sf) {
    heap.setU16(0x9a2028,add(heap.u16(0x9a2028),r.ecx&65535)); if (r.sf || r.zf) return result();
    heap.setU16(0x9a202e,sub(heap.u16(0x9a202e),r.ecx&65535)); r.ecx = (r.ecx<<16>>16)>>>0;
    r.esi = sub(r.esi>>>0,r.ecx,32); word('ecx',logic(0));
  }
  r.ecx &= 65535; addWord('ecx',heap.u16(0x9a2028)); subWord('ecx',1);
  if (!r.zf && r.sf === r.of) {
    heap.setU16(0x9a2028,sub(heap.u16(0x9a2028),r.ecx&65535)); if (r.zf || r.sf !== r.of) return result();
    heap.setU16(0x9a202e,add(heap.u16(0x9a202e),r.ecx&65535));
  }
  logic(heap.u16(0x9a201c)&2);
  r.eax = ((r.eax&0xffff00ff)|(heap.u8(0x9a202c)<<8))>>>0; r.edx = heap.i16(0x9a202e)>>>0; r.ebx=heap.u32(0x9a2000);
  if (logic((r.ebx&0x20000000)>>>0,32)) {
    if (!logic(heap.u16(0x9a201c)&1)) return result();
    r.ebx=heap.u32(0x9a200c); r.eax=heap.u8(r.esi); r.eax=heap.u8((r.ebx+r.eax)>>>0);
    if (logic(r.eax,8)) heap.setU8(0x99c164,1);
  } else if (!logic((r.ebx&0x40000000)>>>0,32)) {
    if (!logic(heap.u16(0x9a201c)&1)) {
      if (!shift) heap.setU8(0x99c164,1);
    } else { sub(heap.u8(r.esi),0,8); if (!r.zf) heap.setU8(0x99c164,1); }
  }
  return result();
}

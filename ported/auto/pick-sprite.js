// @manual — do not regenerate. 9b35fa dispatch, including alternate zoom sprites.
import { regs as r } from "../../runtime/regs.js";
import { canPickBitmap, pickBitmap } from "./pick-bitmap.js";
import { canPickRle, pickRle } from "./pick-rle.js";
import { FUN_009b35fa } from "./9b35fa.js";
export function pickSprite(heap) {
 const zoom=heap.u16(r.edi+14),scaled=(r.ebx&0x1ffff)*16,flags=heap.u16(0x8dc0c0+scaled);
 if(zoom && (flags&0x10) && !(flags&0x20)) {
   r.ebx=scaled;
   heap.setU16(r.edi+14,zoom-1);
   heap.setU16(r.edi+4,heap.i16(r.edi+4)>>1);heap.setU16(r.edi+6,heap.i16(r.edi+6)>>1);
   r.ebx=heap.u16(0x8dc0c2+scaled);
   const oldDx=r.edx;
   for(const n of ['ecx','edx'])r[n]=((r[n]&0xffff0000)|((r[n]<<16>>17)&65535))>>>0;
   // SAR DX,1 sets the flags entering the recursive child. The child's
   // dispatcher always overwrites arithmetic flags before using them.
   r.cf=oldDx&1;r.of=0;r.zf=+((r.edx&65535)===0);r.sf=r.edx>>>15&1;
   pickSprite(heap);
   heap.setU16(r.edi+14,heap.u16(r.edi+14)+1);
   for(const offset of [4,6]) {
     const before=heap.u16(r.edi+offset),value=before<<1&65535;heap.setU16(r.edi+offset,value);
     r.cf=before>>>15;r.zf=+(value===0);r.sf=value>>>15;r.of=r.cf^r.sf;
   }
   return r.eax>>>0;
 }
 return canPickBitmap(heap)?pickBitmap(heap):canPickRle(heap)?pickRle(heap):FUN_009b35fa(heap);
}

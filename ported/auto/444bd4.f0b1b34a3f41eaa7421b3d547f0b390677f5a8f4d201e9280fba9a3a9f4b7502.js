// @manual — do not regenerate. Allocate from the free list, reserving capacity
// for non-miscellaneous sprites exactly as the original signed-word tests do.
import { regs } from "../../runtime/regs.js";
import { FUN_00444c74 } from "./444c74.js";
export function FUN_00444bd4(heap) {
  const savedECX = regs.ecx, misc = (regs.ebx & 2) !== 0;
  const free = heap.i16(0x87c3a0);
  if (misc ? ((300 - heap.u16(0x87c3a6)) << 16 >> 16) >= free : free <= 0) {
    regs.esi = 0; regs.cf = regs.sf = regs.of = 0; regs.zf = 1;
    return regs.eax >>> 0;
  }
  regs.esi = 0x743b94 + heap.u16(0x87c394) * 256;
  regs.ecx = misc ? 6 : 10;
  FUN_00444c74(heap);
  const sprite = regs.esi;
  heap.setU16(sprite + 0xe, 0x8000); heap.setU16(sprite + 0x10, 0x8000);
  heap.setU16(sprite + 0x12, 0);
  const head = heap.u16(0x999f8e);
  heap.setU16(0x999f8e, heap.u16(sprite + 0xa)); heap.setU16(sprite + 2, head);
  heap.setU16(sprite + 0x22, 0); heap.setU8(sprite + 0x14, 0x10);
  heap.setU8(sprite + 9, 0x14); heap.setU8(sprite + 0x15, 8);
  heap.setU16(sprite + 0xc, 0); heap.setU16(sprite + 0x16, 0x8000);
  regs.ecx = savedECX; regs.cf = regs.of = regs.zf = 0; regs.sf = sprite >>> 31;
  return regs.eax >>> 0;
}

// @manual — do not regenerate. Move a sprite between the six indexed lists.
import { regs } from "../../runtime/regs.js";
export function FUN_00444c74(heap) {
  const sprite = regs.esi >>> 0, target = regs.ecx >>> 0;
  const previousList = heap.u8(sprite + 8);
  if ((target & 255) === previousList) {
    regs.cf = regs.sf = regs.of = 0; regs.zf = 1;
    return regs.eax >>> 0;
  }
  const next = heap.u16(sprite + 4), previous = heap.u16(sprite + 6);
  heap.setU16(previous === 0xffff ? 0x87c394 + previousList : 0x743b98 + previous * 256, next);
  if (next !== 0xffff) heap.setU16(0x743b9a + next * 256, previous);
  heap.setU16(sprite + 6, 0xffff); heap.setU8(sprite + 8, target);
  const head = heap.u16(0x87c394 + target), index = heap.u16(sprite + 10);
  heap.setU16(0x87c394 + target, index); heap.setU16(sprite + 4, head);
  if (head !== 0xffff) heap.setU16(0x743b9a + head * 256, index);
  heap.setU16(0x87c3a0 + previousList, heap.u16(0x87c3a0 + previousList) - 1);
  const count = heap.u16(0x87c3a0 + target), result = (count + 1) & 65535;
  heap.setU16(0x87c3a0 + target, result);
  // INC preserves CF from the preceding head comparison / pointer addition.
  regs.cf = 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15; regs.of = count === 0x7fff ? 1 : 0;
  return regs.eax >>> 0;
}

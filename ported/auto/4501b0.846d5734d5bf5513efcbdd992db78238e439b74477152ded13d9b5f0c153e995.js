// @manual — do not regenerate.
import { regs } from "../../runtime/regs.js";

export function FUN_004501b0(heap) {
  const incremented = heap.u8(0x8ae948) + 1;
  const index = incremented >= 255 ? 0 : incremented;
  heap.setU8(0x8ae948, index);
  regs.ebx = index * 0x260;
  const type = heap.u8(0x887420 + regs.ebx);
  if (type === 255) {
    regs.cf = 0;
    regs.zf = 1;
    regs.sf = 0;
    regs.of = 0;
  } else {
    const status = heap.u8(0x887441 + regs.ebx);
    regs.cf = 0;
    regs.zf = status === 0 ? 1 : 0;
    regs.sf = status >>> 7;
    regs.of = 0;
    if (status !== 0) heap.setU8(0x8ae949, 1);
  }
  return regs.eax >>> 0;
}

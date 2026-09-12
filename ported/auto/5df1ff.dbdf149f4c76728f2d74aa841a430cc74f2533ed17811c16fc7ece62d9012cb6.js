// @manual — do not regenerate.
import { regs } from "../../runtime/regs.js";

export function FUN_005df1ff(heap) {
  const address = (regs.esi + 5) >>> 0;
  const previous = heap.u8(address);
  const incremented = (previous + 1) & 0xff;
  const value = incremented || 0xff;
  heap.setU8(address, value);
  regs.zf = 0;
  regs.sf = value >>> 7;
  regs.of = previous === 0x7f ? 1 : 0;
  return regs.eax >>> 0;
}

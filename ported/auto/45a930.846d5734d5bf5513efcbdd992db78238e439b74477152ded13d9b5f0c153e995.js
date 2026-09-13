// @manual — do not regenerate.
// Release a user-string slot: 0x45a930..0x45a94b. Only its first BYTE is cleared.
import { regs } from "../../runtime/regs.js";
function compare(a, b) {
  const result = (a - b) & 65535;
  regs.cf = a < b ? 1 : 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15; regs.of = ((a ^ b) & (a ^ result)) >>> 15 & 1;
}
export function FUN_0045a930(heap) {
  const id = regs.eax & 65535;
  compare(id, 0x8000);
  if (!regs.cf) {
    compare(id, 0x9000);
    if (regs.cf) {
      const index = regs.eax & 0x3ff;
      // AND sets ZF/SF, while IMUL only replaces CF/OF (no signed overflow).
      regs.zf = index === 0 ? 1 : 0; regs.sf = regs.cf = regs.of = 0;
      regs.eax = index * 32;
      heap.setU8(0x87f41c + regs.eax, 0);
    }
  }
  return regs.eax >>> 0;
}

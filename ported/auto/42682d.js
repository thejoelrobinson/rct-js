// @manual — do not regenerate.
import { regs } from "../../runtime/regs.js";
import { FUN_005e585a_exact } from "./5e585a.js";

export function FUN_0042682d(heap) {
  const coordinate = regs.ecx & 0xffff;
  const packed = (((coordinate << 7) | (coordinate >>> 9)) | (regs.eax & 0xffff)) & 0xffff;
  const index = ((packed >>> 5) | (packed << 11)) & 0xffff;
  let element = heap.u32(0x971ef4 + index * 4);
  while (true) {
    if ((regs.edx & 0xff) === heap.u8(element + 2)) {
      const type = heap.u8(element) & 0x3c;
      regs.ebx = ((regs.ebx & 0xffffff00) | type) >>> 0;
      if (type === 0x10 && heap.u8(element + 4) === 2 && (heap.u8(element + 5) & 0xf) === 0) break;
    }
    element = (element + 8) >>> 0;
    if (heap.u8((element - 7) >>> 0) & 0x80) {
      regs.esi = element;
      regs.cf = 1; regs.zf = 0; regs.sf = 1; regs.of = 0;
      return regs.eax >>> 0;
    }
  }
  const savedEdi = regs.edi >>> 0;
  const height = heap.u8(element + 2) * 4;
  regs.esi = ((element & 0xffff0000) | (height + 0x40)) >>> 0;
  regs.edi = ((savedEdi & 0xffff0000) | (height + 0x30)) >>> 0;
  FUN_005e585a_exact(heap);
  regs.esi = element;
  regs.edi = savedEdi;
  regs.cf = 0; regs.zf = (regs.eax >>> 0) === 0 ? 1 : 0;
  regs.sf = regs.eax >>> 31; regs.of = 0;
  return regs.eax >>> 0;
}

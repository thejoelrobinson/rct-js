// @manual — do not regenerate. Release list membership, name and spatial link.
import { regs } from "../../runtime/regs.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_0045a930 } from "./45a930.js";
export function FUN_00444d1f(heap) {
  const savedECX = regs.ecx, savedEAX = regs.eax, sprite = regs.esi >>> 0;
  regs.ecx = 0; FUN_00444c74(heap); regs.ecx = savedECX;
  regs.eax = ((savedEAX & 0xffff0000) | heap.u16(sprite + 0x22)) >>> 0;
  FUN_0045a930(heap); regs.eax = savedEAX;
  heap.setU8(sprite, 0xff);
  const x = heap.u16(sprite + 0xe), y = heap.u16(sprite + 0x10);
  const cell = x === 0x8000 ? 0x4000 : ((x & 0xfe0) << 2) | (y >>> 5);
  let link = 0x991f8e + cell * 2;
  let remaining = 65536;
  while (0x743b94 + heap.u16(link) * 256 !== sprite) {
    // The interpreter eventually hits its instruction budget on a corrupt
    // chain. Bound the JS walk too; a valid list cannot repeat 16-bit ids.
    if (heap.u16(link) === 0xffff || --remaining === 0) throw new Error(`sprite 0x${sprite.toString(16)} absent from spatial chain`);
    link = 0x743b96 + heap.u16(link) * 256;
  }
  heap.setU16(link, heap.u16(sprite + 2));
  regs.cf = regs.sf = regs.of = 0; regs.zf = 1;
  return regs.eax >>> 0;
}

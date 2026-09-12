// @manual — do not regenerate.
// Source: binary/rct.exe @ 0x45897e..0x458a7b.

import { regs } from "../../runtime/regs.js";

const lo16 = (value) => value & 0xffff;
const setLo16 = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | lo16(value)) >>> 0;
};

// Split the formatted string at ESI into NUL-separated lines no wider than
// DI. Returns the number of inserted breaks in DI, exactly like the binary.
export function FUN_0045897e(heap) {
  let esi = regs.esi >>> 0;
  let bx = heap.u16(0x00971e84);
  let cx = 0;
  const maxWidth = regs.edi & 0xffff;
  regs.eax = 0;
  heap.setU32(0x00642fc0, 0);
  heap.setU32(0x00642fbc, 0);

  while (true) {
    const charAddress = esi;
    const al = heap.u8(esi);
    esi = (esi + 1) >>> 0;
    if (al === 0) {
      setLo16("edi", heap.u16(0x00642fc0));
      regs.esi = esi;
      regs.ebx = bx >>> 0;
      return regs.eax >>> 0;
    }
    if (al === 0x20) heap.setU32(0x00642fbc, esi);

    if (al === 5) {
      heap.setU16(0x00642fc0, heap.u16(0x00642fc0) + 1);
      heap.setU8(esi - 1, 0);
      cx = 0;
      heap.setU32(0x00642fbc, 0);
      continue;
    }

    if (al < 0x20) {
      if (al <= 4) esi = (esi + 1) >>> 0;
      else if (al === 7) bx = 0x1c0;
      else if (al === 8) bx = 0x2a0;
      else if (al === 9) bx = 0xe0;
      else if (al === 0xa) bx = 0;
      else if (al === 0x17) {
        const image = heap.u32(esi) & 0x1ffff;
        esi = (esi + 4) >>> 0;
        cx = lo16(cx + heap.u16(0x008dc0b8 + image * 0x10));
      } else if (al >= 0x11 && al <= 0x16) esi = (esi + 2) >>> 0;
      else if (al >= 0x18) esi = (esi + 4) >>> 0;
    } else {
      cx = lo16(cx + heap.u8(0x0099a508 + bx + al - 0x20));
    }

    if (cx <= maxWidth) continue;
    const lastSpace = heap.u32(0x00642fbc) >>> 0;
    if (lastSpace !== 0) {
      esi = lastSpace;
      heap.setU16(0x00642fc0, heap.u16(0x00642fc0) + 1);
      heap.setU8(esi - 1, 0);
    } else {
      // Insert a NUL before this word by shifting the tail right one byte.
      esi = charAddress;
      let carry = 0;
      while (true) {
        const next = heap.u8(esi);
        heap.setU8(esi, carry);
        esi = (esi + 1) >>> 0;
        carry = next;
        if (carry === 0) break;
      }
      heap.setU8(esi, 0);
      esi = (charAddress + 1) >>> 0;
      heap.setU16(0x00642fc0, heap.u16(0x00642fc0) + 1);
    }
    cx = 0;
    heap.setU32(0x00642fbc, 0);
  }
}

// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x458b05..0x458bce.
//
// Measures a formatted string up to DI pixels and replaces the last fitting
// break point with "..." when it overflows. The generated body returned at
// every loop back-edge, so ordinary printable text never reached its second
// character.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

const u16 = (value) => value & 0xffff;

export function FUN_00458b05(heap) {
  const entryEsi = regs.esi >>> 0;
  const limit = regs.edi & 0xffff;
  let font = heap.u16(0x00971e84);
  let ellipsisStart = u16(limit - heap.u8(0x0099a516 + font) * 3);
  let cursor = entryEsi;
  let breakPoint = cursor;
  let width = 0;
  let al = 0;

  for (;;) {
    al = heap.u8(cursor++);
    if (al === 0) break;

    if (al >= 0x20) {
      width = u16(width + heap.u8(0x0099a508 + font + al - 0x20));
      if (width > limit) {
        heap.setU32(breakPoint, 0x002e2e2e);
        width = limit;
        break;
      }
      if (width <= ellipsisStart) breakPoint = cursor;
      continue;
    }

    if (al <= 4) {
      if (al === 1) width = heap.u8(cursor);
      cursor++;
      continue;
    }
    if (al === 7 || al === 8 || al === 9 || al === 0x0a) {
      font = al === 7 ? 0x1c0 : al === 8 ? 0x2a0 : al === 9 ? 0xe0 : 0;
      ellipsisStart = u16(limit - heap.u8(0x0099a516 + font) * 3);
      continue;
    }
    if (al <= 0x10) continue;
    if (al === 0x17) {
      const sprite = heap.u32(cursor) & 0x1ffff;
      cursor += 4;
      width = u16(width + heap.u16(0x008dc0b8 + sprite * 0x10));
      if (width > limit) {
        heap.setU32(breakPoint, 0x002e2e2e);
        width = limit;
        break;
      }
      if (width <= ellipsisStart) breakPoint = cursor;
      continue;
    }
    cursor += al <= 0x16 ? 2 : 4;
  }

  regs.eax = (regs.eax & 0xffffff00) | al;
  regs.ebx = font >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | width) >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | ellipsisStart) >>> 0;
  regs.ebp = breakPoint >>> 0;
  regs.esi = entryEsi;
  return regs.eax;
}

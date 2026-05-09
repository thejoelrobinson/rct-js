// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4367cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004367cb(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  if ((((in_AX < 0xfe0) && (in_CX < 0xfe0)) && (0x1f < in_AX)) && (0x1f < in_CX)) {
    heap.setU32(0x00991f04, (0xffff) >>> 0);
    heap.setU32(0x00991f08, (0xffff) >>> 0);
    heap.setU32(0x00991f0c, (0xffff) >>> 0);
    heap.setU32(0x00991f10, (0xffff) >>> 0);
    heap.setU32(0x00991f14, (0xffff) >>> 0);
    heap.setU32(0x00991f18, (0xffff) >>> 0);
    heap.setU32(0x00991f1c, (0xffff) >>> 0);
    heap.setU32(0x00991f20, (0xffff) >>> 0);
    heap.setU32(0x00991f24, (0xffff) >>> 0);
    heap.setU32(0x00991f28, (0xffff) >>> 0);
    heap.setU32(0x00991f2c, (0xffff) >>> 0);
    heap.setU8(0x0099c165, (0) & 0xff);
    heap.setU8((0x00999f9a + 0), (0xff) & 0xff);
    heap.setU8((0x00999fdc + 0), (0xff) & 0xff);
    heap.setU32(0x0099a01e, (0xff) >>> 0);
    heap.setU32(0x00991f72, (in_AX) >>> 0);
    heap.setU32(0x00991f76, (in_CX) >>> 0);
    heap.setU16((0x00991f7c + 0), (in_AX) & 0xffff);
    heap.setU16((0x00991f7c + 2), (in_CX) & 0xffff);
    return (regs.eax = callIndirect(heap, heap.u32((0x004368c8) + (heap.u8(0x00991f88)) * 4)));
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x00436a8c) + (heap.u8(0x00991f88)) * 4)));
}

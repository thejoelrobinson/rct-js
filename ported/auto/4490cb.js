// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4490cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004490cb(heap) {
  let in_EAX = regs.eax >>> 0;
  let cVar1 = 0;
  let uVar2 = 0;
  cVar1 = (((((heap.u8(0x00630b16) >>> 2)) << 24 >> 24)) & 0xff);
  uVar2 = ((CONCAT11(heap.u32(0x00630b28), cVar1)) & 0xffff);
  if ((heap.u8(0x00630b19) != 0) && (heap.u8(0x00630b19) != 2)) {
    uVar2 = ((CONCAT11(heap.u32(0x00630b28), cVar1 + -4)) & 0xffff);
  }
  return CONCAT24(uVar2, CONCAT22((((((in_EAX) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x00630b12) + heap.u32((0x00652478) + (((heap.u8(0x00630b18)) >>> 0) * 2) * 4)));
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43144a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0043144a(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  heap.setU8(0x0087d0bf, (0xff) & 0xff);
  if ((heap.u8(0x0087cccb) != 0) && (heap.u32(0x0087c3d7) != 0)) {
    iVar2 = ((0x10000) >>> 0);
    if (heap.u8(0x0087cccb) != 2) {
      iVar2 = ((0x20000) >>> 0);
    }
    uVar1 = ((((iVar2 - heap.u32(0x0087d0bc)) / (0) * (0x005f96b4 + heap.u32(0x0087c3d7) * 2)) * 0x80 + CONCAT22(heap.u32(0x006e3b80), heap.u32(0x006e3b82))) >>> 0);
    uVar3 = ((uVar1 >>> 0x10 & 7) >>> 0);
    heap.setU8(0x0087d0bf, ((((uVar1 & 0xffff) * (0) * (0x0064bc60 + uVar3 * 2) >>> 0x10) & 0xff)) & 0xff);
    heap.setU8(0x0087d0c0, (((uVar3) & 0xff)) & 0xff);
  }
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4313a7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY2 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004313a7(heap) {
  let bVar1 = 0;
  if (((heap.u32(0x006e3b84) & 0x1f) == 0) && (bVar1 = ((CARRY2(heap.u8(0x0087d0bc), heap.u16((0x005f96b4 + heap.u32(0x0087c3d7) * 2)))) & 0xff), heap.setU8(0x0087d0bc, (heap.u8(0x0087d0bc) + heap.u16((0x005f96b4 + heap.u32(0x0087c3d7) * 2))) & 0xff), bVar1)) {
    return (regs.eax = callIndirect(heap, heap.u32((0x004313e0 + heap.u32(0x0087cccb) * 4))));
  }
  return;
}

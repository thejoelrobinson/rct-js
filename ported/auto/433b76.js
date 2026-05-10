// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433b76.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00433b76(heap) {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let unaff_EBX = regs.ebx >>> 0;
  puVar2 = ((heap.u32(0x005f96e8)) >>> 0);
  if (heap.u32(0x005f96e8) < heap.u32(0x005f96e0)) {
    heap.setU32(heap.u32(0x005f96e8), (unaff_EBX) & 0xffffffff);
    heap.setU16((puVar2 + ((1) * 4)), (in_AX) & 0xffff);
    heap.setU16((((puVar2) | 0) + 6), (in_CX) & 0xffff);
    if (heap.u32(0x00628928) != 0) {
      heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 3) >>> 0);
      LOCK();
      uVar1 = ((heap.u32((heap.u32(0x00628928) + 0x18))) >>> 0);
      heap.setU32((heap.u32(0x00628928) + 0x18), (((puVar2) >>> 0)) & 0xffffffff);
      UNLOCK();
      heap.setU32((puVar2 + (2) * 4), (uVar1) & 0xffffffff);
      return in_AX;
    }
  }
  return in_AX;
}

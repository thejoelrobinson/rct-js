// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4405f3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44, SBORROW4 } from "../runtime/ghidra-builtins.js";
import { FUN_004429db } from "./4429db.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_004405f3(heap) {
  let iVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let extraout_var = 0;
  let in_EDX = 0;
  let extraout_var_00 = 0;
  let unaff_EBX = 0;
  let unaff_ESI = 0;
  piVar1 = (unaff_ESI + 0xa0);
  iVar2 = heap.u32(piVar1);
  heap.u32(piVar1) = heap.u32(piVar1) - unaff_EBX;
  if (SBORROW4(iVar2, unaff_EBX) != heap.u32(piVar1) < 0) {
    heap.u32((unaff_ESI + 0xa0)) = 0;
  }
  heap.u32((unaff_ESI + 0xa4)) = heap.u32((unaff_ESI + 0xa4)) + unaff_EBX;
  heap.u32((heap.u32(0x006293b0) + unaff_ESI)) = heap.u32((heap.u32(0x006293b0) + unaff_ESI)) + unaff_EBX;
  FUN_005e5301(heap);
  heap.setU32(0x0099c163, (heap.u32(0x008d7ea4)) >>> 0);
  uVar3 = FUN_004429db(heap);
  FUN_00452fce(heap, CONCAT22(extraout_var_00, heap.u32((unaff_ESI + 0x10))), CONCAT22(extraout_var, heap.u32((unaff_ESI + 0xe))), -unaff_EBX, uVar3);
  return CONCAT44(in_EDX, in_EAX);
}

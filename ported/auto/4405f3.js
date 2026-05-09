// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4405f3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44, SBORROW4 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004429db } from "./4429db.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_004405f3(heap) {
  let piVar1 = 0;
  let iVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let extraout_var = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_var_00 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  piVar1 = (((unaff_ESI + 0xa0)) >>> 0);
  iVar2 = ((heap.i32(piVar1)) >>> 0);
  heap.setU32(piVar1, (heap.i32(piVar1) - unaff_EBX) & 0xffffffff);
  if (SBORROW4(iVar2, unaff_EBX) != heap.i32(piVar1) < 0) {
    heap.setU32((unaff_ESI + 0xa0), (0) & 0xffffffff);
  }
  heap.setI32((unaff_ESI + 0xa4), (heap.i32((unaff_ESI + 0xa4)) + unaff_EBX) & 0xffffffff);
  heap.setI16((heap.u32(0x006293b0) + unaff_ESI), (heap.i16((heap.u32(0x006293b0) + unaff_ESI)) + ((unaff_EBX) << 16 >> 16)) & 0xffff);
  (regs.eax = FUN_005e5301(heap));
  heap.setU8(0x0099c163, (heap.u32(0x008d7ea4)) & 0xff);
  uVar3 = (((regs.eax = FUN_004429db(heap))) >>> 0);
  (regs.eax = FUN_00452fce(heap, CONCAT22(extraout_var_00, heap.u16((unaff_ESI + 0x10))), CONCAT22(extraout_var, heap.u16((unaff_ESI + 0xe))), -unaff_EBX, uVar3));
  return 1;
}

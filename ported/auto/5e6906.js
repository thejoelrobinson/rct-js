// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6906.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004039ff } from "./4039ff.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005e698a } from "./5e698a.js";
export function FUN_005e6906(heap) {
  let iVar1 = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar2 = 0;
  (regs.eax = FUN_005e698a(heap));
  heap.setU32(0x009a0124, (extraout_DX) >>> 0);
  uVar2 = ((extraout_ECX) >>> 0);
  (regs.eax = FUN_00458bcf(heap));
  (regs.eax = FUN_00458bcf(heap, uVar2));
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x009a0118, (0) >>> 0);
  iVar1 = (((regs.eax = FUN_004039ff(heap, 0x0099fe18, 0x0099ff18, 0x009a0018, 0x009a0118, 0x009a0120))) >>> 0);
  if (iVar1 != 0) {
    heap.setU32(0x009a0128, (heap.u8((unaff_ESI + 0x174))) >>> 0);
    heap.setU32(0x009a0126, (heap.u16((unaff_ESI + 0x30))) >>> 0);
  }
  return;
}

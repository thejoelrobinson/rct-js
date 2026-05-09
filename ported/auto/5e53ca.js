// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e53ca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";
export function FUN_005e53ca(heap) {
  let sVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let iVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let piVar6 = 0;
  sVar1 = ((heap.i16((unaff_ESI + 0x16))) & 0xffff);
  sVar2 = ((heap.i16((unaff_ESI + 0x18))) & 0xffff);
  if (sVar1 != -0x8000) {
    sVar3 = ((heap.i16((unaff_ESI + 0x1a))) & 0xffff);
    sVar4 = ((heap.i16((unaff_ESI + 0x1c))) & 0xffff);
    for (piVar6 = ((0x009a121c) >>> 0); iVar5 = ((heap.i32(piVar6)) >>> 0), iVar5 != 0; piVar6 = (((piVar6 + ((1) * 4)) >>> 0)) >>> 0) {
      if ((((heap.u8((iVar5 + 0x10)) < 2) && (heap.i16((iVar5 + 8)) < sVar3)) && (heap.i16((iVar5 + 10)) < sVar4)) && ((sVar1 < (((heap.i16((iVar5 + 8)) + heap.i16((iVar5 + 0xc)))) << 16 >> 16) && (sVar2 < (((heap.i16((iVar5 + 10)) + heap.i16((iVar5 + 0xe)))) << 16 >> 16))))) {
        (regs.eax = FUN_005e117d(heap, in_ECX));
      }
    }
  }
  return 1;
}

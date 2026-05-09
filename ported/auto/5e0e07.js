// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0e07.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_005e0e07(heap) {
  let unaff_EBP = regs.ebp >>> 0;
  let uVar1 = 0;
  let unaff_SI = regs.esi & 0xffff;
  let uVar2 = 0;
  if ((unaff_EBP & 0x80) == 0) {
    uVar2 = ((heap.u16((((0x0099ac8b) >>> 0) + unaff_EBP * 8 + 3))) & 0xffff);
    if ((unaff_SI & 8) == 0) {
      if ((unaff_SI & 0x20) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        if ((unaff_SI & 0x10) == 0) {
          (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        }
      } else {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        if ((unaff_SI & 0x10) == 0) {
          (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        }
      }
    } else {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
    }
    return;
  }
  uVar1 = ((heap.u32(((0x009a147c) & 0xff) + (unaff_EBP) * 4) | 0x2000000) >>> 0);
  if ((unaff_SI & 8) == 0) {
    if ((unaff_SI & 0x20) == 0) {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      if ((unaff_SI & 0x10) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      }
    } else {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      if ((unaff_SI & 0x10) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      }
    }
  } else {
    (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
  }
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e48a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042e276 } from "./42e276.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e48a(heap) {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  uVar5 = ((heap.u32(0x0088741c) >>> 0xb & 7) >>> 0);
  if (uVar5 == 0) {
    uVar5 = ((0) >>> 0);
    uVar6 = ((0) >>> 0);
    uVar1 = ((in_EAX) >>> 0);
    do {
      (regs.eax = 0x20, regs.ebx = 0x800, regs.eax = FUN_0042e276(heap, uVar6, in_EDX, in_ECX, uVar5, uVar1));
      uVar5 = ((uVar5 + 1) >>> 0);
    } while (uVar5 < 4);
    return in_EAX;
  }
  if (uVar5 != 2) {
    if (uVar5 != 4) {
      (regs.eax = FUN_005df40c(heap));
      (regs.eax = 0x20, regs.ebx = 0x800, regs.eax = FUN_0042e276(heap));
      return in_EAX;
    }
    uVar1 = ((in_EAX) >>> 0);
    uVar7 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    uVar2 = ((((((uVar7) >>> 0) >>> 0x20) >>> 0)) >>> 0);
    uVar4 = ((((uVar7) >>> 0) & 3) >>> 0);
    uVar6 = ((extraout_ECX_00) >>> 0);
    (regs.eax = 0x20, regs.ebx = 0x800, regs.eax = FUN_0042e276(heap, 4, uVar2, extraout_ECX_00, uVar4, uVar1));
    (regs.eax = 0x20, regs.ebx = 0x800, regs.eax = FUN_0042e276(heap, uVar5, uVar2, uVar6, uVar4 + 4, uVar1));
    return in_EAX;
  }
  uVar2 = ((in_EAX) >>> 0);
  uVar7 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
  uVar3 = ((((((uVar7) >>> 0) >>> 0x20) >>> 0)) >>> 0);
  uVar5 = ((((uVar7) >>> 0) & 1) >>> 0);
  uVar6 = ((2) >>> 0);
  uVar1 = ((extraout_ECX) >>> 0);
  do {
    (regs.eax = 0x20, regs.ebx = 0x800, regs.eax = FUN_0042e276(heap, uVar6, uVar3, uVar1, uVar5, uVar2));
    uVar5 = ((uVar5 + 2) >>> 0);
  } while (uVar5 < 4);
  return in_EAX;
}

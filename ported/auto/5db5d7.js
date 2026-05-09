// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db5d7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005db5d7(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let iVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar4 = 0;
  let in_ZF = regs.zf | 0;
  bVar1 = ((heap.u8((unaff_ESI + 0x30))) & 0xff);
  sVar2 = ((heap.i16((unaff_ESI + 10))) & 0xffff);
  (regs.ecx = 0xb, regs.eax = FUN_005e3b2b(heap));
  if (!in_ZF) {
    iVar4 = ((((bVar1) >>> 0) * 0x260) >>> 0);
    iVar3 = ((heap.u16((unaff_ESI + 0x15a)) - 1) >>> 0);
    if (((-1 < (iVar3 | 0)) && (((iVar3) & 0xff) < heap.u32(((0x00887498) & 0xff) + (iVar4) * 4))) && (sVar2 == heap.i16((0x0088747e + iVar3 * 2 + iVar4)))) {
      (regs.eax = FUN_005e43de(heap));
    }
  }
  return 1;
}

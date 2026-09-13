// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f1d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
export function FUN_0042f1d3(heap) {
  let in_EAX = regs.eax >>> 0;
  let iVar1 = 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  let cVar5 = 0;
  LAB_0042f1f0: {
  pcVar2 = ((0x005f874c) >>> 0);
  pcVar4 = ((0x005f831a) >>> 0);
  do {
    pcVar3 = ((pcVar4) >>> 0);
    cVar5 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar3, (cVar5) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar4 = ((pcVar3 + 1) >>> 0);
    if (cVar5 == 92) {
      break LAB_0042f1f0;
    }
  } while (cVar5 != 0);
  heap.setU32(pcVar3, (92) & 0xffffffff);
  }
  pcVar2 = ((0x005f8898) >>> 0);
  do {
    cVar5 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar4, (cVar5) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar4 = ((pcVar4 + 1) >>> 0);
  } while (cVar5 != 0);
  iVar1 = (((regs.eax = FUN_0040844b(heap, 0x005f831a, 0x005f92e7))) >>> 0);
  if ((iVar1 | 0) != -1) {
    cVar5 = ((heap.u32(0x005f941c)) & 0xff);
    (regs.eax = FUN_00408490(heap, iVar1));
    if (cVar5 == 126) {
      heap.setU32(0x005f853c, (heap.u32(0x005f853c) + -1) >>> 0);
    }
  }
  return 1;
}

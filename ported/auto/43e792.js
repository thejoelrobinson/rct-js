// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e792.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0043e792(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar4 = 0;
  iVar4 = ((heap.u32((unaff_ESI + 0x68)) * 0x260) >>> 0);
  uVar3 = ((heap.u32((unaff_ESI + 0x69))) >>> 0);
  uVar1 = ((heap.u16((unaff_ESI + 10))) & 0xffff);
  heap.setU32(((0x0088747a) + (iVar4 + uVar3) * 4), (heap.u32((0x0088747a) + (iVar4 + uVar3) * 4) + -1) & 0xffffffff);
  uVar2 = ((heap.u16((0x00887472 + uVar3 * 2 + iVar4))) & 0xffff);
  if (uVar1 == uVar2) {
    heap.setU16((0x00887472 + uVar3 * 2 + iVar4), (heap.u16((unaff_ESI + 0x74))) & 0xffff);
  } else {
    while (iVar4 = ((((uVar2) >>> 0) * 0x100) >>> 0), uVar1 != heap.u16((0x00743c08 + iVar4))) {
      uVar2 = ((heap.u16((0x00743c08 + iVar4))) & 0xffff);
    }
    heap.setU16((0x00743c08 + iVar4), (heap.u16((unaff_ESI + 0x74))) & 0xffff);
  }
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e792.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_0043e792(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  let iVar4 = 0;
  iVar4 = (uint) * (unaff_ESI + 0x68) * 0x260;
  uVar3 = (uint) * (unaff_ESI + 0x69);
  uVar1 = heap.u32((unaff_ESI + 10));
  heap.u32((0x0088747a) + (iVar4 + uVar3) * 4) = heap.u32((0x0088747a) + (iVar4 + uVar3) * 4) + -1;
  uVar2 = heap.u32((0x00887472 + uVar3 * 2 + iVar4));
  if (uVar1 == uVar2) {
    heap.u32((0x00887472 + uVar3 * 2 + iVar4)) = heap.u32((unaff_ESI + 0x74));
  } else {
    while (iVar4 = uVar2 * 0x100, uVar1 != heap.u32((0x00743c08 + iVar4))) {
      uVar2 = heap.u32((0x00743c08 + iVar4));
    }
    heap.u32((0x00743c08 + iVar4)) = heap.u32((unaff_ESI + 0x74));
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44149a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_0044149a(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  uVar1 = heap.u32((0x00991f8e) + ((ushort)((ushort)((in_EAX & 0xfe0) << 2) | (ushort)(in_ECX >>> 5) & 0x7ff)) * 4);
  while (uVar1 != 0xffff) {
    uVar2 = uVar1;
    iVar3 = uVar2 * 0x100;
    if (((heap.u32((0x00743b9c) + (iVar3) * 4) == '\x04') && (heap.u32((0x00743bbf) + (iVar3) * 4) == '\b')) && (in_EDX == heap.u32((0x00743ba6) + (uVar2 * 0x80) * 4))) {
      FUN_0044142c(heap);
      heap.u32((0x00743bbf) + (iVar3) * 4) = 5;
      FUN_00441452(heap);
      uVar1 = heap.u32((0x00743ba4) + (uVar2 * 0x80) * 4);
      heap.u32((0x00743bc6 + iVar3)) = (heap.u32((0x00743ba2) + (uVar2 * 0x80) * 4) & 0xffe0) + 0x10;
      heap.u32((0x00743bc8 + iVar3)) = (uVar1 & 0xffe0) + 0x10;
      heap.u32((0x00743bca) + (iVar3) * 4) = 5;
      FUN_0043c60b(heap);
    }
    uVar1 = heap.u32((0x00743b96) + (uVar2 * 0x80) * 4);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}

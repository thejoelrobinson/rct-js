// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450124.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00450b21 } from "./450b21.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00450124(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let iVar1 = 0;
  let uVar2 = 0;
  FUN_00450b21(heap);
  uVar2 = extraout_EDX & 0xff;
  heap.u32((0x00887510) + (uVar2 * 0x130) * 4) = 0xffff;
  heap.u32((0x00887422) + (uVar2 * 0x130) * 4) = heap.u32((0x00887422) + (uVar2 * 0x130) * 4) & 0xfff9;
  if ((heap.u32((0x00887422) + (uVar2 * 0x130) * 4) & 1) != 0) {
    for (iVar1 = 0; iVar1 < heap.u32((byte)(0x00887498) + (uVar2 * 0x260) * 4); iVar1 = iVar1 + 1) {
      if (heap.u32((0x0088747e + iVar1 * 2 + uVar2 * 0x260)) != 0xffff) {
        heap.u32((0x00743bdc + (uint) * (0x0088747e + iVar1 * 2 + uVar2 * 0x260) * 0x100)) = heap.u32((0x00743bdc + (uint) * (0x0088747e + iVar1 * 2 + uVar2 * 0x260) * 0x100)) & 0xffdf;
      }
    }
  }
  FUN_005e5301(heap);
  return CONCAT44(heap, in_EDX, in_EAX);
}

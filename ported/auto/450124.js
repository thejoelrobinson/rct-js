// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450124.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00450b21 } from "./450b21.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00450124(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let iVar1 = 0;
  let uVar2 = 0;
  (regs.eax = FUN_00450b21(heap));
  uVar2 = ((extraout_EDX & 0xff) >>> 0);
  heap.setU32(((0x00887510) + (uVar2 * 0x130) * 4), (0xffff) & 0xffffffff);
  heap.setU32(((0x00887422) + (uVar2 * 0x130) * 4), (heap.u32((0x00887422) + (uVar2 * 0x130) * 4) & 0xfff9) & 0xffffffff);
  if ((heap.u32((0x00887422) + (uVar2 * 0x130) * 4) & 1) != 0) {
    for (iVar1 = ((0) >>> 0); ((iVar1) & 0xff) < heap.u32(((0x00887498) & 0xff) + (uVar2 * 0x260) * 4); iVar1 = (((iVar1 + 1) >>> 0)) >>> 0) {
      if (heap.u16((0x0088747e + iVar1 * 2 + uVar2 * 0x260)) != 0xffff) {
        heap.setU16((0x00743bdc + heap.u32((0x0088747e + iVar1 * 2 + uVar2 * 0x260)) * 0x100), (heap.u16((0x00743bdc + heap.u32((0x0088747e + iVar1 * 2 + uVar2 * 0x260)) * 0x100)) & 0xffdf) & 0xffff);
      }
    }
  }
  (regs.eax = FUN_005e5301(heap));
  return 1;
}

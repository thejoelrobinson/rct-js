// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45174b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0045174b(heap) {
  let in_DL = regs.edx & 0xff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar1 = 0;
  let iVar2 = 0;
  uVar1 = ((((in_DL) >>> 0)) >>> 0);
  iVar2 = ((uVar1 * 0x260) >>> 0);
  if ((heap.u32((0x00887422) + (uVar1 * 0x130) * 4) & 0x4c0) == 0) {
    heap.setU32(((0x00887422) + (uVar1 * 0x130) * 4), (heap.u32((0x00887422) + (uVar1 * 0x130) * 4) & 0xfeff) & 0xffffffff);
    heap.setU32(((0x00887422) + (uVar1 * 0x130) * 4), (heap.u32((0x00887422) + (uVar1 * 0x130) * 4) | 0x40) & 0xffffffff);
    heap.setU32(((0x0088755c) + (iVar2) * 4), (((unaff_EBX) << 24 >> 24)) & 0xffffffff);
    heap.setU32(((0x0088755d) + (iVar2) * 4), (0) & 0xffffffff);
    heap.setU32(((0x0088757c) + (iVar2) * 4), (0) & 0xffffffff);
    heap.setU32(((0x0088757d) + (iVar2) * 4), (0) & 0xffffffff);
    return (regs.eax = callIndirect(heap, heap.u32((0x00451798) + (unaff_EBX) * 4)));
  }
  return;
}

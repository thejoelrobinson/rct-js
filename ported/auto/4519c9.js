// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4519c9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_004518fc } from "./4518fc.js";
export function FUN_004519c9(heap) {
  let pcVar1 = 0;
  let cVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = ((in_EDX & 0xff) >>> 0);
  iVar4 = ((uVar3 * 0x260) >>> 0);
  if ((heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 0x80) != 0) {
    pcVar1 = ((0x0088757d + iVar4) >>> 0);
    heap.setU32(pcVar1, (heap.i8(pcVar1) + 1) & 0xffffffff);
    if (heap.i8(pcVar1) == 0) {
      heap.setU32(((0x0088757d) + (iVar4) * 4), (heap.u32((0x0088757d) + (iVar4) * 4) + -0x10) & 0xffffffff);
    }
    if ((((heap.u32((0x0088757d) + (iVar4) * 4) & 0xf) == 0) && (heap.u32((0x0088755d) + (iVar4) * 4) != 3)) && (heap.u32((0x0088755d) + (iVar4) * 4) != 4)) {
      heap.setU16((0x00971e86 + 0), (heap.u32((0x00887442) + (uVar3 * 0x130) * 4)) & 0xffff);
      unique0x00017200 = ((heap.u32((0x00887444) + (uVar3 * 0x98) * 4)) >>> 0);
      (regs.eax = FUN_0042c711(heap));
    }
  }
  cVar2 = ((heap.u32((0x0088755c) + (iVar4) * 4)) & 0xff);
  if (((cVar2 == 0) || (cVar2 == NaN)) || (cVar2 == 6)) {
    heap.setU32(((0x00887422) + (uVar3 * 0x130) * 4), (heap.u32((0x00887422) + (uVar3 * 0x130) * 4) | 0x80) & 0xffffffff);
    heap.setU32(((0x0088751d) + (iVar4) * 4), (heap.u32((0x0088751d) + (iVar4) * 4) | 0x1c) & 0xffffffff);
    heap.setU32(((0x0088755d) + (iVar4) * 4), (1) & 0xffffffff);
    heap.setU32(((0x00887563) + (iVar4) * 4), (cVar2) & 0xffffffff);
    (regs.eax = FUN_004518fc(heap));
  }
  return;
}

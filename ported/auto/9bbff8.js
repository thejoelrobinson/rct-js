// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bbff8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009bc041 } from "./9bc041.js";
export function FUN_009bbff8(heap) {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  uVar1 = ((((heap.u32(0x0099fb80)) >>> 0)) >>> 0);
  uVar3 = ((((heap.u32(0x0099fb82)) >>> 0)) >>> 0);
  uVar2 = ((((heap.u32(0x0099fb84) + heap.u32(0x0099fb80)) >>> 0)) >>> 0);
  uVar4 = ((((heap.u32(0x0099fb86) + heap.u32(0x0099fb82)) >>> 0)) >>> 0);
  heap.setU32(0x009b2280, (in_EAX) >>> 0);
  for (puVar5 = ((0x009a013c) >>> 0); puVar5 < heap.u32(0x009a1164); puVar5 = (((puVar5 + 0x178) >>> 0)) >>> 0) {
    (regs.eax = FUN_009bc041(heap, uVar4, uVar2, uVar3, uVar1));
  }
  return;
}

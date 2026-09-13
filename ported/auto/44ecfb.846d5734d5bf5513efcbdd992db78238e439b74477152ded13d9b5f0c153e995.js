// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44ecfb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0044ecfb(heap) {
  let cVar1 = 0;
  let cVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar3 = 0;
  cVar1 = ((0) & 0xff);
  cVar2 = ((0) & 0xff);
  pcVar3 = ((0x00887420) >>> 0);
  do {
    if (((heap.i8(pcVar3) | 0) != -1) && (cVar1 = ((cVar1 + 1) & 0xff), (heap.i8(pcVar3 + (0xfd)) & 8) != 0)) {
      heap.setI8((pcVar3 + (0xfd)), (heap.i8(pcVar3 + (0xfd)) & 0xf7) & 0xff);
      cVar2 = ((cVar2 + 1) & 0xff);
    }
    pcVar3 = ((pcVar3 + 0x260) >>> 0);
  } while (pcVar3 < 0x008ad1c0);
  if (cVar2 != 0) {
    (regs.eax = FUN_005e43de(heap));
    cVar1 = (((regs.ecx & 0xff)) & 0xff);
  }
  if (cVar1 != heap.i8((unaff_ESI + 0x158))) {
    heap.setI8((unaff_ESI + 0x158), (cVar1) & 0xff);
    pcVar3 = ((0x00887420) >>> 0);
    cVar1 = ((0) & 0xff);
    do {
      if ((heap.i8(pcVar3) | 0) != -1) {
        heap.setI8((unaff_ESI + 0x58), (cVar1) & 0xff);
        return (regs.eax = callIndirect(heap, heap.u32((0x0044ed6c) + (heap.u16((unaff_ESI + 0x16a))) * 4), 0));
      }
      pcVar3 = ((pcVar3 + 0x260) >>> 0);
      cVar1 = ((cVar1 + 1) & 0xff);
    } while (pcVar3 < 0x008ad1c0);
    heap.setU8((unaff_ESI + 0x159), (0xff) & 0xff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}

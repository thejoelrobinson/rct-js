// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fe80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0043feb6 } from "./43feb6.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0043fe80(heap) {
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar2 = 0;
  bVar2 = ((0xff8bc46b < heap.u32((unaff_ESI + 0x30)) << 8) & 0xff);
  uVar1 = (((regs.esi = 0x743b94, regs.eax = FUN_0043feb6(heap))) >>> 0);
  if (bVar2) {
    uVar1 = ((uVar1 | 0x10000) >>> 0);
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0x10 & 1) != 0) {
      heap.setU32((unaff_ESI + 0x10), (uVar1) & 0xffffffff);
      return;
    }
  } else {
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0x10 & 1) == 0) {
    heap.setU32((unaff_ESI + 0x10), (uVar1) & 0xffffffff);
    return;
  }
  }
  uVar1 = (((regs.eax = FUN_005e43de(heap))) >>> 0);
  LAB_0043feb2: heap.setU32((unaff_ESI + 0x10), (uVar1) & 0xffffffff);
  return;
}

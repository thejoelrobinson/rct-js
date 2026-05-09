// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455a66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0043feb6 } from "./43feb6.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00455a66(heap) {
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar2 = 0;
  LAB_00455aa6: {
  bVar2 = ((heap.u32(((0x00743bc3) & 0xff) + (heap.u32((unaff_ESI + 0x30)) * 0x100) * 4) < 2) & 0xff);
  uVar1 = (((regs.eax = 0x80, regs.esi = 0x743b94, regs.eax = FUN_0043feb6(heap))) >>> 0);
  if (bVar2) {
    uVar1 = ((uVar1 | 0x2000) >>> 0);
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0xd & 1) != 0) {
      break LAB_00455aa6;
    }
  } else {
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0xd & 1) == 0) {
    break LAB_00455aa6;
  }
  }
  uVar1 = (((regs.eax = FUN_005e43de(heap))) >>> 0);
  }
  heap.setU32((unaff_ESI + 0x10), (uVar1) & 0xffffffff);
  return;
}

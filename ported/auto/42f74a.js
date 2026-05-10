// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f74a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_0042f8a9 } from "./42f8a9.js";
export function FUN_0042f74a(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar1 = (((regs.eax = FUN_0042f8a9(heap))) >>> 0);
  uVar3 = ((heap.u32(0x005f88ac)) >>> 0);
  if ((uVar3 != 0) && (uVar2 = (((regs.eax = FUN_00408342(heap, heap.u32(0x005f88a4), 0x005f88b0, uVar3))) >>> 0), uVar2 != uVar3)) {
    heap.setU8(0x005f88af, (1) & 0xff);
  }
  return uVar1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5b80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e5b80(heap) {
  let in_CX = regs.ecx & 0xffff;
  let uVar1 = 0;
  let extraout_CX = 0;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  puVar2 = ((0x009a013c) >>> 0);
  uVar1 = ((in_CX & 0xff7f) & 0xffff);
  if ((in_CX >>> 7 & 1) == 0) {
    for (; puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
      if ((((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) && (in_DX == heap.i16((puVar2 + 0x30)))) {
        return (regs.eax = FUN_005e5bd8(heap));
      }
    }
  } else {
    while (puVar2 < heap.u32(0x009a1164)) {
      if (((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) {
        (regs.eax = FUN_005e5bd8(heap));
        puVar2 = ((0x009a013c) >>> 0);
        uVar1 = ((extraout_CX) & 0xffff);
      } else {
        puVar2 = ((puVar2 + 0x178) >>> 0);
      }
    }
  }
  return;
}

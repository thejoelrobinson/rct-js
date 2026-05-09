// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c60b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c60b(heap) {
  let bVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if (heap.u8((unaff_ESI + 0x71)) < 0xfe) {
    bVar1 = ((heap.u32((0x0062d304) + (heap.u8((unaff_ESI + 0x71))) * 4)) & 0xff);
  } else {
    bVar1 = ((heap.u32((0x0062d301) + (heap.u8((unaff_ESI + 0x6d))) * 4)) & 0xff);
  }
  uVar3 = ((((bVar1) >>> 0)) >>> 0);
  if (bVar1 != heap.u8((unaff_ESI + 0x6e))) {
    (regs.eax = FUN_005e53ca(heap));
    heap.setU8((unaff_ESI + 0x6e), (bVar1) & 0xff);
    puVar2 = ((heap.u32((0x0062d644) + (heap.u32((unaff_ESI + 0x2d)) * 2) * 4)) >>> 0);
    heap.setU8((unaff_ESI + 0x14), (heap.u8(puVar2 + (uVar3 * 4))) & 0xff);
    heap.setU8((unaff_ESI + 9), (heap.u8(puVar2 + (uVar3 * 4 + 1))) & 0xff);
    heap.setU8((unaff_ESI + 0x15), (heap.u8(puVar2 + (uVar3 * 4 + 2))) & 0xff);
    (regs.eax = FUN_005e53ca(heap));
  }
  return;
}

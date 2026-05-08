// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb766.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00405cc0 } from "./405cc0.js";
export function FUN_009bb766(heap) {
  let in_CL = 0;
  let unaff_EBX = 0;
  let uVar1 = 0;
  pbVar2 = heap.u32((0x008dc0b4) + (unaff_EBX * 4) * 4);
  puVar3 = 0x005f2000 + (uint) * (0x008dc0bc + unaff_EBX * 0x10) * 4;
  uVar1 = (uint) * (0x008dc0b8 + unaff_EBX * 0x10);
  do {
    heap.u32(puVar3) = ((ushort)((ushort) * pbVar2 * in_CL) >>> 8);
    heap.u32(puVar3 + (1) * 4) = ((ushort)(heap.u32(pbVar2 + (1) * 4) * in_CL) >>> 8);
    heap.u32(puVar3 + (2) * 4) = ((ushort)(heap.u32(pbVar2 + (2) * 4) * in_CL) >>> 8);
    pbVar2 = pbVar2 + 3;
    puVar3 = puVar3 + 4;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  FUN_00405cc0(heap, 0x005f2000, 10, 0xec);
  return;
}

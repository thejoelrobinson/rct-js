// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6906.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004039ff } from "./4039ff.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005e698a } from "./5e698a.js";
export function FUN_005e6906(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_0099fe18 = __sp + 0;
  const __addr_DAT_0099ff18 = __sp + 4;
  const __addr_DAT_009a0018 = __sp + 8;
  const __addr_DAT_009a0118 = __sp + 12;
  const __addr_DAT_009a0120 = __sp + 16;
  try {
  let iVar1 = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let unaff_ESI = 0;
  let uVar2 = 0;
  FUN_005e698a(heap);
  heap.setU32(0x009a0124, (extraout_DX) >>> 0);
  uVar2 = extraout_ECX;
  FUN_00458bcf(heap);
  FUN_00458bcf(heap, uVar2);
  FUN_00458bcf(heap);
  heap.setU32(0x009a0118, (0) >>> 0);
  iVar1 = FUN_004039ff(heap, __addr_DAT_0099fe18, __addr_DAT_0099ff18, __addr_DAT_009a0018, __addr_DAT_009a0118, __addr_DAT_009a0120);
  if (iVar1 != 0) {
    heap.setU32(0x009a0128, (heap.u32((unaff_ESI + 0x174))) >>> 0);
    heap.setU32(0x009a0126, (heap.u32((unaff_ESI + 0x30))) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(20);
  }
}

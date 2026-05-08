// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f3e5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/ghidra-builtins.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f6a8 } from "./42f6a8.js";
import { FUN_0042f6b3 } from "./42f6b3.js";
import { FUN_0042f74a } from "./42f74a.js";
import { FUN_0042fa02 } from "./42fa02.js";
import { FUN_0042fc92 } from "./42fc92.js";
import { FUN_00436634 } from "./436634.js";
import { FUN_00444b0a } from "./444b0a.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0042f3e5(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099aa88 = __sp + 0;
  try {
  let iVar1 = 0;
  let extraout_CX = 0;
  let sVar2 = 0;
  let unaff_ESI = 0;
  let bVar3 = 0;
  if (heap.u32(0x008dbed2) != -1) {
    FUN_005d3b30(heap);
    FUN_00436634(heap);
    FUN_00444b4a(heap);
    FUN_00444b0a(heap);
    FUN_0042fc92(heap);
    sVar2 = 0;
    bVar3 = false;
    heap.setU32(0x008ad1c2, (FUN_005e68e2(heap)) >>> 0);
    heap.setU32(0x008ad1c6, (extraout_CX) >>> 0);
    if (!bVar3) {
      iVar1 = heap.u32((unaff_ESI + 8));
      heap.setU32(0x008ad1c2, ((heap.u32((iVar1 + 0xc)) >>> 1) + heap.u32((iVar1 + 8))) >>> 0);
      sVar2 = (heap.u32((iVar1 + 0xe)) >>> 1) + heap.u32((iVar1 + 10));
      heap.setU32(0x008ad1c6, (CONCAT11(heap.u32(0x00991f88), heap.u32((iVar1 + 0x10)))) >>> 0);
    }
    heap.setU32(0x005f8d35, (0) >>> 0);
    heap.setU32(0x008ad1c4, (sVar2) >>> 0);
    iVar1 = FUN_004083e1(heap, __addr_DAT_0099aa88);
    if (iVar1 != -1) {
      heap.setU32(0x005f88a4, (iVar1) >>> 0);
      FUN_0042f6b3(heap);
      FUN_0042f6a8(heap);
      FUN_0042f74a(heap);
      FUN_0042fa02(heap);
      iVar1 = FUN_00408387(heap, heap.u32(0x005f88a4));
      if ((iVar1 != 0) && (heap.u32(0x005f88af) == '\0')) {
        FUN_005e6028(heap);
        heap.setU32(0x0099a4fe, (0) >>> 0);
        return;
      }
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}

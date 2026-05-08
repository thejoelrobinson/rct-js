// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f44e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0044f44e(heap) {
  let bVar2 = 0;
  let in_EAX = 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let extraout_DL = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let uVar5 = 0;
  heap.u32((unaff_ESI + 5)) = 0;
  pbVar1 = heap.u32((0x005f5f4c) + (in_EDX & 0xff) * 4);
  iVar3 = 200;
  while (iVar3 != 1) {
    bVar2 = FUN_005df40c(heap);
    uVar5 = (uint)(ushort)(((ushort)(bVar2 * (ushort) * pbVar1) >>> 8) * 3);
    pcVar4 = 0x00887420;
    while ((extraout_DL != heap.u32(pcVar4) || (heap.u32((pbVar1 + uVar5 + 1)) != heap.u32((pcVar4 + 0x1e)))) || (iVar3 = extraout_ECX, heap.u32(pbVar1 + (uVar5 + 3) * 4) != heap.u32(pcVar4 + (0x20) * 4))) {
      pcVar4 = pcVar4 + 0x260;
      if (0x8ad1bf < pcVar4) {
        /* goto LAB_0044f4a3 */ throw new Error("goto LAB_0044f4a3 not supported");
      }
    }
  }
  uVar5 = 0;
  LAB_0044f4a3: heap.u32((unaff_ESI + 0x1e)) = heap.u32((pbVar1 + uVar5 + 1));
  heap.u32((unaff_ESI + 0x20)) = heap.u32(pbVar1 + (uVar5 + 3) * 4);
  return CONCAT44(heap, in_EDX, in_EAX);
}

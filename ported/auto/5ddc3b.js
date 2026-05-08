// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddc3b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005ddc3b(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_DAT_005f6cb8 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  try {
  let bVar2 = 0;
  let in_EAX = 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let uVar5 = 0;
  pbVar1 = heap.u32((__addr_PTR_DAT_005f6cb8) + (heap.u32(unaff_ESI + (1) * 4)) * 4);
  if (heap.u32(pbVar1) == 0xff) {
    heap.u32(unaff_ESI + (5) * 4) = '\x01';
    uVar5 = 0;
    do {
      heap.u32((unaff_ESI + uVar5 * 2 + 6)) = heap.u32((pbVar1 + uVar5 * 2 + 1));
      uVar5 = uVar5 + 1;
    } while (uVar5 < 0xc);
    return CONCAT44(heap, in_EDX, in_EAX);
  }
  heap.u32(unaff_ESI + (5) * 4) = '\0';
  iVar3 = 200;
  while (iVar3 != 1) {
    bVar2 = FUN_005df40c(heap);
    uVar5 = (uint)(ushort)(((ushort)(bVar2 * (ushort) * pbVar1) >>> 8) * 2);
    pcVar4 = __addr_DAT_00887420;
    while (((heap.u32(pcVar4) == -1 || (pcVar4 == unaff_ESI)) || (heap.u32(unaff_ESI + (1) * 4) != heap.u32(pcVar4 + (1) * 4))) || (iVar3 = extraout_ECX, heap.u32((pbVar1 + uVar5 + 1)) != heap.u32((pcVar4 + 6)))) {
      pcVar4 = pcVar4 + 0x260;
      if (0x8ad1bf < pcVar4) {
        /* goto LAB_005ddc9b */ throw new Error("goto LAB_005ddc9b not supported");
      }
    }
  }
  uVar5 = 0;
  LAB_005ddc9b: heap.u32((unaff_ESI + 6)) = heap.u32((pbVar1 + uVar5 + 1));
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}

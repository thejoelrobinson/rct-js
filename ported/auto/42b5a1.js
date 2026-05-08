// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42b5a1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0042b5a1(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let in_AX = 0;
  let unaff_ESI = 0;
  let bVar4 = 0;
  if (in_AX == 0xffff) {
    return;
  }
  bVar4 = false;
  if (in_AX == 0) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 1) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  bVar4 = in_AX < 8;
  if (in_AX == 8) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      iVar3 = heap.u32((unaff_ESI + 8));
      FUN_005e43de(heap);
      heap.setU32(0x005f8d5c, (0) >>> 0);
      puVar1 = (iVar3 + 0x12);
      uVar2 = heap.u32(puVar1);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x100) >>> 0);
      if ((uVar2 >>> 8 & 1) == 0) {
        heap.setU32(0x005f8d5c, (1) >>> 0);
      }
      FUN_0042f3a2(heap);
    }
    return;
  }
  bVar4 = in_AX < 3;
  if (in_AX == 3) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 2) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  bVar4 = in_AX < 4;
  if (in_AX == 4) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 4) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  bVar4 = in_AX < 5;
  if (in_AX == 5) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 8) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  bVar4 = in_AX < 6;
  if (in_AX == 6) {
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x1000) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  bVar4 = in_AX < 9;
  if (in_AX != 9) {
    bVar4 = in_AX < 10;
    if (in_AX == 10) {
      FUN_005e68e2(heap);
      if (!bVar4) {
        puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
        heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x20) >>> 0);
        FUN_005e43de(heap);
      }
      return;
    }
    bVar4 = in_AX < 0xb;
    if (in_AX != 0xb) {
      bVar4 = in_AX == 0;
      if (in_AX != 1) {
        return;
      }
      FUN_005e68e2(heap);
      if (!bVar4) {
        puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
        heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x80) >>> 0);
        FUN_005e43de(heap);
      }
      return;
    }
    FUN_005e68e2(heap);
    if (!bVar4) {
      puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
      heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x40) >>> 0);
      FUN_005e43de(heap);
    }
    return;
  }
  FUN_005e68e2(heap);
  if (!bVar4) {
    puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
    heap.setU32(puVar1, (heap.u32(puVar1) ^ 0x10) >>> 0);
    FUN_005e43de(heap);
  }
  return;
}

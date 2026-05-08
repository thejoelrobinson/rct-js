// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44049c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0044049c(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar6 = 0;
  let unaff_ESI = 0;
  let uVar8 = 0;
  heap.setU32(0x00642fb8, (0x31) >>> 0);
  uVar6 = heap.u32((unaff_ESI + 4));
  uVar3 = heap.u32((unaff_ESI + 6));
  uVar4 = uVar6;
  if (uVar3 != 0xffff) {
    heap.u32((0x00743b98) + (uVar3 * 0x80) * 4) = uVar6;
    uVar4 = heap.u32(0x0087c398);
  }
  heap.setU32(0x0087c398, (uVar4) >>> 0);
  if (uVar6 != 0xffff) {
    heap.u32((0x00743b9a) + (uVar6 * 0x80) * 4) = uVar3;
  }
  FUN_00458bcf(heap);
  uVar6 = heap.u32(0x0087c398);
  do {
    if (uVar6 == 0xffff) {
      uVar6 = heap.u32(0x0087c398);
      if (heap.u32(0x0087c398) == 0xffff) {
        heap.setU32(0x0087c398, (heap.u32((unaff_ESI + 10))) >>> 0);
        heap.u32((unaff_ESI + 4)) = 0xffff;
        heap.u32((unaff_ESI + 6)) = 0xffff;
        heap.setU32(0x00642fb8, (0x30) >>> 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      do {
        uVar8 = uVar6;
        uVar6 = heap.u32((0x00743b98) + (uVar8 * 0x80) * 4);
      } while (uVar6 != 0xffff);
      heap.u32((0x00743b98) + (uVar8 * 0x80) * 4) = heap.u32((unaff_ESI + 10));
      heap.u32((unaff_ESI + 6)) = heap.u32((0x00743b9e) + (uVar8 * 0x80) * 4);
      heap.u32((unaff_ESI + 4)) = 0xffff;
      heap.setU32(0x00642fb8, (0x30) >>> 0);
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    FUN_00458bcf(heap);
    pbVar7 = 0x0099a888;
    pbVar5 = 0x0099aa88;
    while (true) {
      bVar2 = heap.u32(pbVar7);
      if (bVar2 < heap.u32(pbVar5)) {
        LOCK(heap);
        uVar3 = heap.u32((0x00743b9a) + (uVar6 * 0x80) * 4);
        heap.u32((0x00743b9a) + (uVar6 * 0x80) * 4) = heap.u32((unaff_ESI + 10));
        UNLOCK(heap);
        heap.u32((unaff_ESI + 6)) = uVar3;
        if (uVar3 == 0xffff) {
          LOCK(heap);
          UNLOCK(heap);
          uVar6 = heap.u32((unaff_ESI + 10));
          heap.u32((unaff_ESI + 4)) = heap.u32(0x0087c398);
          heap.setU32(0x0087c398, (uVar6) >>> 0);
        } else {
          LOCK(heap);
          uVar1 = heap.u32((0x00743b98) + (uVar3 * 0x80) * 4);
          heap.u32((0x00743b98) + (uVar3 * 0x80) * 4) = heap.u32((unaff_ESI + 10));
          UNLOCK(heap);
          heap.u32((unaff_ESI + 4)) = uVar1;
        }
        heap.setU32(0x00642fb8, (0x30) >>> 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      if ((bVar2 != heap.u32(pbVar5)) || (bVar2 == 0)) {
        break;
      }
      pbVar7 = pbVar7 + 1;
      pbVar5 = pbVar5 + 1;
    }
    uVar6 = heap.u32((0x00743b98) + (uVar6 * 0x80) * 4);
  } while (true);
}

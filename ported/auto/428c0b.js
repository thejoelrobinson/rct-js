// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/428c0b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT21, CONCAT22, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00428cc9 } from "./428cc9.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_00428c0b(heap) {
  let uVar2 = 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let uVar4 = 0;
  let extraout_EDX = 0;
  let unaff_ESI = 0;
  if (heap.u32((unaff_ESI + 0x164)) == 0) {
    iVar3 = 0;
    uVar4 = 0xffff;
    if (heap.u32(0x0087c3c2) != -0x8000) {
      uVar4 = CONCAT22(heap, heap.u32(0x0087c3c4) + 0x10, heap.u32(0x0087c3c2) + 0x10) | 0x40000000;
      iVar3 = CONCAT21(heap, heap.u32(0x0087c3c6) + 0x20, heap.u32(0x00991f88)) << 8;
    }
    if (heap.u32((unaff_ESI + 8)) == 0) {
      uVar2 = 0;
      if (heap.u32(0x005f8d5c) == '\x01') {
        uVar2 = 0x100;
      }
    } else {
      if ((uVar4 == heap.u32((unaff_ESI + 0x15c))) && (iVar3 == heap.u32((unaff_ESI + 0x160)))) {
        return;
      }
      LOCK(heap);
      puVar1 = heap.u32((unaff_ESI + 8));
      heap.u32((unaff_ESI + 8)) = 0;
      UNLOCK(heap);
      heap.u32(puVar1) = 0;
      uVar2 = FUN_005e6a83(heap);
      iVar3 = extraout_ECX;
      uVar4 = extraout_EDX;
    }
    heap.u32((unaff_ESI + 0x15c)) = uVar4;
    heap.u32((unaff_ESI + 0x160)) = iVar3;
    if (uVar4 != 0xffff) {
      FUN_00428cc9(heap);
    }
    if (heap.u32((unaff_ESI + 8)) != 0) {
      heap.u32((heap.u32((unaff_ESI + 8)) + 0x12)) = uVar2;
    }
    FUN_005e43de(heap);
  }
  return;
}

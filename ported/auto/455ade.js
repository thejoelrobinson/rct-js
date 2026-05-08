// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455ade.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00455b88 } from "./455b88.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_00455ade(heap) {
  let uVar2 = 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let uVar4 = 0;
  let extraout_EDX = 0;
  let unaff_ESI = 0;
  if (heap.u32((unaff_ESI + 0x164)) == 0) {
    if (heap.u32((0x00743bbf) + ((uint) * (unaff_ESI + 0x30) * 0x100) * 4) == '\t') {
      uVar4 = 0xffff;
      iVar3 = 0;
    } else {
      uVar4 = heap.u32((unaff_ESI + 0x30)) | 0xc0000000;
      iVar3 = heap.u32(0x00991f88) << 8;
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
      FUN_00455b88(heap);
    }
    if (heap.u32((unaff_ESI + 8)) != 0) {
      heap.u32((heap.u32((unaff_ESI + 8)) + 0x12)) = uVar2;
    }
    FUN_005e43de(heap);
  }
  return;
}

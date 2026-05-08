// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4340f5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
import { FUN_00434231 } from "./434231.js";
import { FUN_0043424f } from "./43424f.js";
import { FUN_00434a94 } from "./434a94.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_005e4355 } from "./5e4355.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_004340f5(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let unaff_ESI = 0;
  iVar1 = heap.u32((unaff_ESI + 8));
  if (iVar1 != 0) {
    sVar2 = FUN_0043424f(heap);
    if (sVar2 == -0x8000) {
      sVar2 = (heap.u32((iVar1 + 0xe)) >>> 1) + heap.u32((iVar1 + 10));
      FUN_00434a94(heap);
    } else {
      FUN_00423677(heap);
      sVar2 = extraout_CX;
    }
    heap.setU32(0x00991f88, (heap.u32(0x00991f88) + 1) >>> 0);
    heap.setU32(0x00991f88, (heap.u32(0x00991f88) & 3) >>> 0);
    uVar3 = FUN_005e4355(heap);
    heap.u32((unaff_ESI + 0x170)) = uVar3;
    heap.u32((unaff_ESI + 0x172)) = sVar2;
    heap.u32((iVar1 + 8)) = uVar3;
    heap.u32((iVar1 + 10)) = sVar2;
    FUN_005e43de(heap);
    FUN_00434231(heap);
    FUN_004448fb(heap);
  }
  return;
}

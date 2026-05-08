// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448c64.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00448a45 } from "./448a45.js";
import { FUN_00448d15 } from "./448d15.js";
export function FUN_00448c64(heap) {
  let in_EAX = 0;
  let uVar1 = 0;
  let extraout_ECX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  if ((heap.u32(unaff_ESI) & 0x3c) == 0x10) {
    if (heap.u32(unaff_ESI + (4) * 4) == 0) {
      FUN_00448d15(heap);
      FUN_00448a45(heap);
    }
  } else {
    if (((heap.u32(unaff_ESI) & 0x3c) == 4) && (heap.u32(unaff_ESI + (4) * 4) >>> 4 == 0)) {
    uVar1 = FUN_00448d15(heap);
    uVar2 = extraout_ECX;
    if ((heap.u32(unaff_ESI + (6) * 4) & 1) != 0) {
      FUN_00448a45(heap);
    }
    if ((heap.u32(unaff_ESI + (6) * 4) & 2) != 0) {
      FUN_00448a45(heap, unaff_ESI, uVar2, uVar1);
    }
    if ((heap.u32(unaff_ESI + (6) * 4) & 4) != 0) {
      FUN_00448a45(heap, unaff_ESI, uVar2, uVar1);
    }
    if ((heap.u32(unaff_ESI + (6) * 4) & 8) != 0) {
      FUN_00448a45(heap, unaff_ESI, uVar2, uVar1);
    }
    heap.u32(unaff_ESI + (7) * 4) = 0xff;
  }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}

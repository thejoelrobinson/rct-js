// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42de29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0042de29(heap) {
  let in_EAX = 0;
  let extraout_CX = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let in_ZF = 0;
  FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.u32((unaff_ESI + 0x28)) = unaff_EBX;
    heap.u32(unaff_ESI + (0x14) * 4) = 0x40;
    heap.u32(unaff_ESI + (9) * 4) = 0x14;
    heap.u32(unaff_ESI + (0x15) * 4) = 0x1e;
    heap.u32(unaff_ESI) = 2;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (1) * 4) = 1;
    heap.u32((unaff_ESI + 0x26)) = 0;
    heap.u32((unaff_ESI + 0x24)) = 0;
    heap.setU32(0x00971e86, (heap.u32((unaff_ESI + 0x28))) >>> 0);
    if (heap.u32(0x00971e86) < 0) {
      heap.setU32(0x00971e86, (-heap.u32(0x00971e86)) >>> 0);
    }
    FUN_00458bcf(heap);
    heap.setU32(0x00971e84, (0xe0) >>> 0);
    FUN_00458a7c(heap);
    heap.u32((unaff_ESI + 0x44)) = -(extraout_CX >>> 1);
    heap.u32((unaff_ESI + 0x46)) = 0;
  }
  return CONCAT44(in_EDX, in_EAX);
}

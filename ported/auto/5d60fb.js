// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d60fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00424db7 } from "./424db7.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e6bcd } from "./5e6bcd.js";
export function FUN_005d60fb(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_006521b8 = __sp + 0;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  heap.setU32(0x0065d8cf, (FUN_005d3b30(heap)) >>> 0);
  FUN_005e3f31(heap);
  heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_006521b8;
  heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x34;
  FUN_005e412c(heap);
  heap.u32((unaff_ESI + 0x15a)) = 0xffff;
  heap.u32((unaff_ESI + 0x15c)) = 0xffff;
  FUN_005e6bcd(heap);
  heap.setU32(0x00652290, (0) >>> 0);
  FUN_005e0c2f(heap);
  FUN_00424db7(heap);
  heap.setU32(0x006522b0, (0x80000000) >>> 0);
  heap.setU32(0x006522b4, (0xffff) >>> 0);
  heap.setU32(0x006522b8, (0) >>> 0);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}

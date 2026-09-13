// @manual — do not regenerate.
// Source: decompiled/c/5e6a83.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_005e6a83_exact(heap) {
  FUN_005e6a83(heap);
  regs.cf = 0; regs.zf = 1; regs.sf = 0; regs.of = 0;
}

export function FUN_005e6a83(heap) {
  let psVar1 = 0;
  let puVar2 = 0;
  puVar2 = ((0x009a121c) >>> 0);
  psVar1 = ((0x009a1168) >>> 0);
  do {
    if (heap.i16(psVar1) != 0) {
      heap.setU32(puVar2, (psVar1) & 0xffffffff);
      puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
    }
    psVar1 = ((psVar1 + ((10) * 2)) >>> 0);
  } while (psVar1 < 0x009a121c);
  heap.setU32(puVar2, (0) & 0xffffffff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bc184.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";
export function FUN_009bc184(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  if (heap.u8(0x00971ef0) != 0) {
    if ((heap.u32(0x00991f64) | 0) != -1) {
      (regs.eax = FUN_005e117d(heap));
    }
    iVar2 = ((heap.u32(0x0099fb7c)) >>> 0);
    puVar4 = ((0x009aa27c) >>> 0);
    if (heap.u32(0x009b227c) == 0) {
      return;
    }
    do {
      uVar1 = ((heap.u32(puVar4)) >>> 0);
      puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
      heap.setI8(((uVar1 >>> 8) + iVar2), (((uVar1) << 24 >> 24)) & 0xff);
      uVar3 = ((heap.i16(0x009b227c) - 1) & 0xffff);
      heap.setU32(0x009b227c, (((uVar3) >>> 0)) >>> 0);
    } while (uVar3 != 0);
    heap.setU32(0x005e9154, (1) >>> 0);
  }
  heap.setU32(0x009b227c, (0) >>> 0);
  return;
}

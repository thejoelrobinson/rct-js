// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4253e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_004253e3(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar3 = 0;
  bVar3 = ((false) & 0xff);
  if ((heap.u8(0x005f494b) == 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar3)) {
    puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
    uVar2 = ((heap.u16(puVar1)) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) | 0x400) & 0xffffffff);
    if ((uVar2 >>> 10 & 1) == 0) {
      (regs.eax = FUN_005e43de(heap));
    }
  }
  heap.setU8(0x005f494b, (heap.u8(0x005f494b) + 1) & 0xff);
  return;
}

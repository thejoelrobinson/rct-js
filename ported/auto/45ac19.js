// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45ac19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0045ac6f } from "./45ac6f.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045ac19(heap) {
  let uVar1 = 0;
  let extraout_CX = 0;
  uVar1 = ((heap.u32((heap.u32((0x0064bc70) + (heap.u8(0x008d7eaa)) * 4) + (heap.u32(0x006e3b80) & 7) * 4))) >>> 0);
  (regs.eax = FUN_005df40c(heap));
  heap.setU8(0x008d7eaf, ((regs.eax = FUN_0045ac6f(heap))) & 0xff);
  heap.setU8(0x008d7eb1, (((uVar1) << 24 >> 24)) & 0xff);
  heap.setU8(0x008d7eb3, ((((((uVar1) >>> 0) >>> 8)) << 24 >> 24)) & 0xff);
  heap.setU8(0x008d7eb5, (((extraout_CX) << 24 >> 24)) & 0xff);
  heap.setU8(0x008d7eb7, ((((((extraout_CX) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
  heap.setU8(0x008d7eac, (0x780) & 0xff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43645c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_00436d2d } from "./436d2d.js";
import { FUN_0045aaf8 } from "./45aaf8.js";
import { FUN_0045abea } from "./45abea.js";
import { FUN_005e06cc } from "./5e06cc.js";
export function FUN_0043645c(heap) {
  let iVar1 = 0;
  let puVar2 = 0;
  (regs.eax = FUN_0045aaf8(heap));
  heap.setU32(0x008ae938, (0) >>> 0);
  heap.setU32(0x00743b90, (0) >>> 0);
  puVar2 = ((0x006e3b90) >>> 0);
  iVar1 = ((0x4000) >>> 0);
  do {
    heap.setU8(puVar2, (0) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 1), (0x80) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 2), (4) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 3), (0) & 0xff);
    heap.setU8((puVar2 + ((1) * 4)), (0) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 5), (0) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 6), (1) & 0xff);
    heap.setU8((((puVar2) >>> 0) + 7), (0) & 0xff);
    puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
    iVar1 = ((iVar1 + -1) >>> 0);
  } while (iVar1 != 0);
  heap.setU32(0x008d4228, (0) >>> 0);
  (regs.eax = FUN_00436558(heap));
  (regs.eax = FUN_00436d2d(heap));
  (regs.eax = FUN_005e06cc(heap));
  return (regs.eax = FUN_0045abea(heap));
}

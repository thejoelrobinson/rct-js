// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452835.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00407696 } from "./407696.js";
import { FUN_0040776d } from "./40776d.js";
import { FUN_0040d3a0 } from "./40d3a0.js";
import { FUN_00453ed8 } from "./453ed8.js";
import { FUN_00453f0a } from "./453f0a.js";
import { FUN_00454300 } from "./454300.js";
import { FUN_0045432a } from "./45432a.js";
export function FUN_00452835(heap) {
  let uVar1 = 0;
  if ((heap.u32(0x006323f4) | 0) != -1) {
    (regs.eax = FUN_00453f0a(heap));
    (regs.eax = FUN_00454300(heap));
    (regs.eax = FUN_0045432a(heap));
    uVar1 = ((heap.u32(0x006323f8) & 1) >>> 0);
    heap.setU32(0x006323f8, (heap.u32(0x006323f8) & 0xfffffffe) >>> 0);
    if (uVar1 != 0) {
      (regs.eax = FUN_00453ed8(heap));
      (regs.eax = FUN_0040d3a0(heap));
    }
    (regs.eax = FUN_0040776d(heap));
    (regs.eax = FUN_00407696(heap));
    heap.setU32(0x006323f4, (-1) >>> 0);
  }
  return;
}

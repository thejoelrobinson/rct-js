// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4167c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00416f60 } from "./416f60.js";
import { FUN_00418010 } from "./418010.js";
export function FUN_004167c0(heap, param_1) {
  let cVar1 = 0;
  let cVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  iVar3 = (((regs.eax = FUN_00418010(heap, ((heap.i8(param_1)) >>> 0)))) >>> 0);
  if (iVar3 != 0x65) {
    do {
      param_1 = ((param_1 + 1) >>> 0);
      if (heap.u32(0x005ee754) < 2) {
        uVar4 = ((((heap.u32(heap.u32(0x005ee548) + (heap.i8(param_1) * 2) * 4)) & 0xff) & 4) >>> 0);
      } else {
        uVar4 = (((regs.eax = FUN_00416f60(heap, ((heap.i8(param_1)) >>> 0), 4))) >>> 0);
      }
    } while (uVar4 != 0);
  }
  cVar2 = ((heap.i8(param_1)) & 0xff);
  heap.setU32(param_1, (heap.u32(0x005ee758)) & 0xffffffff);
  do {
    param_1 = ((param_1 + 1) >>> 0);
    cVar1 = ((heap.i8(param_1)) & 0xff);
    heap.setU32(param_1, (cVar2) & 0xffffffff);
    cVar2 = ((cVar1) & 0xff);
  } while (heap.i8(param_1) != 0);
  return;
}

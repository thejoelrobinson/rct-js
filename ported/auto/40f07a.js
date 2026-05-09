// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f07a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { StretchDIBits } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00404b57 } from "./404b57.js";
import { FUN_00414210 } from "./414210.js";
export function FUN_0040f07a(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  let uVar2 = 0;
  if (heap.u32(0x005ec080) == ((0x0) >>> 0)) {
    uVar2 = ((0) >>> 0);
  } else {
    iVar1 = ((StretchDIBits(heap, heap.u32(0x005ec080), param_2, param_3, heap.u32(param_1 + (2) * 4) - heap.u32(param_1), heap.u32(param_1 + (3) * 4) - heap.u32(param_1 + (1) * 4), heap.u32(param_1), heap.u32(0x005ec08c) - heap.u32(param_1 + (3) * 4), heap.u32(param_1 + (2) * 4) - heap.u32(param_1), heap.u32(param_1 + (3) * 4) - heap.u32(param_1 + (1) * 4), heap.u32(0x005ec088), heap.u32(0x005ec084), 0, 0xcc0020)) >>> 0);
    if ((iVar1 | 0) == -1) {
      (regs.eax = FUN_00404b57(heap, 0x005ec0a4));
      uVar2 = (((regs.eax = FUN_00414210(heap, 0))) >>> 0);
    } else {
      uVar2 = ((1) >>> 0);
    }
  }
  return uVar2;
}

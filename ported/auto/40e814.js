// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e814.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreateCompatibleDC, CreateDIBSection, DeleteDC, SelectPalette } from "../../runtime/win32.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_0040e814(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005eee9a = __sp + 0;
  const __addr_DAT_005eee99 = __sp + 4;
  const __addr_DAT_005eee98 = __sp + 8;
  try {
  let iVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let hdc = 0;
  let pHVar5 = 0;
  let local_20 = 0;
  let local_10 = 0;
  heap.setU32((param_1 + (0x24) * 4), (0) >>> 0);
  uVar3 = FUN_004133c0(heap, 0x428);
  heap.setU32((param_1 + (0x22) * 4), (uVar3) >>> 0);
  if (heap.u32(param_1 + (0x22) * 4) == 0) {
    uVar3 = 0;
  } else {
    iVar1 = heap.u32(param_1 + (0x22) * 4);
    for (local_10 = 0; local_10 < 0x100; local_10 = local_10 + 1) {
      heap.setU32((iVar1 + 0x2a + local_10 * 4), (heap.u32((__addr_DAT_005eee9a) + (local_10 * 4) * 4)) >>> 0);
      heap.setU32((iVar1 + 0x29 + local_10 * 4), (heap.u32((__addr_DAT_005eee99) + (local_10 * 4) * 4)) >>> 0);
      heap.setU32((iVar1 + 0x28 + local_10 * 4), (heap.u32((__addr_DAT_005eee98) + (local_10 * 4) * 4)) >>> 0);
      heap.setU32((iVar1 + 0x2b + local_10 * 4), (0) >>> 0);
    }
    puVar2 = heap.u32(param_1 + (0x22) * 4);
    uVar4 = param_2 + 3 & 0xfffffffc;
    heap.setU32(puVar2, (0x28) >>> 0);
    heap.setU32((puVar2 + (1) * 4), (param_2) >>> 0);
    heap.setU32((puVar2 + (2) * 4), (-param_3) >>> 0);
    heap.setU32((puVar2 + 3), (1) >>> 0);
    heap.setU32((puVar2 + 0xe), (8) >>> 0);
    heap.setU32((puVar2 + (4) * 4), (0) >>> 0);
    heap.setU32((puVar2 + (5) * 4), (uVar4 * param_3) >>> 0);
    heap.setU32((puVar2 + (6) * 4), (0) >>> 0);
    heap.setU32((puVar2 + (7) * 4), (0) >>> 0);
    heap.setU32((puVar2 + (8) * 4), (0x100) >>> 0);
    heap.setU32((puVar2 + (9) * 4), (0x100) >>> 0);
    hdc = CreateCompatibleDC(heap, 0x0);
    if (hdc == 0x0) {
      uVar3 = 0;
    } else {
      if (heap.u32(0x005ec07c) == 0x0) {
        local_20 = 0x0;
      } else {
        local_20 = SelectPalette(heap, hdc, heap.u32(0x005ec07c), 1);
      }
      pHVar5 = CreateDIBSection(heap, hdc, heap.u32(param_1 + (0x22) * 4), 0, (param_1 + 0x21), 0x0, 0);
      heap.setU32((param_1 + (0x23) * 4), (pHVar5) >>> 0);
      if (local_20 != 0x0) {
        SelectPalette(heap, hdc, local_20, 1);
      }
      DeleteDC(heap, hdc);
      if (heap.u32(param_1 + (0x21) * 4) == 0) {
        uVar3 = 0;
      } else {
        heap.setU32((param_1 + 6), (param_2) >>> 0);
        heap.setU32((param_1 + 2), (param_3) >>> 0);
        heap.setU32((param_1 + (4) * 4), (uVar4) >>> 0);
        heap.setU32(param_1, (heap.u32(param_1 + (0x21) * 4)) >>> 0);
        uVar3 = 1;
      }
    }
  }
  return uVar3;
} finally {
    heap.freeFrame(12);
  }
}

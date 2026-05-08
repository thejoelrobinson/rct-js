// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401120.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateRectRgn, GetRegionData, GetUpdateRgn } from "../runtime/win32.js";
import { FUN_004015f0 } from "./4015f0.js";
import { FUN_0040179d } from "./40179d.js";
export function FUN_00401120(heap, param_1) {
  const __sp = heap.allocFrame(192);
  const __addr_local_120 = __sp + 0;
  const __addr_local_fc = __sp + 128;
  try {
  let hRgn = 0;
  let iVar1 = 0;
  let DVar2 = 0;
  let uVar4 = 0;
  if (param_1 == 0x0) {
    heap.setU32(0x005e9154, (1) >>> 0);
  } else {
    hRgn = CreateRectRgn(heap, 0, 0, 1, 1);
    if (hRgn != 0x0) {
      iVar1 = GetUpdateRgn(heap, heap.u32(0x005e916c), hRgn, 0);
      if (iVar1 == 2) {
        FUN_004015f0(heap, heap.u32(param_1), heap.u32(param_1 + (1) * 4), heap.u32(param_1 + (2) * 4), heap.u32(param_1 + (3) * 4));
      } else {
        if (iVar1 == 3) {
        heap.u32(heap.u32(__addr_local_120)) = 0x20;
        DVar2 = GetRegionData(heap, hRgn, 0x120, __addr_local_120);
        if ((DVar2 != 0) && (uVar4 = 0, heap.u32((heap.u32(__addr_local_120) + 4)) != 0)) {
          puVar3 = __addr_local_fc + 1;
          do {
            FUN_004015f0(heap, heap.u32(puVar3 + (-2) * 4), heap.u32(puVar3 + (-1) * 4), heap.u32(puVar3), heap.u32(puVar3 + (1) * 4));
            uVar4 = uVar4 + 1;
            puVar3 = puVar3 + 4;
          } while (uVar4 < heap.u32((heap.u32(__addr_local_120) + 4)));
        }
      }
      }
    }
  }
  if ((heap.u32(0x005e9104) != 0) && (heap.u32(0x005e9100) != 0)) {
    FUN_0040179d(heap);
  }
  return;
} finally {
    heap.freeFrame(192);
  }
}

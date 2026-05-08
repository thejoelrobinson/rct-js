// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4097f7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
import { FUN_00409785 } from "./409785.js";
import { FUN_00413470 } from "./413470.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_004097f7(heap, param_1, param_2) {
  let iVar3 = 0;
  puVar2 = FUN_00413830(heap, 1, 0xc);
  local_8 = FUN_00413830(heap, 1, 0xa8);
  if ((local_8 == 0x0) || (puVar2 == 0x0)) {
    if (local_8 != 0x0) {
      FUN_00413470(heap, local_8);
      local_8 = 0x0;
    }
    if (puVar2 != 0x0) {
      FUN_00413470(heap, puVar2);
    }
  } else {
    _memset(local_8, 0, 0xa8);
    heap.u32((local_8 + 0x14)) = 0x6c;
    heap.u32((local_8 + 0x18)) = 0x1007;
    heap.u32((local_8 + 0x7c)) = 0x840;
    heap.u32((local_8 + 0x20)) = param_1;
    heap.u32((local_8 + 0x1c)) = param_2;
    heap.u32((local_8 + 0x5c)) = 0x20;
    heap.u32((local_8 + 0x60)) = 0x60;
    heap.u32((local_8 + 0x68)) = 8;
    heap.u32((local_8 + 0x6c)) = 0;
    heap.u32((local_8 + 0x70)) = 0;
    heap.u32((local_8 + 0x74)) = 0;
    heap.u32((local_8 + 0x78)) = 0;
    iVar3 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), local_8 + 0x14, local_8 + 0x80, 0);
    puVar1 = heap.u32(0x005ebf48);
    if (iVar3 == 0) {
      local_14 = heap.u32(0x005ebf48);
      heap.u32(puVar2) = local_8;
      heap.u32(puVar2 + (1) * 4) = heap.u32((local_8 + 0x80));
      heap.u32(puVar2 + (2) * 4) = 0;
      if (puVar1 != 0x0) {
        for (; heap.u32(local_14 + (2) * 4) != 0; local_14 = heap.u32(local_14 + (2) * 4)) {
        
        }
        heap.u32(local_14 + (2) * 4) = puVar2;
        puVar2 = heap.u32(0x005ebf48);
      }
      heap.setU32(0x005ebf48, (puVar2) >>> 0);
      FUN_00409785(heap, local_8);
      iVar3 = (heap.u32(heap.u32((heap.u32(heap.u32((local_8 + 0x80))) + 0x7c))))(heap.u32((local_8 + 0x80)), heap.u32(0x005ebf3c));
      if ((iVar3 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(heap), iVar3 != 0)) {
        (heap.u32(heap.u32((heap.u32(heap.u32((local_8 + 0x80))) + 0x7c))))(heap.u32((local_8 + 0x80)), heap.u32(0x005ebf3c));
      }
    } else {
      FUN_00413470(heap, puVar2);
      FUN_00413470(heap, local_8);
      local_8 = 0x0;
    }
  }
  return local_8;
}

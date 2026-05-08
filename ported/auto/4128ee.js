// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4128ee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00412a85 } from "./412a85.js";
export function FUN_004128ee(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let LVar2 = 0;
  let MVar3 = 0;
  let local_8 = 0;
  LVar2 = mmioSeek(heap.u32(param_1), heap.u32((param_3 + 12)) + 4, 0);
  if (LVar2 == -1) {
    local_8 = 0xe102;
  } else {
    local_8 = 0;
    while (MVar3 = mmioDescend(heap.u32(param_1), param_2, param_3, 0), MVar3 == 0 && (heap.u32((param_2 + 4)) + heap.u32((param_2 + 12)) <= heap.u32((param_3 + 4)) + heap.u32((param_3 + 12)))) {
      uVar1 = heap.u32(param_2);
      if ((0x20657563 < uVar1) && (0x4b4e554a < uVar1)) {
        if (uVar1 < 0x61746165) {
          if ((uVar1 != 0x61746164) && (uVar1 == 0x50534944)) {
            FUN_00412a85(heap, heap.u32(param_1), heap.u32(param_4), param_2);
          }
        } else {
          if ((uVar1 != 0x74636166) && (uVar1 == 0x74736c70)) {
          FUN_00412a85(heap, heap.u32(param_1), heap.u32(param_4), param_2);
        }
        }
      }
      mmioAscend(heap.u32(param_1), param_2, 0);
    }
  }
  mmioSeek(heap.u32(param_1), heap.u32((param_3 + 12)) + 4, 0);
  return local_8;
}

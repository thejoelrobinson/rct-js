// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412759.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { HMMIO } from "../runtime/win32.js";
export function FUN_00412759(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000014 = __sp + 0;
  try {
  let MVar1 = 0;
  let local_8 = 0;
  if (heap.u32(param_1) == 0) {
    local_8 = 0;
  } else {
    heap.u32((param_4 + 4)) = heap.u32((param_4 + 4)) | 0x10000000;
    local_8 = mmioSetInfo((HMMIO) * param_1, param_4, 0);
    if (((local_8 == 0) && (local_8 = mmioAscend((HMMIO) * param_1, param_2, 0), local_8 == 0)) && (local_8 = mmioAscend((HMMIO) * param_1, param_3, 0), local_8 == 0)) {
      mmioSeek((HMMIO) * param_1, 0, 0);
      local_8 = mmioDescend((HMMIO) * param_1, param_3, 0x0, 0);
      if (local_8 == 0) {
        heap.u32(param_2) = 0x74636166;
        MVar1 = mmioDescend((HMMIO) * param_1, param_2, param_3, 0x10);
        if (MVar1 == 0) {
          mmioWrite((HMMIO) * param_1, __addr_stack0x00000014, 4);
          mmioAscend((HMMIO) * param_1, param_2, 0);
        }
        local_8 = mmioAscend((HMMIO) * param_1, param_3, 0);
      }
    }
    if (heap.u32(param_1) != 0) {
      mmioClose((HMMIO) * param_1, 0);
      heap.u32(param_1) = 0;
    }
  }
  return local_8;
} finally {
    heap.freeFrame(4);
  }
}

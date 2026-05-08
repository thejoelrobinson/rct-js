// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411b58.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FindResourceA, LoadResource, LockResource } from "../../runtime/win32.js";
export function FUN_00411b58(heap, param_1, param_2) {
  const __sp = heap.allocFrame(1048);
  const __addr_local_14 = __sp + 0;
  const __addr_local_458 = __sp + 4;
  const __addr_local_430 = __sp + 8;
  const __addr_local_41c = __sp + 24;
  try {
  let uVar1 = 0;
  let hResData = 0;
  let local_44a = 0;
  let local_438 = 0;
  let local_420 = 0;
  let local_18 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  for (local_18 = 0; local_18 < 0x100; local_18 = local_18 + 1) {
    heap.u32(__addr_local_41c + (local_18 * 4) * 4) = (((local_18 >>> 5 & 7) * 0xff) / 7);
    heap.u32(__addr_local_41c + (local_18 * 4 + 1) * 4) = (((local_18 >>> 2 & 7) * 0xff) / 7);
    heap.u32(__addr_local_41c + (local_18 * 4 + 2) * 4) = (((local_18 & 3) * 0xff) / 3);
    heap.u32(__addr_local_41c + (local_18 * 4 + 3) * 4) = 0;
  }
  if ((param_2 == 0x0) || (local_10 = FindResourceA(heap, 0x0, param_2, 0x2), local_10 == 0x0)) {
    if ((param_2 != 0x0) && (local_c = _lopen(param_2, 0), local_c != -1)) {
      _lread(local_c, __addr_local_430, 0xe);
      _lread(local_c, __addr_local_458, 0x28);
      _lread(local_c, __addr_local_41c, 0x400);
      _lclose(local_c);
      if (heap.u32(__addr_local_458 + (0) * 4) == 0x28) {
        if (local_44a < 9) {
          if (local_438 == 0) {
            local_420 = 1 << (local_44a & 0x1f);
          } else {
            local_420 = local_438;
          }
        } else {
          local_420 = 0;
        }
      } else {
        local_420 = 0;
      }
      for (local_18 = 0; local_18 < local_420; local_18 = local_18 + 1) {
        uVar1 = heap.u32(__addr_local_41c + (local_18 * 4) * 4);
        heap.u32(__addr_local_41c + (local_18 * 4) * 4) = heap.u32(__addr_local_41c + (local_18 * 4 + 2) * 4);
        heap.u32(__addr_local_41c + (local_18 * 4 + 2) * 4) = uVar1;
      }
    }
  } else {
    hResData = LoadResource(heap, 0x0, local_10);
    local_1c = LockResource(heap, hResData);
    local_8 = heap.u32(local_1c) + local_1c;
    if ((local_1c == 0x0) || (heap.u32(local_1c) < 0x28)) {
      local_420 = 0;
    } else {
      if (heap.u32((local_1c + 0xe)) < 9) {
      if (heap.u32(local_1c + (8) * 4) == 0) {
        local_420 = 1 << (heap.u32((local_1c + 0xe)) & 0x1f);
      } else {
        local_420 = heap.u32(local_1c + (8) * 4);
      }
    } else {
      local_420 = 0;
    }
    }
    for (local_18 = 0; local_18 < local_420; local_18 = local_18 + 1) {
      heap.u32(__addr_local_41c + (local_18 * 4) * 4) = heap.u32((local_8 + 2 + local_18 * 4));
      heap.u32(__addr_local_41c + (local_18 * 4 + 1) * 4) = heap.u32((local_8 + 1 + local_18 * 4));
      heap.u32(__addr_local_41c + (local_18 * 4 + 2) * 4) = heap.u32((local_8 + local_18 * 4));
      heap.u32(__addr_local_41c + (local_18 * 4 + 3) * 4) = 0;
    }
  }
  (heap.u32(heap.u32((heap.u32(param_1) + 0x14))))(param_1, 4, __addr_local_41c, __addr_local_14, 0);
  return heap.u32(__addr_local_14);
} finally {
    heap.freeFrame(1048);
  }
}

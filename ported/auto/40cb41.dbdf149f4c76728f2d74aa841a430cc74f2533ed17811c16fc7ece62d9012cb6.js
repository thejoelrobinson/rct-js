// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40cb41.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040c93f } from "./40c93f.js";
import { FUN_004122a3 } from "./4122a3.js";
export function FUN_0040cb41(heap, param_1) {
  const __sp = heap.allocFrame(28);
  const __addr_local_20 = __sp + 0;
  const __addr_local_10 = __sp + 16;
  const __addr_local_18 = __sp + 8;
  const __addr_local_c = __sp + 20;
  const __addr_local_1c = __sp + 4;
  const __addr_local_14 = __sp + 12;
  const __addr_local_8 = __sp + 24;
  try {
  let local_28 = 0;
  let local_24 = 0;
  heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x2c)), heap.u32((0x005ebfe8 + param_1 * 4)), 0, heap.u32((0x005f04f0 + param_1 * 0x16c)), __addr_local_20, __addr_local_10, __addr_local_18, __addr_local_1c, 0))) >>> 0);
  if (heap.u32(__addr_local_8) == 0) {
    if ((heap.u32(__addr_local_10) != 0) && (heap.setU32(__addr_local_14, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + param_1 * 0x16c)), heap.u32(__addr_local_10), heap.u32(__addr_local_20), param_1 * 0x16c + 0x5f04c4, __addr_local_c))) >>> 0), heap.u32(__addr_local_c) < heap.u32(__addr_local_10))) {
      if (heap.i32((0x005f0504 + param_1 * 0x16c)) == 0) {
        heap.setU32((0x005f0508 + param_1 * 0x16c), (1) & 0xffffffff);
        heap.setU32((0x005f04fc + param_1 * 0x16c), (heap.u32(__addr_local_c)) & 0xffffffff);
        _memset(heap, (heap.u32(__addr_local_c) + heap.u32(__addr_local_20)), ((-(heap.i16((heap.i32((0x005f04bc + param_1 * 0x16c)) + 0xe)) == 8) & 0x80) >>> 0), heap.u32(__addr_local_10) - heap.u32(__addr_local_c));
      } else {
        local_24 = ((heap.u32(__addr_local_20)) >>> 0);
        local_28 = ((heap.u32(__addr_local_10)) >>> 0);
        do {
          local_24 = ((local_24 + heap.u32(__addr_local_c)) >>> 0);
          local_28 = ((local_28 - heap.u32(__addr_local_c)) >>> 0);
          (regs.eax = FUN_0040c93f(heap, param_1));
          heap.setU32(__addr_local_14, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + param_1 * 0x16c)), local_28, local_24, param_1 * 0x16c + 0x5f04c4, __addr_local_c))) >>> 0);
        } while (heap.u32(__addr_local_c) < local_28);
      }
    }
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x4c)), heap.u32((0x005ebfe8 + param_1 * 4)), heap.u32(__addr_local_20), heap.u32(__addr_local_10), heap.u32(__addr_local_18), 0));
    heap.setU32((0x005f04f8 + param_1 * 0x16c), (0) & 0xffffffff);
    heap.setU32((0x005f04f4 + param_1 * 0x16c), (heap.u32((0x005f04f8 + param_1 * 0x16c))) & 0xffffffff);
  }
  return;
} finally {
    heap.freeFrame(28);
  }
}

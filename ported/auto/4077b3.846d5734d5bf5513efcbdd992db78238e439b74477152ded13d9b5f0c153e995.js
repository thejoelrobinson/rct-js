// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4077b3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004079d3 } from "./4079d3.js";
import { FUN_0040db5e } from "./40db5e.js";
import { FUN_0040dba3 } from "./40dba3.js";
import { FUN_0040dc6f } from "./40dc6f.js";
import { FUN_0040dc84 } from "./40dc84.js";
import { FUN_0040dcaf } from "./40dcaf.js";
import { FUN_0040de9c } from "./40de9c.js";
export function FUN_004077b3(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(68);
  const __addr_local_c = __sp + 60;
  const __addr_local_24 = __sp + 36;
  const __addr_local_14 = __sp + 52;
  const __addr_local_1c = __sp + 44;
  const __addr_local_38 = __sp + 16;
  const __addr_local_30 = __sp + 24;
  const __addr_local_20 = __sp + 40;
  const __addr_local_18 = __sp + 48;
  const __addr_local_10 = __sp + 56;
  const __addr_local_8 = __sp + 64;
  try {
  let iVar1 = 0;
  heap.setU32(__addr_local_1c, (0) >>> 0);
  heap.setU32(__addr_local_18, (0) >>> 0);
  heap.setU32(__addr_local_14, (0) >>> 0);
  heap.setU32(__addr_local_10, (0) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  heap.setU32(__addr_local_24, (0) >>> 0);
  heap.setU32(__addr_local_20, ((regs.eax = FUN_0040dc6f(heap))) >>> 0);
  while (true) {
    if (heap.u32(__addr_local_20) == 0x0) {
      heap.setU32(__addr_local_8, ((regs.eax = FUN_0040de9c(heap, param_1))) >>> 0);
      if (heap.u32(__addr_local_8) != 0) {
        iVar1 = (((regs.eax = FUN_0040db5e(heap, heap.u32(__addr_local_8), __addr_local_c, __addr_local_24, __addr_local_14))) >>> 0);
        if (iVar1 != 0) {
          heap.setU32(__addr_local_1c, (0x14) >>> 0);
          heap.setU32(__addr_local_18, (0x10002) >>> 0);
          if (param_3 != 0) {
            if (param_3 == 2) {
              heap.setU32(__addr_local_18, (0x10012) >>> 0);
            } else {
              if (param_3 == 3) {
              heap.setU32(__addr_local_18, (0x101f2) >>> 0);
            } else {
              heap.setU32(__addr_local_18, (0x100e2) >>> 0);
            }
            }
          }
          if (heap.u32(0x005ebf14) != 0) {
            heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) | 0x4000) >>> 0);
          }
          if (param_4 != 0) {
            heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) | 8) >>> 0);
          }
          iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0xc)), heap.u32(0x005ec05c), __addr_local_1c, param_2, 0))) >>> 0);
          if (iVar1 == 0) {
            iVar1 = (((regs.eax = FUN_0040dba3(heap, heap.u32(param_2), heap.u32(__addr_local_24), heap.u32(__addr_local_14)))) >>> 0);
            if (iVar1 != 0) {
              heap.setU32((param_2 + (2) * 4), (param_3) & 0xffffffff);
              heap.setU32((param_2 + (1) * 4), (param_1) & 0xffffffff);
              heap.setU32((__addr_local_38 + (0) * 4), (0x14) & 0xffffffff);
              (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(param_2)) + 0xc)), heap.u32(param_2), __addr_local_38));
              heap.setU32((param_2 + (3) * 4), (heap.u32(__addr_local_30)) & 0xffffffff);
              (regs.eax = FUN_0040dcaf(heap, param_2));
              return 1;
            }
            (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(param_2)) + 8)), heap.u32(param_2)));
            heap.setU32(param_2, (0) & 0xffffffff);
          }
        }
        heap.setU32(param_2, (0) & 0xffffffff);
      }
      return 0;
    }
    if (((heap.i32(heap.u32(__addr_local_20)) != 0) && (heap.i32(heap.u32(__addr_local_20) + (1) * 4) == param_1)) && (iVar1 = (((regs.eax = FUN_004079d3(heap, param_2, heap.u32(__addr_local_20)))) >>> 0), iVar1 != 0)) {
      break;
    }
    heap.setU32(__addr_local_20, ((regs.eax = FUN_0040dc84(heap, heap.u32(__addr_local_20)))) >>> 0);
  }
  return 1;
} finally {
    heap.freeFrame(68);
  }
}

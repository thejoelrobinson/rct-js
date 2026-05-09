// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4113d9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00410e47 } from "./410e47.js";
import { FUN_00410eee } from "./410eee.js";
import { FUN_00410f7e } from "./410f7e.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004113d9(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(28);
  const __addr_local_8 = __sp + 24;
  const __addr_param_2 = __sp + 4;
  const __addr_local_18 = __sp + 8;
  const __addr_local_14 = __sp + 12;
  const __addr_local_10 = __sp + 16;
  const __addr_local_c = __sp + 20;
  heap.setU32(__addr_param_2, (param_2) >>> 0);
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  if (((heap.u32(0x005ec160) != 0) && (heap.u32(0x005ec15c) != 0)) && (heap.u32(0x005ec158) != 0x0)) {
    heap.setU32(__addr_local_14, (0x200) >>> 0);
    heap.setU32(__addr_local_10, (1) >>> 0);
    do {
      heap.setU32(__addr_local_c, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x54)), heap.u32(0x005ec158), __addr_local_8, __addr_local_18, 1, param_1, __addr_param_2))) >>> 0);
      if (heap.u32(__addr_local_c) == 0) {
        uVar1 = ((heap.u32(param_1)) >>> 0);
        if (uVar1 < 0x32) {
          if (uVar1 == 0x31) {
            heap.setU32(0x005ec1c4, (1) >>> 0);
          } else {
            if (uVar1 == 3) {
            heap.setU32(0x005ec1c0, ((regs.eax = FUN_00410e47(heap, heap.u32(param_1 + (2) * 4), param_1 + 3, param_1 + 0x10))) >>> 0);
          } else {
            if (uVar1 != 5) {
              /* goto LAB_00411516 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004113d9/LAB_00411516"); return 0;
            }
            (regs.eax = FUN_00410eee(heap, heap.u32(param_1 + (1) * 4)));
            heap.setU32(0x005ec1c0, (1) >>> 0);
          }
          }
        } else {
          if (uVar1 == 0x1000) {
          iVar2 = (((regs.eax = FUN_00410f7e(heap, heap.u32(param_1 + (1) * 4)))) >>> 0);
          if (iVar2 != 0) {
            (regs.eax = FUN_00413170(heap, iVar2 + 4, param_1 + 2));
            (regs.eax = FUN_00413170(heap, iVar2 + 0x38, param_1 + 0xf));
            heap.setU32(0x005ec1c0, (1) >>> 0);
          }
        } else {
          LAB_00411516: heap.setU32(__addr_local_10, (0) >>> 0);
        }
        }
      }
    } while ((heap.u32(__addr_local_10) != 0) && (heap.u32(__addr_local_c) == 0));
    if (heap.u32(__addr_local_c) == 0) {
      if (param_3 == 0x0) {
        return heap.u32(__addr_param_2);
      }
      uVar3 = (((regs.eax = FUN_00410f7e(heap, heap.u32(__addr_local_8)))) >>> 0);
      heap.setU32(param_3, (uVar3) & 0xffffffff);
      return heap.u32(__addr_param_2);
    }
  }
  return 0;
} finally {
    heap.freeFrame(28);
  }
}

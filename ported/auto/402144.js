// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402144.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
export function FUN_00402144(heap) {
  const __sp = heap.allocFrame(184);
  const __addr_local_bc = __sp + 0;
  const __addr_local_b6 = __sp + 6;
  const __addr_local_ac = __sp + 16;
  const __addr_local_14 = __sp + 168;
  const __addr_local_10 = __sp + 172;
  const __addr_local_c = __sp + 176;
  const __addr_local_8 = __sp + 180;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  let uVar6 = 0;
  let local_cc = 0;
  let local_c0 = 0;
  local_cc = ((0x005f2420) >>> 0);
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __addr_local_bc))) >>> 0);
  if (iVar1 == 0) {
    uVar2 = ((0) >>> 0);
  } else {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebe5c), __addr_local_bc))) >>> 0);
    if (iVar1 == 0) {
      uVar2 = ((0) >>> 0);
    } else {
      iVar1 = (((regs.eax = FUN_00402a00(heap))) >>> 0);
      if (iVar1 == 0) {
        (regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __addr_local_bc));
        uVar2 = ((0) >>> 0);
      } else {
        heap.setU32(__addr_local_c, (heap.u32(__addr_local_b6)) >>> 0);
        for (local_c0 = ((0) >>> 0); local_c0 < heap.u32(0x005f1b34); local_c0 = (((local_c0 + 8) >>> 0)) >>> 0) {
          heap.setU32(__addr_local_8, (0) >>> 0);
          while (iVar1 = ((heap.u32(__addr_local_8)) >>> 0), heap.u32(__addr_local_8) < 0x500) {
            if (heap.i8(local_cc) == 0) {
              local_cc = ((local_cc + 1) >>> 0);
              heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0);
            } else {
              heap.setU32(__addr_local_14, (8) >>> 0);
              for (; (heap.u32(__addr_local_8) < 0x500 && (heap.i8(local_cc) != 0)); local_cc = (((local_cc + 1) >>> 0)) >>> 0) {
                heap.setU32(local_cc, (0) & 0xffffffff);
                heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0);
              }
              uVar3 = ((heap.u32(__addr_local_8) - iVar1) >>> 0);
              puVar4 = (((local_c0 * heap.u32(0x005f1ff4) + iVar1 + heap.u32(0x005f1fec))) >>> 0);
              puVar5 = (((heap.u32(__addr_local_ac) * local_c0 + iVar1 + heap.u32(__addr_local_bc))) >>> 0);
              heap.setU32(__addr_local_10, (heap.u32(0x005f1ff4) - uVar3) >>> 0);
              uVar6 = ((uVar3 >>> 2) >>> 0);
              iVar1 = ((heap.u32(__addr_local_14)) >>> 0);
              do {
                for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
                  heap.setU32(puVar5, (heap.u32(puVar4)) & 0xffffffff);
                  puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
                  puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
                }
                puVar5 = (((((puVar5) | 0) + (heap.u32(__addr_local_ac) - uVar3))) >>> 0);
                puVar4 = (((((puVar4) | 0) + heap.u32(__addr_local_10))) >>> 0);
                iVar1 = ((iVar1 + -1) >>> 0);
                uVar6 = ((uVar3 >>> 2) >>> 0);
              } while (iVar1 != 0);
              heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
            }
          }
        }
        (regs.eax = FUN_00402aa4(heap));
        (regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __addr_local_bc));
        heap.setU32(0x005f1fe0, (2) >>> 0);
        uVar2 = ((1) >>> 0);
      }
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(184);
  }
}

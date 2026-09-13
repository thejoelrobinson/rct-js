// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4090e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_004090e3(heap) {
  const __sp = heap.allocFrame(52);
  const __addr_local_24 = __sp + 20;
  const __addr_local_34 = __sp + 4;
  const __addr_local_30 = __sp + 8;
  const __addr_local_2c = __sp + 12;
  const __addr_local_28 = __sp + 16;
  const __addr_local_20 = __sp + 24;
  const __addr_local_1c = __sp + 28;
  const __addr_local_18 = __sp + 32;
  const __addr_local_14 = __sp + 36;
  const __addr_local_10 = __sp + 40;
  const __addr_local_c = __sp + 44;
  const __addr_local_8 = __sp + 48;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let local_40 = 0;
  heap.setU32(__addr_local_10, (heap.u32(0x005f138c) + heap.u32(0x005f1a10)) >>> 0);
  heap.setU32(__addr_local_c, (heap.u32(0x005f12a4) + heap.u32(0x005f1a14)) >>> 0);
  if (heap.u32(0x005ebf54) == 0) {
    if (1 < heap.u32(0x005f0950)) {
      uVar1 = ((heap.u32(heap.u32(0x005ebf38))) >>> 0);
      for (local_40 = ((0) >>> 0); local_40 < heap.u32(0x005f0950) + -1; local_40 = (((local_40 + 1) >>> 0)) >>> 0) {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(heap.u32(0x005ebf38) + (local_40) * 4)) + 0x60)), heap.u32(heap.u32(0x005ebf38) + (local_40) * 4)))) >>> 0);
        if ((iVar2 != 0) && (iVar2 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar2 == 0)) {
          return;
        }
        heap.setU32((heap.u32(0x005ebf38) + (local_40) * 4), (heap.u32(heap.u32(0x005ebf38) + (local_40 + 1) * 4)) & 0xffffffff);
      }
      heap.setU32((heap.u32(0x005ebf38) + (local_40) * 4), (uVar1) & 0xffffffff);
    }
  } else {
    if ((heap.u32(0x005f0950) < 2) || (heap.u32(0x005ebf4c) != 0)) {
    if (heap.u32(0x005f12a8) != 0) {
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x58)), heap.u32(0x005ebf30), 1, 0));
    }
  } else {
    if (heap.u32(0x005f1298) != 0) {
      if (heap.u32(0x005f12ac) < heap.u32(__addr_local_10)) {
        heap.setU32(__addr_local_10, (heap.u32(0x005f12ac)) >>> 0);
      }
      if (heap.u32(0x005f129c) < heap.u32(__addr_local_c)) {
        heap.setU32(__addr_local_c, (heap.u32(0x005f129c)) >>> 0);
      }
      heap.setU32(__addr_local_2c, (heap.u32(__addr_local_10) - heap.u32(0x005f1a10)) >>> 0);
      heap.setU32(__addr_local_28, (heap.u32(__addr_local_c) - heap.u32(0x005f1a14)) >>> 0);
      heap.setU32(__addr_local_30, (0) >>> 0);
      heap.setU32(__addr_local_34, (0) >>> 0);
      heap.setU32(__addr_local_20, (0) >>> 0);
      heap.setU32(__addr_local_24, (heap.u32(0x005f0ef4) * 0x40 + 0x40) >>> 0);
      heap.setU32(__addr_local_1c, (heap.u32(__addr_local_24) + heap.u32(__addr_local_2c)) >>> 0);
      heap.setU32(((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4), (heap.u32(0x005f1a10)) & 0xffffffff);
      heap.setU32(((0x005f0f04) + (heap.u32(0x005f0ef4) * 4) * 4), (heap.u32(0x005f1a14)) & 0xffffffff);
      heap.setU32(((0x005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4), (heap.u32(__addr_local_10)) & 0xffffffff);
      heap.setU32(((0x005f0f0c) + (heap.u32(0x005f0ef4) * 4) * 4), (heap.u32(__addr_local_c)) & 0xffffffff);
      heap.setU32(__addr_local_18, (heap.u32(__addr_local_28)) >>> 0);
      heap.setU32(__addr_local_14, (heap.u32(__addr_local_28)) >>> 0);
      heap.setU32(__addr_local_8, (heap.u32(__addr_local_2c)) >>> 0);
      do {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x14)), heap.u32(0x005ebf40), __addr_local_24, heap.u32(heap.u32(0x005ebf38)), 0x005f0f00 + heap.u32(0x005f0ef4) * 4, 0x1000000, 0))) >>> 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
      do {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(heap.u32(0x005ebf38))) + 0x14)), heap.u32(heap.u32(0x005ebf38)), 0x005f0f00 + heap.u32(0x005f0ef4) * 4, heap.u32(0x005ebf40), __addr_local_34, 0x1008000, 0))) >>> 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
    }
    do {
      iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x2c)), heap.u32(0x005ebf34), 0, 1))) >>> 0);
      if ((iVar2 == -0x7789fe3e) && (iVar3 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar3 == 0)) {
        break;
      }
    } while (iVar2 == -0x7789fe3e);
    heap.setU32(0x005f0ef4, (heap.u32(0x005f0ef4) + 1) >>> 0);
    heap.setU32(0x005f12a0, (heap.u32(0x005f0ef4)) >>> 0);
    iVar2 = ((heap.u32(0x005f12a8)) >>> 0);
    if (heap.u32(0x005f0950) <= heap.u32(0x005f0ef4)) {
      heap.setU32(0x005f0ef4, (0) >>> 0);
      heap.setU32(0x005f12a0, (heap.u32(0x005f0ef4)) >>> 0);
    }
    while (iVar2 != 0) {
      iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x48)), heap.u32(0x005ebf34), 2))) >>> 0);
    }
    if (heap.u32((0x005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) != heap.u32((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4) && -1 < ((((heap.u32((0x005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4))) | 0) | 0)) {
      heap.setU32(__addr_local_8, (heap.u32((0x005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4)) >>> 0);
      heap.setU32(__addr_local_18, (heap.u32((0x005f0f0c) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((0x005f0f04) + (heap.u32(0x005f0ef4) * 4) * 4)) >>> 0);
      heap.setU32(__addr_local_20, (0) >>> 0);
      heap.setU32(__addr_local_24, (heap.u32(0x005f0ef4) * 0x40 + 0x40) >>> 0);
      heap.setU32(__addr_local_1c, (heap.u32(__addr_local_24) + heap.u32(__addr_local_8)) >>> 0);
      heap.setU32(__addr_local_14, (heap.u32(__addr_local_18)) >>> 0);
      do {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(heap.u32(0x005ebf38))) + 0x14)), heap.u32(heap.u32(0x005ebf38)), 0x005f0f00 + heap.u32(0x005f0ef4) * 4, heap.u32(0x005ebf40), __addr_local_24, 0x1000000, 0))) >>> 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
      heap.setU32(((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4), (0) & 0xffffffff);
      heap.setU32(((0x005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4), (heap.u32((0x005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4)) & 0xffffffff);
    }
  }
  }
  return;
} finally {
    heap.freeFrame(52);
  }
}

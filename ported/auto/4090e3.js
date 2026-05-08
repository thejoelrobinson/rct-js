// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4090e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
export function FUN_004090e3(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_005f0f00 = __sp + 0;
  const __addr_DAT_005f0f04 = __sp + 4;
  const __addr_DAT_005f0f08 = __sp + 8;
  const __addr_DAT_005f0f0c = __sp + 12;
  const __addr_local_24 = __sp + 16;
  const __addr_local_34 = __sp + 20;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let local_40 = 0;
  let local_30 = 0;
  let local_2c = 0;
  let local_28 = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_10 = heap.u32(0x005f138c) + heap.u32(0x005f1a10);
  local_c = heap.u32(0x005f12a4) + heap.u32(0x005f1a14);
  if (heap.u32(0x005ebf54) == 0) {
    if (1 < heap.u32(0x005f0950)) {
      uVar1 = heap.u32(heap.u32(0x005ebf38));
      for (local_40 = 0; local_40 < heap.u32(0x005f0950) + -1; local_40 = local_40 + 1) {
        iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(heap.u32(0x005ebf38) + (local_40) * 4)) + 0x60))))(heap.u32(heap.u32(0x005ebf38) + (local_40) * 4));
        if ((iVar2 != 0) && (iVar2 = FUN_00408d5d(heap), iVar2 == 0)) {
          return;
        }
        heap.u32(heap.u32(0x005ebf38) + (local_40) * 4) = heap.u32(heap.u32(0x005ebf38) + (local_40 + 1) * 4);
      }
      heap.u32(heap.u32(0x005ebf38) + (local_40) * 4) = uVar1;
    }
  } else {
    if ((heap.u32(0x005f0950) < 2) || (heap.u32(0x005ebf4c) != 0)) {
    if (heap.u32(0x005f12a8) != 0) {
      (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x58))))(heap.u32(0x005ebf30), 1, 0);
    }
  } else {
    if (heap.u32(0x005f1298) != 0) {
      if (heap.u32(0x005f12ac) < local_10) {
        local_10 = heap.u32(0x005f12ac);
      }
      if (heap.u32(0x005f129c) < local_c) {
        local_c = heap.u32(0x005f129c);
      }
      local_2c = local_10 - heap.u32(0x005f1a10);
      local_28 = local_c - heap.u32(0x005f1a14);
      local_30 = 0;
      heap.setU32(__addr_local_34, (0) >>> 0);
      local_20 = 0;
      heap.setU32(__addr_local_24, (heap.u32(0x005f0ef4) * 0x40 + 0x40) >>> 0);
      local_1c = heap.u32(__addr_local_24) + local_2c;
      heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4) = heap.u32(0x005f1a10);
      heap.u32((__addr_DAT_005f0f04) + (heap.u32(0x005f0ef4) * 4) * 4) = heap.u32(0x005f1a14);
      heap.u32((__addr_DAT_005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) = local_10;
      heap.u32((__addr_DAT_005f0f0c) + (heap.u32(0x005f0ef4) * 4) * 4) = local_c;
      local_18 = local_28;
      local_14 = local_28;
      local_8 = local_2c;
      do {
        iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x14))))(heap.u32(0x005ebf40), __addr_local_24, heap.u32(heap.u32(0x005ebf38)), __addr_DAT_005f0f00 + heap.u32(0x005f0ef4) * 4, 0x1000000, 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(heap), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
      do {
        iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(heap.u32(0x005ebf38))) + 0x14))))(heap.u32(heap.u32(0x005ebf38)), __addr_DAT_005f0f00 + heap.u32(0x005f0ef4) * 4, heap.u32(0x005ebf40), __addr_local_34, 0x1008000, 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(heap), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
    }
    do {
      iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x2c))))(heap.u32(0x005ebf34), 0, 1);
      if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(heap), iVar3 == 0)) {
        break;
      }
    } while (iVar2 == -0x7789fe3e);
    heap.setU32(0x005f0ef4, (heap.u32(0x005f0ef4) + 1) >>> 0);
    heap.setU32(0x005f12a0, (heap.u32(0x005f0ef4)) >>> 0);
    iVar2 = heap.u32(0x005f12a8);
    if (heap.u32(0x005f0950) <= heap.u32(0x005f0ef4)) {
      heap.setU32(0x005f0ef4, (0) >>> 0);
      heap.setU32(0x005f12a0, (heap.u32(0x005f0ef4)) >>> 0);
    }
    while (iVar2 != 0) {
      iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x48))))(heap.u32(0x005ebf34), 2);
    }
    if (heap.u32((__addr_DAT_005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) != heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4) && -1 < (heap.u32((__addr_DAT_005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4))) {
      local_8 = heap.u32((__addr_DAT_005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4);
      local_18 = heap.u32((__addr_DAT_005f0f0c) + (heap.u32(0x005f0ef4) * 4) * 4) - heap.u32((__addr_DAT_005f0f04) + (heap.u32(0x005f0ef4) * 4) * 4);
      local_20 = 0;
      heap.setU32(__addr_local_24, (heap.u32(0x005f0ef4) * 0x40 + 0x40) >>> 0);
      local_1c = heap.u32(__addr_local_24) + local_8;
      local_14 = local_18;
      do {
        iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(heap.u32(0x005ebf38))) + 0x14))))(heap.u32(heap.u32(0x005ebf38)), __addr_DAT_005f0f00 + heap.u32(0x005f0ef4) * 4, heap.u32(0x005ebf40), __addr_local_24, 0x1000000, 0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(heap), iVar3 == 0)) {
          break;
        }
      } while (iVar2 == -0x7789fe3e);
      heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4) = 0;
      heap.u32((__addr_DAT_005f0f08) + (heap.u32(0x005f0ef4) * 4) * 4) = heap.u32((__addr_DAT_005f0f00) + (heap.u32(0x005f0ef4) * 4) * 4);
    }
  }
  }
  return;
} finally {
    heap.freeFrame(24);
  }
}

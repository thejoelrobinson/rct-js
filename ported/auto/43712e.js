// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43712e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_0043725f } from "./43725f.js";
export function FUN_0043712e(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_PTR_DAT_00631d74 = __sp + 4;
  const __addr_DAT_00654f18 = __sp + 8;
  const __addr_DAT_005f5b78 = __sp + 12;
  const __addr_DAT_00887420 = __sp + 16;
  try {
  let bVar2 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar3 = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  heap.setU32(0x00628af6, (1) >>> 0);
  uVar3 = in_EAX;
  if ((((0xfdf < uVar3) || (0xfdf < in_CX)) || (uVar3 < 0x20)) || (in_CX < 0x20)) {
    heap.setU32(0x00991efc, (0x458) >>> 0);
    return CONCAT44(heap, in_EDX, in_EAX);
  }
  uVar3 = in_CX << 7 | in_CX >>> 9 | uVar3;
  pbVar4 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar3 >>> 5 | uVar3 << 0xb)) * 4);
  do {
    bVar2 = heap.u32(pbVar4) & 0x3c;
    if (((bVar2 != 0) && (bVar2 != 0x3c)) && ((in_EDX < heap.u32(pbVar4 + (3) * 4) && ((heap.u32(pbVar4 + (2) * 4) < (byte)(in_EDX >>> 8) && ((heap.u32(pbVar4 + (1) * 4) & 0xf) != 0)))))) {
      if (bVar2 == 0x10) {
        LAB_0043724b: FUN_0043725f(heap);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      if (bVar2 == 4) {
        if ((heap.u32(pbVar4 + ((unaff_BX >>> 3) + 6) * 4) >>> (unaff_BX & 7) & 1) != 0) {
          /* goto LAB_0043724b */ throw new Error("goto LAB_0043724b not supported");
        }
      } else {
        if (bVar2 == 0x18) {
        uVar3 = ((byte) - heap.u32(pbVar4) + unaff_BX & 3) + 8;
        if ((heap.u32(heap.u32((byte)(__addr_PTR_DAT_00631d74) + (heap.u32((pbVar4 + 4)) & 0x3ff) * 4) + ((uVar3 >>> 3) + (uint)(heap.u32((pbVar4 + 4)) >>> 10) * 9 + 7) * 4) >>> (uVar3 & 7) & 1) == 0) {
          /* goto LAB_0043724b */ throw new Error("goto LAB_0043724b not supported");
        }
      } else {
        if ((bVar2 == 8) && (((heap.u32((byte)(__addr_DAT_00654f18) + (heap.u32(pbVar4 + (4) * 4) << 4 | heap.u32(pbVar4 + (5) * 4) & 0xf) * 4) >>> ((byte) - heap.u32(pbVar4) + unaff_BX & 3) & 1) == 0 || ((heap.u32((__addr_DAT_005f5b78 + heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(pbVar4 + (7) * 4) * 0x260) * 4) * 8)) & 0x40000) != 0)))) {
        /* goto LAB_0043724b */ throw new Error("goto LAB_0043724b not supported");
      }
      }
      }
    }
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT44(heap, in_EDX, in_EAX);
    }
  } while (true);
} finally {
    heap.freeFrame(20);
  }
}

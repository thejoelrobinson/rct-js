// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4543bd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040d432 } from "./40d432.js";
import { FUN_0040d4b8 } from "./40d4b8.js";
import { FUN_0040d575 } from "./40d575.js";
import { FUN_0040d777 } from "./40d777.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_004543bd(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743baa = __sp + 4;
  const __addr_DAT_00743bc2 = __sp + 8;
  const __addr_DAT_00743bae = __sp + 12;
  const __addr_DAT_00743bb0 = __sp + 16;
  const __addr_DAT_00743bac = __sp + 20;
  const __addr_DAT_00743bbf = __sp + 24;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  if (((((heap.u32(0x006323f8) & 1) != 0) && (heap.u32(0x006326bc) == '\0')) && ((heap.u32(0x006326bd) & 1) != 0)) && (heap.u32(0x006323fc) != -1)) {
    uVar3 = 0;
    for (uVar4 = heap.u32(0x0087c398); uVar4 != 0xffff; uVar4 = heap.u32((__addr_DAT_00743b98) + (uVar4 * 0x80) * 4)) {
      iVar5 = uVar4 * 0x100;
      uVar2 = uVar3;
      if (((((heap.u32((__addr_DAT_00743baa + iVar5)) != -0x8000) && (heap.u32((__addr_DAT_00743bc2) + (iVar5) * 4) == '\0')) && ((heap.u32((heap.u32(0x006323fc) + 8)) <= heap.u32((__addr_DAT_00743bae + iVar5)) && ((heap.u32((__addr_DAT_00743baa + iVar5)) <= (heap.u32((heap.u32(0x006323fc) + 0xc)) + heap.u32((heap.u32(0x006323fc) + 8))) && (heap.u32((heap.u32(0x006323fc) + 10)) <= heap.u32((__addr_DAT_00743bb0 + iVar5)))))))) && (heap.u32((__addr_DAT_00743bac + iVar5)) <= (heap.u32((heap.u32(0x006323fc) + 0xe)) + heap.u32((heap.u32(0x006323fc) + 10))))) && (uVar2 = uVar3 + 2, heap.u32((__addr_DAT_00743bbf) + (iVar5) * 4) == '\x06')) {
        uVar2 = uVar3 + 1;
      }
      uVar3 = uVar2;
    }
    uVar3 = (uVar3 >>> 1) - 6;
    if (uVar3 < 0) {
      if (heap.u32(0x00632978) != 1) {
        FUN_0040d575(heap, 2);
        heap.setU32(0x00632978, (1) >>> 0);
      }
    } else {
      if (0x78 < uVar3) {
        uVar3 = 0x78;
      }
      iVar5 = -(uVar3 - 0x78) * -(uVar3 - 0x78);
      iVar5 = -0x96 - (-((0xc5c1000U - iVar5 * iVar5 >>> (heap.u32((heap.u32(0x006323fc) + 0x10)) & 0x1f)) + 0xf3a3f000) >>> 0x10);
      if (heap.u32(0x00632978) == 1) {
        FUN_0042f239(heap);
        iVar1 = FUN_0040d432(heap, 2, 3, 0);
        if (iVar1 != 0) {
          FUN_0040d4b8(heap, 2, 1, iVar5, 0, 0);
          heap.setU32(0x00632978, (iVar5) >>> 0);
        }
      } else {
        if (iVar5 != heap.u32(0x00632978)) {
        FUN_0040d777(heap, 2, iVar5);
        heap.setU32(0x00632978, (iVar5) >>> 0);
      }
      }
    }
  }
  return;
} finally {
    heap.freeFrame(28);
  }
}

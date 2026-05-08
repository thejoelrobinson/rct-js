// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42635e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_0043c698 } from "./43c698.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0042635e(heap) {
  const __sp = heap.allocFrame(60);
  const __addr_DAT_0088744a = __sp + 0;
  const __addr_DAT_0088746a = __sp + 4;
  const __addr_DAT_00887452 = __sp + 8;
  const __addr_DAT_00971ef4 = __sp + 12;
  const __addr_DAT_00743b98 = __sp + 16;
  const __addr_DAT_00743bbf = __sp + 20;
  const __addr_DAT_00743bfc = __sp + 24;
  const __addr_DAT_00743bc0 = __sp + 28;
  const __addr_DAT_00743bb2 = __sp + 32;
  const __addr_DAT_00743bce = __sp + 36;
  const __addr_DAT_00743bcf = __sp + 40;
  const __addr_DAT_00743bd9 = __sp + 44;
  const __addr_DAT_0088752b = __sp + 48;
  const __addr_DAT_0088752d = __sp + 52;
  const __addr_DAT_0088751d = __sp + 56;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let local_24 = 0;
  uVar8 = in_EDX & 0xff;
  iVar9 = uVar8 * 0x260;
  uVar4 = 0;
  do {
    if (heap.u32((__addr_DAT_0088744a) + (uVar8 * 0x130 + uVar4) * 4) != -1) {
      uVar6 = heap.u32((__addr_DAT_0088746a) + (uVar8 * 0x130 + uVar4) * 4);
      if (uVar6 != 0xffff) {
        uVar4 = heap.u32((byte)(__addr_DAT_00887452) + (iVar9 + uVar4) * 4);
        for (pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((((uVar6 >>> 8) << 0xc | (uVar6 & 0xff) << 5) >>> 5 | (((uVar6 >>> 8) << 5) >>> 9) << 0xb)) * 4); (uVar4 = CONCAT11(heap.u32(pbVar5), uVar4) & 0xffff3cff, (uVar4 >>> 8) != '\x10' || (uVar4 != heap.u32(pbVar5 + (2) * 4))); pbVar5 = pbVar5 + 8) {
        
        }
        cVar3 = (heap.u32(pbVar5) & 3 ^ 2) << 3;
        /* goto LAB_00426416 */ throw new Error("goto LAB_00426416 not supported");
      }
      break;
    }
    uVar4 = uVar4 + 1;
  } while (uVar4 < 4);
  cVar3 = -1;
  LAB_00426416: local_24 = in_EDX;
  for (uVar6 = heap.u32(0x0087c398); uVar6 != 0xffff; uVar6 = heap.u32((__addr_DAT_00743b98) + (uVar6 * 0x80) * 4)) {
    iVar7 = uVar6 * 0x100;
    if (((((heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) == '\x02') || (heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) == '\a')) || (heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) == '\x04')) || (heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) == '\x03')) && (local_24 == heap.u32((__addr_DAT_00743bfc) + (iVar7) * 4))) {
      FUN_0044142c(heap);
      if ((heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) == '\x02') && (heap.u32((__addr_DAT_00743bc0) + (iVar7) * 4) == '\0')) {
        FUN_0043e792(heap);
      }
      FUN_005e53ca(heap);
      if (cVar3 == -1) {
        FUN_00444927(heap);
      } else {
        FUN_00444927(heap);
        heap.u32((__addr_DAT_00743bb2) + (iVar7) * 4) = cVar3;
      }
      uVar2 = FUN_005e53ca(heap);
      heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) = 0;
      FUN_0043c698(heap, uVar2);
      uVar4 = heap.u32((__addr_DAT_00743bce + iVar7));
      if (heap.u32((byte)(__addr_DAT_00743bcf) + (iVar7) * 4) <= (byte) * (__addr_DAT_00743bce + iVar7)) {
        uVar4 = heap.u32((byte)(__addr_DAT_00743bcf) + (iVar7) * 4);
      }
      bVar1 = (byte)(uVar4 >>> 1) & 0x7f;
      heap.u32((__addr_DAT_00743bce) + (iVar7) * 4) = bVar1;
      heap.u32((__addr_DAT_00743bcf) + (iVar7) * 4) = bVar1;
      heap.u32((__addr_DAT_00743bd9) + (iVar7) * 4) = heap.u32((__addr_DAT_00743bd9) + (iVar7) * 4) | 2;
    }
  }
  heap.u32((__addr_DAT_0088752b) + (iVar9) * 4) = 0;
  heap.u32((__addr_DAT_0088752d) + (iVar9) * 4) = 0;
  heap.u32((__addr_DAT_0088751d) + (iVar9) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar9) * 4) | 4;
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(60);
  }
}

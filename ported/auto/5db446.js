// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db446.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00426f56 } from "./426f56.js";
import { FUN_0042deab } from "./42deab.js";
import { FUN_0042df47 } from "./42df47.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_0045192e } from "./45192e.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005db5d7 } from "./5db5d7.js";
import { FUN_005ddd9c } from "./5ddd9c.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005db446(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_00743b94 = __sp + 4;
  const __addr_DAT_0088747e = __sp + 8;
  const __addr_DAT_00887441 = __sp + 12;
  const __addr_DAT_0088751d = __sp + 16;
  const __addr_DAT_00743bd6 = __sp + 20;
  const __addr_DAT_00743bd4 = __sp + 24;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_BX = 0;
  let iVar4 = 0;
  let unaff_ESI = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let puVar7 = 0;
  heap.setU32((unaff_ESI + (0x50) * 4), (9) >>> 0);
  FUN_005db5d7(heap);
  uVar5 = heap.u32(unaff_ESI + (0x30) * 4);
  iVar6 = uVar5 * 0x260;
  puVar7 = unaff_ESI;
  if ((heap.u32((__addr_DAT_00887422) + (uVar5 * 0x130) * 4) & 0x400) == 0) {
    for (; heap.u32(puVar7 + (1) * 4) != '\0'; puVar7 = __addr_DAT_00743b94 + heap.u32((puVar7 + 0x40)) * 0x100) {
    
    }
    iVar4 = -1;
    do {
      iVar4 = iVar4 + 1;
    } while (heap.u32((puVar7 + 10)) != heap.u32((__addr_DAT_0088747e + iVar4 * 2 + iVar6)));
    FUN_0045192e(heap);
    if (heap.u32((__addr_DAT_00887441) + (iVar6) * 4) != '\0') {
      FUN_00426f56(heap);
    }
  }
  heap.setU32(((__addr_DAT_00887422) + (uVar5 * 0x130) * 4), (heap.u32((__addr_DAT_00887422) + (uVar5 * 0x130) * 4) | 0x400) >>> 0);
  heap.setU32(((__addr_DAT_0088751d) + (iVar6) * 4), (heap.u32((__addr_DAT_0088751d) + (iVar6) * 4) | 0xc) >>> 0);
  FUN_005ddd9c(heap);
  puVar7 = unaff_ESI;
  while (true) {
    heap.setU32((puVar7 + (0x51) * 4), (2) >>> 0);
    FUN_00452fce(heap, heap.u32((puVar7 + 0x10)), heap.u32((puVar7 + 0xe)), unaff_BX);
    FUN_0042df47(heap);
    unaff_BX = heap.u32((puVar7 + 0x32));
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    FUN_0042deab(heap);
    heap.setU32((puVar7 + 0xc), (heap.u32((puVar7 + 0xc)) | 0x80) >>> 0);
    uVar3 = FUN_005df40c(heap);
    heap.setU32((puVar7 + 200), (uVar3) >>> 0);
    heap.setU32((puVar7 + (0xc5) * 4), ((uVar3 >>> 0x10) & 7) >>> 0);
    heap.setU32((puVar7 + (0x14) * 4), (0xd) >>> 0);
    heap.setU32((puVar7 + (9) * 4), (0x2d) >>> 0);
    heap.setU32((puVar7 + (0x15) * 4), (5) >>> 0);
    FUN_00444927(heap);
    FUN_005e53ca(heap);
    heap.setU32((puVar7 + 0x4e), (0) >>> 0);
    if (heap.u32((puVar7 + 0x3e)) == 0xffff) {
      break;
    }
    puVar7 = __addr_DAT_00743b94 + heap.u32((puVar7 + 0x3e)) * 0x100;
  }
  uVar1 = heap.u32((unaff_ESI + 0x40));
  uVar2 = heap.u32((puVar7 + 0x42));
  heap.setU32((__addr_DAT_00743bd6 + uVar1 * 0x100), (uVar2) >>> 0);
  heap.setU32((__addr_DAT_00743bd4 + uVar2 * 0x100), (uVar1) >>> 0);
  heap.setU32((unaff_ESI + 0x28), (0) >>> 0);
  return;
} finally {
    heap.freeFrame(28);
  }
}

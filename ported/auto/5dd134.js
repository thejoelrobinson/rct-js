// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd134.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_00450b21 } from "./450b21.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dd134(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088751d = __sp + 4;
  const __addr_DAT_0088747e = __sp + 8;
  const __addr_DAT_00743bd2 = __sp + 12;
  const __addr_DAT_0088745e = __sp + 16;
  try {
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  uVar7 = FUN_00450b21(heap);
  uVar3 = uVar7;
  uVar4 = (uint)(uVar7 >>> 0x20) & 0xff;
  iVar5 = uVar4 * 0x260;
  heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) & 0xff3f;
  heap.u32((__addr_DAT_0088751d) + (iVar5) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar5) * 4) | 0xc;
  puVar1 = __addr_DAT_00887422 + uVar4 * 0x130;
  uVar2 = heap.u32(puVar1);
  heap.u32(puVar1) = heap.u32(puVar1) & 0xfffe;
  if ((uVar2 & 1) != 0) {
    heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) & 0xf7fb;
    uVar4 = 0;
    do {
      LOCK(heap);
      uVar2 = heap.u32((__addr_DAT_0088747e + uVar4 * 2 + iVar5));
      heap.u32((__addr_DAT_0088747e + uVar4 * 2 + iVar5)) = 0xffff;
      UNLOCK(heap);
      for (; uVar2 != 0xffff; uVar2 = heap.u32((__addr_DAT_00743bd2 + uVar2 * 0x100))) {
        FUN_005e53ca(heap);
        uVar3 = FUN_00444d1f(heap);
      }
      uVar4 = uVar4 + 1;
    } while (uVar4 < 0xc);
    uVar4 = 0;
    do {
      heap.u32((__addr_DAT_0088745e) + (uVar4 + iVar5) * 4) = 0xff;
      uVar4 = uVar4 + 1;
    } while (uVar4 < 4);
  }
  bVar6 = true;
  FUN_005e3b2b(heap, unaff_EDI, unaff_ESI);
  if (!bVar6) {
    (heap.u32(heap.u32((unaff_ESI + 4))))();
  }
  return CONCAT44(heap, in_EDX, uVar3);
} finally {
    heap.freeFrame(20);
  }
}

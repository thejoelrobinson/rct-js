// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddd9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, CONCAT44 } from "../runtime/win32.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0044153e } from "./44153e.js";
export function FUN_005ddd9c(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00743b94 = __sp + 0;
  const __addr_DAT_0088757e = __sp + 4;
  const __addr_DAT_00887442 = __sp + 8;
  const __addr_DAT_00887444 = __sp + 12;
  const __addr_DAT_00743bbe = __sp + 16;
  const __addr_DAT_0088752b = __sp + 20;
  const __addr_stack0xffffffdc = __sp + 24;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  uVar6 = 0;
  puVar5 = unaff_ESI;
  while (true) {
    uVar2 = CONCAT11(heap, (uVar6 >>> 8) + CARRY1(heap, uVar6, heap.u32(puVar5 + (0xb3) * 4)), uVar6 + heap.u32(puVar5 + (0xb3) * 4));
    uVar6 = uVar2;
    if (heap.u32((puVar5 + 0x3e)) == 0xffff) {
      break;
    }
    puVar5 = __addr_DAT_00743b94 + (uint) * (puVar5 + 0x3e) * 0x100;
  }
  uVar6 = heap.u32(unaff_ESI + (0x30) * 4);
  uVar4 = 2;
  if (uVar2 != 0) {
    uVar4 = 8;
  }
  heap.u16(0x971e86) = uVar2;
  if (heap.u32((byte)(__addr_DAT_0088757e) + (uVar6 * 0x260) * 4) <= uVar4) {
    heap.u32((__addr_DAT_0088757e) + (uVar6 * 0x260) * 4) = uVar4;
  }
  if (uVar2 != 0) {
    heap.u16(0x971e88) = heap.u32((__addr_DAT_00887442) + (uVar6 * 0x130) * 4);
    heap.setU32(0x00971e8a, (heap.u32((__addr_DAT_00887444) + (uVar6 * 0x98) * 4)) >>> 0);
    uVar4 = 0x7f2;
    FUN_0042c711(heap);
    in_ECX = extraout_ECX;
  }
  iVar7 = heap.u32(unaff_ESI + (0x30) * 4) * 0x260;
  while (true) {
    bVar1 = heap.u32(unaff_ESI + (0xb3) * 4);
    if ((bVar1 == heap.u32(unaff_ESI + (0xb4) * 4)) && (uVar6 = bVar1, bVar1 != 0)) {
      iVar3 = 0;
      do {
        uVar2 = heap.u32((unaff_ESI + iVar3 * 2 + 0x52));
        if (heap.u32((__addr_DAT_00743bbe) + (uVar2 * 0x100) * 4) == '\0') {
          heap.setU32(0x0087c81c, (heap.u32(0x0087c81c) + -1) >>> 0);
          heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 4) >>> 0);
        }
        heap.u32((__addr_DAT_0088752b) + (iVar7) * 4) = heap.u32((__addr_DAT_0088752b) + (iVar7) * 4) + -1;
        FUN_0044153e(heap, iVar7, unaff_ESI, __addr_DAT_00743b94 + uVar2 * 0x100, __addr_stack0xffffffdc, uVar4, iVar3, in_ECX, uVar6);
        iVar3 = iVar3 + 1;
      } while (iVar3 < heap.u32(unaff_ESI + (0xb3) * 4));
      heap.u32(unaff_ESI + (0xb3) * 4) = 0;
      heap.u32(unaff_ESI + (0xb4) * 4) = 0;
    }
    if (heap.u32((unaff_ESI + 0x3e)) == 0xffff) {
      break;
    }
    unaff_ESI = __addr_DAT_00743b94 + (uint) * (unaff_ESI + 0x3e) * 0x100;
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(28);
  }
}

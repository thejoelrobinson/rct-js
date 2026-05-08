// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a2a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00441596 } from "./441596.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0044a2a8(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00743bdc = __sp + 0;
  const __addr_DAT_00743bc5 = __sp + 4;
  const __addr_DAT_00743c56 = __sp + 8;
  const __addr_DAT_005f7109 = __sp + 12;
  const __addr_DAT_00743c47 = __sp + 16;
  const __addr_DAT_00743be6 = __sp + 20;
  try {
  let bVar2 = 0;
  let bVar3 = 0;
  let in_EAX = 0;
  let iVar4 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let iVar5 = 0;
  let bVar6 = 0;
  let bVar7 = 0;
  iVar4 = -1;
  while ((byte)(iVar4 + 1) < heap.u32((unaff_ESI + 0x78))) {
    iVar5 = (uint) * (unaff_ESI + 0x5e + (iVar4 + 1) * 2) * 0x100;
    heap.u32((__addr_DAT_00743bdc + iVar5)) = heap.u32((__addr_DAT_00743bdc + iVar5)) & 0xffbf;
    bVar2 = heap.u32((__addr_DAT_00743bc5) + (iVar5) * 4);
    bVar3 = FUN_005df40c(heap);
    heap.u32((__addr_DAT_00743c56) + (iVar5) * 4) = ((bVar3 & 0xf) - 8) + heap.u32((__addr_DAT_005f7109) + (bVar2 * 8) * 4);
    iVar4 = extraout_ECX;
    if (heap.u32((__addr_DAT_00743c47) + (iVar5) * 4) != '\0') {
      bVar6 = 0xff8bc46b < (uint) * (__addr_DAT_00743be6 + iVar5) << 8;
      FUN_00441596(heap);
      bVar7 = false;
      if (bVar6) {
        pbVar1 = __addr_DAT_00743c56 + iVar5;
        bVar7 = 0xdc < heap.u32(pbVar1);
        heap.u32(pbVar1) = heap.u32(pbVar1) + 0x23;
      }
      FUN_00441596(heap);
      bVar6 = false;
      if (bVar7) {
        pbVar1 = __addr_DAT_00743c56 + iVar5;
        bVar6 = 0xe6 < heap.u32(pbVar1);
        heap.u32(pbVar1) = heap.u32(pbVar1) + 0x19;
      }
      FUN_00441596(heap);
      bVar7 = false;
      if (bVar6) {
        pbVar1 = __addr_DAT_00743c56 + iVar5;
        bVar7 = 200 < heap.u32(pbVar1);
        heap.u32(pbVar1) = heap.u32(pbVar1) + 0x37;
      }
      FUN_00441596(heap);
      bVar6 = false;
      if (bVar7) {
        pbVar1 = __addr_DAT_00743c56 + iVar5;
        bVar6 = 0xf1 < heap.u32(pbVar1);
        heap.u32(pbVar1) = heap.u32(pbVar1) + 0xe;
      }
      FUN_00441596(heap);
      iVar4 = extraout_ECX_00;
      if (bVar6) {
        heap.u32((__addr_DAT_00743c56) + (iVar5) * 4) = 9;
      }
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(24);
  }
}

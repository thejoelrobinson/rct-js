// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401000.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { RegCloseKey, RegOpenKeyA, RegQueryValueExA } from "../../runtime/win32.js";
import { FUN_00401120 } from "./401120.js";
import { FUN_0040179d } from "./40179d.js";
import { FUN_00402bd5 } from "./402bd5.js";
import { FUN_00402bef } from "./402bef.js";
import { FUN_00403c2a } from "./403c2a.js";
import { FUN_004061b9 } from "./4061b9.js";
import { FUN_004385d8 } from "./4385d8.js";
export function FUN_00401000(heap) {
  const __sp = heap.allocFrame(84);
  const __addr_local_50 = __sp + 0;
  const __addr_local_44 = __sp + 4;
  const __addr_local_4c = __sp + 8;
  const __addr_local_48 = __sp + 12;
  const __addr_DAT_005eee40 = __sp + 16;
  const __addr_local_40 = __sp + 20;
  try {
  let BVar1 = 0;
  let LVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let pBVar6 = 0;
  let pBVar7 = 0;
  let local_1 = 0;
  FUN_00402bd5(heap);
  FUN_00401120(heap, 0);
  LVar2 = RegOpenKeyA(heap, 0x80000002, 0x005e90a0, __addr_local_50);
  if (LVar2 == 0) {
    heap.setU32(__addr_local_48, (4) >>> 0);
    heap.setU32(__addr_local_4c, (0) >>> 0);
    LVar2 = RegQueryValueExA(heap, heap.u32(__addr_local_50), 0x005e9098, 0x0, __addr_local_44, __addr_local_4c, __addr_local_48);
    if (LVar2 == 0) {
      heap.setU32(0x005eee38, (heap.u32(__addr_local_4c)) >>> 0);
    }
    RegCloseKey(heap, heap.u32(__addr_local_50));
  }
  LVar2 = RegOpenKeyA(heap, 0x80000003, 0x005e9060, __addr_local_50);
  if (LVar2 == 0) {
    heap.setU32(__addr_local_48, (0x40) >>> 0);
    LVar2 = RegQueryValueExA(heap, heap.u32(__addr_local_50), 0x005e9058, 0x0, __addr_local_44, __addr_local_40, __addr_local_48);
    if (LVar2 == 0) {
      uVar4 = 0xffffffff;
      local_1 = 0;
      pBVar6 = __addr_local_40;
      do {
        pBVar7 = pBVar6;
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        pBVar7 = pBVar6 + 1;
        BVar1 = heap.u32(pBVar6);
        pBVar6 = pBVar7;
      } while (BVar1 != '\0');
      uVar4 = ~uVar4;
      pBVar6 = pBVar7 + -uVar4;
      pBVar7 = __addr_DAT_005eee40;
      for (uVar5 = uVar4 >>> 2; uVar5 != 0; uVar5 = uVar5 - 1) {
        heap.setU32(pBVar7, (heap.u32(pBVar6)) >>> 0);
        pBVar6 = pBVar6 + 4;
        pBVar7 = pBVar7 + 4;
      }
      for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        heap.setU32(pBVar7, (heap.u32(pBVar6)) >>> 0);
        pBVar6 = pBVar6 + 1;
        pBVar7 = pBVar7 + 1;
      }
    }
    RegCloseKey(heap, heap.u32(__addr_local_50));
  }
  iVar3 = FUN_00403c2a(heap);
  while (iVar3 != 0) {
    FUN_00402bef(heap);
    FUN_004385d8(heap);
    if (heap.u32(0x005e9104) != 0) {
      FUN_0040179d(heap);
    }
    iVar3 = FUN_00403c2a(heap);
  }
  FUN_004061b9(heap);
  return;
} finally {
    heap.freeFrame(84);
  }
}

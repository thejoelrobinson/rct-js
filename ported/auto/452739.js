// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452739.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004072f0 } from "./4072f0.js";
import { FUN_00407696 } from "./407696.js";
import { FUN_0040771b } from "./40771b.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_0040d301 } from "./40d301.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_00452835 } from "./452835.js";
export function FUN_00452739(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00632448 = __sp + 0;
  const __addr_DAT_00632608 = __sp + 4;
  const __addr_DAT_006326c8 = __sp + 8;
  const __addr_DAT_006325f0 = __sp + 12;
  try {
  let in_EAX = 0;
  let iVar1 = 0;
  let sVar3 = 0;
  let uVar7 = 0;
  FUN_00452835(heap);
  puVar4 = __addr_DAT_00632448;
  sVar3 = 6;
  do {
    heap.u32(puVar4) = 0xffff;
    puVar4 = puVar4 + 0x1e;
    sVar3 = sVar3 + -1;
  } while (sVar3 != 0);
  puVar4 = __addr_DAT_00632608;
  sVar3 = 6;
  do {
    heap.u32(puVar4) = 0xffff;
    puVar4 = puVar4 + 0xb;
    sVar3 = sVar3 + -1;
  } while (sVar3 != 0);
  iVar1 = FUN_004072f0(heap, 0, in_EAX, 2, 0x5622, 0x10);
  if (iVar1 != 0) {
    FUN_0042f239(heap);
    iVar1 = FUN_0040771b(heap, 2);
    if (iVar1 != 0) {
      piVar5 = __addr_DAT_006326c8;
      while (heap.u32(piVar5) != -1) {
        piVar8 = piVar5 + 1;
        FUN_004077b3(heap, heap.u32(piVar5), piVar8, 1, 1);
        piVar5 = piVar8 + 5;
      }
      puVar2 = (in_EAX * 0x210 + heap.u32(0x005ebf10));
      heap.setU32(0x005f8d49, (heap.u32(puVar2)) >>> 0);
      heap.setU32(0x005f8d4d, (heap.u32(puVar2 + (1) * 4)) >>> 0);
      heap.setU32(0x005f8d51, (heap.u32(puVar2 + (2) * 4)) >>> 0);
      heap.setU32(0x005f8d55, (heap.u32(puVar2 + (3) * 4)) >>> 0);
      heap.setU32(0x005f8d48, (1) >>> 0);
      heap.setU32(0x006323f4, (in_EAX) >>> 0);
      FUN_0042f3a2(heap);
      iVar1 = FUN_0040d301(heap);
      if (iVar1 != 0) {
        heap.setU32(0x006323f8, (heap.u32(0x006323f8) | 1) >>> 0);
        puVar6 = __addr_DAT_006325f0;
        uVar7 = 0;
        do {
          heap.u32(puVar6) = 0xff;
          puVar6 = puVar6 + 8;
          uVar7 = uVar7 + 1;
        } while (uVar7 < 2);
      }
      return iVar1;
    }
    FUN_00407696(heap);
  }
  return in_EAX;
} finally {
    heap.freeFrame(16);
  }
}

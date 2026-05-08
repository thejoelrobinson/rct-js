// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5ff8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../../runtime/win32.js";
import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042fc2c } from "./42fc2c.js";
export function FUN_005d5ff8(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_005f90c5 = __sp + 0;
  const __addr_DAT_0065d900 = __sp + 4;
  const __addr_DAT_00658aae = __sp + 8;
  const __addr_DAT_0099aa88 = __sp + 12;
  const __addr_DAT_0065d92c = __sp + 16;
  const __addr_DAT_0087c3fc = __sp + 20;
  const __addr_DAT_0087c41c = __sp + 24;
  const __addr_DAT_0065da30 = __sp + 28;
  try {
  let cVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let pHVar3 = 0;
  let uVar4 = 0;
  let pHVar5 = 0;
  let in_EDX = 0;
  let pcVar6 = 0;
  let pcVar7 = 0;
  let pcVar8 = 0;
  let pcVar9 = 0;
  let bVar10 = 0;
  let local_24 = 0;
  pHVar3 = FUN_0040844b(heap, __addr_DAT_005f90c5, __addr_DAT_0065d900);
  pcVar6 = __addr_DAT_00658aae;
  if (pHVar3 != 0xffffffff) {
    LAB_005d6021: heap.setU32(0x005f9427, (pHVar3) >>> 0);
    pcVar7 = __addr_DAT_005f90c5;
    pcVar8 = __addr_DAT_0099aa88;
    do {
      pcVar9 = pcVar8;
      cVar1 = heap.u32(pcVar7);
      heap.setU32(pcVar9, (cVar1) >>> 0);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar9 + 1;
    } while (cVar1 != '*');
    pcVar8 = __addr_DAT_0065d92c;
    do {
      cVar1 = heap.u32(pcVar8);
      heap.setU32(pcVar9, (cVar1) >>> 0);
      pcVar8 = pcVar8 + 1;
      pcVar9 = pcVar9 + 1;
      bVar10 = false;
    } while (cVar1 != '\0');
    FUN_0042fc2c(heap);
    if (!bVar10) {
      local_24 = in_EDX;
      uVar4 = heap.u32(0x00656b36);
      if (local_24 == heap.u32(0x00656b34)) {
        do {
          uVar2 = 0;
          if (uVar4 != 0) {
            for (; (uVar4 >>> uVar2 & 1) == 0; uVar2 = uVar2 + 1) {
            
            }
          }
          if (uVar4 == 0) {
            if ((heap.u32((__addr_DAT_0087c3fc) + (((heap.u32(0x00656b35) & 0x1f) >>> 3) + (heap.u32(0x00656b35) >>> 5) * 4) * 4) >>> (heap.u32(0x00656b35) & 7) & 1) != 0) {
              pcVar7 = __addr_DAT_0065d92c;
              uVar4 = 0;
              pcVar8 = pcVar6;
              /* goto LAB_005d6095 */ throw new Error("goto LAB_005d6095 not supported");
            }
            break;
          }
          uVar4 = uVar4 & ~(1 << (uVar2 & 0x1f));
        } while ((heap.u32((__addr_DAT_0087c41c + (uVar2 >>> 3) + (in_EDX & 0xff) * 4)) >>> (uVar2 & 7) & 1) != 0);
      }
    }
    /* goto LAB_005d60c6 */ throw new Error("goto LAB_005d60c6 not supported");
  }
  LAB_005d60f4: heap.setU32(pcVar6, ('\0') >>> 0);
  return CONCAT44(in_EDX, in_EAX);
  while (cVar1 != '\0') {
    LAB_005d6095: cVar1 = heap.u32(pcVar7);
    heap.setU32(pcVar8, (cVar1) >>> 0);
    uVar4 = uVar4 + 1;
    pcVar7 = pcVar7 + 1;
    pcVar8 = pcVar8 + 1;
    if (0x27 < uVar4) {
      break;
    }
  }
  if (0x28 < uVar4) {
    pcVar7 = __addr_DAT_0065da30;
    pcVar8 = pcVar6;
    do {
      cVar1 = heap.u32(pcVar7);
      heap.setU32(pcVar8, (cVar1) >>> 0);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
  }
  pcVar6 = pcVar6 + 0x28;
  if (0x65d8cd < pcVar6) {
    /* goto LAB_005d60f4 */ throw new Error("goto LAB_005d60f4 not supported");
  }
  LAB_005d60c6: pHVar5 = GetNextWindow(heap, heap.u32(0x005f9427), 0x65d900);
  pHVar3 = heap.u32(0x005f9427);
  if (pHVar5 != 0x1) {
    /* goto code_r0x005d60e4 */ throw new Error("goto code_r0x005d60e4 not supported");
  }
  /* goto LAB_005d6021 */ throw new Error("goto LAB_005d6021 not supported");
  code_r0x005d60e4: FUN_00408490(heap, heap.u32(0x005f9427));
  /* goto LAB_005d60f4 */ throw new Error("goto LAB_005d60f4 not supported");
} finally {
    heap.freeFrame(32);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453bf8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0040d432 } from "./40d432.js";
import { FUN_0040d4b8 } from "./40d4b8.js";
import { FUN_0040d575 } from "./40d575.js";
import { FUN_0040d69b } from "./40d69b.js";
import { FUN_0040d709 } from "./40d709.js";
import { FUN_0040d777 } from "./40d777.js";
import { FUN_0040d7e5 } from "./40d7e5.js";
import { FUN_0040d8ee } from "./40d8ee.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_00453bf8(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_006325b4 = __sp + 0;
  const __addr_PTR_PTR_006323b8 = __sp + 4;
  const __addr_DAT_005f851c = __sp + 8;
  const __addr_DAT_006325f0 = __sp + 12;
  const __addr_DAT_00632602 = __sp + 16;
  try {
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let sVar6 = 0;
  let unaff_EBX = 0;
  let uVar7 = 0;
  if (((((heap.u32(0x006323f8) & 1) != 0) && (heap.u32(0x006326bc) == '\0')) && ((heap.u32(0x006326bd) & 1) != 0)) && ((heap.u32(0x005f8d5a) != '\0' && ((heap.u32(0x0099a500) & 1) == 0)))) {
    while (true) {
      uVar4 = 0;
      sVar6 = 1;
      for (pcVar9 = __addr_DAT_006325b4; pcVar9 < heap.u32(0x006325b0); pcVar9 = pcVar9 + 0xc) {
        if (((heap.u32(pcVar9) != -1) && (unaff_EBX = heap.u32(heap.u32((uint)(byte)(__addr_PTR_PTR_006323b8) + (heap.u32(pcVar9 + (1) * 4)) * 4) + (8) * 4), heap.u32((__addr_DAT_005f851c) + (unaff_EBX) * 4) != '\0')) && (uVar4 = uVar4 + 1, heap.u32((pcVar9 + 6)) <= sVar6)) {
          sVar6 = heap.u32((pcVar9 + 6));
          unaff_EDI = pcVar9;
        }
      }
      if (uVar4 < 2) {
        break;
      }
      heap.u32(unaff_EDI) = -1;
    }
    while (true) {
      uVar4 = 0;
      sVar6 = 1;
      for (pcVar9 = __addr_DAT_006325b4; pcVar9 < heap.u32(0x006325b0); pcVar9 = pcVar9 + 0xc) {
        if ((heap.u32(pcVar9) != -1) && (uVar4 = uVar4 + 1, heap.u32((pcVar9 + 6)) <= sVar6)) {
          sVar6 = heap.u32((pcVar9 + 6));
          unaff_EDI = pcVar9;
        }
      }
      if (uVar4 < 3) {
        break;
      }
      heap.u32(unaff_EDI) = -1;
    }
    pcVar9 = __addr_DAT_006325f0;
    uVar4 = 0;
    do {
      if (heap.u32(pcVar9) != -1) {
        uVar3 = heap.u32(pcVar9);
        unaff_EBX = CONCAT22(heap, (unaff_EBX >>> 0x10), uVar3);
        for (pcVar8 = __addr_DAT_006325b4; pcVar8 < heap.u32(0x006325b0); pcVar8 = pcVar8 + 0xc) {
          if ((uVar3 == heap.u32(pcVar8)) && ((uVar3 >>> 8) == heap.u32(pcVar8 + (1) * 4))) {
            iVar5 = FUN_0040d8ee(heap, uVar4);
            if (iVar5 != 0) {
              /* goto LAB_00453d0b */ throw new Error("goto LAB_00453d0b not supported");
            }
            break;
          }
        }
        FUN_0040d575(heap, uVar4);
        heap.u32(pcVar9) = -1;
      }
      LAB_00453d0b: pcVar9 = pcVar9 + 8;
      uVar4 = uVar4 + 1;
    } while (uVar4 < 2);
    for (pcVar9 = __addr_DAT_006325b4; pcVar9 < heap.u32(0x006325b0); pcVar9 = pcVar9 + 0xc) {
      if (heap.u32(pcVar9) != -1) {
        pcVar8 = __addr_DAT_006325f0;
        uVar4 = 0;
        do {
          if ((heap.u32(pcVar9) == heap.u32(pcVar8)) && (heap.u32(pcVar9 + (1) * 4) == heap.u32(pcVar8 + (1) * 4))) {
            sVar6 = heap.u32((pcVar9 + 6));
            if (sVar6 != heap.u32((pcVar8 + 2))) {
              heap.u32((pcVar8 + 2)) = sVar6;
              FUN_0040d777(heap, uVar4, sVar6, pcVar9, pcVar8, uVar4);
            }
            sVar6 = heap.u32((pcVar9 + 8));
            if (sVar6 != heap.u32((pcVar8 + 4))) {
              heap.u32((pcVar8 + 4)) = sVar6;
              FUN_0040d709(heap, uVar4, sVar6, pcVar9, pcVar8, uVar4);
            }
            sVar6 = heap.u32((pcVar9 + 10));
            if (sVar6 != heap.u32((pcVar8 + 6))) {
              heap.u32((pcVar8 + 6)) = sVar6;
              FUN_0040d69b(heap, uVar4, sVar6, pcVar9, pcVar8, uVar4);
            }
            /* goto LAB_00453ecf */ throw new Error("goto LAB_00453ecf not supported");
          }
          if (heap.u32(pcVar8) == -1) {
            unaff_EBX = uVar4;
          }
          pcVar8 = pcVar8 + 8;
          uVar4 = uVar4 + 1;
        } while (uVar4 < 2);
        pcVar8 = __addr_DAT_006325f0 + unaff_EBX * 8;
        uVar7 = heap.u32(heap.u32((uint)(byte)(__addr_PTR_PTR_006323b8) + (heap.u32(pcVar9 + (1) * 4)) * 4) + (8) * 4);
        FUN_0042f239(heap);
        iVar5 = FUN_004083b5(heap, uVar7, pcVar9, pcVar8, unaff_EBX);
        uVar4 = unaff_EBX;
        if (iVar5 != -1) {
          FUN_00408276(heap, iVar5, __addr_DAT_00632602, 4, iVar5);
          uVar4 = unaff_EBX;
          unaff_EBX = uVar7;
          FUN_00408387(heap, iVar5);
          uVar7 = unaff_EBX;
          if (heap.u32(__addr_DAT_00632602) == 0x78787878) {
            /* goto LAB_00453ecf */ throw new Error("goto LAB_00453ecf not supported");
          }
        }
        unaff_EBX = uVar7;
        uVar7 = heap.u32((pcVar9 + 2)) - 10000;
        if (uVar7 < 0) {
          uVar7 = 0;
        }
        iVar5 = FUN_0040d432(heap, uVar4, unaff_EBX, uVar7 & 0xfffffff0, pcVar9, pcVar8, uVar4);
        if (iVar5 == 0) {
          heap.setU32(0x005f8d5a, ('\0') >>> 0);
        } else {
          unaff_EBX = (uint) * (pcVar9 + 10);
          iVar5 = FUN_0040d4b8(heap, uVar4, 0, heap.u32((pcVar9 + 6)), heap.u32((pcVar9 + 8)), unaff_EBX, pcVar9, pcVar8, uVar4, heap.u32((pcVar9 + 8)), heap.u32((pcVar9 + 6)));
          if (iVar5 != 0) {
            if (heap.u32(pcVar9 + (1) * 4) == '\r') {
              uVar1 = heap.u32(heap.u32((__addr_PTR_PTR_006323b8) + (heap.u32(pcVar9 + (1) * 4)) * 4) + (8) * 4);
              FUN_0042f239(heap);
              FUN_0040d7e5(heap, uVar4, uVar1, 1, 0, pcVar9, pcVar8, uVar4);
            }
            uVar3 = heap.u32((pcVar9 + 8));
            heap.u32((pcVar8 + 2)) = heap.u32((pcVar9 + 6));
            heap.u32((pcVar8 + 4)) = uVar3;
            heap.u32((pcVar8 + 6)) = heap.u32((pcVar9 + 10));
            bVar2 = heap.u32(pcVar9 + (1) * 4);
            unaff_EBX = bVar2;
            heap.u32(pcVar8) = heap.u32(pcVar9);
            heap.u32(pcVar8 + (1) * 4) = bVar2;
          }
        }
      }
      LAB_00453ecf: 
    }
  }
  return;
} finally {
    heap.freeFrame(20);
  }
}

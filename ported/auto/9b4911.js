// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b4911.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CONCAT22, LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_009b4911(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_PTR_DAT_009b5864 = __sp + 0;
  const __addr_PTR_DAT_009b4a2c = __sp + 4;
  const __addr_PTR_DAT_009b5148 = __sp + 8;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let iVar9 = 0;
  let uVar11 = 0;
  let unaff_ESI = 0;
  let uVar5 = 0;
  uVar11 = (undefined2)(heap.u32(0x009a2020) >>> 0x10);
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
      puVar10 = (CONCAT22(uVar11, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
      do {
        uVar2 = heap.u32(puVar10);
        heap.setU32(0x009aa032, (uVar2) >>> 0);
        uVar6 = (heap.u32(0x009aa032) & 0x7f);
        puVar10 = (puVar10 + uVar6 + 2);
        iVar9 = (uVar2 >>> 8) - heap.u32(0x009a2024);
        if (iVar9 == 0 || (uVar2 >>> 8) < heap.u32(0x009a2024)) {
          uVar4 = (heap.u32(0x009aa032) & 0x7f) + iVar9;
          uVar6 = uVar4;
          if ((-1 < uVar4) && (uVar4 != 0)) {
            iVar9 = 0;
            /* goto LAB_009b583f */ throw new Error("goto LAB_009b583f not supported");
          }
        } else {
          LAB_009b583f: sVar3 = uVar6;
          sVar7 = iVar9 + sVar3;
          sVar8 = sVar7 - heap.u32(0x009a2028);
          if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = (sVar3 - sVar8), (sVar3 - sVar8) != 0 && sVar8 <= sVar3)) {
            LOCK();
            UNLOCK(heap);
            heap.setU32(0x009a200c, (puVar10) >>> 0);
            uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b5864) + (uVar6) * 4)))();
            return uVar1;
          }
        }
        if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
          return 0;
        }
      } while (true);
    }
    puVar10 = (CONCAT22(uVar11, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      uVar2 = heap.u32(puVar10);
      heap.setU32(0x009aa032, (uVar2) >>> 0);
      uVar6 = (heap.u32(0x009aa032) & 0x7f);
      puVar10 = (puVar10 + uVar6 + 2);
      iVar9 = (uVar2 >>> 8) - heap.u32(0x009a2024);
      if (iVar9 == 0 || (uVar2 >>> 8) < heap.u32(0x009a2024)) {
        uVar4 = (heap.u32(0x009aa032) & 0x7f) + iVar9;
        uVar6 = uVar4;
        if ((-1 < uVar4) && (uVar4 != 0)) {
          iVar9 = 0;
          /* goto LAB_009b4a07 */ throw new Error("goto LAB_009b4a07 not supported");
        }
      } else {
        LAB_009b4a07: sVar3 = uVar6;
        sVar7 = iVar9 + sVar3;
        sVar8 = sVar7 - heap.u32(0x009a2028);
        if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = (sVar3 - sVar8), (sVar3 - sVar8) != 0 && sVar8 <= sVar3)) {
          LOCK();
          UNLOCK(heap);
          heap.setU32(0x009a200c, (puVar10) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b4a2c) + (uVar6) * 4)))();
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar10 = (CONCAT22(uVar11, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      uVar2 = heap.u32(puVar10);
      heap.setU32(0x009aa032, (uVar2) >>> 0);
      uVar6 = (heap.u32(0x009aa032) & 0x7f);
      puVar10 = (puVar10 + uVar6 + 2);
      iVar9 = (uVar2 >>> 8) - heap.u32(0x009a2024);
      if (iVar9 == 0 || (uVar2 >>> 8) < heap.u32(0x009a2024)) {
        uVar4 = (heap.u32(0x009aa032) & 0x7f) + iVar9;
        uVar6 = uVar4;
        if ((-1 < uVar4) && (uVar4 != 0)) {
          iVar9 = 0;
          /* goto LAB_009b5123 */ throw new Error("goto LAB_009b5123 not supported");
        }
      } else {
        LAB_009b5123: sVar3 = uVar6;
        sVar7 = iVar9 + sVar3;
        sVar8 = sVar7 - heap.u32(0x009a2028);
        if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = (sVar3 - sVar8), (sVar3 - sVar8) != 0 && sVar8 <= sVar3)) {
          LOCK();
          UNLOCK(heap);
          heap.setU32(0x009a200c, (puVar10) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b5148) + (uVar6) * 4)))();
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
        return 0;
      }
    } while (true);
  }
  puVar10 = (CONCAT22(uVar11, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
  do {
    heap.setU32(0x009aa032, ((byte) * puVar10) >>> 0);
    puVar12 = puVar10 + 1;
    uVar6 = (heap.u32(puVar10) >>> 8);
    uVar5 = (heap.u32(0x009aa032) & 0x7f);
    puVar10 = (puVar12 + uVar5);
    iVar9 = uVar6 - heap.u32(0x009a2024);
    if (iVar9 == 0 || uVar6 < heap.u32(0x009a2024)) {
      puVar12 = (puVar12 - iVar9);
      uVar2 = (heap.u32(0x009aa032) & 0x7f) + iVar9;
      uVar5 = uVar2;
      if ((-1 < uVar2) && (uVar2 != 0)) {
        iVar9 = 0;
        puVar14 = unaff_EDI;
        /* goto LAB_009b4972 */ throw new Error("goto LAB_009b4972 not supported");
      }
    } else {
      puVar14 = (unaff_EDI + iVar9);
      LAB_009b4972: sVar3 = uVar5;
      sVar7 = iVar9 + sVar3;
      sVar8 = sVar7 - heap.u32(0x009a2028);
      if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar5 = (sVar3 - sVar8), (sVar3 - sVar8) != 0 && sVar8 <= sVar3)) {
        puVar13 = puVar12;
        puVar15 = puVar14;
        if ((uVar5 & 1) != 0) {
          puVar15 = (puVar14 + 1);
          puVar13 = (puVar12 + 1);
          heap.u32(puVar14) = heap.u32(puVar12);
        }
        uVar6 = uVar5 >>> 2;
        if ((uVar5 >>> 1 & 1) != 0) {
          heap.u32(puVar15) = heap.u32(puVar13);
          puVar13 = puVar13 + 1;
          puVar15 = puVar15 + 1;
        }
        for (; uVar6 != 0; uVar6 = uVar6 - 1) {
          heap.u32(puVar15) = heap.u32(puVar13);
          puVar13 = puVar13 + 2;
          puVar15 = puVar15 + 2;
        }
      }
    }
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = (unaff_EDI + heap.u32(0x009a2030));
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_EAX;
      }
    }
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}

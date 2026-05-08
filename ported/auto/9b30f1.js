// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b30f1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, CONCAT31, CONCAT44 } from "../runtime/win32.js";
export function FUN_009b30f1(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_008dc0b4 = __sp + 0;
  const __addr_DAT_009aa244 = __sp + 4;
  const __addr_DAT_009aa06c = __sp + 8;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let uVar8 = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let sVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_EBP = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let iVar18 = 0;
  let iVar19 = 0;
  let local_1a = 0;
  sVar9 = in_EAX;
  if (((((sVar9 <= unaff_BX) && (sVar7 = in_EDX, in_CX <= sVar7)) && (heap.u32(unaff_EDI + (1) * 4) <= unaff_BX)) && ((sVar9 < (heap.u32(unaff_EDI + (1) * 4) + heap.u32(unaff_EDI + (2) * 4)) && (heap.u32((unaff_EDI + 6)) <= sVar7)))) && (in_CX < (heap.u32((unaff_EDI + 6)) + heap.u32((unaff_EDI + 10))))) {
    uVar1 = unaff_EBP;
    if ((unaff_EBP & 0x1000000) != 0) {
      uVar10 = sVar9 - heap.u32(unaff_EDI + (1) * 4);
      uVar3 = uVar10;
      local_1a = 0;
      if (uVar10 < 0) {
        uVar3 = 0;
        local_1a = uVar10;
      }
      sVar9 = (unaff_BX - heap.u32(unaff_EDI + (1) * 4)) + 1;
      if (heap.u32(unaff_EDI + (2) * 4) < sVar9) {
        sVar9 = heap.u32(unaff_EDI + (2) * 4);
      }
      uVar10 = in_CX - heap.u32((unaff_EDI + 6));
      if (uVar10 < 0) {
        local_1a = local_1a ^ uVar10;
        uVar10 = 0;
      }
      sVar7 = (sVar7 - heap.u32((unaff_EDI + 6))) + 1;
      if (heap.u32((unaff_EDI + 10)) < sVar7) {
        sVar7 = heap.u32((unaff_EDI + 10));
      }
      sVar7 = sVar7 - uVar10;
      uVar6 = uVar10;
      puVar15 = ((ushort)(heap.u32(unaff_EDI + (3) * 4) + heap.u32(unaff_EDI + (2) * 4)) * uVar6 + uVar3 + heap.u32(unaff_EDI));
      iVar11 = heap.u32(unaff_EDI + (3) * 4);
      iVar19 = heap.u32(unaff_EDI + (2) * 4);
      do {
        uVar6 = CONCAT22(heap, (ushort)(uVar6 >>> 0x11) | (ushort)(((uint)((local_1a & 1) != 0) << 0x1f) >>> 0x10), sVar9 - uVar3);
        do {
          if ((uVar6 ^ 0x80000000) < 0) {
            heap.u32(puVar15) = uVar1;
          }
          puVar15 = puVar15 + 1;
          sVar5 = uVar6 + -1;
          uVar6 = CONCAT22(heap, ((uVar6 ^ 0x80000000) >>> 0x10), sVar5);
        } while (sVar5 != 0);
        local_1a = local_1a ^ 1;
        puVar15 = puVar15 + (ushort)((iVar11 + iVar19) - (sVar9 - uVar3));
        sVar7 = sVar7 + -1;
      } while (sVar7 != 0);
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    if ((unaff_EBP & 0x4000000) != 0) {
      heap.setU32(0x009aa034, (0) >>> 0);
      uVar3 = sVar9 - heap.u32(unaff_EDI + (1) * 4);
      if (uVar3 < 0) {
        heap.setU32(0x009aa034, ((ushort) - uVar3 & 0x3f) >>> 0);
        uVar3 = 0;
      }
      sVar9 = (unaff_BX - heap.u32(unaff_EDI + (1) * 4)) + 1;
      if (heap.u32(unaff_EDI + (2) * 4) < sVar9) {
        sVar9 = heap.u32(unaff_EDI + (2) * 4);
      }
      heap.setU32(0x009aa038, (0) >>> 0);
      sVar5 = in_CX - heap.u32((unaff_EDI + 6));
      if (sVar5 < 0) {
        heap.setU32(0x009aa038, ((ushort) - sVar5 & 0x3f) >>> 0);
        sVar5 = 0;
      }
      sVar7 = (sVar7 - heap.u32((unaff_EDI + 6))) + 1;
      if (heap.u32((unaff_EDI + 10)) < sVar7) {
        sVar7 = heap.u32((unaff_EDI + 10));
      }
      puVar17 = ((uint)(ushort)(heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI + (3) * 4)) * sVar5 + uVar3 + heap.u32(unaff_EDI));
      heap.setU32(0x009aa03c, ((uint)(ushort)(sVar9 - uVar3)) >>> 0);
      heap.setU32(0x009aa040, ((uint)(ushort)(sVar7 - sVar5)) >>> 0);
      heap.setU32(0x009aa044, ((ushort)(heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI + (3) * 4)) - heap.u32(0x009aa03c)) >>> 0);
      uVar6 = unaff_EBP & 0x7f;
      if ((uVar6 != 0) && ((unaff_EBP & 0x18000000) == 0)) {
        iVar11 = heap.u32(0x009aa038) * 0x40 + heap.u32((__addr_DAT_008dc0b4) + ((uint) * (__addr_DAT_009aa244 + uVar6 * 2) * 4) * 4);
        do {
          uVar6 = heap.u32(0x009aa03c) >>> 1;
          uVar12 = heap.u32(0x009aa034);
          if ((heap.u32(0x009aa03c) & 1) != 0) {
            uVar12 = heap.u32(0x009aa034) + 1;
            heap.u32(puVar17) = heap.u32((heap.u32(0x009aa034) + iVar11));
            uVar12 = uVar12 & 0x3f;
            puVar17 = (puVar17 + 1);
          }
          for (; uVar6 != 0; uVar6 = uVar6 - 1) {
            uVar13 = uVar12 + 1 & 0x3f;
            heap.u32(puVar17) = CONCAT11(heap, heap.u32((uVar13 + iVar11)), heap.u32((uVar12 + iVar11)));
            puVar17 = puVar17 + 1;
            uVar12 = uVar13 + 1 & 0x3f;
          }
          heap.setU32(0x009aa038, (heap.u32(0x009aa038) + 1) >>> 0);
          iVar19 = iVar11 + 0x40;
          if (0x3f < heap.u32(0x009aa038)) {
            heap.setU32(0x009aa038, (0) >>> 0);
            iVar19 = iVar11 + -0xfc0;
          }
          puVar17 = (puVar17 + heap.u32(0x009aa044));
          heap.setU32(0x009aa040, (heap.u32(0x009aa040) - 1) >>> 0);
          iVar11 = iVar19;
        } while (heap.u32(0x009aa040) != 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      iVar11 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + uVar6 * 4)) * 4) * 4);
      if ((unaff_EBP & 0x8000000) != 0) {
        iVar11 = iVar11 + 1;
      }
      if ((unaff_EBP & 0x10000000) != 0) {
        iVar11 = iVar11 + -1;
      }
      iVar19 = heap.u32(0x009aa038) * 0x40;
      do {
        uVar6 = heap.u32(0x009aa03c) >>> 1;
        uVar12 = heap.u32(0x009aa034);
        if ((heap.u32(0x009aa03c) & 1) != 0) {
          uVar12 = heap.u32(0x009aa034) + 1;
          heap.u32(puVar17) = heap.u32(((uint) * (heap.u32(0x009aa034) + iVar19) + iVar11));
          uVar12 = uVar12 & 0x3f;
          puVar17 = (puVar17 + 1);
        }
        for (; uVar6 != 0; uVar6 = uVar6 - 1) {
          heap.u32(puVar17) = heap.u32(((uint) * (uVar12 + iVar19) + iVar11));
          uVar12 = uVar12 + 1 & 0x3f;
          heap.u32((puVar17 + 1)) = heap.u32(((uint) * (uVar12 + iVar19) + iVar11));
          puVar17 = puVar17 + 1;
          uVar12 = uVar12 + 1 & 0x3f;
        }
        heap.setU32(0x009aa038, (heap.u32(0x009aa038) + 1) >>> 0);
        iVar18 = iVar19 + 0x40;
        if (0x3f < heap.u32(0x009aa038)) {
          heap.setU32(0x009aa038, (0) >>> 0);
          iVar18 = iVar19 + -0xfc0;
        }
        puVar17 = (puVar17 + heap.u32(0x009aa044));
        heap.setU32(0x009aa040, (heap.u32(0x009aa040) - 1) >>> 0);
        iVar19 = iVar18;
      } while (heap.u32(0x009aa040) != 0);
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    uVar3 = sVar9 - heap.u32(unaff_EDI + (1) * 4);
    if (uVar3 < 0) {
      uVar3 = 0;
    }
    sVar9 = (unaff_BX - heap.u32(unaff_EDI + (1) * 4)) + 1;
    if (heap.u32(unaff_EDI + (2) * 4) < sVar9) {
      sVar9 = heap.u32(unaff_EDI + (2) * 4);
    }
    uVar10 = sVar9 - uVar3;
    sVar9 = in_CX - heap.u32((unaff_EDI + 6));
    if (sVar9 < 0) {
      sVar9 = 0;
    }
    sVar7 = (sVar7 - heap.u32((unaff_EDI + 6))) + 1;
    if (heap.u32((unaff_EDI + 10)) < sVar7) {
      sVar7 = heap.u32((unaff_EDI + 10));
    }
    uVar8 = sVar7 - sVar9;
    if ((unaff_EBP & 0x2000000) != 0) {
      if (heap.u32((unaff_EDI + 0xe)) == 1) {
        uVar10 = uVar10 >>> 1;
        uVar8 = uVar8 >>> 1;
        pbVar16 = ((uint)(ushort)((heap.u32((unaff_EDI + 2)) >>> 1) + heap.u32(unaff_EDI + (3) * 4)) * sVar9 + uVar3 + heap.u32(unaff_EDI));
        iVar11 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4);
        uVar3 = heap.u32((unaff_EDI + 2));
        iVar19 = heap.u32(unaff_EDI + (3) * 4);
        uVar4 = uVar10;
        do {
          do {
            heap.u32(pbVar16) = heap.u32(((uint) * pbVar16 + iVar11));
            pbVar16 = pbVar16 + 1;
            uVar4 = uVar4 - 1;
          } while (uVar4 != 0);
          pbVar16 = pbVar16 + (((uVar3 >>> 1) + iVar19) - uVar10);
          uVar8 = uVar8 - 1;
          uVar4 = uVar10;
        } while (uVar8 != 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      if (heap.u32((unaff_EDI + 0xe)) < 2) {
        pbVar16 = ((uint)(ushort)(heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI + (3) * 4)) * sVar9 + uVar3 + heap.u32(unaff_EDI));
        iVar11 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4);
        iVar19 = heap.u32(unaff_EDI + (2) * 4);
        iVar18 = heap.u32(unaff_EDI + (3) * 4);
        uVar3 = uVar10;
        do {
          do {
            heap.u32(pbVar16) = heap.u32(((uint) * pbVar16 + iVar11));
            pbVar16 = pbVar16 + 1;
            uVar3 = uVar3 - 1;
          } while (uVar3 != 0);
          pbVar16 = pbVar16 + ((iVar19 + iVar18) - uVar10);
          uVar8 = uVar8 - 1;
          uVar3 = uVar10;
        } while (uVar8 != 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      uVar10 = uVar10 >>> 2;
      uVar8 = uVar8 >>> 2;
      pbVar16 = ((uint)(ushort)((heap.u32((unaff_EDI + 2)) >>> 2) + heap.u32(unaff_EDI + (3) * 4)) * sVar9 + uVar3 + heap.u32(unaff_EDI));
      iVar11 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4);
      uVar3 = heap.u32((unaff_EDI + 2));
      iVar19 = heap.u32(unaff_EDI + (3) * 4);
      uVar4 = uVar10;
      do {
        do {
          heap.u32(pbVar16) = heap.u32(((uint) * pbVar16 + iVar11));
          pbVar16 = pbVar16 + 1;
          uVar4 = uVar4 - 1;
        } while (uVar4 != 0);
        pbVar16 = pbVar16 + (((uVar3 >>> 2) + iVar19) - uVar10);
        uVar8 = uVar8 - 1;
        uVar4 = uVar10;
      } while (uVar8 != 0);
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    puVar14 = ((uint)(ushort)(heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI + (3) * 4)) * sVar9 + uVar3 + heap.u32(unaff_EDI));
    uVar2 = CONCAT31(heap, CONCAT21(heap, CONCAT11(heap, uVar1, uVar1), uVar1), uVar1);
    iVar11 = heap.u32(unaff_EDI + (2) * 4);
    iVar19 = heap.u32(unaff_EDI + (3) * 4);
    do {
      if ((uVar10 & 1) != 0) {
        heap.u32(puVar14) = uVar1;
        puVar14 = (puVar14 + 1);
      }
      uVar6 = (uint)(uVar10 >>> 2);
      if ((uVar10 >>> 1 & 1) != 0) {
        heap.u32(puVar14) = uVar2;
        puVar14 = (puVar14 + 2);
      }
      for (; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(puVar14) = uVar2;
        puVar14 = puVar14 + 1;
      }
      puVar14 = (puVar14 + ((uint)(ushort)(iVar11 + iVar19) - uVar10));
      uVar8 = uVar8 - 1;
    } while (uVar8 != 0);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(12);
  }
}

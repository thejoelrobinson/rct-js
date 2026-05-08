// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b8491.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/win32.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b8705 } from "./9b8705.js";
import { FUN_009b8aa9 } from "./9b8aa9.js";
export function FUN_009b8491(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_008dc0c0 = __sp + 0;
  const __addr_DAT_008dc0b4 = __sp + 4;
  const __addr_DAT_008dc0b8 = __sp + 8;
  const __addr_DAT_008dc0bc = __sp + 12;
  const __addr_DAT_009a2032 = __sp + 16;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = 0;
  let sVar5 = 0;
  let in_DX = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let unaff_EBX = 0;
  let unaff_EDI = 0;
  if ((heap.u32((__addr_DAT_008dc0c0 + unaff_EBX)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u32((__addr_DAT_008dc0c0 + unaff_EBX)) & 0x10) != 0) {
    heap.u32((unaff_EDI + 0xe)) = heap.u32((unaff_EDI + 0xe)) + -1;
    heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) >>> 1;
    heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) >>> 1;
    heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) >>> 1;
    heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) >>> 1;
    uVar3 = FUN_009b4457(heap);
    heap.u32((unaff_EDI + 0xe)) = heap.u32((unaff_EDI + 0xe)) + 1;
    heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) << 1;
    heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) << 1;
    heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) << 1;
    heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) << 1;
    return uVar3;
  }
  pbVar9 = heap.u32((__addr_DAT_008dc0b4 + unaff_EBX));
  uVar3 = heap.u32((__addr_DAT_008dc0b8 + unaff_EBX));
  heap.setU32(0x009a2018, (heap.u32((__addr_DAT_008dc0bc + unaff_EBX))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((__addr_DAT_008dc0c0 + unaff_EBX))) >>> 0);
  sVar7 = (heap.u32(0x009a2018) >>> 0x10);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  heap.setU32(0x009a2016, ((ushort)(uVar3 >>> 0x10)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar4 = CONCAT22(heap, sVar7, heap.u32(0x009a2016));
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = CONCAT22(heap, sVar7, heap.u32(0x009a2016) - 1);
      if ((ushort)(heap.u32(0x009a2016) - 1) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    sVar8 = uVar4;
    if ((uVar4 & 2) != 0) {
      sVar5 = sVar8 + -2;
      uVar4 = CONCAT22(heap, (uVar4 >>> 0x10), sVar5);
      if (sVar5 == 0 || sVar8 < 2) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) + 2) >>> 0);
    }
    heap.setU32(0x009a202c, (uVar4) >>> 0);
    uVar2 = (in_DX + sVar7 & 0xfffcU) - heap.u32((unaff_EDI + 6));
    if (uVar2 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar2) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar2) >>> 0);
      uVar2 = 0;
    } else {
      uVar4 = ((heap.u32((unaff_EDI + 8)) >>> 2) + heap.u32((unaff_EDI + 0xc))) * (uVar2 >>> 2);
    }
    sVar7 = heap.u32(0x009a202c);
    sVar8 = (uVar2 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar8 == 0 || (uVar2 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar8) >>> 0), heap.u32(0x009a202c) != 0 && sVar8 <= sVar7)) {
      uVar4 = CONCAT22(heap, (uVar4 >>> 0x10), heap.u32(0x009a2014));
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar7 = (in_CX + heap.u32(0x009a2018) & 0xfffcU) - heap.u32((unaff_EDI + 4));
      if (sVar7 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar7) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2024, (-sVar7) >>> 0);
        sVar7 = 0;
      }
      sVar8 = heap.u32(0x009a2028);
      sVar5 = (sVar7 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if ((sVar5 == 0 || (sVar7 + heap.u32(0x009a2028)) < heap.u32((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar8)) {
        heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 2) + heap.u32((unaff_EDI + 0xc))) >>> 0);
        uVar4 = FUN_009b8aa9(heap);
        uVar3 = heap.u32(0x009a2014);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  uVar2 = heap.u32(0x009a2016);
  if ((uVar3 & 0x10000) != 0) {
    uVar2 = heap.u32(0x009a2016) - 1;
  }
  if ((uVar2 & 2) != 0) {
    uVar2 = uVar2 - 2;
  }
  uVar4 = CONCAT22(heap, sVar7, uVar2);
  if (uVar2 != 0) {
    uVar6 = (in_DX + sVar7 & 0xfffcU) - heap.u32((unaff_EDI + 6));
    if (uVar6 < 0) {
      heap.setU32(0x009a202c, (uVar2 + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * (uint)(ushort) - uVar6 & 0xffff;
      uVar6 = 0;
    } else {
      uVar4 = (uint)(ushort)((heap.u32((unaff_EDI + 8)) >>> 2) + heap.u32((unaff_EDI + 0xc))) * (uint)(uVar6 >>> 2);
      heap.setU32(0x009a202c, (uVar2) >>> 0);
    }
    uVar2 = heap.u32(0x009a202c);
    sVar7 = (uVar6 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar7 == 0 || (uVar6 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar7) >>> 0), heap.u32(0x009a202c) != 0 && sVar7 <= uVar2)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 2) + heap.u32((unaff_EDI + 0xc))) >>> 0);
      uVar4 = CONCAT22(heap, (uVar4 >>> 0x10), heap.u32(0x009a2030));
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar7 = (in_CX + heap.u32(0x009a2018) & 0xfffcU) - heap.u32((unaff_EDI + 4));
      if (sVar7 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar7) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar7) >>> 0);
        sVar7 = 0;
      }
      sVar8 = heap.u32(0x009a2028);
      sVar5 = (sVar7 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if (sVar5 != 0 && heap.u32((unaff_EDI + 8)) <= (sVar7 + heap.u32(0x009a2028))) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar8 < sVar5) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar7 = heap.u32(0x009a2016) * heap.u32(0x009a2014);
        pbVar11 = __addr_DAT_009a2032;
        while (sVar7 != 0) {
          bVar1 = heap.u32(pbVar9);
          uVar3 = bVar1;
          if (bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar7 = sVar7 - (ushort)(byte) - (bVar1 >>> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(heap, bVar1, heap.u32(pbVar10)) & 0x7ff);
            for (uVar3 = (uint)(byte) - (bVar1 >>> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar10);
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          } else {
            sVar7 = sVar7 - bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar9);
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b8705(heap);
        return uVar3;
      }
      uVar4 = FUN_009b8705(heap);
      uVar3 = heap.u32(0x009a2014);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
} finally {
    heap.freeFrame(20);
  }
}

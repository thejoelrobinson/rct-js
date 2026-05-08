// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b4457.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/ghidra-builtins.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b4457(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_008dc0b4 = __sp + 0;
  const __addr_DAT_008dc0b8 = __sp + 4;
  const __addr_DAT_008dc0bc = __sp + 8;
  const __addr_DAT_008dc0c0 = __sp + 12;
  const __addr_DAT_009a2032 = __sp + 16;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let in_CX = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_DX = 0;
  let uVar6 = 0;
  let unaff_EBX = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let unaff_EDI = 0;
  uVar7 = unaff_EBX & 0x1ffff;
  iVar8 = uVar7 * 0x10;
  if (heap.u32((unaff_EDI + 0xe)) == 0) {
    pbVar9 = heap.u32((__addr_DAT_008dc0b4) + (uVar7 * 4) * 4);
    uVar7 = heap.u32((__addr_DAT_008dc0b8 + iVar8));
    heap.setU32(0x009a2018, (heap.u32((__addr_DAT_008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((__addr_DAT_008dc0c0 + iVar8))) >>> 0);
    sVar4 = (heap.u32(0x009a2018) >>> 0x10);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    heap.setU32(0x009a2016, ((uVar7 >>> 0x10)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar3 = CONCAT22(sVar4, heap.u32(0x009a2016));
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar4 = (in_DX + sVar4) - heap.u32((unaff_EDI + 6));
      if (sVar4 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar4) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2020, (-sVar4) >>> 0);
        sVar4 = 0;
      } else {
        uVar3 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) * sVar4;
      }
      sVar2 = heap.u32(0x009a202c);
      sVar5 = (sVar4 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
      if ((sVar5 == 0 || (sVar4 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar5) >>> 0), heap.u32(0x009a202c) != 0 && sVar5 <= sVar2)) {
        uVar3 = CONCAT22((uVar3 >>> 0x10), heap.u32(0x009a2014));
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar4 = (in_CX + heap.u32(0x009a2018)) - heap.u32((unaff_EDI + 4));
        if (sVar4 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          heap.setU32(0x009a2024, (-sVar4) >>> 0);
          sVar4 = 0;
        }
        sVar2 = heap.u32(0x009a2028);
        sVar5 = (sVar4 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
        if ((sVar5 == 0 || (sVar4 + heap.u32(0x009a2028)) < heap.u32((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) >>> 0);
          uVar3 = FUN_009b4911(heap);
          uVar7 = heap.u32(0x009a2014);
        }
      }
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = CONCAT22(sVar4, heap.u32(0x009a2016));
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar6 = (in_DX + sVar4) - heap.u32((unaff_EDI + 6));
    if (uVar6 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (uVar7 & 0xffff) * -uVar6 & 0xffff;
      uVar6 = 0;
    } else {
      uVar3 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) * uVar6;
    }
    sVar4 = heap.u32(0x009a202c);
    sVar2 = (uVar6 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar6 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) - heap.u32(0x009a2014)) + heap.u32((unaff_EDI + 0xc))) >>> 0);
      uVar3 = CONCAT22((uVar3 >>> 0x10), heap.u32(0x009a2030));
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (in_CX + heap.u32(0x009a2018)) - heap.u32((unaff_EDI + 4));
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar4) >>> 0);
        sVar4 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar5 = (sVar4 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if (sVar5 != 0 && heap.u32((unaff_EDI + 8)) <= (sVar4 + heap.u32(0x009a2028))) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = heap.u32(0x009a2016) * heap.u32(0x009a2014);
        pbVar11 = __addr_DAT_009a2032;
        while (sVar4 != 0) {
          bVar1 = heap.u32(pbVar9);
          uVar7 = bVar1;
          if (bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar4 = sVar4 - (byte) - (bVar1 >>> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(CONCAT11(bVar1, heap.u32(pbVar10)) & 0x7ff);
            for (uVar7 = (byte) - (bVar1 >>> 3); uVar7 != 0; uVar7 = uVar7 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar10);
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          } else {
            sVar4 = sVar4 - bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar7 != 0; uVar7 = uVar7 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar9);
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar7 = FUN_009b4660(heap);
        return uVar7;
      }
      uVar3 = FUN_009b4660(heap);
      uVar7 = heap.u32(0x009a2014);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.u32((unaff_EDI + 0xe)) != 1) {
    uVar7 = FUN_009b8491(heap);
    return uVar7;
  }
  if ((heap.u32((__addr_DAT_008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u32((__addr_DAT_008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.u32((unaff_EDI + 0xe)) = heap.u32((unaff_EDI + 0xe)) + -1;
    heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) >>> 1;
    heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) >>> 1;
    heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) >>> 1;
    heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) >>> 1;
    uVar7 = FUN_009b4457(heap);
    heap.u32((unaff_EDI + 0xe)) = heap.u32((unaff_EDI + 0xe)) + 1;
    heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) << 1;
    heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) << 1;
    heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) << 1;
    heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) << 1;
    return uVar7;
  }
  pbVar9 = heap.u32((__addr_DAT_008dc0b4) + (uVar7 * 4) * 4);
  uVar7 = heap.u32((__addr_DAT_008dc0b8 + iVar8));
  heap.setU32(0x009a2018, (heap.u32((__addr_DAT_008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((__addr_DAT_008dc0c0 + iVar8))) >>> 0);
  sVar4 = (heap.u32(0x009a2018) >>> 0x10);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  heap.setU32(0x009a2016, ((uVar7 >>> 0x10)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = CONCAT22(sVar4, heap.u32(0x009a2016));
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = CONCAT22(sVar4, heap.u32(0x009a2016) + -1);
      if ((heap.u32(0x009a2016) + -1) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (uVar3) >>> 0);
    uVar6 = (in_DX + sVar4 & 0xfffeU) - heap.u32((unaff_EDI + 6));
    if (uVar6 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar6) >>> 0);
      uVar6 = 0;
    } else {
      uVar3 = ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) * (uVar6 >>> 1);
    }
    sVar4 = heap.u32(0x009a202c);
    sVar2 = (uVar6 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar6 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      uVar3 = CONCAT22((uVar3 >>> 0x10), heap.u32(0x009a2014));
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar4 = (in_CX + heap.u32(0x009a2018) & 0xfffeU) - heap.u32((unaff_EDI + 4));
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-sVar4) >>> 0);
        sVar4 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar5 = (sVar4 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if ((sVar5 == 0 || (sVar4 + heap.u32(0x009a2028)) < heap.u32((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) >>> 0);
        uVar3 = FUN_009b6863(heap);
        uVar7 = heap.u32(0x009a2014);
      }
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  sVar2 = heap.u32(0x009a2016);
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = heap.u32(0x009a2016) + -1;
  }
  uVar3 = CONCAT22(sVar4, sVar2);
  if (sVar2 != 0) {
    uVar6 = (in_DX + sVar4 & 0xfffeU) - heap.u32((unaff_EDI + 6));
    if (uVar6 < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (uVar7 & 0xffff) * -uVar6 & 0xffff;
      uVar6 = 0;
    } else {
      uVar3 = ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) * (uVar6 >>> 1);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
    }
    sVar4 = heap.u32(0x009a202c);
    sVar2 = (uVar6 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar6 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) >>> 0);
      uVar3 = CONCAT22((uVar3 >>> 0x10), heap.u32(0x009a2030));
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (in_CX + heap.u32(0x009a2018) & 0xfffeU) - heap.u32((unaff_EDI + 4));
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        sVar4 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar5 = (sVar4 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if (sVar5 != 0 && heap.u32((unaff_EDI + 8)) <= (sVar4 + heap.u32(0x009a2028))) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = heap.u32(0x009a2016) * heap.u32(0x009a2014);
        pbVar11 = __addr_DAT_009a2032;
        while (sVar4 != 0) {
          bVar1 = heap.u32(pbVar9);
          uVar7 = bVar1;
          if (bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar4 = sVar4 - (byte) - (bVar1 >>> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(CONCAT11(bVar1, heap.u32(pbVar10)) & 0x7ff);
            for (uVar7 = (byte) - (bVar1 >>> 3); uVar7 != 0; uVar7 = uVar7 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar10);
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          } else {
            sVar4 = sVar4 - bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar7 != 0; uVar7 = uVar7 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar9);
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar7 = FUN_009b64ea(heap);
        return uVar7;
      }
      uVar3 = FUN_009b64ea(heap);
      uVar7 = heap.u32(0x009a2014);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
} finally {
    heap.freeFrame(20);
  }
}

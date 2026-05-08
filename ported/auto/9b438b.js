// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b438b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b438b(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_008dc0b4 = __sp + 0;
  const __addr_DAT_009aa06c = __sp + 4;
  const __addr_DAT_009aa144 = __sp + 8;
  const __addr_DAT_008dc0b8 = __sp + 12;
  const __addr_DAT_008dc0bc = __sp + 16;
  const __addr_DAT_008dc0c0 = __sp + 20;
  const __addr_DAT_009a2032 = __sp + 24;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let in_DX = 0;
  let uVar7 = 0;
  let unaff_EBX = 0;
  let iVar8 = 0;
  let unaff_EDI = 0;
  heap.setU32(0x009a2000, (unaff_EBX & 0x60000000) >>> 0);
  if (heap.u32(0x009a2000) != 0) {
    if ((unaff_EBX & 0x80000000) == 0) {
      uVar3 = unaff_EBX >>> 0x11 & 0x7f;
    } else {
      uVar3 = unaff_EBX >>> 0x11 & 0x7f;
      if (uVar3 != 0x27) {
        iVar8 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + uVar3 * 4)) * 4) * 4);
        heap.setU32(0x009aa237, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa23b, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa23f, (heap.u32((iVar8 + 0xfb))) >>> 0);
        iVar8 = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + (unaff_EBX >>> 0x18 & 0x1f) * 4)) * 4) * 4);
        heap.setU32(0x009aa20e, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa212, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa216, (heap.u32((iVar8 + 0xfb))) >>> 0);
        heap.setU32(0x009a200c, (__addr_DAT_009aa144) >>> 0);
        uVar3 = FUN_009b4457(heap);
        return uVar3;
      }
    }
    in_EAX = heap.u32((__addr_DAT_008dc0b4) + (heap.u32((__addr_DAT_009aa06c + uVar3 * 4)) * 4) * 4);
    heap.setU32(0x009a200c, (in_EAX) >>> 0);
  }
  uVar3 = unaff_EBX & 0x1ffff;
  iVar8 = uVar3 * 0x10;
  if (heap.u32((unaff_EDI + 0xe)) == 0) {
    pbVar9 = heap.u32((__addr_DAT_008dc0b4) + (uVar3 * 4) * 4);
    uVar3 = heap.u32((__addr_DAT_008dc0b8 + iVar8));
    heap.setU32(0x009a2018, (heap.u32((__addr_DAT_008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((__addr_DAT_008dc0c0 + iVar8))) >>> 0);
    sVar5 = (heap.u32(0x009a2018) >>> 0x10);
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    heap.setU32(0x009a2016, ((uVar3 >>> 0x10)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar4 = CONCAT22(sVar5, heap.u32(0x009a2016));
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar5 = (in_DX + sVar5) - heap.u32((unaff_EDI + 6));
      if (sVar5 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar5) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2020, (-sVar5) >>> 0);
        sVar5 = 0;
      } else {
        uVar4 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) * sVar5;
      }
      sVar2 = heap.u32(0x009a202c);
      sVar6 = (sVar5 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
      if ((sVar6 == 0 || (sVar5 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
        uVar4 = CONCAT22((uVar4 >>> 0x10), heap.u32(0x009a2014));
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar5 = (in_CX + heap.u32(0x009a2018)) - heap.u32((unaff_EDI + 4));
        if (sVar5 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          heap.setU32(0x009a2024, (-sVar5) >>> 0);
          sVar5 = 0;
        }
        sVar2 = heap.u32(0x009a2028);
        sVar6 = (sVar5 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
        if ((sVar6 == 0 || (sVar5 + heap.u32(0x009a2028)) < heap.u32((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) >>> 0);
          uVar4 = FUN_009b4911(heap);
          uVar3 = heap.u32(0x009a2014);
        }
      }
      heap.setU32(0x009a2014, (uVar3) >>> 0);
      return uVar4;
    }
    uVar4 = CONCAT22(sVar5, heap.u32(0x009a2016));
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar7 = (in_DX + sVar5) - heap.u32((unaff_EDI + 6));
    if (uVar7 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * -uVar7 & 0xffff;
      uVar7 = 0;
    } else {
      uVar4 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 0xc))) * uVar7;
    }
    sVar5 = heap.u32(0x009a202c);
    sVar2 = (uVar7 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar7 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) - heap.u32(0x009a2014)) + heap.u32((unaff_EDI + 0xc))) >>> 0);
      uVar4 = CONCAT22((uVar4 >>> 0x10), heap.u32(0x009a2030));
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (in_CX + heap.u32(0x009a2018)) - heap.u32((unaff_EDI + 4));
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar5) >>> 0);
        sVar5 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar6 = (sVar5 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if (sVar6 != 0 && heap.u32((unaff_EDI + 8)) <= (sVar5 + heap.u32(0x009a2028))) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = heap.u32(0x009a2016) * heap.u32(0x009a2014);
        pbVar11 = __addr_DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = heap.u32(pbVar9);
          uVar3 = bVar1;
          if (bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (byte) - (bVar1 >>> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(CONCAT11(bVar1, heap.u32(pbVar10)) & 0x7ff);
            for (uVar3 = (byte) - (bVar1 >>> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar10);
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          } else {
            sVar5 = sVar5 - bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar9);
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b4660(heap);
        return uVar3;
      }
      uVar4 = FUN_009b4660(heap);
      uVar3 = heap.u32(0x009a2014);
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  if (heap.u32((unaff_EDI + 0xe)) != 1) {
    uVar3 = FUN_009b8491(heap);
    return uVar3;
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
    uVar3 = FUN_009b4457(heap);
    heap.u32((unaff_EDI + 0xe)) = heap.u32((unaff_EDI + 0xe)) + 1;
    heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) << 1;
    heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) << 1;
    heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) << 1;
    heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) << 1;
    return uVar3;
  }
  pbVar9 = heap.u32((__addr_DAT_008dc0b4) + (uVar3 * 4) * 4);
  uVar3 = heap.u32((__addr_DAT_008dc0b8 + iVar8));
  heap.setU32(0x009a2018, (heap.u32((__addr_DAT_008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((__addr_DAT_008dc0c0 + iVar8))) >>> 0);
  sVar5 = (heap.u32(0x009a2018) >>> 0x10);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  heap.setU32(0x009a2016, ((uVar3 >>> 0x10)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar4 = CONCAT22(sVar5, heap.u32(0x009a2016));
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = CONCAT22(sVar5, heap.u32(0x009a2016) + -1);
      if ((heap.u32(0x009a2016) + -1) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (uVar4) >>> 0);
    uVar7 = (in_DX + sVar5 & 0xfffeU) - heap.u32((unaff_EDI + 6));
    if (uVar7 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar7) >>> 0);
      uVar7 = 0;
    } else {
      uVar4 = ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) * (uVar7 >>> 1);
    }
    sVar5 = heap.u32(0x009a202c);
    sVar2 = (uVar7 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar7 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      uVar4 = CONCAT22((uVar4 >>> 0x10), heap.u32(0x009a2014));
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar5 = (in_CX + heap.u32(0x009a2018) & 0xfffeU) - heap.u32((unaff_EDI + 4));
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2024, (-sVar5) >>> 0);
        sVar5 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar6 = (sVar5 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if ((sVar6 == 0 || (sVar5 + heap.u32(0x009a2028)) < heap.u32((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) >>> 0);
        uVar4 = FUN_009b6863(heap);
        uVar3 = heap.u32(0x009a2014);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  sVar2 = heap.u32(0x009a2016);
  if ((uVar3 & 0x10000) != 0) {
    sVar2 = heap.u32(0x009a2016) + -1;
  }
  uVar4 = CONCAT22(sVar5, sVar2);
  if (sVar2 != 0) {
    uVar7 = (in_DX + sVar5 & 0xfffeU) - heap.u32((unaff_EDI + 6));
    if (uVar7 < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * -uVar7 & 0xffff;
      uVar7 = 0;
    } else {
      uVar4 = ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) * (uVar7 >>> 1);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
    }
    sVar5 = heap.u32(0x009a202c);
    sVar2 = (uVar7 + heap.u32(0x009a202c)) - heap.u32((unaff_EDI + 10));
    if ((sVar2 == 0 || (uVar7 + heap.u32(0x009a202c)) < heap.u32((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u32((unaff_EDI + 8)) >>> 1) + heap.u32((unaff_EDI + 0xc))) >>> 0);
      uVar4 = CONCAT22((uVar4 >>> 0x10), heap.u32(0x009a2030));
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (in_CX + heap.u32(0x009a2018) & 0xfffeU) - heap.u32((unaff_EDI + 4));
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = 0;
      }
      sVar2 = heap.u32(0x009a2028);
      sVar6 = (sVar5 + heap.u32(0x009a2028)) - heap.u32((unaff_EDI + 8));
      if (sVar6 != 0 && heap.u32((unaff_EDI + 8)) <= (sVar5 + heap.u32(0x009a2028))) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = heap.u32(0x009a2016) * heap.u32(0x009a2014);
        pbVar11 = __addr_DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = heap.u32(pbVar9);
          uVar3 = bVar1;
          if (bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (byte) - (bVar1 >>> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(CONCAT11(bVar1, heap.u32(pbVar10)) & 0x7ff);
            for (uVar3 = (byte) - (bVar1 >>> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar10);
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          } else {
            sVar5 = sVar5 - bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              heap.u32(pbVar11) = heap.u32(pbVar9);
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b64ea(heap);
        return uVar3;
      }
      uVar4 = FUN_009b64ea(heap);
      uVar3 = heap.u32(0x009a2014);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
} finally {
    heap.freeFrame(28);
  }
}

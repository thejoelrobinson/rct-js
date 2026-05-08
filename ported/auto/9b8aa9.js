// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b8aa9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_009b8aa9(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_PTR_DAT_009b9d78 = __sp + 0;
  const __addr_PTR_DAT_009b8cb0 = __sp + 4;
  const __addr_PTR_DAT_009b95a4 = __sp + 8;
  try {
  let in_AL = 0;
  let uVar1 = 0;
  let bVar5 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let uVar13 = 0;
  let puVar11 = 0;
  let puVar12 = 0;
  let unaff_ESI = 0;
  let puVar14 = 0;
  let unaff_EDI = 0;
  let puVar15 = 0;
  uVar13 = (heap.u32(0x009a2020) >>> 0x10);
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
      uVar1 = 0;
      puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
      do {
        sVar6 = heap.u32(0x009a202c);
        uVar3 = heap.u32(puVar12);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        bVar5 = ((uVar3 & 0xffffff7f) >>> 8);
        uVar2 = (uVar3 & 0xffffff7f);
        uVar9 = bVar5;
        puVar12 = (puVar12 + uVar2 + 2);
        if ((uVar3 & 0x100) == 0) {
          LAB_009b9d09: uVar4 = uVar2;
          if ((uVar9 & 2) != 0) {
            uVar9 = (uVar9 + 2);
            uVar4 = uVar2 - 2;
            if (uVar4 == 0 || uVar2 < 2) {
              /* goto LAB_009ba89f */ throw new Error("goto LAB_009ba89f not supported");
            }
          }
          sVar7 = (uVar9 - heap.u32(0x009a2024));
          if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
            uVar4 = uVar4 + sVar7;
            if ((uVar4 < 0) || (uVar4 == 0)) {
              /* goto LAB_009ba89f */ throw new Error("goto LAB_009ba89f not supported");
            }
            sVar7 = 0;
          }
          sVar8 = (sVar7 + uVar4) - heap.u32(0x009a2028);
          uVar2 = uVar4;
          if (((sVar8 == 0 || (sVar7 + uVar4) < heap.u32(0x009a2028)) || (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= uVar4)) && (uVar2 = (uVar2 + 3) >>> 2, uVar2 != 0)) {
            LOCK();
            UNLOCK();
            heap.setU32(0x009a200c, (puVar12) >>> 0);
            uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b9d78) + (uVar2) * 4)))();
            return uVar1;
          }
        } else {
          uVar9 = (bVar5 + 1);
          uVar2 = uVar2 - 1;
          if (uVar2 != 0) {
            /* goto LAB_009b9d09 */ throw new Error("goto LAB_009b9d09 not supported");
          }
        }
        LAB_009ba89f: if ((uVar3 & 0x80) != 0) {
          heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = heap.u32(puVar12);
            heap.setU32(0x009aa032, (uVar3) >>> 0);
            puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = heap.u32(puVar12);
            heap.setU32(0x009aa032, (uVar3) >>> 0);
            puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = heap.u32(puVar12);
            heap.setU32(0x009aa032, (uVar3) >>> 0);
            puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
        }
      } while (true);
    }
    uVar1 = 0;
    puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      sVar6 = heap.u32(0x009a202c);
      uVar3 = heap.u32(puVar12);
      heap.setU32(0x009aa032, (uVar3) >>> 0);
      bVar5 = ((uVar3 & 0xffffff7f) >>> 8);
      uVar2 = (uVar3 & 0xffffff7f);
      uVar9 = bVar5;
      puVar12 = (puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b8c41: uVar4 = uVar2;
        if ((uVar9 & 2) != 0) {
          uVar9 = (uVar9 + 2);
          uVar4 = uVar2 - 2;
          if (uVar4 == 0 || uVar2 < 2) {
            /* goto LAB_009b9458 */ throw new Error("goto LAB_009b9458 not supported");
          }
        }
        sVar7 = (uVar9 - heap.u32(0x009a2024));
        if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
          uVar4 = uVar4 + sVar7;
          if ((uVar4 < 0) || (uVar4 == 0)) {
            /* goto LAB_009b9458 */ throw new Error("goto LAB_009b9458 not supported");
          }
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar4) - heap.u32(0x009a2028);
        uVar2 = uVar4;
        if (((sVar8 == 0 || (sVar7 + uVar4) < heap.u32(0x009a2028)) || (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= uVar4)) && (uVar2 = (uVar2 + 3) >>> 2, uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b8cb0) + (uVar2) * 4)))();
          return uVar1;
        }
      } else {
        uVar9 = (bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b8c41 */ throw new Error("goto LAB_009b8c41 not supported");
        }
      }
      LAB_009b9458: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    uVar1 = 0;
    puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      sVar6 = heap.u32(0x009a202c);
      uVar3 = heap.u32(puVar12);
      heap.setU32(0x009aa032, (uVar3) >>> 0);
      bVar5 = ((uVar3 & 0xffffff7f) >>> 8);
      uVar2 = (uVar3 & 0xffffff7f);
      uVar9 = bVar5;
      puVar12 = (puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b9535: uVar4 = uVar2;
        if ((uVar9 & 2) != 0) {
          uVar9 = (uVar9 + 2);
          uVar4 = uVar2 - 2;
          if (uVar4 == 0 || uVar2 < 2) {
            /* goto LAB_009b9c2c */ throw new Error("goto LAB_009b9c2c not supported");
          }
        }
        sVar7 = (uVar9 - heap.u32(0x009a2024));
        if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
          uVar4 = uVar4 + sVar7;
          if ((uVar4 < 0) || (uVar4 == 0)) {
            /* goto LAB_009b9c2c */ throw new Error("goto LAB_009b9c2c not supported");
          }
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar4) - heap.u32(0x009a2028);
        uVar2 = uVar4;
        if (((sVar8 == 0 || (sVar7 + uVar4) < heap.u32(0x009a2028)) || (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= uVar4)) && (uVar2 = (uVar2 + 3) >>> 2, uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b95a4) + (uVar2) * 4)))();
          return uVar1;
        }
      } else {
        uVar9 = (bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b9535 */ throw new Error("goto LAB_009b9535 not supported");
        }
      }
      LAB_009b9c2c: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
      }
    } while (true);
  }
  puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
  do {
    uVar3 = heap.u32(puVar12);
    heap.setU32(0x009aa032, (uVar3) >>> 0);
    puVar14 = puVar12 + 1;
    bVar5 = ((uVar3 & 0xffffff7f) >>> 8);
    uVar2 = (uVar3 & 0xffffff7f);
    uVar9 = bVar5;
    puVar11 = (puVar14 + uVar2);
    if ((uVar3 & 0x100) == 0) {
      LAB_009b8afc: uVar3 = uVar2;
      if ((uVar9 & 2) != 0) {
        uVar9 = (uVar9 + 2);
        puVar14 = puVar14 + 1;
        uVar3 = uVar2 - 2;
        if (uVar3 == 0 || uVar2 < 2) {
          /* goto LAB_009b8b54 */ throw new Error("goto LAB_009b8b54 not supported");
        }
      }
      uVar10 = uVar9 - heap.u32(0x009a2024);
      sVar6 = uVar10;
      if (uVar10 == 0 || uVar9 < heap.u32(0x009a2024)) {
        puVar14 = (puVar14 - uVar10);
        uVar3 = uVar3 + sVar6;
        if ((uVar3 < 0) || (uVar3 == 0)) {
          /* goto LAB_009b8b54 */ throw new Error("goto LAB_009b8b54 not supported");
        }
        sVar6 = 0;
        puVar15 = unaff_EDI;
      } else {
        puVar15 = unaff_EDI + (uVar10 >>> 2);
      }
      sVar7 = (sVar6 + uVar3) - heap.u32(0x009a2028);
      uVar2 = uVar3;
      if ((sVar7 == 0 || (sVar6 + uVar3) < heap.u32(0x009a2028)) || (uVar2 = uVar3 - sVar7, uVar2 != 0 && sVar7 <= uVar3)) {
        for (uVar3 = (uVar2 + 3) >>> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
          in_AL = heap.u32(puVar14);
          heap.setU32(puVar15, (in_AL) >>> 0);
          puVar14 = puVar14 + 2;
          puVar15 = puVar15 + 1;
        }
      }
    } else {
      uVar9 = (bVar5 + 1);
      puVar14 = (puVar12 + 3);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) {
        /* goto LAB_009b8afc */ throw new Error("goto LAB_009b8afc not supported");
      }
    }
    LAB_009b8b54: sVar6 = heap.u32(0x009a202c);
    puVar12 = puVar11;
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = unaff_EDI + heap.u32(0x009a2030);
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = heap.u32(puVar12);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = heap.u32(puVar12);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = heap.u32(puVar12);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
    }
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}

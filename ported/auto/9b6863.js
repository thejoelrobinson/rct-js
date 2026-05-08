// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b6863.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CONCAT22, LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_009b6863(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_PTR_DAT_009b7978 = __sp + 0;
  const __addr_PTR_DAT_009b69e8 = __sp + 4;
  const __addr_PTR_DAT_009b7210 = __sp + 8;
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
  let unaff_ESI = 0;
  uVar13 = (undefined2)(heap.u32(0x009a2020) >>> 0x10);
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
      puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
      do {
        sVar6 = heap.u32(0x009a202c);
        uVar3 = heap.u32(puVar12);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        bVar5 = (byte)((uVar3 & 0xffffff7f) >>> 8);
        uVar2 = (byte)(uVar3 & 0xffffff7f);
        uVar9 = bVar5;
        puVar12 = (puVar12 + uVar2 + 2);
        if ((uVar3 & 0x100) == 0) {
          LAB_009b7923: sVar7 = (uVar9 - heap.u32(0x009a2024));
          if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
            uVar2 = uVar2 + sVar7;
            if ((uVar2 < 0) || (uVar2 == 0)) {
              /* goto LAB_009b843f */ throw new Error("goto LAB_009b843f not supported");
            }
            sVar7 = 0;
          }
          sVar8 = (sVar7 + uVar2) - heap.u32(0x009a2028);
          uVar4 = uVar2;
          if (((sVar8 == 0 || (sVar7 + uVar2) < heap.u32(0x009a2028)) || (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= uVar2)) && (uVar2 = (uVar4 + 1) >>> 1, uVar2 != 0)) {
            LOCK();
            UNLOCK(heap);
            heap.setU32(0x009a200c, (puVar12) >>> 0);
            uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b7978) + (uVar2) * 4)))();
            return uVar1;
          }
        } else {
          uVar9 = (bVar5 + 1);
          uVar2 = uVar2 - 1;
          if (uVar2 != 0) {
            /* goto LAB_009b7923 */ throw new Error("goto LAB_009b7923 not supported");
          }
        }
        LAB_009b843f: if ((uVar3 & 0x80) != 0) {
          heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return 0;
          }
          do {
            uVar3 = heap.u32(puVar12);
            heap.setU32(0x009aa032, (uVar3) >>> 0);
            puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return 0;
          }
        }
      } while (true);
    }
    puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      sVar6 = heap.u32(0x009a202c);
      uVar3 = heap.u32(puVar12);
      heap.setU32(0x009aa032, (uVar3) >>> 0);
      bVar5 = (byte)((uVar3 & 0xffffff7f) >>> 8);
      uVar2 = (byte)(uVar3 & 0xffffff7f);
      uVar9 = bVar5;
      puVar12 = (puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b6991: sVar7 = (uVar9 - heap.u32(0x009a2024));
        if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
          uVar2 = uVar2 + sVar7;
          if ((uVar2 < 0) || (uVar2 == 0)) {
            /* goto LAB_009b7130 */ throw new Error("goto LAB_009b7130 not supported");
          }
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar2) - heap.u32(0x009a2028);
        uVar4 = uVar2;
        if (((sVar8 == 0 || (sVar7 + uVar2) < heap.u32(0x009a2028)) || (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= uVar2)) && (uVar2 = (uVar4 + 1) >>> 1, uVar2 != 0)) {
          LOCK();
          UNLOCK(heap);
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b69e8) + (uVar2) * 4)))();
          return uVar1;
        }
      } else {
        uVar9 = (bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b6991 */ throw new Error("goto LAB_009b6991 not supported");
        }
      }
      LAB_009b7130: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
    do {
      sVar6 = heap.u32(0x009a202c);
      uVar3 = heap.u32(puVar12);
      heap.setU32(0x009aa032, (uVar3) >>> 0);
      bVar5 = (byte)((uVar3 & 0xffffff7f) >>> 8);
      uVar2 = (byte)(uVar3 & 0xffffff7f);
      uVar9 = bVar5;
      puVar12 = (puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b71bb: sVar7 = (uVar9 - heap.u32(0x009a2024));
        if (uVar9 - heap.u32(0x009a2024) == 0 || uVar9 < heap.u32(0x009a2024)) {
          uVar2 = uVar2 + sVar7;
          if ((uVar2 < 0) || (uVar2 == 0)) {
            /* goto LAB_009b7898 */ throw new Error("goto LAB_009b7898 not supported");
          }
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar2) - heap.u32(0x009a2028);
        uVar4 = uVar2;
        if (((sVar8 == 0 || (sVar7 + uVar2) < heap.u32(0x009a2028)) || (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= uVar2)) && (uVar2 = (uVar4 + 1) >>> 1, uVar2 != 0)) {
          LOCK();
          UNLOCK(heap);
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (heap.u32(heap.u32((__addr_PTR_DAT_009b7210) + (uVar2) * 4)))();
          return uVar1;
        }
      } else {
        uVar9 = (bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b71bb */ throw new Error("goto LAB_009b71bb not supported");
        }
      }
      LAB_009b7898: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
        do {
          uVar3 = heap.u32(puVar12);
          heap.setU32(0x009aa032, (uVar3) >>> 0);
          puVar12 = (puVar12 + (heap.u32(0x009aa032) & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
      }
    } while (true);
  }
  puVar12 = (CONCAT22(uVar13, heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI);
  do {
    uVar3 = heap.u32(puVar12);
    heap.setU32(0x009aa032, (uVar3) >>> 0);
    puVar14 = puVar12 + 1;
    bVar5 = (byte)((uVar3 & 0xffffff7f) >>> 8);
    uVar2 = (byte)(uVar3 & 0xffffff7f);
    uVar9 = bVar5;
    puVar11 = (puVar14 + uVar2);
    if ((uVar3 & 0x100) == 0) {
      LAB_009b68b6: uVar10 = uVar9 - heap.u32(0x009a2024);
      sVar6 = uVar10;
      if (uVar10 == 0 || uVar9 < heap.u32(0x009a2024)) {
        puVar14 = (puVar14 - uVar10);
        uVar2 = uVar2 + sVar6;
        if ((uVar2 < 0) || (uVar2 == 0)) {
          /* goto LAB_009b68fa */ throw new Error("goto LAB_009b68fa not supported");
        }
        sVar6 = 0;
        puVar15 = unaff_EDI;
      } else {
        puVar15 = unaff_EDI + (uVar10 >>> 1);
      }
      sVar7 = (sVar6 + uVar2) - heap.u32(0x009a2028);
      uVar3 = uVar2;
      if ((sVar7 == 0 || (sVar6 + uVar2) < heap.u32(0x009a2028)) || (uVar3 = uVar2 - sVar7, uVar3 != 0 && sVar7 <= uVar2)) {
        for (uVar3 = (uVar3 + 1) >>> 1; uVar3 != 0; uVar3 = uVar3 - 1) {
          in_AL = (undefined1) * puVar14;
          heap.u32(puVar15) = in_AL;
          puVar14 = puVar14 + 1;
          puVar15 = puVar15 + 1;
        }
      }
    } else {
      uVar9 = (bVar5 + 1);
      puVar14 = (puVar12 + 3);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) {
        /* goto LAB_009b68b6 */ throw new Error("goto LAB_009b68b6 not supported");
      }
    }
    LAB_009b68fa: sVar6 = heap.u32(0x009a202c);
    puVar12 = puVar11;
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = unaff_EDI + heap.u32(0x009a2030);
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = heap.u32(puVar11);
        heap.setU32(0x009aa032, (uVar3) >>> 0);
        puVar11 = (puVar11 + (heap.u32(0x009aa032) & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
      puVar12 = puVar11;
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
    }
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}

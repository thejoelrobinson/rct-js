// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00424db7 } from "./424db7.js";
import { FUN_00424de2 } from "./424de2.js";
import { FUN_0042547b } from "./42547b.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_00434fbb } from "./434fbb.js";
import { FUN_00435005 } from "./435005.js";
import { FUN_00436fae } from "./436fae.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
import { FUN_0044151b } from "./44151b.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00455a66 } from "./455a66.js";
import { FUN_00455ade } from "./455ade.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e0c5a } from "./5e0c5a.js";
import { FUN_005e18d4 } from "./5e18d4.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e680e } from "./5e680e.js";
import { FUN_005e687d } from "./5e687d.js";
import { FUN_005e68e2 } from "./5e68e2.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function thunk_FUN_0045534a(heap) {
  const __sp = heap.allocFrame(72);
  const __addr_DAT_00632db0 = __sp + 0;
  const __addr_DAT_00632dbc = __sp + 4;
  const __addr_PTR_DAT_00632d98 = __sp + 8;
  const __addr_PTR_thunk_FUN_0045534a_00632da4 = __sp + 12;
  const __addr_PTR_DAT_00632d8c = __sp + 16;
  const __addr_stack0x00000000 = __sp + 20;
  const __addr_DAT_00743bbf = __sp + 24;
  const __addr_DAT_00743ba2 = __sp + 28;
  const __addr_DAT_00632eac = __sp + 32;
  const __addr_PTR_DAT_0062d640 = __sp + 36;
  const __addr_DAT_00743bc1 = __sp + 40;
  const __addr_DAT_00743bc4 = __sp + 44;
  const __addr_DAT_00743bc5 = __sp + 48;
  const __addr_DAT_00743c05 = __sp + 52;
  const __addr_DAT_00743c01 = __sp + 56;
  const __addr_DAT_00743c04 = __sp + 60;
  const __addr_DAT_00743c02 = __sp + 64;
  const __addr_DAT_00743c58 = __sp + 68;
  try {
  let uVar3 = 0;
  let in_AX = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_ECX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let unaff_BX = 0;
  let iVar8 = 0;
  let unaff_BP = 0;
  let bVar10 = 0;
  if (unaff_BP != 2) {
    uVar7 = in_EDX;
    if (unaff_BP == 1) {
      if (uVar7 == 2) {
        if (unaff_ESI != 0x0) {
          (heap.u32(heap.u32(unaff_ESI + (1) * 4)))(CONCAT22(heap, CONCAT31(heap, (int3)(in_ECX >>> 8), heap.u32((unaff_ESI + 0x5d))), heap.u32((unaff_ESI + 0xc))));
          FUN_005e3b2b(heap);
          LOCK(heap);
          puVar2 = heap.u32(unaff_ESI + (2) * 4);
          heap.u32(unaff_ESI + (2) * 4) = 0;
          UNLOCK(heap);
          if (puVar2 != 0x0) {
            heap.u32(puVar2) = 0;
          }
          FUN_005e43de(heap);
          heap.setU32(0x009a1164, (heap.u32(0x009a1164) + -0x178) >>> 0);
          if (heap.u32(0x009a1164) - unaff_ESI != 0 && unaff_ESI <= heap.u32(0x009a1164)) {
            uVar6 = (uint)(heap.u32(0x009a1164) - unaff_ESI) >>> 1;
            puVar9 = unaff_ESI + 0x5e;
            for (; uVar6 != 0; uVar6 = uVar6 - 1) {
              heap.u32(unaff_ESI) = heap.u32(puVar9);
              puVar9 = (puVar9 + 2);
              unaff_ESI = (unaff_ESI + 2);
            }
          }
          FUN_005e6a83(heap);
        }
        return;
      }
      if ((3 < uVar7) && (uVar7 < 7)) {
        if (((heap.u32(0x00991f30) >>> 3 & 1) != 0) && ((heap.u32((unaff_ESI + 0x5d)) == heap.u32(0x00991f5a) && (heap.u32((unaff_ESI + 0xc)) == heap.u32(0x00991f58))))) {
          FUN_005e687d(heap);
          in_EDX = extraout_EDX;
        }
        heap.setU32(0x00632f03, ('\0') >>> 0);
        if ((((in_EDX == 4) && (heap.u32((unaff_ESI + 0x59)) == 0)) && (heap.u32(unaff_ESI + (2) * 4) != 0)) && ((heap.u32((heap.u32(unaff_ESI + (2) * 4) + 0x12)) & 0x800) == 0)) {
          heap.setU32(0x00632f03, ('\x01') >>> 0);
        }
        sVar4 = in_EDX + -4;
        iVar8 = CONCAT22(heap, (in_EDX >>> 0x10), sVar4);
        heap.u32((unaff_ESI + 0x59)) = sVar4;
        heap.u32((unaff_ESI + 0x5a)) = 0;
        LOCK(heap);
        puVar2 = heap.u32(unaff_ESI + (2) * 4);
        heap.u32(unaff_ESI + (2) * 4) = 0;
        UNLOCK(heap);
        if (puVar2 != 0x0) {
          heap.u32(puVar2) = 0;
        }
        heap.u32(unaff_ESI + (3) * 4) = heap.u32((__addr_DAT_00632db0) + (iVar8) * 4);
        heap.u32(unaff_ESI + (6) * 4) = heap.u32((__addr_DAT_00632dbc) + (iVar8) * 4);
        heap.u32(unaff_ESI) = heap.u32((__addr_PTR_DAT_00632d98) + (iVar8) * 4);
        heap.u32(unaff_ESI + (1) * 4) = heap.u32((__addr_PTR_thunk_FUN_0045534a_00632da4) + (iVar8) * 4);
        heap.u32(unaff_ESI + (5) * 4) = 0;
        heap.u32(unaff_ESI + (7) * 4) = heap.u32((__addr_PTR_DAT_00632d8c) + (iVar8) * 4);
        FUN_00455a66(heap);
        FUN_005e43de(heap);
        (heap.u32(heap.u32(unaff_ESI + (1) * 4)))();
        (heap.u32(heap.u32(unaff_ESI)))(puVar2, unaff_ESI, 2, __addr_stack0x00000000);
        FUN_005e412c(heap);
        FUN_005e43de(heap);
        if ((heap.u32(0x00632f03) != '\0') && (heap.u32(unaff_ESI + (2) * 4) != 0)) {
          puVar1 = (heap.u32(unaff_ESI + (2) * 4) + 0x12);
          heap.u32(puVar1) = heap.u32(puVar1) | 0x800;
        }
        if ((heap.u32((unaff_ESI + 0x59)) == 0) && (heap.u32((__addr_DAT_00743bbf) + ((uint) * (unaff_ESI + 0xc) * 0x100) * 4) == '\t')) {
          (heap.u32(heap.u32(unaff_ESI + (1) * 4)))();
        }
        return;
      }
      if (uVar7 == 0xb) {
        if ((heap.u32(unaff_ESI + (2) * 4) != 0) && (uVar6 = heap.u32(unaff_ESI + (0x57) * 4), uVar6 != 0xffffffff)) {
          if ((uVar6 & 0x80000000) == 0) {
            bVar10 = (heap.u32(unaff_ESI + (0x58) * 4) >>> 0xf & 1) != 0;
          } else {
            bVar10 = 0xff8bc46b < (uVar6 & 0xffff) << 8;
          }
          FUN_005e68e2(heap);
          if (!bVar10) {
            FUN_005e18d4(heap);
          }
          return;
        }
      } else {
        bVar10 = uVar7 < 0xd;
        if (uVar7 == 0xd) {
          FUN_005e680e(heap);
          if (!bVar10) {
            uVar7 = heap.u32((unaff_ESI + 0xc));
            heap.u32((unaff_ESI + 0x166)) = heap.u32((__addr_DAT_00743ba2) + (uVar7 * 0x80) * 4);
            FUN_0044151b(heap);
            FUN_005e53ca(heap);
            FUN_00444927(heap);
            FUN_0044142c(heap);
            heap.u32((__addr_DAT_00743bbf) + (uVar7 * 0x100) * 4) = 9;
            FUN_00441452(heap);
            return;
          }
        } else {
          bVar10 = uVar7 < 0xc;
          if (uVar7 != 0xc) {
            bVar10 = uVar7 == 10;
            if (!bVar10) {
              return;
            }
            FUN_005e5fcb(heap);
            if (bVar10) {
              uVar3 = heap.u32((unaff_ESI + 0xc));
              FUN_005e3f31(heap);
              heap.u32(unaff_ESI + (7) * 4) = __addr_DAT_00632eac;
              heap.u32(unaff_ESI + (3) * 4) = heap.u32(unaff_ESI + (3) * 4) | 0x1c;
              FUN_005e412c(heap);
              heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 0x10;
              heap.u32((unaff_ESI + 0xc)) = uVar3;
            }
            return;
          }
          FUN_005e680e(heap);
          if (!bVar10) {
            FUN_00424db7(heap);
            FUN_005e0c2f(heap);
            heap.setU32(0x0099a4e6, (heap.u32((unaff_ESI + 0xc))) >>> 0);
            FUN_005e6028(heap);
            return;
          }
        }
      }
    } else {
      if (unaff_BP == 0) {
        if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u32((unaff_ESI + 0x5d)) == heap.u32(0x00991f5a))) && (heap.u32((unaff_ESI + 0xc)) == heap.u32(0x00991f58))) {
          FUN_005e687d(heap);
        }
        return;
      }
      if (unaff_BP == 6) {
        heap.u32((unaff_ESI + 0x5a)) = heap.u32((unaff_ESI + 0x5a)) + 1;
        FUN_005e5301(heap);
        return;
      }
      if (unaff_BP == 7) {
        if (uVar7 != 0xd) {
          if (uVar7 != 0xc) {
            return;
          }
          return;
        }
        heap.setU32(0x00991f64, (0xffffffff) >>> 0);
        sVar4 = unaff_BX;
        FUN_00431510(heap);
        if (unaff_BX != '\0') {
          heap.setU32(0x00991f68, (in_AX + -1) >>> 0);
          heap.setU32(0x00991f6a, (sVar4 + 0x10) >>> 0);
          heap.u32((unaff_ESI + 0x5b)) = heap.u32((unaff_ESI + 0x5b)) + 1;
          if (0x2f < heap.u32((unaff_ESI + 0x5b))) {
            heap.u32((unaff_ESI + 0x5b)) = 0;
          }
          iVar8 = (uint) * (unaff_ESI + 0xc) * 0x100;
          heap.setU32(0x00991f64, (heap.u32((heap.u32((__addr_PTR_DAT_0062d640) + (heap.u32((uint)(byte)(__addr_DAT_00743bc1) + (iVar8) * 4) * 2) * 4) + 0x58)) + (uint)(heap.u32((unaff_ESI + 0x5b)) >>> 2) | heap.u32((uint)(byte)(__addr_DAT_00743bc4) + (iVar8) * 4) << 0x11 | heap.u32((uint)(byte)(__addr_DAT_00743bc5) + (iVar8) * 4) << 0x18 | 0xa0000000) >>> 0);
          return;
        }
      } else {
        if (unaff_BP == 8) {
        if (uVar7 == 0xd) {
          sVar4 = FUN_00435005(heap);
          if (sVar4 != -0x8000) {
            sVar4 = sVar4 + 0x10;
            sVar5 = unaff_BX + 0x20;
            bVar10 = false;
            FUN_0042547b(heap, sVar5, sVar4);
            if (!bVar10) {
              bVar10 = 0xfd < (byte)(extraout_EDX_00 >>> 2);
              FUN_00436fae(heap, extraout_EDX_00, sVar5, sVar4);
              if (((!bVar10) || (heap.u32(0x00991efc) == 0x3b7)) || (heap.u32(0x00991efc) == 0x4db)) {
                iVar8 = (uint) * (unaff_ESI + 0xc) * 0x100;
                FUN_00444927(heap);
                FUN_005e53ca(heap);
                FUN_0044142c(heap);
                heap.u32((__addr_DAT_00743bbf) + (iVar8) * 4) = 0;
                FUN_00441452(heap);
                heap.u32((__addr_DAT_00743c05) + (iVar8) * 4) = 0xff;
                heap.u32((__addr_DAT_00743c01) + (iVar8) * 4) = 0;
                heap.u32((__addr_DAT_00743c04) + (iVar8) * 4) = 0;
                heap.u32((__addr_DAT_00743c02) + (iVar8) * 4) = 0;
                heap.u32((__addr_DAT_00743c58) + (iVar8) * 4) = 0;
                FUN_005e687d(heap);
                heap.setU32(0x00991f64, (0xffffffff) >>> 0);
                return;
              }
            }
            FUN_00427108(heap);
            return;
          }
        } else {
          if (uVar7 != 0xc) {
            return;
          }
          sVar4 = FUN_00434fbb(heap);
          if (sVar4 != -0x8000) {
            FUN_00426f56(heap);
            return;
          }
        }
      } else {
        if (unaff_BP == 0x10) {
          /* goto LAB_0045532f */ throw new Error("goto LAB_0045532f not supported");
        }
        if (unaff_BP == 0xb) {
          if (uVar7 != 0xd) {
            if (uVar7 != 0xc) {
              return;
            }
            FUN_00424de2(heap);
            FUN_005e0c5a(heap);
            heap.setU32(0x0099a4e6, (0xffff) >>> 0);
            FUN_005e6028(heap);
            return;
          }
          uVar7 = heap.u32((unaff_ESI + 0xc));
          iVar8 = uVar7 * 0x100;
          if (heap.u32((__addr_DAT_00743bbf) + (iVar8) * 4) == '\t') {
            FUN_00444927(heap);
            FUN_005e53ca(heap);
            if (heap.u32((__addr_DAT_00743ba2) + (uVar7 * 0x80) * 4) != -0x8000) {
              FUN_0044142c(heap);
              heap.u32((__addr_DAT_00743bbf) + (iVar8) * 4) = 0;
              FUN_00441452(heap);
              heap.u32((__addr_DAT_00743c05) + (iVar8) * 4) = 0xff;
              heap.u32((__addr_DAT_00743c01) + (iVar8) * 4) = 0;
              heap.u32((__addr_DAT_00743c04) + (iVar8) * 4) = 0;
              heap.u32((__addr_DAT_00743c02) + (iVar8) * 4) = 0;
              heap.u32((__addr_DAT_00743c58) + (iVar8) * 4) = 0;
            }
            heap.setU32(0x00991f64, (0xffffffff) >>> 0);
            return;
          }
        }
      }
      }
    }
    return;
  }
  FUN_00455a66(heap);
  LAB_0045532f: FUN_00455ade(heap);
  return;
} finally {
    heap.freeFrame(72);
  }
}

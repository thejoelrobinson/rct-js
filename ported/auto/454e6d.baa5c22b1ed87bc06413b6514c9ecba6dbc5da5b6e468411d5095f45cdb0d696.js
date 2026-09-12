// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454e6d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
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
export function FUN_00454e6d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_ECX = regs.ecx >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let iVar8 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let puVar9 = 0;
  let bVar10 = 0;
  if (unaff_BP != 2) {
    uVar7 = ((((in_EDX) & 0xffff)) & 0xffff);
    if (unaff_BP == 1) {
      if (uVar7 == 2) {
        if (unaff_ESI != 0x0) {
          (regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4), CONCAT22(((CONCAT31((regs.eax = callIndirect(heap, int3, ((in_ECX) >>> 0) >>> 8)), heap.u8((unaff_ESI + ((0x5d) * 4))))) << 16 >> 16), heap.u16((unaff_ESI + ((0xc) * 4))))));
          (regs.eax = FUN_005e3b2b(heap));
          LOCK();
          puVar2 = ((heap.u32(unaff_ESI + (2) * 4)) >>> 0);
          heap.setU32((unaff_ESI + (2) * 4), (0) & 0xffffffff);
          UNLOCK();
          if (puVar2 != 0x0) {
            heap.setU32(puVar2, (0) & 0xffffffff);
          }
          (regs.eax = FUN_005e43de(heap));
          heap.setU32(0x009a1164, (heap.u32(0x009a1164) + -0x178) >>> 0);
          if (heap.u32(0x009a1164) - ((unaff_ESI) | 0) != 0 && ((unaff_ESI) | 0) <= heap.u32(0x009a1164)) {
            uVar6 = ((((heap.u32(0x009a1164) - ((unaff_ESI) | 0)) >>> 0) >>> 1) >>> 0);
            puVar9 = ((unaff_ESI + ((0x5e) * 4)) >>> 0);
            for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
              heap.setU16(unaff_ESI, (heap.u16(puVar9)) & 0xffff);
              puVar9 = (((((puVar9) | 0) + 2)) >>> 0);
              unaff_ESI = (((((unaff_ESI) | 0) + 2)) >>> 0);
            }
          }
          (regs.eax = FUN_005e6a83(heap));
        }
        return;
      }
      if ((3 < uVar7) && (uVar7 < 7)) {
        if (((heap.u32(0x00991f30) >>> 3 & 1) != 0) && ((heap.i8((unaff_ESI + ((0x5d) * 4))) == heap.u8(0x00991f5a) && (heap.i16((unaff_ESI + ((0xc) * 4))) == heap.u8(0x00991f58))))) {
          (regs.eax = FUN_005e687d(heap));
          in_EDX = ((extraout_EDX) >>> 0);
        }
        heap.setU8(0x00632f03, (0) & 0xff);
        if ((((((in_EDX) << 16 >> 16) == 4) && (heap.i16((unaff_ESI + ((0x59) * 4))) == 0)) && (heap.u32(unaff_ESI + (2) * 4) != 0)) && ((heap.u16((heap.u32(unaff_ESI + (2) * 4) + 0x12)) & 0x800) == 0)) {
          heap.setU8(0x00632f03, (1) & 0xff);
        }
        sVar4 = ((((in_EDX) << 16 >> 16) + -4) & 0xffff);
        iVar8 = ((CONCAT22((((((in_EDX) >>> 0) >>> 0x10)) << 16 >> 16), sVar4)) >>> 0);
        heap.setI16((unaff_ESI + ((0x59) * 4)), (sVar4) & 0xffff);
        heap.setU16((unaff_ESI + ((0x5a) * 4)), (0) & 0xffff);
        LOCK();
        puVar2 = ((heap.u32(unaff_ESI + (2) * 4)) >>> 0);
        heap.setU32((unaff_ESI + (2) * 4), (0) & 0xffffffff);
        UNLOCK();
        if (puVar2 != 0x0) {
          heap.setU32(puVar2, (0) & 0xffffffff);
        }
        heap.setU32((unaff_ESI + (3) * 4), (heap.u32((0x00632db0) + (iVar8) * 4)) & 0xffffffff);
        heap.setU32((unaff_ESI + (6) * 4), (heap.u32((0x00632dbc) + (iVar8) * 4)) & 0xffffffff);
        heap.setU32(unaff_ESI, (heap.u32((0x00632d98) + (iVar8) * 4)) & 0xffffffff);
        heap.setU32((unaff_ESI + (1) * 4), (heap.u32((0x00632da4) + (iVar8) * 4)) & 0xffffffff);
        heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
        heap.setU32((unaff_ESI + (7) * 4), (heap.u32((0x00632d8c) + (iVar8) * 4)) & 0xffffffff);
        (regs.eax = FUN_00455a66(heap));
        (regs.eax = FUN_005e43de(heap));
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4)));
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI), puVar2, unaff_ESI, 2, __addr_stack0x00000000));
        (regs.eax = FUN_005e412c(heap));
        (regs.eax = FUN_005e43de(heap));
        if ((heap.u8(0x00632f03) != 0) && (heap.u32(unaff_ESI + (2) * 4) != 0)) {
          puVar1 = (((heap.u32(unaff_ESI + (2) * 4) + 0x12)) >>> 0);
          heap.setU32(puVar1, (heap.u16(puVar1) | 0x800) & 0xffffffff);
        }
        if ((heap.i16((unaff_ESI + ((0x59) * 4))) == 0) && (heap.u32((0x00743bbf) + (heap.u32((unaff_ESI + ((0xc) * 4))) * 0x100) * 4) == 9)) {
          (regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4)));
        }
        return;
      }
      if (uVar7 == 0xb) {
        if ((heap.u32(unaff_ESI + (2) * 4) != 0) && (uVar6 = ((heap.u32(unaff_ESI + (0x57) * 4)) >>> 0), uVar6 != 0xffffffff)) {
          if ((uVar6 & 0x80000000) == 0) {
            bVar10 = (((((heap.u32(unaff_ESI + (0x58) * 4)) >>> 0) >>> 0xf & 1) != 0) & 0xff);
          } else {
            bVar10 = ((0xff8bc46b < (uVar6 & 0xffff) << 8) & 0xff);
          }
          (regs.eax = FUN_005e68e2(heap));
          if (!bVar10) {
            (regs.eax = FUN_005e18d4(heap));
          }
          return;
        }
      } else {
        bVar10 = ((uVar7 < 0xd) & 0xff);
        if (uVar7 == 0xd) {
          (regs.eax = FUN_005e680e(heap));
          if (!bVar10) {
            uVar7 = ((heap.u16((unaff_ESI + ((0xc) * 4)))) & 0xffff);
            heap.setU16((((unaff_ESI) | 0) + 0x166), (heap.u32((0x00743ba2) + (((uVar7) >>> 0) * 0x80) * 4)) & 0xffff);
            (regs.eax = FUN_0044151b(heap));
            (regs.eax = FUN_005e53ca(heap));
            (regs.eax = FUN_00444927(heap));
            (regs.eax = FUN_0044142c(heap));
            heap.setU32(((0x00743bbf) + (((uVar7) >>> 0) * 0x100) * 4), (9) & 0xffffffff);
            return (regs.eax = FUN_00441452(heap));
          }
        } else {
          bVar10 = ((uVar7 < 0xc) & 0xff);
          if (uVar7 != 0xc) {
            bVar10 = ((uVar7 == 10) & 0xff);
            if (!bVar10) {
              return;
            }
            (regs.eax = FUN_005e5fcb(heap));
            if (bVar10) {
              uVar3 = ((heap.u16((unaff_ESI + ((0xc) * 4)))) & 0xffff);
              (regs.eax = FUN_005e3f31(heap));
              heap.setU32((unaff_ESI + (7) * 4), (0x00632eac) & 0xffffffff);
              heap.setU32((unaff_ESI + (3) * 4), (heap.u32(unaff_ESI + (3) * 4) | 0x1c) & 0xffffffff);
              (regs.eax = FUN_005e412c(heap));
              heap.setU16((((unaff_ESI) | 0) + 0x32), (heap.u16((((unaff_ESI) | 0) + 0x32)) | 0x10) & 0xffff);
              heap.setU16((unaff_ESI + ((0xc) * 4)), (uVar3) & 0xffff);
            }
            return;
          }
          (regs.eax = FUN_005e680e(heap));
          if (!bVar10) {
            (regs.eax = FUN_00424db7(heap));
            (regs.eax = FUN_005e0c2f(heap));
            heap.setU32(0x0099a4e6, (heap.u16((unaff_ESI + ((0xc) * 4)))) >>> 0);
            return (regs.eax = FUN_005e6028(heap));
          }
        }
      }
    } else {
      if (unaff_BP == 0) {
        if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.i8((unaff_ESI + ((0x5d) * 4))) == heap.u8(0x00991f5a))) && (heap.i16((unaff_ESI + ((0xc) * 4))) == heap.u8(0x00991f58))) {
          (regs.eax = FUN_005e687d(heap));
        }
        return;
      }
      if (unaff_BP == 6) {
        heap.setI16((unaff_ESI + ((0x5a) * 4)), (heap.i16((unaff_ESI + ((0x5a) * 4))) + 1) & 0xffff);
        return (regs.eax = FUN_005e5301(heap));
      }
      if (unaff_BP == 7) {
        if (uVar7 != 0xd) {
          if (uVar7 != 0xc) {
            return;
          }
          return;
        }
        heap.setU32(0x00991f64, (0xffffffff) >>> 0);
        sVar4 = ((unaff_BX) & 0xffff);
        (regs.eax = FUN_00431510(heap));
        if (((unaff_BX) << 24 >> 24) != 0) {
          heap.setU32(0x00991f68, (in_AX + -1) >>> 0);
          heap.setU32(0x00991f6a, (sVar4 + 0x10) >>> 0);
          heap.setI16((unaff_ESI + ((0x5b) * 4)), (heap.i16((unaff_ESI + ((0x5b) * 4))) + 1) & 0xffff);
          if (0x2f < heap.u16((unaff_ESI + ((0x5b) * 4)))) {
            heap.setU16((unaff_ESI + ((0x5b) * 4)), (0) & 0xffff);
          }
          iVar8 = ((heap.u32((unaff_ESI + ((0xc) * 4))) * 0x100) >>> 0);
          heap.setU32(0x00991f64, (heap.i32((heap.u32((0x0062d640) + (heap.u32(((0x00743bc1) >>> 0) + (iVar8) * 4) * 2) * 4) + 0x58)) + ((heap.u16((unaff_ESI + ((0x5b) * 4))) >>> 2) >>> 0) | heap.u32(((0x00743bc4) >>> 0) + (iVar8) * 4) << 0x11 | heap.u32(((0x00743bc5) >>> 0) + (iVar8) * 4) << 0x18 | 0xa0000000) >>> 0);
          return;
        }
      } else {
        if (unaff_BP == 8) {
        if (uVar7 == 0xd) {
          sVar4 = (((regs.eax = FUN_00435005(heap))) & 0xffff);
          if (sVar4 != -0x8000) {
            sVar4 = ((sVar4 + 0x10) & 0xffff);
            sVar5 = ((unaff_BX + 0x20) & 0xffff);
            bVar10 = ((false) & 0xff);
            (regs.eax = FUN_0042547b(heap, sVar5, sVar4));
            if (!bVar10) {
              bVar10 = ((0xfd < ((extraout_EDX_00 >>> 2) & 0xff)) & 0xff);
              (regs.eax = FUN_00436fae(heap, extraout_EDX_00, sVar5, sVar4));
              if (((!bVar10) || (heap.u32(0x00991efc) == 0x3b7)) || (heap.u32(0x00991efc) == 0x4db)) {
                iVar8 = ((heap.u32((unaff_ESI + ((0xc) * 4))) * 0x100) >>> 0);
                (regs.eax = FUN_00444927(heap));
                (regs.eax = FUN_005e53ca(heap));
                (regs.eax = FUN_0044142c(heap));
                heap.setU32(((0x00743bbf) + (iVar8) * 4), (0) & 0xffffffff);
                (regs.eax = FUN_00441452(heap));
                heap.setU32(((0x00743c05) + (iVar8) * 4), (0xff) & 0xffffffff);
                heap.setU32(((0x00743c01) + (iVar8) * 4), (0) & 0xffffffff);
                heap.setU32(((0x00743c04) + (iVar8) * 4), (0) & 0xffffffff);
                heap.setU32(((0x00743c02) + (iVar8) * 4), (0) & 0xffffffff);
                heap.setU32(((0x00743c58) + (iVar8) * 4), (0) & 0xffffffff);
                (regs.eax = FUN_005e687d(heap));
                heap.setU32(0x00991f64, (0xffffffff) >>> 0);
                return;
              }
            }
            return (regs.eax = FUN_00427108(heap));
          }
        } else {
          if (uVar7 != 0xc) {
            return;
          }
          sVar4 = (((regs.eax = FUN_00434fbb(heap))) & 0xffff);
          if (sVar4 != -0x8000) {
            return (regs.eax = FUN_00426f56(heap));
          }
        }
      } else {
        if (unaff_BP == 0x10) {
          return (regs.eax = FUN_00455ade(heap));
        }
        if (unaff_BP == 0xb) {
          if (uVar7 != 0xd) {
            if (uVar7 != 0xc) {
              return;
            }
            (regs.eax = FUN_00424de2(heap));
            (regs.eax = FUN_005e0c5a(heap));
            heap.setU32(0x0099a4e6, (0xffff) >>> 0);
            return (regs.eax = FUN_005e6028(heap));
          }
          uVar7 = ((heap.u16((unaff_ESI + ((0xc) * 4)))) & 0xffff);
          iVar8 = ((((uVar7) >>> 0) * 0x100) >>> 0);
          if (heap.u32((0x00743bbf) + (iVar8) * 4) == 9) {
            (regs.eax = FUN_00444927(heap));
            (regs.eax = FUN_005e53ca(heap));
            if (heap.u32((0x00743ba2) + (((uVar7) >>> 0) * 0x80) * 4) != -0x8000) {
              (regs.eax = FUN_0044142c(heap));
              heap.setU32(((0x00743bbf) + (iVar8) * 4), (0) & 0xffffffff);
              (regs.eax = FUN_00441452(heap));
              heap.setU32(((0x00743c05) + (iVar8) * 4), (0xff) & 0xffffffff);
              heap.setU32(((0x00743c01) + (iVar8) * 4), (0) & 0xffffffff);
              heap.setU32(((0x00743c04) + (iVar8) * 4), (0) & 0xffffffff);
              heap.setU32(((0x00743c02) + (iVar8) * 4), (0) & 0xffffffff);
              heap.setU32(((0x00743c58) + (iVar8) * 4), (0) & 0xffffffff);
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
  (regs.eax = FUN_00455a66(heap));
  LAB_0045532f: return (regs.eax = FUN_00455ade(heap));
} finally {
    heap.freeFrame(4);
  }
}

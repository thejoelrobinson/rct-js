// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d37d4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042693f } from "./42693f.js";
import { FUN_00436795 } from "./436795.js";
import { FUN_00448331 } from "./448331.js";
import { FUN_00448bb1 } from "./448bb1.js";
import { FUN_00448bbc } from "./448bbc.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d37d4(heap) {
  let pbVar1 = 0;
  let sVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let sVar10 = 0;
  let uVar11 = 0;
  let pbVar12 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let psVar15 = 0;
  let puVar16 = 0;
  let puVar17 = 0;
  let uVar18 = 0;
  let pbVar19 = 0;
  let pcVar20 = 0;
  heap.setU32(0x00652308, (((in_EDX) & 0xff)) >>> 0);
  uVar18 = ((in_EDX & 0xff) >>> 0);
  pbVar19 = ((0x00887420 + uVar18 * 0x260) >>> 0);
  if (heap.u8(pbVar19) != 0x14) {
    uVar13 = ((0) >>> 0);
    do {
      LAB_005d396a: {
      uVar8 = ((heap.u32((0x0088744a) + (uVar18 * 0x130 + uVar13) * 4)) & 0xffff);
      if (uVar8 != 0xffff) {
        uVar6 = (((uVar8 & 0xff) << 5) & 0xffff);
        uVar8 = (((uVar8 >>> 8) << 5) & 0xffff);
        bVar3 = ((heap.u8(pbVar19 + (uVar13 + 0x32))) & 0xff);
        while (true) {
          uVar9 = ((uVar8 << 7 | uVar8 >>> 9 | uVar6) & 0xffff);
          pbVar12 = ((heap.u32((0x00971ef4) + (((uVar9 >>> 5 | uVar9 << 0xb) & 0xffff)) * 4)) >>> 0);
          while (((bVar3 != heap.u8(pbVar12 + (2)) || (bVar4 = ((heap.u8(pbVar12)) & 0xff), (bVar4 & 0x3c) != 8)) || (heap.u8(pbVar12 + (7)) != heap.u32(0x00652308))) || (((heap.u8(pbVar12 + (5)) & 0xf) != 0 || ((heap.u32((0x006559d8) + (((heap.u8(pbVar12 + (4))) >>> 0) * 0x10) * 4) & 0x10) == 0)))) {
            pbVar1 = ((pbVar12 + 1) >>> 0);
            pbVar12 = ((pbVar12 + 8) >>> 0);
            if ((heap.u8(pbVar1) & 0x80) != 0) {
              break LAB_005d396a;
            }
          }
          uVar9 = ((CONCAT11(heap.u8(pbVar12 + (5)), ((uVar13) << 24 >> 24) << 4) & 0x8fff) & 0xffff);
          heap.setU8((pbVar12 + (5)), (((uVar9) & 0xff) | ((uVar9 >>> 8) & 0xff)) & 0xff);
          if ((heap.u32((0x005f5b78 + heap.u32(pbVar19) * 8)) & 8) != 0) {
            break;
          }
          uVar14 = ((bVar4 & 3) >>> 0);
          uVar6 = ((uVar6 - heap.u32((0x00652478) + (uVar14 * 2) * 4)) & 0xffff);
          uVar8 = ((uVar8 - heap.u32((0x0065247a) + (uVar14 * 2) * 4)) & 0xffff);
        }
        pcVar20 = ((heap.u32((0x00652498) + (heap.u8(pbVar12 + (4))) * 4)) >>> 0);
        while ((heap.i8(pcVar20 + (10)) | 0) != -1) {
          sVar2 = ((heap.i16((pcVar20 + 0xb))) & 0xffff);
          sVar5 = ((heap.i16((pcVar20 + 0xd))) & 0xffff);
          sVar7 = ((sVar2) & 0xffff);
          sVar10 = ((sVar5) & 0xffff);
          switch (bVar4 & 3) {
            case 1:
              sVar10 = ((-sVar2) & 0xffff);
              sVar7 = ((sVar5) & 0xffff);
              break;
            case 2:
              sVar10 = ((-sVar5) & 0xffff);
              sVar7 = ((-sVar2) & 0xffff);
              break;
            case 3:
              sVar7 = ((-sVar5) & 0xffff);
              sVar10 = ((sVar2) & 0xffff);
          }
          uVar9 = (((sVar10 + uVar8) * 0x80 | ((sVar10 + uVar8) & 0xffff) >>> 9 | sVar7 + uVar6) & 0xffff);
          pbVar12 = ((heap.u32((0x00971ef4) + (((uVar9 >>> 5 | uVar9 << 0xb) & 0xffff)) * 4)) >>> 0);
          while (((((((heap.i16((pcVar20 + 0xf)) >>> 2)) << 24 >> 24) + bVar3) & 0xff) != heap.u8(pbVar12 + (2)) || ((heap.u8(pbVar12) & 0x3c) != 8)) || ((heap.u32((0x006559d8) + (((heap.u8(pbVar12 + (4))) >>> 0) * 0x10) * 4) & 0x10) == 0)) {
            pbVar1 = ((pbVar12 + 1) >>> 0);
            pbVar12 = ((pbVar12 + 8) >>> 0);
            if ((heap.u8(pbVar1) & 0x80) != 0) {
              break LAB_005d396a;
            }
          }
          uVar9 = ((CONCAT11(heap.u8(pbVar12 + (5)), ((uVar13) << 24 >> 24) << 4) & 0x8fff) & 0xffff);
          heap.setU8((pbVar12 + (5)), (((uVar9) & 0xff) | ((uVar9 >>> 8) & 0xff)) & 0xff);
          pcVar20 = ((pcVar20 + 10) >>> 0);
        }
      }
      }
      uVar13 = ((uVar13 + 1) >>> 0);
    } while (uVar13 < 4);
  }
  uVar13 = ((0) >>> 0);
  psVar15 = ((0x006522f6) >>> 0);
  do {
    LOCK();
    sVar2 = ((heap.u32((0x00887462) + (uVar18 * 0x130 + uVar13) * 4)) & 0xffff);
    heap.setU32(((0x00887462) + (uVar18 * 0x130 + uVar13) * 4), (-1) & 0xffffffff);
    UNLOCK();
    if ((sVar2 | 0) != -1) {
      heap.setU32(psVar15, (sVar2) & 0xffffffff);
      psVar15 = ((psVar15 + ((1) * 2)) >>> 0);
    }
    LOCK();
    sVar2 = ((heap.u32((0x0088746a) + (uVar18 * 0x130 + uVar13) * 4)) & 0xffff);
    heap.setU32(((0x0088746a) + (uVar18 * 0x130 + uVar13) * 4), (-1) & 0xffffffff);
    UNLOCK();
    if ((sVar2 | 0) != -1) {
      heap.setU32(psVar15, (sVar2) & 0xffffffff);
      psVar15 = ((psVar15 + ((1) * 2)) >>> 0);
    }
    uVar13 = ((uVar13 + 1) >>> 0);
  } while (uVar13 < 4);
  heap.setU32(psVar15, (-1) & 0xffffffff);
  puVar16 = ((0x006522f6) >>> 0);
  do {
    LAB_005d3b25: {
    uVar8 = ((heap.u16(puVar16)) & 0xffff);
    puVar17 = ((puVar16) >>> 0);
    if (uVar8 == 0xffff) {
      return 1;
    }
    while (puVar17 = ((puVar17 + ((1) * 2)) >>> 0), heap.u16(puVar17) != 0xffff) {
      if (uVar8 == heap.u16(puVar17)) {
        break LAB_005d3b25;
      }
    }
    uVar6 = (((uVar8 & 0xff) * 0x20) & 0xffff);
    uVar9 = (((uVar8 >>> 8) * 0x20) & 0xffff);
    pbVar19 = ((heap.u32((0x00971ef4) + ((((((uVar8 >>> 8) << 0xc | uVar6) & 0xffff) >>> 5 | (uVar9 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((((heap.u8(pbVar19) & 0x3c) == 0x10) && (heap.u32(0x00652308) == heap.u8(pbVar19 + (7)))) && (heap.u8(pbVar19 + (4)) < 2)) {
        uVar13 = ((heap.u8(pbVar19) & 3) >>> 0);
        uVar11 = ((uVar9 + heap.u32((0x0065247a) + (uVar13 * 2) * 4)) & 0xffff);
        uVar11 = ((uVar11 * 0x80 | uVar11 >>> 9 | uVar6 + heap.u32((0x00652478) + (uVar13 * 2) * 4)) & 0xffff);
        pbVar12 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
        do {
          if ((((heap.u8(pbVar12) & 0x3c) == 8) && (heap.u32(0x00652308) == heap.u8(pbVar12 + (7)))) && ((heap.u8(pbVar19 + (2)) == heap.u8(pbVar12 + (2)) && ((heap.u32(((0x006559d8) & 0xff) + (((heap.u8(pbVar12 + (4))) >>> 0) << 4 | heap.u8(pbVar12 + (5)) & 0xf) * 4) >>> ((((((uVar13) << 24 >> 24) - heap.u8(pbVar12)) + 2) & 0xff) & 3) & 1) != 0)))) {
            uVar13 = ((0) >>> 0);
            if (heap.u8(pbVar12 + (4)) != 0x65) {
              uVar13 = ((((heap.u8(pbVar12 + (5)) >>> 4) >>> 0)) >>> 0);
            }
            uVar13 = ((uVar13 & 7) >>> 0);
            if (heap.u8(pbVar19 + (4)) == 0) {
              if ((heap.u32((0x00887462) + (uVar18 * 0x130 + uVar13) * 4) | 0) != -1) {
                break;
              }
              heap.setU32(((0x00887462) + (uVar18 * 0x130 + uVar13) * 4), (uVar8) & 0xffffffff);
            } else {
              if ((heap.u32((0x0088746a) + (uVar18 * 0x130 + uVar13) * 4) | 0) != -1) {
                break;
              }
              heap.setU32(((0x0088746a) + (uVar18 * 0x130 + uVar13) * 4), (uVar8) & 0xffffffff);
            }
            uVar11 = ((CONCAT11(heap.u8(pbVar19 + (5)), ((uVar13) << 24 >> 24)) & 0x8fff) & 0xffff);
            heap.setU8((pbVar19 + (5)), (((uVar11) << 24 >> 24) << 4 | ((uVar11 >>> 8) & 0xff)) & 0xff);
            /* goto LAB_005d3b16 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d37d4/LAB_005d3b16"); return 0;
          }
          pbVar1 = ((pbVar12 + 1) >>> 0);
          pbVar12 = ((pbVar12 + 8) >>> 0);
        } while ((heap.u8(pbVar1) & 0x80) == 0);
        (regs.eax = FUN_00448bb1(heap));
        (regs.eax = FUN_0042693f(heap));
        (regs.eax = FUN_00448331(heap));
        (regs.eax = FUN_00448bbc(heap));
        (regs.eax = FUN_005e5562(heap));
        (regs.eax = FUN_00436795(heap));
      } else {
        LAB_005d3b16: pbVar19 = ((pbVar19 + 8) >>> 0);
      }
    } while ((heap.u8(pbVar19 + (-7)) & 0x80) == 0);
    }
    puVar16 = ((puVar16 + ((1) * 2)) >>> 0);
  } while (true);
}

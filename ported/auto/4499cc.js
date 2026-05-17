// @manual — do not regenerate.
// Source: decompiled/c/4499cc.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0044a2a8 } from "./44a2a8.js";
import { FUN_004516de } from "./4516de.js";
import { FUN_0045174b } from "./45174b.js";
import { FUN_004519c9 } from "./4519c9.js";
import { FUN_0045389c } from "./45389c.js";
import { FUN_00453900 } from "./453900.js";
import { FUN_00453bf8 } from "./453bf8.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e585a } from "./5e585a.js";
import { FUN_005e59ec } from "./5e59ec.js";
export function FUN_004499cc(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let cVar10 = 0;
  let bVar11 = 0;
  let uVar9 = 0;
  let uVar12 = 0;
  let iVar13 = 0;
  let pbVar14 = 0;
  let pbVar15 = 0;
  let sVar16 = 0;
  let unaff_EDI = regs.edi >>> 0;
  LAB_00449d6a: {
  LAB_00449ceb: {
  LAB_00449ce9: {
  (regs.eax = FUN_0045389c(heap));
  pbVar14 = ((0x00887420) >>> 0);
  uVar6 = ((0) >>> 0);
  do {
    LAB_0044a22e: {
    if (heap.u8(pbVar14) != 0xff) {
      if ((heap.u32((0x005f5b78 + heap.u32(pbVar14) * 8)) & 0x80000) != 0) {
        if ((heap.u8(pbVar14 + (0x21)) == 1) && ((heap.u8(pbVar14 + (0x76)) & 0x20) != 0)) {
          if ((heap.u16((pbVar14 + 2)) & 0xc0) != 0) {
            if (heap.u8(pbVar14 + (0x13c)) == 7) {
              if (((heap.u32(0x0088741c) & 7) == 0) && (heap.u8(pbVar14 + (0x15c)) != 0xff)) {
                heap.setU8((pbVar14 + (0x15c)), (heap.u8(pbVar14 + (0x15c)) + 1) & 0xff);
              }
            } else {
              if (heap.u8(pbVar14 + (0x15c)) != 0xff) {
                heap.setU8((pbVar14 + (0x15c)), (heap.u8(pbVar14 + (0x15c)) + 1) & 0xff);
              }
              if ((heap.u8(pbVar14 + (0x15c)) == 0xff) && (heap.u8(pbVar14 + (0x13c)) == 0)) {
                /* goto LAB_00449a8a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004499cc/LAB_00449a8a"); return 0;
              }
            }
          }
          if (heap.u8(pbVar14 + (0x10c)) == 0xff) {
            pbVar15 = ((heap.u32((0x005f66c8 + heap.u32(pbVar14) * 4))) >>> 0);
            bVar5 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
            heap.setU8((pbVar14 + (0x10c)), (heap.u8(pbVar15 + ((((((bVar5) & 0xffff) * (0) * pbVar15) & 0xffff) >>> 8) + 1))) & 0xff);
            heap.setU8((pbVar14 + (0x138)), (0) & 0xff);
            heap.setU8((pbVar14 + (0x139)), (0) & 0xff);
            heap.setU8((pbVar14 + (0x13a)), (0) & 0xff);
            heap.setU8((pbVar14 + (0x13b)), (0) & 0xff);
          }
        } else {
          LAB_00449a8a: heap.setU8((pbVar14 + (0x10c)), (0xff) & 0xff);
        }
        if (heap.u8(pbVar14 + (0x10c)) != 0xff) {
          bVar5 = ((heap.u8(pbVar14 + (0x10c))) & 0xff);
          uVar4 = ((heap.u32((pbVar14 + 0x138))) >>> 0);
          unaff_EDI = ((0x5622) >>> 0);
          if ((heap.u16((pbVar14 + 2)) & 0xc0) != 0) {
            sVar16 = ((((heap.u8(pbVar14 + (0x15c))) & 0xffff) * 0x46) & 0xffff);
            if (heap.u8(pbVar14 + (0x13c)) != 7) {
              sVar16 = ((((heap.u8(pbVar14 + (0x15c))) & 0xffff) * -0x46) & 0xffff);
            }
            unaff_EDI = ((((sVar16 + 0x5622) >>> 0)) >>> 0);
          }
          (regs.eax = FUN_00453900(heap));
          heap.setU32((pbVar14 + 0x138), (uVar4) & 0xffffffff);
          heap.setU8((pbVar14 + (0x10c)), (bVar5) & 0xff);
        }
      }
      if (heap.u8(pbVar14) != 0x14) {
        uVar12 = ((0) >>> 0);
        LAB_00449b12: uVar9 = ((heap.u16((pbVar14 + uVar12 * 2 + 0x2a))) & 0xffff);
        if (uVar9 != 0xffff) {
          bVar5 = ((0) & 0xff);
          if (heap.u8(pbVar14 + (4)) == 0xc) {
            if ((heap.u8(pbVar14 + (0x21)) != 0) && ((heap.u16((pbVar14 + 2)) & 0x480) == 0)) {
              if ((heap.u16((pbVar14 + 2)) & 0x10) == 0) {
                iVar8 = ((-1) >>> 0);
                do {
                  iVar8 = ((iVar8 + 1) >>> 0);
                  if (heap.u8(pbVar14 + (0x78)) <= ((iVar8) & 0xff)) {
                    uVar9 = (((regs.eax = FUN_0044a2a8(heap))) & 0xffff);
                    heap.setU16((pbVar14 + 2), (heap.u16((pbVar14 + 2)) | 0x10) & 0xffff);
                    heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 0xc) & 0xff);
                    break LAB_00449ce9;
                  }
                } while ((heap.u32((0x00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == 2) || (heap.u32((0x00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == 3));
              } else {
                iVar8 = ((-1) >>> 0);
                bVar5 = ((0) & 0xff);
                do {
                  iVar8 = ((iVar8 + 1) >>> 0);
                  if (heap.u8(pbVar14 + (0x78)) <= ((iVar8) & 0xff)) {
                    break LAB_00449ce9;
                  }
                  iVar13 = ((heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) >>> 0);
                } while ((heap.u32((0x00743be4) + (iVar13) * 4) == 2) || (heap.u32(((0x00743c62) & 0xff) + (iVar13) * 4) < heap.u8(pbVar14 + (0x80))));
                heap.setU16((pbVar14 + 2), (heap.u16((pbVar14 + 2)) & 0xffef) & 0xffff);
                if (heap.u32((0x00743c47) + (iVar13) * 4) != 0) {
                  heap.setU16((pbVar14 + 0x134), (heap.u32((0x00743b9e) + (heap.u32((0x00743be6 + iVar13)) * 0x80) * 4)) & 0xffff);
                  heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 0xc) & 0xff);
                }
              }
            }
          } else {
            if (heap.u8(pbVar14 + (4)) == 0xd) {
            if ((heap.u8(pbVar14 + (0x21)) != 0) && ((heap.u16((pbVar14 + 2)) & 0x480) == 0)) {
              if ((heap.u16((pbVar14 + 2)) & 0x10) == 0) {
                iVar8 = ((-1) >>> 0);
                do {
                  iVar8 = ((iVar8 + 1) >>> 0);
                  if (heap.u8(pbVar14 + (0x78)) <= ((iVar8) & 0xff)) {
                    heap.setU16((pbVar14 + 2), (heap.u16((pbVar14 + 2)) | 0x10) & 0xffff);
                    heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 0xc) & 0xff);
                    bVar5 = ((1) & 0xff);
                    break;
                  }
                } while (heap.u32((0x00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == 2);
              } else {
                iVar8 = ((-1) >>> 0);
                do {
                  iVar8 = ((iVar8 + 1) >>> 0);
                  if (heap.u8(pbVar14 + (0x78)) <= ((iVar8) & 0xff)) {
                    bVar5 = ((1) & 0xff);
                    break LAB_00449ceb;
                  }
                  bVar11 = ((((((((heap.u8(pbVar14 + (0x80))) & 0xffff) * 0x20) & 0xffff) >>> 8) & 0xff)) & 0xff);
                } while ((heap.u32(((0x00743c62) & 0xff) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) < bVar11) || ((bVar5 = ((((((heap.u8(pbVar14 + (0x80))) & 0xffff) * 0x20) & 0xff)) & 0xff), heap.u32(((0x00743c62) & 0xff) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) <= bVar11 && (heap.u32(((0x00743be5) & 0xff) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) < bVar5))));
                heap.setU16((pbVar14 + 2), (heap.u16((pbVar14 + 2)) & 0xffef) & 0xffff);
              }
            }
          } else {
            if (((heap.u16((pbVar14 + 2)) & 0x480) == 0) && (heap.u8(pbVar14 + (0x21)) != 0)) {
            uVar7 = ((CONCAT11(heap.u8(pbVar14 + (uVar12 + 0x3a)), 1) & 0x7fff) & 0xffff);
            bVar5 = ((((uVar7) & 0xff)) & 0xff);
            cVar10 = (((((uVar7 >>> 8)) << 24 >> 24)) & 0xff);
            if (cVar10 != 0) {
              if ((cVar10 != 127) && ((heap.u32(0x0088741c) & 0x1f) == 0)) {
                heap.setU8((pbVar14 + (uVar12 + 0x3a)), (heap.u8(pbVar14 + (uVar12 + 0x3a)) - 1) & 0xff);
              }
              bVar5 = ((0) & 0xff);
            }
          } else {
            bVar5 = ((0) & 0xff);
            if (((heap.u8(pbVar14 + (uVar12 + 0x3a)) & 0x7f) != 0) && (((heap.u8(pbVar14 + (uVar12 + 0x3a)) & 0x7f) != 0x7f && ((heap.u32(0x0088741c) & 0x1f) == 0)))) {
              heap.setU8((pbVar14 + (uVar12 + 0x3a)), (heap.u8(pbVar14 + (uVar12 + 0x3a)) - 1) & 0xff);
            }
          }
          }
          }
          break LAB_00449ceb;
        }
        break LAB_00449d6a;
      }
      LAB_00449d74: heap.setI16((pbVar14 + 0xd2), (heap.i16((pbVar14 + 0xd2)) + 1) & 0xffff);
      if (0x3bf < heap.u16((pbVar14 + 0xd2))) {
        heap.setU8((pbVar14 + (0xd2)), (0) & 0xff);
        heap.setU8((pbVar14 + (0xd3)), (0) & 0xff);
        LOCK();
        pbVar15 = ((pbVar14 + 0xd0) >>> 0);
        heap.setU8((pbVar15 + (0)), (0) & 0xff);
        heap.setU8((pbVar15 + (1)), (0) & 0xff);
        UNLOCK();
        LOCK();
        uVar2 = ((heap.u16((pbVar14 + 0xd4))) & 0xffff);
        heap.setU16((pbVar14 + 0xd4), (heap.u16(pbVar15)) & 0xffff);
        UNLOCK();
        LOCK();
        uVar3 = ((heap.u16((pbVar14 + 0xd6))) & 0xffff);
        heap.setU16((pbVar14 + 0xd6), (uVar2) & 0xffff);
        UNLOCK();
        LOCK();
        uVar2 = ((heap.u16((pbVar14 + 0xd8))) & 0xffff);
        heap.setU16((pbVar14 + 0xd8), (uVar3) & 0xffff);
        UNLOCK();
        LOCK();
        uVar3 = ((heap.u16((pbVar14 + 0xda))) & 0xffff);
        heap.setU16((pbVar14 + 0xda), (uVar2) & 0xffff);
        UNLOCK();
        LOCK();
        uVar2 = ((heap.u16((pbVar14 + 0xdc))) & 0xffff);
        heap.setU16((pbVar14 + 0xdc), (uVar3) & 0xffff);
        UNLOCK();
        LOCK();
        uVar3 = ((heap.u16((pbVar14 + 0xde))) & 0xffff);
        heap.setU16((pbVar14 + 0xde), (uVar2) & 0xffff);
        UNLOCK();
        LOCK();
        uVar2 = ((heap.u16((pbVar14 + 0xe0))) & 0xffff);
        heap.setU16((pbVar14 + 0xe0), (uVar3) & 0xffff);
        UNLOCK();
        LOCK();
        uVar3 = ((heap.u16((pbVar14 + 0xe2))) & 0xffff);
        heap.setU16((pbVar14 + 0xe2), (uVar2) & 0xffff);
        UNLOCK();
        LOCK();
        uVar2 = ((heap.u16((pbVar14 + 0xe4))) & 0xffff);
        heap.setU16((pbVar14 + 0xe4), (uVar3) & 0xffff);
        UNLOCK();
        heap.setU16((pbVar14 + 0xe6), (uVar2) & 0xffff);
        heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 1) & 0xff);
        uVar12 = ((heap.u32((pbVar14 + 0xe8))) >>> 0);
        if (heap.u32((0x005f5e88) + (heap.u32(pbVar14) * 4) * 4) != 0xff) {
          uVar12 = ((uVar12 - heap.u16((0x0062d580 + heap.u32(((0x005f5e88) >>> 0) + (heap.u32(pbVar14) * 4) * 4) * 8))) >>> 0);
          if (heap.u32((0x005f5e89) + (heap.u32(pbVar14) * 4) * 4) != 0xff) {
            uVar12 = ((((((uVar12 + heap.u16((pbVar14 + 0x144))) - heap.u32((0x0062d580 + heap.u32(((0x005f5e89) >>> 0) + (heap.u32(pbVar14) * 4) * 4) * 8)))) | 0) >>> 1) >>> 0);
          }
        }
        heap.setU32((pbVar14 + 0x160), (((heap.i16((pbVar14 + 0xd4)) + heap.i16((pbVar14 + 0xd6)) + heap.i16((pbVar14 + 0xd8)) + heap.i16((pbVar14 + 0xda)) + heap.i16((pbVar14 + 0xdc)) + heap.i16((pbVar14 + 0xde)) + heap.i16((pbVar14 + 0xe0)) + heap.i16((pbVar14 + 0xe2)) + heap.i16((pbVar14 + 0xe4)) + heap.i16((pbVar14 + 0xe6))) >>> 0) * 0xc * uVar12) & 0xffffffff);
        heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 2) & 0xff);
        if (heap.u16((pbVar14 + 0x132)) != 0xffff) {
          heap.setU32((pbVar14 + 0x164), (heap.u32((pbVar14 + 0x132)) * -0x10 + heap.i32((pbVar14 + 0x160))) & 0xffffffff);
        }
      }
      if ((((heap.u8(pbVar14) == 0x12) && ((heap.u16((pbVar14 + 2)) & 1) != 0)) && (((heap.u16((pbVar14 + 2)) & 0x4c0) == 0 || (heap.u8(pbVar14 + (0x13c)) != 0)))) && (uVar9 = ((heap.u16((pbVar14 + 0xf8))) & 0xffff), uVar7 = ((uVar9 + ((heap.u8(pbVar14 + (0x80))) & 0xffff) * 0x800) & 0xffff), heap.setU16((pbVar14 + 0xf8), (uVar7) & 0xffff), uVar9 >>> 0xe != uVar7 >>> 0xe)) {
        (regs.eax = FUN_005e59ec(heap));
        unaff_EDI = (((((heap.u8(pbVar14 + (0xef))) >>> 0) << 2)) >>> 0);
        (regs.eax = FUN_005e59ec(heap));
      }
      if ((((heap.u32(0x0088741c) & 3) == 0) && (heap.u8(pbVar14) == 0x15)) && (heap.u8(pbVar14 + (0x10d)) != 0)) {
        heap.setU8((pbVar14 + (0x126)), (heap.u8(pbVar14 + (0x126)) + 1) & 0xff);
        if (0x2f < heap.u8(pbVar14 + (0x126))) {
          heap.setU8((pbVar14 + (0x10d)), (heap.u8(pbVar14 + (0x10d)) - 1) & 0xff);
          unaff_EDI = ((0x00743b94 + heap.u32((pbVar14 + 0x10e)) * 0x100) >>> 0);
          heap.setI16((0x00743bc6 + heap.u32((pbVar14 + 0x10e)) * 0x100), (heap.i16((0x00743bc6 + heap.u32((pbVar14 + 0x10e)) * 0x100)) + 1) & 0xffff);
        }
        uVar12 = ((0) >>> 0);
        do {
          uVar9 = ((heap.u16((pbVar14 + uVar12 * 2 + 0x2a))) & 0xffff);
          if (uVar9 != 0xffff) {
            for (pbVar15 = ((heap.u32((0x00971ef4) + ((((((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar9 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); ((heap.u8(pbVar15) & 0x3c) != 8 || (heap.u8(pbVar14 + (uVar12 + 0x32)) != heap.u8(pbVar15 + (2)))); pbVar15 = (((pbVar15 + 8) >>> 0)) >>> 0) {
            
            }
            unaff_EDI = ((((heap.u8(pbVar15) & 3) << 2 | heap.u8(0x00991f88))) >>> 0);
            (regs.eax = FUN_005e585a(heap, pbVar15));
          }
          uVar12 = ((uVar12 + 1) >>> 0);
        } while (uVar12 < 4);
      }
      if ((heap.u32(0x0088741c) & 0xff) == 0) {
        if ((heap.u16((pbVar14 + 2)) & 0x480) != 0) {
          heap.setU8((pbVar14 + (0x14c)), (heap.u8(pbVar14 + (0x14c)) + 1) & 0xff);
        }
        if ((heap.u32(0x0088741c) & 0x1fff) == 0) {
          bVar5 = ((heap.u8(pbVar14 + (0x14c)) + heap.u8(pbVar14 + (0x14d)) + heap.u8(pbVar14 + (0x14e)) + heap.u8(pbVar14 + (0x14f)) + heap.u8(pbVar14 + (0x150)) + heap.u8(pbVar14 + (0x151)) + heap.u8(pbVar14 + (0x152))) & 0xff);
          bVar5 = ((((CONCAT11(CARRY1(bVar5, heap.u8(pbVar14 + (0x153))), bVar5 + heap.u8(pbVar14 + (0x153))) >>> 1) & 0xff)) & 0xff);
          if (100 < bVar5) {
            bVar5 = ((100) & 0xff);
          }
          heap.setU8((pbVar14 + (0x149)), (bVar5) & 0xff);
          LOCK();
          bVar5 = ((heap.u8(pbVar14 + (0x14c))) & 0xff);
          heap.setU8((pbVar14 + (0x14c)), (0) & 0xff);
          UNLOCK();
          LOCK();
          bVar11 = ((heap.u8(pbVar14 + (0x14d))) & 0xff);
          heap.setU8((pbVar14 + (0x14d)), (bVar5) & 0xff);
          UNLOCK();
          LOCK();
          bVar5 = ((heap.u8(pbVar14 + (0x14e))) & 0xff);
          heap.setU8((pbVar14 + (0x14e)), (bVar11) & 0xff);
          UNLOCK();
          LOCK();
          bVar11 = ((heap.u8(pbVar14 + (0x14f))) & 0xff);
          heap.setU8((pbVar14 + (0x14f)), (bVar5) & 0xff);
          UNLOCK();
          LOCK();
          bVar5 = ((heap.u8(pbVar14 + (0x150))) & 0xff);
          heap.setU8((pbVar14 + (0x150)), (bVar11) & 0xff);
          UNLOCK();
          LOCK();
          bVar11 = ((heap.u8(pbVar14 + (0x151))) & 0xff);
          heap.setU8((pbVar14 + (0x151)), (bVar5) & 0xff);
          UNLOCK();
          LOCK();
          bVar5 = ((heap.u8(pbVar14 + (0x152))) & 0xff);
          heap.setU8((pbVar14 + (0x152)), (bVar11) & 0xff);
          UNLOCK();
          heap.setU8((pbVar14 + (0x153)), (bVar5) & 0xff);
          heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 0x10) & 0xff);
        }
        if (((heap.u16((pbVar14 + 2)) & 0x4c0) == 0) && (heap.u8(pbVar14 + (0x21)) != 0)) {
          bVar5 = ((heap.u8(pbVar14 + (0x148))) & 0xff);
          uVar7 = ((((heap.u32(0x006e3b80) - heap.i16((pbVar14 + 0x130))) & 0xffff) >>> 3) & 0xffff);
          uVar9 = ((0) & 0xffff);
          if (((uVar7 != 0) && (((uVar9 = ((((bVar5 >>> 3) & 0xffff)) & 0xffff), uVar7 != 1 && (uVar9 = ((((bVar5 >>> 2) & 0xffff)) & 0xffff), uVar7 != 2)) && (uVar9 = ((((bVar5 >>> 1) & 0xffff)) & 0xffff), 4 < uVar7)))) && (uVar9 = ((((bVar5) & 0xffff)) & 0xffff), 7 < uVar7)) {
            uVar9 = ((((bVar5) & 0xffff) << 1) & 0xffff);
          }
          pbVar15 = ((pbVar14 + 0x146) >>> 0);
          heap.setU16(pbVar15, (heap.i16(pbVar15) - (bVar5 + uVar9)) & 0xffff);
          if (heap.i16(pbVar15) < 0) {
            heap.setU8((pbVar14 + (0x146)), (0) & 0xff);
            heap.setU8((pbVar14 + (0x147)), (0) & 0xff);
          }
          heap.setU8((pbVar14 + (0xfd)), (heap.u8(pbVar14 + (0xfd)) | 0x10) & 0xff);
          uVar9 = ((heap.u16((pbVar14 + 0x146))) & 0xffff);
          uVar12 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
          if (((uVar12 & 0xfffff) <= 0x6500 - uVar9) && ((regs.eax = FUN_004516de(heap)), 0x6500 - uVar9 != 0xffffffff)) {
            (regs.eax = FUN_0045174b(heap));
          }
        }
      }
      if (((heap.u16((pbVar14 + 2)) & 0x1c0) != 0) && ((heap.u32(0x0088741c) >>> 1 & 0xff) == uVar6)) {
        (regs.eax = FUN_004519c9(heap));
      }
      if ((heap.u32(0x0088741c) & 0x7ff) == 0) {
        pbVar15 = ((pbVar14 + 0x14b) >>> 0);
        heap.setU8(pbVar15, (heap.u8(pbVar15) + 1) & 0xff);
        if (heap.u8(pbVar15) == 0) {
          heap.setU8((pbVar14 + (0x14b)), (heap.u8(pbVar14 + (0x14b)) - 1) & 0xff);
        }
        if ((((heap.u32((0x00631c74) + (heap.u8(pbVar14 + (0x14a))) * 4) != 0) && (heap.i32((0x005f5658 + heap.u32(pbVar14) * 4)) != 0)) && (heap.u32(((0x00631c74) & 0xff) + (heap.u8(pbVar14 + (0x14a))) * 4) <= heap.u8(pbVar14 + (0x14b)))) && ((heap.u16((pbVar14 + 2)) & 0x5c0) == 0)) {
          heap.setU16((pbVar14 + 2), (heap.u16((pbVar14 + 2)) | 0x100) & 0xffff);
          heap.setU8((pbVar14 + (0x13d)), (1) & 0xff);
          uVar12 = ((0) >>> 0);
          do {
            heap.setU8((pbVar14 + (0x140)), (((uVar12) & 0xff)) & 0xff);
            if ((heap.i16((pbVar14 + uVar12 * 2 + 0x4a)) | 0) != -1) {
              break LAB_0044a22e;
            }
            uVar12 = ((uVar12 + 1) >>> 0);
          } while (uVar12 < 4);
          heap.setU8((pbVar14 + (0x140)), (0) & 0xff);
        }
      }
    }
    }
    pbVar14 = ((pbVar14 + 0x260) >>> 0);
    uVar6 = ((uVar6 + 1) >>> 0);
    if (0xfe < uVar6) {
      (regs.ebx = 0x4, regs.eax = FUN_00453bf8(heap));
      return;
    }
  } while (true);
  }
  bVar5 = ((1) & 0xff);
  }
  if (bVar5 == 0) {
    puVar1 = (((pbVar14 + uVar12 + 0x3a)) >>> 0);
    uVar7 = ((heap.u16(puVar1)) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) & 0xff7f) & 0xffffffff);
    if ((uVar7 >>> 7 & 1) == 0) {
      break LAB_00449d6a;
    }
  } else {
    puVar1 = (((pbVar14 + uVar12 + 0x3a)) >>> 0);
    uVar7 = ((heap.u16(puVar1)) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) | 0x80) & 0xffffffff);
    if ((uVar7 >>> 7 & 1) != 0) {
      break LAB_00449d6a;
    }
  }
  for (pbVar15 = ((heap.u32((0x00971ef4) + ((((((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar9 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); ((heap.u8(pbVar15) & 0x3c) != 8 || (heap.u8(pbVar14 + (uVar12 + 0x32)) != heap.u8(pbVar15 + (2)))); pbVar15 = (((pbVar15 + 8) >>> 0)) >>> 0) {
  
  }
  heap.setU8((pbVar15 + (5)), (heap.u8(pbVar15 + (5)) & 0x7f) & 0xff);
  if (bVar5 != 0) {
    heap.setU8((pbVar15 + (5)), (heap.u8(pbVar15 + (5)) | 0x80) & 0xff);
  }
  (regs.eax = FUN_005e59ec(heap, pbVar15, unaff_EDI));
  }
  uVar12 = ((uVar12 + 1) >>> 0);
  if (3 < uVar12) {
    /* goto LAB_00449d74 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004499cc/LAB_00449d74"); return 0;
  }
  /* goto LAB_00449b12 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004499cc/LAB_00449b12"); return 0;
}

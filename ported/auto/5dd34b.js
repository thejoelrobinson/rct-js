// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd34b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CARRY2, CONCAT11, CONCAT31, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_00444d07 } from "./444d07.js";
import { FUN_005dbeeb } from "./5dbeeb.js";
import { FUN_005dcfee } from "./5dcfee.js";
import { FUN_005dd8dd } from "./5dd8dd.js";
import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005dd34b(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let pbVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let extraout_EDX = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar14 = 0;
  let uVar15 = 0;
  let pbVar16 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar17 = 0;
  let puVar18 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar19 = 0;
  let bVar20 = 0;
  let local_24 = 0;
  bVar20 = ((heap.u8(unaff_ESI + (0x78))) & 0xff);
  bVar1 = ((heap.u8(unaff_ESI + (0x79))) & 0xff);
  uVar15 = ((((((bVar20) & 0xffff) * ((bVar1) & 0xffff)) >>> 0)) >>> 0);
  uVar5 = (((regs.eax = FUN_00444d07(heap))) & 0xffff);
  if (((((bVar20) & 0xffff) * ((bVar1) & 0xffff)) & 0xffff) <= uVar5) {
    if ((unaff_EBX & 1) != 0) {
      uVar5 = ((extraout_CX) & 0xffff);
      if (heap.u8(unaff_ESI + (4)) == 8) {
        uVar6 = ((((in_EAX) << 16 >> 16) - heap.u32((0x00652478) + ((heap.u8(unaff_EDI) & 3) * 2) * 4)) & 0xffff);
        in_EAX = ((((uVar6) >>> 0)) >>> 0);
        uVar5 = ((extraout_CX - heap.u32((0x0065247a) + ((heap.u8(unaff_EDI) & 3) * 2) * 4)) & 0xffff);
        pbVar16 = ((unaff_EDI + 2) >>> 0);
        uVar6 = ((uVar5 * 0x80 | uVar5 >>> 9 | uVar6) & 0xffff);
        for (unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar6 >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0); (heap.u8(pbVar16) != heap.u8(unaff_EDI + (2)) || ((heap.u8(unaff_EDI) & 0x3c) != 8)); unaff_EDI = (((unaff_EDI + 8) >>> 0)) >>> 0) {
        
        }
      }
      heap.setU32(0x0065dc4e, (0xffff) >>> 0);
      iVar14 = ((0) >>> 0);
      do {
        (regs.eax = FUN_005ddbe1(heap, uVar15));
        uVar12 = ((extraout_ECX & 0xffffff00) >>> 0);
        uVar11 = ((extraout_EDX) >>> 0);
        pbVar16 = ((0xffffffff) >>> 0);
        pbVar17 = ((unaff_ESI) >>> 0);
        do {
          uVar9 = ((uVar12) >>> 0);
          unaff_ESI = ((pbVar17) >>> 0);
          iVar7 = (((regs.eax = FUN_00444bd4(heap, iVar14, pbVar17, uVar11))) >>> 0);
          heap.setU32(pbVar17, (0) & 0xffffffff);
          heap.setU8((pbVar17 + (0x30)), ((regs.edx & 0xff)) & 0xff);
          if (pbVar16 == 0xffffffff) {
            iVar7 = (((regs.eax = FUN_00444c74(heap))) >>> 0);
            iVar10 = ((-1) >>> 0);
            do {
              iVar10 = ((iVar10 + 1) >>> 0);
            } while ((heap.i16((unaff_ESI + iVar10 * 2 + 0x5e)) | 0) != -1);
            heap.setU16((unaff_ESI + iVar10 * 2 + 0x5e), (heap.u16((pbVar17 + 10))) & 0xffff);
          }
          heap.setU8((pbVar17 + (0x31)), (((iVar7) & 0xff)) & 0xff);
          heap.setU8((pbVar17 + (1)), (0) & 0xff);
          if (pbVar16 != 0xffffffff) {
            heap.setU8((pbVar17 + (1)), (1) & 0xff);
          }
          uVar12 = ((heap.u32((0x005f6f1c + iVar7 * 8))) >>> 0);
          uVar13 = ((uVar12 >>> 10) >>> 0);
          heap.setI16((pbVar17 + 0x44), (((uVar13) << 16 >> 16)) & 0xffff);
          uVar12 = (((uVar13 << 10 | uVar12 & 0x3ff) >>> 1) >>> 0);
          iVar14 = ((iVar14 - uVar12) >>> 0);
          heap.setI32((pbVar17 + 0x24), (iVar14) & 0xffffffff);
          if ((heap.u16((0x005f7104 + iVar7 * 8)) & 0x4000) == 0) {
            iVar14 = ((iVar14 - uVar12) >>> 0);
          }
          heap.setU8((pbVar17 + (0x14)), (heap.u32((0x005f7106) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU8((pbVar17 + (9)), (heap.u32((0x005f7107) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU8((pbVar17 + (0x15)), (heap.u32((0x005f7108) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU16((pbVar17 + 0x46), (heap.u16((0x005f6f20 + iVar7 * 8))) & 0xffff);
          heap.setU8((pbVar17 + (0xb2)), (heap.u32((0x005f6f23) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU8((pbVar17 + (0xc2)), (heap.u32((0x005f7109) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU8((pbVar17 + (0xc3)), (heap.u32((0x005f710a) + (iVar7 * 8) * 4)) & 0xff);
          heap.setU8((pbVar17 + (0x28)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x29)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2a)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2b)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2c)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2d)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2e)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x2f)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x4a)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x4c)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x4d)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x4e)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x4f)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb5)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xba)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb6)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb7)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb8)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb9)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xbb)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0xbd)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x3e)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x3f)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0xc4)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xc5)), (0) & 0xff);
          heap.setU8((pbVar17 + (200)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xc9)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xca)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xcb)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xcc)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x1f)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x20)), (0) & 0xff);
          heap.setU8((pbVar17 + (0x52)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x53)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x54)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x55)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x56)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x57)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x58)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x59)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5a)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5b)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5c)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5d)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5e)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x5f)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x60)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x61)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x62)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (99)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (100)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x65)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x66)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x67)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x68)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x69)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6a)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6b)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6c)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6d)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6e)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x6f)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x70)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x71)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x72)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x73)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x74)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x75)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x76)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x77)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x78)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x79)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7a)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7b)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7c)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7d)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7e)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x7f)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x80)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x81)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x82)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x83)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x84)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x85)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x86)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x87)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x88)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x89)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8a)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8b)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8c)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8d)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8e)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x8f)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x90)), (0xff) & 0xff);
          heap.setU8((pbVar17 + (0x91)), (0xff) & 0xff);
          local_24 = ((((in_EAX) << 16 >> 16)) & 0xffff);
          if ((heap.u16((0x005f7104 + iVar7 * 8)) & 0x8000) == 0) {
            bVar20 = (((heap.u16((0x005f7104 + iVar7 * 8)) & 0x1000) != 0) & 0xff);
            if (((heap.u16((0x005f7104 + iVar7 * 8)) & 0x4000) != 0) && (bVar20 = ((5) & 0xff), (uVar9 & 0x100) == 0)) {
              bVar20 = ((6) & 0xff);
            }
            heap.setU8((pbVar17 + (0xcd)), (bVar20) & 0xff);
            heap.setI16((pbVar17 + 0x38), (local_24) & 0xffff);
            heap.setU16((pbVar17 + 0x3a), (uVar5) & 0xffff);
            heap.setU8((pbVar17 + (0x1e)), ((heap.u8(unaff_EDI) & 3) << 3) & 0xff);
            heap.setU16((pbVar17 + 0x3c), (((heap.u8(unaff_EDI + (2))) & 0xffff) << 2) & 0xffff);
            heap.setU8((pbVar17 + (0x4b)), ((heap.u8(unaff_EDI + (5)) & 0x70) >>> 4) & 0xff);
            (regs.eax = FUN_00444927(heap));
            heap.setI16((pbVar17 + 0x36), (((CONCAT31((regs.eax = callIndirect(heap, int3, (((heap.u8(unaff_EDI + (4))) >>> 0) << 2) >>> 8)), ((((heap.u8(unaff_EDI + (4))) >>> 0) << 2) & 0xff) | heap.u8(pbVar17 + (0x1e)) >>> 3)) << 16 >> 16)) & 0xffff);
            heap.setU8((pbVar17 + (0x34)), (0x1f) & 0xff);
            heap.setU8((pbVar17 + (0x35)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x48)), (2) & 0xff);
            heap.setU8((pbVar17 + (0x49)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x50)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x51)), (0) & 0xff);
          } else {
            heap.setU8((pbVar17 + (0xcd)), (0) & 0xff);
            sVar2 = ((heap.i16((0x0065ea84 + (heap.u8(unaff_EDI) & 3) * 4))) & 0xffff);
            sVar3 = ((heap.i16((0x0065ea86 + (heap.u8(unaff_EDI) & 3) * 4))) & 0xffff);
            uVar12 = ((((uVar5 + sVar3) >>> 0)) >>> 0);
            heap.setI16((pbVar17 + 0x38), (local_24 + sVar2) & 0xffff);
            heap.setU16((pbVar17 + 0x3a), (uVar5 + sVar3) & 0xffff);
            bVar20 = ((heap.u8(unaff_EDI + (2))) & 0xff);
            heap.setU16((pbVar17 + 0x3c), (((bVar20) & 0xffff) * 4) & 0xffff);
            heap.setU8((pbVar17 + (0x4b)), ((heap.u8(unaff_EDI + (5)) & 0x70) >>> 4) & 0xff);
            uVar13 = ((((((bVar20) & 0xffff) * 4 + ((((heap.u32((0x005f5d02) + (heap.u32(unaff_ESI) * 8) * 4)) << 24 >> 24)) << 16 >> 16)) >>> 0)) >>> 0);
            heap.setU16((pbVar17 + 0x36), (((heap.u8(unaff_EDI + (4))) & 0xffff) << 2) & 0xffff);
            heap.setU8((pbVar17 + (0x34)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x35)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x50)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x51)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x48)), (0) & 0xff);
            heap.setU8((pbVar17 + (0x49)), (0) & 0xff);
            do {
              uVar8 = (((regs.eax = FUN_005df40c(heap, uVar13, uVar12))) >>> 0);
              heap.setU8((pbVar17 + (0x1e)), (((uVar8 & 0xffffff1e) & 0xff)) & 0xff);
              bVar19 = ((CARRY2((((uVar8 & 0xffffff1e) >>> 0x15) & 0xffff) & 0xff, local_24 + sVar2)) & 0xff);
              (regs.eax = FUN_005dcfee(heap));
            } while (bVar19);
            (regs.eax = FUN_00444927(heap));
          }
          heap.setU8((pbVar17 + (0xb3)), (0) & 0xff);
          heap.setU8((pbVar17 + (0xb4)), (0) & 0xff);
          if (heap.u32(0x0065dc4e) != 0xffff) {
            heap.setU16((0x00743bd6 + ((heap.u32(0x0065dc4e)) >>> 0) * 0x100), (heap.u16((pbVar17 + 10))) & 0xffff);
          }
          LOCK();
          UNLOCK();
          if (heap.u32(0x0065dc4e) == 0xffff) {
            heap.setU32(0x0065dc3c, (pbVar17) >>> 0);
          }
          uVar6 = ((heap.u16((pbVar17 + 10))) & 0xffff);
          heap.setU16((pbVar17 + 0x40), (heap.u32(0x0065dc4e)) & 0xffff);
          heap.setU32(0x0065dc4e, (uVar6) >>> 0);
          if (pbVar16 != 0xffffffff) {
            heap.setU16((pbVar16 + 0x3e), (heap.u16((pbVar17 + 10))) & 0xffff);
          }
          uVar6 = ((heap.u32(0x0065dc4e)) & 0xffff);
          pbVar4 = ((heap.u32(0x0065dc3c)) >>> 0);
          bVar20 = ((((uVar9) << 24 >> 24) + 1) & 0xff);
          uVar12 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar9 >>> 8)), bVar20)) >>> 0);
          pbVar16 = ((pbVar17) >>> 0);
          pbVar17 = ((unaff_ESI) >>> 0);
        } while (bVar20 < heap.u8(unaff_ESI + (0x79)));
      } while ((((uVar9 >>> 8)) << 24 >> 24) != 1);
      heap.setU16((heap.u32(0x0065dc3c) + 0x40), (heap.u32(0x0065dc4e)) & 0xffff);
      heap.setU16((0x00743bd6 + ((uVar6) >>> 0) * 0x100), (heap.u16((pbVar4 + 10))) & 0xffff);
      heap.setU16((unaff_ESI + 2), (heap.u16((unaff_ESI + 2)) | 1) & 0xffff);
      uVar15 = ((0) >>> 0);
      do {
        heap.setU8((unaff_ESI + (uVar15 + 0x3a)), (heap.u8(unaff_ESI + (uVar15 + 0x3a)) & 0x80 | 1) & 0xff);
        uVar15 = ((uVar15 + 1) >>> 0);
      } while (uVar15 < 4);
      if (((heap.u32((0x005f5b78 + heap.u32(unaff_ESI) * 8)) & 0x10000) == 0) && (heap.u8(unaff_ESI) != 0x29)) {
        uVar15 = ((((CONCAT11(heap.u8(unaff_ESI + (0x78)), bVar20)) >>> 0)) >>> 0);
        iVar14 = ((0) >>> 0);
        do {
          puVar18 = ((0x00743b94 + heap.u32((unaff_ESI + iVar14 * 2 + 0x5e)) * 0x100) >>> 0);
          if ((heap.u16((0x005f7104 + heap.u32(((0x00743bc5) >>> 0) + (heap.u32((unaff_ESI + iVar14 * 2 + 0x5e)) * 0x100) * 4) * 8)) & 0x8000) == 0) {
            (regs.eax = FUN_005dbeeb(heap));
          }
          while (true) {
            heap.setU16((puVar18 + 0x48), (heap.u16((puVar18 + 0x48)) & 0xfffd) & 0xffff);
            if (heap.u16((puVar18 + 0x3e)) == 0xffff) {
              break;
            }
            puVar18 = ((0x00743b94 + heap.u32((puVar18 + 0x3e)) * 0x100) >>> 0);
          }
          iVar14 = ((iVar14 + 1) >>> 0);
          bVar20 = (((((uVar15 >>> 8)) << 24 >> 24) - 1) & 0xff);
          uVar15 = ((((bVar20) >>> 0) << 8) >>> 0);
        } while (bVar20 != 0);
      }
      in_EAX = (((regs.eax = FUN_005dd8dd(heap))) >>> 0);
    }
    return in_EAX;
  }
  heap.setU32(0x00991efc, (0x3dc) >>> 0);
  return in_EAX;
}

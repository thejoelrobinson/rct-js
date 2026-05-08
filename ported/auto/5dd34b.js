// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd34b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CARRY2, CONCAT11, CONCAT31, LOCK } from "../runtime/ghidra-builtins.js";
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
  const __sp = heap.allocFrame(76);
  const __addr_DAT_00652478 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f6f1c = __sp + 12;
  const __addr_DAT_005f7104 = __sp + 16;
  const __addr_DAT_005f7106 = __sp + 20;
  const __addr_DAT_005f7107 = __sp + 24;
  const __addr_DAT_005f7108 = __sp + 28;
  const __addr_DAT_005f6f20 = __sp + 32;
  const __addr_DAT_005f6f23 = __sp + 36;
  const __addr_DAT_005f7109 = __sp + 40;
  const __addr_DAT_005f710a = __sp + 44;
  const __addr_DAT_0065ea84 = __sp + 48;
  const __addr_DAT_0065ea86 = __sp + 52;
  const __addr_DAT_005f5d02 = __sp + 56;
  const __addr_DAT_00743bd6 = __sp + 60;
  const __addr_DAT_005f5b78 = __sp + 64;
  const __addr_DAT_00743b94 = __sp + 68;
  const __addr_DAT_00743bc5 = __sp + 72;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let in_EAX = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let extraout_DL = 0;
  let extraout_EDX = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let unaff_EBX = 0;
  let iVar14 = 0;
  let uVar15 = 0;
  let bVar19 = 0;
  let bVar20 = 0;
  let local_24 = 0;
  bVar20 = heap.u32(unaff_ESI + (0x78) * 4);
  bVar1 = heap.u32(unaff_ESI + (0x79) * 4);
  uVar15 = (bVar20 * bVar1);
  uVar5 = FUN_00444d07(heap);
  if ((bVar20 * bVar1) <= uVar5) {
    if ((unaff_EBX & 1) != 0) {
      uVar5 = extraout_CX;
      if (heap.u32(unaff_ESI + (4) * 4) == 8) {
        uVar6 = in_EAX - heap.u32((__addr_DAT_00652478) + ((heap.u32(unaff_EDI) & 3) * 2) * 4);
        in_EAX = uVar6;
        uVar5 = extraout_CX - heap.u32((__addr_DAT_0065247a) + ((heap.u32(unaff_EDI) & 3) * 2) * 4);
        pbVar16 = unaff_EDI + 2;
        uVar6 = uVar5 * 0x80 | uVar5 >>> 9 | uVar6;
        for (unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar6 >>> 5 | uVar6 << 0xb)) * 4); (heap.u32(pbVar16) != heap.u32(unaff_EDI + (2) * 4) || ((heap.u32(unaff_EDI) & 0x3c) != 8)); unaff_EDI = unaff_EDI + 8) {
        
        }
      }
      heap.setU32(0x0065dc4e, (0xffff) >>> 0);
      iVar14 = 0;
      do {
        FUN_005ddbe1(heap, uVar15);
        uVar12 = extraout_ECX & 0xffffff00;
        uVar11 = extraout_EDX;
        pbVar16 = 0xffffffff;
        pbVar17 = unaff_ESI;
        do {
          uVar9 = uVar12;
          unaff_ESI = pbVar17;
          iVar7 = FUN_00444bd4(heap, iVar14, pbVar17, uVar11);
          heap.u32(pbVar17) = 0;
          heap.u32(pbVar17 + (0x30) * 4) = extraout_DL;
          if (pbVar16 == 0xffffffff) {
            iVar7 = FUN_00444c74(heap);
            iVar10 = -1;
            do {
              iVar10 = iVar10 + 1;
            } while (heap.u32((unaff_ESI + iVar10 * 2 + 0x5e)) != -1);
            heap.u32((unaff_ESI + iVar10 * 2 + 0x5e)) = heap.u32((pbVar17 + 10));
          }
          heap.u32(pbVar17 + (0x31) * 4) = iVar7;
          heap.u32(pbVar17 + (1) * 4) = 0;
          if (pbVar16 != 0xffffffff) {
            heap.u32(pbVar17 + (1) * 4) = 1;
          }
          uVar12 = heap.u32((__addr_DAT_005f6f1c + iVar7 * 8));
          uVar13 = uVar12 >>> 10;
          heap.u32((pbVar17 + 0x44)) = uVar13;
          uVar12 = (uVar13 << 10 | uVar12 & 0x3ff) >>> 1;
          iVar14 = iVar14 - uVar12;
          heap.u32((pbVar17 + 0x24)) = iVar14;
          if ((heap.u32((__addr_DAT_005f7104 + iVar7 * 8)) & 0x4000) == 0) {
            iVar14 = iVar14 - uVar12;
          }
          heap.u32(pbVar17 + (0x14) * 4) = heap.u32((__addr_DAT_005f7106) + (iVar7 * 8) * 4);
          heap.u32(pbVar17 + (9) * 4) = heap.u32((__addr_DAT_005f7107) + (iVar7 * 8) * 4);
          heap.u32(pbVar17 + (0x15) * 4) = heap.u32((__addr_DAT_005f7108) + (iVar7 * 8) * 4);
          heap.u32((pbVar17 + 0x46)) = heap.u32((__addr_DAT_005f6f20 + iVar7 * 8));
          heap.u32(pbVar17 + (0xb2) * 4) = heap.u32((__addr_DAT_005f6f23) + (iVar7 * 8) * 4);
          heap.u32(pbVar17 + (0xc2) * 4) = heap.u32((__addr_DAT_005f7109) + (iVar7 * 8) * 4);
          heap.u32(pbVar17 + (0xc3) * 4) = heap.u32((__addr_DAT_005f710a) + (iVar7 * 8) * 4);
          heap.u32(pbVar17 + (0x28) * 4) = 0;
          heap.u32(pbVar17 + (0x29) * 4) = 0;
          heap.u32(pbVar17 + (0x2a) * 4) = 0;
          heap.u32(pbVar17 + (0x2b) * 4) = 0;
          heap.u32(pbVar17 + (0x2c) * 4) = 0;
          heap.u32(pbVar17 + (0x2d) * 4) = 0;
          heap.u32(pbVar17 + (0x2e) * 4) = 0;
          heap.u32(pbVar17 + (0x2f) * 4) = 0;
          heap.u32(pbVar17 + (0x4a) * 4) = 0;
          heap.u32(pbVar17 + (0x4c) * 4) = 0;
          heap.u32(pbVar17 + (0x4d) * 4) = 0;
          heap.u32(pbVar17 + (0x4e) * 4) = 0;
          heap.u32(pbVar17 + (0x4f) * 4) = 0;
          heap.u32(pbVar17 + (0xb5) * 4) = 0;
          heap.u32(pbVar17 + (0xba) * 4) = 0;
          heap.u32(pbVar17 + (0xb6) * 4) = 0;
          heap.u32(pbVar17 + (0xb7) * 4) = 0;
          heap.u32(pbVar17 + (0xb8) * 4) = 0;
          heap.u32(pbVar17 + (0xb9) * 4) = 0;
          heap.u32(pbVar17 + (0xbb) * 4) = 0xff;
          heap.u32(pbVar17 + (0xbd) * 4) = 0xff;
          heap.u32(pbVar17 + (0x3e) * 4) = 0xff;
          heap.u32(pbVar17 + (0x3f) * 4) = 0xff;
          heap.u32(pbVar17 + (0xc4) * 4) = 0;
          heap.u32(pbVar17 + (0xc5) * 4) = 0;
          heap.u32(pbVar17 + (200) * 4) = 0;
          heap.u32(pbVar17 + (0xc9) * 4) = 0;
          heap.u32(pbVar17 + (0xca) * 4) = 0;
          heap.u32(pbVar17 + (0xcb) * 4) = 0;
          heap.u32(pbVar17 + (0xcc) * 4) = 0xff;
          heap.u32(pbVar17 + (0x1f) * 4) = 0;
          heap.u32(pbVar17 + (0x20) * 4) = 0;
          heap.u32(pbVar17 + (0x52) * 4) = 0xff;
          heap.u32(pbVar17 + (0x53) * 4) = 0xff;
          heap.u32(pbVar17 + (0x54) * 4) = 0xff;
          heap.u32(pbVar17 + (0x55) * 4) = 0xff;
          heap.u32(pbVar17 + (0x56) * 4) = 0xff;
          heap.u32(pbVar17 + (0x57) * 4) = 0xff;
          heap.u32(pbVar17 + (0x58) * 4) = 0xff;
          heap.u32(pbVar17 + (0x59) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5a) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5b) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5c) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5d) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5e) * 4) = 0xff;
          heap.u32(pbVar17 + (0x5f) * 4) = 0xff;
          heap.u32(pbVar17 + (0x60) * 4) = 0xff;
          heap.u32(pbVar17 + (0x61) * 4) = 0xff;
          heap.u32(pbVar17 + (0x62) * 4) = 0xff;
          heap.u32(pbVar17 + (99) * 4) = 0xff;
          heap.u32(pbVar17 + (100) * 4) = 0xff;
          heap.u32(pbVar17 + (0x65) * 4) = 0xff;
          heap.u32(pbVar17 + (0x66) * 4) = 0xff;
          heap.u32(pbVar17 + (0x67) * 4) = 0xff;
          heap.u32(pbVar17 + (0x68) * 4) = 0xff;
          heap.u32(pbVar17 + (0x69) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6a) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6b) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6c) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6d) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6e) * 4) = 0xff;
          heap.u32(pbVar17 + (0x6f) * 4) = 0xff;
          heap.u32(pbVar17 + (0x70) * 4) = 0xff;
          heap.u32(pbVar17 + (0x71) * 4) = 0xff;
          heap.u32(pbVar17 + (0x72) * 4) = 0xff;
          heap.u32(pbVar17 + (0x73) * 4) = 0xff;
          heap.u32(pbVar17 + (0x74) * 4) = 0xff;
          heap.u32(pbVar17 + (0x75) * 4) = 0xff;
          heap.u32(pbVar17 + (0x76) * 4) = 0xff;
          heap.u32(pbVar17 + (0x77) * 4) = 0xff;
          heap.u32(pbVar17 + (0x78) * 4) = 0xff;
          heap.u32(pbVar17 + (0x79) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7a) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7b) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7c) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7d) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7e) * 4) = 0xff;
          heap.u32(pbVar17 + (0x7f) * 4) = 0xff;
          heap.u32(pbVar17 + (0x80) * 4) = 0xff;
          heap.u32(pbVar17 + (0x81) * 4) = 0xff;
          heap.u32(pbVar17 + (0x82) * 4) = 0xff;
          heap.u32(pbVar17 + (0x83) * 4) = 0xff;
          heap.u32(pbVar17 + (0x84) * 4) = 0xff;
          heap.u32(pbVar17 + (0x85) * 4) = 0xff;
          heap.u32(pbVar17 + (0x86) * 4) = 0xff;
          heap.u32(pbVar17 + (0x87) * 4) = 0xff;
          heap.u32(pbVar17 + (0x88) * 4) = 0xff;
          heap.u32(pbVar17 + (0x89) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8a) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8b) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8c) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8d) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8e) * 4) = 0xff;
          heap.u32(pbVar17 + (0x8f) * 4) = 0xff;
          heap.u32(pbVar17 + (0x90) * 4) = 0xff;
          heap.u32(pbVar17 + (0x91) * 4) = 0xff;
          local_24 = in_EAX;
          if ((heap.u32((__addr_DAT_005f7104 + iVar7 * 8)) & 0x8000) == 0) {
            bVar20 = (heap.u32((__addr_DAT_005f7104 + iVar7 * 8)) & 0x1000) != 0;
            if (((heap.u32((__addr_DAT_005f7104 + iVar7 * 8)) & 0x4000) != 0) && (bVar20 = 5, (uVar9 & 0x100) == 0)) {
              bVar20 = 6;
            }
            heap.u32(pbVar17 + (0xcd) * 4) = bVar20;
            heap.u32((pbVar17 + 0x38)) = local_24;
            heap.u32((pbVar17 + 0x3a)) = uVar5;
            heap.u32(pbVar17 + (0x1e) * 4) = (heap.u32(unaff_EDI) & 3) << 3;
            heap.u32((pbVar17 + 0x3c)) = heap.u32(unaff_EDI + (2) * 4) << 2;
            heap.u32(pbVar17 + (0x4b) * 4) = (heap.u32(unaff_EDI + (5) * 4) & 0x70) >>> 4;
            FUN_00444927(heap);
            heap.u32((pbVar17 + 0x36)) = CONCAT31((int3)((heap.u32(unaff_EDI + (4) * 4) << 2) >>> 8), (byte)(heap.u32(unaff_EDI + (4) * 4) << 2) | heap.u32(pbVar17 + (0x1e) * 4) >>> 3);
            heap.u32(pbVar17 + (0x34) * 4) = 0x1f;
            heap.u32(pbVar17 + (0x35) * 4) = 0;
            heap.u32(pbVar17 + (0x48) * 4) = 2;
            heap.u32(pbVar17 + (0x49) * 4) = 0;
            heap.u32(pbVar17 + (0x50) * 4) = 0;
            heap.u32(pbVar17 + (0x51) * 4) = 0;
          } else {
            heap.u32(pbVar17 + (0xcd) * 4) = 0;
            sVar2 = heap.u32((__addr_DAT_0065ea84 + (heap.u32(unaff_EDI) & 3) * 4));
            sVar3 = heap.u32((__addr_DAT_0065ea86 + (heap.u32(unaff_EDI) & 3) * 4));
            uVar12 = (uVar5 + sVar3);
            heap.u32((pbVar17 + 0x38)) = local_24 + sVar2;
            heap.u32((pbVar17 + 0x3a)) = uVar5 + sVar3;
            bVar20 = heap.u32(unaff_EDI + (2) * 4);
            heap.u32((pbVar17 + 0x3c)) = bVar20 * 4;
            heap.u32(pbVar17 + (0x4b) * 4) = (heap.u32(unaff_EDI + (5) * 4) & 0x70) >>> 4;
            uVar13 = (bVar20 * 4 + heap.u32((__addr_DAT_005f5d02) + (heap.u32(unaff_ESI) * 8) * 4));
            heap.u32((pbVar17 + 0x36)) = heap.u32(unaff_EDI + (4) * 4) << 2;
            heap.u32(pbVar17 + (0x34) * 4) = 0;
            heap.u32(pbVar17 + (0x35) * 4) = 0;
            heap.u32(pbVar17 + (0x50) * 4) = 0;
            heap.u32(pbVar17 + (0x51) * 4) = 0;
            heap.u32(pbVar17 + (0x48) * 4) = 0;
            heap.u32(pbVar17 + (0x49) * 4) = 0;
            do {
              uVar8 = FUN_005df40c(heap, uVar13, uVar12);
              heap.u32(pbVar17 + (0x1e) * 4) = (byte)(uVar8 & 0xffffff1e);
              bVar19 = CARRY2(((uVar8 & 0xffffff1e) >>> 0x15) & 0xff, local_24 + sVar2);
              FUN_005dcfee(heap);
            } while (bVar19);
            FUN_00444927(heap);
          }
          heap.u32(pbVar17 + (0xb3) * 4) = 0;
          heap.u32(pbVar17 + (0xb4) * 4) = 0;
          if (heap.u32(0x0065dc4e) != 0xffff) {
            heap.u32((__addr_DAT_00743bd6 + heap.u32(0x0065dc4e) * 0x100)) = heap.u32((pbVar17 + 10));
          }
          LOCK();
          UNLOCK(heap);
          if (heap.u32(0x0065dc4e) == 0xffff) {
            heap.setU32(0x0065dc3c, (pbVar17) >>> 0);
          }
          uVar6 = heap.u32((pbVar17 + 10));
          heap.u32((pbVar17 + 0x40)) = heap.u32(0x0065dc4e);
          heap.setU32(0x0065dc4e, (uVar6) >>> 0);
          if (pbVar16 != 0xffffffff) {
            heap.u32((pbVar16 + 0x3e)) = heap.u32((pbVar17 + 10));
          }
          uVar6 = heap.u32(0x0065dc4e);
          pbVar4 = heap.u32(0x0065dc3c);
          bVar20 = uVar9 + 1;
          uVar12 = CONCAT31((int3)(uVar9 >>> 8), bVar20);
          pbVar16 = pbVar17;
          pbVar17 = unaff_ESI;
        } while (bVar20 < heap.u32(unaff_ESI + (0x79) * 4));
      } while ((uVar9 >>> 8) != '\x01');
      heap.u32((heap.u32(0x0065dc3c) + 0x40)) = heap.u32(0x0065dc4e);
      heap.u32((__addr_DAT_00743bd6 + uVar6 * 0x100)) = heap.u32((pbVar4 + 10));
      heap.u32((unaff_ESI + 2)) = heap.u32((unaff_ESI + 2)) | 1;
      uVar15 = 0;
      do {
        heap.u32(unaff_ESI + (uVar15 + 0x3a) * 4) = heap.u32(unaff_ESI + (uVar15 + 0x3a) * 4) & 0x80 | 1;
        uVar15 = uVar15 + 1;
      } while (uVar15 < 4);
      if (((heap.u32((__addr_DAT_005f5b78 + heap.u32(unaff_ESI) * 8)) & 0x10000) == 0) && (heap.u32(unaff_ESI) != 0x29)) {
        uVar15 = CONCAT11(heap.u32(unaff_ESI + (0x78) * 4), bVar20);
        iVar14 = 0;
        do {
          puVar18 = __addr_DAT_00743b94 + heap.u32((unaff_ESI + iVar14 * 2 + 0x5e)) * 0x100;
          if ((heap.u32((__addr_DAT_005f7104 + heap.u32((byte)(__addr_DAT_00743bc5) + (heap.u32((unaff_ESI + iVar14 * 2 + 0x5e)) * 0x100) * 4) * 8)) & 0x8000) == 0) {
            FUN_005dbeeb(heap);
          }
          while (true) {
            heap.u32((puVar18 + 0x48)) = heap.u32((puVar18 + 0x48)) & 0xfffd;
            if (heap.u32((puVar18 + 0x3e)) == 0xffff) {
              break;
            }
            puVar18 = __addr_DAT_00743b94 + heap.u32((puVar18 + 0x3e)) * 0x100;
          }
          iVar14 = iVar14 + 1;
          bVar20 = (uVar15 >>> 8) - 1;
          uVar15 = bVar20 << 8;
        } while (bVar20 != 0);
      }
      in_EAX = FUN_005dd8dd(heap);
    }
    return in_EAX;
  }
  heap.setU32(0x00991efc, (0x3dc) >>> 0);
  return in_EAX;
} finally {
    heap.freeFrame(76);
  }
}

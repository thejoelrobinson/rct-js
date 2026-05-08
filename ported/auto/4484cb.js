// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4484cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CONCAT11, CONCAT14, CONCAT21, CONCAT22, CONCAT31, CONCAT44, LOCK } from "../runtime/ghidra-builtins.js";
import { FUN_0044149a } from "./44149a.js";
import { FUN_00448c64 } from "./448c64.js";
import { FUN_00448d15 } from "./448d15.js";
import { FUN_005e0650 } from "./5e0650.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_004484cb(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00630b34 = __sp + 0;
  const __addr_DAT_00652478 = __sp + 4;
  const __addr_DAT_0065247a = __sp + 8;
  const __addr_DAT_00971ef4 = __sp + 12;
  const __addr_DAT_005f4970 = __sp + 16;
  const __addr_DAT_006559d8 = __sp + 20;
  const __addr_DAT_00630b00 = __sp + 24;
  const __addr_DAT_00630b38 = __sp + 28;
  try {
  let uVar2 = 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let in_EAX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let uVar11 = 0;
  let bVar12 = 0;
  let in_EDX = 0;
  let uVar13 = 0;
  let uVar16 = 0;
  let iVar14 = 0;
  let uVar15 = 0;
  let extraout_EDX = 0;
  let bVar17 = 0;
  let uVar18 = 0;
  let uVar19 = 0;
  let uVar20 = 0;
  let uVar25 = 0;
  let uVar26 = 0;
  uVar25 = FUN_00448c64(heap);
  heap.setU32(0x00630b3c, ('\0') >>> 0);
  heap.setU32(0x00630b30, (__addr_DAT_00630b34) >>> 0);
  uVar19 = 0;
  uVar11 = extraout_ECX;
  LAB_004484e4: pbVar22 = heap.u32(0x00630b30);
  uVar6 = uVar25;
  uVar20 = CONCAT21((uVar25 >>> 0x30), heap.u32(unaff_ESI)) & 0xffff3c;
  uVar13 = uVar20 << 8;
  bVar17 = uVar19;
  if (uVar20 == '\x10') {
    unaff_EDI = (heap.u32(unaff_ESI + (4) * 4) << 4 | heap.u32(unaff_ESI + (5) * 4) & 0xf);
    uVar13 = (byte)(bVar17 - heap.u32(unaff_ESI)) & 3;
    uVar26 = CONCAT14(bVar17 - heap.u32(unaff_ESI), uVar6) & 0x3ffffffff;
    if ((heap.u32(unaff_EDI + (0x5f4970) * 4) >>> uVar13 & 1) != 0) {
      /* goto LAB_00448516 */ throw new Error("goto LAB_00448516 not supported");
    }
  } else {
    LAB_00448516: uVar20 = CONCAT21((uVar13 >>> 0x10), heap.u32(unaff_ESI)) & 0xffff3c;
    uVar13 = uVar20 << 8;
    if (uVar20 == '\b') {
      unaff_EDI = (heap.u32(unaff_ESI + (4) * 4) << 4 | heap.u32(unaff_ESI + (5) * 4) & 0xf);
      uVar26 = CONCAT14(heap.u32(unaff_ESI + (5) * 4), uVar6) & 0xfffffffff;
      if ((heap.u32(unaff_EDI + (0x6559d8) * 4) & 0x20) != 0) {
        uVar13 = (byte)(bVar17 - heap.u32(unaff_ESI)) & 3;
        uVar26 = CONCAT14(bVar17 - heap.u32(unaff_ESI), uVar6) & 0x3ffffffff;
        if ((heap.u32(unaff_EDI + (0x6559d8) * 4) >>> uVar13 & 1) != 0) {
          /* goto LAB_00448553 */ throw new Error("goto LAB_00448553 not supported");
        }
      }
    } else {
      LAB_00448553: uVar16 = CONCAT21((uVar13 >>> 0x10), heap.u32(unaff_ESI));
      uVar3 = uVar16 & 0xffff3c;
      iVar14 = uVar3 << 8;
      if ((uVar3 == '\x04') && ((heap.u32(unaff_ESI + (4) * 4) & 4) != 0)) {
        uVar20 = CONCAT31(uVar16, heap.u32(unaff_ESI + (4) * 4)) & 0xffff3c03;
        uVar16 = (uint3)(uVar20 >>> 8);
        bVar12 = uVar20 - bVar17;
        uVar26 = CONCAT44(CONCAT31(uVar16, bVar12), uVar6);
        if ((bVar12 & 1) != 0) {
          /* goto LAB_00448793 */ throw new Error("goto LAB_00448793 not supported");
        }
        iVar14 = uVar16 << 8;
        if ((heap.u32(unaff_ESI + (4) * 4) & 3) == bVar17) {
          iVar14 = CONCAT31(uVar16, 4);
        }
      }
      bVar12 = iVar14 + heap.u32(unaff_ESI + (2) * 4);
      uVar15 = CONCAT22((iVar14 >>> 0x10), CONCAT11(bVar12 - 4, bVar12));
      uVar5 = uVar25 + heap.u32((__addr_DAT_00652478) + (uVar19 * 2) * 4);
      uVar7 = uVar11 + heap.u32((__addr_DAT_0065247a) + (uVar19 * 2) * 4);
      uVar8 = uVar7 * 0x80 | uVar7 >>> 9 | uVar5;
      pbVar23 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
      do {
        bVar4 = heap.u32(pbVar23) & 0x3c;
        uVar8 = uVar19;
        if (bVar12 == heap.u32(pbVar23 + (2) * 4)) {
          if (bVar4 == 0x10) {
            uVar26 = CONCAT44(uVar15, uVar6);
            if ((heap.u32((byte)(__addr_DAT_005f4970) + (CONCAT31((int3)((heap.u32(pbVar23 + (4) * 4) << 4) >>> 8), (byte)(heap.u32(pbVar23 + (4) * 4) << 4) | heap.u32(pbVar23 + (5) * 4) & 0xf)) * 4) >>> (bVar17 - heap.u32(pbVar23) & 3 ^ 2) & 1) == 0) {
              break;
            }
            if (heap.u32(0x00630b3c) == '\0') {
              heap.u32(heap.u32(0x00630b30)) = 8;
              heap.u32(pbVar22 + (1) * 4) = bVar17;
              heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
            }
            if (heap.u32(0x00630b3c) == '\x01') {
              FUN_00448d15(heap, uVar15, uVar7, uVar5);
            }
          } else {
            if (bVar4 != 8) {
              /* goto LAB_004485cb */ throw new Error("goto LAB_004485cb not supported");
            }
            uVar20 = heap.u32(pbVar23 + (4) * 4) << 4 | heap.u32(pbVar23 + (5) * 4) & 0xf;
            uVar26 = CONCAT44(uVar15, uVar6);
            if (((heap.u32((__addr_DAT_006559d8) + (uVar20) * 4) & 0x20) == 0) || (uVar26 = CONCAT44(uVar15, uVar6), (heap.u32((byte)(__addr_DAT_006559d8) + (uVar20) * 4) >>> (bVar17 - heap.u32(pbVar23) & 3 ^ 2) & 1) == 0)) {
              break;
            }
            if (heap.u32(0x00630b3c) == '\0') {
              heap.u32(heap.u32(0x00630b30)) = 1;
              heap.u32(pbVar22 + (1) * 4) = bVar17;
              heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
            }
          }
          LAB_0044875d: uVar20 = CONCAT21((uVar15 >>> 0x10), heap.u32(unaff_ESI)) & 0xffff3c;
          iVar14 = uVar20 << 8;
          uVar26 = CONCAT44(iVar14, uVar6);
          if ((uVar20 == '\x04') && (uVar26 = CONCAT44(iVar14, uVar6), heap.u32(0x00630b3c) == '\x01')) {
            heap.u32(unaff_ESI + ((uVar8 >>> 3) + 6) * 4) = heap.u32(unaff_ESI + ((uVar8 >>> 3) + 6) * 4) | '\x01' << (uVar8 & 7);
            uVar26 = FUN_005e56d3(heap, unaff_ESI, unaff_EDI);
            uVar11 = extraout_ECX_00;
          }
          break;
        }
        LAB_004485cb: if (bVar4 == 4) {
          if (bVar12 == heap.u32(pbVar23 + (2) * 4)) {
            if ((heap.u32(pbVar23 + (4) * 4) & 4) != 0) {
              bVar12 = heap.u32(pbVar23 + (4) * 4) & 3;
              /* goto joined_r0x004486ae */ throw new Error("goto joined_r0x004486ae not supported");
            }
          } else {
            if ((byte)(bVar12 - 4) != heap.u32(pbVar23 + (2) * 4)) {
              /* goto LAB_004485e1 */ throw new Error("goto LAB_004485e1 not supported");
            }
            uVar26 = CONCAT44(uVar15, uVar6);
            if ((heap.u32(pbVar23 + (4) * 4) & 4) == 0) {
              break;
            }
            bVar12 = heap.u32(pbVar23 + (4) * 4) & 3 ^ 2;
            joined_r0x004486ae: uVar26 = CONCAT44(uVar15, uVar6);
            if (bVar12 != bVar17) {
              break;
            }
          }
          if (heap.u32(0x00630b3c) == '\0') {
            bVar12 = 2;
            if (heap.u32(pbVar23 + (4) * 4) >>> 4 == 0) {
              if (1 < heap.u32((byte)(__addr_DAT_00630b00) + (heap.u32(pbVar23 + (6) * 4) & 0xf) * 4)) {
                /* goto LAB_00448708 */ throw new Error("goto LAB_00448708 not supported");
              }
              bVar12 = 3;
            }
            heap.u32(heap.u32(0x00630b30)) = bVar12;
            heap.u32(pbVar22 + (1) * 4) = bVar17;
            heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
          }
          LAB_00448708: if ((heap.u32(0x00630b3c) == '\x01') && (heap.u32(pbVar23 + (((uVar8 ^ 2) >>> 3) + 6) * 4) = heap.u32(pbVar23 + (((uVar8 ^ 2) >>> 3) + 6) * 4) | '\x01' << ((uVar8 ^ 2) & 7), (heap.u32(pbVar23 + (4) * 4) & 0xf0) == 0)) {
            FUN_00448d15(heap, uVar15, uVar7, uVar5);
          }
          FUN_0044149a(heap, uVar15);
          FUN_005e0650(heap);
          FUN_005e56d3(heap, pbVar23, unaff_EDI);
          uVar15 = extraout_EDX;
          /* goto LAB_0044875d */ throw new Error("goto LAB_0044875d not supported");
        }
        LAB_004485e1: pbVar24 = pbVar23 + 1;
        pbVar23 = pbVar23 + 8;
        uVar26 = CONCAT44(uVar15, uVar6);
      } while ((heap.u32(pbVar24) & 0x80) == 0);
    }
  }
  LAB_00448793: uVar25 = uVar26;
  uVar20 = (uVar25 >>> 0x20);
  uVar6 = uVar25;
  if (heap.u32(0x00630b3c) == '\0') {
    /* goto code_r0x0044879c */ throw new Error("goto code_r0x0044879c not supported");
  }
  /* goto LAB_00448807 */ throw new Error("goto LAB_00448807 not supported");
  code_r0x0044879c: uVar19 = uVar19 + 1;
  if (uVar19 < 4) {
    /* goto LAB_004484e4 */ throw new Error("goto LAB_004484e4 not supported");
  }
  heap.setU32(0x00630b3c, ('\x01') >>> 0);
  for (puVar21 = __addr_DAT_00630b34; unaff_EDI = (puVar21 + 1), unaff_EDI < heap.u32(0x00630b30); puVar21 = puVar21 + 1) {
    do {
      if ((byte) * puVar21 < heap.u32(unaff_EDI)) {
        LOCK();
        uVar2 = heap.u32(unaff_EDI);
        heap.u32(unaff_EDI) = heap.u32(puVar21);
        UNLOCK(heap);
        heap.u32(puVar21) = uVar2;
      }
      uVar20 = uVar20 & 0xffff0000;
      unaff_EDI = unaff_EDI + 2;
    } while (unaff_EDI < heap.u32(0x00630b30));
  }
  uVar20 = CONCAT31((int3)(uVar20 >>> 8), heap.u32(unaff_ESI)) & 0xffffff3c;
  if (((uVar20 == '\x04') && (uVar20 = CONCAT31((int3)(uVar20 >>> 8), heap.u32(unaff_ESI + (4) * 4) >>> 4), heap.u32(unaff_ESI + (4) * 4) >>> 4 == 0)) && (__addr_DAT_00630b38 < heap.u32(0x00630b30))) {
    heap.setU32(0x00630b30, (__addr_DAT_00630b38) >>> 0);
  }
  LAB_00448807: uVar25 = CONCAT44(uVar20, uVar6);
  if (__addr_DAT_00630b34 < heap.u32(0x00630b30)) {
    uVar19 = heap.u32(0x00630b35);
    heap.setU32(0x00630b34, (heap.u32(0x00630b36)) >>> 0);
    heap.setU32(0x00630b35, ((byte)(heap.u32(0x00630b36) >>> 8)) >>> 0);
    heap.setU32(0x00630b36, (heap.u32(__addr_DAT_00630b38)) >>> 0);
    heap.setU32(0x00630b38, (heap.u32(0x00630b3a)) >>> 0);
    heap.setU32(0x00630b30, (heap.u32(0x00630b30) + -2) >>> 0);
    /* goto LAB_004484e4 */ throw new Error("goto LAB_004484e4 not supported");
  }
  if ((((heap.u32(unaff_ESI) & 0x3c) != 4) || (heap.u32(unaff_ESI + (4) * 4) >>> 4 == 0)) || ((heap.u32(unaff_ESI + (4) * 4) & 4) != 0)) {
    LAB_00448a43: return CONCAT44(in_EDX, in_EAX);
  }
  uVar19 = 0;
  LAB_00448869: bVar17 = heap.u32(unaff_ESI + (2) * 4);
  uVar5 = uVar6 + heap.u32((__addr_DAT_00652478) + (uVar19 * 2) * 4);
  uVar7 = uVar11 + heap.u32((__addr_DAT_0065247a) + (uVar19 * 2) * 4);
  uVar8 = uVar7 * 0x80 | uVar7 >>> 9 | uVar5;
  pbVar22 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
  do {
    if ((((heap.u32(pbVar22) & 0x3c) == 4) && ((heap.u32(pbVar22 + (4) * 4) & 4) == 0)) && ((heap.u32(pbVar22 + (4) * 4) >>> 4 != 0 && (bVar17 == heap.u32(pbVar22 + (2) * 4))))) {
      uVar20 = uVar19 + 1 & 3;
      uVar8 = uVar5 + heap.u32((__addr_DAT_00652478) + (uVar20 * 2) * 4);
      uVar9 = uVar7 + heap.u32((__addr_DAT_0065247a) + (uVar20 * 2) * 4);
      uVar10 = uVar9 * 0x80 | uVar9 >>> 9 | uVar8;
      pbVar23 = heap.u32((__addr_DAT_00971ef4) + ((uVar10 >>> 5 | uVar10 << 0xb)) * 4);
      /* goto LAB_004488f4 */ throw new Error("goto LAB_004488f4 not supported");
    }
    pbVar23 = pbVar22 + 1;
    pbVar22 = pbVar22 + 8;
  } while ((heap.u32(pbVar23) & 0x80) == 0);
  /* goto LAB_00448a39 */ throw new Error("goto LAB_00448a39 not supported");
  while (pbVar24 = pbVar23 + 1, pbVar23 = pbVar23 + 8, (heap.u32(pbVar24) & 0x80) == 0) {
    LAB_004488f4: if (((((heap.u32(pbVar23) & 0x3c) == 4) && ((heap.u32(pbVar23 + (4) * 4) & 4) == 0)) && (heap.u32(pbVar23 + (4) * 4) >>> 4 != 0)) && (bVar17 == heap.u32(pbVar23 + (2) * 4))) {
      uVar20 = uVar20 + 1 & 3;
      uVar10 = (uVar9 + heap.u32((__addr_DAT_0065247a) + (uVar20 * 2) * 4)) * 0x80 | (uVar9 + heap.u32((__addr_DAT_0065247a) + (uVar20 * 2) * 4)) >>> 9 | uVar8 + heap.u32((__addr_DAT_00652478) + (uVar20 * 2) * 4);
      pbVar24 = heap.u32((__addr_DAT_00971ef4) + ((uVar10 >>> 5 | uVar10 << 0xb)) * 4);
      /* goto LAB_00448951 */ throw new Error("goto LAB_00448951 not supported");
    }
  }
  /* goto LAB_00448a39 */ throw new Error("goto LAB_00448a39 not supported");
  while (pbVar1 = pbVar24 + 1, pbVar24 = pbVar24 + 8, (heap.u32(pbVar1) & 0x80) == 0) {
    LAB_00448951: if ((((heap.u32(pbVar24) & 0x3c) == 4) && ((heap.u32(pbVar24 + (4) * 4) & 4) == 0)) && ((heap.u32(pbVar24 + (4) * 4) >>> 4 != 0 && (bVar17 == heap.u32(pbVar24 + (2) * 4))))) {
      uVar10 = uVar20 + 1U & 3;
      uVar18 = uVar10 + 4;
      heap.u32(pbVar24 + ((uVar18 >>> 3) + 6) * 4) = heap.u32(pbVar24 + ((uVar18 >>> 3) + 6) * 4) | '\x01' << (uVar18 & 7);
      FUN_005e56d3(heap, pbVar24, unaff_EDI, pbVar23, uVar9, uVar8, pbVar22, uVar7, uVar5);
      uVar5 = uVar10 - 1 & 3;
      uVar7 = uVar5 + 4;
      heap.u32(pbVar23 + ((uVar7 >>> 3) + 6) * 4) = heap.u32(pbVar23 + ((uVar7 >>> 3) + 6) * 4) | '\x01' << (uVar7 & 7);
      FUN_005e56d3(heap, pbVar23);
      uVar5 = (uVar5 - 1 & 3) + 4;
      heap.u32(pbVar22 + ((uVar5 >>> 3) + 6) * 4) = heap.u32(pbVar22 + ((uVar5 >>> 3) + 6) * 4) | '\x01' << (uVar5 & 7);
      FUN_005e56d3(heap, pbVar22);
      uVar5 = (uVar19 & 3) + 4;
      heap.u32(unaff_ESI + ((uVar5 >>> 3) + 6) * 4) = heap.u32(unaff_ESI + ((uVar5 >>> 3) + 6) * 4) | '\x01' << (uVar5 & 7);
      uVar6 = FUN_005e56d3(heap);
      uVar11 = extraout_ECX_01;
      break;
    }
  }
  LAB_00448a39: uVar19 = uVar19 + 1;
  if (3 < uVar19) {
    /* goto LAB_00448a43 */ throw new Error("goto LAB_00448a43 not supported");
  }
  /* goto LAB_00448869 */ throw new Error("goto LAB_00448869 not supported");
} finally {
    heap.freeFrame(32);
  }
}

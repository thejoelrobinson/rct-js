// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c751.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00425432 } from "./425432.js";
import { FUN_0042547b } from "./42547b.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0043c49e } from "./43c49e.js";
import { FUN_0043d38b } from "./43d38b.js";
import { FUN_0043e304 } from "./43e304.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_004405f3 } from "./4405f3.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c751(heap) {
  const __sp = heap.allocFrame(108);
  const __addr_DAT_00743ba2 = __sp + 0;
  const __addr_DAT_00743ba4 = __sp + 4;
  const __addr_DAT_00743ba6 = __sp + 8;
  const __addr_DAT_00743bb2 = __sp + 12;
  const __addr_DAT_0062d3fc = __sp + 16;
  const __addr_DAT_00971ef4 = __sp + 20;
  const __addr_DAT_00630cb7 = __sp + 24;
  const __addr_DAT_00887472 = __sp + 28;
  const __addr_DAT_0088747a = __sp + 32;
  const __addr_DAT_00887442 = __sp + 36;
  const __addr_DAT_00887444 = __sp + 40;
  const __addr_stack0xffffffec = __sp + 44;
  const __addr_DAT_00991f8e = __sp + 48;
  const __addr_DAT_00743b94 = __sp + 52;
  const __addr_DAT_00743bbf = __sp + 56;
  const __addr_DAT_00743b95 = __sp + 60;
  const __addr_DAT_00743b96 = __sp + 64;
  const __addr_DAT_005f5b78 = __sp + 68;
  const __addr_DAT_00887420 = __sp + 72;
  const __addr_DAT_00887441 = __sp + 76;
  const __addr_DAT_00887508 = __sp + 80;
  const __addr_DAT_00887524 = __sp + 84;
  const __addr_DAT_0088751d = __sp + 88;
  const __addr_DAT_008874f0 = __sp + 92;
  const __addr_uStack_8 = __sp + 96;
  const __addr_DAT_0065247a = __sp + 100;
  const __addr_DAT_00652478 = __sp + 104;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let bVar4 = 0;
  let uVar3 = 0;
  let extraout_CL = 0;
  let extraout_CL_00 = 0;
  let extraout_CL_01 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let extraout_CX_03 = 0;
  let extraout_CX_04 = 0;
  let uVar6 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let extraout_ECX_03 = 0;
  let bVar7 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let uVar8 = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let extraout_DX_01 = 0;
  let extraout_DX_02 = 0;
  let bVar10 = 0;
  let extraout_var = 0;
  let extraout_var_00 = 0;
  let extraout_EDX = 0;
  let uVar9 = 0;
  let cVar11 = 0;
  let uVar12 = 0;
  let unaff_EBX = 0;
  let unaff_EBP = 0;
  let unaff_ESI = 0;
  let uVar13 = 0;
  let pbVar14 = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let bVar17 = 0;
  let uVar18 = 0;
  let uVar19 = 0;
  let pbVar20 = 0;
  let uStack_4 = 0;
  heap.setU32(0x0062d3f4, (0) >>> 0);
  heap.setU32(0x006293d9, (heap.u32((unaff_ESI + 0x71))) >>> 0);
  if (heap.u32(0x006293d9) == -2) {
    heap.setU32((unaff_ESI + 0x71), (0xff) >>> 0);
  }
  bVar17 = heap.u32((unaff_ESI + 0x2b)) < 6;
  if (heap.u32((unaff_ESI + 0x2b)) == 6) {
    heap.setU32((unaff_ESI + 0x7a), (heap.u32((unaff_ESI + 0x7a)) + 1) >>> 0);
    uVar2 = heap.u32((unaff_ESI + 0x74));
    bVar17 = uVar2 != 0xffff;
    if (uVar2 != 0xffff) {
      uVar13 = uVar2;
      uVar2 = heap.u32((__addr_DAT_00743ba2) + (uVar13 * 0x80) * 4) - heap.u32((unaff_ESI + 0xe));
      if (uVar2 < 0) {
        uVar2 = -uVar2;
      }
      uVar5 = heap.u32((__addr_DAT_00743ba4) + (uVar13 * 0x80) * 4) - heap.u32((unaff_ESI + 0x10));
      if (uVar5 < 0) {
        uVar5 = -uVar5;
      }
      uVar8 = heap.u32((__addr_DAT_00743ba6) + (uVar13 * 0x80) * 4) - heap.u32((unaff_ESI + 0x12));
      if (uVar8 < 0) {
        uVar8 = -uVar8;
      }
      bVar17 = uVar8 < 10;
      if (uVar8 < 0xb) {
        uVar8 = uVar5;
        if (uVar2 < uVar5) {
          uVar8 = uVar2;
          uVar2 = uVar5;
        }
        uVar2 = uVar2 + (uVar8 >>> 1);
        uVar3 = uVar2;
        if (uVar2 < 8) {
          /* goto LAB_0043c84c */ throw new Error("goto LAB_0043c84c not supported");
        }
        if (0xc < uVar2) {
          unaff_EBX = heap.u32((unaff_ESI + 0xe)) & 0xffe0ffe0;
          bVar17 = (heap.u32((__addr_DAT_00743ba2 + uVar13 * 0x80)) & 0xffe0ffe0) < unaff_EBX;
          if ((heap.u32((__addr_DAT_00743ba2 + uVar13 * 0x80)) & 0xffe0ffe0) != unaff_EBX) {
            /* goto LAB_0043c875 */ throw new Error("goto LAB_0043c875 not supported");
          }
        }
        bVar10 = heap.u32((__addr_DAT_00743bb2) + (uVar13 * 0x100) * 4);
        bVar17 = bVar10 < heap.u32((unaff_ESI + 0x1e));
        if (bVar10 == heap.u32((unaff_ESI + 0x1e))) {
          switch (bVar10 >>> 3 & 3) {
            case 0:
              uVar2 = heap.u32((unaff_ESI + 0xe));
              uVar3 = uVar2;
              bVar17 = uVar2 < heap.u32((__addr_DAT_00743ba2) + (uVar13 * 0x80) * 4);
              if (uVar2 < heap.u32((__addr_DAT_00743ba2) + (uVar13 * 0x80) * 4)) {
                LAB_0043c84c: if (heap.u32((unaff_ESI + 0x71)) < 0xfe) {
                  uStack_4 = 0x43c857;
                  uVar3 = FUN_0043c49e(heap);
                }
                if (heap.u32((unaff_ESI + 0x71)) == -1) {
                  heap.setU32((unaff_ESI + 0x71), (0xfe) >>> 0);
                  heap.setU32((unaff_ESI + 0x6f), (2) >>> 0);
                  if (heap.u32(0x006293d9) != -2) {
                    uStack_4 = 0x43c873;
                    uVar3 = FUN_005e53ca(heap);
                  }
                }
                return uVar3;
              }
              break;
            case 1:
              uVar2 = heap.u32((unaff_ESI + 0x10));
              uVar3 = uVar2;
              bVar17 = uVar2 < heap.u32((__addr_DAT_00743ba4) + (uVar13 * 0x80) * 4);
              if (heap.u32((__addr_DAT_00743ba4) + (uVar13 * 0x80) * 4) < uVar2) {
                /* goto LAB_0043c84c */ throw new Error("goto LAB_0043c84c not supported");
              }
              break;
            case 2:
              uVar2 = heap.u32((unaff_ESI + 0xe));
              uVar3 = uVar2;
              bVar17 = uVar2 < heap.u32((__addr_DAT_00743ba2) + (uVar13 * 0x80) * 4);
              if (heap.u32((__addr_DAT_00743ba2) + (uVar13 * 0x80) * 4) < uVar2) {
                /* goto LAB_0043c84c */ throw new Error("goto LAB_0043c84c not supported");
              }
              break;
            case 3:
              uVar2 = heap.u32((unaff_ESI + 0x10));
              uVar3 = uVar2;
              bVar17 = uVar2 < heap.u32((__addr_DAT_00743ba4) + (uVar13 * 0x80) * 4);
              if (uVar2 < heap.u32((__addr_DAT_00743ba4) + (uVar13 * 0x80) * 4)) {
                /* goto LAB_0043c84c */ throw new Error("goto LAB_0043c84c not supported");
              }
          }
        }
      }
    }
  }
  LAB_0043c875: uStack_4 = 0x43c87a;
  uVar13 = FUN_0043c49e(heap);
  heap.setU32(__addr_uStack_8, (extraout_ECX) >>> 0);
  uVar6 = extraout_var;
  if (!bVar17) {
    bVar17 = false;
    heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 1) >>> 0);
    unaff_EBX = heap.u32((unaff_ESI + 0x2e));
    uStack_4 = 0x43c88f;
    uVar13 = (heap.u32(heap.u32((__addr_DAT_0062d3fc + unaff_EBX * 4))))();
    if (bVar17) {
      return uVar13;
    }
    uStack_4 = 0x43c896;
    uVar13 = FUN_0043c49e(heap);
    heap.setU32(__addr_uStack_8, (extraout_ECX_00) >>> 0);
    uVar6 = extraout_var_00;
    if (!bVar17) {
      return uVar13;
    }
  }
  uVar2 = uVar13;
  uVar5 = heap.u32(__addr_uStack_8);
  uVar15 = CONCAT22((unaff_EBX >>> 0x10), uVar2) & 0xffffffe0;
  uVar3 = CONCAT22(uVar6, uVar5) & 0xffffffe0;
  uVar12 = uVar15;
  uVar8 = uVar3;
  if ((uVar12 == heap.u32((unaff_ESI + 0x24))) && (uVar8 == heap.u32((unaff_ESI + 0x26)))) {
    LAB_0043c8b4: uStack_4 = 0x43c8b9;
    FUN_0043d38b(heap);
    uStack_4 = 0x43c8be;
    FUN_005e53ca(heap);
    uStack_4 = 0x43c8c3;
    FUN_00444927(heap);
    uStack_4 = 0x43c8c8;
    uVar13 = FUN_005e53ca(heap);
    return uVar13;
  }
  if ((uVar2 < 0x20) || (((uVar5 < 0x20 || (0xfdf < uVar2)) || (0xfdf < uVar5)))) {
    if (heap.u32((unaff_ESI + 0x2a)) == '\x01') {
      heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 2) >>> 0);
    }
  } else {
    bVar10 = (heap.u32((unaff_ESI + 0x12)) >>> 2);
    bVar7 = bVar10 - 5;
    if (bVar10 < 5) {
      bVar7 = 0;
    }
    bVar10 = bVar10 + 1;
    pbVar14 = heap.u32((__addr_DAT_00971ef4) + (((uVar8 << 7 | uVar8 >>> 9 | uVar12) >>> 5 | (uVar8 >>> 9) << 0xb)) * 4);
    do {
      uVar15 = CONCAT31((int3)(uVar15 >>> 8), heap.u32(pbVar14)) & 0xffffff3c;
      cVar11 = uVar15;
      uStack_4 = uVar13;
      if (cVar11 == '\x04') {
        if ((bVar7 <= heap.u32(pbVar14 + (2) * 4)) && (heap.u32(pbVar14 + (2) * 4) <= bVar10)) {
          heap.setU32(0x006293c9, ((heap.u32((__addr_DAT_00630cb7) + (heap.u32(pbVar14 + (5) * 4) & 0xf) * 4) & 0x20) != 0) >>> 0);
          bVar17 = false;
          uVar13 = FUN_0042547b(heap);
          if (bVar17) {
            if (heap.u32((unaff_ESI + 0x2a)) == '\0') {
              /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
            }
          } else {
            if (heap.u32((unaff_ESI + 0x2a)) == '\x01') {
            /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
          }
          }
          uVar2 = extraout_CX_01;
          if ((heap.u32((unaff_ESI + 0x2e)) == '\0') && ((heap.u32(pbVar14 + (4) * 4) & 0xf0) == 0)) {
            if (heap.u32(pbVar14 + (7) * 4) == 0xff) {
              heap.setU32((unaff_ESI + 0x79), (0xff) >>> 0);
            } else {
              if (heap.u32((unaff_ESI + 0x2b)) == '\x06') {
              if (heap.u32(pbVar14 + (7) * 4) != heap.u32((unaff_ESI + 0x68))) {
                /* goto LAB_0043d02c */ throw new Error("goto LAB_0043d02c not supported");
              }
            } else {
              if (heap.u32(pbVar14 + (7) * 4) != heap.u32((unaff_ESI + 0x79))) {
              heap.setU32((unaff_ESI + 0xf4), (0) >>> 0);
              bVar17 = false;
              uVar19 = FUN_0043e304(heap);
              uVar13 = uVar19;
              bVar10 = (uVar19 >>> 0x20);
              if (!bVar17) {
                heap.setU32((unaff_ESI + 0x79), (bVar10) >>> 0);
                /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
              }
              heap.setU32((unaff_ESI + 0x79), (bVar10) >>> 0);
              iVar16 = bVar10 * 0x260;
              bVar10 = (uVar19 >>> 0x28);
              uVar15 = bVar10;
              LOCK();
              uVar6 = heap.u32((__addr_DAT_00887472 + uVar15 * 2 + iVar16));
              heap.setU32((__addr_DAT_00887472 + uVar15 * 2 + iVar16), (heap.u32((unaff_ESI + 10))) >>> 0);
              UNLOCK();
              heap.setU32(((__addr_DAT_0088747a) + (iVar16 + uVar15) * 4), (heap.u32((__addr_DAT_0088747a) + (iVar16 + uVar15) * 4) + '\x01') >>> 0);
              heap.setU32((unaff_ESI + 0x74), (uVar6) >>> 0);
              FUN_0044142c(heap);
              heap.setU32((unaff_ESI + 0x68), (extraout_DL_00) >>> 0);
              heap.setU32((unaff_ESI + 0x69), (bVar10) >>> 0);
              heap.setU32((unaff_ESI + 0x2b), (6) >>> 0);
              heap.setU32((unaff_ESI + 0xf5), (0) >>> 0);
              uVar18 = FUN_00441452(heap);
              uVar3 = (uVar18 >>> 0x20);
              heap.setU32((unaff_ESI + 0x2c), (10) >>> 0);
              heap.setU32((unaff_ESI + 0x36), (2) >>> 0);
              heap.setU32((unaff_ESI + 0x7a), (0) >>> 0);
              uVar2 = extraout_CX_03;
              if ((heap.u32((unaff_ESI + 200)) & 8) != 0) {
                (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
                uVar9 = uVar3 & 0xff;
                (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                heap.setU32(0x00971e8e, (heap.u32((__addr_DAT_00887444) + (uVar9 * 0x98) * 4)) >>> 0);
                FUN_0042c711(heap, iVar16, unaff_ESI, 1, __addr_stack0xffffffec, uVar15, uVar3, extraout_ECX_01, uVar18);
              }
            }
            }
            }
          } else {
            heap.setU32((unaff_ESI + 0x79), (0xff) >>> 0);
            if (heap.u32((unaff_ESI + 0x2b)) == '\x06') {
              LAB_0043d02c: FUN_0043e792(heap);
              FUN_0044142c(heap);
              heap.setU32((unaff_ESI + 0x2b), (1) >>> 0);
              uVar13 = FUN_00441452(heap);
              uVar2 = extraout_CX_02;
            }
          }
          bVar10 = heap.u32(pbVar14 + (2) * 4);
          uVar5 = bVar10;
          bVar7 = heap.u32(pbVar14 + (4) * 4);
          heap.setU32((unaff_ESI + 0x24), (uVar13) >>> 0);
          heap.setU32((unaff_ESI + 0x26), (uVar2) >>> 0);
          heap.setU32((unaff_ESI + 0x28), (bVar10) >>> 0);
          heap.setU32((unaff_ESI + 0x29), (bVar7 & 7) >>> 0);
          if (heap.u32((unaff_ESI + 0x2e)) == '\0') {
            bVar10 = heap.u32((unaff_ESI + 0xef));
            heap.setU32((unaff_ESI + 0xef), (heap.u32((unaff_ESI + 0xef)) & 0xc0) >>> 0);
            heap.setU32((unaff_ESI + 0xef), (heap.u32((unaff_ESI + 0xef)) | (bVar10 & 0x1f) << 1) >>> 0);
            if (((heap.u32(0x006293c9) != '\0') && (heap.setU32((unaff_ESI + 0xef), (heap.u32((unaff_ESI + 0xef)) | 1) >>> 0), (heap.u32((unaff_ESI + 0xef)) & 0x3e) != 0)) && ((heap.u32((unaff_ESI + 0xef)) & 0xc0) == 0)) {
              uVar8 = FUN_005df40c(heap);
              uVar5 = extraout_DX_00;
              if (uVar8 < 0x2aab) {
                FUN_00440fe3(heap);
                pbVar14 = (unaff_ESI + 0x3b);
                bVar10 = heap.u32(pbVar14);
                heap.setU32(pbVar14, (heap.u32(pbVar14) - 0x11) >>> 0);
                uVar5 = extraout_DX_01;
                if (bVar10 < 0x11) {
                  heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
                }
              }
              heap.setU32((unaff_ESI + 0xef), (heap.u32((unaff_ESI + 0xef)) | 0xc0) >>> 0);
            }
            if (((heap.u32((unaff_ESI + 0xef)) & 0xc0) != 0) && (uVar8 = FUN_005df40c(heap), uVar5 = extraout_DX_02, uVar2 = extraout_CX_04, uVar8 < 0x1112)) {
              heap.setU32((unaff_ESI + 0xef), (heap.u32((unaff_ESI + 0xef)) + -0x40) >>> 0);
            }
            uVar2 = heap.u32((__addr_DAT_00991f8e) + ((((uVar13 & 0xfe0) << 2) | uVar2 >>> 5)) * 4);
            uVar13 = 0;
            while (uVar2 != 0xffff) {
              uVar15 = uVar2;
              iVar16 = uVar15 * 0x100;
              uVar3 = uVar13;
              if (heap.u32((__addr_DAT_00743b94) + (iVar16) * 4) == '\x01') {
                if (heap.u32((__addr_DAT_00743bbf) + (iVar16) * 4) == '\x05') {
                  uVar2 = heap.u32((__addr_DAT_00743ba6) + (uVar15 * 0x80) * 4) + uVar5 * -4;
                  if (uVar2 < 0) {
                    uVar2 = -uVar2;
                  }
                  if (uVar2 < 0x11) {
                    uVar3 = uVar13 + 0x10000;
                  }
                }
              } else {
                if (heap.u32((__addr_DAT_00743b94) + (iVar16) * 4) == '\x03') {
                uVar2 = heap.u32((__addr_DAT_00743ba6) + (uVar15 * 0x80) * 4) + uVar5 * -4;
                if (uVar2 < 0) {
                  uVar2 = -uVar2;
                }
                if (uVar2 < 0x11) {
                  uVar3 = CONCAT31((int3)(uVar13 >>> 8), uVar13 + '\x01');
                  if (heap.u32((__addr_DAT_00743b95) + (iVar16) * 4) < 2) {
                    uVar3 = CONCAT22((uVar13 >>> 0x10), CONCAT11((uVar13 >>> 8) + '\x01', uVar13));
                  }
                }
              }
              }
              uVar13 = uVar3;
              uVar2 = heap.u32((__addr_DAT_00743b96) + (uVar15 * 0x80) * 4);
            }
            if (((0x9ffff < uVar13) && (heap.u32((unaff_ESI + 0x2b)) == '\x05')) && (uVar2 = FUN_005df40c(heap), uVar13 = extraout_ECX_02, uVar2 < 0x5556)) {
              FUN_00440fe3(heap);
              pbVar14 = (unaff_ESI + 0x3b);
              bVar10 = heap.u32(pbVar14);
              heap.setU32(pbVar14, (heap.u32(pbVar14) - 0xe) >>> 0);
              uVar13 = extraout_ECX_03;
              if (bVar10 < 0xe) {
                heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
              }
            }
            uVar6 = uVar13;
            if (2 < uVar13) {
              uVar6 = CONCAT31((int3)(uVar13 >>> 8), 3);
            }
            if (2 < (uVar6 >>> 8)) {
              uVar6 = CONCAT11(3, uVar6);
            }
            uVar13 = CONCAT11(heap.u32((unaff_ESI + 0xe3)), heap.u32((unaff_ESI + 0xe3))) & 0xffffff0f;
            uVar2 = CONCAT11((uVar13 >>> 8), uVar13 << 2 | (uVar6 >>> 8)) & 0xc0ff;
            bVar7 = uVar2;
            bVar4 = (uVar2 >>> 8);
            bVar10 = bVar7 | bVar4;
            heap.setU32((unaff_ESI + 0xe3), (bVar10) >>> 0);
            if (bVar4 == 0) {
              uVar13 = CONCAT11(bVar10, bVar10) & 0xffffff03;
              uVar2 = CONCAT11((uVar13 >>> 8) >>> 2, uVar13) & 0x3ff;
              bVar10 = uVar6;
              if ((2 < (uVar2 + (uVar2 >>> 8) + ((bVar7 & 0x30) >>> 4))) && (uVar2 = FUN_005df40c(heap), bVar10 = extraout_CL_00, uVar2 < 0x2aab)) {
                FUN_00440fe3(heap);
                pbVar14 = (unaff_ESI + 0x3b);
                bVar10 = heap.u32(pbVar14);
                heap.setU32(pbVar14, (heap.u32(pbVar14) - 0x11) >>> 0);
                if (bVar10 < 0x11) {
                  heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
                }
                heap.setU32((unaff_ESI + 0xe3), (heap.u32((unaff_ESI + 0xe3)) | 0xc0) >>> 0);
                bVar10 = extraout_CL_01;
              }
            } else {
              uVar2 = FUN_005df40c(heap);
              bVar10 = extraout_CL;
              if (uVar2 < 0x1112) {
                heap.setU32((unaff_ESI + 0xe3), (heap.u32((unaff_ESI + 0xe3)) + -0x40) >>> 0);
              }
            }
            uVar13 = CONCAT11(heap.u32((unaff_ESI + 0xe1)), heap.u32((unaff_ESI + 0xe1))) & 0xffffff0f;
            uVar2 = CONCAT11((uVar13 >>> 8), uVar13 << 2 | bVar10) & 0xc0ff;
            bVar7 = uVar2;
            bVar4 = (uVar2 >>> 8);
            bVar10 = bVar7 | bVar4;
            heap.setU32((unaff_ESI + 0xe1), (bVar10) >>> 0);
            if (bVar4 == 0) {
              uVar13 = CONCAT11(bVar10, bVar10) & 0xffffff03;
              uVar2 = CONCAT11((uVar13 >>> 8) >>> 2, uVar13) & 0x3ff;
              if ((2 < (uVar2 + (uVar2 >>> 8) + ((bVar7 & 0x30) >>> 4))) && (uVar2 = FUN_005df40c(heap), uVar2 < 0x2aab)) {
                FUN_00440fe3(heap);
                pbVar14 = (unaff_ESI + 0x3b);
                bVar10 = heap.u32(pbVar14);
                heap.setU32(pbVar14, (heap.u32(pbVar14) - 0x11) >>> 0);
                if (bVar10 < 0x11) {
                  heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
                }
                heap.setU32((unaff_ESI + 0xe1), (heap.u32((unaff_ESI + 0xe1)) | 0xc0) >>> 0);
              }
            } else {
              uVar2 = FUN_005df40c(heap);
              if (uVar2 < 0x1112) {
                heap.setU32((unaff_ESI + 0xe1), (heap.u32((unaff_ESI + 0xe1)) + -0x40) >>> 0);
              }
            }
          }
          /* goto LAB_0043c8b4 */ throw new Error("goto LAB_0043c8b4 not supported");
        }
      } else {
        if (((cVar11 == '\b') && (bVar7 <= heap.u32(pbVar14 + (2) * 4))) && ((heap.u32(pbVar14 + (2) * 4) <= bVar10 && (iVar16 = heap.u32(pbVar14 + (7) * 4) * 0x260, (heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (iVar16) * 4) * 8)) & 0x20000) != 0)))) {
          if (((heap.u32((unaff_ESI + 0x2e)) == '\0') && (heap.setU32((unaff_ESI + 0xf4), (0) >>> 0), heap.u32((__addr_DAT_00887441) + (iVar16) * 4) == '\x01')) && (heap.u32(pbVar14 + (7) * 4) != heap.u32((unaff_ESI + 0x79)))) {
            if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (iVar16) * 4) * 8)) & 0x200000) == 0) {
              if (heap.u32(pbVar14 + (7) * 4) == heap.u32((unaff_ESI + 0xc5))) {
                heap.setU32((unaff_ESI + 0xc5), (0xff) >>> 0);
              }
              heap.setU32((unaff_ESI + 0x70), (heap.u32(0x006293d8)) >>> 0);
              FUN_0044142c(heap);
              heap.setU32((unaff_ESI + 0x68), (heap.u32(pbVar14 + (7) * 4)) >>> 0);
              heap.setU32((unaff_ESI + 0x2b), (0x11) >>> 0);
              heap.setU32((unaff_ESI + 0x2c), (0) >>> 0);
              FUN_00441452(heap);
              return uStack_4;
            }
            heap.setU32((unaff_ESI + 0xf4), (0) >>> 0);
            bVar17 = false;
            pbVar20 = pbVar14;
            FUN_0043e304(heap, iVar16, CONCAT22((uVar3 >>> 0x10), CONCAT11(bVar10, bVar7)));
            if (bVar17) {
              uVar13 = heap.u32(pbVar14 + (7) * 4);
              if (heap.u32((__addr_DAT_00887508) + (uVar13 * 0x130) * 4) != 0) {
                heap.setU32(((__addr_DAT_00887524) + (uVar13 * 0x98) * 4), (heap.u32((__addr_DAT_00887524) + (uVar13 * 0x98) * 4) + heap.u32((__addr_DAT_00887508) + (uVar13 * 0x130) * 4)) >>> 0);
                heap.setU32(((__addr_DAT_0088751d) + (uVar13 * 0x260) * 4), (heap.u32((__addr_DAT_0088751d) + (uVar13 * 0x260) * 4) | 2) >>> 0);
                heap.setU32(0x0099c167, (0x14) >>> 0);
                heap.setU32(0x006293b0, (0xe6) >>> 0);
                FUN_004405f3(heap);
              }
              heap.setU32((unaff_ESI + 0x32), (uVar12 + 0x10) >>> 0);
              heap.setU32((unaff_ESI + 0x34), (uVar8 + 0x10) >>> 0);
              heap.setU32((unaff_ESI + 0x36), (3) >>> 0);
              FUN_0044142c(heap);
              heap.setU32((unaff_ESI + 0x68), (heap.u32(pbVar20 + (7) * 4)) >>> 0);
              heap.setU32((unaff_ESI + 0x2b), (7) >>> 0);
              heap.setU32((unaff_ESI + 0x2c), (0x13) >>> 0);
              FUN_00441452(heap);
              heap.setU32((unaff_ESI + 0xe2), (0) >>> 0);
              heap.setU32((__addr_DAT_008874f0 + extraout_EDX * 0x260), (heap.u32((__addr_DAT_008874f0 + extraout_EDX * 0x260)) + 1) >>> 0);
              if ((heap.u32((unaff_ESI + 200)) & 8) != 0) {
                (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
                (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                heap.setU32(0x00971e8e, (heap.u32((__addr_DAT_00887444) + (heap.u32((unaff_ESI + 0x68)) * 0x98) * 4)) >>> 0);
                FUN_0042c711(heap, pbVar20, unaff_ESI, unaff_EBP, __addr_uStack_8, uVar15);
              }
              return uStack_4;
            }
          }
          /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
        }
        if (((cVar11 == '\x10') && (bVar7 <= heap.u32(pbVar14 + (2) * 4))) && (heap.u32(pbVar14 + (2) * 4) <= bVar10)) {
          if (heap.u32(pbVar14 + (4) * 4) == 1) {
            heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 4) >>> 0);
            heap.setU32(0x0062d3f6, (pbVar14) >>> 0);
          }
          if (heap.u32(pbVar14 + (4) * 4) == 0) {
            if (heap.u32((unaff_ESI + 0x2e)) == '\0') {
              if (heap.u32((unaff_ESI + 0x2b)) == '\x06') {
                heap.setU32((unaff_ESI + 0x2c), (0xb) >>> 0);
                heap.setU32((unaff_ESI + 0x70), (heap.u32(0x006293d8)) >>> 0);
                return uVar13;
              }
              if (heap.u32(pbVar14 + (7) * 4) != heap.u32((unaff_ESI + 0x79))) {
                heap.setU32((unaff_ESI + 0xf4), (0) >>> 0);
                bVar17 = false;
                uStack_4 = 0x43ce95;
                FUN_0043e304(heap);
                bVar10 = extraout_DX;
                if (bVar17) {
                  heap.setU32((unaff_ESI + 0x70), (heap.u32(0x006293d8)) >>> 0);
                  heap.setU32((unaff_ESI + 0x79), (bVar10) >>> 0);
                  iVar16 = bVar10 * 0x260;
                  bVar10 = (extraout_DX >>> 8);
                  LOCK();
                  uVar6 = heap.u32((__addr_DAT_00887472 + bVar10 * 2 + iVar16));
                  heap.setU32((__addr_DAT_00887472 + bVar10 * 2 + iVar16), (heap.u32((unaff_ESI + 10))) >>> 0);
                  UNLOCK();
                  heap.setU32(((__addr_DAT_0088747a) + (iVar16 + bVar10) * 4), (heap.u32((__addr_DAT_0088747a) + (iVar16 + bVar10) * 4) + '\x01') >>> 0);
                  heap.setU32((unaff_ESI + 0x74), (uVar6) >>> 0);
                  uStack_4 = 0x43ced3;
                  FUN_0044142c(heap);
                  heap.setU32((unaff_ESI + 0x68), (extraout_DL) >>> 0);
                  heap.setU32((unaff_ESI + 0x69), (bVar10) >>> 0);
                  heap.setU32((unaff_ESI + 0x2b), (6) >>> 0);
                  heap.setU32((unaff_ESI + 0xf5), (0) >>> 0);
                  uStack_4 = 0x43cee9;
                  uVar18 = FUN_00441452(heap);
                  uStack_4 = uVar18;
                  heap.setU32((unaff_ESI + 0x2c), (0xb) >>> 0);
                  heap.setU32((unaff_ESI + 0x7a), (0) >>> 0);
                  if ((heap.u32((unaff_ESI + 200)) & 8) != 0) {
                    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                    unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
                    uVar13 = (uVar18 >>> 0x20) & 0xff;
                    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                    heap.setU32(0x00971e8e, (heap.u32((__addr_DAT_00887444) + (uVar13 * 0x98) * 4)) >>> 0);
                    FUN_0042c711(heap, iVar16, unaff_ESI, unaff_EBP & 0xffff0000);
                  }
                  return uStack_4;
                }
                heap.setU32((unaff_ESI + 0x79), (bVar10) >>> 0);
              }
              /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
            }
          } else {
            if (heap.u32(pbVar14 + (4) * 4) == 2) {
            if ((heap.u32((unaff_ESI + 0x2e)) != '\0') || ((heap.u32(pbVar14 + (5) * 4) & 0xf) != 0)) {
              /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
            }
            if ((heap.u32(pbVar14) & 3) != heap.u32((unaff_ESI + 0x78))) {
              if ((((heap.u32(pbVar14) & 3 ^ 2) == heap.u32((unaff_ESI + 0x78))) && (heap.u32((unaff_ESI + 0x2b)) == '\x05')) && (((heap.u32((unaff_ESI + 200)) & 1) != 0 || ((heap.u32(0x0087c3bc) & 1) == 0)))) {
                sVar1 = heap.u32((__addr_DAT_0065247a) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4);
                heap.setU32((unaff_ESI + 0x32), (heap.u32((unaff_ESI + 0x32)) + heap.u32((__addr_DAT_00652478) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) >>> 0);
                heap.setU32((unaff_ESI + 0x34), (heap.u32((unaff_ESI + 0x34)) + sVar1) >>> 0);
                heap.setU32((unaff_ESI + 0x36), (9) >>> 0);
                uStack_4 = 0x43ce01;
                FUN_005e53ca(heap);
                uStack_4 = 0x43ce06;
                FUN_00444927(heap);
                uStack_4 = 0x43ce0b;
                FUN_005e53ca(heap);
                uStack_4 = 0x43ce10;
                FUN_0044142c(heap);
                heap.setU32((unaff_ESI + 0x2b), (0xe) >>> 0);
                uStack_4 = 0x43ce19;
                uStack_4 = FUN_00441452(heap);
                heap.setU32((unaff_ESI + 0x37), (0) >>> 0);
                if ((heap.u32((unaff_ESI + 200)) & 8) != 0) {
                  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043c751"); })();
                  unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
                  FUN_0042c711(heap, pbVar14, unaff_ESI, unaff_EBP);
                }
                return uStack_4;
              }
              /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
            }
            if (heap.u32((unaff_ESI + 0x2b)) != '\r') {
              /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
            }
            if ((heap.u32(0x0087c3bc) & 1) == 0) {
              /* goto LAB_0043ccb4 */ throw new Error("goto LAB_0043ccb4 not supported");
            }
            uVar2 = (heap.u32(0x0087c3c4) + heap.u32((__addr_DAT_0065247a) + (heap.u32(0x0087c3c8) * 2) * 4)) * 0x80 | (heap.u32(0x0087c3c4) + heap.u32((__addr_DAT_0065247a) + (heap.u32(0x0087c3c8) * 2) * 4)) >>> 9 | heap.u32(0x0087c3c2) + heap.u32((__addr_DAT_00652478) + (heap.u32(0x0087c3c8) * 2) * 4);
            pbVar14 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4);
            /* goto LAB_0043cc63 */ throw new Error("goto LAB_0043cc63 not supported");
          }
          }
          heap.setU32((unaff_ESI + 0x79), (0xff) >>> 0);
          /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
        }
      }
      pbVar20 = pbVar14 + 1;
      pbVar14 = pbVar14 + 8;
    } while ((heap.u32(pbVar20) & 0x80) == 0);
    uStack_4 = 0x43c96f;
    uVar19 = FUN_00423677(heap);
    uStack_4 = uVar19;
    uVar2 = (uVar19 >>> 0x20) - heap.u32((unaff_ESI + 0x12));
    if (uVar2 < 0) {
      uVar2 = -uVar2;
    }
    if ((uVar2 < 4) || ((heap.u32((unaff_ESI + 0x2e)) == '\x01' && (uVar2 < 0x21)))) {
      heap.setU32((unaff_ESI + 0x79), (0xff) >>> 0);
      heap.setU16((__addr_uStack_8 + 0), (extraout_CX) & 0xffff);
      if (heap.u32((unaff_ESI + 0x2b)) == '\x06') {
        uStack_4 = 0x43cf5a;
        FUN_0043e792(heap);
        uStack_4 = 0x43cf5f;
        FUN_0044142c(heap);
        heap.setU32((unaff_ESI + 0x2b), (1) >>> 0);
        uStack_4 = 0x43cf68;
        uStack_4 = FUN_00441452(heap);
        heap.setU16((__addr_uStack_8 + 0), (extraout_CX_00) & 0xffff);
      }
      bVar17 = false;
      FUN_00425432(heap);
      if (!bVar17) {
        uVar2 = uStack_4 & 0xffe0;
        pbVar14 = heap.u32((__addr_DAT_00971ef4) + ((((heap.u32(__addr_uStack_8) & 0xffe0) << 7 | heap.u32(__addr_uStack_8) >>> 9 | uVar2) >>> 5 | (heap.u32(__addr_uStack_8) >>> 9) << 0xb)) * 4);
        bVar10 = heap.u32(pbVar14);
        while ((bVar10 & 0x3c) != 0) {
          pbVar14 = pbVar14 + 8;
          bVar10 = heap.u32(pbVar14);
        }
        if ((heap.u32(pbVar14 + (5) * 4) & 0x1f) == 0) {
          heap.setU32((unaff_ESI + 0x24), (uVar2) >>> 0);
          heap.setU32((unaff_ESI + 0x26), (heap.u32(__addr_uStack_8) & 0xffe0) >>> 0);
          bVar10 = heap.u32(pbVar14 + (2) * 4);
          heap.setU32((unaff_ESI + 0x29), (8) >>> 0);
          heap.setU32((unaff_ESI + 0x28), (bVar10) >>> 0);
          /* goto LAB_0043c8b4 */ throw new Error("goto LAB_0043c8b4 not supported");
        }
      }
    }
  }
  LAB_0043c992: heap.setU32((unaff_ESI + 0x78), (heap.u32((unaff_ESI + 0x78)) ^ 2) >>> 0);
  uVar2 = (heap.u32((unaff_ESI + 0xe)) & 0xffe0) + 0x10;
  heap.setU32((unaff_ESI + 0x32), (uVar2) >>> 0);
  heap.setU32((unaff_ESI + 0x34), ((heap.u32((unaff_ESI + 0x10)) & 0xffe0) + 0x10) >>> 0);
  heap.setU32((unaff_ESI + 0x36), (5) >>> 0);
  return uVar2;
  LAB_0043cc63: do {
    if (((heap.u32(pbVar14) & 0x3c) == 4) && (heap.u32(pbVar14 + (4) * 4) >>> 4 != 0)) {
      if ((heap.u32(pbVar14 + (4) * 4) & 4) == 0) {
        bVar10 = heap.u32(pbVar14 + (2) * 4);
      } else {
        if ((heap.u32(pbVar14 + (4) * 4) & 3) == heap.u32(0x0087c3c8)) {
        bVar10 = heap.u32(pbVar14 + (2) * 4);
      } else {
        if ((heap.u32(pbVar14 + (4) * 4) & 3 ^ 2) != heap.u32(0x0087c3c8)) {
          /* goto LAB_0043cca7 */ throw new Error("goto LAB_0043cca7 not supported");
        }
        bVar10 = heap.u32(pbVar14 + (2) * 4) + 4;
      }
      }
      if ((heap.u32(0x0087c3c6) >>> 2) == bVar10) {
        uStack_4 = uVar15;
        if (heap.u32(0x0087c3c0) != 0) {
          uVar13 = heap.u32(0x0087c3c0);
          if ((heap.u32((unaff_ESI + 0xca)) & 0x4000) != 0) {
            if (heap.u32((unaff_ESI + 0xf0)) == '\x02') {
              uVar13 = (heap.u32(0x0087c3c0) >>> 1);
              heap.setU32((unaff_ESI + 0xca), (heap.u32((unaff_ESI + 0xca)) & 0xbfff) >>> 0);
              heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 8) >>> 0);
            }
            if (heap.u32((unaff_ESI + 0xf0)) == '\0') {
              uVar13 = 0;
              heap.setU32((unaff_ESI + 0xca), (heap.u32((unaff_ESI + 0xca)) & 0xbfff) >>> 0);
              heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 8) >>> 0);
            }
          }
          if (heap.u32((unaff_ESI + 0xa0)) < uVar13) {
            /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
          }
          heap.setU32(0x0087d720, (heap.u32(0x0087d720) + uVar13) >>> 0);
          heap.setU32(0x0099c167, (0x10) >>> 0);
          heap.setU32(0x006293b0, (0xe4) >>> 0);
          heap.setU32(__addr_uStack_8, (0x43cd44) >>> 0);
          uVar13 = FUN_004405f3(heap);
          heap.setU32((unaff_ESI + 200), (heap.u32((unaff_ESI + 200)) | 0x20) >>> 0);
        }
        heap.setU32(0x0087d71c, (heap.u32(0x0087d71c) + 1) >>> 0);
        heap.setU32(__addr_uStack_8, (uStack_4) >>> 0);
        uStack_4 = uVar13;
        FUN_005e5301(heap);
        heap.setU32((unaff_ESI + 0x37), (1) >>> 0);
        sVar1 = heap.u32((__addr_DAT_0065247a) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4);
        heap.setU32((unaff_ESI + 0x32), (heap.u32((unaff_ESI + 0x32)) + heap.u32((__addr_DAT_00652478) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) >>> 0);
        heap.setU32((unaff_ESI + 0x34), (heap.u32((unaff_ESI + 0x34)) + sVar1) >>> 0);
        heap.setU32((unaff_ESI + 0x36), (7) >>> 0);
        uStack_4 = 0x43cd9b;
        FUN_005e53ca(heap);
        uStack_4 = 0x43cda0;
        FUN_00444927(heap);
        uStack_4 = 0x43cda5;
        uVar13 = FUN_005e53ca(heap);
        return uVar13;
      }
    }
    LAB_0043cca7: pbVar20 = pbVar14 + 1;
    pbVar14 = pbVar14 + 8;
    heap.setU32(__addr_uStack_8, (uVar15) >>> 0);
  } while ((heap.u32(pbVar20) & 0x80) == 0);
  LAB_0043ccb4: heap.setU32((unaff_ESI + 0x2b), (0xe) >>> 0);
  heap.setU32((unaff_ESI + 0x37), (1) >>> 0);
  heap.setU32(0x0087c81e, (heap.u32(0x0087c81e) + -1) >>> 0);
  uStack_4 = 0x43ccc8;
  FUN_00441452(heap);
  /* goto LAB_0043c992 */ throw new Error("goto LAB_0043c992 not supported");
} finally {
    heap.freeFrame(108);
  }
}

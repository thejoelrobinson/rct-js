// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dbeeb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31, CONCAT44 } from "../runtime/win32.js";
import { FUN_004364c2 } from "./4364c2.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d849e } from "./5d849e.js";
import { FUN_005d8623 } from "./5d8623.js";
import { FUN_005d870c } from "./5d870c.js";
import { FUN_005d9220 } from "./5d9220.js";
import { FUN_005dcd40 } from "./5dcd40.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dbeeb(heap) {
  const __sp = heap.allocFrame(112);
  const __addr_DAT_005f7104 = __sp + 0;
  const __addr_DAT_0065dc70 = __sp + 4;
  const __addr_DAT_008874a0 = __sp + 8;
  const __addr_DAT_00743b94 = __sp + 12;
  const __addr_DAT_00887422 = __sp + 16;
  const __addr_DAT_0088755c = __sp + 20;
  const __addr_DAT_0088755d = __sp + 24;
  const __addr_DAT_00887420 = __sp + 28;
  const __addr_DAT_005f5b7f = __sp + 32;
  const __addr_PTR_PTR_0067af10 = __sp + 36;
  const __addr_stack0x00000000 = __sp + 40;
  const __addr_DAT_005f5d02 = __sp + 44;
  const __addr_DAT_00743b95 = __sp + 48;
  const __addr_DAT_00743bd4 = __sp + 52;
  const __addr_DAT_00743bbc = __sp + 56;
  const __addr_DAT_00971ef4 = __sp + 60;
  const __addr_DAT_006545b4 = __sp + 64;
  const __addr_DAT_006545b2 = __sp + 68;
  const __addr_DAT_006545b5 = __sp + 72;
  const __addr_DAT_006545b3 = __sp + 76;
  const __addr_DAT_0088750c = __sp + 80;
  const __addr_DAT_0088750f = __sp + 84;
  const __addr_DAT_0088750a = __sp + 88;
  const __addr_DAT_0088750e = __sp + 92;
  const __addr_DAT_00652309 = __sp + 96;
  const __addr_DAT_006559d8 = __sp + 100;
  const __addr_DAT_0088744a = __sp + 104;
  const __addr_DAT_00887453 = __sp + 108;
  try {
  let sVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let extraout_var = 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_var_00 = 0;
  let extraout_var_01 = 0;
  let cVar13 = 0;
  let sVar14 = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let extraout_EDX_01 = 0;
  let extraout_EDX_02 = 0;
  let iVar15 = 0;
  let iVar16 = 0;
  let uVar17 = 0;
  let uVar19 = 0;
  let bVar22 = 0;
  let uVar23 = 0;
  let uVar8 = 0;
  bVar10 = heap.u32(unaff_ESI + (0x31) * 4);
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU32(0x0065dc2c, (unaff_ESI) >>> 0);
  if (((heap.u32((__addr_DAT_005f7104 + bVar10 * 8)) & 0x800) != 0) && ((heap.u32((unaff_ESI + 0x36)) >>> 2 < 0x44 || (0x56 < heap.u32((unaff_ESI + 0x36)) >>> 2)))) {
    sVar3 = FUN_005d9220(heap);
    if (heap.u32((__addr_DAT_0065dc70 + heap.u32(unaff_ESI + (0x1f) * 4) * 4)) < 0) {
      if (-0x23 < sVar3) {
        /* goto LAB_005dbf4d */ throw new Error("goto LAB_005dbf4d not supported");
      }
    } else {
      if (-0x46 < sVar3) {
      /* goto LAB_005dbf4d */ throw new Error("goto LAB_005dbf4d not supported");
    }
    }
    if (heap.u32(unaff_ESI + (0x1f) * 4) != '\b') {
      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x40) >>> 0);
    }
  }
  LAB_005dbf4d: if ((heap.u32((__addr_DAT_005f7104 + bVar10 * 8)) & 0x1000) != 0) {
    unaff_EBP = (heap.u32(unaff_ESI + (0x30) * 4) * 0x260);
    iVar6 = heap.u32((uint)(byte)(__addr_DAT_008874a0) + (unaff_EBP) * 4) << 0x10;
    if (heap.u32(0x0065e6b7) == '\0') {
      iVar6 = 0;
    }
    heap.u32((unaff_ESI + 0x28)) = iVar6;
    heap.u32((unaff_ESI + 0x2c)) = 0;
  }
  heap.setU32(0x0065dc30, (heap.u32((unaff_ESI + 0x2c)) + heap.u32((unaff_ESI + 0x28))) >>> 0);
  if ((heap.u32((unaff_ESI + 0x48)) & 0x80) != 0) {
    heap.setU32(0x0065dc30, (0) >>> 0);
  }
  if ((heap.u32((unaff_ESI + 0x48)) & 0x400) != 0) {
    heap.u32(unaff_ESI + (0xd2) * 4) = heap.u32(unaff_ESI + (0xd2) * 4) + -1;
    if (heap.u32(unaff_ESI + (0xd2) * 4) == -0x46) {
      heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) & 0xfbff;
    }
    if (-1 < heap.u32(unaff_ESI + (0xd2) * 4)) {
      heap.setU32(0x0065dc30, (0) >>> 0);
      heap.u32((unaff_ESI + 0x2c)) = 0;
    }
  }
  heap.u32((unaff_ESI + 0x28)) = heap.u32(0x0065dc30);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  heap.setU32(0x0065dc28, (unaff_ESI) >>> 0);
  if (heap.u32(0x0065dc30) < 0) {
    for (; heap.setU32(0x0065dc28, (unaff_ESI) >>> 0), heap.u32((unaff_ESI + 0x3e)) != 0xffff; unaff_ESI = __addr_DAT_00743b94 + (uint) * (unaff_ESI + 0x3e) * 0x100) {
    
    }
  }
  LAB_005dbffb: uVar19 = heap.u32(unaff_ESI + (0x31) * 4);
  if ((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 2) != 0) {
    FUN_005d870c(heap);
  }
  if ((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 4) != 0) {
    FUN_005d8623(heap);
  }
  if ((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 0x180) != 0) {
    FUN_005d849e(heap);
  }
  uVar19 = heap.u32(unaff_ESI + (0x1f) * 4);
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.u32((unaff_ESI + 0x2c)) = heap.u32((__addr_DAT_0065dc70 + uVar19 * 4));
  iVar6 = heap.u32(0x0065dc34) + heap.u32((unaff_ESI + 0x24));
  heap.u32((unaff_ESI + 0x24)) = iVar6;
  if (iVar6 < 0) {
    heap.u32((unaff_ESI + 0xb8)) = heap.u32((unaff_ESI + 0xb8)) & 0xfffd;
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u32((unaff_ESI + 0x12))) >>> 0);
    FUN_005e53ca(heap);
    /* goto LAB_005dc62d */ throw new Error("goto LAB_005dc62d not supported");
  }
  if (0x3689 < iVar6) {
    heap.u32((unaff_ESI + 0xb8)) = heap.u32((unaff_ESI + 0xb8)) & 0xfffd;
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u32((unaff_ESI + 0x12))) >>> 0);
    uVar23 = FUN_005e53ca(heap);
    do {
      uVar7 = (undefined4)(uVar23 >>> 0x20);
      iVar6 = uVar23;
      uVar11 = heap.u32((unaff_ESI + 0x36)) >>> 2;
      if (((uVar11 == 99) && (((iVar6 = heap.u32(unaff_ESI + (0x30) * 4) * 0x260, (heap.u32((__addr_DAT_00887422) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x130) * 4) & 0x80) == 0 || (heap.u32((__addr_DAT_0088755c) + (iVar6) * 4) != '\x06')) || (heap.u32((__addr_DAT_0088755d) + (iVar6) * 4) == '\x04')))) && (iVar6 = heap.u32(unaff_ESI + (0xcf) * 4) * 0x10000, iVar6 < heap.u32(0x0065dc30))) {
        iVar6 = heap.u32(0x0065dc30) * -0x10;
        heap.u32((unaff_ESI + 0x2c)) = iVar6;
      }
      if (((uVar11 == 0) && (iVar6 = heap.u32(unaff_ESI + (0x30) * 4) * 0x260, heap.u32((__addr_DAT_00887420) + (iVar6) * 4) == '*')) || ((uVar11 == 100 && (iVar6 = heap.u32(unaff_ESI + (0xcf) * 4) * 0x10000, heap.u32(0x0065dc30) < iVar6)))) {
        iVar6 = heap.u32((uint)(byte)(__addr_DAT_005f5b7f) + (heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x260) * 4) * 8) * 4) << 0x10;
        heap.u32((unaff_ESI + 0x2c)) = iVar6;
      }
      if (((uVar11 == 0x84) && (heap.u32(unaff_ESI + (1) * 4) == '\0')) && (((heap.u32((unaff_ESI + 0x48)) & 0x400) == 0 && (7 < heap.u32((unaff_ESI + 0x34)))))) {
        iVar6 = heap.u32(0x0065dc30) * -0x10;
        heap.u32((unaff_ESI + 0x2c)) = iVar6;
        if (0x17 < heap.u32((unaff_ESI + 0x34))) {
          heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 0x400;
          heap.u32(unaff_ESI + (0xd2) * 4) = 0x5a;
        }
      }
      uVar9 = CONCAT22(heap, (iVar6 >>> 0x10), heap.u32((unaff_ESI + 0x34)) + 1U);
      puVar12 = heap.u32((__addr_PTR_PTR_0067af10) + (heap.u32(unaff_ESI + (0xcd) * 4)) * 4);
      pbVar20 = heap.u32((puVar12 + (uint) * (unaff_ESI + 0x36) * 4));
      if ((ushort)(heap.u32((unaff_ESI + 0x34)) + 1U) < heap.u32((pbVar20 + -2))) {
        LAB_005dc3b6: heap.u32((unaff_ESI + 0x34)) = uVar9;
        if ((((heap.u32(unaff_ESI + (0x31) * 4) == ',') || (heap.u32(unaff_ESI + (0x31) * 4) == '-')) && (uVar8 = CONCAT22(heap, (uVar19 >>> 0x10), heap.u32((unaff_ESI + 0x36)) >>> 2), heap.u32((unaff_ESI + 0x36)) >>> 2 == 0xf)) && (uVar9 == 0xc)) {
          FUN_00452fce(heap, uVar7, puVar12, uVar8, uVar9, pbVar20, unaff_ESI, unaff_EBP, __addr_stack0x00000000, uVar8, uVar7, puVar12);
        }
        if (((heap.u32(unaff_ESI + (1) * 4) == '\0') && (heap.u32((unaff_ESI + 0x36)) >>> 2 == 0x75)) && (uVar9 == 0x30)) {
          FUN_00452fce(heap, uVar7, puVar12, 0x75, uVar9, pbVar20, unaff_ESI, unaff_EBP, __addr_stack0x00000000, 0x75, uVar7, puVar12, uVar9);
        }
        psVar21 = ((uint) * (unaff_ESI + 0x34) * 10 + heap.u32((heap.u32((__addr_PTR_PTR_0067af10) + (heap.u32(unaff_ESI + (0xcd) * 4)) * 4) + (uint) * (unaff_ESI + 0x36) * 4)));
        sVar3 = heap.u32(psVar21 + (1) * 4);
        sVar5 = heap.u32(psVar21) + heap.u32((unaff_ESI + 0x38));
        uVar8 = CONCAT22(heap, (uVar9 >>> 0x10), sVar5);
        sVar14 = heap.u32(psVar21 + (2) * 4) + heap.u32((unaff_ESI + 0x3c)) + heap.u32((__addr_DAT_005f5d02) + (heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x260) * 4) * 8) * 4);
        uVar7 = CONCAT22(heap, (uVar7 >>> 0x10), sVar14);
        uVar19 = (uint)(sVar5 != heap.u32(0x0065dc48));
        if ((sVar3 + heap.u32((unaff_ESI + 0x3a))) != heap.u32(0x0065dc4a)) {
          uVar19 = uVar19 | 2;
        }
        if (sVar14 != heap.u32(0x0065dc4c)) {
          uVar19 = uVar19 | 4;
        }
        heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - heap.u32((uVar19 * 4 + 0x65dc50));
        heap.setU32(0x0065dc48, (CONCAT22(heap, sVar3 + heap.u32((unaff_ESI + 0x3a)), sVar5)) >>> 0);
        heap.setU32(0x0065dc4c, (sVar14) >>> 0);
        heap.u32(unaff_ESI + (0x1e) * 4) = heap.u32(psVar21 + (3) * 4);
        heap.u32(unaff_ESI + (0x20) * 4) = heap.u32(psVar21 + (4) * 4);
        bVar10 = heap.u32((psVar21 + 7));
        uVar19 = bVar10;
        heap.u32(unaff_ESI + (0x1f) * 4) = bVar10;
        unaff_EBP = heap.u32(unaff_ESI + (0x31) * 4);
        if (((heap.u32((__addr_DAT_005f7104 + unaff_EBP * 8)) & 0x200) != 0) && (bVar10 != 0)) {
          heap.u32(unaff_ESI + (0x4a) * 4) = 0;
          heap.u32((unaff_ESI + 0x4c)) = 0;
          heap.u32((unaff_ESI + 0x4e)) = 0;
        }
        uVar23 = CONCAT44(heap, uVar7, uVar8);
        if ((unaff_ESI == heap.u32(0x0065dc28)) && (bVar22 = false, uVar23 = CONCAT44(heap, uVar7, uVar8), -1 < heap.u32(0x0065dc30))) {
          unaff_EBP = (uint) * (unaff_ESI + 0x40);
          uVar23 = FUN_005dcd40(heap);
          if (bVar22) {
            heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.u32((unaff_ESI + 0x24)) + 1)) >>> 0);
            heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - (heap.u32((unaff_ESI + 0x24)) + 1);
            while (true) {
              iVar6 = unaff_EBP * 0x100;
              unaff_EBP = __addr_DAT_00743b94 + iVar6;
              if (heap.u32((__addr_DAT_00743b95) + (iVar6) * 4) == '\0') {
                break;
              }
              unaff_EBP = (uint) * (__addr_DAT_00743bd4 + iVar6);
            }
            uVar9 = heap.u32((unaff_ESI + 0x28)) - heap.u32((__addr_DAT_00743bbc + iVar6));
            if (uVar9 < 0) {
              uVar9 = -uVar9;
            }
            if ((0xe0000 < uVar9) && ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x40) == 0)) {
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x80) >>> 0);
            }
            if ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x4000) == 0) {
              iVar16 = heap.u32((unaff_ESI + 0x28));
              heap.u32((unaff_ESI + 0x28)) = heap.u32((__addr_DAT_00743bbc + iVar6)) >>> 1;
              heap.u32((__addr_DAT_00743bbc + iVar6)) = iVar16 >>> 1;
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 2) >>> 0);
            } else {
              heap.u32((unaff_ESI + 0x28)) = heap.u32((unaff_ESI + 0x28)) - (heap.u32((unaff_ESI + 0x28)) >>> 2);
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 2) >>> 0);
            }
            /* goto LAB_005dc98a */ throw new Error("goto LAB_005dc98a not supported");
          }
        }
      } else {
        uVar11 = heap.u32((unaff_ESI + 0x3a)) << 7 | heap.u32((unaff_ESI + 0x3a)) >>> 9 | heap.u32((unaff_ESI + 0x38));
        pbVar20 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar11 >>> 5 | uVar11 << 0xb)) * 4);
        uVar11 = heap.u32((unaff_ESI + 0x36)) >>> 2;
        uVar19 = CONCAT31(heap, (int3)(uVar19 >>> 8), heap.u32((__addr_DAT_006545b4) + (uVar11 * 8) * 4));
        heap.setU32(0x0065e6b9, (CONCAT11(heap, heap.u32((__addr_DAT_006545b4) + (uVar11 * 8) * 4), heap.u32((__addr_DAT_006545b2) + (uVar11 * 8) * 4))) >>> 0);
        for (; (((uVar19 = CONCAT31(heap, (int3)(uVar19 >>> 8), heap.u32(pbVar20)) & 0xffffff3c, uVar19 != '\b' || ((byte)(heap.u32((unaff_ESI + 0x3c)) >>> 2) != heap.u32(pbVar20 + (2) * 4))) || ((heap.u32(pbVar20 + (5) * 4) & 0xf) != 0)) || (uVar11 != heap.u32(pbVar20 + (4) * 4))); pbVar20 = pbVar20 + 8) {
        
        }
        bVar22 = true;
        if (heap.u32(unaff_ESI + (0xcd) * 4) < 2) {
          LAB_005dc259: uVar23 = FUN_005cfac7(heap);
          if ((!bVar22) && (uVar11 = extraout_CX, CONCAT11(heap, heap.u32((__addr_DAT_006545b5) + (heap.u32(pbVar20 + (4) * 4) * 8) * 4), heap.u32((__addr_DAT_006545b3) + (heap.u32(pbVar20 + (4) * 4) * 8) * 4)) == heap.u32(0x0065e6b9))) {
            LAB_005dc28d: uVar7 = uVar23;
            heap.u32((unaff_ESI + 0x38)) = uVar23;
            heap.u32((unaff_ESI + 0x3a)) = uVar11;
            heap.u32((unaff_ESI + 0x3c)) = (uVar23 >>> 0x20);
            unaff_EBP = heap.u32(unaff_ESI + (0x31) * 4);
            if ((((heap.u32((__addr_DAT_005f7104 + unaff_EBP * 8)) & 0x4000) != 0) && (heap.u32(unaff_ESI + (0xcd) * 4) < 7)) && ((heap.u32(pbVar20 + (4) * 4) == 0 || ((unaff_EBP = (heap.u32(unaff_ESI + (0x30) * 4) * 0x260), (heap.u32((__addr_DAT_00887422) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x130) * 4) & 0x10) != 0 && (((heap.u32(pbVar20 + (4) * 4) == 3 || (heap.u32(pbVar20 + (4) * 4) == 2)) || (heap.u32(pbVar20 + (4) * 4) == 1)))))))) {
              uVar17 = (undefined2)(unaff_EBP >>> 0x10);
              unaff_EBP = CONCAT22(heap, uVar17, 0x8000);
              puVar1 = (unaff_ESI + 0x48);
              uVar11 = heap.u32(puVar1);
              heap.u32(puVar1) = heap.u32(puVar1) & 0xffbf;
              if ((uVar11 >>> 6 & 1) == 0) {
                unaff_EBP = CONCAT22(heap, uVar17, 0xa3d);
              }
              uVar4 = FUN_005df40c(heap);
              uVar23 = CONCAT44(heap, extraout_EDX, uVar7);
              uVar11 = extraout_CX_00;
              if (uVar4 <= unaff_EBP) {
                heap.u32(unaff_ESI + (0xcd) * 4) = heap.u32(unaff_ESI + (0xcd) * 4) + '\x02';
                uVar23 = CONCAT44(heap, extraout_EDX, uVar7);
              }
            }
            if ((heap.u32(unaff_ESI + (0xcd) * 4) != '\0') && (heap.u32(unaff_ESI + (0xcd) * 4) < 5)) {
              sVar3 = CONCAT11(heap, (uVar11 >>> 5), (uVar23 >>> 5));
              uVar7 = CONCAT22(heap, (uVar23 >>> 0x10), sVar3);
              uVar11 = (ushort)(uVar23 >>> 0x20) >>> 2;
              uVar8 = CONCAT22(heap, (uVar23 >>> 0x30), uVar11);
              unaff_EBP = (heap.u32(unaff_ESI + (0x30) * 4) * 0x260);
              cVar13 = uVar11;
              if ((sVar3 == heap.u32((__addr_DAT_0088750c + unaff_EBP))) && (cVar13 == heap.u32((__addr_DAT_0088750f) + (unaff_EBP) * 4))) {
                heap.u32(unaff_ESI + (0xcd) * 4) = 3;
                uVar23 = CONCAT44(heap, uVar8, uVar7);
              } else {
                uVar23 = CONCAT44(heap, uVar8, uVar7);
                if ((sVar3 == heap.u32((__addr_DAT_0088750a + unaff_EBP))) && (uVar23 = CONCAT44(heap, uVar8, uVar7), cVar13 == heap.u32((__addr_DAT_0088750e) + (unaff_EBP) * 4))) {
                  heap.u32(unaff_ESI + (0xcd) * 4) = 4;
                  uVar23 = CONCAT44(heap, uVar8, uVar7);
                }
              }
            }
            uVar7 = (undefined4)(uVar23 >>> 0x20);
            heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) & 0xfffe;
            if ((heap.u32(pbVar20) & 0x80) != 0) {
              heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 1;
            }
            uVar19 = uVar19 & 0xffffff03;
            uVar9 = CONCAT31(heap, (int3)(CONCAT22(heap, (uVar23 >>> 0x10), heap.u32(pbVar20 + (4) * 4) << 2) >>> 8), (byte)(heap.u32(pbVar20 + (4) * 4) << 2) | uVar19);
            heap.u32((unaff_ESI + 0x36)) = uVar9;
            bVar10 = (heap.u32(pbVar20 + (5) * 4) >>> 4) << 1;
            puVar12 = bVar10;
            heap.u32(unaff_ESI + (0xcf) * 4) = bVar10;
            if (heap.u32(pbVar20 + (4) * 4) == 0x72) {
              heap.u32(pbVar20 + (5) * 4) = heap.u32(pbVar20 + (5) * 4) & 0xf;
              heap.u32(pbVar20 + (5) * 4) = heap.u32(pbVar20 + (5) * 4) | 0x30;
              FUN_004364c2(heap, uVar7, puVar12);
            }
            uVar9 = uVar9 & 0xffff0000;
            /* goto LAB_005dc3b6 */ throw new Error("goto LAB_005dc3b6 not supported");
          }
        } else {
          if (heap.u32(unaff_ESI + (0xcd) * 4) == '\a') {
            heap.u32(unaff_ESI + (0xcd) * 4) = 6;
            bVar22 = false;
            /* goto LAB_005dc259 */ throw new Error("goto LAB_005dc259 not supported");
          }
          if (heap.u32(unaff_ESI + (0xcd) * 4) == '\b') {
            heap.u32(unaff_ESI + (0xcd) * 4) = 5;
            bVar22 = false;
            /* goto LAB_005dc259 */ throw new Error("goto LAB_005dc259 not supported");
          }
          bVar10 = heap.u32(unaff_ESI + (0xcd) * 4);
          bVar22 = bVar10 < 4;
          if (4 < bVar10) {
            /* goto LAB_005dc259 */ throw new Error("goto LAB_005dc259 not supported");
          }
          if (bVar10 == 4) {
            heap.u32(unaff_ESI + (0xcd) * 4) = 1;
            /* goto LAB_005dc259 */ throw new Error("goto LAB_005dc259 not supported");
          }
          heap.u32(unaff_ESI + (0xcd) * 4) = 2;
          uVar23 = FUN_005cfc50(heap);
          if (!bVar22) {
            uVar19 = CONCAT31(heap, (int3)(uVar19 >>> 8), (uVar19 >>> 8));
            uVar23 = CONCAT44(heap, (uVar23 >>> 0x20), uVar23 >>> 0x10);
            uVar11 = extraout_var_00;
            /* goto LAB_005dc28d */ throw new Error("goto LAB_005dc28d not supported");
          }
        }
        heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x20) >>> 0);
        heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.u32((unaff_ESI + 0x24)) + 1)) >>> 0);
        heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - (heap.u32((unaff_ESI + 0x24)) + 1);
        uVar19 = heap.u32(unaff_ESI + (0x1f) * 4);
        LAB_005dc98a: do {
          do {
            if (-1 < heap.u32((unaff_ESI + 0x24))) {
              /* goto LAB_005dca55 */ throw new Error("goto LAB_005dca55 not supported");
            }
            uVar19 = heap.u32((__addr_DAT_0065dc70 + uVar19 * 4));
            heap.u32((unaff_ESI + 0x2c)) = heap.u32((unaff_ESI + 0x2c)) + uVar19;
            heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
            LAB_005dc62d: if (((heap.u32((unaff_ESI + 0x36)) >>> 2 == 0) && (heap.u32((__addr_DAT_00887420) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x260) * 4) == '*')) && (heap.u32(0x0065dc30) < -0x7ffff)) {
              heap.u32((unaff_ESI + 0x2c)) = heap.u32(0x0065dc30) * -2;
            }
            if ((heap.u32((unaff_ESI + 0x36)) >>> 2 == 99) && (-heap.u32(0x0065dc30) != heap.u32(unaff_ESI + (0xcf) * 4) * 0x10000 && heap.u32(0x0065dc30) <= (heap.u32(unaff_ESI + (0xcf) * 4) * -0x10000))) {
              heap.u32((unaff_ESI + 0x2c)) = heap.u32(0x0065dc30) * -0x10;
            }
            sVar3 = heap.u32((unaff_ESI + 0x34)) + -1;
            if (sVar3 == -1) {
              uVar11 = heap.u32((unaff_ESI + 0x3a)) << 7 | heap.u32((unaff_ESI + 0x3a)) >>> 9 | heap.u32((unaff_ESI + 0x38));
              pbVar20 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar11 >>> 5 | uVar11 << 0xb)) * 4);
              uVar11 = heap.u32((unaff_ESI + 0x36)) >>> 2;
              uVar19 = CONCAT31(heap, (int3)(uVar19 >>> 8), heap.u32((__addr_DAT_006545b5) + (uVar11 * 8) * 4));
              heap.setU32(0x0065e6b9, (CONCAT11(heap, heap.u32((__addr_DAT_006545b5) + (uVar11 * 8) * 4), heap.u32((__addr_DAT_006545b3) + (uVar11 * 8) * 4))) >>> 0);
              for (; ((uVar19 = CONCAT31(heap, (int3)(uVar19 >>> 8), heap.u32(pbVar20)) & 0xffffff3c, uVar19 != '\b' || ((byte)(heap.u32((unaff_ESI + 0x3c)) >>> 2) != heap.u32(pbVar20 + (2) * 4))) || (((heap.u32(pbVar20 + (5) * 4) & 0xf) != 0 || (uVar11 != heap.u32(pbVar20 + (4) * 4))))); pbVar20 = pbVar20 + 8) {
              
              }
              bVar22 = true;
              if (heap.u32(unaff_ESI + (0xcd) * 4) < 2) {
                LAB_005dc76d: FUN_005cfc50(heap);
                uVar7 = extraout_EDX_01;
                if ((!bVar22) && (uVar11 = extraout_var, uVar4 = extraout_var_01, CONCAT11(heap, heap.u32((__addr_DAT_006545b4) + (heap.u32(pbVar20 + (4) * 4) * 8) * 4), heap.u32((__addr_DAT_006545b2) + (heap.u32(pbVar20 + (4) * 4) * 8) * 4)) == heap.u32(0x0065e6b9))) {
                  LAB_005dc7a7: heap.u32((unaff_ESI + 0x38)) = uVar11;
                  heap.u32((unaff_ESI + 0x3a)) = uVar4;
                  heap.u32((unaff_ESI + 0x3c)) = uVar7;
                  if ((heap.u32(unaff_ESI + (0xcd) * 4) != '\0') && (heap.u32(unaff_ESI + (0xcd) * 4) < 5)) {
                    sVar3 = CONCAT11(heap, (uVar4 >>> 5), (uVar11 >>> 5));
                    iVar6 = heap.u32(unaff_ESI + (0x30) * 4) * 0x260;
                    cVar13 = (uVar7 >>> 2);
                    if ((sVar3 == heap.u32((__addr_DAT_0088750c + iVar6))) && (cVar13 == heap.u32((__addr_DAT_0088750f) + (iVar6) * 4))) {
                      heap.u32(unaff_ESI + (0xcd) * 4) = 3;
                    } else {
                      if ((sVar3 == heap.u32((__addr_DAT_0088750a + iVar6))) && (cVar13 == heap.u32((__addr_DAT_0088750e) + (iVar6) * 4))) {
                      heap.u32(unaff_ESI + (0xcd) * 4) = 4;
                    }
                    }
                  }
                  if ((heap.u32(pbVar20) & 0x80) == 0) {
                    puVar1 = (unaff_ESI + 0x48);
                    uVar11 = heap.u32(puVar1);
                    heap.u32(puVar1) = heap.u32(puVar1) & 0xfffe;
                    if ((((uVar11 & 1) != 0) && (heap.u32((unaff_ESI + 0x3e)) == -1)) && (heap.u32(0x0065dc30) < 0)) {
                      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x100) >>> 0);
                    }
                  } else {
                    if (((heap.u32(0x0065dc30) < 0) && (heap.u32((unaff_ESI + 0x3e)) == -1)) && ((heap.u32((__addr_DAT_00652309 + heap.u32(pbVar20 + (4) * 4) * 2)) & 0x20) == 0)) {
                      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x200) >>> 0);
                    }
                    heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 1;
                  }
                  iVar6 = CONCAT31(heap, (int3)((heap.u32(pbVar20 + (4) * 4) << 2) >>> 8), (byte)(heap.u32(pbVar20 + (4) * 4) << 2) | (byte)(uVar19 >>> 8) & 3);
                  heap.u32((unaff_ESI + 0x36)) = iVar6;
                  heap.u32(unaff_ESI + (0xcf) * 4) = (heap.u32(pbVar20 + (5) * 4) >>> 4) << 1;
                  sVar3 = heap.u32((heap.u32((heap.u32((__addr_PTR_PTR_0067af10) + (heap.u32(unaff_ESI + (0xcd) * 4)) * 4) + iVar6 * 4)) + -2)) + -1;
                  /* goto LAB_005dc89e */ throw new Error("goto LAB_005dc89e not supported");
                }
              } else {
                if (heap.u32(unaff_ESI + (0xcd) * 4) == '\a') {
                  heap.u32(unaff_ESI + (0xcd) * 4) = 5;
                  bVar22 = false;
                  /* goto LAB_005dc76d */ throw new Error("goto LAB_005dc76d not supported");
                }
                if (heap.u32(unaff_ESI + (0xcd) * 4) == '\b') {
                  heap.u32(unaff_ESI + (0xcd) * 4) = 6;
                  bVar22 = false;
                  /* goto LAB_005dc76d */ throw new Error("goto LAB_005dc76d not supported");
                }
                bVar22 = heap.u32(unaff_ESI + (0xcd) * 4) < 5;
                if (!bVar22) {
                  /* goto LAB_005dc76d */ throw new Error("goto LAB_005dc76d not supported");
                }
                bVar22 = heap.u32(unaff_ESI + (0xcd) * 4) < 3;
                if (heap.u32(unaff_ESI + (0xcd) * 4) == 3) {
                  heap.u32(unaff_ESI + (0xcd) * 4) = 1;
                  bVar22 = false;
                  /* goto LAB_005dc76d */ throw new Error("goto LAB_005dc76d not supported");
                }
                heap.u32(unaff_ESI + (0xcd) * 4) = 2;
                uVar11 = FUN_005cfac7(heap);
                uVar7 = extraout_EDX_00;
                uVar4 = extraout_CX_01;
                if (!bVar22) {
                  /* goto LAB_005dc7a7 */ throw new Error("goto LAB_005dc7a7 not supported");
                }
              }
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x20) >>> 0);
              iVar6 = heap.u32((unaff_ESI + 0x24)) + -0x368a;
              uVar23 = CONCAT44(heap, uVar7, iVar6);
              heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - iVar6) >>> 0);
              heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - iVar6;
              uVar19 = heap.u32(unaff_ESI + (0x1f) * 4);
              /* goto LAB_005dc538 */ throw new Error("goto LAB_005dc538 not supported");
            }
            LAB_005dc89e: heap.u32((unaff_ESI + 0x34)) = sVar3;
            psVar21 = ((uint) * (unaff_ESI + 0x34) * 10 + heap.u32((heap.u32((__addr_PTR_PTR_0067af10) + (heap.u32(unaff_ESI + (0xcd) * 4)) * 4) + (uint) * (unaff_ESI + 0x36) * 4)));
            sVar3 = heap.u32(psVar21);
            sVar5 = heap.u32(psVar21 + (1) * 4);
            sVar14 = heap.u32(psVar21 + (2) * 4) + heap.u32((unaff_ESI + 0x3c)) + heap.u32((__addr_DAT_005f5d02) + (heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x260) * 4) * 8) * 4);
            uVar19 = (uint)((sVar3 + heap.u32((unaff_ESI + 0x38))) != heap.u32(0x0065dc48));
            if ((sVar5 + heap.u32((unaff_ESI + 0x3a))) != heap.u32(0x0065dc4a)) {
              uVar19 = uVar19 | 2;
            }
            if (sVar14 != heap.u32(0x0065dc4c)) {
              uVar19 = uVar19 | 4;
            }
            heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) + heap.u32((uVar19 * 4 + 0x65dc50));
            heap.setU32(0x0065dc48, (CONCAT22(heap, sVar5 + heap.u32((unaff_ESI + 0x3a)), sVar3 + heap.u32((unaff_ESI + 0x38)))) >>> 0);
            heap.setU32(0x0065dc4c, (sVar14) >>> 0);
            heap.u32(unaff_ESI + (0x1e) * 4) = heap.u32(psVar21 + (3) * 4);
            heap.u32(unaff_ESI + (0x20) * 4) = heap.u32(psVar21 + (4) * 4);
            bVar10 = heap.u32((psVar21 + 7));
            uVar19 = bVar10;
            heap.u32(unaff_ESI + (0x1f) * 4) = bVar10;
            unaff_EBP = heap.u32(unaff_ESI + (0x31) * 4);
            if (((heap.u32((__addr_DAT_005f7104 + unaff_EBP * 8)) & 0x200) != 0) && (bVar10 != 0)) {
              heap.u32(unaff_ESI + (0x4a) * 4) = 0;
              heap.u32((unaff_ESI + 0x4c)) = 0;
              heap.u32((unaff_ESI + 0x4e)) = 0;
            }
          } while ((unaff_ESI != heap.u32(0x0065dc28)) || (bVar22 = false, -1 < heap.u32(0x0065dc30)));
          unaff_EBP = (uint) * (unaff_ESI + 0x42);
          FUN_005dcd40(heap);
        } while (!bVar22);
        heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.u32((unaff_ESI + 0x24)) + -0x368a)) >>> 0);
        heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - (heap.u32((unaff_ESI + 0x24)) + -0x368a);
        iVar6 = unaff_EBP * 0x100;
        unaff_EBP = __addr_DAT_00743b94 + iVar6;
        uVar9 = heap.u32((heap.u32(0x0065dc2c) + 0x28)) - heap.u32((__addr_DAT_00743bbc + iVar6));
        if (uVar9 < 0) {
          uVar9 = -uVar9;
        }
        uVar23 = CONCAT44(heap, extraout_EDX_02, uVar9);
        if ((0xe0000 < uVar9) && ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x40) == 0)) {
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x80) >>> 0);
        }
        if ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x4000) == 0) {
          iVar16 = heap.u32((heap.u32(0x0065dc2c) + 0x28));
          uVar23 = CONCAT44(heap, extraout_EDX_02, heap.u32((__addr_DAT_00743bbc + iVar6)) >>> 1);
          heap.u32((heap.u32(0x0065dc2c) + 0x28)) = heap.u32((__addr_DAT_00743bbc + iVar6)) >>> 1;
          heap.u32((__addr_DAT_00743bbc + iVar6)) = iVar16 >>> 1;
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 4) >>> 0);
        } else {
          heap.u32((unaff_ESI + 0x28)) = heap.u32((unaff_ESI + 0x28)) - (heap.u32((unaff_ESI + 0x28)) >>> 2);
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 4) >>> 0);
        }
      }
      LAB_005dc538: if (heap.u32((unaff_ESI + 0x24)) < 0x368a) {
        /* goto LAB_005dca55 */ throw new Error("goto LAB_005dca55 not supported");
      }
      uVar19 = heap.u32((__addr_DAT_0065dc70 + uVar19 * 4));
      heap.u32((unaff_ESI + 0x2c)) = heap.u32((unaff_ESI + 0x2c)) + uVar19;
      heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    } while (true);
  }
  /* goto LAB_005dca73 */ throw new Error("goto LAB_005dca73 not supported");
  LAB_005dca55: FUN_00444927(heap);
  FUN_005e53ca(heap);
  LAB_005dca73: heap.u32((unaff_ESI + 0x2c)) = heap.u32((unaff_ESI + 0x2c)) / heap.u32(0x0065dc38);
  uVar19 = heap.u32(0x0065dc40);
  puVar2 = heap.u32(0x0065dc2c);
  if ((((heap.u32(unaff_ESI + (0xcd) * 4) != '\x02') && ((heap.u32((__addr_DAT_006559d8) + ((uint)(heap.u32((unaff_ESI + 0x36)) >>> 2) * 0x10) * 4) & 0x10) != 0)) && (heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 8) >>> 0), heap.u32((unaff_ESI + 0x36)) >>> 2 == 1)) && (unaff_ESI == heap.u32(0x0065dc2c))) {
    if (heap.u32(0x0065dc30) < 0) {
      if (heap.u32((unaff_ESI + 0x34)) < 0x17) {
        /* goto LAB_005dcb16 */ throw new Error("goto LAB_005dcb16 not supported");
      }
    } else {
      uVar11 = 0x11;
      if ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x1000) != 0) {
        uVar11 = 6;
      }
      if (((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x4000) != 0) && (uVar11 = 0x14, heap.u32(unaff_ESI + (0xcd) * 4) == '\x06')) {
        uVar11 = 0x12;
      }
      if (uVar11 < heap.u32((unaff_ESI + 0x34))) {
        LAB_005dcb16: heap.setU32(0x0065dc40, (uVar19 | 9) >>> 0);
        heap.setU32(0x0065dc44, (-1) >>> 0);
        do {
          do {
            iVar6 = heap.u32(0x0065dc44);
            heap.setU32(0x0065dc44, (iVar6 + 1) >>> 0);
          } while (CONCAT11(heap, (heap.u32((unaff_ESI + 0x3a)) >>> 5), (heap.u32((unaff_ESI + 0x38)) >>> 5)) != heap.u32((__addr_DAT_0088744a) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x130 + heap.u32(0x0065dc44)) * 4));
        } while ((heap.u32((unaff_ESI + 0x3c)) >>> 2) != heap.u32((__addr_DAT_00887453) + (heap.u32(unaff_ESI + (0x30) * 4) * 0x260 + iVar6) * 4));
      }
    }
  }
  if ((heap.u32((unaff_ESI + 0x48)) & 1) != 0) {
    heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x10) >>> 0);
  }
  if (heap.u32(0x0065dc30) < 0) {
    if (unaff_ESI == heap.u32(0x0065dc2c)) {
      /* goto LAB_005dcbad */ throw new Error("goto LAB_005dcbad not supported");
    }
    unaff_ESI = __addr_DAT_00743b94 + (uint) * (unaff_ESI + 0x40) * 0x100;
    /* goto LAB_005dbffb */ throw new Error("goto LAB_005dbffb not supported");
  }
  if (heap.u32((unaff_ESI + 0x3e)) != 0xffff) {
    unaff_ESI = __addr_DAT_00743b94 + (uint) * (unaff_ESI + 0x3e) * 0x100;
    /* goto LAB_005dbffb */ throw new Error("goto LAB_005dbffb not supported");
  }
  LAB_005dcbad: iVar6 = 0;
  uVar19 = 0;
  iVar16 = 0;
  puVar18 = heap.u32(0x0065dc2c);
  while (true) {
    iVar16 = iVar16 + 1;
    uVar19 = (uint)(ushort)(uVar19 + heap.u32((puVar18 + 0x46)));
    iVar6 = iVar6 + heap.u32((puVar18 + 0x2c));
    if (heap.u32((puVar18 + 0x3e)) == 0xffff) {
      break;
    }
    puVar18 = __addr_DAT_00743b94 + (uint) * (puVar18 + 0x3e) * 0x100;
  }
  iVar15 = heap.u32((heap.u32(0x0065dc2c) + 0x28)) >>> 8;
  iVar15 = iVar15 * iVar15;
  if (heap.u32((heap.u32(0x0065dc2c) + 0x28)) < 0) {
    iVar15 = -iVar15;
  }
  iVar6 = (((iVar6 / iVar16) * 0x15 >>> 9) - (heap.u32((heap.u32(0x0065dc2c) + 0x28)) >>> 0xc)) - (CONCAT44(heap, iVar15 >>> 0x1f, iVar15 >>> 4) / uVar19);
  if ((heap.u32((__addr_DAT_005f7104 + heap.u32(heap.u32(0x0065dc2c) + (0x31) * 4) * 8)) & 8) == 0) {
    /* goto LAB_005dcd0c */ throw new Error("goto LAB_005dcd0c not supported");
  }
  uVar9 = heap.u32(heap.u32(0x0065dc2c) + (0xc2) * 4);
  if (heap.u32((heap.u32(0x0065dc2c) + 0x36)) >>> 2 == 0x32) {
    if (heap.u32(heap.u32(0x0065dc2c) + (0xcd) * 4) != '\x05') {
      /* goto LAB_005dcc4c */ throw new Error("goto LAB_005dcc4c not supported");
    }
    LAB_005dcc5e: uVar9 = uVar9 >>> 1;
  } else {
    if (heap.u32((heap.u32(0x0065dc2c) + 0x36)) >>> 2 == 0x33) {
    if (heap.u32(heap.u32(0x0065dc2c) + (0xcd) * 4) == '\x06') {
      /* goto LAB_005dcc5e */ throw new Error("goto LAB_005dcc5e not supported");
    }
    LAB_005dcc4c: uVar9 = uVar9 - (uVar9 >>> 2);
  }
  }
  iVar16 = uVar9 * 0x4000;
  if ((heap.u32((heap.u32(0x0065dc2c) + 0x48)) & 8) != 0) {
    iVar16 = uVar9 * -0x4000;
  }
  iVar16 = ((iVar16 - heap.u32((heap.u32(0x0065dc2c) + 0x28))) * heap.u32(heap.u32(0x0065dc2c) + (0xc3) * 4) * 2) / (uVar9 * uVar19 >>> 2);
  uVar19 = heap.u32(heap.u32(0x0065dc2c) + (0x31) * 4);
  if ((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 0x2000) == 0) {
    LAB_005dccf7: uVar19 = heap.u32((puVar2 + 0x28));
    if (uVar19 < 0) {
      uVar19 = -uVar19;
    }
    if (uVar19 < 0x10001) {
      iVar6 = 0;
    }
  } else {
    if (iVar16 < 0) {
      iVar16 = iVar16 >>> 4;
    }
    if ((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 4) != 0) {
      sVar3 = heap.u32((heap.u32(0x0065dc2c) + 0xb6));
      if (0x200 < sVar3) {
        sVar3 = 0x200;
      }
      if (sVar3 < -0x200) {
        sVar3 = -0x200;
      }
      heap.u32((heap.u32(0x0065dc2c) + 0xb6)) = sVar3;
    }
    if (heap.u32(puVar2 + (0x1f) * 4) == '\0') {
      /* goto LAB_005dccf7 */ throw new Error("goto LAB_005dccf7 not supported");
    }
    if (iVar16 < 0) {
      iVar16 = 0;
    }
    if (((heap.u32((__addr_DAT_005f7104 + uVar19 * 8)) & 4) != 0) && (heap.u32(puVar2 + (0x1f) * 4) == '\x02')) {
      heap.u32((puVar2 + 0xb6)) = 0;
    }
  }
  iVar6 = iVar6 + iVar16;
  LAB_005dcd0c: if (((heap.u32((puVar2 + 0x36)) >>> 2 == 0x75) && (0x2f < heap.u32((puVar2 + 0x34)))) && (heap.u32((puVar2 + 0x34)) < 0x81)) {
    iVar6 = iVar6 - (heap.u32((puVar2 + 0x28)) >>> 6);
  }
  heap.u32((puVar2 + 0x2c)) = iVar6;
  return heap.u32(0x0065dc40);
} finally {
    heap.freeFrame(112);
  }
}

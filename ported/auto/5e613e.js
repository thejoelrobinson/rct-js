// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e613e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31, SCARRY2 } from "../../runtime/ghidra-builtins.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_0043fdfb } from "./43fdfb.js";
import { FUN_00440143 } from "./440143.js";
import { FUN_0044c219 } from "./44c219.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_005e613e(heap) {
  const __sp = heap.allocFrame(64);
  const __addr_DAT_00887497 = __sp + 0;
  const __addr_DAT_00887442 = __sp + 4;
  const __addr_DAT_00887444 = __sp + 8;
  const __addr_DAT_0088744a = __sp + 12;
  const __addr_DAT_00887462 = __sp + 16;
  const __addr_DAT_0088747a = __sp + 20;
  const __addr_DAT_00887420 = __sp + 24;
  const __addr_DAT_005f5806 = __sp + 28;
  const __addr_DAT_005f5802 = __sp + 32;
  const __addr_DAT_00743b94 = __sp + 36;
  const __addr_DAT_0088747e = __sp + 40;
  const __addr_DAT_00743b98 = __sp + 44;
  const __addr_DAT_00743baa = __sp + 48;
  const __addr_DAT_00743bae = __sp + 52;
  const __addr_DAT_00743bac = __sp + 56;
  const __addr_DAT_00743bb0 = __sp + 60;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_ECX = 0;
  let uVar8 = 0;
  let sVar9 = 0;
  let extraout_EDX = 0;
  let cVar12 = 0;
  let sVar13 = 0;
  let uVar14 = 0;
  let unaff_EBX = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let unaff_EBP = 0;
  let unaff_ESI = 0;
  let uVar17 = 0;
  let iVar18 = 0;
  let uVar19 = 0;
  heap.setU32(0x0099fdf0, (in_EAX) >>> 0);
  sVar13 = unaff_EBX;
  heap.setU32(0x0099fdf2, (sVar13) >>> 0);
  if ((heap.u32(0x0099a500) & 1) == 0) {
    uVar19 = FUN_00431510(heap);
    pbVar11 = (uVar19 >>> 0x20);
    uVar6 = uVar19;
    cVar12 = unaff_EBX;
    if (cVar12 == '\x03') {
      uVar8 = heap.u32(pbVar11 + (7) * 4);
      iVar16 = uVar8 * 0x260;
      if ((heap.u32(pbVar11) & 0x3c) == 0x10) {
        if (heap.u32(pbVar11 + (4) * 4) != 0) {
          heap.setU32(0x005f54f0, (0x56d) >>> 0);
          if (1 < heap.u32((byte)(__addr_DAT_00887497) + (iVar16) * 4)) {
            heap.setU32(0x005f54f0, (0x56e) >>> 0);
          }
          heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_00887442) + (uVar8 * 0x130) * 4)) >>> 0);
          heap.setU32(0x005f54f4, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar8 * 0x98) * 4)) >>> 0);
          heap.setU32(0x005f54f6, ((undefined2)(heap.u32((__addr_DAT_00887444) + (uVar8 * 0x98) * 4) >>> 0x10)) >>> 0);
          uVar5 = (heap.u32(pbVar11 + (5) * 4) & 0x70) >>> 4;
          uVar15 = uVar5;
          do {
            if (heap.u32((__addr_DAT_0088744a) + (uVar8 * 0x130 + uVar15) * 4) == -1) {
              uVar5 = uVar5 - 1;
            }
            uVar15 = uVar15 - 1;
          } while (-1 < uVar15);
          heap.setU32(0x005f54fa, (uVar5 + 1) >>> 0);
          return uVar6;
        }
        heap.setU32(0x005f54f2, (0x56b) >>> 0);
        if (1 < heap.u32((byte)(__addr_DAT_00887497) + (iVar16) * 4)) {
          heap.setU32(0x005f54f2, (0x56c) >>> 0);
        }
        heap.setU32(0x005f54f4, (heap.u32((__addr_DAT_00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f6, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f8, ((heap.u32((__addr_DAT_00887444) + (uVar8 * 0x98) * 4) >>> 0x10)) >>> 0);
        uVar4 = (heap.u32(pbVar11 + (5) * 4) & 0x70) >>> 4;
        uVar15 = uVar4;
        uVar5 = uVar4;
        do {
          if (heap.u32((__addr_DAT_0088744a) + (uVar8 * 0x130 + uVar5) * 4) == -1) {
            uVar15 = uVar15 - 1;
          }
          uVar5 = uVar5 - 1;
        } while (-1 < uVar5);
        heap.setU32(0x005f54fc, (uVar15 + 1) >>> 0);
        uVar17 = 0;
        if (heap.u32((__addr_DAT_00887462) + (uVar8 * 0x130 + uVar4) * 4) != -1) {
          uVar17 = heap.u32((byte)(__addr_DAT_0088747a) + (iVar16 + uVar4) * 4);
        }
        heap.setU32(0x005f5500, (CONCAT22(heap.u16(0x005f5500), uVar17)) >>> 0);
        heap.setU32(0x005f54fe, (0x4f3) >>> 0);
        if ((uVar17 != 0) && (heap.setU32(0x005f54fe, (0x4f4) >>> 0), uVar17 != 1)) {
          heap.setU32(0x005f54fe, (0x4f5) >>> 0);
        }
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      bVar1 = heap.u32(pbVar11 + (4) * 4);
      if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
        heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f4, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f6, ((undefined2)(heap.u32((__addr_DAT_00887444) + (uVar8 * 0x98) * 4) >>> 0x10)) >>> 0);
        uVar3 = FUN_0044c219(heap, pbVar11, extraout_ECX);
        heap.setU32(0x005f54f8, (sVar13) >>> 0);
        heap.setU32(0x005f54fa, (uVar3) >>> 0);
        heap.setU32(0x005f54fc, ((uVar3 >>> 0x10)) >>> 0);
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      heap.setU32(0x005f54f2, (0x569) >>> 0);
      if (1 < heap.u32((byte)(__addr_DAT_00887497) + (iVar16) * 4)) {
        heap.setU32(0x005f54f2, (0x56a) >>> 0);
      }
      heap.setU32(0x005f54f4, (heap.u32((__addr_DAT_00887442) + (uVar8 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f6, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar8 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f8, ((heap.u32((__addr_DAT_00887444) + (uVar8 * 0x98) * 4) >>> 0x10)) >>> 0);
      bVar1 = heap.u32((__addr_DAT_00887420) + (iVar16) * 4);
      heap.setU32(0x005f54fa, (heap.u32((__addr_DAT_005f5806 + bVar1 * 8)) + 2) >>> 0);
      uVar5 = (heap.u32(pbVar11 + (5) * 4) & 0x70) >>> 4;
      uVar15 = uVar5;
      do {
        if (heap.u32((__addr_DAT_0088744a) + (uVar8 * 0x130 + uVar15) * 4) == -1) {
          uVar5 = uVar5 - 1;
        }
        uVar15 = uVar15 - 1;
      } while (-1 < uVar15);
      heap.setU32(0x005f54fc, (uVar5 + 1) >>> 0);
      heap.setU32(0x005f5500, (FUN_0044c219(heap, pbVar11, extraout_ECX)) >>> 0);
      heap.setU32(0x005f54fe, (bVar1) >>> 0);
      heap.setU32(0x005f54f0, (0x7ee) >>> 0);
      return uVar6;
    }
    if (cVar12 == '\x02') {
      bVar1 = heap.u32(pbVar11);
      if (bVar1 == 0) {
        uVar8 = heap.u32(pbVar11 + (0x30) * 4);
        heap.setU32(0x005f54f2, (0x4c8) >>> 0);
        heap.setU32(0x005f54f4, (heap.u32((__addr_DAT_00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f6, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f8, ((heap.u32((__addr_DAT_00887444) + (uVar8 * 0x98) * 4) >>> 0x10)) >>> 0);
        heap.setU32(0x005f54fa, (heap.u32((__addr_DAT_005f5802 + heap.u32((byte)(__addr_DAT_00887420) + (uVar8 * 0x260) * 4) * 8)) + 2) >>> 0);
        for (pbVar10 = pbVar11; heap.u32(pbVar10 + (1) * 4) != 0; pbVar10 = __addr_DAT_00743b94 + heap.u32((pbVar10 + 0x40)) * 0x100) {
        
        }
        iVar16 = -1;
        do {
          iVar18 = iVar16;
          iVar16 = iVar18 + 1;
        } while (heap.u32((pbVar10 + 10)) != heap.u32((__addr_DAT_0088747e + iVar16 * 2 + uVar8 * 0x260)));
        sVar13 = iVar18 + 2;
        heap.setU32(0x005f54fc, (sVar13) >>> 0);
        heap.setU32(0x005f5500, (FUN_0044c219(heap, pbVar10, pbVar11, 0)) >>> 0);
        heap.setU32(0x005f54fe, (sVar13) >>> 0);
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      if (bVar1 == 1) {
        /* goto LAB_005e6524 */ throw new Error("goto LAB_005e6524 not supported");
      }
      if ((bVar1 == 2) && (heap.u32(pbVar11 + (1) * 4) == 8)) {
        return uVar6;
      }
    } else {
      if (cVar12 == '\b') {
      heap.setU32(0x005f54f0, (heap.u32(0x0087c3ac)) >>> 0);
      heap.setU32(0x005f54f2, (heap.u32(0x0087c3b0)) >>> 0);
      heap.setU32(0x005f54f4, ((undefined2)(heap.u32(0x0087c3b0) >>> 0x10)) >>> 0);
      return uVar6;
    }
    }
    iVar16 = unaff_ESI;
    in_EAX = FUN_005e3ace(heap);
    if (((unaff_ESI != 0) && (pbVar11 = heap.u32((unaff_ESI + 8)), pbVar11 != 0x0)) && (heap.u32(pbVar11 + (0x10) * 4) < 2)) {
      uVar2 = (heap.u32(0x0099fdf0) - heap.u32((pbVar11 + 4)) << (heap.u32(pbVar11 + (0x10) * 4) & 0x1f)) + heap.u32((pbVar11 + 8));
      in_EAX = uVar2;
      sVar13 = (heap.u32(0x0099fdf2) - heap.u32((pbVar11 + 6)) << (heap.u32(pbVar11 + (0x10) * 4) & 0x1f)) + heap.u32((pbVar11 + 10));
      unaff_EBP = CONCAT22((unaff_EBP >>> 0x10), 0xffff);
      for (uVar17 = heap.u32(0x0087c398); uVar17 != 0xffff; uVar17 = heap.u32((__addr_DAT_00743b98) + (uVar17 * 0x80) * 4)) {
        iVar18 = uVar17 * 0x100;
        if (heap.u32((__addr_DAT_00743baa + iVar18)) != -0x8000) {
          sVar7 = ((heap.u32((__addr_DAT_00743baa + iVar18)) + heap.u32((__addr_DAT_00743bae + iVar18))) >>> 1) - uVar2;
          if (sVar7 < 0) {
            sVar7 = -sVar7;
          }
          sVar9 = ((heap.u32((__addr_DAT_00743bac + iVar18)) + heap.u32((__addr_DAT_00743bb0 + iVar18))) >>> 1) - sVar13;
          if (sVar9 < 0) {
            sVar9 = -sVar9;
          }
          if ((!SCARRY2(sVar7, sVar9)) && ((sVar7 + sVar9) < unaff_EBP)) {
            unaff_EBP = CONCAT22((unaff_EBP >>> 0x10), sVar7 + sVar9);
            pbVar11 = __addr_DAT_00743b94 + iVar18;
          }
        }
      }
      if (unaff_EBP < 0x21) {
        unaff_EBX = CONCAT31((int3)(CONCAT22((unaff_EBX >>> 0x10), sVar13) >>> 8), 2);
        unaff_ESI = iVar16;
        LAB_005e6524: uVar14 = unaff_EBX;
        if (heap.u32(pbVar11 + (0x2e) * 4) != 0) {
          heap.setU32(0x005f54f0, (0x5ca) >>> 0);
          heap.setU32(0x005f54f2, (heap.u32((pbVar11 + 0x22))) >>> 0);
          heap.setU32(0x005f54f4, ((undefined2) * (pbVar11 + 0x9c)) >>> 0);
          heap.setU32(0x005f54f6, ((undefined2)(heap.u32((pbVar11 + 0x9c)) >>> 0x10)) >>> 0);
          uVar19 = FUN_00440143(heap, pbVar11, unaff_EBX);
          heap.setU32(0x005f54f8, (uVar14) >>> 0);
          heap.setU32(0x005f54fa, (extraout_CX_00) >>> 0);
          heap.setU32(0x005f54fc, ((uVar19 >>> 0x20)) >>> 0);
          heap.setU32(0x005f54fe, ((uVar19 >>> 0x30)) >>> 0);
          return uVar19;
        }
        heap.setU32(0x005f54f0, (0x5c8) >>> 0);
        if ((heap.u32((pbVar11 + 200)) & 8) != 0) {
          heap.setU32(0x005f54f0, (0x5c9) >>> 0);
        }
        heap.setU32(0x005f54f6, (heap.u32((pbVar11 + 0x22))) >>> 0);
        heap.setU32(0x005f54f8, (heap.u32((pbVar11 + 0x9c))) >>> 0);
        heap.setU32(0x005f54fa, ((heap.u32((pbVar11 + 0x9c)) >>> 0x10)) >>> 0);
        FUN_00440143(heap, pbVar11, unaff_EBX);
        heap.setU32(0x005f54fc, (uVar14) >>> 0);
        heap.setU32(0x005f54fe, (extraout_CX) >>> 0);
        heap.setU32(0x005f5500, (extraout_EDX) >>> 0);
        uVar6 = FUN_0043fdfb(heap, unaff_ESI, unaff_EBX);
        heap.setU32(0x005f54f2, (unaff_EBP) >>> 0);
        heap.setU32(0x005f54f4, ((undefined2)(unaff_EBP >>> 0x10)) >>> 0);
        return uVar6;
      }
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(64);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448331.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00448c64 } from "./448c64.js";
import { FUN_00448d15 } from "./448d15.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_00448331(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00652478 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  try {
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = 0;
  let extraout_CX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_ECX = 0;
  let bVar6 = 0;
  let in_EDX = 0;
  let uVar9 = 0;
  let iVar8 = 0;
  let extraout_EDX = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let unaff_EDI = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let uVar7 = 0;
  uVar14 = FUN_00448c64(heap);
  uVar7 = (undefined4)(uVar14 >>> 0x20);
  uVar11 = 0;
  LAB_00448339: uVar9 = CONCAT21((uVar7 >>> 0x10), heap.u32(unaff_ESI));
  uVar2 = uVar9 & 0xffff3c;
  iVar8 = uVar2 << 8;
  bVar10 = uVar11;
  if ((uVar2 == '\x04') && ((heap.u32(unaff_ESI + (4) * 4) & 4) != 0)) {
    uVar12 = CONCAT31(uVar9, heap.u32(unaff_ESI + (4) * 4)) & 0xffff3c03;
    uVar9 = (uint3)(uVar12 >>> 8);
    bVar6 = uVar12 - bVar10;
    uVar7 = CONCAT31(uVar9, bVar6);
    if ((bVar6 & 1) == 0) {
      iVar8 = uVar9 << 8;
      if ((heap.u32(unaff_ESI + (4) * 4) & 3) == bVar10) {
        iVar8 = CONCAT31(uVar9, 4);
      }
      /* goto LAB_0044836a */ throw new Error("goto LAB_0044836a not supported");
    }
  } else {
    LAB_0044836a: bVar6 = iVar8 + heap.u32(unaff_ESI + (2) * 4);
    uVar7 = CONCAT22((iVar8 >>> 0x10), CONCAT11(bVar6 - 4, bVar6));
    uVar3 = uVar14 + heap.u32((__addr_DAT_00652478) + (uVar11 * 2) * 4);
    uVar4 = extraout_CX + heap.u32((__addr_DAT_0065247a) + (uVar11 * 2) * 4);
    uVar5 = uVar4 * 0x80 | uVar4 >>> 9 | uVar3;
    pbVar13 = heap.u32((__addr_DAT_00971ef4) + ((uVar5 >>> 5 | uVar5 << 0xb)) * 4);
    do {
      if ((heap.u32(pbVar13) & 0x3c) == 4) {
        if (bVar6 == heap.u32(pbVar13 + (2) * 4)) {
          if ((heap.u32(pbVar13 + (4) * 4) & 4) != 0) {
            bVar6 = heap.u32(pbVar13 + (4) * 4) & 3;
            /* goto joined_r0x004483cb */ throw new Error("goto joined_r0x004483cb not supported");
          }
        } else {
          if ((byte)(bVar6 - 4) != heap.u32(pbVar13 + (2) * 4)) {
            /* goto LAB_004483ae */ throw new Error("goto LAB_004483ae not supported");
          }
          if ((heap.u32(pbVar13 + (4) * 4) & 4) == 0) {
            break;
          }
          bVar6 = heap.u32(pbVar13 + (4) * 4) & 3 ^ 2;
          joined_r0x004483cb: if (bVar6 != bVar10) {
            break;
          }
        }
        if ((heap.u32(pbVar13 + (4) * 4) & 0xf0) == 0) {
          FUN_00448d15(heap, uVar7, uVar4, uVar3);
        }
        uVar3 = uVar11 ^ 2;
        heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) = heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) & ~('\x01' << (uVar3 & 7));
        uVar3 = uVar3 - 1 & 3;
        uVar4 = uVar3 + 4;
        heap.u32(pbVar13 + ((uVar4 >>> 3) + 6) * 4) = heap.u32(pbVar13 + ((uVar4 >>> 3) + 6) * 4) & ~('\x01' << (uVar4 & 7));
        uVar3 = (uVar3 + 1 & 3) + 4;
        heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) = heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) & ~('\x01' << (uVar3 & 7));
        uVar15 = FUN_005e56d3(heap, pbVar13, unaff_EDI);
        uVar7 = (undefined4)(uVar15 >>> 0x20);
        uVar12 = uVar11 + 1 & 3;
        uVar3 = extraout_ECX + heap.u32((__addr_DAT_0065247a) + (uVar12 * 2) * 4);
        uVar3 = uVar3 * 0x80 | uVar3 >>> 9 | uVar15 + heap.u32((__addr_DAT_00652478) + (uVar12 * 2) * 4);
        pbVar13 = heap.u32((__addr_DAT_00971ef4) + ((uVar3 >>> 5 | uVar3 << 0xb)) * 4);
        /* goto LAB_00448460 */ throw new Error("goto LAB_00448460 not supported");
      }
      LAB_004483ae: pbVar1 = pbVar13 + 1;
      pbVar13 = pbVar13 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
  }
  /* goto LAB_004484b1 */ throw new Error("goto LAB_004484b1 not supported");
  while (pbVar1 = pbVar13 + 1, pbVar13 = pbVar13 + 8, (heap.u32(pbVar1) & 0x80) == 0) {
    LAB_00448460: if (((heap.u32(pbVar13) & 0x3c) == 4) && ((byte)(uVar15 >>> 0x20) == heap.u32(pbVar13 + (2) * 4))) {
      if ((heap.u32(pbVar13 + (4) * 4) & 4) == 0) {
        uVar3 = (uVar12 + 1U & 3) + 4;
        heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) = heap.u32(pbVar13 + ((uVar3 >>> 3) + 6) * 4) & ~('\x01' << (uVar3 & 7));
        FUN_005e56d3(heap, pbVar13, unaff_EDI, extraout_ECX, uVar11, uVar15);
        uVar7 = extraout_EDX;
      }
      break;
    }
  }
  LAB_004484b1: uVar11 = uVar11 + 1;
  if (3 < uVar11) {
    if ((heap.u32(unaff_ESI) & 0x3c) == 4) {
      heap.u32(unaff_ESI + (6) * 4) = 0;
    }
    return CONCAT44(in_EDX, in_EAX);
  }
  /* goto LAB_00448339 */ throw new Error("goto LAB_00448339 not supported");
} finally {
    heap.freeFrame(12);
  }
}

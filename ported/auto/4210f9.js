// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4210f9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uRam00999fda } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
export function FUN_004210f9(heap) {
  const __sp = heap.allocFrame(48);
  const __addr_DAT_005f4666 = __sp + 0;
  const __addr_DAT_005f4664 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f46e4 = __sp + 12;
  const __addr_DAT_005f4704 = __sp + 16;
  const __addr_DAT_005f46c4 = __sp + 20;
  const __addr_DAT_005f46a4 = __sp + 24;
  const __addr_PTR_LAB_00431bb8 = __sp + 28;
  const __addr_DAT_005f472e = __sp + 32;
  const __addr_DAT_005f475e = __sp + 36;
  const __addr_DAT_005f4746 = __sp + 40;
  const __addr_PTR_LAB_00432204 = __sp + 44;
  try {
  let iVar1 = 0;
  let bVar2 = 0;
  let bVar4 = 0;
  let in_CL = 0;
  let bVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let in_EDX = 0;
  let iVar9 = 0;
  let unaff_EBX = 0;
  let uVar11 = 0;
  let pbVar12 = 0;
  let uVar13 = 0;
  let iVar14 = 0;
  let cVar3 = 0;
  let cVar5 = 0;
  let uVar10 = 0;
  uVar11 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4666 + heap.u32(0x00991f88) * 4));
  uVar10 = (in_EDX >>> 0x10);
  if (((heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4664 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar11 < 0x1000)) {
    uVar11 = uVar11 * 0x80 | uVar11 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4664 + heap.u32(0x00991f88) * 4));
    pbVar12 = heap.u32((__addr_DAT_00971ef4) + ((uVar11 >>> 5 | uVar11 << 0xb)) * 4);
    bVar2 = heap.u32(pbVar12);
    while ((bVar2 & 0x3c) != 0) {
      pbVar12 = pbVar12 + 8;
      bVar2 = heap.u32(pbVar12);
    }
    uVar13 = CONCAT22(uVar10, CONCAT11(heap.u32(pbVar12 + (5) * 4), in_EDX)) & 0xffff1fff;
    if (uVar13 == (uVar13 >>> 8)) {
      return;
    }
    uVar11 = (heap.u32(pbVar12 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    uVar8 = CONCAT22((uVar13 >>> 0x10), CONCAT11(heap.u32(pbVar12 + (2) * 4) >>> 2, uVar13));
    uVar13 = heap.u32(pbVar12 + (4) * 4) & 0x10 | (uVar11 >>> 4 | uVar11) & 0xf;
  } else {
    uVar13 = 0;
    uVar8 = CONCAT22(uVar10, CONCAT11(1, in_EDX));
  }
  cVar3 = uVar8;
  bVar2 = cVar3 + heap.u32((__addr_DAT_005f46e4) + (unaff_EBX) * 4);
  bVar6 = cVar3 + heap.u32((__addr_DAT_005f4704) + (unaff_EBX) * 4);
  cVar5 = (uVar8 >>> 8);
  bVar4 = cVar5 + heap.u32((__addr_DAT_005f46c4) + (uVar13) * 4);
  bVar7 = cVar5 + heap.u32((__addr_DAT_005f46a4) + (uVar13) * 4);
  if ((bVar2 <= bVar4) && (bVar6 <= bVar7)) {
    return;
  }
  heap.setU32(0x005f4724, (heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
  }
  uVar10 = (uVar8 >>> 0x10);
  iVar9 = CONCAT22(uVar10, CONCAT11(bVar7, cVar3));
  iVar14 = iVar9;
  if (bVar7 != bVar4) {
    if (bVar4 <= bVar7) {
      iVar9 = CONCAT22(uVar10, CONCAT11(bVar4, cVar3));
    }
    bVar4 = (iVar9 >>> 8);
    iVar14 = iVar9;
    if ((bVar4 != bVar2) && (bVar4 != bVar6)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      iVar9 = CONCAT22((iVar9 >>> 0x10), CONCAT11(bVar4 + 1, iVar9));
      iVar14 = iVar9;
    }
  }
  LAB_00421213: do {
    bVar4 = (iVar9 >>> 8);
    if ((bVar2 <= bVar4) || (bVar6 <= bVar4)) {
      if ((bVar4 < bVar2) || (bVar4 < bVar6)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(iVar14, unaff_EBX);
      }
      return;
    }
    while (bVar4 != heap.u32(0x00999f9a)) {
      if (bVar4 <= heap.u32(0x00999f9a)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        iVar9 = (bVar4 + 1) << 8;
        /* goto LAB_00421213 */ throw new Error("goto LAB_00421213 not supported");
      }
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    }
    uVar13 = heap.u8(0x999f9b);
    bVar7 = bVar4 + heap.u32((__addr_DAT_005f472e) + (uVar13 * 2) * 4);
    if ((bVar2 < bVar7) || (bVar6 < bVar7)) {
      iVar1 = uVar13 * 2;
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
      uVar13 = heap.u8(0x999f9b);
      bVar7 = (bVar7 - heap.u32((__addr_DAT_005f472e) + (iVar1) * 4)) + heap.u32((__addr_DAT_005f472e) + (uVar13 * 2) * 4);
    }
    heap.setU32(0x0099a4ec, ((bVar7 - heap.u32((__addr_DAT_005f472e) + (uVar13 * 2) * 4)) * 0x10 + heap.u32((__addr_DAT_005f4746 + uVar13 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    heap.setU32(0x0099a4ec, ((iVar9 >>> 8) * 0x10 + heap.u32((__addr_DAT_005f4746 + heap.u8(0x999f9b) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0x1f) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    iVar9 = (bVar4 + heap.u32((__addr_DAT_005f472e) + (heap.u8(0x999f9b) * 2) * 4)) << 8;
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004210f9"); })();
  } while (true);
} finally {
    heap.freeFrame(48);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458c14.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00458bcf } from "./458bcf.js";
import { FUN_00458f0f } from "./458f0f.js";
import { FUN_00458f25 } from "./458f25.js";
import { FUN_00458f53 } from "./458f53.js";
import { FUN_0045905e } from "./45905e.js";
import { FUN_0045917b } from "./45917b.js";
export function FUN_00458c14(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_PTR_LAB_00458dfc = __sp + 0;
  const __addr_PTR_LAB_00458e40 = __sp + 4;
  const __addr_PTR_DAT_0064015b = __sp + 8;
  const __addr_DAT_0064015f = __sp + 12;
  const __addr_DAT_00640176 = __sp + 16;
  const __addr_DAT_0064017b = __sp + 20;
  const __addr_DAT_00640164 = __sp + 24;
  const __addr_DAT_00640171 = __sp + 28;
  const __addr_DAT_00640180 = __sp + 32;
  const __addr_DAT_00640183 = __sp + 36;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  code_r0x00458c14: while (true) {
    bVar3 = heap.u32(unaff_ESI);
    pbVar8 = unaff_ESI + 1;
    if (0x1f < bVar3) {
      break;
    }
    if (bVar3 == 0) {
      heap.u32(unaff_EDI) = 0;
      return;
    }
    if (bVar3 < 5) {
      LAB_00458c4a: heap.u32(unaff_EDI) = bVar3;
      unaff_EDI = unaff_EDI + 1;
      bVar3 = heap.u32(pbVar8);
      pbVar8 = pbVar8 + 1;
    } else {
      if (0x10 < bVar3) {
      if (0x16 < bVar3) {
        heap.u32(unaff_EDI) = bVar3;
        heap.u32(unaff_EDI + (1) * 4) = heap.u32(pbVar8);
        unaff_EDI = unaff_EDI + 2;
        bVar3 = heap.u32(unaff_ESI + (2) * 4);
        pbVar8 = unaff_ESI + 3;
      }
      heap.u32(unaff_EDI) = bVar3;
      unaff_EDI = unaff_EDI + 1;
      bVar3 = heap.u32(pbVar8);
      pbVar8 = pbVar8 + 1;
      /* goto LAB_00458c4a */ throw new Error("goto LAB_00458c4a not supported");
    }
    }
    heap.u32(unaff_EDI) = bVar3;
    unaff_EDI = unaff_EDI + 1;
    unaff_ESI = pbVar8;
  }
  switch (bVar3) {
    case 0x7b:
      FUN_0045905e(heap);
      in_ECX = extraout_ECX;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x7c:
      FUN_00458f53(heap);
      in_ECX = extraout_ECX_00;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x7d:
      FUN_0045917b(heap);
      in_ECX = extraout_ECX_01;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x7e:
      FUN_0045905e(heap);
      in_ECX = extraout_ECX_02;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x7f:
      FUN_00458f53(heap);
      in_ECX = extraout_ECX_03;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x80:
      (heap.u32(heap.u32((__addr_PTR_LAB_00458dfc) + (heap.u32(0x005f8da1) & 0x7f) * 4)))();
      in_ECX = extraout_ECX_08;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x81:
      (heap.u32(heap.u32((__addr_PTR_LAB_00458e40) + (heap.u32(0x005f8da1) & 0x7f) * 4)))();
      in_ECX = extraout_ECX_09;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x82:
      FUN_00458bcf(heap);
      in_ECX = extraout_ECX_12;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x83:
      unaff_ESI = unaff_ESI + 3;
      FUN_00458bcf(heap);
      in_ECX = extraout_ECX_13;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x84:
      pbVar9 = heap.u32(in_ECX);
      in_ECX = in_ECX + 2;
      pbVar7 = unaff_EDI;
      do {
        unaff_EDI = pbVar7;
        bVar3 = heap.u32(pbVar9);
        heap.u32(unaff_EDI) = bVar3;
        pbVar9 = pbVar9 + 1;
        unaff_ESI = pbVar8;
        pbVar7 = unaff_EDI + 1;
      } while (bVar3 != 0);
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x85:
      FUN_00458f25(heap);
      in_ECX = extraout_ECX_14;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x86:
      FUN_00458f0f(heap);
      in_ECX = extraout_ECX_15;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x87:
      if (heap.u32(0x005f8d60) == '\0') {
        FUN_0045905e(heap);
        ppuVar5 = __addr_PTR_DAT_0064015b;
        in_ECX = extraout_ECX_10;
        pbVar9 = unaff_EDI;
      } else {
        FUN_0045905e(heap);
        ppuVar5 = __addr_DAT_0064015f;
        in_ECX = extraout_ECX_11;
        pbVar9 = unaff_EDI;
      }
      break;
    case 0x88:
      in_ECX = in_ECX + 1;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x89:
      in_ECX = in_ECX + -1;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    case 0x8a:
      if (heap.u32(in_ECX) / 0x3c != 0) {
        FUN_00458f53(heap, heap.u32(in_ECX) % 0x3c);
        pbVar7 = __addr_DAT_00640176;
        pbVar9 = unaff_EDI;
        do {
          unaff_EDI = pbVar9;
          bVar3 = heap.u32(pbVar7);
          heap.u32(unaff_EDI) = bVar3;
          pbVar7 = pbVar7 + 1;
          pbVar9 = unaff_EDI + 1;
        } while (bVar3 != 0);
      }
      FUN_00458f53(heap);
      ppuVar5 = __addr_DAT_0064017b;
      in_ECX = extraout_ECX_07;
      pbVar9 = unaff_EDI;
      break;
    case 0x8b:
      uVar2 = heap.u32(in_ECX) / 0x3c;
      if (uVar2 != 0) {
        uVar4 = uVar2;
        FUN_00458f53(heap, uVar4, heap.u32(in_ECX) % 0x3c);
        pcVar6 = 0x0064016a;
        pbVar9 = unaff_EDI;
        if (uVar4 == 1) {
          pcVar6 = __addr_DAT_00640164;
        }
        do {
          unaff_EDI = pbVar9;
          bVar3 = heap.u32(pcVar6);
          heap.u32(unaff_EDI) = bVar3;
          pcVar6 = pcVar6 + 1;
          pbVar9 = unaff_EDI + 1;
        } while (bVar3 != 0);
      }
      FUN_00458f53(heap);
      ppuVar5 = __addr_DAT_00640171;
      in_ECX = extraout_ECX_06;
      pbVar9 = unaff_EDI;
      break;
    case 0x8c:
      if (heap.u32(0x005f8d60) == '\0') {
        FUN_0045905e(heap);
        ppuVar5 = __addr_DAT_00640180;
        in_ECX = extraout_ECX_04;
        pbVar9 = unaff_EDI;
      } else {
        FUN_0045905e(heap);
        ppuVar5 = __addr_DAT_00640183;
        in_ECX = extraout_ECX_05;
        pbVar9 = unaff_EDI;
      }
      break;
    case 0x8d:
      heap.u32(unaff_EDI) = 0x17;
      uVar1 = heap.u32(in_ECX);
      in_ECX = in_ECX + 2;
      heap.u32((unaff_EDI + 1)) = uVar1;
      unaff_EDI = unaff_EDI + 5;
      unaff_ESI = pbVar8;
      /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
    default:
      /* goto switchD_00458c5d_default */ throw new Error("goto switchD_00458c5d_default not supported");
  }
  do {
    unaff_EDI = pbVar9;
    bVar3 = heap.u32(ppuVar5);
    heap.u32(unaff_EDI) = bVar3;
    ppuVar5 = (ppuVar5 + 1);
    unaff_ESI = pbVar8;
    pbVar9 = unaff_EDI + 1;
  } while (bVar3 != 0);
  /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
  switchD_00458c5d_default: heap.u32(unaff_EDI) = bVar3;
  unaff_EDI = unaff_EDI + 1;
  unaff_ESI = pbVar8;
  /* goto code_r0x00458c14 */ throw new Error("goto code_r0x00458c14 not supported");
} finally {
    heap.freeFrame(40);
  }
}

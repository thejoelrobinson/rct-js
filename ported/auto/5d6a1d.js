// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d6a1d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT24, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0043642b } from "./43642b.js";
export function FUN_005d6a1d(heap) {
  const __sp = heap.allocFrame(60);
  const __addr_PTR_LAB_005d6e50 = __sp + 0;
  const __addr_DAT_00656b6c = __sp + 4;
  const __addr_PTR_DAT_00652498 = __sp + 8;
  const __addr_DAT_0099a02c = __sp + 12;
  const __addr_DAT_0099a4dc = __sp + 16;
  const __addr_stack0xffffffe8 = __sp + 20;
  const __addr_DAT_00971ef4 = __sp + 24;
  const __addr_DAT_00653ef9 = __sp + 28;
  const __addr_DAT_00653efd = __sp + 32;
  const __addr_DAT_00653eff = __sp + 36;
  const __addr_DAT_00653ef8 = __sp + 40;
  const __addr_DAT_00653ef7 = __sp + 44;
  const __addr_DAT_00653efb = __sp + 48;
  const __addr_DAT_00652478 = __sp + 52;
  const __addr_DAT_0065247a = __sp + 56;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let in_EAX = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let pbVar7 = 0;
  let in_EDX = 0;
  let uVar8 = 0;
  let psVar9 = 0;
  let unaff_EBX = 0;
  let pcVar10 = 0;
  let iVar11 = 0;
  let pbVar12 = 0;
  let unaff_ESI = 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let sStack_20 = 0;
  let sVar16 = 0;
  uVar15 = CONCAT24(heap.u32(0x0099a4e2), in_EAX);
  heap.setU32(0x006522ab, (unaff_EBX) >>> 0);
  heap.setU32(0x00652289, ((unaff_EBX >>> 8)) >>> 0);
  if (heap.u32(0x00656b34) == '\x14') {
    if (heap.u32(0x006522ab) == '\0') {
      heap.setU16((__addr_DAT_0099a02c + 0), (0xffff) & 0xffff);
      heap.setU32(0x0099a4de, (in_EAX) >>> 0);
      heap.setU32(0x0099a4e0, (in_ECX) >>> 0);
      uVar15 = FUN_00423677(heap);
      heap.setU32(0x0099a4e4, (heap.u32(0x00652290)) >>> 0);
    }
    heap.setU32(0x0099a4e2, ((uVar15 >>> 0x20)) >>> 0);
    if (heap.u32(0x006522ab) == '\x01') {
      heap.setU32(0x006522ac, (0) >>> 0);
    }
    if (heap.u32(0x006522ab) == '\x03') {
      heap.setU32(0x006522ac, (heap.u32(0x006522ac) & 0xffff0000) >>> 0);
    }
    if (heap.u32(0x00656b6c) == 0) {
      if (heap.u32(0x006522ab) == '\0') {
        heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfff7 | 6) >>> 0);
        FUN_0043642b(heap);
      }
      return CONCAT44(in_EDX, in_EAX);
    }
    uVar14 = (heap.u32(heap.u32((__addr_PTR_LAB_005d6e50) + (heap.u32(0x00652290)) * 4)))(uVar15);
    return uVar14;
  }
  uVar8 = in_EDX;
  if (heap.u32(0x006522ab) == '\0') {
    heap.setU16((__addr_DAT_0099a02c + 0), (0xffff) & 0xffff);
    heap.setU32(0x0099a4de, (in_EAX) >>> 0);
    heap.setU32(0x0099a4e0, (in_ECX) >>> 0);
    uVar15 = FUN_00423677(heap);
    uVar8 = in_EDX & 0xffff;
    heap.setU32(0x0099a4e4, (heap.u32(0x00652290)) >>> 0);
    in_ECX = extraout_ECX;
  }
  if (heap.u32(0x006522ab) == '\x01') {
    heap.setU32(0x006522ac, (0) >>> 0);
  }
  if (heap.u32(0x006522ab) == '\x03') {
    heap.setU32(0x006522ac, (heap.u32(0x006522ac) & 0xffff0000) >>> 0);
  }
  uVar13 = heap.u32(0x00652290);
  pbVar12 = __addr_DAT_00656b6c;
  while (true) {
    heap.setU32(0x0099a4e2, ((uVar15 >>> 0x20)) >>> 0);
    sVar16 = uVar15;
    pcVar10 = heap.u32(pbVar12);
    if (heap.u32(pbVar12) == 0xff) {
      break;
    }
    sStack_20 = in_ECX;
    if (heap.u32(0x006522ab) == '\0') {
      for (pcVar10 = heap.u32((__addr_PTR_DAT_00652498) + (pcVar10) * 4); heap.u32(pcVar10) != -1; pcVar10 = pcVar10 + 10) {
        if ((heap.u32(pcVar10 + (9) * 4) & 1) == 0) {
          switch (uVar13 & 3) {
            case 0:
              sVar2 = sVar16 + heap.u32((pcVar10 + 1));
              sVar5 = sStack_20 + heap.u32((pcVar10 + 3));
              break;
            case 1:
              sVar2 = sVar16 + heap.u32((pcVar10 + 3));
              sVar5 = sStack_20 - heap.u32((pcVar10 + 1));
              break;
            case 2:
              sVar2 = sVar16 - heap.u32((pcVar10 + 1));
              sVar5 = sStack_20 - heap.u32((pcVar10 + 3));
              break;
            case 3:
              sVar2 = sVar16 - heap.u32((pcVar10 + 3));
              sVar5 = sStack_20 + heap.u32((pcVar10 + 1));
          }
          psVar9 = __addr_DAT_0099a02c;
          while (heap.u32(psVar9) != -1) {
            if (((sVar2 == heap.u32(psVar9)) && (sVar5 == heap.u32(psVar9 + (1) * 4))) || (psVar9 = psVar9 + 2, __addr_DAT_0099a4dc <= psVar9)) {
              /* goto LAB_005d6b52 */ throw new Error("goto LAB_005d6b52 not supported");
            }
          }
          heap.setU32(psVar9, (sVar2) >>> 0);
          heap.setU32((psVar9 + (1) * 4), (sVar5) >>> 0);
          heap.setU32((psVar9 + (2) * 4), (-1) >>> 0);
        }
        LAB_005d6b52: ;
      }
    }
    if ((heap.u32(0x006522ab) == '\x01') || (heap.u32(0x006522ab) == '\x02')) {
      uVar4 = CONCAT11(uVar13, heap.u32(0x006522ab) != '\x01');
      heap.setU32(0x00991efe, (0x3b1) >>> 0);
      FUN_00426f56(heap, uVar13, unaff_ESI, pbVar12, __addr_stack0xffffffe8, pcVar10);
      heap.setU32(0x006522ac, (heap.u32(0x006522ac) + uVar4) >>> 0);
      if (uVar4 == 0x80000000) {
        heap.setU32(0x006522ac, (0x80000000) >>> 0);
      }
      if (heap.u32(0x006522ac) == 0x80000000) {
        break;
      }
    }
    if (heap.u32(0x006522ab) == '\x03') {
      for (pcVar10 = heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar12)) * 4); heap.u32(pcVar10) != -1; pcVar10 = pcVar10 + 10) {
        switch (uVar13 & 3) {
          case 0:
            uVar3 = sVar16 + heap.u32((pcVar10 + 1));
            uVar6 = sStack_20 + heap.u32((pcVar10 + 3));
            break;
          case 1:
            uVar3 = sVar16 + heap.u32((pcVar10 + 3));
            uVar6 = sStack_20 - heap.u32((pcVar10 + 1));
            break;
          case 2:
            uVar3 = sVar16 - heap.u32((pcVar10 + 1));
            uVar6 = sStack_20 - heap.u32((pcVar10 + 3));
            break;
          case 3:
            uVar3 = sVar16 - heap.u32((pcVar10 + 3));
            uVar6 = sStack_20 + heap.u32((pcVar10 + 1));
        }
        if ((uVar3 < 0x1000) && (uVar6 < 0x1000)) {
          uVar3 = uVar6 << 7 | uVar6 >>> 9 | uVar3;
          pbVar7 = heap.u32((__addr_DAT_00971ef4) + ((uVar3 >>> 5 | uVar3 << 0xb)) * 4);
          bVar1 = heap.u32(pbVar7);
          while ((bVar1 & 0x3c) != 0) {
            pbVar7 = pbVar7 + 8;
            bVar1 = heap.u32(pbVar7);
          }
          uVar6 = heap.u32(pbVar7 + (2) * 4) * 4;
          uVar3 = uVar6;
          if (((heap.u32(pbVar7 + (4) * 4) & 0xf) != 0) && (uVar3 = uVar6 + 0x10, (heap.u32(pbVar7 + (4) * 4) & 0x10) != 0)) {
            uVar3 = uVar6 + 0x20;
          }
          if (((heap.u32(pbVar7 + (5) * 4) & 0x1f) != 0) && (uVar6 = (heap.u32(pbVar7 + (5) * 4) & 0x1f) << 4, uVar3 < uVar6)) {
            uVar3 = uVar6;
          }
          sVar2 = (uVar8 - heap.u32((__addr_DAT_00653ef9 + heap.u32(pbVar12) * 10))) + heap.u32((pcVar10 + 5)) + heap.u32(0x006522ac);
          if (sVar2 < uVar3) {
            (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d6a1d"); })();
          }
        }
      }
    }
    iVar11 = heap.u32(pbVar12) * 10;
    switch (uVar13 & 3) {
      case 0:
        uVar4 = (sVar16 + heap.u32((__addr_DAT_00653efd + iVar11)));
        in_ECX = (sStack_20 + heap.u32((__addr_DAT_00653eff + iVar11)));
        break;
      case 1:
        uVar4 = (sVar16 + heap.u32((__addr_DAT_00653eff + iVar11)));
        in_ECX = (sStack_20 - heap.u32((__addr_DAT_00653efd + iVar11)));
        break;
      case 2:
        uVar4 = (sVar16 - heap.u32((__addr_DAT_00653efd + iVar11)));
        in_ECX = (sStack_20 - heap.u32((__addr_DAT_00653eff + iVar11)));
        break;
      case 3:
        uVar4 = (sVar16 - heap.u32((__addr_DAT_00653eff + iVar11)));
        in_ECX = (sStack_20 + heap.u32((__addr_DAT_00653efd + iVar11)));
    }
    uVar13 = (uVar13 & 3) + (heap.u32((__addr_DAT_00653ef8) + (iVar11) * 4) - heap.u32((__addr_DAT_00653ef7) + (iVar11) * 4)) & 3;
    if ((heap.u32((__addr_DAT_00653ef8) + (iVar11) * 4) & 4) != 0) {
      uVar13 = uVar13 | 4;
    }
    uVar8 = ((uVar8 - heap.u32((__addr_DAT_00653ef9 + iVar11))) + heap.u32((__addr_DAT_00653efb + iVar11)));
    if ((uVar13 & 4) == 0) {
      uVar4 = (uVar4 + heap.u32((__addr_DAT_00652478) + (uVar13 * 2) * 4));
      in_ECX = (in_ECX + heap.u32((__addr_DAT_0065247a) + (uVar13 * 2) * 4));
    }
    uVar15 = CONCAT24(heap.u32(0x0099a4e2), uVar4);
    pbVar12 = pbVar12 + 2;
  }
  if (heap.u32(0x006522ab) == '\0') {
    heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfff7 | 6) >>> 0);
    FUN_0043642b(heap);
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(60);
  }
}

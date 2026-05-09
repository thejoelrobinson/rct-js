// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d6a1d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT24, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0043642b } from "./43642b.js";
export function FUN_005d6a1d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xffffffe8 = __sp + 0;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let pbVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar8 = 0;
  let psVar9 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let pcVar10 = 0;
  let iVar11 = 0;
  let pbVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let sStack_20 = 0;
  let sVar16 = 0;
  uVar15 = ((CONCAT24(heap.u32(0x0099a4e2), in_EAX)) >>> 0);
  heap.setU8(0x006522ab, (((unaff_EBX) << 24 >> 24)) & 0xff);
  heap.setU8(0x00652289, (((((unaff_EBX) >>> 0) >>> 8) & 0xff)) & 0xff);
  if (heap.u8(0x00656b34) == 20) {
    if (heap.u8(0x006522ab) == 0) {
      heap.setU16((0x0099a02c + 0), (0xffff) & 0xffff);
      heap.setU32(0x0099a4de, (((in_EAX) << 16 >> 16)) >>> 0);
      heap.setU32(0x0099a4e0, (((in_ECX) << 16 >> 16)) >>> 0);
      uVar15 = (((regs.eax = FUN_00423677(heap))) >>> 0);
      heap.setU32(0x0099a4e4, (heap.u8(0x00652290)) >>> 0);
    }
    heap.setU32(0x0099a4e2, (((uVar15 >>> 0x20) & 0xffff)) >>> 0);
    if (heap.u8(0x006522ab) == 1) {
      heap.setU8(0x006522ac, (0) & 0xff);
    }
    if (heap.u8(0x006522ab) == 3) {
      heap.setU8(0x006522ac, (heap.u8(0x006522ac) & 0xffff0000) & 0xff);
    }
    if (heap.u8(0x00656b6c) == 0) {
      if (heap.u8(0x006522ab) == 0) {
        heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfff7 | 6) >>> 0);
        (regs.eax = FUN_0043642b(heap));
      }
      return 1;
    }
    uVar14 = (((regs.eax = callIndirect(heap, heap.u32((0x005d6e50) + (heap.u8(0x00652290)) * 4), ((uVar15) << 16 >> 16)))) >>> 0);
    return uVar14;
  }
  uVar8 = ((in_EDX) >>> 0);
  if (heap.u8(0x006522ab) == 0) {
    heap.setU16((0x0099a02c + 0), (0xffff) & 0xffff);
    heap.setU32(0x0099a4de, (((in_EAX) << 16 >> 16)) >>> 0);
    heap.setU32(0x0099a4e0, (((in_ECX) << 16 >> 16)) >>> 0);
    uVar15 = (((regs.eax = FUN_00423677(heap))) >>> 0);
    uVar8 = ((in_EDX & 0xffff) >>> 0);
    heap.setU32(0x0099a4e4, (heap.u8(0x00652290)) >>> 0);
    in_ECX = ((extraout_ECX) >>> 0);
  }
  if (heap.u8(0x006522ab) == 1) {
    heap.setU8(0x006522ac, (0) & 0xff);
  }
  if (heap.u8(0x006522ab) == 3) {
    heap.setU8(0x006522ac, (heap.u8(0x006522ac) & 0xffff0000) & 0xff);
  }
  uVar13 = ((((heap.u8(0x00652290)) >>> 0)) >>> 0);
  pbVar12 = ((0x00656b6c) >>> 0);
  while (true) {
    heap.setU32(0x0099a4e2, (((uVar15 >>> 0x20) & 0xffff)) >>> 0);
    sVar16 = ((((uVar15) << 16 >> 16)) & 0xffff);
    pcVar10 = (((0) * pbVar12) >>> 0);
    if (heap.u8(pbVar12) == 0xff) {
      break;
    }
    sStack_20 = ((((in_ECX) << 16 >> 16)) & 0xffff);
    if (heap.u8(0x006522ab) == 0) {
      for (pcVar10 = ((heap.u32((0x00652498) + (((pcVar10) >>> 0)) * 4)) >>> 0); (heap.i8(pcVar10) | 0) != -1; pcVar10 = (((pcVar10 + 10) >>> 0)) >>> 0) {
        if ((heap.i8(pcVar10 + (9)) & 1) == 0) {
          switch (uVar13 & 3) {
            case 0:
              sVar2 = ((sVar16 + heap.i16((pcVar10 + 1))) & 0xffff);
              sVar5 = ((sStack_20 + heap.i16((pcVar10 + 3))) & 0xffff);
              break;
            case 1:
              sVar2 = ((sVar16 + heap.i16((pcVar10 + 3))) & 0xffff);
              sVar5 = ((sStack_20 - heap.i16((pcVar10 + 1))) & 0xffff);
              break;
            case 2:
              sVar2 = ((sVar16 - heap.i16((pcVar10 + 1))) & 0xffff);
              sVar5 = ((sStack_20 - heap.i16((pcVar10 + 3))) & 0xffff);
              break;
            case 3:
              sVar2 = ((sVar16 - heap.i16((pcVar10 + 3))) & 0xffff);
              sVar5 = ((sStack_20 + heap.i16((pcVar10 + 1))) & 0xffff);
          }
          psVar9 = ((0x0099a02c) >>> 0);
          while ((heap.i16(psVar9) | 0) != -1) {
            if (((sVar2 == heap.i16(psVar9)) && (sVar5 == heap.i16(psVar9 + (1) * 2))) || (psVar9 = ((psVar9 + ((2) * 2)) >>> 0), 0x0099a4dc <= psVar9)) {
              /* goto LAB_005d6b52 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d6a1d/LAB_005d6b52"); return 0;
            }
          }
          heap.setU32(psVar9, (sVar2) & 0xffffffff);
          heap.setI16((psVar9 + (1) * 2), (sVar5) & 0xffff);
          heap.setI16((psVar9 + (2) * 2), (-1) & 0xffff);
        }
        LAB_005d6b52: ;
      }
    }
    if ((heap.u8(0x006522ab) == 1) || (heap.u8(0x006522ab) == 2)) {
      uVar4 = ((((CONCAT11(((uVar13) << 24 >> 24), heap.u8(0x006522ab) != 1)) >>> 0)) >>> 0);
      heap.setU32(0x00991efe, (0x3b1) >>> 0);
      (regs.eax = FUN_00426f56(heap, uVar13, unaff_ESI, pbVar12, __addr_stack0xffffffe8, pcVar10));
      heap.setU8(0x006522ac, (heap.u8(0x006522ac) + uVar4) & 0xff);
      if (uVar4 == 0x80000000) {
        heap.setU8(0x006522ac, (0x80000000) & 0xff);
      }
      if (heap.u8(0x006522ac) == 0x80000000) {
        break;
      }
    }
    if (heap.u8(0x006522ab) == 3) {
      for (pcVar10 = ((heap.u32((0x00652498) + (heap.u8(pbVar12)) * 4)) >>> 0); (heap.i8(pcVar10) | 0) != -1; pcVar10 = (((pcVar10 + 10) >>> 0)) >>> 0) {
        switch (uVar13 & 3) {
          case 0:
            uVar3 = ((sVar16 + heap.i16((pcVar10 + 1))) & 0xffff);
            uVar6 = ((sStack_20 + heap.i16((pcVar10 + 3))) & 0xffff);
            break;
          case 1:
            uVar3 = ((sVar16 + heap.i16((pcVar10 + 3))) & 0xffff);
            uVar6 = ((sStack_20 - heap.i16((pcVar10 + 1))) & 0xffff);
            break;
          case 2:
            uVar3 = ((sVar16 - heap.i16((pcVar10 + 1))) & 0xffff);
            uVar6 = ((sStack_20 - heap.i16((pcVar10 + 3))) & 0xffff);
            break;
          case 3:
            uVar3 = ((sVar16 - heap.i16((pcVar10 + 3))) & 0xffff);
            uVar6 = ((sStack_20 + heap.i16((pcVar10 + 1))) & 0xffff);
        }
        if ((uVar3 < 0x1000) && (uVar6 < 0x1000)) {
          uVar3 = ((uVar6 << 7 | uVar6 >>> 9 | uVar3) & 0xffff);
          pbVar7 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
          bVar1 = ((heap.u8(pbVar7)) & 0xff);
          while ((bVar1 & 0x3c) != 0) {
            pbVar7 = ((pbVar7 + 8) >>> 0);
            bVar1 = ((heap.u8(pbVar7)) & 0xff);
          }
          uVar6 = ((((heap.u8(pbVar7 + (2))) & 0xffff) * 4) & 0xffff);
          uVar3 = ((uVar6) & 0xffff);
          if (((heap.u8(pbVar7 + (4)) & 0xf) != 0) && (uVar3 = ((uVar6 + 0x10) & 0xffff), (heap.u8(pbVar7 + (4)) & 0x10) != 0)) {
            uVar3 = ((uVar6 + 0x20) & 0xffff);
          }
          if (((heap.u8(pbVar7 + (5)) & 0x1f) != 0) && (uVar6 = (((heap.u8(pbVar7 + (5)) & 0x1f) << 4) & 0xffff), uVar3 < uVar6)) {
            uVar3 = ((uVar6) & 0xffff);
          }
          sVar2 = (((((uVar8) << 16 >> 16) - heap.i16((0x00653ef9 + heap.u32(pbVar12) * 10))) + heap.i16((pcVar10 + 5)) + heap.i16(0x006522ac)) & 0xffff);
          if (sVar2 < ((uVar3) << 16 >> 16)) {
            heap.setU16((0x006522ac + 0), (heap.i16(0x006522ac) - (sVar2 - uVar3)) & 0xffff);
          }
        }
      }
    }
    iVar11 = ((heap.u32(pbVar12) * 10) >>> 0);
    switch (uVar13 & 3) {
      case 0:
        uVar4 = ((((sVar16 + heap.i16((0x00653efd + iVar11))) >>> 0)) >>> 0);
        in_ECX = ((((sStack_20 + heap.i16((0x00653eff + iVar11))) >>> 0)) >>> 0);
        break;
      case 1:
        uVar4 = ((((sVar16 + heap.i16((0x00653eff + iVar11))) >>> 0)) >>> 0);
        in_ECX = ((((sStack_20 - heap.i16((0x00653efd + iVar11))) >>> 0)) >>> 0);
        break;
      case 2:
        uVar4 = ((((sVar16 - heap.i16((0x00653efd + iVar11))) >>> 0)) >>> 0);
        in_ECX = ((((sStack_20 - heap.i16((0x00653eff + iVar11))) >>> 0)) >>> 0);
        break;
      case 3:
        uVar4 = ((((sVar16 - heap.i16((0x00653eff + iVar11))) >>> 0)) >>> 0);
        in_ECX = ((((sStack_20 + heap.i16((0x00653efd + iVar11))) >>> 0)) >>> 0);
    }
    uVar13 = (((uVar13 & 3) + ((heap.u32((0x00653ef8) + (iVar11) * 4) - heap.u32((0x00653ef7) + (iVar11) * 4)) >>> 0) & 3) >>> 0);
    if ((heap.u32((0x00653ef8) + (iVar11) * 4) & 4) != 0) {
      uVar13 = ((uVar13 | 4) >>> 0);
    }
    uVar8 = (((((((uVar8) << 16 >> 16) - heap.i16((0x00653ef9 + iVar11))) + heap.i16((0x00653efb + iVar11))) >>> 0)) >>> 0);
    if ((uVar13 & 4) == 0) {
      uVar4 = ((((((uVar4) << 16 >> 16) + heap.u32((0x00652478) + (uVar13 * 2) * 4)) >>> 0)) >>> 0);
      in_ECX = ((((((in_ECX) << 16 >> 16) + heap.u32((0x0065247a) + (uVar13 * 2) * 4)) >>> 0)) >>> 0);
    }
    uVar15 = ((CONCAT24(heap.u32(0x0099a4e2), uVar4)) >>> 0);
    pbVar12 = ((pbVar12 + 2) >>> 0);
  }
  if (heap.u8(0x006522ab) == 0) {
    heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfff7 | 6) >>> 0);
    (regs.eax = FUN_0043642b(heap));
  }
  return 1;
} finally {
    heap.freeFrame(4);
  }
}

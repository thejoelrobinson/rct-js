// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a95d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0045a95d(heap) {
  let uVar1 = 0;
  let psVar2 = 0;
  let uVar3 = 0;
  let in_AX = regs.eax & 0xffff;
  let bVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let iVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let pbVar8 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let puVar9 = 0;
  let pbVar10 = 0;
  let psVar11 = 0;
  let puVar12 = 0;
  let bVar13 = 0;
  if (heap.i16((heap.u32(0x00981ef8) + 0xe)) != 0) {
    return;
  }
  heap.setU32(0x0064baf8, (heap.u32(0x0064baf8) + 1) >>> 0);
  uVar7 = ((0) >>> 0);
  psVar11 = ((0x006439d8) >>> 0);
  uVar6 = ((0xffffffff) >>> 0);
  do {
    if (heap.u32((psVar11 + ((7) * 2))) <= uVar6) {
      uVar6 = ((heap.u32((psVar11 + ((7) * 2)))) >>> 0);
      heap.setU32(0x0064bafc, (uVar7) >>> 0);
      heap.setU32(0x0064bb00, (psVar11) >>> 0);
    }
    psVar2 = ((heap.u32(0x0064bb00)) >>> 0);
    if ((((in_AX == heap.i16(psVar11)) && (heap.u32(0x00971e86) == heap.i32((psVar11 + ((1) * 2))))) && (heap.u32(0x00971e8a) == heap.i32((psVar11 + ((3) * 2))))) && ((in_CX == heap.i16(psVar11 + (5) * 2) && (unaff_BP == heap.i16(psVar11 + (6) * 2))))) {
      heap.setI32((psVar11 + ((7) * 2)), (heap.u32(0x0064baf8)) & 0xffffffff);
      return;
    }
    uVar7 = ((uVar7 + 1) >>> 0);
    psVar11 = ((psVar11 + ((0x409) * 2)) >>> 0);
  } while (uVar7 < 0x10);
  heap.setU32(heap.u32(0x0064bb00), (in_AX) & 0xffffffff);
  heap.setI32((psVar2 + ((1) * 2)), (heap.u32(0x00971e86)) & 0xffffffff);
  heap.setI32((psVar2 + ((3) * 2)), (heap.u32(0x00971e8a)) & 0xffffffff);
  heap.setI16((psVar2 + (5) * 2), (in_CX) & 0xffff);
  heap.setI16((psVar2 + (6) * 2), (unaff_BP) & 0xffff);
  heap.setI32((psVar2 + ((7) * 2)), (heap.u32(0x0064baf8)) & 0xffffffff);
  psVar11 = ((psVar2 + ((9) * 2)) >>> 0);
  for (iVar5 = ((0x200) >>> 0); iVar5 != 0; iVar5 = (((iVar5 + -1) >>> 0)) >>> 0) {
    heap.setI16((psVar11 + (0) * 2), (0) & 0xffff);
    heap.setI16((psVar11 + (1) * 2), (0) & 0xffff);
    psVar11 = ((psVar11 + ((2) * 2)) >>> 0);
  }
  (regs.eax = FUN_00458bcf(heap));
  psVar11 = ((heap.u32(0x0064bb00)) >>> 0);
  uVar6 = ((((((heap.u32(heap.u32(0x0064bb00) + (5) * 4)) & 0xffff)) >>> 0)) >>> 0);
  puVar9 = ((heap.u32((0x0064bb08) + (((heap.u32(heap.u32(0x0064bb00) + (6) * 4)) & 0xffff)) * 4)) >>> 0);
  pbVar10 = ((0x0099a888) >>> 0);
  LAB_0045aa35: do {
    do {
      while (true) {
        while (true) {
          bVar4 = ((heap.u8(pbVar10)) & 0xff);
          pbVar10 = ((pbVar10 + 1) >>> 0);
          if (bVar4 != 0) {
            break;
          }
          pbVar10 = ((0x0099a888) >>> 0);
        }
        if ((0x9b < bVar4) || (bVar4 < 0x8e)) {
          break;
        }
        heap.setU32(0x0064bb04, (heap.u8((heap.u32(0x0093a464) + ((bVar4 + 0x72) >>> 0) * 4))) >>> 0);
      }
    } while (bVar4 < 0x20);
    uVar7 = ((heap.u32(((0x0099a6c8) >>> 0) + (((bVar4 - 0x20) & 0xff)) * 4)) >>> 0);
    pbVar8 = ((0x006432d8 + ((bVar4 - 0x20) >>> 0) * 8) >>> 0);
    do {
      while (uVar3 = ((heap.u32(0x0064bb04)) & 0xff), uVar6 != 0) {
        uVar6 = ((uVar6 - 1) >>> 0);
        pbVar8 = ((pbVar8 + 1) >>> 0);
        uVar7 = ((uVar7 - 1) >>> 0);
        if (uVar7 == 0) {
          /* goto LAB_0045aa35 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045a95d/LAB_0045aa35"); return 0;
        }
      }
      uVar1 = ((heap.u16(puVar9)) & 0xffff);
      if (uVar1 == 0xffff) {
        return;
      }
      if (-2 < (((uVar1) << 16 >> 16) | 0)) {
        puVar12 = (((((psVar11) | 0) + uVar1 + 0x12)) >>> 0);
        bVar4 = ((heap.u8(pbVar8)) & 0xff);
        do {
          bVar13 = (((bVar4 & 1)) & 0xff);
          bVar4 = ((bVar4 >>> 1) & 0xff);
          if (bVar13) {
            heap.setU32(puVar12, (uVar3) & 0xffffffff);
          }
          puVar12 = ((puVar12 + 0x40) >>> 0);
        } while (bVar4 != 0);
      }
      pbVar8 = ((pbVar8 + 1) >>> 0);
      puVar9 = ((puVar9 + ((1) * 2)) >>> 0);
      uVar7 = ((uVar7 - 1) >>> 0);
    } while (uVar7 != 0);
  } while (true);
}

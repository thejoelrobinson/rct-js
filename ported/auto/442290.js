// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442290.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
export function FUN_00442290(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_DX = regs.edx & 0xffff;
  let iVar8 = 0;
  let pbVar9 = 0;
  let uVar10 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  uVar12 = (((regs.eax = FUN_00423677(heap))) >>> 0);
  if (((uVar12 >>> 0x20) & 0xffff) <= in_DX) {
    uVar6 = ((extraout_CX - 0xa0) & 0xffff);
    heap.setU8(0x006293d0, (0) & 0xff);
    heap.setU8(0x006293d2, (0) & 0xff);
    heap.setU8(0x006293d4, (0) & 0xff);
    heap.setU8(0x006293d6, (0) & 0xff);
    iVar4 = ((0) >>> 0);
    uVar7 = ((((uVar12) << 16 >> 16) - 0xa0) & 0xffff);
    do {
      do {
        uVar3 = ((uVar7) & 0xffff);
        iVar8 = ((iVar4) >>> 0);
        if ((uVar3 < 0xfff) && (uVar6 < 0xfff)) {
          uVar7 = ((uVar6 << 7 | uVar6 >>> 9 | uVar3) & 0xffff);
          pbVar9 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
          do {
            bVar2 = ((heap.u8(pbVar9) & 0x3c) & 0xff);
            if (bVar2 == 0xc) {
              heap.setU8(0x006293d0, (heap.u8(0x006293d0) + 1) & 0xff);
            } else {
              if (bVar2 == 0x18) {
              heap.setU8(0x006293d0, (heap.u8(0x006293d0) + 1) & 0xff);
            } else {
              if (bVar2 == 8) {
              iVar4 = ((((heap.u8(pbVar9 + (7))) >>> 0) * 0x260) >>> 0);
              if (heap.u32((0x00887420) + (iVar4) * 4) == 33) {
                if ((heap.u32((0x0088752c) + (iVar4) * 4) | 0) != -1) {
                  heap.setU8(0x006293d4, (heap.u8(0x006293d4) | 1) & 0xff);
                }
              } else {
                if ((heap.u32((0x00887420) + (iVar4) * 4) == 25) && ((heap.u32((0x0088752c) + (iVar4) * 4) | 0) != -1)) {
                heap.setU8(0x006293d4, (heap.u8(0x006293d4) | 2) & 0xff);
              }
              }
            } else {
              if (bVar2 == 4) {
              bVar2 = ((heap.u8(pbVar9 + (5)) & 0xf) & 0xff);
              if (bVar2 == 5) {
                heap.setU8(0x006293d2, (heap.u8(0x006293d2) + 1) & 0xff);
              } else {
                if (((((bVar2 == 8) || (bVar2 == 9)) || (bVar2 == 10)) || ((bVar2 == 0xb || (bVar2 == 0xc)))) || (bVar2 == 0xd)) {
                heap.setU8(0x006293d6, (heap.u8(0x006293d6) + 1) & 0xff);
              }
              }
            }
            }
            }
            }
            pbVar1 = ((pbVar9 + 1) >>> 0);
            pbVar9 = ((pbVar9 + 8) >>> 0);
          } while ((heap.u8(pbVar1) & 0x80) == 0);
        }
        bVar2 = ((((iVar8) << 24 >> 24) + 1) & 0xff);
        iVar4 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar8) >>> 0) >>> 8)), bVar2)) >>> 0);
        uVar7 = ((uVar3 + 0x20) & 0xffff);
      } while (bVar2 < 0xb);
      uVar6 = ((uVar6 + 0x20) & 0xffff);
      bVar2 = (((((((iVar8) >>> 0) >>> 8)) << 24 >> 24) + 1) & 0xff);
      iVar4 = ((((bVar2) >>> 0) << 8) >>> 0);
      uVar10 = ((heap.u32(0x0087c39c)) & 0xffff);
      uVar7 = ((uVar3 - 0x140) & 0xffff);
    } while (bVar2 < 0xb);
    while (uVar10 != 0xffff) {
      uVar11 = ((((uVar10) >>> 0)) >>> 0);
      uVar7 = ((((uVar12) << 16 >> 16) - heap.u32((0x00743ba2) + (uVar11 * 0x80) * 4)) & 0xffff);
      if (((uVar7) << 16 >> 16) < 0) {
        uVar7 = ((-uVar7) & 0xffff);
      }
      uVar6 = ((extraout_CX - heap.u32((0x00743ba4) + (uVar11 * 0x80) * 4)) & 0xffff);
      if (((uVar6) << 16 >> 16) < 0) {
        uVar6 = ((-uVar6) & 0xffff);
      }
      if (uVar7 < uVar6) {
        uVar7 = ((uVar6) & 0xffff);
      }
      if (uVar7 < 0xa1) {
        heap.setU8(0x006293d6, (heap.u8(0x006293d6) + 1) & 0xff);
      }
      uVar10 = ((heap.u32((0x00743b98) + (uVar11 * 0x80) * 4)) & 0xffff);
    }
    uVar5 = ((((uVar12) >>> 0)) >>> 0);
    if ((4 < heap.u8(0x006293d2)) && (heap.u8(0x006293d6) < 0x14)) {
      return uVar5;
    }
    if ((0x27 < heap.u8(0x006293d0)) && (heap.u8(0x006293d6) < 8)) {
      return uVar5;
    }
    if ((heap.u8(0x006293d4) == 1) && (heap.u8(0x006293d6) < 0x14)) {
      return uVar5;
    }
    if (heap.u8(0x006293d6) < 2) {
      return uVar5;
    }
  }
  return ((uVar12) >>> 0);
}

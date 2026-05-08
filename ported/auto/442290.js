// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442290.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../runtime/win32.js";
import { FUN_00423677 } from "./423677.js";
export function FUN_00442290(heap) {
  let bVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_DX = 0;
  let iVar8 = 0;
  let uVar10 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  uVar12 = FUN_00423677(heap);
  if ((ushort)(uVar12 >>> 0x20) <= in_DX) {
    uVar6 = extraout_CX - 0xa0;
    heap.setU32(0x006293d0, (0) >>> 0);
    heap.setU32(0x006293d2, (0) >>> 0);
    heap.setU32(0x006293d4, (0) >>> 0);
    heap.setU32(0x006293d6, (0) >>> 0);
    iVar4 = 0;
    uVar7 = uVar12 - 0xa0;
    do {
      do {
        uVar3 = uVar7;
        iVar8 = iVar4;
        if ((uVar3 < 0xfff) && (uVar6 < 0xfff)) {
          uVar7 = uVar6 << 7 | uVar6 >>> 9 | uVar3;
          pbVar9 = heap.u32((0x00971ef4) + ((ushort)(uVar7 >>> 5 | uVar7 << 0xb)) * 4);
          do {
            bVar2 = heap.u32(pbVar9) & 0x3c;
            if (bVar2 == 0xc) {
              heap.setU32(0x006293d0, (heap.u32(0x006293d0) + 1) >>> 0);
            } else {
              if (bVar2 == 0x18) {
              heap.setU32(0x006293d0, (heap.u32(0x006293d0) + 1) >>> 0);
            } else {
              if (bVar2 == 8) {
              iVar4 = heap.u32(pbVar9 + (7) * 4) * 0x260;
              if (heap.u32((0x00887420) + (iVar4) * 4) == '!') {
                if (heap.u32((0x0088752c) + (iVar4) * 4) != -1) {
                  heap.setU32(0x006293d4, (heap.u32(0x006293d4) | 1) >>> 0);
                }
              } else {
                if ((heap.u32((0x00887420) + (iVar4) * 4) == '\x19') && (heap.u32((0x0088752c) + (iVar4) * 4) != -1)) {
                heap.setU32(0x006293d4, (heap.u32(0x006293d4) | 2) >>> 0);
              }
              }
            } else {
              if (bVar2 == 4) {
              bVar2 = heap.u32(pbVar9 + (5) * 4) & 0xf;
              if (bVar2 == 5) {
                heap.setU32(0x006293d2, (heap.u32(0x006293d2) + 1) >>> 0);
              } else {
                if (((((bVar2 == 8) || (bVar2 == 9)) || (bVar2 == 10)) || ((bVar2 == 0xb || (bVar2 == 0xc)))) || (bVar2 == 0xd)) {
                heap.setU32(0x006293d6, (heap.u32(0x006293d6) + 1) >>> 0);
              }
              }
            }
            }
            }
            }
            pbVar1 = pbVar9 + 1;
            pbVar9 = pbVar9 + 8;
          } while ((heap.u32(pbVar1) & 0x80) == 0);
        }
        bVar2 = iVar8 + 1;
        iVar4 = CONCAT31(heap, (int3)(iVar8 >>> 8), bVar2);
        uVar7 = uVar3 + 0x20;
      } while (bVar2 < 0xb);
      uVar6 = uVar6 + 0x20;
      bVar2 = (iVar8 >>> 8) + 1;
      iVar4 = bVar2 << 8;
      uVar10 = heap.u32(0x0087c39c);
      uVar7 = uVar3 - 0x140;
    } while (bVar2 < 0xb);
    while (uVar10 != 0xffff) {
      uVar11 = uVar10;
      uVar7 = uVar12 - heap.u32((0x00743ba2) + (uVar11 * 0x80) * 4);
      if (uVar7 < 0) {
        uVar7 = -uVar7;
      }
      uVar6 = extraout_CX - heap.u32((0x00743ba4) + (uVar11 * 0x80) * 4);
      if (uVar6 < 0) {
        uVar6 = -uVar6;
      }
      if (uVar7 < uVar6) {
        uVar7 = uVar6;
      }
      if (uVar7 < 0xa1) {
        heap.setU32(0x006293d6, (heap.u32(0x006293d6) + 1) >>> 0);
      }
      uVar10 = heap.u32((0x00743b98) + (uVar11 * 0x80) * 4);
    }
    uVar5 = uVar12;
    if ((4 < heap.u32(0x006293d2)) && (heap.u32(0x006293d6) < 0x14)) {
      return uVar5;
    }
    if ((0x27 < heap.u32(0x006293d0)) && (heap.u32(0x006293d6) < 8)) {
      return uVar5;
    }
    if ((heap.u32(0x006293d4) == 1) && (heap.u32(0x006293d6) < 0x14)) {
      return uVar5;
    }
    if (heap.u32(0x006293d6) < 2) {
      return uVar5;
    }
  }
  return uVar12;
}

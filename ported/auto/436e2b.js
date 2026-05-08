// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436e2b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../runtime/win32.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00436e2b(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00628aec = __sp + 0;
  const __addr_DAT_00628af1 = __sp + 4;
  const __addr_DAT_008dc0b4 = __sp + 8;
  const __addr_DAT_008dc0b8 = __sp + 12;
  const __addr_DAT_008dc0ba = __sp + 16;
  const __addr_DAT_00981efc = __sp + 20;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let cVar4 = 0;
  let cVar5 = 0;
  let cVar6 = 0;
  let cVar7 = 0;
  let unaff_EBX = 0;
  let iVar8 = 0;
  let uVar9 = 0;
  uVar2 = FUN_005df40c(heap);
  heap.setU32(0x00628ae9, ((undefined1)(uVar2 >>> 8)) >>> 0);
  uVar9 = (uint)(ushort)((byte)(((ushort)(uVar2 * heap.u32((ushort)(byte)(__addr_DAT_00628aec) + (unaff_EBX) * 4)) >>> 8) + heap.u32((__addr_DAT_00628af1) + (unaff_EBX) * 4)) + 0x7097);
  iVar8 = uVar9 * 0x10;
  pbVar10 = heap.u32((__addr_DAT_008dc0b4) + (uVar9 * 4) * 4);
  cVar3 = heap.u32((__addr_DAT_008dc0b8) + (iVar8) * 4);
  cVar4 = heap.u32((__addr_DAT_008dc0ba) + (iVar8) * 4);
  if ((uVar2 & 0x100) != 0) {
    cVar3 = heap.u32((__addr_DAT_008dc0ba) + (iVar8) * 4);
    cVar4 = heap.u32((__addr_DAT_008dc0b8) + (iVar8) * 4);
  }
  uVar9 = uVar2 >>> 0x10;
  cVar7 = (uVar2 >>> 0x10);
  cVar6 = (uVar2 >>> 0x18);
  if ((uVar2 & 0x100) == 0) {
    cVar5 = cVar3;
    if ((uVar2 & 0x200) == 0) {
      do {
        do {
          uVar2 = uVar9;
          bVar1 = heap.u32(pbVar10);
          pbVar10 = pbVar10 + 1;
          if (heap.u32((byte)(__addr_DAT_00981efc) + (uVar2) * 4) <= bVar1) {
            heap.u32((__addr_DAT_00981efc) + (uVar2) * 4) = bVar1;
          }
          cVar6 = uVar2 + '\x01';
          cVar5 = cVar5 + -1;
          uVar9 = CONCAT31(heap, (int3)(uVar2 >>> 8), cVar6);
        } while (cVar5 != '\0');
        cVar4 = cVar4 + -1;
        uVar9 = CONCAT11(heap, (uVar2 >>> 8) + '\x01', cVar6 - cVar3);
        cVar5 = cVar3;
      } while (cVar4 != '\0');
      return;
    }
    uVar2 = CONCAT11(heap, cVar6, cVar7 + cVar3 + -1);
    cVar6 = cVar3;
    do {
      do {
        uVar9 = uVar2;
        bVar1 = heap.u32(pbVar10);
        pbVar10 = pbVar10 + 1;
        if (heap.u32((byte)(__addr_DAT_00981efc) + (uVar9) * 4) <= bVar1) {
          heap.u32((__addr_DAT_00981efc) + (uVar9) * 4) = bVar1;
        }
        cVar7 = uVar9 + -1;
        cVar6 = cVar6 + -1;
        uVar2 = CONCAT31(heap, (int3)(uVar9 >>> 8), cVar7);
      } while (cVar6 != '\0');
      cVar4 = cVar4 + -1;
      uVar2 = CONCAT11(heap, (uVar9 >>> 8) + '\x01', cVar7 + cVar3);
      cVar6 = cVar3;
    } while (cVar4 != '\0');
    return;
  }
  cVar5 = cVar4;
  if ((uVar2 & 0x200) == 0) {
    do {
      do {
        bVar1 = heap.u32(pbVar10);
        pbVar10 = pbVar10 + 1;
        if (heap.u32((byte)(__addr_DAT_00981efc) + (uVar9) * 4) <= bVar1) {
          heap.u32((__addr_DAT_00981efc) + (uVar9) * 4) = bVar1;
        }
        cVar6 = uVar9;
        cVar7 = (uVar9 >>> 8) + '\x01';
        uVar9 = CONCAT11(heap, cVar7, cVar6);
        cVar5 = cVar5 + -1;
      } while (cVar5 != '\0');
      uVar9 = CONCAT11(heap, cVar7 - cVar4, cVar6 + '\x01');
      cVar3 = cVar3 + -1;
      cVar5 = cVar4;
    } while (cVar3 != '\0');
    return;
  }
  uVar2 = CONCAT11(heap, cVar6 + cVar4 + -1, cVar7);
  cVar6 = cVar4;
  do {
    do {
      bVar1 = heap.u32(pbVar10);
      pbVar10 = pbVar10 + 1;
      if (heap.u32((byte)(__addr_DAT_00981efc) + (uVar2) * 4) <= bVar1) {
        heap.u32((__addr_DAT_00981efc) + (uVar2) * 4) = bVar1;
      }
      cVar7 = uVar2;
      cVar5 = (uVar2 >>> 8) + -1;
      uVar2 = CONCAT11(heap, cVar5, cVar7);
      cVar6 = cVar6 + -1;
    } while (cVar6 != '\0');
    uVar2 = CONCAT11(heap, cVar5 + cVar4, cVar7 + '\x01');
    cVar3 = cVar3 + -1;
    cVar6 = cVar4;
  } while (cVar3 != '\0');
  return;
} finally {
    heap.freeFrame(24);
  }
}

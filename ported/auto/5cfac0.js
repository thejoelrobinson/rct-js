// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfac0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../runtime/win32.js";
export function FUN_005cfac0(heap) {
  let in_EAX = 0;
  let in_CX = 0;
  let uVar2 = 0;
  let in_DX = 0;
  let unaff_EBX = 0;
  let uVar3 = 0;
  let iVar5 = 0;
  heap.setU32(0x00652471, (unaff_EBX) >>> 0);
  if ((unaff_EBX & 4) == 0) {
    in_EAX = CONCAT22(heap, (in_EAX >>> 0x10), in_EAX + heap.u32((0x00652478) + (unaff_EBX * 2) * 4));
    in_CX = in_CX + heap.u32((0x0065247a) + (unaff_EBX * 2) * 4);
  }
  uVar2 = in_CX << 7 | in_CX >>> 9 | in_EAX;
  pbVar4 = heap.u32((0x00971ef4) + ((ushort)(uVar2 >>> 5 | uVar2 << 0xb)) * 4);
  do {
    if ((((heap.u32(pbVar4) & 0x3c) == 8) && (heap.u32(pbVar4 + (7) * 4) == heap.u32(0x00652470))) && ((heap.u32(pbVar4 + (5) * 4) & 0xf) == 0)) {
      iVar5 = heap.u32(pbVar4 + (4) * 4) * 10;
      uVar2 = CONCAT11(heap, heap.u32((0x00653ef7) + (iVar5) * 4), heap.u32((0x00653ef7) + (iVar5) * 4)) & 0x4ff;
      uVar3 = CONCAT11(heap, (uVar2 >>> 8), uVar2 + heap.u32(pbVar4)) & 0xffffff03;
      if (((byte)(uVar3 | (byte)(uVar3 >>> 8)) == unaff_EBX) && ((ushort)(heap.u32(pbVar4 + (2) * 4) * 4 + (heap.u32((0x00653ef9 + iVar5)) - heap.u32((heap.u32((0x00652498) + (heap.u32(pbVar4 + (4) * 4)) * 4) + 5)))) == in_DX)) {
        return CONCAT24(heap, heap.u32(pbVar4 + (2) * 4) << 2, in_EAX);
      }
    }
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT24(heap, in_DX, in_EAX);
    }
  } while (true);
}

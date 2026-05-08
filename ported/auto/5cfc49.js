// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfc49.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../runtime/ghidra-builtins.js";
export function FUN_005cfc49(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00652478 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_PTR_DAT_00652498 = __sp + 12;
  const __addr_DAT_00653ef8 = __sp + 16;
  const __addr_DAT_00653efb = __sp + 20;
  const __addr_DAT_00653efd = __sp + 24;
  const __addr_DAT_00653eff = __sp + 28;
  try {
  let uVar2 = 0;
  let sVar3 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar4 = 0;
  let in_DX = 0;
  let unaff_EBX = 0;
  let uVar5 = 0;
  let iVar7 = 0;
  heap.setU32(0x00652471, (unaff_EBX) >>> 0);
  uVar5 = unaff_EBX ^ 2;
  if ((uVar5 & 4) == 0) {
    in_EAX = CONCAT22((in_EAX >>> 0x10), in_EAX + heap.u32((__addr_DAT_00652478) + (uVar5 * 2) * 4));
    in_CX = in_CX + heap.u32((__addr_DAT_0065247a) + (uVar5 * 2) * 4);
  }
  uVar2 = in_EAX;
  uVar4 = in_CX << 7 | in_CX >>> 9 | uVar2;
  pbVar6 = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
  do {
    if ((((heap.u32(pbVar6) & 0x3c) == 8) && (heap.u32(pbVar6 + (7) * 4) == heap.u32(0x00652470))) && (heap.u32(heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar6 + (4) * 4)) * 4) + ((heap.u32((pbVar6 + 5)) & 0xf) * 10 + 10) * 4) == -1)) {
      iVar7 = heap.u32(pbVar6 + (4) * 4) * 10;
      uVar4 = CONCAT11(heap.u32((__addr_DAT_00653ef8) + (iVar7) * 4), heap.u32((__addr_DAT_00653ef8) + (iVar7) * 4)) & 0x4ff;
      uVar5 = CONCAT11((uVar4 >>> 8), uVar4 + heap.u32(pbVar6)) & 0xffffff03;
      if (((byte)(uVar5 | (byte)(uVar5 >>> 8)) == unaff_EBX) && ((heap.u32(pbVar6 + (2) * 4) * 4 + (heap.u32((__addr_DAT_00653efb + iVar7)) - heap.u32((heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar6 + (4) * 4)) * 4) + (heap.u32(pbVar6 + (5) * 4) & 0xf) * 10 + 5)))) == in_DX)) {
        switch (heap.u32(pbVar6) & 3) {
          case 0:
            sVar3 = uVar2 - heap.u32((__addr_DAT_00653efd + heap.u32(pbVar6 + (4) * 4) * 10));
            break;
          case 1:
            sVar3 = uVar2 - heap.u32((__addr_DAT_00653eff + heap.u32(pbVar6 + (4) * 4) * 10));
            break;
          case 2:
            sVar3 = uVar2 + heap.u32((__addr_DAT_00653efd + heap.u32(pbVar6 + (4) * 4) * 10));
            break;
          case 3:
            sVar3 = uVar2 + heap.u32((__addr_DAT_00653eff + heap.u32(pbVar6 + (4) * 4) * 10));
        }
        return CONCAT24(heap.u32(pbVar6 + (2) * 4) * 4 + (heap.u32((heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar6 + (4) * 4)) * 4) + 5)) - heap.u32((heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar6 + (4) * 4)) * 4) + (heap.u32((pbVar6 + 5)) & 0xf) * 10 + 5))), CONCAT22(sVar3, uVar2));
      }
    }
    pbVar1 = pbVar6 + 1;
    pbVar6 = pbVar6 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT24(in_DX, in_EAX);
    }
  } while (true);
} finally {
    heap.freeFrame(32);
  }
}

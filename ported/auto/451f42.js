// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451f42.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
export function FUN_00451f42(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_00652478 = __sp + 4;
  const __addr_DAT_0065247a = __sp + 8;
  try {
  let bVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = 0;
  let uVar8 = 0;
  let unaff_ESI = 0;
  uVar6 = (byte)(in_EAX >>> 8);
  uVar4 = in_EAX * 0x20;
  uVar7 = uVar6 * 0x20;
  bVar2 = heap.u32((unaff_EBX + 0x32 + unaff_ESI));
  pbVar9 = heap.u32((__addr_DAT_00971ef4) + (((uVar6 << 0xc | uVar4) >>> 5 | (uVar7 >>> 9) << 0xb)) * 4);
  while ((heap.u32(pbVar9) & 0x3c) != 0x10 || (bVar2 != heap.u32(pbVar9 + (2) * 4))) {
    pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return uVar4;
    }
  }
  uVar8 = heap.u32(pbVar9) & 3;
  uVar5 = (uVar4 - heap.u32((__addr_DAT_00652478) + (uVar8 * 2) * 4));
  uVar7 = uVar7 - heap.u32((__addr_DAT_0065247a) + (uVar8 * 2) * 4);
  uVar4 = uVar7 * 0x80 | uVar7 >>> 9 | uVar4 - heap.u32((__addr_DAT_00652478) + (uVar8 * 2) * 4);
  puVar10 = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
  do {
    uVar5 = CONCAT31((int3)(uVar5 >>> 8), heap.u32(puVar10)) & 0xffffff3c;
    if (uVar5 == '\x04') {
      if ((heap.u32(puVar10 + (4) * 4) & 4) == 0) {
        bVar3 = heap.u32(puVar10 + (2) * 4);
      } else {
        uVar5 = CONCAT31((int3)(uVar5 >>> 8), heap.u32(puVar10 + (4) * 4)) & 0xffffff03;
        if (uVar5 == uVar8) {
          bVar3 = heap.u32(puVar10 + (2) * 4) + 4;
          uVar5 = CONCAT31((int3)(uVar5 >>> 8), bVar3);
        } else {
          uVar5 = uVar5 ^ 2;
          if (uVar5 != uVar8) {
            /* goto LAB_00451fe5 */ throw new Error("goto LAB_00451fe5 not supported");
          }
          bVar3 = heap.u32(puVar10 + (2) * 4);
        }
      }
      if (bVar3 == bVar2) {
        return uVar5;
      }
    }
    LAB_00451fe5: pbVar9 = puVar10 + 1;
    puVar10 = puVar10 + 8;
    if ((heap.u32(pbVar9) & 0x80) != 0) {
      return uVar5;
    }
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4202b2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../runtime/ghidra-builtins.js";
import { FUN_00423677 } from "./423677.js";
export function FUN_004202b2(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let sVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let extraout_DX = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let unaff_EDI = 0;
  uVar6 = 0;
  do {
    if (heap.u32((unaff_EDI + uVar6 * 2 + 0x2a)) != -1) {
      bVar7 = heap.u32((unaff_EDI + uVar6 * 2 + 0x32));
      sVar2 = FUN_00423677(heap);
      if ((bVar7 << 2) < extraout_DX) {
        return;
      }
      uVar4 = extraout_CX - 0xa0;
      iVar9 = 0;
      uVar5 = sVar2 - 0xa0;
      do {
        do {
          uVar3 = uVar5;
          iVar8 = iVar9;
          if ((uVar3 < 0xfff) && (uVar4 < 0xfff)) {
            uVar5 = uVar4 << 7 | uVar4 >>> 9 | uVar3;
            iVar9 = heap.u32((__addr_DAT_00971ef4) + ((uVar5 >>> 5 | uVar5 << 0xb)) * 4);
            do {
              pbVar1 = (iVar9 + 1);
              iVar9 = iVar9 + 8;
            } while ((heap.u32(pbVar1) & 0x80) == 0);
          }
          bVar7 = iVar8 + 1;
          iVar9 = CONCAT31((int3)(iVar8 >>> 8), bVar7);
          uVar5 = uVar3 + 0x20;
        } while (bVar7 < 0xb);
        uVar4 = uVar4 + 0x20;
        bVar7 = (iVar8 >>> 8) + 1;
        iVar9 = bVar7 << 8;
        uVar5 = uVar3 - 0x140;
      } while (bVar7 < 0xb);
      return;
    }
    uVar6 = uVar6 + 1;
  } while (uVar6 < 4);
  return;
} finally {
    heap.freeFrame(4);
  }
}

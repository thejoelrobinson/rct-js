// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439822.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1 } from "../../runtime/ghidra-builtins.js";
export function FUN_00439822(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_0062d4ac = __sp + 0;
  try {
  let bVar3 = 0;
  let cVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let unaff_ESI = 0;
  let uVar10 = 0;
  if (heap.u32((unaff_ESI + 0x2e)) != '\x01') {
    if ((heap.u32((unaff_ESI + 0xad)) != -1) && (heap.u32((unaff_ESI + 0xae)) = heap.u32((unaff_ESI + 0xae)) + 1, 0x2cf < heap.u32((unaff_ESI + 0xae)))) {
      heap.u32((unaff_ESI + 0xad)) = 0xff;
    }
    uVar6 = 0;
    iVar8 = 0;
    uVar10 = 0xffffffff;
    LAB_00439857: do {
      iVar9 = iVar8;
      uVar7 = uVar10;
      if (heap.u32((unaff_ESI + 0xb0 + uVar6 * 4)) == -1) {
        break;
      }
      cVar4 = heap.u32((unaff_ESI + 0xb2 + uVar6 * 4));
      if (cVar4 == '\x01') {
        pcVar2 = (unaff_ESI + 0xb3 + uVar6 * 4);
        heap.u32(pcVar2) = heap.u32(pcVar2) + '\x01';
        iVar9 = iVar8 + 1;
        if (0xdb < heap.u32((unaff_ESI + 0xb3 + uVar6 * 4))) {
          heap.u32((unaff_ESI + 0xb3 + uVar6 * 4)) = 0;
          pcVar2 = (unaff_ESI + 0xb2 + uVar6 * 4);
          heap.u32(pcVar2) = heap.u32(pcVar2) + '\x01';
          iVar9 = iVar8;
        }
      } else {
        uVar7 = uVar6;
        if (cVar4 != '\0') {
          pcVar2 = (unaff_ESI + 0xb3 + uVar6 * 4);
          cVar4 = heap.u32(pcVar2);
          heap.u32(pcVar2) = heap.u32(pcVar2) + '\x01';
          uVar7 = uVar10;
          if ((cVar4 == -1) && (pcVar2 = (unaff_ESI + 0xb2 + uVar6 * 4), heap.u32(pcVar2) = heap.u32(pcVar2) + '\x01', 0x1b < heap.u32((unaff_ESI + 0xb2 + uVar6 * 4)))) {
            heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 1;
            for (uVar7 = uVar6; uVar7 != 4; uVar7 = uVar7 + 1) {
              heap.u32((unaff_ESI + 0xb0 + uVar7 * 4)) = heap.u32((unaff_ESI + 0xb4 + uVar7 * 4));
            }
            heap.u32((unaff_ESI + 0xc0)) = 0xff;
            /* goto LAB_00439857 */ throw new Error("goto LAB_00439857 not supported");
          }
        }
      }
      uVar6 = uVar6 + 1;
      iVar8 = iVar9;
      uVar10 = uVar7;
    } while (uVar6 < 5);
    if ((iVar9 == 0) && (uVar7 != 0xffffffff)) {
      heap.u32((unaff_ESI + 0xb2 + uVar7 * 4)) = 1;
      heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 1;
    }
  }
  bVar5 = heap.u32((unaff_ESI + 0x38));
  if ((heap.u32((unaff_ESI + 200)) & 2) != 0) {
    bVar5 = bVar5 >>> 1;
  }
  pbVar1 = (unaff_ESI + 0x73);
  bVar3 = heap.u32(pbVar1);
  heap.u32(pbVar1) = heap.u32(pbVar1) + bVar5;
  if (!CARRY1(bVar3, bVar5)) {
    return;
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_0062d4ac) + (heap.u32((unaff_ESI + 0x2b))) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}

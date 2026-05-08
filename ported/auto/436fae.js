// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436fae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0043725f } from "./43725f.js";
export function FUN_00436fae(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let in_EAX = 0;
  let bVar5 = 0;
  let in_CX = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let bVar8 = 0;
  let in_EDX = 0;
  let unaff_BL = 0;
  let bVar9 = 0;
  let cVar10 = 0;
  let pbVar11 = 0;
  heap.setU32(0x00628af6, (1) >>> 0);
  uVar6 = in_EAX;
  if ((((0xfdf < uVar6) || (0xfdf < in_CX)) || (uVar6 < 0x20)) || (in_CX < 0x20)) {
    heap.setU32(0x00991efc, (0x458) >>> 0);
    return CONCAT44(in_EDX, in_EAX);
  }
  uVar6 = in_CX << 7 | in_CX >>> 9 | uVar6;
  pbVar11 = heap.u32((__addr_DAT_00971ef4) + ((uVar6 >>> 5 | uVar6 << 0xb)) * 4);
  do {
    bVar8 = in_EDX;
    bVar3 = (in_EDX >>> 8);
    bVar9 = unaff_BL;
    if ((heap.u32(pbVar11) & 0x3c) == 0) {
      if (((heap.u32(pbVar11 + (5) * 4) & 0x1f) != 0) && (((bVar2 = (heap.u32(pbVar11 + (5) * 4) & 0x1f) << 2, bVar8 < bVar2 && (heap.u32(pbVar11 + (2) * 4) < bVar3)) && (heap.setU32(0x00628af6, (heap.u32(0x00628af6) | 4) >>> 0), bVar2 < bVar3)))) {
        heap.setU32(0x00991efc, (0x459) >>> 0);
        return CONCAT44(in_EDX, in_EAX);
      }
      if ((unaff_BL & 0xf0) != 0xf0) {
        bVar2 = heap.u32(pbVar11 + (2) * 4);
        if (bVar2 < bVar3) {
          bVar9 = heap.u32(pbVar11 + (4) * 4);
          uVar6 = CONCAT11(bVar9, unaff_BL) & 0x1fff;
          cVar10 = (uVar6 >>> 8);
          bVar3 = bVar2;
          if (((bVar9 & 1) != 0) && (bVar3 = bVar2 + 4, cVar10 == '\x1b')) {
            bVar3 = bVar2 + 8;
          }
          bVar4 = bVar2;
          if (((bVar9 & 2) != 0) && (bVar4 = bVar2 + 4, cVar10 == '\x17')) {
            bVar4 = bVar2 + 8;
          }
          bVar5 = bVar2;
          if (((bVar9 & 4) != 0) && (bVar5 = bVar2 + 4, cVar10 == '\x1e')) {
            bVar5 = bVar2 + 8;
          }
          bVar7 = bVar2;
          if (((bVar9 & 8) != 0) && (bVar7 = bVar2 + 4, cVar10 == '\x1d')) {
            bVar7 = bVar2 + 8;
          }
          bVar9 = uVar6;
          bVar2 = bVar8 + 8;
          if ((((unaff_BL & 1) != 0) && ((((unaff_BL & 0x10) == 0 && (bVar8 < bVar3)) || (bVar2 < bVar3)))) || (((((unaff_BL & 2) != 0 && ((((unaff_BL & 0x20) == 0 && (bVar8 < bVar4)) || (bVar2 < bVar4)))) || (((unaff_BL & 4) != 0 && ((((unaff_BL & 0x40) == 0 && (bVar8 < bVar5)) || (bVar2 < bVar5)))))) || (((unaff_BL & 8) != 0 && ((((unaff_BL & 0x80) == 0 && (bVar8 < bVar7)) || (bVar2 < bVar7)))))))) {
            /* goto LAB_0043710e */ throw new Error("goto LAB_0043710e not supported");
          }
        } else {
          heap.setU32(0x00628af6, (heap.u32(0x00628af6) & 0xfe | 2) >>> 0);
        }
      }
    } else {
      if ((((heap.u32(pbVar11) & 0x3c) != 0x3c) && (bVar8 < heap.u32(pbVar11 + (3) * 4))) && ((heap.u32(pbVar11 + (2) * 4) < bVar3 && (((heap.u32(pbVar11 + (1) * 4) & 0x10) == 0 && ((heap.u32(pbVar11 + (1) * 4) & unaff_BL & 0xf) != 0)))))) {
      LAB_0043710e: FUN_0043725f(heap);
      return CONCAT44(in_EDX, in_EAX);
    }
    }
    unaff_BL = bVar9;
    pbVar1 = pbVar11 + 1;
    pbVar11 = pbVar11 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT44(in_EDX, in_EAX);
    }
  } while (true);
} finally {
    heap.freeFrame(4);
  }
}

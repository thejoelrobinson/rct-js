// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44189c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/win32.js";
import { FUN_0044189c } from "./44189c.js";
export function FUN_0044189c(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00652478 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_00630e58 = __sp + 12;
  try {
  let uVar2 = 0;
  let in_AX = 0;
  let in_CX = 0;
  let in_DX = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let unaff_EBP = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_DI = 0;
  code_r0x0044189c: in_AX = in_AX + heap.u32((__addr_DAT_00652478) + (unaff_EBP * 2) * 4);
  in_CX = in_CX + heap.u32((__addr_DAT_0065247a) + (unaff_EBP * 2) * 4);
  bVar3 = (in_DX >>> 8) + 1;
  if (200 < bVar3) {
    return;
  }
  uVar7 = heap.u32(0x006293bc) - in_AX;
  if (uVar7 < 0) {
    uVar7 = -uVar7;
  }
  uVar5 = heap.u32(0x006293be) - in_CX;
  if (uVar5 < 0) {
    uVar5 = -uVar5;
  }
  uVar8 = uVar7;
  if (uVar7 <= uVar5) {
    uVar8 = uVar5;
    uVar5 = uVar7;
  }
  bVar4 = heap.u32(0x006293c0) - in_DX;
  if (bVar4 < '\0') {
    bVar4 = -bVar4;
  }
  uVar7 = uVar8 + (uVar5 >>> 1) + bVar4;
  if ((uVar7 <= unaff_DI) && (((uVar7 < unaff_DI || (bVar3 < heap.u32(0x006293c1))) && (unaff_DI = uVar7, heap.setU32(0x006293c1, (bVar3) >>> 0), uVar7 == 0)))) {
    return;
  }
  uVar7 = in_CX * 0x80 | in_CX >>> 9 | in_AX;
  pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar7 >>> 5 | uVar7 << 0xb)) * 4);
  do {
    if ((heap.u32(pbVar9) & 0x3c) == 4) {
      if (((heap.u32(pbVar9 + (4) * 4) & 4) == 0) || ((heap.u32(pbVar9 + (4) * 4) & 3) == unaff_EBP)) {
        bVar4 = heap.u32(pbVar9 + (2) * 4);
      } else {
        if ((heap.u32(pbVar9 + (4) * 4) & 3 ^ 2) != unaff_EBP) {
          /* goto LAB_00441933 */ throw new Error("goto LAB_00441933 not supported");
        }
        bVar4 = heap.u32(pbVar9 + (2) * 4) + 4;
      }
      if ((in_DX == bVar4) && (heap.u32(pbVar9 + (4) * 4) != 0 || heap.u32(0x006293c8) != '\0')) {
        break;
      }
    }
    LAB_00441933: pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return;
    }
  } while (true);
  in_DX = CONCAT11(heap, bVar3, heap.u32(pbVar9 + (2) * 4));
  uVar6 = (uint)(heap.u32(pbVar9 + (6) * 4) & heap.u32((__addr_DAT_00630e58) + (heap.u32(pbVar9 + (6) * 4)) * 4)) & ~(1 << ((unaff_EBP ^ 2) & 0x1f));
  unaff_EBP = 0;
  if (uVar6 != 0) {
    for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = unaff_EBP + 1) {
    
    }
  }
  if (uVar6 == 0) {
    return;
  }
  uVar6 = uVar6 & ~(1 << (unaff_EBP & 0x1f));
  if (uVar6 != 0) {
    if (heap.u16(0x6293c6) != 0) {
      heap.u8(0x6293c4) = heap.u32(0x006293c4) + -1;
    }
    heap.u8(0x6293c4) = heap.u32(0x006293c4) + -1;
    uVar2 = heap.u32(0x006293c4);
    if (heap.u32(0x006293c4) < '\0') {
      return;
    }
    do {
      uVar6 = uVar6 & ~(1 << (unaff_EBP & 0x1f));
      heap.setU32(0x006293c4, (uVar2 & 0xffff) >>> 0);
      FUN_0044189c(heap, pbVar9, in_DX, uVar6, in_AX);
      heap.setU32(0x006293c4, (uVar2) >>> 0);
      unaff_EBP = 0;
      if (uVar6 != 0) {
        for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = unaff_EBP + 1) {
        
        }
      }
    } while (uVar6 != 0);
    return;
  }
  if (((heap.u32(pbVar9 + (4) * 4) & 4) != 0) && ((heap.u32(pbVar9 + (4) * 4) & 3) == unaff_EBP)) {
    in_DX = CONCAT11(heap, bVar3, heap.u32(pbVar9 + (2) * 4) + 4);
  }
  heap.u16(0x6293c6) = heap.u16(0x6293c6) + 1;
  /* goto code_r0x0044189c */ throw new Error("goto code_r0x0044189c not supported");
} finally {
    heap.freeFrame(16);
  }
}

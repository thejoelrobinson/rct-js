// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e2b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/win32.js";
import { FUN_0042e276 } from "./42e276.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e2b0(heap) {
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_EBP = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let unaff_ESI = 0;
  let uVar11 = 0;
  uVar6 = (uint)(heap.u32((unaff_ESI + 0x1e)) >>> 3);
  sVar2 = heap.u32((unaff_ESI + 0xe)) + heap.u32((0x00652478) + (uVar6 * 2) * 4);
  uVar4 = heap.u32((unaff_ESI + 0x12)) >>> 2;
  uVar8 = unaff_EBP & 0xffff0000;
  uVar7 = 0;
  do {
    uVar3 = heap.u32((unaff_ESI + 0x10)) + heap.u32((0x0065247a) + (uVar6 * 2) * 4) + heap.u32((0x005f8076) + (uVar7 * 2) * 4);
    uVar3 = uVar3 * 0x80 | uVar3 >>> 9 | sVar2 + heap.u32((0x005f8074) + (uVar7 * 2) * 4);
    puVar10 = heap.u32((0x00971ef4) + ((ushort)(uVar3 >>> 5 | uVar3 << 0xb)) * 4);
    do {
      uVar4 = CONCAT11(heap, heap.u32(puVar10), uVar4) & 0x3cff;
      if ((((uVar4 >>> 8) == '\x04') && (uVar4 == heap.u32(puVar10 + (2) * 4))) && (uVar4 = CONCAT11(heap, heap.u32(puVar10 + (5) * 4), uVar4) & 0xfff, (uVar4 >>> 8) == '\x05')) {
        uVar8 = CONCAT22(heap, (uVar8 >>> 0x10), uVar8 | 1 << (uVar7 & 0xf));
        break;
      }
      pbVar1 = puVar10 + 1;
      puVar10 = puVar10 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    uVar7 = uVar7 + 1;
  } while (uVar7 < 8);
  uVar4 = uVar8;
  if (uVar4 == 0) {
    return sVar2;
  }
  uVar11 = FUN_005df40c(heap);
  uVar5 = (undefined4)(uVar11 >>> 0x20);
  if ((heap.u32((unaff_ESI + 0x2f)) & 8) != 0) {
    return sVar2;
  }
  if ((heap.u32((unaff_ESI + 0x2f)) & 2) == 0) {
    if ((heap.u32((unaff_ESI + 0x2f)) & 0x10) == 0) {
      if ((heap.u32((unaff_ESI + 0x2f)) & 4) != 0) {
        LAB_0042e38c: if (2 < heap.u32((unaff_ESI + 0x46))) {
          return sVar2;
        }
        uVar3 = (heap.u32((unaff_ESI + 0x1e)) >>> 3 ^ 2) * 2;
        uVar9 = CONCAT22(heap, (uVar8 >>> 0x10), uVar4 & ~(1 << (uVar3 & 0xf)) & ~(1 << (uVar3 + 1 & 0xf)));
        uVar6 = 0;
        do {
          if ((uVar9 >>> (uVar6 & 0xf) & 1) != 0) {
            sVar2 = FUN_0042e276(heap, uVar9, uVar5);
          }
          if ((uVar9 >>> (uVar6 + 1 & 0xf) & 1) != 0) {
            sVar2 = FUN_0042e276(heap, uVar9, uVar5);
          }
          uVar6 = uVar6 + 2;
        } while (uVar6 < 8);
        return sVar2;
      }
      if (uVar11 < 0x2000) {
        return sVar2;
      }
      for (uVar6 = uVar11 & 7; (uVar4 >>> uVar6 & 1) == 0; uVar6 = (uint)(uVar6 + 1U & 7)) {
      
      }
    } else {
      heap.u32((unaff_ESI + 0x46)) = heap.u32((unaff_ESI + 0x46)) + 1;
      if (7 < heap.u32((unaff_ESI + 0x46))) {
        return sVar2;
      }
      uVar3 = (ushort)(byte)(heap.u32((unaff_ESI + 0x1e)) >>> 3 ^ 2) * 2;
      if (((uVar4 >>> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >>> (uVar3 + 1 & 0xf) & 1) == 0)) {
        return sVar2;
      }
    }
  } else {
    uVar3 = (ushort)(heap.u32((unaff_ESI + 0x1e)) >>> 3) * 2;
    if (((uVar4 >>> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >>> (uVar3 + 1 & 0xf) & 1) == 0)) {
      if (uVar11 < 0x3333) {
        return sVar2;
      }
      if ((heap.u32((unaff_ESI + 0x2f)) & 4) != 0) {
        /* goto LAB_0042e38c */ throw new Error("goto LAB_0042e38c not supported");
      }
      for (uVar6 = uVar11 & 7; (uVar4 >>> uVar6 & 1) == 0; uVar6 = (uint)(uVar6 + 1U & 7)) {
      
      }
    }
  }
  sVar2 = FUN_0042e276(heap);
  return sVar2;
}

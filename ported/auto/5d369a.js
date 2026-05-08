// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d369a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_00426f56 } from "./426f56.js";
export function FUN_005d369a(heap) {
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EDX = 0;
  let uVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = 0;
  let uVar8 = 0;
  let uVar10 = 0;
  let uVar9 = 0;
  let uVar11 = 0;
  let iVar13 = 0;
  heap.setU32(0x006522c1, (0) >>> 0);
  uVar8 = unaff_EBX & 0xffff0000;
  do {
    uVar11 = 0;
    LAB_005d36aa: do {
      puVar12 = heap.u32((0x00971ef4) + ((ushort)((ushort)(uVar11 << 7 | uVar11 >>> 9 | uVar8) >>> 5 | (uVar11 >>> 9) << 0xb)) * 4);
      do {
        in_EDX = CONCAT22(heap, (in_EDX >>> 0x10), CONCAT11(heap, heap.u32(puVar12), in_EDX)) & 0xffff3cff;
        uVar10 = (undefined2)(uVar8 >>> 0x10);
        if (((in_EDX >>> 8) == '\b') && (in_EDX == heap.u32(puVar12 + (7) * 4))) {
          uVar3 = uVar8 & 0xffff;
          uVar4 = uVar11;
          iVar13 = heap.u32(puVar12 + (2) * 4) << 2;
          uVar9 = CONCAT31(heap, CONCAT21(heap, uVar10, heap.u32(puVar12)), 1) & 0xffff03ff;
          if (heap.u32(puVar12 + (4) * 4) == 'e') {
            uVar5 = CONCAT22(heap, (in_EDX >>> 0x10), CONCAT11(heap, 2, heap.u32(puVar12 + (7) * 4)));
            uVar2 = uVar9 >>> 0x10;
            bVar6 = uVar9;
            FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3);
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(heap, uVar2, bVar6)) >>> 0);
            uVar2 = uVar9 >>> 0x10;
            uVar7 = uVar9;
            FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3);
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(heap, uVar2, CONCAT11(heap, 1, uVar7))) >>> 0);
            uVar2 = uVar9 >>> 0x10;
            uVar7 = uVar9;
            FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3);
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(heap, uVar2, CONCAT11(heap, 2, uVar7))) >>> 0);
            FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3);
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(heap, (uVar9 >>> 0x10), CONCAT11(heap, 3, uVar9))) >>> 0);
          } else {
            FUN_00426f56(heap);
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + uVar9) >>> 0);
          }
          /* goto LAB_005d36aa */ throw new Error("goto LAB_005d36aa not supported");
        }
        pbVar1 = puVar12 + 1;
        puVar12 = puVar12 + 8;
      } while ((heap.u32(pbVar1) & 0x80) == 0);
      uVar11 = uVar11 + 0x20;
    } while (uVar11 < 0x1000);
    uVar11 = uVar8 + 0x20;
    uVar8 = CONCAT22(heap, uVar10, uVar11);
    if (0xfff < uVar11) {
      return;
    }
  } while (true);
}

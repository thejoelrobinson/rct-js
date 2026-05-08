// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45897e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, LOCK, UNLOCK } from "../runtime/win32.js";
export function FUN_0045897e(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let unaff_DI = 0;
  uVar6 = heap.u32(0x00971e84);
  heap.setU32(0x00642fc0, (0) >>> 0);
  do {
    uVar5 = 0;
    heap.setU32(0x00642fbc, (0x0) >>> 0);
    LAB_0045899d: do {
      puVar7 = unaff_ESI;
      bVar4 = (byte) * puVar7;
      unaff_ESI = (puVar7 + 1);
      if (bVar4 == 0) {
        return;
      }
      if (bVar4 == 0x20) {
        heap.setU32(0x00642fbc, (unaff_ESI) >>> 0);
      }
      puVar3 = unaff_ESI;
      if (bVar4 == 5) {
        /* goto LAB_004589d8 */ throw new Error("goto LAB_004589d8 not supported");
      }
      if (bVar4 < 0x20) {
        if (bVar4 < 5) {
          unaff_ESI = (puVar7 + 2);
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 == 7) {
          uVar6 = 0x1c0;
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 == 8) {
          uVar6 = 0x2a0;
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 == 9) {
          uVar6 = 0xe0;
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 == 10) {
          uVar6 = 0;
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 < 0x11) {
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        if (bVar4 != 0x17) {
          unaff_ESI = (puVar7 + 3);
          if (0x16 < bVar4) {
            unaff_ESI = (puVar7 + 5);
          }
          /* goto LAB_0045899d */ throw new Error("goto LAB_0045899d not supported");
        }
        uVar2 = heap.u32(unaff_ESI);
        unaff_ESI = (puVar7 + 5);
        uVar5 = uVar5 + heap.u32((0x008dc0b8 + (uVar2 & 0x1ffff) * 0x10));
      } else {
        uVar5 = CONCAT11(heap, (uVar5 >>> 8) + CARRY1(heap, uVar5, heap.u32((0x0099a508) + ((byte)(bVar4 - 0x20) + uVar6) * 4)), uVar5 + heap.u32((0x0099a508) + ((byte)(bVar4 - 0x20) + uVar6) * 4));
      }
    } while (uVar5 <= unaff_DI);
    puVar3 = heap.u32(0x00642fbc);
    if (heap.u32(0x00642fbc) == 0x0) {
      pbVar8 = (unaff_ESI + -1);
      bVar4 = 0;
      do {
        LOCK(heap);
        bVar1 = heap.u32(pbVar8);
        heap.u32(pbVar8) = bVar4;
        UNLOCK(heap);
        pbVar8 = pbVar8 + 1;
        bVar4 = bVar1;
      } while (bVar1 != 0);
      heap.u32(pbVar8) = 0;
      heap.setU32(0x00642fc0, (heap.u32(0x00642fc0) + 1) >>> 0);
    } else {
      LAB_004589d8: unaff_ESI = puVar3;
      heap.setU32(0x00642fc0, (heap.u32(0x00642fc0) + 1) >>> 0);
      heap.u32((unaff_ESI + -1)) = 0;
    }
  } while (true);
}

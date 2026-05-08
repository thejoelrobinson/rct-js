// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3277.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/win32.js";
export function FUN_005d3277(heap) {
  let bVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  puVar6 = 0xffffffff;
  uVar4 = 0;
  uVar3 = in_EDX & 0x7fffffff;
  bVar2 = false;
  do {
    uVar5 = 0;
    do {
      puVar7 = heap.u32((0x00971ef4) + ((ushort)((ushort)(uVar5 << 7 | uVar5 >>> 9 | uVar4) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4);
      do {
        uVar3 = CONCAT11(heap, heap.u32(puVar7), uVar3) & 0xffff3cff;
        if (((uVar3 >>> 8) == '\b') && (uVar3 == heap.u32(puVar7 + (7) * 4))) {
          if (puVar6 == 0xffffffff) {
            LAB_005d32fd: puVar6 = puVar7;
            if ((heap.u32(puVar7 + (4) * 4) != '\x02') && (heap.u32(puVar7 + (4) * 4) != '\x03')) {
              if ((heap.u32((0x006559d8) + (heap.u32(puVar7 + (4) * 4) * 0x10) * 4) & 0x10) != 0) {
                bVar2 = true;
              }
            }
          } else {
            if (((!bVar2) && (heap.u32(puVar7 + (4) * 4) != '\x02')) && (heap.u32(puVar7 + (4) * 4) != '\x03')) {
            if ((heap.u32((0x006559d8) + (heap.u32(puVar7 + (4) * 4) * 0x10) * 4) & 0x10) != 0) {
              /* goto LAB_005d32fd */ throw new Error("goto LAB_005d32fd not supported");
            }
          }
          }
        }
        pbVar1 = puVar7 + 1;
        puVar7 = puVar7 + 8;
      } while ((heap.u32(pbVar1) & 0x80) == 0);
      uVar5 = uVar5 + 0x20;
    } while (uVar5 < 0x1000);
    uVar4 = uVar4 + 0x20;
    if (0xfff < uVar4) {
      return;
    }
  } while (true);
}

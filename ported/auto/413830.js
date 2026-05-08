// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413830.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapAlloc } from "../../runtime/win32.js";
import { FUN_004153f0 } from "./4153f0.js";
import { FUN_00415770 } from "./415770.js";
export function FUN_00413830(heap, param_1, param_2) {
  let iVar1 = 0;
  let uVar2 = 0;
  let puVar3 = 0;
  let dwBytes = 0;
  let puVar4 = 0;
  dwBytes = param_2 * param_1;
  if (dwBytes < 0xffffffe1) {
    if (dwBytes == 0) {
      dwBytes = 0x10;
    } else {
      dwBytes = dwBytes + 0xf & 0xfffffff0;
    }
  }
  do {
    puVar3 = 0x0;
    if (dwBytes < 0xffffffe1) {
      if (heap.u32(0x005ee524) < dwBytes) {
        LAB_00413890: if (puVar3 != 0x0) {
          return puVar3;
        }
      } else {
        puVar3 = FUN_00415770(heap, dwBytes >>> 4);
        if (puVar3 != 0x0) {
          puVar4 = puVar3;
          for (uVar2 = dwBytes >>> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
            heap.setU32(puVar4, (0) >>> 0);
            puVar4 = puVar4 + 1;
          }
          for (uVar2 = dwBytes & 3; uVar2 != 0; uVar2 = uVar2 - 1) {
            heap.setU32(puVar4, (0) >>> 0);
            puVar4 = (puVar4 + 1);
          }
          /* goto LAB_00413890 */ throw new Error("goto LAB_00413890 not supported");
        }
      }
      puVar3 = HeapAlloc(heap, heap.u32(0x005f3e44), 8, dwBytes);
    }
    if ((puVar3 != 0x0) || (heap.u32(0x005f0244) == 0)) {
      return puVar3;
    }
    iVar1 = FUN_004153f0(heap, dwBytes);
    if (iVar1 == 0) {
      return 0x0;
    }
  } while (true);
}

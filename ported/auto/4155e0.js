// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4155e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { VirtualFree } from "../../runtime/win32.js";
import { FUN_00415580 } from "./415580.js";
export function FUN_004155e0(heap, param_1) {
  let BVar1 = 0;
  let iVar3 = 0;
  let iVar4 = 0;
  puVar5 = heap.u32(0x005ec504);
  do {
    puVar6 = puVar5;
    if (heap.u32((puVar5 + 0x10)) != -1) {
      iVar4 = 0;
      piVar2 = (puVar5 + 0x2010);
      iVar3 = 0x3ff000;
      do {
        if (heap.u32(piVar2) == 0xf0) {
          BVar1 = VirtualFree(heap, (heap.u32((puVar5 + 0x10)) + iVar3), 0x1000, 0x4000);
          if (BVar1 != 0) {
            heap.u32(piVar2) = -1;
            heap.setU32(0x005f024c, (heap.u32(0x005f024c) + -1) >>> 0);
            if ((heap.u32((puVar5 + 0xc)) == 0x0) || (piVar2 < heap.u32((puVar5 + 0xc)))) {
              heap.u32((puVar5 + 0xc)) = piVar2;
            }
            iVar4 = iVar4 + 1;
            param_1 = param_1 + -1;
            if (param_1 == 0) {
              break;
            }
          }
        }
        iVar3 = iVar3 + -0x1000;
        piVar2 = piVar2 + -2;
      } while (-1 < iVar3);
      puVar6 = heap.u32((puVar5 + 4));
      if ((iVar4 != 0) && (heap.u32((puVar5 + 0x18)) == -1)) {
        iVar3 = 1;
        piVar2 = (puVar5 + 0x20);
        do {
          if (heap.u32(piVar2) != -1) {
            break;
          }
          iVar3 = iVar3 + 1;
          piVar2 = piVar2 + 2;
        } while (iVar3 < 0x400);
        if (iVar3 == 0x400) {
          FUN_00415580(heap, puVar5);
        }
      }
    }
    if ((puVar6 == heap.u32(0x005ec504)) || (puVar5 = puVar6, param_1 < 1)) {
      return;
    }
  } while (true);
}

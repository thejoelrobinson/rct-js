// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4155e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { VirtualFree } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00415580 } from "./415580.js";
export function FUN_004155e0(heap, param_1) {
  let BVar1 = 0;
  let piVar2 = 0;
  let iVar3 = 0;
  let iVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  puVar5 = ((heap.u32(0x005ec504)) >>> 0);
  do {
    puVar6 = ((puVar5) >>> 0);
    if ((heap.i32((puVar5 + 0x10)) | 0) != -1) {
      iVar4 = ((0) >>> 0);
      piVar2 = (((puVar5 + 0x2010)) >>> 0);
      iVar3 = ((0x3ff000) >>> 0);
      do {
        if (heap.i32(piVar2) == 0xf0) {
          BVar1 = ((VirtualFree(heap, (((heap.i32((puVar5 + 0x10)) + iVar3)) >>> 0), 0x1000, 0x4000)) >>> 0);
          if (BVar1 != 0) {
            heap.setU32(piVar2, (-1) & 0xffffffff);
            heap.setU32(0x005f024c, (heap.u32(0x005f024c) + -1) >>> 0);
            if ((heap.u32((puVar5 + 0xc)) == 0x0) || (piVar2 < heap.u32((puVar5 + 0xc)))) {
              heap.setU32((puVar5 + 0xc), (piVar2) & 0xffffffff);
            }
            iVar4 = ((iVar4 + 1) >>> 0);
            param_1 = ((param_1 + -1) >>> 0);
            if (param_1 == 0) {
              break;
            }
          }
        }
        iVar3 = ((iVar3 + -0x1000) >>> 0);
        piVar2 = ((piVar2 + ((-2) * 4)) >>> 0);
      } while (-1 < (iVar3 | 0));
      puVar6 = ((heap.u32((puVar5 + 4))) >>> 0);
      if ((iVar4 != 0) && ((heap.i32((puVar5 + 0x18)) | 0) == -1)) {
        iVar3 = ((1) >>> 0);
        piVar2 = (((puVar5 + 0x20)) >>> 0);
        do {
          if ((heap.i32(piVar2) | 0) != -1) {
            break;
          }
          iVar3 = ((iVar3 + 1) >>> 0);
          piVar2 = ((piVar2 + ((2) * 4)) >>> 0);
        } while (iVar3 < 0x400);
        if (iVar3 == 0x400) {
          (regs.eax = FUN_00415580(heap, puVar5));
        }
      }
    }
    if ((puVar6 == heap.u32(0x005ec504)) || (puVar5 = ((puVar6) >>> 0), param_1 < 1)) {
      return;
    }
  } while (true);
}

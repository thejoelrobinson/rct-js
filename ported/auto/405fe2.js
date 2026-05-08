// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405fe2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetSystemMetrics } from "../runtime/win32.js";
import { FUN_00405a70 } from "./405a70.js";
import { FUN_0040b8fc } from "./40b8fc.js";
import { FUN_0040e0d4 } from "./40e0d4.js";
export function FUN_00405fe2(heap, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  let bVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let local_c = 0;
  heap.setU32(0x005f1a04, (GetSystemMetrics(heap, 0x22)) >>> 0);
  heap.setU32(0x005f1fc0, (GetSystemMetrics(heap, 0)) >>> 0);
  heap.setU32(0x005f139c, (GetSystemMetrics(heap, 0x23)) >>> 0);
  heap.setU32(0x005f1b28, (GetSystemMetrics(heap, 1)) >>> 0);
  heap.setU32(0x005f12a8, (param_6) >>> 0);
  heap.setU32(0x005f12ac, (param_2) >>> 0);
  heap.setU32(0x005f129c, (param_3) >>> 0);
  heap.setU32(0x005f1380, (param_4) >>> 0);
  heap.setU32(0x005f12b4, (param_5) >>> 0);
  heap.setU32(0x005f1384, (param_8) >>> 0);
  heap.setU32(0x005f1388, (param_9) >>> 0);
  heap.setU32(0x005f1298, (0) >>> 0);
  heap.setU32(0x005f138c, (0x40) >>> 0);
  heap.setU32(0x005f12a4, (0x40) >>> 0);
  heap.setU32(0x005ebe44, (0) >>> 0);
  heap.setU32(0x005ebe48, (0) >>> 0);
  heap.setU32(0x005ebe3c, (param_1) >>> 0);
  if (param_1 == 1) {
    heap.setU32(0x005ebf54, (0) >>> 0);
    uVar3 = FUN_0040e0d4(heap);
  } else {
    if (param_1 == 2) {
      heap.setU32(0x005ebf54, (param_7) >>> 0);
      bVar1 = false;
      heap.setU32(0x005f1290, (0) >>> 0);
      iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x20))))(heap.u32(0x005ebf30), 0, 0, 0, FUN_00405a70);
      if (iVar2 == 0) {
        local_c = 0;
        while (local_c < heap.u32(0x005f1290) && (!bVar1)) {
          if ((heap.u32((0x005f12c0 + local_c * 6)) == param_2) && ((heap.u32((0x005f12c2 + local_c * 6)) == param_3 && (heap.u32((0x005f12c4 + local_c * 6)) == param_4)))) {
            bVar1 = true;
          } else {
            local_c = local_c + 1;
          }
        }
        if ((bVar1) && (iVar2 = FUN_0040b8fc(heap), iVar2 != 0)) {
          return 1;
        }
      }
    }
    heap.setU32(0x005ebe3c, (0) >>> 0);
    uVar3 = 0;
  }
  return uVar3;
}

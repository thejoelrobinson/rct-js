// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414250.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { ExitProcess, GetCurrentProcess, TerminateProcess } from "../runtime/win32.js";
import { FUN_00414300 } from "./414300.js";
export function FUN_00414250(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_005e9014 = __sp + 0;
  const __addr_DAT_005e901c = __sp + 4;
  const __addr_DAT_005e9020 = __sp + 8;
  const __addr_DAT_005e9024 = __sp + 12;
  try {
  let hProcess = 0;
  let uExitCode = 0;
  if (heap.u32(0x005eff08) == 1) {
    uExitCode = param_1;
    hProcess = GetCurrentProcess(heap);
    TerminateProcess(heap, hProcess, uExitCode);
  }
  heap.setU32(0x005eff04, (1) >>> 0);
  heap.setU32(0x005eff00, (param_3) >>> 0);
  if (param_2 == 0) {
    if ((heap.u32(0x005f3f6c) != 0x0) && (puVar2 = (heap.u32(0x005f3f68) + -4), puVar1 = heap.u32(0x005f3f6c), heap.u32(0x005f3f6c) <= puVar2)) {
      do {
        if (heap.u32(puVar2) != 0x0) {
          (heap.u32(heap.u32(puVar2)))();
          puVar1 = heap.u32(0x005f3f6c);
        }
        puVar2 = puVar2 + -1;
      } while (puVar1 <= puVar2);
    }
    FUN_00414300(heap, __addr_DAT_005e9014, __addr_DAT_005e901c);
  }
  FUN_00414300(heap, __addr_DAT_005e9020, __addr_DAT_005e9024);
  if (param_3 == 0) {
    heap.setU32(0x005eff08, (1) >>> 0);
    ExitProcess(heap, param_1);
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414250.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ExitProcess, GetCurrentProcess, TerminateProcess } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00414300 } from "./414300.js";
export function FUN_00414250(heap, param_1, param_2, param_3) {
  let hProcess = 0;
  let puVar1 = 0;
  let puVar2 = 0;
  let uExitCode = 0;
  if (heap.u32(0x005eff08) == 1) {
    uExitCode = ((param_1) >>> 0);
    hProcess = ((GetCurrentProcess(heap)) >>> 0);
    TerminateProcess(heap, hProcess, uExitCode);
  }
  heap.setU32(0x005eff04, (1) >>> 0);
  heap.setU32(0x005eff00, (((param_3) & 0xff)) >>> 0);
  if (param_2 == 0) {
    if ((heap.u32(0x005f3f6c) != 0x0) && (puVar2 = (((heap.u32(0x005f3f68) + -4)) >>> 0), puVar1 = ((heap.u32(0x005f3f6c)) >>> 0), heap.u32(0x005f3f6c) <= puVar2)) {
      do {
        if (heap.u32(puVar2) != 0x0) {
          (regs.eax = callIndirect(heap, heap.u32(puVar2)));
          puVar1 = ((heap.u32(0x005f3f6c)) >>> 0);
        }
        puVar2 = ((puVar2 + ((-1) * 4)) >>> 0);
      } while (puVar1 <= puVar2);
    }
    (regs.eax = FUN_00414300(heap, 0x005e9014, 0x005e901c));
  }
  (regs.eax = FUN_00414300(heap, 0x005e9020, 0x005e9024));
  if (param_3 == 0) {
    heap.setU32(0x005eff08, (1) >>> 0);
    ExitProcess(heap, param_1);
  }
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/578e15.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00578e15(heap, param_1) {
  let puVar1 = 0;
  let in_AL = regs.eax & 0xff;
  let in_CL = regs.ecx & 0xff;
  let in_DX = regs.edx & 0xffff;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (in_DX + 3) >>> 0);
  if (((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) && (heap.u16((0x0088747e + heap.u32((param_1 + 7)) * 0x260)) != 0xffff)) {
    heap.setU32(0x00991f80, (0x00743b94 + heap.u32((0x0088747e + heap.u32((param_1 + 7)) * 0x260)) * 0x100) >>> 0);
    heap.setU8((0x00991f78 + 0), (2) & 0xff);
  }
  heap.setU32(0x0099a4e8, (in_AL + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (in_CL + 0x10) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return;
}

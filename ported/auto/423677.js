// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/423677.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00423677(heap) {
  let bVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let pbVar2 = 0;
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    pbVar2 = ((heap.u32((0x00971ef4) + ((((((in_CX & 0xffe0) << 7 | in_CX >>> 9 | in_AX & 0xffe0) & 0xffff) >>> 5 | (in_CX >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar1 = ((heap.u8(pbVar2)) & 0xff);
    while ((bVar1 & 0x3c) != 0) {
      pbVar2 = ((pbVar2 + 8) >>> 0);
      bVar1 = ((heap.u8(pbVar2)) & 0xff);
    }
    return (regs.eax = callIndirect(heap, heap.u32((0x004236e0) + (heap.u8(pbVar2 + (4)) & 0xf) * 4)));
  }
  return;
}

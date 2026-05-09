// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/425432.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00425432(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar2 = 0;
  let pbVar3 = 0;
  if ((((in_EAX) & 0xffff) < 0x1000) && (in_CX < 0x1000)) {
    uVar2 = ((in_CX << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
    pbVar3 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar1 = ((heap.u8(pbVar3)) & 0xff);
    while ((bVar1 & 0x3c) != 0) {
      pbVar3 = ((pbVar3 + 8) >>> 0);
      bVar1 = ((heap.u8(pbVar3)) & 0xff);
    }
    if ((heap.u8(pbVar3 + (7)) & 0x20) != 0) {
      return in_EAX;
    }
  }
  heap.setU32(0x00991efc, (0x6a9) >>> 0);
  return in_EAX;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436f36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00436f36(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let bVar3 = 0;
  let iVar4 = 0;
  if ((((in_EAX) & 0xffff) & 0x1f) < 0x10) {
    bVar3 = ((4) & 0xff);
    if (0xf < (in_CX & 0x1f)) {
      bVar3 = ((8) & 0xff);
    }
  } else {
    bVar3 = ((1) & 0xff);
    if ((in_CX & 0x1f) < 0x10) {
      bVar3 = ((2) & 0xff);
    }
  }
  bVar2 = ((((in_EDX >>> 2) & 0xff)) & 0xff);
  iVar4 = ((heap.u32((0x00971ef4) + ((((((in_CX & 0xffe0) << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff) & 0xffe0) & 0xffff) >>> 5 | (in_CX >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
  while ((bVar2 < heap.u8((iVar4 + 2)) || (heap.u8((iVar4 + 3)) <= bVar2)) || ((heap.u8((iVar4 + 1)) & bVar3) == 0)) {
    pbVar1 = (((iVar4 + 1)) >>> 0);
    iVar4 = ((iVar4 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return 1;
    }
  }
  return 1;
}

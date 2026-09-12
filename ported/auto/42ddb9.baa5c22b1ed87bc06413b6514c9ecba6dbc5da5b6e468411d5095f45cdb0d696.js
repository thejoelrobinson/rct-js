// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ddb9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042ddb9(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let pbVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar3 = 0;
  pbVar2 = ((heap.u32((0x00971ef4) + ((((((in_CX & 0xffe0) << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff) & 0xffe0) & 0xffff) >>> 5 | (in_CX >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
  bVar1 = ((heap.u8(pbVar2)) & 0xff);
  while ((bVar1 & 0x3c) != 0) {
    pbVar2 = ((pbVar2 + 8) >>> 0);
    bVar1 = ((heap.u8(pbVar2)) & 0xff);
  }
  bVar3 = ((((in_EDX) & 0xffff) == ((((heap.u8(pbVar2 + (2))) & 0xffff) * 4) & 0xffff)) & 0xff);
  if ((((((heap.u8(pbVar2 + (2))) & 0xffff) * 4) & 0xffff) < ((in_EDX) & 0xffff)) && ((regs.eax = FUN_00444bd4(heap)), !bVar3)) {
    heap.setU8((unaff_ESI + (0x14)), (0x14) & 0xff);
    heap.setU8((unaff_ESI + (9)), (0x12) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (0x10) & 0xff);
    heap.setU32(unaff_ESI, (2) & 0xffffffff);
    (regs.eax = FUN_00444927(heap));
    heap.setU8((unaff_ESI + (1)), (0) & 0xff);
    heap.setU16((unaff_ESI + 0x26), (0x100) & 0xffff);
    heap.setU16((unaff_ESI + 0x24), (0) & 0xffff);
  }
  return 1;
}

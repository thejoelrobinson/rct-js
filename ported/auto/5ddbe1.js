// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddbe1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005ddbe1(heap) {
  let in_AL = regs.eax & 0xff;
  let bVar1 = 0;
  let in_AH = (regs.eax >>> 8) & 0xff;
  let cVar2 = 0;
  let pcVar3 = 0;
  let uVar4 = 0;
  uVar4 = ((((in_AL) >>> 0)) >>> 0);
  bVar1 = ((1) & 0xff);
  pcVar3 = ((0x0065ea78) >>> 0);
  do {
    cVar2 = ((heap.u32((0x005f6b10) + (uVar4 * 4) * 4)) & 0xff);
    if (bVar1 == in_AH) {
      if ((heap.u32((0x005f6b13) + (uVar4 * 4) * 4) | 0) != -1) {
        cVar2 = ((heap.u32((0x005f6b13) + (uVar4 * 4) * 4)) & 0xff);
      }
    }
    if (bVar1 == 1) {
      if ((heap.u32((0x005f6b11) + (uVar4 * 4) * 4) | 0) != -1) {
        cVar2 = ((heap.u32((0x005f6b11) + (uVar4 * 4) * 4)) & 0xff);
      }
    }
    if (bVar1 == 2) {
      if ((heap.u32((0x005f6b12) + (uVar4 * 4) * 4) | 0) != -1) {
        cVar2 = ((heap.u32((0x005f6b12) + (uVar4 * 4) * 4)) & 0xff);
      }
    }
    heap.setU32(pcVar3, (cVar2) & 0xffffffff);
    pcVar3 = ((pcVar3 + 1) >>> 0);
    bVar1 = ((bVar1 + 1) & 0xff);
  } while (bVar1 <= in_AH);
  heap.setU32(pcVar3, (-1) & 0xffffffff);
  return;
}

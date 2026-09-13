// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4572b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00457259 } from "./457259.js";
export function FUN_004572b0(heap) {
  let in_AX = regs.eax & 0xffff;
  let uVar1 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let bVar2 = 0;
  heap.setU8(0x00632f08, (0) & 0xff);
  bVar2 = ((in_AX < 0x20) & 0xff);
  (regs.eax = FUN_00457259(heap));
  if (!bVar2) {
    heap.setU8(0x00632f08, (heap.u8(0x00632f08) | 1) & 0xff);
  }
  bVar2 = ((0xffdf < extraout_CX) & 0xff);
  uVar1 = (((regs.eax = FUN_00457259(heap))) & 0xffff);
  if (!bVar2) {
    heap.setU8(0x00632f08, (heap.u8(0x00632f08) | 2) & 0xff);
  }
  bVar2 = ((0xffdf < uVar1) & 0xff);
  (regs.eax = FUN_00457259(heap));
  if (!bVar2) {
    heap.setU8(0x00632f08, (heap.u8(0x00632f08) | 4) & 0xff);
  }
  bVar2 = ((extraout_CX_00 < 0x20) & 0xff);
  (regs.eax = FUN_00457259(heap));
  if (!bVar2) {
    heap.setU8(0x00632f08, (heap.u8(0x00632f08) | 8) & 0xff);
  }
  if (heap.u8(0x00632f08) == 0) {
    heap.setU8(0x00632f08, (0xf) & 0xff);
  }
  return;
}

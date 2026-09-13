// @manual — do not regenerate.
//
// Source: decompiled/c/454520.c — ride/staff state-byte init.
// Hand-port fix (stride bug, same family as 40179d.js): both loops fill
// a byte array at DAT_008d7e2a. The binary uses BYTE stores at 0x454522
// (movb $0x0) and 0x45452f (movb $0x1), index walks 0..0x74 then ..0x78.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004575af } from "./4575af.js";
export function FUN_00454520(heap) {
  let uVar1 = 0;
  uVar1 = ((0) >>> 0);
  // BYTE-stride fills (see header for the bug).
  do {
    heap.setU8(((0x008d7e2a) + uVar1) >>> 0, 0);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x74);
  do {
    heap.setU8(((0x008d7e2a) + uVar1) >>> 0, 1);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x78);
  return (regs.eax = FUN_004575af(heap));
}

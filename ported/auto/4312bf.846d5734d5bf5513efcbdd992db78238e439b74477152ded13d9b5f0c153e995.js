// @manual — do not regenerate.
// Source: decompiled/c/4312bf.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_004312bf(heap) {
  let pbVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let piVar2 = 0;
  heap.setU32(0x005f96bc, (0) >>> 0);
  for (piVar2 = ((0x0087ccd0) >>> 0); (heap.i32(piVar2) | 0) != -1; piVar2 = ((((((piVar2) | 0) + 5)) >>> 0)) >>> 0) {
  
  }
  while ((heap.i32((((piVar2) | 0) + 5)) | 0) != -2) {
    pbVar1 = (((((0x005f96bc) | 0) + ((((((0)) << 16 >> 16)) | 0) * (((piVar2) | 0) + 9) >>> 3))) >>> 0);
    heap.setU8(pbVar1, (heap.u8(pbVar1) | 1 << (heap.u8((((piVar2) | 0) + 9)) & 7)) & 0xff);
    piVar2 = (((((piVar2) | 0) + 5)) >>> 0);
  }
  return in_EAX;
}

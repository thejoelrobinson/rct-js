// @manual — do not regenerate.
// Source: decompiled/c/9bbfb3.c
//
// Ghidra typed FUN_009bbff8 as no-arg void, but in the binary the caller
// passes the int loaded at *(int *)(&DAT_009b22f0 + DAT_008d7eb6 * 4) via
// EAX (and 9bbff8 reads `in_EAX = regs.eax`). The auto-translator drops
// this register-arg passing. Hand-pass via regs.eax.

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_009bbff8 } from "./9bbff8.js";

export function FUN_009bbfb3(heap) {
  if (heap.u8(0x00971ef0) === 0) return;
  if ((heap.i32(0x00991f64) | 0) !== -1) {
    regs.eax = FUN_009b438b(heap) >>> 0;
  }
  const arrIdx = heap.u8(0x008d7eb6);
  const fnPtr = heap.i32(0x009b22f0 + arrIdx * 4) | 0;
  if (fnPtr !== -1) {
    regs.eax = fnPtr >>> 0;
    regs.eax = FUN_009bbff8(heap) >>> 0;
  }
}

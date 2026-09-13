// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f77c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042f6df } from "./42f6df.js";
export function FUN_0042f77c(heap) {
  let in_AL = regs.eax & 0xff;
  if (heap.u8(0x005f88ae) == 0) {
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    heap.setU8(0x005f88ae, (1) & 0xff);
    return;
  }
  if (heap.u8(0x005f88ae) == 1) {
    if (in_AL != heap.u32(0x005f8cb4)) {
      heap.setU32(0x005f8cb5, (in_AL) >>> 0);
      heap.setU32(0x005f8cb0, (0x005f8cb5) >>> 0);
      heap.setU8(0x005f8d34, (2) & 0xff);
      heap.setU8(0x005f88ae, (3) & 0xff);
      return;
    }
    heap.setU8(0x005f8d34, (2) & 0xff);
    heap.setU8(0x005f88ae, (2) & 0xff);
    return;
  }
  if (heap.u8(0x005f88ae) == 2) {
    if ((in_AL == heap.u32(0x005f8cb4)) && (heap.u8(0x005f8d34) < 0x7d)) {
      heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + 1) & 0xff);
      return;
    }
    (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
    LOCK();
    UNLOCK();
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
    heap.setU8(0x005f88ae, (1) & 0xff);
    return;
  }
  if (0x7c < heap.u8(0x005f8d34)) {
    (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
    do {
      (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
      heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) - 1) & 0xff);
    } while (heap.u8(0x005f8d34) != 0);
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    heap.setU8(0x005f88ae, (1) & 0xff);
    return;
  }
  if (in_AL != heap.u32(heap.u32(0x005f8cb0))) {
    heap.setU32((heap.u32(0x005f8cb0) + (1) * 4), (in_AL) & 0xffffffff);
    heap.setU32(0x005f8cb0, (heap.u32(0x005f8cb0) + 1) >>> 0);
    heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + 1) & 0xff);
    return;
  }
  heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) - 1) & 0xff);
  (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
  do {
    (regs.eax = 0x84, regs.eax = FUN_0042f6df(heap));
    heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
  } while (heap.u8(0x005f8d34) != 0);
  heap.setU32(0x005f8cb4, (in_AL) >>> 0);
  heap.setU8(0x005f88ae, (2) & 0xff);
  heap.setU8(0x005f8d34, (2) & 0xff);
  return;
}

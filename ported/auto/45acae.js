// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45acae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0045ac19 } from "./45ac19.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_0045acae(heap) {
  if (heap.u8(0x008d7eac) != 0) {
    if (heap.u8(0x008d7eac) == 0x3c0) {
      heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
    }
    heap.setU8(0x008d7eac, (heap.u8(0x008d7eac) + -1) & 0xff);
    return;
  }
  if ((heap.u32(0x0088741c) & 0x7f) == 0) {
    if (heap.u8(0x008d7eb0) != heap.u8(0x008d7eb1)) {
      if (heap.u8(0x008d7eb1) < heap.u8(0x008d7eb0)) {
        heap.setU8(0x008d7eb0, (heap.u8(0x008d7eb0) - 1) & 0xff);
      } else {
        heap.setU8(0x008d7eb0, (heap.u8(0x008d7eb0) + 1) & 0xff);
      }
      heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
      return;
    }
    if (heap.u8(0x008d7eb4) != heap.u8(0x008d7eb5)) {
      if (heap.u8(0x008d7eb5) < heap.u8(0x008d7eb4)) {
        heap.setU8(0x008d7eb4, (heap.u8(0x008d7eb4) - 1) & 0xff);
      } else {
        heap.setU8(0x008d7eb4, (heap.u8(0x008d7eb4) + 1) & 0xff);
      }
      return (regs.eax = FUN_005e6028(heap));
    }
    if (heap.u8(0x008d7eb2) != heap.u8(0x008d7eb3)) {
      heap.setU8(0x008d7eb2, (heap.u8(0x008d7eb3)) & 0xff);
    }
    if (heap.u8(0x008d7eb6) != heap.u8(0x008d7eb7)) {
      if (heap.u8(0x008d7eb7) == 3) {
        heap.setU8(0x008d7eb6, (heap.u8(0x008d7eb7)) & 0xff);
      } else {
        if (heap.u8(0x008d7eb7) < heap.u8(0x008d7eb6)) {
        heap.setU8(0x008d7eb6, (heap.u8(0x008d7eb6) - 1) & 0xff);
      } else {
        heap.setU8(0x008d7eb6, (heap.u8(0x008d7eb6) + 1) & 0xff);
      }
      }
      return;
    }
    heap.setU8(0x008d7eae, (heap.u8(0x008d7eaf)) & 0xff);
    (regs.eax = FUN_0045ac19(heap), regs.ecx = 0x640000, regs.eax);
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
  }
  return;
}

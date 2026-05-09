// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d60fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00424db7 } from "./424db7.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e6bcd } from "./5e6bcd.js";
export function FUN_005d60fb(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  heap.setU32(0x0065d8cf, ((regs.eax = FUN_005d3b30(heap))) >>> 0);
  (regs.eax = 0x200000, regs.ecx = 0x21, regs.edx = 0x5d655b, regs.ebx = 0x17c00c8, regs.ebp = 0x5d6178, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x006521b8) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x34) & 0xffffffff);
  (regs.eax = 0x200000, regs.edx = 0x5d655b, regs.ecx = 0x21, regs.eax = FUN_005e412c(heap));
  heap.setU16((unaff_ESI + 0x15a), (0xffff) & 0xffff);
  heap.setU16((unaff_ESI + 0x15c), (0xffff) & 0xffff);
  (regs.eax = 0x200000, regs.edx = 0x5d655b, regs.ecx = 0x21, regs.eax = FUN_005e6bcd(heap));
  heap.setU8(0x00652290, (0) & 0xff);
  (regs.eax = FUN_005e0c2f(heap));
  (regs.eax = FUN_00424db7(heap));
  heap.setU32(0x006522b0, (0x80000000) >>> 0);
  heap.setU32(0x006522b4, (0xffff) >>> 0);
  heap.setU32(0x006522b8, (0) >>> 0);
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404b0e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetSystemMetrics } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004062ac } from "./4062ac.js";
import { FUN_004062cb } from "./4062cb.js";
export function FUN_00404b0e(heap) {
  heap.setU32(0x005f1a04, (GetSystemMetrics(heap, 0x22)) >>> 0);
  heap.setU32(0x005f1fc0, (GetSystemMetrics(heap, 0)) >>> 0);
  heap.setU32(0x005f139c, (GetSystemMetrics(heap, 0x23)) >>> 0);
  heap.setU32(0x005f1b28, (GetSystemMetrics(heap, 1)) >>> 0);
  (regs.eax = FUN_004062ac(heap));
  return (regs.eax = FUN_004062cb(heap));
}

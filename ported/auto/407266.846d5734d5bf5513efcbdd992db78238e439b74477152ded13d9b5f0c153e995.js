// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407266.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCursorPos, _memset } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00406fca } from "./406fca.js";
import { FUN_004070f8 } from "./4070f8.js";
export function FUN_00407266(heap) {
  GetCursorPos(heap, ((0x005eee90) | 0));
  heap.setU32(0x005ebef4, (1) >>> 0);
  (regs.eax = FUN_00406fca(heap));
  _memset(heap, 0x005f1284, 4, 0);
  heap.setU32(0x005f1288, (0) >>> 0);
  (regs.eax = FUN_004070f8(heap));
  heap.setU32(0x005f1280, (0) >>> 0);
  heap.setU32(0x005f128c, (0) >>> 0);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407aad.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00407bfd } from "./407bfd.js";
export function FUN_00407aad(heap) {
  let local_c = 0;
  let local_8 = 0;
  local_c = ((heap.u32(0x005ec054)) >>> 0);
  while (local_c != 0) {
    if (local_c == heap.u32(0x005ec058)) {
      local_8 = ((0) >>> 0);
    } else {
      local_8 = ((heap.i32((local_c + 0x10))) >>> 0);
    }
    (regs.eax = FUN_00407bfd(heap, local_c));
    local_c = ((local_8) >>> 0);
  }
  return;
}

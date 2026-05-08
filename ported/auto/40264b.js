// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40264b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004026ec } from "./4026ec.js";
import { FUN_0040276c } from "./40276c.js";
import { FUN_004028a0 } from "./4028a0.js";
import { FUN_0040aa7f } from "./40aa7f.js";
import { FUN_0040aae9 } from "./40aae9.js";
export function FUN_0040264b(heap) {
  let iVar1 = 0;
  let local_8 = 0;
  iVar1 = FUN_0040aa7f(heap);
  if (iVar1 == 0) {
    local_8 = 0;
  } else {
    if (heap.u32(0x005e9154) == 0) {
      if (0 < heap.u32(0x005e9158)) {
        if (heap.u32(0x005e9144) == 0) {
          local_8 = FUN_004028a0(heap);
        } else {
          local_8 = FUN_0040276c(heap);
        }
      }
    } else {
      local_8 = FUN_004026ec(heap);
    }
    FUN_0040aae9(heap);
  }
  return local_8;
}

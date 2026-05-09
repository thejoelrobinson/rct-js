// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406fb5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00406fca } from "./406fca.js";
import { FUN_0040704d } from "./40704d.js";
export function FUN_00406fb5(heap) {
  (regs.eax = FUN_00406fca(heap));
  return (regs.eax = FUN_0040704d(heap));
}

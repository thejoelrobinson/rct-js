// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41b19a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DirectSoundCreate } from "../../runtime/win32.js";
export function FUN_0041b19a(heap) {
  return DirectSoundCreate(heap);
}

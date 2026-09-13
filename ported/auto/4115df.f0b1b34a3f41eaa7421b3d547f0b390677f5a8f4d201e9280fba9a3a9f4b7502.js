// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4115df.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { midiOutSetVolume } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0041174a } from "./41174a.js";
export function FUN_004115df(heap) {
  (regs.eax = FUN_0041174a(heap));
  if ((heap.u32(0x005ec1d0) != 0) && (heap.u32(0x005ec1d4) != 0)) {
    midiOutSetVolume(heap, 0xffffffff, heap.u32(0x005f02e8));
  }
  return;
}

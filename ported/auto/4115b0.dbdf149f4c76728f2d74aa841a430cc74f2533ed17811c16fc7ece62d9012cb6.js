// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4115b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { midiOutGetVolume } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0041174a } from "./41174a.js";
export function FUN_004115b0(heap) {
  let MVar1 = 0;
  (regs.eax = FUN_0041174a(heap));
  MVar1 = ((midiOutGetVolume(heap, 0xffffffff, 0x005f02e8)) >>> 0);
  if (MVar1 == 0) {
    heap.setU32(0x005ec1d0, (1) >>> 0);
  }
  return;
}

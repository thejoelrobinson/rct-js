// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411617.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mciSendStringA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413620 } from "./413620.js";
export function FUN_00411617(heap, param_1) {
  const __sp = heap.allocFrame(2064);
  const __addr_local_208 = __sp + 0;
  try {
  let MVar1 = 0;
  let uVar2 = 0;
  MVar1 = ((mciSendStringA(heap, 0x005ec1d8, ((0x0) >>> 0), 0, ((0x0) >>> 0))) >>> 0);
  if (MVar1 == 0) {
    (regs.eax = FUN_00413620(heap, __addr_local_208, 0x005ec1e4, param_1));
    MVar1 = ((mciSendStringA(heap, __addr_local_208, ((0x0) >>> 0), 0, ((0x0) >>> 0))) >>> 0);
    if (MVar1 == 0) {
      uVar2 = ((1) >>> 0);
    } else {
      uVar2 = ((0) >>> 0);
    }
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(2064);
  }
}

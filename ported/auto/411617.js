// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411617.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00413620 } from "./413620.js";
export function FUN_00411617(heap, param_1) {
  let MVar1 = 0;
  let uVar2 = 0;
  MVar1 = mciSendStringA(0x005ec1d8, 0x0, 0, 0x0);
  if (MVar1 == 0) {
    FUN_00413620(heap, local_208, 0x005ec1e4, param_1);
    MVar1 = mciSendStringA(local_208, 0x0, 0, 0x0);
    if (MVar1 == 0) {
      uVar2 = 1;
    } else {
      uVar2 = 0;
    }
  } else {
    uVar2 = 0;
  }
  return uVar2;
}

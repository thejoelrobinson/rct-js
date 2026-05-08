// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4119a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject, GetModuleHandleA, LoadImageA } from "../../runtime/win32.js";
import { FUN_00411a34 } from "./411a34.js";
export function FUN_004119a0(heap, param_1, param_2) {
  let hInst = 0;
  let uVar1 = 0;
  let name = 0;
  let type = 0;
  let cx = 0;
  let cy = 0;
  let fuLoad = 0;
  let local_c = 0;
  fuLoad = 0x2000;
  cy = 0;
  cx = 0;
  type = 0;
  name = param_2;
  hInst = GetModuleHandleA(heap, 0x0);
  local_c = LoadImageA(heap, hInst, name, type, cx, cy, fuLoad);
  if (local_c == 0x0) {
    local_c = LoadImageA(heap, 0x0, param_2, 0, 0, 0, 0x2010);
  }
  if (local_c == 0x0) {
    uVar1 = 0x80004005;
  } else {
    uVar1 = FUN_00411a34(heap, param_1, local_c, 0, 0, 0, 0);
    DeleteObject(heap, local_c);
  }
  return uVar1;
}

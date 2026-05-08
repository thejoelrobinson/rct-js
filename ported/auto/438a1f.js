// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/438a1f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004269d0 } from "./4269d0.js";
import { FUN_004269da } from "./4269da.js";
import { FUN_00427247 } from "./427247.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c6f3 } from "./42c6f3.js";
import { FUN_004306d5 } from "./4306d5.js";
import { FUN_0043645c } from "./43645c.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_004390dc } from "./4390dc.js";
import { FUN_0043910f } from "./43910f.js";
import { FUN_00444a79 } from "./444a79.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_0044a363 } from "./44a363.js";
import { FUN_0044a381 } from "./44a381.js";
import { FUN_00454518 } from "./454518.js";
import { FUN_00454520 } from "./454520.js";
import { FUN_0045a895 } from "./45a895.js";
import { FUN_0045aaf8 } from "./45aaf8.js";
import { FUN_0045abea } from "./45abea.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_00438a1f(heap) {
  if ((heap.u32(0x0099c169) & 1) != 0) {
    FUN_00427247(heap);
  }
  heap.setU32(0x0099a500, (heap.u32(0x0099a500) | 1) >>> 0);
  FUN_004269d0(heap);
  FUN_0045a895(heap);
  FUN_00444a79(heap);
  FUN_0044a381(heap);
  FUN_0043910f(heap);
  FUN_00454520(heap);
  FUN_0043645c(heap);
  FUN_004269da(heap);
  FUN_0045aaf8(heap);
  FUN_0045abea(heap);
  FUN_005ddf20(heap);
  FUN_0044a363(heap);
  FUN_004390dc(heap);
  FUN_00454518(heap);
  FUN_00436558(heap);
  FUN_00444b4a(heap);
  FUN_005e0d60(heap);
  FUN_0042c6f3(heap);
  FUN_004298a0(heap);
  FUN_004306d5(heap);
  FUN_005e6028(heap);
  heap.setU32(0x0099a4fe, (0) >>> 0);
  return;
}

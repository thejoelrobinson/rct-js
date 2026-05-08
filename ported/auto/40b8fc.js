// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40b8fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408e82 } from "./408e82.js";
import { FUN_00408f00 } from "./408f00.js";
import { FUN_00408f53 } from "./408f53.js";
import { FUN_0040904c } from "./40904c.js";
import { FUN_004090d8 } from "./4090d8.js";
import { FUN_004090e3 } from "./4090e3.js";
import { FUN_00409549 } from "./409549.js";
import { FUN_0040963b } from "./40963b.js";
import { FUN_00409658 } from "./409658.js";
import { FUN_00409677 } from "./409677.js";
import { FUN_00409736 } from "./409736.js";
import { FUN_004097f7 } from "./4097f7.js";
import { FUN_00409a21 } from "./409a21.js";
import { FUN_00409af7 } from "./409af7.js";
import { FUN_00409c1f } from "./409c1f.js";
import { FUN_0040a006 } from "./40a006.js";
import { FUN_0040a182 } from "./40a182.js";
import { FUN_0040a297 } from "./40a297.js";
import { FUN_0040a3da } from "./40a3da.js";
import { FUN_0040a497 } from "./40a497.js";
import { FUN_0040a503 } from "./40a503.js";
import { FUN_0040a579 } from "./40a579.js";
import { FUN_0040a5f2 } from "./40a5f2.js";
import { FUN_0040a611 } from "./40a611.js";
import { FUN_0040a73d } from "./40a73d.js";
import { FUN_0040a88b } from "./40a88b.js";
import { FUN_0040a972 } from "./40a972.js";
import { FUN_0040ae98 } from "./40ae98.js";
import { FUN_0040b4d8 } from "./40b4d8.js";
export function FUN_0040b8fc(heap) {
  let uVar1 = 0;
  let local_8 = 0;
  if (heap.u32(0x005f12b4) < 2) {
    if (heap.u32(0x005ebf54) == 0) {
      local_8 = FUN_0040b4d8(heap);
    } else {
      local_8 = FUN_0040ae98(heap);
    }
    if (local_8 == 0) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebf48, (0) >>> 0);
      heap.setU32(0x005f0ef4, (0) >>> 0);
      heap.setU32(0x005f12a0, (0) >>> 0);
      heap.setU32(0x005ebe54, (FUN_00408e82) >>> 0);
      heap.setU32(0x005ebe58, (FUN_00408f00) >>> 0);
      heap.setU32(0x005ebe5c, (FUN_00408f53) >>> 0);
      heap.setU32(0x005ebe60, (FUN_0040904c) >>> 0);
      heap.setU32(0x005ebe70, (FUN_004090e3) >>> 0);
      heap.setU32(0x005ebe68, (FUN_0040963b) >>> 0);
      heap.setU32(0x005ebe6c, (FUN_00409549) >>> 0);
      heap.setU32(0x005ebe64, (FUN_004090d8) >>> 0);
      heap.setU32(0x005ebe74, (FUN_00409658) >>> 0);
      heap.setU32(0x005ebe78, (FUN_00409677) >>> 0);
      heap.setU32(0x005ebe7c, (FUN_00409736) >>> 0);
      heap.setU32(0x005ebe80, (FUN_00409af7) >>> 0);
      heap.setU32(0x005ebe84, (FUN_0040a3da) >>> 0);
      heap.setU32(0x005ebe88, (FUN_0040a497) >>> 0);
      heap.setU32(0x005ebe8c, (FUN_004097f7) >>> 0);
      heap.setU32(0x005ebe90, (FUN_00409a21) >>> 0);
      heap.setU32(0x005ebe94, (FUN_00409c1f) >>> 0);
      heap.setU32(0x005ebe98, (FUN_0040a006) >>> 0);
      heap.setU32(0x005ebe9c, (FUN_0040a182) >>> 0);
      heap.setU32(0x005ebea0, (FUN_0040a297) >>> 0);
      heap.setU32(0x005ebea4, (FUN_0040a579) >>> 0);
      heap.setU32(0x005ebea8, (FUN_0040a5f2) >>> 0);
      heap.setU32(0x005ebeac, (FUN_0040a611) >>> 0);
      heap.setU32(0x005ebeb0, (FUN_0040a73d) >>> 0);
      heap.setU32(0x005ebeb4, (FUN_0040a88b) >>> 0);
      heap.setU32(0x005ebeb8, (FUN_0040a972) >>> 0);
      heap.setU32(0x005e91cc, (FUN_0040a503) >>> 0);
      uVar1 = 1;
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
}

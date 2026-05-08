// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402e9b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DeleteObject, LoadCursorA, SetErrorMode } from "../runtime/win32.js";
import { ExceptionList } from "../runtime/ghidra-builtins.js";
import { FUN_00401000 } from "./401000.js";
import { FUN_00402ce0 } from "./402ce0.js";
import { FUN_00404752 } from "./404752.js";
import { FUN_00404b0e } from "./404b0e.js";
import { FUN_00405f2c } from "./405f2c.js";
import { FUN_004061f5 } from "./4061f5.js";
import { FUN_00406d10 } from "./406d10.js";
import { FUN_00406ee7 } from "./406ee7.js";
import { FUN_0040d9a0 } from "./40d9a0.js";
import { FUN_0040d9b0 } from "./40d9b0.js";
import { FUN_0040df00 } from "./40df00.js";
import { FUN_0040df1a } from "./40df1a.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_00402e9b(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_005e7370 = __sp + 0;
  const __addr_LAB_00413268 = __sp + 4;
  const __addr_local_14 = __sp + 8;
  const __addr_DAT_005f1b60 = __sp + 12;
  const __addr_DAT_005f17e0 = __sp + 16;
  const __addr_DAT_005f1ba0 = __sp + 20;
  try {
  let MVar1 = 0;
  let iVar2 = 0;
  let local_24 = 0;
  let local_8 = 0;
  local_8 = 0xffffffff;
  puStack_c = __addr_DAT_005e7370;
  puStack_10 = __addr_LAB_00413268;
  heap.setU32(__addr_local_14, (ExceptionList) >>> 0);
  heap.setU32(0x005e9190, (param_3) >>> 0);
  heap.setU32(0x005f1398, (param_1) >>> 0);
  ExceptionList = __addr_local_14;
  heap.setU32(0x005e91c8, (LoadCursorA(heap, 0x0, 0x7f00)) >>> 0);
  for (local_24 = 0; local_24 < 0x20; local_24 = local_24 + 1) {
    heap.u32((__addr_DAT_005f1b60) + (local_24) * 4) = 0;
  }
  heap.setU32(0x005f1fdc, (0) >>> 0);
  heap.setU32(0x005f1b30, (0) >>> 0);
  heap.setU32(0x005f13a0, (0) >>> 0);
  heap.setU32(0x005f1b80, (0) >>> 0);
  heap.setU32(0x005f1b20, (0) >>> 0);
  heap.setU32(0x005f14c4, (0) >>> 0);
  heap.setU32(0x005e9194, (0) >>> 0);
  heap.setU32(0x005e9198, (0) >>> 0);
  FUN_00413170(heap, __addr_DAT_005f17e0, 0x005ebbcc);
  FUN_00413170(heap, __addr_DAT_005f1ba0, 0x005e9030);
  SetErrorMode(heap, 0);
  local_8 = 0;
  MVar1 = timeBeginPeriod(1);
  FUN_00404752(heap);
  FUN_00404b0e(heap);
  iVar2 = FUN_00405f2c(heap);
  if (iVar2 != 0) {
    FUN_00406d10(heap);
    FUN_0040d9a0(heap);
    FUN_0040df00(heap);
    FUN_00401000(heap);
    FUN_0040df1a(heap);
    FUN_0040d9b0(heap);
    FUN_00406ee7(heap);
    if (heap.u32(0x005e91ec) != 0x0) {
      DeleteObject(heap, heap.u32(0x005e91ec));
      heap.setU32(0x005e91ec, (0x0) >>> 0);
    }
    FUN_004061f5(heap);
    if (MVar1 == 0) {
      timeEndPeriod(1);
    }
    if (heap.u32(0x005e9194) != 0) {
      FUN_00402ce0(heap);
    }
  }
  ExceptionList = heap.u32(__addr_local_14);
  return 0;
} finally {
    heap.freeFrame(24);
  }
}

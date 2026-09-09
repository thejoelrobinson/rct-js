// @manual — do not regenerate.
//
// Source: decompiled/c/402e9b.c — top-level WinMain-equivalent.
// Hand-port fix (stride bug, same family as 40179d.js): the auto-translator
// emitted the 32-byte zero-fill of DAT_005f1b60 with u32 stride. The binary
// uses a BYTE store (`movb $0x0, 0x5f1b60(%eax)` at 0x402f02), bound 0x20.
// Translator misread Ghidra's `(&DAT_005f1b60)[i] = 0` as u32 stride.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject, LoadCursorA, SetErrorMode, timeBeginPeriod, timeEndPeriod } from "../../runtime/win32.js";
import { ExceptionList } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
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
  const __sp = heap.allocFrame(16);
  const __addr_local_14 = __sp + 0;
  const __addr_local_8 = __sp + 12;
  try {
  let MVar1 = 0;
  let iVar2 = 0;
  let local_24 = 0;
  let puStack_10 = 0;
  let puStack_c = 0;
  heap.setU32(__addr_local_8, (0xffffffff) >>> 0);
  puStack_c = ((0x005e7370) >>> 0);
  puStack_10 = ((0x00413268) >>> 0);
  heap.setU32(__addr_local_14, (ExceptionList) >>> 0);
  heap.setU32(0x005e9190, (param_3) >>> 0);
  heap.setU32(0x005f1398, (param_1) >>> 0);
  void (__addr_local_14) /* assign to ExceptionList elided (SEH not modelled) */;
  heap.setU32(0x005e91c8, (LoadCursorA(heap, ((0x0) | 0), ((0x7f00) | 0))) >>> 0);
  // BYTE-stride zero-fill of DAT_005f1b60[0..0x20] (see header for the bug).
  for (local_24 = ((0) >>> 0); local_24 < 0x20; local_24 = (((local_24 + 1) >>> 0)) >>> 0) {
    heap.setU8(((0x005f1b60) + local_24) >>> 0, 0);
  }
  heap.setU32(0x005f1fdc, (0) >>> 0);
  heap.setU32(0x005f1b30, (0) >>> 0);
  heap.setU32(0x005f13a0, (0) >>> 0);
  heap.setU32(0x005f1b80, (0) >>> 0);
  heap.setU32(0x005f1b20, (0) >>> 0);
  heap.setU32(0x005f14c4, (0) >>> 0);
  heap.setU32(0x005e9194, (0) >>> 0);
  heap.setU32(0x005e9198, (0) >>> 0);
  (regs.eax = FUN_00413170(heap, 0x005f17e0, 0x005ebbcc));
  (regs.eax = FUN_00413170(heap, 0x005f1ba0, 0x005e9030));
  SetErrorMode(heap, 0);
  heap.setU32(__addr_local_8, (0) >>> 0);
  MVar1 = ((timeBeginPeriod(heap, 1)) >>> 0);
  (regs.eax = FUN_00404752(heap));
  (regs.eax = FUN_00404b0e(heap));
  iVar2 = (((regs.eax = FUN_00405f2c(heap))) >>> 0);
  if (iVar2 != 0) {
    (regs.eax = FUN_00406d10(heap));
    (regs.eax = FUN_0040d9a0(heap));
    (regs.eax = FUN_0040df00(heap));
    (regs.eax = FUN_00401000(heap));
    (regs.eax = FUN_0040df1a(heap));
    (regs.eax = FUN_0040d9b0(heap));
    (regs.eax = FUN_00406ee7(heap));
    if (heap.u32(0x005e91ec) != ((0x0) | 0)) {
      DeleteObject(heap, heap.u32(0x005e91ec));
      heap.setU32(0x005e91ec, (((0x0) | 0)) >>> 0);
    }
    (regs.eax = FUN_004061f5(heap));
    if (MVar1 == 0) {
      timeEndPeriod(heap, 1);
    }
    if (heap.u32(0x005e9194) != 0) {
      (regs.eax = FUN_00402ce0(heap));
    }
  }
  void (heap.u32(__addr_local_14)) /* assign to ExceptionList elided (SEH not modelled) */;
  return 0;
} finally {
    heap.freeFrame(16);
  }
}

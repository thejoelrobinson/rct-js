// @manual — do not regenerate.
//
// Source: decompiled/c/406d10.c — DirectInput keyboard/mouse setup.
// Hand-port fix (stride bug, same family as 40179d.js): the auto-translator
// emitted the 256-byte zero-fill of the keyboard-state buffer DAT_005f1180
// with u32 stride. The binary uses a BYTE store
// (`movb $0x0, 0x5f1180(%eax)` at 0x406d38), bound 0x100.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DirectInputCreateA, GetKeyboardType, GetSystemMetrics, SystemParametersInfoA, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00406fca } from "./406fca.js";
import { FUN_0040704d } from "./40704d.js";
export function FUN_00406d10(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_local_10 = __sp + 0;
  const __addr_local_c = __sp + 4;
  const __addr_local_8 = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_14 = 0;
  // BYTE-stride zero-fill of keyboard state buffer (see header for the bug).
  for (local_14 = ((0) >>> 0); local_14 < 0x100; local_14 = (((local_14 + 1) >>> 0)) >>> 0) {
    heap.setU8(((0x005f1180) + local_14) >>> 0, 0);
  }
  SystemParametersInfoA(heap, 3, 0, __addr_local_10, 0);
  heap.setU32(0x005f1148, (heap.u32(__addr_local_10)) >>> 0);
  heap.setU32(0x005f114c, (heap.u32(__addr_local_c)) >>> 0);
  heap.setU32(0x005f1144, (heap.u32(__addr_local_8)) >>> 0);
  heap.setU32(0x005f1150, (GetSystemMetrics(heap, 0x17)) >>> 0);
  heap.setU32(0x005f1158, (GetKeyboardType(heap, 0)) >>> 0);
  heap.setU32(0x005f115c, (GetKeyboardType(heap, 1)) >>> 0);
  heap.setU32(0x005f1160, (GetKeyboardType(heap, 2)) >>> 0);
  heap.setU32(0x005ebef4, (0) >>> 0);
  heap.setU32(0x005ebf04, (0) >>> 0);
  heap.setU32(0x005ebf08, (0) >>> 0);
  heap.setU32(0x005ebee4, (0) >>> 0);
  heap.setU32(0x005ebee8, (0) >>> 0);
  heap.setU32(0x005f1140, (0) >>> 0);
  heap.setU32(0x005f1154, (0) >>> 0);
  _memset(heap, 0x005f1284, 4, 0);
  heap.setU32(0x005f1288, (0) >>> 0);
  iVar1 = ((DirectInputCreateA(heap, heap.u32(0x005f1398), 0x500, 0x005ebef8, 0)) >>> 0);
  if (iVar1 == 0) {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebef8)) + 0xc)), heap.u32(0x005ebef8), 0x005e7cc0, 0x005ebefc, 0))) >>> 0);
    if ((iVar1 == 0) && (iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x2c)), heap.u32(0x005ebefc), 0x0041b170))) >>> 0), iVar1 == 0)) {
      (regs.eax = FUN_00406fca(heap));
      heap.setU32(0x005f1140, (1) >>> 0);
    }
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebef8)) + 0xc)), heap.u32(0x005ebef8), 0x005e7cb0, 0x005ebf00, 0))) >>> 0);
    if ((iVar1 == 0) && (iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf00)) + 0x2c)), heap.u32(0x005ebf00), 0x0041b0e0))) >>> 0), iVar1 == 0)) {
      (regs.eax = FUN_0040704d(heap));
      heap.setU32(0x005f1154, (1) >>> 0);
    }
    uVar2 = ((1) >>> 0);
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(12);
  }
}

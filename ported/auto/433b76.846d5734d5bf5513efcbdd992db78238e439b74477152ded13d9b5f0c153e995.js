// @manual — do not regenerate.
// Source: decompiled/c/433b76.c
//
// Paint-ring slot allocator. Each slot is 12 bytes:
//   +0  u32  EBX (paint-record pointer or sprite handle)
//   +4  u16  AX  (tile X / coord)
//   +6  u16  CX  (tile Y / coord)
//   +8  u32  prev-list-head linkage
//
// HAND-FIX (Phase N stride bug): Ghidra typed `DAT_005f96e8` as
// `undefined4 *` (a u32-pointer), so its C `+3` advances by
// `3 * sizeof(undefined4) = 12 bytes`. The auto-translator emitted JS
// byte arithmetic (`+3`), which only advanced 3 bytes per slot — slots
// then overlapped each other, the executor read garbage from the second
// half of slot N when it expected to find slot N+1's start, and no
// pixels reached GAME-BACK. Fix: advance by 0xc bytes.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00433b76(heap) {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let unaff_EBX = regs.ebx >>> 0;
  puVar2 = ((heap.u32(0x005f96e8)) >>> 0);
  if (heap.u32(0x005f96e8) < heap.u32(0x005f96e0)) {
    heap.setU32(heap.u32(0x005f96e8), (unaff_EBX) & 0xffffffff);
    heap.setU16((puVar2 + ((1) * 4)), (in_AX) & 0xffff);
    heap.setU16((((puVar2) | 0) + 6), (in_CX) & 0xffff);
    if (heap.u32(0x00628928) != 0) {
      heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 0xc) >>> 0);
      LOCK();
      uVar1 = ((heap.u32((heap.u32(0x00628928) + 0x18))) >>> 0);
      heap.setU32((heap.u32(0x00628928) + 0x18), (((puVar2) >>> 0)) & 0xffffffff);
      UNLOCK();
      heap.setU32((puVar2 + (2) * 4), (uVar1) & 0xffffffff);
      return in_AX;
    }
  }
  return in_AX;
}

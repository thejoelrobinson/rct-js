// @manual — do not regenerate.
// Source: decompiled/c/5d74b4.c — per-tick sprite-list walker (type-1 = peeps/vehicles).
//
// HAND-FIX (Phase O, animation):
//
// 1. Translator stride bug at the next-pointer read. Ghidra typed
//    `&DAT_00743b98` as `undefined4 *`, so its C `[uVar2 * 0x80]` indexes
//    in 4-byte units = `uVar2 * 0x200`. The actual sprite slot stride
//    is 0x100 (per Phase M 444a79 fix), and slot+4 is a u16 next-in-list
//    pointer. Auto-port emitted `heap.u32(0x00743b98 + uVar2 * 0x80 * 4)`
//    which read 4 bytes at a 2×-too-wide stride — got garbage indices and
//    either exited the walker on the second iteration or walked into
//    invalid memory.
//
// 2. The integrity-gate at the top of the function is RCT1's
//    scenario-hash verification:
//      uVar1 = ROR(((int)&DAT_0070093a - DAT_0087c3b4), 5) - DAT_0087c3b8
//      uVar1 = ROR((uVar1 + DAT_0087d0c8), 7)
//      gate:  ROR(uVar1, 3) == DAT_0087d79c
//    The DAT_0087d79c value is set by the scenario loader based on the
//    same ROR-chain over its own state at save time. With our partial
//    scenario load (sc21.sc4 demo), the hash may not match — and when
//    it doesn't, FUN_005d94b6 (the actual per-sprite update step) never
//    fires, so sprites stay static. For the "playable" goal we bypass
//    the gate unconditionally. Production hardening would compute the
//    expected hash at scenario-load time and store it at 0x0087d79c.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005d94b6 } from "./5d94b6.js";

export function FUN_005d74b4(heap) {
  // Compute the hash for diagnostics, but don't gate on it (see comment).
  let uVar1 = (((0x0070093a | 0) - heap.u32(0x0087c3b4)) >>> 0);
  uVar1 = ((uVar1 >>> 5 | (uVar1 << 27)) - heap.u32(0x0087c3b8)) >>> 0;
  uVar1 = ((uVar1 >>> 7 | (uVar1 << 25)) + heap.u8(0x0087d0c8)) >>> 0;
  const _gateValue = (uVar1 >>> 3 | (uVar1 << 29)) >>> 0;
  // Original gate (now bypassed):
  //   if (_gateValue === heap.u32(0x0087d79c)) { walk }

  // Walk the type-1 sprite-list head at DAT_0087c396 (u16).
  let uVar2 = heap.u16(0x0087c396);
  while (uVar2 !== 0xffff) {
    // Read next-in-list pointer at slot+4 (u16, stride 0x100).
    const next = heap.u16(0x00743b94 + uVar2 * 0x100 + 4);
    // Prime ESI to the current sprite slot for FUN_005d94b6.
    regs.esi = (0x00743b94 + uVar2 * 0x100) >>> 0;
    regs.eax = FUN_005d94b6(heap);
    uVar2 = next & 0xffff;
  }
  return;
}

// @manual — do not regenerate.
//
// Source: decompiled/c/40179d.c — post-blit dirty-flag reset + presenter
// kicker. Called at end-of-tick from FUN_00401000 after a redraw-trigger
// flag is set.
//
// Hand-port fix (stride bug): the auto-translator emitted the dirty-table
// clear loop with u32 stride:
//
//     for (local_c = 0; local_c < 0xa00; ...) {
//       heap.setU32(0x005f2420 + local_c * 4, 0);   // WRONG (u32 stride)
//     }
//
// But the binary uses a BYTE store (`MOV BYTE PTR [eax + 0x5f2420], 0` —
// opcode `c6 80 20 24 5f 00 00` at 0x4018c2), so the loop should clear
// 2560 BYTES, not 10,240 (= 2560 dwords). The auto-translator inferred
// the array element type as 32-bit from Ghidra's `(&DAT_005f2420)[i] = 0`
// notation (Ghidra's default array typing for unrecognised symbols is
// `int*`), but the dirty-flag table is byte-addressed — every other
// reader/writer uses `heap.u8` / `heap.setU8` and walks it with stride 1
// (see 4023b2.js line 102/107/111, and the harness's per-tick mark-all
// at runtime/harness.js line 486 which is correct: `heap.bytes[…+i]`).
//
// The over-write zeroed 7,680 bytes BEYOND the dirty-flag table —
// including PTR_LAB_005f49a0 (the 16-entry game-command jumptable at
// 0x5f49a0..0x5f49e0). That table is intact in decompiled/data.bin at
// boot but got wiped on the first runTick(), so any indirect call
// through PTR_LAB_005f49a0[i] (e.g. inside FUN_00426f56's pause/cmd
// dispatcher) dereferenced null. The bridge for FUN_0042a830 (toolbar
// widget-event-handler) had to re-copy 16 dwords from data.bin as a
// workaround — see .claude/scratch/agent-42a830-findings.md.
//
// Verified by watchpoint probe (.claude/scratch/agent-ptr5f49a0-findings.md):
// the over-write produced 32 u32 writes of 0 inside 0x5f49a0..0x5f49e0
// per call, exactly matching the two FUN_0040179d calls per tick in
// runtime/harness.js (one in the binary's natural path, one in the
// presenter-driver block).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GdiFlush } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004018ec } from "./4018ec.js";
import { FUN_00401f79 } from "./401f79.js";
import { FUN_0040264b } from "./40264b.js";
import { FUN_00402ada } from "./402ada.js";
import { FUN_00402b77 } from "./402b77.js";
import { FUN_00403a92 } from "./403a92.js";
export function FUN_0040179d(heap) {
  let iVar1 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_8 = ((0) >>> 0);
  heap.setU32(0x005f1fe0, (0) >>> 0);
  heap.setU32(0x005f1fe4, (heap.u32(0x005e9158)) >>> 0);
  heap.setU32(0x005f2404, (0) >>> 0);
  if (heap.u32(0x005e914c) != 0) {
    (regs.eax = FUN_00402ada(heap));
  }
  iVar1 = (((regs.eax = FUN_00403a92(heap))) >>> 0);
  if ((iVar1 == 0) && (heap.u32(0x005e9150) == 0)) {
    if (((heap.u32(0x005e9148) != 0) && (2 < heap.u32(0x005e910c))) && (heap.u32(0x005e910c) < 8)) {
      local_8 = (((regs.eax = FUN_00401f79(heap))) >>> 0);
    }
  } else {
    if ((2 < heap.u32(0x005e910c)) && (heap.u32(0x005e910c) < 8)) {
    local_8 = (((regs.eax = FUN_0040264b(heap))) >>> 0);
  }
  }
  if (local_8 == 0) {
    (regs.eax = FUN_004018ec(heap));
  }
  heap.setU32(0x005e9154, (0) >>> 0);
  heap.setU32(0x005e9158, (0) >>> 0);
  // BYTE-stride clear (was u32 stride; see header comment for the bug).
  // Equivalent to `memset(0x005f2420, 0, 0xa00)`.
  for (local_c = ((0) >>> 0); local_c < 0xa00; local_c = (((local_c + 1) >>> 0)) >>> 0) {
    heap.setU8(((0x005f2420) + local_c) >>> 0, 0);
  }
  if (heap.u32(0x005e914c) != 0) {
    (regs.eax = FUN_00402b77(heap));
  }
  return GdiFlush(heap);
}

// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42b079.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the main game-
// viewport window. EBP at WindowCreate time = 0x42b079 → stored at
// window+0x0 → invoked indirectly by FUN_005e3f31's epilogue
// (see 5e3f31.js line 120: callIndirect(heap, heap.u32(puVar3), ...)).
//
// THIS IS THE WINDOW PROC THAT WAS MISSING — without a JS function at
// 0x42b079, the indirect call from 5e3f31 would log:
//   [callIndirect] no JS function at 0x42b079 — returning 0
// at boot. The viewport would still be CREATED (the window struct fields
// are populated before this call fires), but its initial paint event
// would silently no-op.
//
// Disassembly:
//   0042b079  cmp edi, -1
//   0042b07c  jnz 0x431615        ; full event-dispatch body (long, STUB)
//   0042b082  ret                 ; EDI == -1 → no-op (initial open)
//
// At boot, MainOpen invokes 5e3f31, which invokes this once with EDI=-1
// (initial create), so the no-op branch fires. Once the message loop
// dispatches a real event, EDI != -1 and execution falls into 0x431615
// (a 1500+ byte event-fanout body that handles paint, mousedown, scroll,
// resize, etc.). Ghidra didn't lift 0x431615 as a separate function and
// the body is too large for hand-porting in one pass — so we STUB the
// EDI != -1 path with a safe return until the dispatch body lands.

import { regs } from "../../runtime/regs.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042b079(/* heap */) {
  // 0x42b079..7c: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // STUB: EDI != -1 falls through to the main-viewport event-dispatch
    // body at 0x431615. That body is 1500+ bytes of paint, scroll, hit-
    // test, and tool-state code — not yet ported. Safe no-op for now;
    // the viewport itself is still painted by FUN_009bc041's recursive
    // walker (which runs from the painter, not from this proc), so this
    // stub does not gate the world rendering.
    return;
  }
  // EDI == -1: initial open path is a single ret (no setup needed —
  // FUN_005e3f31 has already populated all the relevant window fields).
  return;
}

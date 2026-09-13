// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429ad5.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the scaled-mode
// scenario-list window. EBP at WindowCreate time = 0x429ad5 → stored at
// window+0x0 → invoked indirectly by FUN_005e3f31's epilogue
// (see 5e3f31.js line 120: callIndirect(heap, heap.u32(puVar3), ...)).
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = "phase" sentinel: edi == -1 means initial open / hit-test
//         (just succeed quickly), any other value means a real event.
//
// Disassembly:
//   00429ad5  cmp edi, -1
//   00429ad8  jnz 0x429adb        ; if EDI != -1, call paint helper
//   00429ada  ret                 ; EDI == -1 → no-op
//   00429adb  call 0x5e4400       ; FUN_005e4400 — window-paint helper
//   00429ae0  ret
//
// At boot, MainOpen invokes this once with EDI=-1 (initial create), so
// the no-op branch fires. Once the message loop dispatches a real event
// (paint, etc.) EDI != -1 and we call the standard paint-prologue.

import { regs } from "../../runtime/regs.js";
import { FUN_005e4400 } from "./5e4400.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00429ad5(heap) {
  // 0x429ad5: `cmp edi, -1; jnz 0x429adb; ret`
  if ((regs.edi >>> 0) === 0xffffffff) return;
  // 0x429adb: tail-call into the paint-prologue helper.
  regs.eax = FUN_005e4400(heap) >>> 0;
}

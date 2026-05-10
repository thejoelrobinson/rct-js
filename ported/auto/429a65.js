// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429a65.
//
// Widget event handler installed by FUN_004298a0 (MainOpen) for the
// scaled-mode scenario-list window (call 2 in the scaled branch). EDX
// at WindowCreate time = 0x429a65 → stored at window+0x4 → invoked
// indirectly by the message dispatch path.
//
// Calling convention (matches all the widget procs in this region):
//   ESI = window struct pointer
//   EBP = "message id" (the dispatcher fan-out key)
//   EDX = widget index (or other event-specific selector)
//   EDI = "phase" sentinel: edi == -1 means initial open (no widget event
//         is being delivered yet); any other value means a real widget
//         event has fired.
//
// Disassembly:
//   00429a65  eb 67           jmp 0x429ace
//   ...
//   00429ace  cmp bp, 0x1     ; only EBP=1 ("widget click") is handled
//   00429ad2  jz 0x429a67
//   00429ad4  ret
//   00429a67  cmp byte [0x628cb9], 0   ; if this DAT byte != 0, ignore
//   00429a6e  jnz 0x429ad4    ; (suppress while modal busy)
//   00429a70  cmp dx, 1       ; dispatch on widget index
//   00429a74  jz 0x429ab4     ; → "New scenario" button (xor di,di)
//   00429a76  cmp dx, 3       ; → "Tutorial" button     (di=2)
//   00429a7a  jz 0x429a99
//   00429a7c  cmp dx, 0       ; → "Load scenario" button → call 4304dd
//   00429a80  jz 0x429a91
//   00429a82  cmp dx, 2       ; → "Quit"                → call 42d4a8
//   00429a86  jz 0x429a89
//   00429a88  ret
//
// Each handler arm sets registers and either calls FUN_0042d4a8/4304dd
// directly or builds a call into FUN_00426f56 (scenario chooser) with
// preset args.
//
// At boot the dispatcher only fires the initial-open path with EDI=-1
// (no widget event), so this function is a NO-OP at boot. We still
// implement the full dispatch so once event delivery wakes up the right
// arm runs.

import { regs } from "../../runtime/regs.js";
import { FUN_0042d4a8 } from "./42d4a8.js";
import { FUN_004304dd } from "./4304dd.js";
import { FUN_00426f56 } from "./426f56.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00429a65(heap) {
  const bp = regs.ebp & 0xffff;
  // 0x429ace: only EBP == 1 is handled — every other "message id" no-ops.
  if (bp !== 1) return;
  // 0x429a67: gate on global "modal busy" flag at 0x628cb9.
  if (heap.u8(0x00628cb9) !== 0) return;

  const dx = regs.edx & 0xffff;
  if (dx === 1) {
    // 0x429ab4 — "New scenario" arm:
    //   xor ax, ax; xor cx, cx; mov bl, 1; xor dl, dl;
    //   xor di, di; mov esi, 5; call 0x426f56
    regs.eax = (regs.eax & 0xffff0000) >>> 0;        // ax = 0
    regs.ecx = (regs.ecx & 0xffff0000) >>> 0;        // cx = 0
    regs.ebx = ((regs.ebx & 0xffffff00) | 0x01) >>> 0; // bl = 1
    regs.edx = (regs.edx & 0xffffff00) >>> 0;        // dl = 0
    regs.edi = (regs.edi & 0xffff0000) >>> 0;        // di = 0
    regs.esi = 5 >>> 0;                              // esi = 5
    FUN_00426f56(heap);
    return;
  }
  if (dx === 3) {
    // 0x429a99 — "Tutorial" arm:
    //   xor ax, ax; mov cx, ax; mov bl, 1; xor dl, dl;
    //   mov di, 2; mov esi, 5; call 0x426f56
    regs.eax = (regs.eax & 0xffff0000) >>> 0;
    regs.ecx = (regs.ecx & 0xffff0000) >>> 0;
    regs.ebx = ((regs.ebx & 0xffffff00) | 0x01) >>> 0;
    regs.edx = (regs.edx & 0xffffff00) >>> 0;
    regs.edi = ((regs.edi & 0xffff0000) | 0x0002) >>> 0;
    regs.esi = 5 >>> 0;
    FUN_00426f56(heap);
    return;
  }
  if (dx === 0) {
    // 0x429a91 — "Load scenario" arm: call 0x4304dd.
    FUN_004304dd(heap);
    return;
  }
  if (dx === 2) {
    // 0x429a89 — "Quit" arm: call 0x42d4a8.
    FUN_0042d4a8(heap);
    return;
  }
  // Fall-through (0x429a88): unhandled widget index — return.
}

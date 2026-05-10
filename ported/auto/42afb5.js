// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42afb5.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the unscaled-mode
// top toolbar (call 2 in the unscaled branch). EBP at WindowCreate time
// = 0x42afb5 → stored at window+0x0 → invoked indirectly by FUN_005e3f31.
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = phase sentinel (-1 = initial open / hover-id resolve,
//         anything else = paint event at body 0x42afd3)
//
// Disassembly (the EDI == -1 path — fires at boot):
//   0042afb5  cmp edi, -1
//   0042afb8  jnz 0x42afd3                 ; paint body — STUB (see note)
//   0042afba  mov eax, 0x20026060          ; default cursor / hover sprite
//   0042afbf  test byte [0x6326bd], 1      ; check "demo / paused" flag
//   0042afc6  jnz 0x42afcd
//   0042afc8  mov eax, 0x20026062          ; alternate hover sprite
//   0042afcd  mov [0x5f514e], eax          ; publish hover-sprite id
//   0042afd2  ret
//
// EDI != -1 path (0x42afd3..) reads the window's view rect at +0x20..+0x26,
// computes the bottom-right corner, and calls FUN_009b30f1 twice (sprite
// blits) + FUN_005e3b2b (widget hit-test) + FUN_005e4400 (paint helper)
// + FUN_005e5ce2 (string blit). Long, complex paint code — STUBBED.

import { regs } from "../../runtime/regs.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042afb5(heap) {
  // 0x42afb5..b8: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // STUB: EDI != -1 enters the per-frame paint body at 0x42afd3, which
    // draws the top toolbar (date display + park-rating + cash + a row of
    // tool buttons). Body is ~300 bytes including BTR/BTS bit-twiddling
    // on widget-enabled flags + 4 indirect FUN_009b30f1 sprite blits.
    // Not yet ported. Safe no-op until the toolbar paint pipeline lands.
    return;
  }

  // 0x42afba..c8: pick hover-sprite id based on demo/paused flag.
  let eax = 0x20026060 >>> 0;
  if ((heap.u8(0x006326bd) & 1) === 0) {
    eax = 0x20026062 >>> 0;
  }
  // 0x42afcd: publish chosen sprite id at DAT_005f514e.
  heap.setU32(0x005f514e, eax);
  regs.eax = eax;
}

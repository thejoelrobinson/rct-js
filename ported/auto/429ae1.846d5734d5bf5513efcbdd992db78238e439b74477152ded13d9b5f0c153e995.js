// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429ae1.
//
// Widget event handler installed by FUN_004298a0 (MainOpen) for the
// scaled-mode scenario-detail window (call 3 in the scaled branch). EDX
// at WindowCreate time = 0x429ae1 → stored at window+0x4 → invoked
// indirectly by the message dispatch path.
//
// Disassembly:
//   00429ae1  eb 00     jmp 0x429ae3
//   00429ae3  c3        ret
//
// That's the entire function. It's a deliberate no-op widget handler
// (the scenario-detail window has no clickable widgets — it's display-
// only). The `eb 00` (`jmp +0`) is just the assembler's way of keeping
// the function alignment / labelable.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00429ae1(/* heap */) {
  // No-op widget proc — see header comment.
  return;
}

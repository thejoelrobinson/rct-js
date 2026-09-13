// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42b076.
//
// Widget event handler installed by FUN_004298a0 (MainOpen) for the
// main game-viewport window (call 1, both layout branches). EDX at
// WindowCreate time = 0x42b076 → stored at window+0x4 → invoked
// indirectly by the message dispatch path.
//
// Disassembly:
//   0042b076  eb 00     jmp 0x42b078
//   0042b078  c3        ret
//
// That's the entire function. The main viewport has no clickable
// widgets (it's the giant 3D game world; clicks are routed through the
// viewport's hit-test in 9bc041, not through the widget table), so its
// widget-event handler is a deliberate no-op. The `eb 00` (jmp +0) is
// purely padding to keep the next entry (window proc 0x42b079) at a
// labelable offset.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042b076(/* heap */) {
  // No-op widget proc — see header comment.
  return;
}

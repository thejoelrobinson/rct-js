// @manual — do not regenerate.
//
// Hand-port of FUN_005df40c (the binary's primary 32-bit RNG step).
// Ghidra's `void(void)` decompilation drops the EAX side-effect — but the
// disassembly clearly shows EAX = ror(prev_DAT_006e3b88, 3) on return.
// Callers (notably FUN_0045ac19) immediately consume AL via
// `mul byte ptr [ebx+1]`, so missing this side-effect leaves AL frozen at
// the caller's pre-call value (=1 in our boot), which collapses the whole
// title-screen sprite walker to a deterministic eb7=0 and the walker
// never advances DAT_008d7eb6 off zero.
//
// Disassembly:
//   push ebx
//   mov  ebx, [006e3b8c]
//   xor  ebx, 0x1234567f
//   ror  ebx, 7
//   mov  eax, [006e3b88]                 ;  ← EAX captured here
//   add  [006e3b88], ebx
//   ror  eax, 3                          ;  EAX = ror(prev_006e3b88, 3)
//   mov  [006e3b8c], eax
//   pop  ebx
//   ret

import { regs } from "../../runtime/regs.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

function ror32(v, n) {
  v >>>= 0;
  n &= 31;
  return ((v >>> n) | (v << (32 - n))) >>> 0;
}

export function FUN_005df40c(heap) {
  const ebx = ror32(heap.u32(0x006e3b8c) ^ 0x1234567f, 7);
  const eaxIn = heap.u32(0x006e3b88) >>> 0;
  heap.setU32(0x006e3b88, (eaxIn + ebx) >>> 0);
  const eaxOut = ror32(eaxIn, 3);
  heap.setU32(0x006e3b8c, eaxOut);
  // The binary leaves EAX = ror(prev_006e3b88, 3). Reflect that in our reg
  // model so callers see the random byte in AL. EBX is callee-saved (push/pop
  // around the function body), so it's preserved — do NOT touch regs.ebx.
  regs.eax = eaxOut;
}

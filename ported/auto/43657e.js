// @manual — do not regenerate.
// Source: decompiled/c/43657e.c
//
// Disassembly at 0x43658a..0x436597:
//   push ecx
//   mov ecx, 0x3e8           ; loop count = 1000
//   call 4365c3
//   loop 0x436590            ; --ecx; jne back
//   pop ecx
//
// Same pattern as the 42f6a8 fix in 06e5018: Ghidra emits
// `do { ... } while (extraout_ECX != 1);` and the translator leaves
// extraout_ECX at 0 → infinite loop. Rewrite as a bounded for-loop of
// 1000 iterations.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004365c3 } from "./4365c3.js";
import { FUN_00436634 } from "./436634.js";
export function FUN_0043657e(heap) {
  let in_EAX = regs.eax >>> 0;
  let extraout_ECX = 0;
  if (0x00743b10 < heap.u32(0x00981ef4)) {
    // Hand-fix: x86 LOOP instruction at 0x436595 with ECX=0x3e8 (1000).
    for (let _i = 0; _i < 0x3e8; _i++) {
      in_EAX = (((regs.eax = FUN_004365c3(heap))) >>> 0);
    }
    if ((0x00743b10 < heap.u32(0x00981ef4)) && (in_EAX = (((regs.eax = FUN_00436634(heap))) >>> 0), 0x00743b10 < heap.u32(0x00981ef4))) {
      heap.setU32(0x00991efc, (0x393) >>> 0);
      return in_EAX;
    }
  }
  return in_EAX;
}

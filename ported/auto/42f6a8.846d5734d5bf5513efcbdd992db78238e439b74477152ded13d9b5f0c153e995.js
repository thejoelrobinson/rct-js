// @manual — do not regenerate.
//
// Source: decompiled/c/42f6a8.c — and disassembly at 0x42f6a8:
//   0042f6a8: 8a 06        mov al, [esi]      ; load byte
//   0042f6aa: e8 cd000000  call 42f77c        ; consume it
//   0042f6af: 46           inc esi            ; advance source pointer
//   0042f6b0: e2 f6        loop 42f6a8        ; --ecx; jne 42f6a8
//   0042f6b2: c3           ret
//
// Ghidra's C decompile emitted only `do { FUN_0042f77c(); } while
// (extraout_ECX != 1);` which the translator faithfully reproduced as
// `let extraout_ECX = 0; do { ... } while (extraout_ECX != 1)` — an
// infinite loop. The real semantics: caller passes a byte-count in ECX
// and a source-pointer in ESI; this function calls 42f77c for each of N
// bytes, then returns.
//
// The byte-count argument is passed via regs.ecx, source pointer via
// regs.esi. Each caller now writes regs.ecx + regs.esi before the call
// (see comments in 430113.js, 42f3e5.js, 42fbc6.js — caller fixes land
// alongside this hand-port).

import { regs } from "../../runtime/regs.js";
import { FUN_0042f77c } from "./42f77c.js";

export function FUN_0042f6a8(heap) {
  let n = regs.ecx >>> 0;
  let p = regs.esi >>> 0;
  // The binary's `loop` instruction has a quirk: ECX = 0 on entry means
  // 2^32 iterations (no early-exit check). Production callers never pass
  // 0, but guard against it explicitly to mirror real x86 behaviour while
  // staying safe in JS where 2^32 iterations would freeze the process.
  if (n === 0) return;
  while (n > 0) {
    // The binary reads BYTE from [esi] into AL before each call; mirror
    // that by writing the byte into regs.eax's low 8 bits. FUN_0042f77c
    // reads `in_AL = regs.eax & 0xff` on entry.
    regs.eax = (regs.eax & ~0xff) | heap.u8(p);
    FUN_0042f77c(heap);
    p = (p + 1) >>> 0;
    n--;
  }
  regs.ecx = 0;
  regs.esi = p;
}

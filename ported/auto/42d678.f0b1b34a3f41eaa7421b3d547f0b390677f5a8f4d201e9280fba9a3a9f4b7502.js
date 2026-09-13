// @manual — do not regenerate.
// Source: decompiled/c/42d678.c — but the translator got the element STRIDE
// wrong, which made this loop non-terminating on 7 of the 22 retail scenarios.
//
// Binary (0x42d678-0x42d69e):
//   mov  si, word [0x87c39a]      ; head index
// L: cmp  si, -1  / je ret        ; 0xffff terminates
//   movzx esi, si
//   shl  esi, 8                   ; stride 0x100  <-- 256 bytes, NOT 0x200
//   add  esi, 0x743b94            ; esi = ELEMENT pointer
//   push word [esi + 4]           ; next index, read BEFORE the call
//   call 0x42db0f
//   pop  si                       ; si = that next index
//   jmp  L
//
// Ghidra emitted `uVar1 * 0x80 * 4` = 0x200, i.e. DOUBLE the real stride, so
// the walk read the wrong element, got a bogus "next" index and never reached
// 0xffff — a hard infinite loop inside a single tick. It also passed the ARRAY
// base 0x743b94 as esi instead of the element pointer, so FUN_0042db0f ran
// against the wrong record.
//
// Symptom: sc3 / SC4 / SC5 / sc6 / SC12 / SC17 / SC18 never completed their
// first gameplay tick (>120s, 120M+ heap ops in ONE call). Boot itself was fine
// at ~830ms, which is why this read as "slow scenarios" rather than a hang.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042db0f } from "./42db0f.js";

export function FUN_0042d678(heap) {
  // `mov si, word ptr [0x87c39a]` — a 16-bit load.
  let si = heap.u16(0x0087c39a);
  while (si !== 0xffff) {
    const elem = (0x00743b94 + si * 0x100) >>> 0;   // shl esi,8 ; add esi,base
    const next = heap.u16(elem + 4);                 // push word [esi+4]
    regs.esi = elem;                                 // callee sees the ELEMENT
    regs.eax = FUN_0042db0f(heap);
    si = next;                                       // pop si
  }
}

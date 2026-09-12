// @manual — do not regenerate.
// Source: decompiled/c/5e2225.c
//
// x86 (0x5e2225-5e223F):
//   call 0x5e3ace        ; window hit-test — sets ESI = slot ptr (or 0 on miss)
//   mov edx, 0xffffffff  ; default widget index = -1
//   or esi, esi
//   jz 0x5e2238          ; no hit, skip widget hit-test
//   call 0x5e3874        ; widget hit-test — sets EDX = widget index
//   movzx ebp, [0x991f36]
//   jmp [ebp*4+0x5e2248] ; dispatch to input-mode handler (LMB-down → 5e2b52)
//
// Bugs in the auto-translated version:
//   1. `unaff_ESI` snapshots the CALLER's ESI before 5e3ace runs. The
//      condition `if (unaff_ESI != 0)` should test the NEW ESI that 5e3ace
//      writes (the hit slot, or 0 on miss).
//   2. x86 sets `edx = -1` BETWEEN the two calls — Ghidra dropped the
//      assignment. Without it, 5e2b52's LMB-down path (which compares
//      EDX to -1 after calling 5e5c36) operates on stale EDX from the
//      caller chain.
//   3. The hand-port for 5e3ace.js now sets regs.esi on return, so we
//      read regs.esi after the call rather than `unaff_ESI`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3874 } from "./5e3874.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_005e2225(heap) {
  // 5e3ace's pusha/popa around its inner [esi+4] call preserves all GPRs
  // across the dispatch. The JS port of 5e3ace mutates regs.eax/ecx/edx via
  // its internal callIndirect; mirror x86's preservation by saving the
  // click coords (eax = x, ebx = y) AND the event-type CX (which the
  // downstream input-mode handler at 5e2b52 reads via `cmp cx, 1`).
  const savedEax = regs.eax >>> 0;
  const savedEbx = regs.ebx >>> 0;
  const savedEcx = regs.ecx >>> 0;
  (regs.eax = FUN_005e3ace(heap));
  regs.eax = savedEax;
  regs.ebx = savedEbx;
  regs.ecx = savedEcx;
  // asm 0x5e222A: `mov edx, 0xffffffff` — default widget index = -1, set
  // BEFORE the ESI test (so even the no-hit path leaves edx = -1).
  regs.edx = 0xffffffff >>> 0;
  // Read ESI AFTER 5e3ace updates it (asm `or esi, esi; jz`).
  if ((regs.esi >>> 0) != 0) {
    (regs.eax = FUN_005e3874(heap));  // sets edx = widget index
    // 5e3874 also internally clobbers EAX/EBX/ECX via callIndirect — restore.
    regs.eax = savedEax;
    regs.ebx = savedEbx;
    regs.ecx = savedEcx;
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x005e2248) + (heap.u8(0x00991f36)) * 4)));
}

// @manual — do not regenerate.
// Source: decompiled/c/5e6044.c
//
// HAND-FIX (stale ESI + missing EBP/EDX setup at the indirect tool-update
// call). FUN_005e6044 is the per-tick ARMED-TOOL update: when a tool is active
// (DAT_00991f30 bit 3 set) it finds the tool's owning window by class
// [0x991f5a] / number [0x991f58] and calls that window's slot+4 callback with
// BP=7 (the "tool update" sub-command) and DX=[0x991f5c] (the tool id), so the
// land tool resolves the cursor tile into the drag rect at [0x99a020].
//
// DISASM 0x5e6044-0x5e6077 (capstone, VA-0x401a00):
//   0x5e6044  bt   dword [0x991f30], 3      ; tool active?
//   0x5e604c  jae  0x5e6077                  ; no -> return
//   0x5e604e  mov  cl, [0x991f5a]            ; tool window class
//   0x5e6054  mov  dx, [0x991f58]            ; tool window number
//   0x5e605b  call 0x5e3b2b                  ; find window -> ESI = slot (or pool-end)
//   0x5e6060  jne  0x5e6069                  ; found -> dispatch
//   0x5e6062  call 0x5e687d                  ; not found -> deactivate tool
//   0x5e6067  jmp  0x5e6077
//   0x5e6069  mov  dx, [0x991f5c]            ; tool id
//   0x5e6070  mov  bp, 7                     ; sub-command = tool update
//   0x5e6074  call dword [esi + 4]           ; <-- slot+4 tool callback
//
// The translator's bugs:
//   (1) it captured `unaff_ESI` at function ENTRY and used it for `[esi+4]`,
//       but the binary uses ESI as written by the 0x5e3b2b search — the entry
//       ESI is stale, so the indirect call dereferenced the wrong slot (the
//       tool callback was never reached, the land drag rect never populated).
//   (2) it never set EBP=7 or EDX=[0x991f5c] before the call, so even when the
//       toolbar callback 0x42a830 did run (via the painter-bridge), it fell
//       through its BP/DX dispatch (0x42af5a) without reaching the land
//       tool-update at 0x42aa65.
//   (3) it gated the found/not-found branch on a stale entry `in_ZF` rather
//       than the 0x5e3b2b search result.
// The cursor x (EAX) / y (EBX) are LIVE from the caller 0x5e38f5 (push/pop
// pairs keep them across 0x5e2225/0x5e6078; the `call 0x5e6044` at 0x5e39b6
// runs with eax=cursorX, ebx=cursorY) — 0x42aa65 -> single-tile 0x43424f /
// area 0x434efd reads them to drive the pick FUN_00431510. So preserve
// regs.eax/regs.ebx across the find (0x5e3b2b only writes ESI). The
// painter-bridge shim for 0x42a830 mirrors regs -> cpu.regs, so the live
// cursor and BP/DX reach the interpreter-run land tool callback.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e687d } from "./5e687d.js";

export function FUN_005e6044(heap) {
  // bit 3 of [0x991f30] = tool active. If clear, nothing to update.
  if ((heap.u32(0x00991f30) >>> 3 & 1) === 0) return 0;

  // Preserve the live cursor (EAX=x, EBX=y) across the window search.
  const cursorX = regs.eax >>> 0;
  const cursorY = regs.ebx >>> 0;

  // Find the tool's owning window by class [0x991f5a] / number [0x991f58].
  regs.ecx = heap.u8(0x00991f5a);
  regs.edx = heap.u16(0x00991f58);
  FUN_005e3b2b(heap);               // -> regs.esi = found slot (0 if not found)
  const slot = regs.esi >>> 0;

  // Not found -> deactivate the tool (0x5e687d). 0x5e3b2b returns ESI=0 /
  // ZF=1 on miss (binary 0x5e3b55; see 5e3b2b.js second hand-fix).
  if (slot === 0) {
    FUN_005e687d(heap);
    return 0;
  }

  // Found -> call the window's slot+4 callback with BP=7 (tool update),
  // DX=[0x991f5c] (tool id), ESI=slot, and the LIVE cursor in EAX/EBX.
  regs.eax = cursorX;
  regs.ebx = cursorY;
  regs.ecx = 0;
  regs.edx = heap.u16(0x00991f5c);
  regs.esi = slot;
  regs.ebp = 7;
  return (regs.eax = callIndirect(heap, heap.u32(slot + 4)));
}

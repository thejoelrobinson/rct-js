// @manual — do not regenerate.
//
// Hand-port of FUN_0045abea (RCT1 title-screen sprite-walker init).
// Ghidra's decompilation surfaced this function as a sequence of stores
// from "extraout_CL", "extraout_CH", "unaff_BL", "unaff_BH" — but the
// actual binary always passes AL=1 to FUN_0045ac6f and reads BL/BH/CL/CH
// from FUN_0045ac6f's *outputs*, not the caller's pre-call register state.
// The auto-translator can't see this because Ghidra's empty-body
// decompilation of FUN_0045ac6f hides the writes to BX/CX.
//
// Disassembly transcript at 0x45abea (47 bytes):
//   mov  [008d7eaa], al                 ; track-set index from caller (0 or 1)
//   mov  al, 1                          ; force AL=1 for the FUN_0045ac6f call
//   call FUN_0045ac6f                   ; sets BL/BH/CL/CH (AL unchanged)
//   mov  [008d7eae], al                 ; current = 1 (AL still 1 post-call)
//   mov  [008d7eb0], bl                 ; current x  (from FUN_0045ac6f.BL)
//   mov  [008d7eb2], bh                 ; current y  (from FUN_0045ac6f.BH)
//   mov  [008d7eb4], cl                 ; current z  (from FUN_0045ac6f.CL)
//   mov  [008d7eb6], ch                 ; current sprite-id  ←  walker gate
//   call FUN_0045ac19                   ; pick + write *target* position
//   ret

import { regs } from "../../runtime/regs.js";
import { FUN_0045ac6f } from "./45ac6f.js";
import { FUN_0045ac19 } from "./45ac19.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045abea(heap) {
  // mov [008d7eaa], al — track-set index from the caller's AL.
  heap.setU8(0x008d7eaa, regs.eax & 0xff);

  // mov al, 1; call FUN_0045ac6f
  regs.eax = (regs.eax & ~0xff) | 0x01;
  FUN_0045ac6f(heap);

  // FUN_0045ac6f preserves AL (=1) and writes BL/BH/CL/CH into regs.ebx/ecx.
  heap.setU8(0x008d7eae, regs.eax & 0xff);
  heap.setU8(0x008d7eb0, regs.ebx & 0xff);
  heap.setU8(0x008d7eb2, (regs.ebx >>> 8) & 0xff);
  heap.setU8(0x008d7eb4, regs.ecx & 0xff);
  heap.setU8(0x008d7eb6, (regs.ecx >>> 8) & 0xff);

  // call FUN_0045ac19 — picks a target sprite-direction via RNG and writes
  // the "target" half (DAT_008d7eaf, eb1, eb3, eb5, eb7) plus DAT_008d7eac=0x780.
  FUN_0045ac19(heap);

  // Return EAX so callers' `(regs.eax = FUN_0045abea(...))` wrappers see
  // a defined value (FUN_0045ac19 left AL = the random direction).
  return regs.eax;
}

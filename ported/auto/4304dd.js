// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4304dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_004304dd(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  // HAND-FIX (collapsed-flag class): the binary is
  //   0x4304de mov cl, 0x20      ; window class 0x20 = scenario-select
  //   0x4304e0 xor dx, dx        ; window number 0
  //   0x4304e3 call 0x5e5fcb     ; bring-to-front-by-class
  //   0x4304e8 jne 0x43054c      ; ALREADY OPEN -> skip the create block
  // Ghidra dropped the cl/dx setup and collapsed the returned ZF to a constant
  // `true`, so this handler unconditionally created a SECOND class-0x20 window
  // every time New Game was clicked instead of re-focusing the existing one.
  //
  // The ZF that 0x5e5fcb returns is exactly "no such window":
  //   not-found -> 0x5e3b2b's `xor esi,esi; or esi,esi` (ZF=1) and 0x5e5fcb
  //                returns immediately at 0x5e5fd0 `je 0x5e5ff0`;
  //   found     -> 0x5e5fee `or esi,esi` with esi = the found slot != 0 (ZF=0).
  // 0x5e3b2b is a pure pool search (and already writes regs.esi/regs.zf), so
  // running it here reproduces the flag the caller branches on AND leaves
  // regs.esi/regs.zf set to what 0x5e5fcb's own (Ghidra-mismodelled, entry-ZF)
  // body needs — no callee edit required.
  regs.ecx = ((regs.ecx & 0xffffff00) | 0x20) >>> 0;   // 0x4304de: mov cl, 0x20
  regs.edx = (regs.edx & 0xffff0000) >>> 0;            // 0x4304e0: xor dx, dx
  FUN_005e3b2b(heap);
  bVar1 = ((regs.zf) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = 0xff38, regs.ecx = 0x220, regs.edx = 0x430326, regs.ebx = 0xc80190, regs.eax = FUN_005e3f31(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f8130) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 4) & 0xffffffff);
    (regs.eax = 0xff38, regs.edx = 0x430326, regs.eax = FUN_005e412c(heap));
    heap.setU16((unaff_ESI + 0x15a), (0xffff) & 0xffff);
    heap.setU16((unaff_ESI + 0x15c), (0xffff) & 0xffff);
  }
  return;
}

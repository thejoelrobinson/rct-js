// @manual — do not regenerate.
// Source: decompiled/c/5e3f31.c
//
// Translator bug #1: `DAT_009a1164 = DAT_009a1164 + 0x5e;` in Ghidra C means
// "advance the undefined4* pointer by 0x5e elements" → +0x178 bytes. The
// auto-translator emits `heap.u32(0x009a1164) + 0x5e` (raw +0x5e bytes),
// because once we read the pointer as a u32 value the type info is gone.
// Verified against rct.exe: `add dword ptr [0x9a1164], 0x178` at 0x5e4096.
//
// All the iteration sites (line 31, line 42 etc.) properly scale `+0x5e*4`;
// only the write at the bottom is unscaled. The fix is the single literal
// substitution `+ 0x5e` → `+ 0x178` on the final write to DAT_009a1164.
//
// Translator bug #2: the Ghidra C synthesizes a 64-bit `undefined8 uVar5`
// to model the EDX:EAX pair (since `*(undefined4 *)(puVar3 + 0x20) = EAX`
// and `*(undefined4 *)(puVar3 + 0x4) = EDX` are written from the same
// CONCAT44(EDX, EAX) source). The auto-translator emits
// `uVar5 = CONCAT44(in_EDX, in_EAX) >>> 0` — the `>>> 0` truncates to
// 32 bits, losing EDX. Then `uVar2 = uVar5 >>> 0x20` shifts by 32, which
// in JS bitwise (5-bit shift count mask) is `>>> 0` — so uVar2 is also
// just EAX. End result: `[esi+0x4] = EAX` instead of EDX.
//
// In context: caller MainOpen passes EDX = widget-handler proc address
// (e.g. 0x42b076), and the binary writes that to window+0x4. With the
// translator bug, window+0x4 ended up with EAX (=0x1e0000 — the packed
// view-y), and `[esi+0x20] = EAX` happened to write EAX too (coincident
// with the truncation), so by luck the rect's view_y/view_x came out
// correct. But the widget-proc field (window+0x4) was garbage, and code
// that read it during paint observed `0x1e0000` and used it as a callable
// → the famous `[callIndirect] no JS function at 0x1e0000` warning.
//
// Fix below: read in_EAX into [esi+0x20], in_EDX into [esi+0x4] directly,
// no CONCAT44/shift dance.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e3f31(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let puVar3 = 0;
  let puVar4 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar5 = 0;
  uVar5 = ((CONCAT44(in_EDX, in_EAX)) >>> 0);
  while (0x9a1163 < heap.u32(0x009a1164)) {
    for (puVar4 = ((0x009a013c) >>> 0); (heap.u16((puVar4 + 0x32)) & 0x103) != 0; puVar4 = (((puVar4 + 0x178) >>> 0)) >>> 0) {
    
    }
    uVar5 = (((regs.eax = FUN_005e5bd8(heap))) >>> 0);
    // Hand-fix (extraout_ECX): FUN_005e5bd8 is pushal/popal-bracketed —
    // ECX is preserved across the call, so the reload should pull from
    // in_ECX (caller's original ECX) rather than the translator's `0`.
    extraout_ECX = in_ECX;
    in_ECX = ((extraout_ECX) >>> 0);
  }
  puVar3 = ((heap.u32(0x009a1164)) >>> 0);
  puVar1 = ((heap.u32(0x009a1164)) >>> 0);
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while (puVar3 != 0x009a013c && ((heap.u16((((puVar3) >>> 0) + -0x146)) >>> 1 & 1) != 0)) {
        puVar3 = ((puVar3 + ((-0x5e) * 4)) >>> 0);
      }
    }
  } else {
    for (; (puVar3 != 0x009a013c && (((heap.u16((((puVar3) >>> 0) + -0x146)) >>> 1 & 1) != 0 || ((heap.u16((((puVar3) >>> 0) + -0x146)) & 1) == 0)))); puVar3 = (((puVar3 + ((-0x5e) * 4)) >>> 0)) >>> 0) {
    
    }
  }
  while (puVar3 != puVar1) {
    heap.setU8((((puVar1) >>> 0) + 0x177), (heap.u8((((puVar1) >>> 0) + -1))) & 0xff);
    puVar1 = (((((puVar1) >>> 0) + -1)) >>> 0);
  }
  heap.setI8((puVar3 + ((0x5d) * 4)), (((in_ECX) << 24 >> 24)) & 0xff);
  heap.setU8((((puVar3) >>> 0) + 0x175), (0xff) & 0xff);
  heap.setU16((((puVar3) >>> 0) + 0x32), (0) & 0xffff);
  heap.setU16((((puVar3) >>> 0) + 0x32), (heap.u16((((puVar3) >>> 0) + 0x32)) | ((in_ECX >>> 8) & 0xffff)) & 0xffff);
  if ((in_ECX & 0x300) == 0) {
    heap.setU16((((puVar3) >>> 0) + 0x32), (heap.u16((((puVar3) >>> 0) + 0x32)) | 0x600) & 0xffff);
    (regs.eax = FUN_00452fce(heap));
  }
  // Hand-fix: model EDX:EAX pair as two separate 32-bit values rather
  // than via CONCAT44 (which the translator truncates to 32 bits with
  // `>>> 0`). Binary disasm @ 5e4001..5e4011:
  //   mov [esi + 0x20], eax     ; window+0x20 = EAX  (view_y << 16 | view_x)
  //   mov [esi + 0x24], ebx     ; window+0x24 = EBX  (view_h << 16 | view_w)
  //   mov [esi + 0x08], 0       ; viewport ptr — cleared
  //   mov [esi + 0x04], edx     ; window+0x04 = EDX  (typically widget-handler proc)
  //   mov [esi + 0x00], ebp     ; window+0x00 = EBP  (window proc)
  heap.setU16((puVar3 + ((0xc) * 4)), (0) & 0xffff);
  heap.setU32((puVar3 + (8) * 4),  in_EAX  >>> 0);    // [esi + 0x20]
  heap.setU32((puVar3 + (9) * 4),  unaff_EBX >>> 0);  // [esi + 0x24]
  heap.setU32((puVar3 + (2) * 4),  0);                // [esi + 0x08]
  heap.setU32((puVar3 + (1) * 4),  in_EDX  >>> 0);    // [esi + 0x04]
  heap.setU32(puVar3,              unaff_EBP >>> 0);  // [esi + 0x00]
  heap.setU32((puVar3 + (3) * 4), (0) & 0xffffffff);
  heap.setU32((puVar3 + (4) * 4), (0) & 0xffffffff);
  heap.setU32((puVar3 + (5) * 4), (0) & 0xffffffff);
  heap.setU32((puVar3 + (6) * 4), (0) & 0xffffffff);
  heap.setU16((((puVar3) >>> 0) + 0x15a), (0) & 0xffff);
  heap.setU16((puVar3 + ((0x57) * 4)), (0) & 0xffff);
  heap.setU16((((puVar3) >>> 0) + 0x15e), (0) & 0xffff);
  heap.setU16((puVar3 + ((0x58) * 4)), (0) & 0xffff);
  heap.setU16((((puVar3) >>> 0) + 0x162), (0) & 0xffff);
  heap.setU16((puVar3 + ((0x59) * 4)), (0) & 0xffff);
  heap.setU16((((puVar3) >>> 0) + 0x166), (0) & 0xffff);
  heap.setU16((puVar3 + ((0x5a) * 4)), (0) & 0xffff);
  heap.setU16((((puVar3) >>> 0) + 0x16a), (0) & 0xffff);
  heap.setU16((puVar3 + ((0x5b) * 4)), (0) & 0xffff);
  // Hand-fix (Phase O): set regs.esi = puVar3 (new window slot) BEFORE the
  // wndProc callIndirect. The binary's cdecl-ish convention has ESI live
  // across child calls and equal to the current window pointer at every
  // `call [esi+0x0]` site; window procs (e.g. 0x42afb5 the top-toolbar
  // proc, 0x42b079 the main-viewport proc) all read window fields via
  // `mov reg, [esi+...]`. Without this, the wndProc inherits whatever
  // ESI the LAST child call left behind — typically 0x9a013c (the FIRST
  // window slot), so every newly-created window's proc paints with the
  // MAIN viewport's rect. For the top toolbar (slot 0x9a02b4, rect
  // (0,0)+640x30) this caused the toolbar's solid-fill paint to use rect
  // (0,30)+640x416 instead, filling 133,120 pixels of palette idx 169
  // (forest green) across the entire game-back buffer at runInit. Boot-time
  // FRONT/GAME-BACK saw distinct=2 (idx 0 sky + idx 169 fill) instead of
  // the textured terrain the per-tile painters would otherwise produce.
  regs.esi = puVar3 >>> 0;
  (regs.eax = callIndirect(heap, heap.u32(puVar3), unaff_EDI, puVar3, unaff_EBP, __addr_stack0x00000000, unaff_EBX, uVar2, in_ECX, ((uVar5) >>> 0)));
  // Hand-fixed: 0x5e undefined4-elements = 0x178 bytes (see header comment).
  heap.setU32(0x009a1164, (heap.u32(0x009a1164) + 0x178) >>> 0);
  // Hand-fix: x86 5e3f31 epilogue leaves ESI = new-window pointer. Caller
  // FUN_004298a0 then does `*(esi+0x1c) = widgetTable; FUN_005e429d();` —
  // ViewportCreate writes `*(esi+8) = viewport_pool_slot`, so without this
  // propagation window+8 stays 0 and 9bc041's painter early-outs.
  regs.esi = puVar3 >>> 0;
  return (regs.eax = FUN_005e43de(heap));
} finally {
    heap.freeFrame(4);
  }
}

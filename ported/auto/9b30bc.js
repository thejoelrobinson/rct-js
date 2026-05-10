// @manual — do not regenerate.
//
// Source: decompiled/c/9b30bc.c — generic byte/word/dword "rep stosX"
// fill primitive used by the binary's gfx layer to clear/fill regions
// of an 8bpp framebuffer. Takes:
//   EDI → descriptor at &DAT_*: { *buf, ?, w(u16), h(u16), pitch_diff(u16), shift(u8) }
//   EBP → fill colour as a *smeared* palette index (idx*0x01010101)
//
// Translator-bug context for this file:
//
// 1. The auto-translator preserves `unaff_EBP` (Ghidra's "register live
//    on entry, not assigned in this function") as `regs.ebp` and writes
//    it directly through `setU32(puVar6, ebp)`. That's faithful to the
//    decompiled C, but the binary's actual call sites set EBP via x86
//    inline asm patterns Ghidra's decompiler doesn't model — typically
//    `mov al, idx; mov ah, al; shl eax, 16; mov ax, dx; mov ebp, eax`
//    to smear an 8-bit palette index into all four bytes of EBP. C
//    sees this as "EBP is live on entry" with no source.
//
// 2. With the smearing missing, regs.ebp holds whatever stale 32-bit
//    value the previous translated call left there — frequently a
//    function pointer (e.g. 0x00429ae4 for FUN_00429ae4, a window-proc
//    address that lives in regs.ebp because callsites pass procs around).
//    `setU32(framebuffer, 0x00429ae4)` fills the screen with the bytes
//    `e4 9a 42 00` repeating, giving the 4-colour vertical-stripe
//    artifact the user reported (palette indices 228, 154, 66, 0).
//
// Fix: smear the low byte of regs.ebp to a 32-bit palette-index
// pattern at entry. If the caller already smeared (correct ASM),
// `(byte * 0x01010101)` is idempotent. If the caller leaked a stale
// pointer (broken decompilation), the screen now fills with a single
// solid colour instead of a four-colour stripe — strictly an
// improvement and bit-exact for any caller that used the legitimate
// 8-bit-smear convention.

import { regs } from "../../runtime/regs.js";

export function FUN_009b30bc(heap) {
  const edi = regs.edi >>> 0;
  if (edi === 0) return;
  // Smear EBP's low byte to all four bytes — see header for rationale.
  // If the high bytes of regs.ebp are non-zero, the caller almost
  // certainly leaked a pointer (typically a window-proc address) instead
  // of a smeared palette index — treat as "clear to black" (idx 0) in
  // that case to avoid painting the screen with the bytes of a code
  // pointer. A legitimate smeared value has low byte == every byte
  // (e.g. 0x42424242), so this check is bit-exact for proper callers.
  let palIdx = regs.ebp & 0xff;
  const r = regs.ebp >>> 0;
  if ((r & 0xffffff00) !== 0 &&
      (((r >>> 8) & 0xff) !== palIdx || ((r >>> 16) & 0xff) !== palIdx || ((r >>> 24) & 0xff) !== palIdx)) {
    palIdx = 0;
  }
  const ebp = (Math.imul(palIdx, 0x01010101)) >>> 0;
  const bVar3 = heap.u8(edi + 0xe);
  let uVar2 = heap.u16(edi + 8) >>> (bVar3 & 0x1f);
  let uVar5 = (heap.u16(edi + 0xa) >>> (bVar3 & 0x1f)) >>> 0;
  const uVar1 = heap.u16(edi + 0xc);
  let puVar6 = heap.u32(edi);
  if (puVar6 === 0 || uVar5 === 0) return;
  do {
    if ((uVar2 & 1) !== 0) {
      heap.setU8(puVar6, ebp & 0xff);
      puVar6 = (puVar6 + 1) >>> 0;
    }
    let uVar4 = (uVar2 >>> 2);
    if (((uVar2 >>> 1) & 1) !== 0) {
      heap.setU16(puVar6, ebp & 0xffff);
      puVar6 = (puVar6 + 2) >>> 0;
    }
    for (; uVar4 !== 0; uVar4 = (uVar4 - 1) >>> 0) {
      heap.setU32(puVar6, ebp >>> 0);
      puVar6 = (puVar6 + 4) >>> 0;
    }
    puVar6 = (puVar6 + uVar1) >>> 0;
    uVar5 = (uVar5 - 1) >>> 0;
  } while (uVar5 !== 0);
}

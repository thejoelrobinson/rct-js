// @manual — do not regenerate.
// Source: decompiled/c/431510.c
//
// Disassembly at 0x431510: this is the tile-pick function. Its epilogue
// at 0x4315fa..0x431614 unconditionally reloads the result registers
// from the result-struct at 0x628910:
//   movb 0x628910, %bl    ; status flag
//   movw 0x628914, %ax    ; pick world-x
//   movw 0x628916, %cx    ; pick world-y
//   movl 0x628918, %edx   ; tile-element pointer
//   pop esi
//   ret
//
// Ghidra's C only surfaces `return DAT_00628914` (the AX return), so
// the translated JS misses the CX, DX (high), and EDX channel — and
// every caller that reads them via extraout_CX / extraout_EDX gets 0.
// Plumb all three through regs.* before returning.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433f20 } from "./433f20.js";
import { FUN_00436b2a } from "./436b2a.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_00431510(heap) {
  let bVar1 = 0;
  let psVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar5 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  heap.setU32(0x00628910, (0) >>> 0);
  heap.setU32(0x0062891c, (in_DX) >>> 0);
  sVar3 = (((regs.eax = FUN_005e3ace(heap))) & 0xffff);
  // Hand-fix: the binary (0x431524 `or esi,esi; je`) uses the ESI that
  // FUN_005e3ace RETURNS (the hit window slot), not the entry ESI. The
  // translator captured `unaff_ESI` before the call (when ESI is the
  // caller's, typically 0), so the pick branch was never entered and the
  // cursor-pick resolved nothing. Read regs.esi AFTER the 5e3ace call.
  // (5e3ace.js sets regs.esi = slot on hit / 0 on miss — see its header.)
  let unaff_ESI = regs.esi >>> 0;
  if ((unaff_ESI != 0) && (psVar2 = ((heap.u32((unaff_ESI + 8))) >>> 0), psVar2 != 0x0)) {
    sVar4 = ((sVar3 - heap.i16(psVar2 + (2) * 2)) & 0xffff);
    heap.setU32(0x00628904, (sVar3) >>> 0);
    heap.setU32(0x00628906, (unaff_BX) >>> 0);
    if ((heap.i16(psVar2 + (2) * 2) <= sVar3) && (((sVar4 < heap.i16(psVar2) && (sVar3 = ((unaff_BX - heap.i16(psVar2 + (3) * 2)) & 0xffff), heap.i16(psVar2 + (3) * 2) <= unaff_BX)) && (sVar3 < heap.i16(psVar2 + (1) * 2))))) {
      // Hand-fix (translator emitted setU8 for 16-bit `mov word` stores and
      // setU32 for the DPI struct words). The binary (0x43157f..0x4315ca) builds
      // a 1x1 pick DPI at 0x5f96d0 entirely from 16-bit stores:
      //   [0x5f96ce] = cx (zoom shift)            ; mov word
      //   [0x5f96c4] = (sVar4<<cl + spr.x) & mask  ; mov word  (clip world-X)
      //   [0x5f96c6] = (sVar3<<cl + spr.y) & mask  ; mov word  (clip world-Y)
      // then the DPI fields at 0x5f96d0+4/6/8/a/e (clipX/clipY/w/h/variant):
      //   [+4]=[0x5f96c4] [+6]=[0x5f96c6] [+8]=1 [+a]=1 [+e]=[0x5f96ce]
      // The previous setU8/setU32 truncated the world coords to one byte and
      // clobbered adjacent DPI words, so the 1x1 blit landed at the wrong clip
      // and the pick resolved no tile. Oracle: 0x431510 via the interpreter.
      bVar1 = ((heap.u8((psVar2 + ((8) * 2)))) & 0xff);
      heap.setU16(0x005f96ce, bVar1 & 0xffff);
      uVar5 = ((-1 << (bVar1 & 0x1f)) & 0xffff);
      heap.setU16(0x005f96c4, ((sVar4 << (bVar1 & 0x1f)) + heap.i16(psVar2 + (4) * 2)) & uVar5 & 0xffff);
      heap.setU16(0x005f96c6, ((sVar3 << (bVar1 & 0x1f)) + heap.i16(psVar2 + (5) * 2)) & uVar5 & 0xffff);
      heap.setU32(0x005f96e0, (0x006284ac) >>> 0);
      heap.setU32(0x00981ef8, (0x005f96d0) >>> 0);
      // DPI struct at 0x5f96d0 (clipX@+4, clipY@+6, w@+8, h@+a, variant@+e), all 16-bit.
      heap.setU16(0x005f96d4, heap.u16(0x005f96c4));
      heap.setU16(0x005f96d6, heap.u16(0x005f96c6));
      heap.setU16(0x005f96d8, 1);
      heap.setU16(0x005f96da, 1);
      heap.setU16(0x005f96de, heap.u16(0x005f96ce));
      (regs.eax = FUN_00431b6f(heap, psVar2));
      (regs.eax = FUN_00436b2a(heap));
      (regs.eax = FUN_00433bae(heap));
      (regs.eax = FUN_00433f20(heap));
    }
  }
  // Hand-fix: epilogue reloads CX (world-y) and EDX (tile-element ptr)
  // from the result struct — every caller that reads extraout_CX /
  // extraout_EDX needs these in regs.
  regs.ecx = (regs.ecx & 0xffff0000) | heap.u16(0x00628916);
  regs.edx = heap.u32(0x00628918) >>> 0;
  return heap.u32(0x00628914);
}

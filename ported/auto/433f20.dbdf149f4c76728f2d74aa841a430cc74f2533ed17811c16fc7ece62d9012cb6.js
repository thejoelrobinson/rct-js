// @manual — do not regenerate.
// Source: decompiled/c/433f20.c — the 1x1 pick paint-list walk. It re-paints
// the world into the 1x1 pick DPI at the cursor; the pick-blit FUN_009b35b4
// sets the hit flag 0x99c164 when a tile draws a pixel at that 1x1 position,
// and FUN_00433f8b records that tile (the cursor->tile resolve behind 431510).
//
// HAND-FIX — the translator dropped the per-blit register setup before each
// FUN_009b35b4 call (same dropped-register-init class as the 429aff fix).
// 9b35b4 reads in_CX=x, in_DX=y, unaff_EBX=image, unaff_EDI=DPI from registers
// (it also resets 0x99c164=0 on entry, then sets it iff it draws a pixel). The
// binary (disasm 0x433f20-0x433f7c) loads edi=[0x981ef8] (the 1x1 pick DPI)
// once, then before each blit:
//   1st variant (0x433f34): cx=[ebp+0x10], dx=[ebp+0x12], ebx=[ebp]
//   2nd variant (0x433f61): cx=[esi+4]+[ebp+0x10], dx=[esi+6]+[ebp+0x12], ebx=[esi]
// (ebp = the paint entry = iVar3; esi = the sub-entry = iVar1). Without this
// the blit got garbage position/image and never set 0x99c164, so 431510
// resolved no tile.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00433f8b } from "./433f8b.js";
import { FUN_009b35b4 } from "./9b35b4.js";
export function FUN_00433f20(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  const dpi = heap.u32(0x00981ef8) >>> 0; // edi = the 1x1 pick DPI (constant across the walk)
  iVar2 = ((heap.u32(0x005f96e4)) >>> 0);
  while (iVar2 = ((heap.i32((iVar2 + 0x20))) >>> 0), iVar3 = ((iVar2) >>> 0), iVar2 != 0) {
    while (true) {
      regs.edi = dpi;
      regs.ecx = ((regs.ecx & 0xffff0000) | heap.u16(iVar3 + 0x10)) >>> 0;
      regs.edx = ((regs.edx & 0xffff0000) | heap.u16(iVar3 + 0x12)) >>> 0;
      regs.ebx = heap.u32(iVar3) >>> 0;
      (regs.eax = FUN_009b35b4(heap));
      // @manual: 433f8b reads the hit element from [ebp+0x24/0x28/0x2c] where the asm has
      // ebp = the paint entry (iVar3) at the call (0x433f33 push ebp; ...; 0x433f45 pop ebp;
      // 0x433f46 call 433f8b). The translator dropped that EBP=entry setup, so the JS
      // recorder read garbage and never wrote 0x628918 in the pure-JS browser path.
      regs.ebp = iVar3 >>> 0;
      (regs.eax = FUN_00433f8b(heap));
      if (heap.i32((iVar3 + 0x1c)) == 0) {
        break;
      }
      iVar3 = ((heap.i32((iVar3 + 0x1c))) >>> 0);
    }
    for (iVar1 = ((heap.i32((iVar3 + 0x18))) >>> 0); iVar1 != 0; iVar1 = (((heap.i32((iVar1 + 8))) >>> 0)) >>> 0) {
      regs.edi = dpi;
      regs.ecx = ((regs.ecx & 0xffff0000) | ((heap.u16(iVar1 + 4) + heap.u16(iVar3 + 0x10)) & 0xffff)) >>> 0;
      regs.edx = ((regs.edx & 0xffff0000) | ((heap.u16(iVar1 + 6) + heap.u16(iVar3 + 0x12)) & 0xffff)) >>> 0;
      regs.ebx = heap.u32(iVar1) >>> 0;
      (regs.eax = FUN_009b35b4(heap, iVar3));
      // @manual: same EBP=paint-entry setup before the recorder (asm 0x433f7a pop ebp;
      // 0x433f7c call 433f8b -> ebp = iVar3).
      regs.ebp = iVar3 >>> 0;
      (regs.eax = FUN_00433f8b(heap));
    }
  }
  return;
}

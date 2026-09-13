// @manual — do not regenerate. No decompiled/c/5e37e6.c exists; this is a
// direct transcription from binary/rct.exe.
//
// The TOOLTIP window's PAINT proc. FUN_005e3652 stores it into the window at
// slot+0 via WindowCreate (see ported/auto/5e3652.js:61, `mov ebp, 0x5e37e6`).
// It was never ported, so every tooltip paint hit
//   [callIndirect] no JS function at 0x5e37e6 — returning 0
// and tooltips drew nothing at all.
//
// Binary (0x5e37e6-0x5e3860):
//   cmp edi,-1 / je ret          ; edi == -1 means "not a real event"
//   ax=[esi+0x20] cx=[esi+0x22]  ; window x, y
//   bx=[esi+0x24] dx=[esi+0x26]  ; window width, height
//   bx+=ax; dec bx               ; right  = x + w - 1
//   dx+=cx; dec dx               ; bottom = y + h - 1
//   push ax,bx,cx,dx; xor ebp,ebp; call 0x9b30f1   ; outer border, colour 0
//   pop  dx,cx,bx,ax
//   inc ax; dec bx; inc cx; dec dx                 ; inset by 1
//   mov ebp,0x5c;              call 0x9b30f1       ; inner fill, colour 0x5c
//   cx=[esi+0x24]>>1; dx=([esi+0x26]>>1)-5         ; centre, raised 5px
//   cx+=[esi+0x20]; dx+=[esi+0x22]
//   push esi; bx=[esi+0x15a]; esi=esi+0x15c; mov bp,0xc5; call 0x458678; pop esi
//
// EVERY arithmetic op above is 16-bit, so each one masks to 0xffff and leaves
// the upper half of the 32-bit register intact. Getting that wrong is the
// exact defect class that produced ADDENDUM 112/113/114.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_00458678 } from "./458678.js";

const lo16 = (reg, v) => ((reg & 0xffff0000) | (v & 0xffff)) >>> 0;

export function FUN_005e37e6(heap) {
  // 0x5e37e6: cmp edi, -1 / je 0x5e3860 (plain ret)
  if ((regs.edi | 0) === -1) return;

  const wnd = regs.esi >>> 0;

  // 0x5e37eb-0x5e3803
  const x = heap.u16(wnd + 0x20);
  const y = heap.u16(wnd + 0x22);
  const right = (heap.u16(wnd + 0x24) + x - 1) & 0xffff;
  const bottom = (heap.u16(wnd + 0x26) + y - 1) & 0xffff;

  // 0x5e380d: xor ebp, ebp — full 32-bit zero, then the outer rect.
  regs.eax = lo16(regs.eax, x);
  regs.ebx = lo16(regs.ebx, right);
  regs.ecx = lo16(regs.ecx, y);
  regs.edx = lo16(regs.edx, bottom);
  regs.ebp = 0;
  FUN_009b30f1(heap);

  // 0x5e381c-0x5e3829: the pushed values are restored, then inset by one on
  // each side, and filled with colour 0x5c. `mov ebp, 0x5c` is a full 32-bit
  // load, so it does not depend on whatever 0x9b30f1 left in ebp.
  regs.eax = lo16(regs.eax, x + 1);
  regs.ebx = lo16(regs.ebx, right - 1);
  regs.ecx = lo16(regs.ecx, y + 1);
  regs.edx = lo16(regs.edx, bottom - 1);
  regs.ebp = 0x5c;
  FUN_009b30f1(heap);

  // 0x5e382e-0x5e3844: centre of the window, raised 5px. Note the shifts are
  // on the WIDTH/HEIGHT re-read from the window, not on the right/bottom
  // computed above.
  const cx = (((heap.u16(wnd + 0x24) >>> 1) + heap.u16(wnd + 0x20))) & 0xffff;
  const dx = (((heap.u16(wnd + 0x26) >>> 1) - 5 + heap.u16(wnd + 0x22))) & 0xffff;

  // 0x5e3848-0x5e385f: draw the tooltip string. esi is pushed/popped around
  // the call, so restore it afterwards.
  regs.ecx = lo16(regs.ecx, cx);
  regs.edx = lo16(regs.edx, dx);
  regs.ebx = lo16(regs.ebx, heap.u16(wnd + 0x15a));
  regs.esi = (wnd + 0x15c) >>> 0;
  // 0x5e3856 is `mov bp, 0xc5` — 16-bit, so the upper half of ebp survives.
  regs.ebp = lo16(regs.ebp, 0xc5);
  FUN_00458678(heap);
  regs.esi = wnd;
}

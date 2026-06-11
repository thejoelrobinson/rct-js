// @manual — do not regenerate.
// Source: binary 0x5e5301..0x5e53c9 (capstone disasm); decompiled/c/5e5301.c
// is structurally right but register-blind. Hand-port (2026-06-11)
// replacing the auto translation, whose three paths each mis-called a
// callee:
//   - the widget-invalidate path (al bit 0x80) called FUN_005e117d
//     without staging the rect registers it reads — the binary computes
//     ax/bx/dx/bp from the widget rect [+2/+6/+4/+8] (+1 on right and
//     bottom) offset by the window's screen pos [+0x20/+0x22] at
//     0x5e5367..0x5e538d; the stale-regs call marked garbage (observed
//     writing outside the dirty grid entirely);
//   - the class path and the 0x40 path called FUN_005e43de without
//     setting regs.esi to the matched window record — 5e43de saw the
//     CALLER's esi (typically a peep sprite) instead.
//
// FUN_005e5301 — per-class window refresh dispatch: al = window class
// (bit 0x80: invalidate one widget (index ah) of windows with id bx;
// bit 0x40: refresh ALL windows of class al&0xbf; else refresh windows
// of class al with id bx). Walks the window records at 0x9a013c
// (stride 0x178, end [0x9a1164]).
//
// Register effects mirror the binary: the 0x40 path exits with
// al &= 0xbf (no save); the other two paths preserve everything (the
// widget path is push ax/esi + pushal per record).
//
// Oracle: tools/_lockstep-statrio.mjs SEED=1 (the trio's dec-to-zero
// tails fire this with ax=0xc97 — the widget path); 441452's plain-path
// usage was previously verified in tools/_diff-441452.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
import { markDirtyRect } from "./extra_invalidate.js";

function saveRegs() {
  return { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
           esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
}
function restoreRegs(s) {
  regs.eax = s.eax; regs.ecx = s.ecx; regs.edx = s.edx; regs.ebx = s.ebx;
  regs.esi = s.esi; regs.edi = s.edi; regs.ebp = s.ebp;
}

// call 0x5e43de with esi = the window record, preserving everything else
// (the binary's 5e43de preserves esi — the walk continues from it).
function refreshWindow(heap, w) {
  const s = saveRegs();
  regs.esi = w >>> 0;
  FUN_005e43de(heap);
  restoreRegs(s);
}

export function FUN_005e5301(heap) {
  const al = regs.eax & 0xff;
  const ah = (regs.eax >>> 8) & 0xff;
  const bx = regs.ebx & 0xffff;
  const end = heap.u32(0x9a1164) >>> 0;

  if ((al & 0x80) !== 0) {
    // 0x5e5338: invalidate widget ah of windows class al&0x7f, id bx
    const cls = al & 0x7f;
    for (let w = 0x9a013c; w < end; w += 0x178) {
      if (heap.u8(w + 0x174) !== cls) continue;
      if (bx !== heap.u16(w + 0x30)) continue;
      const widget = (heap.u32(w + 0x1c) + ah * 0x10) >>> 0;
      const left = heap.u16(widget + 2);
      if (left === 0xfffe) continue;                      // cmp ax,-2
      const top = heap.u16(widget + 6);
      const right = (heap.u16(widget + 4) + 1) & 0xffff;  // inc dx
      const bottom = (heap.u16(widget + 8) + 1) & 0xffff; // inc bp
      const wx = heap.u16(w + 0x20), wy = heap.u16(w + 0x22);
      markDirtyRect(
        heap,
        ((left + wx) << 16) >> 16,
        ((top + wy) << 16) >> 16,
        ((right + wx) << 16) >> 16,
        ((bottom + wy) << 16) >> 16,
      );
    }
    return regs.eax;                                      // pop ax/esi: all preserved
  }
  if ((al & 0x40) !== 0) {
    regs.eax = ((regs.eax & 0xffffff00) | (al & 0xbf)) >>> 0;   // and al,0xbf (sticks)
    const cls = al & 0xbf;
    for (let w = 0x9a013c; w < end; w += 0x178) {
      if (heap.u8(w + 0x174) === cls) refreshWindow(heap, w);
    }
    return regs.eax;
  }
  for (let w = 0x9a013c; w < end; w += 0x178) {
    if (heap.u8(w + 0x174) === al && bx === heap.u16(w + 0x30)) refreshWindow(heap, w);
  }
  return regs.eax;
}

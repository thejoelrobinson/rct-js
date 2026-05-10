// @manual — do not regenerate.
// Source: decompiled/c/9bc041.c (transcribed against rct.exe @ 0x9bc041)
//
// FUN_009bc041 is the viewport-rect intersection walker. The auto-port from
// Ghidra was wrong in two important ways:
//
//   1) Ghidra's C dropped the *pre-call* register clipping that the binary
//      issues before each recursive call (e.g. `mov dx, [edi+0x20]` at
//      0x9bc089 just before `call 9bc041`). Without that clipping, the
//      recursive call runs with the parent's clip rect unchanged and the
//      recursion never converges → JS RangeError stack overflow.
//
//   2) The Ghidra C captures the post-call register update as
//      `in_AX = *(short *)(uVar4 + 0x198);` etc., where `0x198` is what
//      Ghidra computed for `&edi[0x20]` if EDI were a `short*`. The actual
//      binary uses `[edi + 0x20]` — i.e. byte offsets `0x20`, `0x22`, `0x24`,
//      `0x26` into the viewport struct. The translator multiplied by 4 in
//      one direction and not the other; the result is offsets `0x198`, `0x19a`,
//      etc. (`0x66*4=0x198`?) which are nonsense for the struct layout.
//
// Hand-ported below from the disassembly. Register file is read as-is
// (in_AX = AL/AH of regs.eax & 0xffff etc.), the recursion clips before
// each call (matching push/mov/call/pop sequences in the binary), and on
// the terminator path we read the sprite struct at *(esi+8), execute the
// 4 rect-clamp checks, and call DAT_009b2280 indirect if both x and y
// extents survive.
//
// The function is __cdecl-but-register-passed: it receives AX/DX/BX/BP/ESI
// and clobbers EDI/ECX freely. EAX/EBX/EDX/EBP are caller-saved (the binary
// pushes/pops the 16-bit halves around each recursive call).

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009bc041(heap) {
  // Local 16-bit register state. We work entirely in 16-bit values for the
  // clip rect (matching `cmp dx, [edi+0x20]` etc.), then write the chosen
  // halves back to regs at the end if the terminator fires.
  let ax = regs.eax & 0xffff;
  let dx = regs.edx & 0xffff;
  let bx = regs.ebx & 0xffff;
  let bp = regs.ebp & 0xffff;
  const esi = regs.esi >>> 0;

  // The viewport-list end pointer.
  const end = heap.u32(0x009a1164) >>> 0;

  // Local EDI = next viewport candidate after ESI. Walk it forward.
  let edi = (esi + 0x178) >>> 0;

  // The signed 16-bit comparisons in the binary use `cmp word`/`jle`/`jge`
  // — i.e. signed. `sx16(v)` keeps that semantics when comparing.
  const sx16 = (v) => (v << 16) >> 16;

  // Walk forward, doing the 4-quadrant rect intersection with clip rect.
  for (;;) {
    if (end <= edi) break;  // → terminator (viewport scan complete)

    const v_x   = heap.u16(edi + 0x20);
    const v_y   = heap.u16(edi + 0x22);
    const v_w   = heap.u16(edi + 0x24);
    const v_h   = heap.u16(edi + 0x26);
    const v_xr  = (v_x + v_w) & 0xffff;  // right edge
    const v_yb  = (v_y + v_h) & 0xffff;  // bottom edge

    // 4 cull tests: if rect fails any, skip viewport and advance.
    if (sx16(dx) <= sx16(v_x))   { edi = (edi + 0x178) >>> 0; continue; }
    if (sx16(bp) <= sx16(v_y))   { edi = (edi + 0x178) >>> 0; continue; }
    if (sx16(v_xr) <= sx16(ax))  { edi = (edi + 0x178) >>> 0; continue; }
    if (sx16(v_yb) <= sx16(bx))  { edi = (edi + 0x178) >>> 0; continue; }

    // Rect passes. Now split the clip rect at the viewport's edges.
    // 4 nested splits, each does push/clip/recurse/pop/clip-then-jmp-top.

    // Split 1: if AX < v_x, recurse with DX=v_x then continue with AX=v_x.
    if (sx16(ax) < sx16(v_x)) {
      // push bx,dx,bp,edi,esi; set regs to recursion args; recurse
      const sav_ax = ax, sav_bx = bx, sav_dx = dx, sav_bp = bp, sav_edi = edi;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ebx = (regs.ebx & 0xffff0000) | bx;
      regs.edx = (regs.edx & 0xffff0000) | (v_x & 0xffff);  // clipped DX
      regs.ebp = (regs.ebp & 0xffff0000) | bp;
      regs.esi = esi;  // unchanged
      FUN_009bc041(heap);
      // pop — restore our locals from saved
      ax = sav_ax; bx = sav_bx; dx = sav_dx; bp = sav_bp; edi = sav_edi;
      // After return: ax = [edi+0x20]; jmp top (re-enter loop with new ax)
      ax = v_x & 0xffff;
      continue;
    }

    // Split 2: if DX > v_xr, recurse with DX=v_xr then continue with AX=v_xr.
    if (sx16(dx) > sx16(v_xr)) {
      const sav_ax = ax, sav_bx = bx, sav_dx = dx, sav_bp = bp, sav_edi = edi;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ebx = (regs.ebx & 0xffff0000) | bx;
      regs.edx = (regs.edx & 0xffff0000) | (v_xr & 0xffff);
      regs.ebp = (regs.ebp & 0xffff0000) | bp;
      regs.esi = esi;
      FUN_009bc041(heap);
      ax = sav_ax; bx = sav_bx; dx = sav_dx; bp = sav_bp; edi = sav_edi;
      ax = v_xr & 0xffff;
      continue;
    }

    // Split 3: if BX < v_y, recurse with BP=v_y then continue with BX=v_y.
    if (sx16(bx) < sx16(v_y)) {
      const sav_ax = ax, sav_bx = bx, sav_dx = dx, sav_bp = bp, sav_edi = edi;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ebx = (regs.ebx & 0xffff0000) | bx;
      regs.edx = (regs.edx & 0xffff0000) | dx;
      regs.ebp = (regs.ebp & 0xffff0000) | (v_y & 0xffff);
      regs.esi = esi;
      FUN_009bc041(heap);
      ax = sav_ax; bx = sav_bx; dx = sav_dx; bp = sav_bp; edi = sav_edi;
      bx = v_y & 0xffff;
      continue;
    }

    // Split 4: if BP > v_yb, recurse with BP=v_yb then continue with BX=v_yb.
    if (sx16(bp) > sx16(v_yb)) {
      const sav_ax = ax, sav_bx = bx, sav_dx = dx, sav_bp = bp, sav_edi = edi;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ebx = (regs.ebx & 0xffff0000) | bx;
      regs.edx = (regs.edx & 0xffff0000) | dx;
      regs.ebp = (regs.ebp & 0xffff0000) | (v_yb & 0xffff);
      regs.esi = esi;
      FUN_009bc041(heap);
      ax = sav_ax; bx = sav_bx; dx = sav_dx; bp = sav_bp; edi = sav_edi;
      bx = v_yb & 0xffff;
      continue;
    }

    // All 4 splits failed → fall through to ret (binary: c3 at 9bc12c).
    return;
  }

  // Terminator (9bc12d): EDI = [ESI + 8] (sprite/proc struct).
  edi = heap.u32(esi + 8) >>> 0;
  if (edi === 0) return;
  // Clamp clip rect to sprite's bounding box (read from edi+0..6).
  let cx = heap.u16(edi + 4) & 0xffff;     // sprite x_min
  if (sx16(ax) < sx16(cx)) ax = cx & 0xffff;
  cx = (cx + heap.u16(edi)) & 0xffff;      // sprite x_max
  if (sx16(dx) > sx16(cx)) dx = cx & 0xffff;
  cx = heap.u16(edi + 6) & 0xffff;         // sprite y_min
  if (sx16(bx) < sx16(cx)) bx = cx & 0xffff;
  cx = (cx + heap.u16(edi + 2)) & 0xffff;  // sprite y_max
  if (sx16(bp) > sx16(cx)) bp = cx & 0xffff;
  // If clamped rect has positive extent, call the proc.
  // Binary at 9bc163-9bc17d uses signed jge to short-circuit degenerate rects,
  // then movzx-extends the surviving values and computes ECX=dx-ax (width)
  // and EDX=bp-bx (height) before calling [0x9b2280](eax=x, ebx=y, ecx=w, edx=h).
  if (sx16(ax) >= sx16(dx)) return;
  if (sx16(bx) >= sx16(bp)) return;
  const ex = ax & 0xffff;            // movzx eax, ax
  const ey = bx & 0xffff;            // movzx ebx, bx
  const ew = (dx - ax) & 0xffff;     // sub ecx, eax (after movzx)
  const eh = (bp - bx) & 0xffff;     // sub edx, ebx
  regs.eax = ex >>> 0;
  regs.ebx = ey >>> 0;
  regs.ecx = ew >>> 0;
  regs.edx = eh >>> 0;
  regs.esi = esi;
  const proc = heap.u32(0x009b2280) >>> 0;
  if (proc) regs.eax = callIndirect(heap, proc) >>> 0;
}

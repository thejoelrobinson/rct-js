// @manual — do not regenerate.
// Source: decompiled/c/5e13d2.c — but TRANSCRIBED FROM THE BINARY, not from the C.
//
// FUN_005e13d2 is "draw one window (and everything stacked on it) into the
// current dirty block". It is the leaf of the binary's real per-frame paint
// dispatcher: FUN_004385d8 -> 5e1653 -> 5e1210 (walk the dirty-block grid)
// -> 5e12eb (build the clipped DPI at 0x99fb8c, intersect the pool) -> HERE.
//
// The Ghidra C for this function is unusable in three ways that each silently
// produced a BLANK window, which is why the title menu showed one button and
// the scenario-select list was empty (ADDENDUM 138):
//
//  1. THE PAINT CALLS LOST THEIR ARGUMENTS. The binary is explicit at
//     0x5e15f0..0x5e1605:
//         mov edi, 0xffffffff ; mov ax, 0xffff ; call [esi]   <- pass 1
//         mov edi, 0x99fb8c   ; mov ax, 0xffff ; call [esi]   <- pass 2
//     EDI is the window-paint convention's DPI argument and EDI == -1 is the
//     measure-only mode every proc early-returns from; AX = 0xffff selects
//     "draw the standard widget frame" (AX >= 0 means "draw widget #AX").
//     Ghidra rendered both as `(*(code *)*unaff_ESI)();` with no register
//     setup at all, so each proc ran on whatever EDI/EAX happened to be live —
//     usually measure-mode twice, i.e. nothing drawn. ESI (the window) was
//     equally stale.
//  2. WRONG OPERAND WIDTH ON THE WHOLE DPI STRUCT. 0x99fb8c is a 16-byte DPI:
//     bytes(u32) @0x8c, clipX @0x90, clipY @0x92, clipW @0x94, clipH @0x96,
//     pitch-remainder @0x98 — the last five all u16, and every access in the
//     binary carries the 0x66 operand-size prefix. The translation used
//     heap.u32/setU32 on all of them, so each store smashed the next field
//     (clipX's write clobbered clipY, clipW's clobbered clipH) and each read
//     packed two fields into one number. The same bug was already found and
//     fixed one level up in 5e12eb.js; this file was missed.
//  3. `mov word ptr [0x9a0129], ax` (the window's palette/colour selector,
//     0x5e15ea) was lowered as a BYTE store, dropping the high half.
//
// Rather than patch the C output a third time, the body below is a direct
// transcription of 0x5e13d2..0x5e1652 with the labels kept in the comments.
// Register arithmetic is done at 16-bit signed width (s16) because every
// compare in the original is a 16-bit `jle`/`jge`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { regs } from "../../runtime/regs.js";

const POOL_END = 0x009a1164 >>> 0;
const STRIDE = 0x178;
const DPI = 0x0099fb8c >>> 0;      // bytes ptr (u32)
const DPI_X = 0x0099fb90 >>> 0;    // clipX  (u16)
const DPI_Y = 0x0099fb92 >>> 0;    // clipY  (u16)
const DPI_W = 0x0099fb94 >>> 0;    // clipW  (u16)
const DPI_H = 0x0099fb96 >>> 0;    // clipH  (u16)
const DPI_P = 0x0099fb98 >>> 0;    // pitch remainder (u16)

const s16 = (v) => (v << 16) >> 16;

function drawWindow(heap) {
  let ax = s16(regs.eax);
  let bx = s16(regs.ebx);
  let dx = s16(regs.edx);
  let bp = s16(regs.ebp);
  let esi = regs.esi >>> 0;

  // ---- 0x5e13d2: split the rect around any window stacked ON TOP of esi ----
  // Each overlap is resolved by recursing on the non-overlapping slice and
  // then shrinking (ax|bx) past the occluder, restarting the scan.
  RESTART: for (;;) {
    let edi = (esi + STRIDE) >>> 0;
    for (;;) {                                   // 0x5e13d4
      if (edi >= (heap.u32(POOL_END) >>> 0)) break;   // -> 0x5e14c6
      const wl = heap.i16(edi + 0x20), wt = heap.i16(edi + 0x22);
      const wr = s16(wl + heap.i16(edi + 0x24));
      const wb = s16(wt + heap.i16(edi + 0x26));
      if (dx <= wl || bp <= wt || wr <= ax || wb <= bx
          || (heap.u16(edi + 0x32) & 0x10) !== 0) {
        edi = (edi + STRIDE) >>> 0;              // 0x5e13d4
        continue;
      }
      // 0x5e1414 — four ways the rect can stick out past this occluder.
      if (ax < wl) {                             // 0x5e141a: recurse with dx = wl
        recurse(heap, ax, bx, wl, bp, esi);
        ax = wl;                                 // 0x5e1433
        continue RESTART;
      }
      if (dx > wr) {                             // 0x5e1446: recurse with dx = wr
        recurse(heap, ax, bx, wr, bp, esi);
        ax = wr;                                 // 0x5e145e
        continue RESTART;
      }
      if (bx < wt) {                             // 0x5e1471: recurse with bp = wt
        recurse(heap, ax, bx, dx, wt, esi);
        bx = wt;                                 // 0x5e148a
        continue RESTART;
      }
      if (bp > wb) {                             // 0x5e14a0: recurse with bp = wb
        recurse(heap, ax, bx, dx, wb, esi);
        bx = wb;                                 // 0x5e14b8
        continue RESTART;
      }
      return;                                    // 0x5e14c5 — fully occluded
    }
    break;
  }

  // ---- 0x5e14c6: clamp the rect to esi's own frame ----
  let cx = heap.i16(esi + 0x20);
  if (ax < cx) ax = cx;
  cx = s16(cx + heap.i16(esi + 0x24));
  if (dx > cx) dx = cx;
  cx = heap.i16(esi + 0x22);
  if (bx < cx) bx = cx;
  cx = s16(cx + heap.i16(esi + 0x26));
  if (bp > cx) bp = cx;
  if (ax >= dx || bx >= bp) return;              // 0x5e14f6 / 0x5e14ff

  // ---- 0x5e1508: draw esi, then every 0x10-flagged window stacked on it ----
  for (;;) {
    // 0x5e1508..0x5e1538 — push the rect and the whole DPI struct.
    const sAx = ax, sBx = bx, sDx = dx, sBp = bp;
    const p8c = heap.u32(DPI) >>> 0, p90 = heap.i16(DPI_X), p92 = heap.i16(DPI_Y),
          p94 = heap.i16(DPI_W), p96 = heap.i16(DPI_H), p98 = heap.i16(DPI_P);
    let empty = false;

    // 0x5e1539: clip the DPI's left edge up to ax.
    let d = s16(ax - heap.i16(DPI_X));
    if (d > 0) {
      heap.setU16(DPI_X, s16(heap.i16(DPI_X) + d) & 0xffff);
      heap.setU16(DPI_W, s16(heap.i16(DPI_W) - d) & 0xffff);
      if (heap.i16(DPI_W) <= 0) empty = true;
      else {
        heap.setU16(DPI_P, s16(heap.i16(DPI_P) + d) & 0xffff);
        heap.setU32(DPI, (heap.u32(DPI) + d) >>> 0);   // 0x5e155d: movsx eax,ax
      }
    }
    // 0x5e1566: clip the right edge down to dx.
    if (!empty) {
      d = s16(s16(heap.i16(DPI_X) + heap.i16(DPI_W)) - dx);
      if (d > 0) {
        heap.setU16(DPI_W, s16(heap.i16(DPI_W) - d) & 0xffff);
        if (heap.i16(DPI_W) <= 0) empty = true;
        else heap.setU16(DPI_P, s16(heap.i16(DPI_P) + d) & 0xffff);
      }
    }
    // 0x5e158c: clip the top edge down to bx (and advance bytes by whole rows).
    if (!empty) {
      d = s16(bx - heap.i16(DPI_Y));
      if (d > 0) {
        heap.setU16(DPI_Y, s16(heap.i16(DPI_Y) + d) & 0xffff);
        heap.setU16(DPI_H, s16(heap.i16(DPI_H) - d) & 0xffff);
        if (heap.i16(DPI_H) <= 0) empty = true;
        else {
          // 0x5e15a5: movzx eax,[DPI_W] / add ax,[DPI_P] / movsx ebx,bx / mul ebx
          const rowStride = (heap.u16(DPI_W) + heap.u16(DPI_P)) & 0xffff;
          heap.setU32(DPI, (heap.u32(DPI) + Math.imul(rowStride, d)) >>> 0);
        }
      }
    }
    // 0x5e15be: clip the bottom edge up to bp.
    if (!empty) {
      d = s16(s16(heap.i16(DPI_Y) + heap.i16(DPI_H)) - bp);
      if (d > 0) {
        heap.setU16(DPI_H, s16(heap.i16(DPI_H) - d) & 0xffff);
        if (heap.i16(DPI_H) <= 0) empty = true;
      }
    }

    if (!empty) {
      // 0x5e15d9: publish this window's colour-scheme word for the painters.
      const widgets = heap.u32(esi + 0x1c) >>> 0;
      const scheme = heap.u8(widgets + 1) & 0x7f;
      heap.setU16(0x009a0129, heap.u16((0x009a1517 + scheme * 2) >>> 0));
      // 0x5e15f0 / 0x5e15fb: the paint proc is called TWICE — once in
      // measure mode (edi = -1) and once for real (edi = the clipped DPI).
      // AX = 0xffff on both = "draw the window frame + all widgets".
      paintWindow(heap, esi, 0xffffffff >>> 0);
      paintWindow(heap, esi, DPI);
    }

    // 0x5e1606: pop the DPI struct and the rect back.
    heap.setU16(DPI_P, p98 & 0xffff); heap.setU16(DPI_H, p96 & 0xffff);
    heap.setU16(DPI_W, p94 & 0xffff); heap.setU16(DPI_Y, p92 & 0xffff);
    heap.setU16(DPI_X, p90 & 0xffff); heap.setU32(DPI, p8c >>> 0);
    ax = sAx; bx = sBx; dx = sDx; bp = sBp;

    // 0x5e1637: advance to the next window that is marked 0x10 (drawn as part
    // of the window below it); anything else ends this call.
    do {
      esi = (esi + STRIDE) >>> 0;
      if (esi >= (heap.u32(POOL_END) >>> 0)) return;
    } while ((heap.u16(esi + 0x32) & 0x10) === 0);
  }
}

// The binary pushes bx/dx/bp (or ax/dx/bp) plus edi and esi around each
// recursive call and pops them straight back, so the caller's locals are
// unaffected; only the register file has to be staged on the way in.
function recurse(heap, ax, bx, dx, bp, esi) {
  regs.eax = ax & 0xffff;
  regs.ebx = bx & 0xffff;
  regs.edx = dx & 0xffff;
  regs.ebp = bp & 0xffff;
  regs.esi = esi >>> 0;
  drawWindow(heap);
}

// The binary's call site is `call [esi]` — an indirect call, so callIndirect
// (JS port first, real bytes only as a fallback) is both the faithful
// primitive and where this needs to end up: the deliverable is a JS port, not
// a JS shell around the interpreter.
//
// STATUS, measured (ADDENDUM 147). The JS paint path is now the DEFAULT:
// window paint procs go to their JS ports through callIndirect, and the
// interpreter is reached only where a port does not exist yet. Set
// globalThis.__jsPaint = false to force the old callNative path.
//
// Byte-exact against the x86 interpreter (0 divergent px of 307,200) in every
// scene measured: the playable click-to-play park (tools/_jspaintdiff.mjs, the
// same configuration as test/runtime/playable_accuracy.test.js), the title
// menu at ticks 1/30/60-with-slow-fade, and the scenario-select dialog
// (tools/_uishot.mjs). The five fixes that closed the last of it are in
// 9b4457.js (left clip and the 16-bit extent words), 433bae.js (the occlusion
// table is a BYTE array indexed by EDI, not a dword array at index*4),
// 9b438b_impl.js (Ghidra inlined a stale second copy of 0x9b4457 instead of
// falling through to it) and 4316f3.js (two dropped register details).
//
// Still open here: globalThis.__js9b8491 (the zoom>1 blitter) stays OFF by
// default — it is not byte-exact and no scene above exercises it. Three widget
// handlers have no JS port (wt13 0x5e5127, wt14 0x5e467c, wt18/19 0x5e4ace)
// and still reach the interpreter via callIndirect. wt17 is JS as of ADD.148.
function paintWindow(heap, esi, edi) {
  regs.esi = esi >>> 0;
  regs.edi = edi >>> 0;
  regs.eax = ((regs.eax & 0xffff0000) | 0xffff) >>> 0;
  try {
    // Default ON — see the status note above. globalThis.__jsPaint = false
    // forces the interpreter path for A/B measurement.
    if (globalThis.__jsPaint !== false) callIndirect(heap, heap.u32(esi) >>> 0);
    else callNative(heap.u32(esi) >>> 0, []);
  } catch (e) {
    if (!globalThis.__warnedWindowPaint) {
      globalThis.__warnedWindowPaint = true;
      if (typeof console !== "undefined") {
        console.warn(`[5e13d2] window paint 0x${(heap.u32(esi) >>> 0).toString(16)} threw: ${String(e.message || e).slice(0, 140)}`);
      }
    }
  }
}


// ---------------------------------------------------------------------------
// GATE — same reasoning as 5e1210.js (see the long note there). This function
// is only reachable from 5e12eb, which the frozen path keeps inert, but the
// stale registers do occasionally satisfy its intersection test, so the frozen
// copy is kept to hold the baseline exactly.
//
// drawWindowFrozen is the pre-fix body VERBATIM: paint calls with no EDI/AX
// setup, u32 accesses across the u16 DPI fields, and the byte-wide store to
// 0x9a0129. Bugs included on purpose; do not "tidy" it.
export function FUN_005e13d2(heap) {
  return globalThis.__realStartup ? drawWindow(heap) : drawWindowFrozen(heap);
}

function drawWindowFrozen(heap) {
  let puVar1 = 0;
  let iVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar8 = 0;
  let sVar9 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let puVar10 = 0;
  let puVar11 = 0;
  puVar10 = ((unaff_ESI) >>> 0);
  while (puVar11 = ((puVar10) >>> 0), sVar7 = ((heap.u32(0x0099fb98)) & 0xffff), sVar6 = ((heap.u32(0x0099fb96)) & 0xffff), sVar5 = ((heap.u32(0x0099fb94)) & 0xffff), sVar4 = ((heap.u32(0x0099fb92)) & 0xffff), sVar3 = ((heap.u32(0x0099fb90)) & 0xffff), iVar2 = ((heap.u32(0x0099fb8c)) >>> 0), puVar10 = ((puVar11 + ((0x5e) * 4)) >>> 0), puVar10 < heap.u32(0x009a1164)) {
    if ((((heap.i16((puVar11 + ((0x66) * 4))) < in_DX) && (heap.i16((((puVar11) | 0) + 0x19a)) < unaff_BP)) && (in_AX < (((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16))) && ((unaff_BX < (((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e)))) << 16 >> 16) && ((heap.u16((((puVar11) | 0) + 0x1aa)) & 0x10) == 0)))) {
      if (in_AX < heap.i16((puVar11 + ((0x66) * 4)))) {
        // Site 1 (0x5e1426): movw 0x20(%edi),%dx ; pushw bx/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (heap.i16((puVar11 + ((0x66) * 4)))) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (unaff_BP) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = drawWindowFrozen(heap));
        // pops restore bx/dx/bp/edi/esi; locals already hold those values.
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if ((((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16) < in_DX) {
        // Site 2 (0x5e1451): movw %cx,%dx (cx = 0x66+0x67) ; pushw bx/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = ((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4)))) & 0xffff);
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (unaff_BP) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = drawWindowFrozen(heap));
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BX < heap.i16((((puVar11) | 0) + 0x19a))) {
        // Site 3 (0x5e147d): movw 0x22(%edi),%bp ; pushw ax/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (in_DX) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (heap.i16((((puVar11) | 0) + 0x19a))) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = drawWindowFrozen(heap));
        unaff_BX = ((heap.i16((((puVar11) | 0) + 0x19a))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BP <= (((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e)))) << 16 >> 16)) {
          return;
        }
        // Site 4 (0x5e14ab): movw %cx,%bp (cx = 0x19a+0x19e) ; pushw ax/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (in_DX) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = ((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e))) & 0xffff);
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = drawWindowFrozen(heap));
        unaff_BX = ((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      }
      }
      }
    }
  }
  sVar9 = ((heap.i16((unaff_ESI + ((8) * 4)))) & 0xffff);
  if (in_AX < sVar9) {
    in_AX = ((sVar9) & 0xffff);
  }
  if ((((sVar9 + heap.i16((unaff_ESI + ((9) * 4))))) << 16 >> 16) < in_DX) {
    in_DX = ((sVar9 + heap.i16((unaff_ESI + ((9) * 4)))) & 0xffff);
  }
  sVar9 = ((heap.i16((((unaff_ESI) | 0) + 0x22))) & 0xffff);
  if (unaff_BX < sVar9) {
    unaff_BX = ((sVar9) & 0xffff);
  }
  sVar9 = ((sVar9 + heap.i16((((unaff_ESI) | 0) + 0x26))) & 0xffff);
  if (sVar9 < unaff_BP) {
    unaff_BP = ((sVar9) & 0xffff);
  }
  if ((in_DX <= in_AX) || (unaff_BP <= unaff_BX)) {
    return;
  }
  do {
    LAB_005e1637: {
    sVar9 = ((in_AX - sVar3) & 0xffff);
    heap.setU32(0x0099fb8c, (iVar2) >>> 0);
    heap.setU32(0x0099fb90, (sVar3) >>> 0);
    heap.setU32(0x0099fb94, (sVar5) >>> 0);
    heap.setU32(0x0099fb98, (sVar7) >>> 0);
    // HAND-FIX (goto-as-return): C has `goto LAB_005e1566` from the else-branch
    // (re-clip with the advanced x-window). The translator emitted `return 0`,
    // leaving the clip incomplete → the caller looped forever calling 5e13d2
    // (gameplay hang after ~150 ticks). Restructure the if/else as a labeled
    // while so the goto becomes `continue LAB_005e1566`; the clip body and its
    // `break LAB_005e1637` (which exits to the inner do-while) are unchanged.
    let _doClip = (sVar9 == 0 || in_AX < sVar3);
    LAB_005e1566: while (true) {
     if (_doClip) {
      sVar9 = ((heap.u32(0x0099fb94)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94)) - in_DX) & 0xffff);
      if (sVar8 != 0 && in_DX <= (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94))) << 16 >> 16)) {
        heap.setU32(0x0099fb94, (heap.u32(0x0099fb94) - sVar8) >>> 0);
        if (heap.u32(0x0099fb94) == 0 || sVar9 < sVar8) {
          break LAB_005e1637;
        }
        heap.setU32(0x0099fb98, (heap.u32(0x0099fb98) + sVar8) >>> 0);
      }
      sVar9 = ((unaff_BX - sVar4) & 0xffff);
      heap.setU32(0x0099fb92, (sVar4) >>> 0);
      heap.setU32(0x0099fb96, (sVar6) >>> 0);
      if (sVar9 != 0 && sVar4 <= unaff_BX) {
        heap.setU32(0x0099fb92, (sVar4 + sVar9) >>> 0);
        heap.setU32(0x0099fb96, (sVar6 - sVar9) >>> 0);
        if (heap.u32(0x0099fb96) == 0 || sVar6 < sVar9) {
          break LAB_005e1637;
        }
        heap.setU32(0x0099fb8c, (heap.u32(0x0099fb8c) + ((heap.u32(0x0099fb94) + heap.u32(0x0099fb98)) >>> 0) * ((sVar9) | 0)) >>> 0);
      }
      sVar9 = ((heap.u32(0x0099fb96)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96)) - unaff_BP) & 0xffff);
      if ((sVar8 == 0 || (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96))) << 16 >> 16) < unaff_BP) || (heap.setU32(0x0099fb96, (heap.u32(0x0099fb96) - sVar8) >>> 0), heap.u32(0x0099fb96) != 0 && sVar8 <= sVar9)) {
        heap.setU8(0x009a0129, (heap.u16((0x009a1517 + (heap.u8((heap.u32(unaff_ESI + (7) * 4) + 1)) & 0x7f) * 2))) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
      }
      break;
     } else {
      heap.setU32(0x0099fb90, (sVar3 + sVar9) >>> 0);
      heap.setU32(0x0099fb94, (sVar5 - sVar9) >>> 0);
      if (heap.u32(0x0099fb94) != 0 && sVar9 <= sVar5) {
        heap.setU32(0x0099fb98, (sVar7 + sVar9) >>> 0);
        heap.setU32(0x0099fb8c, (iVar2 + sVar9) >>> 0);
        _doClip = true; continue LAB_005e1566;  // C: goto LAB_005e1566
      }
      break;
     }
    }
    }
    do {
      puVar10 = ((unaff_ESI + ((0x5e) * 4)) >>> 0);
      if (heap.u32(0x009a1164) <= puVar10) {
        heap.setU32(0x0099fb8c, (iVar2) >>> 0);
        heap.setU32(0x0099fb90, (sVar3) >>> 0);
        heap.setU32(0x0099fb92, (sVar4) >>> 0);
        heap.setU32(0x0099fb94, (sVar5) >>> 0);
        heap.setU32(0x0099fb96, (sVar6) >>> 0);
        heap.setU32(0x0099fb98, (sVar7) >>> 0);
        return;
      }
      puVar1 = (((((unaff_ESI) | 0) + 0x1aa)) >>> 0);
      unaff_ESI = ((puVar10) >>> 0);
    } while ((heap.u16(puVar1) & 0x10) == 0);
  } while (true);
}

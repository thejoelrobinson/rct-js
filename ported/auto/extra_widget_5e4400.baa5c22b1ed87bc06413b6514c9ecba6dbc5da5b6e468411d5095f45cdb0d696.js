// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x5e4400..0x5e5300.
//
// FUN_005e4400 — the generic window widget painter, PLUS the 13 widget-type
// handlers behind the jumptable at 0x5e452c that Ghidra never recovered.
//
// WHY THIS EXISTS. The handlers are not functions: `0x5e4523 jmp [ebx*4 +
// 0x5e452c]` JUMPS to them and each one tail-jumps back to 0x5e52a7, which
// advances to the next widget and re-enters the clip test at 0x5e44d7. The old
// port modelled that jumptable as a CALL through callIndirect, so a handler ran
// the ENTIRE REST OF THE WIDGET LOOP inside the interpreter before returning —
// 0x5e48f9 alone measured 30.8 MILLION interpreter steps across 10 calls, which
// was the multi-second hitch on any full-screen repaint.
//
// Here the loop lives in JS and each handler is a JS function that returns
// where the binary would have jumped to 0x5e52a7. Handlers not yet transcribed
// fall back to the interpreter for THAT HANDLER ONLY: `runHandlerNative` hooks
// 0x5e52a7 for the duration of the call, so the handler's tail-jump unwinds to
// runFunction's sentinel instead of running the loop again.
//
// Widget record (0x10 bytes): +0 type, +1 colour, +2 left, +4 right, +6 top,
// +8 bottom, +0xa image/content (dword), +0xe tooltip.
// Window: +0x20 left, +0x22 top, +0x32 flags, +0x1c widget list.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative, hookOnce } from "../../runtime/painter-bridge.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { FUN_005e0e07 } from "./5e0e07.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_009ba943 } from "./9ba943.js";
import { FUN_004583a7 } from "./4583a7.js";
import { FUN_00458444 } from "./458444.js";
import { FUN_009b4457 } from "./9b4457.js";

const s16 = (v) => (v << 16) >> 16;
const u16 = (v) => v & 0xffff;

// Jumptable at 0x5e452c, read from the image so it can never drift.
function handlerAddr(heap, type) { return heap.u32(0x005e452c + type * 4) >>> 0; }

// ---------------------------------------------------------------------------
// Shared call shims. Each stages the exact registers the binary has live at the
// corresponding call instruction.

function call5e0e07(heap, ax, bx, cx, dx, ebp, si) {
  regs.eax = u16(ax); regs.ebx = u16(bx); regs.ecx = u16(cx); regs.edx = u16(dx);
  regs.ebp = ebp >>> 0; regs.esi = (regs.esi & 0xffff0000) | u16(si);
  FUN_005e0e07(heap);
}
function call9b30f1(heap, ax, bx, cx, dx, ebp) {
  regs.eax = u16(ax); regs.ebx = u16(bx); regs.ecx = u16(cx); regs.edx = u16(dx);
  regs.ebp = ebp >>> 0;
  FUN_009b30f1(heap);
}

export function FUN_005e4400_js(heap) {
  const esi = regs.esi >>> 0;          // window
  const edi = regs.edi >>> 0;          // DPI
  const flags32 = heap.u16(esi + 0x32);

  // 0x5e4400..0x5e441a
  if ((flags32 & 0x10) !== 0 && (flags32 & 0x20) === 0) {
    // push esi; bx=[esi+24]; dx=[esi+26]; ax=[esi+20]; cx=[esi+22];
    // bx+=ax; dx+=cx; dec bx; dec dx; ebp=0x2000032; call 9b30f1; pop esi.
    call9b30f1(heap,
      heap.u16(esi + 0x20), (heap.u16(esi + 0x20) + heap.u16(esi + 0x24) - 1) & 0xffff,
      heap.u16(esi + 0x22), (heap.u16(esi + 0x22) + heap.u16(esi + 0x26) - 1) & 0xffff,
      0x02000032);
    regs.esi = esi; regs.edi = edi;
  }
  let wp = heap.u32(esi + 0x1c) >>> 0;                 // ebp = widget list
  heap.setU32(0x0099fe02, 0x34);
  heap.setU16(0x0099fe06, 0);
  // 0x5e4485: [0x9a13e4] = hovered widget index, else -1
  heap.setU16(0x009a13e4, 0xffff);
  if ((heap.u8(0x00991f36) === 5 || heap.u8(0x00991f36) === 2)
      && heap.u8(0x00991f37) === heap.i8(esi + 0x174)
      && heap.u8(0x00991f38) === heap.i16(esi + 0x30)
      && (heap.u32(0x00991f30) & 1) !== 0) {
    heap.setU16(0x009a13e4, heap.i16(0x00991f3c) & 0xffff);
  }
  heap.setU16(0x009a13e6, 0xffff);
  if ((heap.u32(0x00991f30) >>> 3 & 1) !== 0
      && heap.u8(0x00991f5a) === heap.i8(esi + 0x174)
      && heap.u8(0x00991f58) === heap.i16(esi + 0x30)) {
    heap.setU16(0x009a13e6, heap.u16(0x00991f5c));
  }
  heap.setU32(0x009a13e0, heap.u32(esi + 0x10));
  heap.setU32(0x009a13e8, heap.u32(esi + 0x14));

  const winL = heap.i16(esi + 0x20), winT = heap.i16(esi + 0x22);

  for (;;) {
    // 0x5e44d7 — clip test (skipped entirely when flag 0x20 is set).
    let draw = true;
    if ((heap.u16(esi + 0x32) & 0x20) === 0) {
      let a = s16(heap.i16(edi + 4) - winL);
      if (a > heap.i16(wp + 4)) draw = false;                       // 0x5e44eb
      else {
        a = s16(a + heap.i16(edi + 8));
        if (a <= heap.i16(wp + 2)) draw = false;                    // 0x5e44f9
        else {
          let b = s16(heap.i16(edi + 6) - winT);
          if (b > heap.i16(wp + 8)) draw = false;                   // 0x5e450b
          else {
            b = s16(b + heap.i16(edi + 0xa));
            if (b <= heap.i16(wp + 6)) draw = false;                // 0x5e4519
          }
        }
      }
    }

    const type = heap.u8(wp);
    if (draw) {
      const fn = type === 13 && globalThis.__forceNativeWidget13 ? null : JS_HANDLERS[type];
      if (fn) fn(heap, esi, wp, edi, winL, winT);
      else if (type <= 20) { if (globalThis.__WFB) globalThis.__WFB[type] = (globalThis.__WFB[type]||0)+1; runHandlerNative(heap, handlerAddr(heap, type), esi, wp, edi); }
    }

    // 0x5e52a7 — advance.
    wp = (wp + 0x10) >>> 0;
    heap.setU16(0x009a13e4, u16(heap.u16(0x009a13e4) - 1));
    heap.setU16(0x009a13e6, u16(heap.u16(0x009a13e6) - 1));
    heap.setU32(0x009a13e8, heap.u32(0x009a13e8) >>> 1);
    heap.setU32(0x009a13e0, heap.u32(0x009a13e0) >>> 1);
    if (heap.u8(wp) === 0x15) break;                                // 0x5e52c4
  }

  // 0x5e52ce — the "disabled" hatch over the whole window.
  if ((heap.u16(esi + 0x32) & 0x600) !== 0) {
    const ax = heap.i16(esi + 0x20), cx = heap.i16(esi + 0x22);
    const bx = s16(heap.i16(esi + 0x24) + ax - 1);
    const dx = s16(heap.i16(esi + 0x26) + cx - 1);
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, ax, bx, cx, dx, 2, 0x10);
    regs.esi = esi;
  }
  regs.esi = esi; regs.edi = edi;
}

// Run one un-ported handler through the real bytes WITHOUT letting it re-enter
// the widget loop: the handler reaches the loop only by `jmp 0x5e52a7`, so a
// one-shot hook there unwinds to runFunction's sentinel and the call returns.
function runHandlerNative(heap, addr, esi, wp, edi) {
  regs.esi = esi >>> 0;
  regs.ebp = wp >>> 0;
  regs.edi = edi >>> 0;
  regs.ebx = heap.u8(wp) & 0xff;
  hookOnce(0x005e52a7, () => {}, () => { callNative(addr, []); });
  regs.esi = esi >>> 0;
  regs.edi = edi >>> 0;
}

// ---------------------------------------------------------------------------
// Ported handlers. Key: the binary's `jmp 0x5e52a7` == `return` here.

// wt0 (0x5e52a7) and any type whose handler IS the advance: nothing to draw.
function wt0() { /* 0x5e52a7 — advance only */ }

// wt20 (0x5e4580) — flat fill of the widget rect with colour index 0xa.
function wt20(heap, esi, wp, edi, winL, winT) {
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx = s16(heap.i16(wp + 6) + winT), dx = s16(heap.i16(wp + 8) + winT);
  regs.esi = esi; regs.edi = edi;
  call9b30f1(heap, ax, bx, cx, dx, 0xa);
  regs.esi = esi;
}

// wt1 (0x5e4819) — the window panel: frame via 5e0e07, plus an optional
// background sprite when window flag 0x80 is set.
function wt1(heap, esi, wp, edi, winL, winT) {
  heap.setU16(0x009a13f8, heap.u8(wp + 1));                        // 0x5e481e
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx = s16(heap.i16(wp + 6) + winT), dx = s16(heap.i16(wp + 8) + winT);
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, ax, bx, cx, dx, heap.u8(wp + 1), 0);            // 0x5e484d
  regs.esi = esi; regs.edi = edi;
  if ((heap.u16(esi + 0x32) & 0x80) === 0) return;                 // 0x5e485a
  // 0x5e4861..0x5e4887
  const cx2 = s16(s16(heap.i16(wp + 4) + winL) - 0x12);
  const dx2 = s16(s16(heap.i16(wp + 8) + winT) - 0x12);
  let ebx = ((heap.u8(wp + 1) << 0x11) | 0x20005e71) >>> 0;
  regs.eax = 0; regs.ebx = ebx >>> 0;
  regs.ecx = u16(cx2); regs.edx = u16(dx2);
  regs.esi = esi; regs.edi = edi; regs.ebp = wp >>> 0;
  FUN_009b438b(heap);
  regs.esi = esi; regs.edi = edi;
}

// wt15 (0x5e45b3) — the window caption: filled bar, hatch, then centred text.
function wt15(heap, esi, wp, edi, winL, winT) {
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx = s16(heap.i16(wp + 6) + winT), dx = s16(heap.i16(wp + 8) + winT);
  const colour = heap.u8(wp + 1);
  let si = 0x60;
  if (heap.i8(esi + 0x175) !== -1) si |= 0x10;                     // 0x5e45e2
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, ax, bx, cx, dx, colour, si);                    // 0x5e45f3
  regs.esi = esi; regs.edi = edi;
  // 0x5e4601..0x5e4619 — inner hatch.
  regs.eax = u16(s16(ax + 1)); regs.ebx = u16(s16(bx - 1));
  regs.ecx = u16(s16(cx + 1)); regs.edx = u16(s16(dx - 1));
  regs.ebp = 0x2000028; regs.esi = esi; regs.edi = edi;
  FUN_009b30f1(heap);
  regs.esi = esi; regs.edi = edi;
  // 0x5e4620..0x5e4670 — centred caption text.
  let tcx = s16(s16(heap.i16(wp + 2) + winL) + 2);
  const tdx = s16(s16(heap.i16(wp + 6) + winT) + 2);
  let w = s16(s16(heap.i16(wp + 4) - heap.i16(wp + 2)) - 4);
  if (heap.u8(wp + 0x10) === 0x10) {                                // 0x5e4644
    w = s16(w - 0xa);
    if (heap.u8(wp + 0x20) === 0x10) w = s16(w - 0xa);              // 0x5e464e
  }
  tcx = s16(tcx + (u16(w) >>> 1));
  regs.ebx = heap.u32(wp + 0xa) >>> 0;
  regs.ecx = u16(tcx); regs.edx = u16(tdx);
  regs.ebp = ((wp & 0xffff0000) | u16(w)) >>> 0;   // 0x5e4666 `mov bp, ax`
  regs.esi = 0x00971e86;
  regs.eax = (regs.eax & 0xffffff00) | 0x22;
  regs.edi = edi;
  FUN_00458444(heap);
  regs.esi = esi; regs.edi = edi;
}

// wt14 (0x5e467c) — labelled group box. The caption cuts into the top border;
// the remaining frame is eight single-pixel strokes using the scheme's dark
// and light shades.
function wt14(heap, esi, wp, edi, winL, winT) {
  const colour = heap.u8(wp + 1) & 0x7f;
  const left = s16(heap.i16(wp + 2) + winL);
  const right = s16(heap.i16(wp + 4) + winL);
  const top = s16(heap.i16(wp + 6) + winT);
  const bottom = s16(heap.i16(wp + 8) + winT);
  const label = heap.i32(wp + 0xa) | 0;

  if (label !== -1) {
    const textColour = (heap.u32(0x009a13e0) & 1) === 0
      ? heap.u8(0x009a012a)
      : ((heap.u8(0x009a13f8) & 0x7f) | 0x40);
    regs.eax = (regs.eax & 0xffffff00) | textColour;
    regs.ebx = label >>> 0;
    regs.ecx = u16(s16(left + 6));
    regs.edx = u16(top);
    regs.ebp = wp >>> 0;
    regs.esi = 0x00971e86;
    regs.edi = edi;
    FUN_004583a7(heap);
  }

  const dark = heap.u8(0x0099ac8e + colour * 8);
  const light = heap.u8(0x0099ac92 + colour * 8);
  const borderTop = s16(top + 4);
  const callFill = (ax, bx, cx, dx, shade) => {
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, ax, bx, cx, dx, shade);
  };

  callFill(left, s16(left + 4), borderTop, borderTop, dark);
  callFill(s16(left + 1), s16(left + 4), s16(borderTop + 1), s16(borderTop + 1), light);
  callFill(left, s16(right - 1), borderTop, borderTop, dark);
  callFill(left, s16(right - 2), s16(borderTop + 1), s16(borderTop + 1), light);
  callFill(left, left, s16(borderTop + 1), s16(bottom - 1), dark);
  callFill(s16(left + 1), s16(left + 1), s16(borderTop + 2), s16(bottom - 2), light);
  callFill(s16(right - 1), s16(right - 1), s16(borderTop + 1), s16(bottom - 2), dark);
  callFill(right, right, borderTop, s16(bottom - 1), light);
  regs.esi = esi; regs.edi = edi;
}

// wt7/8 (0x5e4b8c) — plain button/flat frame.
function wt7(heap, esi, wp, edi, winL, winT) {
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx = s16(heap.i16(wp + 6) + winT), dx = s16(heap.i16(wp + 8) + winT);
  // 0x5e4bae..0x5e4bd5: si = 0x20 when the widget is disabled ([0x9a13e8]&1),
  // is the hovered one ([0x9a13e4]==0) or is the held one ([0x9a13e6]==0).
  const si = ((heap.u32(0x009a13e8) & 1) !== 0
              || heap.u16(0x009a13e4) === 0
              || heap.u16(0x009a13e6) === 0) ? 0x20 : 0;
  heap.setU16(0x009a13f8, heap.u8(wp + 1));                         // 0x5e4bd9
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, ax, bx, cx, dx, heap.u8(wp + 1), si);            // 0x5e4be0
  regs.esi = esi; regs.edi = edi;
}

// wt16 shares the button frame at 0x5e4b8c and adds the close-box X. The
// jumptable points at the shared frame entry, but the type-16 contract includes
// this fixed 5x6 mark; treating it as a plain type-7 button left 18 pixels out.
function wt16(heap, esi, wp, edi, winL, winT) {
  wt7(heap, esi, wp, edi, winL, winT);
  const left = s16(heap.i16(wp + 2) + winL + 3);
  const top = s16(heap.i16(wp + 6) + winT + 3);
  const spans = [[0, 0], [4, 4], [0, 1], [3, 4], [1, 3], [1, 3], [0, 1], [3, 4], [0, 0], [4, 4]];
  const rows = [0, 0, 1, 1, 2, 3, 4, 4, 5, 5];
  for (let index = 0; index < spans.length; index++) {
    const [start, end] = spans[index];
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, s16(left + start), s16(left + end),
      s16(top + rows[index]), s16(top + rows[index]), 0x0a);
  }
  regs.esi = esi; regs.edi = edi;
}

function drawScrollString(heap, esi, wp, edi, source, x, y) {
  regs.eax = regs.eax & 0xffffff00;
  regs.ecx = u16(x); regs.edx = u16(y);
  regs.esi = source >>> 0; regs.edi = edi; regs.ebp = wp >>> 0;
  FUN_009ba943(heap);
  regs.esi = esi; regs.edi = edi;
}

// wt17 (0x5e4d0c) — scroll viewport: frame, optional horizontal/vertical
// controls, clip the caller DPI to the content rectangle, then invoke the
// window paint callback with AX = scroll index and the clipped DPI.
function wt17(heap, esi, wp, edi, winL, winT) {
  let left = s16(heap.i16(wp + 2) + winL);
  let right = s16(heap.i16(wp + 4) + winL);
  let top = s16(heap.i16(wp + 6) + winT);
  let bottom = s16(heap.i16(wp + 8) + winT);
  const colour = heap.u8(wp + 1);

  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, left, right, top, bottom, colour, 0x60);
  left = s16(left + 1); right = s16(right - 1);
  top = s16(top + 1); bottom = s16(bottom - 1);

  const scrollIndex = heap.u16(0x0099fe06);
  const scroll = (esi + heap.u32(0x0099fe02)) >>> 0;
  const flags = heap.u16(scroll);
  heap.setU16(0x00971e84, 0xe0);

  if ((flags & 1) !== 0) {
    const barTop = s16(bottom - 0x0a);
    const barRight = (flags & 0x10) !== 0 ? s16(right - 0x0b) : right;
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, left, s16(left + 9), barTop, bottom, colour,
      (flags & 4) !== 0 ? 0x20 : 0);
    drawScrollString(heap, esi, wp, edi, 0x009a13f0,
      s16(left + 3), s16(barTop + 1));

    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, s16(barRight - 9), barRight, barTop, bottom, colour,
      (flags & 8) !== 0 ? 0x20 : 0);
    drawScrollString(heap, esi, wp, edi, 0x009a13f2,
      s16(barRight - 9), s16(barTop + 1));

    const dark = heap.u8(0x0099ac8e + colour * 8);
    const light = heap.u8(0x0099ac92 + colour * 8);
    const trackLeft = s16(left + 10), trackRight = s16(barRight - 10);
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, trackLeft, trackRight, barTop, bottom, light);
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, trackLeft, trackRight, barTop, bottom, dark | 0x01000000);
    for (const [offset, shade] of [[2, dark], [3, light], [7, dark], [8, light]]) {
      regs.esi = esi; regs.edi = edi;
      call9b30f1(heap, trackLeft, trackRight,
        s16(barTop + offset), s16(barTop + offset), shade);
    }

    const thumbLeft = s16(left - 1 + heap.u16(scroll + 6));
    const thumbRight = s16(left - 1 + heap.u16(scroll + 8));
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, thumbLeft, thumbRight, barTop, bottom, colour,
      (flags & 2) !== 0 ? 0x20 : 0);
  }

  if ((flags & 0x10) !== 0) {
    const barLeft = s16(right - 0x0a);
    const barBottom = (flags & 1) !== 0 ? s16(bottom - 0x0b) : bottom;
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, barLeft, right, top, s16(top + 9), colour,
      (flags & 0x40) !== 0 ? 0x20 : 0);
    drawScrollString(heap, esi, wp, edi, 0x009a13ec,
      s16(barLeft + 2), top);

    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, barLeft, right, s16(barBottom - 9), barBottom, colour,
      (flags & 0x80) !== 0 ? 0x20 : 0);
    drawScrollString(heap, esi, wp, edi, 0x009a13ee,
      s16(barLeft + 2), s16(barBottom - 9));

    const dark = heap.u8(0x0099ac8e + colour * 8);
    const light = heap.u8(0x0099ac92 + colour * 8);
    const trackTop = s16(top + 10), trackBottom = s16(barBottom - 10);
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, barLeft, right, trackTop, trackBottom, light);
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, barLeft, right, trackTop, trackBottom, dark | 0x01000000);
    for (const [offset, shade] of [[2, dark], [3, light], [7, dark], [8, light]]) {
      regs.esi = esi; regs.edi = edi;
      call9b30f1(heap, s16(barLeft + offset), s16(barLeft + offset),
        trackTop, trackBottom, shade);
    }

    const thumbTop = s16(top - 1 + heap.u16(scroll + 0x0e));
    const thumbBottom = s16(top - 1 + heap.u16(scroll + 0x10));
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, barLeft, right, thumbTop, thumbBottom, colour,
      (flags & 0x20) !== 0 ? 0x20 : 0);
  }

  if ((flags & 1) !== 0) bottom = s16(bottom - 0x0b);
  if ((flags & 0x10) !== 0) right = s16(right - 0x0b);
  right = s16(right + 1); bottom = s16(bottom + 1);

  const clip = 0x0099fe08;
  let clipBytes = heap.u32(edi) >>> 0;
  let clipX = heap.i16(edi + 4), clipY = heap.i16(edi + 6);
  let clipW = heap.i16(edi + 8), clipH = heap.i16(edi + 0x0a);
  let clipPitch = heap.u16(edi + 0x0c);
  const clipZoom = heap.u16(edi + 0x0e);

  if (left > clipX) {
    const delta = s16(left - clipX);
    clipW = s16(clipW - delta); clipX = left;
    clipPitch = u16(clipPitch + delta);
    clipBytes = (clipBytes + delta) >>> 0;
  }
  let excess = s16(s16(clipX + clipW) - right);
  if (excess > 0) {
    clipW = s16(clipW - excess);
    clipPitch = u16(clipPitch + excess);
  }
  if (top > clipY) {
    const delta = s16(top - clipY);
    clipH = s16(clipH - delta); clipY = top;
    const stride = u16(clipPitch + clipW);
    clipBytes = (clipBytes + Math.imul(stride, delta)) >>> 0;
  }
  excess = s16(s16(clipY + clipH) - bottom);
  if (excess > 0) clipH = s16(clipH - excess);

  if (clipW > 0 && clipH > 0) {
    const contentX = s16(left - heap.u16(scroll + 2));
    const contentY = s16(top - heap.u16(scroll + 0x0a));
    clipX = s16(clipX - contentX);
    clipY = s16(clipY - contentY);
    heap.setU32(clip, clipBytes);
    heap.setU16(clip + 4, u16(clipX)); heap.setU16(clip + 6, u16(clipY));
    heap.setU16(clip + 8, u16(clipW)); heap.setU16(clip + 0x0a, u16(clipH));
    heap.setU16(clip + 0x0c, clipPitch); heap.setU16(clip + 0x0e, clipZoom);

    regs.eax = ((regs.eax & 0xffff0000) | scrollIndex) >>> 0;
    regs.esi = esi; regs.edi = clip;
    callIndirect(heap, heap.u32(esi) >>> 0);
  }

  heap.setU32(0x0099fe02, (heap.u32(0x0099fe02) + 0x12) >>> 0);
  heap.setU16(0x0099fe06, u16(scrollIndex + 1));
  regs.esi = esi; regs.edi = edi;
}

// wt18/19 (0x5e4ace) — radio/check-style label. Type 18 draws the narrow
// indicator box and its active glyph; type 19 shares the label-only tail.
function wt18(heap, esi, wp, edi, winL, winT) {
  const left = s16(heap.i16(wp + 2) + winL);
  const top = s16(heap.i16(wp + 6) + winT);
  const bottom = s16(heap.i16(wp + 8) + winT);
  const colour = heap.u8(wp + 1);

  if (heap.u8(wp) !== 19) {
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, left, s16(left + 9), top, s16(bottom - 1), colour, 0x60);
    if (heap.u32(0x009a13e8) === 1) {
      regs.eax = (regs.eax & 0xffffff00) | heap.u8(0x009a0129);
      regs.ecx = u16(s16(top + 1));
      regs.edx = u16(bottom);
      regs.ebp = wp >>> 0;
      regs.esi = 0x009a13f4;
      regs.edi = edi;
      FUN_009ba943(heap);
    }
  }

  const label = heap.i32(wp + 0xa) | 0;
  if (label !== -1) {
    regs.eax = (regs.eax & 0xffffff00) | labelColour(heap);
    regs.ebx = label >>> 0;
    regs.ecx = u16(s16(left + 14));
    regs.edx = u16(s16(top + 1));
    regs.ebp = wp >>> 0;
    regs.esi = 0x00971e86;
    regs.edi = edi;
    FUN_004583a7(heap);
  }
  regs.esi = esi; regs.edi = edi;
}

// 0x5e496e..0x5e4ac9 — the shared "draw the widget's image" tail used by
// types 2/3 (after their frame) and 4/5/6. `ebx` is the widget's image field.
function drawWidgetImage(heap, esi, wp, edi, winL, winT, ebx) {
  const cx = s16(heap.i16(wp + 2) + winL);                        // 0x5e496e
  const dx = s16(heap.i16(wp + 6) + winT);
  const t = heap.u8(wp);
  if (t === 5 || t === 6 || t === 3) {                            // 0x5e497e..0x5e498e
    if ((heap.u32(0x009a13e8) & 1) !== 0
        || heap.u16(0x009a13e4) === 0
        || heap.u16(0x009a13e6) === 0) {
      ebx = (ebx + 1) | 0;                                        // 0x5e49b0 inc ebx
    }
  }
  if ((heap.u32(0x009a13e0) & 1) !== 0) {                         // 0x5e49b3 -> disabled
    drawWidgetImageDisabled(heap, esi, wp, edi, cx, dx, ebx);
    return;
  }
  if ((ebx | 0) < 0) {                                            // 0x5e49c1 js 0x5e49cf
    // 0x5e49cf — negative image = an index into the animation table.
    const idx = ebx & 0xffff;
    const rec = heap.u32(0x009a161c + idx * 4) >>> 0;
    let img = heap.u16(rec);
    if ((heap.u32(0x009a13e8) & 1) === 0 && heap.u16(0x009a13e6) !== 0) {
      if (heap.u16(0x009a13e4) === 0) img = heap.u16(rec + 2);    // 0x5e4a00
    } else {
      // 0x5e4a06 — time-driven frame pick.
      const div = heap.u16(rec + 4);
      if (div !== 0) {
        const n = ((u16(cx) + heap.u32(0x009a1618)) >>> 2) % div;
        img = heap.u16(rec + 6 + n * 2);
      }
    }
    ebx = img >>> 0;
  }
  blit9b438b(heap, esi, wp, edi, ebx, cx, dx);                    // 0x5e49c3
}

// 0x5e4a25..0x5e4ac9 — the greyed-out form: two 0x40-dword solid-colour fills
// staged at 0x9a13fc and blitted through 0x9b4457 as a remap.
function drawWidgetImageDisabled(heap, esi, wp, edi, cx, dx, ebx) {
  if ((ebx | 0) < 0) return;                                      // 0x5e4a27
  const pass = (tableBase, cxOff, dxOff) => {
    const colour = heap.u16(0x009a13f8) & 0x7f;
    const al = heap.u8(tableBase + colour * 8) & 0xff;
    const word = ((al << 8) | al) >>> 0;
    const dword = (((word << 16) >>> 0) | word) >>> 0;
    heap.setU32(0x009a200c, 0x009a13fc);
    for (let i = 0; i < 0x40; i++) heap.setU32(0x009a13fc + i * 4, dword);
    heap.setU8(0x009a13fc, 0);
    heap.setU32(0x009a2000, 0x20000000);
    regs.ebx = ebx >>> 0;
    regs.ecx = u16(s16(cx + cxOff));
    regs.edx = u16(s16(dx + dxOff));
    regs.esi = esi; regs.edi = edi; regs.ebp = wp >>> 0;
    FUN_009b4457(heap);
    regs.esi = esi; regs.edi = edi;
  };
  pass(0x0099ac91, 1, 1);                                         // 0x5e4a37 / 0x5e4a73
  pass(0x0099ac8f, 0, 0);                                         // 0x5e4a89 / 0x5e4ac2
}

function blit9b438b(heap, esi, wp, edi, ebx, cx, dx) {
  regs.ebx = ebx >>> 0;
  regs.ecx = u16(cx); regs.edx = u16(dx);
  regs.esi = esi; regs.edi = edi; regs.ebp = wp >>> 0;
  FUN_009b438b(heap);
  regs.esi = esi; regs.edi = edi;
}

// wt4/5/6 (0x5e48a7) — image-only widgets (no frame).
function wt4(heap, esi, wp, edi, winL, winT) {
  heap.setU16(0x009a13f8, heap.u8(wp + 1));                       // 0x5e48ac
  let ebx = heap.i32(wp + 0xa) | 0;
  if (ebx === -1) return;                                         // 0x5e48b8
  if ((heap.u32(0x009a13e0) & 1) !== 0) {                         // 0x5e48be jne
    if (heap.u8(wp) !== 6) return;                                // 0x5e48d2
    ebx = (ebx + 2) | 0;                                          // 0x5e48d8
    const cx = s16(heap.i16(wp + 2) + winL);
    const dx = s16(heap.i16(wp + 6) + winT);
    blit9b438b(heap, esi, wp, edi, ebx, cx, dx);                  // 0x5e48ed
    return;
  }
  drawWidgetImage(heap, esi, wp, edi, winL, winT, ebx);           // 0x5e496e
}

// wt2/3 (0x5e48f9) — a framed button, then the shared image tail.
function wt2(heap, esi, wp, edi, winL, winT) {
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx = s16(heap.i16(wp + 6) + winT), dx = s16(heap.i16(wp + 8) + winT);
  let si = 0;                                                     // 0x5e491b
  if ((heap.u32(0x009a13e8) & 1) !== 0
      || heap.u16(0x009a13e4) === 0
      || heap.u16(0x009a13e6) === 0) si |= 0x20;                  // 0x5e493e
  if ((heap.i32(wp + 0xa) | 0) === -2) {                          // 0x5e4942 -> 0x5e4893
    si |= 0x10;
    regs.esi = esi; regs.edi = edi;
    call5e0e07(heap, ax, bx, cx, dx, heap.u8(wp + 1), si);
    regs.esi = esi; regs.edi = edi;
    return;
  }
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, ax, bx, cx, dx, heap.u8(wp + 1), si);          // 0x5e4950
  regs.esi = esi; regs.edi = edi;
  // 0x5e4957 — falls through into the image head.
  heap.setU16(0x009a13f8, heap.u8(wp + 1));
  const ebx = heap.i32(wp + 0xa) | 0;
  if (ebx === -1) return;                                         // 0x5e4968
  drawWidgetImage(heap, esi, wp, edi, winL, winT, ebx);
}

// Shared text-colour pick used by the label handlers: AL is the window's
// scheme byte, or the widget's own shade with 0x40 when the widget is disabled.
function labelColour(heap) {
  if ((heap.u32(0x009a13e0) & 1) === 0) return heap.u8(0x009a0129);
  return ((heap.u16(0x009a13f8) & 0x7f) | 0x40) & 0xff;
}

// wt9 (0x5e4be7) — a centred text label (0x458444 centres on CX).
function wt9(heap, esi, wp, edi, winL, winT) {
  let ebx = heap.i32(wp + 0xa) | 0;
  if (ebx === -1) return;                                          // 0x5e4bed
  let cx = heap.i16(wp + 2);
  let dx = s16(s16(heap.i16(wp + 6) + heap.i16(wp + 8)) >> 1);     // 0x5e4bff sar
  dx = s16(dx - 5);
  cx = s16(cx + winL);
  dx = s16(s16(dx + winT) + 1);
  if (heap.u8(wp) === 8) {                                         // 0x5e4c12
    if ((heap.u32(0x009a13e8) & 1) !== 0
        || heap.u16(0x009a13e4) === 0
        || heap.u16(0x009a13e6) === 0) ebx = (ebx + 1) | 0;        // 0x5e4c38
  }
  cx = s16(s16(s16(cx + heap.i16(wp + 4)) + winL) + 1) >> 1;       // 0x5e4c3a..0x5e4c44
  const w = s16(s16(heap.i16(wp + 4) - heap.i16(wp + 2)) - 2);     // 0x5e4c51
  regs.ebx = ebx >>> 0;
  regs.ecx = u16(cx); regs.edx = u16(dx);
  regs.ebp = ((wp & 0xffff0000) | u16(w)) >>> 0;                   // 0x5e4c55 `mov bp, ax`
  regs.esi = 0x00971e86;
  regs.eax = (regs.eax & 0xffffff00) | labelColour(heap);
  regs.edi = edi;
  FUN_00458444(heap);                                              // 0x5e4c77
  regs.esi = esi; regs.edi = edi;
}

// wt10/11/12 (0x5e4c83) — a sunken frame with a left-aligned label.
function wt10(heap, esi, wp, edi, winL, winT) {
  const ax = s16(heap.i16(wp + 2) + winL), bx = s16(heap.i16(wp + 4) + winL);
  const cx0 = s16(heap.i16(wp + 6) + winT), dx0 = s16(heap.i16(wp + 8) + winT);
  heap.setU16(0x009a13f8, heap.u8(wp + 1));                        // 0x5e4cad
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, ax, bx, cx0, dx0, heap.u8(wp + 1), 0x60);       // 0x5e4cb4
  regs.esi = esi; regs.edi = edi;
  const ebx = heap.u32(wp + 0xa) >>> 0;
  if (ebx >= 0xfffffffe) return;                                   // 0x5e4cbe `cmp ebx,-2; jae`
  const cx = s16(s16(heap.i16(wp + 2) + winL) + 2);                // 0x5e4cdb
  const dx = s16(s16(heap.i16(wp + 6) + winT) + 1);                // 0x5e4cd7
  regs.ebx = ebx;
  regs.ecx = u16(cx); regs.edx = u16(dx);
  regs.ebp = wp >>> 0;
  regs.esi = 0x00971e86;
  regs.eax = (regs.eax & 0xffffff00) | labelColour(heap);
  regs.edi = edi;
  FUN_004583a7(heap);                                              // 0x5e4d00
  regs.esi = esi; regs.edi = edi;
}

// wt13 (0x5e5127) — a segmented panel. The content dword supplies the number
// of horizontal (DL) and vertical (DH) cells; the handler frames the widget,
// then draws paired division lines using the two palette shades for its scheme.
function wt13(heap, esi, wp, edi, winL, winT) {
  const left = s16(heap.i16(wp + 2) + winL);
  const right = s16(heap.i16(wp + 4) + winL);
  const top = s16(heap.i16(wp + 6) + winT);
  const bottom = s16(heap.i16(wp + 8) + winT);
  const colour = heap.u8(wp + 1) & 0xff;

  // 0x5e514d..0x5e516f. This is deliberately an equality check, not the
  // generic button handler's bit test: masks other than exactly one are down.
  let frameFlags = 0;
  if (heap.u32(0x009a13e8) !== 1
      || heap.u16(0x009a13e4) === 0
      || heap.u16(0x009a13e6) !== 0) frameFlags = 0x20;
  regs.esi = esi; regs.edi = edi;
  call5e0e07(heap, left, right, top, bottom, colour, frameFlags);

  const divisions = heap.u32(wp + 0xa) >>> 0;
  const horizontal = divisions & 0xff;
  const vertical = (divisions >>> 8) & 0xff;
  const width = u16(right - left + 1);
  const height = u16(bottom - top + 1);
  const cellWidth = horizontal > 1 ? (width / horizontal) | 0 : width;
  const cellHeight = vertical > 1 ? (height / vertical) | 0 : height;
  const scheme = colour & 0x7f;
  const dark = heap.u8(0x0099ac8f + scheme * 8);
  const light = heap.u8(0x0099ac91 + scheme * 8);

  const fill = (ax, bx, cx, dx, shade) => {
    regs.esi = esi; regs.edi = edi;
    call9b30f1(heap, ax, bx, cx, dx, shade);
  };
  const divisionsAfterFirst = (count, draw) => {
    let remaining = count & 0xff;
    while ((remaining = (remaining - 1) & 0xff) !== 0) draw();
  };

  let x = left;
  divisionsAfterFirst(horizontal, () => {
    x = s16(x + cellWidth);
    fill(x, x, s16(top + 1), s16(bottom - 1), light);             // 0x5e51f3
  });

  let y = top;
  divisionsAfterFirst(vertical, () => {
    y = s16(y + cellHeight);
    fill(s16(left + 1), s16(right - 1), y, y, light);              // 0x5e5225
  });

  x = s16(left - 1);
  divisionsAfterFirst(horizontal, () => {
    x = s16(x + cellWidth);
    fill(x, x, s16(top + 1), s16(bottom - 1), dark);               // 0x5e5257
  });

  y = s16(top - 1);
  divisionsAfterFirst(vertical, () => {
    y = s16(y + cellHeight);
    fill(s16(left + 1), s16(right - 1), y, y, dark);               // 0x5e5281
  });

  regs.esi = esi; regs.edi = edi;
}

const JS_HANDLERS = Object.create(null);
JS_HANDLERS[0] = wt0;
JS_HANDLERS[1] = wt1;
JS_HANDLERS[2] = wt2;
JS_HANDLERS[3] = wt2;
JS_HANDLERS[4] = wt4;
JS_HANDLERS[5] = wt4;
JS_HANDLERS[6] = wt4;
JS_HANDLERS[7] = wt7;
JS_HANDLERS[8] = wt7;
JS_HANDLERS[9] = wt9;
JS_HANDLERS[10] = wt10;
JS_HANDLERS[11] = wt10;
JS_HANDLERS[12] = wt10;
JS_HANDLERS[13] = wt13;
JS_HANDLERS[14] = wt14;
JS_HANDLERS[15] = wt15;
JS_HANDLERS[16] = wt16;
JS_HANDLERS[17] = wt17;
JS_HANDLERS[18] = wt18;
JS_HANDLERS[19] = wt18;
JS_HANDLERS[20] = wt20;

export const __jsHandlerTypes = Object.keys(JS_HANDLERS).map(Number);

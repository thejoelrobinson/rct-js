// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429f6c.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the bottom
// status-bar / toolbar window in the unscaled (in-game) layout. EBP at
// WindowCreate time = 0x429f6c → stored at window+0x0 → invoked
// indirectly by FUN_005e3f31's epilogue.
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = phase sentinel (-1 = initial open / state-update,
//         anything else = paint event at body 0x42a005)
//
// Disassembly (the EDI == -1 path, which is what fires at boot):
//   00429f6c  cmp edi, -1
//   00429f6f  jnz 0x42a005           ; paint body — see implementation below
//   00429f75..ffd  ... state-init code (see below)
//   0042a004  ret
//
// EDI != -1 path (0x42a005..0x42a6a8 for the "scenario loaded" gate,
// total ~1.7KB through 0x42afad). It's the per-frame status-bar paint:
//   - 3 widget-background fills via FUN_005e0e07 (rects from
//     0x5f526a..70, 0x5f52ba..c0, 0x5f52fa..0x5f5300)
//   - park-rating numeric blit (0x5f526a midpoint, FUN_00458622)
//   - sub-string "today is" + month-name string blit (FUN_00458622)
//   - park value gauge bar via FUN_0042a790 (sub-function, not yet ported)
//   - "guests in park" / "cash" sprite blits via FUN_009b438b
//   - long park-rating chart code (>1KB) using DAT_0063af90..0063afbc
//
// The full body is too large to hand-port in this pass. Minimum-viable
// implementation: invoke FUN_005e4400 (the standard widget-paint helper
// — it walks the window's widget array and fires per-widget background
// fills), plus the 3 explicit background fills via FUN_005e0e07. That
// gets pixels onto the status bar without porting the date/cash logic.

import { regs } from "../../runtime/regs.js";
import { FUN_00429c3d } from "./429c3d.js";
import { FUN_005e0e07 } from "./5e0e07.js";
import { FUN_005e4400 } from "./5e4400.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

// Helper: do one of the 3 background-fill blocks at 0x42a00a..4c.
// rectBase is the address of the (left,right,top,bottom) i16 rect (4×i16).
function paintWidgetBackground(heap, esi, rectBase) {
  // Read 4 widget-rect i16s.
  let ax = heap.u16(rectBase + 0) & 0xffff;
  let bx = heap.u16(rectBase + 2) & 0xffff;
  let cx = heap.u16(rectBase + 4) & 0xffff;
  let dx = heap.u16(rectBase + 6) & 0xffff;
  // inc ax, dec bx, inc cx, dec dx
  ax = (ax + 1) & 0xffff;
  bx = (bx - 1) & 0xffff;
  cx = (cx + 1) & 0xffff;
  dx = (dx - 1) & 0xffff;
  // Add window origin.
  const ox = heap.u16(esi + 0x20);
  const oy = heap.u16(esi + 0x22);
  ax = (ax + ox) & 0xffff;
  bx = (bx + ox) & 0xffff;
  cx = (cx + oy) & 0xffff;
  dx = (dx + oy) & 0xffff;
  // si = 0x30 (palette / fill index), ebp = 1 (op = solid fill)
  regs.eax = ax;
  regs.ebx = bx;
  regs.ecx = cx;
  regs.edx = dx;
  regs.esi = 0x30;
  regs.ebp = 1;
  FUN_005e0e07(heap);
}

export function FUN_00429f6c(heap) {
  // 0x429f6c..6f: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // 0x42a005..0x42a6a8 — minimum-viable port of the per-frame status-
    // bar paint body.
    const esi = regs.esi >>> 0;

    // 0x42a005: standard widget paint helper.
    regs.esi = esi;
    FUN_005e4400(heap);

    // 0x42a00a..4c: paint widget #0 background (rect at 0x5f526a).
    paintWidgetBackground(heap, esi, 0x005f526a);

    // 0x42a04d..8f: paint widget #1 background (rect at 0x5f52ba).
    paintWidgetBackground(heap, esi, 0x005f52ba);

    // 0x42a090..d2: paint widget #2 background (rect at 0x5f52fa).
    paintWidgetBackground(heap, esi, 0x005f52fa);

    // The remainder (date numeric, park-value gauge, money sprites,
    // park-rating chart, ~1.5KB) is not yet ported. The 3 background
    // fills above leave proper-coloured panels on the status bar even
    // without the dynamic content.
    regs.esi = esi;
    return;
  }

  const esi = regs.esi >>> 0;

  // 0x429f75..91: zero a block of widget-state DAT bytes.
  heap.setU8(0x005f52d8, 0);
  heap.setU8(0x005f52e8, 0);
  heap.setU8(0x005f52c8, 0);
  heap.setU8(0x005f5278, 0);
  heap.setU8(0x005f5308, 0);

  // 0x429f98..9f: if no scenario is loaded yet, return.
  if (heap.u8(0x008d7eb8) === 0) return;

  // 0x429fa1..af: scenario loaded → set widget-active markers.
  heap.setU8(0x005f52d8, 0x02);
  heap.setU8(0x005f52e8, 0x02);
  heap.setU8(0x005f52c8, 0x14);

  // 0x429fb6..bb: clear bits 7 & 8 of window+0x10 (widget-disabled bits).
  let w10 = heap.u32(esi + 0x10) >>> 0;
  w10 = (w10 & ~((1 << 7) | (1 << 8))) >>> 0;
  heap.setU32(esi + 0x10, w10);

  // 0x429fc0..cc: query availability via FUN_00429c3d.
  // dl = byte [0x8d7eb8] (scenario id), ecx = dword [0x8d7eba] (state).
  regs.edx = ((regs.edx & 0xffffff00) | heap.u8(0x008d7eb8)) >>> 0;
  regs.ecx = heap.u32(0x008d7eba) >>> 0;
  regs.esi = esi;
  FUN_00429c3d(heap);
  const ax = regs.eax & 0xffff;

  // 0x429fd1..d7: if ax == 0x8000, set bit 8 of window+0x10.
  let w10b = heap.u32(esi + 0x10) >>> 0;
  if (ax === 0x8000) {
    w10b = (w10b | (1 << 8)) >>> 0;
  }

  // 0x429fdc..ec: if ([0x5f5540 + scenario_id] & 2) == 0 → set bit 7.
  const sid = heap.u8(0x008d7eb8);
  if ((heap.u8(0x005f5540 + sid) & 2) === 0) {
    w10b = (w10b | (1 << 7)) >>> 0;
  }
  heap.setU32(esi + 0x10, w10b);

  // 0x429ff1..429fff: if ([0x8d7eb9] & 1) → force both bits 7 and 8 set.
  if ((heap.u8(0x008d7eb9) & 1) !== 0) {
    w10b = (w10b | (1 << 7) | (1 << 8)) >>> 0;
    heap.setU32(esi + 0x10, w10b);
  }
  // 0x42a004: ret
}

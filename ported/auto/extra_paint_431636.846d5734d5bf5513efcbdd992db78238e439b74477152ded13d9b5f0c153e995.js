// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x431636..0x4316f2.
//
// FUN_00431636 — the viewport clip splitter that sits between 0x431615 (the
// viewport window proc's paint entry) and 0x4316f3 (the strip painter). Ghidra
// never produced a body for it, and ported/auto/42b079.js used to SKIP it, on
// the reasoning that "for the 640x480 title viewport the splitter is
// effectively a no-op — it just forwards the rect".
//
// That was true only while runtime/harness.js's synthetic paint pump was
// driving the paint, because the pump handed 42b079 a hand-built DPI whose clip
// was ALREADY in world coordinates (see the Phase L comment it used to carry).
// Under the binary's own paint dispatcher the DPI arrives with a SCREEN-space
// clip covering one 64px dirty column, and this function is what converts it:
//
//   * reject the rect if it misses the viewport entirely,
//   * clamp it to the viewport's screen rect ([esi+4], [esi+6], +[esi+0], +[esi+2]),
//   * subtract the viewport origin, shift left by the zoom, and add the
//     viewport's world coords ([esi+8], [esi+0xa]) — screen -> world,
//   * and split any band taller than 0x180 world units into two calls.
//
// Without it, 4316f3 received screen coordinates where it expects world ones,
// which is why the JS viewport painted garbage as soon as the real dispatcher
// drove it (98.6% divergent against the binary in the playable configuration).
//
// Register convention, matching 0x431615: AX/BX = clip left/top, DX/BP = clip
// right/bottom (exclusive), ESI = viewport struct, EDI = DPI.
//
// Viewport struct: +0 width, +2 height, +4 screen_x, +6 screen_y,
//                  +8 view_x (world), +0xa view_y (world), +0x10 zoom.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004316f3 } from "./4316f3.js";

const s16 = (v) => (v << 16) >> 16;

export function FUN_extra_paint_431636(heap) {
  let ax = s16(regs.eax), bx = s16(regs.ebx);
  let dx = s16(regs.edx), bp = s16(regs.ebp);
  const esi = regs.esi >>> 0;
  const edi = regs.edi >>> 0;

  const scrX = heap.i16(esi + 4), scrY = heap.i16(esi + 6);
  if (dx <= scrX) return;                                   // 0x431636
  if (bp <= scrY) return;                                   // 0x431640

  let di = s16(scrX + heap.i16(esi + 0));                   // 0x43164f: screen_x + width
  if (ax >= di) return;                                     // 0x431656
  if (ax < scrX) ax = scrX;                                 // 0x43165f
  if (dx > di) dx = di;                                     // 0x431669

  di = s16(scrY + heap.i16(esi + 2));                       // 0x431671: screen_y + height
  if (bx >= di) return;                                     // 0x431679
  if (bx < scrY) bx = scrY;                                 // 0x43167e
  if (bp > di) bp = di;                                     // 0x431688

  // 0x431692..0x4316bd — screen -> world.
  const zoom = heap.u8(esi + 0x10) & 0x1f;
  const viewX = heap.i16(esi + 8), viewY = heap.i16(esi + 0xa);
  ax = s16((s16(ax - scrX) << zoom) + viewX);
  dx = s16((s16(dx - scrX) << zoom) + viewX);
  bx = s16((s16(bx - scrY) << zoom) + viewY);
  bp = s16((s16(bp - scrY) << zoom) + viewY);

  // 0x4316c1: split bands taller than 0x180 world units.
  const call = (a, b, d, p) => {
    regs.eax = a & 0xffff; regs.ebx = b & 0xffff;
    regs.edx = d & 0xffff; regs.ebp = p & 0xffff;
    regs.esi = esi; regs.edi = edi;
    FUN_004316f3(heap);
  };
  if (s16(bp - bx) > 0x180) {                               // 0x4316c7 (`jbe` = unsigned, but bp>bx here)
    call(ax, bx, dx, s16(bx + 0x180));                      // 0x4316d7
    bx = s16(bx + 0x180);                                   // 0x4316dd
  }
  call(ax, bx, dx, bp);                                     // 0x4316e2
}

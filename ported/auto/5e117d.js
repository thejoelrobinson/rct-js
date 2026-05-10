// @manual — do not regenerate.
//
// Source: decompiled/c/5e117d.c — marks a screen rectangle dirty in the
// dirty-flag buffer at 0x0099ad63. Called as part of "redraw screen" via
// FUN_005e6028. Takes (x1=AX, y1=BX, x2=DX, y2=BP) in registers.
//
// Two translator-level bugs the auto-port had to overcome:
//
// 1. The C decompilation reads `DAT_00971ed6` / `DAT_00971ed8` as
//    plain symbols, but they're packed 16-bit fields living right next to
//    each other in a struct (ed6, ed8, eda, edc, ede, ee0, ee2, ee4 are
//    all u16, two bytes apart). The auto-translator emits `heap.u32(...)`
//    which reads 4 bytes and pulls in the *next* field's value as the
//    high half — so `heap.u32(0x00971ed6)` returns
//    `(DAT_00971ed8 << 16) | DAT_00971ed6` (e.g. 0x01e00280 instead of
//    640). The downstream `if (... < in_DX)` clamp then fails (because
//    the polluted u32 is much larger than the 16-bit caller value),
//    leaving in_DX/unaff_BP unclamped. Combined with bug (2) below the
//    fill loop walks a write pointer for tens of thousands of bytes,
//    eventually writing into the DDraw primary surface — that's the
//    "8 vertical-stripe colours" artifact.
//
// 2. `*puVar6 = 0xff;` is a one-byte store (puVar6 is `undefined1 *`).
//    The auto-translator emitted `heap.setU32(puVar6, 0xff)` instead of
//    `heap.setU8(puVar6, 0xff)`, writing 4 bytes per pixel-flag and
//    corrupting the next 3 dirty-flag entries on every store.
//
// Both fixes are applied here. We also clamp in_AX/in_DX/unaff_BX/
// unaff_BP defensively in case stale register values from earlier
// callers leak in (5e6028 doesn't reset them, so the only protection
// is this clamp + the field-overlap fix above).

import { regs } from "../../runtime/regs.js";

export function FUN_005e117d(heap) {
  let in_AX     = regs.eax & 0xffff;
  let in_DX     = regs.edx & 0xffff;
  let unaff_BX  = regs.ebx & 0xffff;
  let unaff_BP  = regs.ebp & 0xffff;

  // Sign-correct the (x1,y1) corner — negative → 0.
  if ((in_AX    << 16 >> 16) < 0) in_AX = 0;
  if ((unaff_BX << 16 >> 16) < 0) unaff_BX = 0;

  // Clamp the (x2,y2) corner to the dirty-region extents. Read the
  // extents as u16 — they're packed 16-bit fields, see the header
  // comment.
  const ed6 = heap.u16(0x00971ed6);
  const ed8 = heap.u16(0x00971ed8);
  if (ed6 < in_DX)    in_DX    = ed6;
  if (ed8 < unaff_BP) unaff_BP = ed8;

  // Empty rectangle? Bail.
  if (!((in_AX << 16 >> 16) < in_DX && (unaff_BX << 16 >> 16) < unaff_BP)) return;

  const eee = heap.u8(0x00971eee) & 0x1f;   // log2(block_w)
  const eef = heap.u8(0x00971eef) & 0x1f;   // log2(block_h)
  const stride = heap.u32(0x00971ee6) & 0xffff;  // block-cells per row (u16 stored in u32 slot)

  const x1Cell = (in_AX    >>> eee) & 0xffff;
  const y1Cell = (unaff_BX >>> eef) & 0xffff;
  const colCount = ((((in_DX    - 1) & 0xffff) >>> eee) - x1Cell + 1) & 0xffff;
  const rowCount = ((((unaff_BP - 1) & 0xffff) >>> eef) - y1Cell + 1) & 0xffff;

  const bufBase = 0x0099ad63;
  const flagWidth = stride;  // bytes between consecutive rows in the flag buffer
  for (let row = 0; row < rowCount; row++) {
    const rowOff = bufBase + ((y1Cell + row) * flagWidth + x1Cell);
    for (let col = 0; col < colCount; col++) {
      heap.setU8((rowOff + col) >>> 0, 0xff);
    }
  }
  return;
}

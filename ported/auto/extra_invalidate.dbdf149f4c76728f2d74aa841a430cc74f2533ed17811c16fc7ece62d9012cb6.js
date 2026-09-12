// @manual — do not regenerate.
//
// Faithful screen-invalidation primitives, shared by the hand-ports:
//
//   markDirtyRect(heap, x1, y1, x2, y2)  — binary 0x5e117d: clamp the
//     screen rect to [0x971ed6/0x971ed8], shift by the grid cell sizes
//     [0x971eee/0x971eef], and paint 0xff rows into the dirty grid at
//     0x99ad63 (row stride [0x971ee6]).
//
//   invalidateSpriteBbox(heap)           — binary 0x5e53ca: for each
//     window in the list at [0x9a121c] with zoom < 2 whose view rect
//     intersects the sprite bbox [esi+0x16..0x1c], clamp, view→screen,
//     then markDirtyRect. pushal/popal in the binary — NO register
//     effects; reads regs.esi (the sprite) only.
//
// These exist because the translated chain drops the register staging
// 0x5e117d consumes: ported/auto/5e53ca.js (and 5e5301.js's
// widget-invalidate path before its 2026-06-11 hand-fix) call
// FUN_005e117d without setting the rect registers it reads — so the
// marked rect came from stale caller regs. The translated 5e53ca.js is
// left untouched for its existing callers (its divergence is part of
// the current shipped baseline); hand-ports use these primitives
// instead. Found by tools/_lockstep-43c751.mjs (grid-byte diffs at
// 0x99adxx); exercised further by tools/_lockstep-statrio.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function markDirtyRect(heap, ax, bx, dx, bp) {     // binary 0x5e117d
  if (ax < 0) ax = 0;
  if (bx < 0) bx = 0;
  const scrW = (heap.u16(0x971ed6) << 16) >> 16;
  const scrH = (heap.u16(0x971ed8) << 16) >> 16;
  if (dx > scrW) dx = scrW;
  if (bp > scrH) bp = scrH;
  if (ax >= dx) return;
  if (bx >= bp) return;
  dx = (dx - 1) & 0xffff;
  bp = (bp - 1) & 0xffff;
  const shx = heap.u8(0x971eee), shy = heap.u8(0x971eef);
  ax = (ax & 0xffff) >>> shx;
  dx = dx >>> shx;
  bx = (bx & 0xffff) >>> shy;
  bp = bp >>> shy;
  let rows = (bp - bx + 1) & 0xffff;
  const ecx0 = heap.u32(0x971ee6) >>> 0;                  // grid column count
  let addr = (0x99ad63 + (((bx * (ecx0 & 0xffff)) + ax) & 0xffff)) >>> 0;
  const cols = (dx - ax + 1) & 0xffff;
  const skip = ((ecx0 & 0xffff0000) | ((ecx0 - cols) & 0xffff)) >>> 0;
  while (rows--) {
    for (let i = 0; i < cols; i++) heap.setU8(addr++, 0xff);
    addr = (addr + skip) >>> 0;
  }
}

export function invalidateSpriteBbox(heap) {              // binary 0x5e53ca
  const spr = regs.esi >>> 0;
  if (heap.u16(spr + 0x16) === 0x8000) return;
  const L = (heap.u16(spr + 0x16) << 16) >> 16;
  const T = (heap.u16(spr + 0x18) << 16) >> 16;
  const R = (heap.u16(spr + 0x1a) << 16) >> 16;
  const B = (heap.u16(spr + 0x1c) << 16) >> 16;
  for (let pw = 0x9a121c; ; pw += 4) {
    const w = heap.u32(pw) >>> 0;
    if (w === 0) break;
    if (heap.u8(w + 0x10) >= 2) continue;
    const vx = (heap.u16(w + 8) << 16) >> 16;
    const vy = (heap.u16(w + 0xa) << 16) >> 16;
    if (!(R > vx)) continue;
    if (!(B > vy)) continue;
    const vr = ((vx + ((heap.u16(w + 0xc) << 16) >> 16)) << 16) >> 16;
    if (!(L < vr)) continue;
    let ax = L; if (ax < vx) ax = vx;
    let dx = R; if (dx > vr) dx = vr;
    const vb = ((vy + ((heap.u16(w + 0xe) << 16) >> 16)) << 16) >> 16;
    if (!(T < vb)) continue;
    let bx = T; if (bx < vy) bx = vy;
    let bp = B; if (bp > vb) bp = vb;
    const zoom = heap.u8(w + 0x10);
    const sx = (heap.u16(w + 4) << 16) >> 16;
    const sy = (heap.u16(w + 6) << 16) >> 16;
    ax = ((((ax - vx) << 16) >> (16 + zoom)) + sx) << 16 >> 16;
    bx = ((((bx - vy) << 16) >> (16 + zoom)) + sy) << 16 >> 16;
    dx = ((((dx - vx) << 16) >> (16 + zoom)) + sx) << 16 >> 16;
    bp = ((((bp - vy) << 16) >> (16 + zoom)) + sy) << 16 >> 16;
    markDirtyRect(heap, ax, bx, dx, bp);
  }
}

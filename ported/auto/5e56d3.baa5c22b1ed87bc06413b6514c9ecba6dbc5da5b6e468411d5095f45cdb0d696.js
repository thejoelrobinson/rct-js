// @manual — do not regenerate.

import { regs } from "../../runtime/regs.js";
import { markDirtyRect } from "./extra_invalidate.js";

const s16 = (value) => (value << 16) >> 16;
const add16 = (left, right) => (left + right) & 0xffff;
const sub16 = (left, right) => (left - right) & 0xffff;
const neg16 = (value) => (-value) & 0xffff;
const sar16 = (value, count) => (s16(value) >> (count & 0x1f)) & 0xffff;

export function FUN_005e56d3(heap) {
  const saved = {
    eax: regs.eax >>> 0,
    ebx: regs.ebx >>> 0,
    ecx: regs.ecx >>> 0,
    edx: regs.edx >>> 0,
    esi: regs.esi >>> 0,
    edi: regs.edi >>> 0,
    ebp: regs.ebp >>> 0,
    esp: regs.esp >>> 0,
  };

  let ax = add16(saved.eax, 0x10);
  let bx = add16(saved.ecx, 0x10);
  let cx;
  const rotation = heap.u8(0x00991f88) & 3;

  if (rotation === 0) {
    cx = ax;
    ax = add16(neg16(ax), bx);
    bx = sar16(add16(bx, cx), 1);
  } else if (rotation === 1) {
    ax = neg16(ax);
    cx = ax;
    ax = sub16(ax, bx);
    bx = sar16(add16(bx, cx), 1);
  } else if (rotation === 2) {
    cx = ax;
    ax = sub16(ax, bx);
    bx = sar16(sub16(neg16(bx), cx), 1);
  } else {
    cx = ax;
    ax = add16(ax, bx);
    bx = sar16(add16(neg16(bx), cx), 1);
  }

  let dx = add16(ax, 0x20);
  let bp = sub16(add16(bx, 0x20), saved.edi);
  ax = sub16(ax, 0x20);
  bx = sub16(sub16(bx, 0x20), saved.esi);

  for (let cursor = 0x009a121c; ; cursor = (cursor + 4) >>> 0) {
    const viewport = heap.u32(cursor) >>> 0;
    if (viewport === 0) break;

    const viewX = heap.u16((viewport + 8) >>> 0);
    const viewY = heap.u16((viewport + 0x0a) >>> 0);
    if (s16(dx) <= s16(viewX) || s16(bp) <= s16(viewY)) continue;

    const viewRight = add16(viewX, heap.u16((viewport + 0x0c) >>> 0));
    if (s16(ax) >= s16(viewRight)) continue;

    let clippedAx = s16(ax) < s16(viewX) ? viewX : ax;
    let clippedDx = s16(dx) > s16(viewRight) ? viewRight : dx;
    const viewBottom = add16(viewY, heap.u16((viewport + 0x0e) >>> 0));
    if (s16(bx) >= s16(viewBottom)) continue;

    let clippedBx = s16(bx) < s16(viewY) ? viewY : bx;
    let clippedBp = s16(bp) > s16(viewBottom) ? viewBottom : bp;
    const zoom = heap.u8((viewport + 0x10) >>> 0);
    const screenX = heap.u16((viewport + 4) >>> 0);
    const screenY = heap.u16((viewport + 6) >>> 0);

    clippedAx = add16(sar16(sub16(clippedAx, viewX), zoom), screenX);
    clippedBx = add16(sar16(sub16(clippedBx, viewY), zoom), screenY);
    clippedDx = add16(sar16(sub16(clippedDx, viewX), zoom), screenX);
    clippedBp = add16(sar16(sub16(clippedBp, viewY), zoom), screenY);
    markDirtyRect(heap, s16(clippedAx), s16(clippedBx), s16(clippedDx), s16(clippedBp));
  }

  Object.assign(regs, saved);
  regs.cf = 0;
  regs.zf = 1;
  regs.sf = 0;
  regs.of = 0;
  regs.df = 0;
  return saved.eax;
}

// @manual — do not regenerate.
// Source: decompiled/c/5e585a.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { markDirtyRect } from "./extra_invalidate.js";

const signedWord = value => value << 16 >> 16;
const ROTATIONS = new Map([[0x5e5884, 0], [0x5e58b4, 1], [0x5e58e1, 2], [0x5e590e, 3]]);

export function FUN_005e585a_exact(heap) {
  const target = heap.u32((0x5e5874 + (heap.u32(0x991f88) << 2)) >>> 0);
  const rotation = ROTATIONS.get(target);
  if (rotation === undefined) throw new Error(`unported height-band projection 0x${target.toString(16)}`);
  const tileX = (regs.eax + 0x10) & 0xffff;
  const tileY = (regs.ecx + 0x10) & 0xffff;
  const projectedX = signedWord(rotation === 0 ? tileY - tileX : rotation === 1 ? -tileX - tileY :
    rotation === 2 ? tileX - tileY : tileX + tileY);
  const projectedY = signedWord(rotation === 0 ? tileX + tileY : rotation === 1 ? tileY - tileX :
    rotation === 2 ? -tileY - tileX : tileX - tileY) >> 1;
  const left = signedWord(projectedX - 0x20);
  const right = signedWord(projectedX + 0x20);
  const top = signedWord(projectedY - 0x20 - regs.esi);
  const bottom = signedWord(projectedY + 0x20 - regs.edi);
  for (let cursor = 0x9a121c; ; cursor = (cursor + 4) >>> 0) {
    const viewport = heap.u32(cursor);
    if (!viewport) break;
    if (heap.u8(viewport + 0x10) >= 1) continue;
    const viewX = heap.i16(viewport + 8);
    const viewY = heap.i16(viewport + 0xa);
    if (right <= viewX || bottom <= viewY) continue;
    const viewRight = signedWord(viewX + heap.u16(viewport + 0xc));
    if (left >= viewRight) continue;
    const viewBottom = signedWord(viewY + heap.u16(viewport + 0xe));
    if (top >= viewBottom) continue;
    const screenX = heap.u16(viewport + 4);
    const screenY = heap.u16(viewport + 6);
    markDirtyRect(heap,
      signedWord(Math.max(left, viewX) - viewX + screenX),
      signedWord(Math.max(top, viewY) - viewY + screenY),
      signedWord(Math.min(right, viewRight) - viewX + screenX),
      signedWord(Math.min(bottom, viewBottom) - viewY + screenY));
  }
  regs.cf = 0; regs.zf = 1; regs.sf = 0; regs.of = 0;
  return regs.eax >>> 0;
}

export function FUN_005e585a(heap) {
  return (regs.eax = callIndirect(heap, heap.u32((0x005e5874) + (heap.u8(0x00991f88)) * 4)));
}

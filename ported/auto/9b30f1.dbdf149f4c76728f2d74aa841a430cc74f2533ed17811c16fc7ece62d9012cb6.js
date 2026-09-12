// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x9b30f1..0x9b33cd.
//
// FUN_009b30f1 — clip a rect to the DPI and fill it. This is the primitive
// under every window edge, panel and hatch: FUN_005e0e07 alone calls it up to
// five times per widget.
//
// The auto-translated version (287 lines of CONCAT11/CONCAT31 arithmetic) was
// the last big divergence in the JS paint path: with it the playable
// configuration measured 6.0% divergent against the binary; routing just this
// function to the real bytes gave 1.56%, and this transcription reproduces that
// exactly. Verified neutral on the frozen soak (canary 7b14266).
//
// Registers: AX/BX = left/right, CX/DX = top/bottom (inclusive), EBP = colour
// in the low byte plus mode bits, EDI = DPI.
//   DPI: +0 bytes, +4 clipX, +6 clipY, +8 clipW, +0xa clipH, +0xc pitch-rem.
//
// Mode bits 0x1000000 / 0x2000000 / 0x4000000 select the pattern, remap and
// palette variants at 0x9b31f0 / 0x9b3290 / 0x9b33ce. Pattern and remap are
// JS; only the palette variant still runs the real bytes.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const s16 = (v) => (v << 16) >> 16;

export function FUN_009b30f1(heap) {
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_009b30f1");

  let ax = s16(regs.eax), bx = s16(regs.ebx);
  let cx = s16(regs.ecx), dx = s16(regs.edx);
  const ebp = regs.ebp >>> 0;
  const edi = regs.edi >>> 0;

  // 0x9b30f1..0x9b3134 — reject rects that are empty or wholly outside the clip.
  if (ax > bx) return 0;                                            // 0x9b30f4
  if (cx > dx) return 0;                                            // 0x9b30fd
  const clipX = heap.i16(edi + 4), clipY = heap.i16(edi + 6);
  const clipW = heap.i16(edi + 8), clipH = heap.i16(edi + 0xa);
  if (bx < clipX) return 0;                                         // 0x9b3107
  if (ax >= s16(clipX + clipW)) return 0;                           // 0x9b3119
  if (dx < clipY) return 0;                                         // 0x9b3123
  if (cx >= s16(clipY + clipH)) return 0;                           // 0x9b3134

  // 0x9b314b — the palette variant. Nothing has been mutated yet, so
  // re-entering at the top through the interpreter is exact.
  if ((ebp & 0x04000000) !== 0) {
    return callNative(0x009b30f1, []);
  }

  if ((ebp & 0x01000000) !== 0) {
    // 0x9b31f0..0x9b328f — alternating-pixel pattern. SI accumulates the
    // clipped-off x/y parity, then each pixel and row flips that phase.
    let phase = 0;
    ax = s16(ax - clipX);
    if (ax < 0) { phase ^= ax & 0xffff; ax = 0; }
    bx = s16(s16(bx - clipX) + 1);
    if (bx > clipW) bx = clipW;
    bx = s16(bx - ax);
    cx = s16(cx - clipY);
    if (cx < 0) { phase ^= cx & 0xffff; cx = 0; }
    dx = s16(s16(dx - clipY) + 1);
    if (dx > clipH) dx = clipH;
    dx = s16(dx - cx);

    const stride = (heap.u16(edi + 8) + heap.u16(edi + 0x0c)) & 0xffff;
    let destination = (heap.u32(edi)
      + Math.imul(stride, s16(cx)) + (ax & 0xffff)) >>> 0;
    const width = bx & 0xffff;
    const height = dx & 0xffff;
    const advance = (stride - width) << 16 >> 16;
    const colour = ebp & 0xff;
    const bytes = heap.bytes;
    for (let row = 0; row < height; row++) {
      let write = (phase & 1) === 0;
      for (let column = 0; column < width; column++) {
        if (write) bytes[destination] = colour;
        destination++;
        write = !write;
      }
      phase ^= 1;
      destination = (destination + advance) >>> 0;
    }
    return 0;
  }

  // 0x9b3157..0x9b318c — clip to the DPI and convert to origin + extent.
  ax = s16(ax - clipX); if (ax < 0) ax = 0;                         // 0x9b315d
  bx = s16(s16(bx - clipX) + 1);
  if (bx > clipW) bx = clipW;                                       // 0x9b316c
  bx = s16(bx - ax);                                                // width
  cx = s16(cx - clipY); if (cx < 0) cx = 0;                         // 0x9b3179
  dx = s16(s16(dx - clipY) + 1);
  if (dx > clipH) dx = clipH;                                       // 0x9b3188
  dx = s16(dx - cx);                                                // height

  if ((ebp & 0x02000000) !== 0) {                                   // 0x9b318f
    // 0x9b3290..0x9b33cd — remap every destination pixel through the colour
    // table selected by EBP. 0x9b3290 is a mid-function label whose epilogue
    // pops the frame created at 0x9b313a; calling it as a standalone native
    // function was not valid and left 18 caption-mask pixels wrong.
    const zoom = heap.u16(edi + 0x0e);
    const shift = zoom === 1 ? 1 : zoom > 1 ? 2 : 0;
    const width = (bx & 0xffff) >>> shift;
    const height = (dx & 0xffff) >>> shift;
    let stride = heap.u16(edi + 8) >>> shift;
    stride = (stride + heap.u16(edi + 0x0c)) & 0xffff;
    let destination = (heap.u32(edi)
      + Math.imul(stride, s16(cx)) + (ax & 0xffff)) >>> 0;
    const paletteRecord = heap.u32(0x009aa06c + (ebp & 0x7f) * 4) >>> 0;
    const remap = heap.u32(0x008dc0b4 + paletteRecord * 0x10) >>> 0;
    const advance = (stride - width) << 16 >> 16;
    const bytes = heap.bytes;
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        bytes[destination] = bytes[remap + bytes[destination]];
        destination++;
      }
      destination = (destination + advance) >>> 0;
    }
    return 0;
  }

  // 0x9b319b..0x9b31e7 — solid fill.
  // `movzx esi,[edi+8]; add si,[edi+0xc]` keeps the sum at 16 bits.
  const stride = (heap.u16(edi + 8) + heap.u16(edi + 0xc)) & 0xffff;
  let p = (heap.u32(edi) + Math.imul(stride, cx) + (ax & 0xffff)) >>> 0;
  const colour = ebp & 0xff;                                        // 0x9b31b0 `mov ax, bp`
  const width = bx & 0xffff;
  const advance = (stride - width) | 0;                             // 0x9b31ca
  const bytes = heap.bytes;
  for (let row = dx & 0xffff; row !== 0; row--) {                   // 0x9b31e5 `dec dx`
    // 0x9b31ce..0x9b31e1: the byte/word/dword staircase — a plain fill.
    bytes.fill(colour, p, p + width);
    p = (p + width + advance) >>> 0;
  }
  return 0;
}

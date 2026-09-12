// @manual — do not regenerate.
// Assembly-level port of the overlap-safe screen blitter 0x9bb374..0x9bb4b3.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004015f0 } from "./4015f0.js";

const signed16 = value => value << 16 >> 16;

function setLogic16(value) {
  const result = value & 0xffff;
  regs.cf = 0; regs.of = 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
}

function invalidate(heap, x, y, width, height) {
  FUN_004015f0(heap, signed16(x), signed16(y),
    signed16((x + width - 1) & 0xffff), signed16((y + height - 1) & 0xffff));
}

function copyRows(heap, base, stride, x, y, width, height, shiftX, shiftY) {
  const copyWidth = width - Math.abs(shiftX);
  const copyHeight = height - Math.abs(shiftY);
  const sourceX = x + Math.max(0, -shiftX);
  const destinationX = x + Math.max(0, shiftX);
  const sourceY = y + Math.max(0, -shiftY);
  const destinationY = y + Math.max(0, shiftY);
  if (shiftY > 0) {
    for (let row = copyHeight - 1; row >= 0; row--) {
      const source = base + sourceX + (sourceY + row) * stride;
      const destination = base + destinationX + (destinationY + row) * stride;
      heap.bytes.copyWithin(destination, source, source + copyWidth);
    }
  } else {
    for (let row = 0; row < copyHeight; row++) {
      const source = base + sourceX + (sourceY + row) * stride;
      const destination = base + destinationX + (destinationY + row) * stride;
      heap.bytes.copyWithin(destination, source, source + copyWidth);
    }
  }
}

export function FUN_009bb374(heap) {
  const inputX = regs.eax & 0xffff;
  const inputY = regs.ebx & 0xffff;
  const inputWidth = regs.ecx & 0xffff;
  const inputHeight = regs.edx & 0xffff;
  const shiftY = signed16(regs.esi & 0xffff);
  const shiftX = signed16(regs.edi & 0xffff);

  setLogic16(shiftY);
  if (shiftY === 0) {
    setLogic16(shiftX);
    if (shiftX === 0) return regs.eax >>> 0;
  }

  invalidate(heap, inputX, inputY, inputWidth, inputHeight);
  const stride = (heap.u16(0x99fb84) + heap.u16(0x99fb88)) & 0xffff;
  const base = heap.u32(0x99fb7c);
  const forward = shiftY < 0 || shiftY === 0 && shiftX < 0;
  const copyWidth = (inputWidth - Math.abs(shiftX)) & 0xffff;
  const copyHeight = (inputHeight - Math.abs(shiftY)) & 0xffff;
  copyRows(heap, base, stride, signed16(inputX), signed16(inputY), inputWidth, inputHeight, shiftX, shiftY);

  let destinationOffset;
  let sourceOffset;
  if (forward) {
    destinationOffset = signed16(inputX) + signed16(inputY) * stride;
    sourceOffset = destinationOffset - shiftY * stride;
    if (shiftX < 0) sourceOffset -= shiftX;
    else destinationOffset += shiftX;
  } else {
    destinationOffset = signed16((inputX + inputWidth - 1) & 0xffff) +
      signed16((inputY + inputHeight - 1) & 0xffff) * stride;
    sourceOffset = destinationOffset - shiftY * stride;
    if (shiftX < 0) destinationOffset += shiftX;
    else sourceOffset -= shiftX;
  }

  const rowSkipWord = (stride - copyWidth) & 0xffff;
  const rowSkip = signed16(rowSkipWord);
  const destinationStart = (base + destinationOffset) >>> 0;
  const sourceStart = (base + sourceOffset) >>> 0;
  let carry;
  if (forward) {
    const sourceBeforeLastAdjustment = (sourceStart + (copyHeight - 1) * stride + copyWidth) >>> 0;
    carry = (sourceBeforeLastAdjustment + (rowSkip >>> 0)) > 0xffffffff ? 1 : 0;
    regs.edi = (destinationStart + copyHeight * stride) >>> 0;
    regs.esi = (sourceStart + copyHeight * stride) >>> 0;
  } else {
    const sourceBeforeLastAdjustment = (sourceStart - (copyHeight - 1) * stride - copyWidth) >>> 0;
    carry = sourceBeforeLastAdjustment < (rowSkip >>> 0) ? 1 : 0;
    regs.edi = (destinationStart - copyHeight * stride) >>> 0;
    regs.esi = (sourceStart - copyHeight * stride) >>> 0;
    regs.df = 0;
  }
  regs.ebp = rowSkip >>> 0;
  regs.ebx = sourceOffset >>> 0;
  regs.eax = ((destinationOffset & 0xffff0000) | 0) >>> 0;
  regs.ecx = 0;
  regs.edx = ((regs.edx & 0xffff0000) | copyWidth) >>> 0;
  regs.cf = carry;
  regs.zf = 1;
  regs.sf = 0;
  regs.of = 0;
  return regs.eax >>> 0;
}

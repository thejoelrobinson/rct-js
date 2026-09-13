// @manual — do not regenerate.
// Assembly-level port of 0x5e1b3e..0x5e1bfc. The instruction at 0x5e1bfc
// restores EDI and falls through into the independently callable 0x5e1bfd.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1bfd } from "./5e1bfd.js";
import { FUN_009bb374 } from "./9bb374.js";

const WINDOW_STRIDE = 0x178;
const POOL_END = 0x9a1164;

const signed16 = value => value << 16 >> 16;
const word = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
};

function invokeDefault(heap, address) {
  if (address === 0x5e12eb) return FUN_005e12eb(heap);
  if (address === 0x9bb374) return FUN_009bb374(heap);
  throw new Error(`unported viewport scroll dependency 0x${address.toString(16)}`);
}

function intersects(heap, descriptor, window) {
  const right = signed16((heap.u16(descriptor + 4) + heap.u16(descriptor)) & 0xffff);
  const bottom = signed16((heap.u16(descriptor + 6) + heap.u16(descriptor + 2)) & 0xffff);
  const windowRight = signed16((heap.u16(window + 0x20) + heap.u16(window + 0x24)) & 0xffff);
  const windowBottom = signed16((heap.u16(window + 0x22) + heap.u16(window + 0x26)) & 0xffff);
  return descriptor !== heap.u32(window + 8) && heap.i16(window + 0x20) < right &&
    signed16(heap.u16(descriptor + 4)) < windowRight && heap.i16(window + 0x22) < bottom &&
    signed16(heap.u16(descriptor + 6)) < windowBottom;
}

function invalidateIntersection(heap, descriptor, window, invoke) {
  const saved = { eax: regs.eax, ebx: regs.ebx, ecx: regs.ecx, edx: regs.edx,
    esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
  let left = heap.i16(window + 0x20);
  let top = heap.i16(window + 0x22);
  let right = signed16((heap.u16(window + 0x20) + heap.u16(window + 0x24)) & 0xffff);
  let bottom = signed16((heap.u16(window + 0x22) + heap.u16(window + 0x26)) & 0xffff);
  const descriptorLeft = signed16(heap.u16(descriptor + 4));
  const descriptorTop = signed16(heap.u16(descriptor + 6));
  const descriptorRight = signed16((heap.u16(descriptor + 4) + heap.u16(descriptor)) & 0xffff);
  const descriptorBottom = signed16((heap.u16(descriptor + 6) + heap.u16(descriptor + 2)) & 0xffff);
  if (left < descriptorLeft) left = descriptorLeft;
  if (right > descriptorRight) right = descriptorRight;
  if (top < descriptorTop) top = descriptorTop;
  if (bottom > descriptorBottom) bottom = descriptorBottom;
  if (left < right && top < bottom) {
    word("eax", left); word("ebx", top); word("edx", right); word("ebp", bottom);
    word("ecx", descriptorBottom);
    invoke(heap, 0x5e12eb);
  }
  Object.assign(regs, saved);
}

export function FUN_005e1b3e(heap, invoke = invokeDefault) {
  const descriptor = regs.esi >>> 0;
  const firstWindow = regs.edi >>> 0;
  const shiftX = regs.edx & 0xffff;
  const shiftY = regs.ebp & 0xffff;
  const poolEnd = heap.u32(POOL_END) >>> 0;
  for (let window = firstWindow; window < poolEnd; window = (window + WINDOW_STRIDE) >>> 0) {
    regs.edi = window;
    if ((heap.u16(window + 0x32) & 0x10) !== 0 && intersects(heap, descriptor, window)) {
      invalidateIntersection(heap, descriptor, window, invoke);
    }
  }
  regs.edi = firstWindow;
  word("edx", shiftX);
  word("ebp", shiftY);
  regs.esi = descriptor;
  return FUN_005e1bfd(heap, invoke);
}

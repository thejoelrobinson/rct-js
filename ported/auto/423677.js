// @manual — do not regenerate.
// Assembly-level port of the terrain-height query 0x423677..0x4238b3.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect } from "../../runtime/win32/context.js";

function compare(value, operand, width) {
  const mask = width === 8 ? 0xff : width === 16 ? 0xffff : 0xffffffff;
  const sign = width - 1;
  const left = value & mask;
  const right = operand & mask;
  const result = (left - right) & mask;
  regs.cf = left < right ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> sign;
  regs.of = ((left ^ right) & (left ^ result)) >>> sign & 1;
}

function logic(value, width) {
  const mask = width === 8 ? 0xff : width === 16 ? 0xffff : 0xffffffff;
  const sign = width - 1;
  const result = value & mask;
  regs.cf = 0; regs.of = 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> sign;
  return result;
}

function add8(left, right, carry = 0) {
  const total = left + right + carry;
  const result = total & 0xff;
  regs.cf = total > 0xff ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7;
  regs.of = (~(left ^ right) & (left ^ result)) >>> 7 & 1;
  return result;
}

function sub8(left, right) {
  const result = (left - right) & 0xff;
  regs.cf = left < right ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7;
  regs.of = ((left ^ right) & (left ^ result)) >>> 7 & 1;
  return result;
}

function sar8(value) {
  const result = (value << 24 >> 25) & 0xff;
  regs.cf = value & 1;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7;
  regs.of = 0;
  return result;
}

function addDx(value) {
  const left = regs.edx & 0xffff;
  const result = (left + value) & 0xffff;
  regs.edx = ((regs.edx & 0xffff0000) | result) >>> 0;
  regs.cf = left + value > 0xffff ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = (~(left ^ value) & (left ^ result)) >>> 15 & 1;
}

function incrementDx() {
  const carry = regs.cf;
  const before = regs.edx & 0xffff;
  const result = (before + 1) & 0xffff;
  regs.edx = ((regs.edx & 0xffff0000) | result) >>> 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = before === 0x7fff ? 1 : 0;
  regs.cf = carry;
}

function addToDl(value) {
  const result = add8(regs.edx & 0xff, value);
  regs.edx = ((regs.edx & 0xffffff00) | result) >>> 0;
}

function adcToDh(value) {
  const carry = regs.cf;
  const result = add8(regs.edx >>> 8 & 0xff, value & 0xff, carry);
  regs.edx = ((regs.edx & 0xffff00ff) | (result << 8)) >>> 0;
}

function maskPair(state) {
  state.bl &= 0x1f;
  state.bh &= 0x1f;
  logic(state.bl | state.bh << 8, 16);
}

function interpolatePositive(value) {
  value = sar8(value);
  addToDl(value);
  adcToDh(0);
}

function interpolateNegative(value) {
  value = sar8(value);
  addToDl(value);
  adcToDh(0xff);
}

function runSlope(shape, inverted, x, y) {
  const state = { bl: 0, bh: 0 };
  switch (shape) {
    case 0:
    case 15:
      return;
    case 1:
      state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
      state.bl = sub8(state.bl, state.bh);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bl); return;
    case 2:
      state.bl = x; state.bh = y; maskPair(state);
      state.bl = sub8(state.bl, state.bh);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bl); return;
    case 3:
      state.bh = x & 0x1f; logic(state.bh, 8);
      state.bh = sar8(state.bh);
      addToDl(state.bh); adcToDh(0); incrementDx(); return;
    case 4:
      state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bh); return;
    case 5:
      state.bl = x; state.bh = y; maskPair(state);
      state.bl = add8(state.bl, state.bh);
      compare(state.bl, 0x20, 8);
      if (!regs.cf && !regs.zf) {
        state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
        state.bl = sub8(state.bl, state.bh);
        if (regs.cf || regs.zf) return;
        interpolatePositive(state.bl); return;
      }
      state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bh); return;
    case 6:
      state.bh = ((~y) & 0xff) & 0x1f; logic(state.bh, 8);
      state.bh = sar8(state.bh);
      addToDl(state.bh); adcToDh(0); return;
    case 7:
      if (inverted) {
        state.bl = (~y) & 0xff; state.bh = x; maskPair(state);
        state.bl = add8(state.bl, state.bh); state.bl = sar8(state.bl);
        addToDl(state.bl); adcToDh(0); incrementDx(); return;
      }
      addDx(0x10);
      state.bl = x; state.bh = y; maskPair(state);
      state.bl = sub8(state.bl, state.bh);
      if (!regs.cf) return;
      interpolateNegative(state.bl); return;
    case 8:
      state.bl = x; state.bh = y; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bh); return;
    case 9:
      state.bh = y & 0x1f; logic(state.bh, 8);
      state.bh = sar8(state.bh);
      addToDl(state.bh); adcToDh(0); incrementDx(); return;
    case 10:
      state.bl = x; state.bh = y; maskPair(state);
      compare(state.bl, state.bh, 8);
      if (!regs.cf && !regs.zf) {
        state.bl = x; state.bh = y; maskPair(state);
        state.bl = sub8(state.bl, state.bh);
        if (regs.cf || regs.zf) return;
        interpolatePositive(state.bl); return;
      }
      state.bl = x; state.bh = y; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (regs.cf || regs.zf) return;
      interpolatePositive(state.bh); return;
    case 11:
      if (inverted) {
        state.bl = x; state.bh = y; maskPair(state);
        state.bl = add8(state.bl, state.bh); state.bl = sar8(state.bl);
        addToDl(state.bl); adcToDh(0); incrementDx(); return;
      }
      addDx(0x10);
      state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
      state.bl = sub8(state.bl, state.bh);
      if (!regs.cf) return;
      interpolateNegative(state.bl); return;
    case 12:
      state.bh = ((~x) & 0xff) & 0x1f; logic(state.bh, 8);
      state.bh = sar8(state.bh);
      addToDl(state.bh); adcToDh(0); return;
    case 13:
      if (inverted) {
        state.bl = (~x) & 0xff; state.bh = y; maskPair(state);
        state.bl = add8(state.bl, state.bh); state.bl = sar8(state.bl);
        addToDl(state.bl); adcToDh(0); incrementDx(); return;
      }
      addDx(0x10);
      state.bl = x; state.bh = y; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (!regs.cf) return;
      interpolateNegative(state.bh); return;
    case 14:
      if (inverted) {
        state.bl = (~y) & 0xff; state.bh = (~x) & 0xff; maskPair(state);
        state.bl = add8(state.bl, state.bh); state.bl = sar8(state.bl);
        addToDl(state.bl); adcToDh(0); incrementDx(); return;
      }
      addDx(0x10);
      state.bl = x; state.bh = (~y) & 0xff; maskPair(state);
      state.bh = sub8(state.bh, state.bl);
      if (!regs.cf) return;
      interpolateNegative(state.bh); return;
    default:
      throw new Error(`invalid terrain slope ${shape}`);
  }
}

export function FUN_00423677_exact(heap) {
  const savedEbx = regs.ebx >>> 0;
  const savedEsi = regs.esi >>> 0;
  const x = regs.eax & 0xffff;
  const y = regs.ecx & 0xffff;
  compare(x, 0x0fff, 16);
  if (!regs.cf && !regs.zf) { regs.edx = 0x10; return regs.eax >>> 0; }
  compare(y, 0x0fff, 16);
  if (!regs.cf && !regs.zf) { regs.edx = 0x10; return regs.eax >>> 0; }

  try {
    const tile = (x >>> 5) + (y >>> 5) * 128;
    regs.esi = heap.u32(0x971ef4 + tile * 4);
    while (heap.u8(regs.esi) & 0x3c) regs.esi = (regs.esi + 8) >>> 0;
    regs.edx = ((heap.u8(regs.esi + 5) & 0x1f) << 20) >>> 0;
    regs.edx = ((regs.edx & 0xffff0000) | heap.u8(regs.esi + 2)) >>> 0;
    const base = regs.edx & 0xffff;
    const shifted = base << 2 & 0xffff;
    regs.edx = ((regs.edx & 0xffff0000) | shifted) >>> 0;
    regs.cf = base >>> 14 & 1;
    regs.zf = shifted === 0 ? 1 : 0;
    regs.sf = shifted >>> 15;
    regs.of = (base >>> 15) ^ (shifted >>> 15);
    const slopeByte = heap.u8(regs.esi + 4) & 0x1f;
    regs.ebx = slopeByte;
    logic(regs.ebx, 32);
    const inverted = regs.ebx >>> 4 & 1;
    regs.cf = inverted;
    regs.ebx &= 0x0f;
    runSlope(regs.ebx, inverted, x & 0xff, y & 0xff);
  } finally {
    regs.esi = savedEsi;
    regs.ebx = savedEbx;
  }
  return regs.eax >>> 0;
}

export function FUN_00423677(heap) {
  return FUN_00423677_exact(heap);
}

export function FUN_00423677_legacy(heap) {
  const inputX = regs.eax & 0xffff;
  const inputY = regs.ecx & 0xffff;
  if (inputX >= 0x1000 || inputY >= 0x1000) return undefined;
  let element = heap.u32(0x00971ef4 + (((((inputY & 0xffe0) << 7 | inputY >>> 9 | inputX & 0xffe0) & 0xffff) >>> 5 |
    (inputY >>> 9) << 0xb) & 0xffff) * 4) >>> 0;
  while ((heap.u8(element) & 0x3c) !== 0) element = (element + 8) >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32(0x004236e0 + (heap.u8(element + 4) & 0xf) * 4)));
}

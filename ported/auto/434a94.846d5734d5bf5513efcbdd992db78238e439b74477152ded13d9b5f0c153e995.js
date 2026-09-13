// @manual — do not regenerate.
// Static port of the four six-sample terrain projections at 0x434a94.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { FUN_00423677_exact } from "./423677.js";

const signedHalf = value => (value << 16 >> 17) & 0xffff;
const add16 = (left, right) => (left + right) & 0xffff;
const sub16 = (left, right) => (left - right) & 0xffff;
const neg16 = value => (-value) & 0xffff;

function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

function project(rotation, inputX, inputY, height, offset) {
  const half = signedHalf(inputX);
  if (rotation === 0) {
    let x = add16(neg16(half), inputY);
    let y = add16(inputY, half);
    if (offset) { x = add16(x, height); y = add16(y, height); }
    return [x, y];
  }
  if (rotation === 1) {
    let x = sub16(neg16(half), inputY);
    let y = sub16(inputY, half);
    if (offset) { x = sub16(x, height); y = add16(y, height); }
    return [x, y];
  }
  if (rotation === 2) {
    let x = sub16(half, inputY);
    let y = sub16(neg16(inputY), half);
    if (offset) { x = sub16(x, height); y = sub16(y, height); }
    return [x, y];
  }
  let x = add16(half, inputY);
  let y = add16(neg16(inputY), half);
  if (offset) { x = add16(x, height); y = sub16(y, height); }
  return [x, y];
}

export function FUN_00434a94_exact(heap) {
  const rotation = regs.edx >>> 0;
  if (rotation > 3) throw new Error(`invalid terrain projection rotation ${rotation}`);
  const inputX = regs.eax & 0xffff;
  const inputY = regs.ebx & 0xffff;
  let height = regs.ecx & 0xffff;
  let projectedX = inputX;
  let projectedY = inputY;
  for (let sample = 0; sample < 6; sample++) {
    [projectedX, projectedY] = project(rotation, inputX, inputY, height, sample !== 0);
    word("eax", projectedX);
    word("ebx", projectedY);
    word("ecx", projectedY);
    FUN_00423677_exact(heap);
    height = regs.edx & 0xffff;
    if (sample !== 5) {
      word("eax", inputX);
      word("ebx", inputY);
      word("ecx", height);
    }
  }
  word("ebx", projectedY);
  word("ecx", height);
  return regs.eax >>> 0;
}

export function FUN_00434a94(heap) {
  return FUN_00434a94_exact(heap);
}

export function FUN_00434a94_legacy(heap) {
  return (regs.eax = callIndirect(heap, heap.u32(0x00434a9c + (regs.edx >>> 0) * 4)));
}

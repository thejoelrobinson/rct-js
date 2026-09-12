// @manual — do not regenerate.
// Assembly-level port of the occlusion splitter 0x5e1bfd..0x5e1f6f.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_009bb374 } from "./9bb374.js";

const WINDOW_STRIDE = 0x178;
const POOL_END = 0x9a1164;
const INVALIDATE = 0x5e12eb;
const BLIT = 0x9bb374;

const signed16 = value => value << 16 >> 16;
const word = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
};

function status16(result, left, right, subtract = false) {
  const value = result & 0xffff;
  regs.zf = value === 0 ? 1 : 0;
  regs.sf = value >>> 15;
  if (subtract) {
    regs.cf = (left & 0xffff) < (right & 0xffff) ? 1 : 0;
    regs.of = ((left ^ right) & (left ^ value)) >>> 15 & 1;
  } else {
    regs.cf = (left & 0xffff) + (right & 0xffff) > 0xffff ? 1 : 0;
    regs.of = (~(left ^ right) & (left ^ value)) >>> 15 & 1;
  }
  return value;
}

function addWord(name, right) {
  const left = regs[name] & 0xffff;
  word(name, status16(left + (right & 0xffff), left, right));
}

function subtractWord(name, right) {
  const left = regs[name] & 0xffff;
  word(name, status16(left - (right & 0xffff), left, right, true));
}

function compareWord(left, right) {
  status16((left & 0xffff) - (right & 0xffff), left, right, true);
}

function logicWord(value) {
  const result = value & 0xffff;
  regs.cf = 0; regs.of = 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  return result;
}

function negateWord(name) {
  const before = regs[name] & 0xffff;
  const result = (-before) & 0xffff;
  word(name, result);
  regs.cf = before !== 0 ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = before === 0x8000 ? 1 : 0;
}

function setCl(value) {
  regs.ecx = ((regs.ecx & 0xffffff00) | (value & 0xff)) >>> 0;
}

function shiftLeftWord(name, count) {
  const before = regs[name] & 0xffff;
  const amount = count & 31;
  if (amount === 0) return;
  const result = amount < 16 ? before << amount & 0xffff : 0;
  word(name, result);
  regs.cf = amount <= 16 ? before >>> (16 - amount) & 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  if (amount === 1) regs.of = regs.sf ^ regs.cf;
}

function invokeDefault(heap, address) {
  if (address === INVALIDATE) return FUN_005e12eb(heap);
  if (address === BLIT) return FUN_009bb374(heap);
  throw new Error(`unported viewport scroll dependency 0x${address.toString(16)}`);
}

function overlaps(heap, descriptor, window) {
  const left = signed16(heap.u16(descriptor + 4));
  const top = signed16(heap.u16(descriptor + 6));
  const right = signed16((heap.u16(descriptor + 4) + heap.u16(descriptor)) & 0xffff);
  const bottom = signed16((heap.u16(descriptor + 6) + heap.u16(descriptor + 2)) & 0xffff);
  const windowLeft = heap.i16(window + 0x20);
  const windowTop = heap.i16(window + 0x22);
  const windowRight = signed16((heap.u16(window + 0x20) + heap.u16(window + 0x24)) & 0xffff);
  const windowBottom = signed16((heap.u16(window + 0x22) + heap.u16(window + 0x26)) & 0xffff);
  return descriptor !== heap.u32(window + 8) && left < windowRight && windowLeft < right &&
    top < windowBottom && windowTop < bottom;
}

function recursePreservingShift(heap, descriptor, window, shiftX, shiftY, invoke) {
  const savedDx = regs.edx & 0xffff;
  const savedBp = regs.ebp & 0xffff;
  const savedEdi = regs.edi >>> 0;
  const savedEsi = regs.esi >>> 0;
  word("edx", shiftX);
  word("ebp", shiftY);
  regs.edi = window >>> 0;
  regs.esi = descriptor >>> 0;
  splitAndScroll(heap, descriptor, window, shiftX, shiftY, invoke);
  regs.esi = savedEsi;
  regs.edi = savedEdi;
  word("ebp", savedBp);
  word("edx", savedDx);
}

function splitHorizontal(heap, descriptor, window, amount, shiftX, shiftY, invoke) {
  const width = heap.u16(descriptor);
  const left = heap.u16(descriptor + 4);
  const source = heap.u16(descriptor + 8);
  const scaledWidth = heap.u16(descriptor + 0x0c);
  const zoom = heap.u8(descriptor + 0x10) & 31;

  word("eax", amount);
  heap.setU16(descriptor, amount);
  setCl(zoom);
  shiftLeftWord("eax", zoom);
  heap.setU16(descriptor + 0x0c, regs.eax);
  recursePreservingShift(heap, descriptor, window, shiftX, shiftY, invoke);

  const consumed = heap.u16(descriptor);
  const remainder = (width - consumed) & 0xffff;
  word("eax", width);
  word("ebx", consumed);
  subtractWord("eax", regs.ebx);
  heap.setU16(descriptor, remainder);
  heap.setU16(descriptor + 4, left + consumed);
  setCl(zoom);
  shiftLeftWord("eax", zoom);
  shiftLeftWord("ebx", zoom);
  heap.setU16(descriptor + 0x0c, regs.eax);
  heap.setU16(descriptor + 8, source + (regs.ebx & 0xffff));
  const savedEsi = regs.esi >>> 0;
  regs.esi = descriptor >>> 0;
  splitAndScroll(heap, descriptor, window, shiftX, shiftY, invoke);
  regs.esi = savedEsi;

  heap.setU16(descriptor + 8, source);
  heap.setU16(descriptor, width);
  heap.setU16(descriptor + 4, left);
  heap.setU16(descriptor + 0x0c, scaledWidth);
}

function splitVertical(heap, descriptor, window, amount, shiftX, shiftY, invoke) {
  const height = heap.u16(descriptor + 2);
  const top = heap.u16(descriptor + 6);
  const source = heap.u16(descriptor + 0x0a);
  const scaledHeight = heap.u16(descriptor + 0x0e);
  const zoom = heap.u8(descriptor + 0x10) & 31;

  word("eax", amount);
  heap.setU16(descriptor + 2, amount);
  setCl(zoom);
  shiftLeftWord("eax", zoom);
  heap.setU16(descriptor + 0x0e, regs.eax);
  recursePreservingShift(heap, descriptor, window, shiftX, shiftY, invoke);

  const consumed = heap.u16(descriptor + 2);
  const remainder = (height - consumed) & 0xffff;
  word("eax", height);
  word("ebx", consumed);
  subtractWord("eax", regs.ebx);
  heap.setU16(descriptor + 2, remainder);
  heap.setU16(descriptor + 6, top + consumed);
  setCl(zoom);
  shiftLeftWord("eax", zoom);
  shiftLeftWord("ebx", zoom);
  heap.setU16(descriptor + 0x0e, regs.eax);
  heap.setU16(descriptor + 0x0a, source + (regs.ebx & 0xffff));
  const savedEsi = regs.esi >>> 0;
  regs.esi = descriptor >>> 0;
  splitAndScroll(heap, descriptor, window, shiftX, shiftY, invoke);
  regs.esi = savedEsi;

  heap.setU16(descriptor + 0x0a, source);
  heap.setU16(descriptor + 2, height);
  heap.setU16(descriptor + 6, top);
  heap.setU16(descriptor + 0x0e, scaledHeight);
}

function invalidateFull(heap, descriptor, invoke) {
  word("eax", heap.u16(descriptor + 4));
  word("ebx", heap.u16(descriptor + 6));
  word("edx", heap.u16(descriptor));
  word("ebp", heap.u16(descriptor + 2));
  addWord("edx", regs.eax);
  addWord("ebp", regs.ebx);
  return invoke(heap, INVALIDATE);
}

function scrollLeaf(heap, descriptor, shiftX, shiftY, invoke) {
  word("eax", shiftX);
  logicWord(regs.eax);
  if (signed16(regs.eax) < 0) negateWord("eax");
  compareWord(regs.eax, heap.u16(descriptor));
  if (regs.cf === 0) return invalidateFull(heap, descriptor, invoke);

  word("eax", shiftY);
  logicWord(regs.eax);
  if (signed16(regs.eax) < 0) negateWord("eax");
  compareWord(regs.eax, heap.u16(descriptor + 2));
  if (regs.cf === 0) return invalidateFull(heap, descriptor, invoke);

  const savedVerticalShift = shiftY & 0xffff;
  const savedDescriptor = regs.esi >>> 0;
  const savedHorizontalShift = shiftX & 0xffff;
  word("eax", heap.u16(descriptor + 4));
  word("ebx", heap.u16(descriptor + 6));
  word("ecx", heap.u16(descriptor));
  word("edi", heap.u16(descriptor + 2));
  const previousDi = regs.edi & 0xffff;
  word("edi", regs.edx);
  word("edx", previousDi);
  word("esi", regs.ebp);
  invoke(heap, BLIT);
  word("ebp", savedHorizontalShift);
  regs.esi = savedDescriptor;

  word("eax", heap.u16(descriptor + 4));
  word("edx", heap.u16(descriptor));
  logicWord(regs.ebp);
  if (!regs.zf) {
    const savedAx = regs.eax & 0xffff;
    const savedDx = regs.edx & 0xffff;
    const savedBp = regs.ebp & 0xffff;
    const savedEsi = regs.esi >>> 0;
    if (signed16(regs.ebp) >= 0) {
      word("edx", regs.ebp);
      word("ebx", heap.u16(descriptor + 6));
      word("ebp", heap.u16(descriptor + 2));
      addWord("edx", regs.eax);
      addWord("ebp", regs.ebx);
      invoke(heap, INVALIDATE);
      regs.esi = savedEsi; word("ebp", savedBp); word("edx", savedDx); word("eax", savedAx);
      addWord("eax", regs.ebp);
      subtractWord("edx", regs.ebp);
    } else {
      addWord("eax", regs.edx);
      negateWord("ebp");
      subtractWord("eax", regs.ebp);
      word("edx", regs.ebp);
      word("ebx", heap.u16(descriptor + 6));
      word("ebp", heap.u16(descriptor + 2));
      addWord("edx", regs.eax);
      addWord("ebp", regs.ebx);
      invoke(heap, INVALIDATE);
      regs.esi = savedEsi; word("ebp", savedBp); word("edx", savedDx); word("eax", savedAx);
      addWord("edx", regs.ebp);
    }
  }

  word("ebp", savedVerticalShift);
  logicWord(regs.ebp);
  if (regs.zf) return regs.eax >>> 0;
  if (signed16(regs.ebp) >= 0) {
    word("ebx", heap.u16(descriptor + 6));
    addWord("edx", regs.eax);
    addWord("ebp", regs.ebx);
  } else {
    word("ebx", heap.u16(descriptor + 6));
    addWord("ebx", heap.u16(descriptor + 2));
    negateWord("ebp");
    subtractWord("ebx", regs.ebp);
    addWord("edx", regs.eax);
    addWord("ebp", regs.ebx);
  }
  return invoke(heap, INVALIDATE);
}

function splitAndScroll(heap, descriptor, firstWindow, shiftX, shiftY, invoke) {
  const poolEnd = heap.u32(POOL_END) >>> 0;
  let window = firstWindow >>> 0;
  while (window < poolEnd && !overlaps(heap, descriptor, window)) window = (window + WINDOW_STRIDE) >>> 0;
  regs.edi = window;
  if (window >= poolEnd) return scrollLeaf(heap, descriptor, shiftX, shiftY, invoke);

  const left = signed16(heap.u16(descriptor + 4));
  const top = signed16(heap.u16(descriptor + 6));
  const right = signed16((heap.u16(descriptor + 4) + heap.u16(descriptor)) & 0xffff);
  const bottom = signed16((heap.u16(descriptor + 6) + heap.u16(descriptor + 2)) & 0xffff);
  const windowLeft = heap.i16(window + 0x20);
  const windowTop = heap.i16(window + 0x22);
  const windowRight = signed16((heap.u16(window + 0x20) + heap.u16(window + 0x24)) & 0xffff);
  const windowBottom = signed16((heap.u16(window + 0x22) + heap.u16(window + 0x26)) & 0xffff);
  word("eax", left);
  compareWord(regs.eax, windowLeft);
  if (left < windowLeft) return splitHorizontal(heap, descriptor, window, (windowLeft - left) & 0xffff, shiftX, shiftY, invoke);
  word("eax", left);
  addWord("eax", heap.u16(descriptor));
  word("ecx", heap.u16(window + 0x20));
  addWord("ecx", heap.u16(window + 0x24));
  compareWord(regs.eax, regs.ecx);
  if (right > windowRight) return splitHorizontal(heap, descriptor, window, (windowRight - left) & 0xffff, shiftX, shiftY, invoke);
  word("eax", top);
  compareWord(regs.eax, windowTop);
  if (top < windowTop) return splitVertical(heap, descriptor, window, (windowTop - top) & 0xffff, shiftX, shiftY, invoke);
  word("eax", top);
  addWord("eax", heap.u16(descriptor + 2));
  word("ecx", heap.u16(window + 0x22));
  addWord("ecx", heap.u16(window + 0x26));
  compareWord(regs.eax, regs.ecx);
  if (bottom > windowBottom) return splitVertical(heap, descriptor, window, (windowBottom - top) & 0xffff, shiftX, shiftY, invoke);
  return regs.eax >>> 0;
}

export function FUN_005e1bfd(heap, invoke = invokeDefault) {
  return splitAndScroll(heap, regs.esi >>> 0, regs.edi >>> 0, regs.edx & 0xffff, regs.ebp & 0xffff, invoke);
}

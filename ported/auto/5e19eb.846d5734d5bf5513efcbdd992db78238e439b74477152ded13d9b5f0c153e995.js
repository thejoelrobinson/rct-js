// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e19eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1b3e } from "./5e1b3e.js";
const signed16 = value => value << 16 >> 16;
const word = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
};

function compareWord(left, right) {
  const result = (left - right) & 0xffff;
  regs.cf = (left & 0xffff) < (right & 0xffff) ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = ((left ^ right) & (left ^ result)) >>> 15 & 1;
}

function invokeDefault(heap, address) {
  if (address === 0x5e12eb) return FUN_005e12eb(heap);
  if (address === 0x5e1b3e) return FUN_005e1b3e(heap);
  throw new Error(`unported viewport move dependency 0x${address.toString(16)}`);
}

function invalidateViewport(heap, viewport, invoke) {
  word("eax", heap.u16(viewport + 4));
  word("ebx", heap.u16(viewport + 6));
  word("edx", (heap.u16(viewport + 4) + heap.u16(viewport)) & 0xffff);
  word("ebp", (heap.u16(viewport + 6) + heap.u16(viewport + 2)) & 0xffff);
  if (signed16(regs.eax) < 0) word("eax", 0);
  if (signed16(regs.ebx) < 0) word("ebx", 0);
  if (signed16(regs.edx) > heap.i16(0x971ed6)) word("edx", heap.u16(0x971ed6));
  if (signed16(regs.ebp) > heap.i16(0x971ed8)) word("ebp", heap.u16(0x971ed8));
  if (signed16(regs.eax) < signed16(regs.edx) && signed16(regs.ebx) < signed16(regs.ebp)) {
    return invoke(heap, 0x5e12eb);
  }
  return regs.eax >>> 0;
}

function scrollViewport(heap, viewport, window, invoke) {
  const saved = new Uint16Array(8);
  for (let index = 0; index < saved.length; index++) saved[index] = heap.u16(viewport + index * 2);
  const zoom = heap.u8(viewport + 0x10) & 31;

  let amount = heap.i16(viewport + 4);
  if (amount < 0) {
    heap.setU16(viewport, heap.u16(viewport) + amount);
    heap.setU16(viewport + 4, 0);
    amount = amount << zoom & 0xffff;
    heap.setU16(viewport + 0x0c, heap.u16(viewport + 0x0c) + amount);
    heap.setU16(viewport + 8, heap.u16(viewport + 8) - amount);
  }
  amount = signed16((heap.u16(viewport + 4) + heap.u16(viewport) - heap.u16(0x971ed6)) & 0xffff);
  if (amount > 0) {
    heap.setU16(viewport, heap.u16(viewport) - amount);
    amount = amount << zoom & 0xffff;
    heap.setU16(viewport + 0x0c, heap.u16(viewport + 0x0c) - amount);
  }

  if (heap.i16(viewport) > 0) {
    amount = heap.i16(viewport + 6);
    if (amount < 0) {
      heap.setU16(viewport + 2, heap.u16(viewport + 2) + amount);
      heap.setU16(viewport + 6, 0);
      amount = amount << zoom & 0xffff;
      heap.setU16(viewport + 0x0e, heap.u16(viewport + 0x0e) + amount);
      heap.setU16(viewport + 0x0a, heap.u16(viewport + 0x0a) - amount);
    }
    amount = signed16((heap.u16(viewport + 6) + heap.u16(viewport + 2) - heap.u16(0x971ed8)) & 0xffff);
    if (amount > 0) {
      heap.setU16(viewport + 2, heap.u16(viewport + 2) - amount);
      amount = amount << zoom & 0xffff;
      heap.setU16(viewport + 0x0e, heap.u16(viewport + 0x0e) - amount);
    }
    word("eax", amount);
    compareWord(heap.u16(viewport + 2), 0);
    if (heap.i16(viewport + 2) > 0) {
      const savedEsi = regs.esi >>> 0;
      regs.esi = viewport;
      regs.edi = window;
      invoke(heap, 0x5e1b3e);
      regs.esi = savedEsi;
    }
  }

  for (let index = 0; index < saved.length; index++) heap.setU16(viewport + index * 2, saved[index]);
  return regs.eax >>> 0;
}

function FUN_005e19eb_exact(heap, invoke = invokeDefault) {
  const window = regs.esi >>> 0;
  const viewport = regs.edi >>> 0;
  const shift = heap.u8(viewport + 0x10) & 31;
  const scaled = value => ((value << 16 >> 16) >> shift) & 0xffff;
  const nextX = regs.eax & 0xffff;
  const nextY = regs.ebx & 0xffff;
  const oldX = heap.u16(viewport + 8);
  const oldY = heap.u16(viewport + 0x0a);
  regs.esi = viewport;
  regs.edi = window;
  heap.setU16(viewport + 8, nextX);
  heap.setU16(viewport + 0x0a, nextY);
  regs.ecx = ((regs.ecx & 0xffffff00) | shift) >>> 0;
  word("eax", scaled(nextX));
  word("ebx", scaled(nextY));
  word("edx", (scaled(oldX) - scaled(nextX)) & 0xffff);
  word("ebp", (scaled(oldY) - scaled(nextY)) & 0xffff);
  if ((regs.ebp & 0xffff) === 0 && (regs.edx & 0xffff) === 0) {
    regs.cf = 0; regs.of = 0; regs.zf = 1; regs.sf = 0;
    return regs.eax >>> 0;
  }
  if (globalThis.__forceFullRedraw5e19eb) return invalidateViewport(heap, viewport, invoke);
  if ((heap.u16(window + 0x32) & 0x40) !== 0) return invalidateViewport(heap, viewport, invoke);
  return scrollViewport(heap, viewport, window, invoke);
}

function FUN_005e19eb_safe(heap) {
  const window = regs.esi >>> 0;
  const viewport = regs.edi >>> 0;
  const shift = heap.u8(viewport + 0x10) & 31;
  const scaled = value => ((value << 16 >> 16) >> shift) & 0xffff;
  const nextX = regs.eax & 0xffff;
  const nextY = regs.ebx & 0xffff;
  const oldX = heap.u16(viewport + 8);
  const oldY = heap.u16(viewport + 0x0a);
  regs.esi = viewport;
  regs.edi = window;
  heap.setU16(viewport + 8, nextX);
  heap.setU16(viewport + 0x0a, nextY);
  if (scaled(oldX) === scaled(nextX) && scaled(oldY) === scaled(nextY)) {
    regs.ecx = ((regs.ecx & 0xffffff00) | heap.u8(viewport + 0x10)) >>> 0;
    word("eax", scaled(nextX));
    word("ebx", scaled(nextY));
    word("edx", (scaled(oldX) - scaled(nextX)) & 0xffff);
    word("ebp", (scaled(oldY) - scaled(nextY)) & 0xffff);
    regs.cf = 0; regs.of = 0; regs.zf = 1; regs.sf = 0;
    return regs.eax >>> 0;
  }
  word("eax", heap.u16(viewport));
  word("ebx", heap.u16(viewport + 2));
  word("edx", (heap.i16(viewport) + heap.i16(viewport + 4)) & 0xffff);
  word("ebp", (heap.i16(viewport + 2) + heap.i16(viewport + 6)) & 0xffff);
  return FUN_005e12eb(heap);
}

export function FUN_005e19eb(heap, invoke) {
  if (!globalThis.__forceFrozen5e19eb && (invoke || state.executionMode === "pure-js")) {
    return FUN_005e19eb_exact(heap, invoke || invokeDefault);
  }
  if (!globalThis.__forceFrozen5e19eb && globalThis.__realStartup) {
    return FUN_005e19eb_safe(heap);
  }
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let sVar9 = 0;
  let sVar10 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  sVar6 = ((heap.i16(unaff_EDI + (4) * 2)) & 0xffff);
  sVar9 = ((heap.i16(unaff_EDI + (5) * 2)) & 0xffff);
  heap.setI16((unaff_EDI + (4) * 2), (in_AX) & 0xffff);
  heap.setI16((unaff_EDI + (5) * 2), (unaff_BX) & 0xffff);
  bVar1 = ((heap.u8((unaff_EDI + ((8) * 2)))) & 0xff);
  if ((sVar9 >>> (bVar1 & 0x1f) == unaff_BX >>> (bVar1 & 0x1f)) && (sVar6 >>> (bVar1 & 0x1f) == in_AX >>> (bVar1 & 0x1f))) {
    return;
  }
  if ((heap.u16((unaff_ESI + 0x32)) & 0x40) == 0) {
    sVar6 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
    sVar9 = ((heap.i16(unaff_EDI)) & 0xffff);
    sVar8 = ((heap.i16(unaff_EDI + (4) * 2)) & 0xffff);
    sVar10 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
    sVar2 = ((heap.i16(unaff_EDI + (1) * 2)) & 0xffff);
    sVar3 = ((heap.i16(unaff_EDI + (5) * 2)) & 0xffff);
    sVar4 = ((heap.i16(unaff_EDI + (6) * 2)) & 0xffff);
    sVar5 = ((heap.i16(unaff_EDI + (7) * 2)) & 0xffff);
    bVar1 = ((heap.u8((unaff_EDI + ((8) * 2)))) & 0xff);
    sVar7 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
    if (sVar7 < 0) {
      heap.setU32(unaff_EDI, (heap.i16(unaff_EDI) + sVar7) & 0xffffffff);
      heap.setI16((unaff_EDI + (2) * 2), (0) & 0xffff);
      sVar7 = ((sVar7 << (bVar1 & 0x1f)) & 0xffff);
      heap.setI16((unaff_EDI + (6) * 2), (heap.i16(unaff_EDI + (6) * 2) + sVar7) & 0xffff);
      heap.setI16((unaff_EDI + (4) * 2), (heap.i16(unaff_EDI + (4) * 2) - sVar7) & 0xffff);
    }
    sVar7 = (((heap.i16(unaff_EDI + (2) * 2) + heap.i16(unaff_EDI)) - heap.u32(0x00971ed6)) & 0xffff);
    if (sVar7 != 0 && heap.u32(0x00971ed6) <= (((heap.i16(unaff_EDI + (2) * 2) + heap.i16(unaff_EDI))) << 16 >> 16)) {
      heap.setU32(unaff_EDI, (heap.i16(unaff_EDI) - sVar7) & 0xffffffff);
      heap.setI16((unaff_EDI + (6) * 2), (heap.i16(unaff_EDI + (6) * 2) - (sVar7 << (bVar1 & 0x1f))) & 0xffff);
    }
    if (0 < heap.i16(unaff_EDI)) {
      sVar7 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
      if (sVar7 < 0) {
        heap.setI16((unaff_EDI + (1) * 2), (heap.i16(unaff_EDI + (1) * 2) + sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (3) * 2), (0) & 0xffff);
        sVar7 = ((sVar7 << (bVar1 & 0x1f)) & 0xffff);
        heap.setI16((unaff_EDI + (7) * 2), (heap.i16(unaff_EDI + (7) * 2) + sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (5) * 2), (heap.i16(unaff_EDI + (5) * 2) - sVar7) & 0xffff);
      }
      sVar7 = (((heap.i16(unaff_EDI + (3) * 2) + heap.i16(unaff_EDI + (1) * 2)) - heap.u32(0x00971ed8)) & 0xffff);
      if (sVar7 != 0 && heap.u32(0x00971ed8) <= (((heap.i16(unaff_EDI + (3) * 2) + heap.i16(unaff_EDI + (1) * 2))) << 16 >> 16)) {
        heap.setI16((unaff_EDI + (1) * 2), (heap.i16(unaff_EDI + (1) * 2) - sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (7) * 2), (heap.i16(unaff_EDI + (7) * 2) - (sVar7 << (bVar1 & 0x1f))) & 0xffff);
      }
      if (0 < heap.i16(unaff_EDI + (1) * 2)) {
        (regs.eax = FUN_005e1b3e(heap));
      }
    }
    heap.setI16((unaff_EDI + (7) * 2), (sVar5) & 0xffff);
    heap.setI16((unaff_EDI + (6) * 2), (sVar4) & 0xffff);
    heap.setI16((unaff_EDI + (5) * 2), (sVar3) & 0xffff);
    heap.setI16((unaff_EDI + (1) * 2), (sVar2) & 0xffff);
    heap.setI16((unaff_EDI + (3) * 2), (sVar10) & 0xffff);
    heap.setI16((unaff_EDI + (4) * 2), (sVar8) & 0xffff);
    heap.setU32(unaff_EDI, (sVar9) & 0xffffffff);
    heap.setI16((unaff_EDI + (2) * 2), (sVar6) & 0xffff);
    return;
  }
  sVar6 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
  sVar9 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
  sVar8 = ((heap.i16(unaff_EDI) + sVar6) & 0xffff);
  sVar10 = ((heap.i16(unaff_EDI + (1) * 2) + sVar9) & 0xffff);
  if (sVar6 < 0) {
    sVar6 = ((0) & 0xffff);
  }
  if (sVar9 < 0) {
    sVar9 = ((0) & 0xffff);
  }
  if (heap.u32(0x00971ed6) < sVar8) {
    sVar8 = ((heap.u32(0x00971ed6)) & 0xffff);
  }
  if (heap.u32(0x00971ed8) < sVar10) {
    sVar10 = ((heap.u32(0x00971ed8)) & 0xffff);
  }
  if ((sVar6 < sVar8) && (sVar9 < sVar10)) {
    return (regs.eax = FUN_005e12eb(heap));
  }
  return;
}

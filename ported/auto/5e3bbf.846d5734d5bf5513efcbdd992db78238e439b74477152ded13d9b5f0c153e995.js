// @manual — do not regenerate.
// Source: decompiled/c/5e3bbf.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

function compareWords(left, right) {
  left &= 0xffff; right &= 0xffff;
  const difference = (left - right) & 0xffff;
  regs.cf = left < right ? 1 : 0; regs.zf = difference === 0 ? 1 : 0;
  regs.sf = difference >>> 15; regs.of = ((left ^ right) & (left ^ difference)) >>> 15 & 1;
  return (left << 16 >> 16) - (right << 16 >> 16);
}

function setBp(value) {
  regs.ebp = ((regs.ebp & 0xffff0000) | (value & 0xffff)) >>> 0;
  return regs.ebp & 0xffff;
}

export function FUN_005e3bbf_exact(heap) {
  const left = regs.edx & 0xffff;
  const top = regs.eax & 0xffff;
  const width = regs.ebx & 0xffff;
  const height = regs.ecx & 0xffff;
  let blocked = compareWords(left, 0) < 0;
  if (!blocked) blocked = compareWords(top, 30) < 0;
  if (!blocked) blocked = compareWords(setBp(left + width), heap.u16(0x971ed6)) > 0;
  if (!blocked) blocked = compareWords(setBp(top + height), heap.u16(0x971ed8)) > 0;
  if (blocked) { regs.cf = 1; return regs.eax >>> 0; }
  regs.esi = 0x9a013c;
  while (regs.esi < heap.u32(0x9a1164)) {
    const window = regs.esi;
    if (!(heap.u16(window + 0x32) & 1) &&
        compareWords(setBp(left + width), heap.u16(window + 0x20)) > 0 &&
        compareWords(setBp(heap.u16(window + 0x20) + heap.u16(window + 0x24)), left) > 0 &&
        compareWords(setBp(top + height), heap.u16(window + 0x22)) > 0 &&
        compareWords(setBp(heap.u16(window + 0x22) + heap.u16(window + 0x26)), top) > 0) {
      regs.cf = 1;
      return regs.eax >>> 0;
    }
    regs.esi = (regs.esi + 0x178) >>> 0;
  }
  const low = regs.eax & 0xff;
  regs.cf = 0; regs.zf = low === 0 ? 1 : 0; regs.sf = low >>> 7; regs.of = 0;
  return regs.eax >>> 0;
}

export function FUN_005e3bbf(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let puVar1 = 0;
  if ((((-1 < (in_DX | 0)) && (0x1d < in_AX)) && ((((in_DX + unaff_BX)) << 16 >> 16) <= heap.u32(0x00971ed6))) && ((((in_AX + in_CX)) << 16 >> 16) <= heap.u32(0x00971ed8))) {
    puVar1 = ((0x009a013c) >>> 0);
    while (true) {
      if (heap.u32(0x009a1164) <= puVar1) {
        return in_AX;
      }
      if ((((heap.u16((puVar1 + 0x32)) & 1) == 0) && (heap.i16((puVar1 + 0x20)) < (((in_DX + unaff_BX)) << 16 >> 16))) && ((in_DX < (((heap.i16((puVar1 + 0x20)) + heap.i16((puVar1 + 0x24)))) << 16 >> 16) && ((heap.i16((puVar1 + 0x22)) < (((in_AX + in_CX)) << 16 >> 16) && (in_AX < (((heap.i16((puVar1 + 0x22)) + heap.i16((puVar1 + 0x26)))) << 16 >> 16))))))) {
        break;
      }
      puVar1 = ((puVar1 + 0x178) >>> 0);
    }
  }
  return in_AX;
}

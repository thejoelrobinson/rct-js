// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f53.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00458f53(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let unaff_EDI = regs.edi >>> 0;
  bVar2 = ((heap.u32(0x00642fb8)) & 0xff);
  if (((in_EAX) >>> 0) < 0) {
    heap.setU32(unaff_EDI, (0x2d) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
    in_EAX = ((-in_EAX) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (999999999 < in_EAX) {
    bVar3 = ((bVar3 + 1) & 0xff);
    in_EAX = ((in_EAX + 0xc4653600) >>> 0);
  }
  if ((bVar2 | bVar3) != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar4 = ((0x30) & 0xff);
  while (99999999 < in_EAX) {
    bVar4 = ((bVar4 + 1) & 0xff);
    in_EAX = ((in_EAX + 0xfa0a1f00) >>> 0);
  }
  bVar2 = ((bVar2 | bVar3 | bVar4) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar4) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (9999999 < in_EAX) {
    bVar3 = ((bVar3 + 1) & 0xff);
    in_EAX = ((in_EAX - 10000000) >>> 0);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (999999 < in_EAX) {
    bVar3 = ((bVar3 + 1) & 0xff);
    in_EAX = ((in_EAX - 1000000) >>> 0);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (99999 < in_EAX) {
    bVar3 = ((bVar3 + 1) & 0xff);
    in_EAX = ((in_EAX - 100000) >>> 0);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (9999 < in_EAX) {
    bVar3 = ((bVar3 + 1) & 0xff);
    in_EAX = ((in_EAX - 10000) >>> 0);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (true) {
    uVar1 = ((((in_EAX) & 0xffff)) & 0xffff);
    in_EAX = ((((uVar1 - 1000) >>> 0)) >>> 0);
    if (uVar1 < 1000) {
      break;
    }
    bVar3 = ((bVar3 + 1) & 0xff);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (99 < uVar1) {
    bVar3 = ((bVar3 + 1) & 0xff);
    uVar1 = ((uVar1 - 100) & 0xffff);
  }
  bVar2 = ((bVar2 | bVar3) & 0xff);
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  bVar3 = ((0x30) & 0xff);
  while (9 < uVar1) {
    bVar3 = ((bVar3 + 1) & 0xff);
    uVar1 = ((uVar1 - 10) & 0xffff);
  }
  if ((bVar2 | bVar3) != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  }
  heap.setU16(unaff_EDI, (uVar1 + 0x30) & 0xffff);
  return;
}

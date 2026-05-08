// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f53.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00458f53(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let unaff_EDI = 0;
  bVar2 = heap.u32(0x00642fb8);
  if (in_EAX < 0) {
    heap.setU32(unaff_EDI, (0x2d) >>> 0);
    unaff_EDI = unaff_EDI + 1;
    in_EAX = -in_EAX;
  }
  bVar3 = 0x30;
  while (999999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX + 0xc4653600;
  }
  if ((bVar2 | bVar3) != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar4 = 0x30;
  while (99999999 < in_EAX) {
    bVar4 = bVar4 + 1;
    in_EAX = in_EAX + 0xfa0a1f00;
  }
  bVar2 = bVar2 | bVar3 | bVar4;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar4) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (9999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 10000000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 1000000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (99999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 100000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (9999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 10000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (true) {
    uVar1 = in_EAX;
    in_EAX = (uVar1 - 1000);
    if (uVar1 < 1000) {
      break;
    }
    bVar3 = bVar3 + 1;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (99 < uVar1) {
    bVar3 = bVar3 + 1;
    uVar1 = uVar1 - 100;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (9 < uVar1) {
    bVar3 = bVar3 + 1;
    uVar1 = uVar1 - 10;
  }
  if ((bVar2 | bVar3) != 0x30) {
    heap.setU32(unaff_EDI, (bVar3) >>> 0);
    unaff_EDI = unaff_EDI + 1;
  }
  heap.setU32(unaff_EDI, (uVar1 + 0x30) >>> 0);
  return;
}

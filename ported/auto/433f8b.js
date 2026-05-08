// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433f8b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00433f8b(heap) {
  let uVar1 = 0;
  let cVar2 = 0;
  let unaff_EBP = 0;
  if (heap.u32(0x0099c164) != '\0') {
    cVar2 = heap.u32((unaff_EBP + 0x24));
    if (cVar2 == '\x01') {
      uVar1 = heap.u32(0x0062891c) & 1;
    } else {
      if (cVar2 == '\x02') {
      uVar1 = heap.u32(0x0062891c) & 2;
    } else {
      if (cVar2 == '\x03') {
      uVar1 = heap.u32(0x0062891c) & 4;
    } else {
      if (cVar2 == '\x04') {
      uVar1 = heap.u32(0x0062891c) & 8;
    } else {
      if (cVar2 == '\x05') {
      uVar1 = heap.u32(0x0062891c) & 0x10;
    } else {
      if (cVar2 == '\x06') {
      uVar1 = heap.u32(0x0062891c) & 0x20;
    } else {
      if (cVar2 == '\a') {
      uVar1 = heap.u32(0x0062891c) & 0x40;
    } else {
      if (cVar2 == '\b') {
      uVar1 = heap.u32(0x0062891c) & 0x80;
    } else {
      if (cVar2 == '\t') {
      uVar1 = heap.u32(0x0062891c) & 0x100;
    } else {
      if (cVar2 != '\n') {
        return;
      }
      uVar1 = heap.u32(0x0062891c) & 0x200;
    }
    }
    }
    }
    }
    }
    }
    }
    }
    if (uVar1 == 0) {
      heap.setU32(0x00628914, (heap.u32((unaff_EBP + 0x28))) >>> 0);
      heap.setU32(0x00628918, (heap.u32((unaff_EBP + 0x2c))) >>> 0);
      heap.setU32(0x00628910, (heap.u32((unaff_EBP + 0x24))) >>> 0);
    }
  }
  return;
}

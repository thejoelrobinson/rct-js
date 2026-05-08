// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e4198.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e4198(heap) {
  let uVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let unaff_EBX = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
    sVar5 = heap.u32((unaff_EDI + 4)) - heap.u32((unaff_EDI + 2));
    uVar6 = sVar5 - 0x15;
    if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
      uVar6 = sVar5 - 0x20;
    }
    uVar1 = heap.u32((unaff_EBX + 0x36 + unaff_ESI)) * uVar6;
    sVar5 = uVar1;
    uVar3 = heap.u32((unaff_EBX + 0x38 + unaff_ESI));
    if (uVar3 != 0) {
      sVar5 = (uVar1 / uVar3);
    }
    heap.u32((unaff_EBX + 0x3a + unaff_ESI)) = sVar5 + 0xb;
    sVar5 = heap.u32((unaff_EDI + 4)) - heap.u32((unaff_EDI + 2));
    sVar2 = sVar5 + -2;
    if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
      sVar2 = sVar5 + -0xd;
    }
    uVar3 = sVar2 + heap.u32((unaff_EBX + 0x36 + unaff_ESI));
    if (heap.u32((unaff_EBX + 0x38 + unaff_ESI)) != 0) {
      uVar3 = ((uVar3 * uVar6) / heap.u32((unaff_EBX + 0x38 + unaff_ESI)));
    }
    sVar5 = uVar3 + 0xb;
    if ((uVar6 + 10) < (uVar3 + 0xb)) {
      sVar5 = uVar6 + 10;
    }
    heap.u32((unaff_EBX + 0x3c + unaff_ESI)) = sVar5;
  }
  if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
    sVar5 = heap.u32((unaff_EDI + 8)) - heap.u32((unaff_EDI + 6));
    uVar6 = sVar5 - 0x15;
    if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
      uVar6 = sVar5 - 0x20;
    }
    uVar1 = heap.u32((unaff_EBX + 0x3e + unaff_ESI)) * uVar6;
    sVar5 = uVar1;
    uVar3 = heap.u32((unaff_EBX + 0x40 + unaff_ESI));
    if (uVar3 != 0) {
      sVar5 = (uVar1 / uVar3);
    }
    heap.u32((unaff_EBX + 0x42 + unaff_ESI)) = sVar5 + 0xb;
    sVar5 = heap.u32((unaff_EDI + 8)) - heap.u32((unaff_EDI + 6));
    sVar2 = sVar5 + -2;
    if ((heap.u32((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
      sVar2 = sVar5 + -0xd;
    }
    uVar3 = sVar2 + heap.u32((unaff_EBX + 0x3e + unaff_ESI));
    if (heap.u32((unaff_EBX + 0x40 + unaff_ESI)) != 0) {
      uVar3 = ((uVar3 * uVar6) / heap.u32((unaff_EBX + 0x40 + unaff_ESI)));
    }
    uVar4 = uVar3 + 0xb;
    if ((uVar6 + 10) < (uVar3 + 0xb)) {
      uVar4 = uVar6 + 10;
    }
    heap.u32((unaff_EBX + 0x44 + unaff_ESI)) = uVar4;
  }
  return in_EAX;
}

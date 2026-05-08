// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426b73.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00426b73(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5d07 = __sp + 4;
  const __addr_DAT_008ad1c0 = __sp + 8;
  const __addr_DAT_0087d738 = __sp + 12;
  const __addr_DAT_0087d73a = __sp + 16;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  pbVar4 = __addr_DAT_00887420;
  uVar3 = 0;
  heap.setU32(0x0087d0c6, (0) >>> 0);
  do {
    if ((((heap.u32(pbVar4) != 0xff) && (heap.u32(pbVar4 + (0x21) * 4) == 1)) && ((heap.u32((pbVar4 + 2)) & 0x80) == 0)) && ((heap.u32((pbVar4 + 2)) & 0x400) == 0)) {
      uVar3 = uVar3 + heap.u32((byte)(__addr_DAT_005f5d07) + (heap.u32(pbVar4) * 8) * 4);
      if (heap.u32((pbVar4 + 0xf6)) != -1) {
        if (-1 < (heap.u32((pbVar4 + 0xf6)) - heap.u32((pbVar4 + 0xe8)))) {
          heap.setU32(0x0087d0c6, (heap.u32(0x0087d0c6) + (heap.u32((pbVar4 + 0xf6)) - heap.u32((pbVar4 + 0xe8))) * 2) >>> 0);
        }
      }
    }
    pbVar4 = pbVar4 + 0x260;
  } while (pbVar4 < __addr_DAT_008ad1c0);
  if (0xffff < uVar3) {
    uVar3 = 0xffff;
  }
  uVar1 = heap.u32(0x0087cc88) - 200;
  if (heap.u32(0x0087cc88) < 200) {
    uVar1 = 0;
  }
  if (0x289 < uVar1) {
    uVar1 = 0x28a;
  }
  uVar1 = uVar1 + 0x32;
  if (uVar3 < (heap.u32(0x0087c81c) + heap.u32(0x0087c81e))) {
    uVar1 = uVar1 >>> 2;
  }
  if (2000 < (heap.u32(0x0087c81c) + heap.u32(0x0087c81e))) {
    uVar1 = uVar1 >>> 2;
  }
  uVar2 = uVar1;
  if (heap.u32(0x0087d0c6) < heap.u32(0x0087c3c0)) {
    uVar2 = uVar1 >>> 2;
    if (heap.u32(0x0087d0c6) < heap.u32(0x0087c3c0) >>> 1) {
      uVar2 = uVar1 >>> 4;
    }
  }
  uVar3 = 0;
  do {
    if (heap.u32((__addr_DAT_0087d738) + (uVar3 * 2) * 4) != 0) {
      if ((heap.u32((__addr_DAT_0087d73a) + (uVar3 * 2) * 4) == 0) || (heap.u32((__addr_DAT_0087d73a) + (uVar3 * 2) * 4) == 5)) {
        uVar2 = uVar2 - (uVar2 >>> 2);
      } else {
        uVar2 = uVar2 + (uVar2 >>> 2);
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  return uVar2;
} finally {
    heap.freeFrame(20);
  }
}

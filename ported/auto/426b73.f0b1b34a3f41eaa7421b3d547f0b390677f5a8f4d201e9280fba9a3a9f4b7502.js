// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426b73.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00426b73(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let pbVar4 = 0;
  pbVar4 = ((0x00887420) >>> 0);
  uVar3 = ((0) >>> 0);
  heap.setU8(0x0087d0c6, (0) & 0xff);
  do {
    if ((((heap.u8(pbVar4) != 0xff) && (heap.u8(pbVar4 + (0x21)) == 1)) && ((heap.u16((pbVar4 + 2)) & 0x80) == 0)) && ((heap.u16((pbVar4 + 2)) & 0x400) == 0)) {
      uVar3 = ((uVar3 + heap.u32(((0x005f5d07) & 0xff) + (heap.u32(pbVar4) * 8) * 4)) >>> 0);
      if ((heap.i16((pbVar4 + 0xf6)) | 0) != -1) {
        if (-1 < ((((heap.i16((pbVar4 + 0xf6)) - heap.i16((pbVar4 + 0xe8)))) << 16 >> 16) | 0)) {
          heap.setU8(0x0087d0c6, (heap.u8(0x0087d0c6) + (heap.i16((pbVar4 + 0xf6)) - heap.i16((pbVar4 + 0xe8))) * 2) & 0xff);
        }
      }
    }
    pbVar4 = ((pbVar4 + 0x260) >>> 0);
  } while (pbVar4 < 0x008ad1c0);
  if (0xffff < uVar3) {
    uVar3 = ((0xffff) >>> 0);
  }
  uVar1 = ((heap.u32(0x0087cc88) - 200) & 0xffff);
  if (heap.u32(0x0087cc88) < 200) {
    uVar1 = ((0) & 0xffff);
  }
  if (0x289 < uVar1) {
    uVar1 = ((0x28a) & 0xffff);
  }
  uVar1 = ((uVar1 + 0x32) & 0xffff);
  if (((uVar3) & 0xffff) < ((heap.u32(0x0087c81c) + heap.u32(0x0087c81e)) & 0xffff)) {
    uVar1 = ((uVar1 >>> 2) & 0xffff);
  }
  if (2000 < ((heap.u32(0x0087c81c) + heap.u32(0x0087c81e)) & 0xffff)) {
    uVar1 = ((uVar1 >>> 2) & 0xffff);
  }
  uVar2 = ((uVar1) & 0xffff);
  if (heap.u8(0x0087d0c6) < heap.u32(0x0087c3c0)) {
    uVar2 = ((uVar1 >>> 2) & 0xffff);
    if (heap.u8(0x0087d0c6) < heap.u32(0x0087c3c0) >>> 1) {
      uVar2 = ((uVar1 >>> 4) & 0xffff);
    }
  }
  uVar3 = ((0) >>> 0);
  do {
    if (heap.u32((0x0087d738) + (uVar3 * 2) * 4) != 0) {
      if ((heap.u32((0x0087d73a) + (uVar3 * 2) * 4) == 0) || (heap.u32((0x0087d73a) + (uVar3 * 2) * 4) == 5)) {
        uVar2 = ((uVar2 - (uVar2 >>> 2)) & 0xffff);
      } else {
        uVar2 = ((uVar2 + (uVar2 >>> 2)) & 0xffff);
      }
    }
    uVar3 = ((uVar3 + 1) >>> 0);
  } while (uVar3 < 4);
  return uVar2;
}

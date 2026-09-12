// @manual — do not regenerate.
//
// Source: decompiled/c/426b08.c — second-stage init helper.
// Hand-port fix (stride bug, same family as 40179d.js): the FIRST loop
// (bound 0x20) fills 2 byte arrays at 0x87cc8a and 0x87ccaa with 0xff.
// The binary uses BYTE store (`movb $-0x1, 0x87cc8a(%edi)` at 0x426b0a,
// `movb $-0x1, 0x87ccaa(%edi)` at 0x426b11), not u32. The other three
// loops (bound 0x80, base 0x87d104/0x87d314/0x87d518) ARE dword-stride
// in the binary (`c7 04 bd ...`) and were correctly translated.
// The final movw loop at 426b62 has its own separate stride question
// not addressed here.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00426b08(heap) {
  let uVar1 = 0;
  uVar1 = ((0) >>> 0);
  // BYTE-stride fills (see header for the bug).
  do {
    heap.setU8(((0x0087cc8a) + uVar1) >>> 0, 0xff);
    heap.setU8(((0x0087ccaa) + uVar1) >>> 0, 0xff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x20);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d104) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d314) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d518) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d738) + (uVar1 * 2) * 4), (0) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 4);
  return;
}

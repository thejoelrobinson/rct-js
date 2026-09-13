// @manual — do not regenerate.
//
// Source: decompiled/c/4269da.c — peep/AI subsystem init.
// Hand-port fix (stride bug, same family as 40179d.js): the loop at
// line 31 zeros 20 BYTES at DAT_0087d0da. The binary uses BYTE store
// (`movb $0x0, 0x87d0da(%edi)` at 0x426a69), bound 0x14.
// Other writes in this function (the two dword stride loops at 426a9b
// and 426af6 stepping by 4/4 with `[base + edi*4]`) are correct.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00426b08 } from "./426b08.js";
import { FUN_00443f5c } from "./443f5c.js";
export function FUN_004269da(heap) {
  let uVar1 = 0;
  heap.setU32(0x008d7ea4, (0) >>> 0);
  heap.setU32(0x0087c3ac, (0x309) >>> 0);
  heap.setU32(0x0087c3c2, (0x8000) >>> 0);
  heap.setU8((0x0087cba5 + 0), (0x18) & 0xff);
  heap.setU8((0x0087cba5 + 1), (6) & 0xff);
  heap.setU8((0x0087cba5 + 2), (0xe) & 0xff);
  heap.setU32(0x0087c3bc, (0) >>> 0);
  heap.setU32(0x0087c81c, (0) >>> 0);
  heap.setU32(0x0087cba0, (0) >>> 0);
  heap.setU32(0x0087c81e, (0) >>> 0);
  heap.setU32(0x0087c3d6, (0) >>> 0);
  heap.setU32(0x0087cc88, (0) >>> 0);
  heap.setU8(0x0087d0c4, (0) & 0xff);
  heap.setU8(0x0087d0c6, (0) & 0xff);
  heap.setU32(0x0087c3d7, (1) >>> 0);
  heap.setU8(0x0087ccca, (0xff) & 0xff);
  heap.setU8(0x0087cccc, (0xffffffff) & 0xff);
  uVar1 = ((0) >>> 0);
  // BYTE-stride zero-fill of DAT_0087d0da[0..0x14] (see header for the bug).
  do {
    heap.setU8(((0x0087d0da) + uVar1) >>> 0, 0);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x14);
  heap.setU32(0x0087ccd0, (0xffffffff) >>> 0);
  heap.setU32(0x0087ccd5, (0xfffffffe) >>> 0);
  heap.setU32(0x0087ccda, (0xfffffffd) >>> 0);
  (regs.eax = FUN_00443f5c(heap));
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32((((0x0087c3dc) | 0) + uVar1), (0) & 0xffffffff);
    uVar1 = ((uVar1 + 4) >>> 0);
  } while (uVar1 < 8);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32((((0x0087cba5) | 0) + uVar1 * 4 + 3), (0xffffffff) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x38);
  heap.setU32(0x0087c3c0, (100) >>> 0);
  heap.setU32(0x0087c3ca, (0xffff) >>> 0);
  heap.setU32(0x0087c3d0, (0xffff) >>> 0);
  (regs.eax = FUN_00426b08(heap));
  heap.setU32(0x0087c3dc, (0xffffffff) >>> 0);
  heap.setU32(0x0087c3e0, (0x1ffff) >>> 0);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32((0x0087c3fc + uVar1 * 4), (0xffffffff) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 8);
  return;
}

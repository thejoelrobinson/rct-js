// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4269da.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

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
  do {
    heap.setU32(((0x0087d0da) + (uVar1) * 4), (0) & 0xffffffff);
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

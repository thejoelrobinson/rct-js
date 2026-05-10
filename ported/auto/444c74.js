// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444c74.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00444c74(heap) {
  let psVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = regs.ecx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  if (((in_ECX) << 24 >> 24) != heap.i8((unaff_ESI + 8))) {
    bVar2 = ((heap.u8((unaff_ESI + 8))) & 0xff);
    uVar3 = ((heap.u16((unaff_ESI + 4))) & 0xffff);
    uVar4 = ((heap.u16((unaff_ESI + 6))) & 0xffff);
    if (uVar4 == 0xffff) {
      heap.setU16((((0x0087c394) | 0) + ((bVar2) >>> 0)), (uVar3) & 0xffff);
    } else {
      heap.setU32(((0x00743b98) + (((uVar4) >>> 0) * 0x80) * 4), (uVar3) & 0xffffffff);
    }
    if (uVar3 != 0xffff) {
      heap.setU32(((0x00743b9a) + (((uVar3) >>> 0) * 0x80) * 4), (uVar4) & 0xffffffff);
    }
    heap.setU16((unaff_ESI + 6), (0xffff) & 0xffff);
    heap.setI8((unaff_ESI + 8), (((in_ECX) << 24 >> 24)) & 0xff);
    LOCK();
    uVar3 = ((heap.u16((((0x0087c394) | 0) + in_ECX))) & 0xffff);
    heap.setU16((((0x0087c394) | 0) + in_ECX), (heap.u16((unaff_ESI + 10))) & 0xffff);
    UNLOCK();
    heap.setU16((unaff_ESI + 4), (uVar3) & 0xffff);
    if (uVar3 != 0xffff) {
      heap.setU32(((0x00743b9a) + (((uVar3) >>> 0) * 0x80) * 4), (heap.u16((unaff_ESI + 10))) & 0xffffffff);
    }
    psVar1 = (((((0x0087c3a0) | 0) + ((bVar2) >>> 0))) >>> 0);
    heap.setU32(psVar1, (heap.i16(psVar1) + -1) & 0xffffffff);
    heap.setI16((((0x0087c3a0) | 0) + in_ECX), (heap.i16((((0x0087c3a0) | 0) + in_ECX)) + 1) & 0xffff);
  }
  return;
}

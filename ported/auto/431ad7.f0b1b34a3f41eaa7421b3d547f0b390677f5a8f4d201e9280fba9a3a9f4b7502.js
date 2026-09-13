// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431ad7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009bafe6 } from "./9bafe6.js";
export function FUN_00431ad7(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  iVar10 = ((heap.u32(0x00981ef8)) >>> 0);
  iVar9 = ((heap.u32(0x00628920)) >>> 0);
  if (heap.u32(0x00628920) != 0) {
    uVar2 = ((heap.u16((heap.u32(0x00981ef8) + 4))) & 0xffff);
    uVar3 = ((heap.u16((heap.u32(0x00981ef8) + 6))) & 0xffff);
    uVar4 = ((heap.u16((heap.u32(0x00981ef8) + 8))) & 0xffff);
    uVar5 = ((heap.u16((heap.u32(0x00981ef8) + 10))) & 0xffff);
    uVar6 = ((heap.u16((heap.u32(0x00981ef8) + 0xe))) & 0xffff);
    LOCK();
    uVar1 = ((heap.u16((heap.u32(0x00981ef8) + 0xe))) & 0xffff);
    heap.setU16((heap.u32(0x00981ef8) + 0xe), (0) & 0xffff);
    uVar8 = ((((uVar1) >>> 0)) >>> 0);
    UNLOCK();
    bVar7 = ((((uVar1) & 0xff)) & 0xff);
    heap.setI16((iVar10 + 4), (heap.i16((iVar10 + 4)) >>> (bVar7 & 0x1f)) & 0xffff);
    heap.setI16((iVar10 + 6), (heap.i16((iVar10 + 6)) >>> (bVar7 & 0x1f)) & 0xffff);
    heap.setI16((iVar10 + 8), (heap.i16((iVar10 + 8)) >>> (bVar7 & 0x1f)) & 0xffff);
    heap.setI16((iVar10 + 10), (heap.i16((iVar10 + 10)) >>> (bVar7 & 0x1f)) & 0xffff);
    do {
      (regs.eax = FUN_00458bcf(heap, iVar9, iVar10, heap.u16((iVar9 + 8)), heap.u16((iVar9 + 6)), uVar8));
      heap.setU32(0x00971e84, (0xe0) >>> 0);
      (regs.eax = FUN_009bafe6(heap));
      iVar9 = ((heap.i32((iVar9 + 2))) >>> 0);
    } while (iVar9 != 0);
    heap.setU16((iVar10 + 0xe), (uVar6) & 0xffff);
    heap.setU16((iVar10 + 10), (uVar5) & 0xffff);
    heap.setU16((iVar10 + 8), (uVar4) & 0xffff);
    heap.setU16((iVar10 + 6), (uVar3) & 0xffff);
    heap.setU16((iVar10 + 4), (uVar2) & 0xffff);
  }
  return;
}

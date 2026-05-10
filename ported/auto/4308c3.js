// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4308c3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042ee93 } from "./42ee93.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00430113 } from "./430113.js";
export function FUN_004308c3(heap) {
  let cVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  pcVar2 = ((0x00000016) >>> 0);
  (regs.ebx = 0x16, regs.eax = FUN_0042f239(heap));
  pcVar3 = ((0x0099aa88) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar3, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar3 = ((pcVar3 + 1) >>> 0);
  } while (cVar1 != 0);
  pcVar3 = ((0x005f8fb3) >>> 0);
  pcVar2 = ((0x0099a888) >>> 0);
  do {
    pcVar4 = ((pcVar2) >>> 0);
    cVar1 = ((heap.i8(pcVar3)) & 0xff);
    heap.setU32(pcVar4, (cVar1) & 0xffffffff);
    pcVar3 = ((pcVar3 + 1) >>> 0);
    pcVar2 = ((pcVar4 + 1) >>> 0);
  } while (cVar1 != 42);
  pcVar2 = ((0x005f888e) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar4, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar4 = ((pcVar4 + 1) >>> 0);
  } while (cVar1 != 0);
  (regs.eax = FUN_0042ee93(heap));
  heap.setU32(0x0099fb78, (heap.u32(0x0099fb78) & 0xffdfffff) >>> 0);
  (regs.eax = FUN_00430113(heap));
  heap.setU8(0x005f8897, (1) & 0xff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0d60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e698a } from "./5e698a.js";
export function FUN_005e0d60(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  puVar5 = ((0x0099ac8b) >>> 0);
  uVar3 = ((0x5e3c) >>> 0);
  do {
    iVar1 = ((heap.u32((0x008dc0b4) + (uVar3 * 4) * 4)) >>> 0);
    heap.setU32(puVar5, (heap.u32((iVar1 + 0xf5))) & 0xffffffff);
    heap.setU32((puVar5 + (1) * 4), (heap.u32((iVar1 + 0xf9))) & 0xffffffff);
    puVar5 = ((puVar5 + ((2) * 4)) >>> 0);
    uVar3 = ((uVar3 + 1) >>> 0);
  } while (uVar3 < 0x5e57);
  heap.setU32(0x009a1164, (0x009a013c) >>> 0);
  heap.setU32(0x009a1618, (0) >>> 0);
  puVar4 = ((0x009a1168) >>> 0);
  sVar2 = ((9) & 0xffff);
  do {
    heap.setU32(puVar4, (0) & 0xffffffff);
    puVar4 = ((puVar4 + ((10) * 2)) >>> 0);
    sVar2 = ((sVar2 + -1) & 0xffff);
  } while (sVar2 != 0);
  heap.setU32(0x009a121c, (0) >>> 0);
  heap.setU32(0x00991f30, (0) >>> 0);
  heap.setU8(0x00991f36, (0) & 0xff);
  heap.setU8(0x00991f37, (0xff) & 0xff);
  heap.setU32(0x00991f64, (0xffffffff) >>> 0);
  heap.setU32(0x00991f54, (0xffff) >>> 0);
  heap.setU32(0x0099a020, (0) >>> 0);
  heap.setU32(0x0099a4e6, (0xffff) >>> 0);
  (regs.esi = 0x9a121c, regs.eax = FUN_005e698a(heap));
  return;
}

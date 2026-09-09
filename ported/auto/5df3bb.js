// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df3bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uint3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df208 } from "./5df208.js";
export function FUN_005df3bb(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  (regs.eax = FUN_005df208(heap));
  heap.setU8(0x006e2b76, (0x351194e3) & 0xff);
  puVar3 = ((0x0066deea) >>> 0);
  iVar2 = ((0x1e51) >>> 0);
  do {
    uVar1 = (((regs.eax = callIndirect(heap, uint3, heap.u8(0x006e2b76) >>> 8))) >>> 0);
    heap.setU8(0x006e2b76, (CONCAT31(uVar1, heap.u8(0x006e2b76) ^ heap.u8(puVar3 + (-0x23f40a))) << 0xd | ((uVar1 >>> 0xb) >>> 0)) & 0xff);
    puVar3 = ((puVar3 + 1) >>> 0);
    iVar2 = ((iVar2 + -1) >>> 0);
  } while (iVar2 != 0);
  puVar3 = ((0x0066fd3e) >>> 0);
  iVar2 = ((0xbdc) >>> 0);
  do {
    uVar1 = (((regs.eax = callIndirect(heap, uint3, heap.u8(0x006e2b76) >>> 8))) >>> 0);
    heap.setU8(0x006e2b76, (CONCAT31(uVar1, heap.u8(0x006e2b76) ^ heap.u8(puVar3 + (-0x23f40a))) << 0xd | ((uVar1 >>> 0xb) >>> 0)) & 0xff);
    puVar3 = ((puVar3 + 1) >>> 0);
    iVar2 = ((iVar2 + -1) >>> 0);
  } while (iVar2 != 0);
  heap.setU8(0x0099c16a, (0) & 0xff);
  return;
}

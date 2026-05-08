// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df3bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uint3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_005df208 } from "./5df208.js";
export function FUN_005df3bb(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0066deea = __sp + 0;
  const __addr_DAT_0066fd3e = __sp + 4;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  FUN_005df208(heap);
  heap.setU32(0x006e2b76, (0x351194e3) >>> 0);
  puVar3 = __addr_DAT_0066deea;
  iVar2 = 0x1e51;
  do {
    uVar1 = (uint3)(heap.u32(0x006e2b76) >>> 8);
    heap.setU32(0x006e2b76, (CONCAT31(uVar1, heap.u32(0x006e2b76) ^ heap.u32(puVar3 + (-0x23f40a) * 4)) << 0xd | (uVar1 >>> 0xb)) >>> 0);
    puVar3 = puVar3 + 1;
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  puVar3 = __addr_DAT_0066fd3e;
  iVar2 = 0xbdc;
  do {
    uVar1 = (uint3)(heap.u32(0x006e2b76) >>> 8);
    heap.setU32(0x006e2b76, (CONCAT31(uVar1, heap.u32(0x006e2b76) ^ heap.u32(puVar3 + (-0x23f40a) * 4)) << 0xd | (uVar1 >>> 0xb)) >>> 0);
    puVar3 = puVar3 + 1;
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  heap.setU32(0x0099c16a, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(8);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407696.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00407a7d } from "./407a7d.js";
export function FUN_00407696(heap) {
  (regs.eax = FUN_00407a7d(heap));
  if (heap.u32(0x005ec060) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec060)) + 8)), heap.u32(0x005ec060)));
    heap.setU32(0x005ec060, (0x0) >>> 0);
  }
  if (heap.u32(0x005ec064) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 8)), heap.u32(0x005ec064)));
    heap.setU32(0x005ec064, (0x0) >>> 0);
  }
  if (heap.u32(0x005ec05c) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 8)), heap.u32(0x005ec05c)));
    heap.setU32(0x005ec05c, (0x0) >>> 0);
  }
  return;
}

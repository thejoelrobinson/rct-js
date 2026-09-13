// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb52c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00404ba4 } from "./404ba4.js";
import { FUN_00404bc3 } from "./404bc3.js";
export function FUN_009bb52c(heap) {
  heap.setU32(0x009a1550, ((regs.eax = FUN_00404bc3(heap, 0x74))) >>> 0);
  heap.setU32(0x009a1554, ((regs.eax = FUN_00404bc3(heap, 0x6d))) >>> 0);
  heap.setU32(0x009a1558, ((regs.eax = FUN_00404bc3(heap, 0x6e))) >>> 0);
  heap.setU32(0x009a155c, ((regs.eax = FUN_00404bc3(heap, 0x70))) >>> 0);
  heap.setU32(0x009a1560, ((regs.eax = FUN_00404bc3(heap, 0x78))) >>> 0);
  heap.setU32(0x009a1564, ((regs.eax = FUN_00404bc3(heap, 0x77))) >>> 0);
  heap.setU32(0x009a1568, ((regs.eax = FUN_00404bc3(heap, 0x7c))) >>> 0);
  heap.setU32(0x009a156c, ((regs.eax = FUN_00404bc3(heap, 0x83))) >>> 0);
  heap.setU32(0x009a1570, ((regs.eax = FUN_00404bc3(heap, 0x7f))) >>> 0);
  heap.setU32(0x009a1574, ((regs.eax = FUN_00404bc3(heap, 0x80))) >>> 0);
  heap.setU32(0x009a1578, ((regs.eax = FUN_00404bc3(heap, 0x81))) >>> 0);
  heap.setU32(0x009a157c, ((regs.eax = FUN_00404bc3(heap, 0x82))) >>> 0);
  heap.setU32(0x009a1580, ((regs.eax = FUN_00404bc3(heap, 0x84))) >>> 0);
  heap.setU32(0x009a1584, ((regs.eax = FUN_00404bc3(heap, 0x85))) >>> 0);
  heap.setU32(0x009a1588, ((regs.eax = FUN_00404bc3(heap, 0x8a))) >>> 0);
  heap.setU32(0x009a158c, ((regs.eax = FUN_00404bc3(heap, 0x89))) >>> 0);
  heap.setU32(0x009a1590, ((regs.eax = FUN_00404bc3(heap, 0x8b))) >>> 0);
  heap.setU32(0x009a1594, ((regs.eax = FUN_00404bc3(heap, 0x8d))) >>> 0);
  heap.setU32(0x009a1598, ((regs.eax = FUN_00404bc3(heap, 0x8e))) >>> 0);
  heap.setU32(0x009a159c, ((regs.eax = FUN_00404bc3(heap, 0x8f))) >>> 0);
  heap.setU32(0x009a15a0, ((regs.eax = FUN_00404bc3(heap, 0x90))) >>> 0);
  heap.setU32(0x009a15a4, ((regs.eax = FUN_00404bc3(heap, 0x91))) >>> 0);
  return (regs.eax = FUN_00404ba4(heap, heap.u32(0x009a1550)));
}

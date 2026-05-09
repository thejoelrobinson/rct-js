// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cb29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042cb29(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let puVar1 = 0;
  let pcVar2 = 0;
  if (heap.u8(0x008d7eb8) != 0) {
    pcVar2 = ((0x008d8a3c) >>> 0);
    do {
      if (heap.i8(pcVar2) == 0) {
        /* goto LAB_0042cb65 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042cb29/LAB_0042cb65"); return 0;
      }
      pcVar2 = ((pcVar2 + 0x10c) >>> 0);
    } while (pcVar2 < 0x008dbe94);
    pcVar2 = ((0x008d8a3c) >>> 0);
    do {
      heap.setU16(pcVar2, (heap.u16((pcVar2 + 0x10c))) & 0xffff);
      pcVar2 = ((pcVar2 + 2) >>> 0);
    } while (pcVar2 < 0x008dbd88);
    LAB_0042cb65: puVar1 = ((0x008d7eb8) >>> 0);
    do {
      heap.setU16(pcVar2, (heap.u16(puVar1)) & 0xffff);
      puVar1 = ((puVar1 + ((1) * 2)) >>> 0);
      pcVar2 = ((pcVar2 + 2) >>> 0);
    } while (puVar1 < 0x008d7fc4);
    if (pcVar2 < 0x008dbe94) {
      heap.setU32(pcVar2, (0) & 0xffffffff);
    }
    (regs.eax = FUN_005e5301(heap));
    puVar1 = ((0x008d7eb8) >>> 0);
    do {
      heap.setU32(puVar1, (heap.u16(puVar1 + (0x86) * 2)) & 0xffffffff);
      puVar1 = ((puVar1 + ((1) * 2)) >>> 0);
    } while (puVar1 < 0x008d8930);
  }
  return 1;
}

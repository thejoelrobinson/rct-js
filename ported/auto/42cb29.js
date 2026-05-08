// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cb29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042cb29(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  if (heap.u32(0x008d7eb8) != '\0') {
    pcVar2 = 0x008d8a3c;
    do {
      if (heap.u32(pcVar2) == '\0') {
        /* goto LAB_0042cb65 */ throw new Error("goto LAB_0042cb65 not supported");
      }
      pcVar2 = pcVar2 + 0x10c;
    } while (pcVar2 < 0x008dbe94);
    pcVar2 = 0x008d8a3c;
    do {
      heap.u32(pcVar2) = heap.u32((pcVar2 + 0x10c));
      pcVar2 = pcVar2 + 2;
    } while (pcVar2 < 0x008dbd88);
    LAB_0042cb65: puVar1 = 0x008d7eb8;
    do {
      heap.u32(pcVar2) = heap.u32(puVar1);
      puVar1 = puVar1 + 1;
      pcVar2 = pcVar2 + 2;
    } while (puVar1 < 0x008d7fc4);
    if (pcVar2 < 0x008dbe94) {
      heap.u32(pcVar2) = '\0';
    }
    FUN_005e5301(heap);
    puVar1 = 0x008d7eb8;
    do {
      heap.u32(puVar1) = heap.u32(puVar1 + (0x86) * 4);
      puVar1 = puVar1 + 1;
    } while (puVar1 < 0x008d8930);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}

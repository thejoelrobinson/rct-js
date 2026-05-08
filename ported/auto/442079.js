// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442079.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00441ffd } from "./441ffd.js";
export function FUN_00442079(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let iVar2 = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  uVar1 = heap.u32(0x0062d2ff);
  LOCK();
  heap.setU32(0x0062d2ff, (heap.u32(0x0062d2fa)) >>> 0);
  UNLOCK();
  FUN_00441ffd(heap);
  heap.setU32(0x0062d2ff, (uVar1) >>> 0);
  iVar2 = CONCAT22(heap.u32(0x00971e86), unaff_BX);
  if ((heap.u32(0x0062d2de) == -1) && (heap.u32(0x0062d2fa) == '\x01')) {
    iVar2 = CONCAT22(heap.u32(0x00971e86), 0xffff);
  }
  if ((iVar2 == heap.u32(0x0062d2de)) && (ram0x00971e88 == heap.u32(0x0062d2e2))) {
    return CONCAT44(in_EDX, in_EAX);
  }
  return CONCAT44(in_EDX, in_EAX);
}

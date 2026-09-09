// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442079.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ram0x00971e88 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00441ffd } from "./441ffd.js";
export function FUN_00442079(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  uVar1 = ((heap.u8(0x0062d2ff)) & 0xff);
  LOCK();
  heap.setU8(0x0062d2ff, (heap.u8(0x0062d2fa)) & 0xff);
  UNLOCK();
  (regs.eax = FUN_00441ffd(heap));
  heap.setU8(0x0062d2ff, (uVar1) & 0xff);
  iVar2 = ((CONCAT22(heap.u16(0x00971e86), unaff_BX)) >>> 0);
  if (((heap.i16(0x0062d2de) | 0) == -1) && (heap.u8(0x0062d2fa) == 1)) {
    iVar2 = ((CONCAT22(heap.u16(0x00971e86), 0xffff)) >>> 0);
  }
  if ((iVar2 == heap.u32(0x0062d2de)) && (ram0x00971e88 == heap.u32(0x0062d2e2))) {
    return 1;
  }
  return 1;
}

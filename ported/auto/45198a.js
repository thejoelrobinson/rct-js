// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45198a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045198a(heap) {
  let uVar1 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar2 = 0;
  iVar2 = (((in_EDX & 0xff) * 0x260) >>> 0);
  heap.setU32(((0x00887422) + ((in_EDX & 0xff) * 0x130) * 4), (heap.u32((0x00887422) + ((in_EDX & 0xff) * 0x130) * 4) & 0xfeff) & 0xffffffff);
  uVar1 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
  heap.setU16((0x00887566 + iVar2), (heap.i16((0x00887566 + iVar2)) + (uVar1 & 0xff) * ((((100 - (((heap.u16((0x00887566 + iVar2)) >>> 8)) << 24 >> 24)) & 0xff) >>> 2) & 0xffff)) & 0xffff);
  heap.setU32(((0x0088756b) + (iVar2) * 4), (0) & 0xffffffff);
  heap.setU32(((0x0088751d) + (iVar2) * 4), (heap.u32((0x0088751d) + (iVar2) * 4) | 0x1c) & 0xffffffff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444d1f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_0045a930 } from "./45a930.js";
export function FUN_00444d1f(heap) {
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar2 = 0;
  let puVar3 = 0;
  uVar1 = (((regs.eax = FUN_00444c74(heap))) >>> 0);
  (regs.eax = FUN_0045a930(heap));
  heap.setU32(unaff_ESI, (0xff) & 0xffffffff);
  if (heap.u16((unaff_ESI + 0xe)) == 0x8000) {
    uVar2 = ((0x4000) >>> 0);
  } else {
    uVar2 = (((((heap.u16((unaff_ESI + 0xe)) & 0xfe0) << 2 | heap.u16((unaff_ESI + 0x10)) >>> 5) >>> 0)) >>> 0);
  }
  puVar3 = ((0x00991f8e + uVar2) >>> 0);
  while (0x00743b94 + heap.u32(puVar3) * 0x100 != unaff_ESI) {
    puVar3 = ((0x00743b96 + heap.u32(puVar3) * 0x80) >>> 0);
  }
  heap.setU32(puVar3, (heap.u16((unaff_ESI + 2))) & 0xffffffff);
  return uVar1;
}

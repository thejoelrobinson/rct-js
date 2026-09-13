// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4500ad.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00448a45 } from "./448a45.js";
export function FUN_004500ad(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let bVar3 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  uVar2 = ((0) >>> 0);
  do {
    uVar1 = ((heap.u32((0x00887462) + ((in_EDX & 0xff) * 0x130 + (uVar2 >>> 8)) * 4)) & 0xffff);
    if (uVar1 != 0xffff) {
      uVar4 = ((heap.u32(((0x00887452) & 0xffff) + ((in_EDX & 0xff) * 0x260 + (uVar2 >>> 8)) * 4)) & 0xffff);
      for (puVar5 = ((heap.u32((0x00971ef4) + ((((((uVar1 >>> 8) << 0xc | (uVar1 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar1 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); (uVar4 = ((CONCAT11(heap.u8(puVar5), ((uVar4) << 24 >> 24)) & 0x3cff) & 0xffff), (((uVar4 >>> 8)) << 24 >> 24) != 16 || (((uVar4) << 24 >> 24) != heap.u8(puVar5 + (2)))); puVar5 = (((puVar5 + 8) >>> 0)) >>> 0) {
      
      }
      (regs.eax = FUN_00448a45(heap));
    }
    bVar3 = (((((uVar2 >>> 8)) << 24 >> 24) + 1) & 0xff);
    uVar2 = ((((bVar3) >>> 0) << 8) >>> 0);
  } while (bVar3 < 4);
  return 1;
}

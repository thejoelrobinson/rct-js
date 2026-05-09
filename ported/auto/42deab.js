// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42deab.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042deab(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_00444bd4(heap));
  if (!in_ZF) {
    heap.setU16((unaff_ESI + 0x2c), (unaff_BX) & 0xffff);
    heap.setU8((unaff_ESI + (0x14)), (8) & 0xff);
    heap.setU8((unaff_ESI + (9)), (8) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (8) & 0xff);
    heap.setU32(unaff_ESI, (2) & 0xffffffff);
    (regs.eax = FUN_00444927(heap));
    heap.setU8((unaff_ESI + (1)), (2) & 0xff);
    uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    uVar1 = ((((uVar2) & 0xffff)) & 0xffff);
    heap.setU16((unaff_ESI + 0x26), ((uVar1 & 0xff) * 0xc) & 0xffff);
    heap.setU16((unaff_ESI + 0x24), ((uVar1 & 0x7f) + 0x8c) & 0xffff);
    heap.setU16((unaff_ESI + 0x2e), ((((((uVar2 >>> 0x17) & 0xffff) & 0xff) * 5) & 0xffff) >>> 8) & 0xffff);
    heap.setI32((unaff_ESI + 0x38), (((((uVar1) << 16 >> 16)) >>> 0) << 2) & 0xffffffff);
    heap.setI32((unaff_ESI + 0x3c), ((((uVar2) >>> 0) >>> 0x10) << 2) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x40), ((uVar2 >>> 8 & 0xffff) * 4 + 0x10000) & 0xffffffff);
    heap.setU16((unaff_ESI + 0x30), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0x32), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0x34), (0) & 0xffff);
  }
  return 1;
}

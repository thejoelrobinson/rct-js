// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e94d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e94d(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  sVar1 = (((regs.ebx = 0x2, regs.eax = FUN_00444bd4(heap))) & 0xffff);
  if (!in_ZF) {
    heap.setU32(unaff_ESI, (2) & 0xffffffff);
    heap.setU8((unaff_ESI + (1)), (8) & 0xff);
    heap.setU8((unaff_ESI + (0x14)), (9) & 0xff);
    heap.setU8((unaff_ESI + (9)), (0xc) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (9) & 0xff);
    uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    uVar3 = ((((uVar2 >>> 8) & 0xffff) & 0x1e) & 0xffff);
    heap.setU16((unaff_ESI + 0x30), (sVar1 + uVar3) & 0xffff);
    heap.setU16((unaff_ESI + 0x32), (extraout_CX + uVar3) & 0xffff);
    switch (uVar2 & 3) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
    }
    heap.setU8((unaff_ESI + (0x1e)), ((((uVar2 & 3)) << 24 >> 24) << 3) & 0xff);
    (regs.eax = 0xfff, regs.edx = 0x1f0, regs.eax = FUN_00444927(heap));
    heap.setU8((unaff_ESI + (0x48)), (0) & 0xff);
    heap.setU16((unaff_ESI + 0x26), (0) & 0xffff);
  }
  return 1;
}

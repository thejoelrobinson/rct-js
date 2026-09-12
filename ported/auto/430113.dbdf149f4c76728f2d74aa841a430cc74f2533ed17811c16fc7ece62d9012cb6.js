// @manual — do not regenerate.
// Source: decompiled/c/430113.c
//
// Adds a register-prelude before FUN_0042f6a8 that the translator dropped:
// see comment on that call site for details.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f6a8 } from "./42f6a8.js";
import { FUN_0042f6b3 } from "./42f6b3.js";
import { FUN_0042f74a } from "./42f74a.js";
import { FUN_0042fa02 } from "./42fa02.js";
import { FUN_0043018c } from "./43018c.js";
import { FUN_004301a9 } from "./4301a9.js";
export function FUN_00430113(heap) {
  let cVar1 = 0;
  let iVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  let pcVar5 = 0;
  (regs.eax = FUN_0043018c(heap));
  pcVar3 = ((0x005f8fb3) >>> 0);
  pcVar4 = ((0x0099aa88) >>> 0);
  do {
    pcVar5 = ((pcVar4) >>> 0);
    cVar1 = ((heap.i8(pcVar3)) & 0xff);
    heap.setU32(pcVar5, (cVar1) & 0xffffffff);
    pcVar3 = ((pcVar3 + 1) >>> 0);
    pcVar4 = ((pcVar5 + 1) >>> 0);
  } while (cVar1 != 42);
  pcVar4 = ((0x005f92e0) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar4)) & 0xff);
    heap.setU32(pcVar5, (cVar1) & 0xffffffff);
    pcVar4 = ((pcVar4 + 1) >>> 0);
    pcVar5 = ((pcVar5 + 1) >>> 0);
  } while (cVar1 != 0);
  heap.setU8(0x005f8d35, (0) & 0xff);
  iVar2 = (((regs.eax = FUN_004083e1(heap, 0x0099aa88))) >>> 0);
  if ((iVar2 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar2) >>> 0);
    (regs.eax = FUN_0042f6b3(heap));
    // FUN_0042f6a8 is a "process N bytes via 42f77c" wrapper whose call
    // convention is ECX=count, ESI=pointer. Binary asm at 0x43015f..0x430164:
    //   mov esi, 0x99c16c
    //   mov ecx, 0x3a10
    //   call 42f6a8
    // The translator dropped these register-arg MOVs because Ghidra's C
    // decompile didn't surface them (calling-convention params, not C
    // args), which left 42f6a8's `do { ... } while (extraout_ECX != 1)`
    // looping forever. See ported/auto/42f6a8.js for the hand-port that
    // reads regs.esi / regs.ecx.
    regs.esi = 0x0099c16c >>> 0;
    regs.ecx = 0x3a10;
    (regs.eax = FUN_0042f6a8(heap));
    (regs.eax = FUN_0042f74a(heap));
    (regs.eax = FUN_0042fa02(heap));
    (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
  }
  return (regs.eax = FUN_004301a9(heap));
}

// @manual — do not regenerate.
// Source: decompiled/c/441596.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_00441596(heap) {
  let bVar1 = 0;
  let cVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar3 = 0;
  let pbVar4 = 0;
  let pcVar5 = 0;
  pcVar3 = ((heap.u32((0x006302d8) + (in_EAX) * 4)) >>> 0);
  (regs.eax = FUN_00458bcf(heap));
  for (pbVar4 = ((0x0099a888) >>> 0); bVar1 = ((heap.u8(pbVar4)) & 0xff), bVar1 != 0; pbVar4 = (((pbVar4 + 1) >>> 0)) >>> 0) {
    if ((0x60 < bVar1) && (bVar1 < 0x7b)) {
      heap.setU8(pbVar4, (heap.u8(pbVar4) - 0x20) & 0xff);
    }
  }
  pcVar5 = ((0x0099a888) >>> 0);
  do {
    cVar2 = ((heap.i8(pcVar3)) & 0xff);
    if ((((cVar2 + 1)) << 24 >> 24) != heap.i8(pcVar5)) {
      return 1;
    }
    pcVar5 = ((pcVar5 + 1) >>> 0);
    pcVar3 = ((pcVar3 + 1) >>> 0);
  } while ((cVar2 | 0) != -1);
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4442d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004442d3(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let pbVar3 = 0;
  let puVar4 = 0;
  pbVar3 = ((0x00887420) >>> 0);
  uVar2 = ((0) & 0xffff);
  do {
    if ((heap.u8(pbVar3) != 0xff) && (heap.u32((0x005f5e88) + (heap.u32(pbVar3) * 4) * 4) != 0xff)) {
      uVar2 = ((uVar2 | 1 << (heap.u32(((0x005f5e88) & 0xff) + (heap.u32(pbVar3) * 4) * 4) & 0xf)) & 0xffff);
    }
    pbVar3 = ((pbVar3 + 0x260) >>> 0);
  } while (pbVar3 < 0x008ad1c0);
  uVar2 = ((uVar2 & 0xa3e0) & 0xffff);
  puVar4 = ((0x00630980) >>> 0);
  while (true) {
    uVar1 = ((0) & 0xffff);
    if (uVar2 != 0) {
      for (; (uVar2 >>> uVar1 & 1) == 0; uVar1 = (((uVar1 + 1) & 0xffff)) >>> 0) {
      
      }
    }
    if (uVar2 == 0) {
      break;
    }
    heap.setU32(puVar4, (((uVar1) << 24 >> 24)) & 0xffffffff);
    puVar4 = ((puVar4 + 1) >>> 0);
    uVar2 = ((uVar2 & ~(1 << (uVar1 & 0xf))) & 0xffff);
  }
  heap.setU32(puVar4, (0xff) & 0xffffffff);
  return 1;
}

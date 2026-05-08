// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4442d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_004442d3(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  pbVar3 = 0x00887420;
  uVar2 = 0;
  do {
    if ((heap.u32(pbVar3) != 0xff) && (heap.u32((0x005f5e88) + ((uint) * pbVar3 * 4) * 4) != 0xff)) {
      uVar2 = uVar2 | 1 << (heap.u32((byte)(0x005f5e88) + ((uint) * pbVar3 * 4) * 4) & 0xf);
    }
    pbVar3 = pbVar3 + 0x260;
  } while (pbVar3 < 0x008ad1c0);
  uVar2 = uVar2 & 0xa3e0;
  puVar4 = 0x00630980;
  while (true) {
    uVar1 = 0;
    if (uVar2 != 0) {
      for (; (uVar2 >>> uVar1 & 1) == 0; uVar1 = uVar1 + 1) {
      
      }
    }
    if (uVar2 == 0) {
      break;
    }
    heap.u32(puVar4) = uVar1;
    puVar4 = puVar4 + 1;
    uVar2 = uVar2 & ~(1 << (uVar1 & 0xf));
  }
  heap.u32(puVar4) = 0xff;
  return CONCAT44(heap, in_EDX, in_EAX);
}

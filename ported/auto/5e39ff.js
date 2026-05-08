// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e39ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e117d } from "./5e117d.js";
export function FUN_005e39ff(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = 0;
  uVar2 = 0xffff;
  if ((((heap.u32(0x00991f36) == '\x05') || (heap.u32(0x00991f36) == '\x02')) && (heap.u32(0x00991f37) == heap.u32((unaff_ESI + 0x174)))) && ((heap.u32(0x00991f38) == heap.u32((unaff_ESI + 0x30)) && ((heap.u32(0x00991f30) & 1) != 0)))) {
    uVar2 = heap.u32(0x00991f3c);
  }
  sVar3 = -1;
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u32(0x00991f5a) == heap.u32((unaff_ESI + 0x174)))) && (heap.u32(0x00991f58) == heap.u32((unaff_ESI + 0x30)))) {
    sVar3 = heap.u32(0x00991f5c);
  }
  uVar4 = 0;
  for (pcVar5 = heap.u32((unaff_ESI + 0x1c)); cVar1 = heap.u32(pcVar5), cVar1 != '\x15'; pcVar5 = pcVar5 + 0x10) {
    if ((((cVar1 == '\x04') || (cVar1 == '\x02')) && ((heap.u32((pcVar5 + 10)) & 0x80000000) != 0)) && ((((heap.u32((unaff_ESI + 0x14 + (uVar4 >>> 3))) >>> (uVar4 & 7) & 1) != 0 || (uVar2 == uVar4)) || (sVar3 == uVar4)))) {
      FUN_005e117d(heap);
    }
    uVar4 = uVar4 + 1;
  }
  return;
}

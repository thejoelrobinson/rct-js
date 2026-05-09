// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444b4a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00444b4a(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let pcVar3 = 0;
  let puVar4 = 0;
  let uVar5 = 0;
  puVar4 = ((0x00991f8e) >>> 0);
  for (iVar2 = ((0x4001) >>> 0); iVar2 != 0; iVar2 = (((iVar2 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar4, (0xffff) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 2)) >>> 0);
  }
  pcVar3 = ((0x00743b94) >>> 0);
  do {
    if ((heap.i8(pcVar3) | 0) != -1) {
      if (heap.u16((pcVar3 + 0xe)) == 0x8000) {
        uVar5 = ((0x4000) >>> 0);
      } else {
        uVar5 = (((((heap.u16((pcVar3 + 0xe)) & 0xfe0) << 2 | heap.u16((pcVar3 + 0x10)) >>> 5) >>> 0)) >>> 0);
      }
      LOCK();
      uVar1 = ((heap.u32((0x00991f8e) + (uVar5) * 4)) & 0xffff);
      heap.setU32(((0x00991f8e) + (uVar5) * 4), (heap.u16((pcVar3 + 10))) & 0xffffffff);
      UNLOCK();
      heap.setU16((pcVar3 + 2), (uVar1) & 0xffff);
    }
    pcVar3 = ((pcVar3 + 0x100) >>> 0);
  } while (pcVar3 < 0x0087c394);
  return;
}

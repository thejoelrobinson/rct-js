// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444b4a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_00444b4a(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b94 = __sp + 4;
  const __addr_DAT_0087c394 = __sp + 8;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar5 = 0;
  puVar4 = __addr_DAT_00991f8e;
  for (iVar2 = 0x4001; iVar2 != 0; iVar2 = iVar2 + -1) {
    heap.u32(puVar4) = 0xffff;
    puVar4 = puVar4 + 1;
  }
  pcVar3 = __addr_DAT_00743b94;
  do {
    if (heap.u32(pcVar3) != -1) {
      if (heap.u32((pcVar3 + 0xe)) == 0x8000) {
        uVar5 = 0x4000;
      } else {
        uVar5 = ((heap.u32((pcVar3 + 0xe)) & 0xfe0) << 2 | heap.u32((pcVar3 + 0x10)) >>> 5);
      }
      LOCK();
      uVar1 = heap.u32((__addr_DAT_00991f8e) + (uVar5) * 4);
      heap.u32((__addr_DAT_00991f8e) + (uVar5) * 4) = heap.u32((pcVar3 + 10));
      UNLOCK(heap);
      heap.u32((pcVar3 + 2)) = uVar1;
    }
    pcVar3 = pcVar3 + 0x100;
  } while (pcVar3 < __addr_DAT_0087c394);
  return;
} finally {
    heap.freeFrame(12);
  }
}

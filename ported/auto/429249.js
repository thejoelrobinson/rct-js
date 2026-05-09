// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429249.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00429249(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  sVar2 = ((0) & 0xffff);
  uVar3 = ((0) & 0xffff);
  do {
    uVar4 = ((0) & 0xffff);
    do {
      pbVar5 = ((heap.u32((0x00971ef4) + (((((uVar4 << 7 | uVar4 >>> 9 | uVar3) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      bVar1 = ((heap.u8(pbVar5)) & 0xff);
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = ((pbVar5 + 8) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
      }
      if ((heap.u8(pbVar5 + (7)) & 0x30) != 0) {
        sVar2 = ((sVar2 + 1) & 0xffff);
      }
      uVar4 = ((uVar4 + 0x20) & 0xffff);
    } while (uVar4 < 0x1000);
    uVar3 = ((uVar3 + 0x20) & 0xffff);
  } while (uVar3 < 0x1000);
  if (sVar2 != heap.u8(0x0087d0c2)) {
    heap.setU8(0x0087d0c2, (sVar2) & 0xff);
    (regs.eax = FUN_005e5301(heap));
  }
  return;
}

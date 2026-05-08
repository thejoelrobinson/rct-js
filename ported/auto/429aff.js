// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429aff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_00429aff(heap) {
  let sVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let unaff_ESI = 0;
  let in_CF = 0;
  let bVar6 = 0;
  sVar4 = heap.u32(0x00971ed8);
  sVar2 = FUN_005e68e2(heap);
  if (!in_CF) {
    psVar1 = heap.u32((unaff_ESI + 8));
    heap.u32((unaff_ESI + 0x24)) = sVar2;
    sVar5 = sVar4;
    if ((heap.u32(0x0099a500) & 1) == 0) {
      sVar5 = sVar4 + -0x40;
    }
    heap.u32((unaff_ESI + 0x26)) = sVar5;
    heap.setU32(0x005f5114, (sVar2 + -1) >>> 0);
    heap.setU32(0x005f5118, (sVar5 + -1) >>> 0);
    heap.u32(psVar1) = sVar2;
    heap.u32(psVar1 + (1) * 4) = sVar5;
    heap.u32(psVar1 + (6) * 4) = sVar2 << (heap.u32((psVar1 + 8)) & 0x1f);
    heap.u32(psVar1 + (7) * 4) = sVar5 << (heap.u32((psVar1 + 8)) & 0x1f);
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b(heap);
  if (!bVar6) {
    if (uVar3 < 0x280) {
      uVar3 = 0x280;
    }
    heap.u32((unaff_ESI + 0x24)) = uVar3;
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b(heap);
  if (!bVar6) {
    heap.u32((unaff_ESI + 0x22)) = sVar4 + -0x22;
    if (uVar3 < 0x280) {
      uVar3 = 0x280;
    }
    heap.u32((unaff_ESI + 0x24)) = uVar3;
    heap.setU32(0x005f52fc, (uVar3 - 1) >>> 0);
    heap.setU32(0x005f530c, (uVar3 - 3) >>> 0);
    heap.setU32(0x005f530a, (uVar3 - 0x76) >>> 0);
    heap.setU32(0x005f52fa, (uVar3 - 0x78) >>> 0);
    heap.setU32(0x005f52bc, (uVar3 - 0x79) >>> 0);
    heap.setU32(0x005f52cc, (uVar3 - 0x7b) >>> 0);
    heap.setU32(0x005f52ec, (uVar3 - 0x7e) >>> 0);
    heap.setU32(0x005f52ea, (uVar3 - 0x95) >>> 0);
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b(heap);
  if (!bVar6) {
    heap.u32((unaff_ESI + 0x20)) = (uVar3 >>> 1) - 0xa4;
    heap.u32((unaff_ESI + 0x22)) = sVar4 + -0x66;
  }
  bVar6 = true;
  sVar4 = FUN_005e3b2b(heap);
  if (!bVar6) {
    heap.u32((unaff_ESI + 0x20)) = sVar4 + -200;
  }
  return;
}

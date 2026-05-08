// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3628.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_005d3628(heap) {
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let bVar11 = 0;
  let unaff_ESI = 0;
  let in_CF = 0;
  bVar11 = FUN_005e68e2(heap);
  if (in_CF) {
    return;
  }
  iVar10 = heap.u32((unaff_ESI + 8));
  if (bVar11 == 1) {
    puVar1 = (iVar10 + 0x12);
    uVar2 = heap.u32(puVar1);
    heap.u32(puVar1) = heap.u32(puVar1) | 1;
  } else {
    if (bVar11 < 2) {
      puVar1 = (iVar10 + 0x12);
      uVar2 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xfffe;
      puVar1 = (iVar10 + 0x12);
      uVar3 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xfffd;
      puVar1 = (iVar10 + 0x12);
      uVar4 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xfffb;
      puVar1 = (iVar10 + 0x12);
      uVar5 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xfff7;
      puVar1 = (iVar10 + 0x12);
      uVar6 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xefff;
      puVar1 = (iVar10 + 0x12);
      uVar7 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xffdf;
      puVar1 = (iVar10 + 0x12);
      uVar8 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xffef;
      puVar1 = (iVar10 + 0x12);
      uVar9 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xffbf;
      if ((((((((((uVar2 & 1) != 0) * '\x02' + ((uVar3 >>> 1 & 1) != 0)) * '\x02' + ((uVar4 >>> 2 & 1) != 0)) * '\x02' + ((uVar5 >>> 3 & 1) != 0)) * '\x02' + ((uVar6 >>> 0xc & 1) != 0)) * '\x02' + ((uVar7 >>> 5 & 1) != 0)) * '\x02' + ((uVar8 >>> 4 & 1) != 0)) * '\x02' + ((uVar9 >>> 6 & 1) != 0)) == '\0') {
        return;
      }
      /* goto LAB_005d3692 */ throw new Error("goto LAB_005d3692 not supported");
    }
    puVar1 = (iVar10 + 0x12);
    uVar2 = heap.u32(puVar1) >>> 5;
    heap.u32(puVar1) = heap.u32(puVar1) | 0x20;
  }
  if ((uVar2 & 1) != 0) {
    return;
  }
  LAB_005d3692: FUN_005e43de(heap);
  return;
}

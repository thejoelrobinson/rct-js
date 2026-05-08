// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd1c4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/win32.js";
import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005dd1c4(heap) {
  let bVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let sVar4 = 0;
  let bVar5 = 0;
  let in_EAX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let local_22 = 0;
  let local_21 = 0;
  iVar10 = (in_EDX & 0xff) * 0x260;
  pbVar11 = 0x00887420 + iVar10;
  local_22 = heap.u32((0x0088749b) + (iVar10) * 4);
  local_21 = heap.u32((0x0088749a) + (iVar10) * 4);
  uVar6 = heap.u32((uint)(byte)(0x00887421) + (iVar10) * 4);
  bVar5 = heap.u32((0x005f6be6) + (uVar6 * 4) * 4);
  if (bVar5 == 0xff) {
    uVar6 = 0;
    uVar8 = 0xff;
    do {
      if ((heap.u32((0x0088744a) + ((in_EDX & 0xff) * 0x130 + uVar6) * 4) != -1) && (heap.u32(pbVar11 + (uVar6 + 0x36) * 4) < uVar8)) {
        uVar8 = heap.u32(pbVar11 + (uVar6 + 0x36) * 4);
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    if (uVar8 == -1) {
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    bVar5 = heap.u32((0x005f6be5) + (heap.u32((uint)(byte)(0x00887421) + (iVar10) * 4) * 4) * 4);
    bVar1 = heap.u32((0x005f5d03) + ((uint) * pbVar11 * 8) * 4);
    do {
      FUN_005ddbe1(heap);
      uVar6 = 0;
      uVar9 = 0;
      for (pbVar11 = 0x0065ea78; bVar2 = heap.u32(pbVar11), bVar2 != 0xff; pbVar11 = pbVar11 + 1) {
        uVar6 = uVar6 + heap.u32((0x005f6f1c + bVar2 * 8));
        uVar9 = uVar9 + heap.u32((0x005f6f20 + bVar2 * 8));
      }
      if ((uVar6 <= uVar8 * 0x44180) && (uVar9 <= (ushort)(bVar1 * 0x100))) {
        /* goto LAB_005dd294 */ throw new Error("goto LAB_005dd294 not supported");
      }
      bVar5 = bVar5 - 1;
    } while (bVar5 != 0);
    bVar5 = 1;
    LAB_005dd294: bVar1 = heap.u32((0x005f6be4) + (heap.u32((uint)(byte)(0x00887421) + (iVar10) * 4) * 4) * 4);
    if (local_22 < bVar1) {
      local_22 = bVar1;
    }
    if (bVar5 < bVar1) {
      bVar5 = bVar1;
    }
    if (bVar5 <= local_22) {
      local_22 = bVar5;
    }
    heap.u32((0x0088749d) + (iVar10) * 4) = bVar5 | bVar1 << 4;
    FUN_005ddbe1(heap);
    uVar6 = 0;
    for (pbVar11 = 0x0065ea78; heap.u32(pbVar11) != 0xff; pbVar11 = pbVar11 + 1) {
      uVar6 = uVar6 + heap.u32((0x005f6f1c + (uint) * pbVar11 * 8));
    }
    uVar7 = uVar6 >>> 1;
    if (local_22 != 1) {
      uVar7 = uVar6 >>> 2;
    }
    bVar5 = 0;
    do {
      bVar5 = bVar5 + 1;
      uVar7 = uVar7 + uVar6;
    } while (uVar7 <= uVar8 * 0x44180);
    if (0xc < bVar5) {
      bVar5 = 0xc;
    }
    cVar3 = heap.u32((0x00887424) + (iVar10) * 4);
    if ((((cVar3 == '\x04') || (cVar3 == '\x02')) || (cVar3 == '\x03')) || (cVar3 == '\x17')) {
      bVar5 = 1;
    }
    heap.u32((0x0088749c) + (iVar10) * 4) = bVar5;
    if (bVar5 <= local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(heap, local_21, local_22);
  } else {
    heap.u32((0x0088749c) + (iVar10) * 4) = bVar5;
    bVar1 = heap.u32((0x005f6be5) + (uVar6 * 4) * 4);
    heap.u32((0x0088749d) + (iVar10) * 4) = heap.u32((0x005f6be4) + (uVar6 * 4) * 4) << 4 | bVar1;
    if (bVar5 < local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(heap, local_21, bVar1);
  }
  if (sVar4 != CONCAT11(heap, heap.u32((0x00887498) + (iVar10) * 4), heap.u32((0x00887499) + (iVar10) * 4))) {
    heap.u32((0x00887499) + (iVar10) * 4) = sVar4;
    heap.u32((0x00887498) + (iVar10) * 4) = (sVar4 >>> 8);
    FUN_005e5301(heap);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}

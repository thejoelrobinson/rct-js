// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd1c4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005dd1c4(heap) {
  const __sp = heap.allocFrame(68);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_0088749b = __sp + 4;
  const __addr_DAT_0088749a = __sp + 8;
  const __addr_DAT_00887421 = __sp + 12;
  const __addr_DAT_005f6be6 = __sp + 16;
  const __addr_DAT_0088744a = __sp + 20;
  const __addr_DAT_005f6be5 = __sp + 24;
  const __addr_DAT_005f5d03 = __sp + 28;
  const __addr_DAT_0065ea78 = __sp + 32;
  const __addr_DAT_005f6f1c = __sp + 36;
  const __addr_DAT_005f6f20 = __sp + 40;
  const __addr_DAT_005f6be4 = __sp + 44;
  const __addr_DAT_0088749d = __sp + 48;
  const __addr_DAT_00887424 = __sp + 52;
  const __addr_DAT_0088749c = __sp + 56;
  const __addr_DAT_00887498 = __sp + 60;
  const __addr_DAT_00887499 = __sp + 64;
  try {
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
  pbVar11 = __addr_DAT_00887420 + iVar10;
  local_22 = heap.u32((__addr_DAT_0088749b) + (iVar10) * 4);
  local_21 = heap.u32((__addr_DAT_0088749a) + (iVar10) * 4);
  uVar6 = heap.u32((byte)(__addr_DAT_00887421) + (iVar10) * 4);
  bVar5 = heap.u32((__addr_DAT_005f6be6) + (uVar6 * 4) * 4);
  if (bVar5 == 0xff) {
    uVar6 = 0;
    uVar8 = 0xff;
    do {
      if ((heap.u32((__addr_DAT_0088744a) + ((in_EDX & 0xff) * 0x130 + uVar6) * 4) != -1) && (heap.u32(pbVar11 + (uVar6 + 0x36) * 4) < uVar8)) {
        uVar8 = heap.u32(pbVar11 + (uVar6 + 0x36) * 4);
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    if (uVar8 == -1) {
      return CONCAT44(in_EDX, in_EAX);
    }
    bVar5 = heap.u32((__addr_DAT_005f6be5) + (heap.u32((byte)(__addr_DAT_00887421) + (iVar10) * 4) * 4) * 4);
    bVar1 = heap.u32((__addr_DAT_005f5d03) + (heap.u32(pbVar11) * 8) * 4);
    do {
      FUN_005ddbe1(heap);
      uVar6 = 0;
      uVar9 = 0;
      for (pbVar11 = __addr_DAT_0065ea78; bVar2 = heap.u32(pbVar11), bVar2 != 0xff; pbVar11 = pbVar11 + 1) {
        uVar6 = uVar6 + heap.u32((__addr_DAT_005f6f1c + bVar2 * 8));
        uVar9 = uVar9 + heap.u32((__addr_DAT_005f6f20 + bVar2 * 8));
      }
      if ((uVar6 <= uVar8 * 0x44180) && (uVar9 <= (bVar1 * 0x100))) {
        /* goto LAB_005dd294 */ throw new Error("goto LAB_005dd294 not supported");
      }
      bVar5 = bVar5 - 1;
    } while (bVar5 != 0);
    bVar5 = 1;
    LAB_005dd294: bVar1 = heap.u32((__addr_DAT_005f6be4) + (heap.u32((byte)(__addr_DAT_00887421) + (iVar10) * 4) * 4) * 4);
    if (local_22 < bVar1) {
      local_22 = bVar1;
    }
    if (bVar5 < bVar1) {
      bVar5 = bVar1;
    }
    if (bVar5 <= local_22) {
      local_22 = bVar5;
    }
    heap.u32((__addr_DAT_0088749d) + (iVar10) * 4) = bVar5 | bVar1 << 4;
    FUN_005ddbe1(heap);
    uVar6 = 0;
    for (pbVar11 = __addr_DAT_0065ea78; heap.u32(pbVar11) != 0xff; pbVar11 = pbVar11 + 1) {
      uVar6 = uVar6 + heap.u32((__addr_DAT_005f6f1c + heap.u32(pbVar11) * 8));
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
    cVar3 = heap.u32((__addr_DAT_00887424) + (iVar10) * 4);
    if ((((cVar3 == '\x04') || (cVar3 == '\x02')) || (cVar3 == '\x03')) || (cVar3 == '\x17')) {
      bVar5 = 1;
    }
    heap.u32((__addr_DAT_0088749c) + (iVar10) * 4) = bVar5;
    if (bVar5 <= local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(local_21, local_22);
  } else {
    heap.u32((__addr_DAT_0088749c) + (iVar10) * 4) = bVar5;
    bVar1 = heap.u32((__addr_DAT_005f6be5) + (uVar6 * 4) * 4);
    heap.u32((__addr_DAT_0088749d) + (iVar10) * 4) = heap.u32((__addr_DAT_005f6be4) + (uVar6 * 4) * 4) << 4 | bVar1;
    if (bVar5 < local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(local_21, bVar1);
  }
  if (sVar4 != CONCAT11(heap.u32((__addr_DAT_00887498) + (iVar10) * 4), heap.u32((__addr_DAT_00887499) + (iVar10) * 4))) {
    heap.u32((__addr_DAT_00887499) + (iVar10) * 4) = sVar4;
    heap.u32((__addr_DAT_00887498) + (iVar10) * 4) = (sVar4 >>> 8);
    FUN_005e5301(heap);
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(68);
  }
}

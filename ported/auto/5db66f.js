// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db66f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT11 } from "../runtime/ghidra-builtins.js";
import { FUN_005db615 } from "./5db615.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005db66f(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0065247a = __sp + 0;
  const __addr_DAT_008874a1 = __sp + 4;
  const __addr_DAT_00652478 = __sp + 8;
  const __addr_DAT_008874a2 = __sp + 12;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let extraout_ECX_03 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let extraout_DX = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_ESI = 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  iVar6 = heap.u32((unaff_ESI + 0x30)) * 0x260;
  sVar1 = CONCAT11(((heap.u32((unaff_ESI + 0x10)) + heap.u32((__addr_DAT_0065247a) + ((heap.u32((byte)(__addr_DAT_008874a1) + (iVar6) * 4) & 3) * 2) * 4)) >>> 5), ((heap.u32((unaff_ESI + 0xe)) + heap.u32((__addr_DAT_00652478) + ((heap.u32((byte)(__addr_DAT_008874a1) + (iVar6) * 4) & 3) * 2) * 4)) >>> 5));
  if (sVar1 == heap.u32((__addr_DAT_008874a2 + iVar6))) {
    heap.u32((unaff_ESI + 0x51)) = 1;
    heap.u32((unaff_ESI + 0x36)) = sVar1;
    return;
  }
  heap.u32((unaff_ESI + 0x51)) = 0;
  uVar2 = FUN_005df40c(heap);
  uVar8 = uVar2;
  if (uVar2 < 0) {
    uVar5 = (((heap.u32((__addr_DAT_008874a2 + iVar6)) & 0xff) * 0x20 - heap.u32((__addr_DAT_00652478) + ((heap.u32((__addr_DAT_008874a1 + iVar6)) & 3) * 2) * 4)) + 0x10) - heap.u32((unaff_ESI + 0xe));
    uVar2 = uVar5;
    if (uVar5 < 0) {
      uVar2 = -uVar5;
    }
    uVar4 = (((heap.u32((__addr_DAT_008874a2 + iVar6)) >>> 8) * 0x20 - heap.u32((__addr_DAT_0065247a) + ((heap.u32((__addr_DAT_008874a1 + iVar6)) & 3) * 2) * 4)) + 0x10) - heap.u32((unaff_ESI + 0x10));
    uVar9 = uVar4;
    if (uVar4 < 0) {
      uVar9 = -uVar4;
    }
    if (uVar9 < uVar2) {
      uVar8 = 2;
      if (uVar5 < 0) {
        uVar8 = 0;
      }
    } else {
      uVar8 = 1;
      if (uVar4 < 0) {
        uVar8 = 3;
      }
    }
  }
  uVar7 = uVar8 & 3;
  uVar3 = extraout_ECX;
  if (uVar7 != extraout_ECX) {
    uVar5 = heap.u32((unaff_ESI + 0x38)) + heap.u32((__addr_DAT_00652478) + (uVar7 * 2) * 4);
    bVar10 = CARRY2(heap.u32((unaff_ESI + 0x3a)), heap.u32((__addr_DAT_0065247a) + (uVar7 * 2) * 4));
    uVar11 = FUN_005db615(heap);
    uVar2 = (uVar11 >>> 0x20);
    uVar8 = uVar11;
    uVar3 = extraout_ECX_00;
    if (!bVar10) {
      /* goto LAB_005db808 */ throw new Error("goto LAB_005db808 not supported");
    }
  }
  uVar7 = uVar8 + 1 & 3;
  if (uVar7 != uVar3) {
    uVar5 = heap.u32((unaff_ESI + 0x38)) + heap.u32((__addr_DAT_00652478) + (uVar7 * 2) * 4);
    bVar10 = CARRY2(heap.u32((unaff_ESI + 0x3a)), heap.u32((__addr_DAT_0065247a) + (uVar7 * 2) * 4));
    uVar11 = FUN_005db615(heap);
    uVar2 = (uVar11 >>> 0x20);
    uVar8 = uVar11;
    uVar3 = extraout_ECX_01;
    if (!bVar10) {
      /* goto LAB_005db808 */ throw new Error("goto LAB_005db808 not supported");
    }
  }
  uVar7 = uVar8 - 1 & 3;
  if (uVar7 != uVar3) {
    uVar5 = heap.u32((unaff_ESI + 0x38)) + heap.u32((__addr_DAT_00652478) + (uVar7 * 2) * 4);
    bVar10 = CARRY2(heap.u32((unaff_ESI + 0x3a)), heap.u32((__addr_DAT_0065247a) + (uVar7 * 2) * 4));
    uVar11 = FUN_005db615(heap);
    uVar2 = (uVar11 >>> 0x20);
    uVar8 = uVar11;
    uVar3 = extraout_ECX_02;
    if (!bVar10) {
      /* goto LAB_005db808 */ throw new Error("goto LAB_005db808 not supported");
    }
  }
  uVar8 = uVar8 + 2 & 3;
  if (uVar8 != uVar3) {
    uVar5 = heap.u32((unaff_ESI + 0x38)) + heap.u32((__addr_DAT_00652478) + (uVar8 * 2) * 4);
    bVar10 = CARRY2(heap.u32((unaff_ESI + 0x3a)), heap.u32((__addr_DAT_0065247a) + (uVar8 * 2) * 4));
    FUN_005db615(heap);
    uVar3 = extraout_ECX_03;
    uVar2 = extraout_DX;
    if (!bVar10) {
      /* goto LAB_005db808 */ throw new Error("goto LAB_005db808 not supported");
    }
  }
  uVar5 = heap.u32((unaff_ESI + 0x38)) + heap.u32((__addr_DAT_00652478) + (uVar3 * 2) * 4);
  uVar2 = heap.u32((unaff_ESI + 0x3a)) + heap.u32((__addr_DAT_0065247a) + (uVar3 * 2) * 4);
  LAB_005db808: heap.u32((unaff_ESI + 0x36)) = CONCAT11((uVar2 >>> 5), (uVar5 >>> 5));
  return;
} finally {
    heap.freeFrame(16);
  }
}

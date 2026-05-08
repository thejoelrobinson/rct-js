// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4243eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_004243eb(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00991f04 = __sp + 0;
  const __addr_DAT_005f438a = __sp + 4;
  const __addr_DAT_005f419a = __sp + 8;
  const __addr_PTR_LAB_00431bb8 = __sp + 12;
  const __addr_DAT_00991f06 = __sp + 16;
  const __addr_DAT_005f43a0 = __sp + 20;
  const __addr_DAT_005f4188 = __sp + 24;
  const __addr_DAT_005f4189 = __sp + 28;
  const __addr_PTR_LAB_00432204 = __sp + 32;
  try {
  let in_EAX = 0;
  let sVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let uVar5 = 0;
  let unaff_EBX = 0;
  let uVar6 = 0;
  let unaff_EBP = 0;
  let uVar7 = 0;
  let unaff_ESI = 0;
  let iVar8 = 0;
  let unaff_EDI = 0;
  if ((heap.u32(0x00991f8c) & 8) == 0) {
    if ((heap.u32(0x00991f2b) & 1) == 0) {
      LAB_004247d8: return CONCAT44(heap, in_EDX, in_EAX);
    }
    heap.setU32(0x005f4728, (0xffff) >>> 0);
    uVar4 = in_EDX;
    uVar5 = in_EDX;
    uVar6 = unaff_EBX;
    if (uVar4 < heap.u32((__addr_DAT_00991f04 + unaff_EBX * 4))) {
      heap.setU32(0x005f4728, (uVar4) >>> 0);
      uVar2 = uVar4 - heap.u32((__addr_DAT_005f438a + unaff_EDI * 2));
      if (uVar2 < 0) {
        /* goto LAB_004247d8 */ throw new Error("goto LAB_004247d8 not supported");
      }
      iVar8 = heap.u32(0x00991f88) * 2;
      puVar9 = __addr_DAT_005f419a + iVar8;
      uVar7 = heap.u32(puVar9 + (unaff_EBX * 8) * 4);
      if (uVar2 <= heap.u32((__addr_DAT_00991f04 + uVar7 * 4))) {
        puVar9 = (iVar8 + 0x5f41e2);
        uVar7 = heap.u32(puVar9 + (unaff_EBX * 8) * 4);
        if (uVar2 <= heap.u32((__addr_DAT_00991f04 + uVar7 * 4))) {
          puVar9 = (iVar8 + 0x5f422a);
          uVar7 = heap.u32(puVar9 + (unaff_EBX * 8) * 4);
          if (uVar2 <= heap.u32((__addr_DAT_00991f04 + uVar7 * 4))) {
            puVar9 = (iVar8 + 0x5f4272);
            uVar7 = heap.u32(puVar9 + (unaff_EBX * 8) * 4);
            if (uVar2 <= heap.u32((__addr_DAT_00991f04 + uVar7 * 4))) {
              /* goto LAB_004247e0 */ throw new Error("goto LAB_004247e0 not supported");
            }
          }
        }
      }
      if (3 < heap.u32(puVar9 + (unaff_EBX * 8 + 1) * 4)) {
        LAB_004247e0: return CONCAT44(heap, in_EDX, in_EAX);
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      unaff_EBX = uVar7;
      in_EDX = extraout_EDX;
    }
    if ((((heap.u32((__addr_DAT_00991f06) + (unaff_EBX * 4) * 4) & 0x20) == 0) && (5 < (in_EDX - heap.u32((__addr_DAT_00991f04 + unaff_EBX * 4))))) && (heap.u32((__addr_DAT_005f43a0 + unaff_EDI * 4)) != 0)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(unaff_EBP, unaff_EDI);
      sVar3 = heap.u32((__addr_DAT_00991f04 + unaff_EBX * 4)) + 6;
      uVar7 = in_EDX;
    } else {
      sVar3 = heap.u32((__addr_DAT_00991f04 + unaff_EBX * 4));
      uVar7 = in_EDX;
    }
    in_EDX = uVar5;
    uVar5 = uVar7 & 0xffff;
    uVar4 = sVar3 + 0x10U & 0xfff0;
    if (uVar7 < uVar4) {
      uVar4 = uVar7;
    }
    sVar1 = uVar4 - sVar3;
    if (sVar1 != 0 && sVar3 <= uVar4) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(unaff_EBP, uVar5, unaff_EDI);
    }
    uVar4 = sVar3 + sVar1;
    while (true) {
      uVar2 = uVar4 + 0x10;
      if (uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(unaff_EBP, uVar5, unaff_EDI);
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if (uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if (uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if (uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar4 = uVar4 + sVar3;
    }
    heap.u32((__addr_DAT_00991f04 + unaff_EBX * 4)) = heap.u32(0x005f4728);
    heap.u32((__addr_DAT_00991f06) + (unaff_EBX * 4) * 4) = 0x20;
    if (in_EAX != 0) {
      heap.setU32(0x0099a4ec, (in_EDX) >>> 0);
      uVar7 = (uint)(ushort)(in_EAX + heap.u32(0x0099a4ec));
      heap.setU32(0x0099a4e8, (heap.u32((ushort)(byte)(__addr_DAT_005f4188) + (uVar6 * 2) * 4)) >>> 0);
      heap.setU32(0x0099a4ea, (heap.u32((ushort)(byte)(__addr_DAT_005f4189) + (uVar6 * 2) * 4)) >>> 0);
      uVar5 = in_EDX;
      while (true) {
        uVar2 = uVar5;
        uVar4 = uVar2 + 0x10;
        if (uVar7 < (ushort)(uVar2 + 0x10)) {
          uVar4 = uVar7;
        }
        sVar3 = uVar4 - uVar2;
        if (uVar4 < uVar2 || sVar3 == 0) {
          break;
        }
        in_EAX = (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(unaff_EBP, uVar7, unaff_EDI, uVar5, sVar3, uVar6, unaff_ESI);
        uVar5 = (uint)(ushort)(uVar2 + sVar3);
      }
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(36);
  }
}

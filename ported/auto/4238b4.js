// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4238b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31, CONCAT44 } from "../runtime/win32.js";
export function FUN_004238b4(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_005f43d2 = __sp + 0;
  const __addr_PTR_LAB_00432204 = __sp + 4;
  const __addr_DAT_005f45c4 = __sp + 8;
  const __addr_PTR_LAB_00431bb8 = __sp + 12;
  const __addr_DAT_005f442c = __sp + 16;
  const __addr_DAT_005f444b = __sp + 20;
  const __addr_DAT_005f4444 = __sp + 24;
  const __addr_DAT_005f4445 = __sp + 28;
  const __addr_DAT_005f4446 = __sp + 32;
  const __addr_DAT_005f444a = __sp + 36;
  const __addr_PTR_LAB_004328e0 = __sp + 40;
  try {
  let iVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let extraout_DX = 0;
  let in_EDX = 0;
  let unaff_EBP = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = 0;
  let bVar9 = 0;
  let uVar3 = 0;
  heap.setU32(0x005f4949, (0) >>> 0);
  if (((heap.u32(0x00991f8c) & 8) != 0) || ((heap.u32(0x00991f2b) & 1) == 0)) {
    return CONCAT44(heap, in_EDX, in_EAX) & 0xffffffffffffff00;
  }
  uVar4 = heap.u32(0x00991f28) + 0xf;
  uVar7 = CONCAT22(heap, (unaff_ESI >>> 0x10), uVar4) & 0xfffffff0;
  uVar6 = uVar7;
  if (in_EDX < uVar6) {
    LAB_00423c4a: return CONCAT44(heap, in_EDX, in_EAX) & 0xffffffffffffff00;
  }
  uVar2 = (ushort)(in_EDX - uVar6) >>> 4;
  uVar3 = uVar2;
  if ((heap.u32(0x00991f2a) & 0x20) == 0) {
    uVar8 = (undefined2)(uVar7 >>> 0x10);
    if ((heap.u32(0x00991f2a) & 0x10) == 0) {
      if ((heap.u32(0x00991f2a) & 0xf) == 0) {
        /* goto LAB_00423a9a */ throw new Error("goto LAB_00423a9a not supported");
      }
      uVar3 = (uint)(ushort)(uVar2 - 1);
      if (uVar2 == 0) {
        /* goto LAB_00423c4a */ throw new Error("goto LAB_00423c4a not supported");
      }
      if (heap.u32((__addr_DAT_005f43d2 + unaff_EDI * 8)) != 0) {
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
        (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
        uVar7 = (uint)(ushort)(uVar7 + 0x10);
        heap.setU32(0x005f4949, (1) >>> 0);
        /* goto LAB_00423a9a */ throw new Error("goto LAB_00423a9a not supported");
      }
      uVar7 = CONCAT22(heap, uVar8, uVar6 + 0x10);
    } else {
      uVar3 = (uint)(ushort)(uVar2 - 2);
      if (uVar2 < 2) {
        /* goto LAB_00423c4a */ throw new Error("goto LAB_00423c4a not supported");
      }
      if (heap.u32((__addr_DAT_005f43d2 + unaff_EDI * 8)) != 0) {
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
        (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))((ushort)(heap.u32((__addr_DAT_005f43d2 + unaff_EDI * 8)) + heap.u32((__addr_DAT_005f45c4 + (heap.u32(0x00991f2a) & 0x1f) * 2))) | unaff_EBP);
        sVar5 = uVar7;
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, (extraout_DX + 0x12) >>> 0);
        (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
        heap.setU32(0x005f4949, (1) >>> 0);
        uVar7 = (uint)(ushort)(sVar5 + 0x20);
        /* goto LAB_00423a9a */ throw new Error("goto LAB_00423a9a not supported");
      }
      uVar7 = CONCAT22(heap, uVar8, uVar6 + 0x20);
    }
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(uVar7, unaff_EBP);
  heap.setU32(0x005f4949, (1) >>> 0);
  LAB_00423a9a: uVar4 = uVar3;
  do {
    uVar6 = uVar7;
    if (uVar4 == 0) {
      LAB_00423b53: iVar1 = heap.u32(0x00991f88);
      if (((in_EAX != 0) && (in_EAX = (uint)(ushort)(in_EAX - 1), heap.u32((__addr_DAT_005f442c + unaff_EDI * 2)) != 0)) && (heap.u32((__addr_DAT_005f444b) + (in_EAX * 8) * 4) != '\0')) {
        heap.setU32(0x0099a4e8, (heap.u32((ushort)(byte)(__addr_DAT_005f4444) + (in_EAX * 8) * 4)) >>> 0);
        heap.setU32(0x0099a4ea, (heap.u32((ushort)(byte)(__addr_DAT_005f4445) + (in_EAX * 8) * 4)) >>> 0);
        heap.setU32(0x0099a4ec, (heap.u32((__addr_DAT_005f4446) + (in_EAX * 8) * 4) + uVar6) >>> 0);
        if ((heap.u32((__addr_DAT_005f444a) + (in_EAX * 8) * 4) == '\0') || (heap.u32(0x0099a4f0) == 0)) {
          in_EAX = (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(unaff_EBP, unaff_EDI, uVar3);
          heap.setU32(0x005f4949, (1) >>> 0);
        } else {
          heap.setU32(0x005f4949, (1) >>> 0);
          bVar9 = false;
          in_EAX = (heap.u32(heap.u32((__addr_PTR_LAB_004328e0) + (heap.u32(0x00991f88)) * 4)))();
          if (!bVar9) {
            heap.u32((heap.u32(0x0099a4f0) + 0x1c)) = iVar1;
          }
        }
      }
      return CONCAT44(heap, in_EDX, CONCAT31(heap, (int3)(in_EAX >>> 8), heap.u32(0x005f4949)));
    }
    while (true) {
      sVar5 = uVar7;
      uVar4 = uVar3;
      if ((((uVar7 & 0x10) != 0) || (uVar4 < 2)) || ((sVar5 + 0x10) == heap.u32(0x00991f2c))) {
        break;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar6 = sVar5 + 0x20;
      uVar7 = uVar6;
      heap.setU32(0x005f4949, (1) >>> 0);
      uVar3 = (uint)(ushort)(uVar4 - 2);
      if ((ushort)(uVar4 - 2) == 0) {
        uVar3 = 0;
        /* goto LAB_00423b53 */ throw new Error("goto LAB_00423b53 not supported");
      }
    }
    (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(uVar7, unaff_EBP);
    uVar7 = (uint)(ushort)(sVar5 + 0x10);
    heap.setU32(0x005f4949, (1) >>> 0);
    uVar4 = uVar4 - 1;
    uVar3 = uVar4;
  } while (true);
} finally {
    heap.freeFrame(44);
  }
}

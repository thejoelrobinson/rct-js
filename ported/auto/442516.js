// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442516.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_0042c711 } from "./42c711.js";
export function FUN_00442516(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_008ad1c0 = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00743b98 = __sp + 12;
  const __addr_DAT_00743bc2 = __sp + 16;
  const __addr_DAT_00743bbe = __sp + 20;
  const __addr_DAT_00743c46 = __sp + 24;
  const __addr_DAT_00743c44 = __sp + 28;
  const __addr_DAT_00743c59 = __sp + 32;
  const __addr_DAT_005f5b78 = __sp + 36;
  const __addr_stack0x00000000 = __sp + 40;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let unaff_EBX = 0;
  let uVar5 = 0;
  let unaff_EBP = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let unaff_EDI = 0;
  pcVar6 = __addr_DAT_00887420;
  uVar3 = in_EDX & 0xffff0000;
  do {
    if (heap.u32(pcVar6) != -1) {
      uVar3 = CONCAT22(heap, (uVar3 >>> 0x10), uVar3 + 1);
    }
    pcVar6 = pcVar6 + 0x260;
  } while (pcVar6 < __addr_DAT_008ad1c0);
  heap.setU32(0x0087d7a0, (uVar3) >>> 0);
  uVar5 = unaff_EBX & 0xffff0000;
  uVar2 = 0;
  uVar3 = uVar3 & 0xffff0000;
  heap.setU32(0x006293cd, (0) >>> 0);
  for (uVar7 = CONCAT22(heap, (pcVar6 >>> 0x10), heap.u32(0x0087c398)); bVar4 = uVar5, uVar7 != -1; uVar7 = CONCAT22(heap, ((uint)(__addr_DAT_00743b94 + iVar8) >>> 0x10), heap.u32((__addr_DAT_00743b98) + ((uVar7 & 0xffff) * 0x80) * 4))) {
    iVar8 = (uVar7 & 0xffff) * 0x100;
    if (((heap.u32((__addr_DAT_00743bc2) + (iVar8) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar8) * 4) == '\0')) && (heap.u32((byte)(__addr_DAT_00743c46) + (iVar8) * 4) < 6)) {
      bVar1 = heap.u32((__addr_DAT_00743c44) + (iVar8) * 4);
      in_EAX = bVar1;
      if (bVar1 == 0x14) {
        if ((heap.u32((__addr_DAT_00743c59) + (iVar8) * 4) == -1) || (unaff_EBP = heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32((uint)(byte)(__addr_DAT_00743c59) + (iVar8) * 4) * 0x260) * 4), (heap.u32((__addr_DAT_005f5b78 + unaff_EBP * 8)) & 0x800000) == 0)) {
          uVar5 = CONCAT31(heap, (int3)(uVar5 >>> 8), bVar4 + 1);
        }
      } else {
        if (bVar1 == 0x15) {
        if ((heap.u32((__addr_DAT_00743c59) + (iVar8) * 4) == -1) || (unaff_EBP = heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32((uint)(byte)(__addr_DAT_00743c59) + (iVar8) * 4) * 0x260) * 4), (heap.u32((__addr_DAT_005f5b78 + unaff_EBP * 8)) & 0x1000000) == 0)) {
          uVar5 = CONCAT22(heap, (uVar5 >>> 0x10), CONCAT11(heap, (uVar5 >>> 8) + '\x01', bVar4));
        }
      } else {
        if (bVar1 == 0x16) {
        if ((heap.u32((__addr_DAT_00743c59) + (iVar8) * 4) == -1) || (unaff_EBP = heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32((uint)(byte)(__addr_DAT_00743c59) + (iVar8) * 4) * 0x260) * 4), (heap.u32((__addr_DAT_005f5b78 + unaff_EBP * 8)) & 0x2000000) == 0)) {
          uVar2 = CONCAT31(heap, (int3)(uVar2 >>> 8), uVar2 + '\x01');
        }
      } else {
        if (bVar1 == 0x1a) {
        uVar2 = CONCAT11(heap, (uVar2 >>> 8) + '\x01', uVar2);
      } else {
        if (bVar1 == 0x1f) {
        uVar3 = CONCAT31(heap, (int3)(uVar3 >>> 8), uVar3 + '\x01');
      } else {
        if (bVar1 == 0x21) {
        uVar3 = CONCAT22(heap, (uVar3 >>> 0x10), CONCAT11(heap, (uVar3 >>> 8) + '\x01', uVar3));
      } else {
        if (bVar1 == 0x10) {
        heap.setU32(0x006293cd, (heap.u32(0x006293cd) + '\x01') >>> 0);
      } else {
        if (bVar1 == 0x1b) {
        heap.setU32(0x006293ce, (heap.u32(0x006293ce) + '\x01') >>> 0);
      }
      }
      }
      }
      }
      }
      }
      }
    }
  }
  if (heap.u32(0x0087d728) == '\0') {
    if ((0x18 < bVar4) && (in_EAX = (uint)(heap.u32(0x0087c81c) >>> 5), (byte)(heap.u32(0x0087c81c) >>> 5) <= bVar4)) {
      heap.setU32(0x0087d728, ('\x04') >>> 0);
      FUN_0042c711(heap);
    }
  } else {
    heap.setU32(0x0087d728, (heap.u32(0x0087d728) + -1) >>> 0);
  }
  if (heap.u32(0x0087d729) == '\0') {
    if ((0x18 < (byte)(uVar5 >>> 8)) && (in_EAX = (uint)(heap.u32(0x0087c81c) >>> 5), (byte)(heap.u32(0x0087c81c) >>> 5) <= uVar5)) {
      heap.setU32(0x0087d729, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000);
    }
  } else {
    heap.setU32(0x0087d729, (heap.u32(0x0087d729) + -1) >>> 0);
  }
  if (heap.u32(0x0087d72a) == '\0') {
    if ((0x1b < uVar2) && (in_EAX = (uint)(heap.u32(0x0087c81c) >>> 5), (byte)(heap.u32(0x0087c81c) >>> 5) <= uVar5)) {
      heap.setU32(0x0087d72a, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
    }
  } else {
    heap.setU32(0x0087d72a, (heap.u32(0x0087d72a) + -1) >>> 0);
  }
  if (heap.u32(0x0087d72b) == '\0') {
    if (0x13 < (byte)(uVar2 >>> 8)) {
      heap.setU32(0x0087d72b, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
    }
  } else {
    heap.setU32(0x0087d72b, (heap.u32(0x0087d72b) + -1) >>> 0);
  }
  if (heap.u32(0x0087d72c) == '\0') {
    if (0x13 < uVar3) {
      heap.setU32(0x0087d72c, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
    }
  } else {
    heap.setU32(0x0087d72c, (heap.u32(0x0087d72c) + -1) >>> 0);
  }
  if (heap.u32(0x0087d72d) == '\0') {
    if (0xe < (byte)(uVar3 >>> 8)) {
      heap.setU32(0x0087d72d, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
    }
  } else {
    heap.setU32(0x0087d72d, (heap.u32(0x0087d72d) + -1) >>> 0);
  }
  if (heap.u32(0x0087d72e) == '\0') {
    if (heap.u32(0x006293ce) < 8) {
      if (7 < heap.u32(0x006293cd)) {
        heap.setU32(0x0087d72e, ('\x04') >>> 0);
        FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
      }
    } else {
      heap.setU32(0x0087d72e, ('\x04') >>> 0);
      FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX);
    }
  } else {
    heap.setU32(0x0087d72e, (heap.u32(0x0087d72e) + -1) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(44);
  }
}

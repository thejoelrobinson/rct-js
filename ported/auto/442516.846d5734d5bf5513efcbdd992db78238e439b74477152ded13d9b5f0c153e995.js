// @manual — do not regenerate.
// Source: decompiled/c/442516.c
// Fix: Ghidra `(int3)X` is a 3-byte truncation cast; translator emitted
// `callIndirect(heap, int3, X)` — replaced with `(X & 0xffffff)`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
export function FUN_00442516(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar5 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let pcVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let unaff_EDI = regs.edi >>> 0;
  pcVar6 = ((0x00887420) >>> 0);
  uVar3 = ((in_EDX & 0xffff0000) >>> 0);
  do {
    if ((heap.i8(pcVar6) | 0) != -1) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), ((uVar3) << 16 >> 16) + 1)) >>> 0);
    }
    pcVar6 = ((pcVar6 + 0x260) >>> 0);
  } while (pcVar6 < 0x008ad1c0);
  heap.setU16(0x0087d7a0, (((uVar3) & 0xffff)) >>> 0);
  uVar5 = ((unaff_EBX & 0xffff0000) >>> 0);
  uVar2 = ((0) >>> 0);
  uVar3 = ((uVar3 & 0xffff0000) >>> 0);
  heap.setU8(0x006293cd, (0) & 0xff);
  for (uVar7 = ((CONCAT22((((((pcVar6) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x0087c398))) >>> 0); bVar4 = ((((uVar5) & 0xff)) & 0xff), (((uVar7) << 16 >> 16) | 0) != -1; uVar7 = (((CONCAT22((((((0x00743b94 + iVar8) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32((0x00743b98) + ((uVar7 & 0xffff) * 0x80) * 4))) >>> 0)) >>> 0) {
    iVar8 = (((uVar7 & 0xffff) * 0x100) >>> 0);
    if (((heap.u32((0x00743bc2) + (iVar8) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar8) * 4) == 0)) && (heap.u32(((0x00743c46) & 0xff) + (iVar8) * 4) < 6)) {
      bVar1 = ((heap.u32((0x00743c44) + (iVar8) * 4)) & 0xff);
      in_EAX = ((((bVar1) >>> 0)) >>> 0);
      if (bVar1 == 0x14) {
        if (((heap.u32((0x00743c59) + (iVar8) * 4) | 0) == -1) || (unaff_EBP = ((heap.u32(((0x00887420) >>> 0) + (heap.u32(((0x00743c59) >>> 0) + (iVar8) * 4) * 0x260) * 4)) >>> 0), (heap.u32((0x005f5b78 + unaff_EBP * 8)) & 0x800000) == 0)) {
          uVar5 = ((CONCAT31((uVar5 >>> 8) & 0xffffff, bVar4 + 1)) >>> 0);
        }
      } else {
        if (bVar1 == 0x15) {
        if (((heap.u32((0x00743c59) + (iVar8) * 4) | 0) == -1) || (unaff_EBP = ((heap.u32(((0x00887420) >>> 0) + (heap.u32(((0x00743c59) >>> 0) + (iVar8) * 4) * 0x260) * 4)) >>> 0), (heap.u32((0x005f5b78 + unaff_EBP * 8)) & 0x1000000) == 0)) {
          uVar5 = ((CONCAT22((((uVar5 >>> 0x10)) << 16 >> 16), CONCAT11((((uVar5 >>> 8)) << 24 >> 24) + 1, bVar4))) >>> 0);
        }
      } else {
        if (bVar1 == 0x16) {
        if (((heap.u32((0x00743c59) + (iVar8) * 4) | 0) == -1) || (unaff_EBP = ((heap.u32(((0x00887420) >>> 0) + (heap.u32(((0x00743c59) >>> 0) + (iVar8) * 4) * 0x260) * 4)) >>> 0), (heap.u32((0x005f5b78 + unaff_EBP * 8)) & 0x2000000) == 0)) {
          uVar2 = ((CONCAT31((uVar2 >>> 8) & 0xffffff, ((uVar2) << 24 >> 24) + 1)) >>> 0);
        }
      } else {
        if (bVar1 == 0x1a) {
        uVar2 = ((((CONCAT11((((uVar2 >>> 8)) << 24 >> 24) + 1, ((uVar2) << 24 >> 24))) >>> 0)) >>> 0);
      } else {
        if (bVar1 == 0x1f) {
        uVar3 = ((CONCAT31((uVar3 >>> 8) & 0xffffff, ((uVar3) << 24 >> 24) + 1)) >>> 0);
      } else {
        if (bVar1 == 0x21) {
        uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), CONCAT11((((uVar3 >>> 8)) << 24 >> 24) + 1, ((uVar3) << 24 >> 24)))) >>> 0);
      } else {
        if (bVar1 == 0x10) {
        heap.setU8(0x006293cd, (heap.u8(0x006293cd) + 1) & 0xff);
      } else {
        if (bVar1 == 0x1b) {
        heap.setU8(0x006293ce, (heap.u8(0x006293ce) + 1) & 0xff);
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
  if (heap.u8(0x0087d728) == 0) {
    if ((0x18 < bVar4) && (in_EAX = ((((heap.u32(0x0087c81c) >>> 5) >>> 0)) >>> 0), ((heap.u32(0x0087c81c) >>> 5) & 0xff) <= bVar4)) {
      heap.setU8(0x0087d728, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap));
    }
  } else {
    heap.setU8(0x0087d728, (heap.u8(0x0087d728) + -1) & 0xff);
  }
  if (heap.u8(0x0087d729) == 0) {
    if ((0x18 < ((uVar5 >>> 8) & 0xff)) && (in_EAX = ((((heap.u32(0x0087c81c) >>> 5) >>> 0)) >>> 0), ((heap.u32(0x0087c81c) >>> 5) & 0xff) <= ((uVar5) & 0xff))) {
      heap.setU8(0x0087d729, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000));
    }
  } else {
    heap.setU8(0x0087d729, (heap.u8(0x0087d729) + -1) & 0xff);
  }
  if (heap.u8(0x0087d72a) == 0) {
    if ((0x1b < ((uVar2) & 0xff)) && (in_EAX = ((((heap.u32(0x0087c81c) >>> 5) >>> 0)) >>> 0), ((heap.u32(0x0087c81c) >>> 5) & 0xff) <= ((uVar5) & 0xff))) {
      heap.setU8(0x0087d72a, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
    }
  } else {
    heap.setU8(0x0087d72a, (heap.u8(0x0087d72a) + -1) & 0xff);
  }
  if (heap.u8(0x0087d72b) == 0) {
    if (0x13 < ((uVar2 >>> 8) & 0xff)) {
      heap.setU8(0x0087d72b, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
    }
  } else {
    heap.setU8(0x0087d72b, (heap.u8(0x0087d72b) + -1) & 0xff);
  }
  if (heap.u8(0x0087d72c) == 0) {
    if (0x13 < ((uVar3) & 0xff)) {
      heap.setU8(0x0087d72c, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
    }
  } else {
    heap.setU8(0x0087d72c, (heap.u8(0x0087d72c) + -1) & 0xff);
  }
  if (heap.u8(0x0087d72d) == 0) {
    if (0xe < ((uVar3 >>> 8) & 0xff)) {
      heap.setU8(0x0087d72d, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
    }
  } else {
    heap.setU8(0x0087d72d, (heap.u8(0x0087d72d) + -1) & 0xff);
  }
  if (heap.u8(0x0087d72e) == 0) {
    if (heap.u8(0x006293ce) < 8) {
      if (7 < heap.u8(0x006293cd)) {
        heap.setU8(0x0087d72e, (4) & 0xff);
        (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
      }
    } else {
      heap.setU8(0x0087d72e, (4) & 0xff);
      (regs.eax = FUN_0042c711(heap, unaff_EDI, uVar7, unaff_EBP, __addr_stack0x00000000, uVar5, uVar3, uVar2, in_EAX));
    }
  } else {
    heap.setU8(0x0087d72e, (heap.u8(0x0087d72e) + -1) & 0xff);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}

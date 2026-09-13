// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/428ec0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00428ec0(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let in_EDX = regs.edx >>> 0;
  let sVar7 = 0;
  let iVar8 = 0;
  let pcVar9 = 0;
  let local_1c = 0;
  uVar4 = ((((((in_EAX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  uVar2 = ((heap.u32(0x0087c81c)) & 0xffff);
  if (1999 < heap.u32(0x0087c81c)) {
    uVar2 = ((2000) & 0xffff);
  }
  uVar5 = ((0) & 0xffff);
  sVar7 = ((0) & 0xffff);
  for (uVar6 = ((heap.u32(0x0087c398)) & 0xffff); uVar6 != 0xffff; uVar6 = (((heap.u32((0x00743b98) + (((uVar6) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
    iVar8 = ((((uVar6) >>> 0) * 0x100) >>> 0);
    if ((heap.u32((0x00743bc2) + (iVar8) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar8) * 4) == 0)) {
      if (0x80 < heap.u32(((0x00743bce) & 0xff) + (iVar8) * 4)) {
        uVar5 = ((uVar5 + 1) & 0xffff);
      }
      if (((heap.u16((0x00743c5c + iVar8)) & 1) != 0) && (heap.u32(((0x00743c5a) & 0xff) + (iVar8) * 4) < 0x5a)) {
        sVar7 = ((sVar7 + 1) & 0xffff);
      }
    }
  }
  sVar1 = ((0x28a - (0x96 - (uVar2 / 0xd & 0xff))) & 0xffff);
  if (heap.u32(0x0087c81c) != 0) {
    uVar2 = (((((((uVar5) >>> 0) * 300) / heap.u32(0x0087c81c)) & 0xffff)) & 0xffff);
    if (0xf9 < uVar2) {
      uVar2 = ((0xfa) & 0xffff);
    }
    sVar1 = ((sVar1 + uVar2 * 2) & 0xffff);
  }
  if (-1 < ((((sVar7 + -0x19)) << 16 >> 16) | 0)) {
    sVar1 = ((sVar1 + (sVar7 + -0x19) * -7) & 0xffff);
  }
  uVar6 = ((0) & 0xffff);
  uVar2 = ((0) & 0xffff);
  pcVar9 = ((0x00887420) >>> 0);
  do {
    if ((heap.i8(pcVar9) | 0) != -1) {
      uVar2 = ((uVar2 + (100 - ((((heap.i8(pcVar9 + (0x149))) & 0xff)) & 0xffff))) & 0xffff);
      uVar6 = ((uVar6 + 1) & 0xffff);
    }
    pcVar9 = ((pcVar9 + 0x260) >>> 0);
  } while (pcVar9 < 0x008ad1c0);
  sVar1 = ((sVar1 + -200) & 0xffff);
  if (uVar6 != 0) {
    sVar1 = ((sVar1 + (uVar2 / uVar6) * 2) & 0xffff);
  }
  pcVar9 = ((0x00887420) >>> 0);
  uVar2 = ((0) & 0xffff);
  uVar6 = ((0) & 0xffff);
  do {
    if (((heap.i8(pcVar9) | 0) != -1) && ((heap.i16((pcVar9 + 0xf0)) | 0) != -1)) {
      uVar2 = ((uVar2 + (heap.u16((pcVar9 + 0xf0)) >>> 3)) & 0xffff);
      uVar6 = ((uVar6 + (heap.u16((pcVar9 + 0xf2)) >>> 3)) & 0xffff);
    }
    pcVar9 = ((pcVar9 + 0x260) >>> 0);
  } while (pcVar9 < 0x008ad1c0);
  if (999 < uVar2) {
    uVar2 = ((1000) & 0xffff);
  }
  if (999 < uVar6) {
    uVar6 = ((1000) & 0xffff);
  }
  uVar3 = ((0) & 0xffff);
  for (uVar5 = ((heap.u32(0x0087c39c)) & 0xffff); uVar5 != 0xffff; uVar5 = (((heap.u32((0x00743b98) + (((uVar5) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
    if (0x1dff < ((heap.i32((0x00743bb8 + ((uVar5) >>> 0) * 0x100)) - heap.u32(0x006e3b84)) >>> 0)) {
      uVar3 = ((uVar3 + 1) & 0xffff);
    }
  }
  if (0x95 < uVar3) {
    uVar3 = ((0x96) & 0xffff);
  }
  sVar7 = (((sVar1 - (200 - ((uVar2 + uVar6) & 0xffff) / 10)) - ((0x96 - uVar3) * -4 + 600)) & 0xffff);
  pcVar9 = ((0x00887420) >>> 0);
  uVar2 = ((0) & 0xffff);
  uVar5 = ((0) & 0xffff);
  uVar6 = ((0) & 0xffff);
  do {
    if (((heap.i8(pcVar9) | 0) != -1) && ((heap.i16((pcVar9 + 0xf0)) | 0) != -1)) {
      uVar2 = ((uVar2 + (heap.u16((pcVar9 + 0xf0)) >>> 3)) & 0xffff);
      uVar5 = ((uVar5 + (heap.u16((pcVar9 + 0xf2)) >>> 3)) & 0xffff);
      uVar6 = ((uVar6 + 1) & 0xffff);
    }
    pcVar9 = ((pcVar9 + 0x260) >>> 0);
  } while (pcVar9 < 0x008ad1c0);
  sVar1 = ((sVar7 + -100) & 0xffff);
  if (uVar6 != 0) {
    uVar2 = ((uVar2 / uVar6 - 0x2e) & 0xffff);
    if (((uVar2) << 16 >> 16) < 0) {
      uVar2 = ((-uVar2) & 0xffff);
    }
    uVar6 = ((uVar5 / uVar6 - 0x41) & 0xffff);
    if (((uVar6) << 16 >> 16) < 0) {
      uVar6 = ((-uVar6) & 0xffff);
    }
    uVar2 = ((uVar2 >>> 1) & 0xffff);
    uVar6 = ((uVar6 >>> 1) & 0xffff);
    if (0x31 < uVar2) {
      uVar2 = ((0x32) & 0xffff);
    }
    if (0x31 < uVar6) {
      uVar6 = ((0x32) & 0xffff);
    }
    sVar1 = ((sVar7 - (uVar6 + uVar2)) & 0xffff);
  }
  local_1c = ((CONCAT22(uVar4, sVar1)) >>> 0);
  if (sVar1 < 0) {
    local_1c = ((((uVar4) >>> 0) << 0x10) >>> 0);
  }
  if (999 < ((local_1c) << 16 >> 16)) {
    local_1c = ((CONCAT22((((((local_1c) >>> 0) >>> 0x10)) << 16 >> 16), 999)) >>> 0);
  }
  return CONCAT44(in_EDX, local_1c);
}

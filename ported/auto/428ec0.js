// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/428ec0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_00428ec0(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743bc2 = __sp + 4;
  const __addr_DAT_00743bbe = __sp + 8;
  const __addr_DAT_00743bce = __sp + 12;
  const __addr_DAT_00743c5c = __sp + 16;
  const __addr_DAT_00743c5a = __sp + 20;
  const __addr_DAT_00887420 = __sp + 24;
  const __addr_DAT_008ad1c0 = __sp + 28;
  const __addr_DAT_00743bb8 = __sp + 32;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let in_EDX = 0;
  let sVar7 = 0;
  let iVar8 = 0;
  let local_1c = 0;
  uVar4 = (in_EAX >>> 0x10);
  uVar2 = heap.u32(0x0087c81c);
  if (1999 < heap.u32(0x0087c81c)) {
    uVar2 = 2000;
  }
  uVar5 = 0;
  sVar7 = 0;
  for (uVar6 = heap.u32(0x0087c398); uVar6 != 0xffff; uVar6 = heap.u32((__addr_DAT_00743b98) + (uVar6 * 0x80) * 4)) {
    iVar8 = uVar6 * 0x100;
    if ((heap.u32((__addr_DAT_00743bc2) + (iVar8) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar8) * 4) == '\0')) {
      if (0x80 < heap.u32((byte)(__addr_DAT_00743bce) + (iVar8) * 4)) {
        uVar5 = uVar5 + 1;
      }
      if (((heap.u32((__addr_DAT_00743c5c + iVar8)) & 1) != 0) && (heap.u32((byte)(__addr_DAT_00743c5a) + (iVar8) * 4) < 0x5a)) {
        sVar7 = sVar7 + 1;
      }
    }
  }
  sVar1 = 0x28a - (0x96 - (uVar2 / 0xd & 0xff));
  if (heap.u32(0x0087c81c) != 0) {
    uVar2 = ((uVar5 * 300) / heap.u32(0x0087c81c));
    if (0xf9 < uVar2) {
      uVar2 = 0xfa;
    }
    sVar1 = sVar1 + uVar2 * 2;
  }
  if (-1 < (sVar7 + -0x19)) {
    sVar1 = sVar1 + (sVar7 + -0x19) * -7;
  }
  uVar6 = 0;
  uVar2 = 0;
  pcVar9 = __addr_DAT_00887420;
  do {
    if (heap.u32(pcVar9) != -1) {
      uVar2 = uVar2 + (100 - heap.u32(pcVar9 + (0x149) * 4));
      uVar6 = uVar6 + 1;
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < __addr_DAT_008ad1c0);
  sVar1 = sVar1 + -200;
  if (uVar6 != 0) {
    sVar1 = sVar1 + (uVar2 / uVar6) * 2;
  }
  pcVar9 = __addr_DAT_00887420;
  uVar2 = 0;
  uVar6 = 0;
  do {
    if ((heap.u32(pcVar9) != -1) && (heap.u32((pcVar9 + 0xf0)) != -1)) {
      uVar2 = uVar2 + (heap.u32((pcVar9 + 0xf0)) >>> 3);
      uVar6 = uVar6 + (heap.u32((pcVar9 + 0xf2)) >>> 3);
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < __addr_DAT_008ad1c0);
  if (999 < uVar2) {
    uVar2 = 1000;
  }
  if (999 < uVar6) {
    uVar6 = 1000;
  }
  uVar3 = 0;
  for (uVar5 = heap.u32(0x0087c39c); uVar5 != 0xffff; uVar5 = heap.u32((__addr_DAT_00743b98) + (uVar5 * 0x80) * 4)) {
    if (0x1dff < (heap.u32((__addr_DAT_00743bb8 + uVar5 * 0x100)) - heap.u32(0x006e3b84))) {
      uVar3 = uVar3 + 1;
    }
  }
  if (0x95 < uVar3) {
    uVar3 = 0x96;
  }
  sVar7 = (sVar1 - (200 - (uVar2 + uVar6) / 10)) - ((0x96 - uVar3) * -4 + 600);
  pcVar9 = __addr_DAT_00887420;
  uVar2 = 0;
  uVar5 = 0;
  uVar6 = 0;
  do {
    if ((heap.u32(pcVar9) != -1) && (heap.u32((pcVar9 + 0xf0)) != -1)) {
      uVar2 = uVar2 + (heap.u32((pcVar9 + 0xf0)) >>> 3);
      uVar5 = uVar5 + (heap.u32((pcVar9 + 0xf2)) >>> 3);
      uVar6 = uVar6 + 1;
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < __addr_DAT_008ad1c0);
  sVar1 = sVar7 + -100;
  if (uVar6 != 0) {
    uVar2 = uVar2 / uVar6 - 0x2e;
    if (uVar2 < 0) {
      uVar2 = -uVar2;
    }
    uVar6 = uVar5 / uVar6 - 0x41;
    if (uVar6 < 0) {
      uVar6 = -uVar6;
    }
    uVar2 = uVar2 >>> 1;
    uVar6 = uVar6 >>> 1;
    if (0x31 < uVar2) {
      uVar2 = 0x32;
    }
    if (0x31 < uVar6) {
      uVar6 = 0x32;
    }
    sVar1 = sVar7 - (uVar6 + uVar2);
  }
  local_1c = CONCAT22(uVar4, sVar1);
  if (sVar1 < 0) {
    local_1c = uVar4 << 0x10;
  }
  if (999 < local_1c) {
    local_1c = CONCAT22((local_1c >>> 0x10), 999);
  }
  return CONCAT44(in_EDX, local_1c);
} finally {
    heap.freeFrame(36);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44c464.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CONCAT11, CONCAT21, CONCAT22, LOCK } from "../runtime/ghidra-builtins.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0044bacd } from "./44bacd.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_0044c464(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00887498 = __sp + 0;
  const __addr_DAT_00887422 = __sp + 4;
  const __addr_DAT_0088747e = __sp + 8;
  const __addr_DAT_00887497 = __sp + 12;
  const __addr_DAT_0088744a = __sp + 16;
  const __addr_DAT_00887453 = __sp + 20;
  try {
  let bVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let extraout_EDX = 0;
  let iVar4 = 0;
  let unaff_ESI = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let iVar5 = 0;
  if (heap.u32((unaff_ESI + 0x164)) != 0) {
    return;
  }
  uVar6 = heap.u32((unaff_ESI + 0x30));
  iVar7 = uVar6 * 0x260;
  bVar2 = heap.u32((unaff_ESI + 0x15a)) - 1;
  if (-1 < bVar2) {
    if (bVar2 < heap.u32((byte)(__addr_DAT_00887498) + (iVar7) * 4)) {
      if ((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
        uVar6 = heap.u32((__addr_DAT_0088747e + CONCAT11((heap.u32((unaff_ESI + 0x15a)) >>> 8), bVar2) * 2 + iVar7)) | 0xc0000000;
        iVar7 = heap.u32(0x00991f88) << 8;
        /* goto LAB_0044c557 */ throw new Error("goto LAB_0044c557 not supported");
      }
      heap.u32((unaff_ESI + 0x15a)) = 0;
    } else {
      bVar2 = bVar2 - heap.u32((__addr_DAT_00887498) + (iVar7) * 4);
      if (bVar2 < heap.u32((byte)(__addr_DAT_00887497) + (iVar7) * 4)) {
        iVar4 = -1;
        do {
          do {
            iVar5 = iVar4;
            iVar4 = iVar5 + 1;
          } while (heap.u32((__addr_DAT_0088744a) + (uVar6 * 0x130 + iVar4) * 4) == -1);
          bVar2 = bVar2 - 1;
        } while (-1 < bVar2);
        uVar6 = CONCAT22((heap.u32((__addr_DAT_0088744a) + (uVar6 * 0x130 + iVar4) * 4) >>> 8) << 5, (heap.u32((__addr_DAT_0088744a) + (uVar6 * 0x130 + iVar4) * 4) & 0xff) << 5) | 0x40000000;
        iVar7 = CONCAT21(((heap.u32((byte)(__addr_DAT_00887453) + (iVar7 + iVar5) * 4) << 0x12) >>> 0x10), heap.u32(0x00991f88)) << 8;
        /* goto LAB_0044c557 */ throw new Error("goto LAB_0044c557 not supported");
      }
      heap.u32((unaff_ESI + 0x15a)) = 0;
    }
  }
  uVar3 = FUN_00423677(heap);
  uVar6 = CONCAT22(extraout_CX, uVar3) | 0x40000000;
  iVar7 = CONCAT22(extraout_DX, CONCAT11(heap.u32(0x00991f88), 1));
  LAB_0044c557: if (heap.u32((unaff_ESI + 8)) == 0) {
    uVar3 = 0;
    if (heap.u32(0x005f8d5c) == '\x01') {
      uVar3 = 0x100;
    }
  } else {
    if ((uVar6 == heap.u32((unaff_ESI + 0x15c))) && (iVar7 == heap.u32((unaff_ESI + 0x160)))) {
      return;
    }
    LOCK();
    puVar1 = heap.u32((unaff_ESI + 8));
    heap.u32((unaff_ESI + 8)) = 0;
    UNLOCK(heap);
    heap.u32(puVar1) = 0;
    uVar3 = FUN_005e6a83(heap);
    iVar7 = extraout_ECX;
    uVar6 = extraout_EDX;
  }
  heap.u32((unaff_ESI + 0x15c)) = uVar6;
  heap.u32((unaff_ESI + 0x160)) = iVar7;
  FUN_0044bacd(heap);
  if (heap.u32((unaff_ESI + 8)) != 0) {
    heap.u32((heap.u32((unaff_ESI + 8)) + 0x12)) = uVar3;
    FUN_005e43de(heap);
  }
  return;
} finally {
    heap.freeFrame(24);
  }
}

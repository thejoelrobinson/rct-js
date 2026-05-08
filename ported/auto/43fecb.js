// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fecb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT21, CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0044002c } from "./44002c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_0043fecb(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00743bbf = __sp + 0;
  const __addr_DAT_00887422 = __sp + 4;
  const __addr_DAT_00743bfc = __sp + 8;
  const __addr_DAT_0088747e = __sp + 12;
  const __addr_DAT_00743bfe = __sp + 16;
  const __addr_DAT_00743bff = __sp + 20;
  const __addr_DAT_00743bd2 = __sp + 24;
  const __addr_DAT_00743b9e = __sp + 28;
  const __addr_DAT_00743ba2 = __sp + 32;
  try {
  let puVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let cVar4 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let extraout_EDX = 0;
  let unaff_ESI = 0;
  let iVar7 = 0;
  if (heap.u32((unaff_ESI + 0x164)) != 0) {
    return;
  }
  uVar6 = heap.u32((unaff_ESI + 0x30));
  iVar7 = uVar6 * 0x100;
  if (heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) != '\t') {
    if ((heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) != '\x03') && (heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) != '\a')) {
      /* goto LAB_0043ff95 */ throw new Error("goto LAB_0043ff95 not supported");
    }
    LAB_0043ff0b: if ((heap.u32((__addr_DAT_00887422) + (heap.u32((__addr_DAT_00743bfc) + (iVar7) * 4) * 0x130) * 4) & 1) == 0) {
      /* goto LAB_0043ff95 */ throw new Error("goto LAB_0043ff95 not supported");
    }
    uVar2 = heap.u32((__addr_DAT_0088747e + heap.u32((__addr_DAT_00743bfe) + (iVar7) * 4) * 2 + heap.u32((__addr_DAT_00743bfc) + (iVar7) * 4) * 0x260));
    for (cVar4 = heap.u32((__addr_DAT_00743bff) + (iVar7) * 4); cVar4 != '\0'; cVar4 = cVar4 + -1) {
      uVar2 = heap.u32((__addr_DAT_00743bd2 + uVar2 * 0x100));
    }
    uVar6 = heap.u32((__addr_DAT_00743b9e) + (uVar2 * 0x80) * 4);
    /* goto LAB_0043ffaf */ throw new Error("goto LAB_0043ffaf not supported");
  }
  uVar6 = 0xffff;
  iVar7 = 0;
  LAB_0043ffc3: if (heap.u32((unaff_ESI + 8)) == 0) {
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
    heap.setU32((unaff_ESI + 8), (0) >>> 0);
    UNLOCK();
    heap.setU32(puVar1, (0) >>> 0);
    uVar3 = FUN_005e6a83(heap);
    iVar7 = extraout_ECX;
    uVar6 = extraout_EDX;
  }
  heap.setU32((unaff_ESI + 0x15c), (uVar6) >>> 0);
  heap.setU32((unaff_ESI + 0x160), (iVar7) >>> 0);
  if (uVar6 != 0xffff) {
    FUN_0044002c(heap);
  }
  if (heap.u32((unaff_ESI + 8)) != 0) {
    heap.setU32((heap.u32((unaff_ESI + 8)) + 0x12), (uVar3) >>> 0);
  }
  FUN_005e43de(heap);
  return;
  LAB_0043ff95: if ((heap.u32((__addr_DAT_00743bbf) + (iVar7) * 4) != '\x04') || (heap.u32((__addr_DAT_00743ba2) + (uVar6 * 0x80) * 4) != -0x8000)) {
    /* goto LAB_0043ffa7 */ throw new Error("goto LAB_0043ffa7 not supported");
  }
  /* goto LAB_0043ff0b */ throw new Error("goto LAB_0043ff0b not supported");
  LAB_0043ffa7: if (heap.u32((__addr_DAT_00743ba2) + (uVar6 * 0x80) * 4) == -0x8000) {
    uVar3 = FUN_00423677(heap);
    sVar5 = extraout_DX + 0x20;
    uVar6 = CONCAT22(extraout_CX, uVar3) | 0x40000000;
  } else {
    LAB_0043ffaf: uVar6 = uVar6 | 0xc0000000;
    sVar5 = 0;
  }
  iVar7 = CONCAT21(sVar5, heap.u32(0x00991f88)) << 8;
  /* goto LAB_0043ffc3 */ throw new Error("goto LAB_0043ffc3 not supported");
} finally {
    heap.freeFrame(36);
  }
}

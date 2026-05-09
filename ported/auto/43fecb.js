// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fecb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT21, CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0044002c } from "./44002c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_0043fecb(heap) {
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
  let unaff_ESI = regs.esi >>> 0;
  let iVar7 = 0;
  LAB_0043ffa7: {
  LAB_0043ff95: {
  if (heap.i16((unaff_ESI + 0x164)) != 0) {
    return;
  }
  uVar6 = ((heap.u32((unaff_ESI + 0x30))) >>> 0);
  iVar7 = ((uVar6 * 0x100) >>> 0);
  if (heap.u32((0x00743bbf) + (iVar7) * 4) != 9) {
    if ((heap.u32((0x00743bbf) + (iVar7) * 4) != 3) && (heap.u32((0x00743bbf) + (iVar7) * 4) != NaN)) {
      break LAB_0043ff95;
    }
    LAB_0043ff0b: if ((heap.u32((0x00887422) + (heap.u32(((0x00743bfc) >>> 0) + (iVar7) * 4) * 0x130) * 4) & 1) == 0) {
      break LAB_0043ff95;
    }
    uVar2 = ((heap.u16((0x0088747e + heap.u32(((0x00743bfe) >>> 0) + (iVar7) * 4) * 2 + heap.u32(((0x00743bfc) >>> 0) + (iVar7) * 4) * 0x260))) & 0xffff);
    for (cVar4 = ((heap.u32((0x00743bff) + (iVar7) * 4)) & 0xff); cVar4 != 0; cVar4 = (((cVar4 + -1) & 0xff)) >>> 0) {
      uVar2 = ((heap.u16((0x00743bd2 + ((uVar2) >>> 0) * 0x100))) & 0xffff);
    }
    uVar6 = ((heap.u32(((0x00743b9e) >>> 0) + (((uVar2) >>> 0) * 0x80) * 4)) >>> 0);
    /* goto LAB_0043ffaf — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043fecb/LAB_0043ffaf"); return 0;
  }
  uVar6 = ((0xffff) >>> 0);
  iVar7 = ((0) >>> 0);
  LAB_0043ffc3: if (heap.i32((unaff_ESI + 8)) == 0) {
    uVar3 = ((0) & 0xffff);
    if (heap.u8(0x005f8d5c) == 1) {
      uVar3 = ((0x100) & 0xffff);
    }
  } else {
    if ((uVar6 == heap.u32((unaff_ESI + 0x15c))) && (iVar7 == heap.i32((unaff_ESI + 0x160)))) {
      return;
    }
    LOCK();
    puVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0);
    heap.setU32((unaff_ESI + 8), (0) & 0xffffffff);
    UNLOCK();
    heap.setU32(puVar1, (0) & 0xffffffff);
    uVar3 = (((regs.eax = FUN_005e6a83(heap))) & 0xffff);
    iVar7 = ((extraout_ECX) >>> 0);
    uVar6 = ((extraout_EDX) >>> 0);
  }
  heap.setU32((unaff_ESI + 0x15c), (uVar6) & 0xffffffff);
  heap.setI32((unaff_ESI + 0x160), (iVar7) & 0xffffffff);
  if (uVar6 != 0xffff) {
    (regs.eax = FUN_0044002c(heap));
  }
  if (heap.i32((unaff_ESI + 8)) != 0) {
    heap.setU16((heap.i32((unaff_ESI + 8)) + 0x12), (uVar3) & 0xffff);
  }
  return (regs.eax = FUN_005e43de(heap));
  }
  if ((heap.u32((0x00743bbf) + (iVar7) * 4) != 4) || (heap.u32((0x00743ba2) + (uVar6 * 0x80) * 4) != -0x8000)) {
    break LAB_0043ffa7;
  }
  /* goto LAB_0043ff0b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043fecb/LAB_0043ff0b"); return 0;
  }
  if (heap.u32((0x00743ba2) + (uVar6 * 0x80) * 4) == -0x8000) {
    uVar3 = (((regs.eax = FUN_00423677(heap))) & 0xffff);
    sVar5 = ((extraout_DX + 0x20) & 0xffff);
    uVar6 = ((CONCAT22(extraout_CX, uVar3) | 0x40000000) >>> 0);
  } else {
    LAB_0043ffaf: uVar6 = ((uVar6 | 0xc0000000) >>> 0);
    sVar5 = ((0) & 0xffff);
  }
  iVar7 = ((((CONCAT21(sVar5, heap.u8(0x00991f88))) >>> 0) << 8) >>> 0);
  /* goto LAB_0043ffc3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043fecb/LAB_0043ffc3"); return 0;
}

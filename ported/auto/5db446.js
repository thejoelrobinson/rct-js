// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db446.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0042deab } from "./42deab.js";
import { FUN_0042df47 } from "./42df47.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_0045192e } from "./45192e.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005db5d7 } from "./5db5d7.js";
import { FUN_005ddd9c } from "./5ddd9c.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005db446(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let iVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let puVar7 = 0;
  heap.setU8((unaff_ESI + (0x50)), (9) & 0xff);
  (regs.eax = FUN_005db5d7(heap));
  uVar5 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0)) >>> 0);
  iVar6 = ((uVar5 * 0x260) >>> 0);
  puVar7 = ((unaff_ESI) >>> 0);
  if ((heap.u32((0x00887422) + (uVar5 * 0x130) * 4) & 0x400) == 0) {
    for (; heap.u8(puVar7 + (1)) != 0; puVar7 = (((0x00743b94 + heap.u32((puVar7 + 0x40)) * 0x100) >>> 0)) >>> 0) {
    
    }
    iVar4 = ((-1) >>> 0);
    do {
      iVar4 = ((iVar4 + 1) >>> 0);
    } while (heap.i16((puVar7 + 10)) != heap.i16((0x0088747e + iVar4 * 2 + iVar6)));
    (regs.eax = FUN_0045192e(heap));
    if (heap.u32((0x00887441) + (iVar6) * 4) != 0) {
      (regs.eax = FUN_00426f56(heap));
    }
  }
  heap.setU32(((0x00887422) + (uVar5 * 0x130) * 4), (heap.u32((0x00887422) + (uVar5 * 0x130) * 4) | 0x400) & 0xffffffff);
  heap.setU32(((0x0088751d) + (iVar6) * 4), (heap.u32((0x0088751d) + (iVar6) * 4) | 0xc) & 0xffffffff);
  (regs.eax = FUN_005ddd9c(heap));
  puVar7 = ((unaff_ESI) >>> 0);
  while (true) {
    heap.setU8((puVar7 + (0x51)), (2) & 0xff);
    (regs.eax = 0xe, regs.ebx = 0x8001, regs.eax = FUN_00452fce(heap, heap.u16((puVar7 + 0x10)), heap.u16((puVar7 + 0xe)), unaff_BX));
    (regs.eax = FUN_0042df47(heap));
    unaff_BX = ((heap.u16((puVar7 + 0x32))) & 0xffff);
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    (regs.eax = FUN_0042deab(heap));
    heap.setU16((puVar7 + 0xc), (heap.u16((puVar7 + 0xc)) | 0x80) & 0xffff);
    uVar3 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    heap.setU32((puVar7 + 200), (uVar3) & 0xffffffff);
    heap.setU8((puVar7 + (0xc5)), (((((uVar3) >>> 0) >>> 0x10) & 0xff) & 7) & 0xff);
    heap.setU8((puVar7 + (0x14)), (0xd) & 0xff);
    heap.setU8((puVar7 + (9)), (0x2d) & 0xff);
    heap.setU8((puVar7 + (0x15)), (5) & 0xff);
    (regs.eax = FUN_00444927(heap));
    (regs.eax = FUN_005e53ca(heap));
    heap.setU16((puVar7 + 0x4e), (0) & 0xffff);
    if (heap.u16((puVar7 + 0x3e)) == 0xffff) {
      break;
    }
    puVar7 = ((0x00743b94 + heap.u32((puVar7 + 0x3e)) * 0x100) >>> 0);
  }
  uVar1 = ((heap.u16((unaff_ESI + 0x40))) & 0xffff);
  uVar2 = ((heap.u16((puVar7 + 0x42))) & 0xffff);
  heap.setU16((0x00743bd6 + ((uVar1) >>> 0) * 0x100), (uVar2) & 0xffff);
  heap.setU16((0x00743bd4 + ((uVar2) >>> 0) * 0x100), (uVar1) & 0xffff);
  heap.setU32((unaff_ESI + 0x28), (0) & 0xffffffff);
  return;
}

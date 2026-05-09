// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd134.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_00450b21 } from "./450b21.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dd134(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  uVar7 = (((regs.eax = FUN_00450b21(heap))) >>> 0);
  uVar3 = ((((uVar7) >>> 0)) >>> 0);
  uVar4 = ((((((uVar7) >>> 0) >>> 0x20) >>> 0) & 0xff) >>> 0);
  iVar5 = ((uVar4 * 0x260) >>> 0);
  heap.setU32(((0x00887422) + (uVar4 * 0x130) * 4), (heap.u32((0x00887422) + (uVar4 * 0x130) * 4) & 0xff3f) & 0xffffffff);
  heap.setU32(((0x0088751d) + (iVar5) * 4), (heap.u32((0x0088751d) + (iVar5) * 4) | 0xc) & 0xffffffff);
  puVar1 = ((0x00887422 + uVar4 * 0x130) >>> 0);
  uVar2 = ((heap.u16(puVar1)) & 0xffff);
  heap.setU32(puVar1, (heap.u16(puVar1) & 0xfffe) & 0xffffffff);
  if ((uVar2 & 1) != 0) {
    heap.setU32(((0x00887422) + (uVar4 * 0x130) * 4), (heap.u32((0x00887422) + (uVar4 * 0x130) * 4) & 0xf7fb) & 0xffffffff);
    uVar4 = ((0) >>> 0);
    do {
      LOCK();
      uVar2 = ((heap.u16((0x0088747e + uVar4 * 2 + iVar5))) & 0xffff);
      heap.setU16((0x0088747e + uVar4 * 2 + iVar5), (0xffff) & 0xffff);
      UNLOCK();
      for (; uVar2 != 0xffff; uVar2 = (((heap.u16((0x00743bd2 + ((uVar2) >>> 0) * 0x100))) & 0xffff)) >>> 0) {
        (regs.eax = FUN_005e53ca(heap));
        uVar3 = (((regs.eax = FUN_00444d1f(heap))) >>> 0);
      }
      uVar4 = ((uVar4 + 1) >>> 0);
    } while (uVar4 < 0xc);
    uVar4 = ((0) >>> 0);
    do {
      heap.setU32(((0x0088745e) + (uVar4 + iVar5) * 4), (0xff) & 0xffffffff);
      uVar4 = ((uVar4 + 1) >>> 0);
    } while (uVar4 < 4);
  }
  bVar6 = ((true) & 0xff);
  (regs.ecx = 0xb, regs.eax = FUN_005e3b2b(heap, unaff_EDI, unaff_ESI));
  if (!bVar6) {
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  return CONCAT44(in_EDX, uVar3);
}

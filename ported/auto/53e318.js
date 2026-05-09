// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/53e318.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0053e318(heap, param_1) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let puVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = regs.edi >>> 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (((in_EDX) << 16 >> 16) + 7) >>> 0);
  uVar2 = ((((heap.u32(0x0099a4ec)) >>> 0)) >>> 0);
  uVar6 = ((heap.u32((param_1 + 7))) >>> 0);
  iVar7 = ((uVar6 * 0x260) >>> 0);
  puVar3 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
    puVar3 = ((((((heap.u16((0x0088747e + iVar7))) << 16 >> 16)) >>> 0)) >>> 0);
    if (puVar3 != 0xffffffff) {
      puVar3 = ((0x00743b94 + heap.u32((0x0088747e + iVar7)) * 0x100) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar3) >>> 0);
    }
  }
  heap.setU32(0x00651bb0, (heap.u32((0x00651b70 + unaff_EDI * 4))) >>> 0);
  if ((puVar3 != 0xffffffff) && (iVar4 = ((((((heap.u8(puVar3 + (0x1f))) << 24 >> 24)) >>> 0)) >>> 0), iVar4 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar4 = ((-iVar4) >>> 0);
    }
    if (iVar4 < 0) {
      iVar4 = ((iVar4 + 0x48) >>> 0);
    }
    heap.setU32(0x00651bb0, (heap.i32((0x00651b80 + unaff_EDI * 4)) + (iVar4 + -1) * 2) >>> 0);
  }
  uVar5 = ((heap.u32((((0x00887426) >>> 0) + iVar7 + 1)) << 0x18 | heap.u32((0x00887426 + uVar6 * 0x130)) << 0x11 | heap.u32(0x00651bb0)) >>> 0);
  heap.setU32(0x0099a4e8, (heap.u16((0x00651b94 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u16((0x00651b96 + unaff_EDI * 8))) >>> 0);
  uVar8 = ((CONCAT22(((((heap.u32((0x00887426 + uVar6 * 0x130)) << 0x11) >>> 0x10)) << 16 >> 16), heap.u16((0x00651b92 + unaff_EDI * 8)))) >>> 0);
  uVar6 = ((heap.u32((0x00651b90 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x00651bb4, (unaff_EDI) >>> 0);
  if ((unaff_EDI & 2) == 0) {
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), iVar7, uVar8, uVar6, uVar2));
  }
  if ((heap.u32(0x00651bb4) & 2) == 0) {
    (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), iVar7, uVar8, uVar6, uVar2, in_ECX));
  } else {
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
  }
  if ((heap.u32(0x00651bb4) & 2) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), iVar7, uVar8, uVar6, uVar2, in_ECX, uVar5));
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/555a50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00555a50(heap, param_1) {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let puVar8 = 0;
  let uVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let extraout_var = 0;
  puVar2 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (((in_EDX) << 16 >> 16) + 7) >>> 0);
  uVar4 = ((((heap.u32(0x0099a4ec)) >>> 0)) >>> 0);
  uVar7 = ((heap.u32((param_1 + 7))) >>> 0);
  puVar8 = (((uVar7 * 0x260)) >>> 0);
  puVar5 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (uVar7 * 0x130) * 4) & 1) != 0) {
    puVar5 = ((((((heap.u16((0x0088747e + ((puVar8) >>> 0)))) << 16 >> 16)) >>> 0)) >>> 0);
    if (puVar5 != 0xffffffff) {
      puVar5 = ((0x00743b94 + heap.u32((0x0088747e + ((puVar8) >>> 0))) * 0x100) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar5) >>> 0);
    }
  }
  heap.setU32(0x00651c40, (unaff_EDI * 8 + 0xa0008d7a) >>> 0);
  if (puVar5 != 0xffffffff) {
    heap.setU32(0x00651c40, (heap.u32(0x00651c40) + (((heap.u8(puVar5 + (0x1f))) & 0xff) & 7)) >>> 0);
  }
  uVar6 = ((heap.u32((((0x00887426) >>> 0) + (((puVar8 + 1)) >>> 0))) << 0x18 | heap.u32((0x00887426 + uVar7 * 0x130)) << 0x11 | heap.u32(0x00651c40)) >>> 0);
  heap.setU32(0x0099a4e8, (heap.u16((0x00651c24 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u16((0x00651c26 + unaff_EDI * 8))) >>> 0);
  uVar9 = ((CONCAT22(((((heap.u32((0x00887426 + uVar7 * 0x130)) << 0x11) >>> 0x10)) << 16 >> 16), heap.u16((0x00651c22 + unaff_EDI * 8)))) >>> 0);
  uVar7 = ((heap.u32((0x00651c20 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x00651c44, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), puVar8, uVar9, uVar7, uVar4));
  uVar3 = ((extraout_var) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar8, uVar9, uVar7, uVar4, extraout_var));
  if ((heap.u16((heap.u32(0x00981ef8) + 0xe)) < 2) && ((heap.u16((((0x00887422) >>> 0) + ((puVar8) >>> 0))) & 1) != 0)) {
    uVar1 = ((heap.u16((0x0088747e + ((puVar8) >>> 0)))) & 0xffff);
    puVar8 = ((((uVar1) >>> 0)) >>> 0);
    if (uVar1 != 0xffff) {
      puVar8 = ((0x00743b94 + ((uVar1) >>> 0) * 0x100) >>> 0);
      uVar6 = ((0) >>> 0);
      do {
        if (((heap.i16((puVar8 + uVar6 * 2 + 0x52)) | 0) != -1) && (heap.u32((0x00743bbf) + (heap.u32((puVar8 + uVar6 * 2 + 0x52)) * 0x100) * 4) == 3)) {
          (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)));
        }
        uVar6 = ((uVar6 + 2) >>> 0);
      } while (uVar6 < 0x20);
    }
  }
  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar8, uVar9, uVar7, uVar4, uVar3, uVar6));
  heap.setU32(0x00991f80, (puVar2) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return 1;
}

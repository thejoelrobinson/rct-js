// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/53cfb8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0053cfb8(heap, param_1) {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let puVar9 = 0;
  let uVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let extraout_var = 0;
  puVar2 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (((in_EDX) << 16 >> 16) + 7) >>> 0);
  uVar4 = ((heap.u32(0x0099a4ec)) >>> 0);
  uVar8 = ((heap.u32((param_1 + 7))) >>> 0);
  puVar9 = (((uVar8 * 0x260)) >>> 0);
  puVar5 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (uVar8 * 0x130) * 4) & 1) != 0) {
    puVar5 = ((((((heap.u16((0x0088747e + ((puVar9) | 0)))) << 16 >> 16)) | 0)) >>> 0);
    if (puVar5 != 0xffffffff) {
      puVar5 = ((0x00743b94 + heap.u32((0x0088747e + ((puVar9) | 0))) * 0x100) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar5) >>> 0);
    }
  }
  heap.setU32(0x00651b60, (heap.u32((0x00651b30 + unaff_EDI * 4))) >>> 0);
  if ((puVar5 != 0xffffffff) && (iVar6 = ((((((heap.u8(puVar5 + (0x1f))) << 24 >> 24)) | 0)) >>> 0), iVar6 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar6 = ((-iVar6) >>> 0);
    }
    if (iVar6 < 0) {
      iVar6 = ((9 - iVar6) >>> 0);
    }
    heap.setU32(0x00651b60, (heap.u32(0x00651b60) + iVar6 * 0x12) >>> 0);
  }
  uVar7 = ((heap.u32((((0x00887426) | 0) + (((puVar9 + 1)) | 0))) << 0x18 | heap.u32((0x00887426 + uVar8 * 0x130)) << 0x11 | heap.u32(0x00651b60)) >>> 0);
  heap.setU32(0x0099a4e8, (heap.u16((0x00651b44 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u16((0x00651b46 + unaff_EDI * 8))) >>> 0);
  uVar10 = ((CONCAT22(((((heap.u32((0x00887426 + uVar8 * 0x130)) << 0x11) >>> 0x10)) << 16 >> 16), heap.u16((0x00651b42 + unaff_EDI * 8)))) >>> 0);
  uVar8 = ((heap.u32((0x00651b40 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x00651b64, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4));
  uVar3 = ((extraout_var) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, extraout_var));
  if ((heap.u16((heap.u32(0x00981ef8) + 0xe)) < 2) && ((heap.u16((((0x00887422) | 0) + ((puVar9) | 0))) & 1) != 0)) {
    uVar1 = ((heap.u16((0x0088747e + ((puVar9) | 0)))) & 0xffff);
    puVar9 = ((((uVar1) >>> 0)) >>> 0);
    if ((uVar1 != 0xffff) && (puVar9 = ((0x00743b94 + ((uVar1) >>> 0) * 0x100) >>> 0), heap.u32((0x00743c47) + (((uVar1) >>> 0) * 0x100) * 4) != 0)) {
      uVar7 = ((heap.u32(0x00651b60)) >>> 0);
      (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, heap.u32(0x00651b60)));
      if (2 < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
        if (4 < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
          (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
          if (6 < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
            (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
            if (8 < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
              (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
              if (10 < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
                (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
                if (0xc < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
                  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
                  if (0xe < ((heap.u8(puVar9 + (0xb3))) & 0xff)) {
                    (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar9, uVar10, uVar8, uVar4, uVar3, uVar7));
  heap.setU32(0x00991f80, (puVar2) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/55203e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0055203e(heap, param_1) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let puVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar9 = 0;
  let uVar3 = 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  uVar2 = ((((in_EDX) << 16 >> 16) + 7) & 0xffff);
  uVar3 = ((((uVar2) >>> 0)) >>> 0);
  uVar6 = ((heap.u32((param_1 + 7))) >>> 0);
  iVar7 = ((uVar6 * 0x260) >>> 0);
  puVar4 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
    puVar4 = ((((((heap.u16((0x0088747e + iVar7))) << 16 >> 16)) | 0)) >>> 0);
    if (puVar4 != 0xffffffff) {
      iVar5 = ((heap.u32((0x0088747e + iVar7)) * 0x100) >>> 0);
      puVar4 = ((0x00743b94 + iVar5) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar4) >>> 0);
      if ((((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 0xc0) != 0) && (heap.u32((0x0088755c) + (iVar7) * 4) == 7)) && (0x7f < heap.u32(((0x0088757c) & 0xff) + (iVar7) * 4))) {
        uVar3 = ((((uVar2 + heap.i16((0x00651be8 + (heap.u16((0x00743be0 + iVar5)) >>> 1 & 7) * 2))) >>> 0)) >>> 0);
      }
    }
  }
  heap.setU32(0x00651bc4, (0) >>> 0);
  if (puVar4 != 0xffffffff) {
    heap.setU32(0x00651bc4, ((((((heap.u8(puVar4 + (0x1e))) & 0xff) >>> 3) >>> 0) + heap.u8(0x00991f88)) * 0x20 + ((((heap.u8(puVar4 + (0x1f))) & 0xff)) >>> 0) & 0x7f) >>> 0);
  }
  heap.setU32(0x0099a4e8, (((in_EAX) << 24 >> 24) + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (((in_ECX) << 24 >> 24) + 0x10) >>> 0);
  uVar8 = ((0x18) >>> 0);
  heap.setU32(0x0099a4ec, (((uVar3) & 0xffff)) >>> 0);
  uVar9 = ((0x18) >>> 0);
  heap.setU32(0x00651bc0, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), iVar7, 0x18, 0x18, uVar3));
  if (((heap.i16((heap.u32(0x00981ef8) + 0xe)) == 0) && ((heap.u16((((0x00887422) | 0) + iVar7)) & 1) != 0)) && ((heap.u16((0x0088747e + iVar7)) != 0xffff && (iVar7 = ((heap.u32((0x0088747e + iVar7)) * 0x100) >>> 0), puVar4 = ((0x00743b94 + iVar7) >>> 0), heap.u32((0x00743c47) + (iVar7) * 4) != 0)))) {
    if ((heap.u32(0x00651bc4) + heap.u32(0x00651bc8) & 0x7f) - 0xd < 0x44) {
      (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
    }
    if (2 < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
      if ((heap.u32(0x00651bc4) + heap.u32(0x00651bcc) & 0x7f) - 0xd < 0x44) {
        (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
      }
      if (4 < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
        if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd0) & 0x7f) - 0xd < 0x44) {
          (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
        }
        if (6 < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
          if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd4) & 0x7f) - 0xd < 0x44) {
            (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
          }
          if (8 < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
            if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd8) & 0x7f) - 0xd < 0x44) {
              (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
            }
            if (10 < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
              if ((heap.u32(0x00651bc4) + heap.u32(0x00651bdc) & 0x7f) - 0xd < 0x44) {
                (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
              }
              if (0xc < ((heap.u8(puVar4 + (0xb3))) & 0xff)) {
                if ((heap.u32(0x00651bc4) + heap.u32(0x00651be0) & 0x7f) - 0xd < 0x44) {
                  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
                }
                if ((0xe < ((heap.u8(puVar4 + (0xb3))) & 0xff)) && ((heap.u32(0x00651bc4) + heap.u32(0x00651be4) & 0x7f) - 0xd < 0x44)) {
                  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar4, uVar8, uVar9, uVar3, in_ECX));
                }
              }
            }
          }
        }
      }
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return 1;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/55203e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
export function FUN_0055203e(heap, param_1) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_0088755c = __sp + 12;
  const __addr_DAT_0088757c = __sp + 16;
  const __addr_DAT_00651be8 = __sp + 20;
  const __addr_DAT_00743be0 = __sp + 24;
  const __addr_PTR_LAB_00432204 = __sp + 28;
  const __addr_DAT_00743c47 = __sp + 32;
  const __addr_PTR_LAB_00432e90 = __sp + 36;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = 0;
  let uVar9 = 0;
  let uVar3 = 0;
  puVar1 = heap.u32(0x00991f80);
  uVar2 = in_EDX + 7;
  uVar3 = uVar2;
  uVar6 = heap.u32((param_1 + 7));
  iVar7 = uVar6 * 0x260;
  puVar4 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
    puVar4 = heap.u32((__addr_DAT_0088747e + iVar7));
    if (puVar4 != 0xffffffff) {
      iVar5 = heap.u32((__addr_DAT_0088747e + iVar7)) * 0x100;
      puVar4 = __addr_DAT_00743b94 + iVar5;
      heap.u8(0x991f78) = 2;
      heap.setU32(0x00991f80, (puVar4) >>> 0);
      if ((((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 0xc0) != 0) && (heap.u32((__addr_DAT_0088755c) + (iVar7) * 4) == '\a')) && (0x7f < heap.u32((byte)(__addr_DAT_0088757c) + (iVar7) * 4))) {
        uVar3 = (uVar2 + heap.u32((__addr_DAT_00651be8 + (heap.u32((__addr_DAT_00743be0 + iVar5)) >>> 1 & 7) * 2)));
      }
    }
  }
  heap.setU32(0x00651bc4, (0) >>> 0);
  if (puVar4 != 0xffffffff) {
    heap.setU32(0x00651bc4, (((heap.u32(puVar4 + (0x1e) * 4) >>> 3) + heap.u32(0x00991f88)) * 0x20 + heap.u32(puVar4 + (0x1f) * 4) & 0x7f) >>> 0);
  }
  heap.setU32(0x0099a4e8, (in_EAX + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (in_ECX + 0x10) >>> 0);
  uVar8 = 0x18;
  heap.setU32(0x0099a4ec, (uVar3) >>> 0);
  uVar9 = 0x18;
  heap.setU32(0x00651bc0, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(iVar7, 0x18, 0x18, uVar3);
  if (((heap.u32((heap.u32(0x00981ef8) + 0xe)) == 0) && ((heap.u32((__addr_DAT_00887422 + iVar7)) & 1) != 0)) && ((heap.u32((__addr_DAT_0088747e + iVar7)) != 0xffff && (iVar7 = heap.u32((__addr_DAT_0088747e + iVar7)) * 0x100, puVar4 = __addr_DAT_00743b94 + iVar7, heap.u32((__addr_DAT_00743c47) + (iVar7) * 4) != '\0')))) {
    if ((heap.u32(0x00651bc4) + heap.u32(0x00651bc8) & 0x7f) - 0xd < 0x44) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
    }
    if (2 < heap.u32(puVar4 + (0xb3) * 4)) {
      if ((heap.u32(0x00651bc4) + heap.u32(0x00651bcc) & 0x7f) - 0xd < 0x44) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
      }
      if (4 < heap.u32(puVar4 + (0xb3) * 4)) {
        if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd0) & 0x7f) - 0xd < 0x44) {
          (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
        }
        if (6 < heap.u32(puVar4 + (0xb3) * 4)) {
          if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd4) & 0x7f) - 0xd < 0x44) {
            (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
          }
          if (8 < heap.u32(puVar4 + (0xb3) * 4)) {
            if ((heap.u32(0x00651bc4) + heap.u32(0x00651bd8) & 0x7f) - 0xd < 0x44) {
              (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
            }
            if (10 < heap.u32(puVar4 + (0xb3) * 4)) {
              if ((heap.u32(0x00651bc4) + heap.u32(0x00651bdc) & 0x7f) - 0xd < 0x44) {
                (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
              }
              if (0xc < heap.u32(puVar4 + (0xb3) * 4)) {
                if ((heap.u32(0x00651bc4) + heap.u32(0x00651be0) & 0x7f) - 0xd < 0x44) {
                  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
                }
                if ((0xe < heap.u32(puVar4 + (0xb3) * 4)) && ((heap.u32(0x00651bc4) + heap.u32(0x00651be4) & 0x7f) - 0xd < 0x44)) {
                  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar4, uVar8, uVar9, uVar3, in_ECX);
                }
              }
            }
          }
        }
      }
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.u8(0x991f78) = 3;
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(40);
  }
}

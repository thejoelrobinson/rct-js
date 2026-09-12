// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/59e41a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0059e41a(heap, param_1) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_DX = regs.edx & 0xffff;
  let uVar2 = 0;
  let puVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar6 = 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (in_DX + 7) >>> 0);
  uVar2 = ((heap.u32(0x0099a4ec)) >>> 0);
  iVar4 = ((heap.u32((param_1 + 7)) * 0x260) >>> 0);
  puVar3 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
    puVar3 = ((((((heap.u16((0x0088747e + iVar4))) << 16 >> 16)) | 0)) >>> 0);
    if (puVar3 != 0xffffffff) {
      puVar3 = ((0x00743b94 + heap.u32((0x0088747e + iVar4)) * 0x100) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar3) >>> 0);
    }
  }
  heap.setU32(0x00651d24, (unaff_EDI * 0x58) >>> 0);
  if (0xd7 < heap.u32(0x00651d24)) {
    heap.setU32(0x00651d24, (heap.u32(0x00651d24) - 0xd8) >>> 0);
  }
  if (puVar3 != 0xffffffff) {
    for (heap.setU32(0x00651d24, (heap.u32(0x00651d24) + ((((heap.u8(puVar3 + (0x1e))) & 0xff) >>> 3) >>> 0) * 0x10 + ((((heap.u8(puVar3 + (0x1f))) & 0xff)) >>> 0)) >>> 0); 0xd7 < heap.u32(0x00651d24); heap.setU32(0x00651d24, (heap.u32(0x00651d24) - 0xd8) >>> 0)) {
    
    }
  }
  heap.setU32(0x0099a4e8, (((in_EAX) << 24 >> 24) + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (((in_ECX) << 24 >> 24) + 0x10) >>> 0);
  uVar6 = ((CONCAT22((((heap.u32(0x00651d24) >>> 0x10)) << 16 >> 16), 0x18)) >>> 0);
  uVar5 = ((0x18) >>> 0);
  heap.setU32(0x00651d20, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), iVar4, 0x18, uVar6, uVar2));
  if (((heap.i16((heap.u32(0x00981ef8) + 0xe)) == 0) && ((heap.u16((((0x00887422) | 0) + iVar4)) & 1) != 0)) && (heap.u16((0x0088747e + iVar4)) != 0xffff)) {
    puVar3 = ((0x00743b94 + heap.u32((0x0088747e + iVar4)) * 0x100) >>> 0);
    for (iVar4 = ((0) >>> 0); ((iVar4) & 0xff) < ((heap.u8(puVar3 + (0xb3))) & 0xff); iVar4 = (((iVar4 + 2) >>> 0)) >>> 0) {
      (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), puVar3, uVar5, uVar6, uVar2, in_ECX, iVar4, in_EAX));
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/59f4fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0059f4fb(heap, param_1) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar3 = 0;
  let unaff_EDI = regs.edi >>> 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x00651d54, (0) >>> 0);
  heap.setU32(0x0099a4ec, (((in_EDX) << 16 >> 16) + 3) >>> 0);
  if (((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) && (heap.u16((0x0088747e + heap.u32((param_1 + 7)) * 0x260)) != 0xffff)) {
    iVar3 = ((heap.u32((0x0088747e + heap.u32((param_1 + 7)) * 0x260)) * 0x100) >>> 0);
    heap.setU32(0x00991f80, (0x00743b94 + iVar3) >>> 0);
    heap.setU8((0x00991f78 + 0), (2) & 0xff);
    heap.setU32(0x00651d54, (heap.u32(((0x00743bb3) >>> 0) + (iVar3) * 4)) >>> 0);
  }
  heap.setU32(0x0099a4e8, (heap.u16((0x00651d5c + unaff_EBX * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u16((0x00651d5e + unaff_EBX * 8))) >>> 0);
  uVar2 = ((CONCAT22((((((in_EAX) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(0x7f, ((in_EAX) << 24 >> 24)))) >>> 0);
  heap.setU32(0x00651d50, (unaff_EBX) >>> 0);
  heap.setU32(0x00651d58, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), heap.u16((0x00651d62 + unaff_EBX * 8)), heap.u16((0x00651d60 + unaff_EBX * 8)), heap.u32(0x0099a4ec)));
  if ((heap.u32(0x00651d58) == 0) && (-1 < ((((heap.u32(0x00651d54) - 1)) | 0) | 0))) {
    uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)))) >>> 0);
  }
  if ((heap.u32(0x00651d58) == 1) && (-1 < ((((heap.u32(0x00651d54) - 1)) | 0) | 0))) {
    uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)))) >>> 0);
  }
  if ((heap.u32(0x00651d58) == 2) && (-1 < ((((heap.u32(0x00651d54) - 1)) | 0) | 0))) {
    uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)))) >>> 0);
  }
  if ((heap.u32(0x00651d58) == 3) && (-1 < ((((heap.u32(0x00651d54) - 1)) | 0) | 0))) {
    uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)))) >>> 0);
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return CONCAT44(in_EDX, uVar2);
}

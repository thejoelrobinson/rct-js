// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/579dec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00579dec(heap, param_1) {
  let in_AL = regs.eax & 0xff;
  let uVar1 = 0;
  let in_ECX = regs.ecx >>> 0;
  let in_DX = regs.edx & 0xffff;
  let uVar2 = 0;
  let iVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar6 = 0;
  heap.setU32(0x0099a4ec, (in_DX + 3) >>> 0);
  uVar2 = ((((heap.u32(0x0099a4ec)) >>> 0)) >>> 0);
  iVar4 = ((heap.u32((param_1 + 7)) * 0x260) >>> 0);
  heap.setU8(0x00651c60, (0xffffffff) & 0xff);
  heap.setU32(0x00651c68, (0) >>> 0);
  heap.setU32(0x00651c6c, (0) >>> 0);
  if ((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
    heap.setU8(0x00651c60, (((((heap.u16((0x0088747e + iVar4))) << 16 >> 16)) >>> 0)) & 0xff);
    if (heap.u8(0x00651c60) != 0xffffffff) {
      iVar3 = ((heap.u32((0x0088747e + iVar4)) * 0x100) >>> 0);
      heap.setU8(0x00651c60, (0x00743b94 + iVar3) & 0xff);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00651c68, (heap.u32(((0x00743bb3) >>> 0) + (iVar3) * 4)) >>> 0);
      heap.setU32(0x00651c6c, (heap.u32(((0x00743bb4) >>> 0) + (iVar3) * 4)) >>> 0);
      heap.setU32(0x00991f80, (heap.u8(0x00651c60)) >>> 0);
    }
  }
  heap.setU32(0x0099a4e8, (in_AL + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (((in_ECX) << 24 >> 24) + 0x10) >>> 0);
  uVar6 = ((0x18) >>> 0);
  uVar5 = ((0x18) >>> 0);
  uVar1 = ((((CONCAT11(0x5a, in_AL)) >>> 0)) >>> 0);
  heap.setU32(0x00651c64, (unaff_EDI) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), iVar4, 0x18, 0x18, uVar2));
  (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4), iVar4, uVar5, uVar6, uVar2, in_ECX, uVar1));
  heap.setU32(0x00651c70, (heap.u32(0x00651c64) * 0x10 + heap.u32(0x00651c6c) + -0x5fffb8f0) >>> 0);
  if ((heap.u8(0x00651c60) != 0xffffffff) && (0x3f < ((heap.u32(heap.u8(0x00651c60) + (0xb5) * 4)) & 0xff))) {
    heap.setU32(0x00651c70, ((((heap.u32(heap.u8(0x00651c60) + (0xb5) * 4)) & 0xff) - 0x40 >>> 6) + heap.u32(0x00651c64) * 3 + -0x5fffb8b0) >>> 0);
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x00579fd4) + (heap.u32(0x00651c64)) * 4), uVar5, uVar6, uVar2, in_ECX, uVar1));
}

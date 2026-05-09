// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/57b232.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0057b232(heap, param_1) {
  let puVar1 = 0;
  let in_AL = regs.eax & 0xff;
  let in_CL = regs.ecx & 0xff;
  let in_DX = regs.edx & 0xffff;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  iVar2 = ((heap.u32((param_1 + 7)) * 0x260) >>> 0);
  if ((heap.u32((0x00887497) + (iVar2) * 4) == 0) || (((unaff_ESI) & 0xff) < heap.u32(((0x00887498) & 0xff) + (iVar2) * 4))) {
    heap.setU32(0x00651d10, (0xffffffff) >>> 0);
    if ((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
      heap.setU32(0x00651d10, (((((heap.u16((0x0088747e + unaff_ESI * 2 + iVar2))) << 16 >> 16)) >>> 0)) >>> 0);
      if (heap.u32(0x00651d10) != 0xffffffff) {
        heap.setU32(0x00651d10, (0x00743b94 + heap.u32((0x0088747e + unaff_ESI * 2 + iVar2)) * 0x100) >>> 0);
        heap.setU8((0x00991f78 + 0), (2) & 0xff);
        heap.setU32(0x00991f80, (heap.u32(0x00651d10)) >>> 0);
      }
    }
    heap.setU32(0x0099a4e8, (in_AL + -10) >>> 0);
    heap.setU32(0x0099a4ea, (in_CL + -10) >>> 0);
    heap.setU32(0x0099a4ec, (in_DX + 3) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), 0x14, 0x14, in_DX + 3));
    if ((heap.u32(0x00651d10) != 0xffffffff) && (heap.u32(heap.u32(0x00651d10) + (0xb3) * 4) != 0)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00432e90) + (heap.u8(0x00991f88)) * 4)));
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.setU8((0x00991f78 + 0), (3) & 0xff);
  return;
}

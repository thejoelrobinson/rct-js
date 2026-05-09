// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/557966.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00557966(heap, param_1) {
  let puVar1 = 0;
  let in_AL = regs.eax & 0xff;
  let in_CL = regs.ecx & 0xff;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  let unaff_EDI = regs.edi >>> 0;
  puVar1 = ((heap.u32(0x00991f80)) >>> 0);
  heap.setU32(0x0099a4ec, (in_DX + 2) >>> 0);
  puVar2 = ((0xffffffff) >>> 0);
  if ((heap.u32((0x00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
    puVar2 = ((((((heap.u16((0x0088747e + heap.u32((param_1 + 7)) * 0x260))) << 16 >> 16)) >>> 0)) >>> 0);
    if (puVar2 != 0xffffffff) {
      puVar2 = ((0x00743b94 + heap.u32((0x0088747e + heap.u32((param_1 + 7)) * 0x260)) * 0x100) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      heap.setU32(0x00991f80, (puVar2) >>> 0);
    }
  }
  heap.setU32(0x00651c50, (unaff_EDI + -0x5fff7062) >>> 0);
  if (puVar2 != 0xffffffff) {
    if (((heap.u8(puVar2 + (0xb5))) & 0xff) < 0x40) {
      heap.setU32(0x00651c50, (heap.u32(0x00651c50) + ((((heap.u8(puVar2 + (0x1f))) & 0xff)) >>> 0) * 4) >>> 0);
    } else {
      heap.setU32(0x00651c50, (heap.u32(0x00651c50) + ((((heap.u8(puVar2 + (0xb5))) & 0xff) >>> 6) >>> 0) * 4) >>> 0);
    }
  }
  heap.setU32(0x0099a4e8, (((in_AL) << 16 >> 16)) >>> 0);
  heap.setU32(0x0099a4ea, (((in_CL) << 16 >> 16)) >>> 0);
  heap.setU32(0x00651c54, (unaff_EDI) >>> 0);
  return (regs.eax = callIndirect(heap, heap.u32((0x00557a38) + (unaff_EDI) * 4), puVar1));
}

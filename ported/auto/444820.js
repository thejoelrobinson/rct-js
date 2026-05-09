// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444820.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00444820(heap) {
  let uVar1 = 0;
  let pbVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let uVar3 = 0;
  let iVar4 = 0;
  if (((heap.u16((heap.u32(0x00981ef8) + 0xe)) < 2) && (in_AX < 0x1000)) && (in_CX < 0x1000)) {
    uVar1 = ((heap.u32((0x00991f8e) + ((((in_AX & 0xfe0) << 2 | in_CX >>> 5) & 0xffff)) * 4)) & 0xffff);
    pbVar2 = ((heap.u32(0x00991f80)) >>> 0);
    while (heap.setU32(0x00991f80, (pbVar2) >>> 0), uVar1 != 0xffff) {
      uVar3 = ((((uVar1) >>> 0)) >>> 0);
      iVar4 = ((uVar3 * 0x100) >>> 0);
      heap.setU32(0x00991f80, (0x00743b94 + iVar4) >>> 0);
      heap.setU8((0x00991f78 + 0), (2) & 0xff);
      if (((heap.i16((0x00743bac + iVar4)) < (((heap.i16((heap.u32(0x00981ef8) + 6)) + heap.i16((heap.u32(0x00981ef8) + 10)))) << 16 >> 16)) && (heap.i16((heap.u32(0x00981ef8) + 6)) < heap.i16((0x00743bb0 + iVar4)))) && ((heap.i16((0x00743baa + iVar4)) < (((heap.i16((heap.u32(0x00981ef8) + 4)) + heap.i16((heap.u32(0x00981ef8) + 8)))) << 16 >> 16) && (heap.i16((heap.u32(0x00981ef8) + 4)) < heap.i16((0x00743bae + iVar4)))))) {
        heap.setU32(0x00991f70, (heap.u32((0x00743ba2) + (uVar3 * 0x80) * 4)) >>> 0);
        heap.setU32(0x00991f74, (heap.u32((0x00743ba4) + (uVar3 * 0x80) * 4)) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32((0x006309a0) + (heap.u32(heap.u32(0x00991f80))) * 4)));
        pbVar2 = ((heap.u32(0x00991f80)) >>> 0);
      }
      heap.setU32(0x00991f80, (pbVar2) >>> 0);
      pbVar2 = ((heap.u32(0x00991f80)) >>> 0);
      uVar1 = ((heap.u32((0x00743b96) + (uVar3 * 0x80) * 4)) & 0xffff);
    }
  }
  return;
}

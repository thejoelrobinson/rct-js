// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444927.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00444927(heap) {
  let uVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let uVar2 = 0;
  let in_ECX = regs.ecx >>> 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let uVar3 = 0;
  let puVar4 = 0;
  if (in_AX == 0x8000) {
    uVar2 = ((0x4000) >>> 0);
  } else {
    uVar2 = (((((in_AX & 0xfe0) << 2 | ((in_ECX >>> 5) & 0xffff) & 0x7ff) >>> 0)) >>> 0);
  }
  if (heap.u16((unaff_ESI + 0xe)) == 0x8000) {
    uVar3 = ((0x4000) >>> 0);
  } else {
    uVar3 = (((((heap.u16((unaff_ESI + 0xe)) & 0xfe0) << 2 | heap.u16((unaff_ESI + 0x10)) >>> 5) >>> 0)) >>> 0);
  }
  if (uVar2 != uVar3) {
    puVar4 = ((0x00991f8e + uVar3) >>> 0);
    while (0x00743b94 + heap.u32(puVar4) * 0x100 != unaff_ESI) {
      puVar4 = ((0x00743b96 + heap.u32(puVar4) * 0x80) >>> 0);
    }
    heap.setU32(puVar4, (heap.u16((unaff_ESI + 2))) & 0xffffffff);
    LOCK();
    uVar1 = ((heap.u32((0x00991f8e) + (uVar2) * 4)) & 0xffff);
    heap.setU32(((0x00991f8e) + (uVar2) * 4), (heap.u16((unaff_ESI + 10))) & 0xffffffff);
    UNLOCK();
    heap.setU16((unaff_ESI + 2), (uVar1) & 0xffff);
  }
  if (in_AX != 0x8000) {
    return (regs.eax = callIndirect(heap, heap.u32((0x004449c4) + (heap.u8(0x00991f88)) * 4)));
  }
  heap.setU16((unaff_ESI + 0x16), (0x8000) & 0xffff);
  heap.setU16((unaff_ESI + 0xe), (0x8000) & 0xffff);
  heap.setI16((unaff_ESI + 0x10), (((in_ECX) << 16 >> 16)) & 0xffff);
  heap.setU16((unaff_ESI + 0x12), (in_DX) & 0xffff);
  return;
}

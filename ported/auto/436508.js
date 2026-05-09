// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436508.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00436508(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  let bVar6 = 0;
  uVar1 = ((((heap.u32(0x008ae938)) >>> 0)) >>> 0);
  bVar6 = ((false) & 0xff);
  if (uVar1 != 0) {
    puVar3 = ((0x008ad1c8) >>> 0);
    while (true) {
      while ((regs.eax = callIndirect(heap, heap.u32((0x00628ab0) + (heap.u8((((puVar3) >>> 0) + 1))) * 4))), !bVar6) {
        bVar6 = ((0xfffffff9 < puVar3) & 0xff);
        puVar3 = ((puVar3 + ((3) * 2)) >>> 0);
        uVar1 = ((uVar1 - 1) >>> 0);
        if (uVar1 == 0) {
          return;
        }
      }
      heap.setU32(0x008ae938, (heap.u32(0x008ae938) - 1) >>> 0);
      uVar1 = ((uVar1 - 1) >>> 0);
      if (uVar1 == 0) {
        break;
      }
      iVar2 = (((((((((uVar1) >>> 0)) >>> 0) * 3)) >>> 0)) >>> 0);
      bVar6 = ((((iVar2) >>> 0) != ((((uVar1) >>> 0)) >>> 0) * 3) & 0xff);
      puVar4 = ((puVar3 + ((3) * 2)) >>> 0);
      puVar5 = ((puVar3) >>> 0);
      for (; iVar2 != 0; iVar2 = (((iVar2 + -1) >>> 0)) >>> 0) {
        heap.setU32(puVar5, (heap.u16(puVar4)) & 0xffffffff);
        puVar4 = ((puVar4 + ((1) * 2)) >>> 0);
        puVar5 = ((puVar5 + ((1) * 2)) >>> 0);
      }
    }
  }
  return;
}

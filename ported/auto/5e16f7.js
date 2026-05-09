// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e16f7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00434a94 } from "./434a94.js";
import { FUN_005e19eb } from "./5e19eb.js";
import { FUN_005e4355 } from "./5e4355.js";
export function FUN_005e16f7(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let cVar4 = 0;
  (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  iVar1 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if (iVar1 != 0) {
    if ((heap.i16((unaff_ESI + 0x16e)) | 0) == -1) {
      sVar3 = (((heap.u16((iVar1 + 0xe)) >>> 1) + heap.i16((unaff_ESI + 0x172))) & 0xffff);
      sVar2 = (((regs.eax = FUN_00434a94(heap))) & 0xffff);
      cVar4 = (((((sVar2 + 0x100)) << 16 >> 16) < 0) & 0xff);
      if (cVar4) {
        sVar2 = ((-0x100) & 0xffff);
      }
      if ((((sVar3 + 0x100)) << 16 >> 16) < 0) {
        sVar3 = ((-0x100) & 0xffff);
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (0x10fe < sVar2) {
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (0x10fe < sVar3) {
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (cVar4 != 0) {
        (regs.eax = FUN_00423677(heap));
        return (regs.eax = callIndirect(heap, heap.u32((0x005e17b8) + (heap.u8(0x00991f88)) * 4)));
      }
      if ((heap.u16((unaff_ESI + 0x32)) & 8) != 0) {
        sVar2 = ((heap.i16((unaff_ESI + 0x170)) - heap.i16((iVar1 + 8))) & 0xffff);
        if (sVar2 < 0) {
          sVar2 = ((-sVar2) & 0xffff);
        }
        sVar3 = ((heap.i16((unaff_ESI + 0x172)) - heap.i16((iVar1 + 10))) & 0xffff);
        if (sVar3 < 0) {
          sVar3 = ((-sVar3) & 0xffff);
        }
        if (((sVar2 + 7 | sVar3 + 7) & 0xffff) >>> 3 == 0) {
          heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) & 0xfff7) & 0xffff);
        }
      }
    } else {
      (regs.eax = FUN_005e4355(heap));
    }
    (regs.eax = FUN_005e19eb(heap));
  }
  return;
}

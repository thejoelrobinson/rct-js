// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429c3d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
export function FUN_00429c3d(heap) {
  let uVar1 = 0;
  let sVar2 = 0;
  let cVar3 = 0;
  let in_ECX = regs.ecx >>> 0;
  let in_DL = regs.edx & 0xff;
  let iVar4 = 0;
  if (in_DL == 1) {
    if ((heap.i16((0x00887448 + in_ECX * 0x260)) | 0) != -1) {
      sVar2 = (((regs.eax = FUN_00423677(heap))) & 0xffff);
      return sVar2;
    }
  } else {
    if (in_DL == 2) {
      iVar4 = (((in_ECX & 0xffff) * 0x100) >>> 0);
      sVar2 = ((heap.u32((0x00743ba2) + ((in_ECX & 0xffff) * 0x80) * 4)) & 0xffff);
      if (sVar2 == -0x8000) {
        if ((heap.u32((0x00743bbf) + (iVar4) * 4) != 3) && (heap.u32((0x00743bbf) + (iVar4) * 4) != NaN)) {
          return -0x8000;
        }
        if ((heap.u32((0x00887422) + (heap.u32(((0x00743bfc) >>> 0) + (iVar4) * 4) * 0x130) * 4) & 1) == 0) {
          return -0x8000;
        }
        uVar1 = ((heap.u16((0x0088747e + heap.u32(((0x00743bfe) >>> 0) + (iVar4) * 4) * 2 + heap.u32(((0x00743bfc) >>> 0) + (iVar4) * 4) * 0x260))) & 0xffff);
        cVar3 = ((heap.u32((0x00743bff) + (iVar4) * 4)) & 0xff);
        while (true) {
          if (cVar3 == 0) {
            break;
          }
          cVar3 = ((cVar3 + -1) & 0xff);
          uVar1 = ((heap.u16((0x00743bd2 + ((uVar1) >>> 0) * 0x100))) & 0xffff);
        }
        sVar2 = ((heap.u32((0x00743ba2) + (((uVar1) >>> 0) * 0x80) * 4)) & 0xffff);
      }
      return sVar2;
    }
    if (in_DL == 3) {
      return heap.u32((0x00743ba2) + ((in_ECX & 0xffff) * 0x80) * 4);
    }
    if (in_DL == 5) {
      sVar2 = (((regs.eax = FUN_00423677(heap))) & 0xffff);
      return sVar2;
    }
  }
  return -0x8000;
}

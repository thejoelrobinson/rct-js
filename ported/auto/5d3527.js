// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3527.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00424db7 } from "./424db7.js";
import { FUN_0044e607 } from "./44e607.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e6bcd } from "./5e6bcd.js";
export function FUN_005d3527(heap) {
  let iVar1 = 0;
  (regs.eax = FUN_0044e607(heap), regs.ecx = 0xb, regs.eax);
  iVar1 = ((((heap.u8(0x00652289)) >>> 0) * 0x260) >>> 0);
  if (heap.u32((0x00887420) + (iVar1) * 4) != 20) {
    (regs.eax = 0x200000, regs.ecx = 0x1000d, regs.edx = 0x5d001d, regs.ebx = 0x18a00a6, regs.ebp = 0x5d112b, regs.eax = FUN_005e3f31(heap));
    heap.setU32((iVar1 + 0x1c), (0x00651d90) & 0xffffffff);
    heap.setU32((iVar1 + 0xc), (heap.u32((iVar1 + 0xc)) | 0xdffef84) & 0xffffffff);
    heap.setU32((iVar1 + 0xc), (heap.u32((iVar1 + 0xc)) | 0x60001041) & 0xffffffff);
    heap.setU32((iVar1 + 0xc), (heap.u32((iVar1 + 0xc)) | 0x82000000) & 0xffffffff);
    (regs.eax = 0x200000, regs.edx = 0x5d001d, regs.eax = FUN_005e412c(heap));
    heap.setU16((iVar1 + 0x30), (heap.u16(0x00652289)) & 0xffff);
    (regs.edx = 0x5d001d, regs.eax = FUN_005e6bcd(heap));
    (regs.eax = FUN_005e0c2f(heap));
    (regs.eax = FUN_00424db7(heap));
    heap.setU8(0x006522a4, (8) & 0xff);
    heap.setU8(0x006522a5, (0x12) & 0xff);
    if (heap.u32((0x00887420) + (((heap.u8(0x00652289)) >>> 0) * 0x260) * 4) == 42) {
      heap.setU8(0x006522a5, (0x1e) & 0xff);
    }
    return;
  }
  (regs.eax = 0x200000, regs.ecx = 0x1000d, regs.edx = 0x5d001d, regs.ebx = 0x18a00a6, regs.ebp = 0x5d112b, regs.eax = FUN_005e3f31(heap));
  heap.setU32((iVar1 + 0x1c), (0x00651fa4) & 0xffffffff);
  heap.setU32((iVar1 + 0xc), (heap.u32((iVar1 + 0xc)) | 0xf000004) & 0xffffffff);
  heap.setU32((iVar1 + 0xc), (heap.u32((iVar1 + 0xc)) | 0x600001c0) & 0xffffffff);
  (regs.eax = 0x200000, regs.edx = 0x5d001d, regs.eax = FUN_005e412c(heap));
  heap.setU16((iVar1 + 0x30), (heap.u16(0x00652289)) & 0xffff);
  (regs.edx = 0x5d001d, regs.eax = FUN_005e6bcd(heap));
  (regs.eax = FUN_005e0c2f(heap));
  return (regs.eax = FUN_00424db7(heap));
}

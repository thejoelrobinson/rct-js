// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448d2b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_004490cb } from "./4490cb.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_00448d2b(heap) {
  let uVar1 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_DL = 0;
  let extraout_DX = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar2 = 0;
  let bVar3 = 0;
  if ((heap.u8(0x00630b21) == 2) && (heap.setU8(0x00630b1b, (heap.u8(0x00630b1b) + -1) & 0xff), heap.u8(0x00630b1b) < 0)) {
    heap.setU8(0x00630b1b, (5) & 0xff);
    heap.setU8(0x00630b1a, (heap.u8(0x00630b1a) ^ 1) & 0xff);
    heap.setU32(0x0099a4de, ((regs.eax = FUN_004490cb(heap))) >>> 0);
    heap.setU32(0x0099a4e2, ((extraout_DX & 0xff) << 2) >>> 0);
    heap.setU32(0x0099a4e4, (heap.u8(0x00630b18)) >>> 0);
    heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
    if ((heap.u8(0x00630b1a) & 1) != 0) {
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 4) >>> 0);
    }
    heap.setU32(0x0099a4e0, (extraout_CX) >>> 0);
    (regs.eax = FUN_005e5562(heap));
    bVar3 = ((false) & 0xff);
    if ((heap.u8(0x00630b1a) & 1) == 0) {
      uVar1 = (((regs.eax = FUN_004490cb(heap))) & 0xffff);
      if (!bVar3) {
        iVar2 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((unaff_EBX) >>> 0) >>> 8)), 0x79)) >>> 0);
        heap.setU8(0x00630b1c, (uVar1) & 0xff);
        heap.setU8(0x00630b1e, (extraout_CX_00) & 0xff);
        heap.setU8(0x00630b20, (extraout_DL) & 0xff);
        (regs.eax = FUN_00426f56(heap));
        heap.setU8(0x00630b22, (iVar2) & 0xff);
        (regs.eax = FUN_005e5301(heap));
        if (iVar2 != -0x80000000) {
          heap.setU8(0x00630b1a, (heap.u8(0x00630b1a) | 2) & 0xff);
        }
      }
    } else {
      if ((heap.u8(0x00630b1a) & 2) != 0) {
      heap.setU8(0x00630b1a, (heap.u8(0x00630b1a) & 0xfd) & 0xff);
      (regs.eax = FUN_00426f56(heap));
    }
    }
    return;
  }
  return;
}

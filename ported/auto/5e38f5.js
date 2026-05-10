// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e38f5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005e1f70 } from "./5e1f70.js";
import { FUN_005e1fdd } from "./5e1fdd.js";
import { FUN_005e2225 } from "./5e2225.js";
import { FUN_005e39c6 } from "./5e39c6.js";
import { FUN_005e6044 } from "./5e6044.js";
import { FUN_005e6078 } from "./5e6078.js";
export function FUN_005e38f5(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let unaff_EBX = regs.ebx >>> 0;
  uVar1 = ((heap.u32(0x0099a4fc) >>> 1) & 0xffff);
  heap.setU32(0x0099a4fc, (heap.u32(0x0099a4fc) & 0xfffd) >>> 0);
  if ((uVar1 & 1) != 0) {
    unaff_EBX = ((CONCAT31((regs.eax = callIndirect(heap, int3, unaff_EBX >>> 8)), 1)) >>> 0);
    in_EAX = (((regs.eax = FUN_00426f56(heap))) >>> 0);
  }
  if (heap.u8(0x00971ef0) != 0) {
    (regs.eax = FUN_005e39c6(heap));
    (regs.eax = FUN_005e1f70(heap));
    while (true) {
      in_EAX = (((regs.eax = FUN_005e1fdd(heap))) >>> 0);
      if (extraout_CX == 0) {
        break;
      }
      if ((((heap.u32(0x0099a500) & 1) == 0) || (heap.u8(0x00628cb9) == 0)) || (extraout_CX != 1)) {
        (regs.eax = FUN_005e2225(heap));
      } else {
        heap.setU8(0x00628cb9, (-2) & 0xff);
      }
    }
    if ((heap.u32(0x00991f30) >>> 5 & 1) != 0) {
      (regs.eax = FUN_005e2225(heap, unaff_EBX));
      return in_EAX;
    }
    if (in_EAX != 0x80000000) {
      if (((in_EAX) | 0) < 0) {
        in_EAX = ((0) >>> 0);
      }
      if (heap.u32(0x00971ed6) <= ((in_EAX) & 0xffff)) {
        in_EAX = ((((heap.u32(0x00971ed6) - 1) >>> 0)) >>> 0);
      }
      if (((unaff_EBX) | 0) < 0) {
        unaff_EBX = ((0) >>> 0);
      }
      if (heap.u32(0x00971ed8) <= ((unaff_EBX) & 0xffff)) {
        unaff_EBX = ((((heap.u32(0x00971ed8) - 1) >>> 0)) >>> 0);
      }
      (regs.eax = FUN_005e2225(heap, unaff_EBX, in_EAX));
      (regs.eax = FUN_005e6078(heap, unaff_EBX, in_EAX));
      in_EAX = (((regs.eax = FUN_005e6044(heap))) >>> 0);
    }
  }
  return in_EAX;
}

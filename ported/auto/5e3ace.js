// @manual — do not regenerate.
// Source: decompiled/c/5e3ace.c
//
// Disassembly at 0x5e3874 (FUN_005e3874) shows `push ecx ... pop ecx; ret`,
// so ECX is preserved across the call. Ghidra's `extraout_ECX` therefore
// reflects the caller's incoming ECX (which we already track as in_ECX).
// Translator-emitted `let extraout_ECX = 0` defeated that — restore the
// `in_ECX = extraout_ECX` line's intent by sourcing it from in_ECX.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3874 } from "./5e3874.js";
export function FUN_005e3ace(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = in_ECX;
  let sVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let puVar3 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar5 = 0;
  let puVar4 = 0;
  puVar1 = ((heap.u32(0x009a1164)) >>> 0);
  LAB_005e3ad4: do {
    do {
      do {
        puVar4 = ((puVar1) >>> 0);
        puVar3 = ((puVar4 + -0x178) >>> 0);
        if (puVar3 < 0x009a013c) {
          return;
        }
        puVar1 = ((puVar3) >>> 0);
      } while ((((in_EAX) << 16 >> 16) < heap.i16((puVar4 + -0x158))) || ((((heap.i16((puVar4 + -0x158)) + heap.i16((puVar4 + -0x154)))) << 16 >> 16) <= ((in_EAX) << 16 >> 16)));
    } while ((((unaff_EBX) << 16 >> 16) < heap.i16((puVar4 + -0x156))) || (sVar2 = ((heap.i16((puVar4 + -0x156)) + heap.i16((puVar4 + -0x152))) & 0xffff), uVar5 = ((((CONCAT24(sVar2, in_EAX)) >>> 0)) >>> 0), sVar2 <= ((unaff_EBX) << 16 >> 16)));
    if ((heap.u16((puVar4 + -0x146)) & 0x20) != 0) {
      uVar5 = (((regs.eax = FUN_005e3874(heap, unaff_EDI))) >>> 0);
      in_EAX = ((((uVar5) >>> 0)) >>> 0);
      in_ECX = ((extraout_ECX) >>> 0);
      if (((((uVar5 >>> 0x20)) | 0) | 0) == -1) {
        /* goto LAB_005e3ad4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e3ace/LAB_005e3ad4"); return 0;
      }
    }
    in_EAX = ((((uVar5) >>> 0)) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((puVar4 + -0x174)), unaff_EDI, puVar3, unaff_EBP, __addr_stack0x00000000, unaff_EBX, (((uVar5 >>> 0x20)) | 0), in_ECX));
    puVar1 = ((heap.u32(0x009a1164)) >>> 0);
    if (puVar3 != 0x0) {
      return;
    }
  } while (true);
} finally {
    heap.freeFrame(4);
  }
}

// @manual — do not regenerate.
// Source: decompiled/c/42fbc6.c
//
// Adds a register-prelude before FUN_0042f6a8 that the translator dropped:
// see comment on that call site for details.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f6a8 } from "./42f6a8.js";
import { FUN_0042f6b3 } from "./42f6b3.js";
import { FUN_0042f74a } from "./42f74a.js";
import { FUN_0042fa3a } from "./42fa3a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_0042fbc6(heap) {
  let iVar1 = 0;
  (regs.eax = FUN_005d3b30(heap));
  heap.setU8(0x005f8d35, (1) & 0xff);
  iVar1 = (((regs.eax = FUN_004083e1(heap, 0x0099aa88))) >>> 0);
  if ((iVar1 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    (regs.eax = FUN_0042f6b3(heap));
    // Binary (0x42fbee..0x42fbf3) sets ESI/ECX before calling 42f6a8:
    //   mov esi, 0x656b34
    //   mov ecx, 0x1f7a
    // (translator dropped register-arg MOVs; see 42f6a8.js comment.)
    regs.esi = 0x00656b34 >>> 0;
    regs.ecx = 0x1f7a;
    (regs.eax = FUN_0042f6a8(heap));
    (regs.eax = FUN_0042f74a(heap));
    (regs.eax = FUN_0042fa3a(heap));
    iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)))) >>> 0);
    if ((iVar1 != 0) && (heap.u8(0x005f88af) == 0)) {
      return (regs.eax = FUN_005e6028(heap));
    }
  }
  return;
}

// @manual — do not regenerate.
// Source: decompiled/c/5e69bd.c
//
// MINIMAL HAND-FIX on top of the auto-translation (binary 0x5e69bd..
// 0x5e6a54, tooltip window update). Two stale-register derefs fixed:
// the binary's `call [esi+4]` uses ESI from the FUN_005e3b2b find call
// immediately preceding it (0x5e6a0a/0x5e6a38), but the translation
// captured unaff_ESI once at ENTRY — dereferencing junk every tick
// (the per-tick `callIndirect 0x12000` warn). Re-read regs.esi after
// each find and skip the proc when not found (5e3b2b returns ESI=0 on
// miss).
//
// DELIBERATELY NOT FIXED (load-bearing divergences — a faithful
// rewrite exists in git history but BREAKS viewport_build_live's
// hover auto-resolve, which depends on this body running every tick):
// 1. `cmp byte [0x9a0128], 0xff` is read as u32 == -1, so the
//    "no tooltip -> return" early-out never fires and the body runs
//    unconditionally (binary: returns immediately when no tooltip).
// 2. The find calls get stale CL/DX instead of [0x9a0128]/[0x9a0126],
//    and the proc calls lack the binary's EDI/DX/BP/CL seeding.
// Re-do the faithful rewrite together with an oracle-gated pass over
// the input/hover chain (4270f2 -> 5e38f5 -> 5e1fdd -> 5e2225) so the
// hover auto-resolve stops depending on this function's side effects.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00403a92 } from "./403a92.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_005e6a55 } from "./5e6a55.js";
export function FUN_005e69bd(heap) {
  let iVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar2 = 0;
  uVar2 = (((heap.u32(0x009a0128) | 0) == -1) & 0xff);
  if (uVar2) {
    return;
  }
  (regs.eax = FUN_005e3b2b(heap));
  if (!uVar2) {
    if (heap.u32(0x009a0118) == 1) {
      uVar2 = ((heap.u32(0x009a0120) == 2) & 0xff);
      if (!uVar2) {
        (regs.eax = FUN_005e6a55(heap));
        (regs.eax = FUN_005e3b2b(heap));
        unaff_ESI = regs.esi >>> 0; // hand-fix: binary uses the find result
        if (unaff_ESI !== 0) {
          (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
        }
        return (regs.eax = FUN_005e698a(heap));
      }
    } else {
      iVar1 = (((regs.eax = FUN_00403a92(heap))) >>> 0);
      uVar2 = ((0) & 0xff);
      if (iVar1 == 1) {
        return;
      }
    }
  }
  (regs.eax = FUN_005e3b2b(heap));
  unaff_ESI = regs.esi >>> 0; // hand-fix: binary uses the find result
  if (!uVar2 && unaff_ESI !== 0) {
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  return (regs.eax = FUN_005e698a(heap));
}

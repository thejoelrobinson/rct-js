// @manual — do not regenerate.
// Source: decompiled/c/455ade.c
//
// Disassembly at 0x455b25..0x455b87: ride-window viewport sync. EDX = a
// packed ride-id|0xc0000000 (or 0xffff if water-ride), ECX = packed
// rotation byte at bits 8-15. Both are set before the call to FUN_005e6a83
// (free-routine) and read back after — and 5e6a83 only push/pops EDI/ESI
// so EDX/ECX survive intact. Ghidra's extraout_EDX/extraout_ECX correctly
// model that reload, but the translator initialised both to 0 — making
// every viewport's stored ride-id reset to 0 instead of the actual ride.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00455b88 } from "./455b88.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_00455ade(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let uVar4 = 0;
  let extraout_EDX = 0;
  let unaff_ESI = regs.esi >>> 0;
  if (heap.i16((unaff_ESI + 0x164)) == 0) {
    if (heap.u32((0x00743bbf) + (heap.u32((unaff_ESI + 0x30)) * 0x100) * 4) == 9) {
      uVar4 = ((0xffff) >>> 0);
      iVar3 = ((0) >>> 0);
    } else {
      uVar4 = ((heap.u16((unaff_ESI + 0x30)) | 0xc0000000) >>> 0);
      iVar3 = ((((heap.u8(0x00991f88)) >>> 0) << 8) >>> 0);
    }
    if (heap.i32((unaff_ESI + 8)) == 0) {
      uVar2 = ((0) & 0xffff);
      if (heap.u8(0x005f8d5c) == 1) {
        uVar2 = ((0x100) & 0xffff);
      }
    } else {
      if ((uVar4 == heap.u32((unaff_ESI + 0x15c))) && (iVar3 == heap.i32((unaff_ESI + 0x160)))) {
        return;
      }
      LOCK();
      puVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0);
      heap.setU32((unaff_ESI + 8), (0) & 0xffffffff);
      UNLOCK();
      heap.setU32(puVar1, (0) & 0xffffffff);
      uVar2 = (((regs.eax = FUN_005e6a83(heap))) & 0xffff);
      // Hand-fix: FUN_005e6a83 only push/pops EDI,ESI — EDX (uVar4) and
      // ECX (iVar3) are preserved. Reload from the local copies, not the
      // translator's zeroed extraout_* sentinels.
      extraout_ECX = iVar3;
      extraout_EDX = uVar4;
      iVar3 = ((extraout_ECX) >>> 0);
      uVar4 = ((extraout_EDX) >>> 0);
    }
    heap.setU32((unaff_ESI + 0x15c), (uVar4) & 0xffffffff);
    heap.setI32((unaff_ESI + 0x160), (iVar3) & 0xffffffff);
    if (uVar4 != 0xffff) {
      (regs.eax = 0x100, regs.eax = FUN_00455b88(heap), regs.edx = 0x740000, regs.eax);
    }
    if (heap.i32((unaff_ESI + 8)) != 0) {
      heap.setU16((heap.i32((unaff_ESI + 8)) + 0x12), (uVar2) & 0xffff);
    }
    (regs.eax = FUN_005e43de(heap), regs.edx = 0x740000, regs.eax);
  }
  return;
}

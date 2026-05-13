// @manual — do not regenerate.
// Source: decompiled/c/9b3000.c — the csg1.dat / csg1i.dat loader.
//
// Two translator bugs the auto-port had:
//   1. The binary explicitly sets `mov ebx, 0` before the first
//      `call 42f239` (path-builder for csg1.DAT) and `mov ebx, 1` before
//      the second (path-builder for csg1I.DAT). Ghidra modelled both
//      as `unaff_EBX` so the auto-translator dropped the assignments.
//      Without them EBX leaks from prior callee state and FUN_0042f239
//      builds the wrong path (or builds it twice with the same value),
//      breaking g1_elements[].
//   2. (Indirect, but fixed by the 4080e0 hand-port) FUN_004080e0
//      auto-port passed param_1=0 straight to CreateFileA, ignoring the
//      path-buffer convention. That broke the mmap even if EBX was
//      correct. See 4080e0.js header.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004080e0 } from "./4080e0.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_005df472 } from "./5df472.js";
import { FUN_009b308d } from "./9b308d.js";

export function FUN_009b3000(heap) {
  // EBX=0 selects CSG1.DAT path build inside FUN_0042f239.
  regs.ebx = 0;
  FUN_0042f239(heap);
  let iVar1 = FUN_004080e0(heap, 0, 0, 0) >>> 0;
  if (iVar1 === 0) return (regs.eax = FUN_005df472(heap));
  heap.setU32(0x009a2008, iVar1 >>> 0);

  // EBX=1 selects CSG1I.DAT path build.
  regs.ebx = 1;
  FUN_0042f239(heap);
  iVar1 = FUN_004083b5(heap, 1) >>> 0;
  if (iVar1 === 0xffffffff) return (regs.eax = FUN_005df472(heap));

  FUN_00408276(heap, iVar1, 0x008dc0b4, 0x95dd0, iVar1);
  FUN_00408387(heap, iVar1);

  // Relocate g1_elements[]: each 16-byte entry's first u32 is an
  // offset from the csg1.dat base — add the base pointer in-place.
  const base = heap.u32(0x009a2008) >>> 0;
  let piVar3 = 0x008dc0b4 >>> 0;
  for (let iVar2 = 0x95dd; iVar2 !== 0; iVar2--) {
    heap.setU32(piVar3, (heap.i32(piVar3) + base) >>> 0);
    piVar3 = (piVar3 + 16) >>> 0;
  }

  if (0x1ffffff < heap.u32(0x005f14fc)) FUN_009b308d(heap);
  return (regs.eax = 0);
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4183a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004182c0 } from "./4182c0.js";
import { FUN_004182b0 } from "./4182b0.js";
import { FUN_00418290 } from "./418290.js";
import { FUN_004181f0 } from "./4181f0.js";
import { FUN_004182e0 } from "./4182e0.js";

// @manual port (ADDENDUM 56): 80-bit-extended-float -> packed-float converter
// (printf %f/%e internals; param_3 = the format descriptor DAT_005ee9f8/DAT_005ee9e0).
// The auto stub THREW (parse failed). Faithful transcription of 4183a0.c.
//
// Stack-local modeling: the C declares three contiguous dwords {local_18, local_14,
// local_10} at [ebp-0x18..-0x10] plus local_c[12] at [ebp-0xc]. The helpers take
// `&local_18` / `local_c` as POINTERS, so the locals must live in real heap. We carve
// them out of the live stack BELOW the caller's esp (esp-0x40), exactly as the real
// prologue's `sub esp,..` would — reentrant-safe and below the caller's frame, so the
// interp's own esp-relative locals and ours both sit in untracked stack space.
export function FUN_004183a0(heap, param_1, param_2, param_3) {
  param_1 = param_1 >>> 0; param_2 = param_2 >>> 0; param_3 = param_3 >>> 0;
  const L = (regs.esp - 0x40) >>> 0;   // &local_18 : {local_18@L, local_14@L+4, local_10@L+8}
  const LC = (L + 0x10) >>> 0;         // local_c[12]

  const uVar1 = heap.u16((param_1 + 10) >>> 0);                 // param_1[5]
  heap.setU32((L + 4) >>> 0, heap.u32((param_1 + 2) >>> 0));    // local_14 = *(uint*)(param_1+1)
  heap.setU32(L, heap.u32((param_1 + 6) >>> 0));               // local_18 = *(uint*)(param_1+3)
  const uVar4 = (uVar1 & 0x7fff) >>> 0;
  let iVar5 = (uVar4 - 0x3fff) | 0;
  heap.setU32((L + 8) >>> 0, (heap.u16(param_1) << 16) >>> 0);  // local_10 = (uint)*param_1 << 0x10

  let uVar3 = 0;   // fall-through paths leave uVar3 = 0; goto-LAB paths override to 1/2

  if (iVar5 === -0x3fff) {
    iVar5 = 0;
    if ((FUN_004182c0(heap, L) | 0) === 0) {
      FUN_004182b0(heap, L);
      uVar3 = 2;
    }
    // else: iVar2 != 0 -> fall through to LAB with uVar3 = 0
  } else {
    FUN_00418290(heap, LC, L);
    const p3_2 = heap.i32((param_3 + 8) >>> 0);
    if ((FUN_004181f0(heap, L, p3_2) | 0) !== 0) {
      iVar5 = (uVar4 - 0x3ffe) | 0;
    }
    const p3_1 = heap.i32((param_3 + 4) >>> 0);
    if (iVar5 < ((p3_1 - p3_2) | 0)) {
      FUN_004182b0(heap, L);
      iVar5 = 0;
      uVar3 = 2;
    } else if (iVar5 <= p3_1) {
      FUN_00418290(heap, L, LC);
      FUN_004182e0(heap, L, (p3_1 - iVar5) | 0);
      FUN_004181f0(heap, L, p3_2);
      FUN_004182e0(heap, L, (heap.i32((param_3 + 0xc) >>> 0) + 1) | 0);   // param_3[3] + 1
      iVar5 = 0;
      uVar3 = 2;
    } else if (heap.i32(param_3) <= iVar5) {                     // *param_3 <= iVar5
      FUN_004182b0(heap, L);
      heap.setU32(L, (heap.u32(L) | 0x80000000) >>> 0);
      FUN_004182e0(heap, L, heap.i32((param_3 + 0xc) >>> 0));     // param_3[3]
      iVar5 = (heap.i32((param_3 + 0x14) >>> 0) + heap.i32(param_3)) | 0;  // param_3[5] + *param_3
      uVar3 = 1;
    } else {
      iVar5 = (heap.i32((param_3 + 0x14) >>> 0) + iVar5) | 0;     // param_3[5] + iVar5
      heap.setU32(L, (heap.u32(L) & 0x7fffffff) >>> 0);
      FUN_004182e0(heap, L, heap.i32((param_3 + 0xc) >>> 0));     // param_3[3]
      // uVar3 stays 0
    }
  }

  // LAB_00418521:
  const charP33 = (heap.i32((param_3 + 0xc) >>> 0) << 24) >> 24;  // (char)param_3[3]
  const sh = (0x1f - charP33) & 0x1f;                             // 0x1fU - (char)param_3[3] & 0x1f
  const sign = (uVar1 & 0x8000) !== 0 ? 0x80000000 : 0;          // -(uint)(...) & 0x80000000
  heap.setU32(L, (((iVar5 << sh) | sign | heap.u32(L)) >>> 0));

  const p3_4 = heap.i32((param_3 + 0x10) >>> 0);                  // param_3[4]
  if (p3_4 === 0x40) {
    heap.setU32((param_2 + 4) >>> 0, heap.u32(L));               // param_2[1] = local_18
    heap.setU32(param_2, heap.u32((L + 4) >>> 0));               // *param_2 = local_14
  } else if (p3_4 === 0x20) {
    heap.setU32(param_2, heap.u32(L));                           // *param_2 = local_18
  }
  // Return convention (verified vs interp via _invoke-diff): eax carries uVar3; the
  // binary's last act is a store to param_2, leaving ecx = param_2 (caller-saved scratch).
  regs.eax = uVar3 >>> 0;
  regs.ecx = param_2 >>> 0;
  return uVar3 >>> 0;
}

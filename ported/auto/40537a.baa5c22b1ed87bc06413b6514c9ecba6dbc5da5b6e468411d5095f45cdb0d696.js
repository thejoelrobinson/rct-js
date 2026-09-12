// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40537a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { RegCloseKey, RegDeleteKeyA, RegFlushKey, RegOpenKeyExA, RegQueryValueExA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_00413180 } from "./413180.js";
export function FUN_0040537a(heap, param_1) {
  const __sp = heap.allocFrame(644);
  const __addr_local_123 = __sp + 5;
  const __addr_local_124 = __sp + 4;
  const __addr_local_24 = __sp + 260;
  const __addr_local_a4 = __sp + 132;
  const __addr_local_20 = __sp + 264;
  const __addr_local_1c = __sp + 268;
  const __addr_local_18 = __sp + 272;
  const __addr_local_14 = __sp + 276;
  const __addr_local_10 = __sp + 280;
  const __addr_local_c = __sp + 284;
  const __addr_local_e = __sp + 282;
  try {
  let LVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  heap.setU32(__addr_local_20, ((0x005ebd4c & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_1c, ((((0x005ebd4c) >>> 32) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_18, ((((0x005ebd4c) >>> 64) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_14, ((((0x005ebd4c) >>> 96) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_10, ((((0x005ebd4c) >>> 128) & 0xffff)) >>> 0);
  heap.setU32(__addr_local_e, (0) >>> 0);
  heap.setU32(__addr_local_124, (heap.u32(0x005ebd60)) >>> 0);
  puVar4 = ((__addr_local_123) >>> 0);
  for (iVar3 = ((0x1f) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar4, (0) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
  }
  heap.setU16(puVar4, (0) & 0xffff);
  heap.setU8((((puVar4) | 0) + 2), (0) & 0xff);
  (regs.eax = FUN_00413170(heap, __addr_local_124, __addr_local_20));
  (regs.eax = FUN_00413180(heap, __addr_local_124, param_1));
  LVar1 = ((RegOpenKeyExA(heap, ((0x80000002) | 0), __addr_local_124, 0, 0xf003f, __addr_local_24)) >>> 0);
  if (LVar1 == 0) {
    heap.setU32((__addr_local_c + (1) * 4), (0x80) & 0xffffffff);
    LVar1 = ((RegQueryValueExA(heap, heap.u32(__addr_local_24), ((0x0) | 0), ((0x0) | 0), __addr_local_c, __addr_local_a4, __addr_local_c + 1)) >>> 0);
    if (LVar1 == 0) {
      RegCloseKey(heap, heap.u32(__addr_local_24));
      LVar1 = ((RegDeleteKeyA(heap, ((0x80000002) | 0), __addr_local_124)) >>> 0);
      if (LVar1 == 0) {
        (regs.eax = FUN_00413170(heap, __addr_local_124, __addr_local_20));
        (regs.eax = FUN_00413180(heap, __addr_local_124, __addr_local_a4));
        LVar1 = ((RegDeleteKeyA(heap, ((0x80000002) | 0), __addr_local_124)) >>> 0);
        if (LVar1 == 0) {
          RegFlushKey(heap, ((0x80000002) | 0));
          uVar2 = ((1) >>> 0);
        } else {
          uVar2 = ((0) >>> 0);
        }
      } else {
        uVar2 = ((0) >>> 0);
      }
    } else {
      uVar2 = ((0) >>> 0);
    }
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(644);
  }
}

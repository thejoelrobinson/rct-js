// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401220.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
import { FUN_00405fe2 } from "./405fe2.js";
import { FUN_004061b9 } from "./4061b9.js";
export function FUN_00401220(heap, param_1) {
  let iVar1 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_c = ((0) >>> 0);
  (regs.eax = FUN_004061b9(heap));
  if (heap.u32(0x005e9100) != 0) {
    (regs.eax = callIndirect(heap, heap.u32(0x005ebe90), heap.u32(0x005e9100)));
  }
  heap.setU32(0x005e9100, (0) >>> 0);
  switch (param_1) {
    case 1:
      local_c = (((regs.eax = FUN_00405fe2(heap, 1, heap.u32(0x005e9134), heap.u32(0x005e9138), 8, 0, 0, 0, heap.u32(0x005e913c), heap.u32(0x005e9140)))) >>> 0);
      local_8 = ((heap.u32(0x005f15a8)) >>> 0);
      local_10 = ((heap.u32(0x005f15ac)) >>> 0);
      break;
    case 2:
      if (heap.u32(0x005f15b0) != 8) {
        heap.setU32(0x005e9100, (0) >>> 0);
        return 0;
      }
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, heap.u32(0x005e9134), heap.u32(0x005e9138), 8, 0, 0, 0, heap.u32(0x005e913c), heap.u32(0x005e9140)))) >>> 0);
      local_8 = ((heap.u32(0x005f15a8)) >>> 0);
      local_10 = ((heap.u32(0x005f15ac)) >>> 0);
      break;
    case 3:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 0x280, 0x1e0, 8, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((0x280) >>> 0);
      local_10 = ((0x1e0) >>> 0);
      break;
    case 4:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 800, 600, 8, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((800) >>> 0);
      local_10 = ((600) >>> 0);
      break;
    case 5:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 0x400, 0x300, 8, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((0x400) >>> 0);
      local_10 = ((0x300) >>> 0);
      break;
    case 6:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 0x480, 0x360, 8, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((0x480) >>> 0);
      local_10 = ((0x360) >>> 0);
      break;
    case 7:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 0x500, 0x400, 8, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((0x500) >>> 0);
      local_10 = ((0x400) >>> 0);
      break;
    case 8:
      local_c = (((regs.eax = FUN_00405fe2(heap, 2, 0x280, 0x1e0, 0x10, 0, 0, 1, 0, 0))) >>> 0);
      local_8 = ((0x280) >>> 0);
      local_10 = ((0x1e0) >>> 0);
  }
  if (local_c == 0) {
    heap.setU32(0x005e910c, (0) >>> 0);
  } else {
    if (0x500 < local_8) {
      local_8 = ((0x500) >>> 0);
    }
    if (0x400 < local_10) {
      local_10 = ((0x400) >>> 0);
    }
    heap.setU32(0x005f1a04, (0x140) >>> 0);
    heap.setU32(0x005f1fc0, (local_8) >>> 0);
    heap.setU32(0x005f139c, (0xf0) >>> 0);
    heap.setU32(0x005f1b28, (local_10) >>> 0);
    heap.setU32(0x005e9100, ((regs.eax = callIndirect(heap, heap.u32(0x005ebe8c), local_8, local_10))) >>> 0);
    iVar1 = (((regs.eax = FUN_00402a00(heap))) >>> 0);
    if (iVar1 == 0) {
      local_c = ((0) >>> 0);
    } else {
      (regs.eax = FUN_00402aa4(heap));
      heap.setU32(0x005e9154, (1) >>> 0);
      heap.setU32(0x005e910c, (param_1) >>> 0);
    }
  }
  return local_c;
}

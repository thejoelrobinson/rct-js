// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4072f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DirectSoundCreate, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00407f70 } from "./407f70.js";
import { FUN_00407faf } from "./407faf.js";
export function FUN_004072f0(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(68);
  const __addr_local_1c = __sp + 44;
  const __addr_local_44 = __sp + 4;
  const __addr_local_30 = __sp + 24;
  const __addr_local_18 = __sp + 48;
  const __addr_local_14 = __sp + 52;
  const __addr_local_c = __sp + 60;
  const __addr_local_8 = __sp + 64;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  if (param_2 == 0) {
    heap.setU32(__addr_local_8, (0) >>> 0);
  } else {
    if (heap.u32(0x005ebf0c) <= param_2) {
      return 0;
    }
    heap.setU32(__addr_local_8, (param_2 * 0x210 + heap.u32(0x005ebf10)) >>> 0);
  }
  _memset(heap, 0x005f0380, 0, 0x12);
  heap.setU32(0x005f0380, (1) >>> 0);
  heap.setU32(0x005f0382, (((param_3) & 0xffff)) >>> 0);
  heap.setU32(0x005f0384, (param_4) >>> 0);
  uVar1 = (((((param_3 * param_5 + (param_3 * param_5 >>> 0x1f & 7))) | 0) >>> 3) >>> 0);
  heap.setU32(0x005f038c, (((uVar1) & 0xffff)) >>> 0);
  heap.setU32(0x005f0388, ((uVar1 & 0xffff) * param_4) >>> 0);
  heap.setU32(0x005f038e, (((param_5) & 0xffff)) >>> 0);
  heap.setU32(0x005f0390, (0) >>> 0);
  _memset(heap, __addr_local_1c, 0, 0x14);
  heap.setU32(__addr_local_1c, (0x14) >>> 0);
  heap.setU32(__addr_local_14, (0) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  if (param_1 == 0) {
    heap.setU32(__addr_local_18, (1) >>> 0);
    if (heap.u32(0x005ebf14) != 0) {
      heap.setU32(__addr_local_18, (0x4001) >>> 0);
    }
    iVar2 = ((DirectSoundCreate(heap, heap.u32(__addr_local_8), 0x005ec05c, 0)) >>> 0);
    if (iVar2 == 0) {
      iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0x18)), heap.u32(0x005ec05c), heap.u32(0x005e916c), 2))) >>> 0);
      if (iVar2 == 0) {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0xc)), heap.u32(0x005ec05c), __addr_local_1c, 0x005ec064, 0))) >>> 0);
        if (iVar2 == 0) {
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 0x14)), heap.u32(0x005ec064), __addr_local_44, 0x12, 0));
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 0x38)), heap.u32(0x005ec064), 0x005f0380));
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 0x14)), heap.u32(0x005ec064), __addr_local_30, 0x12, 0));
          return 1;
        }
        (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 8)), heap.u32(0x005ec064)));
        heap.setU32(0x005ec064, (0x0) >>> 0);
      }
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 8)), heap.u32(0x005ec05c)));
      heap.setU32(0x005ec05c, (0x0) >>> 0);
    }
  } else {
    if (param_1 == 1) {
    heap.setU32(__addr_local_18, (0x11) >>> 0);
    if (heap.u32(0x005ebf14) != 0) {
      heap.setU32(__addr_local_18, (0x4011) >>> 0);
    }
    iVar2 = ((DirectSoundCreate(heap, heap.u32(__addr_local_8), 0x005ec05c, 0)) >>> 0);
    if (iVar2 == 0) {
      iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0x18)), heap.u32(0x005ec05c), heap.u32(0x005e916c), 1))) >>> 0);
      if ((iVar2 == 0) && (iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0xc)), heap.u32(0x005ec05c), __addr_local_1c, 0x005ec064, 0))) >>> 0), iVar2 == 0)) {
        iVar2 = (((regs.eax = callIndirect(heap, heap.u32(heap.u32(heap.u32(0x005ec064))), heap.u32(0x005ec064), 0x005e7cd0, 0x005ec060))) >>> 0);
        if (iVar2 == 0) {
          _memset(heap, heap.u32(0x005ec068), 0, 0x40);
          heap.setU32(heap.u32(0x005ec068), (0x40) & 0xffffffff);
          iVar2 = (((regs.eax = FUN_00407f70(heap))) >>> 0);
          if (iVar2 != 0) {
            heap.setU32((heap.u32(0x005ec068) + 4), (0) & 0xffffffff);
          }
          heap.setU32((heap.u32(0x005ec068) + 8), (0) & 0xffffffff);
          heap.setU32((heap.u32(0x005ec068) + 4), (0xbf800000) & 0xffffffff);
          heap.setU32((heap.u32(0x005ec068) + 0x3c), (0x411e6666) & 0xffffffff);
          heap.setU32((heap.u32(0x005ec068) + 0x38), (0x3e800000) & 0xffffffff);
          iVar2 = (((regs.eax = FUN_00407faf(heap))) >>> 0);
          if (((iVar2 != 0) && (iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec060)) + 0x44)), heap.u32(0x005ec060)))) >>> 0), iVar2 == 0)) && (iVar2 = (((regs.eax = FUN_00407f70(heap))) >>> 0), iVar2 != 0)) {
            return 1;
          }
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec060)) + 8)), heap.u32(0x005ec060)));
          heap.setU32(0x005ec060, (0x0) >>> 0);
        }
        (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec064)) + 8)), heap.u32(0x005ec064)));
        heap.setU32(0x005ec064, (0x0) >>> 0);
      }
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 8)), heap.u32(0x005ec05c)));
      heap.setU32(0x005ec05c, (0x0) >>> 0);
    }
  }
  }
  return 0;
} finally {
    heap.freeFrame(68);
  }
}

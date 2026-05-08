// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4072f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DirectSoundCreate } from "../runtime/win32.js";
import { FUN_00407f70 } from "./407f70.js";
import { FUN_00407faf } from "./407faf.js";
export function FUN_004072f0(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(64);
  const __addr_DAT_005f0380 = __sp + 0;
  const __addr_local_1c = __sp + 4;
  const __addr_DAT_005ec05c = __sp + 8;
  const __addr_DAT_005ec064 = __sp + 12;
  const __addr_DAT_005e7cd0 = __sp + 16;
  const __addr_DAT_005ec060 = __sp + 20;
  const __addr_local_44 = __sp + 24;
  const __addr_local_30 = __sp + 44;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_c = 0;
  let local_8 = 0;
  if (param_2 == 0) {
    local_8 = 0;
  } else {
    if (heap.u32(0x005ebf0c) <= param_2) {
      return 0;
    }
    local_8 = param_2 * 0x210 + heap.u32(0x005ebf10);
  }
  _memset(__addr_DAT_005f0380, 0, 0x12);
  heap.setU32(0x005f0380, (1) >>> 0);
  heap.setU32(0x005f0382, (param_3) >>> 0);
  heap.setU32(0x005f0384, (param_4) >>> 0);
  uVar1 = (param_3 * param_5 + (param_3 * param_5 >>> 0x1f & 7U)) >>> 3;
  heap.setU32(0x005f038c, (uVar1) >>> 0);
  heap.setU32(0x005f0388, ((uVar1 & 0xffff) * param_4) >>> 0);
  heap.setU32(0x005f038e, (param_5) >>> 0);
  heap.setU32(0x005f0390, (0) >>> 0);
  _memset(__addr_local_1c, 0, 0x14);
  heap.setU32(__addr_local_1c, (0x14) >>> 0);
  local_14 = 0;
  local_c = 0;
  if (param_1 == 0) {
    local_18 = 1;
    if (heap.u32(0x005ebf14) != 0) {
      local_18 = 0x4001;
    }
    iVar2 = DirectSoundCreate(heap, local_8, __addr_DAT_005ec05c, 0);
    if (iVar2 == 0) {
      iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 0x18))))(heap.u32(__addr_DAT_005ec05c), heap.u32(0x005e916c), 2);
      if (iVar2 == 0) {
        iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 0xc))))(heap.u32(__addr_DAT_005ec05c), __addr_local_1c, __addr_DAT_005ec064, 0);
        if (iVar2 == 0) {
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec064)) + 0x14))))(heap.u32(__addr_DAT_005ec064), __addr_local_44, 0x12, 0);
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec064)) + 0x38))))(heap.u32(__addr_DAT_005ec064), __addr_DAT_005f0380);
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec064)) + 0x14))))(heap.u32(__addr_DAT_005ec064), __addr_local_30, 0x12, 0);
          return 1;
        }
        (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec064)) + 8))))(heap.u32(__addr_DAT_005ec064));
        heap.setU32(0x005ec064, (0x0) >>> 0);
      }
      (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 8))))(heap.u32(__addr_DAT_005ec05c));
      heap.setU32(0x005ec05c, (0x0) >>> 0);
    }
  } else {
    if (param_1 == 1) {
    local_18 = 0x11;
    if (heap.u32(0x005ebf14) != 0) {
      local_18 = 0x4011;
    }
    iVar2 = DirectSoundCreate(heap, local_8, __addr_DAT_005ec05c, 0);
    if (iVar2 == 0) {
      iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 0x18))))(heap.u32(__addr_DAT_005ec05c), heap.u32(0x005e916c), 1);
      if ((iVar2 == 0) && (iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 0xc))))(heap.u32(__addr_DAT_005ec05c), __addr_local_1c, __addr_DAT_005ec064, 0), iVar2 == 0)) {
        iVar2 = (heap.u32(heap.u32(heap.u32(heap.u32(__addr_DAT_005ec064)))))(heap.u32(__addr_DAT_005ec064), __addr_DAT_005e7cd0, __addr_DAT_005ec060);
        if (iVar2 == 0) {
          _memset(heap.u32(0x005ec068), 0, 0x40);
          heap.u32(heap.u32(0x005ec068)) = 0x40;
          iVar2 = FUN_00407f70(heap);
          if (iVar2 != 0) {
            heap.u32((heap.u32(0x005ec068) + 4)) = 0;
          }
          heap.u32((heap.u32(0x005ec068) + 8)) = 0;
          heap.u32((heap.u32(0x005ec068) + 4)) = 0xbf800000;
          heap.u32((heap.u32(0x005ec068) + 0x3c)) = 0x411e6666;
          heap.u32((heap.u32(0x005ec068) + 0x38)) = 0x3e800000;
          iVar2 = FUN_00407faf(heap);
          if (((iVar2 != 0) && (iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec060)) + 0x44))))(heap.u32(__addr_DAT_005ec060)), iVar2 == 0)) && (iVar2 = FUN_00407f70(heap), iVar2 != 0)) {
            return 1;
          }
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec060)) + 8))))(heap.u32(__addr_DAT_005ec060));
          heap.setU32(0x005ec060, (0x0) >>> 0);
        }
        (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec064)) + 8))))(heap.u32(__addr_DAT_005ec064));
        heap.setU32(0x005ec064, (0x0) >>> 0);
      }
      (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ec05c)) + 8))))(heap.u32(__addr_DAT_005ec05c));
      heap.setU32(0x005ec05c, (0x0) >>> 0);
    }
  }
  }
  return 0;
} finally {
    heap.freeFrame(64);
  }
}

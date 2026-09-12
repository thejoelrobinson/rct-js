// @manual — do not regenerate.
// Source: decompiled/c/411b58.c
// Fix: local_41c is a byte[1024] (RGBA pixel buffer); translator emitted
// setU32 for byte stores and doubled the index (`(i*4)*4`). Fixed three
// loops (gradient init, BGR swap, BMP-load) — all setU32→setU8,
// heap.u32→heap.u8 on reads, removed extra `*4`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FindResourceA, LoadResource, LockResource, _lclose, _lopen, _lread } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00411b58(heap, param_1, param_2) {
  const __sp = heap.allocFrame(1112);
  const __addr_local_14 = __sp + 1096;
  const __addr_local_458 = __sp + 4;
  const __addr_local_430 = __sp + 44;
  const __addr_local_41c = __sp + 64;
  const __addr_local_44a = __sp + 18;
  const __addr_local_438 = __sp + 36;
  const __addr_local_420 = __sp + 60;
  const __addr_local_1c = __sp + 1088;
  const __addr_local_18 = __sp + 1092;
  const __addr_local_10 = __sp + 1100;
  const __addr_local_c = __sp + 1104;
  const __addr_local_8 = __sp + 1108;
  try {
  let uVar1 = 0;
  let hResData = 0;
  for (heap.setU32(__addr_local_18, (0) >>> 0); ((heap.u32(__addr_local_18)) | 0) < 0x100; heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) + 1) >>> 0)) {
    heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4), ((((((heap.u32(__addr_local_18) >>> 5 & 7) * 0xff) / 7)) << 24 >> 24)) & 0xff);
    heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 1), ((((((heap.u32(__addr_local_18) >>> 2 & 7) * 0xff) / 7)) << 24 >> 24)) & 0xff);
    heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 2), ((((((heap.u32(__addr_local_18) & 3) * 0xff) / 3)) << 24 >> 24)) & 0xff);
    heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 3), (0) & 0xff);
  }
  if ((param_2 == ((0x0) | 0)) || (heap.setU32(__addr_local_10, (FindResourceA(heap, ((0x0) | 0), param_2, ((0x2) | 0))) >>> 0), heap.u32(__addr_local_10) == ((0x0) | 0))) {
    if ((param_2 != ((0x0) | 0)) && (heap.setU32(__addr_local_c, (_lopen(heap, param_2, 0)) >>> 0), (heap.u32(__addr_local_c) | 0) != -1)) {
      _lread(heap, heap.u32(__addr_local_c), __addr_local_430, 0xe);
      _lread(heap, heap.u32(__addr_local_c), __addr_local_458, 0x28);
      _lread(heap, heap.u32(__addr_local_c), __addr_local_41c, 0x400);
      _lclose(heap, heap.u32(__addr_local_c));
      if (heap.u32(__addr_local_458 + (0) * 4) == 0x28) {
        if (heap.u32(__addr_local_44a) < 9) {
          if (heap.u32(__addr_local_438) == 0) {
            heap.setU32(__addr_local_420, (1 << (((heap.u32(__addr_local_44a)) & 0xff) & 0x1f)) >>> 0);
          } else {
            heap.setU32(__addr_local_420, (heap.u32(__addr_local_438)) >>> 0);
          }
        } else {
          heap.setU32(__addr_local_420, (0) >>> 0);
        }
      } else {
        heap.setU32(__addr_local_420, (0) >>> 0);
      }
      for (heap.setU32(__addr_local_18, (0) >>> 0); ((heap.u32(__addr_local_18)) | 0) < ((heap.u32(__addr_local_420)) | 0); heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) + 1) >>> 0)) {
        uVar1 = ((heap.u8(__addr_local_41c + heap.u32(__addr_local_18) * 4)) & 0xff);
        heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4), (heap.u8(__addr_local_41c + heap.u32(__addr_local_18) * 4 + 2)) & 0xff);
        heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 2), (uVar1) & 0xff);
      }
    }
  } else {
    hResData = ((LoadResource(heap, ((0x0) | 0), heap.u32(__addr_local_10))) >>> 0);
    heap.setU32(__addr_local_1c, (LockResource(heap, hResData)) >>> 0);
    heap.setU32(__addr_local_8, (heap.u32(heap.u32(__addr_local_1c)) + ((heap.u32(__addr_local_1c)) | 0)) >>> 0);
    if ((heap.u32(__addr_local_1c) == 0x0) || (heap.u32(heap.u32(__addr_local_1c)) < 0x28)) {
      heap.setU32(__addr_local_420, (0) >>> 0);
    } else {
      if (heap.u16((((heap.u32(__addr_local_1c)) | 0) + 0xe)) < 9) {
      if (heap.u32(heap.u32(__addr_local_1c) + (8) * 4) == 0) {
        heap.setU32(__addr_local_420, (1 << (heap.u8((((heap.u32(__addr_local_1c)) | 0) + 0xe)) & 0x1f)) >>> 0);
      } else {
        heap.setU32(__addr_local_420, (heap.u32(heap.u32(__addr_local_1c) + (8) * 4)) >>> 0);
      }
    } else {
      heap.setU32(__addr_local_420, (0) >>> 0);
    }
    }
    for (heap.setU32(__addr_local_18, (0) >>> 0); ((heap.u32(__addr_local_18)) | 0) < ((heap.u32(__addr_local_420)) | 0); heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) + 1) >>> 0)) {
      heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4), (heap.u8((heap.u32(__addr_local_8) + 2 + heap.u32(__addr_local_18) * 4))) & 0xff);
      heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 1), (heap.u8((heap.u32(__addr_local_8) + 1 + heap.u32(__addr_local_18) * 4))) & 0xff);
      heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 2), (heap.u8((heap.u32(__addr_local_8) + heap.u32(__addr_local_18) * 4))) & 0xff);
      heap.setU8((__addr_local_41c + heap.u32(__addr_local_18) * 4 + 3), (0) & 0xff);
    }
  }
  (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x14)), param_1, 4, __addr_local_41c, __addr_local_14, 0));
  return heap.u32(__addr_local_14);
} finally {
    heap.freeFrame(1112);
  }
}

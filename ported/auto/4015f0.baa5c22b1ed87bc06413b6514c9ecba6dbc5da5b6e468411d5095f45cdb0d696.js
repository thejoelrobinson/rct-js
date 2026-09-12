// @manual — do not regenerate.
//
// Source: decompiled/c/4015f0.c — dirty-flag marker for a rectangular
// blit region (called when invalidating tiles for redraw).
//
// Hand-port fix (stride bug, same family as 40179d.js): the auto-translator
// emitted the dirty-table set loop with u32 stride:
//
//     heap.setU32(0x5f2420 + local_30 * 4, 1);   // WRONG (u32 stride)
//
// But the binary uses a BYTE store (`movb $0x1, 0x5f2420(%eax)` —
// opcode `c6 80 20 24 5f 00 01` at 0x401787). The dirty-flag table at
// 0x5f2420 is byte-addressed (see 40179d.js header for the full story;
// the clear path is the matching memset, this is the set path).
// Writing u32 here overruns PTR_LAB_005f49a0 the same way the clear loop
// did before bfa052c.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004015f0(heap, param_1, param_2, param_3, param_4) {
  let iVar1 = 0;
  let iVar2 = 0;
  let local_30 = 0;
  let local_24 = 0;
  let local_14 = 0;
  iVar2 = ((param_4) >>> 0);
  iVar1 = ((param_3) >>> 0);
  if (param_3 < param_1) {
    param_3 = ((param_1) >>> 0);
    param_1 = ((iVar1) >>> 0);
  }
  if (param_4 < param_2) {
    param_4 = ((param_2) >>> 0);
    param_2 = ((iVar2) >>> 0);
  }
  if ((((param_1 <= heap.u32(0x005f15c4)) && (-1 < (param_3 | 0))) && (param_2 <= heap.u32(0x005f1b34))) && (-1 < (param_4 | 0))) {
    if (param_1 < 0) {
      param_1 = ((0) >>> 0);
    }
    if (heap.u32(0x005f15c4) < param_3) {
      param_3 = ((heap.u32(0x005f15c4)) >>> 0);
    }
    if (param_2 < 0) {
      param_2 = ((0) >>> 0);
    }
    if (heap.u32(0x005f1b34) < param_4) {
      param_4 = ((heap.u32(0x005f1b34)) >>> 0);
    }
    if ((0 < param_3 - param_1) && (0 < param_4 - param_2)) {
      iVar1 = (((((param_1 + (param_1 >>> 0x1f & 0x3f))) | 0) >>> 6) >>> 0);
      iVar2 = (((((param_2 + (param_2 >>> 0x1f & 7))) | 0) >>> 3) >>> 0);
      local_30 = ((iVar2 * 0x14 + iVar1) >>> 0);
      iVar1 = (((((((param_3 + (param_3 >>> 0x1f & 0x3f))) | 0) >>> 6) - iVar1) + 1) >>> 0);
      for (local_24 = ((0) >>> 0); local_24 < (((((param_4 + (param_4 >>> 0x1f & 7))) | 0) >>> 3) - iVar2) + 1; local_24 = (((local_24 + 1) >>> 0)) >>> 0) {
        for (local_14 = ((0) >>> 0); local_14 < iVar1; local_14 = (((local_14 + 1) >>> 0)) >>> 0) {
          // BYTE-stride set (was u32 stride; see header for the bug).
          heap.setU8(((0x005f2420) + local_30) >>> 0, 1);
          local_30 = ((local_30 + 1) >>> 0);
          heap.setU32(0x005e9158, (heap.u32(0x005e9158) + 1) >>> 0);
        }
        local_30 = ((local_30 + (0x14 - iVar1)) >>> 0);
      }
    }
  }
  return;
}

// @manual — do not regenerate.
//
// Source: decompiled/c/402027.c — DDraw blit from source buffer
// (DAT_005f1fec) to locked back-buffer surface. The auto-translated
// dword-stride pixel-copy loop is correct but slow in JS (~14M heap
// ops per call from 76,800 iterations × multiple ops each), making
// the per-tick wallclock too long. Hand-port using contiguous bulk
// copies instead.

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";

export function FUN_00402027(heap) {
  const sp = heap.allocFrame(180);
  try {
    // local_b8 wrapper struct at sp+0; layout matches FUN_00408f53.
    const local_b8 = sp + 0;
    // Call lock-setup (DAT_005ebe58 = FUN_00408f00).
    let iVar1 = callIndirect(heap, heap.u32(0x005ebe58), local_b8) | 0;
    if (iVar1 === 0) return 0;
    // Call lock-execute (DAT_005ebe5c = FUN_00408f53).
    iVar1 = callIndirect(heap, heap.u32(0x005ebe5c), local_b8) | 0;
    if (iVar1 === 0) return 0;
    // Per-mode entry check.
    iVar1 = FUN_00402a00(heap) | 0;
    if (iVar1 === 0) {
      callIndirect(heap, heap.u32(0x005ebe60), local_b8);
      return 0;
    }
    // After lock: wrapper has lpSurface@0, width@6 (ushort), height@8 (ushort), pitch@10.
    const dstBase = heap.u32(local_b8 + 0);
    const width   = heap.u16(local_b8 + 6);
    const height  = heap.u16(local_b8 + 8);
    const dstPitch = heap.u32(local_b8 + 16);          // local_a8 — stride
    const srcBase = heap.u32(0x005f1fec);               // game framebuffer
    const srcPitch = heap.u32(0x005f1ff4);              // source stride
    if (dstBase && srcBase && width && height) {
      const bytes = heap.bytes;
      // Bulk row-copy via Uint8Array.copyWithin where possible.
      for (let y = 0; y < height; y++) {
        const dstRow = (dstBase + y * dstPitch) >>> 0;
        const srcRow = (srcBase + y * srcPitch) >>> 0;
        bytes.copyWithin(dstRow, srcRow, srcRow + width);
      }
    }
    FUN_00402aa4(heap);
    callIndirect(heap, heap.u32(0x005ebe60), local_b8);   // Unlock
    heap.setU32(0x005f1fe0, 1);
    regs.eax = 1;
    return 1;
  } finally {
    heap.freeFrame(180);
  }
}

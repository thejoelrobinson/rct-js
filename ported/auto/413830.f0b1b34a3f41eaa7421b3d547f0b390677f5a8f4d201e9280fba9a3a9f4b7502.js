// @manual — do not regenerate.
//
// Source: decompiled/c/413830.c — the binary's calloc-style allocator.
//
// Why hand-ported: the C uses a backward `goto LAB_00413890` to share a
// "if (puVar3 != 0) return puVar3;" check between the pool-success and
// pool-skip branches. The translator's goto-lowering pass only handles
// forward gotos, so the goto site became `return 0`, which made every
// allocation through this function fail — cascading to FUN_004097f7's
// failure to create the DDraw back-buffer surface, which kept the title-
// screen render path silent.
//
// Algorithm preserved exactly:
//   1. Round dwBytes up to 16-byte alignment (or 0x10 if zero).
//   2. If pool capacity (DAT_005ee524) >= request, try the pool allocator
//      (FUN_00415770). On success, zero the bytes and return.
//   3. Else fall back to HeapAlloc(handle, HEAP_ZERO_MEMORY=8, dwBytes).
//   4. If allocation fails AND an OOM handler (DAT_005f0244) is set, call
//      FUN_004153f0 and retry. Else return 0.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapAlloc } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004153f0 } from "./4153f0.js";
import { FUN_00415770 } from "./415770.js";

export function FUN_00413830(heap, count, size) {
  let dwBytes = (size * count) >>> 0;
  if (dwBytes < 0xffffffe1) {
    dwBytes = dwBytes === 0 ? 0x10 : ((dwBytes + 0xf) & 0xfffffff0) >>> 0;
  }
  while (true) {
    let ptr = 0;
    if (dwBytes < 0xffffffe1) {
      if (heap.u32(0x005ee524) >= dwBytes) {
        ptr = (regs.eax = FUN_00415770(heap, dwBytes >>> 4)) >>> 0;
        if (ptr !== 0) {
          // Zero the allocated region (calloc semantics).
          const wordEnd = ptr + (dwBytes & ~3);
          for (let p = ptr; p < wordEnd; p += 4) heap.setU32(p, 0);
          for (let p = wordEnd, end = ptr + dwBytes; p < end; p++) heap.setU8(p, 0);
          return ptr;
        }
      }
      ptr = HeapAlloc(heap, heap.u32(0x005f3e44), 8, dwBytes) >>> 0;
    }
    if (ptr !== 0 || heap.u32(0x005f0244) === 0) return ptr;
    const recovered = (regs.eax = FUN_004153f0(heap, dwBytes)) >>> 0;
    if (recovered === 0) return 0;
  }
}

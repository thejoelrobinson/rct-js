// @manual — do not regenerate.
//
// Hand-port of FUN_0045acae (RCT1 title-screen sprite-walker per-tick step).
// Walks the "current" half (DAT_008d7eb0/b2/b4/b6) toward the "target" half
// (DAT_008d7eb1/b3/b5/b7) by ±1 each tick, with a 16-bit countdown
// DAT_008d7eac that delays the walk after each FUN_0045ac19 call.
//
// Why hand-ported:
//   - DAT_008d7eac is 16-bit (cmp/dec word), not 8-bit. The auto-port
//     reads/writes it as u8, so the comparison `== 0x3c0` (960) never
//     matches and the dec only affects the low byte. Fixed with u16/setU16.
//   - The Ghidra C is otherwise faithful; we just need the right widths.
//
// Disassembly snippet at 0x45acae:
//   cmp word [008d7eac], 0
//   je   <walker-body>
//   cmp word [008d7eac], 0x3c0
//   jne  +8
//   or   word [005f54ec], 8
//   dec  word [008d7eac]
//   ret
//   <walker-body>:
//   test dword [0088741c], 0x7f
//   jne  end                      ; only run every 128 ticks
//   ... walk b0→b1, b4→b5, b2 = b3, b6→b7 ...
//   mov [008d7eae], [008d7eaf]
//   call FUN_0045ac19
//   or word [005f54ec], 8

import { FUN_0045ac19 } from "./45ac19.js";
import { FUN_005e6028 } from "./5e6028.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045acae(heap) {
  const t = heap.u16(0x008d7eac);
  if (t !== 0) {
    if (t === 0x3c0) {
      heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
    }
    heap.setU16(0x008d7eac, (t - 1) & 0xffff);
    return;
  }

  if ((heap.u32(0x0088741c) & 0x7f) !== 0) return;

  // Walk b0 toward b1 (signed 8-bit comparison: `if (b1 < b0) dec else inc`).
  const b0 = heap.i8(0x008d7eb0), b1 = heap.i8(0x008d7eb1);
  if (b0 !== b1) {
    heap.setI8(0x008d7eb0, b1 < b0 ? b0 - 1 : b0 + 1);
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
    return;
  }

  // Walk b4 toward b5.
  const b4 = heap.i8(0x008d7eb4), b5 = heap.i8(0x008d7eb5);
  if (b4 !== b5) {
    heap.setI8(0x008d7eb4, b5 < b4 ? b4 - 1 : b4 + 1);
    FUN_005e6028(heap);
    return;
  }

  // Snap b2 to b3 (no walking, just assign).
  const b2 = heap.u8(0x008d7eb2), b3 = heap.u8(0x008d7eb3);
  if (b2 !== b3) heap.setU8(0x008d7eb2, b3);

  // Walk b6 toward b7 (with snap-to-3 special case).
  const b6 = heap.i8(0x008d7eb6), b7 = heap.i8(0x008d7eb7);
  if (b6 !== b7) {
    if (b7 === 3) {
      heap.setI8(0x008d7eb6, b7);
    } else if (b7 < b6) {
      heap.setI8(0x008d7eb6, b6 - 1);
    } else {
      heap.setI8(0x008d7eb6, b6 + 1);
    }
    return;
  }

  // All caught up — copy target sprite-direction over the current one and
  // pick a new target.
  heap.setU8(0x008d7eae, heap.u8(0x008d7eaf));
  FUN_0045ac19(heap);
  heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
}

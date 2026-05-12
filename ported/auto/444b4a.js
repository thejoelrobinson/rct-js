// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444b4a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00444b4a(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let pcVar3 = 0;
  let puVar4 = 0;
  let uVar5 = 0;
  // HAND-FIX: the source array DAT_00991f8e is a u16[] (Ghidra typed it as
  // `undefined2 *puVar4`). The translator emitted setU32/u32 with `*4`
  // indexing, which (a) writes 4 bytes per slot trashing the next slot, and
  // (b) reads/writes 32-bit values at 4x stride. Both must be u16 / *2.
  // Without this fix, the tile-grid array stays mostly zero, and the painter
  // at 0x436b50 → 0x444820 enters an infinite loop walking a chain that points
  // back to tile-pool slot 0 (whose own "next" field is also 0). See the
  // probe log at /tmp/probe-deep.mjs for the cycle trace.
  puVar4 = ((0x00991f8e) >>> 0);
  for (iVar2 = ((0x4001) >>> 0); iVar2 != 0; iVar2 = (((iVar2 + -1) >>> 0)) >>> 0) {
    heap.setU16(puVar4, (0xffff) & 0xffff);
    puVar4 = ((puVar4 + 2) >>> 0);
  }
  pcVar3 = ((0x00743b94) >>> 0);
  do {
    if ((heap.i8(pcVar3) | 0) != -1) {
      if (heap.u16((pcVar3 + 0xe)) == 0x8000) {
        uVar5 = ((0x4000) >>> 0);
      } else {
        uVar5 = (((((heap.u16((pcVar3 + 0xe)) & 0xfe0) << 2 | heap.u16((pcVar3 + 0x10)) >>> 5) >>> 0)) >>> 0);
      }
      LOCK();
      uVar1 = (heap.u16((0x00991f8e) + (uVar5) * 2)) & 0xffff;
      heap.setU16(((0x00991f8e) + (uVar5) * 2), (heap.u16((pcVar3 + 10))) & 0xffff);
      UNLOCK();
      heap.setU16((pcVar3 + 2), (uVar1) & 0xffff);
    }
    pcVar3 = ((pcVar3 + 0x100) >>> 0);
  } while (pcVar3 < 0x0087c394);
  return;
}

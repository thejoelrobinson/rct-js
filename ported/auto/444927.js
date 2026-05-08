// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444927.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
export function FUN_00444927(heap) {
  let uVar1 = 0;
  let in_AX = 0;
  let uVar2 = 0;
  let in_ECX = 0;
  let in_DX = 0;
  let uVar3 = 0;
  if (in_AX == 0x8000) {
    uVar2 = 0x4000;
  } else {
    uVar2 = (uint)(ushort)((in_AX & 0xfe0) << 2 | (ushort)(in_ECX >>> 5) & 0x7ff);
  }
  if (heap.u32((unaff_ESI + 0xe)) == 0x8000) {
    uVar3 = 0x4000;
  } else {
    uVar3 = (uint)(ushort)((heap.u32((unaff_ESI + 0xe)) & 0xfe0) << 2 | heap.u32((unaff_ESI + 0x10)) >>> 5);
  }
  if (uVar2 != uVar3) {
    puVar4 = 0x00991f8e + uVar3;
    while (0x00743b94 + (uint) * puVar4 * 0x100 != unaff_ESI) {
      puVar4 = 0x00743b96 + (uint) * puVar4 * 0x80;
    }
    heap.u32(puVar4) = heap.u32((unaff_ESI + 2));
    LOCK(heap);
    uVar1 = heap.u32((0x00991f8e) + (uVar2) * 4);
    heap.u32((0x00991f8e) + (uVar2) * 4) = heap.u32((unaff_ESI + 10));
    UNLOCK(heap);
    heap.u32((unaff_ESI + 2)) = uVar1;
  }
  if (in_AX != 0x8000) {
    (heap.u32(heap.u32((0x004449c4) + (heap.u32(0x00991f88)) * 4)))();
    return;
  }
  heap.u32((unaff_ESI + 0x16)) = 0x8000;
  heap.u32((unaff_ESI + 0xe)) = 0x8000;
  heap.u32((unaff_ESI + 0x10)) = in_ECX;
  heap.u32((unaff_ESI + 0x12)) = in_DX;
  return;
}

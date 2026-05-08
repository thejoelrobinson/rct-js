// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401e20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00401e20(heap) {
  const __sp = heap.allocFrame(176);
  const __addr_DAT_005f2420 = __sp + 0;
  const __addr_local_c8 = __sp + 4;
  const __addr_local_b0 = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_c4 = 0;
  let local_c0 = 0;
  let local_bc = 0;
  let local_b4 = 0;
  let local_8 = 0;
  local_b8 = __addr_DAT_005f2420;
  (heap.u32(heap.u32(0x005ebe58)))(__addr_local_b0);
  iVar1 = (heap.u32(heap.u32(0x005ebea4)))(heap.u32(0x005e9100), __addr_local_b0);
  if (iVar1 == 0) {
    uVar2 = 0;
  } else {
    for (local_b4 = 0; local_b4 < heap.u32(0x005f1b34); local_b4 = local_b4 + 8) {
      local_8 = 0;
      while (iVar1 = local_8, local_8 < 0x500) {
        if (heap.u32(local_b8) == '\0') {
          local_b8 = local_b8 + 1;
          local_8 = local_8 + 0x40;
        } else {
          heap.setU32(__addr_local_c8, (local_8) >>> 0);
          local_c4 = local_b4;
          local_bc = local_b4 + 8;
          for (; (local_8 < 0x500 && (heap.u32(local_b8) != '\0')); local_b8 = local_b8 + 1) {
            heap.u32(local_b8) = '\0';
            local_8 = local_8 + 0x40;
          }
          local_c0 = local_8;
          (heap.u32(heap.u32(0x005ebeb4)))(__addr_local_c8, iVar1, local_b4);
          heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
        }
      }
    }
    (heap.u32(heap.u32(0x005ebea8)))();
    heap.setU32(0x005f1fe0, (5) >>> 0);
    uVar2 = 1;
  }
  return uVar2;
} finally {
    heap.freeFrame(176);
  }
}

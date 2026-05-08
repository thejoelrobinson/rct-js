// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4028a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004028a0(heap) {
  const __sp = heap.allocFrame(176);
  const __addr_DAT_005f2420 = __sp + 0;
  const __addr_local_c8 = __sp + 4;
  const __addr_local_b0 = __sp + 8;
  try {
  let local_cc = 0;
  let local_c4 = 0;
  let local_c0 = 0;
  let local_bc = 0;
  let local_b4 = 0;
  let local_8 = 0;
  local_b8 = __addr_DAT_005f2420;
  (heap.u32(heap.u32(0x005ebe58)))(__addr_local_b0);
  local_8 = 0;
  do {
    if (heap.u32(0x005f15c4) <= local_8) {
      heap.setU32(0x005f1fe0, (6) >>> 0);
      return 1;
    }
    local_cc = 0;
    local_b4 = 0;
    while (local_b4 < heap.u32(0x005f1b34)) {
      if (heap.u32(local_b8 + (local_cc) * 4) == '\0') {
        local_cc = local_cc + 0x14;
        local_b4 = local_b4 + 8;
      } else {
        heap.setU32(__addr_local_c8, (local_8) >>> 0);
        local_c4 = local_b4;
        local_c0 = local_8 + 0x40;
        do {
          heap.u32(local_b8 + (local_cc) * 4) = 0;
          local_cc = local_cc + 0x14;
          local_bc = local_b4 + 8;
          local_b4 = local_bc;
          if (heap.u32(0x005f1b34) <= local_bc) {
            break;
          }
        } while (heap.u32(local_b8 + (local_cc) * 4) != '\0');
        (heap.u32(heap.u32(0x005ebe94)))(heap.u32(0x005e9100), __addr_local_c8, __addr_local_b0, __addr_local_c8);
        heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
      }
    }
    local_b8 = local_b8 + 1;
    local_8 = local_8 + 0x40;
  } while (true);
} finally {
    heap.freeFrame(176);
  }
}

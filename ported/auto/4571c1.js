// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4571c1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004571c1(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00743bc2 = __sp + 0;
  const __addr_DAT_00743ba2 = __sp + 4;
  const __addr_DAT_00743ba6 = __sp + 8;
  const __addr_DAT_00743ba4 = __sp + 12;
  const __addr_DAT_00743bbf = __sp + 16;
  const __addr_DAT_00743bcf = __sp + 20;
  const __addr_DAT_00743c0e = __sp + 24;
  const __addr_DAT_00743b98 = __sp + 28;
  try {
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  uVar4 = heap.u32(0x0087c398);
  while (uVar4 != 0xffff) {
    uVar5 = uVar4;
    iVar6 = uVar5 * 0x100;
    if ((heap.u32((__addr_DAT_00743bc2) + (iVar6) * 4) == '\0') && (heap.u32((__addr_DAT_00743ba2) + (uVar5 * 0x80) * 4) != -0x8000)) {
      uVar4 = heap.u32((__addr_DAT_00743ba6) + (uVar5 * 0x80) * 4) - heap.u32((unaff_ESI + 0x12));
      if (uVar4 < 0) {
        uVar4 = -uVar4;
      }
      if (uVar4 < 0x31) {
        uVar4 = heap.u32((__addr_DAT_00743ba2) + (uVar5 * 0x80) * 4) - heap.u32((unaff_ESI + 0xe));
        if (uVar4 < 0) {
          uVar4 = -uVar4;
        }
        uVar3 = heap.u32((__addr_DAT_00743ba4) + (uVar5 * 0x80) * 4) - heap.u32((unaff_ESI + 0x10));
        if (uVar3 < 0) {
          uVar3 = -uVar3;
        }
        if ((uVar4 < 0x61) && (uVar3 < 0x61)) {
          if (heap.u32((__addr_DAT_00743bbf) + (iVar6) * 4) == '\x05') {
            pbVar1 = __addr_DAT_00743bcf + iVar6;
            bVar2 = heap.u32(pbVar1);
            heap.u32(pbVar1) = heap.u32(pbVar1) + 4;
            if (0xfb < bVar2) {
              heap.u32((__addr_DAT_00743bcf) + (iVar6) * 4) = 0xff;
            }
          } else {
            if (heap.u32((__addr_DAT_00743bbf) + (iVar6) * 4) == '\x06') {
            heap.u32((__addr_DAT_00743c0e + iVar6)) = heap.u32((__addr_DAT_00743c0e + iVar6)) + -200;
            pbVar1 = __addr_DAT_00743bcf + iVar6;
            bVar2 = heap.u32(pbVar1);
            heap.u32(pbVar1) = heap.u32(pbVar1) + 3;
            if (0xfc < bVar2) {
              heap.u32((__addr_DAT_00743bcf) + (iVar6) * 4) = 0xff;
            }
          }
          }
        }
      }
    }
    uVar4 = heap.u32((__addr_DAT_00743b98) + (uVar5 * 0x80) * 4);
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}

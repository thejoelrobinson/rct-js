// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444b0a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00444b0a(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743b9e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00743b9c = __sp + 12;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  uVar4 = heap.u32(0x0087c394);
  while (uVar4 != 0xffff) {
    uVar5 = uVar4;
    uVar2 = heap.u32((__addr_DAT_00743b98 + uVar5 * 0x80));
    uVar1 = heap.u32((__addr_DAT_00743b9e) + (uVar5 * 0x80) * 4);
    puVar6 = (__addr_DAT_00743b94 + uVar5 * 0x100);
    for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
      heap.u32(puVar6) = 0;
      puVar6 = puVar6 + 1;
    }
    heap.u32((__addr_DAT_00743b94) + (uVar5 * 0x100) * 4) = 0xff;
    heap.u32((__addr_DAT_00743b98 + uVar5 * 0x80)) = uVar2;
    heap.u32((__addr_DAT_00743b9c) + (uVar5 * 0x100) * 4) = 0;
    heap.u32((__addr_DAT_00743b9e) + (uVar5 * 0x80) * 4) = uVar1;
    uVar4 = heap.u32((__addr_DAT_00743b98) + (uVar5 * 0x80) * 4);
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}

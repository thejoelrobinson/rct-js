// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4508fd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004508fd(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0065247a = __sp + 0;
  const __addr_DAT_00652478 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  try {
  let bVar2 = 0;
  let uVar3 = 0;
  let unaff_EBX = 0;
  let unaff_ESI = 0;
  uVar3 = heap.u32(0x008ae93e) + heap.u32((__addr_DAT_0065247a) + (unaff_EBX * 2) * 4);
  if (((heap.u32(0x008ae93c) + heap.u32((__addr_DAT_00652478) + (unaff_EBX * 2) * 4)) < 0x1000) && (uVar3 < 0x1000)) {
    uVar3 = uVar3 * 0x80 | uVar3 >>> 9 | heap.u32(0x008ae93c) + heap.u32((__addr_DAT_00652478) + (unaff_EBX * 2) * 4);
    pbVar4 = heap.u32((__addr_DAT_00971ef4) + ((uVar3 >>> 5 | uVar3 << 0xb)) * 4);
    do {
      bVar2 = heap.u32(pbVar4) & 0x3c;
      if (bVar2 == 0) {
        if ((heap.u32(0x008ae94b) <= heap.u32((unaff_ESI + 2))) && (heap.u32((unaff_ESI + 3)) <= heap.u32(pbVar4 + (2) * 4))) {
          heap.setU32(0x008ae980, (heap.u32(0x008ae980) + 1) >>> 0);
        }
      } else {
        if (bVar2 == 4) {
        bVar2 = heap.u32((unaff_ESI + 2)) - heap.u32(pbVar4 + (2) * 4);
        if (heap.u32((unaff_ESI + 2)) < heap.u32(pbVar4 + (2) * 4)) {
          bVar2 = -bVar2;
        }
        if (bVar2 < 5) {
          heap.setU32(0x008ae97c, (heap.u32(0x008ae97c) + 1) >>> 0);
        }
      } else {
        if (bVar2 == 8) {
        bVar2 = heap.u32((unaff_ESI + 2)) - heap.u32(pbVar4 + (2) * 4);
        if (heap.u32((unaff_ESI + 2)) < heap.u32(pbVar4 + (2) * 4)) {
          bVar2 = -bVar2;
        }
        if ((bVar2 < 5) && (heap.u32((unaff_ESI + 7)) != heap.u32(pbVar4 + (7) * 4))) {
          heap.setU32(0x008ae97e, (heap.u32(0x008ae97e) + 1) >>> 0);
        }
      } else {
        if (((bVar2 == 0xc) || (bVar2 == 0x18)) && (heap.u32(pbVar4 + (2) * 4) < heap.u32((unaff_ESI + 3)))) {
        if (heap.u32(pbVar4 + (3) * 4) < heap.u32((unaff_ESI + 2))) {
          heap.setU32(0x008ae96e, (heap.u32(0x008ae96e) + 1) >>> 0);
        } else {
          heap.setU32(0x008ae96c, (heap.u32(0x008ae96c) + 1) >>> 0);
        }
      }
      }
      }
      }
      pbVar1 = pbVar4 + 1;
      pbVar4 = pbVar4 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}

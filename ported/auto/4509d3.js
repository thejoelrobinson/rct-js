// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4509d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004509d3(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00652478 = __sp + 8;
  try {
  let pbVar1 = 0;
  let uVar2 = 0;
  let pbVar3 = 0;
  let unaff_ESI = 0;
  if ((heap.u32(unaff_ESI + (4) * 4) == 0x28) || (heap.u32(unaff_ESI + (4) * 4) == 0x29)) {
    uVar2 = heap.u32(0x008ae93e) << 7 | heap.u32(0x008ae93e) >>> 9 | heap.u32(0x008ae93c);
    pbVar3 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4);
    do {
      if ((heap.u32(pbVar3) & 0x3c) == 4) {
        if ((heap.u32(unaff_ESI + (2) * 4) <= heap.u32(pbVar3 + (2) * 4)) && ((heap.u32(pbVar3 + (2) * 4) - heap.u32(unaff_ESI + (2) * 4)) < 0x21)) {
          heap.setU32(0x008ae976, (heap.u32(0x008ae976) + 1) >>> 0);
        }
      } else {
        if (((((heap.u32(pbVar3) & 0x3c) == 8) && (((heap.u32(pbVar3) ^ heap.u32(unaff_ESI)) & 1) != 0)) && (heap.u32(unaff_ESI + (2) * 4) <= heap.u32(pbVar3 + (2) * 4))) && ((heap.u32(pbVar3 + (2) * 4) - heap.u32(unaff_ESI + (2) * 4)) < 0x21)) {
        heap.setU32(0x008ae974, (heap.u32(0x008ae974) + 1) >>> 0);
        if ((heap.u32(pbVar3 + (4) * 4) == 0x28) || (heap.u32(pbVar3 + (4) * 4) == 0x29)) {
          heap.setU32(0x008ae978, (heap.u32(0x008ae978) + 1) >>> 0);
        }
      }
      }
      pbVar1 = pbVar3 + 1;
      pbVar3 = pbVar3 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    uVar2 = (heap.u32(0x008ae93e) + heap.u32((__addr_DAT_0065247a) + ((heap.u32(unaff_ESI) & 3) * 2) * 4)) * 0x80 | (heap.u32(0x008ae93e) + heap.u32((__addr_DAT_0065247a) + ((heap.u32(unaff_ESI) & 3) * 2) * 4)) >>> 9 | heap.u32(0x008ae93c) + heap.u32((__addr_DAT_00652478) + ((heap.u32(unaff_ESI) & 3) * 2) * 4);
    pbVar3 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4);
    do {
      if ((heap.u32(pbVar3) & 0x3c) == 4) {
        if ((heap.u32(unaff_ESI + (2) * 4) <= heap.u32(pbVar3 + (2) * 4)) && ((heap.u32(pbVar3 + (2) * 4) - heap.u32(unaff_ESI + (2) * 4)) < 0x21)) {
          heap.setU32(0x008ae976, (heap.u32(0x008ae976) + 1) >>> 0);
        }
      } else {
        if (((((heap.u32(pbVar3) & 0x3c) == 8) && (((heap.u32(pbVar3) ^ heap.u32(unaff_ESI)) & 1) != 0)) && (heap.u32(unaff_ESI + (2) * 4) <= heap.u32(pbVar3 + (2) * 4))) && ((heap.u32(pbVar3 + (2) * 4) - heap.u32(unaff_ESI + (2) * 4)) < 0x21)) {
        heap.setU32(0x008ae974, (heap.u32(0x008ae974) + 1) >>> 0);
        if ((heap.u32(pbVar3 + (4) * 4) == 0x28) || (heap.u32(pbVar3 + (4) * 4) == 0x29)) {
          heap.setU32(0x008ae978, (heap.u32(0x008ae978) + 1) >>> 0);
        }
      }
      }
      pbVar1 = pbVar3 + 1;
      pbVar3 = pbVar3 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
  }
  if (heap.u32(0x008ae94a) == 'c') {
    heap.setU32(0x008ae982, (heap.u32(0x008ae982) + 1) >>> 0);
  }
  if (heap.u32(0x008ae94a) == 'd') {
    heap.setU32(0x008ae984, (heap.u32(0x008ae984) + 1) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4509d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_004509d3(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let pbVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u8(unaff_ESI + (4)) == 0x28) || (heap.u8(unaff_ESI + (4)) == 0x29)) {
    uVar2 = ((heap.u32(0x008ae93e) << 7 | heap.u32(0x008ae93e) >>> 9 | heap.u32(0x008ae93c)) & 0xffff);
    pbVar3 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((heap.u8(pbVar3) & 0x3c) == 4) {
        if ((heap.u8(unaff_ESI + (2)) <= heap.u8(pbVar3 + (2))) && (((heap.u8(pbVar3 + (2)) - heap.u8(unaff_ESI + (2))) & 0xff) < 0x21)) {
          heap.setU32(0x008ae976, (heap.u32(0x008ae976) + 1) >>> 0);
        }
      } else {
        if (((((heap.u8(pbVar3) & 0x3c) == 8) && (((heap.u8(pbVar3) ^ heap.u8(unaff_ESI)) & 1) != 0)) && (heap.u8(unaff_ESI + (2)) <= heap.u8(pbVar3 + (2)))) && (((heap.u8(pbVar3 + (2)) - heap.u8(unaff_ESI + (2))) & 0xff) < 0x21)) {
        heap.setU32(0x008ae974, (heap.u32(0x008ae974) + 1) >>> 0);
        if ((heap.u8(pbVar3 + (4)) == 0x28) || (heap.u8(pbVar3 + (4)) == 0x29)) {
          heap.setU32(0x008ae978, (heap.u32(0x008ae978) + 1) >>> 0);
        }
      }
      }
      pbVar1 = ((pbVar3 + 1) >>> 0);
      pbVar3 = ((pbVar3 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    uVar2 = (((heap.u32(0x008ae93e) + heap.u32((0x0065247a) + ((heap.u8(unaff_ESI) & 3) * 2) * 4)) * 0x80 | ((heap.u32(0x008ae93e) + heap.u32((0x0065247a) + ((heap.u8(unaff_ESI) & 3) * 2) * 4)) & 0xffff) >>> 9 | heap.u32(0x008ae93c) + heap.u32((0x00652478) + ((heap.u8(unaff_ESI) & 3) * 2) * 4)) & 0xffff);
    pbVar3 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((heap.u8(pbVar3) & 0x3c) == 4) {
        if ((heap.u8(unaff_ESI + (2)) <= heap.u8(pbVar3 + (2))) && (((heap.u8(pbVar3 + (2)) - heap.u8(unaff_ESI + (2))) & 0xff) < 0x21)) {
          heap.setU32(0x008ae976, (heap.u32(0x008ae976) + 1) >>> 0);
        }
      } else {
        if (((((heap.u8(pbVar3) & 0x3c) == 8) && (((heap.u8(pbVar3) ^ heap.u8(unaff_ESI)) & 1) != 0)) && (heap.u8(unaff_ESI + (2)) <= heap.u8(pbVar3 + (2)))) && (((heap.u8(pbVar3 + (2)) - heap.u8(unaff_ESI + (2))) & 0xff) < 0x21)) {
        heap.setU32(0x008ae974, (heap.u32(0x008ae974) + 1) >>> 0);
        if ((heap.u8(pbVar3 + (4)) == 0x28) || (heap.u8(pbVar3 + (4)) == 0x29)) {
          heap.setU32(0x008ae978, (heap.u32(0x008ae978) + 1) >>> 0);
        }
      }
      }
      pbVar1 = ((pbVar3 + 1) >>> 0);
      pbVar3 = ((pbVar3 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
  }
  if (heap.u8(0x008ae94a) == 99) {
    heap.setU32(0x008ae982, (heap.u32(0x008ae982) + 1) >>> 0);
  }
  if (heap.u8(0x008ae94a) == 100) {
    heap.setU32(0x008ae984, (heap.u32(0x008ae984) + 1) >>> 0);
  }
  return;
}

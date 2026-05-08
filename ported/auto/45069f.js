// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45069f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004508fd } from "./4508fd.js";
import { FUN_004509d3 } from "./4509d3.js";
export function FUN_0045069f(heap) {
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = 0;
  heap.setU32(0x008ae94c, (heap.u32(0x008ae94c) + 1) >>> 0);
  uVar4 = heap.u32(0x008ae93e) << 7 | heap.u32(0x008ae93e) >>> 9 | heap.u32(0x008ae93c);
  pbVar5 = heap.u32((0x00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
  do {
    bVar2 = heap.u32(pbVar5) & 0x3c;
    if (bVar2 == 0) {
      heap.setU32(0x008ae94b, (heap.u32(pbVar5 + (2) * 4)) >>> 0);
      if ((ushort)(heap.u32(0x008ae94b) * 4) == heap.u32(0x008ae940)) {
        heap.setU32(0x008ae956, (heap.u32(0x008ae956) + 1) >>> 0);
      }
      if (((heap.u32(pbVar5 + (5) * 4) & 0x1f) != 0) && (uVar4 = (heap.u32(pbVar5 + (5) * 4) & 0x1f) * 0x10, uVar4 <= heap.u32(0x008ae940))) {
        heap.setU32(0x008ae94e, (heap.u32(0x008ae94e) + 1) >>> 0);
        if (uVar4 == heap.u32(0x008ae940)) {
          heap.setU32(0x008ae950, (heap.u32(0x008ae950) + 1) >>> 0);
        }
        if ((ushort)(uVar4 + 0x10) == heap.u32(0x008ae940)) {
          heap.setU32(0x008ae952, (heap.u32(0x008ae952) + 1) >>> 0);
        }
        if ((ushort)(uVar4 + 0x80) <= heap.u32(0x008ae940)) {
          heap.setU32(0x008ae954, (heap.u32(0x008ae954) + 1) >>> 0);
        }
      }
    } else {
      if (bVar2 == 4) {
      if ((heap.u32(pbVar5 + (4) * 4) & 0xf0) == 0) {
        if (heap.u32(pbVar5 + (3) * 4) <= heap.u32((unaff_ESI + 2))) {
          heap.setU32(0x008ae958, (heap.u32(0x008ae958) + 1) >>> 0);
        }
        if (heap.u32(pbVar5 + (3) * 4) == heap.u32((unaff_ESI + 2))) {
          heap.setU32(0x008ae95a, (heap.u32(0x008ae95a) + 1) >>> 0);
        }
        if (heap.u32((unaff_ESI + 3)) == heap.u32(pbVar5 + (2) * 4)) {
          heap.setU32(0x008ae95c, (heap.u32(0x008ae95c) + 1) >>> 0);
        }
      } else {
        if (heap.u32(pbVar5 + (3) * 4) == heap.u32((unaff_ESI + 2))) {
          heap.setU32(0x008ae95e, (heap.u32(0x008ae95e) + 1) >>> 0);
        }
        if (heap.u32((unaff_ESI + 3)) == heap.u32(pbVar5 + (2) * 4)) {
          heap.setU32(0x008ae960, (heap.u32(0x008ae960) + 1) >>> 0);
        }
      }
    } else {
      if (bVar2 == 8) {
      if ((((heap.u32(pbVar5 + (4) * 4) == 0x28) || (heap.u32(pbVar5 + (4) * 4) == 0x29)) && (((heap.u32(pbVar5 + (5) * 4) & 0xf) == 3 || ((heap.u32(pbVar5 + (5) * 4) & 0xf) == 6)))) && ((byte)(heap.u32(pbVar5 + (2) * 4) - heap.u32((unaff_ESI + 3))) < 0x15)) {
        heap.setU32(0x008ae97a, (heap.u32(0x008ae97a) + 1) >>> 0);
      }
      if (heap.u32((unaff_ESI + 7)) == heap.u32(pbVar5 + (7) * 4)) {
        bVar2 = heap.u32(pbVar5 + (4) * 4);
        cVar3 = '\x01';
        if (((bVar2 != 1) && (bVar2 != 3)) && (bVar2 != 2)) {
          cVar3 = -1;
        }
        bVar2 = heap.u32(pbVar5 + (3) * 4);
        if ((bVar2 == heap.u32((unaff_ESI + 2))) && (heap.setU32(0x008ae962, (heap.u32(0x008ae962) + 1) >>> 0), cVar3 == '\x01')) {
          heap.setU32(0x008ae970, (heap.u32(0x008ae970) + 1) >>> 0);
        }
        if ((((byte)(bVar2 + 4) <= heap.u32((unaff_ESI + 2))) && (heap.u32((unaff_ESI + 2)) <= (byte)(bVar2 + 0x14))) && (heap.setU32(0x008ae964, (heap.u32(0x008ae964) + 1) >>> 0), cVar3 == '\x01')) {
          heap.setU32(0x008ae972, (heap.u32(0x008ae972) + 1) >>> 0);
        }
        bVar2 = heap.u32((unaff_ESI + 3));
        if ((bVar2 == heap.u32(pbVar5 + (2) * 4)) && (heap.setU32(0x008ae962, (heap.u32(0x008ae962) + 1) >>> 0), cVar3 == '\x01')) {
          heap.setU32(0x008ae970, (heap.u32(0x008ae970) + 1) >>> 0);
        }
        if ((((byte)(bVar2 + 4) <= heap.u32(pbVar5 + (2) * 4)) && (heap.u32(pbVar5 + (2) * 4) <= (byte)(bVar2 + 0x14))) && (heap.setU32(0x008ae964, (heap.u32(0x008ae964) + 1) >>> 0), cVar3 == '\x01')) {
          heap.setU32(0x008ae972, (heap.u32(0x008ae972) + 1) >>> 0);
        }
      } else {
        heap.setU32(0x008ae966, (heap.u32(0x008ae966) + 1) >>> 0);
        bVar2 = heap.u32(pbVar5 + (3) * 4);
        if (bVar2 == heap.u32((unaff_ESI + 2))) {
          heap.setU32(0x008ae968, (heap.u32(0x008ae968) + 1) >>> 0);
        }
        if (((byte)(bVar2 + 4) <= heap.u32((unaff_ESI + 2))) && (heap.u32((unaff_ESI + 2)) <= (byte)(bVar2 + 0x14))) {
          heap.setU32(0x008ae96a, (heap.u32(0x008ae96a) + 1) >>> 0);
        }
        bVar2 = heap.u32((unaff_ESI + 3));
        if (bVar2 == heap.u32(pbVar5 + (2) * 4)) {
          heap.setU32(0x008ae968, (heap.u32(0x008ae968) + 1) >>> 0);
        }
        if (((byte)(bVar2 + 4) <= heap.u32(pbVar5 + (2) * 4)) && (heap.u32(pbVar5 + (2) * 4) <= (byte)(bVar2 + 0x14))) {
          heap.setU32(0x008ae96a, (heap.u32(0x008ae96a) + 1) >>> 0);
        }
      }
    }
    }
    }
    pbVar1 = pbVar5 + 1;
    pbVar5 = pbVar5 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  FUN_004508fd(heap);
  FUN_004508fd(heap);
  FUN_004509d3(heap);
  return;
}

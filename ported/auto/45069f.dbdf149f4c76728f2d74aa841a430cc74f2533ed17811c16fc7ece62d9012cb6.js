// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45069f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004508fd } from "./4508fd.js";
import { FUN_004509d3 } from "./4509d3.js";
export function FUN_0045069f(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  heap.setU8(0x008ae94c, (heap.u8(0x008ae94c) + 1) & 0xff);
  uVar4 = ((heap.u32(0x008ae93e) << 7 | heap.u32(0x008ae93e) >>> 9 | heap.u32(0x008ae93c)) & 0xffff);
  pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    bVar2 = ((heap.u8(pbVar5) & 0x3c) & 0xff);
    if (bVar2 == 0) {
      heap.setU8(0x008ae94b, (heap.u8(pbVar5 + (2))) & 0xff);
      if (((heap.u16(0x008ae94b) * 4) & 0xffff) == heap.u32(0x008ae940)) {
        heap.setU8(0x008ae956, (heap.u8(0x008ae956) + 1) & 0xff);
      }
      if (((heap.u8(pbVar5 + (5)) & 0x1f) != 0) && (uVar4 = (((heap.u8(pbVar5 + (5)) & 0x1f) * 0x10) & 0xffff), uVar4 <= heap.u32(0x008ae940))) {
        heap.setU8(0x008ae94e, (heap.u8(0x008ae94e) + 1) & 0xff);
        if (uVar4 == heap.u32(0x008ae940)) {
          heap.setU8(0x008ae950, (heap.u8(0x008ae950) + 1) & 0xff);
        }
        if (((uVar4 + 0x10) & 0xffff) == heap.u32(0x008ae940)) {
          heap.setU8(0x008ae952, (heap.u8(0x008ae952) + 1) & 0xff);
        }
        if (((uVar4 + 0x80) & 0xffff) <= heap.u32(0x008ae940)) {
          heap.setU8(0x008ae954, (heap.u8(0x008ae954) + 1) & 0xff);
        }
      }
    } else {
      if (bVar2 == 4) {
      if ((heap.u8(pbVar5 + (4)) & 0xf0) == 0) {
        if (heap.u8(pbVar5 + (3)) <= heap.u8((unaff_ESI + 2))) {
          heap.setU8(0x008ae958, (heap.u8(0x008ae958) + 1) & 0xff);
        }
        if (heap.u8(pbVar5 + (3)) == heap.u8((unaff_ESI + 2))) {
          heap.setU8(0x008ae95a, (heap.u8(0x008ae95a) + 1) & 0xff);
        }
        if (heap.u8((unaff_ESI + 3)) == heap.u8(pbVar5 + (2))) {
          heap.setU32(0x008ae95c, (heap.u32(0x008ae95c) + 1) >>> 0);
        }
      } else {
        if (heap.u8(pbVar5 + (3)) == heap.u8((unaff_ESI + 2))) {
          heap.setU32(0x008ae95e, (heap.u32(0x008ae95e) + 1) >>> 0);
        }
        if (heap.u8((unaff_ESI + 3)) == heap.u8(pbVar5 + (2))) {
          heap.setU32(0x008ae960, (heap.u32(0x008ae960) + 1) >>> 0);
        }
      }
    } else {
      if (bVar2 == 8) {
      if ((((heap.u8(pbVar5 + (4)) == 0x28) || (heap.u8(pbVar5 + (4)) == 0x29)) && (((heap.u8(pbVar5 + (5)) & 0xf) == 3 || ((heap.u8(pbVar5 + (5)) & 0xf) == 6)))) && (((heap.u8(pbVar5 + (2)) - heap.i8((unaff_ESI + 3))) & 0xff) < 0x15)) {
        heap.setU32(0x008ae97a, (heap.u32(0x008ae97a) + 1) >>> 0);
      }
      if (heap.u8((unaff_ESI + 7)) == heap.u8(pbVar5 + (7))) {
        bVar2 = ((heap.u8(pbVar5 + (4))) & 0xff);
        cVar3 = ((1) & 0xff);
        if (((bVar2 != 1) && (bVar2 != 3)) && (bVar2 != 2)) {
          cVar3 = ((-1) & 0xff);
        }
        bVar2 = ((heap.u8(pbVar5 + (3))) & 0xff);
        if ((bVar2 == heap.u8((unaff_ESI + 2))) && (heap.setU32(0x008ae962, (heap.u32(0x008ae962) + 1) >>> 0), cVar3 == 1)) {
          heap.setU32(0x008ae970, (heap.u32(0x008ae970) + 1) >>> 0);
        }
        if (((((bVar2 + 4) & 0xff) <= heap.u8((unaff_ESI + 2))) && (heap.u8((unaff_ESI + 2)) <= ((bVar2 + 0x14) & 0xff))) && (heap.setU32(0x008ae964, (heap.u32(0x008ae964) + 1) >>> 0), cVar3 == 1)) {
          heap.setU32(0x008ae972, (heap.u32(0x008ae972) + 1) >>> 0);
        }
        bVar2 = ((heap.u8((unaff_ESI + 3))) & 0xff);
        if ((bVar2 == heap.u8(pbVar5 + (2))) && (heap.setU32(0x008ae962, (heap.u32(0x008ae962) + 1) >>> 0), cVar3 == 1)) {
          heap.setU32(0x008ae970, (heap.u32(0x008ae970) + 1) >>> 0);
        }
        if (((((bVar2 + 4) & 0xff) <= heap.u8(pbVar5 + (2))) && (heap.u8(pbVar5 + (2)) <= ((bVar2 + 0x14) & 0xff))) && (heap.setU32(0x008ae964, (heap.u32(0x008ae964) + 1) >>> 0), cVar3 == 1)) {
          heap.setU32(0x008ae972, (heap.u32(0x008ae972) + 1) >>> 0);
        }
      } else {
        heap.setU32(0x008ae966, (heap.u32(0x008ae966) + 1) >>> 0);
        bVar2 = ((heap.u8(pbVar5 + (3))) & 0xff);
        if (bVar2 == heap.u8((unaff_ESI + 2))) {
          heap.setU32(0x008ae968, (heap.u32(0x008ae968) + 1) >>> 0);
        }
        if ((((bVar2 + 4) & 0xff) <= heap.u8((unaff_ESI + 2))) && (heap.u8((unaff_ESI + 2)) <= ((bVar2 + 0x14) & 0xff))) {
          heap.setU32(0x008ae96a, (heap.u32(0x008ae96a) + 1) >>> 0);
        }
        bVar2 = ((heap.u8((unaff_ESI + 3))) & 0xff);
        if (bVar2 == heap.u8(pbVar5 + (2))) {
          heap.setU32(0x008ae968, (heap.u32(0x008ae968) + 1) >>> 0);
        }
        if ((((bVar2 + 4) & 0xff) <= heap.u8(pbVar5 + (2))) && (heap.u8(pbVar5 + (2)) <= ((bVar2 + 0x14) & 0xff))) {
          heap.setU32(0x008ae96a, (heap.u32(0x008ae96a) + 1) >>> 0);
        }
      }
    }
    }
    }
    pbVar1 = ((pbVar5 + 1) >>> 0);
    pbVar5 = ((pbVar5 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  (regs.eax = FUN_004508fd(heap));
  (regs.eax = FUN_004508fd(heap));
  return (regs.eax = FUN_004509d3(heap));
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441a10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY1 } from "../runtime/ghidra-builtins.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_004405f3 } from "./4405f3.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413c5 } from "./4413c5.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_004420e0 } from "./4420e0.js";
import { FUN_004429db } from "./4429db.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00441a10(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_0062d582 = __sp + 0;
  const __addr_DAT_0062d584 = __sp + 4;
  const __addr_DAT_0062d586 = __sp + 8;
  const __addr_DAT_0062d600 = __sp + 12;
  const __addr_DAT_0062d580 = __sp + 16;
  const __addr_DAT_00887524 = __sp + 20;
  const __addr_DAT_0088751d = __sp + 24;
  const __addr_DAT_008874f0 = __sp + 28;
  const __addr_DAT_00887520 = __sp + 32;
  try {
  let sVar2 = 0;
  let cVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EAX = 0;
  let uVar8 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let extraout_DX = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let unaff_ESI = 0;
  let uVar11 = 0;
  let iVar12 = 0;
  heap.setU32(0x006293ca, ('\0') >>> 0);
  cVar3 = in_EAX;
  if ((((heap.u32((unaff_ESI + 0xca)) >>> 0xe & 1) != 0) && (heap.u32((unaff_ESI + 0xf0)) == '\x03')) && (cVar3 == heap.u32((unaff_ESI + 0xf1)))) {
    heap.setU32(0x006293ca, ('\x01') >>> 0);
  }
  uVar10 = in_EAX & 0xff;
  uVar9 = uVar10;
  if ((heap.u32((unaff_ESI + 0xca + (uVar9 >>> 3))) >>> (uVar9 & 7) & 1) != 0) {
    uVar10 = FUN_00440fe3(heap);
    return uVar10;
  }
  if ((0xa3e0U >>> (uVar9 & 0xf) & 1) != 0) {
    if ((heap.u32((unaff_ESI + 0xca)) & 0xa3e0) != 0) {
      uVar9 = heap.u32((unaff_ESI + 0xca)) & 0xa3e0;
      sVar2 = 0;
      if (uVar9 != 0) {
        for (; (uVar9 >>> sVar2 & 1) == 0; sVar2 = sVar2 + 1) {
        
        }
      }
      uVar10 = FUN_00440fe3(heap);
      return uVar10;
    }
    if (0x90 < heap.u32((unaff_ESI + 0x3c))) {
      return in_EAX;
    }
  }
  if ((((0x301U >>> (uVar9 & 0xf) & 1) == 0) || (heap.u32(0x008d7eb6) == '\0')) && (((0x100U >>> (uVar9 & 0xf) & 1) == 0 || (0xb < heap.u32(0x008d7eb0))))) {
    if (((0xa3c0U >>> (uVar9 & 0xf) & 1) != 0) && (0x4b < heap.u32((unaff_ESI + 0x3e)))) {
      uVar10 = FUN_00440fe3(heap);
      return uVar10;
    }
    if (((0x20U >>> (uVar9 & 0xf) & 1) != 0) && (0x4b < heap.u32((unaff_ESI + 0x3f)))) {
      uVar10 = FUN_00440fe3(heap);
      return uVar10;
    }
    if (((((cVar3 == '\x04') && (heap.u32(0x008d7eb6) != '\0')) || ((cVar3 == '\x02' && (heap.u32((unaff_ESI + 0xc5)) == -1)))) || (((0x1bU >>> (uVar9 & 0xf) & 1) == 0 || (heap.u32(0x006293ca) != '\0')))) || ((bVar4 = FUN_005df40c(heap), (byte)((bVar4 & 0x7f) + 0x73) <= heap.u32((unaff_ESI + 0x3a)) && (in_ECX = extraout_ECX, 2 < heap.u32((unaff_ESI + 0x2f)))))) {
      if (heap.u32(0x006293ca) == '\0') {
        if (in_ECX != 0) {
          if (heap.u32((unaff_ESI + 0xa0)) == 0) {
            uVar10 = FUN_00440fe3(heap);
            return uVar10;
          }
          if (heap.u32((unaff_ESI + 0xa0)) < in_ECX) {
            uVar10 = FUN_00440fe3(heap);
            return uVar10;
          }
        }
        uVar7 = heap.u32((__addr_DAT_0062d582 + uVar10 * 8));
        if ('\x14' < heap.u32(0x008d7eb0)) {
          uVar7 = heap.u32((__addr_DAT_0062d584 + uVar10 * 8));
        }
        if (heap.u32(0x008d7eb0) < '\f') {
          uVar7 = heap.u32((__addr_DAT_0062d586 + uVar10 * 8));
        }
        if (uVar7 < in_ECX) {
          if (((cVar3 != '\x04') || (heap.u32(0x008d7eb6) == '\0')) && (uVar7 = FUN_005df40c(heap), (uVar7 & 7) < extraout_DX)) {
            uVar10 = FUN_00440fe3(heap);
            return uVar10;
          }
        } else {
          bVar5 = FUN_005df40c(heap);
          bVar4 = extraout_DL;
          if ((bVar5 & 7) <= extraout_DL) {
            FUN_00440fe3(heap);
            bVar4 = extraout_DL_00;
          }
          bVar4 = bVar4 * '\x04';
          pbVar1 = (unaff_ESI + 0x3b);
          bVar5 = heap.u32(pbVar1);
          heap.u32(pbVar1) = heap.u32(pbVar1) + bVar4;
          if (CARRY1(bVar5, bVar4)) {
            heap.u32((unaff_ESI + 0x3b)) = 0xff;
          }
          pbVar1 = (unaff_ESI + 0x3a);
          bVar5 = heap.u32(pbVar1);
          heap.u32(pbVar1) = heap.u32(pbVar1) + bVar4;
          if (CARRY1(bVar5, bVar4)) {
            heap.u32((unaff_ESI + 0x3a)) = 0xff;
          }
        }
      }
      uVar11 = in_EAX >>> 8 & 0xff;
      iVar12 = uVar11 * 0x260;
      if (heap.u32(0x006293ca) == '\0') {
        FUN_004413c5(heap);
      }
      uVar6 = in_EAX;
      pbVar1 = (unaff_ESI + 0xca + (uVar9 >>> 3));
      heap.u32(pbVar1) = heap.u32(pbVar1) | '\x01' << (uVar9 & 7);
      if (uVar9 == 2) {
        uVar6 = FUN_00441891(heap);
      }
      bVar5 = heap.u32((__addr_DAT_0062d600) + (uVar10) * 4);
      pbVar1 = (unaff_ESI + 0x42);
      bVar4 = heap.u32(pbVar1);
      heap.u32(pbVar1) = heap.u32(pbVar1) + bVar5;
      if (CARRY1(bVar4, bVar5)) {
        heap.u32((unaff_ESI + 0x42)) = 0xff;
      }
      if (uVar6 == '\x03') {
        heap.u32((unaff_ESI + 199)) = (uVar6 >>> 8);
      }
      heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 8;
      uVar7 = FUN_004420e0(heap);
      if ((heap.u32((unaff_ESI + 200)) & 8) != 0) {
        heap.u16(0x971e86) = heap.u32((unaff_ESI + 0x22));
        unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
        heap.u16(0x971e8c) = (uVar7 & 0xff) + 0x719;
        FUN_0042c711(heap);
      }
      if ((0xa3c0U >>> (uVar9 & 0xf) & 1) != 0) {
        heap.u32((unaff_ESI + 0xec)) = heap.u32((unaff_ESI + 0xec)) + '\x01';
      }
      if ((0x20U >>> (uVar9 & 0xf) & 1) != 0) {
        heap.u32((unaff_ESI + 0xed)) = heap.u32((unaff_ESI + 0xed)) + '\x01';
      }
      if ((0x1fU >>> (uVar9 & 0xf) & 1) != 0) {
        heap.u32((unaff_ESI + 0xee)) = heap.u32((unaff_ESI + 0xee)) + '\x01';
      }
      heap.setU32(0x006293b0, (0xea) >>> 0);
      heap.setU32(0x0099c167, ('\x1c') >>> 0);
      if ((0xa3e0U >>> (uVar9 & 0xf) & 1) != 0) {
        heap.setU32(0x006293b0, (0xe8) >>> 0);
        heap.setU32(0x0099c167, ('$') >>> 0);
      }
      uVar10 = heap.u32((__addr_DAT_0062d580 + uVar10 * 8));
      uVar8 = FUN_004429db(heap);
      heap.setU32(0x0099c167, (heap.u32(0x0099c167) + -4) >>> 0);
      if (heap.u32(0x006293ca) == '\0') {
        uVar8 = FUN_004405f3(heap);
        uVar10 = extraout_ECX_01;
      } else {
        heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) & 0xbfff;
        heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 8;
      }
      heap.u32((__addr_DAT_00887524) + (uVar11 * 0x98) * 4) = heap.u32((__addr_DAT_00887524) + (uVar11 * 0x98) * 4) + (extraout_ECX_00 - uVar10);
      heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) | 2;
      heap.u32((__addr_DAT_008874f0 + iVar12)) = heap.u32((__addr_DAT_008874f0 + iVar12)) + 1;
      heap.u32((__addr_DAT_00887520 + iVar12)) = heap.u32((__addr_DAT_00887520 + iVar12)) + 1;
      heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) | 1;
      return uVar8;
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(36);
  }
}

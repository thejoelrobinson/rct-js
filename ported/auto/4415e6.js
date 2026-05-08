// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4415e6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../runtime/ghidra-builtins.js";
import { FUN_0044189c } from "./44189c.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004415e6(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_00630e58 = __sp + 4;
  try {
  let uVar2 = 0;
  let cVar3 = 0;
  let sVar4 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_DL = 0;
  let extraout_DL = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = 0;
  let local_c = 0;
  let local_8 = 0;
  uVar5 = 0x10;
  if (heap.u32((unaff_ESI + 0x2e)) != '\x01') {
    if ((heap.u32((unaff_ESI + 200)) & 4) == 0) {
      if (((((heap.u32((unaff_ESI + 200)) & 1) == 0) || (0x59 < heap.u32((unaff_ESI + 0xc6)))) && (uVar5 = 0xe, (heap.u32((unaff_ESI + 0xca)) & 4) == 0)) && (uVar5 = 0xc, (heap.u32((unaff_ESI + 200)) & 1) == 0)) {
        uVar5 = 8;
      }
    } else {
      uVar7 = FUN_005df40c(heap);
      in_ECX = extraout_ECX;
      in_DL = extraout_DL;
      if (uVar7 < 0x1c72) {
        heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) & 0xfffb;
      }
    }
  }
  uVar6 = 0xf;
  if (((unaff_ESI != -1) && (CONCAT11((heap.u32(0x006293be) >>> 5), (heap.u32(0x006293bc) >>> 5)) == heap.u32((unaff_ESI + 0xcc)))) && (heap.u32(0x006293c0) == heap.u32((unaff_ESI + 0xce)))) {
    uVar6 = 0;
    do {
      if ((CONCAT11((in_ECX >>> 5), (in_EAX >>> 5)) == heap.u32((unaff_ESI + 0xd0 + uVar6 * 4))) && (in_DL == heap.u32((unaff_ESI + 0xd2 + uVar6 * 4)))) {
        uVar6 = heap.u32((unaff_ESI + 0xd3 + uVar6 * 4)) & 0xf;
        /* goto LAB_004416c9 */ throw new Error("goto LAB_004416c9 not supported");
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    uVar6 = 0xf;
  }
  LAB_004416c9: uVar7 = in_ECX << 7 | in_ECX >>> 9 | in_EAX;
  pbVar8 = heap.u32((__addr_DAT_00971ef4) + ((uVar7 >>> 5 | uVar7 << 0xb)) * 4);
  LAB_004416e1: heap.u8(0x6293c4) = uVar5;
  if ((in_DL != heap.u32(pbVar8 + (2) * 4)) || ((heap.u32(pbVar8) & 0x3c) != 4)) {
    /* goto LAB_004416f0 */ throw new Error("goto LAB_004416f0 not supported");
  }
  uVar6 = (heap.u32(pbVar8 + (6) * 4) & heap.u32((__addr_DAT_00630e58) + (heap.u32(pbVar8 + (6) * 4)) * 4)) & uVar6;
  if (uVar6 != 0) {
    local_8 = 0;
    if (uVar6 != 0) {
      for (; (uVar6 >>> local_8 & 1) == 0; local_8 = local_8 + 1) {
      
      }
    }
    uVar6 = uVar6 & ~(1 << (local_8 & 0x1f));
    if (uVar6 != 0) {
      uVar6 = uVar6 | 1 << (local_8 & 0x1f);
      local_8 = 0xffffffff;
      local_c = 0xffff00ff;
      while (true) {
        uVar2 = 0;
        if (uVar6 != 0) {
          for (; (uVar6 >>> uVar2 & 1) == 0; uVar2 = uVar2 + 1) {
          
          }
        }
        if (uVar6 == 0) {
          break;
        }
        uVar6 = uVar6 & ~(1 << (uVar2 & 0x1f));
        heap.setU32(0x006293c1, (0xff) >>> 0);
        heap.u16(0x6293c6) = 0;
        heap.u8(0x6293c5) = 0;
        FUN_0044189c(heap);
        if (((((local_c) >>> 16) & 0xffff) == -1) && (heap.u32(0x006293c1) < local_c)) {
          local_c = CONCAT31(0xffff00, heap.u32(0x006293c1));
          local_8 = uVar2;
        }
      }
    }
    /* goto LAB_004417af */ throw new Error("goto LAB_004417af not supported");
  }
  /* goto LAB_004417aa */ throw new Error("goto LAB_004417aa not supported");
  LAB_004416f0: pbVar1 = pbVar8 + 1;
  pbVar8 = pbVar8 + 8;
  if ((heap.u32(pbVar1) & 0x80) != 0) {
    /* goto LAB_004417aa */ throw new Error("goto LAB_004417aa not supported");
  }
  /* goto LAB_004416e1 */ throw new Error("goto LAB_004416e1 not supported");
  LAB_004417aa: local_8 = 0xffffffff;
  LAB_004417af: cVar3 = heap.u32(0x006293c0);
  if ((unaff_ESI != -1) && (local_8 != 0xffffffff)) {
    sVar4 = CONCAT11((heap.u32(0x006293be) >>> 5), (heap.u32(0x006293bc) >>> 5));
    if ((sVar4 != heap.u32((unaff_ESI + 0xcc))) || (heap.u32(0x006293c0) != heap.u32((unaff_ESI + 0xce)))) {
      heap.u32((unaff_ESI + 0xcc)) = sVar4;
      heap.u32((unaff_ESI + 0xce)) = cVar3;
      heap.u32((unaff_ESI + 0xcf)) = 0;
      heap.u32((unaff_ESI + 0xd0)) = 0xffffffff;
      heap.u32((unaff_ESI + 0xd4)) = 0xffffffff;
      heap.u32((unaff_ESI + 0xd8)) = 0xffffffff;
      heap.u32((unaff_ESI + 0xdc)) = 0xffffffff;
    }
    uVar6 = 0;
    sVar4 = CONCAT11((in_ECX >>> 5), (in_EAX >>> 5));
    do {
      if ((sVar4 == heap.u32((unaff_ESI + 0xd0 + uVar6 * 4))) && (in_DL == heap.u32((unaff_ESI + 0xd2 + uVar6 * 4)))) {
        /* goto LAB_00441885 */ throw new Error("goto LAB_00441885 not supported");
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    uVar6 = heap.u32((unaff_ESI + 0xcf));
    heap.u32((unaff_ESI + 0xcf)) = heap.u32((unaff_ESI + 0xcf)) + '\x01';
    heap.u32((unaff_ESI + 0xcf)) = heap.u32((unaff_ESI + 0xcf)) & 3;
    heap.u32((unaff_ESI + 0xd0 + uVar6 * 4)) = sVar4;
    heap.u32((unaff_ESI + 0xd2 + uVar6 * 4)) = in_DL;
    heap.u32((unaff_ESI + 0xd3 + uVar6 * 4)) = 0xf;
    LAB_00441885: pbVar8 = (unaff_ESI + 0xd3 + uVar6 * 4 + (local_8 >>> 3));
    heap.u32(pbVar8) = heap.u32(pbVar8) & ~('\x01' << (local_8 & 7));
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}

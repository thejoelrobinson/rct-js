// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43da82.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413c5 } from "./4413c5.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043da82(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_00887510 = __sp + 0;
  const __addr_DAT_00887512 = __sp + 4;
  const __addr_DAT_0062d620 = __sp + 8;
  const __addr_DAT_00887514 = __sp + 12;
  const __addr_DAT_0062d622 = __sp + 16;
  const __addr_DAT_00887516 = __sp + 20;
  const __addr_DAT_00887508 = __sp + 24;
  const __addr_DAT_00887420 = __sp + 28;
  const __addr_DAT_005f5b78 = __sp + 32;
  const __addr_DAT_00887520 = __sp + 36;
  const __addr_DAT_0088751d = __sp + 40;
  try {
  let sVar3 = 0;
  let bVar6 = 0;
  let in_EAX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar7 = 0;
  let extraout_var = 0;
  let extraout_DL = 0;
  let in_EDX = 0;
  let extraout_var_00 = 0;
  let sVar8 = 0;
  let unaff_EBX = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let unaff_ESI = 0;
  let uVar11 = 0;
  let iVar12 = 0;
  uVar11 = in_EDX & 0xff;
  iVar12 = uVar11 * 0x260;
  if ((in_EDX & 0x100) == 0) {
    bVar6 = heap.u32((unaff_ESI + 0x3a));
    uVar7 = 0x1ff;
    uVar9 = bVar6;
    if (heap.u32((__addr_DAT_00887510) + (uVar11 * 0x130) * 4) != -1) {
      uVar7 = 0;
      sVar3 = (heap.u32((unaff_ESI + 0x43)) & 0xf) * 100;
      sVar8 = (heap.u32((unaff_ESI + 0x43)) >>> 4) * 100;
      if ((sVar3 <= heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4)) && (heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4) <= sVar8)) {
        uVar7 = 2;
      }
      sVar3 = sVar3 + bVar6 * -2;
      uVar10 = bVar6;
      sVar8 = sVar8 + uVar10;
      if ((sVar3 <= heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4)) && (heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4) <= sVar8)) {
        uVar7 = uVar7 | 0x10;
      }
      if (((sVar3 + uVar10 * -2) <= heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4)) && (heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4) <= (sVar8 + uVar10))) {
        uVar7 = uVar7 | 0x80;
      }
      uVar4 = heap.u32((unaff_ESI + 0x44)) & 3;
      if ((heap.u32((__addr_DAT_0062d620 + uVar4 * 4)) <= heap.u32((__addr_DAT_00887514 + iVar12))) && (heap.u32((__addr_DAT_00887514 + iVar12)) <= heap.u32((__addr_DAT_0062d622 + uVar4 * 4)))) {
        uVar7 = uVar7 | 4;
      }
      sVar3 = heap.u32((__addr_DAT_0062d620 + uVar4 * 4)) + uVar9 * -2;
      sVar8 = heap.u32((__addr_DAT_0062d622 + uVar4 * 4)) + uVar9;
      if ((sVar3 <= heap.u32((__addr_DAT_00887514 + iVar12))) && (heap.u32((__addr_DAT_00887514 + iVar12)) <= sVar8)) {
        uVar7 = uVar7 | 0x20;
      }
      if (((sVar3 + uVar9 * -2) <= heap.u32((__addr_DAT_00887514 + iVar12))) && (heap.u32((__addr_DAT_00887514 + iVar12)) <= (sVar8 + uVar9))) {
        uVar7 = uVar7 | 0x100;
      }
    }
    uVar9 = heap.u32((__addr_DAT_00887516) + (uVar11 * 0x130) * 4);
    uVar10 = uVar7 | 0x200;
    if (((uVar9 != 0xffff) && (uVar10 = uVar7 | 0x400, uVar9 < heap.u32((__addr_DAT_00887508) + (uVar11 * 0x130) * 4))) && (uVar10 = uVar7 | 0x200, ((uVar9 * bVar6 >>> 8) + heap.u32((__addr_DAT_00887516) + (uVar11 * 0x130) * 4)) < heap.u32((__addr_DAT_00887508) + (uVar11 * 0x130) * 4))) {
      uVar10 = uVar7;
    }
    sVar3 = 0;
    if ((uVar10 & 0x200) != 0) {
      sVar3 = 0xf;
    }
    if ((uVar10 & 0x400) != 0) {
      sVar3 = sVar3 + 0x28;
    }
    if ((uVar10 & 0x600) != 0) {
      sVar3 = sVar3 + -0x2d;
    }
    if ((uVar10 & 6) == 6) {
      sVar3 = sVar3 + 0x46;
    } else {
      if ((uVar10 & 6) != 0) {
        sVar3 = sVar3 + 0xf;
      }
      if ((uVar10 & 0x30) == 0x30) {
        sVar3 = sVar3 + 0x23;
      } else {
        if ((uVar10 & 0x30) != 0) {
          sVar3 = sVar3 + 10;
        }
        if ((uVar10 & 0x180) == 0x180) {
          sVar3 = sVar3 + 10;
        } else {
          sVar3 = sVar3 + -0x3c;
        }
      }
    }
    sVar8 = sVar3;
    if ((0x8c9 < heap.u32((unaff_ESI + 0x7a))) && (sVar8 = sVar3 + -10, 0x1193 < heap.u32((unaff_ESI + 0x7a)))) {
      sVar8 = sVar3 + -0x23;
    }
    if (heap.u32((unaff_ESI + 0x7a)) < 0x2ef) {
      sVar8 = sVar8 + 10;
    }
    bVar6 = heap.u32((unaff_ESI + 0x68));
    pbVar2 = (unaff_ESI + 0x7c + (bVar6 >>> 5) * 4 + ((bVar6 & 0x1f) >>> 3));
    uVar11 = bVar6 & 7;
    bVar6 = heap.u32(pbVar2);
    heap.u32(pbVar2) = heap.u32(pbVar2) | '\x01' << uVar11;
    if ((bVar6 >>> uVar11 & 1) != 0) {
      sVar8 = sVar8 + 10;
    }
    pcVar1 = (unaff_ESI + 0x2f);
    heap.u32(pcVar1) = heap.u32(pcVar1) + '\x01';
    if (heap.u32(pcVar1) == '\0') {
      heap.u32((unaff_ESI + 0x2f)) = heap.u32((unaff_ESI + 0x2f)) + -1;
    }
    bVar6 = heap.u32((__addr_DAT_00887420) + (iVar12) * 4);
    pbVar2 = (unaff_ESI + 0x48 + (bVar6 >>> 5) * 4 + ((bVar6 & 0x1f) >>> 3));
    uVar11 = bVar6 & 7;
    bVar6 = heap.u32(pbVar2);
    heap.u32(pbVar2) = heap.u32(pbVar2) | '\x01' << uVar11;
    if ((bVar6 >>> uVar11 & 1) != 0) {
      sVar8 = sVar8 + 10;
    }
    FUN_004413c5(heap);
    sVar8 = heap.u32((unaff_ESI + 0x3b)) + sVar8;
    if (0xff < sVar8) {
      sVar8 = 0xff;
    }
    if (sVar8 < 0) {
      sVar8 = 0;
    }
    heap.u32((unaff_ESI + 0x3b)) = sVar8;
    uVar7 = 0x100 - sVar8;
    if (uVar7 < 0x40) {
      uVar7 = 0x40;
    }
    if (200 < uVar7) {
      uVar7 = 200;
    }
    uVar11 = heap.u32((unaff_ESI + 0x3e));
    if (uVar11 < 0x81) {
      uVar11 = 0x80;
    }
    sVar3 = heap.u32((unaff_ESI + 0x3d)) + ((((heap.u32((__addr_DAT_00887514 + iVar12)) * uVar7 >>> 9) * uVar11 >>> 7) << 1) >>> (heap.u32((unaff_ESI + 0x44)) & 3));
    if (sVar3 < 0) {
      sVar3 = 0;
    }
    if (0xff < sVar3) {
      sVar3 = 0xff;
    }
    heap.u32((unaff_ESI + 0x3d)) = sVar3;
  } else {
    heap.u32((unaff_ESI + 0x3a)) = heap.u32((unaff_ESI + 0x3b));
    heap.u32((unaff_ESI + 0x3c)) = heap.u32((unaff_ESI + 0x3d));
    heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 2;
    uVar5 = FUN_005df40c(heap);
    if (((((((heap.u32((__addr_DAT_005f5b78 + heap.u32((byte)(__addr_DAT_00887420) + (iVar12) * 4) * 8)) & 0x100000) != 0) && (heap.u32((__addr_DAT_00887510) + (uVar11 * 0x130) * 4) != -1)) && (heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4) < 0x3e9)) && (((0xb3 < heap.u32((unaff_ESI + 0x3a)) && (99 < heap.u32((unaff_ESI + 0x38)))) && ((heap.u32((unaff_ESI + 0x3c)) < 0xa1 && ((0x1d < heap.u32((unaff_ESI + 0x3e)) && (0x13 < heap.u32((unaff_ESI + 0x3f)))))))))) && (heap.u32((unaff_ESI + 0x40)) < 0xab)) && ((bVar6 = (byte)(uVar5 >>> 8), 0x80 < bVar6 || ((heap.u32((unaff_ESI + 0x2f)) < 8 && (bVar6 < 0x41)))))) {
      heap.u32((unaff_ESI + 0xc5)) = extraout_DL;
      heap.u32((unaff_ESI + 0xc6)) = 200;
      uVar5 = FUN_00441891(heap);
      FUN_005e5301(heap);
    }
    if ((199 < heap.u32((unaff_ESI + 0x3a))) && (heap.u32((unaff_ESI + 0x43)) <= uVar5)) {
      pbVar2 = (unaff_ESI + 0x43);
      bVar6 = heap.u32(pbVar2);
      heap.u32(pbVar2) = heap.u32(pbVar2) + 0x10;
      if (0xef < bVar6) {
        heap.u32((unaff_ESI + 0x43)) = heap.u32((unaff_ESI + 0x43)) + -0x10;
      }
    }
    if ((((0xd6 < heap.u32((unaff_ESI + 0x3a))) && (heap.u32((unaff_ESI + 0x3c)) < 0x79)) && (heap.u32((__addr_DAT_00887510) + (uVar11 * 0x130) * 4) != -1)) && (heap.u32((__addr_DAT_00887512) + (uVar11 * 0x130) * 4) < 0x3e9)) {
      FUN_00440fe3(heap);
      uVar11 = FUN_005df40c(heap);
      if ((uVar11 & 7) < 3) {
        FUN_00452fce(heap, CONCAT22(extraout_var_00, heap.u32((unaff_ESI + 0x10))), CONCAT22(extraout_var, heap.u32((unaff_ESI + 0xe))), unaff_EBX, (uVar11 & 7) + 0x29);
      }
    }
    heap.u32((__addr_DAT_00887520 + iVar12)) = heap.u32((__addr_DAT_00887520 + iVar12)) + 1;
    heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar12) * 4) | 1;
  }
  return in_EAX;
} finally {
    heap.freeFrame(44);
  }
}

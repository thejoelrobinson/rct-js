// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426c8a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00426b73 } from "./426b73.js";
import { FUN_00428ec0 } from "./428ec0.js";
import { FUN_004292b0 } from "./4292b0.js";
import { FUN_0042934f } from "./42934f.js";
import { FUN_004410df } from "./4410df.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00426c8a(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0087d0da = __sp + 0;
  const __addr_DAT_00630874 = __sp + 4;
  const __addr_DAT_00887508 = __sp + 8;
  const __addr_DAT_0087d0ee = __sp + 12;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let extraout_var = 0;
  let extraout_var_00 = 0;
  let cVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = 0;
  if ((heap.u32(0x0088741c) & 0x1ff) == 0) {
    heap.setU32(0x0087cc88, (FUN_00428ec0(heap)) >>> 0);
    heap.setU32(0x0087d514, (FUN_004292b0(heap)) >>> 0);
    heap.setU32(0x0087d724, (FUN_0042934f(heap)) >>> 0);
    FUN_005e5301(heap);
    heap.setU32(0x0087d0c4, (FUN_00426b73(heap)) >>> 0);
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 0x10) >>> 0);
    FUN_005e5301(heap);
  }
  uVar2 = FUN_005df40c(heap);
  if (uVar2 < heap.u32(0x0087d0c4)) {
    FUN_005df40c(heap);
    sVar3 = heap.u32(0x0087c3ca);
    bVar6 = heap.u32(0x0087c3cf);
    if ((heap.u32(0x0087c3d0) != -1) && ((extraout_var & 8) != 0)) {
      sVar3 = heap.u32(0x0087c3d0);
      bVar6 = heap.u32(0x0087c3d5);
    }
    if (sVar3 != -1) {
      FUN_004410df(heap);
      if (unaff_ESI != 0) {
        heap.u32((unaff_ESI + 0x1e)) = (bVar6 ^ 2) << 3;
        heap.u32((unaff_ESI + 0x32)) = (heap.u32((unaff_ESI + 0xe)) & 0xffe0) + 0x10;
        heap.u32((unaff_ESI + 0x34)) = (heap.u32((unaff_ESI + 0x10)) & 0xffe0) + 0x10;
        heap.u32((unaff_ESI + 0x36)) = 5;
        heap.u32((unaff_ESI + 0x76)) = 0;
        heap.u32((unaff_ESI + 0x78)) = bVar6 ^ 2;
        heap.u32((unaff_ESI + 0x37)) = 0;
        heap.u32((unaff_ESI + 0x2b)) = 0xd;
      }
    }
  }
  uVar7 = 0;
  do {
    if (heap.u32((__addr_DAT_0087d0da) + (uVar7) * 4) != '\0') {
      uVar4 = FUN_005df40c(heap);
      uVar2 = heap.u32((__addr_DAT_00630874) + (uVar7) * 4);
      cVar5 = uVar7;
      if ((cVar5 == '\0') && (heap.u32(0x0087c3c0) < 4)) {
        uVar2 = uVar2 >>> 3;
      }
      if ((cVar5 == '\x02') && (heap.u32(0x0087c3c0) < 6)) {
        uVar2 = uVar2 >>> 3;
      }
      if ((cVar5 == '\x01') && (heap.u32((__addr_DAT_00887508) + (heap.u32((byte)(__addr_DAT_0087d0ee) + (uVar7) * 4) * 0x130) * 4) < 3)) {
        uVar2 = uVar2 >>> 3;
      }
      if (uVar4 < uVar2) {
        FUN_005df40c(heap);
        bVar6 = heap.u32(0x0087c3cf);
        sVar3 = heap.u32(0x0087c3ca);
        if ((heap.u32(0x0087c3d0) != -1) && ((extraout_var_00 & 8) != 0)) {
          bVar6 = heap.u32(0x0087c3d5);
          sVar3 = heap.u32(0x0087c3d0);
        }
        if (sVar3 != -1) {
          FUN_004410df(heap);
          if (unaff_ESI != 0) {
            heap.u32((unaff_ESI + 0x1e)) = (bVar6 ^ 2) << 3;
            heap.u32((unaff_ESI + 0x32)) = (heap.u32((unaff_ESI + 0xe)) & 0xffe0) + 0x10;
            heap.u32((unaff_ESI + 0x34)) = (heap.u32((unaff_ESI + 0x10)) & 0xffe0) + 0x10;
            heap.u32((unaff_ESI + 0x36)) = 5;
            heap.u32((unaff_ESI + 0x76)) = 0;
            heap.u32((unaff_ESI + 0x78)) = bVar6 ^ 2;
            heap.u32((unaff_ESI + 0x37)) = 0;
            heap.u32((unaff_ESI + 0x2b)) = 0xd;
            switch (uVar7) {
              default:
                heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) | 0x4000;
                heap.u32((unaff_ESI + 0xf0)) = 0;
                break;
              case 1:
                heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) | 0x4000;
                heap.u32((unaff_ESI + 0xf0)) = 1;
                uVar1 = heap.u32((__addr_DAT_0087d0ee) + (uVar7) * 4);
                heap.u32((unaff_ESI + 0xf1)) = uVar1;
                heap.u32((unaff_ESI + 0xc5)) = uVar1;
                heap.u32((unaff_ESI + 0xc6)) = 0xf0;
                break;
              case 2:
                heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) | 0x4000;
                heap.u32((unaff_ESI + 0xf0)) = 2;
                break;
              case 3:
                heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) | 0x4000;
                heap.u32((unaff_ESI + 0xf0)) = 3;
                heap.u32((unaff_ESI + 0xf1)) = heap.u32((__addr_DAT_0087d0ee) + (uVar7) * 4);
                break;
              case 4:
                break;
              case 5:
                heap.u32((unaff_ESI + 0xc5)) = heap.u32((__addr_DAT_0087d0ee) + (uVar7) * 4);
                heap.u32((unaff_ESI + 0xc6)) = 0xf0;
            }
          }
        }
      }
    }
    uVar7 = uVar7 + 1;
  } while (uVar7 < 6);
  return;
} finally {
    heap.freeFrame(16);
  }
}

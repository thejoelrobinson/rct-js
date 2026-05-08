// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d398.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00427410 } from "./427410.js";
import { FUN_00440072 } from "./440072.js";
import { FUN_004406bd } from "./4406bd.js";
import { FUN_00443e98 } from "./443e98.js";
import { FUN_0044a4e8 } from "./44a4e8.js";
import { FUN_0044eff2 } from "./44eff2.js";
import { FUN_0044f03b } from "./44f03b.js";
import { FUN_00455bce } from "./455bce.js";
import { FUN_005de5a7 } from "./5de5a7.js";
import { FUN_005de5ff } from "./5de5ff.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e680e } from "./5e680e.js";
export function FUN_0042d398(heap) {
  let in_ECX = 0;
  let unaff_BL = 0;
  let unaff_ESI = 0;
  let uVar1 = 0;
  let bVar2 = 0;
  if (unaff_BL == '\x01') {
    FUN_0044a4e8(heap);
    return;
  }
  if (unaff_BL == '\x02') {
    FUN_00440072(heap);
    return;
  }
  if (unaff_BL == '\x03') {
    FUN_00455bce(heap);
    return;
  }
  if (unaff_BL == '\x04') {
    FUN_00443e98(heap);
    (heap.u32(heap.u32((unaff_ESI + 4))))();
    return;
  }
  if (unaff_BL == '\x06') {
    if (0x2ffff < in_ECX) {
      FUN_0044eff2(heap);
      FUN_0044f03b(heap, in_ECX);
      return;
    }
    if (in_ECX < 0x20000) {
      if (in_ECX < 0x10000) {
        bVar2 = true;
        FUN_005e5fcb(heap);
        if (bVar2) {
          uVar1 = 0;
          bVar2 = true;
          FUN_005e3b2b(heap);
          if (!bVar2) {
            FUN_005e43de(heap);
            FUN_005e680e(heap);
            if (!uVar1) {
              heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
              FUN_005de5a7(heap);
            }
          }
        }
        FUN_005de5ff(heap, in_ECX);
        return;
      }
      FUN_0044eff2(heap);
      FUN_0044f03b(heap, in_ECX);
      return;
    }
    FUN_0044eff2(heap);
    FUN_0044f03b(heap, in_ECX);
    return;
  }
  if (unaff_BL == '\a') {
    FUN_004406bd(heap);
    return;
  }
  if (unaff_BL != '\b') {
    return;
  }
  FUN_00427410(heap);
  return;
}

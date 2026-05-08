// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df7a1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/win32.js";
import { FUN_004035c1 } from "./4035c1.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_0042d56c } from "./42d56c.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e5b80 } from "./5e5b80.js";
import { FUN_005e68e2 } from "./5e68e2.js";
import { FUN_009bbb9b } from "./9bbb9b.js";
import { FUN_009bbfb3 } from "./9bbfb3.js";
import { FUN_009bc184 } from "./9bc184.js";
export function FUN_005df7a1(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f8d62 = __sp + 0;
  const __addr_PTR_FUN_005dfb64 = __sp + 4;
  try {
  let cVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar5 = 0;
  let unaff_ESI = 0;
  let bVar6 = 0;
  if ((heap.u32(0x0099c168) != '\0') && (heap.setU32(0x0099c168, (heap.u32(0x0099c168) + -1) >>> 0), heap.u32(0x0099c168) == '\0')) {
    FUN_009bbfb3(heap);
    heap.u16(0x971e88) = FUN_009bbb9b(heap);
    heap.u16(0x971e86) = 0x38f;
    FUN_00427108(heap);
    FUN_009bc184(heap);
  }
  if (((heap.u32(0x0099c16b) == '\0') && (heap.u32(0x005f8da0) != '\0')) && (heap.u32(0x005f8d5b) != '\0')) {
    bVar6 = false;
    if (((heap.u32(0x005f1a10) == 0) && (FUN_005e68e2(heap), !bVar6)) && (((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))))) {
      heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) - (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = heap.u32(0x00971eda) - 1 < heap.u32(0x005f1a10);
    if ((((heap.u32(0x00971eda) - 1 == heap.u32(0x005f1a10)) && (FUN_005e68e2(heap), !bVar6)) && ((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))) {
      heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) + (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = false;
    if (((heap.u32(0x005f1a14) == 0) && (FUN_005e68e2(heap), !bVar6)) && (((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))))) {
      heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) - (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = heap.u32(0x00971edc) - 1 < heap.u32(0x005f1a14);
    if ((((heap.u32(0x00971edc) - 1 == heap.u32(0x005f1a14)) && (FUN_005e68e2(heap), !bVar6)) && ((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))) {
      heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) + (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
  }
  heap.setU32(0x0099c16a, (0) >>> 0);
  if (heap.u32(0x005ebee8) == 1) {
    heap.setU32(0x0099c16a, ((heap.u32(0x005f11b6) & 0x80) != 0 || (heap.u32(0x005f11aa) & 0x80) != 0) >>> 0);
    if ((heap.u32(0x005f119d) & 0x80) != 0) {
      heap.setU32(0x0099c16a, (heap.u32(0x0099c16a) | 2) >>> 0);
    }
    if ((heap.u32(0x005f121d) & 0x80) != 0) {
      heap.setU32(0x0099c16a, (heap.u32(0x0099c16a) | 2) >>> 0);
    }
    if (heap.u32(0x0099c16b) == '\0') {
      bVar6 = false;
      if ((((heap.u32(0x005f124b) & 0x80) != 0) && (FUN_005e68e2(heap), !bVar6)) && (((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))))) {
        heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) - (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = false;
      if (((((heap.u32(0x005f124d) & 0x80) != 0) && (FUN_005e68e2(heap), !bVar6)) && ((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))) {
        heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) + (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = false;
      if ((((heap.u32(0x005f1248) & 0x80) != 0) && (FUN_005e68e2(heap), !bVar6)) && (((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))))) {
        heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) - (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = false;
      if (((((heap.u32(0x005f1250) & 0x80) != 0) && (FUN_005e68e2(heap), !bVar6)) && ((heap.u32((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.u32((unaff_ESI + 8)) != 0)))) {
        heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) + (8 << (heap.u32((heap.u32((unaff_ESI + 8)) + 0x10)) & 0x1f));
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
    }
  }
  do {
    while (true) {
      while (true) {
        while (true) {
          do {
            puVar4 = FUN_004035c1(heap);
            if (puVar4 == 0x0) {
              return;
            }
          } while (((0xfe < (ushort) * puVar4) || (cVar1 = heap.u32(puVar4), cVar1 == '\x10')) || (cVar1 == '\x11'));
          bVar6 = true;
          uVar2 = FUN_005e3b2b(heap);
          if (bVar6) {
            break;
          }
          sVar3 = CONCAT11(heap, heap.u32(0x0099c16a), uVar2);
          uVar5 = 0;
          do {
            if (sVar3 == heap.u32((__addr_DAT_005f8d62) + (uVar5) * 4)) {
              heap.u32((__addr_DAT_005f8d62) + (uVar5) * 4) = 0xffff;
            }
            uVar5 = uVar5 + 1;
          } while (uVar5 < 0x1f);
          heap.u32((__addr_DAT_005f8d62) + (heap.u32(0x006e2b75)) * 4) = sVar3;
          FUN_005e5b80(heap);
          FUN_005e5301(heap);
          FUN_0042f3a2(heap);
        }
        if (heap.u32(0x0099c16b) != '\x01') {
          break;
        }
        FUN_0042d56c(heap);
      }
      if ((heap.u32(0x0099a500) & 1) == 0) {
        break;
      }
      if (heap.u32(0x00628cb9) != '\0') {
        heap.setU32(0x00628cb9, (-2) >>> 0);
      }
    }
    uVar5 = 0;
    do {
      if (CONCAT11(heap, heap.u32(0x0099c16a), uVar2) == heap.u32((__addr_DAT_005f8d62) + (uVar5) * 4)) {
        (heap.u32(heap.u32((__addr_PTR_FUN_005dfb64) + (uVar5) * 4)))();
        break;
      }
      uVar5 = uVar5 + 1;
    } while (uVar5 < 0x1f);
  } while (true);
} finally {
    heap.freeFrame(8);
  }
}

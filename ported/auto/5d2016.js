// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d2016.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d298a } from "./5d298a.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d2016(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00653ef9 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let extraout_CX = 0;
  let extraout_DH = 0;
  let bVar2 = 0;
  let unaff_EBX = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let unaff_DI = 0;
  let bVar6 = 0;
  let uVar5 = 0;
  if (heap.u32(0x00652288) == '\x03') {
    heap.setU32(0x00652293, (heap.u32(0x00652293) + -1) >>> 0);
    if (heap.u32(0x00652293) < '\0') {
      heap.setU32(0x00652293, ('\x05') >>> 0);
      heap.setU32(0x00652292, (heap.u32(0x00652292) ^ 1) >>> 0);
      bVar6 = false;
      in_EAX = FUN_005cfe66(heap);
      if (bVar6) {
        heap.setU32(0x00652288, ('\0') >>> 0);
      }
    }
  } else {
    if ((heap.u32(0x00652288) != '\x01') && (heap.u32(0x00652288) != '\x02')) {
      return in_EAX;
    }
    heap.setU32(0x00652293, (heap.u32(0x00652293) + -1) >>> 0);
    if (heap.u32(0x00652293) < '\0') {
      heap.setU32(0x00652293, (5) >>> 0);
      heap.setU32(0x00652292, (heap.u32(0x00652292) ^ 1) >>> 0);
      uVar5 = (undefined3)(unaff_EBX >>> 8);
      heap.setU32(0x0099a4de, (heap.u32(0x0065228a)) >>> 0);
      heap.setU32(0x0099a4e0, (heap.u32(0x0065228c)) >>> 0);
      heap.setU32(0x0099a4e2, (heap.u32(0x0065228e)) >>> 0);
      bVar2 = heap.u32(0x00652290);
      if (3 < heap.u32(0x00652290)) {
        bVar2 = heap.u32(0x00652290) + 4;
      }
      uVar3 = CONCAT31(uVar5, bVar2);
      if (heap.u32(0x00652288) == '\x02') {
        uVar3 = CONCAT31(uVar5, bVar2) ^ 2;
      }
      heap.setU32(0x0099a4e4, (uVar3) >>> 0);
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
      if ((heap.u32(0x00652292) & 1) != 0) {
        heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 4) >>> 0);
      }
      uVar1 = FUN_005e5562(heap);
      bVar6 = false;
      if ((heap.u32(0x00652292) & 1) == 0) {
        uVar1 = FUN_005d298a(heap);
        if (!bVar6) {
          heap.setU32(0x0065229c, (uVar1) >>> 0);
          heap.setU32(0x006522a0, (heap.u32((__addr_DAT_00653ef9 + extraout_DH * 10)) + unaff_DI) >>> 0);
          heap.setU32(0x006522a2, ((byte)(uVar3 >>> 8)) >>> 0);
          iVar4 = CONCAT31((int3)(uVar3 >>> 8), 0x69);
          heap.setU32(0x0065229e, (extraout_CX) >>> 0);
          uVar1 = FUN_00426f56(heap);
          heap.setU32(0x00652260, (iVar4) >>> 0);
          FUN_005e5301(heap);
          if (iVar4 != -0x80000000) {
            heap.setU32(0x00652292, (heap.u32(0x00652292) | 2) >>> 0);
          }
        }
      } else {
        if ((heap.u32(0x00652292) & 2) != 0) {
        heap.setU32(0x00652292, (heap.u32(0x00652292) & 0xfd) >>> 0);
        heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
        bVar6 = false;
        if ((heap.u32(0x006522a2) & 4) == 0) {
          bVar6 = heap.u32(0x0065229e) < heap.u32((__addr_DAT_0065247a) + (heap.u32(0x006522a2) * 2) * 4);
        }
        uVar1 = FUN_005cfac0(heap);
        if (!bVar6) {
          uVar1 = FUN_00426f56(heap);
        }
      }
      }
      return uVar1;
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(8);
  }
}

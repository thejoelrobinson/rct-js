// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d2016.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, undefined3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d298a } from "./5d298a.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d2016(heap) {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let extraout_CX = 0;
  let bVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let unaff_DI = regs.edi & 0xffff;
  let bVar6 = 0;
  let uVar5 = 0;
  if (heap.u8(0x00652288) == 3) {
    heap.setU8(0x00652293, (heap.u8(0x00652293) + -1) & 0xff);
    if (heap.u8(0x00652293) < 0) {
      heap.setU8(0x00652293, (5) & 0xff);
      heap.setU8(0x00652292, (heap.u8(0x00652292) ^ 1) & 0xff);
      bVar6 = ((false) & 0xff);
      in_EAX = (((regs.eax = FUN_005cfe66(heap))) >>> 0);
      if (bVar6) {
        heap.setU8(0x00652288, (0) & 0xff);
      }
    }
  } else {
    if ((heap.u8(0x00652288) != 1) && (heap.u8(0x00652288) != 2)) {
      return in_EAX;
    }
    heap.setU8(0x00652293, (heap.u8(0x00652293) + -1) & 0xff);
    if (heap.u8(0x00652293) < 0) {
      heap.setU8(0x00652293, (5) & 0xff);
      heap.setU8(0x00652292, (heap.u8(0x00652292) ^ 1) & 0xff);
      uVar5 = (((regs.eax = callIndirect(heap, undefined3, ((unaff_EBX) >>> 0) >>> 8))) >>> 0);
      heap.setU32(0x0099a4de, (heap.u8(0x0065228a)) >>> 0);
      heap.setU32(0x0099a4e0, (heap.u8(0x0065228c)) >>> 0);
      heap.setU32(0x0099a4e2, (heap.u8(0x0065228e)) >>> 0);
      bVar2 = ((heap.u8(0x00652290)) & 0xff);
      if (3 < heap.u8(0x00652290)) {
        bVar2 = ((heap.u8(0x00652290) + 4) & 0xff);
      }
      uVar3 = ((CONCAT31(uVar5, bVar2)) >>> 0);
      if (heap.u8(0x00652288) == 2) {
        uVar3 = ((CONCAT31(uVar5, bVar2) ^ 2) >>> 0);
      }
      heap.setU32(0x0099a4e4, (((uVar3) & 0xff)) >>> 0);
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
      if ((heap.u8(0x00652292) & 1) != 0) {
        heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 4) >>> 0);
      }
      uVar1 = (((regs.eax = FUN_005e5562(heap))) >>> 0);
      bVar6 = ((false) & 0xff);
      if ((heap.u8(0x00652292) & 1) == 0) {
        uVar1 = (((regs.eax = FUN_005d298a(heap))) >>> 0);
        if (!bVar6) {
          heap.setU8(0x0065229c, (((uVar1) & 0xffff)) & 0xff);
          heap.setU8(0x006522a0, (heap.i16((0x00653ef9 + ((((regs.edx >>> 8) & 0xff)) >>> 0) * 10)) + unaff_DI) & 0xff);
          heap.setU8(0x006522a2, (((uVar3 >>> 8) & 0xff)) & 0xff);
          iVar4 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar3 >>> 8)), 0x69)) >>> 0);
          heap.setU8(0x0065229e, (extraout_CX) & 0xff);
          uVar1 = (((regs.eax = FUN_00426f56(heap))) >>> 0);
          heap.setU32(0x00652260, (iVar4) >>> 0);
          (regs.eax = FUN_005e5301(heap));
          if (iVar4 != -0x80000000) {
            heap.setU8(0x00652292, (heap.u8(0x00652292) | 2) & 0xff);
          }
        }
      } else {
        if ((heap.u8(0x00652292) & 2) != 0) {
        heap.setU8(0x00652292, (heap.u8(0x00652292) & 0xfd) & 0xff);
        heap.setU32(0x00652470, (heap.u8(0x00652289)) >>> 0);
        bVar6 = ((false) & 0xff);
        if ((heap.u8(0x006522a2) & 4) == 0) {
          bVar6 = ((heap.u8(0x0065229e) < heap.u32(((0x0065247a) & 0xffff) + (heap.u32(0x006522a2) * 2) * 4)) & 0xff);
        }
        uVar1 = (((regs.eax = FUN_005cfac0(heap))) >>> 0);
        if (!bVar6) {
          uVar1 = (((regs.eax = FUN_00426f56(heap))) >>> 0);
        }
      }
      }
      return uVar1;
    }
  }
  return in_EAX;
}

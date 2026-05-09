// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df7a1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
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
  let cVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let puVar4 = 0;
  let uVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar6 = 0;
  if ((heap.u8(0x0099c168) != 0) && (heap.setU8(0x0099c168, (heap.u8(0x0099c168) + -1) & 0xff), heap.u8(0x0099c168) == 0)) {
    (regs.eax = FUN_009bbfb3(heap));
    heap.setU16((0x00971e86 + 2), ((regs.eax = FUN_009bbb9b(heap))) & 0xffff);
    heap.setU16((0x00971e86 + 0), (0x38f) & 0xffff);
    (regs.eax = FUN_00427108(heap));
    (regs.eax = FUN_009bc184(heap));
  }
  if (((heap.u8(0x0099c16b) == 0) && (heap.u8(0x005f8da0) != 0)) && (heap.u8(0x005f8d5b) != 0)) {
    bVar6 = ((false) & 0xff);
    if (((heap.u32(0x005f1a10) == 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && (((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))))) {
      heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) - (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = ((heap.u32(0x00971eda) - 1 < heap.u32(0x005f1a10)) & 0xff);
    if ((((heap.u32(0x00971eda) - 1 == heap.u32(0x005f1a10)) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && ((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))) {
      heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) + (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = ((false) & 0xff);
    if (((heap.u32(0x005f1a14) == 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && (((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))))) {
      heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) - (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
    bVar6 = ((heap.u32(0x00971edc) - 1 < heap.u32(0x005f1a14)) & 0xff);
    if ((((heap.u32(0x00971edc) - 1 == heap.u32(0x005f1a14)) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && ((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))) {
      heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) + (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
    }
  }
  heap.setU8(0x0099c16a, (0) & 0xff);
  if (heap.u32(0x005ebee8) == 1) {
    heap.setU8(0x0099c16a, ((heap.u32(0x005f11b6) & 0x80) != 0 || (heap.u32(0x005f11aa) & 0x80) != 0) & 0xff);
    if ((heap.u32(0x005f119d) & 0x80) != 0) {
      heap.setU8(0x0099c16a, (heap.u8(0x0099c16a) | 2) & 0xff);
    }
    if ((heap.u32(0x005f121d) & 0x80) != 0) {
      heap.setU8(0x0099c16a, (heap.u8(0x0099c16a) | 2) & 0xff);
    }
    if (heap.u8(0x0099c16b) == 0) {
      bVar6 = ((false) & 0xff);
      if ((((heap.u32(0x005f124b) & 0x80) != 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && (((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))))) {
        heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) - (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = ((false) & 0xff);
      if (((((heap.u32(0x005f124d) & 0x80) != 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && ((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))) {
        heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) + (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = ((false) & 0xff);
      if ((((heap.u32(0x005f1248) & 0x80) != 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && (((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0 && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))))) {
        heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) - (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
      bVar6 = ((false) & 0xff);
      if (((((heap.u32(0x005f1250) & 0x80) != 0) && ((regs.eax = FUN_005e68e2(heap)), !bVar6)) && ((heap.u16((unaff_ESI + 0x32)) >>> 2 & 1) == 0)) && (((heap.u32(0x0099a500) & 1) == 0 && (heap.i32((unaff_ESI + 8)) != 0)))) {
        heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) + (8 << (heap.u8((heap.i32((unaff_ESI + 8)) + 0x10)) & 0x1f))) & 0xffff);
        heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x80) >>> 0);
      }
    }
  }
  do {
    while (true) {
      while (true) {
        while (true) {
          do {
            puVar4 = (((regs.eax = FUN_004035c1(heap))) >>> 0);
            if (puVar4 == 0x0) {
              return;
            }
          } while (((0xfe < heap.u16(puVar4)) || (cVar1 = ((((heap.u32(puVar4)) << 24 >> 24)) & 0xff), cVar1 == 16)) || (cVar1 == 17));
          bVar6 = ((true) & 0xff);
          uVar2 = (((regs.eax = FUN_005e3b2b(heap))) & 0xff);
          if (bVar6) {
            break;
          }
          sVar3 = ((CONCAT11(heap.u8(0x0099c16a), uVar2)) & 0xffff);
          uVar5 = ((0) >>> 0);
          do {
            if (sVar3 == heap.u32((0x005f8d62) + (uVar5) * 4)) {
              heap.setU32(((0x005f8d62) + (uVar5) * 4), (0xffff) & 0xffffffff);
            }
            uVar5 = ((uVar5 + 1) >>> 0);
          } while (uVar5 < 0x1f);
          heap.setU32(((0x005f8d62) + (heap.u8(0x006e2b75)) * 4), (sVar3) & 0xffffffff);
          (regs.eax = FUN_005e5b80(heap));
          (regs.eax = FUN_005e5301(heap));
          (regs.eax = FUN_0042f3a2(heap));
        }
        if (heap.u8(0x0099c16b) != 1) {
          break;
        }
        (regs.eax = FUN_0042d56c(heap));
      }
      if ((heap.u32(0x0099a500) & 1) == 0) {
        break;
      }
      if (heap.u8(0x00628cb9) != 0) {
        heap.setU8(0x00628cb9, (-2) & 0xff);
      }
    }
    uVar5 = ((0) >>> 0);
    do {
      if (CONCAT11(heap.u8(0x0099c16a), uVar2) == heap.u32((0x005f8d62) + (uVar5) * 4)) {
        (regs.eax = callIndirect(heap, heap.u32((0x005dfb64) + (uVar5) * 4)));
        break;
      }
      uVar5 = ((uVar5 + 1) >>> 0);
    } while (uVar5 < 0x1f);
  } while (true);
}

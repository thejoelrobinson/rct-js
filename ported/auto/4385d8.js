// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4385d8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../runtime/win32.js";
import { CONCAT22 } from "../runtime/ghidra-builtins.js";
import { FUN_004039ff } from "./4039ff.js";
import { FUN_00403abb } from "./403abb.js";
import { FUN_004046fc } from "./4046fc.js";
import { FUN_0040473c } from "./40473c.js";
import { FUN_004058f8 } from "./4058f8.js";
import { FUN_0040bb01 } from "./40bb01.js";
import { FUN_0040bbcf } from "./40bbcf.js";
import { FUN_00424e0f } from "./424e0f.js";
import { FUN_004269d0 } from "./4269d0.js";
import { FUN_004269da } from "./4269da.js";
import { FUN_00426c8a } from "./426c8a.js";
import { FUN_004270f2 } from "./4270f2.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c6f3 } from "./42c6f3.js";
import { FUN_0042ca0e } from "./42ca0e.js";
import { FUN_0042d678 } from "./42d678.js";
import { FUN_0042eae0 } from "./42eae0.js";
import { FUN_0042ef8a } from "./42ef8a.js";
import { FUN_0042f339 } from "./42f339.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_0042fdf4 } from "./42fdf4.js";
import { FUN_004306ee } from "./4306ee.js";
import { FUN_004313a7 } from "./4313a7.js";
import { FUN_0043645c } from "./43645c.js";
import { FUN_00436508 } from "./436508.js";
import { FUN_004365c3 } from "./4365c3.js";
import { FUN_00438a1f } from "./438a1f.js";
import { FUN_00438aac } from "./438aac.js";
import { FUN_0043909f } from "./43909f.js";
import { FUN_004390dc } from "./4390dc.js";
import { FUN_0043910f } from "./43910f.js";
import { FUN_00439135 } from "./439135.js";
import { FUN_00444a79 } from "./444a79.js";
import { FUN_004499cc } from "./4499cc.js";
import { FUN_0044a363 } from "./44a363.js";
import { FUN_0044a381 } from "./44a381.js";
import { FUN_00450188 } from "./450188.js";
import { FUN_00450b4c } from "./450b4c.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_004531b0 } from "./4531b0.js";
import { FUN_004533d0 } from "./4533d0.js";
import { FUN_00453f76 } from "./453f76.js";
import { FUN_00454351 } from "./454351.js";
import { FUN_004543bd } from "./4543bd.js";
import { FUN_00454518 } from "./454518.js";
import { FUN_00454520 } from "./454520.js";
import { FUN_0045a895 } from "./45a895.js";
import { FUN_0045aaf8 } from "./45aaf8.js";
import { FUN_0045ab15 } from "./45ab15.js";
import { FUN_0045abea } from "./45abea.js";
import { FUN_0045acae } from "./45acae.js";
import { FUN_005d74b4 } from "./5d74b4.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005df3bb } from "./5df3bb.js";
import { FUN_005df7a1 } from "./5df7a1.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e1653 } from "./5e1653.js";
import { FUN_005e5ff1 } from "./5e5ff1.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009bb6af } from "./9bb6af.js";
import { FUN_009bb7bb } from "./9bb7bb.js";
import { FUN_009bb9f5 } from "./9bb9f5.js";
import { FUN_009bbfb3 } from "./9bbfb3.js";
import { FUN_009bc184 } from "./9bc184.js";
export function FUN_004385d8(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_stack0xfffffffc = __sp + 0;
  const __addr_DAT_0099a888 = __sp + 4;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let sVar6 = 0;
  heap.setU32(0x00991f6c, (__addr_stack0xfffffffc) >>> 0);
  heap.setU32(0x005e9154, (0) >>> 0);
  puVar3 = __addr_stack0xfffffffc;
  if (heap.u32(0x00628cb8) == '\0') {
    heap.setU32(0x00628cb8, ('\x01') >>> 0);
    heap.setU32(0x00628cb0, (heap.u32(0x005e9190)) >>> 0);
    FUN_004046fc(heap);
    heap.setU32(0x0099a502, (heap.u32(0x005f1ca4)) >>> 0);
    heap.setU32(0x0099a504, (heap.u32(0x005f1394)) >>> 0);
    FUN_0042ef8a(heap);
    FUN_005df3bb(heap);
    FUN_0042f339(heap);
    FUN_0042fdf4(heap);
    FUN_009bb6af(heap);
    FUN_0045268c(heap);
    FUN_005e0d60(heap);
    FUN_0042c6f3(heap);
    FUN_004269d0(heap);
    FUN_0045a895(heap);
    FUN_00444a79(heap);
    FUN_0044a381(heap);
    FUN_0043910f(heap);
    FUN_00454520(heap);
    FUN_0043645c(heap);
    FUN_004269da(heap);
    FUN_004298a0(heap);
    FUN_0045aaf8(heap);
    FUN_0045abea(heap);
    FUN_005ddf20(heap);
    FUN_0044a363(heap);
    FUN_004390dc(heap);
    FUN_00454518(heap);
    FUN_00438a1f(heap);
    FUN_009b30bc(heap);
    heap.setU32(0x0099a888, (0) >>> 0);
    FUN_004039ff(heap, __addr_DAT_0099a888, __addr_DAT_0099a888, __addr_DAT_0099a888, 0xa888, 0xa888);
    FUN_00403abb(heap);
    heap.setU32(0x00999f90, (FUN_0040473c(heap)) >>> 0);
    heap.setU32(0x00628cb9, ('\x01') >>> 0);
    puVar3 = heap.u32(0x00991f6c);
  }
  heap.setU32(0x00991f6c, (puVar3) >>> 0);
  iVar5 = FUN_0040473c(heap);
  heap.setU32(0x00999f90, (iVar5 - heap.u32(0x00999f90)) >>> 0);
  if (500 < heap.u32(0x00999f90)) {
    heap.setU32(0x00999f90, (CONCAT22((heap.u32(0x00999f90) >>> 0x10), 500)) >>> 0);
  }
  heap.setU32(0x00999f98, (heap.u32(0x00999f90)) >>> 0);
  if (heap.u32(0x0099c169) == '\0') {
    heap.setU32(0x00999f94, (heap.u32(0x00999f94) + heap.u32(0x00999f90)) >>> 0);
  }
  if (heap.u32(0x0099c16b) != '\0') {
    heap.setU32(0x00999f98, (0x1f) >>> 0);
  }
  heap.setU32(0x005f4a6a, (0) >>> 0);
  heap.setU32(0x00999f90, (iVar5) >>> 0);
  FUN_009bb9f5(heap);
  if (heap.u32(0x005f8da2) == 0) {
    heap.setU32(0x005f8da2, (0x10) >>> 0);
    FUN_009b30bc(heap);
    FUN_004058f8(heap, 0x8cd0, 0x8cd4);
    heap.setU32(0x00628ce0, (0) >>> 0);
  } else {
    if (0xf < heap.u32(0x005f8da2)) {
      heap.setU32(0x005f8da2, (heap.u32(0x005f8da2) + 1) >>> 0);
      if (0x2f < heap.u32(0x005f8da2)) {
        iVar5 = FUN_0040bb01(heap, 0x8cd8, 0x8cdc);
        if (iVar5 != 0) {
          heap.setU32(0x00628ce0, (heap.u32(0x00628ce0) | heap.u32((heap.u32(0x00628cd0) + heap.u32(0x00628cd8) + (heap.u32(0x00628cd4) + 4) * heap.u32(0x00628cdc) + 2))) >>> 0);
          FUN_0040bbcf(heap);
        }
      }
      GetNextWindow(heap, heap.u32(0x00628cd0), heap.u32(0x00628cd4));
      FUN_005e6028(heap);
      if (heap.u32(0x005f8da2) != 0x60) {
        /* goto LAB_00438a0d */ throw new Error("goto LAB_00438a0d not supported");
      }
      heap.setU32(0x005f8da2, (1) >>> 0);
      if (heap.u32(0x00628ce0) != 0) {
        heap.setU32(0x005f8da2, (2) >>> 0);
      }
      FUN_0042f3a2(heap);
    }
    FUN_009bc184(heap);
    FUN_0042eae0(heap);
    if (heap.u32(0x005e9188) == 1) {
      heap.setU32(0x005e9188, (0) >>> 0);
      heap.setU32(0x0099a4fc, (heap.u32(0x0099a4fc) | 2) >>> 0);
    }
    FUN_005df7a1(heap);
    FUN_004531b0(heap);
    if (heap.u32(0x00628cb9) == '\0') {
      uVar4 = heap.u32(0x00999f98) / 0x1f;
      if (uVar4 == 0) {
        uVar4 = 1;
      }
      if (4 < uVar4) {
        uVar4 = 4;
      }
      if (heap.u32(0x0099c169) == '\0') {
        while (true) {
          sVar6 = heap.u32(0x0099a4fe);
          heap.setU32(0x0088741c, (heap.u32(0x0088741c) + 1) >>> 0);
          heap.setU32(0x006e3b84, (heap.u32(0x006e3b84) + 1) >>> 0);
          heap.setU32(0x0099a4fe, (heap.u32(0x0099a4fe) + 1) >>> 0);
          if (heap.u32(0x0099a4fe) == 0) {
            heap.setU32(0x0099a4fe, (sVar6) >>> 0);
          }
          FUN_004365c3(heap);
          sVar6 = heap.u32(0x006e3b82);
          FUN_0045ab15(heap);
          FUN_0045acae(heap);
          FUN_00424e0f(heap);
          FUN_00439135(heap);
          FUN_005d74b4(heap);
          FUN_0042d678(heap);
          FUN_004499cc(heap);
          FUN_00426c8a(heap);
          FUN_004313a7(heap);
          FUN_00450188(heap);
          FUN_00450b4c(heap);
          FUN_00436508(heap);
          FUN_004533d0(heap);
          FUN_004543bd(heap);
          FUN_00453f76(heap);
          FUN_00454351(heap);
          FUN_0042ca0e(heap);
          FUN_005e5ff1(heap);
          FUN_004306ee(heap);
          if (sVar6 == heap.u32(0x006e3b82)) {
            FUN_0043909f(heap);
          }
          if (heap.u32(0x005e9170) == 1) {
            break;
          }
          if ((((heap.u32(0x00991f36) != '\0') && (heap.u32(0x00991f36) != '\x01')) || (uVar1 = heap.u32(0x00991f30) >>> 7, heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffff7f) >>> 0), (uVar1 & 1) != 0)) || (uVar4 = uVar4 - 1, uVar4 == 0)) {
            /* goto LAB_0043896a */ throw new Error("goto LAB_0043896a not supported");
          }
        }
        heap.setU32(0x005e9170, (0) >>> 0);
      }
      LAB_0043896a: heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffff7f) >>> 0);
      heap.setU32(0x006293cb, (heap.u32(0x006293cb) ^ 0x8000) >>> 0);
      uVar4 = heap.u32(0x006293cb) & 1;
      heap.setU32(0x006293cb, (heap.u32(0x006293cb) & 0xfffc) >>> 0);
      if (uVar4 != 0) {
        heap.setU32(0x006293cb, (heap.u32(0x006293cb) | 2) >>> 0);
      }
      uVar2 = heap.u32(0x006293cb);
      heap.setU32(0x006293cb, (heap.u32(0x006293cb) & 0xfff7) >>> 0);
      uVar4 = heap.u32(0x006293cb) >>> 2;
      heap.setU32(0x006293cb, (uVar2 & 0xfff3) >>> 0);
      if ((uVar4 & 1) != 0) {
        heap.setU32(0x006293cb, (heap.u32(0x006293cb) | 8) >>> 0);
      }
      FUN_005e1653(heap);
      heap.setU32(0x008ad1c0, (heap.u32(0x008ad1c0) + 1) >>> 0);
      FUN_004270f2(heap);
      FUN_009bb7bb(heap);
      FUN_009bbfb3(heap);
    } else {
      FUN_00438aac(heap);
    }
    if (heap.u32(0x005f8da2) == 2) {
      heap.setU32(0x005e9150, (1) >>> 0);
      FUN_004058f8(heap, 0x8cd0, 0x8cd4);
      GetNextWindow(heap, heap.u32(0x00628cd0), heap.u32(0x00628cd4));
    }
  }
  LAB_00438a0d: do {
    iVar5 = FUN_0040473c(heap);
  } while ((iVar5 - heap.u32(0x00999f90)) < 0x19);
  return;
} finally {
    heap.freeFrame(8);
  }
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d849e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042ddb9 } from "./42ddb9.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d849e(heap) {
  let puVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let cVar6 = 0;
  let uVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  cVar6 = ((heap.i8((unaff_ESI + 0x31))) & 0xff);
  if (cVar6 == 16) {
    heap.setI32((unaff_ESI + 200), (heap.i32((unaff_ESI + 200)) + heap.u32(0x0065dc30)) & 0xffffffff);
    bVar3 = ((((heap.u32((unaff_ESI + 200)) >>> 0x14) & 0xff)) & 0xff);
    bVar4 = ((bVar3 & 3) & 0xff);
    if (bVar4 != heap.u8((unaff_ESI + 0xc5))) {
      LOCK();
      bVar2 = ((heap.u8((unaff_ESI + 0xc5))) & 0xff);
      heap.setU8((unaff_ESI + 0xc5), (bVar4) & 0xff);
      UNLOCK();
      uVar5 = ((CONCAT11(bVar3, bVar2) & 0x202) & 0xffff);
      if (((uVar5) << 24 >> 24) != (((uVar5 >>> 8)) << 24 >> 24)) {
        (regs.eax = FUN_0042ddb9(heap));
      }
      (regs.eax = FUN_005e53ca(heap));
    }
  } else {
    if (cVar6 == 9) {
    heap.setI32((unaff_ESI + 200), (heap.i32((unaff_ESI + 200)) + heap.u32(0x0065dc30)) & 0xffffffff);
    bVar3 = ((((heap.u32((unaff_ESI + 200)) >>> 0x13) & 0xff) & 1) & 0xff);
    if (bVar3 != heap.u8((unaff_ESI + 0xc5))) {
      heap.setU8((unaff_ESI + 0xc5), (bVar3) & 0xff);
      return (regs.eax = FUN_005e53ca(heap));
    }
  } else {
    if (cVar6 == 13) {
    heap.setI32((unaff_ESI + 200), (heap.i32((unaff_ESI + 200)) + heap.u32(0x0065dc30)) & 0xffffffff);
    cVar6 = ((((((heap.u32((unaff_ESI + 200)) >>> 0xd & 0xff) * 6 >>> 8)) << 24 >> 24)) & 0xff);
    if (cVar6 != heap.i8((unaff_ESI + 0xc5))) {
      heap.setI8((unaff_ESI + 0xc5), (cVar6) & 0xff);
      return (regs.eax = FUN_005e53ca(heap));
    }
  } else {
    if (cVar6 == 14) {
    heap.setI32((unaff_ESI + 200), (heap.i32((unaff_ESI + 200)) + heap.u32(0x0065dc30)) & 0xffffffff);
    cVar6 = ((((((heap.u32((unaff_ESI + 200)) >>> 0xd & 0xff) * 7 >>> 8)) << 24 >> 24)) & 0xff);
    if (cVar6 != heap.i8((unaff_ESI + 0xc5))) {
      heap.setI8((unaff_ESI + 0xc5), (cVar6) & 0xff);
      return (regs.eax = FUN_005e53ca(heap));
    }
  } else {
    if (cVar6 != 30) {
      if (cVar6 != 34) {
        return;
      }
      puVar1 = (((unaff_ESI + 200)) >>> 0);
      uVar5 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) + 0x3333) & 0xffffffff);
      if (0xcccc < uVar5) {
        heap.setI8((unaff_ESI + 0xc5), (heap.i8((unaff_ESI + 0xc5)) + 1) & 0xff);
        heap.setU8((unaff_ESI + 0xc5), (heap.u8((unaff_ESI + 0xc5)) & 7) & 0xff);
        (regs.eax = FUN_005e53ca(heap));
      }
      return;
    }
    heap.setI32((unaff_ESI + 200), (heap.i32((unaff_ESI + 200)) + heap.u32(0x0065dc30)) & 0xffffffff);
    bVar3 = ((((heap.u32((unaff_ESI + 200)) >>> 0x13) & 0xff) & 1) & 0xff);
    if (bVar3 != heap.u8((unaff_ESI + 0xc5))) {
      heap.setU8((unaff_ESI + 0xc5), (bVar3) & 0xff);
      return (regs.eax = FUN_005e53ca(heap));
    }
  }
  }
  }
  }
  return;
}

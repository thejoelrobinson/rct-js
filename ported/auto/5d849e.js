// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d849e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0042ddb9 } from "./42ddb9.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d849e(heap) {
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let cVar6 = 0;
  let uVar5 = 0;
  let unaff_ESI = 0;
  cVar6 = heap.u32((unaff_ESI + 0x31));
  if (cVar6 == '\x10') {
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) + heap.u32(0x0065dc30);
    bVar3 = (byte)(heap.u32((unaff_ESI + 200)) >>> 0x14);
    bVar4 = bVar3 & 3;
    if (bVar4 != heap.u32((unaff_ESI + 0xc5))) {
      LOCK();
      bVar2 = heap.u32((unaff_ESI + 0xc5));
      heap.u32((unaff_ESI + 0xc5)) = bVar4;
      UNLOCK();
      uVar5 = CONCAT11(bVar3, bVar2) & 0x202;
      if (uVar5 != (uVar5 >>> 8)) {
        FUN_0042ddb9(heap);
      }
      FUN_005e53ca(heap);
    }
  } else {
    if (cVar6 == '\t') {
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) + heap.u32(0x0065dc30);
    bVar3 = (byte)(heap.u32((unaff_ESI + 200)) >>> 0x13) & 1;
    if (bVar3 != heap.u32((unaff_ESI + 0xc5))) {
      heap.u32((unaff_ESI + 0xc5)) = bVar3;
      FUN_005e53ca(heap);
      return;
    }
  } else {
    if (cVar6 == '\r') {
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) + heap.u32(0x0065dc30);
    cVar6 = ((heap.u32((unaff_ESI + 200)) >>> 0xd & 0xff) * 6 >>> 8);
    if (cVar6 != heap.u32((unaff_ESI + 0xc5))) {
      heap.u32((unaff_ESI + 0xc5)) = cVar6;
      FUN_005e53ca(heap);
      return;
    }
  } else {
    if (cVar6 == '\x0e') {
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) + heap.u32(0x0065dc30);
    cVar6 = ((heap.u32((unaff_ESI + 200)) >>> 0xd & 0xff) * 7 >>> 8);
    if (cVar6 != heap.u32((unaff_ESI + 0xc5))) {
      heap.u32((unaff_ESI + 0xc5)) = cVar6;
      FUN_005e53ca(heap);
      return;
    }
  } else {
    if (cVar6 != '\x1e') {
      if (cVar6 != '\"') {
        return;
      }
      puVar1 = (unaff_ESI + 200);
      uVar5 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) + 0x3333;
      if (0xcccc < uVar5) {
        heap.u32((unaff_ESI + 0xc5)) = heap.u32((unaff_ESI + 0xc5)) + '\x01';
        heap.u32((unaff_ESI + 0xc5)) = heap.u32((unaff_ESI + 0xc5)) & 7;
        FUN_005e53ca(heap);
      }
      return;
    }
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) + heap.u32(0x0065dc30);
    bVar3 = (byte)(heap.u32((unaff_ESI + 200)) >>> 0x13) & 1;
    if (bVar3 != heap.u32((unaff_ESI + 0xc5))) {
      heap.u32((unaff_ESI + 0xc5)) = bVar3;
      FUN_005e53ca(heap);
      return;
    }
  }
  }
  }
  }
  return;
}

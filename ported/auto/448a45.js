// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448a45.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../runtime/win32.js";
import { FUN_004364c2 } from "./4364c2.js";
export function FUN_00448a45(heap) {
  let uVar2 = 0;
  let cVar3 = 0;
  let in_AX = 0;
  let in_CX = 0;
  let in_DL = 0;
  let in_DH = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let unaff_EBX = 0;
  let uVar6 = 0;
  heap.setU32(0x00630bc8, (0xffffffff) >>> 0);
  heap.setU32(0x00630bd0, (0xffffffff) >>> 0);
  bVar4 = heap.u32(unaff_ESI + (2) * 4);
  heap.setU32(0x00630bd8, (in_DH) >>> 0);
  LAB_00448a65: bVar5 = unaff_EBX;
  if ((((heap.u32(unaff_ESI) & 0x3c) == 4) && (heap.setU32(0x00630bc8, (unaff_ESI) >>> 0), heap.setU32(0x00630bcc, (in_AX) >>> 0), heap.setU32(0x00630bce, (in_CX) >>> 0), heap.setU32(0x00630bd4, (unaff_EBX) >>> 0), (heap.u32(unaff_ESI + (4) * 4) & 4) != 0)) && ((heap.u32(unaff_ESI + (4) * 4) & 3) == bVar5)) {
    bVar4 = bVar4 + 4;
  }
  in_AX = in_AX + heap.u32((0x00652478) + (unaff_EBX * 2) * 4);
  in_CX = in_CX + heap.u32((0x0065247a) + (unaff_EBX * 2) * 4);
  uVar6 = in_CX * 0x80 | in_CX >>> 9 | in_AX;
  unaff_ESI = heap.u32((0x00971ef4) + ((ushort)(uVar6 >>> 5 | uVar6 << 0xb)) * 4);
  do {
    if ((unaff_ESI != heap.u32(0x00630bd0)) && ((heap.u32(unaff_ESI) & 0x3c) == 4)) {
      if (bVar4 == heap.u32(unaff_ESI + (2) * 4)) {
        if (((heap.u32(unaff_ESI + (4) * 4) & 4) == 0) || ((heap.u32(unaff_ESI + (4) * 4) & 3) == bVar5)) {
          /* goto LAB_00448b0e */ throw new Error("goto LAB_00448b0e not supported");
        }
        /* goto LAB_00448b71 */ throw new Error("goto LAB_00448b71 not supported");
      }
      if ((byte)(bVar4 - 4) == heap.u32(unaff_ESI + (2) * 4)) {
        break;
      }
    }
    pbVar1 = unaff_ESI + 1;
    unaff_ESI = unaff_ESI + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      /* goto LAB_00448b71 */ throw new Error("goto LAB_00448b71 not supported");
    }
  } while (true);
  if (((heap.u32(unaff_ESI + (4) * 4) & 4) == 0) || ((heap.u32(unaff_ESI + (4) * 4) & 3 ^ 2) != bVar5)) {
    /* goto LAB_00448b71 */ throw new Error("goto LAB_00448b71 not supported");
  }
  bVar4 = bVar4 - 4;
  LAB_00448b0e: if (heap.u32(unaff_ESI + (4) * 4) >>> 4 != 0) {
    /* goto LAB_00448b71 */ throw new Error("goto LAB_00448b71 not supported");
  }
  heap.u32(unaff_ESI + (4) * 4) = heap.u32(unaff_ESI + (4) * 4) & 0xf7;
  uVar6 = unaff_EBX;
  if ((heap.u32(unaff_ESI + (((uVar6 ^ 2) >>> 3) + 6) * 4) >>> ((uVar6 ^ 2) & 7) & 1) == 0) {
    /* goto LAB_00448b71 */ throw new Error("goto LAB_00448b71 not supported");
  }
  heap.u32(unaff_ESI + (7) * 4) = in_DL;
  cVar3 = heap.u32(0x00630bd8);
  heap.u32(unaff_ESI + (5) * 4) = heap.u32(unaff_ESI + (5) * 4) & 0x8f;
  heap.u32(unaff_ESI + (5) * 4) = heap.u32(unaff_ESI + (5) * 4) | cVar3 << 4;
  if (heap.u32(0x00630bd0) == 0xffffffff) {
    heap.setU32(0x00630bd0, (unaff_ESI) >>> 0);
  }
  if ((((heap.u32(unaff_ESI + ((uVar6 >>> 3) + 6) * 4) >>> (uVar6 & 7) & 1) == 0) && (unaff_EBX = CONCAT31(heap, (int3)(unaff_EBX >>> 8), bVar5 + 1) & 0xffffff03, (heap.u32(unaff_ESI + ((unaff_EBX >>> 3) + 6) * 4) >>> (unaff_EBX & 7) & 1) == 0)) && (unaff_EBX = unaff_EBX ^ 2, (heap.u32(unaff_ESI + ((unaff_EBX >>> 3) + 6) * 4) >>> (unaff_EBX & 7) & 1) == 0)) {
    LAB_00448b71: uVar2 = heap.u32(0x00630bd4);
    pbVar1 = heap.u32(0x00630bc8);
    if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
      heap.u32(heap.u32(0x00630bc8) + (4) * 4) = heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8;
      heap.u32(pbVar1) = heap.u32(pbVar1) & 0x3f;
      heap.u32(pbVar1) = heap.u32(pbVar1) | uVar2 << 6;
      FUN_004364c2(heap);
    }
    return;
  }
  /* goto LAB_00448a65 */ throw new Error("goto LAB_00448a65 not supported");
}

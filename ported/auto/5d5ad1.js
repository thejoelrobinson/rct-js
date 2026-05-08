// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5ad1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/win32.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d3277 } from "./5d3277.js";
export function FUN_005d5ad1(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let in_EDX = 0;
  let uVar8 = 0;
  let unaff_ESI = 0;
  let bVar12 = 0;
  let local_24 = 0;
  puVar10 = ((in_EDX & 0xff) * 0x260);
  heap.setU32(0x00656b34, (heap.u32(puVar10 + (0x887420) * 4)) >>> 0);
  heap.setU32(0x00656b35, (heap.u32(puVar10 + (0x887421) * 4)) >>> 0);
  heap.setU32(0x00656b3a, (heap.u32(puVar10 + (0x887424) * 4)) >>> 0);
  heap.setU32(0x00656b3b, (heap.u32(puVar10 + (0x887425) * 4) & 3) >>> 0);
  uVar8 = 0;
  do {
    heap.u32((0x00656b3c + uVar8 * 2)) = heap.u32((puVar10 + (0x00887426 + uVar8)));
    uVar8 = uVar8 + 1;
  } while (uVar8 < 0xc);
  heap.setU32(0x00656b54, (heap.u32(puVar10 + (0x88743e) * 4)) >>> 0);
  heap.setU32(0x00656b55, (heap.u32(puVar10 + (0x88743f) * 4)) >>> 0);
  heap.setU32(0x00656b56, (heap.u32(puVar10 + (0x887440) * 4)) >>> 0);
  heap.setU32(0x00656b57, (heap.u32(puVar10 + (0x887496) * 4)) >>> 0);
  heap.setU32(0x00656b58, (heap.u32(puVar10 + (0x887498) * 4)) >>> 0);
  heap.setU32(0x00656b59, (heap.u32(puVar10 + (0x887499) * 4)) >>> 0);
  heap.setU32(0x00656b5a, (heap.u32(puVar10 + (0x88749e) * 4)) >>> 0);
  heap.setU32(0x00656b5b, (heap.u32(puVar10 + (0x88749f) * 4)) >>> 0);
  heap.setU32(0x00656b5c, (heap.u32(puVar10 + (0x8874a0) * 4)) >>> 0);
  heap.setU32(0x00656b5d, ((undefined1)((uint) * (puVar10 + 0x8874a8) >>> 0x10)) >>> 0);
  heap.setU32(0x00656b5e, ((undefined1)((uint) * (puVar10 + 0x8874ac) >>> 0x10)) >>> 0);
  uVar8 = 0;
  iVar3 = 0;
  do {
    iVar3 = iVar3 + heap.u32((puVar10 + (0x008874b4 + uVar8 * 4)));
    uVar8 = uVar8 + 1;
  } while (uVar8 < 4);
  heap.setU32(0x00656b5f, ((undefined2)(iVar3 >>> 0x10)) >>> 0);
  heap.setU32(0x00656b61, ((undefined1)(heap.u32((puVar10 + 0x8874cc)) >>> 5)) >>> 0);
  heap.setU32(0x00656b62, ((undefined1)(heap.u32((puVar10 + 0x8874ce)) >>> 5)) >>> 0);
  heap.setU32(0x00656b63, ((undefined1)(heap.u32((puVar10 + 0x8874d0)) >>> 5)) >>> 0);
  heap.setU32(0x00656b64, (heap.u32(puVar10 + (0x8874e4) * 4)) >>> 0);
  heap.setU32(0x00656b65, (heap.u32(puVar10 + (0x8874e5) * 4)) >>> 0);
  heap.setU32(0x00656b66, (heap.u32(puVar10 + (0x8874e7) * 4)) >>> 0);
  heap.setU32(0x00656b67, ((undefined1)(heap.u32((puVar10 + 0x887510)) / 10)) >>> 0);
  heap.setU32(0x00656b68, ((undefined1)(heap.u32((puVar10 + 0x887512)) / 10)) >>> 0);
  heap.setU32(0x00656b69, ((undefined1)(heap.u32((puVar10 + 0x887514)) / 10)) >>> 0);
  heap.setU32(0x00656b6a, (heap.u32((puVar10 + 0x887552))) >>> 0);
  heap.setU32(0x00656b36, (0) >>> 0);
  puVar9 = 0x00656b6c;
  do {
    heap.u32(puVar9) = 0;
    puVar9 = puVar9 + 1;
  } while (puVar9 < 0x00658aae);
  if (heap.u32(0x00656b34) == '\x14') {
    local_24 = in_EDX;
    uVar6 = local_24;
    uVar2 = 0;
    uVar4 = 0;
    do {
      do {
        puVar10 = heap.u32((0x00971ef4) + ((ushort)((ushort)(uVar4 << 7 | uVar4 >>> 9 | uVar2) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
        do {
          uVar6 = CONCAT11(heap, heap.u32(puVar10), uVar6) & 0x3cff;
          if (((uVar6 >>> 8) == '\b') && (uVar6 == heap.u32(puVar10 + (7) * 4))) {
            puVar10 = 0x00656b6c;
            heap.setU32(0x006522c9, (uVar2) >>> 0);
            heap.setU32(0x006522cb, (uVar4) >>> 0);
            /* goto LAB_005d5e6e */ throw new Error("goto LAB_005d5e6e not supported");
          }
          pbVar11 = puVar10 + 1;
          puVar10 = puVar10 + 8;
        } while ((heap.u32(pbVar11) & 0x80) == 0);
        uVar2 = uVar2 + 0x20;
      } while (uVar2 < 0x1000);
      uVar2 = 0;
      uVar4 = uVar4 + 0x20;
    } while (uVar4 < 0x1000);
  } else {
    FUN_005d3277(heap);
    bVar12 = unaff_ESI != -1;
    if (unaff_ESI != -1) {
      FUN_005cfc50(heap);
      if (!bVar12) {
        FUN_005cfc50(heap);
      }
      bVar12 = false;
      FUN_005cfe66(heap);
      if (!bVar12) {
        heap.setU32(0x00656b6c, (heap.u32(puVar10 + (4) * 4)) >>> 0);
        if (heap.u32(0x00656b6c) == '(') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80) >>> 0);
        }
        if (heap.u32(0x00656b6c) == ')') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '4') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x20000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '5') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x20000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '6') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x20000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '7') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x20000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '8') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x40000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '9') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x40000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == ':') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == ';') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '<') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == '=') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x80000) >>> 0);
        }
        if (heap.u32(0x00656b6c) == 'u') {
          heap.setU32(0x00656b36, (heap.u32(0x00656b36) | 0x8000000) >>> 0);
        }
        uVar2 = CONCAT11(heap, heap.u32(puVar10 + (5) * 4) >>> 4, heap.u32(puVar10)) & 0xff80;
        heap.setU32(0x00656b6d, (uVar2 | (byte)(uVar2 >>> 8)) >>> 0);
        bVar12 = false;
        FUN_005cfac7(heap);
        if (!bVar12) {
          FUN_005cfe66(heap);
        }
        heap.setU32(0x00656b6e, (0xff) >>> 0);
        return CONCAT44(heap, in_EDX, in_EAX);
      }
    }
  }
  /* goto LAB_005d5ff4 */ throw new Error("goto LAB_005d5ff4 not supported");
  while (true) {
    uVar2 = 0;
    uVar4 = uVar4 + 0x20;
    if (0xfff < uVar4) {
      break;
    }
    LAB_005d5e6e: do {
      puVar9 = heap.u32((0x00971ef4) + ((ushort)((ushort)(uVar4 << 7 | uVar4 >>> 9 | uVar2) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
      do {
        uVar6 = CONCAT11(heap, heap.u32(puVar9), uVar6) & 0x3cff;
        bVar7 = uVar6;
        if (((uVar6 >>> 8) == '\b') && (bVar7 == heap.u32(puVar9 + (7) * 4))) {
          uVar1 = heap.u32((puVar9 + 5));
          sVar5 = uVar4 - heap.u32(0x006522cb);
          heap.u32(puVar10) = ((uVar2 - heap.u32(0x006522c9)) >>> 5);
          heap.u32(puVar10 + (1) * 4) = (sVar5 >>> 5);
          heap.u32((puVar10 + 2)) = uVar1;
          puVar10 = puVar10 + 4;
          if (0x658aa1 < puVar10) {
            /* goto LAB_005d5ff4 */ throw new Error("goto LAB_005d5ff4 not supported");
          }
        }
        pbVar11 = puVar9 + 1;
        puVar9 = puVar9 + 8;
      } while ((heap.u32(pbVar11) & 0x80) == 0);
      uVar2 = uVar2 + 0x20;
    } while (uVar2 < 0x1000);
  }
  uVar2 = heap.u32((0x00887462) + (bVar7 * 0x130) * 4);
  if (uVar2 != 0xffff) {
    uVar4 = (uVar2 & 0xff) * 0x20;
    uVar6 = (uVar2 >>> 8) * 0x20;
    for (pbVar11 = heap.u32((0x00971ef4) + ((ushort)((ushort)((uVar2 >>> 8) << 0xc | uVar4) >>> 5 | (uVar6 >>> 9) << 0xb)) * 4); (((heap.u32(pbVar11) & 0x3c) != 0x10 || (heap.u32(pbVar11 + (4) * 4) != 0)) || (bVar7 != heap.u32(pbVar11 + (7) * 4))); pbVar11 = pbVar11 + 8) {
    
    }
    heap.u32(puVar10 + (2) * 4) = heap.u32(pbVar11) & 3;
    heap.u32(puVar10 + (3) * 4) = 8;
    sVar5 = uVar6 - heap.u32(0x006522cb);
    heap.u32(puVar10) = ((uVar4 - heap.u32(0x006522c9)) >>> 5);
    heap.u32(puVar10 + (1) * 4) = (sVar5 >>> 5);
    uVar2 = heap.u32((0x0088746a) + (bVar7 * 0x130) * 4);
    if (uVar2 != 0xffff) {
      uVar4 = (uVar2 & 0xff) * 0x20;
      uVar6 = (uVar2 >>> 8) * 0x20;
      for (pbVar11 = heap.u32((0x00971ef4) + ((ushort)((ushort)((uVar2 >>> 8) << 0xc | uVar4) >>> 5 | (uVar6 >>> 9) << 0xb)) * 4); (((heap.u32(pbVar11) & 0x3c) != 0x10 || (heap.u32(pbVar11 + (4) * 4) != 1)) || (bVar7 != heap.u32(pbVar11 + (7) * 4))); pbVar11 = pbVar11 + 8) {
      
      }
      heap.u32(puVar10 + (6) * 4) = heap.u32(pbVar11) & 3;
      heap.u32(puVar10 + (7) * 4) = 0x80;
      sVar5 = uVar6 - heap.u32(0x006522cb);
      heap.u32(puVar10 + (4) * 4) = ((uVar4 - heap.u32(0x006522c9)) >>> 5);
      heap.u32(puVar10 + (5) * 4) = (sVar5 >>> 5);
      heap.u32((puVar10 + 8)) = 0;
      return CONCAT44(heap, in_EDX, in_EAX);
    }
  }
  LAB_005d5ff4: return CONCAT44(heap, in_EDX, in_EAX);
}

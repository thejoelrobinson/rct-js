// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d89c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004518fc } from "./4518fc.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d89c0(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_005f7104 = __sp + 0;
  const __addr_DAT_0088755c = __sp + 4;
  const __addr_DAT_00887422 = __sp + 8;
  const __addr_DAT_0088751d = __sp + 12;
  const __addr_DAT_0088755d = __sp + 16;
  const __addr_DAT_00887560 = __sp + 20;
  const __addr_DAT_00743bdf = __sp + 24;
  const __addr_DAT_0088747e = __sp + 28;
  const __addr_DAT_00887561 = __sp + 32;
  const __addr_DAT_00887563 = __sp + 36;
  const __addr_DAT_00743b94 = __sp + 40;
  try {
  let puVar1 = 0;
  let pbVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let extraout_EDX_01 = 0;
  let unaff_EBX = 0;
  let iVar5 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  iVar5 = 0;
  do {
    heap.setU32((unaff_ESI + 0x4c), (0) >>> 0);
    heap.setU32((unaff_ESI + 0x4e), (0) >>> 0);
    heap.setU32((unaff_ESI + (0x4a) * 4), (0) >>> 0);
    bVar3 = heap.u32(unaff_ESI + (0x31) * 4);
    if ((heap.u32((__addr_DAT_005f7104 + bVar3 * 8)) & 4) == 0) {
      LAB_005d8a4f: if ((bVar3 == 0x22) && (heap.u32(unaff_ESI + (0xc5) * 4) != '\0')) {
        puVar1 = (unaff_ESI + 200);
        uVar4 = heap.u32(puVar1);
        heap.setU32(puVar1, (heap.u32(puVar1) + 0x3333) >>> 0);
        if (0xcccc < uVar4) {
          heap.setU32((unaff_ESI + (0xc5) * 4), (heap.u32(unaff_ESI + (0xc5) * 4) + '\x01') >>> 0);
          heap.setU32((unaff_ESI + (0xc5) * 4), (heap.u32(unaff_ESI + (0xc5) * 4) & 7) >>> 0);
          FUN_005e53ca(heap);
          in_EDX = extraout_EDX_00;
        }
        iVar5 = iVar5 + 1;
      } else {
        if ((((heap.u32((unaff_ESI + 0x48)) & 0x100) == 0) || (heap.u32(unaff_ESI + (0xb5) * 4) == -1)) || ((uVar6 = heap.u32(unaff_ESI + (0x30) * 4), iVar7 = uVar6 * 0x260, heap.u32((__addr_DAT_0088755c) + (iVar7) * 4) != '\x01' && (heap.u32((__addr_DAT_0088755c) + (iVar7) * 4) != '\x03')))) {
          pbVar2 = unaff_ESI + 0xb5;
          bVar3 = heap.u32(pbVar2);
          heap.setU32(pbVar2, (heap.u32(pbVar2) + 0x14) >>> 0);
          if (0xeb < bVar3) {
            heap.setU32((unaff_ESI + (0xb5) * 4), (0xff) >>> 0);
            /* goto LAB_005d8b29 */ throw new Error("goto LAB_005d8b29 not supported");
          }
        } else {
          if ((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 0x80) == 0) {
          heap.setU32(((__addr_DAT_00887422) + (uVar6 * 0x130) * 4), (heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) | 0x80) >>> 0);
          FUN_004518fc(heap, in_EDX, unaff_EDI, unaff_EBX);
          heap.setU32(((__addr_DAT_0088751d) + (iVar7) * 4), (heap.u32((__addr_DAT_0088751d) + (iVar7) * 4) | 0x1c) >>> 0);
          heap.setU32(((__addr_DAT_0088755d) + (iVar7) * 4), (1) >>> 0);
          heap.setU32(((__addr_DAT_00887560) + (iVar7) * 4), (heap.u32((__addr_DAT_00743bdf) + (heap.u32((__addr_DAT_0088747e + heap.u32((__addr_DAT_00887561) + (iVar7) * 4) * 2 + iVar7)) * 0x100) * 4)) >>> 0);
          heap.setU32(((__addr_DAT_00887563) + (iVar7) * 4), (heap.u32((__addr_DAT_0088755c) + (iVar7) * 4)) >>> 0);
        }
        }
        FUN_005e53ca(heap);
        iVar5 = iVar5 + 1;
        in_EDX = extraout_EDX_01;
      }
    } else {
      uVar4 = heap.u32((unaff_ESI + 0xb6));
      if (uVar4 < 0) {
        uVar4 = -uVar4;
      }
      bVar3 = uVar4;
      if ((uVar4 < 0x1f5) && ((heap.u32(unaff_ESI + (0xba) * 4) & 0x30) == 0)) {
        heap.setU32((unaff_ESI + 0xb6), (0) >>> 0);
        /* goto LAB_005d8a4f */ throw new Error("goto LAB_005d8a4f not supported");
      }
      iVar5 = iVar5 + 1;
      uVar4 = heap.u32((unaff_ESI + 0xb6));
      if (uVar4 < 0) {
        uVar4 = -uVar4;
      }
      if (uVar4 < 400) {
        heap.setU32((unaff_ESI + 0xb6), (400) >>> 0);
      }
      heap.setU32((unaff_ESI + (0xba) * 4), (heap.u32(unaff_ESI + (0xba) * 4) + (heap.u32((unaff_ESI + 0xb6)) >>> 8)) >>> 0);
      heap.setU32((unaff_ESI + 0xb6), (heap.u32((unaff_ESI + 0xb6)) - (heap.u32((unaff_ESI + 0xb6)) >>> 8)) >>> 0);
      FUN_005e53ca(heap);
      in_EDX = extraout_EDX;
    }
    LAB_005d8b29: if (heap.u32((unaff_ESI + 0x3e)) == -1) {
      if (iVar5 == 0) {
        return in_EAX;
      }
      return in_EAX;
    }
    unaff_ESI = __addr_DAT_00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100;
  } while (true);
} finally {
    heap.freeFrame(44);
  }
}

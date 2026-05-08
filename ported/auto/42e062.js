// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e062.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_0042547b } from "./42547b.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e062(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00652478 = __sp + 0;
  const __addr_DAT_0065247a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_00743b98 = __sp + 12;
  const __addr_DAT_00743bb8 = __sp + 16;
  const __addr_DAT_00743b94 = __sp + 20;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar3 = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let uVar4 = 0;
  let unaff_EBX = 0;
  let unaff_BP = 0;
  let iVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  uVar2 = in_EAX + (heap.u32((__addr_DAT_00652478) + ((unaff_EBX >>> 3) * 2) * 4) >>> 3);
  uVar3 = in_CX + (heap.u32((__addr_DAT_0065247a) + ((unaff_EBX >>> 3) * 2) * 4) >>> 3);
  bVar8 = false;
  FUN_0042547b(heap);
  if (!bVar8) {
    uVar1 = uVar3 >>> 9;
    pbVar6 = heap.u32((__addr_DAT_00971ef4) + ((ushort)((ushort)((uVar3 & 0xffe0) << 7 | uVar1 | uVar2 & 0xffe0) >>> 5 | uVar1 << 0xb)) * 4);
    do {
      if ((heap.u32(pbVar6) & 0x3c) == 4) {
        if (((heap.u32(pbVar6 + (2) * 4) * 4) <= extraout_EDX) && (extraout_EDX < (heap.u32(pbVar6 + (2) * 4) * 4 + 0x20))) {
          /* goto LAB_0042e0f3 */ throw new Error("goto LAB_0042e0f3 not supported");
        }
      }
      pbVar5 = pbVar6 + 1;
      pbVar6 = pbVar6 + 8;
    } while ((heap.u32(pbVar5) & 0x80) == 0);
  }
  /* goto LAB_0042e189 */ throw new Error("goto LAB_0042e189 not supported");
  while (pbVar6 = pbVar5, (heap.u32(pbVar5) & 0x3c) != 0) {
    LAB_0042e0f3: pbVar5 = pbVar6 + 8;
    if ((heap.u32(pbVar6 + (1) * 4) & 0x80) != 0) {
      uVar9 = heap.u32(0x0087c3a8) == 500;
      if (499 < heap.u32(0x0087c3a8)) {
        uVar4 = 0;
        for (uVar2 = heap.u32(0x0087c39c); uVar9 = uVar2 == 0xffff, !uVar9; uVar2 = heap.u32((__addr_DAT_00743b98) + (uVar2 * 0x80) * 4)) {
          iVar7 = uVar2 * 0x100;
          if (uVar4 <= heap.u32((__addr_DAT_00743bb8 + iVar7))) {
            uVar4 = heap.u32((__addr_DAT_00743bb8 + iVar7));
            pbVar5 = __addr_DAT_00743b94 + iVar7;
          }
        }
        FUN_005e5496(heap, extraout_EDX);
        FUN_00444d1f(heap);
      }
      FUN_00444bd4(heap);
      if (!uVar9) {
        FUN_00444c74(heap, extraout_ECX);
        heap.u32(pbVar5 + (0x1e) * 4) = unaff_EBX;
        heap.u32(pbVar5 + (0x14) * 4) = 6;
        heap.u32(pbVar5 + (9) * 4) = 6;
        heap.u32(pbVar5 + (0x15) * 4) = 3;
        heap.u32(pbVar5) = 3;
        heap.u32(pbVar5 + (1) * 4) = unaff_BP;
        FUN_00444927(heap);
        FUN_005e5496(heap);
        heap.u32((pbVar5 + 0x24)) = heap.u32(0x006e3b84);
      }
      break;
    }
  }
  LAB_0042e189: return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(24);
  }
}

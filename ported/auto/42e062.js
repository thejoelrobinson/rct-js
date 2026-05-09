// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e062.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042547b } from "./42547b.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e062(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar3 = 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let uVar4 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_BP = regs.ebp & 0xffff;
  let pbVar5 = 0;
  let iVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let pbVar6 = 0;
  LAB_0042e189: {
  uVar2 = ((((in_EAX) << 16 >> 16) + (((heap.u32((0x00652478) + ((unaff_EBX >>> 3) * 2) * 4)) << 16 >> 16) >>> 3)) & 0xffff);
  uVar3 = ((in_CX + (((heap.u32((0x0065247a) + ((unaff_EBX >>> 3) * 2) * 4)) << 16 >> 16) >>> 3)) & 0xffff);
  bVar8 = ((false) & 0xff);
  (regs.eax = FUN_0042547b(heap));
  if (!bVar8) {
    uVar1 = ((uVar3 >>> 9) & 0xffff);
    pbVar6 = ((heap.u32((0x00971ef4) + ((((((uVar3 & 0xffe0) << 7 | uVar1 | uVar2 & 0xffe0) & 0xffff) >>> 5 | uVar1 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((heap.u8(pbVar6) & 0x3c) == 4) {
        if (((((((heap.u8(pbVar6 + (2))) & 0xffff) * 4)) << 16 >> 16) <= ((extraout_EDX) << 16 >> 16)) && (((extraout_EDX) << 16 >> 16) < (((((heap.u8(pbVar6 + (2))) & 0xffff) * 4 + 0x20)) << 16 >> 16))) {
          /* goto LAB_0042e0f3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e062/LAB_0042e0f3"); return 0;
        }
      }
      pbVar5 = ((pbVar6 + 1) >>> 0);
      pbVar6 = ((pbVar6 + 8) >>> 0);
    } while ((heap.u8(pbVar5) & 0x80) == 0);
  }
  break LAB_0042e189;
  while (pbVar6 = ((pbVar5) >>> 0), (heap.u8(pbVar5) & 0x3c) != 0) {
    LAB_0042e0f3: pbVar5 = ((pbVar6 + 8) >>> 0);
    if ((heap.u8(pbVar6 + (1)) & 0x80) != 0) {
      uVar9 = ((heap.u32(0x0087c3a8) == 500) & 0xff);
      if (499 < heap.u32(0x0087c3a8)) {
        uVar4 = ((0) >>> 0);
        for (uVar2 = ((heap.u32(0x0087c39c)) & 0xffff); uVar9 = ((uVar2 == 0xffff) & 0xff), !uVar9; uVar2 = (((heap.u32((0x00743b98) + (((uVar2) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
          iVar7 = ((((uVar2) >>> 0) * 0x100) >>> 0);
          if (uVar4 <= heap.u32((0x00743bb8 + iVar7))) {
            uVar4 = ((heap.u32((0x00743bb8 + iVar7))) >>> 0);
            pbVar5 = ((0x00743b94 + iVar7) >>> 0);
          }
        }
        (regs.eax = FUN_005e5496(heap, extraout_EDX));
        (regs.eax = FUN_00444d1f(heap));
      }
      (regs.eax = FUN_00444bd4(heap));
      if (!uVar9) {
        (regs.eax = FUN_00444c74(heap, extraout_ECX));
        heap.setU8((pbVar5 + (0x1e)), (((unaff_EBX) & 0xff)) & 0xff);
        heap.setU8((pbVar5 + (0x14)), (6) & 0xff);
        heap.setU8((pbVar5 + (9)), (6) & 0xff);
        heap.setU8((pbVar5 + (0x15)), (3) & 0xff);
        heap.setU32(pbVar5, (3) & 0xffffffff);
        heap.setU8((pbVar5 + (1)), (unaff_BP) & 0xff);
        (regs.eax = FUN_00444927(heap));
        (regs.eax = FUN_005e5496(heap));
        heap.setU32((pbVar5 + 0x24), (heap.u32(0x006e3b84)) & 0xffffffff);
      }
      break;
    }
  }
  }
  return 1;
}

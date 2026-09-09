// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5ff8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../../runtime/win32.js";
import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042fc2c } from "./42fc2c.js";
export function FUN_005d5ff8(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let pHVar3 = 0;
  let uVar4 = 0;
  let pHVar5 = 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar6 = 0;
  let pcVar7 = 0;
  let pcVar8 = 0;
  let pcVar9 = 0;
  let bVar10 = 0;
  let local_24 = 0;
  code_r0x005d60e4: {
  LAB_005d60c6: {
  pHVar3 = (((regs.eax = FUN_0040844b(heap, 0x005f90c5, 0x0065d900))) >>> 0);
  pcVar6 = ((0x00658aae) >>> 0);
  if (pHVar3 != 0xffffffff) {
    LAB_005d6021: heap.setU32(0x005f9427, (pHVar3) >>> 0);
    pcVar7 = ((0x005f90c5) >>> 0);
    pcVar8 = ((0x0099aa88) >>> 0);
    do {
      pcVar9 = ((pcVar8) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      heap.setU32(pcVar9, (cVar1) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar9 + 1) >>> 0);
    } while (cVar1 != 42);
    pcVar8 = ((0x0065d92c) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      heap.setU32(pcVar9, (cVar1) & 0xffffffff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
      pcVar9 = ((pcVar9 + 1) >>> 0);
      bVar10 = ((false) & 0xff);
    } while (cVar1 != 0);
    (regs.eax = FUN_0042fc2c(heap));
    if (!bVar10) {
      local_24 = ((((in_EDX) << 24 >> 24)) & 0xff);
      uVar4 = ((heap.u8(0x00656b36)) >>> 0);
      if (local_24 == heap.u8(0x00656b34)) {
        do {
          uVar2 = ((0) >>> 0);
          if (uVar4 != 0) {
            for (; (uVar4 >>> uVar2 & 1) == 0; uVar2 = (((uVar2 + 1) >>> 0)) >>> 0) {
            
            }
          }
          if (uVar4 == 0) {
            if ((heap.u32(((0x0087c3fc) & 0xff) + (((((heap.u8(0x00656b35) & 0x1f)) | 0) >>> 3) + ((heap.u8(0x00656b35) >>> 5) >>> 0) * 4) * 4) >>> (heap.u8(0x00656b35) & 7) & 1) != 0) {
              pcVar7 = ((0x0065d92c) >>> 0);
              uVar4 = ((0) >>> 0);
              pcVar8 = ((pcVar6) >>> 0);
              /* goto LAB_005d6095 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d5ff8/LAB_005d6095"); return 0;
            }
            break;
          }
          uVar4 = ((uVar4 & ~(1 << (uVar2 & 0x1f))) >>> 0);
        } while ((heap.u8((((0x0087c41c) | 0) + (((uVar2) | 0) >>> 3) + (in_EDX & 0xff) * 4)) >>> (uVar2 & 7) & 1) != 0);
      }
    }
    break LAB_005d60c6;
  }
  LAB_005d60f4: heap.setU32(pcVar6, (0) & 0xffffffff);
  return 1;
  while (cVar1 != 0) {
    LAB_005d6095: cVar1 = ((heap.i8(pcVar7)) & 0xff);
    heap.setU32(pcVar8, (cVar1) & 0xffffffff);
    uVar4 = ((uVar4 + 1) >>> 0);
    pcVar7 = ((pcVar7 + 1) >>> 0);
    pcVar8 = ((pcVar8 + 1) >>> 0);
    if (0x27 < uVar4) {
      break;
    }
  }
  if (0x28 < uVar4) {
    pcVar7 = ((0x0065da30) >>> 0);
    pcVar8 = ((pcVar6) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      heap.setU32(pcVar8, (cVar1) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    } while (cVar1 != 0);
  }
  pcVar6 = ((pcVar6 + 0x28) >>> 0);
  if (0x65d8cd < pcVar6) {
    /* goto LAB_005d60f4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d5ff8/LAB_005d60f4"); return 0;
  }
  }
  pHVar5 = ((GetNextWindow(heap, heap.u32(0x005f9427), 0x65d900)) >>> 0);
  pHVar3 = ((heap.u32(0x005f9427)) >>> 0);
  if (pHVar5 != 0x1) {
    break code_r0x005d60e4;
  }
  /* goto LAB_005d6021 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d5ff8/LAB_005d6021"); return 0;
  }
  (regs.eax = FUN_00408490(heap, heap.u32(0x005f9427)));
  /* goto LAB_005d60f4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d5ff8/LAB_005d60f4"); return 0;
}

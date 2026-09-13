// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d398.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00427410 } from "./427410.js";
import { FUN_00440072 } from "./440072.js";
import { FUN_004406bd } from "./4406bd.js";
import { FUN_00443e98 } from "./443e98.js";
import { FUN_0044a4e8 } from "./44a4e8.js";
import { FUN_0044eff2 } from "./44eff2.js";
import { FUN_0044f03b } from "./44f03b.js";
import { FUN_00455bce } from "./455bce.js";
import { FUN_005de5a7 } from "./5de5a7.js";
import { FUN_005de5ff } from "./5de5ff.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e680e } from "./5e680e.js";
export function FUN_0042d398(heap) {
  let in_ECX = regs.ecx >>> 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_ESI = regs.esi >>> 0;
  let uVar1 = 0;
  let bVar2 = 0;
  if (unaff_BL == 1) {
    return (regs.eax = FUN_0044a4e8(heap));
  }
  if (unaff_BL == 2) {
    return (regs.eax = FUN_00440072(heap));
  }
  if (unaff_BL == 3) {
    return (regs.eax = FUN_00455bce(heap));
  }
  if (unaff_BL == 4) {
    (regs.eax = FUN_00443e98(heap));
    return (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  if (unaff_BL == 6) {
    if (0x2ffff < in_ECX) {
      (regs.eax = FUN_0044eff2(heap));
      return (regs.eax = FUN_0044f03b(heap, in_ECX));
    }
    if (in_ECX < 0x20000) {
      if (in_ECX < 0x10000) {
        bVar2 = ((true) & 0xff);
        (regs.eax = FUN_005e5fcb(heap));
        if (bVar2) {
          uVar1 = ((0) & 0xff);
          bVar2 = ((true) & 0xff);
          (regs.eax = FUN_005e3b2b(heap));
          if (!bVar2) {
            (regs.eax = FUN_005e43de(heap));
            (regs.eax = FUN_005e680e(heap));
            if (!uVar1) {
              heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
              (regs.eax = FUN_005de5a7(heap));
            }
          }
        }
        return (regs.eax = FUN_005de5ff(heap, in_ECX));
      }
      (regs.eax = FUN_0044eff2(heap));
      return (regs.eax = FUN_0044f03b(heap, in_ECX));
    }
    (regs.eax = FUN_0044eff2(heap));
    return (regs.eax = FUN_0044f03b(heap, in_ECX));
  }
  if (unaff_BL == 7) {
    return (regs.eax = FUN_004406bd(heap));
  }
  if (unaff_BL != 8) {
    return;
  }
  return (regs.eax = FUN_00427410(heap));
}

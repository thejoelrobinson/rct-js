// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bc041.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009bc041(heap) {
  let sVar1 = 0;
  let psVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  uVar3 = ((unaff_ESI) >>> 0);
  while (true) {
    while (true) {
      while (true) {
        while (true) {
          do {
            uVar4 = ((uVar3) >>> 0);
            uVar3 = ((uVar4 + 0x178) >>> 0);
            if (heap.u32(0x009a1164) <= uVar3) {
              psVar2 = ((heap.u32((unaff_ESI + 8))) >>> 0);
              if (psVar2 != 0x0) {
                sVar1 = ((heap.i16(psVar2 + (2) * 2)) & 0xffff);
                if (in_AX < sVar1) {
                  in_AX = ((sVar1) & 0xffff);
                }
                if ((((sVar1 + heap.i16(psVar2))) << 16 >> 16) < in_DX) {
                  in_DX = ((sVar1 + heap.i16(psVar2)) & 0xffff);
                }
                sVar1 = ((heap.i16(psVar2 + (3) * 2)) & 0xffff);
                if (unaff_BX < sVar1) {
                  unaff_BX = ((sVar1) & 0xffff);
                }
                if ((((sVar1 + heap.i16(psVar2 + (1) * 2))) << 16 >> 16) < unaff_BP) {
                  unaff_BP = ((sVar1 + heap.i16(psVar2 + (1) * 2)) & 0xffff);
                }
                if ((in_AX < in_DX) && (unaff_BX < unaff_BP)) {
                  (regs.eax = callIndirect(heap, heap.u32(0x009b2280)));
                }
              }
              return;
            }
          } while ((((in_DX <= heap.i16((uVar4 + 0x198))) || (unaff_BP <= heap.i16((uVar4 + 0x19a)))) || ((((heap.i16((uVar4 + 0x198)) + heap.i16((uVar4 + 0x19c)))) << 16 >> 16) <= in_AX)) || ((((heap.i16((uVar4 + 0x19a)) + heap.i16((uVar4 + 0x19e)))) << 16 >> 16) <= unaff_BX));
          if (heap.i16((uVar4 + 0x198)) <= in_AX) {
            break;
          }
          (regs.eax = FUN_009bc041(heap));
          in_AX = ((heap.i16((uVar4 + 0x198))) & 0xffff);
          uVar3 = ((unaff_ESI) >>> 0);
        }
        if (in_DX <= (((heap.i16((uVar4 + 0x198)) + heap.i16((uVar4 + 0x19c)))) << 16 >> 16)) {
          break;
        }
        (regs.eax = FUN_009bc041(heap));
        in_AX = ((heap.i16((uVar4 + 0x198)) + heap.i16((uVar4 + 0x19c))) & 0xffff);
        uVar3 = ((unaff_ESI) >>> 0);
      }
      if (heap.i16((uVar4 + 0x19a)) <= unaff_BX) {
        break;
      }
      (regs.eax = FUN_009bc041(heap));
      unaff_BX = ((heap.i16((uVar4 + 0x19a))) & 0xffff);
      uVar3 = ((unaff_ESI) >>> 0);
    }
    if (unaff_BP <= (((heap.i16((uVar4 + 0x19a)) + heap.i16((uVar4 + 0x19e)))) << 16 >> 16)) {
      break;
    }
    (regs.eax = FUN_009bc041(heap));
    unaff_BX = ((heap.i16((uVar4 + 0x19a)) + heap.i16((uVar4 + 0x19e))) & 0xffff);
    uVar3 = ((unaff_ESI) >>> 0);
  }
  return;
}

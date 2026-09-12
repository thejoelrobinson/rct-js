// @manual — do not regenerate.
// Source: decompiled/c/42ee93.c
// Fix: `*pbVar5 = nibble-swap(*pbVar5)` is a byte store; translator
// emitted setU32 — replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408210 } from "./408210.js";
import { FUN_00408254 } from "./408254.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004083e1 } from "./4083e1.js";
export function FUN_0042ee93(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  iVar1 = (((regs.eax = FUN_004083b5(heap, 0x0099a888))) >>> 0);
  if ((iVar1 | 0) == -1) {
    iVar1 = (((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0);
    if ((iVar1 | 0) != -1) {
      heap.setU32(0x005f8d3a, (iVar1) >>> 0);
      iVar1 = (((regs.eax = FUN_004083e1(heap, 0x0099a888))) >>> 0);
      if ((iVar1 | 0) != -1) {
        heap.setU32(0x005f8d3e, (iVar1) >>> 0);
        uVar2 = (((regs.eax = FUN_00408254(heap, heap.u32(0x005f8d3a), 0))) >>> 0);
        (regs.eax = FUN_00408210(heap, heap.u32(0x005f8d3a), 0));
        do {
          uVar3 = ((uVar2) >>> 0);
          if (0x10000 < uVar2) {
            uVar3 = ((0x10000) >>> 0);
          }
          (regs.eax = FUN_00408276(heap, heap.u32(0x005f8d3a), 0x00981efc, uVar3));
          pbVar5 = ((0x00981efc) >>> 0);
          uVar4 = ((uVar3) >>> 0);
          do {
            heap.setU8(pbVar5, (heap.u8(pbVar5) >>> 4 | heap.u8(pbVar5) << 4) & 0xff);
            pbVar5 = ((pbVar5 + 1) >>> 0);
            uVar4 = ((uVar4 - 1) >>> 0);
          } while (uVar4 != 0);
          (regs.eax = FUN_00408342(heap, heap.u32(0x005f8d3e), 0x00981efc, uVar3));
          uVar2 = ((uVar2 - uVar3) >>> 0);
        } while (uVar2 != 0);
        (regs.eax = FUN_00408387(heap, heap.u32(0x005f8d3a)));
        iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f8d3e)))) >>> 0);
        return iVar1;
      }
      iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f8d3a)))) >>> 0);
    }
  } else {
    iVar1 = (((regs.eax = FUN_00408387(heap, iVar1))) >>> 0);
  }
  return iVar1;
}

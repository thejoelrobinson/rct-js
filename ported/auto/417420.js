// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417420.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004175a0 } from "./4175a0.js";
export function FUN_00417420(heap, param_1) {
  let iVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let pcVar4 = 0;
  let iVar5 = 0;
  let puVar6 = 0;
  LAB_00417516: {
  iVar2 = ((param_1) >>> 0);
  switch (param_1) {
    case 2:
      puVar6 = ((0x005f0288) >>> 0);
      pcVar4 = ((heap.u32(0x005f0288)) >>> 0);
      break;
    default:
      return 0xffffffff;
    case 4:
    case 8:
    case 0xb:
      iVar3 = (((regs.eax = FUN_004175a0(heap, param_1))) >>> 0);
      puVar6 = (((iVar3 + 8)) >>> 0);
      pcVar4 = ((heap.u32(puVar6)) >>> 0);
      break;
    case 0xf:
      puVar6 = ((0x005f0294) >>> 0);
      pcVar4 = ((heap.u32(0x005f0294)) >>> 0);
      break;
    case 0x15:
      puVar6 = ((0x005f028c) >>> 0);
      pcVar4 = ((heap.u32(0x005f028c)) >>> 0);
      break;
    case 0x16:
      puVar6 = ((0x005f0290) >>> 0);
      pcVar4 = ((heap.u32(0x005f0290)) >>> 0);
  }
  iVar1 = ((heap.u32(0x005eff0c)) >>> 0);
  iVar3 = ((heap.u32(0x005ec364)) >>> 0);
  if (pcVar4 == 0x1) {
    return 0;
  }
  if (pcVar4 == 0x0) {
    __exit(3);
  }
  if (((param_1 == 8) || (param_1 == 0xb)) || (iVar5 = ((param_1) >>> 0), param_1 == 4)) {
    heap.setU32(0x005eff0c, (0) >>> 0);
    iVar5 = ((iVar1) >>> 0);
    if (param_1 == 8) {
      heap.setU32(0x005ec364, (0x8c) >>> 0);
      param_1 = ((iVar3) >>> 0);
      /* goto LAB_004174df — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00417420/LAB_004174df"); return 0;
    }
  } else {
    LAB_004174df: if (iVar2 == 8) {
      if (heap.u32(0x005ec358) < heap.u32(0x005ec35c) + heap.u32(0x005ec358)) {
        iVar3 = (((heap.u32(0x005ec35c) + heap.u32(0x005ec358)) - heap.u32(0x005ec358)) >>> 0);
        puVar6 = (((heap.u32(0x005ec358) * 0xc + 0x5ec2e8)) >>> 0);
        do {
          heap.setU32(puVar6, (0) & 0xffffffff);
          puVar6 = ((puVar6 + ((3) * 4)) >>> 0);
          iVar3 = ((iVar3 + -1) >>> 0);
        } while (iVar3 != 0);
      }
      break LAB_00417516;
    }
  }
  heap.setU32(puVar6, (0) & 0xffffffff);
  }
  if (iVar2 == 8) {
    (regs.eax = callIndirect(heap, pcVar4, 8, heap.u32(0x005ec364)));
  } else {
    (regs.eax = callIndirect(heap, pcVar4, iVar2));
    if ((iVar2 != 0xb) && (iVar2 != 4)) {
      return 0;
    }
  }
  if (iVar2 == 8) {
    heap.setU32(0x005ec364, (param_1) >>> 0);
  }
  heap.setU32(0x005eff0c, (iVar5) >>> 0);
  return 0;
}

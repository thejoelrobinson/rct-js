// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453f76.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407b91 } from "./407b91.js";
import { FUN_00407c42 } from "./407c42.js";
import { FUN_00407e33 } from "./407e33.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00453f76(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  LAB_0045405e: {
  if ((heap.u32(0x006323f4) | 0) == -1) {
    return;
  }
  if (heap.u8(0x006326bc) != 0) {
    return;
  }
  if ((heap.u8(0x006326bd) & 1) == 0) {
    return;
  }
  if ((heap.u32(0x0099a500) & 1) != 0) {
    return;
  }
  if ((heap.u8(0x008d7eb2) == 1) || (heap.u8(0x008d7eb2) == 2)) {
    if (heap.u32(0x00632924) == 1) {
      iVar4 = (((regs.eax = FUN_004077b3(heap, 0x1c, 0x00632928, 1, 1))) >>> 0);
      if (iVar4 != 0) {
        (regs.eax = FUN_00407c42(heap, 0x00632928, 1, 0xfffff060, 0, 0));
        heap.setU32(0x00632924, (-4000) >>> 0);
      }
      break LAB_0045405e;
    }
    iVar4 = ((heap.u32(0x00632924) + 0x50) >>> 0);
    if (-0x578 < iVar4) {
      iVar4 = ((-0x578) >>> 0);
    }
  } else {
    if (heap.u32(0x00632924) == 1) {
      break LAB_0045405e;
    }
    iVar4 = ((heap.u32(0x00632924) + -0x50) >>> 0);
    if ((iVar4 | 0) < -3999) {
      (regs.eax = FUN_00407a41(heap, 0x00632928));
      heap.setU32(0x00632924, (1) >>> 0);
      break LAB_0045405e;
    }
  }
  heap.setU32(0x00632924, (iVar4) >>> 0);
  (regs.eax = FUN_00407e33(heap, 0x00632928, iVar4));
  }
  if (heap.u32(0x0063293c) == 1) {
    heap.setU32(0x0063293c, (0) >>> 0);
    iVar4 = (((regs.eax = FUN_004077b3(heap, heap.u32(0x0063296c), 0x00632958, 1, 1))) >>> 0);
    if (iVar4 != 0) {
      (regs.eax = FUN_00407c42(heap, 0x00632958, 0, heap.u32(0x00632970), 10000, 0));
      heap.setU32(0x00632954, (0) >>> 0);
    }
  } else {
    if (heap.u32(0x00632974) == 0) {
    if ((heap.u8(0x008d7eb2) == 2) && (uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0), ((uVar2) & 0xffff) < 0x1b5)) {
      heap.setU32(0x00632974, ((((((uVar2) >>> 0) >>> 0x10) & 0xffff) & 0x3f) + 0x2b) >>> 0);
      heap.setU32(0x00632976, (((((uVar2) >>> 0) >>> 0x18) & 0xff) & 0x1f) >>> 0);
      heap.setU8(0x009b2300, (1) & 0xff);
    }
  } else {
    if (((heap.u32(0x00632976) != 0) && (heap.setU32(0x00632976, (heap.u32(0x00632976) - 1) >>> 0), heap.u8(0x009b2300) == 0)) && (uVar1 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), uVar1 < 0x2001)) {
      heap.setU8(0x009b2300, (1) & 0xff);
    }
    heap.setU32(0x00632974, (heap.u32(0x00632974) + -1) >>> 0);
    if (heap.u32(0x00632974) == 0) {
      uVar3 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
      if ((uVar3 & 0x10000) == 0) {
        if ((uVar3 & 0x20000) == 0) {
          if ((heap.u32(0x00632954) == 8) && (iVar4 = (((regs.eax = FUN_004077b3(heap, 0x1e, 0x00632958, 1, 1, uVar3))) >>> 0), iVar4 != 0)) {
            (regs.eax = FUN_00407c42(heap, 0x00632958, 0, 0, ((uVar3 >>> 0x12 & 0xff) - 0x80) * 0x10, 0));
            heap.setU32(0x00632954, (0) >>> 0);
          }
        } else {
          if ((heap.u32(0x0063293c) == 8) && (iVar4 = (((regs.eax = FUN_004077b3(heap, 0x1d, 0x00632940, 1, 1, uVar3))) >>> 0), iVar4 != 0)) {
          (regs.eax = FUN_00407c42(heap, 0x00632940, 0, 0, ((uVar3 >>> 0x12 & 0xff) - 0x80) * 0x10, 0));
          heap.setU32(0x0063293c, (0) >>> 0);
        }
        }
      } else {
        if ((heap.u32(0x0063293c) == 8) && (heap.u32(0x00632954) == 8)) {
        heap.setU32(0x0063296c, (0x1d) >>> 0);
        if ((uVar3 & 0x20000) == 0) {
          heap.setU32(0x0063296c, (0x1e) >>> 0);
        }
        heap.setU32(0x00632970, ((uVar3 >>> 0x12 & 0xff) * -8) >>> 0);
        iVar4 = (((regs.eax = FUN_004077b3(heap, heap.u32(0x0063296c), 0x00632940, 1, 1))) >>> 0);
        if (iVar4 != 0) {
          (regs.eax = FUN_00407c42(heap, 0x00632940, 0, heap.u32(0x00632970), 0xffffd8f0, 0));
          heap.setU32(0x0063293c, (1) >>> 0);
        }
      }
      }
    }
  }
  }
  if ((heap.u32(0x0063293c) != 8) && (iVar4 = (((regs.eax = FUN_00407b91(heap, 0x00632940))) >>> 0), iVar4 == 0)) {
    (regs.eax = FUN_00407a41(heap, 0x00632940));
    heap.setU32(0x0063293c, (8) >>> 0);
  }
  if ((heap.u32(0x00632954) != 8) && (iVar4 = (((regs.eax = FUN_00407b91(heap, 0x00632958))) >>> 0), iVar4 == 0)) {
    (regs.eax = FUN_00407a41(heap, 0x00632958));
    heap.setU32(0x00632954, (8) >>> 0);
  }
  return;
}

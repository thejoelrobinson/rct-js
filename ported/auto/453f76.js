// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453f76.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407b91 } from "./407b91.js";
import { FUN_00407c42 } from "./407c42.js";
import { FUN_00407e33 } from "./407e33.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00453f76(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00632928 = __sp + 0;
  const __addr_DAT_00632958 = __sp + 4;
  const __addr_DAT_00632940 = __sp + 8;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  if (heap.u32(0x006323f4) == -1) {
    return;
  }
  if (heap.u32(0x006326bc) != '\0') {
    return;
  }
  if ((heap.u32(0x006326bd) & 1) == 0) {
    return;
  }
  if ((heap.u32(0x0099a500) & 1) != 0) {
    return;
  }
  if ((heap.u32(0x008d7eb2) == '\x01') || (heap.u32(0x008d7eb2) == '\x02')) {
    if (heap.u32(0x00632924) == 1) {
      iVar4 = FUN_004077b3(heap, 0x1c, __addr_DAT_00632928, 1, 1);
      if (iVar4 != 0) {
        FUN_00407c42(heap, __addr_DAT_00632928, 1, 0xfffff060, 0, 0);
        heap.setU32(0x00632924, (-4000) >>> 0);
      }
      /* goto LAB_0045405e */ throw new Error("goto LAB_0045405e not supported");
    }
    iVar4 = heap.u32(0x00632924) + 0x50;
    if (-0x578 < iVar4) {
      iVar4 = -0x578;
    }
  } else {
    if (heap.u32(0x00632924) == 1) {
      /* goto LAB_0045405e */ throw new Error("goto LAB_0045405e not supported");
    }
    iVar4 = heap.u32(0x00632924) + -0x50;
    if (iVar4 < -3999) {
      FUN_00407a41(heap, __addr_DAT_00632928);
      heap.setU32(0x00632924, (1) >>> 0);
      /* goto LAB_0045405e */ throw new Error("goto LAB_0045405e not supported");
    }
  }
  heap.setU32(0x00632924, (iVar4) >>> 0);
  FUN_00407e33(heap, __addr_DAT_00632928, iVar4);
  LAB_0045405e: if (heap.u32(0x0063293c) == 1) {
    heap.setU32(0x0063293c, (0) >>> 0);
    iVar4 = FUN_004077b3(heap, heap.u32(0x0063296c), __addr_DAT_00632958, 1, 1);
    if (iVar4 != 0) {
      FUN_00407c42(heap, __addr_DAT_00632958, 0, heap.u32(0x00632970), 10000, 0);
      heap.setU32(0x00632954, (0) >>> 0);
    }
  } else {
    if (heap.u32(0x00632974) == 0) {
    if ((heap.u32(0x008d7eb2) == '\x02') && (uVar2 = FUN_005df40c(heap), uVar2 < 0x1b5)) {
      heap.setU32(0x00632974, (((uVar2 >>> 0x10) & 0x3f) + 0x2b) >>> 0);
      heap.setU32(0x00632976, ((byte)(uVar2 >>> 0x18) & 0x1f) >>> 0);
      heap.setU32(0x009b2300, ('\x01') >>> 0);
    }
  } else {
    if (((heap.u32(0x00632976) != 0) && (heap.setU32(0x00632976, (heap.u32(0x00632976) - 1) >>> 0), heap.u32(0x009b2300) == '\0')) && (uVar1 = FUN_005df40c(heap), uVar1 < 0x2001)) {
      heap.setU32(0x009b2300, ('\x01') >>> 0);
    }
    heap.setU32(0x00632974, (heap.u32(0x00632974) + -1) >>> 0);
    if (heap.u32(0x00632974) == 0) {
      uVar3 = FUN_005df40c(heap);
      if ((uVar3 & 0x10000) == 0) {
        if ((uVar3 & 0x20000) == 0) {
          if ((heap.u32(0x00632954) == 8) && (iVar4 = FUN_004077b3(heap, 0x1e, __addr_DAT_00632958, 1, 1, uVar3), iVar4 != 0)) {
            FUN_00407c42(heap, __addr_DAT_00632958, 0, 0, ((uVar3 >>> 0x12 & 0xff) - 0x80) * 0x10, 0);
            heap.setU32(0x00632954, (0) >>> 0);
          }
        } else {
          if ((heap.u32(0x0063293c) == 8) && (iVar4 = FUN_004077b3(heap, 0x1d, __addr_DAT_00632940, 1, 1, uVar3), iVar4 != 0)) {
          FUN_00407c42(heap, __addr_DAT_00632940, 0, 0, ((uVar3 >>> 0x12 & 0xff) - 0x80) * 0x10, 0);
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
        iVar4 = FUN_004077b3(heap, heap.u32(0x0063296c), __addr_DAT_00632940, 1, 1);
        if (iVar4 != 0) {
          FUN_00407c42(heap, __addr_DAT_00632940, 0, heap.u32(0x00632970), 0xffffd8f0, 0);
          heap.setU32(0x0063293c, (1) >>> 0);
        }
      }
      }
    }
  }
  }
  if ((heap.u32(0x0063293c) != 8) && (iVar4 = FUN_00407b91(heap, __addr_DAT_00632940), iVar4 == 0)) {
    FUN_00407a41(heap, __addr_DAT_00632940);
    heap.setU32(0x0063293c, (8) >>> 0);
  }
  if ((heap.u32(0x00632954) != 8) && (iVar4 = FUN_00407b91(heap, __addr_DAT_00632958), iVar4 == 0)) {
    FUN_00407a41(heap, __addr_DAT_00632958);
    heap.setU32(0x00632954, (8) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}

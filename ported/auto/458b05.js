// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458b05.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11 } from "../runtime/ghidra-builtins.js";
export function FUN_00458b05(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0099a516 = __sp + 0;
  const __addr_DAT_008dc0b8 = __sp + 4;
  const __addr_DAT_0099a508 = __sp + 8;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let unaff_DI = 0;
  uVar5 = heap.u32(0x00971e84);
  uVar4 = heap.u32((byte)(__addr_DAT_0099a516) + (uVar5) * 4) * -3 + unaff_DI;
  uVar3 = 0;
  puVar7 = unaff_ESI;
  while (true) {
    puVar6 = puVar7;
    bVar1 = (byte) * puVar6;
    puVar7 = (puVar6 + 1);
    if (bVar1 == 0) {
      return 0;
    }
    uVar2 = (byte)(bVar1 - 0x20);
    if (0x1f < bVar1) {
      break;
    }
    if (bVar1 < 5) {
      if (bVar1 == 1) {
        uVar3 = heap.u32(puVar7);
        puVar7 = (puVar6 + 2);
      } else {
        puVar7 = (puVar6 + 2);
      }
    } else {
      if (bVar1 == 7) {
      uVar5 = 0x1c0;
      LAB_00458bba: uVar4 = heap.u32((byte)(__addr_DAT_0099a516) + (uVar5) * 4) * -3 + unaff_DI;
    } else {
      if (bVar1 == 8) {
        uVar5 = 0x2a0;
        /* goto LAB_00458bba */ throw new Error("goto LAB_00458bba not supported");
      }
      if (bVar1 == 9) {
        uVar5 = 0xe0;
        /* goto LAB_00458bba */ throw new Error("goto LAB_00458bba not supported");
      }
      if (bVar1 == 10) {
        uVar5 = 0;
        /* goto LAB_00458bba */ throw new Error("goto LAB_00458bba not supported");
      }
      if (0x10 < bVar1) {
        if (bVar1 == 0x17) {
          uVar2 = heap.u32(puVar7);
          puVar7 = (puVar6 + 5);
          uVar3 = uVar3 + heap.u32((__addr_DAT_008dc0b8 + (uVar2 & 0x1ffff) * 0x10));
          uVar2 = 0;
          LAB_00458b39: if (unaff_DI < uVar3) {
            heap.u32(unaff_ESI) = 0x2e2e2e;
            return uVar2;
          }
          if (uVar3 <= uVar4) {
            unaff_ESI = puVar7;
          }
        } else {
          puVar7 = (puVar6 + 3);
          if (0x16 < bVar1) {
            puVar7 = (puVar6 + 5);
          }
        }
      }
    }
    }
  }
  uVar3 = CONCAT11((uVar3 >>> 8) + CARRY1(uVar3, heap.u32((__addr_DAT_0099a508) + (uVar2 + uVar5) * 4)), uVar3 + heap.u32((__addr_DAT_0099a508) + (uVar2 + uVar5) * 4));
  /* goto LAB_00458b39 */ throw new Error("goto LAB_00458b39 not supported");
} finally {
    heap.freeFrame(12);
  }
}

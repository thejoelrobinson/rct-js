// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413170.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00413170(heap, param_1, param_2) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  puVar4 = ((param_1) >>> 0);
  while ((((param_2) >>> 0) & 3) != 0) {
    bVar1 = ((heap.u8(param_2)) & 0xff);
    uVar3 = ((((bVar1) >>> 0)) >>> 0);
    param_2 = (((((param_2) >>> 0) + 1)) >>> 0);
    if (bVar1 == 0) {
      /* goto LAB_00413258 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00413170/LAB_00413258"); return 0;
    }
    heap.setU8(puVar4, (bVar1) & 0xff);
    puVar4 = (((((puVar4) >>> 0) + 1)) >>> 0);
  }
  do {
    uVar2 = ((heap.u32(param_2)) >>> 0);
    uVar3 = ((heap.u32(param_2)) >>> 0);
    param_2 = ((param_2 + 1) >>> 0);
    if (((uVar2 ^ 0xffffffff ^ uVar2 + 0x7efefeff) & 0x81010100) != 0) {
      if (((uVar3) << 24 >> 24) == 0) {
        LAB_00413258: heap.setU8(puVar4, (((uVar3) & 0xff)) & 0xff);
        return param_1;
      }
      if ((((uVar3 >>> 8)) << 24 >> 24) == 0) {
        heap.setI16(puVar4, (((uVar3) << 16 >> 16)) & 0xffff);
        return param_1;
      }
      if ((uVar3 & 0xff0000) == 0) {
        heap.setI16(puVar4, (((uVar3) << 16 >> 16)) & 0xffff);
        heap.setU8((((puVar4) >>> 0) + 2), (0) & 0xff);
        return param_1;
      }
      if ((uVar3 & 0xff000000) == 0) {
        heap.setU32(puVar4, (uVar3) & 0xffffffff);
        return param_1;
      }
    }
    heap.setU32(puVar4, (uVar3) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
  } while (true);
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413180.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00413180(heap, param_1, param_2) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar4 = 0;
  puVar3 = param_1;
  do {
    if ((puVar3 & 3) == 0) {
      /* goto LAB_0041319c */ throw new Error("goto LAB_0041319c not supported");
    }
    uVar4 = heap.u32(puVar3);
    puVar3 = (puVar3 + 1);
  } while (uVar4 != 0);
  /* goto LAB_004131cf */ throw new Error("goto LAB_004131cf not supported");
  while (true) {
    if ((uVar4 & 0xff0000) == 0) {
      puVar5 = (puVar5 + 2);
      /* goto joined_r0x004131eb */ throw new Error("goto joined_r0x004131eb not supported");
    }
    if ((uVar4 & 0xff000000) == 0) {
      break;
    }
    LAB_0041319c: do {
      puVar5 = puVar3;
      puVar3 = puVar5 + 1;
    } while (((heap.u32(puVar5) ^ 0xffffffff ^ heap.u32(puVar5) + 0x7efefeff) & 0x81010100) == 0);
    uVar4 = heap.u32(puVar5);
    if (uVar4 == '\0') {
      /* goto joined_r0x004131eb */ throw new Error("goto joined_r0x004131eb not supported");
    }
    if ((uVar4 >>> 8) == '\0') {
      puVar5 = (puVar5 + 1);
      /* goto joined_r0x004131eb */ throw new Error("goto joined_r0x004131eb not supported");
    }
  }
  LAB_004131cf: puVar5 = (puVar3 + -1);
  joined_r0x004131eb: do {
    if ((param_2 & 3) == 0) {
      do {
        uVar2 = heap.u32(param_2);
        uVar4 = heap.u32(param_2);
        param_2 = param_2 + 1;
        if (((uVar2 ^ 0xffffffff ^ uVar2 + 0x7efefeff) & 0x81010100) != 0) {
          if (uVar4 == '\0') {
            LAB_00413258: heap.u32(puVar5) = uVar4;
            return param_1;
          }
          if ((uVar4 >>> 8) == '\0') {
            heap.u32(puVar5) = uVar4;
            return param_1;
          }
          if ((uVar4 & 0xff0000) == 0) {
            heap.u32(puVar5) = uVar4;
            heap.u32((puVar5 + 2)) = 0;
            return param_1;
          }
          if ((uVar4 & 0xff000000) == 0) {
            heap.u32(puVar5) = uVar4;
            return param_1;
          }
        }
        heap.u32(puVar5) = uVar4;
        puVar5 = puVar5 + 1;
      } while (true);
    }
    bVar1 = (byte) * param_2;
    uVar4 = bVar1;
    param_2 = (param_2 + 1);
    if (bVar1 == 0) {
      /* goto LAB_00413258 */ throw new Error("goto LAB_00413258 not supported");
    }
    heap.u32(puVar5) = bVar1;
    puVar5 = (puVar5 + 1);
  } while (true);
}

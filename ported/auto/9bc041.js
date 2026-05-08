// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bc041.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009bc041(heap) {
  let sVar1 = 0;
  let psVar2 = 0;
  let in_AX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let unaff_BP = 0;
  let unaff_ESI = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  uVar3 = unaff_ESI;
  while (true) {
    while (true) {
      while (true) {
        while (true) {
          do {
            uVar4 = uVar3;
            uVar3 = uVar4 + 0x178;
            if (heap.u32(0x009a1164) <= uVar3) {
              psVar2 = heap.u32((unaff_ESI + 8));
              if (psVar2 != 0x0) {
                sVar1 = heap.u32(psVar2 + (2) * 4);
                if (in_AX < sVar1) {
                  in_AX = sVar1;
                }
                if ((sVar1 + heap.u32(psVar2)) < in_DX) {
                  in_DX = sVar1 + heap.u32(psVar2);
                }
                sVar1 = heap.u32(psVar2 + (3) * 4);
                if (unaff_BX < sVar1) {
                  unaff_BX = sVar1;
                }
                if ((sVar1 + heap.u32(psVar2 + (1) * 4)) < unaff_BP) {
                  unaff_BP = sVar1 + heap.u32(psVar2 + (1) * 4);
                }
                if ((in_AX < in_DX) && (unaff_BX < unaff_BP)) {
                  (heap.u32(heap.u32(0x009b2280)))();
                }
              }
              return;
            }
          } while ((((in_DX <= heap.u32((uVar4 + 0x198))) || (unaff_BP <= heap.u32((uVar4 + 0x19a)))) || ((heap.u32((uVar4 + 0x198)) + heap.u32((uVar4 + 0x19c))) <= in_AX)) || ((heap.u32((uVar4 + 0x19a)) + heap.u32((uVar4 + 0x19e))) <= unaff_BX));
          if (heap.u32((uVar4 + 0x198)) <= in_AX) {
            break;
          }
          FUN_009bc041(heap);
          in_AX = heap.u32((uVar4 + 0x198));
          uVar3 = unaff_ESI;
        }
        if (in_DX <= (heap.u32((uVar4 + 0x198)) + heap.u32((uVar4 + 0x19c)))) {
          break;
        }
        FUN_009bc041(heap);
        in_AX = heap.u32((uVar4 + 0x198)) + heap.u32((uVar4 + 0x19c));
        uVar3 = unaff_ESI;
      }
      if (heap.u32((uVar4 + 0x19a)) <= unaff_BX) {
        break;
      }
      FUN_009bc041(heap);
      unaff_BX = heap.u32((uVar4 + 0x19a));
      uVar3 = unaff_ESI;
    }
    if (unaff_BP <= (heap.u32((uVar4 + 0x19a)) + heap.u32((uVar4 + 0x19e)))) {
      break;
    }
    FUN_009bc041(heap);
    unaff_BX = heap.u32((uVar4 + 0x19a)) + heap.u32((uVar4 + 0x19e));
    uVar3 = unaff_ESI;
  }
  return;
}

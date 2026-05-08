// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b41e4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_009b41e4(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let bVar4 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = 0;
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
    do {
      uVar1 = heap.u32(puVar8);
      heap.setU32(0x009aa032, (uVar1) >>> 0);
      bVar4 = (byte)((uVar1 & 0xffffff7f) >>> 8);
      uVar2 = (byte)(uVar1 & 0xffffff7f);
      uVar7 = bVar4;
      puVar8 = (puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b42b6: uVar3 = uVar2;
        if ((uVar7 & 2) != 0) {
          uVar7 = (uVar7 + 2);
          uVar3 = uVar2 - 2;
          if (uVar3 == 0 || uVar2 < 2) {
            /* goto LAB_009b42fe */ throw new Error("goto LAB_009b42fe not supported");
          }
        }
        sVar5 = (uVar7 - heap.u32(0x009a2024));
        if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
          uVar3 = uVar3 + sVar5;
          if ((uVar3 < 0) || (uVar3 == 0)) {
            /* goto LAB_009b42fe */ throw new Error("goto LAB_009b42fe not supported");
          }
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar3 + -1;
        uVar2 = uVar3;
        if (((sVar6 == 0 || (sVar5 + uVar3) < 1) || (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= uVar3)) && ((uVar2 + 3) >>> 2 != 0)) {
          heap.setU32(0x0099c164, (1) >>> 0);
          return 0;
        }
      } else {
        uVar7 = (bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b42b6 */ throw new Error("goto LAB_009b42b6 not supported");
        }
      }
      LAB_009b42fe: if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
    do {
      uVar1 = heap.u32(puVar8);
      heap.setU32(0x009aa032, (uVar1) >>> 0);
      bVar4 = (byte)((uVar1 & 0xffffff7f) >>> 8);
      uVar2 = (byte)(uVar1 & 0xffffff7f);
      uVar7 = bVar4;
      puVar8 = (puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b4339: uVar3 = uVar2;
        if ((uVar7 & 2) != 0) {
          uVar7 = (uVar7 + 2);
          uVar3 = uVar2 - 2;
          if (uVar3 == 0 || uVar2 < 2) {
            /* goto LAB_009b4381 */ throw new Error("goto LAB_009b4381 not supported");
          }
        }
        sVar5 = (uVar7 - heap.u32(0x009a2024));
        if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
          uVar3 = uVar3 + sVar5;
          if ((uVar3 < 0) || (uVar3 == 0)) {
            /* goto LAB_009b4381 */ throw new Error("goto LAB_009b4381 not supported");
          }
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar3 + -1;
        uVar2 = uVar3;
        if (((sVar6 == 0 || (sVar5 + uVar3) < 1) || (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= uVar3)) && ((uVar2 + 3) >>> 2 != 0)) {
          heap.setU32(0x0099c164, (1) >>> 0);
          return 0;
        }
      } else {
        uVar7 = (bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b4339 */ throw new Error("goto LAB_009b4339 not supported");
        }
      }
      LAB_009b4381: if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
  do {
    uVar1 = heap.u32(puVar8);
    heap.setU32(0x009aa032, (uVar1) >>> 0);
    bVar4 = (byte)((uVar1 & 0xffffff7f) >>> 8);
    uVar2 = (byte)(uVar1 & 0xffffff7f);
    uVar7 = bVar4;
    puVar8 = (puVar8 + uVar2 + 2);
    if ((uVar1 & 0x100) == 0) {
      LAB_009b4233: uVar3 = uVar2;
      if ((uVar7 & 2) != 0) {
        uVar7 = (uVar7 + 2);
        uVar3 = uVar2 - 2;
        if (uVar3 == 0 || uVar2 < 2) {
          /* goto LAB_009b427b */ throw new Error("goto LAB_009b427b not supported");
        }
      }
      sVar5 = (uVar7 - heap.u32(0x009a2024));
      if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
        uVar3 = uVar3 + sVar5;
        if ((uVar3 < 0) || (uVar3 == 0)) {
          /* goto LAB_009b427b */ throw new Error("goto LAB_009b427b not supported");
        }
        sVar5 = 0;
      }
      sVar6 = sVar5 + uVar3 + -1;
      uVar2 = uVar3;
      if (((sVar6 == 0 || (sVar5 + uVar3) < 1) || (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= uVar3)) && ((uVar2 + 3) >>> 2 != 0)) {
        heap.setU32(0x0099c164, (1) >>> 0);
        return in_EAX;
      }
    } else {
      uVar7 = (bVar4 + 1);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) {
        /* goto LAB_009b4233 */ throw new Error("goto LAB_009b4233 not supported");
      }
    }
    LAB_009b427b: if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}

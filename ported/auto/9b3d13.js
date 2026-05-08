// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b3d13.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009b3d13(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let bVar4 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let uVar7 = 0;
  let puVar8 = 0;
  let unaff_ESI = 0;
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
    do {
      uVar1 = heap.u32(puVar8);
      heap.setU32(0x009aa032, (uVar1) >>> 0);
      bVar4 = ((uVar1 & 0xffffff7f) >>> 8);
      uVar2 = (uVar1 & 0xffffff7f);
      uVar7 = bVar4;
      puVar8 = (puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b3dd4: sVar5 = (uVar7 - heap.u32(0x009a2024));
        if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
          uVar2 = uVar2 + sVar5;
          if ((uVar2 < 0) || (uVar2 == 0)) {
            /* goto LAB_009b3e0b */ throw new Error("goto LAB_009b3e0b not supported");
          }
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar2 + -1;
        uVar3 = uVar2;
        if (((sVar6 == 0 || (sVar5 + uVar2) < 1) || (uVar3 = uVar2 - sVar6, uVar3 != 0 && sVar6 <= uVar2)) && ((uVar3 + 1) >>> 1 != 0)) {
          heap.setU32(0x0099c164, (1) >>> 0);
          return 0;
        }
      } else {
        uVar7 = (bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b3dd4 */ throw new Error("goto LAB_009b3dd4 not supported");
        }
      }
      LAB_009b3e0b: if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
    do {
      uVar1 = heap.u32(puVar8);
      heap.setU32(0x009aa032, (uVar1) >>> 0);
      bVar4 = ((uVar1 & 0xffffff7f) >>> 8);
      uVar2 = (uVar1 & 0xffffff7f);
      uVar7 = bVar4;
      puVar8 = (puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b3e46: sVar5 = (uVar7 - heap.u32(0x009a2024));
        if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
          uVar2 = uVar2 + sVar5;
          if ((uVar2 < 0) || (uVar2 == 0)) {
            /* goto LAB_009b3e7d */ throw new Error("goto LAB_009b3e7d not supported");
          }
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar2 + -1;
        uVar3 = uVar2;
        if (((sVar6 == 0 || (sVar5 + uVar2) < 1) || (uVar3 = uVar2 - sVar6, uVar3 != 0 && sVar6 <= uVar2)) && ((uVar3 + 1) >>> 1 != 0)) {
          heap.setU32(0x0099c164, (1) >>> 0);
          return 0;
        }
      } else {
        uVar7 = (bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) {
          /* goto LAB_009b3e46 */ throw new Error("goto LAB_009b3e46 not supported");
        }
      }
      LAB_009b3e7d: if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  puVar8 = (heap.u32((unaff_ESI + heap.u32(0x009a2020) * 2)) + unaff_ESI);
  do {
    uVar1 = heap.u32(puVar8);
    heap.setU32(0x009aa032, (uVar1) >>> 0);
    bVar4 = ((uVar1 & 0xffffff7f) >>> 8);
    uVar2 = (uVar1 & 0xffffff7f);
    uVar7 = bVar4;
    puVar8 = (puVar8 + uVar2 + 2);
    if ((uVar1 & 0x100) == 0) {
      LAB_009b3d62: sVar5 = (uVar7 - heap.u32(0x009a2024));
      if (uVar7 - heap.u32(0x009a2024) == 0 || uVar7 < heap.u32(0x009a2024)) {
        uVar2 = uVar2 + sVar5;
        if ((uVar2 < 0) || (uVar2 == 0)) {
          /* goto LAB_009b3d99 */ throw new Error("goto LAB_009b3d99 not supported");
        }
        sVar5 = 0;
      }
      sVar6 = sVar5 + uVar2 + -1;
      uVar3 = uVar2;
      if (((sVar6 == 0 || (sVar5 + uVar2) < 1) || (uVar3 = uVar2 - sVar6, uVar3 != 0 && sVar6 <= uVar2)) && ((uVar3 + 1) >>> 1 != 0)) {
        heap.setU32(0x0099c164, (1) >>> 0);
        return in_EAX;
      }
    } else {
      uVar7 = (bVar4 + 1);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) {
        /* goto LAB_009b3d62 */ throw new Error("goto LAB_009b3d62 not supported");
      }
    }
    LAB_009b3d99: if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d94b6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/win32.js";
import { FUN_005d8c79 } from "./5d8c79.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005d94b6(heap) {
  let bVar1 = 0;
  let cVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let bVar8 = 0;
  let uVar5 = 0;
  let extraout_var = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let bVar9 = 0;
  let cVar11 = 0;
  let extraout_CH = 0;
  let uVar10 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let extraout_DH = 0;
  let unaff_BL = 0;
  let uVar12 = 0;
  bVar9 = heap.u32(unaff_ESI + (0x30) * 4);
  if ((heap.u32((unaff_ESI + 0x48)) & 0x20) != 0) {
    FUN_005d8c79(heap);
  }
  heap.setU32(0x0065e6b7, (-1) >>> 0);
  if ((heap.u32((0x00887422) + (bVar9 * 0x130) * 4) & 0xc0) != 0) {
    heap.setU32(0x0065e6b7, (heap.u32((0x0088755c) + (bVar9 * 0x260) * 4)) >>> 0);
    if ((((heap.u32((0x005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 8) != 0) && (heap.u32(0x0065e6b7) == '\0')) && (((heap.u32((0x005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x2000) == 0 || ((heap.u32(unaff_ESI + (0x1f) * 4) == '\x02' && (heap.u32((unaff_ESI + 0x28)) < 0x20001)))))) {
      heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 0x80;
    }
  }
  (heap.u32(heap.u32((0x005d97b4) + (heap.u32(unaff_ESI + (0x50) * 4)) * 4)))();
  uVar6 = CONCAT22(heap, extraout_var, heap.u32((unaff_ESI + 0xb8)));
  uVar12 = heap.u32(unaff_ESI + (0x31) * 4);
  cVar3 = -1;
  uVar10 = heap.u32((unaff_ESI + 0x28));
  if (uVar10 < 0) {
    uVar10 = -uVar10;
  }
  if (0xffff < uVar10) {
    cVar3 = heap.u32((0x005f72ec) + (uVar12 * 4) * 4);
    bVar9 = (byte)(uVar10 - 0x10000 >>> 0xf);
    unaff_BL = bVar9 - 0x30;
    if (0x2f < bVar9) {
      unaff_BL = 0xff;
    }
  }
  if (heap.u32((0x005f72ee) + (uVar12 * 4) * 4) == '\x03') {
    cVar11 = heap.u32(unaff_ESI + (0xcc) * 4);
    if ((heap.u32(0x0088741c) & 0x7f) == 0) {
      if ((heap.u32((unaff_ESI + 0x28)) < 0x40000) || (heap.u32(unaff_ESI + (0xcc) * 4) != -1)) {
        /* goto LAB_005d96ef */ throw new Error("goto LAB_005d96ef not supported");
      }
      uVar4 = FUN_005df40c(heap, uVar6);
      cVar3 = extraout_DL;
      cVar11 = extraout_DH;
      if (uVar4 < 0x5556) {
        cVar11 = '\x12';
        /* goto LAB_005d969b */ throw new Error("goto LAB_005d969b not supported");
      }
    }
    /* goto LAB_005d96a2 */ throw new Error("goto LAB_005d96a2 not supported");
  }
  if ((heap.u32((0x005f7104 + uVar12 * 8)) & 0x10) != 0) {
    cVar11 = '\0';
    puVar13 = unaff_ESI;
    while (true) {
      cVar11 = cVar11 + heap.u32(puVar13 + (0xb3) * 4);
      if (heap.u32((puVar13 + 0x3e)) == 0xffff) {
        break;
      }
      puVar13 = 0x00743b94 + (uint) * (puVar13 + 0x3e) * 0x100;
    }
    if (cVar11 != '\0') {
      if (heap.u32((unaff_ESI + 0x28)) < 0) {
        if (heap.u32((unaff_ESI + 0x28)) < -0x2bfff) {
          uVar4 = heap.u32((unaff_ESI + 10));
          do {
            bVar9 = heap.u32((0x00743bb3) + (uVar4 * 0x100) * 4);
            if ((bVar9 != 0) && ((bVar9 < 5 || ((8 < bVar9 && (bVar9 < 0x10)))))) {
              /* goto LAB_005d963a */ throw new Error("goto LAB_005d963a not supported");
            }
            uVar4 = heap.u32((0x00743bd2 + uVar4 * 0x100));
          } while (uVar4 != 0xffff);
        }
      } else {
        if (0x2bfff < heap.u32((unaff_ESI + 0x28))) {
        uVar4 = heap.u32((unaff_ESI + 10));
        do {
          bVar9 = heap.u32((0x00743bb3) + (uVar4 * 0x100) * 4);
          if ((4 < bVar9) && ((bVar9 < 9 || ((0x10 < bVar9 && (bVar9 < 0x18)))))) {
            /* goto LAB_005d963a */ throw new Error("goto LAB_005d963a not supported");
          }
          uVar4 = heap.u32((0x00743bd2 + uVar4 * 0x100));
        } while (uVar4 != 0xffff);
      }
      }
    }
  }
  LAB_005d96ef: heap.u32(unaff_ESI + (0xcc) * 4) = 0xff;
  cVar11 = heap.u32((0x005f72ed) + (uVar12 * 4) * 4);
  bVar9 = 0xf3;
  if ((heap.u32((unaff_ESI + 0xb8)) & 2) == 0) {
    cVar11 = -1;
    bVar9 = 0xf3;
  }
  LAB_005d9707: cVar2 = heap.u32((unaff_ESI + 0xbb));
  if (cVar2 == -1) {
    LAB_005d972f: uVar5 = CONCAT11(heap, unaff_BL >>> 2, cVar3);
    if (unaff_BL == 0xff) {
      uVar5 = CONCAT11(heap, 0xff, cVar3);
    }
  } else {
    bVar8 = (byte)((ushort) * (unaff_ESI + 0xbb) >>> 8);
    if (cVar2 == cVar3) {
      bVar1 = bVar8 + 0xf;
      if (0xf0 < bVar8) {
        bVar1 = unaff_BL;
      }
      uVar5 = CONCAT11(heap, bVar1, cVar2);
      if (unaff_BL < bVar1) {
        uVar5 = CONCAT11(heap, unaff_BL, cVar2);
      }
    } else {
      uVar5 = CONCAT11(heap, bVar8 - 9, cVar2);
      if ((bVar8 < 9) || ((byte)(bVar8 - 9) < 0x50)) {
        /* goto LAB_005d972f */ throw new Error("goto LAB_005d972f not supported");
      }
    }
  }
  heap.u32((unaff_ESI + 0xbb)) = uVar5;
  cVar3 = heap.u32((unaff_ESI + 0xbd));
  if (cVar3 != -1) {
    bVar8 = (byte)((ushort) * (unaff_ESI + 0xbd) >>> 8);
    if (cVar3 == cVar11) {
      bVar1 = bVar8 + 0xf;
      if (0xf0 < bVar8) {
        bVar1 = bVar9;
      }
      uVar5 = CONCAT11(heap, bVar1, cVar3);
      if (bVar9 < bVar1) {
        uVar5 = CONCAT11(heap, bVar9, cVar3);
      }
      /* goto LAB_005d977a */ throw new Error("goto LAB_005d977a not supported");
    }
    uVar5 = CONCAT11(heap, bVar8 - 9, cVar3);
    if ((8 < bVar8) && (0x4f < (byte)(bVar8 - 9))) {
      /* goto LAB_005d977a */ throw new Error("goto LAB_005d977a not supported");
    }
  }
  uVar5 = CONCAT11(heap, bVar9 >>> 2, cVar11);
  if (bVar9 == 0xff) {
    uVar5 = CONCAT11(heap, 0xff, cVar11);
  }
  LAB_005d977a: heap.u32((unaff_ESI + 0xbd)) = uVar5;
  iVar7 = (heap.u32((unaff_ESI + 0x28)) >>> 0xe) * heap.u32((0x0065e674 + heap.u32(unaff_ESI + (0x1e) * 4) * 2)) >>> 0xe;
  if (iVar7 < -0x7f) {
    iVar7 = 0xff81;
  }
  if (0x7f < iVar7) {
    iVar7 = 0x7f;
  }
  heap.u32(unaff_ESI + (0xbf) * 4) = iVar7;
  return;
  LAB_005d963a: cVar11 = heap.u32(unaff_ESI + (0xcc) * 4);
  if (cVar11 == -1) {
    uVar4 = FUN_005df40c(heap, uVar6);
    cVar3 = extraout_DL_00;
    if (extraout_CH < ((byte)(uVar4 >>> 8) & 0xf)) {
      LAB_005d9668: cVar11 = -2;
    } else {
      cVar11 = heap.u32((0x005f72ee) + (uVar12 * 4) * 4);
      if (cVar11 == '\0') {
        cVar11 = heap.u32((0x0065e9d8) + ((ushort)((uVar4 & 0xff) * 4) >>> 8) * 4);
      } else {
        if (cVar11 == '\x01') {
        cVar11 = heap.u32((0x0065e9e1) + ((ushort)((uVar4 & 0xff) * 5) >>> 8) * 4);
      } else {
        if (cVar11 != '\x02') {
          /* goto LAB_005d9668 */ throw new Error("goto LAB_005d9668 not supported");
        }
        cVar11 = heap.u32((0x0065e9dc) + ((ushort)((uVar4 & 0xff) * 5) >>> 8) * 4);
      }
      }
    }
    LAB_005d969b: heap.u32(unaff_ESI + (0xcc) * 4) = cVar11;
  }
  LAB_005d96a2: if (cVar11 == -2) {
    cVar11 = -1;
  }
  bVar9 = 0xff;
  /* goto LAB_005d9707 */ throw new Error("goto LAB_005d9707 not supported");
}

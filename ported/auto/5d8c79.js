// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d8c79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/win32.js";
import { FUN_005d9220 } from "./5d9220.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d8c79(heap) {
  let bVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let extraout_DX = 0;
  let sVar7 = 0;
  let bVar9 = 0;
  let cVar10 = 0;
  let uVar11 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  if (heap.u32((unaff_ESI + 0x50)) == '\a') {
    heap.u32((0x00887422 + unaff_EDI)) = heap.u32((0x00887422 + unaff_EDI)) | 2;
    heap.u32((0x00887422 + unaff_EDI)) = heap.u32((0x00887422 + unaff_EDI)) | 8;
    heap.u32((0x00887422 + unaff_EDI)) = heap.u32((0x00887422 + unaff_EDI)) & 0xfffb;
    heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) & 0xffdf;
    FUN_005e5301(heap);
    return;
  }
  bVar9 = heap.u32((0x008874b1) + (unaff_EDI) * 4) + 1;
  if (0x1f < bVar9) {
    bVar9 = 0;
  }
  heap.u32((0x008874b1) + (unaff_EDI) * 4) = bVar9;
  uVar4 = heap.u32((unaff_ESI + 0x28));
  if (uVar4 < 0) {
    uVar4 = -uVar4;
  }
  if (heap.u32((0x008874a8 + unaff_EDI)) < uVar4) {
    heap.u32((0x008874a8 + unaff_EDI)) = uVar4;
  }
  bVar2 = heap.u32((0x008874b0) + (unaff_EDI) * 4);
  if ((bVar9 == 0) && (0x8000 < uVar4)) {
    heap.u32((0x008874ac + unaff_EDI)) = heap.u32((0x008874ac + unaff_EDI)) + uVar4;
    heap.u32((0x008874c4 + bVar2 * 2 + unaff_EDI)) = heap.u32((0x008874c4 + bVar2 * 2 + unaff_EDI)) + 1;
  }
  iVar5 = (heap.u32((unaff_ESI + 0x2c)) + heap.u32((unaff_ESI + 0x28)) >>> 10) * 0x2a;
  if ((-1 < iVar5) && (heap.u32((unaff_ESI + 0xce)) == '\0')) {
    heap.u32((0x008874b4 + bVar2 * 4 + unaff_EDI)) = heap.u32((0x008874b4 + bVar2 * 4 + unaff_EDI)) + iVar5;
  }
  if ((heap.u32((0x005f5b78 + heap.u32((uint)(byte)(0x00887420) + ((uint) * (unaff_ESI + 0x30) * 0x260) * 4) * 8)) & 0x80) != 0) {
    sVar3 = FUN_005d9220(heap);
    sVar3 = (sVar3 + heap.u32((0x008874d2 + unaff_EDI))) >>> 1;
    sVar7 = (extraout_DX + heap.u32((0x008874d4 + unaff_EDI))) >>> 1;
    heap.u32((0x008874d2 + unaff_EDI)) = sVar3;
    heap.u32((0x008874d4 + unaff_EDI)) = sVar7;
    if (heap.u32((0x008874cc + unaff_EDI)) < sVar3) {
      heap.u32((0x008874cc + unaff_EDI)) = sVar3;
    }
    if (sVar3 < heap.u32((0x008874ce + unaff_EDI))) {
      heap.u32((0x008874ce + unaff_EDI)) = sVar3;
    }
    if (sVar7 < 0) {
      sVar7 = -sVar7;
    }
    if (heap.u32((0x008874d0 + unaff_EDI)) < sVar7) {
      heap.u32((0x008874d0 + unaff_EDI)) = sVar7;
    }
  }
  sVar3 = CONCAT11(heap, (heap.u32((unaff_ESI + 0x3a)) >>> 5), (heap.u32((unaff_ESI + 0x38)) >>> 5));
  uVar6 = heap.u32((unaff_ESI + 0x3c)) >>> 2;
  uVar4 = uVar6;
  cVar10 = uVar6;
  if ((cVar10 == heap.u32((0x008874ef) + (unaff_EDI) * 4)) && (sVar3 == heap.u32((0x008874dc + unaff_EDI)))) {
    /* goto LAB_005d90f1 */ throw new Error("goto LAB_005d90f1 not supported");
  }
  heap.u32((0x008874dc + unaff_EDI)) = sVar3;
  heap.u32((0x008874ef) + (unaff_EDI) * 4) = cVar10;
  uVar6 = heap.u32((unaff_ESI + 0x36)) >>> 2;
  if ((heap.u32((unaff_ESI + 0x48)) & 1) == 0) {
    heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffbf;
  } else {
    puVar1 = (0x008874d8 + unaff_EDI);
    uVar4 = heap.u32(puVar1);
    heap.u32(puVar1) = heap.u32(puVar1) | 0x40;
    if ((uVar4 >>> 6 & 1) == 0) {
      pbVar8 = 0x008874e5 + unaff_EDI;
      bVar9 = heap.u32(pbVar8);
      heap.u32(pbVar8) = heap.u32(pbVar8) + 0x40;
      if (0xbf < bVar9) {
        heap.u32((0x008874e5) + (unaff_EDI) * 4) = heap.u32((0x008874e5) + (unaff_EDI) * 4) + -0x40;
      }
    }
  }
  if (uVar6 == 0x71) {
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x20;
  }
  if (uVar6 == 0x70) {
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x40;
  }
  if (uVar6 == 0x78) {
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x80;
  }
  if ((uVar6 == 0x75) && (0xaffff < heap.u32((unaff_ESI + 0x28)))) {
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x20;
  }
  uVar6 = heap.u32((0x00652309 + uVar6 * 2));
  uVar4 = heap.u32((0x008874d8 + unaff_EDI));
  if ((uVar4 & 2) == 0) {
    if ((uVar4 & 4) == 0) {
      if ((uVar6 & 2) != 0) {
        heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 2;
        heap.u32((0x008874de + unaff_EDI)) = heap.u32((0x008874de + unaff_EDI)) & 0x7ff;
        if ((uVar6 & 8) != 0) {
          heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 8;
        }
        if ((uVar6 & 0x10) != 0) {
          heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 0x10;
        }
      }
      if ((uVar6 & 4) != 0) {
        heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 4;
        heap.u32((0x008874de + unaff_EDI)) = heap.u32((0x008874de + unaff_EDI)) & 0x7ff;
        if ((uVar6 & 8) != 0) {
          heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 8;
        }
        if ((uVar6 & 0x10) != 0) {
          heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 0x10;
        }
      }
    } else {
      if ((uVar6 & 4) == 0) {
        /* goto LAB_005d8e62 */ throw new Error("goto LAB_005d8e62 not supported");
      }
      heap.u32((0x008874de + unaff_EDI)) = heap.u32((0x008874de + unaff_EDI)) + 0x800;
    }
  } else {
    if ((uVar6 & 2) == 0) {
    LAB_005d8e62: heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xfffffff9;
    heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffe7;
    puVar12 = (0x008874e0 + unaff_EDI);
    if (((uVar4 & 8) == 0) && (puVar12 = (0x008874e2 + unaff_EDI), (uVar4 & 0x10) == 0)) {
      puVar12 = (0x008874de + unaff_EDI);
    }
    uVar11 = heap.u32((0x008874de + unaff_EDI)) >>> 0xb;
    if (uVar11 == 0) {
      uVar11 = heap.u32(puVar12) & 0x1f;
      if (uVar11 != 0x1f) {
        uVar11 = uVar11 + 1;
      }
      heap.u32(puVar12) = heap.u32(puVar12) & 0xffe0;
      heap.u32(puVar12) = heap.u32(puVar12) | uVar11;
    } else {
      if (uVar11 == 1) {
      uVar11 = heap.u32(puVar12) & 0xe0;
      if (uVar11 != 0xe0) {
        uVar11 = uVar11 + 0x20;
      }
      heap.u32(puVar12) = heap.u32(puVar12) & 0xff1f;
      heap.u32(puVar12) = heap.u32(puVar12) | uVar11;
    } else {
      if ((uVar11 == 2) || ((uVar4 & 0x10) == 0)) {
      uVar11 = heap.u32(puVar12) & 0x700;
      if (uVar11 != 0x700) {
        uVar11 = uVar11 + 0x100;
      }
      heap.u32(puVar12) = heap.u32(puVar12) & 0xf8ff;
      heap.u32(puVar12) = heap.u32(puVar12) | uVar11;
    } else {
      uVar11 = heap.u32(puVar12) & 0xf800;
      if (uVar11 != 0xf800) {
        uVar11 = uVar11 + 0x800;
      }
      heap.u32(puVar12) = heap.u32(puVar12) & 0x7ff;
      heap.u32(puVar12) = heap.u32(puVar12) | uVar11;
    }
    }
    }
  } else {
    heap.u32((0x008874de + unaff_EDI)) = heap.u32((0x008874de + unaff_EDI)) + 0x800;
  }
  }
  if ((uVar4 & 0x20) == 0) {
    if (((uVar6 & 0x20) != 0) && (-1 < heap.u32((unaff_ESI + 0x28)))) {
      heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffff7f;
      heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 0x20;
      bVar9 = heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0x3f;
      if (bVar9 != 0x3f) {
        bVar9 = bVar9 + 1;
      }
      heap.u32((0x008874e5) + (unaff_EDI) * 4) = heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0xc0;
      heap.u32((0x008874e5) + (unaff_EDI) * 4) = heap.u32((0x008874e5) + (unaff_EDI) * 4) | bVar9;
      heap.u32((0x008874e6) + (unaff_EDI) * 4) = (heap.u32((unaff_ESI + 0x12)) >>> 2);
      uVar4 = uVar4 & 0xffffff7f;
    }
  } else {
    if ((heap.u32((unaff_ESI + 0x28)) < 0) || ((uVar6 & 0x20) == 0)) {
    heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffdf;
    bVar9 = (byte)(heap.u32((unaff_ESI + 0x12)) >>> 2);
    cVar10 = bVar9 - heap.u32((0x008874e6) + (unaff_EDI) * 4);
    if ((bVar9 < heap.u32((byte)(0x008874e6) + (unaff_EDI) * 4) || cVar10 == '\0') && (bVar9 = -cVar10, heap.u32((byte)(0x008874e7) + (unaff_EDI) * 4) < bVar9)) {
      heap.u32((0x008874e7) + (unaff_EDI) * 4) = bVar9;
    }
  }
  }
  if ((uVar4 & 0x80) == 0) {
    if (((uVar6 & 0x40) != 0) && (heap.u32((unaff_ESI + 0x28)) < 1)) {
      heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffdf;
      heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 0x80;
      bVar9 = heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0x3f;
      if (bVar9 != 0x3f) {
        bVar9 = bVar9 + 1;
      }
      heap.u32((0x008874e5) + (unaff_EDI) * 4) = heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0xc0;
      heap.u32((0x008874e5) + (unaff_EDI) * 4) = heap.u32((0x008874e5) + (unaff_EDI) * 4) | bVar9;
      heap.u32((0x008874e6) + (unaff_EDI) * 4) = (heap.u32((unaff_ESI + 0x12)) >>> 2);
    }
  } else {
    if ((0 < heap.u32((unaff_ESI + 0x28))) || ((uVar6 & 0x40) == 0)) {
    heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xffffff7f;
    bVar9 = (byte)(heap.u32((unaff_ESI + 0x12)) >>> 2);
    cVar10 = bVar9 - heap.u32((0x008874e6) + (unaff_EDI) * 4);
    if ((bVar9 < heap.u32((byte)(0x008874e6) + (unaff_EDI) * 4) || cVar10 == '\0') && (bVar9 = -cVar10, heap.u32((byte)(0x008874e7) + (unaff_EDI) * 4) < bVar9)) {
      heap.u32((0x008874e7) + (unaff_EDI) * 4) = bVar9;
    }
  }
  }
  if ((uVar6 & 0x80) != 0) {
    bVar9 = heap.u32((0x008874e4) + (unaff_EDI) * 4) & 0x1f;
    if (bVar9 != 0x1f) {
      bVar9 = bVar9 + 1;
    }
    heap.u32((0x008874e4) + (unaff_EDI) * 4) = heap.u32((0x008874e4) + (unaff_EDI) * 4) & 0xe0;
    heap.u32((0x008874e4) + (unaff_EDI) * 4) = heap.u32((0x008874e4) + (unaff_EDI) * 4) | bVar9;
  }
  if ((uVar6 & 0x800) != 0) {
    bVar9 = heap.u32((0x008874a5) + (unaff_EDI) * 4) & 0x1f;
    if (bVar9 != 0x1f) {
      bVar9 = bVar9 + 1;
    }
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) & 0xe0;
    heap.u32((0x008874a5) + (unaff_EDI) * 4) = heap.u32((0x008874a5) + (unaff_EDI) * 4) | bVar9;
  }
  LAB_005d90f1: if (heap.u32((unaff_ESI + 0xe)) != 0x8000) {
    uVar6 = heap.u32((unaff_ESI + 0x10)) >>> 9;
    pbVar8 = heap.u32((0x00971ef4) + ((ushort)((ushort)((heap.u32((unaff_ESI + 0x10)) & 0xffe0) << 7 | uVar6 | heap.u32((unaff_ESI + 0xe)) & 0xffe0) >>> 5 | uVar6 << 0xb)) * 4);
    bVar9 = heap.u32(pbVar8);
    while ((bVar9 & 0x3c) != 0) {
      pbVar8 = pbVar8 + 8;
      bVar9 = heap.u32(pbVar8);
    }
    if (heap.u32((unaff_ESI + 0x12)) < (ushort)(heap.u32(pbVar8 + (2) * 4) * 4)) {
      if ((uVar4 & 1) == 0) {
        heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) | 1;
        bVar9 = heap.u32((0x008874ee) + (unaff_EDI) * 4) & 0x1f;
        if (bVar9 != 0x1f) {
          bVar9 = bVar9 + 1;
        }
        heap.u32((0x008874ee) + (unaff_EDI) * 4) = heap.u32((0x008874ee) + (unaff_EDI) * 4) & 0xe0;
        heap.u32((0x008874ee) + (unaff_EDI) * 4) = heap.u32((0x008874ee) + (unaff_EDI) * 4) | bVar9;
        if (heap.u32((unaff_ESI + 0x1f)) != '\0') {
          heap.u32((0x008874ee) + (unaff_EDI) * 4) = heap.u32((0x008874ee) + (unaff_EDI) * 4) | 0x20;
        }
        if (heap.u32((unaff_ESI + 0x20)) != '\0') {
          heap.u32((0x008874ee) + (unaff_EDI) * 4) = heap.u32((0x008874ee) + (unaff_EDI) * 4) | 0x40;
        }
      }
      iVar5 = (heap.u32((unaff_ESI + 0x2c)) + heap.u32((unaff_ESI + 0x28)) >>> 10) * 0x2a;
      if (iVar5 < 0) {
        return;
      }
      heap.u32((0x008874e8 + unaff_EDI)) = heap.u32((0x008874e8 + unaff_EDI)) + iVar5;
      return;
    }
  }
  heap.u32((0x008874d8 + unaff_EDI)) = heap.u32((0x008874d8 + unaff_EDI)) & 0xfffffffe;
  return;
}

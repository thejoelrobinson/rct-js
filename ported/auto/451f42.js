// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451f42.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00451f42(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar8 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar9 = 0;
  let puVar10 = 0;
  uVar6 = ((((((in_EAX) >>> 0) >>> 8) & 0xffff)) & 0xffff);
  uVar4 = ((((((in_EAX) & 0xff)) & 0xffff) * 0x20) & 0xffff);
  uVar7 = ((uVar6 * 0x20) & 0xffff);
  bVar2 = ((heap.u8((unaff_EBX + 0x32 + unaff_ESI))) & 0xff);
  pbVar9 = ((heap.u32((0x00971ef4) + (((((uVar6 << 0xc | uVar4) & 0xffff) >>> 5 | (uVar7 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
  while ((heap.u8(pbVar9) & 0x3c) != 0x10 || (bVar2 != heap.u8(pbVar9 + (2)))) {
    pbVar1 = ((pbVar9 + 1) >>> 0);
    pbVar9 = ((pbVar9 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return ((uVar4) >>> 0);
    }
  }
  uVar8 = ((heap.u8(pbVar9) & 3) >>> 0);
  uVar5 = ((((uVar4 - heap.u32((0x00652478) + (uVar8 * 2) * 4)) >>> 0)) >>> 0);
  uVar7 = ((uVar7 - heap.u32((0x0065247a) + (uVar8 * 2) * 4)) & 0xffff);
  uVar4 = ((uVar7 * 0x80 | uVar7 >>> 9 | uVar4 - heap.u32((0x00652478) + (uVar8 * 2) * 4)) & 0xffff);
  puVar10 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    uVar5 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar5 >>> 8)), heap.u8(puVar10)) & 0xffffff3c) >>> 0);
    if (((uVar5) << 24 >> 24) == 4) {
      if ((heap.u8(puVar10 + (4)) & 4) == 0) {
        bVar3 = ((heap.u8(puVar10 + (2))) & 0xff);
      } else {
        uVar5 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar5 >>> 8)), heap.u8(puVar10 + (4))) & 0xffffff03) >>> 0);
        if (((uVar5) << 24 >> 24) == ((uVar8) << 24 >> 24)) {
          bVar3 = ((heap.u8(puVar10 + (2)) + 4) & 0xff);
          uVar5 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar5 >>> 8)), bVar3)) >>> 0);
        } else {
          uVar5 = ((uVar5 ^ 2) >>> 0);
          if (((uVar5) << 24 >> 24) != ((uVar8) << 24 >> 24)) {
            /* goto LAB_00451fe5 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00451f42/LAB_00451fe5"); return 0;
          }
          bVar3 = ((heap.u8(puVar10 + (2))) & 0xff);
        }
      }
      if (bVar3 == bVar2) {
        return uVar5;
      }
    }
    LAB_00451fe5: pbVar9 = ((puVar10 + 1) >>> 0);
    puVar10 = ((puVar10 + 8) >>> 0);
    if ((heap.u8(pbVar9) & 0x80) != 0) {
      return uVar5;
    }
  } while (true);
}

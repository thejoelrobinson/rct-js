// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436e2b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
// @manual — sprite/pixel scan-line painter into 0x981efc..0x991efb (256x256 buf).
// Disasm at 0x436e2b:
//   movb %ah, 0x628ae9                 → u8 store of high byte (flags)
//   mulb 0x628aec(%ebx); addb 0x628af1(%ebx), %ah → u8 LUT reads stride 1
//   movl 0x8dc0b4(%ebx), %esi          → u32 ptr load, struct stride 0x10
//   movb 0x8dc0b8/0xba(%ebx), %cl/%ch  → u8 width/height stride 1
//   movb (%esi), %al; cmpb 0x981efc(%ebx), %al; movb %al, 0x981efc(%ebx)
//                                       → u8 max-blend at 0x981efc, stride 1
export function FUN_00436e2b(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let cVar4 = 0;
  let cVar5 = 0;
  let cVar6 = 0;
  let cVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar8 = 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
  heap.setU8(0x00628ae9, (((uVar2 >>> 8) & 0xff)) & 0xff);
  uVar9 = (((((((((((((((uVar2) & 0xff)) & 0xffff) * heap.u8((0x00628aec) + unaff_EBX)) & 0xffff) >>> 8)) << 24 >> 24) + heap.u8((0x00628af1) + unaff_EBX)) & 0xff) + 0x7097) >>> 0)) >>> 0);
  iVar8 = ((uVar9 * 0x10) >>> 0);
  pbVar10 = ((heap.u32((0x008dc0b4) + (uVar9 * 4) * 4)) >>> 0);
  cVar3 = ((heap.u8((0x008dc0b8) + iVar8)) & 0xff);
  cVar4 = ((heap.u8((0x008dc0ba) + iVar8)) & 0xff);
  if ((uVar2 & 0x100) != 0) {
    cVar3 = ((heap.u8((0x008dc0ba) + iVar8)) & 0xff);
    cVar4 = ((heap.u8((0x008dc0b8) + iVar8)) & 0xff);
  }
  uVar9 = ((uVar2 >>> 0x10) >>> 0);
  cVar7 = (((((uVar2 >>> 0x10)) << 24 >> 24)) & 0xff);
  cVar6 = (((((uVar2 >>> 0x18)) << 24 >> 24)) & 0xff);
  if ((uVar2 & 0x100) == 0) {
    cVar5 = ((cVar3) & 0xff);
    if ((uVar2 & 0x200) == 0) {
      do {
        do {
          uVar2 = ((uVar9) >>> 0);
          bVar1 = ((heap.u8(pbVar10)) & 0xff);
          pbVar10 = ((pbVar10 + 1) >>> 0);
          if (heap.u8((0x00981efc) + (uVar2 & 0xffff)) <= bVar1) {
            heap.setU8((0x00981efc) + (uVar2 & 0xffff), bVar1 & 0xff);
          }
          cVar6 = ((((uVar2) << 24 >> 24) + 1) & 0xff);
          cVar5 = ((cVar5 + -1) & 0xff);
          uVar9 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar2 >>> 8)), cVar6)) >>> 0);
        } while (cVar5 != 0);
        cVar4 = ((cVar4 + -1) & 0xff);
        uVar9 = ((((CONCAT11((((uVar2 >>> 8)) << 24 >> 24) + 1, cVar6 - cVar3)) >>> 0)) >>> 0);
        cVar5 = ((cVar3) & 0xff);
      } while (cVar4 != 0);
      return;
    }
    uVar2 = ((((CONCAT11(cVar6, cVar7 + cVar3 + -1)) >>> 0)) >>> 0);
    cVar6 = ((cVar3) & 0xff);
    do {
      do {
        uVar9 = ((uVar2) >>> 0);
        bVar1 = ((heap.u8(pbVar10)) & 0xff);
        pbVar10 = ((pbVar10 + 1) >>> 0);
        if (heap.u8((0x00981efc) + (uVar9 & 0xffff)) <= bVar1) {
          heap.setU8((0x00981efc) + (uVar9 & 0xffff), bVar1 & 0xff);
        }
        cVar7 = ((((uVar9) << 24 >> 24) + -1) & 0xff);
        cVar6 = ((cVar6 + -1) & 0xff);
        uVar2 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar9 >>> 8)), cVar7)) >>> 0);
      } while (cVar6 != 0);
      cVar4 = ((cVar4 + -1) & 0xff);
      uVar2 = ((((CONCAT11((((uVar9 >>> 8)) << 24 >> 24) + 1, cVar7 + cVar3)) >>> 0)) >>> 0);
      cVar6 = ((cVar3) & 0xff);
    } while (cVar4 != 0);
    return;
  }
  cVar5 = ((cVar4) & 0xff);
  if ((uVar2 & 0x200) == 0) {
    do {
      do {
        bVar1 = ((heap.u8(pbVar10)) & 0xff);
        pbVar10 = ((pbVar10 + 1) >>> 0);
        if (heap.u8((0x00981efc) + (uVar9 & 0xffff)) <= bVar1) {
          heap.setU8((0x00981efc) + (uVar9 & 0xffff), bVar1 & 0xff);
        }
        cVar6 = ((((uVar9) << 24 >> 24)) & 0xff);
        cVar7 = (((((uVar9 >>> 8)) << 24 >> 24) + 1) & 0xff);
        uVar9 = ((((CONCAT11(cVar7, cVar6)) >>> 0)) >>> 0);
        cVar5 = ((cVar5 + -1) & 0xff);
      } while (cVar5 != 0);
      uVar9 = ((((CONCAT11(cVar7 - cVar4, cVar6 + 1)) >>> 0)) >>> 0);
      cVar3 = ((cVar3 + -1) & 0xff);
      cVar5 = ((cVar4) & 0xff);
    } while (cVar3 != 0);
    return;
  }
  uVar2 = ((((CONCAT11(cVar6 + cVar4 + -1, cVar7)) >>> 0)) >>> 0);
  cVar6 = ((cVar4) & 0xff);
  do {
    do {
      bVar1 = ((heap.u8(pbVar10)) & 0xff);
      pbVar10 = ((pbVar10 + 1) >>> 0);
      if (heap.u8((0x00981efc) + (uVar2 & 0xffff)) <= bVar1) {
        heap.setU8((0x00981efc) + (uVar2 & 0xffff), bVar1 & 0xff);
      }
      cVar7 = ((((uVar2) << 24 >> 24)) & 0xff);
      cVar5 = (((((uVar2 >>> 8)) << 24 >> 24) + -1) & 0xff);
      uVar2 = ((((CONCAT11(cVar5, cVar7)) >>> 0)) >>> 0);
      cVar6 = ((cVar6 + -1) & 0xff);
    } while (cVar6 != 0);
    uVar2 = ((((CONCAT11(cVar5 + cVar4, cVar7 + 1)) >>> 0)) >>> 0);
    cVar3 = ((cVar3 + -1) & 0xff);
    cVar6 = ((cVar4) & 0xff);
  } while (cVar3 != 0);
  return;
}

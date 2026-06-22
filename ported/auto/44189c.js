// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44189c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0044189c(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let bVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let pbVar9 = 0;
  let unaff_DI = regs.edi & 0xffff;
  // @manual fix (ADDENDUM 48): the `goto code_r0x0044189c` tail-loop was a _gotoWarn
  // return-stub, so the iterative single-direction search ran ONCE (depth counter
  // 0x6293c6 reached 1 not 2). Restructured into a while-loop (continue at the bottom).
  // Also: the dx/dy delta reads were u32 at ×8 offset — the asm is `word [ebp*4+0x652478]`
  // (signed 16-bit, ×4); and the target coords [0x6293bc/be] are `word` not byte.
  // KNOWN-LIMITATION: the multi-direction RECURSION (uVar6 != 0 branch) still passes
  // ignored JS args + doesn't propagate unaff_DI (edi) across the call — broken if
  // exercised (same secondary-register class as ADD.41); not hit by the current oracle.
  while (true) {  // code_r0x0044189c
  in_AX = ((in_AX + heap.i16((0x00652478 + unaff_EBP * 4))) & 0xffff);
  in_CX = ((in_CX + heap.i16((0x0065247a + unaff_EBP * 4))) & 0xffff);
  bVar3 = (((((((in_DX) & 0xffff) >>> 8)) << 24 >> 24) + 1) & 0xff);
  if (200 < bVar3) {
    return;
  }
  uVar7 = ((heap.u16(0x006293bc) - in_AX) & 0xffff);
  if (((uVar7) << 16 >> 16) < 0) {
    uVar7 = ((-uVar7) & 0xffff);
  }
  uVar5 = ((heap.u16(0x006293be) - in_CX) & 0xffff);
  if (((uVar5) << 16 >> 16) < 0) {
    uVar5 = ((-uVar5) & 0xffff);
  }
  uVar8 = ((uVar7) & 0xffff);
  if (uVar7 <= uVar5) {
    uVar8 = ((uVar5) & 0xffff);
    uVar5 = ((uVar7) & 0xffff);
  }
  bVar4 = ((heap.u8(0x006293c0) - ((in_DX) & 0xff)) & 0xff);
  if (((bVar4) << 24 >> 24) < 0) {
    bVar4 = ((-bVar4) & 0xff);
  }
  uVar7 = ((uVar8 + (uVar5 >>> 1) + ((bVar4) & 0xffff)) & 0xffff);
  if ((uVar7 <= unaff_DI) && (((uVar7 < unaff_DI || (bVar3 < heap.u8(0x006293c1))) && (unaff_DI = ((uVar7) & 0xffff), heap.setU8(0x006293c1, (bVar3) & 0xff), uVar7 == 0)))) {
    return;
  }
  uVar7 = ((in_CX * 0x80 | in_CX >>> 9 | in_AX) & 0xffff);
  pbVar9 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    LAB_00441933: {
    if ((heap.u8(pbVar9) & 0x3c) == 4) {
      if (((heap.u8(pbVar9 + (4)) & 4) == 0) || ((heap.u8(pbVar9 + (4)) & 3) == unaff_EBP)) {
        bVar4 = ((heap.u8(pbVar9 + (2))) & 0xff);
      } else {
        if ((heap.u8(pbVar9 + (4)) & 3 ^ 2) != unaff_EBP) {
          break LAB_00441933;
        }
        bVar4 = ((heap.u8(pbVar9 + (2)) + 4) & 0xff);
      }
      if ((((in_DX) & 0xff) == bVar4) && (heap.u8(pbVar9 + (4)) != 0 || heap.u8(0x006293c8) != 0)) {
        break;
      }
    }
    }
    pbVar1 = ((pbVar9 + 1) >>> 0);
    pbVar9 = ((pbVar9 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return;
    }
  } while (true);
  in_DX = ((CONCAT11(bVar3, heap.u8(pbVar9 + (2)))) & 0xffff);
  uVar6 = ((((heap.u8(pbVar9 + (6)) & heap.u32((0x00630e58) + (heap.u8(pbVar9 + (6))) * 4)) >>> 0) & ~(1 << ((unaff_EBP ^ 2) & 0x1f))) >>> 0);
  unaff_EBP = ((0) >>> 0);
  if (uVar6 != 0) {
    for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = (((unaff_EBP + 1) >>> 0)) >>> 0) {
    
    }
  }
  if (uVar6 == 0) {
    return;
  }
  uVar6 = ((uVar6 & ~(1 << (unaff_EBP & 0x1f))) >>> 0);
  if (uVar6 != 0) {
    if (heap.u16(0x6293c6) != 0) {
      heap.setU8((0x006293c4 + 0), (heap.i8(0x006293c4) + -1) & 0xff);
    }
    heap.setU8((0x006293c4 + 0), (heap.i8(0x006293c4) + -1) & 0xff);
    uVar2 = ((heap.u8(0x006293c4)) >>> 0);
    if (heap.i8(0x006293c4) < 0) {
      return;
    }
    do {
      uVar6 = ((uVar6 & ~(1 << (unaff_EBP & 0x1f))) >>> 0);
      heap.setU8(0x006293c4, (uVar2 & 0xffff) & 0xff);
      (regs.eax = FUN_0044189c(heap, pbVar9, in_DX, uVar6, in_AX));
      heap.setU8(0x006293c4, (uVar2) & 0xff);
      unaff_EBP = ((0) >>> 0);
      if (uVar6 != 0) {
        for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = (((unaff_EBP + 1) >>> 0)) >>> 0) {
        
        }
      }
    } while (uVar6 != 0);
    return;
  }
  if (((heap.u8(pbVar9 + (4)) & 4) != 0) && ((heap.u8(pbVar9 + (4)) & 3) == unaff_EBP)) {
    in_DX = ((CONCAT11(bVar3, heap.u8(pbVar9 + (2)) + 4)) & 0xffff);
  }
  heap.setU32(0x006293c6, (heap.u32(0x006293c6) + 1) >>> 0);   // inc dword [0x6293c6]
  // goto code_r0x0044189c → loop back
  }
}

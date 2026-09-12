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
    regs.edi = unaff_DI;   // thread best-distance back to caller
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
    regs.edi = unaff_DI;
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
      regs.edi = unaff_DI;
      return;
    }
  } while (true);
  in_DX = ((CONCAT11(bVar3, heap.u8(pbVar9 + (2)))) & 0xffff);
  // @manual fix (ADDENDUM 52): DAT_00630e58[pbVar9[6]] is a BYTE mask at offset +pbVar9[6]
  // (asm `and bl, byte [ebx+0x630e58]`); the auto read u32 at *4 offset → wrong direction mask
  // → recursion explored wrong dirs → deep wrong path (cost 0x3f) instead of the cheap turn.
  uVar6 = ((((heap.u8(pbVar9 + (6)) & heap.u8((0x00630e58 + heap.u8(pbVar9 + (6))))) >>> 0) & ~(1 << ((unaff_EBP ^ 2) & 0x1f))) >>> 0);
  unaff_EBP = ((0) >>> 0);
  if (uVar6 != 0) {
    for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = (((unaff_EBP + 1) >>> 0)) >>> 0) {
    
    }
  }
  if (uVar6 == 0) {
    regs.edi = unaff_DI;
    return;
  }
  uVar6 = ((uVar6 & ~(1 << (unaff_EBP & 0x1f))) >>> 0);
  if (uVar6 != 0) {
    // @manual fix (ADDENDUM 49): multi-direction RECURSION. Was broken — setU8 for the
    // DAT_006293c4 DWORD save/restore, ignored JS args, no input-register setup, and no
    // unaff_DI(edi) threading (so the recursive search never pruned → over-explored).
    if (heap.u16(0x6293c6) != 0) {
      heap.setU8((0x006293c4 + 0), (heap.i8(0x006293c4) + -1) & 0xff);
    }
    heap.setU8((0x006293c4 + 0), (heap.i8(0x006293c4) + -1) & 0xff);
    uVar2 = ((heap.u32(0x006293c4)) >>> 0);              // full dword (asm push [0x6293c4])
    if (heap.i8(0x006293c4) < 0) {
      regs.edi = unaff_DI;                                // thread edi back out
      return;
    }
    do {
      uVar6 = ((uVar6 & ~(1 << (unaff_EBP & 0x1f))) >>> 0);
      heap.setU32(0x006293c4, (uVar2 & 0xffff) >>> 0);    // DAT_006293c4 = uVar2 & 0xffff
      // recurse: set up input regs (asm 0x4419cd-0x4419f7); save/restore ax/ebx/cx/dx/esi
      // + the DAT_006293c4 dword; edi is NOT saved — it threads to carry the best-distance.
      const _sax = regs.eax, _sbx = regs.ebx, _scx = regs.ecx, _sdx = regs.edx, _ssi = regs.esi;
      let _recDX = in_DX & 0xffff;                        // dl += 4 iff pbVar9[4]&4 && &3==unaff_EBP
      if (((heap.u8(pbVar9 + 4) & 4) != 0) && ((heap.u8(pbVar9 + 4) & 3) == unaff_EBP)) {
        _recDX = ((in_DX & 0xff00) | ((in_DX + 4) & 0xff)) & 0xffff;
      }
      regs.eax = in_AX & 0xffff;
      regs.ecx = in_CX & 0xffff;
      regs.edx = _recDX;
      regs.ebp = unaff_EBP >>> 0;
      regs.esi = pbVar9 >>> 0;
      regs.edi = unaff_DI;                                // thread best-distance in
      FUN_0044189c(heap);
      unaff_DI = regs.edi & 0xffff;                       // and back out
      regs.eax = _sax; regs.ebx = _sbx; regs.ecx = _scx; regs.edx = _sdx; regs.esi = _ssi;
      heap.setU32(0x006293c4, uVar2 >>> 0);               // restore the saved dword
      unaff_EBP = ((0) >>> 0);
      if (uVar6 != 0) {
        for (; (uVar6 >>> unaff_EBP & 1) == 0; unaff_EBP = (((unaff_EBP + 1) >>> 0)) >>> 0) {

        }
      }
    } while (uVar6 != 0);
    regs.edi = unaff_DI;                                  // thread edi back out
    return;
  }
  if (((heap.u8(pbVar9 + (4)) & 4) != 0) && ((heap.u8(pbVar9 + (4)) & 3) == unaff_EBP)) {
    in_DX = ((CONCAT11(bVar3, heap.u8(pbVar9 + (2)) + 4)) & 0xffff);
  }
  heap.setU32(0x006293c6, (heap.u32(0x006293c6) + 1) >>> 0);   // inc dword [0x6293c6]
  // goto code_r0x0044189c → loop back
  }
}

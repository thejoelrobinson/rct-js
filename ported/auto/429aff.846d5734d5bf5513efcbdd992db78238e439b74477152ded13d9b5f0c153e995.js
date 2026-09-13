// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429aff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_00429aff(heap) {
  let psVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_CF = regs.cf | 0;
  let bVar6 = 0;
  // @manual fix — the translator dropped the function prologue's register
  // setup. The binary (disasm 0x429aff-0x429b11) does:
  //   mov ax, [0x971ed6]   ; AX = display width
  //   mov bx, [0x971ed8]   ; BX = display height
  //   call 0x5e68e2        ; finds the viewport window; returns AX unchanged,
  //                        ; CF=0 if found / CF=1 (stc) if none → `jb` skips block
  // Ghidra's C lost the `ax = width` init (5e68e2 is `undefined2 ...(void)`),
  // so sVar2 came from 5e68e2 reading a STALE regs.eax (low16=0) → sVar2=0 →
  // the viewport widget x2 (_DAT_005f5114) was resolved to -1 instead of
  // width-1, which made the cursor hit-test 0x5e3874 reject every viewport
  // click (x2=-1 fails the signed bbox compare). Set AX=width/BX=height first,
  // then read in_CF from 5e68e2's carry result (5e68e2.js now writes regs.cf).
  regs.eax = heap.u16(0x00971ed6);
  regs.ebx = heap.u16(0x00971ed8);
  sVar4 = ((heap.u32(0x00971ed8)) & 0xffff);
  sVar2 = (((regs.eax = FUN_005e68e2(heap))) & 0xffff);
  in_CF = regs.cf | 0;  // CF is the 5e68e2 result (asm: `jb 0x429b63`).
  if (!in_CF) {
    psVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0);
    heap.setI16((unaff_ESI + 0x24), (sVar2) & 0xffff);
    sVar5 = ((sVar4) & 0xffff);
    if ((heap.u32(0x0099a500) & 1) == 0) {
      sVar5 = ((sVar4 + -0x40) & 0xffff);
    }
    heap.setI16((unaff_ESI + 0x26), (sVar5) & 0xffff);
    // @manual fix — these are 16-bit `mov word ptr` stores in the binary
    // (disasm 0x429b38 / 0x429b44). _DAT_005f5114 / _DAT_005f5118 are `short`
    // globals that OVERLAP the viewport widget-table fields at 0x5f5114
    // (widget0 x2) and 0x5f5118 (widget0 y2 area). The auto setU32 corrupted
    // the adjacent 16 bits (widget0 y1 / +0xa), so even with the right value
    // the widget bbox stayed malformed. Use setU16 to match the binary.
    heap.setU16(0x005f5114, (sVar2 + -1) & 0xffff);
    heap.setU16(0x005f5118, (sVar5 + -1) & 0xffff);
    heap.setU32(psVar1, (sVar2) & 0xffffffff);
    heap.setI16((psVar1 + (1) * 2), (sVar5) & 0xffff);
    heap.setI16((psVar1 + (6) * 2), (sVar2 << (heap.u8((psVar1 + ((8) * 2))) & 0x1f)) & 0xffff);
    heap.setI16((psVar1 + (7) * 2), (sVar5 << (heap.u8((psVar1 + ((8) * 2))) & 0x1f)) & 0xffff);
  }
  // @manual fix (collapsed-flag class) — the four blocks below are
  //   mov cl,<class>; xor dx,dx; call 0x5e3b2b; je <skip>
  // at 0x429b63 (cl=1), 0x429b81 (cl=2), 0x429bfe (cl=0x1d) and 0x429c24
  // (cl=0x27). `je` skips when 0x5e3b2b left ZF=1, i.e. when NO window of that
  // class exists — so each block must run when the window IS found. Ghidra
  // collapsed that ZF into a hardcoded `bVar6 = true` and the port then tested
  // `if (!bVar6)`, so ALL FOUR blocks were dead code: the top toolbar (class 1),
  // bottom toolbar (class 2) and classes 0x1d/0x27 never got re-laid-out for
  // the display size, and the bottom-toolbar widget right edges at
  // 0x5f52ba..0x5f530c kept their design-time values.
  //
  // Three further translator losses had to be repaired together, otherwise
  // enabling the blocks would just write the right values to the wrong places:
  //  * `mov cl,<class>` was translated as `regs.ecx = 0xff01` for all four
  //    calls (so every lookup asked for class 1), and `xor dx,dx` was dropped
  //    entirely (0x5e3b2b matches window NUMBER against DX, so a stale DX made
  //    the lookup miss). bit 7 of CL is 0 for 1/2/0x1d/0x27, so 0x5e3b2b's
  //    `btr cx,7` always selects the class+number variant.
  //  * ESI. The binary's `mov word ptr [esi+..], dx` stores target the window
  //    0x5e3b2b just found (it returns the slot in ESI); the port used the
  //    function-entry ESI. Re-read regs.esi after each call.
  //  * DX's source. `mov dx, ax` — AX is still the display width loaded at
  //    0x429aff (0x5e3b2b touches neither AX nor EAX). The port read
  //    `regs.eax = FUN_005e3b2b(heap)`, but that function returns nothing, so
  //    uVar3 was NaN&0xffff = 0. Use sVar2, the width captured above.
  //  * the 0x5f52xx stores are `mov word ptr` (16-bit) — same overlapping
  //    widget-table hazard already documented for 0x5f5114/0x5f5118 above.
  //
  // GATED to __realStartup. Measured: with the four blocks live the frozen sc21
  // gameplay soak moves 5b79d5b5 -> 5b2865a0. That is expected — the toolbars
  // are actually laid out now — but the baseline was captured with them dead,
  // so per the project's gating rule the frozen path keeps the old (broken)
  // behaviour verbatim below and only real startup gets the faithful one.
  // Un-gate together with a deliberate re-baseline.
  if (!globalThis.__realStartup) {
    bVar6 = ((true) & 0xff);
    uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
    if (!bVar6) {
      if (uVar3 < 0x280) {
        uVar3 = ((0x280) & 0xffff);
      }
      heap.setU16((unaff_ESI + 0x24), (uVar3) & 0xffff);
    }
    bVar6 = ((true) & 0xff);
    uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
    if (!bVar6) {
      heap.setI16((unaff_ESI + 0x22), (sVar4 + -0x22) & 0xffff);
      if (uVar3 < 0x280) {
        uVar3 = ((0x280) & 0xffff);
      }
      heap.setU16((unaff_ESI + 0x24), (uVar3) & 0xffff);
      heap.setU32(0x005f52fc, (uVar3 - 1) >>> 0);
      heap.setU32(0x005f530c, (uVar3 - 3) >>> 0);
      heap.setU32(0x005f530a, (uVar3 - 0x76) >>> 0);
      heap.setU32(0x005f52fa, (uVar3 - 0x78) >>> 0);
      heap.setU32(0x005f52bc, (uVar3 - 0x79) >>> 0);
      heap.setU32(0x005f52cc, (uVar3 - 0x7b) >>> 0);
      heap.setU32(0x005f52ec, (uVar3 - 0x7e) >>> 0);
      heap.setU32(0x005f52ea, (uVar3 - 0x95) >>> 0);
    }
    bVar6 = ((true) & 0xff);
    uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
    if (!bVar6) {
      heap.setU16((unaff_ESI + 0x20), ((uVar3 >>> 1) - 0xa4) & 0xffff);
      heap.setI16((unaff_ESI + 0x22), (sVar4 + -0x66) & 0xffff);
    }
    bVar6 = ((true) & 0xff);
    sVar4 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
    if (!bVar6) {
      heap.setI16((unaff_ESI + 0x20), (sVar4 + -200) & 0xffff);
    }
    return;
  }
  const _find = (cl) => {
    regs.ecx = ((regs.ecx & 0xffffff00) | cl) >>> 0;   // mov cl, <class>
    regs.edx = (regs.edx & 0xffff0000) >>> 0;          // xor dx, dx
    FUN_005e3b2b(heap);
    return regs.zf ? 0 : (regs.esi >>> 0);             // je <skip> when ZF=1
  };
  let pWnd = 0;
  pWnd = _find(0x01);                                  // 0x429b63
  bVar6 = ((pWnd === 0) & 0xff);
  if (!bVar6) {
    uVar3 = ((sVar2) & 0xffff);                        // 0x429b6f: mov dx, ax
    if (uVar3 < 0x280) {
      uVar3 = ((0x280) & 0xffff);
    }
    heap.setU16((pWnd + 0x24), (uVar3) & 0xffff);
  }
  pWnd = _find(0x02);                                  // 0x429b81
  bVar6 = ((pWnd === 0) & 0xff);
  if (!bVar6) {
    heap.setI16((pWnd + 0x22), (sVar4 + -0x22) & 0xffff);
    uVar3 = ((sVar2) & 0xffff);                        // 0x429b98: mov dx, ax
    if (uVar3 < 0x280) {
      uVar3 = ((0x280) & 0xffff);
    }
    heap.setU16((pWnd + 0x24), (uVar3) & 0xffff);
    heap.setU16(0x005f52fc, (uVar3 - 1) & 0xffff);
    heap.setU16(0x005f530c, (uVar3 - 3) & 0xffff);
    heap.setU16(0x005f530a, (uVar3 - 0x76) & 0xffff);
    heap.setU16(0x005f52fa, (uVar3 - 0x78) & 0xffff);
    heap.setU16(0x005f52bc, (uVar3 - 0x79) & 0xffff);
    heap.setU16(0x005f52cc, (uVar3 - 0x7b) & 0xffff);
    heap.setU16(0x005f52ec, (uVar3 - 0x7e) & 0xffff);
    heap.setU16(0x005f52ea, (uVar3 - 0x95) & 0xffff);
  }
  pWnd = _find(0x1d);                                  // 0x429bfe
  bVar6 = ((pWnd === 0) & 0xff);
  if (!bVar6) {
    uVar3 = ((sVar2) & 0xffff);                        // 0x429c0a: mov dx, ax
    heap.setU16((pWnd + 0x20), ((uVar3 >>> 1) - 0xa4) & 0xffff);
    heap.setI16((pWnd + 0x22), (sVar4 + -0x66) & 0xffff);
  }
  pWnd = _find(0x27);                                  // 0x429c24
  bVar6 = ((pWnd === 0) & 0xff);
  if (!bVar6) {
    // 0x429c30: `mov dx, ax; sub dx, 0xc8` — AX (width), not BX. Ghidra reused
    // sVar4 (the height local) for the 0x5e3b2b result here.
    heap.setI16((pWnd + 0x20), (sVar2 + -0xc8) & 0xffff);
  }
  return;
}

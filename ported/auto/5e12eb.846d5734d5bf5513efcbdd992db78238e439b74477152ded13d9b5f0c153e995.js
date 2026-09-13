// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e12eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e13d2 } from "./5e13d2.js";
import { FUN_009bb355 } from "./9bb355.js";
export function FUN_005e12eb(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar1 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let puVar2 = 0;
  (regs.ecx = 0xffff, regs.edx = 0xffff, regs.eax = FUN_009bb355(heap), regs.ecx = 0xffffffff, regs.edx = 0xffffffff, regs.eax);
  // HAND-FIX: DPI struct at 0x99fb8c has u16 fields. Translator emitted setU32
  // for each u16 store; consecutive 32-bit writes overlapped, clobbering
  // neighbouring fields and leaving the struct mostly zero. Binary disassembly
  // at 0x5e1310..0x5e134e shows `66 89 0d ...`, `66 a3 90 fb 99 00`, `66 89 1d ...`
  // — all 16-bit stores. Only the bytes-ptr write at 0x99fb8c (line below) is
  // a true 32-bit store (0x89 modrm at 0x5e136d in the binary).
  // Without this fix, clipY stayed 0 → painter's pixel-offset formula in
  // FUN_004316f3 computed a negative row offset → pixels landed before the
  // surface buffer instead of inside it.
  heap.setU16(0x0099fb94, (in_DX - in_AX) & 0xffff);                                                 // clipW (u16)
  heap.setU16(0x0099fb98, (-((heap.u16(0x0099fb94) - heap.u16(0x0099fb84)) - heap.u16(0x0099fb88))) & 0xffff); // pitch (u16)
  heap.setU16(0x0099fb96, (unaff_BP - unaff_BX) & 0xffff);                                           // clipH (u16)
  uVar1 = ((((unaff_BX) >>> 0)) >>> 0);
  heap.setU32(0x0099fb8c, (heap.u32(0x0099fb7c) + in_AX + ((heap.u16(0x0099fb84) + heap.u16(0x0099fb88)) & 0xffff) * uVar1) >>> 0); // bytes ptr (u32)
  heap.setU16(0x0099fb90, (in_AX) & 0xffff);                                                          // clipX (u16)
  heap.setU16(0x0099fb92, (unaff_BX) & 0xffff);                                                       // clipY (u16)
  for (puVar2 = ((0x009a013c) >>> 0); puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    if (((((heap.u16((puVar2 + 0x32)) & 0x10) == 0) && (heap.i16((puVar2 + 0x20)) < in_DX)) && (heap.i16((puVar2 + 0x22)) < unaff_BP)) && ((in_AX < (((heap.i16((puVar2 + 0x20)) + heap.i16((puVar2 + 0x24)))) << 16 >> 16) && (((uVar1) << 16 >> 16) < (((heap.i16((puVar2 + 0x22)) + heap.i16((puVar2 + 0x26)))) << 16 >> 16))))) {
      // HAND-FIX (wrong register-init at call site — the catalogued translator
      // bug class): the binary at 0x5e13b2 does `push ax/bx/dx/bp; push esi`
      // before `call 0x5e13d2`, passing the sprite clip-rect (ax/bx/dx/bp) and
      // the CURRENT window pointer (esi=puVar2) in registers. The translator
      // dropped this setup, so FUN_005e13d2 read a stale regs.esi (a kernel32
      // heap ptr ~0x744194) and walked ~6584 garbage window slots — recursing
      // ~112k× per call, ~20.5M iterations/tick (~47% of gameplay-tick JS time),
      // and PAINTING NOTHING (its paint callbacks never fired). Restore the
      // register setup so 5e13d2 walks the real 3-4-window pool from the current
      // window. Mirrors the in-function recursion fix already in 5e13d2.js's
      // @manual header; the entry from here was missed.
      regs.eax = in_AX & 0xffff;
      regs.edx = in_DX & 0xffff;
      regs.ebx = unaff_BX & 0xffff;
      regs.ebp = unaff_BP & 0xffff;
      regs.esi = (puVar2) >>> 0;
      (regs.eax = FUN_005e13d2(heap));
      uVar1 = ((uVar1 & 0xffff) >>> 0);
    }
  }
  return;
}

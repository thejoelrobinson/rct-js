// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44149a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
// @manual — peep struct (stride 0x100, base 0x743b94) with mixed byte/word
// fields. Disasm at 0x44149a:
//   cmpb $0x4, 0x8(%esi)       → u8  at 0x743b9c + peep*0x100
//   cmpb $0x8, 0x2b(%esi)      → u8  at 0x743bbf + peep*0x100
//   cmpw 0x12(%esi), %dx       → u16 at 0x743ba6 + peep*0x100
//   movb $0x5, 0x2b(%esi)      → u8  store at 0x743bbf + peep*0x100
//   movw 0xe(%esi), %ax        → u16 at 0x743ba2 + peep*0x100
//   movw 0x10(%esi), %cx       → u16 at 0x743ba4 + peep*0x100
//   movw %ax, 0x32(%esi)       → u16 store at 0x743bc6 + peep*0x100
//   movw %cx, 0x34(%esi)       → u16 store at 0x743bc8 + peep*0x100
//   movb $0x5, 0x36(%esi)      → u8  store at 0x743bca + peep*0x100
//   movw 0x2(%esi), %si        → u16 at 0x743b96 + peep*0x100
export function FUN_0044149a(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let iVar3 = 0;
  uVar1 = ((heap.u16((0x00991f8e) + ((((((in_EAX & 0xfe0) << 2) & 0xffff) | ((in_ECX >>> 5) & 0xffff) & 0x7ff) & 0xffff)) * 2)) & 0xffff);
  while (uVar1 != 0xffff) {
    uVar2 = ((((uVar1) >>> 0)) >>> 0);
    iVar3 = ((uVar2 * 0x100) >>> 0);
    if (((heap.u8((0x00743b9c) + iVar3) == 4) && (heap.u8((0x00743bbf) + iVar3) == 8)) && (((in_EDX) << 16 >> 16) == ((heap.u16((0x00743ba6) + iVar3)) << 16 >> 16))) {
      (regs.eax = FUN_0044142c(heap));
      heap.setU8(((0x00743bbf) + iVar3), (5) & 0xff);
      (regs.eax = FUN_00441452(heap));
      uVar1 = ((heap.u16((0x00743ba4) + iVar3)) & 0xffff);
      heap.setU16((0x00743bc6 + iVar3), ((heap.u16((0x00743ba2) + iVar3) & 0xffe0) + 0x10) & 0xffff);
      heap.setU16((0x00743bc8 + iVar3), ((uVar1 & 0xffe0) + 0x10) & 0xffff);
      heap.setU8(((0x00743bca) + iVar3), (5) & 0xff);
      (regs.eax = FUN_0043c60b(heap));
    }
    uVar1 = ((heap.u16((0x00743b96) + iVar3)) & 0xffff);
  }
  return 1;
}

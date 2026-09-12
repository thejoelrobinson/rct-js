// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45174b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
// @manual — ride struct stride 0x260 at 0x887420. Disasm at 0x45174b:
//   testw $0x4c0, 0x887422(%esi)  → u16 at +0x2
//   andw $0xfeff, 0x887422(%esi)  → u16 AND at +0x2
//   orw  $0x40,   0x887422(%esi)  → u16 OR  at +0x2
//   movb %bl,  0x88755c(%esi)     → u8 store at +0x13c
//   movb $0x0, 0x88755d(%esi)     → u8 store at +0x13d
//   movb $0x0, 0x88757c(%esi)     → u8 store at +0x15c
//   movb $0x0, 0x88757d(%esi)     → u8 store at +0x15d
//   jmpl *0x451798(,%ebx,4)       → u32 jump table stride 4 (correct)
export function FUN_0045174b(heap) {
  let in_DL = regs.edx & 0xff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar1 = 0;
  let iVar2 = 0;
  uVar1 = ((((in_DL) >>> 0)) >>> 0);
  iVar2 = ((uVar1 * 0x260) >>> 0);
  if ((heap.u16((0x00887422) + iVar2) & 0x4c0) == 0) {
    heap.setU16(((0x00887422) + iVar2), (heap.u16((0x00887422) + iVar2) & 0xfeff) & 0xffff);
    heap.setU16(((0x00887422) + iVar2), (heap.u16((0x00887422) + iVar2) | 0x40) & 0xffff);
    heap.setU8(((0x0088755c) + iVar2), (((unaff_EBX) << 24 >> 24)) & 0xff);
    heap.setU8(((0x0088755d) + iVar2), (0) & 0xff);
    heap.setU8(((0x0088757c) + iVar2), (0) & 0xff);
    heap.setU8(((0x0088757d) + iVar2), (0) & 0xff);
    return (regs.eax = callIndirect(heap, heap.u32((0x00451798) + (unaff_EBX) * 4)));
  }
  return;
}

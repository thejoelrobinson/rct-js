// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4519c9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_004518fc } from "./4518fc.js";
// @manual — ride struct stride 0x260 at 0x887420. Disasm at 0x4519c9:
//   testw $0x80, 0x887422(%esi)        → u16 flag at +0x2
//   incb 0x88757d(%esi)                 → u8 at +0x15d
//   subb $0x10, 0x88757d(%esi)          → u8 at +0x15d
//   cmpb $0x3/$0x4, 0x88755d(%esi)      → u8 at +0x13d
//   movw 0x887442(%esi), %ax            → u16 at +0x22
//   movl 0x887444(%esi), %eax           → u32 at +0x24
//   movb 0x88755c(%esi), %al            → u8 at +0x13c (in switch case 0)
//   orw $0x80, 0x887422(%esi)           → u16 OR at +0x2
//   orb $0x1c, 0x88751d(%esi)           → u8 OR at +0xfd
//   movb $0x1, 0x88755d(%esi)           → u8 store
//   movb %al, 0x887563(%esi)            → u8 store
export function FUN_004519c9(heap) {
  let pcVar1 = 0;
  let cVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = ((in_EDX & 0xff) >>> 0);
  iVar4 = ((uVar3 * 0x260) >>> 0);
  if ((heap.u16((0x00887422) + iVar4) & 0x80) != 0) {
    pcVar1 = ((0x0088757d + iVar4) >>> 0);
    heap.setU8(pcVar1, (heap.i8(pcVar1) + 1) & 0xff);
    if ((heap.u8(pcVar1) & 0xff) == 0) {
      heap.setU8((0x0088757d) + iVar4, (heap.u8((0x0088757d) + iVar4) + -0x10) & 0xff);
    }
    if ((((heap.u8((0x0088757d) + iVar4) & 0xf) == 0) && (heap.u8((0x0088755d) + iVar4) != 3)) && (heap.u8((0x0088755d) + iVar4) != 4)) {
      heap.setU16((0x00971e86 + 0), (heap.u16((0x00887442) + iVar4)) & 0xffff);
      unique0x00017200 = ((heap.u32((0x00887444) + iVar4)) >>> 0);
      (regs.eax = FUN_0042c711(heap));
    }
  }
  cVar2 = ((heap.u8((0x0088755c) + iVar4)) & 0xff);
  if (((cVar2 == 0) || (cVar2 == 7)) || (cVar2 == 6)) {
    heap.setU16(((0x00887422) + iVar4), (heap.u16((0x00887422) + iVar4) | 0x80) & 0xffff);
    heap.setU8(((0x0088751d) + iVar4), (heap.u8((0x0088751d) + iVar4) | 0x1c) & 0xff);
    heap.setU8(((0x0088755d) + iVar4), (1) & 0xff);
    heap.setU8(((0x00887563) + iVar4), (cVar2) & 0xff);
    (regs.eax = FUN_004518fc(heap));
  }
  return;
}

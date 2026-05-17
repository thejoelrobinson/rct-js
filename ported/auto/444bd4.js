// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444bd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444c74 } from "./444c74.js";
// @manual — peep struct (stride 0x100, base 0x743b94). Disasm at 0x444bd4:
//   movw $0x8000, 0xe(%esi)  → u16 at 0x743ba2
//   movw $0x8000, 0x10(%esi) → u16 at 0x743ba4
//   movw $0x0,    0x12(%esi) → u16 at 0x743ba6
//   movw 0xa(%esi), %cx; xchgw %cx, 0x999f8e; movw %cx, 0x2(%esi)
//                            → u16 at 0x743b9e (read) and 0x743b96 (store)
//   movb $0x10, 0x14(%esi)   → u8  at 0x743ba8
//   movb $0x14, 0x9(%esi)    → u8  at 0x743b9d
//   movb $0x8,  0x15(%esi)   → u8  at 0x743ba9
// Also cmpw on 0x87c3a0/0x87c3a6 → u16 reads.
export function FUN_00444bd4(heap) {
  let uVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let uVar2 = 0;
  let iVar3 = 0;
  if ((unaff_BL & 2) == 0) {
    if ((heap.u16(0x0087c3a0) << 16 >> 16) < 1) {
      return;
    }
  } else {
    if ((heap.u16(0x0087c3a0) << 16 >> 16) <= (((300 - (heap.u16(0x0087c3a6) << 16 >> 16))) << 16 >> 16)) {
    return;
  }
  }
  uVar2 = ((heap.u16(0x0087c394)) >>> 0);
  iVar3 = ((uVar2 * 0x100) >>> 0);
  (regs.eax = FUN_00444c74(heap));
  heap.setU16(((0x00743ba2) + iVar3), (0x8000) & 0xffff);
  heap.setU16(((0x00743ba4) + iVar3), (0x8000) & 0xffff);
  heap.setU16(((0x00743ba6) + iVar3), (0) & 0xffff);
  LOCK();
  UNLOCK();
  uVar1 = ((heap.u16((0x00743b9e) + iVar3)) & 0xffff);
  heap.setU16(((0x00743b96) + iVar3), (heap.u16(0x00999f8e)) & 0xffff);
  heap.setU16(0x00999f8e, (uVar1) & 0xffff);
  heap.setU16((0x00743bb6 + iVar3), (0) & 0xffff);
  heap.setU8(((0x00743ba8) + iVar3), (0x10) & 0xff);
  heap.setU8(((0x00743b9d) + iVar3), (0x14) & 0xff);
  heap.setU8(((0x00743ba9) + iVar3), (8) & 0xff);
  heap.setU16((0x00743ba0 + iVar3), (0) & 0xffff);
  heap.setU16((0x00743baa + iVar3), (0x8000) & 0xffff);
  return;
}

// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4571c1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
// @manual — peep struct (stride 0x100, base 0x743b94). Disasm at 0x4571c1:
//   cmpb $0x0, 0x2e(%edi)           → u8 at 0x743bc2
//   cmpw $0x8000, 0xe(%edi)         → u16 at 0x743ba2
//   movw 0x12(%edi)/0x10(%edi)/0xe  → u16 reads at 0x743ba6/ba4/ba2
//   cmpb $0x5, 0x2b(%edi)           → u8 at 0x743bbf
//   subw $0xc8, 0x7a(%edi)          → u16 at 0x743c0e
//   addb $0x3, 0x3b(%edi)           → u8 at 0x743bcf
//   movw 0x4(%edi), %di             → u16 next peep at 0x743b98
export function FUN_004571c1(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar5 = 0;
  let iVar6 = 0;
  uVar4 = ((heap.u16(0x0087c398)) & 0xffff);
  while (uVar4 != 0xffff) {
    uVar5 = ((((uVar4) >>> 0)) >>> 0);
    iVar6 = ((uVar5 * 0x100) >>> 0);
    if ((heap.u8((0x00743bc2) + iVar6) == 0) && ((heap.u16((0x00743ba2) + iVar6) & 0xffff) != 0x8000)) {
      uVar4 = ((heap.u16((0x00743ba6) + iVar6) - heap.i16((unaff_ESI + 0x12))) & 0xffff);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar4 = ((-uVar4) & 0xffff);
      }
      if (uVar4 < 0x31) {
        uVar4 = ((heap.u16((0x00743ba2) + iVar6) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
        if (((uVar4) << 16 >> 16) < 0) {
          uVar4 = ((-uVar4) & 0xffff);
        }
        uVar3 = ((heap.u16((0x00743ba4) + iVar6) - heap.i16((unaff_ESI + 0x10))) & 0xffff);
        if (((uVar3) << 16 >> 16) < 0) {
          uVar3 = ((-uVar3) & 0xffff);
        }
        if ((uVar4 < 0x61) && (uVar3 < 0x61)) {
          if (heap.u8((0x00743bbf) + iVar6) == 5) {
            pbVar1 = ((0x00743bcf + iVar6) >>> 0);
            bVar2 = ((heap.u8(pbVar1)) & 0xff);
            heap.setU8(pbVar1, (heap.u8(pbVar1) + 4) & 0xff);
            if (0xfb < bVar2) {
              heap.setU8(((0x00743bcf) + iVar6), (0xff) & 0xff);
            }
          } else {
            if (heap.u8((0x00743bbf) + iVar6) == 6) {
            heap.setI16((0x00743c0e + iVar6), (heap.i16((0x00743c0e + iVar6)) + -200) & 0xffff);
            pbVar1 = ((0x00743bcf + iVar6) >>> 0);
            bVar2 = ((heap.u8(pbVar1)) & 0xff);
            heap.setU8(pbVar1, (heap.u8(pbVar1) + 3) & 0xff);
            if (0xfc < bVar2) {
              heap.setU8(((0x00743bcf) + iVar6), (0xff) & 0xff);
            }
          }
          }
        }
      }
    }
    uVar4 = ((heap.u16((0x00743b98) + iVar6)) & 0xffff);
  }
  return;
}

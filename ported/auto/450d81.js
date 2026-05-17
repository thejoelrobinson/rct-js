// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450d81.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
// @manual — ride struct stride 0x260 at 0x887420, peep slot struct stride
// 0x4b0c at 0x8ae9c4. Disasm at 0x450d81:
//   movzbl 0x887420(%ebx), %eax        → u8 at +0 (ride type)
//   testl $0x200, 0x5f5b78(,%eax,8)    → u32 LUT scale 8
//   cmpb 0x8ae9c4(%esi), %dl           → u8 at +0 of peep slot (stride 0x4b0c)
//   cmpl 0x8ae9c6(%esi), %eax          → u32 at +2 of peep slot
//   movb $0,  0x8ae9c5(%esi)           → u8  at +1 of peep slot
//   orb  $4,  0x8ae9c5(%esi)           → u8  OR
//   movw $0,  0x8ae9ca/0x8ae9cc(%esi)  → u16 stores
//   movb $-1, 0x8874a4(%ecx) (ecx=peep_idx*0x260) → u8 store
//   movb %dh, 0x8874a4(%ebx) (ebx=ride_idx*0x260) → u8 store
//   movw 0x5f5802(,%edx,8) etc          → u16 LUT scale 8
export function FUN_00450d81(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_CL = regs.ecx & 0xff;
  let uVar4 = 0;
  let bVar6 = 0;
  let bVar7 = 0;
  let uVar5 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar8 = 0;
  let iVar9 = 0;
  LAB_00450e67: {
  LAB_00450e27: {
  iVar8 = (((in_EDX & 0xff) * 0x260) >>> 0);
  if ((heap.u32((0x005f5b78 + heap.u8((0x00887420) + iVar8) * 8)) & 0x200) == 0) {
    return CONCAT44(in_EDX, 0x5a5);
  }
  uVar3 = ((in_EDX & 0xff) >>> 0);
  do {
    iVar9 = (((uVar3 >>> 8) * 0x4b0c) >>> 0);
    bVar7 = ((((uVar3) & 0xff)) & 0xff);
    if (bVar7 == heap.u8((0x008ae9c4) + iVar9)) {
      break LAB_00450e67;
    }
    bVar6 = (((((uVar3 >>> 8)) << 24 >> 24) + 1) & 0xff);
    uVar3 = ((((CONCAT11(bVar6, bVar7)) >>> 0)) >>> 0);
  } while (bVar6 < 8);
  uVar2 = ((((bVar7) & 0xffff)) & 0xffff);
  do {
    uVar5 = ((uVar2) & 0xffff);
    iVar9 = ((((uVar5 >>> 8) >>> 0) * 0x4b0c) >>> 0);
    if (heap.u8((0x008ae9c4) + iVar9) == 0xff) {
      break LAB_00450e27;
    }
    bVar7 = (((((uVar5 >>> 8)) << 24 >> 24) + 1) & 0xff);
    uVar2 = ((CONCAT11(bVar7, ((uVar5) << 24 >> 24))) & 0xffff);
  } while (bVar7 < 8);
  uVar5 = ((uVar5 & 0xff) & 0xffff);
  uVar3 = ((0xffffffff) >>> 0);
  do {
    bVar7 = ((((uVar5 >>> 8) & 0xff)) & 0xff);
    if (heap.u32(((0x008ae9c6) >>> 0) + (((uVar5 >>> 8) >>> 0) * 0x4b0c)) <= uVar3) {
      uVar3 = ((heap.u32((0x008ae9c6) + (((uVar5 >>> 8) >>> 0) * 0x4b0c))) >>> 0);
      in_CL = ((bVar7) & 0xff);
    }
    uVar4 = ((((uVar5) & 0xff)) & 0xff);
    bVar7 = ((bVar7 + 1) & 0xff);
    uVar5 = ((CONCAT11(bVar7, uVar4)) & 0xffff);
  } while (bVar7 < 8);
  uVar5 = ((CONCAT11(in_CL, uVar4)) & 0xffff);
  iVar9 = ((((in_CL) >>> 0) * 0x4b0c) >>> 0);
  heap.setU8(((0x008874a4) + (heap.u8((0x008ae9c4) + iVar9) * 0x260)), (0xff) & 0xff);
  }
  uVar3 = ((((uVar5) >>> 0)) >>> 0);
  heap.setU8(((0x008ae9c4) + iVar9), (((uVar5) << 24 >> 24)) & 0xff);
  heap.setU8(((0x008874a4) + iVar8), ((((uVar5 >>> 8)) << 24 >> 24)) & 0xff);
  heap.setU8(((0x008ae9c5) + iVar9), (0) & 0xff);
  if ((heap.u32((0x005f5b78 + heap.u8((0x00887420) + iVar8) * 8)) & 0x80) != 0) {
    heap.setU8(((0x008ae9c5) + iVar9), (heap.u8((0x008ae9c5) + iVar9) | 4) & 0xff);
  }
  heap.setU16((((0x008ae9ca) | 0) + iVar9), (0) & 0xffff);
  heap.setU16((((0x008ae9cc) | 0) + iVar9), (0) & 0xffff);
  }
  uVar1 = ((heap.u32(0x006e3b84)) >>> 0);
  heap.setU32((((0x008ae9c6) | 0) + iVar9), (heap.u32(0x006e3b84)) & 0xffffffff);
  if ((heap.u8((0x008ae9c5) + iVar9) & 1) != 0) {
    return CONCAT44(in_EDX, CONCAT31((regs.eax = callIndirect(heap, int3, ((uVar1) >>> 0) >>> 8)), (((uVar3 >>> 8)) << 24 >> 24)));
  }
  heap.setU16((0x00971e86 + 0), (heap.u16((0x005f5802 + heap.u8((0x00887420) + iVar8) * 8))) & 0xffff);
  heap.setU16((0x00971e86 + 2), (heap.u16((0x005f5806 + heap.u8((0x00887420) + iVar8) * 8))) & 0xffff);
  return CONCAT44(in_EDX, CONCAT22((((((uVar1) >>> 0) >>> 0x10)) << 16 >> 16), 0x5a6));
}

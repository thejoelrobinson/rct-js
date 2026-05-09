// @manual — do not regenerate.
//
// Source: decompiled/c/9b30bc.c — sprite-blit fragment that consumes EDI
// (descriptor pointer) and EBP (fill value) via Ghidra's unaff_/in_
// register convention. The translator now reads regs.edi/regs.ebp at entry,
// but most call sites still don't propagate these values, so EDI is usually
// 0. Bail in that case to avoid the 4-billion-iteration underflow loop.
//
// Once a translator pass propagates register-args from caller-side C
// variables to regs.<reg> at call sites, this can be deleted to fall back
// on the auto-translation.

import { regs } from "../../runtime/regs.js";

export function FUN_009b30bc(heap) {
  const edi = regs.edi >>> 0;
  if (edi === 0) return;
  const ebp = regs.ebp >>> 0;
  const bVar3 = heap.u8(edi + 0xe);
  let uVar2 = heap.u16(edi + 8) >>> (bVar3 & 0x1f);
  let uVar5 = (heap.u16(edi + 0xa) >>> (bVar3 & 0x1f)) >>> 0;
  const uVar1 = heap.u16(edi + 0xc);
  let puVar6 = heap.u32(edi);
  if (puVar6 === 0 || uVar5 === 0) return;
  do {
    if ((uVar2 & 1) !== 0) {
      heap.setU8(puVar6, ebp & 0xff);
      puVar6 = (puVar6 + 1) >>> 0;
    }
    let uVar4 = (uVar2 >>> 2);
    if (((uVar2 >>> 1) & 1) !== 0) {
      heap.setU16(puVar6, ebp & 0xffff);
      puVar6 = (puVar6 + 2) >>> 0;
    }
    for (; uVar4 !== 0; uVar4 = (uVar4 - 1) >>> 0) {
      heap.setU32(puVar6, ebp >>> 0);
      puVar6 = (puVar6 + 4) >>> 0;
    }
    puVar6 = (puVar6 + uVar1) >>> 0;
    uVar5 = (uVar5 - 1) >>> 0;
  } while (uVar5 !== 0);
}

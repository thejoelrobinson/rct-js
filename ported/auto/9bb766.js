// @manual — do not regenerate.
//
// Source: decompiled/c/9bb766.c — palette fade. unaff_EBX = palette-table
// index, in_CL = brightness multiplier. Without caller setting regs.ebx /
// regs.ecx, EBX = 0 and we'd index into garbage. Bail in that case.

import { regs } from "../../runtime/regs.js";
import { FUN_00405cc0 } from "./405cc0.js";

export function FUN_009bb766(heap) {
  const ebx = regs.ebx | 0;
  if (ebx === 0) return;  // no caller-supplied table index
  const cl = regs.ecx & 0xff;
  let pbVar2 = heap.u32(0x008dc0b4 + ebx * 4);
  if (pbVar2 === 0) return;
  let puVar3 = (0x005f2000 + heap.u16(0x008dc0bc + ebx * 0x10) * 4) >>> 0;
  let uVar1 = heap.u16(0x008dc0b8 + ebx * 0x10);
  if (uVar1 === 0) return;
  do {
    heap.setU8(puVar3, ((heap.u8(pbVar2)     * cl) >>> 8) & 0xff);
    heap.setU8(puVar3 + 1, ((heap.u8(pbVar2 + 1) * cl) >>> 8) & 0xff);
    heap.setU8(puVar3 + 2, ((heap.u8(pbVar2 + 2) * cl) >>> 8) & 0xff);
    pbVar2 = (pbVar2 + 3) >>> 0;
    puVar3 = (puVar3 + 4) >>> 0;
    uVar1 = (uVar1 - 1) >>> 0;
  } while (uVar1 !== 0);
  FUN_00405cc0(heap, 0x005f2000, 10, 0xec);
}

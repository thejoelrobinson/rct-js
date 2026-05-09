// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb9f5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00429aff } from "./429aff.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_00452835 } from "./452835.js";
import { FUN_005e5f51 } from "./5e5f51.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_009bb4b4 } from "./9bb4b4.js";
import { FUN_009bb717 } from "./9bb717.js";
export function FUN_009bb9f5(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  if ((heap.u32(0x005e9178) == 0) && ((heap.u32(0x005e9174) != 0 || (heap.u8(0x005f8d5b) == 0)))) {
    if (heap.u32(0x005e9184) != 0) {
      (regs.eax = FUN_005e698a(heap));
      (regs.eax = FUN_00452835(heap));
      (regs.eax = FUN_009bb4b4(heap));
      (regs.eax = FUN_009bb717(heap));
      (regs.eax = FUN_0045268c(heap));
      (regs.eax = FUN_005e6028(heap));
      heap.setU32(0x005e9184, (0) >>> 0);
      heap.setU32(0x009b227c, (0) >>> 0);
    }
    heap.setU32(0x0099fb7c, (heap.u32(0x005f1fec)) >>> 0);
    heap.setU32(0x0099fb84, (heap.u32(0x005f2400)) >>> 0);
    heap.setU32(0x0099fb88, (heap.i16(0x005f1ff4) - heap.u32(0x005f2400)) >>> 0);
    heap.setU32(0x0099fb86, (heap.u32(0x005f1ff0)) >>> 0);
    if (heap.u32(0x005f15c4) != 0) {
      uVar1 = ((heap.u16(0x005f15c4)) & 0xffff);
      uVar3 = ((heap.u16(0x005f1b34)) & 0xffff);
      if ((((heap.u32(0x005f1ff0) == heap.u32(0x00971ee0)) && (heap.u32(0x005f2400) == heap.u32(0x00971ede))) && (uVar1 == heap.u32(0x00971eda))) && ((uVar3 == heap.u32(0x00971edc) && (heap.u8(0x00971ef0) == 1)))) {
        return;
      }
      heap.setU8(0x00971ef0, (1) & 0xff);
      heap.setU32(0x00971ee0, (heap.u32(0x005f1ff0)) >>> 0);
      heap.setU32(0x00971ede, (heap.u32(0x005f2400)) >>> 0);
      heap.setU32(0x00971ed6, (heap.u32(0x005f2400)) >>> 0);
      if (uVar1 < heap.u32(0x005f2400)) {
        heap.setU32(0x00971ed6, (uVar1) >>> 0);
      }
      heap.setU32(0x00971ed8, (heap.u32(0x005f1ff0)) >>> 0);
      if (uVar3 < heap.u32(0x005f1ff0)) {
        heap.setU32(0x00971ed8, (uVar3) >>> 0);
      }
      heap.setU32(0x00971ee2, (0x40) >>> 0);
      heap.setU8(0x00971eee, (6) & 0xff);
      if ((heap.u32(0x005f2400) & 0x3f) != 0) {
        heap.setU32(0x00971ee2, (0x20) >>> 0);
        heap.setU8(0x00971eee, (5) & 0xff);
      }
      heap.setU8(0x00971eef, (3) & 0xff);
      heap.setU32(0x00971ee4, (8) >>> 0);
      heap.setU32(0x00971eea, (heap.u32(0x005f1ff0) / 8) >>> 0);
      heap.setU32(0x00971ee6, (((heap.u32(0x005f2400)) >>> 0) / ((heap.u32(0x00971ee2)) >>> 0)) >>> 0);
      puVar4 = ((0x0099ad63) >>> 0);
      heap.setU32(0x00971eda, (uVar1) >>> 0);
      heap.setU32(0x00971edc, (uVar3) >>> 0);
      for (iVar2 = ((0x1400) >>> 0); iVar2 != 0; iVar2 = (((iVar2 + -1) >>> 0)) >>> 0) {
        heap.setU32(puVar4, (0xff) & 0xffffffff);
        puVar4 = ((puVar4 + 1) >>> 0);
      }
      (regs.eax = FUN_00429aff(heap));
      return (regs.eax = FUN_005e5f51(heap));
    }
  }
  heap.setU8(0x00971ef0, (0) & 0xff);
  return;
}

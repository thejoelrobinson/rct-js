// @manual — do not regenerate.
// Source: binary/rct.exe 0x5e0d3c..0x5e0d5d.

import { regs } from "../../runtime/regs.js";
import { FUN_005e4400 } from "./5e4400.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e0d3c(heap) {
  if ((regs.edi >>> 0) === 0xffffffff) {
    const window = regs.esi >>> 0;
    heap.setU32(window + 0x14, (heap.u32(window + 0x14) | (1 << 3)) >>> 0);
    regs.eax = (heap.u16(0x005f54e8) + 0x5fb4) >>> 0;
    heap.setU32(0x0099fdaa, regs.eax);
    return regs.eax >>> 0;
  }
  FUN_005e4400(heap);
  return regs.eax >>> 0;
}

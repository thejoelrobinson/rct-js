// @manual — do not regenerate.
// Source: decompiled/c/5e0c7e.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b_exact } from "./5e3b2b.js";
import { FUN_005e3c3c_exact } from "./5e3c3c.js";
import { FUN_005e412c_exact } from "./5e412c.js";
import { FUN_005e0c7e_frozen } from "./frozen_5e0c7e.js";
import { state } from "../../runtime/win32/context.js";

const REGISTER_NAMES = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];

export function FUN_005e0c7e_exact(heap) {
  const saved = REGISTER_NAMES.map(name => regs[name]);
  try {
    regs.ecx = ((regs.ecx & 0xffffff00) | 0x16) >>> 0;
    regs.edx = regs.edx & 0xffff0000;
    regs.cf = 0;
    regs.zf = 1;
    regs.sf = 0;
    regs.of = 0;
    FUN_005e3b2b_exact(heap);
    if (!regs.zf) return regs.eax >>> 0;
    regs.ecx = 0x16;
    regs.ebx = 0x440034;
    regs.edx = 0x5e0cb6;
    regs.ebp = 0x5e0d3c;
    FUN_005e3c3c_exact(heap);
    heap.setU32(regs.esi + 0x1c, 0x0099fd70);
    heap.setU32(regs.esi + 0xc, heap.u32(regs.esi + 0xc) | 0x34);
    FUN_005e412c_exact(heap);
  } finally {
    REGISTER_NAMES.forEach((name, index) => { regs[name] = saved[index]; });
  }
  return regs.eax >>> 0;
}

export function FUN_005e0c7e(heap) {
  if (globalThis.__forceFrozenToolbarBatch) return FUN_005e0c7e_frozen(heap);
  if (globalThis.__realStartup || state.executionMode === "pure-js") return FUN_005e0c7e_exact(heap);
  return FUN_005e0c7e_frozen(heap);
}

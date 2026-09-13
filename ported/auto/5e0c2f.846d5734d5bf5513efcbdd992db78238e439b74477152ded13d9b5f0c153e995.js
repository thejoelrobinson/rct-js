// @manual — do not regenerate.
// Source: decompiled/c/5e0c2f.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { FUN_005e43de_exact } from "./5e43de.js";
import { FUN_005e68e2_exact } from "./5e68e2.js";
import { FUN_005e0c2f_frozen } from "./frozen_5e0c2f.js";

function compareByte(left, right) {
  const result = (left - right) & 0xff;
  regs.cf = left < right ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7;
  regs.of = ((left ^ right) & (left ^ result)) >>> 7;
}

function incrementByte(heap, address) {
  const carry = regs.cf;
  const before = heap.u8(address);
  const result = (before + 1) & 0xff;
  heap.setU8(address, result);
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7;
  regs.of = before === 0x7f ? 1 : 0;
  regs.cf = carry;
}

export function FUN_005e0c2f_exact(heap) {
  const savedEsi = regs.esi >>> 0;
  const savedEdi = regs.edi >>> 0;
  const nesting = heap.u8(0x0099fde0);
  compareByte(nesting, 0);
  if (regs.zf) {
    try {
      FUN_005e68e2_exact(heap);
      if (!regs.cf) {
        regs.edi = heap.u32(regs.esi + 8);
        const flagsAddress = (regs.edi + 0x12) >>> 0;
        const flags = heap.u16(flagsAddress);
        regs.cf = flags >>> 7 & 1;
        heap.setU16(flagsAddress, flags | 0x80);
        if (!regs.cf) FUN_005e43de_exact(heap);
      }
    } finally {
      regs.esi = savedEsi;
      regs.edi = savedEdi;
    }
  }
  incrementByte(heap, 0x0099fde0);
  return regs.eax >>> 0;
}

export function FUN_005e0c2f(heap) {
  if (globalThis.__forceFrozenToolbarBatch) return FUN_005e0c2f_frozen(heap);
  if (globalThis.__realStartup || state.executionMode === "pure-js") return FUN_005e0c2f_exact(heap);
  return FUN_005e0c2f_frozen(heap);
}

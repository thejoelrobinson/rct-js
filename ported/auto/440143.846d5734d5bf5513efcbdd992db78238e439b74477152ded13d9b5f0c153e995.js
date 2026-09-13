// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440143.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { peepStatus } from "./peep-status.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00440143(heap) {
  // The old translated table expression reads a dword at a mis-scaled address
  // and can jump into unrelated ride painters. Preserve the frozen force-load
  // fixture; real startup uses the byte state and complete original branches.
  if (globalThis.__realStartup) return peepStatus(heap);
  let in_EAX = regs.eax >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32((0x0062d44c) + (heap.u32(((0x00743bbf) & 0xff) + ((in_EAX & 0xffff) * 0x100) * 4)) * 4)));
}

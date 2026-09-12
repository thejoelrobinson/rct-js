import { regs } from "../../runtime/regs.js";
import { compare, word, resumeUiNative } from "./extra_ui_state.js";
import { initializeViewportExact, viewportEventExact } from "./extra_ui_selection.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_0042afb5 } from "./42afb5.js";
import { dispatchToolbarEventExact } from "./42a830.js";
import { FUN_005e0d3c } from "./5e0d3c.js";
import { FUN_005e0cb6 } from "./5e0cb6.js";
import { FUN_00430326 } from "./430326.js";
import { createWindowExact, canCreateWindowJs } from "./extra_window_lifecycle.js";

const sign = value => value << 16 >> 16;

function preserve(names, body) {
  const saved = names.map(name => regs[name]);
  try { return body(); }
  finally { names.forEach((name, index) => { regs[name] = saved[index]; }); }
}

function invokeTooltipCreation(heap, address) {
  if (address === 0x42b076) return viewportEventExact();
  if (address === 0x458bcf) return FUN_00458bcf(heap);
  if (address === 0x458a7c) return FUN_00458a7c(heap);
  if (address === 0x5e3f31 && canCreateWindowJs(heap, { regs })) return createWindowExact(heap);
  if (regs.edi >>> 0 === 0xffffffff) {
    if (address === 0x42b079) return initializeViewportExact();
    if (address === 0x42afb5) return FUN_0042afb5(heap);
    if (address === 0x5e0d3c) return FUN_005e0d3c(heap);
    if (address === 0x5e37e6) { compare(regs.edi >>> 0, 0xffffffff, 32); return; }
  }
  if ((regs.ebp & 0xffff) === 18) {
    if (address === 0x42a830) return dispatchToolbarEventExact(heap);
    if (address === 0x430326) return FUN_00430326(heap);
    if (address === 0x5e0cb6) return FUN_005e0cb6(heap);
  }
  return resumeUiNative(heap, address);
}

export function continueTooltipCreationExact(heap, invoke = invokeTooltipCreation) {
  preserve(["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"], () => {
    regs.edi = 0xffffffff;
    word("eax", 0xffff);
    invoke(heap, heap.u32(regs.esi));
  });
  compare(heap.u16(regs.edi + 14), 0xffff);
  if (regs.zf) return;
  regs.ecx = ((regs.ecx & 0xffffff00) | heap.u8(regs.esi + 0x174)) >>> 0;
  heap.setU8(0x991f49, regs.ecx);
  word("ecx", heap.u16(regs.esi + 0x30));
  heap.setU16(0x991f4a, regs.ecx);
  heap.setU16(0x991f4c, regs.edx);
  preserve(["eax", "ebx", "ecx", "edx", "edi"], () => {
    word("eax", regs.edx);
    word("ebp", 18);
    invoke(heap, heap.u32(regs.esi + 4));
    compare(regs.eax & 0xffff, 0xffff);
  });
  if (regs.zf) return;
  const cursorX = regs.eax & 0xffff;
  const cursorY = regs.ebx & 0xffff;
  const widget = regs.edi;
  preserve(["eax", "ebx", "edx", "edi", "esi"], () => {
    regs.eax = heap.u16(regs.edi + 14);
    regs.edi = 0x99a888;
    regs.ecx = 0x971e86;
    invoke(heap, 0x458bcf);
    heap.setU16(0x971e84, 0xe0);
    regs.esi = 0x99a888;
    invoke(heap, 0x458a7c);
    const measured = regs.ecx & 0xffff;
    regs.ebx = 0xe0000 | ((measured + 4) & 0xffff);
    if ((regs.ebx & 0xffff) > 200) {
      const quotient = Math.floor(measured / 171);
      if (quotient > 255) throw new Error("DIV r/m8 overflow");
      regs.ebx = (Math.imul((quotient + 1) & 255, 0xa0000) + 0x400c8) >>> 0;
    }
    regs.esi = 0x99a888;
    while (heap.u8(regs.esi)) {
      if (heap.u8(regs.esi) === 5) {
        regs.ebx = (regs.ebx + 0xa0000) >>> 0;
        word("ebx", ((regs.ebx + 50) & 0xffff) >>> 1);
      }
      regs.esi = (regs.esi + 1) >>> 0;
    }
    heap.setU16(0x9a15ac, regs.ebx);
    heap.setU16(0x9a15b0, regs.ebx >>> 16);
    let top = (cursorY + 26) & 0xffff;
    if (sign(top) < 22) top = 22;
    const bottomLimit = (heap.u16(0x971ed8) - 32) & 0xffff;
    if (sign(top) > sign(bottomLimit)) {
      top = (top - 60) & 0xffff;
      if (sign(top) > sign(bottomLimit)) top = bottomLimit;
    }
    let left = (cursorX - ((regs.ebx & 0xffff) >>> 1)) & 0xffff;
    if (sign(left) < 0) left = 0;
    const rightLimit = (heap.u16(0x971ed6) - (regs.ebx & 0xffff)) & 0xffff;
    compare(left, rightLimit);
    if (sign(left) > sign(rightLimit)) left = rightLimit;
    regs.eax = ((top << 16) | left) >>> 0;
    regs.ecx = 0x205;
    regs.edx = 0x5e3861;
    regs.ebp = 0x5e37e6;
    invoke(heap, 0x5e3f31);
    heap.setU32(regs.esi + 0x1c, 0x9a15a8);
    regs.edi = widget;
    word("eax", heap.u16(regs.edi + 14));
    heap.setU16(regs.esi + 0x15a, regs.eax);
    regs.eax = heap.u32(0x971e86);
    heap.setU32(regs.esi + 0x15c, regs.eax);
    regs.eax = heap.u32(0x971e8a);
    heap.setU32(regs.esi + 0x160, regs.eax);
  });
  heap.setU16(0x991f54, 0);
}

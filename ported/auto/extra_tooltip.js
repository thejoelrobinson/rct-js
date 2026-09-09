import { regs } from "../../runtime/regs.js";
import { compare, logic, word, resumeUiNative } from "./extra_ui_state.js";
import { FUN_005e5b80_exact } from "./5e5b80.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { continueTooltipCreationExact } from "./extra_tooltip_creation.js";

function invokeTooltipContinuation(heap, address) {
  if (address === 0x430326 || address === 0x5e5bd8) return callIndirect(heap, address);
  if (address === 0x5e3663) return continueTooltipCreationExact(heap);
  return resumeUiNative(heap, address);
}

export function tooltipInputRuntime(heap) {
  return tooltipInputExact(heap, invokeTooltipContinuation);
}

export function showTooltipRuntime(heap) {
  return showTooltipExact(heap, invokeTooltipContinuation);
}

export function resetTooltipExact(heap, invoke = resumeUiNative) {
  regs.ecx = ((regs.ecx & 0xffffff00) | 5) >>> 0;
  word("edx", 0);
  logic(0);
  FUN_005e5b80_exact(heap, invoke);
  heap.setU16(0x991f52, 0);
  heap.setU8(0x991f49, 0xff);
}

export function showTooltipExact(heap, invoke = resumeUiNative) {
  logic(regs.esi >>> 0, 32);
  if (regs.zf) return;
  compare(regs.edx >>> 0, 0xffffffff, 32);
  if (!regs.zf) return invoke(heap, 0x5e3663);
}

export function tooltipInputExact(heap, invoke = resumeUiNative) {
  compare(heap.u8(0x991f36), 0, 8);
  if (regs.zf) {
    heap.setU16(0x991f4e, regs.eax);
    heap.setU16(0x991f50, regs.ebx);
    heap.setU16(0x991f52, 0);
    heap.setU8(0x991f49, 0xff);
    heap.setU8(0x991f36, 1);
    const flags = heap.u32(0x991f30);
    regs.cf = flags >>> 4 & 1;
    heap.setU32(0x991f30, flags & ~16);
  }
  const mode = regs.ecx & 0xffff;
  compare(mode, 1);
  if (regs.zf) return invoke(heap, 0x5e2d13);
  compare(mode, 3);
  if (regs.zf) return invoke(heap, 0x5e2c95);
  compare(mode, 0);
  if (!regs.zf) return;
  logic(regs.esi >>> 0, 32);
  if (!regs.zf) {
    compare(regs.edx & 0xffff, 0xffff);
    if (!regs.zf) {
      compare(heap.u8(regs.edi), 0x11, 8);
      if (regs.zf) {
        const names = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];
        const saved = names.map(name => regs[name]);
        try {
          invoke(heap, 0x5e34d7);
          logic(regs.ecx & 0xffff);
          if (regs.zf) {
            word("ecx", regs.eax);
            const numerator = regs.edx & 0xffff;
            word("eax", Math.floor(numerator / 0x12));
            word("edx", regs.ebx);
            logic(0);
            word("ebp", 0xe);
            invoke(heap, heap.u32(regs.esi + 4));
          }
        } finally { names.forEach((name, index) => { regs[name] = saved[index]; }); }
      }
    }
  }
  compare(heap.u8(0x991f49), 0xff, 8);
  if (!regs.zf) {
    regs.ecx = ((regs.ecx & 0xffffff00) | heap.u8(0x991f49)) >>> 0;
    compare(regs.ecx & 255, heap.u8(regs.esi + 0x174), 8);
    if (regs.zf) {
      word("ecx", heap.u16(0x991f4a));
      compare(regs.ecx & 0xffff, heap.u16(regs.esi + 0x30));
      if (regs.zf) compare(regs.edx & 0xffff, heap.u16(0x991f4c));
      if (regs.zf) {
        word("ebp", heap.u16(0x999f98));
        heap.setU16(0x991f52, heap.u16(0x991f52) + (regs.ebp & 0xffff));
        compare(heap.u16(0x991f52), 0x1770);
        if (regs.cf) return;
        regs.ecx = ((regs.ecx & 0xffffff00) | 5) >>> 0;
        word("edx", 0);
        logic(0);
        return FUN_005e5b80_exact(heap, invoke);
      }
    }
    return resetTooltipExact(heap, invoke);
  }
  compare(heap.u16(0x991f54), 500);
  let accumulate = !!regs.cf;
  if (!accumulate) {
    compare(regs.eax & 0xffff, heap.u16(0x991f4e));
    if (regs.zf) compare(regs.ebx & 0xffff, heap.u16(0x991f50));
    accumulate = !!regs.zf;
  }
  if (accumulate) {
    word("ebp", heap.u16(0x999f98));
    heap.setU16(0x991f52, heap.u16(0x991f52) + (regs.ebp & 0xffff));
    word("ebp", 1000);
    compare(heap.u16(0x991f54), 1000);
    if (regs.cf || regs.zf) word("ebp", 0);
    compare(regs.ebp & 0xffff, heap.u16(0x991f52));
    if (!regs.cf && !regs.zf) return;
    showTooltipExact(heap, invoke);
  }
  heap.setU16(0x991f52, 0);
  heap.setU16(0x991f4e, regs.eax);
  heap.setU16(0x991f50, regs.ebx);
}

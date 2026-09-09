import { regs } from "../../runtime/regs.js";
import { compare, logic, word, resumeUiNative } from "./extra_ui_state.js";
import { FUN_005e3b2b_exact } from "./5e3b2b.js";
import { FUN_005e5301_exact } from "./5e5301.js";
import { FUN_0042afb5 } from "./42afb5.js";
import { FUN_005e0d3c } from "./5e0d3c.js";
import { FUN_005e0cb6 } from "./5e0cb6.js";
import { FUN_00430326 } from "./430326.js";
import { dispatchToolbarEventExact } from "./42a830.js";
import { FUN_005e3861_exact } from "./5e3861.js";

const names = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];
const signed = value => value << 16 >> 16;

function preserve(registers, body) {
  const saved = registers.map(name => regs[name]);
  try { return body(); }
  finally { registers.forEach((name, index) => { regs[name] = saved[index]; }); }
}

function byte(name, value) {
  regs[name] = ((regs[name] & 0xffffff00) | (value & 255)) >>> 0;
}

export function runSelectionEntry(heap, address, implementation) {
  if (globalThis[`__forceInterp${address.toString(16)}`]) resumeUiNative(heap, address);
  else implementation(heap);
  return regs.eax >>> 0;
}

export function initializeViewportExact() {
  if (regs.edi >>> 0 !== 0xffffffff) throw new Error("viewport initialization requires EDI=-1");
  compare(regs.edi >>> 0, 0xffffffff, 32);
  return regs.eax >>> 0;
}

export function viewportEventExact() {
  return regs.eax >>> 0;
}

function invokeSelection(heap, address) {
  if (address === 0x42b076) return viewportEventExact();
  if (address === 0x5e687d) return cancelToolExact(heap);
  if (address === 0x5e3874) return hitTestWidgetExact(heap);
  if (address === 0x5e5301) return FUN_005e5301_exact(heap);
  if (address === 0x5e3b2b) return FUN_005e3b2b_exact(heap);
  if (address === 0x4363f1 || address === 0x43642b) {
    const mask = address === 0x4363f1 ? 1 : 2;
    if (!(heap.u16(0x99a020) & mask)) { logic(0); return; }
  }
  if (regs.edi >>> 0 === 0xffffffff) {
    if (address === 0x42b079) return initializeViewportExact();
    if (address === 0x5e37e6) { compare(regs.edi >>> 0, 0xffffffff, 32); return; }
    if (address === 0x42afb5) return FUN_0042afb5(heap);
    if (address === 0x5e0d3c) return FUN_005e0d3c(heap);
  }
  if ((regs.ebp & 0xffff) === 2) {
    if (address === 0x42a830) return dispatchToolbarEventExact(heap);
    if (address === 0x430326) return FUN_00430326(heap);
    if (address === 0x5e0cb6) return FUN_005e0cb6(heap);
    if (address === 0x5e3861) return FUN_005e3861_exact(heap);
  }
  return resumeUiNative(heap, address);
}

export function selectToolExact(heap, invoke = invokeSelection) {
  regs.cf = heap.u32(0x991f30) >>> 3 & 1;
  if (regs.cf) {
    byte("ecx", heap.u8(regs.esi + 0x174));
    compare(regs.ecx & 255, heap.u8(0x991f5a), 8);
    if (regs.zf) {
      word("ecx", heap.u16(regs.esi + 0x30));
      compare(regs.ecx & 0xffff, heap.u16(0x991f58));
      if (regs.zf) {
        compare(regs.edx & 0xffff, heap.u16(0x991f5c));
        if (regs.zf) { invoke(heap, 0x5e687d); regs.cf = 1; return regs.eax >>> 0; }
      }
    }
    invoke(heap, 0x5e687d);
  }
  regs.cf = heap.u32(0x991f30) >>> 3 & 1;
  heap.setU32(0x991f30, heap.u32(0x991f30) | 8);
  regs.cf = heap.u32(0x991f30) >>> 6 & 1;
  heap.setU32(0x991f30, heap.u32(0x991f30) & ~64);
  heap.setU8(0x991f5b, regs.eax);
  heap.setU16(0x991f5c, regs.edx);
  byte("eax", heap.u8(regs.esi + 0x174));
  heap.setU8(0x991f5a, regs.eax);
  word("eax", heap.u16(regs.esi + 0x30));
  heap.setU16(0x991f58, regs.eax);
  logic(regs.eax & 0xffff);
  return regs.eax >>> 0;
}

export function cancelToolExact(heap, invoke = invokeSelection) {
  regs.cf = heap.u32(0x991f30) >>> 3 & 1;
  heap.setU32(0x991f30, heap.u32(0x991f30) & ~8);
  if (!regs.cf) return regs.eax >>> 0;
  preserve(names, () => {
    invoke(heap, 0x4363f1);
    invoke(heap, 0x43642b);
    heap.setU16(0x99a020, 0);
    compare(heap.u16(0x991f5c), 0);
    if (regs.sf !== regs.of) return;
    byte("eax", heap.u8(0x991f5a) | 0x80);
    logic(regs.eax & 255, 8);
    word("ebx", heap.u16(0x991f58));
    regs.eax = ((regs.eax & 0xffff00ff) | (heap.u8(0x991f5c) << 8)) >>> 0;
    invoke(heap, 0x5e5301);
    byte("ecx", heap.u8(0x991f5a));
    word("edx", heap.u16(0x991f58));
    invoke(heap, 0x5e3b2b);
    if (regs.zf) return;
    word("edx", heap.u16(0x991f5c));
    word("ebp", 11);
    invoke(heap, heap.u32(regs.esi + 4));
  });
  return regs.eax >>> 0;
}

export function hitTestWidgetExact(heap, invoke = invokeSelection) {
  preserve(["ecx", "ebp"], () => {
    preserve(["eax", "ebx"], () => {
      regs.edi = 0xffffffff;
      word("eax", 0xffff);
      invoke(heap, heap.u32(regs.esi));
    });
    regs.edi = heap.u32(regs.esi + 0x1c);
    let descriptor = regs.edi;
    regs.edx = 0;
    regs.ebp = 0xffffffff;
    while (heap.u8(regs.edi) !== 21) {
      const kind = heap.u8(regs.edi);
      const disabled = heap.u32(regs.esi + 0x10 + ((regs.edx >>> 5) * 4)) >>> (regs.edx & 31) & 1;
      if (kind && !disabled &&
          signed(regs.eax) >= signed(heap.u16(regs.edi + 2) + heap.u16(regs.esi + 0x20)) &&
          signed(regs.eax) <= signed(heap.u16(regs.edi + 4) + heap.u16(regs.esi + 0x20)) &&
          signed(regs.ebx) >= signed(heap.u16(regs.edi + 6) + heap.u16(regs.esi + 0x22)) &&
          signed(regs.ebx) <= signed(heap.u16(regs.edi + 8) + heap.u16(regs.esi + 0x22))) {
        descriptor = regs.edi;
        regs.ebp = regs.edx;
      }
      regs.edx = (regs.edx + 1) >>> 0;
      regs.edi = (regs.edi + 16) >>> 0;
    }
    regs.edi = descriptor;
    regs.edx = regs.ebp;
    compare(regs.edx, 0xffffffff, 32);
    if (regs.zf) return;
    compare(heap.u8(regs.edi), 11, 8);
    if (!regs.zf) return;
    regs.cf = regs.edi > 0xffffffef ? 1 : 0;
    regs.edi = (regs.edi + 16) >>> 0;
    const before = regs.edx;
    regs.edx = (before + 1) >>> 0;
    regs.zf = regs.edx === 0 ? 1 : 0;
    regs.sf = regs.edx >>> 31;
    regs.of = before === 0x7fffffff ? 1 : 0;
  });
  return regs.eax >>> 0;
}

export function hitTestWindowExact(heap, invoke = invokeSelection) {
  regs.esi = heap.u32(0x9a1164);
  for (;;) {
    regs.esi = (regs.esi - 0x178) >>> 0;
    if (regs.esi < 0x9a013c) { regs.esi = 0; logic(0, 32); return regs.eax >>> 0; }
    word("edx", heap.u16(regs.esi + 0x20));
    if (signed(regs.eax) < signed(regs.edx)) continue;
    word("edx", regs.edx + heap.u16(regs.esi + 0x24));
    if (signed(regs.eax) >= signed(regs.edx)) continue;
    word("edx", heap.u16(regs.esi + 0x22));
    if (signed(regs.ebx) < signed(regs.edx)) continue;
    word("edx", regs.edx + heap.u16(regs.esi + 0x26));
    if (signed(regs.ebx) >= signed(regs.edx)) continue;
    logic(heap.u16(regs.esi + 0x32) & 32);
    if (!regs.zf) {
      preserve(["edi"], () => invoke(heap, 0x5e3874));
      compare(regs.edx >>> 0, 0xffffffff, 32);
      if (regs.zf) continue;
    }
    preserve(names, () => {
      word("ebp", 2);
      invoke(heap, heap.u32(regs.esi + 4));
      logic(regs.esi >>> 0, 32);
    });
    if (!regs.zf) return regs.eax >>> 0;
    regs.esi = heap.u32(0x9a1164);
  }
}

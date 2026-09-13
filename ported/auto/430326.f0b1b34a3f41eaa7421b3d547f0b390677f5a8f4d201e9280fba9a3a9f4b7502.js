// @manual — do not regenerate.
import { regs } from "../../runtime/regs.js";
import { compare, logic, word, resumeUiNative } from "./extra_ui_state.js";
import { invalidateWindowExact } from "./extra_window_lifecycle.js";
import { resetTooltipExact } from "./extra_tooltip.js";

function rowAtCursor(heap) {
  regs.ebp = 0x99c16c;
  regs.ebx = 0;
  logic(0, 32);
  while (true) {
    compare(heap.u8(regs.ebp), 0, 8);
    if (!regs.zf) {
      compare(regs.edx & 0xffff, 24);
      word("edx", regs.edx - 24);
      if (regs.cf) return true;
    }
    regs.ebx = (regs.ebx + 1) >>> 0;
    regs.ebp = (regs.ebp + 16) >>> 0;
    compare(regs.ebx & 0xffff, 128);
    if (!regs.cf) return false;
  }
}

function locked(heap) {
  compare(regs.ebx >>> 0, 32, 32);
  if (!regs.cf) return false;
  regs.cf = heap.u32(0x99fb78) >>> regs.ebx & 1;
  return !!regs.cf;
}

function decrement(heap, address) {
  const value = heap.u16(address);
  const carry = regs.cf;
  compare(value, 1);
  regs.cf = carry;
  heap.setU16(address, value - 1);
}

function sound(heap, id, invoke) {
  word("ebp", (heap.u16(regs.esi + 0x24) >>> 1) + heap.u16(regs.esi + 0x20));
  const half = heap.u16(regs.esi + 0x24) >>> 1;
  const left = heap.u16(regs.esi + 0x20);
  const sum = (half + left) & 0xffff;
  regs.cf = half + left > 0xffff ? 1 : 0;
  regs.zf = sum === 0 ? 1 : 0;
  regs.sf = sum >>> 15;
  regs.of = (~(half ^ left) & (half ^ sum)) >>> 15 & 1;
  regs.ebp = (sum << 16 >> 16) >>> 0;
  const saved = [regs.eax, regs.ebx];
  regs.ebx = regs.ebp;
  regs.eax = id;
  try { invoke(heap, 0x452fce); }
  finally { [regs.eax, regs.ebx] = saved; }
}

export function FUN_00430326(heap, invoke = resumeUiNative) {
  const event = regs.ebp & 0xffff;
  compare(event, [1, 6, 12, 13, 14].includes(event) ? event : 14);
  if (event === 1) {
    compare(regs.edx & 0xffff, 2);
    if (regs.zf) return invoke(heap, 0x5e5bd8);
  } else if (event === 12) {
    word("edx", 0);
    regs.ebx = 0x99c16c;
    do {
      if (heap.u8(regs.ebx)) word("edx", regs.edx + 24);
      regs.ebx = (regs.ebx + 16) >>> 0;
    } while (regs.ebx < 0x99c96c);
    compare(regs.ebx, 0x99c96c, 32);
  } else if (event === 13) {
    if (!rowAtCursor(heap) || locked(heap)) return;
    heap.setU16(regs.esi + 0x15a, regs.ebx);
    heap.setU16(regs.esi + 0x15e, 4);
    invalidateWindowExact(heap);
    sound(heap, 4, invoke);
  } else if (event === 14) {
    compare(regs.ecx & 0xffff, 0x179);
    if ((!regs.cf && !regs.zf) || !rowAtCursor(heap)) {
      word("eax", 0xffff);
    } else if (locked(heap)) {
      word("eax", 0xb0e);
    } else {
      heap.setU16(regs.esi + 0x15c, regs.ebx);
      heap.setU16(regs.esi + 0x160, 5);
      invalidateWindowExact(heap);
      regs.eax = heap.u16(regs.esi + 0x15c);
      compare(regs.eax, 32, 32);
      if (!regs.cf) word("eax", 0xffff);
      else regs.eax = heap.u8(0x43091a + regs.eax) + 0xaf0;
    }
    compare(regs.eax & 0xffff, heap.u16(0x5f816e));
    if (regs.zf) return;
    heap.setU16(0x5f816e, regs.eax);
    const window = regs.esi;
    try { resetTooltipExact(heap, invoke); }
    finally { regs.esi = window; }
  } else if (event === 6) {
    compare(heap.u16(regs.esi + 0x15c), 0xffff);
    if (!regs.zf) {
      decrement(heap, regs.esi + 0x160);
      if (regs.zf) {
        invalidateWindowExact(heap);
        heap.setU16(regs.esi + 0x15c, 0xffff);
      }
    }
    compare(heap.u16(regs.esi + 0x15a), 0xffff);
    if (regs.zf) return;
    decrement(heap, regs.esi + 0x15e);
    if (!regs.zf) return;
    invalidateWindowExact(heap);
    sound(heap, 5, invoke);
    const selected = heap.u16(regs.esi + 0x15a);
    heap.setU16(regs.esi + 0x15a, 0xffff);
    word("eax", selected);
    const window = regs.esi;
    try { invoke(heap, 0x43054e); }
    finally { regs.esi = window; }
  }
}

import { regs } from "../../runtime/regs.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_0042afb5 } from "./42afb5.js";
import { FUN_005e0d3c } from "./5e0d3c.js";
import { FUN_005e0cb6 } from "./5e0cb6.js";
import { FUN_005e117d_exact } from "./5e117d.js";
import { FUN_005e3861_exact } from "./5e3861.js";
import { compare } from "./extra_ui_state.js";
import { initializeViewportExact } from "./extra_ui_selection.js";

const POOL = 0x9a013c;
const END = 0x9a1164;
const STRIDE = 0x178;
const REGISTER_NAMES = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];

function saveRegisters() {
  return REGISTER_NAMES.map((name) => regs[name]);
}

function restoreRegisters(saved) {
  REGISTER_NAMES.forEach((name, index) => { regs[name] = saved[index]; });
}

function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

function logic(value, width = 32) {
  regs.cf = 0; regs.of = 0;
  regs.zf = value === 0 ? 1 : 0;
  regs.sf = value >>> (width - 1) & 1;
}

function toolMatches(heap) {
  return (heap.u32(0x991f30) & 8) !== 0 && heap.u8(0x991f5a) === 1 && heap.u16(0x991f5c) === 9;
}

export function canCloseWindowJs(heap, window) {
  return window === 0 || heap.u32(window + 4) === 0x5e3861 || (heap.u32(window + 4) === 0x5e0cb6 && !toolMatches(heap));
}

function evictionCandidate(heap) {
  const end = heap.u32(END);
  for (let window = POOL; window < end; window += STRIDE) {
    if ((heap.u16(window + 0x32) & 0x103) === 0) return window;
  }
  throw new Error("window pool has no evictable window");
}

export function canCreateWindowJs(heap, cpu) {
  const procedure = cpu.regs.ebp >>> 0;
  if (procedure !== 0x42afb5 && procedure !== 0x5e0d3c && procedure !== 0x5e37e6) return false;
  if (heap.u32(END) < END) return true;
  return canCloseWindowJs(heap, evictionCandidate(heap));
}

function invokeProcedure(heap, address) {
  if (address === 0x452fce) return FUN_00452fce(heap);
  if (regs.edi >>> 0 === 0xffffffff) {
    if (address === 0x42b079) return initializeViewportExact();
    if (address === 0x5e37e6) { compare(regs.edi >>> 0, 0xffffffff, 32); return; }
    if (address === 0x42afb5) return FUN_0042afb5(heap);
    if (address === 0x5e0d3c) return FUN_005e0d3c(heap);
  }
  if (address === 0x5e0cb6 && (regs.ebp & 0xffff) === 0 && !toolMatches(heap)) return FUN_005e0cb6(heap);
  if (address === 0x5e3861) return FUN_005e3861_exact(heap);
  throw new Error(`unverified JS window callback 0x${address.toString(16)}`);
}

export function invalidateWindowExact(heap) {
  const window = regs.esi >>> 0;
  logic(window);
  if (!window) return regs.eax >>> 0;
  const saved = saveRegisters();
  try {
    word("eax", heap.u16(window + 0x20));
    word("ebx", heap.u16(window + 0x22));
    word("edx", heap.u16(window + 0x24) + regs.eax);
    word("ebp", heap.u16(window + 0x26) + regs.ebx);
    FUN_005e117d_exact(heap);
  } finally { restoreRegisters(saved); }
  return regs.eax >>> 0;
}

export function closeWindowExact(heap, invoke = invokeProcedure) {
  logic(regs.esi >>> 0);
  if (!(regs.esi >>> 0)) return regs.eax >>> 0;
  const saved = saveRegisters();
  try {
    regs.ecx = ((regs.ecx & 0xffffff00) | heap.u8(regs.esi + 0x174)) >>> 0;
    word("edx", heap.u16(regs.esi + 0x30));
    const identifier = regs.edx & 0xffff;
    const kind = regs.ecx & 0xffff;
    word("ebp", 0);
    invoke(heap, heap.u32(regs.esi + 4));
    word("ecx", kind & ~0x80);
    word("edx", identifier);
    let window = POOL;
    const end = heap.u32(END);
    for (; window < end; window += STRIDE) {
      if (heap.u8(window + 0x174) === (kind & 0x7f) && ((kind & 0x80) || heap.u16(window + 0x30) === identifier)) break;
    }
    if (window >= end) throw new Error("closing callback removed its own window");
    regs.esi = window;
    const viewport = heap.u32(window + 8);
    heap.setU32(window + 8, 0);
    if (viewport) heap.setU16(viewport, 0);
    invalidateWindowExact(heap);
    const nextEnd = (heap.u32(END) - STRIDE) >>> 0;
    heap.setU32(END, nextEnd);
    const length = (nextEnd - window) | 0;
    if (length > 0) {
      if (regs.df) {
        for (let offset = 0; offset < (length >>> 1) * 2; offset += 2) {
          heap.setU16(window - offset, heap.u16(window + STRIDE - offset));
        }
      } else heap.bytes.copyWithin(window, window + STRIDE, nextEnd + STRIDE);
    }
    let output = 0x9a121c;
    for (let viewport = 0x9a1168; viewport < 0x9a121c; viewport += 0x14) {
      if (heap.u16(viewport)) { heap.setU32(output, viewport); output += 4; }
    }
    heap.setU32(output, 0);
    logic(0);
  } finally { restoreRegisters(saved); }
  return regs.eax >>> 0;
}

export function createWindowExact(heap, invoke = invokeProcedure) {
  while (heap.u32(END) >= END) {
    regs.esi = evictionCandidate(heap);
    logic(0, 16);
    closeWindowExact(heap, invoke);
  }
  const end = heap.u32(END);
  let window = end;
  const options = regs.ecx >>> 0;
  if (options & 0x100) {
    while (window !== POOL) {
      const flags = heap.u16(window - STRIDE + 0x32);
      if (!(flags & 2) && (flags & 1)) break;
      window -= STRIDE;
    }
  } else if (!(options & 0x200)) {
    while (window !== POOL && (heap.u16(window - STRIDE + 0x32) & 2)) window -= STRIDE;
  }
  if (window !== end) heap.bytes.copyWithin(window + STRIDE, window, end);
  regs.esi = window;
  heap.setU8(window + 0x174, options & 0xff);
  heap.setU8(window + 0x175, 0xff);
  heap.setU16(window + 0x32, options >>> 8);
  logic(options & 0x300);
  if (!(options & 0x300)) {
    heap.setU16(window + 0x32, heap.u16(window + 0x32) | 0x600);
    const saved = saveRegisters();
    try {
      const halfWidth = (regs.ebx & 0xffff) >>> 1;
      const left = regs.eax & 0xffff;
      const center = (halfWidth + left) & 0xffff;
      regs.cf = halfWidth + left > 0xffff ? 1 : 0;
      regs.zf = center === 0 ? 1 : 0; regs.sf = center >>> 15;
      regs.of = (~(halfWidth ^ left) & (halfWidth ^ center)) >>> 15 & 1;
      regs.ebp = (center << 16 >> 16) >>> 0;
      regs.ebx = regs.ebp;
      regs.eax = 0x28;
      invoke(heap, 0x452fce);
    } finally { restoreRegisters(saved); }
  }
  heap.setU16(window + 0x30, 0);
  heap.setU32(window + 0x20, regs.eax);
  heap.setU32(window + 0x24, regs.ebx);
  heap.setU32(window + 8, 0);
  heap.setU32(window + 4, regs.edx);
  heap.setU32(window, regs.ebp);
  heap.bytes.fill(0, window + 0xc, window + 0x1c);
  heap.bytes.fill(0, window + 0x15a, window + 0x16e);
  const saved = saveRegisters();
  try {
    regs.edi = 0xffffffff;
    word("eax", 0xffff);
    invoke(heap, heap.u32(window));
  } finally { restoreRegisters(saved); }
  heap.setU32(END, (heap.u32(END) + STRIDE) >>> 0);
  return invalidateWindowExact(heap);
}

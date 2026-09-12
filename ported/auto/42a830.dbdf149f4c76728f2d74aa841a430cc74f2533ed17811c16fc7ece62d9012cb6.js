// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x42a830 is the EVENT PROC of
// the window registered by the routine at 0x429960 (`mov edx,0x42a830 ;
// mov ebp,0x42afb5 ; call 0x5e3f31` — event proc + paint proc; the sole
// reference to this address in the binary). Disassembly:
//   python3 tools/disasm-va.py 0x42a830 0x42afb5
//
// Entry: BP = event id, DX/CX = event params. The body is `jmp 0x42af5a`
// into a cmp-bp dispatch chain: events {1,2,3,4,7,8,9,0xa,0xb} jump to arms
// spread across 0x42a835..0x42b8xx (a full window-proc subsystem, ~0x1000
// bytes of button/dropdown handling, still partly unported); any other event falls
// through all nine compares to the `ret` at 0x42afb4.
//
// The frozen gameplay soak enters this proc with bp=0x12
// (unhandled event → pure fall-through, 19 interp steps/call, ~2
// calls/tick — the whole 40 steps/tick rank entry). JS ports the
// fall-through dispatch; a matched event routes through the EMBEDDED
// interpreter from entry (no side effect precedes the dispatch — the
// 4254e0/444e08 orchestrator pattern, so the lockstep oracle exercises the
// same routing production does).
//
// Exit exactness (fall-through): no register is written; the exit flags are
// those of the last compare, `cmp bp,0xb` (16-bit sub), replicated on the
// painter cpu.
//
// Real startup uses dispatchToolbarEventExact: event routing, refresh and
// selection tests are JS; unported action tails are explicit continuations.
// Oracle: test/runtime/toolbar_event_42a830.test.js and toolbar_event_live.test.js.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { step, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";
import { FUN_005e5ca6_exact } from "./5e5ca6.js";
import { FUN_005e5301_exact } from "./5e5301.js";
import { FUN_005e687d } from "./5e687d.js";
import { FUN_005e680e } from "./5e680e.js";
import { FUN_005e0c2f_exact } from "./5e0c2f.js";
import { FUN_00424db7_exact } from "./424db7.js";
import { FUN_005e0c7e_exact } from "./5e0c7e.js";
import { FUN_004363f1_exact } from "./4363f1.js";
import { FUN_00431510_exact } from "./431510.js";
import { FUN_005e3ace } from "./5e3ace.js";
import { FUN_005e3874 } from "./5e3874.js";
import { FUN_00426f56 } from "./426f56.js";

const ADDR = 0x0042a830;
const HANDLED = new Set([1, 2, 3, 4, 7, 8, 9, 0xa, 0xb]);

// Byte-exact interpreter run of the real body from the current cpu state,
// with any eip hook at ADDR lifted (the 4254e0 runInterpBody pattern). The
// run executes the body's real `ret`; the caller (wiring hook / oracle)
// restores esp and simulates the final ret itself.
function runInterpBody(heap, cpu, address = ADDR) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = address;
  let n = 0;
  try {
    while ((cpu.regs.esp >>> 0) <= entryEsp) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("42a830: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

export function FUN_0042a830(heap) {
  if (globalThis.__realStartup) return dispatchToolbarEventExact(heap, resumeToolbarAction);
  const bp = regs.ebp & 0xffff;
  if (HANDLED.has(bp)) {
    // ---- matched event: unported arm — embedded interpreter from entry ----
    const cpu = state.__painterCpu;
    if (!cpu) throw new Error("42a830: painter-bridge cpu not installed");
    cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0;
    cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
    if (typeof regs.esp === "number") cpu.regs.esp = regs.esp >>> 0;
    const entryEsp = cpu.regs.esp >>> 0;
    const entryEip = cpu.regs.eip >>> 0;
    const entryCD = cpu.callDepth;
    try {
      runInterpBody(heap, cpu);
    } finally {
      cpu.regs.esp = entryEsp;
      cpu.regs.eip = entryEip;
      cpu.callDepth = entryCD;
    }
    regs.eax = cpu.regs.eax >>> 0; regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0; regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0; regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    return;
  }
  // ---- unhandled event: fall through the compare chain to ret (0x42afb4).
  // No register writes; exit flags = `cmp bp,0xb` (16-bit).
  const c = state.__painterCpu;
  if (c) {
    const r = (bp - 0xb) & 0xffff;
    c.eflags.CF = bp < 0xb ? 1 : 0;
    c.eflags.ZF = r === 0 ? 1 : 0;
    c.eflags.SF = (r >>> 15) & 1;
    c.eflags.OF = ((bp ^ 0xb) & (bp ^ r) & 0x8000) !== 0 ? 1 : 0;
  }
}

export function activateViewportToolExact(heap) {
  regs.cf = heap.u32(0x991f30) >>> 3 & 1;
  if (regs.cf) {
    compare(heap.u8(0x991f5a), 1, 8);
    if (regs.zf) {
      compare(heap.u16(0x991f5c), 9, 16);
      if (regs.zf) return FUN_005e687d(heap);
    }
  }
  const savedEsi = regs.esi >>> 0;
  FUN_005e0c2f_exact(heap);
  FUN_00424db7_exact(heap);
  regs.eax = ((regs.eax & 0xffffff00) | 0x12) >>> 0;
  FUN_005e680e(heap);
  regs.cf = heap.u32(0x991f30) >>> 6 & 1;
  heap.setU32(0x991f30, heap.u32(0x991f30) | 0x40);
  heap.setU16(0x5f54e8, 1);
  FUN_005e0c7e_exact(heap);
  regs.esi = savedEsi;
  return regs.eax >>> 0;
}

const CLICK_TARGETS = new Map([
  [4, 0x42a9b6], [3, 0x42a9c5], [5, 0x42a9d4], [10, 0x42a99f],
  [0, 0x42b083], [11, 0x42b350], [12, 0x42b13c], [17, 0x42b304],
  [18, 0x42b1d4], [16, 0x42b220], [13, 0x42b26c], [19, 0x42b188],
  [14, 0x42b2b8], [15, 0x42b0f0], [2, 0x42a976], [8, 0x42b375],
  [9, 0x42b3c2], [7, 0x42a96e],
]);
const PRESS_TARGETS = new Map([
  [1, 0x42b817], [6, 0x42b5a1], [11, 0x42b350], [15, 0x42b0f0],
  [17, 0x42b304], [18, 0x42b1d4], [16, 0x42b220], [12, 0x42b13c],
  [13, 0x42b26c], [19, 0x42b188], [14, 0x42b2b8],
]);
const EVENT_TARGETS = new Map([
  [1, CLICK_TARGETS], [4, PRESS_TARGETS],
  [3, new Map([[1, 0x42b74c], [6, 0x42b40f]])],
  [7, new Map([[8, 0x42aa65], [9, 0x42ab3b], [10, 0x5dedb1]])],
  [8, new Map([[8, 0x42aeb7], [9, 0x42af0c], [10, 0x5def2f]])],
  [9, new Map([[8, 0x42abe0], [9, 0x42ade9]])],
  [10, new Map([[8, 0x42af30], [9, 0x42af45]])],
]);

function compare(left, right, width = 16) {
  const result = (left - right) >>> 0;
  const sign = width - 1;
  regs.cf = left < right ? 1 : 0;
  regs.zf = (width === 32 ? result : result & ((1 << width) - 1)) === 0 ? 1 : 0;
  regs.sf = result >>> sign & 1;
  regs.of = ((left ^ right) & (left ^ result)) >>> sign & 1;
}

function logic(value, width = 16) {
  compare(value, 0, width);
  regs.cf = 0;
  regs.of = 0;
}

function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

export function refreshToolbarExact(heap) {
  const toolbar = regs.esi >>> 0;
  regs.eax = 0;
  regs.esi = 0x9a013c;
  const end = heap.u32(0x9a1164);
  while (regs.esi < end && heap.u8(regs.esi + 0x174) !== 0) regs.esi = (regs.esi + 0x178) >>> 0;
  regs.edi = regs.esi;
  regs.esi = toolbar;
  if (regs.edi >= end) {
    regs.eax = 0x38;
    logic(regs.eax, 32);
  } else {
    regs.edi = heap.u32(regs.edi + 8);
    const zoom = heap.u8(regs.edi + 0x10);
    regs.edx = ((regs.edx & 0xffffff00) | zoom) >>> 0;
    if (zoom === 0) regs.eax = 0x10;
    compare(zoom, 2, 8);
    if (zoom === 2) { regs.eax = 8; regs.cf = 0; }
  }
  const viewport = regs.edi;
  FUN_005e5ca6_exact(heap);
  regs.edi = viewport;
  const paused = heap.u8(0x99c169);
  compare(paused, 0, 8);
  const previous = heap.u32(regs.esi + 0x14);
  regs.cf = previous & 1;
  heap.setU32(regs.esi + 0x14, paused ? previous | 1 : previous & ~1);
  if (!!paused === !!regs.cf) return;
  word("eax", 0x81);
  word("ebx", 0);
  FUN_005e5301_exact(heap);
}

function rejectContinuation(heap, address) {
  throw new Error(`unported toolbar action 0x${address.toString(16)}`);
}

export function dispatchToolbarEventExact(heap, resume = rejectContinuation) {
  const event = regs.ebp & 0xffff;
  const widget = regs.edx & 0xffff;
  if (!HANDLED.has(event)) { compare(event, 0xb); return; }
  compare(event, event);
  if (event === 2) return refreshToolbarExact(heap);
  const targets = EVENT_TARGETS.get(event);
  if (!targets) return resume(heap, 0x42a97e);
  const target = targets.get(widget);
  const last = event === 1 ? 7 : event === 4 ? 14 : event === 3 ? 6 : event <= 8 ? 10 : 9;
  compare(widget, target ? widget : last);
  if (!target) return;
  if (event === 8 && widget === 9) {
    logic(heap.u16(0x99a020) & 1);
    if (!regs.zf) heap.setU8(0x991f5b, 2);
    return;
  }
  if (event === 8 && widget === 8 && !(heap.u16(0x99a020) & 1)) {
    logic(0);
    return;
  }
  return resume(heap, target);
}

export function beginLandSelectionExact(heap) {
  FUN_004363f1_exact(heap);
  compare(heap.u8(0x991f5b), 2, 8);
  if (regs.zf) return regs.eax >>> 0;
  const selection = heap.u16(0x99a020) & 0xfffe;
  heap.setU16(0x99a020, selection);
  logic(selection);
  word("edx", 0xfff6);
  FUN_00431510_exact(heap);
  compare(regs.ebx & 0xff, 0, 8);
  if (regs.zf) return regs.eax >>> 0;

  word("eax", (regs.eax & 0xffff) + 0x10);
  word("ecx", (regs.ecx & 0xffff) + 0x10);
  word("ebx", regs.ecx);
  heap.setU16(0x99a020, heap.u16(0x99a020) | 1);
  heap.setU16(0x99a02a, 5);
  word("edx", heap.u16(0x5f54e8) << 5);
  word("ecx", (regs.edx & 0xffff) - 0x20);
  word("edx", ((regs.edx & 0xffff) >>> 1) - 0x10);
  word("eax", (regs.eax & 0xffff) - (regs.edx & 0xffff));
  word("ebx", (regs.ebx & 0xffff) - (regs.edx & 0xffff));
  word("eax", regs.eax & 0xffe0);
  word("ebx", regs.ebx & 0xffe0);
  heap.setU16(0x99a022, regs.eax);
  heap.setU16(0x99a026, regs.ebx);
  word("eax", (regs.eax & 0xffff) + (regs.ecx & 0xffff));
  word("ebx", (regs.ebx & 0xffff) + (regs.ecx & 0xffff));
  heap.setU16(0x99a024, regs.eax);
  heap.setU16(0x99a028, regs.ebx);
  return FUN_004363f1_exact(heap);
}

function runLandResizeCommand(heap, command, tool) {
  const savedEsi = regs.esi >>> 0;
  word("eax", heap.u16(0x99a022));
  word("ecx", heap.u16(0x99a026));
  word("edi", heap.u16(0x99a024));
  word("ebp", heap.u16(0x99a028));
  heap.setU16(0x991efe, command);
  regs.ebx = ((regs.ebx & 0xffffff00) | 1) >>> 0;
  regs.esi = tool;
  try { return FUN_00426f56(heap); }
  finally { regs.esi = savedEsi; }
}

export function resizeLandSelectionExact(heap) {
  const savedEsi = regs.esi >>> 0;
  FUN_005e3ace(heap);
  logic(regs.esi >>> 0, 32);
  if (!regs.esi) { regs.esi = savedEsi; return regs.eax >>> 0; }
  FUN_005e3874(heap);
  compare(regs.edx & 0xffff, 0xffff);
  if (regs.zf) { regs.esi = savedEsi; return regs.eax >>> 0; }
  compare(heap.u8(regs.edi), 0x0c, 8);
  if (!regs.zf) { regs.esi = savedEsi; return regs.eax >>> 0; }
  regs.edi = heap.u32(regs.esi + 8);
  logic(regs.edi >>> 0, 32);
  if (!regs.edi) { regs.esi = savedEsi; return regs.eax >>> 0; }
  regs.ecx = ((regs.ecx & 0xffffff00) | heap.u8(regs.edi + 0x10)) >>> 0;
  word("edx", signedWordShiftRight(0xfff0, regs.ecx & 0xff));
  regs.esi = savedEsi;
  word("ebx", (regs.ebx & 0xffff) - heap.u16(0x991f44));
  compare(regs.ebx & 0xffff, regs.edx & 0xffff);
  if ((regs.sf ^ regs.of) || regs.zf) {
    heap.setU16(0x991f44, heap.u16(0x991f44) + (regs.edx & 0xffff));
    return runLandResizeCommand(heap, 0x04ca, 0x19);
  }
  const negated = (-(regs.edx & 0xffff)) & 0xffff;
  word("edx", negated);
  compare(regs.ebx & 0xffff, regs.edx & 0xffff);
  if (!(regs.sf ^ regs.of)) {
    heap.setU16(0x991f44, heap.u16(0x991f44) + negated);
    return runLandResizeCommand(heap, 0x04c9, 0x1a);
  }
  return regs.eax >>> 0;
}

function signedWordShiftRight(value, count) {
  count &= 0x1f;
  let signed = value << 16 >> 16;
  if (count) {
    regs.cf = signed >> (count - 1) & 1;
    signed >>= count;
    const result = signed & 0xffff;
    regs.zf = result === 0 ? 1 : 0;
    regs.sf = result >>> 15;
  }
  return signed & 0xffff;
}

function resumeToolbarNative(heap, address) {
  state.interpreterFallbackCount++;
  if (globalThis.__nativeFallbacks) {
    globalThis.__nativeFallbacks.set(address, (globalThis.__nativeFallbacks.get(address) || 0) + 1);
  }
  if (state.executionMode === "pure-js") throw new Error(`pure-js toolbar continuation 0x${address.toString(16)}`);
  const cpu = state.__painterCpu;
  if (!cpu) throw new Error("42a830: painter-bridge cpu not installed");
  const names = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"];
  const flags = ["CF", "ZF", "SF", "OF", "DF"];
  for (const name of names) cpu.regs[name] = regs[name] >>> 0;
  for (const name of flags) cpu.eflags[name] = regs[name.toLowerCase()] | 0;
  const saved = { esp: cpu.regs.esp, eip: cpu.regs.eip, callDepth: cpu.callDepth };
  cpu.regs.esp = regs.esp >>> 0;
  try { runInterpBody(heap, cpu, address); }
  finally { cpu.regs.esp = saved.esp; cpu.regs.eip = saved.eip; cpu.callDepth = saved.callDepth; }
  for (const name of names) regs[name] = cpu.regs[name] >>> 0;
  for (const name of flags) regs[name.toLowerCase()] = cpu.eflags[name] | 0;
}

function resumeToolbarAction(heap, address) {
  // Tool-abort event 11: most widgets have no cleanup action. Keep the two
  // active cleanup branches native until their decrement helpers are ported.
  if (address === 0x42a97e && ![8, 9].includes(regs.edx & 0xffff)) {
    compare(regs.edx & 0xffff, 9);
    return regs.eax >>> 0;
  }
  if (address === 0x42af45) {
    FUN_004363f1_exact(heap);
    const selection = heap.u16(0x99a020) & 0xfffe;
    heap.setU16(0x99a020, selection);
    logic(selection);
    heap.setU8(0x991f5b, 0x12);
    return regs.eax >>> 0;
  }
  if (address === 0x42b3c2) return activateViewportToolExact(heap);
  if (address === 0x42ab3b) return beginLandSelectionExact(heap);
  if (address === 0x42ade9) return resizeLandSelectionExact(heap);
  return resumeToolbarNative(heap, address);
}

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { step, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";

export function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

export function compare(left, right, width = 16) {
  const result = (left - right) >>> 0;
  regs.cf = left < right ? 1 : 0;
  regs.zf = (width === 32 ? result : result & ((1 << width) - 1)) === 0 ? 1 : 0;
  regs.sf = result >>> (width - 1) & 1;
  regs.of = ((left ^ right) & (left ^ result)) >>> (width - 1) & 1;
}

export function logic(value, width = 16) {
  compare(value, 0, width);
  regs.cf = 0;
  regs.of = 0;
}

export function resumeUiNative(heap, address) {
  if (address === 0x429d41 && (regs.ebp & 0xffff) === 2) {
    const implementation = state.fnDispatch.get(address);
    if (typeof implementation === "function") return implementation(heap);
  }
  if (address === 0x429f6c && (regs.edi >>> 0) === 0xffffffff && heap.u8(0x8d7eb8) === 0) {
    const implementation = state.fnDispatch.get(address);
    if (typeof implementation === "function") return implementation(heap);
  }
  state.interpreterFallbackCount++;
  if (globalThis.__nativeFallbacks) {
    globalThis.__nativeFallbacks.set(address, (globalThis.__nativeFallbacks.get(address) || 0) + 1);
  }
  if (state.executionMode === "pure-js") throw new Error(`pure-js UI continuation 0x${address.toString(16)}`);
  const cpu = state.__painterCpu;
  if (!cpu) throw new Error("UI continuation requires the development oracle");
  const names = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"];
  const flags = ["CF", "ZF", "SF", "OF", "DF"];
  const saved = { esp: cpu.regs.esp, eip: cpu.regs.eip, callDepth: cpu.callDepth };
  const hook = getEipHook(address);
  for (const name of names) cpu.regs[name] = regs[name] >>> 0;
  for (const flag of flags) cpu.eflags[flag] = regs[flag.toLowerCase()] | 0;
  const stack = regs.esp === undefined ? saved.esp : regs.esp >>> 0;
  cpu.regs.esp = stack;
  cpu.regs.eip = address;
  clearEipHook(address);
  try {
    let steps = 0;
    while ((cpu.regs.esp >>> 0) <= stack) {
      const running = step(cpu);
      if (!running && (cpu.regs.esp >>> 0) <= stack) throw new Error(`UI continuation stopped before return at 0x${address.toString(16)}`);
      if (++steps > 50_000_000) throw new Error("UI continuation step limit");
    }
    for (const name of names) regs[name] = cpu.regs[name] >>> 0;
    for (const flag of flags) regs[flag.toLowerCase()] = cpu.eflags[flag] | 0;
  } finally {
    cpu.regs.esp = saved.esp;
    cpu.regs.eip = saved.eip;
    cpu.callDepth = saved.callDepth;
    if (hook) setEipHook(address, hook);
  }
}

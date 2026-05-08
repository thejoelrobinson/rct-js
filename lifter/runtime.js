// Runtime helpers shared by all lifted functions and the dispatcher.
// Lifted code is emitted to call these directly so the per-instruction emit
// stays small.

import { step } from "../harness/x86.js";

// ---- Memory access (little-endian) ----
// Bounds-checked to match harness/x86.js's behavior exactly. Test that
// disagreement matters: the interpreter throws on OOB, so the lifter must
// throw at the same address or differential testing produces false positives.
export function mem8(mem, addr) {
  if (addr >= mem.length) throw new Error(`mem8 OOB: 0x${addr.toString(16)}`);
  return mem[addr];
}
export function mem16(mem, addr) {
  if (addr + 2 > mem.length) throw new Error(`mem16 OOB: 0x${addr.toString(16)}`);
  return (mem[addr] | (mem[addr+1] << 8)) >>> 0;
}
export function mem32(mem, addr) {
  if (addr + 4 > mem.length) throw new Error(`mem32 OOB: 0x${addr.toString(16)}`);
  return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0;
}
export function write8(mem, addr, value) {
  if (addr >= mem.length) throw new Error(`write8 OOB: 0x${addr.toString(16)}`);
  mem[addr] = value & 0xff;
}
export function write16(mem, addr, value) {
  if (addr + 2 > mem.length) throw new Error(`write16 OOB: 0x${addr.toString(16)}`);
  mem[addr]   =  value        & 0xff;
  mem[addr+1] = (value >>> 8)  & 0xff;
}
export function write32(mem, addr, value) {
  if (addr + 4 > mem.length) throw new Error(`write32 OOB: 0x${addr.toString(16)}`);
  mem[addr]   =  value        & 0xff;
  mem[addr+1] = (value >>> 8)  & 0xff;
  mem[addr+2] = (value >>> 16) & 0xff;
  mem[addr+3] = (value >>> 24) & 0xff;
}

// ---- 8-bit / 16-bit register access ----
const REG32 = ["eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi"];
export function read8reg(cpu, idx) {
  if (idx < 4) return cpu.regs[REG32[idx]] & 0xff;
  return (cpu.regs[REG32[idx - 4]] >>> 8) & 0xff;
}
export function write8reg(cpu, idx, val) {
  val = val & 0xff;
  if (idx < 4) {
    const r = REG32[idx];
    cpu.regs[r] = ((cpu.regs[r] & 0xffffff00) | val) >>> 0;
  } else {
    const r = REG32[idx - 4];
    cpu.regs[r] = ((cpu.regs[r] & 0xffff00ff) | (val << 8)) >>> 0;
  }
}
export function read16reg(cpu, idx) { return cpu.regs[REG32[idx]] & 0xffff; }
export function write16reg(cpu, idx, val) {
  const r = REG32[idx];
  cpu.regs[r] = ((cpu.regs[r] & 0xffff0000) | (val & 0xffff)) >>> 0;
}

// ---- Bit ops ----
export function ror32(x, n) { n &= 31; if (n === 0) return x >>> 0; return ((x >>> n) | (x << (32 - n))) >>> 0; }
export function rol32(x, n) { n &= 31; if (n === 0) return x >>> 0; return ((x << n) | (x >>> (32 - n))) >>> 0; }
export function shl32(x, n) { return (x << n) >>> 0; }
export function shr32(x, n) { return (x >>> n) >>> 0; }
export function sar32(x, n) { return (x >> n) >>> 0; }
export function signExtend8(b)  { return (b & 0x80) ? ((b | 0xffffff00) >>> 0) : (b & 0xff); }
export function signExtend16(w) { return (w & 0x8000) ? ((w | 0xffff0000) >>> 0) : (w & 0xffff); }

// ---- Flag setters (mirror x86.js exactly) ----
export function setLogicFlags(cpu, result) {
  cpu.eflags.ZF = (result === 0) ? 1 : 0;
  cpu.eflags.SF = (result >>> 31) & 1;
  cpu.eflags.CF = 0;
  cpu.eflags.OF = 0;
}
export function setSubFlags(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a - b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  cpu.eflags.CF = a < b ? 1 : 0;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
}
export function setAddFlags(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a + b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  cpu.eflags.CF = (a + b) > 0xffffffff ? 1 : 0;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = ((~(sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
}

// Run a single interpreter step from the given address. Used by lifted code
// to delegate hard-to-emit instructions (x87, rare ops) without bailing on
// the whole function.
export function stepInterp(cpu, addr) {
  cpu.regs.eip = addr >>> 0;
  step(cpu);
}

// ---- Dispatcher: lifted-function lookup with interpreter fallback ----
let lifted = {};
export function setLiftedTable(table) { lifted = table; }

// Called from lifted code at every `call` or tail-jmp site.
//
// For a regular call: caller pushed `fallthrough` onto the stack. After dispatch
//   returns, eip should equal `fallthrough` because the callee's ret popped it.
//
// For a tail-call jmp (out-of-function target): caller did NOT push anything.
//   The callee's ret will pop whatever was left on the stack (usually our caller's
//   saved return address). Pass fallthrough = 0 to signal tail-call mode; we
//   step the interpreter until esp rises above its entry value (= a ret unwound
//   past where we called in).
export function dispatch(cpu, target, fallthrough) {
  const fn = lifted[target];
  if (fn) {
    cpu.regs.eip = target >>> 0;
    fn(cpu);
    return;
  }
  // Interpreter fallback.
  const entryEsp = cpu.regs.esp;
  const tailMode = fallthrough === 0 || fallthrough === undefined;
  cpu.regs.eip = target >>> 0;
  let steps = 0;
  while (true) {
    if (tailMode) {
      if (cpu.regs.esp > entryEsp) break;
    } else {
      if (cpu.regs.eip === (fallthrough >>> 0)) break;
    }
    step(cpu);
    if (++steps > 1_000_000) {
      throw new Error(`dispatch step-limit exceeded at target 0x${target.toString(16)}`);
    }
  }
}

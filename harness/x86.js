// x86-32 interpreter — supports the opcodes used by ported functions.
// When you encounter a new instruction, add a case (and a unit test).
//
// State model:
//   regs: { eax, ebx, ecx, edx, esi, edi, esp, ebp, eip }
//   memory: Uint8Array indexed by virtual address (allocated by loader)
//   eflags: { CF, ZF, SF, OF }  — only the bits touched by what we run
//
// Calling: caller seeds memory + regs (esp pointing into a stack region),
// then steps until ret returns to the magic sentinel return address.

const REG32 = ["eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi"]; // ModR/M order
const REG8  = ["al",  "cl",  "dl",  "bl",  "ah",  "ch",  "dh",  "bh"];

export function makeCpu(memory) {
  return {
    regs: { eax:0, ebx:0, ecx:0, edx:0, esi:0, edi:0, esp:0, ebp:0, eip:0 },
    eflags: { CF:0, ZF:0, SF:0, OF:0 },
    memory,
    callDepth: 0,
    // x87 FPU: 8-slot stack stored bottom-up, with rotating TOP pointer.
    // st(0) = fpu[(8 - fpuTop) & 7]; equivalent: fpu indexed by physical slot.
    // We keep it simple: physical[fpuTop] = "top of stack". Push: fpuTop = (fpuTop - 1) & 7.
    fpu: new Float64Array(8),
    fpuTop: 0,             // logical 0..7 → physical slot of st(0)
    fpuTags: 0xffff,       // bit pair per slot: 0=valid, 1=zero, 2=special, 3=empty (default)
    fpuSw: 0,              // status word (C3,C2,C1,C0 + condition flags)
    fpuCw: 0x037f,         // control word (default Windows uses 0x027f, but 0x037f is x87 reset)
  };
}

// FPU helpers
function fpuPush(cpu, value) {
  cpu.fpuTop = (cpu.fpuTop - 1) & 7;
  cpu.fpu[cpu.fpuTop] = value;
}
function fpuPop(cpu) {
  const v = cpu.fpu[cpu.fpuTop];
  cpu.fpuTop = (cpu.fpuTop + 1) & 7;
  return v;
}
function fpuSt(cpu, i) { return cpu.fpu[(cpu.fpuTop + i) & 7]; }
function fpuSetSt(cpu, i, v) { cpu.fpu[(cpu.fpuTop + i) & 7] = v; }
function fpuSetCompareFlags(cpu, a, b) {
  // Set C3, C2, C0 in status word based on compare a vs b.
  // C3 = 1 when a == b, C0 = 1 when a < b, C2 = 1 when unordered (NaN).
  cpu.fpuSw &= ~((1 << 14) | (1 << 10) | (1 << 8)); // clear C3, C2, C0
  if (Number.isNaN(a) || Number.isNaN(b)) {
    cpu.fpuSw |= (1 << 14) | (1 << 10) | (1 << 8); // unordered
  } else if (a > b) {
    // all clear
  } else if (a < b) {
    cpu.fpuSw |= (1 << 8); // C0
  } else {
    cpu.fpuSw |= (1 << 14); // C3 (equal)
  }
}
function readF32(mem, addr) {
  const buf = new ArrayBuffer(4);
  const u8 = new Uint8Array(buf);
  u8[0] = mem[addr]; u8[1] = mem[addr+1]; u8[2] = mem[addr+2]; u8[3] = mem[addr+3];
  return new Float32Array(buf)[0];
}
function readF64(mem, addr) {
  const buf = new ArrayBuffer(8);
  const u8 = new Uint8Array(buf);
  for (let i = 0; i < 8; i++) u8[i] = mem[addr + i];
  return new Float64Array(buf)[0];
}
function writeF32(mem, addr, value) {
  const f32 = new Float32Array([value]);
  const u8 = new Uint8Array(f32.buffer);
  for (let i = 0; i < 4; i++) mem[addr + i] = u8[i];
}
function writeF64(mem, addr, value) {
  const f64 = new Float64Array([value]);
  const u8 = new Uint8Array(f64.buffer);
  for (let i = 0; i < 8; i++) mem[addr + i] = u8[i];
}

// ---- Memory access (little-endian, with bounds check) ----
function mem8(mem, addr)  { if (addr >= mem.length) throw new Error(`mem8 OOB: 0x${addr.toString(16)}`); return mem[addr]; }
function mem16(mem, addr) { if (addr + 2 > mem.length) throw new Error(`mem16 OOB: 0x${addr.toString(16)}`); return (mem[addr] | (mem[addr+1] << 8)) >>> 0; }
function mem32(mem, addr) {
  if (addr + 4 > mem.length) throw new Error(`mem32 OOB: 0x${addr.toString(16)}`);
  return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0;
}
function write8(mem, addr, value)  { mem[addr] = value & 0xff; }
function write16(mem, addr, value) { mem[addr] = value & 0xff; mem[addr+1] = (value >>> 8) & 0xff; }
function write32(mem, addr, value) {
  mem[addr]   =  value        & 0xff;
  mem[addr+1] = (value >>> 8)  & 0xff;
  mem[addr+2] = (value >>> 16) & 0xff;
  mem[addr+3] = (value >>> 24) & 0xff;
}

// ---- 8-bit register access (al, ah, etc.) ----
function read8reg(cpu, idx) {
  if (idx < 4) return cpu.regs[REG32[idx]] & 0xff;        // al,cl,dl,bl = low byte of eax,...
  return (cpu.regs[REG32[idx - 4]] >>> 8) & 0xff;          // ah,ch,dh,bh = bits 8..15
}
function write8reg(cpu, idx, val) {
  val = val & 0xff;
  if (idx < 4) {
    const r = REG32[idx];
    cpu.regs[r] = ((cpu.regs[r] & 0xffffff00) | val) >>> 0;
  } else {
    const r = REG32[idx - 4];
    cpu.regs[r] = ((cpu.regs[r] & 0xffff00ff) | (val << 8)) >>> 0;
  }
}

// ---- 16-bit register access (ax, bx, etc.) — preserves high 16 bits ----
function read16reg(cpu, idx) { return cpu.regs[REG32[idx]] & 0xffff; }
function write16reg(cpu, idx, val) {
  const r = REG32[idx];
  cpu.regs[r] = ((cpu.regs[r] & 0xffff0000) | (val & 0xffff)) >>> 0;
}

// ---- 16-bit operand read/write (operand from decodeModrm) ----
function read16op(cpu, op) {
  return op.kind === "reg" ? read16reg(cpu, op.reg) : mem16(cpu.memory, op.addr);
}
function write16op(cpu, op, value) {
  if (op.kind === "reg") write16reg(cpu, op.reg, value);
  else write16(cpu.memory, op.addr, value);
}

// ---- Helpers ----
function ror32(x, n) { n &= 31; if (n === 0) return x >>> 0; return ((x >>> n) | (x << (32 - n))) >>> 0; }
function rol32(x, n) { n &= 31; if (n === 0) return x >>> 0; return ((x << n) | (x >>> (32 - n))) >>> 0; }
function shl32(x, n) { return (x << n) >>> 0; }
function shr32(x, n) { return (x >>> n) >>> 0; }
function sar32(x, n) { return (x >> n) >>> 0; }
function signExtend8(b)  { return (b & 0x80) ? ((b | 0xffffff00) >>> 0) : (b & 0xff); }
function signExtend16(w) { return (w & 0x8000) ? ((w | 0xffff0000) >>> 0) : (w & 0xffff); }

function setLogicFlags(cpu, result) {
  cpu.eflags.ZF = (result === 0) ? 1 : 0;
  cpu.eflags.SF = (result >>> 31) & 1;
  cpu.eflags.CF = 0;
  cpu.eflags.OF = 0;
}
function setSubFlags(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a - b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  cpu.eflags.CF = a < b ? 1 : 0;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
}
function setAddFlags(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a + b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  cpu.eflags.CF = (a + b) > 0xffffffff ? 1 : 0;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = ((~(sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
}

function jccTaken(cc, ef) {
  switch (cc) {
    case 0x0: return ef.OF === 1;                       // JO
    case 0x1: return ef.OF === 0;                       // JNO
    case 0x2: return ef.CF === 1;                       // JB / JC
    case 0x3: return ef.CF === 0;                       // JAE / JNC
    case 0x4: return ef.ZF === 1;                       // JE / JZ
    case 0x5: return ef.ZF === 0;                       // JNE / JNZ
    case 0x6: return ef.CF === 1 || ef.ZF === 1;        // JBE
    case 0x7: return ef.CF === 0 && ef.ZF === 0;        // JA
    case 0x8: return ef.SF === 1;                       // JS
    case 0x9: return ef.SF === 0;                       // JNS
    case 0xa: return false;                              // JP — we don't track PF; assume no parity (rare)
    case 0xb: return true;                               // JNP — complement of above (best-effort)
    case 0xc: return ef.SF !== ef.OF;                   // JL
    case 0xd: return ef.SF === ef.OF;                   // JGE
    case 0xe: return ef.ZF === 1 || ef.SF !== ef.OF;    // JLE
    case 0xf: return ef.ZF === 0 && ef.SF === ef.OF;    // JG
    default: throw new Error(`unsupported Jcc cc=${cc.toString(16)}`);
  }
}

// ---- ModR/M decoder ----
// Returns { operand, regField, len } where operand is { kind:"reg", reg } | { kind:"mem", addr }
// `len` = bytes consumed AFTER the opcode (modrm + optional sib + optional disp).
function decodeModrm(cpu, ip) {
  const m = cpu.memory;
  const modrm = mem8(m, ip);
  const mod = (modrm >> 6) & 0x3;
  const reg = (modrm >> 3) & 0x7;
  const rm  = modrm & 0x7;

  if (mod === 3) return { operand: { kind: "reg", reg: rm }, regField: reg, len: 1 };

  // SIB byte applies when rm == 4 in mod = 0/1/2.
  if (rm === 4) {
    const sib = mem8(m, ip + 1);
    const scale = 1 << ((sib >> 6) & 0x3);
    const indexIdx = (sib >> 3) & 0x7;
    const baseIdx  = sib & 0x7;

    // Index field == 4 (esp) means "no index" → contribution is 0.
    const indexVal = indexIdx === 4 ? 0 : (cpu.regs[REG32[indexIdx]] * scale) >>> 0;

    let baseVal, dispLen, dispVal;
    if (mod === 0) {
      if (baseIdx === 5) {
        // Special case: no base register; disp32 follows the SIB.
        baseVal = 0;
        dispVal = mem32(m, ip + 2);
        dispLen = 4;
      } else {
        baseVal = cpu.regs[REG32[baseIdx]] >>> 0;
        dispVal = 0;
        dispLen = 0;
      }
    } else if (mod === 1) {
      baseVal = cpu.regs[REG32[baseIdx]] >>> 0;
      dispVal = signExtend8(mem8(m, ip + 2));
      dispLen = 1;
    } else { // mod === 2
      baseVal = cpu.regs[REG32[baseIdx]] >>> 0;
      dispVal = mem32(m, ip + 2);
      dispLen = 4;
    }
    const addr = (baseVal + indexVal + dispVal) >>> 0;
    return { operand: { kind: "mem", addr }, regField: reg, len: 1 + 1 + dispLen };
  }

  let addr, dispLen;
  if (mod === 0) {
    if (rm === 5) {
      addr = mem32(m, ip + 1);
      dispLen = 4;
    } else {
      addr = cpu.regs[REG32[rm]] >>> 0;
      dispLen = 0;
    }
  } else if (mod === 1) {
    addr = (cpu.regs[REG32[rm]] + signExtend8(mem8(m, ip + 1))) >>> 0;
    dispLen = 1;
  } else { // mod === 2
    addr = (cpu.regs[REG32[rm]] + mem32(m, ip + 1)) >>> 0;
    dispLen = 4;
  }
  return { operand: { kind: "mem", addr }, regField: reg, len: 1 + dispLen };
}

// Read/write a 32-bit operand
function read32op(cpu, op) {
  return op.kind === "reg" ? (cpu.regs[REG32[op.reg]] >>> 0) : mem32(cpu.memory, op.addr);
}
function write32op(cpu, op, value) {
  if (op.kind === "reg") cpu.regs[REG32[op.reg]] = value >>> 0;
  else write32(cpu.memory, op.addr, value);
}

// ---- Single-step decoder ----
const RET_SENTINEL = 0xdeadbeef >>> 0;
const SHIM_BASE = 0xF0000000 >>> 0;

// Optional shim invoker. set via setShimInvoker(invokeShim) at boot time.
let _shimInvoker = null;
export function setShimInvoker(fn) { _shimInvoker = fn; }

export function step(cpu) {
  // Win32 import trap: if eip lands in the sentinel range, dispatch to the shim.
  if ((cpu.regs.eip >>> 0) >= SHIM_BASE) {
    if (!_shimInvoker) throw new Error(`shim invoked but no invoker registered (eip=0x${cpu.regs.eip.toString(16)})`);
    _shimInvoker(cpu, cpu.regs.eip >>> 0);
    return true;
  }
  const m = cpu.memory;
  let ip = cpu.regs.eip;
  let opcode = mem8(m, ip);
  let prefixOperandSize = false; // 0x66 — flips between 32-bit and 16-bit operands

  // ---- Prefixes ----
  let prefixAddressSize = false;
  while (true) {
    if (opcode === 0x66) { prefixOperandSize = true; ip++; opcode = mem8(m, ip); continue; }
    if (opcode === 0x67) { prefixAddressSize = true; ip++; opcode = mem8(m, ip); continue; }
    break;
  }

  // ---- 1-byte register opcodes ----
  // PUSH r32 (0x50+r) / POP r32 (0x58+r). With 0x66: 16-bit PUSH/POP, esp ±= 2.
  if (opcode >= 0x50 && opcode <= 0x57) {
    if (prefixOperandSize) {
      cpu.regs.esp = (cpu.regs.esp - 2) >>> 0;
      write16(m, cpu.regs.esp, read16reg(cpu, opcode - 0x50));
    } else {
      cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
      write32(m, cpu.regs.esp, cpu.regs[REG32[opcode - 0x50]]);
    }
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  if (opcode >= 0x58 && opcode <= 0x5f) {
    if (prefixOperandSize) {
      write16reg(cpu, opcode - 0x58, mem16(m, cpu.regs.esp));
      cpu.regs.esp = (cpu.regs.esp + 2) >>> 0;
    } else {
      cpu.regs[REG32[opcode - 0x58]] = mem32(m, cpu.regs.esp);
      cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    }
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // INC r32 (0x40+r) / DEC r32 (0x48+r). With 0x66: 16-bit INC/DEC.
  if (opcode >= 0x40 && opcode <= 0x47) {
    if (prefixOperandSize) {
      const v = (read16reg(cpu, opcode - 0x40) + 1) & 0xffff;
      write16reg(cpu, opcode - 0x40, v);
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1;
      cpu.regs.eip = (ip + 1) >>> 0; return true;
    }
    const r = REG32[opcode - 0x40];
    const oldCF = cpu.eflags.CF;
    setAddFlags(cpu, cpu.regs[r], 1);
    cpu.eflags.CF = oldCF;
    cpu.regs[r] = (cpu.regs[r] + 1) >>> 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  if (opcode >= 0x48 && opcode <= 0x4f) {
    if (prefixOperandSize) {
      const v = (read16reg(cpu, opcode - 0x48) - 1) & 0xffff;
      write16reg(cpu, opcode - 0x48, v);
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1;
      cpu.regs.eip = (ip + 1) >>> 0; return true;
    }
    const r = REG32[opcode - 0x48];
    const oldCF = cpu.eflags.CF;
    setSubFlags(cpu, cpu.regs[r], 1);
    cpu.eflags.CF = oldCF;
    cpu.regs[r] = (cpu.regs[r] - 1) >>> 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
    // PUSHAL (0x60) / POPAL (0x61) — push/pop EAX,ECX,EDX,EBX,ESP,EBP,ESI,EDI
  if (opcode === 0x60) {
    const oldEsp = cpu.regs.esp;
    for (const r of ["eax","ecx","edx","ebx","esp","ebp","esi","edi"]) {
      cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
      write32(m, cpu.regs.esp, r === "esp" ? oldEsp : cpu.regs[r]);
    }
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  if (opcode === 0x61) {
    for (const r of ["edi","esi","ebp","esp","ebx","edx","ecx","eax"]) {
      const v = mem32(m, cpu.regs.esp);
      cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
      if (r !== "esp") cpu.regs[r] = v; // popal skips writing esp
    }
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // NOP (0x90)
  if (opcode === 0x90) { cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // PUSH imm32 (0x68) / PUSH imm8 sign-ext (0x6a)
  if (opcode === 0x68) {
    const v = mem32(m, ip + 1);
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    write32(m, cpu.regs.esp, v);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x6a) {
    const v = signExtend8(mem8(m, ip + 1));
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    write32(m, cpu.regs.esp, v);
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }
  // CDQ (0x99) — sign-extend eax into edx:eax
  if (opcode === 0x99) {
    cpu.regs.edx = (cpu.regs.eax & 0x80000000) ? 0xffffffff : 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // CWDE (0x98) — sign-extend ax into eax. With operand-size prefix (0x66): CBW (al → ax).
  if (opcode === 0x98) {
    if (prefixOperandSize) {
      // CBW: sign-extend al → ax
      const al = cpu.regs.eax & 0xff;
      const ax = (al & 0x80) ? (al | 0xff00) : al;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (ax & 0xffff)) >>> 0;
    } else {
      // CWDE: sign-extend ax → eax
      const ax = cpu.regs.eax & 0xffff;
      cpu.regs.eax = (ax & 0x8000) ? ((ax | 0xffff0000) >>> 0) : ax;
    }
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // MOV r8, imm8 (0xb0+r) — al, cl, dl, bl, ah, ch, dh, bh
  if (opcode >= 0xb0 && opcode <= 0xb7) {
    write8reg(cpu, opcode - 0xb0, mem8(m, ip + 1));
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }
  // MOV al, [imm32] (0xa0) / MOV [imm32], al (0xa2)
  if (opcode === 0xa0) {
    write8reg(cpu, 0, mem8(m, mem32(m, ip + 1)));
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0xa2) {
    write8(m, mem32(m, ip + 1), read8reg(cpu, 0));
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  // MOV r/m8, r8 (0x88) / MOV r8, r/m8 (0x8a) / MOV r/m8, imm8 (0xc6 /0)
  if (opcode === 0x88) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const v = read8reg(cpu, regField);
    if (operand.kind === "reg") write8reg(cpu, operand.reg, v); else write8(m, operand.addr, v);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x8a) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const v = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    write8reg(cpu, regField, v);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0xc6) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (regField !== 0) throw new Error(`unsupported 0xc6 /${regField}`);
    const imm = mem8(m, ip + 1 + len);
    if (operand.kind === "reg") write8reg(cpu, operand.reg, imm); else write8(m, operand.addr, imm);
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }
  // STC / CLC / STD / CLD
  if (opcode === 0xf8) { cpu.eflags.CF = 0; cpu.regs.eip = (ip + 1) >>> 0; return true; }
  if (opcode === 0xf9) { cpu.eflags.CF = 1; cpu.regs.eip = (ip + 1) >>> 0; return true; }
  if (opcode === 0xfc || opcode === 0xfd) { cpu.regs.eip = (ip + 1) >>> 0; return true; } // CLD/STD — DF unused

  // ---- 8-bit ALU r/m8, r8 / r8, r/m8 ----
  // 0x00 add, 0x02 add | 0x08 or, 0x0a or | 0x20 and, 0x22 and | 0x28 sub, 0x2a sub
  // 0x30 xor | 0x38 cmp r/m8, r8 | 0x84 test r/m8, r8 | 0x86 xchg r8, r/m8
  const aluR8 = (opc) => {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    const b = read8reg(cpu, regField);
    const writeRes = (v) => { if (operand.kind === "reg") write8reg(cpu, operand.reg, v); else write8(m, operand.addr, v); };
    let r = a, write = true, isCmp = false, isTest = false, isSub = false;
    switch (opc) {
      case 0x00: case 0x02: r = (a + b) & 0xff; break;
      case 0x08: case 0x0a: r = (a | b) & 0xff; break;
      case 0x20: case 0x22: r = (a & b) & 0xff; break;
      case 0x28: case 0x2a: r = (a - b) & 0xff; isSub = true; break;
      case 0x30: r = (a ^ b) & 0xff; break;
      case 0x38: r = (a - b) & 0xff; write = false; isCmp = true; isSub = true; break;
      case 0x84: r = (a & b) & 0xff; write = false; isTest = true; break;
      case 0x86: write8reg(cpu, regField, a); writeRes(b); cpu.regs.eip = (ip + 1 + len) >>> 0; return; // XCHG
    }
    if (write) {
      if (opc === 0x02 || opc === 0x0a || opc === 0x22 || opc === 0x2a) write8reg(cpu, regField, r);
      else writeRes(r);
    }
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 7) & 1;
    cpu.eflags.CF = isSub ? ((a < b) ? 1 : 0) : 0;
    cpu.eflags.OF = 0;
    cpu.regs.eip = (ip + 1 + len) >>> 0;
  };
  if ([0x00, 0x02, 0x08, 0x0a, 0x20, 0x22, 0x28, 0x2a, 0x30, 0x38, 0x84, 0x86].includes(opcode)) {
    aluR8(opcode); return true;
  }

  // ---- AL, imm8 short forms ----
  // 0x04 ADD, 0x0c OR, 0x24 AND, 0x2c SUB, 0x34 XOR, 0x3c CMP
  if (opcode === 0x04 || opcode === 0x0c || opcode === 0x24 || opcode === 0x2c ||
      opcode === 0x34 || opcode === 0x3c) {
    const a = read8reg(cpu, 0);
    const b = mem8(m, ip + 1);
    let r, isCmp = false, isSub = false;
    switch (opcode) {
      case 0x04: r = (a + b) & 0xff; break;
      case 0x0c: r = (a | b) & 0xff; break;
      case 0x24: r = (a & b) & 0xff; break;
      case 0x2c: r = (a - b) & 0xff; isSub = true; break;
      case 0x34: r = (a ^ b) & 0xff; break;
      case 0x3c: r = (a - b) & 0xff; isCmp = true; isSub = true; break;
    }
    if (!isCmp) write8reg(cpu, 0, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 7) & 1;
    cpu.eflags.CF = isSub ? ((a < b) ? 1 : 0) : 0;
    cpu.eflags.OF = 0;
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }

  // Segment prefixes — just skip them (we ignore segmentation in flat 32-bit mode)
  if (opcode === 0x26 || opcode === 0x2e || opcode === 0x36 || opcode === 0x3e ||
      opcode === 0x64 || opcode === 0x65) {
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }

  // PUSH/POP segment regs — flat mode: push 0, pop discards
  // 0x06 push ES, 0x07 pop ES, 0x0e push CS, 0x16 push SS, 0x17 pop SS, 0x1e push DS, 0x1f pop DS
  if (opcode === 0x06 || opcode === 0x0e || opcode === 0x16 || opcode === 0x1e) {
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    write32(m, cpu.regs.esp, 0);
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  if (opcode === 0x07 || opcode === 0x17 || opcode === 0x1f) {
    cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // 0x67 standalone is now consumed in the prefix loop above; don't reach here.
  // SAHF (0x9e): AH → flags low byte. We track ZF, SF, CF; ignore AF/PF.
  if (opcode === 0x9e) {
    const ah = (cpu.regs.eax >>> 8) & 0xff;
    cpu.eflags.CF = ah & 1;
    cpu.eflags.ZF = (ah >>> 6) & 1;
    cpu.eflags.SF = (ah >>> 7) & 1;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // LAHF (0x9f): flags low byte → AH
  if (opcode === 0x9f) {
    const f = (cpu.eflags.SF << 7) | (cpu.eflags.ZF << 6) | (cpu.eflags.CF) | 0x02;
    cpu.regs.eax = ((cpu.regs.eax & 0xffff00ff) | (f << 8)) >>> 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // STC/CLC already handled; STI (0xfb) / CLI (0xfa) — flat mode: no-op
  if (opcode === 0xfa || opcode === 0xfb) { cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // INT3 (0xcc) — debug breakpoint; treat as nop in our context
  if (opcode === 0xcc) { cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // 0xea — far jmp ptr16:32. In flat mode, ignore segment selector; treat as
  // jmp to the 32-bit offset. (Should never appear in real 32-bit flat code,
  // but if it does, at least we don't crash.)
  if (opcode === 0xea) {
    cpu.regs.eip = mem32(m, ip + 1);
    return true;
  }

  // SETcc r/m8 (0x0f 90..9f) — handled inside the 0x0f dispatch below; no-op here.

  // POP r/m32 (0x8f /0)
  if (opcode === 0x8f) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (regField !== 0) throw new Error(`unsupported 0x8f /${regField}`);
    const v = mem32(m, cpu.regs.esp);
    cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = v; else write32(m, operand.addr, v);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // SBB r/m8, r8 (0x18) — subtract with borrow
  if (opcode === 0x18) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    const b = read8reg(cpu, regField);
    const r = (a - b - cpu.eflags.CF) & 0xff;
    if (operand.kind === "reg") write8reg(cpu, operand.reg, r); else write8(m, operand.addr, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1;
    cpu.eflags.CF = (a < (b + cpu.eflags.CF)) ? 1 : 0;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // ADC/SBB family — both r/m32 and r/m8 variants, plus eax-imm and r/m,r/m forms.
  // ADC: opcode dest = src + dest + CF
  // SBB: opcode dest = dest - src - CF
  const adcSbb = (kind, isWide, dirReverse) => {
    // dirReverse=false: dest is r/m, src is reg
    // dirReverse=true:  dest is reg, src is r/m
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = isWide
      ? (dirReverse ? cpu.regs[REG32[regField]] >>> 0 : (operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr)))
      : (dirReverse ? read8reg(cpu, regField) : (operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr)));
    const b = isWide
      ? (dirReverse ? (operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr)) : cpu.regs[REG32[regField]] >>> 0)
      : (dirReverse ? (operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr)) : read8reg(cpu, regField));
    const cf = cpu.eflags.CF;
    const r = kind === "adc"
      ? (isWide ? ((a + b + cf) >>> 0) : ((a + b + cf) & 0xff))
      : (isWide ? ((a - b - cf) >>> 0) : ((a - b - cf) & 0xff));
    if (dirReverse) {
      if (isWide) cpu.regs[REG32[regField]] = r;
      else write8reg(cpu, regField, r);
    } else {
      if (isWide) {
        if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r;
        else write32(m, operand.addr, r);
      } else {
        if (operand.kind === "reg") write8reg(cpu, operand.reg, r);
        else write8(m, operand.addr, r);
      }
    }
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = isWide ? ((r >>> 31) & 1) : ((r >>> 7) & 1);
    cpu.eflags.CF = kind === "adc"
      ? ((a + b + cf) > (isWide ? 0xffffffff : 0xff) ? 1 : 0)
      : (a < b + cf ? 1 : 0);
    cpu.regs.eip = (ip + 1 + len) >>> 0;
  };
  if (opcode === 0x10) { adcSbb("adc", false, false); return true; }
  if (opcode === 0x11) { adcSbb("adc", true,  false); return true; }
  if (opcode === 0x12) { adcSbb("adc", false, true);  return true; }
  if (opcode === 0x13) { adcSbb("adc", true,  true);  return true; }
  if (opcode === 0x19) { adcSbb("sbb", true,  false); return true; }
  if (opcode === 0x1a) { adcSbb("sbb", false, true);  return true; }
  if (opcode === 0x1b) { adcSbb("sbb", true,  true);  return true; }

  // ADC eax, imm32 (0x15) / SBB eax, imm32 (0x1d)
  if (opcode === 0x15 || opcode === 0x1d) {
    const a = cpu.regs.eax >>> 0;
    const b = mem32(m, ip + 1) >>> 0;
    const cf = cpu.eflags.CF;
    const r = opcode === 0x15 ? ((a + b + cf) >>> 0) : ((a - b - cf) >>> 0);
    cpu.regs.eax = r;
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 31) & 1;
    cpu.eflags.CF = opcode === 0x15 ? ((a + b + cf) > 0xffffffff ? 1 : 0) : (a < (b + cf) ? 1 : 0);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  // ADC al, imm8 (0x1c SBB al, imm8)
  if (opcode === 0x1c) {
    const a = read8reg(cpu, 0);
    const b = mem8(m, ip + 1);
    const cf = cpu.eflags.CF;
    const r = (a - b - cf) & 0xff;
    write8reg(cpu, 0, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1;
    cpu.eflags.CF = (a < b + cf) ? 1 : 0;
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }

  // ADC al, imm8 (0x14)
  if (opcode === 0x14) {
    const a = read8reg(cpu, 0);
    const b = mem8(m, ip + 1);
    const r = (a + b + cpu.eflags.CF) & 0xff;
    write8reg(cpu, 0, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1;
    cpu.eflags.CF = ((a + b + cpu.eflags.CF) > 0xff) ? 1 : 0;
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }
  // LOOP family — counter is ECX, or CX when 0x67 prefix set.
  // 0xe0=LOOPNE, 0xe1=LOOPE, 0xe2=LOOP, 0xe3=JECXZ/JCXZ
  if (opcode === 0xe0 || opcode === 0xe1 || opcode === 0xe2) {
    const rel = signExtend8(mem8(m, ip + 1));
    let counterStillNonzero;
    if (prefixAddressSize) {
      // Decrement CX (low 16) — leave high 16 alone. counter check on CX.
      const newCx = (cpu.regs.ecx - 1) & 0xffff;
      cpu.regs.ecx = ((cpu.regs.ecx & 0xffff0000) | newCx) >>> 0;
      counterStillNonzero = newCx !== 0;
    } else {
      cpu.regs.ecx = (cpu.regs.ecx - 1) >>> 0;
      counterStillNonzero = cpu.regs.ecx !== 0;
    }
    let jump;
    if (opcode === 0xe0) jump = counterStillNonzero && cpu.eflags.ZF === 0;
    else if (opcode === 0xe1) jump = counterStillNonzero && cpu.eflags.ZF === 1;
    else jump = counterStillNonzero;
    cpu.regs.eip = ((ip + 2) + (jump ? rel : 0)) >>> 0;
    return true;
  }
  // JECXZ / JCXZ (0xe3)
  if (opcode === 0xe3) {
    const rel = signExtend8(mem8(m, ip + 1));
    const counterZero = prefixAddressSize ? ((cpu.regs.ecx & 0xffff) === 0) : (cpu.regs.ecx === 0);
    cpu.regs.eip = ((ip + 2) + (counterZero ? rel : 0)) >>> 0;
    return true;
  }

  // Shifts r/m8 by 1 (0xd0) and r/m8 by cl (0xd2)
  const shift8Op = (cnt) => {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    let r;
    const c = cnt & 0x1f;
    switch (regField) {
      case 0: r = (((a << c) | (a >>> (8 - c))) & 0xff); break;        // ROL
      case 1: r = (((a >>> c) | (a << (8 - c))) & 0xff); break;        // ROR
      case 4: r = (a << c) & 0xff; break;                               // SHL
      case 5: r = (a >>> c) & 0xff; break;                              // SHR
      case 7: { const sa = (a & 0x80) ? (a | 0xffffff00) : a; r = (sa >> c) & 0xff; break; } // SAR
      default: throw new Error(`unsupported 8-bit shift /${regField}`);
    }
    if (operand.kind === "reg") write8reg(cpu, operand.reg, r); else write8(m, operand.addr, r);
    if (c !== 0) { cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1; }
    cpu.regs.eip = (ip + 1 + len) >>> 0;
  };
  if (opcode === 0xd0) { shift8Op(1); return true; }
  if (opcode === 0xd2) { shift8Op(cpu.regs.ecx & 0xff); return true; }

  // String ops (forward-direction only; we assume CLD)
  // Step size: 1 for "b" variants, 4 for "d" variants. Repeat with rep/repne handled below.
  const doStringStep = (op) => {
    switch (op) {
      case 0xa4: { write8(m, cpu.regs.edi, mem8(m, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0; cpu.regs.edi = (cpu.regs.edi + 1) >>> 0; break; } // movsb
      case 0xa5: { write32(m, cpu.regs.edi, mem32(m, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0; cpu.regs.edi = (cpu.regs.edi + 4) >>> 0; break; } // movsd
      case 0xaa: { write8(m, cpu.regs.edi, read8reg(cpu, 0)); cpu.regs.edi = (cpu.regs.edi + 1) >>> 0; break; } // stosb
      case 0xab: { write32(m, cpu.regs.edi, cpu.regs.eax); cpu.regs.edi = (cpu.regs.edi + 4) >>> 0; break; } // stosd
      case 0xac: { write8reg(cpu, 0, mem8(m, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0; break; } // lodsb
      case 0xad: { cpu.regs.eax = mem32(m, cpu.regs.esi); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0; break; } // lodsd
      case 0xae: { setSubFlags(cpu, read8reg(cpu, 0), mem8(m, cpu.regs.edi)); cpu.regs.edi = (cpu.regs.edi + 1) >>> 0; break; } // scasb
      case 0xaf: { setSubFlags(cpu, cpu.regs.eax >>> 0, mem32(m, cpu.regs.edi)); cpu.regs.edi = (cpu.regs.edi + 4) >>> 0; break; } // scasd
      case 0xa6: { setSubFlags(cpu, mem8(m, cpu.regs.esi), mem8(m, cpu.regs.edi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0; cpu.regs.edi = (cpu.regs.edi + 1) >>> 0; break; } // cmpsb
      case 0xa7: { setSubFlags(cpu, mem32(m, cpu.regs.esi), mem32(m, cpu.regs.edi)); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0; cpu.regs.edi = (cpu.regs.edi + 4) >>> 0; break; } // cmpsd
      default: throw new Error(`not a string op: 0x${op.toString(16)}`);
    }
  };
  // Bare string ops (no rep)
  if ([0xa4, 0xa5, 0xa6, 0xa7, 0xaa, 0xab, 0xac, 0xad, 0xae, 0xaf].includes(opcode)) {
    doStringStep(opcode);
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }

  // REP / REPE (0xf3) and REPNE (0xf2) — followed by optional 0x66 (operand
  // size) and a string op. 0x66 turns dword string ops into word.
  if (opcode === 0xf3 || opcode === 0xf2) {
    const repne = opcode === 0xf2;
    let stringOpAt = ip + 1;
    let wordOverride = false;
    if (mem8(m, stringOpAt) === 0x66) { wordOverride = true; stringOpAt++; }
    const op2 = mem8(m, stringOpAt);
    if (![0xa4, 0xa5, 0xa6, 0xa7, 0xaa, 0xab, 0xac, 0xad, 0xae, 0xaf].includes(op2)) {
      throw new Error(`unsupported rep prefix on opcode 0x${op2.toString(16)} at 0x${ip.toString(16)}`);
    }
    const usesZf = (op2 === 0xae || op2 === 0xaf || op2 === 0xa6 || op2 === 0xa7);
    const stepFn = wordOverride ? wordStringStep : doStringStep;
    let safety = 0;
    while (cpu.regs.ecx !== 0) {
      stepFn(op2);
      cpu.regs.ecx = (cpu.regs.ecx - 1) >>> 0;
      if (usesZf) {
        if ((repne && cpu.eflags.ZF === 1) || (!repne && cpu.eflags.ZF === 0)) break;
      }
      if (++safety > 5_000_000) throw new Error("rep loop limit");
    }
    cpu.regs.eip = (stringOpAt + 1) >>> 0; return true;
  }
  // 16-bit-override variants of string ops (executed by rep handler above)
  function wordStringStep(op) {
    switch (op) {
      case 0xa5: write16(m, cpu.regs.edi, mem16(m, cpu.regs.esi));
                 cpu.regs.esi = (cpu.regs.esi + 2) >>> 0; cpu.regs.edi = (cpu.regs.edi + 2) >>> 0; break;
      case 0xab: write16(m, cpu.regs.edi, cpu.regs.eax & 0xffff);
                 cpu.regs.edi = (cpu.regs.edi + 2) >>> 0; break;
      case 0xad: cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | mem16(m, cpu.regs.esi)) >>> 0;
                 cpu.regs.esi = (cpu.regs.esi + 2) >>> 0; break;
      case 0xa7: setSubFlags(cpu, mem16(m, cpu.regs.esi), mem16(m, cpu.regs.edi));
                 cpu.regs.esi = (cpu.regs.esi + 2) >>> 0; cpu.regs.edi = (cpu.regs.edi + 2) >>> 0; break;
      case 0xaf: setSubFlags(cpu, cpu.regs.eax & 0xffff, mem16(m, cpu.regs.edi));
                 cpu.regs.edi = (cpu.regs.edi + 2) >>> 0; break;
      default: doStringStep(op); break;
    }
  }
  // TEST al, imm8 (0xa8) / TEST eax, imm32 already at 0xa9
  if (opcode === 0xa8) {
    const a = read8reg(cpu, 0);
    const b = mem8(m, ip + 1);
    const r = (a & b) & 0xff;
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
    cpu.regs.eip = (ip + 2) >>> 0; return true;
  }

  // ---- Shifts r/m8 by imm8 (0xc0) ----
  if (opcode === 0xc0) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const cnt = mem8(m, ip + 1 + len) & 0x1f;
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    let r;
    switch (regField) {
      case 0: r = (((a << cnt) | (a >>> (8 - cnt))) & 0xff); break;          // ROL
      case 1: r = (((a >>> cnt) | (a << (8 - cnt))) & 0xff); break;          // ROR
      case 2: { // RCL — through carry, 9-bit rotation
        const full = (a | (cpu.eflags.CF << 8)) & 0x1ff;
        const c = cnt % 9;
        const rot = ((full << c) | (full >> (9 - c))) & 0x1ff;
        r = rot & 0xff; cpu.eflags.CF = (rot >> 8) & 1; break;
      }
      case 3: { // RCR
        const full = (a | (cpu.eflags.CF << 8)) & 0x1ff;
        const c = cnt % 9;
        const rot = ((full >> c) | (full << (9 - c))) & 0x1ff;
        r = rot & 0xff; cpu.eflags.CF = (rot >> 8) & 1; break;
      }
      case 4: r = (a << cnt) & 0xff; break;                                   // SHL
      case 5: r = (a >>> cnt) & 0xff; break;                                  // SHR
      case 7: { const sa = (a & 0x80) ? (a | 0xffffff00) : a; r = (sa >> cnt) & 0xff; break; } // SAR
      default: throw new Error(`unsupported 0xc0 /${regField}`);
    }
    if (operand.kind === "reg") write8reg(cpu, operand.reg, r); else write8(m, operand.addr, r);
    if (cnt !== 0) { cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1; }
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }

  // ---- Shift r/m32 by CL (0xd3) — or r/m16 by CL with 0x66 ----
  if (opcode === 0xd3) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const cnt = cpu.regs.ecx & 0x1f;
    if (prefixOperandSize) {
      const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      let r;
      switch (regField) {
        case 0: r = ((a << cnt) | (a >>> (16 - cnt))) & 0xffff; break;          // ROL
        case 1: r = ((a >>> cnt) | (a << (16 - cnt))) & 0xffff; break;          // ROR
        case 4: r = (a << cnt) & 0xffff; break;                                 // SHL
        case 5: r = (a >>> cnt) & 0xffff; break;                                // SHR
        case 7: { const sa = (a & 0x8000) ? (a | 0xffff0000) : a; r = (sa >> cnt) & 0xffff; break; } // SAR
        default: throw new Error(`unsupported 0x66 0xd3 /${regField}`);
      }
      if (operand.kind === "reg") write16reg(cpu, operand.reg, r); else write16(m, operand.addr, r);
      if (cnt !== 0) { cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1; }
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
    let r;
    switch (regField) {
      case 0: r = rol32(a, cnt); break;
      case 1: r = ror32(a, cnt); break;
      case 4: r = shl32(a, cnt); break;
      case 5: r = shr32(a, cnt); break;
      case 7: r = sar32(a, cnt); break;
      default: throw new Error(`unsupported 0xd3 /${regField}`);
    }
    if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r; else write32(m, operand.addr, r);
    if (cnt !== 0) { cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 31) & 1; }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }

  // 0x8c MOV r/m16, Sreg / 0x8e MOV Sreg, r/m16 — segment register access.
  // In our flat 32-bit model we don't track segment regs; just consume the
  // ModR/M and act as a no-op for the operand on the segment side.
  if (opcode === 0x8c) {
    const { operand, len } = decodeModrm(cpu, ip + 1);
    if (operand.kind === "reg") write16reg(cpu, operand.reg, 0);
    else write16(m, operand.addr, 0);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x8e) {
    const { len } = decodeModrm(cpu, ip + 1);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // WAIT (0x9b) — synchronize FPU; for our purposes a no-op
  if (opcode === 0x9b) { cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // HLT (0xf4) — halt the CPU; treat as no-op in our context
  if (opcode === 0xf4) { cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // ENTER imm16, imm8 (0xc8) — set up a stack frame
  if (opcode === 0xc8) {
    const allocSize = mem16(m, ip + 1);
    const nestLevel = mem8(m, ip + 3) & 0x1f;
    // push ebp; mov ebp, esp; sub esp, allocSize. Skip nesting copies (rarely > 0).
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    write32(m, cpu.regs.esp, cpu.regs.ebp);
    cpu.regs.ebp = cpu.regs.esp;
    cpu.regs.esp = (cpu.regs.esp - allocSize) >>> 0;
    if (nestLevel > 0) {
      // Nested case: copy nestLevel-1 dword frames + push framePtr. Rare.
      throw new Error(`ENTER with nestLevel=${nestLevel} not supported`);
    }
    cpu.regs.eip = (ip + 4) >>> 0; return true;
  }
  // RETF (0xcb) and IRET (0xcf) — treat both as ordinary `ret`.
  if (opcode === 0xcb || opcode === 0xcf) {
    const target = mem32(m, cpu.regs.esp);
    cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    if (opcode === 0xcb) cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;        // RETF pops segment word too (4 bytes in 32-bit prot mode)
    if (opcode === 0xcf) cpu.regs.esp = (cpu.regs.esp + 4 + 4) >>> 0;   // IRET pops cs + eflags
    cpu.regs.eip = target >>> 0;
    if (cpu.callDepth > 0) { cpu.callDepth--; return true; }
    return target !== RET_SENTINEL;
  }
  // IN al, imm8 / IN ax, imm8 / IN al, dx / IN ax, dx — port I/O. No real ports
  // in our model; return 0.
  if (opcode === 0xe4) { write8reg(cpu, 0, 0); cpu.regs.eip = (ip + 2) >>> 0; return true; }
  if (opcode === 0xe5) { cpu.regs.eax = 0; cpu.regs.eip = (ip + 2) >>> 0; return true; }
  if (opcode === 0xec) { write8reg(cpu, 0, 0); cpu.regs.eip = (ip + 1) >>> 0; return true; }
  if (opcode === 0xed) { cpu.regs.eax = 0; cpu.regs.eip = (ip + 1) >>> 0; return true; }
  // OUT — discard
  if (opcode === 0xe6 || opcode === 0xe7) { cpu.regs.eip = (ip + 2) >>> 0; return true; }
  if (opcode === 0xee || opcode === 0xef) { cpu.regs.eip = (ip + 1) >>> 0; return true; }

  // 0x80 / 0x82 — r/m8 op imm8 (group)
  if (opcode === 0x80 || opcode === 0x82) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const imm = mem8(m, ip + 1 + len);
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    const writeRes = (v) => { if (operand.kind === "reg") write8reg(cpu, operand.reg, v); else write8(m, operand.addr, v); };
    let r;
    switch (regField) {
      case 0: r = (a + imm) & 0xff; writeRes(r); break;                                    // ADD
      case 1: r = (a | imm)  & 0xff; writeRes(r); break;                                    // OR
      case 2: r = (a + imm + cpu.eflags.CF) & 0xff; writeRes(r); break;                     // ADC
      case 3: r = (a - imm - cpu.eflags.CF) & 0xff; writeRes(r); break;                     // SBB
      case 4: r = (a & imm)  & 0xff; writeRes(r); break;                                    // AND
      case 5: r = (a - imm) & 0xff; writeRes(r); break;                                     // SUB
      case 6: r = (a ^ imm)  & 0xff; writeRes(r); break;                                    // XOR
      case 7: r = (a - imm) & 0xff; break;                                                   // CMP (no write)
      default: throw new Error(`unsupported 0x80 /${regField}`);
    }
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 7) & 1;
    if (regField === 7) cpu.eflags.CF = (a >>> 0) < (imm >>> 0) ? 1 : 0;
    else if (regField === 0 || regField === 5) cpu.eflags.CF = 0; // approximate; rarely used after
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }
  // XOR r8, r/m8 (0x32) / CMP r8, r/m8 (0x3a)
  if (opcode === 0x32) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = read8reg(cpu, regField);
    const b = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    const r = (a ^ b) & 0xff;
    write8reg(cpu, regField, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x3a) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = read8reg(cpu, regField);
    const b = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    const r = (a - b) & 0xff;
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 7) & 1; cpu.eflags.CF = (a < b) ? 1 : 0;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // 0xf6 / 0xf7 group — TEST/NOT/NEG/MUL/IMUL/DIV/IDIV r/m8 or r/m{16,32}
  if (opcode === 0xf6 || opcode === 0xf7) {
    const wide = opcode === 0xf7;
    const wide16 = wide && prefixOperandSize;
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const readOp = () => {
      if (wide16) return operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      return wide ? (operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr))
                  : (operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr));
    };
    const writeOp = (v) => {
      if (wide16) { if (operand.kind === "reg") write16reg(cpu, operand.reg, v & 0xffff); else write16(m, operand.addr, v & 0xffff); return; }
      if (wide) { if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = v >>> 0; else write32(m, operand.addr, v >>> 0); }
      else { if (operand.kind === "reg") write8reg(cpu, operand.reg, v); else write8(m, operand.addr, v); }
    };
    if (regField === 0 || regField === 1) { // TEST r/m, imm (regField=1 is an alternate encoding)
      const immLen = wide16 ? 2 : (wide ? 4 : 1);
      const imm = wide16 ? mem16(m, ip + 1 + len) : (wide ? mem32(m, ip + 1 + len) : mem8(m, ip + 1 + len));
      const a = readOp();
      const r = wide16 ? ((a & imm) & 0xffff) : (wide ? ((a & imm) >>> 0) : ((a & imm) & 0xff));
      cpu.eflags.ZF = (r === 0) ? 1 : 0;
      cpu.eflags.SF = wide16 ? ((r >>> 15) & 1) : (wide ? ((r >>> 31) & 1) : ((r >>> 7) & 1));
      cpu.eflags.CF = 0; cpu.eflags.OF = 0;
      cpu.regs.eip = (ip + 1 + len + immLen) >>> 0; return true;
    }
    if (regField === 2) { // NOT
      const a = readOp();
      writeOp(wide ? ((~a) >>> 0) : ((~a) & 0xff));
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 3) { // NEG
      const a = readOp();
      const r = wide ? ((-a) >>> 0) : ((-a) & 0xff);
      writeOp(r);
      cpu.eflags.CF = (a !== 0) ? 1 : 0;
      cpu.eflags.ZF = (r === 0) ? 1 : 0;
      cpu.eflags.SF = wide ? ((r >>> 31) & 1) : ((r >>> 7) & 1);
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 4 && !wide) { // MUL al, r/m8 → ax = al * r/m8
      const a = read8reg(cpu, 0);
      const b = readOp() & 0xff;
      const product = (a * b) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | product) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 5 && !wide) { // IMUL al, r/m8 → ax = al * r/m8 (signed)
      const a = read8reg(cpu, 0);
      const b = readOp() & 0xff;
      const sa = (a & 0x80) ? (a - 256) : a;
      const sb = (b & 0x80) ? (b - 256) : b;
      const product = (sa * sb) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | product) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 4 && wide) { // MUL eax, r/m32 → edx:eax = eax * r/m
      const a = cpu.regs.eax >>> 0;
      const b = readOp() >>> 0;
      // 64-bit unsigned product split into hi/lo 32-bit
      const aLo = a & 0xffff, aHi = a >>> 16, bLo = b & 0xffff, bHi = b >>> 16;
      const ll = aLo * bLo;
      const lh = aLo * bHi;
      const hl = aHi * bLo;
      const hh = aHi * bHi;
      const mid = (ll >>> 16) + (lh & 0xffff) + (hl & 0xffff);
      const lo = ((mid & 0xffff) << 16) | (ll & 0xffff);
      const hi = hh + (lh >>> 16) + (hl >>> 16) + (mid >>> 16);
      cpu.regs.eax = lo >>> 0;
      cpu.regs.edx = hi >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 5 && wide) { // IMUL eax, r/m32 → edx:eax (signed)
      const a = cpu.regs.eax | 0;
      const b = readOp() | 0;
      // Compute via BigInt for correctness
      const product = BigInt(a) * BigInt(b);
      const mask32 = (1n << 32n) - 1n;
      cpu.regs.eax = Number(product & mask32) >>> 0;
      cpu.regs.edx = Number((product >> 32n) & mask32) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 6 && !wide) { // DIV r/m8 — ax / r/m8, al = quotient, ah = remainder
      const divisor = readOp() & 0xff;
      if (divisor === 0) throw new Error("divide by zero");
      const dividend = cpu.regs.eax & 0xffff;
      const q = (dividend / divisor) | 0;
      const r = dividend % divisor;
      if (q > 0xff) throw new Error("DIV r/m8 overflow");
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (q & 0xff) | ((r & 0xff) << 8)) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 7 && !wide) { // IDIV r/m8
      const divisor = readOp() & 0xff;
      const sd = (divisor & 0x80) ? (divisor - 256) : divisor;
      if (sd === 0) throw new Error("divide by zero");
      const dividend = cpu.regs.eax & 0xffff;
      const sd16 = (dividend & 0x8000) ? (dividend - 0x10000) : dividend;
      const q = (sd16 / sd) | 0;
      const r = sd16 - q * sd;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (q & 0xff) | ((r & 0xff) << 8)) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 6 && wide) { // DIV — eax = (edx:eax) / r/m, edx = remainder
      const divisor = readOp() >>> 0;
      if (divisor === 0) throw new Error("divide by zero");
      const dividend = (BigInt(cpu.regs.edx >>> 0) << 32n) | BigInt(cpu.regs.eax >>> 0);
      const q = dividend / BigInt(divisor);
      const r = dividend % BigInt(divisor);
      if (q > 0xffffffffn) throw new Error("DIV overflow");
      cpu.regs.eax = Number(q) >>> 0;
      cpu.regs.edx = Number(r) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (regField === 7 && wide) { // IDIV — signed
      const divisor = BigInt(readOp() | 0);
      if (divisor === 0n) throw new Error("divide by zero");
      const dividend = (BigInt(cpu.regs.edx | 0) << 32n) | BigInt(cpu.regs.eax >>> 0);
      const q = dividend / divisor;
      const r = dividend % divisor;
      cpu.regs.eax = Number(q & 0xffffffffn) >>> 0;
      cpu.regs.edx = Number(r & 0xffffffffn) >>> 0;
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    throw new Error(`unsupported 0x${opcode.toString(16)} /${regField}`);
  }
  // XCHG r32, r/m32 (0x87) / XCHG eax, r32 (0x91-0x97)
  if (opcode === 0x87) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = cpu.regs[REG32[regField]] >>> 0;
    if (operand.kind === "reg") {
      const b = cpu.regs[REG32[operand.reg]] >>> 0;
      cpu.regs[REG32[regField]] = b; cpu.regs[REG32[operand.reg]] = a;
    } else {
      const b = mem32(m, operand.addr);
      cpu.regs[REG32[regField]] = b; write32(m, operand.addr, a);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode >= 0x91 && opcode <= 0x97) {
    const r = REG32[opcode - 0x90];
    const t = cpu.regs.eax >>> 0;
    cpu.regs.eax = cpu.regs[r] >>> 0;
    cpu.regs[r] = t;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }
  // RET imm16 (0xc2) — pop ret addr, then add imm16 to esp
  if (opcode === 0xc2) {
    const target = mem32(m, cpu.regs.esp);
    const popExtra = mem16(m, ip + 1);
    cpu.regs.esp = (cpu.regs.esp + 4 + popExtra) >>> 0;
    cpu.regs.eip = target >>> 0;
    if (cpu.callDepth > 0) { cpu.callDepth--; return true; }
    return target !== RET_SENTINEL;
  }
  // RET (0xc3)
  if (opcode === 0xc3) {
    const target = mem32(m, cpu.regs.esp);
    cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    cpu.regs.eip = target >>> 0;
    if (cpu.callDepth > 0) { cpu.callDepth--; return true; }
    return target !== RET_SENTINEL;
  }
  // LEAVE (0xc9)
  if (opcode === 0xc9) {
    cpu.regs.esp = cpu.regs.ebp >>> 0;
    cpu.regs.ebp = mem32(m, cpu.regs.esp);
    cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
    cpu.regs.eip = (ip + 1) >>> 0; return true;
  }

  // ---- MOV with absolute address (no ModR/M) ----
  if (opcode === 0xa1) { // mov eax, [imm32]
    cpu.regs.eax = mem32(m, mem32(m, ip + 1));
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0xa3) { // mov [imm32], eax
    write32(m, mem32(m, ip + 1), cpu.regs.eax);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  // MOV r32, imm32 (0xb8+r), or MOV r16, imm16 with 0x66 prefix
  if (opcode >= 0xb8 && opcode <= 0xbf) {
    const reg = opcode - 0xb8;
    if (prefixOperandSize) {
      write16reg(cpu, reg, mem16(m, ip + 1));
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    cpu.regs[REG32[reg]] = mem32(m, ip + 1);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }

  // ---- ModR/M-using arithmetic & moves ----
  // ADD r/m32, r32  (0x01 /r) — or r/m16, r16 with 0x66
  if (opcode === 0x01) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      const b = read16reg(cpu, regField);
      const r = (a + b) & 0xffff;
      if (operand.kind === "reg") write16reg(cpu, operand.reg, r); else write16(m, operand.addr, r);
      cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1;
      cpu.eflags.CF = ((a + b) > 0xffff) ? 1 : 0;
    } else {
      const a = read32op(cpu, operand), b = cpu.regs[REG32[regField]] >>> 0;
      setAddFlags(cpu, a, b);
      write32op(cpu, operand, (a + b) >>> 0);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // ---- ADD/SUB/OR/AND/XOR r,r/m and r/m,r — with 0x66 prefix variants ----
  // Helpers for 16-bit ALU result + flags.
  const set16AddFlags = (a, b, r) => {
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 15) & 1;
    cpu.eflags.CF = ((a + b) > 0xffff) ? 1 : 0;
    cpu.eflags.OF = ((~(a ^ b) & (a ^ r)) >>> 15) & 1;
  };
  const set16SubFlags = (a, b, r) => {
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 15) & 1;
    cpu.eflags.CF = (a < b) ? 1 : 0;
    cpu.eflags.OF = (((a ^ b) & (a ^ r)) >>> 15) & 1;
  };
  const set16Logic = (r) => {
    cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1;
    cpu.eflags.CF = 0; cpu.eflags.OF = 0;
  };
  // Local 1-arg helpers — DO NOT name `read16op` here: it shadows the
  // module-level `read16op(cpu, op)` used by the 0x8b/0x89/0xc7 etc. handlers
  // below, silently turning their 2-arg calls into 1-arg ones that pass cpu
  // as the operand. The result is always 0, which corrupts memory loads at
  // those handlers' instructions. Found via the 0x444857 painter walker bug.
  const read16op_local = (operand) => operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
  const write16op_ = (operand, v) => { if (operand.kind === "reg") write16reg(cpu, operand.reg, v & 0xffff); else write16(m, operand.addr, v & 0xffff); };

  // ADD r32, r/m32  (0x03 /r) — or r16, r/m16 with 0x66
  if (opcode === 0x03) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = read16reg(cpu, regField), b = read16op_local(operand);
      const r = (a + b) & 0xffff;
      write16reg(cpu, regField, r); set16AddFlags(a, b, r);
    } else {
      const a = cpu.regs[REG32[regField]] >>> 0, b = read32op(cpu, operand);
      setAddFlags(cpu, a, b); cpu.regs[REG32[regField]] = (a + b) >>> 0;
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // SUB r/m32, r32  (0x29 /r)
  if (opcode === 0x29) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = read16op_local(operand), b = read16reg(cpu, regField);
      const r = (a - b) & 0xffff;
      write16op_(operand, r); set16SubFlags(a, b, r);
    } else {
      const a = read32op(cpu, operand), b = cpu.regs[REG32[regField]] >>> 0;
      setSubFlags(cpu, a, b); write32op(cpu, operand, (a - b) >>> 0);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // SUB r32, r/m32  (0x2b /r)
  if (opcode === 0x2b) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = read16reg(cpu, regField), b = read16op_local(operand);
      const r = (a - b) & 0xffff;
      write16reg(cpu, regField, r); set16SubFlags(a, b, r);
    } else {
      const a = cpu.regs[REG32[regField]] >>> 0, b = read32op(cpu, operand);
      setSubFlags(cpu, a, b); cpu.regs[REG32[regField]] = (a - b) >>> 0;
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // OR r/m32, r32  (0x09 /r) and OR r32, r/m32 (0x0b /r)
  if (opcode === 0x09) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16op_local(operand) | read16reg(cpu, regField)) & 0xffff;
      write16op_(operand, r); set16Logic(r);
    } else {
      const v = (read32op(cpu, operand) | cpu.regs[REG32[regField]]) >>> 0;
      setLogicFlags(cpu, v); write32op(cpu, operand, v);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x0b) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16reg(cpu, regField) | read16op_local(operand)) & 0xffff;
      write16reg(cpu, regField, r); set16Logic(r);
    } else {
      const v = (cpu.regs[REG32[regField]] | read32op(cpu, operand)) >>> 0;
      setLogicFlags(cpu, v); cpu.regs[REG32[regField]] = v;
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // AND r/m32, r32 (0x21) and AND r32, r/m32 (0x23)
  if (opcode === 0x21) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16op_local(operand) & read16reg(cpu, regField)) & 0xffff;
      write16op_(operand, r); set16Logic(r);
    } else {
      const v = (read32op(cpu, operand) & cpu.regs[REG32[regField]]) >>> 0;
      setLogicFlags(cpu, v); write32op(cpu, operand, v);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x23) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16reg(cpu, regField) & read16op_local(operand)) & 0xffff;
      write16reg(cpu, regField, r); set16Logic(r);
    } else {
      const v = (cpu.regs[REG32[regField]] & read32op(cpu, operand)) >>> 0;
      setLogicFlags(cpu, v); cpu.regs[REG32[regField]] = v;
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // XOR r/m32, r32 (0x31) and XOR r32, r/m32 (0x33)
  if (opcode === 0x31) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16op_local(operand) ^ read16reg(cpu, regField)) & 0xffff;
      write16op_(operand, r); set16Logic(r);
    } else {
      const v = (read32op(cpu, operand) ^ cpu.regs[REG32[regField]]) >>> 0;
      setLogicFlags(cpu, v); write32op(cpu, operand, v);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x33) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const r = (read16reg(cpu, regField) ^ read16op_local(operand)) & 0xffff;
      write16reg(cpu, regField, r); set16Logic(r);
    } else {
      const v = (cpu.regs[REG32[regField]] ^ read32op(cpu, operand)) >>> 0;
      setLogicFlags(cpu, v); cpu.regs[REG32[regField]] = v;
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // CMP r32, r/m32 (0x3b /r) and CMP r/m32, r32 (0x39 /r)
  if (opcode === 0x39) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      const b = read16reg(cpu, regField);
      const r = (a - b) & 0xffff;
      cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1; cpu.eflags.CF = (a < b) ? 1 : 0;
      cpu.eflags.OF = (((a ^ b) & (a ^ r)) >>> 15) & 1;
    } else {
      setSubFlags(cpu, read32op(cpu, operand), cpu.regs[REG32[regField]]);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  if (opcode === 0x3b) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = read16reg(cpu, regField);
      const b = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      const r = (a - b) & 0xffff;
      cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1; cpu.eflags.CF = (a < b) ? 1 : 0;
      cpu.eflags.OF = (((a ^ b) & (a ^ r)) >>> 15) & 1;
    } else {
      setSubFlags(cpu, cpu.regs[REG32[regField]], read32op(cpu, operand));
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // TEST r/m32, r32 (0x85) — or r/m16, r16 with 0x66
  if (opcode === 0x85) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) {
      const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
      const v = (a & read16reg(cpu, regField)) & 0xffff;
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
    } else {
      setLogicFlags(cpu, (read32op(cpu, operand) & cpu.regs[REG32[regField]]) >>> 0);
    }
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // MOV r/m32, r32 (0x89 /r) — store form (or r/m16, r16 with 0x66 prefix)
  if (opcode === 0x89) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) write16op(cpu, operand, read16reg(cpu, regField));
    else                    write32op(cpu, operand, cpu.regs[REG32[regField]] >>> 0);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // MOV r32, r/m32 (0x8b /r) — load form (or r16, r/m16 with 0x66 prefix)
  if (opcode === 0x8b) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (prefixOperandSize) write16reg(cpu, regField, read16op(cpu, operand));
    else                    cpu.regs[REG32[regField]] = read32op(cpu, operand);
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // LEA r32, m (0x8d) — load effective address (operand must be memory)
  if (opcode === 0x8d) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (operand.kind !== "mem") throw new Error("LEA with register operand");
    cpu.regs[REG32[regField]] = operand.addr >>> 0;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }
  // MOV r/m32, imm32 (0xc7 /0) — or r/m16, imm16 with 0x66 prefix
  if (opcode === 0xc7) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    if (regField !== 0) throw new Error(`unsupported 0xc7 /${regField}`);
    if (prefixOperandSize) {
      const imm = mem16(m, ip + 1 + len);
      write16op(cpu, operand, imm);
      cpu.regs.eip = (ip + 1 + len + 2) >>> 0;
    } else {
      const imm = mem32(m, ip + 1 + len);
      write32op(cpu, operand, imm >>> 0);
      cpu.regs.eip = (ip + 1 + len + 4) >>> 0;
    }
    return true;
  }

  // ---- EAX-immediate short forms ----
  //   0x05 ADD eax,imm32   0x0d OR eax,imm32   0x15 ADC eax,imm32
  //   0x1d SBB eax,imm32   0x25 AND eax,imm32  0x2d SUB eax,imm32
  //   0x35 XOR eax,imm32   0x3d CMP eax,imm32  0xa9 TEST eax,imm32
  if (opcode === 0x3d) {                              // CMP eax, imm32 (or CMP ax, imm16 with prefix)
    if (prefixOperandSize) {
      setSubFlags(cpu, cpu.regs.eax & 0xffff, mem16(m, ip + 1));
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    setSubFlags(cpu, cpu.regs.eax >>> 0, mem32(m, ip + 1) >>> 0);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x05) {                              // ADD eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const a = cpu.regs.eax & 0xffff, b = mem16(m, ip + 1);
      const r = (a + b) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | r) >>> 0;
      cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1; cpu.eflags.CF = (a + b) > 0xffff ? 1 : 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    const a = cpu.regs.eax >>> 0, b = mem32(m, ip + 1) >>> 0;
    setAddFlags(cpu, a, b);
    cpu.regs.eax = (a + b) >>> 0;
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x2d) {                              // SUB eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const a = cpu.regs.eax & 0xffff, b = mem16(m, ip + 1);
      const r = (a - b) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | r) >>> 0;
      cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1; cpu.eflags.CF = (a < b) ? 1 : 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    const a = cpu.regs.eax >>> 0, b = mem32(m, ip + 1) >>> 0;
    setSubFlags(cpu, a, b);
    cpu.regs.eax = (a - b) >>> 0;
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x25) {                              // AND eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const v = (cpu.regs.eax & 0xffff) & mem16(m, ip + 1);
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | v) >>> 0;
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    const v = (cpu.regs.eax & mem32(m, ip + 1)) >>> 0;
    setLogicFlags(cpu, v);
    cpu.regs.eax = v;
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x0d) {                              // OR eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const v = ((cpu.regs.eax & 0xffff) | mem16(m, ip + 1)) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | v) >>> 0;
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    const v = (cpu.regs.eax | mem32(m, ip + 1)) >>> 0;
    setLogicFlags(cpu, v);
    cpu.regs.eax = v;
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0x35) {                              // XOR eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const v = ((cpu.regs.eax & 0xffff) ^ mem16(m, ip + 1)) & 0xffff;
      cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | v) >>> 0;
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    const v = (cpu.regs.eax ^ mem32(m, ip + 1)) >>> 0;
    setLogicFlags(cpu, v);
    cpu.regs.eax = v;
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }
  if (opcode === 0xa9) {                              // TEST eax, imm32 (or AX, imm16 with 0x66)
    if (prefixOperandSize) {
      const v = (cpu.regs.eax & 0xffff) & mem16(m, ip + 1);
      cpu.eflags.ZF = (v === 0) ? 1 : 0; cpu.eflags.SF = (v >>> 15) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;
      cpu.regs.eip = (ip + 3) >>> 0; return true;
    }
    setLogicFlags(cpu, (cpu.regs.eax & mem32(m, ip + 1)) >>> 0);
    cpu.regs.eip = (ip + 5) >>> 0; return true;
  }

  // ---- INC/DEC r/m8 — 0xfe ----
  if (opcode === 0xfe) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
    let r;
    if (regField === 0) r = (a + 1) & 0xff;       // INC
    else if (regField === 1) r = (a - 1) & 0xff;  // DEC
    else throw new Error(`unsupported 0xfe /${regField}`);
    if (operand.kind === "reg") write8reg(cpu, operand.reg, r);
    else write8(m, operand.addr, r);
    // Set ZF/SF (CF unaffected for INC/DEC)
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 7) & 1;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }

  // ---- Group instructions: r/m32 op imm8 (sign-extended) — 0x83 ----
  // With 0x66 prefix: r/m16 op imm8.
  if (opcode === 0x83 && prefixOperandSize) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const immByte = mem8(m, ip + 1 + len);
    const imm = (immByte & 0x80) ? ((immByte | 0xff00) & 0xffff) : (immByte & 0xff);  // sign-ext to 16
    const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
    const writeRes = (v) => { if (operand.kind === "reg") write16reg(cpu, operand.reg, v); else write16(m, operand.addr, v); };
    let r;
    switch (regField) {
      case 0: r = (a + imm) & 0xffff; writeRes(r); break;
      case 1: r = (a | imm)  & 0xffff; writeRes(r); break;
      case 4: r = (a & imm)  & 0xffff; writeRes(r); break;
      case 5: r = (a - imm) & 0xffff; writeRes(r); break;
      case 6: r = (a ^ imm)  & 0xffff; writeRes(r); break;
      case 7: r = (a - imm) & 0xffff; break; // CMP no write
      default: throw new Error(`unsupported 0x66 0x83 /${regField}`);
    }
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 15) & 1;
    cpu.eflags.CF = (regField === 5 || regField === 7) ? ((a < (imm & 0xffff)) ? 1 : 0) : 0;
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }
  if (opcode === 0x83) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const imm = signExtend8(mem8(m, ip + 1 + len));
    const a = read32op(cpu, operand);
    let r;
    switch (regField) {
      case 0: r = (a + imm) >>> 0; setAddFlags(cpu, a, imm); write32op(cpu, operand, r); break; // ADD
      case 1: r = (a | imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break; // OR
      case 2: { const cf = cpu.eflags.CF; r = (a + imm + cf) >>> 0; cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 31) & 1; cpu.eflags.CF = ((a + (imm >>> 0) + cf) > 0xffffffff) ? 1 : 0; write32op(cpu, operand, r); break; } // ADC
      case 3: { const cf = cpu.eflags.CF; r = (a - imm - cf) >>> 0; cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 31) & 1; cpu.eflags.CF = (a < ((imm >>> 0) + cf)) ? 1 : 0; write32op(cpu, operand, r); break; } // SBB
      case 4: r = (a & imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break; // AND
      case 5: r = (a - imm) >>> 0; setSubFlags(cpu, a, imm); write32op(cpu, operand, r); break; // SUB
      case 6: r = (a ^ imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break; // XOR
      case 7: setSubFlags(cpu, a, imm); break;                                                    // CMP
      default: throw new Error(`unsupported 0x83 /${regField}`);
    }
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }
  // r/m16 op imm16 — 0x66 0x81 (must come before generic 0x81 below)
  if (opcode === 0x81 && prefixOperandSize) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const imm = mem16(m, ip + 1 + len);
    const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
    const writeRes = (v) => { if (operand.kind === "reg") write16reg(cpu, operand.reg, v); else write16(m, operand.addr, v); };
    let r;
    switch (regField) {
      case 0: r = (a + imm) & 0xffff; writeRes(r); break;
      case 1: r = (a | imm)  & 0xffff; writeRes(r); break;
      case 4: r = (a & imm)  & 0xffff; writeRes(r); break;
      case 5: r = (a - imm) & 0xffff; writeRes(r); break;
      case 6: r = (a ^ imm)  & 0xffff; writeRes(r); break;
      case 7: r = (a - imm) & 0xffff; break; // CMP no write
      default: throw new Error(`unsupported 0x66 0x81 /${regField}`);
    }
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 15) & 1;
    cpu.eflags.CF = (regField === 5 || regField === 7) ? ((a < imm) ? 1 : 0) : 0;
    cpu.regs.eip = (ip + 1 + len + 2) >>> 0; return true;
  }
  // r/m32 op imm32 — 0x81
  if (opcode === 0x81) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const imm = mem32(m, ip + 1 + len) >>> 0;
    const a = read32op(cpu, operand);
    let r;
    switch (regField) {
      case 0: r = (a + imm) >>> 0; setAddFlags(cpu, a, imm); write32op(cpu, operand, r); break;
      case 1: r = (a | imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break;
      case 4: r = (a & imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break;
      case 5: r = (a - imm) >>> 0; setSubFlags(cpu, a, imm); write32op(cpu, operand, r); break;
      case 6: r = (a ^ imm)  >>> 0; setLogicFlags(cpu, r);    write32op(cpu, operand, r); break;
      case 7: setSubFlags(cpu, a, imm); break;
      default: throw new Error(`unsupported 0x81 /${regField}`);
    }
    cpu.regs.eip = (ip + 1 + len + 4) >>> 0; return true;
  }
  // ---- 0x66 0xd1: 16-bit shifts r/m16, 1 ----
  if (opcode === 0xd1 && prefixOperandSize) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
    let r;
    switch (regField) {
      case 0: r = (((a << 1) | (a >>> 15)) & 0xffff); cpu.eflags.CF = (a >>> 15) & 1; break; // ROL
      case 1: r = (((a >>> 1) | (a << 15)) & 0xffff); cpu.eflags.CF = a & 1; break;          // ROR
      case 2: { // RCL r/m16, 1 — rotate-through-carry left
        const cf = cpu.eflags.CF & 1;
        r = ((a << 1) | cf) & 0xffff;
        cpu.eflags.CF = (a >>> 15) & 1;
        break;
      }
      case 3: { // RCR r/m16, 1 — rotate-through-carry right
        const cf = cpu.eflags.CF & 1;
        r = ((a >>> 1) | (cf << 15)) & 0xffff;
        cpu.eflags.CF = a & 1;
        break;
      }
      case 4: r = (a << 1) & 0xffff; cpu.eflags.CF = (a >>> 15) & 1; break;                  // SHL
      case 5: r = (a >>> 1) & 0xffff; cpu.eflags.CF = a & 1; break;                          // SHR
      case 7: { const sa = (a & 0x8000) ? (a | 0xffff0000) : a; r = (sa >> 1) & 0xffff; cpu.eflags.CF = a & 1; break; } // SAR
      default: throw new Error(`unsupported 0x66 0xd1 /${regField}`);
    }
    if (operand.kind === "reg") write16reg(cpu, operand.reg, r); else write16(m, operand.addr, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 15) & 1;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }

  // ---- Shifts/rotates: 0xd1 r/m32, 1  (implicit count of 1) ----
  if (opcode === 0xd1) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = read32op(cpu, operand);
    let r;
    switch (regField) {
      case 0: r = rol32(a, 1); break;
      case 1: r = ror32(a, 1); break;
      case 4: r = shl32(a, 1); break;
      case 5: r = shr32(a, 1); break;
      case 7: r = sar32(a, 1); break;
      default: throw new Error(`unsupported 0xd1 /${regField}`);
    }
    write32op(cpu, operand, r);
    cpu.eflags.ZF = (r === 0) ? 1 : 0;
    cpu.eflags.SF = (r >>> 31) & 1;
    cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
  }

  // ---- Shifts/rotates: 0xc1 r/m32, imm8 ----
  if (opcode === 0xc1) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const cnt = mem8(m, ip + 1 + len) & 0x1f;
    const a = read32op(cpu, operand);
    let r;
    switch (regField) {
      case 0: r = rol32(a, cnt); break;          // ROL
      case 1: r = ror32(a, cnt); break;          // ROR
      case 2: { // RCL — rotate through carry, 33-bit rotation
        const fullA = (BigInt(a) | (BigInt(cpu.eflags.CF) << 32n));
        const c = BigInt(cnt % 33);
        const rot = ((fullA << c) | (fullA >> (33n - c))) & ((1n << 33n) - 1n);
        r = Number(rot & 0xffffffffn) >>> 0;
        cpu.eflags.CF = Number((rot >> 32n) & 1n);
        break;
      }
      case 3: { // RCR
        const fullA = (BigInt(a) | (BigInt(cpu.eflags.CF) << 32n));
        const c = BigInt(cnt % 33);
        const rot = ((fullA >> c) | (fullA << (33n - c))) & ((1n << 33n) - 1n);
        r = Number(rot & 0xffffffffn) >>> 0;
        cpu.eflags.CF = Number((rot >> 32n) & 1n);
        break;
      }
      case 4: r = shl32(a, cnt); break;          // SHL
      case 5: r = shr32(a, cnt); break;          // SHR
      case 7: r = sar32(a, cnt); break;          // SAR
      default: throw new Error(`unsupported 0xc1 /${regField}`);
    }
    write32op(cpu, operand, r);
    if (cnt !== 0) {
      cpu.eflags.ZF = (r === 0) ? 1 : 0;
      cpu.eflags.SF = (r >>> 31) & 1;
      // CF/OF are operation-dependent; we leave them alone unless callers need them.
    }
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }

  // ---- IMUL r32, r/m32, imm32 (0x69 /r) ----
  if (opcode === 0x69) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = read32op(cpu, operand);
    const imm = mem32(m, ip + 1 + len);
    // Signed 32x32->32, low 32 bits.
    const product = Math.imul(a | 0, imm | 0) >>> 0;
    cpu.regs[REG32[regField]] = product;
    cpu.regs.eip = (ip + 1 + len + 4) >>> 0; return true;
  }
  // IMUL r32, r/m32, imm8  (0x6b /r)
  if (opcode === 0x6b) {
    const { operand, regField, len } = decodeModrm(cpu, ip + 1);
    const a = read32op(cpu, operand);
    const imm = signExtend8(mem8(m, ip + 1 + len)) | 0;
    const product = Math.imul(a | 0, imm) >>> 0;
    cpu.regs[REG32[regField]] = product;
    cpu.regs.eip = (ip + 1 + len + 1) >>> 0; return true;
  }

  // ---- Branches ----
  // JMP rel8 (0xeb)
  if (opcode === 0xeb) {
    cpu.regs.eip = ((ip + 2) + signExtend8(mem8(m, ip + 1))) >>> 0; return true;
  }
  // JMP rel32 (0xe9)
  if (opcode === 0xe9) {
    cpu.regs.eip = ((ip + 5) + (mem32(m, ip + 1) | 0)) >>> 0; return true;
  }
  // CALL rel32 (0xe8) — push return address, jump
  if (opcode === 0xe8) {
    const ret = (ip + 5) >>> 0;
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    write32(m, cpu.regs.esp, ret);
    cpu.regs.eip = (ret + (mem32(m, ip + 1) | 0)) >>> 0;
    cpu.callDepth++;
    return true;
  }
  // Jcc rel8 (0x70..0x7f)
  if (opcode >= 0x70 && opcode <= 0x7f) {
    const rel = signExtend8(mem8(m, ip + 1));
    const taken = jccTaken(opcode & 0xf, cpu.eflags);
    cpu.regs.eip = ((ip + 2) + (taken ? rel : 0)) >>> 0; return true;
  }

  // ---- 0x0f xx — two-byte opcodes ----
  if (opcode === 0x0f) {
    const op2 = mem8(m, ip + 1);
    // Jcc rel32
    if (op2 >= 0x80 && op2 <= 0x8f) {
      const rel = mem32(m, ip + 2) | 0;
      const taken = jccTaken(op2 & 0xf, cpu.eflags);
      cpu.regs.eip = ((ip + 6) + (taken ? rel : 0)) >>> 0; return true;
    }
    // MOVZX r32, r/m8 (0x0f b6) and r/m16 (0x0f b7)
    if (op2 === 0xb6 || op2 === 0xb7) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      let v;
      if (op2 === 0xb6) {
        v = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
      } else {
        v = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] & 0xffff) : mem16(m, operand.addr);
      }
      cpu.regs[REG32[regField]] = v >>> 0;
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // SETcc r/m8 (0x0f 90..9f): set byte to 1 if condition true, else 0
    if (op2 >= 0x90 && op2 <= 0x9f) {
      const { operand, len } = decodeModrm(cpu, ip + 2);
      const taken = jccTaken(op2 & 0xf, cpu.eflags) ? 1 : 0;
      if (operand.kind === "reg") write8reg(cpu, operand.reg, taken);
      else write8(m, operand.addr, taken);
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // 0x0f b3 — BTR r/m32, r32 (variable bit reset)
    if (op2 === 0xb3) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
      const bit = cpu.regs[REG32[regField]] & 0x1f;
      cpu.eflags.CF = (a >>> bit) & 1;
      const r = (a & ~(1 << bit)) >>> 0;
      if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r; else write32(m, operand.addr, r);
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // 0x0f bc — BSF r32, r/m32 (bit scan forward); 0x0f bd — BSR (reverse)
    if (op2 === 0xbc || op2 === 0xbd) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
      if (a === 0) { cpu.eflags.ZF = 1; }
      else {
        cpu.eflags.ZF = 0;
        let bit = 0;
        if (op2 === 0xbc) {
          for (let i = 0; i < 32; i++) if ((a >>> i) & 1) { bit = i; break; }
        } else {
          for (let i = 31; i >= 0; i--) if ((a >>> i) & 1) { bit = i; break; }
        }
        cpu.regs[REG32[regField]] = bit >>> 0;
      }
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // 0x0f a3 — BT r/m32, r32   (variable bit position)
    if (op2 === 0xa3) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
      const bit = cpu.regs[REG32[regField]] & 0x1f;
      cpu.eflags.CF = (a >>> bit) & 1;
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // 0x0f ab — BTS r/m32, r32
    if (op2 === 0xab) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
      const bit = cpu.regs[REG32[regField]] & 0x1f;
      cpu.eflags.CF = (a >>> bit) & 1;
      const r = (a | (1 << bit)) >>> 0;
      if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r; else write32(m, operand.addr, r);
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // IMUL r32, r/m32 (0x0f af /r) — or IMUL r16, r/m16 with 0x66
    if (op2 === 0xaf) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      if (prefixOperandSize) {
        const aRaw = read16reg(cpu, regField);
        const bRaw = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
        const a = (aRaw & 0x8000) ? (aRaw | 0xffff0000) : aRaw;
        const b = (bRaw & 0x8000) ? (bRaw | 0xffff0000) : bRaw;
        const product = Math.imul(a, b);
        write16reg(cpu, regField, product & 0xffff);
        // CF/OF set if upper 16 bits don't match sign-extension of low 16
        const truncated = product & 0xffff;
        const signExt = (truncated & 0x8000) ? (truncated | 0xffff0000) : truncated;
        cpu.eflags.CF = (product !== signExt) ? 1 : 0;
        cpu.eflags.OF = cpu.eflags.CF;
      } else {
        const a = cpu.regs[REG32[regField]] | 0;
        const b = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] | 0) : (mem32(m, operand.addr) | 0);
        cpu.regs[REG32[regField]] = (Math.imul(a, b)) >>> 0;
      }
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    // 0x0f ba — BT/BTS/BTR/BTC r/m32, imm8 (group)
    if (op2 === 0xba) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      const imm = mem8(m, ip + 2 + len) & 0x1f;
      const a = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] >>> 0) : mem32(m, operand.addr);
      cpu.eflags.CF = (a >>> imm) & 1;
      let r = a;
      switch (regField) {
        case 4: break;                                           // BT (no write)
        case 5: r = (a | (1 << imm)) >>> 0; break;               // BTS
        case 6: r = (a & ~(1 << imm)) >>> 0; break;              // BTR
        case 7: r = (a ^ (1 << imm)) >>> 0; break;               // BTC
        default: throw new Error(`unsupported 0x0f ba /${regField}`);
      }
      if (regField !== 4) {
        if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r;
        else write32(m, operand.addr, r);
      }
      cpu.regs.eip = (ip + 2 + len + 1) >>> 0; return true;
    }
    // MOVSX r32, r/m8 (0x0f be) and r/m16 (0x0f bf)
    if (op2 === 0xbe || op2 === 0xbf) {
      const { operand, regField, len } = decodeModrm(cpu, ip + 2);
      let v;
      if (op2 === 0xbe) {
        const b = operand.kind === "reg" ? read8reg(cpu, operand.reg) : mem8(m, operand.addr);
        v = signExtend8(b);
      } else {
        const w = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] & 0xffff) : mem16(m, operand.addr);
        v = signExtend16(w);
      }
      cpu.regs[REG32[regField]] = v >>> 0;
      cpu.regs.eip = (ip + 2 + len) >>> 0; return true;
    }
    throw new Error(`unsupported 0x0f ${op2.toString(16)} at eip 0x${ip.toString(16)}`);
  }

  // ---- x87 floating-point (0xd8 - 0xdf) ----
  // Each first byte selects an operand-format group; the ModR/M reg field
  // selects the operation. We handle the common subset (load/store/arith/cmp).
  if (opcode >= 0xd8 && opcode <= 0xdf) {
    const modrm = mem8(m, ip + 1);
    const mod = (modrm >> 6) & 0x3;
    const subOp = (modrm >> 3) & 0x7;
    const rm = modrm & 0x7;

    // Memory-form instructions (mod != 3): operand is in memory.
    // Register-form (mod == 3): operand is st(rm).
    const isMem = mod !== 3;
    let memAddr = 0, memLen = 0;
    if (isMem) {
      const d = decodeModrm(cpu, ip + 1);
      if (d.operand.kind !== "mem") throw new Error("x87 mem form had reg operand");
      memAddr = d.operand.addr; memLen = d.len;
    }

    // ---- 0xd8 — m32 float arithmetic, st(0) op= operand ----
    if (opcode === 0xd8) {
      if (isMem) {
        const v = readF32(m, memAddr);
        const a = fpuSt(cpu, 0);
        let r;
        switch (subOp) {
          case 0: r = a + v; fpuSetSt(cpu, 0, r); break; // FADD
          case 1: r = a * v; fpuSetSt(cpu, 0, r); break; // FMUL
          case 2: fpuSetCompareFlags(cpu, a, v); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true; // FCOM
          case 3: fpuSetCompareFlags(cpu, a, v); fpuPop(cpu); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true; // FCOMP
          case 4: r = a - v; fpuSetSt(cpu, 0, r); break; // FSUB
          case 5: r = v - a; fpuSetSt(cpu, 0, r); break; // FSUBR
          case 6: r = a / v; fpuSetSt(cpu, 0, r); break; // FDIV
          case 7: r = v / a; fpuSetSt(cpu, 0, r); break; // FDIVR
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      } else {
        // Reg form: st(0) op= st(rm)
        const a = fpuSt(cpu, 0);
        const b = fpuSt(cpu, rm);
        let r;
        switch (subOp) {
          case 0: r = a + b; fpuSetSt(cpu, 0, r); break;
          case 1: r = a * b; fpuSetSt(cpu, 0, r); break;
          case 2: fpuSetCompareFlags(cpu, a, b); cpu.regs.eip = (ip + 2) >>> 0; return true;
          case 3: fpuSetCompareFlags(cpu, a, b); fpuPop(cpu); cpu.regs.eip = (ip + 2) >>> 0; return true;
          case 4: r = a - b; fpuSetSt(cpu, 0, r); break;
          case 5: r = b - a; fpuSetSt(cpu, 0, r); break;
          case 6: r = a / b; fpuSetSt(cpu, 0, r); break;
          case 7: r = b / a; fpuSetSt(cpu, 0, r); break;
        }
        cpu.regs.eip = (ip + 2) >>> 0; return true;
      }
    }

    // ---- 0xd9 — load/store 32-bit float + control / unary ops ----
    if (opcode === 0xd9) {
      if (isMem) {
        switch (subOp) {
          case 0: fpuPush(cpu, readF32(m, memAddr)); break;                       // FLD m32
          case 2: writeF32(m, memAddr, fpuSt(cpu, 0)); break;                     // FST m32
          case 3: writeF32(m, memAddr, fpuSt(cpu, 0)); fpuPop(cpu); break;        // FSTP m32
          case 5: cpu.fpuCw = mem16(m, memAddr); break;                           // FLDCW
          case 7: write16(m, memAddr, cpu.fpuCw); break;                          // FNSTCW
          default: throw new Error(`unsupported 0xd9 mem /${subOp}`);
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      } else {
        // Register/no-operand forms
        if (subOp === 0) { fpuPush(cpu, fpuSt(cpu, rm)); cpu.regs.eip = (ip + 2) >>> 0; return true; } // FLD st(i)
        if (subOp === 1) { // FXCH st(i)
          const a = fpuSt(cpu, 0); const b = fpuSt(cpu, rm);
          fpuSetSt(cpu, 0, b); fpuSetSt(cpu, rm, a);
          cpu.regs.eip = (ip + 2) >>> 0; return true;
        }
        // 0xd9 0xex / 0xfx — special encodings
        const full = modrm;
        switch (full) {
          case 0xe0: fpuSetSt(cpu, 0, -fpuSt(cpu, 0)); cpu.regs.eip = (ip + 2) >>> 0; return true;        // FCHS
          case 0xe1: fpuSetSt(cpu, 0, Math.abs(fpuSt(cpu, 0))); cpu.regs.eip = (ip + 2) >>> 0; return true; // FABS
          case 0xe4: fpuSetCompareFlags(cpu, fpuSt(cpu, 0), 0); cpu.regs.eip = (ip + 2) >>> 0; return true; // FTST
          case 0xe8: fpuPush(cpu, 1.0); cpu.regs.eip = (ip + 2) >>> 0; return true;                       // FLD1
          case 0xee: fpuPush(cpu, 0.0); cpu.regs.eip = (ip + 2) >>> 0; return true;                       // FLDZ
          case 0xeb: fpuPush(cpu, Math.PI); cpu.regs.eip = (ip + 2) >>> 0; return true;                   // FLDPI
          case 0xfa: fpuSetSt(cpu, 0, Math.sqrt(fpuSt(cpu, 0))); cpu.regs.eip = (ip + 2) >>> 0; return true; // FSQRT
          case 0xfc: fpuSetSt(cpu, 0, Math.round(fpuSt(cpu, 0))); cpu.regs.eip = (ip + 2) >>> 0; return true; // FRNDINT
          case 0xfe: fpuSetSt(cpu, 0, Math.sin(fpuSt(cpu, 0))); cpu.regs.eip = (ip + 2) >>> 0; return true; // FSIN
          case 0xff: fpuSetSt(cpu, 0, Math.cos(fpuSt(cpu, 0))); cpu.regs.eip = (ip + 2) >>> 0; return true; // FCOS
          default: throw new Error(`unsupported 0xd9 reg form modrm=0x${modrm.toString(16)}`);
        }
      }
    }

    // ---- 0xda — m32 int arithmetic ----
    if (opcode === 0xda) {
      if (isMem) {
        const v = mem32(m, memAddr) | 0;
        const a = fpuSt(cpu, 0);
        let r;
        switch (subOp) {
          case 0: r = a + v; fpuSetSt(cpu, 0, r); break;
          case 1: r = a * v; fpuSetSt(cpu, 0, r); break;
          case 2: fpuSetCompareFlags(cpu, a, v); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 3: fpuSetCompareFlags(cpu, a, v); fpuPop(cpu); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 4: r = a - v; fpuSetSt(cpu, 0, r); break;
          case 5: r = v - a; fpuSetSt(cpu, 0, r); break;
          case 6: r = a / v; fpuSetSt(cpu, 0, r); break;
          case 7: r = v / a; fpuSetSt(cpu, 0, r); break;
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      }
      throw new Error(`unsupported 0xda reg form`);
    }

    // ---- 0xdb — m32 int load/store, and FNINIT/FNCLEX ----
    if (opcode === 0xdb) {
      if (isMem) {
        switch (subOp) {
          case 0: fpuPush(cpu, mem32(m, memAddr) | 0); break;                             // FILD m32
          case 2: write32(m, memAddr, (fpuSt(cpu, 0) | 0) >>> 0); break;                   // FIST m32
          case 3: write32(m, memAddr, (fpuSt(cpu, 0) | 0) >>> 0); fpuPop(cpu); break;      // FISTP m32
          default: throw new Error(`unsupported 0xdb mem /${subOp}`);
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      }
      // Reg-form non-operand cases
      if (modrm === 0xe2) { /* FNCLEX */ cpu.fpuSw &= 0x7f00; cpu.regs.eip = (ip + 2) >>> 0; return true; }
      if (modrm === 0xe3) { /* FNINIT */ cpu.fpuTop = 0; cpu.fpuSw = 0; cpu.fpuCw = 0x037f; cpu.fpuTags = 0xffff; cpu.regs.eip = (ip + 2) >>> 0; return true; }
      throw new Error(`unsupported 0xdb modrm 0x${modrm.toString(16)}`);
    }

    // ---- 0xdc — m64 float arithmetic ----
    if (opcode === 0xdc) {
      if (isMem) {
        const v = readF64(m, memAddr);
        const a = fpuSt(cpu, 0);
        let r;
        switch (subOp) {
          case 0: r = a + v; fpuSetSt(cpu, 0, r); break;
          case 1: r = a * v; fpuSetSt(cpu, 0, r); break;
          case 2: fpuSetCompareFlags(cpu, a, v); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 3: fpuSetCompareFlags(cpu, a, v); fpuPop(cpu); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 4: r = a - v; fpuSetSt(cpu, 0, r); break;
          case 5: r = v - a; fpuSetSt(cpu, 0, r); break;
          case 6: r = a / v; fpuSetSt(cpu, 0, r); break;
          case 7: r = v / a; fpuSetSt(cpu, 0, r); break;
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      }
      // Reg form: st(rm) op= st(0), but FCOM/FCOMP pop differently. Common case: store reg-reg arith.
      const a = fpuSt(cpu, rm);
      const b = fpuSt(cpu, 0);
      let r;
      switch (subOp) {
        case 0: r = a + b; fpuSetSt(cpu, rm, r); break;
        case 1: r = a * b; fpuSetSt(cpu, rm, r); break;
        case 4: r = a - b; fpuSetSt(cpu, rm, r); break;
        case 5: r = b - a; fpuSetSt(cpu, rm, r); break;
        case 6: r = a / b; fpuSetSt(cpu, rm, r); break;
        case 7: r = b / a; fpuSetSt(cpu, rm, r); break;
        default: throw new Error(`unsupported 0xdc reg /${subOp}`);
      }
      cpu.regs.eip = (ip + 2) >>> 0; return true;
    }

    // ---- 0xdd — m64 float load/store, FFREE, FUCOM ----
    if (opcode === 0xdd) {
      if (isMem) {
        switch (subOp) {
          case 0: fpuPush(cpu, readF64(m, memAddr)); break;                       // FLD m64
          case 2: writeF64(m, memAddr, fpuSt(cpu, 0)); break;                     // FST m64
          case 3: writeF64(m, memAddr, fpuSt(cpu, 0)); fpuPop(cpu); break;        // FSTP m64
          default: throw new Error(`unsupported 0xdd mem /${subOp}`);
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      }
      // Reg form
      switch (subOp) {
        case 0: cpu.regs.eip = (ip + 2) >>> 0; return true; // FFREE st(rm) — mark empty (we ignore tags)
        case 2: fpuSetSt(cpu, rm, fpuSt(cpu, 0)); cpu.regs.eip = (ip + 2) >>> 0; return true; // FST st(rm)
        case 3: fpuSetSt(cpu, rm, fpuSt(cpu, 0)); fpuPop(cpu); cpu.regs.eip = (ip + 2) >>> 0; return true; // FSTP st(rm)
        case 4: fpuSetCompareFlags(cpu, fpuSt(cpu, 0), fpuSt(cpu, rm)); cpu.regs.eip = (ip + 2) >>> 0; return true; // FUCOM
        case 5: fpuSetCompareFlags(cpu, fpuSt(cpu, 0), fpuSt(cpu, rm)); fpuPop(cpu); cpu.regs.eip = (ip + 2) >>> 0; return true; // FUCOMP
        default: throw new Error(`unsupported 0xdd reg /${subOp}`);
      }
    }

    // ---- 0xde — m16 int arithmetic, and reg-form pop variants (FADDP etc.) ----
    if (opcode === 0xde) {
      if (isMem) {
        // m16 int
        const w = (mem8(m, memAddr) | (mem8(m, memAddr + 1) << 8));
        const v = (w & 0x8000) ? (w | 0xffff0000) : w;
        const a = fpuSt(cpu, 0);
        let r;
        switch (subOp) {
          case 0: r = a + v; fpuSetSt(cpu, 0, r); break;
          case 1: r = a * v; fpuSetSt(cpu, 0, r); break;
          case 2: fpuSetCompareFlags(cpu, a, v); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 3: fpuSetCompareFlags(cpu, a, v); fpuPop(cpu); cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          case 4: r = a - v; fpuSetSt(cpu, 0, r); break;
          case 5: r = v - a; fpuSetSt(cpu, 0, r); break;
          case 6: r = a / v; fpuSetSt(cpu, 0, r); break;
          case 7: r = v / a; fpuSetSt(cpu, 0, r); break;
        }
        cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
      }
      // Reg form: st(rm) op= st(0), then pop. FADDP etc.
      const a = fpuSt(cpu, rm);
      const b = fpuSt(cpu, 0);
      let r;
      switch (subOp) {
        case 0: r = a + b; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FADDP
        case 1: r = a * b; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FMULP
        case 3: // FCOMPP
          if (rm === 1) { fpuSetCompareFlags(cpu, fpuSt(cpu, 0), fpuSt(cpu, 1)); fpuPop(cpu); fpuPop(cpu); cpu.regs.eip = (ip + 2) >>> 0; return true; }
          throw new Error(`unsupported 0xde /3 rm=${rm}`);
        case 4: r = a - b; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FSUBP
        case 5: r = b - a; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FSUBRP
        case 6: r = a / b; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FDIVP
        case 7: r = b / a; fpuSetSt(cpu, rm, r); fpuPop(cpu); break; // FDIVRP
        default: throw new Error(`unsupported 0xde reg /${subOp}`);
      }
      cpu.regs.eip = (ip + 2) >>> 0; return true;
    }

    // ---- 0xdf — m16 int / m64 int (FILD/FISTP qword), FNSTSW ax ----
    if (opcode === 0xdf) {
      if (isMem) {
        switch (subOp) {
          case 0: { // FILD m16
            const w = (mem8(m, memAddr) | (mem8(m, memAddr + 1) << 8));
            fpuPush(cpu, (w & 0x8000) ? (w | 0xffff0000) : w);
            cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          }
          case 2: { // FIST m16
            const v = (fpuSt(cpu, 0) | 0) & 0xffff;
            mem[memAddr] = v & 0xff; mem[memAddr + 1] = (v >>> 8) & 0xff;
            cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          }
          case 3: { // FISTP m16
            const v = (fpuSt(cpu, 0) | 0) & 0xffff;
            mem[memAddr] = v & 0xff; mem[memAddr + 1] = (v >>> 8) & 0xff;
            fpuPop(cpu);
            cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          }
          case 5: { // FILD m64 (qword)
            const lo = mem32(m, memAddr);
            const hi = mem32(m, memAddr + 4) | 0;
            fpuPush(cpu, hi * 0x100000000 + lo);
            cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          }
          case 7: { // FISTP m64 (qword)
            const v = fpuSt(cpu, 0);
            const lo = (v >>> 0) & 0xffffffff; const hi = Math.floor(v / 0x100000000) | 0;
            write32(m, memAddr, lo); write32(m, memAddr + 4, hi);
            fpuPop(cpu);
            cpu.regs.eip = (ip + 1 + 1 + memLen) >>> 0; return true;
          }
          default: throw new Error(`unsupported 0xdf mem /${subOp}`);
        }
      }
      // Reg form — common: FNSTSW ax (0xdf 0xe0)
      if (modrm === 0xe0) {
        cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (cpu.fpuSw & 0xffff)) >>> 0;
        cpu.regs.eip = (ip + 2) >>> 0; return true;
      }
      throw new Error(`unsupported 0xdf modrm 0x${modrm.toString(16)}`);
    }
  }

  // 0xff group — INC/DEC r/m, CALL/JMP indirect, PUSH r/m32
  // With 0x66 prefix on /0 and /1, this is INC/DEC r/m16, not r/m32.
  if (opcode === 0xff) {
    const modrm = mem8(m, ip + 1);
    const subOp = (modrm >> 3) & 0x7;
    if (subOp === 0 || subOp === 1) {
      const { operand, len } = decodeModrm(cpu, ip + 1);
      if (prefixOperandSize) {
        const a = operand.kind === "reg" ? read16reg(cpu, operand.reg) : mem16(m, operand.addr);
        const r = (subOp === 0 ? (a + 1) : (a - 1)) & 0xffff;
        if (operand.kind === "reg") write16reg(cpu, operand.reg, r); else write16(m, operand.addr, r);
        cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 15) & 1;
      } else {
        const a = operand.kind === "reg" ? cpu.regs[REG32[operand.reg]] >>> 0 : mem32(m, operand.addr);
        const r = subOp === 0 ? ((a + 1) >>> 0) : ((a - 1) >>> 0);
        if (operand.kind === "reg") cpu.regs[REG32[operand.reg]] = r; else write32(m, operand.addr, r);
        cpu.eflags.ZF = (r === 0) ? 1 : 0; cpu.eflags.SF = (r >>> 31) & 1;
      }
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    if (subOp === 2) { // CALL r/m32
      const { operand, len } = decodeModrm(cpu, ip + 1);
      const target = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] >>> 0) : mem32(m, operand.addr);
      const ret = (ip + 1 + len) >>> 0;
      cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
      write32(m, cpu.regs.esp, ret);
      cpu.regs.eip = target;
      cpu.callDepth++;
      return true;
    }
    if (subOp === 4) { // JMP r/m32
      const { operand, len } = decodeModrm(cpu, ip + 1);
      const target = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] >>> 0) : mem32(m, operand.addr);
      cpu.regs.eip = target;
      return true;
    }
    if (subOp === 6) { // PUSH r/m32
      const { operand, len } = decodeModrm(cpu, ip + 1);
      const v = operand.kind === "reg" ? (cpu.regs[REG32[operand.reg]] >>> 0) : mem32(m, operand.addr);
      cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
      write32(m, cpu.regs.esp, v);
      cpu.regs.eip = (ip + 1 + len) >>> 0; return true;
    }
    throw new Error(`unsupported 0xff /${subOp} at eip 0x${ip.toString(16)}`);
  }

  throw new Error(`unsupported opcode 0x${opcode.toString(16)} at eip 0x${ip.toString(16)}`);
}

// Run from `funcAddr` until ret to sentinel or instruction limit hit.
export function runFunction(cpu, funcAddr, { stackTop, limit = 100_000 } = {}) {
  cpu.regs.esp = (stackTop - 4) >>> 0;
  write32(cpu.memory, cpu.regs.esp, RET_SENTINEL);
  cpu.regs.eip = funcAddr >>> 0;
  cpu.callDepth = 0;

  let steps = 0;
  while (step(cpu)) {
    if (++steps > limit) throw new Error(`instruction limit (${limit}) exceeded at eip 0x${cpu.regs.eip.toString(16)}`);
  }
  return steps + 1;
}

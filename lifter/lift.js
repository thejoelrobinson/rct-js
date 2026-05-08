// Static lifter: decode each instruction at an address and emit the JS that
// performs the equivalent operation. Mirrors `harness/x86.js`'s `step()`
// decode tree case-for-case so they evolve together. The diff-test in
// `test/lifted.test.js` catches drift.
//
// liftFunction(memory, funcAddr, endAddr) does recursive disassembly bounded
// by [funcAddr, endAddr) — any branch target outside that range marks the
// function unliftable for v1 (tail calls and jump tables both fall here).

const REG32 = ["eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi"];

const hex = (n) => n.toString(16).padStart(8, "0");

// ---- byte readers ----
function rb(mem, addr) { return mem[addr]; }
function rw(mem, addr) { return (mem[addr] | (mem[addr+1] << 8)) >>> 0; }
function rd(mem, addr) { return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0; }
function se8(b)  { return (b & 0x80) ? (b | 0xffffff00) | 0 : (b & 0xff); }

// ---- ModR/M decoder — returns operand spec + bytes consumed ----
// Operand kinds:
//   { kind:"reg",  reg:i }           // register
//   { kind:"mem",  exprJs }          // memory address as a JS expression string
function decodeModrm(mem, ip) {
  const modrm = rb(mem, ip);
  const mod = (modrm >> 6) & 0x3;
  const reg = (modrm >> 3) & 0x7;
  const rm  = modrm & 0x7;

  if (mod === 3) return { operand: { kind: "reg", reg: rm }, regField: reg, len: 1 };

  // SIB
  if (rm === 4) {
    const sib = rb(mem, ip + 1);
    const scale = 1 << ((sib >> 6) & 0x3);
    const indexIdx = (sib >> 3) & 0x7;
    const baseIdx  = sib & 0x7;
    const indexExpr = indexIdx === 4 ? "0" : `(cpu.regs.${REG32[indexIdx]} * ${scale})`;

    let baseExpr, dispLen, dispVal = 0;
    if (mod === 0) {
      if (baseIdx === 5) { baseExpr = "0"; dispVal = rd(mem, ip + 2); dispLen = 4; }
      else { baseExpr = `cpu.regs.${REG32[baseIdx]}`; dispLen = 0; }
    } else if (mod === 1) {
      baseExpr = `cpu.regs.${REG32[baseIdx]}`; dispVal = se8(rb(mem, ip + 2)); dispLen = 1;
    } else { /* 2 */
      baseExpr = `cpu.regs.${REG32[baseIdx]}`; dispVal = rd(mem, ip + 2) | 0; dispLen = 4;
    }
    const exprJs = `((${baseExpr} + ${indexExpr} + (${dispVal})) >>> 0)`;
    return { operand: { kind: "mem", exprJs }, regField: reg, len: 1 + 1 + dispLen };
  }

  let exprJs, dispLen;
  if (mod === 0) {
    if (rm === 5) {
      exprJs = `0x${rd(mem, ip + 1).toString(16)}`;
      dispLen = 4;
    } else {
      exprJs = `cpu.regs.${REG32[rm]}`;
      dispLen = 0;
    }
  } else if (mod === 1) {
    exprJs = `((cpu.regs.${REG32[rm]} + (${se8(rb(mem, ip + 1))})) >>> 0)`;
    dispLen = 1;
  } else {
    exprJs = `((cpu.regs.${REG32[rm]} + (${rd(mem, ip + 1) | 0})) >>> 0)`;
    dispLen = 4;
  }
  return { operand: { kind: "mem", exprJs }, regField: reg, len: 1 + dispLen };
}

function read32opExpr(op) { return op.kind === "reg" ? `cpu.regs.${REG32[op.reg]}` : `mem32(cpu.memory, ${op.exprJs})`; }
function write32opStmt(op, valueExpr) {
  return op.kind === "reg"
    ? `cpu.regs.${REG32[op.reg]} = (${valueExpr}) >>> 0;`
    : `write32(cpu.memory, ${op.exprJs}, (${valueExpr}) >>> 0);`;
}
function read16opExpr(op) { return op.kind === "reg" ? `read16reg(cpu, ${op.reg})` : `mem16(cpu.memory, ${op.exprJs})`; }
function write16opStmt(op, valueExpr) {
  return op.kind === "reg"
    ? `write16reg(cpu, ${op.reg}, ${valueExpr});`
    : `write16(cpu.memory, ${op.exprJs}, ${valueExpr});`;
}

// ---- Instruction lifter ----
// Returns { jsCode, len, control: "fall"|"jmp"|"jcc"|"call"|"ret"|"indirect", targets:[addrs] }
// or { error: "..." } if unsupported.
//
// `bounds` = { funcStart, funcEnd } — used to detect tail-call jumps to
// addresses outside the current function. When seen, the lifter emits a
// dispatch+return instead of an in-function jump.
function liftInstruction(mem, addr, bounds = null) {
  // Helper to test whether `target` is outside our function's bounds.
  const isOutOfBounds = (target) =>
    bounds !== null && (target < bounds.funcStart || target >= bounds.funcEnd);
  // Build the right "go to target" snippet — either an in-function continue or
  // a tail-call dispatch + JS return.
  const goto_ = (target) =>
    isOutOfBounds(target)
      ? `dispatch(cpu, 0x${target.toString(16)}, 0); return;`
      : `cpu.regs.eip = 0x${target.toString(16)};`;
  // For Jcc, build "if (cond) {taken} else {nottaken}" with each branch
  // either an in-function continue or a tail call.
  const cond_ = (target, fallthrough, condJs) => {
    const t = isOutOfBounds(target);
    const f = isOutOfBounds(fallthrough);
    if (!t && !f) return `cpu.regs.eip = (${condJs}) ? 0x${target.toString(16)} : 0x${fallthrough.toString(16)};`;
    if (t && f) return `if (${condJs}) { ${goto_(target)} } else { ${goto_(fallthrough)} }`;
    if (t)      return `if (${condJs}) { dispatch(cpu, 0x${target.toString(16)}, 0); return; } else { cpu.regs.eip = 0x${fallthrough.toString(16)}; }`;
    return            `if (${condJs}) { cpu.regs.eip = 0x${target.toString(16)}; } else { dispatch(cpu, 0x${fallthrough.toString(16)}, 0); return; }`;
  };

  let ip = addr;
  let opcode = rb(mem, ip);
  let prefix66 = false;
  if (opcode === 0x66) { prefix66 = true; ip++; opcode = rb(mem, ip); }

  // PUSH r32
  if (opcode >= 0x50 && opcode <= 0x57) {
    const r = REG32[opcode - 0x50];
    const next = ip + 1;
    return {
      jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, cpu.regs.${r}); cpu.regs.eip = 0x${next.toString(16)};`,
      len: next - addr, control: "fall", targets: [next],
    };
  }
  // POP r32
  if (opcode >= 0x58 && opcode <= 0x5f) {
    const r = REG32[opcode - 0x58];
    const next = ip + 1;
    return {
      jsCode: `cpu.regs.${r} = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
      len: next - addr, control: "fall", targets: [next],
    };
  }
  // INC r32
  if (opcode >= 0x40 && opcode <= 0x47) {
    const r = REG32[opcode - 0x40];
    const next = ip + 1;
    return {
      jsCode: `{ const _oldCF = cpu.eflags.CF; setAddFlags(cpu, cpu.regs.${r}, 1); cpu.eflags.CF = _oldCF; cpu.regs.${r} = (cpu.regs.${r} + 1) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
      len: next - addr, control: "fall", targets: [next],
    };
  }
  // DEC r32
  if (opcode >= 0x48 && opcode <= 0x4f) {
    const r = REG32[opcode - 0x48];
    const next = ip + 1;
    return {
      jsCode: `{ const _oldCF = cpu.eflags.CF; setSubFlags(cpu, cpu.regs.${r}, 1); cpu.eflags.CF = _oldCF; cpu.regs.${r} = (cpu.regs.${r} - 1) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
      len: next - addr, control: "fall", targets: [next],
    };
  }
  // PUSHAL / POPAL
  if (opcode === 0x60) {
    const next = ip + 1;
    const code = `{ const _e = cpu.regs.esp; for (const _r of ["eax","ecx","edx","ebx","esp","ebp","esi","edi"]) { cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, _r === "esp" ? _e : cpu.regs[_r]); } } cpu.regs.eip = 0x${next.toString(16)};`;
    return { jsCode: code, len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x61) {
    const next = ip + 1;
    const code = `{ for (const _r of ["edi","esi","ebp","esp","ebx","edx","ecx","eax"]) { const _v = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4) >>> 0; if (_r !== "esp") cpu.regs[_r] = _v; } } cpu.regs.eip = 0x${next.toString(16)};`;
    return { jsCode: code, len: next - addr, control: "fall", targets: [next] };
  }
  // NOP
  if (opcode === 0x90) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: next - addr, control: "fall", targets: [next] };
  }
  // PUSH imm32 (0x68) / PUSH imm8 (0x6a)
  if (opcode === 0x68) {
    const v = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, 0x${v.toString(16)}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x6a) {
    const v = se8(rb(mem, ip + 1)); const next = ip + 2;
    return { jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, (${v}) >>> 0); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // CDQ (0x99)
  if (opcode === 0x99) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.edx = (cpu.regs.eax & 0x80000000) ? 0xffffffff : 0; cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV r8, imm8 (0xb0+r)
  if (opcode >= 0xb0 && opcode <= 0xb7) {
    const v = rb(mem, ip + 1); const next = ip + 2;
    return { jsCode: `write8reg(cpu, ${opcode - 0xb0}, 0x${v.toString(16)}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV al, [imm32] (0xa0)
  if (opcode === 0xa0) {
    const a = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `write8reg(cpu, 0, mem8(cpu.memory, 0x${a.toString(16)})); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0xa2) {
    const a = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `write8(cpu.memory, 0x${a.toString(16)}, read8reg(cpu, 0)); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV r/m8, r8 (0x88) / MOV r8, r/m8 (0x8a) / MOV r/m8, imm8 (0xc6)
  if (opcode === 0x88) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const writeStmt = d.operand.kind === "reg"
      ? `write8reg(cpu, ${d.operand.reg}, _v);`
      : `write8(cpu.memory, ${d.operand.exprJs}, _v);`;
    return { jsCode: `{ const _v = read8reg(cpu, ${d.regField}); ${writeStmt} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x8a) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readExpr = d.operand.kind === "reg"
      ? `read8reg(cpu, ${d.operand.reg})`
      : `mem8(cpu.memory, ${d.operand.exprJs})`;
    return { jsCode: `write8reg(cpu, ${d.regField}, ${readExpr}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0xc6) {
    const d = decodeModrm(mem, ip + 1);
    if (d.regField !== 0) return { error: `0xc6 /${d.regField}` };
    const imm = rb(mem, ip + 1 + d.len); const next = ip + 1 + d.len + 1;
    const writeStmt = d.operand.kind === "reg"
      ? `write8reg(cpu, ${d.operand.reg}, 0x${imm.toString(16)});`
      : `write8(cpu.memory, ${d.operand.exprJs}, 0x${imm.toString(16)});`;
    return { jsCode: `${writeStmt} cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // STC / CLC / CLD / STD
  if (opcode === 0xf8) { const next = ip + 1; return { jsCode: `cpu.eflags.CF = 0; cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }
  if (opcode === 0xf9) { const next = ip + 1; return { jsCode: `cpu.eflags.CF = 1; cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }
  if (opcode === 0xfc || opcode === 0xfd) { const next = ip + 1; return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }

  // 8-bit ALU r/m8 ↔ r8 (0x00, 0x02, 0x08, 0x0a, 0x20, 0x22, 0x28, 0x2a, 0x30, 0x38, 0x84, 0x86)
  if ([0x00, 0x02, 0x08, 0x0a, 0x20, 0x22, 0x28, 0x2a, 0x30, 0x38, 0x84, 0x86].includes(opcode)) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readA = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeRm = (v) => d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v});` : `write8(cpu.memory, ${d.operand.exprJs}, ${v});`;
    const writeReg = (v) => `write8reg(cpu, ${d.regField}, ${v});`;
    let body;
    const FLAGS_LOGIC = `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;`;
    const FLAGS_SUB = `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < _b) ? 1 : 0; cpu.eflags.OF = 0;`;
    switch (opcode) {
      case 0x00: body = `const _r = (_a + _b) & 0xff; ${writeRm("_r")} ${FLAGS_LOGIC}`; break; // ADD r/m8, r8
      case 0x02: body = `const _r = (_a + _b) & 0xff; ${writeReg("_r")} ${FLAGS_LOGIC}`; break;
      case 0x08: body = `const _r = (_a | _b) & 0xff; ${writeRm("_r")} ${FLAGS_LOGIC}`; break;
      case 0x0a: body = `const _r = (_a | _b) & 0xff; ${writeReg("_r")} ${FLAGS_LOGIC}`; break;
      case 0x20: body = `const _r = (_a & _b) & 0xff; ${writeRm("_r")} ${FLAGS_LOGIC}`; break;
      case 0x22: body = `const _r = (_a & _b) & 0xff; ${writeReg("_r")} ${FLAGS_LOGIC}`; break;
      case 0x28: body = `const _r = (_a - _b) & 0xff; ${writeRm("_r")} ${FLAGS_SUB}`; break;
      case 0x2a: body = `const _r = (_a - _b) & 0xff; ${writeReg("_r")} ${FLAGS_SUB}`; break;
      case 0x30: body = `const _r = (_a ^ _b) & 0xff; ${writeRm("_r")} ${FLAGS_LOGIC}`; break;
      case 0x38: body = `const _r = (_a - _b) & 0xff; ${FLAGS_SUB}`; break; // CMP, no write
      case 0x84: body = `const _r = (_a & _b) & 0xff; ${FLAGS_LOGIC}`; break; // TEST, no write
      case 0x86: body = `${writeReg("_a")} ${writeRm("_b")}`; break; // XCHG
    }
    return { jsCode: `{ const _a = ${readA}; const _b = read8reg(cpu, ${d.regField}); ${body} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // AL, imm8 short forms — 0x04, 0x0c, 0x24, 0x2c, 0x34, 0x3c
  if ([0x04, 0x0c, 0x24, 0x2c, 0x34, 0x3c].includes(opcode)) {
    const b = rb(mem, ip + 1); const next = ip + 2;
    const FLAGS_LOGIC = `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0;`;
    const FLAGS_SUB = `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < 0x${b.toString(16)}) ? 1 : 0; cpu.eflags.OF = 0;`;
    let body;
    switch (opcode) {
      case 0x04: body = `const _r = (_a + 0x${b.toString(16)}) & 0xff; write8reg(cpu, 0, _r); ${FLAGS_LOGIC}`; break;
      case 0x0c: body = `const _r = (_a | 0x${b.toString(16)}) & 0xff; write8reg(cpu, 0, _r); ${FLAGS_LOGIC}`; break;
      case 0x24: body = `const _r = (_a & 0x${b.toString(16)}) & 0xff; write8reg(cpu, 0, _r); ${FLAGS_LOGIC}`; break;
      case 0x2c: body = `const _r = (_a - 0x${b.toString(16)}) & 0xff; write8reg(cpu, 0, _r); ${FLAGS_SUB}`; break;
      case 0x34: body = `const _r = (_a ^ 0x${b.toString(16)}) & 0xff; write8reg(cpu, 0, _r); ${FLAGS_LOGIC}`; break;
      case 0x3c: body = `const _r = (_a - 0x${b.toString(16)}) & 0xff; ${FLAGS_SUB}`; break;
    }
    return { jsCode: `{ const _a = read8reg(cpu, 0); ${body} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // Segment prefixes — pass through (flat 32-bit mode)
  if (opcode === 0x26 || opcode === 0x2e || opcode === 0x36 || opcode === 0x3e ||
      opcode === 0x64 || opcode === 0x65) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] };
  }

  // 0x8c MOV r/m16, Sreg / 0x8e MOV Sreg, r/m16 — segment register access (flat-mode no-ops)
  if (opcode === 0x8c) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const writeStmt = d.operand.kind === "reg" ? `write16reg(cpu, ${d.operand.reg}, 0);` : `write16(cpu.memory, ${d.operand.exprJs}, 0);`;
    return { jsCode: `${writeStmt} cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x8e) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: next - addr, control: "fall", targets: [next] };
  }
  // WAIT (0x9b) / HLT (0xf4) — no-ops
  if (opcode === 0x9b || opcode === 0xf4) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] };
  }
  // ENTER imm16, imm8 (0xc8)
  if (opcode === 0xc8) {
    const allocSize = rw(mem, ip + 1);
    const nestLevel = rb(mem, ip + 3) & 0x1f;
    if (nestLevel > 0) return { error: `ENTER nestLevel=${nestLevel}` };
    const next = ip + 4;
    return { jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, cpu.regs.ebp); cpu.regs.ebp = cpu.regs.esp; cpu.regs.esp = (cpu.regs.esp - 0x${allocSize.toString(16)}) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // RETF (0xcb), IRET (0xcf) — treat as ret with extra esp adjustment
  if (opcode === 0xcb || opcode === 0xcf) {
    const extra = opcode === 0xcb ? 4 : 8;
    return { jsCode: `cpu.regs.eip = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4 + ${extra}) >>> 0;`,
             len: 1, control: "ret", targets: [] };
  }
  // IN al, imm8 (0xe4); IN ax, imm8 (0xe5); IN al, dx (0xec); IN ax, dx (0xed) — return 0
  if (opcode === 0xe4) { const next = ip + 2; return { jsCode: `write8reg(cpu, 0, 0); cpu.regs.eip = 0x${next.toString(16)};`, len: 2, control: "fall", targets: [next] }; }
  if (opcode === 0xe5) { const next = ip + 2; return { jsCode: `cpu.regs.eax = 0; cpu.regs.eip = 0x${next.toString(16)};`, len: 2, control: "fall", targets: [next] }; }
  if (opcode === 0xec) { const next = ip + 1; return { jsCode: `write8reg(cpu, 0, 0); cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }
  if (opcode === 0xed) { const next = ip + 1; return { jsCode: `cpu.regs.eax = 0; cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }
  // OUT — discard (any operand size)
  if (opcode === 0xe6 || opcode === 0xe7) { const next = ip + 2; return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 2, control: "fall", targets: [next] }; }
  if (opcode === 0xee || opcode === 0xef) { const next = ip + 1; return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] }; }

  // PUSH/POP segment regs (flat mode: push 0, pop discards)
  if ([0x06, 0x0e, 0x16, 0x1e].includes(opcode)) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, 0); cpu.regs.eip = 0x${next.toString(16)};`,
             len: 1, control: "fall", targets: [next] };
  }
  if ([0x07, 0x17, 0x1f].includes(opcode)) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.esp = (cpu.regs.esp + 4) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
             len: 1, control: "fall", targets: [next] };
  }
  // 0x67 address-size prefix — pass through
  if (opcode === 0x67) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] };
  }
  // SAHF (0x9e), LAHF (0x9f)
  if (opcode === 0x9e) {
    const next = ip + 1;
    return { jsCode: `{ const _ah = (cpu.regs.eax >>> 8) & 0xff; cpu.eflags.CF = _ah & 1; cpu.eflags.ZF = (_ah >>> 6) & 1; cpu.eflags.SF = (_ah >>> 7) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: 1, control: "fall", targets: [next] };
  }
  if (opcode === 0x9f) {
    const next = ip + 1;
    return { jsCode: `{ const _f = (cpu.eflags.SF << 7) | (cpu.eflags.ZF << 6) | (cpu.eflags.CF) | 0x02; cpu.regs.eax = ((cpu.regs.eax & 0xffff00ff) | (_f << 8)) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: 1, control: "fall", targets: [next] };
  }
  // CLI / STI / INT3 — flat-mode no-ops
  if (opcode === 0xfa || opcode === 0xfb || opcode === 0xcc) {
    const next = ip + 1;
    return { jsCode: `cpu.regs.eip = 0x${next.toString(16)};`, len: 1, control: "fall", targets: [next] };
  }
  // 0xea far jmp — ignore segment, take 32-bit offset as a tail call
  if (opcode === 0xea) {
    const target = rd(mem, ip + 1);
    return { jsCode: `dispatch(cpu, 0x${target.toString(16)}, 0); return;`,
             len: 7, control: "jmp_tail", targets: [] };
  }

  // POP r/m32 (0x8f /0)
  if (opcode === 0x8f) {
    const d = decodeModrm(mem, ip + 1);
    if (d.regField !== 0) return { error: `0x8f /${d.regField}` };
    const next = ip + 1 + d.len;
    const writeStmt = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = _v;` : `write32(cpu.memory, ${d.operand.exprJs}, _v);`;
    return { jsCode: `{ const _v = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4) >>> 0; ${writeStmt} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // SBB r/m8, r8 (0x18)
  if (opcode === 0x18) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readA = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeStmt = (v) => d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v});` : `write8(cpu.memory, ${d.operand.exprJs}, ${v});`;
    return { jsCode: `{ const _a = ${readA}; const _b = read8reg(cpu, ${d.regField}); const _c = cpu.eflags.CF; const _r = (_a - _b - _c) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < (_b + _c)) ? 1 : 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // ADC/SBB ModR/M family
  const adcSbbModrm = (kind, isWide, dirReverse) => {
    const d = decodeModrm(mem, ip + 1);
    const next = ip + 1 + d.len;
    const REG = REG32;
    const readMem32 = `mem32(cpu.memory, ${d.operand.exprJs})`;
    const readMem8  = `mem8(cpu.memory, ${d.operand.exprJs})`;
    const readRm = isWide
      ? (d.operand.kind === "reg" ? `cpu.regs.${REG[d.operand.reg]}` : readMem32)
      : (d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : readMem8);
    const readReg = isWide ? `cpu.regs.${REG[d.regField]}` : `read8reg(cpu, ${d.regField})`;
    const a = dirReverse ? readReg : readRm;
    const b = dirReverse ? readRm : readReg;
    const op = kind === "adc" ? "+" : "-";
    const mask = isWide ? "0xffffffff" : "0xff";
    const shift = isWide ? 31 : 7;
    const writeBack = dirReverse
      ? (isWide ? `cpu.regs.${REG[d.regField]} = _r;` : `write8reg(cpu, ${d.regField}, _r);`)
      : (isWide
          ? (d.operand.kind === "reg" ? `cpu.regs.${REG[d.operand.reg]} = _r;` : `write32(cpu.memory, ${d.operand.exprJs}, _r);`)
          : (d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, _r);` : `write8(cpu.memory, ${d.operand.exprJs}, _r);`));
    const cfExpr = kind === "adc"
      ? (isWide ? `((_a + _b + _c) > 0xffffffff) ? 1 : 0` : `((_a + _b + _c) > 0xff) ? 1 : 0`)
      : `(_a < _b + _c) ? 1 : 0`;
    return { jsCode: `{ const _a = ${a}; const _b = ${b}; const _c = cpu.eflags.CF; const _r = (_a ${op} _b ${op} _c) & ${mask}; ${writeBack} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> ${shift}) & 1; cpu.eflags.CF = ${cfExpr}; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  };
  if (opcode === 0x10) return adcSbbModrm("adc", false, false);
  if (opcode === 0x11) return adcSbbModrm("adc", true,  false);
  if (opcode === 0x12) return adcSbbModrm("adc", false, true);
  if (opcode === 0x13) return adcSbbModrm("adc", true,  true);
  if (opcode === 0x19) return adcSbbModrm("sbb", true,  false);
  if (opcode === 0x1a) return adcSbbModrm("sbb", false, true);
  if (opcode === 0x1b) return adcSbbModrm("sbb", true,  true);
  // ADC eax, imm32 / SBB eax, imm32
  if (opcode === 0x15 || opcode === 0x1d) {
    const v = rd(mem, ip + 1); const next = ip + 5;
    const op = opcode === 0x15 ? "+" : "-";
    const cfExpr = opcode === 0x15
      ? `((_a + _b + _c) > 0xffffffff) ? 1 : 0`
      : `(_a < _b + _c) ? 1 : 0`;
    return { jsCode: `{ const _a = cpu.regs.eax >>> 0; const _b = 0x${v.toString(16)}; const _c = cpu.eflags.CF; const _r = (_a ${op} _b ${op} _c) >>> 0; cpu.regs.eax = _r; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1; cpu.eflags.CF = ${cfExpr}; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // SBB al, imm8 (0x1c)
  if (opcode === 0x1c) {
    const b = rb(mem, ip + 1); const next = ip + 2;
    return { jsCode: `{ const _a = read8reg(cpu, 0); const _c = cpu.eflags.CF; const _r = (_a - 0x${b.toString(16)} - _c) & 0xff; write8reg(cpu, 0, _r); cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < 0x${b.toString(16)} + _c) ? 1 : 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // ADC al, imm8 (0x14)
  if (opcode === 0x14) {
    const b = rb(mem, ip + 1); const next = ip + 2;
    return { jsCode: `{ const _a = read8reg(cpu, 0); const _c = cpu.eflags.CF; const _r = (_a + 0x${b.toString(16)} + _c) & 0xff; write8reg(cpu, 0, _r); cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = ((_a + 0x${b.toString(16)} + _c) > 0xff) ? 1 : 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // LOOPNE / LOOPE / JECXZ
  if (opcode === 0xe0 || opcode === 0xe1) {
    const target = (ip + 2 + se8(rb(mem, ip + 1))) >>> 0;
    const fallthrough = (ip + 2) >>> 0;
    const cond = opcode === 0xe0
      ? "(cpu.regs.ecx !== 0 && cpu.eflags.ZF === 0)"
      : "(cpu.regs.ecx !== 0 && cpu.eflags.ZF === 1)";
    return { jsCode: `cpu.regs.ecx = (cpu.regs.ecx - 1) >>> 0; cpu.regs.eip = ${cond} ? 0x${target.toString(16)} : 0x${fallthrough.toString(16)};`,
             len: 2, control: "jcc", targets: [target, fallthrough] };
  }

  // LOOP rel8 (0xe2)
  if (opcode === 0xe2) {
    const target = (ip + 2 + se8(rb(mem, ip + 1))) >>> 0;
    const fallthrough = (ip + 2) >>> 0;
    return { jsCode: `cpu.regs.ecx = (cpu.regs.ecx - 1) >>> 0; cpu.regs.eip = (cpu.regs.ecx !== 0) ? 0x${target.toString(16)} : 0x${fallthrough.toString(16)};`,
             len: 2, control: "jcc", targets: [target, fallthrough] };
  }
  // JECXZ rel8 (0xe3)
  if (opcode === 0xe3) {
    const target = (ip + 2 + se8(rb(mem, ip + 1))) >>> 0;
    const fallthrough = (ip + 2) >>> 0;
    return { jsCode: `cpu.regs.eip = (cpu.regs.ecx === 0) ? 0x${target.toString(16)} : 0x${fallthrough.toString(16)};`,
             len: 2, control: "jcc", targets: [target, fallthrough] };
  }

  // Shifts r/m8 by 1 (0xd0) and r/m8 by cl (0xd2)
  if (opcode === 0xd0 || opcode === 0xd2) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const cnt = opcode === 0xd0 ? "1" : "(cpu.regs.ecx & 0x1f)";
    const readExpr = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeStmt = (v) => d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v});` : `write8(cpu.memory, ${d.operand.exprJs}, ${v});`;
    let valueExpr;
    switch (d.regField) {
      case 0: valueExpr = `(((_a << _c) | (_a >>> (8 - _c))) & 0xff)`; break;
      case 1: valueExpr = `(((_a >>> _c) | (_a << (8 - _c))) & 0xff)`; break;
      case 4: valueExpr = `(_a << _c) & 0xff`; break;
      case 5: valueExpr = `(_a >>> _c) & 0xff`; break;
      case 7: valueExpr = `(((_a & 0x80) ? (_a | 0xffffff00) : _a) >> _c) & 0xff`; break;
      default: return { error: `0x${opcode.toString(16)} /${d.regField}` };
    }
    return { jsCode: `{ const _a = ${readExpr}; const _c = ${cnt}; const _r = ${valueExpr}; ${writeStmt("_r")} if (_c !== 0) { cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; } } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // String ops — bare and rep-prefixed
  const stringStepJs = (op) => {
    switch (op) {
      case 0xa4: return `write8(cpu.memory, cpu.regs.edi, mem8(cpu.memory, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0; cpu.regs.edi = (cpu.regs.edi + 1) >>> 0;`;
      case 0xa5: return `write32(cpu.memory, cpu.regs.edi, mem32(cpu.memory, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0; cpu.regs.edi = (cpu.regs.edi + 4) >>> 0;`;
      case 0xaa: return `write8(cpu.memory, cpu.regs.edi, read8reg(cpu, 0)); cpu.regs.edi = (cpu.regs.edi + 1) >>> 0;`;
      case 0xab: return `write32(cpu.memory, cpu.regs.edi, cpu.regs.eax); cpu.regs.edi = (cpu.regs.edi + 4) >>> 0;`;
      case 0xac: return `write8reg(cpu, 0, mem8(cpu.memory, cpu.regs.esi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0;`;
      case 0xad: return `cpu.regs.eax = mem32(cpu.memory, cpu.regs.esi); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0;`;
      case 0xae: return `setSubFlags(cpu, read8reg(cpu, 0), mem8(cpu.memory, cpu.regs.edi)); cpu.regs.edi = (cpu.regs.edi + 1) >>> 0;`;
      case 0xaf: return `setSubFlags(cpu, cpu.regs.eax >>> 0, mem32(cpu.memory, cpu.regs.edi)); cpu.regs.edi = (cpu.regs.edi + 4) >>> 0;`;
      case 0xa6: return `setSubFlags(cpu, mem8(cpu.memory, cpu.regs.esi), mem8(cpu.memory, cpu.regs.edi)); cpu.regs.esi = (cpu.regs.esi + 1) >>> 0; cpu.regs.edi = (cpu.regs.edi + 1) >>> 0;`;
      case 0xa7: return `setSubFlags(cpu, mem32(cpu.memory, cpu.regs.esi), mem32(cpu.memory, cpu.regs.edi)); cpu.regs.esi = (cpu.regs.esi + 4) >>> 0; cpu.regs.edi = (cpu.regs.edi + 4) >>> 0;`;
      default: return null;
    }
  };
  if ([0xa4, 0xa5, 0xa6, 0xa7, 0xaa, 0xab, 0xac, 0xad, 0xae, 0xaf].includes(opcode)) {
    const next = ip + 1;
    return { jsCode: `${stringStepJs(opcode)} cpu.regs.eip = 0x${next.toString(16)};`,
             len: 1, control: "fall", targets: [next] };
  }
  // REP / REPNE prefix
  if (opcode === 0xf3 || opcode === 0xf2) {
    const op2 = rb(mem, ip + 1);
    const stepJs = stringStepJs(op2);
    if (!stepJs) return { error: `rep prefix on 0x${op2.toString(16)}` };
    const repne = opcode === 0xf2;
    const usesZf = (op2 === 0xae || op2 === 0xaf || op2 === 0xa6 || op2 === 0xa7);
    const next = ip + 2;
    const breakCond = usesZf
      ? (repne ? `if (cpu.eflags.ZF === 1) break;` : `if (cpu.eflags.ZF === 0) break;`)
      : ``;
    return { jsCode: `{ let _safety = 0; while (cpu.regs.ecx !== 0) { ${stepJs} cpu.regs.ecx = (cpu.regs.ecx - 1) >>> 0; ${breakCond} if (++_safety > 1000000) throw new Error("rep loop limit"); } } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // TEST al, imm8 (0xa8)
  if (opcode === 0xa8) {
    const v = rb(mem, ip + 1); const next = ip + 2;
    return { jsCode: `{ const _r = (read8reg(cpu, 0) & 0x${v.toString(16)}) & 0xff; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // Shifts r/m8 by imm8 (0xc0)
  if (opcode === 0xc0) {
    const d = decodeModrm(mem, ip + 1);
    const cnt = rb(mem, ip + 1 + d.len) & 0x1f; const next = ip + 1 + d.len + 1;
    const readExpr = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeStmt = (v) => d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v});` : `write8(cpu.memory, ${d.operand.exprJs}, ${v});`;
    let valueExpr;
    switch (d.regField) {
      case 0: valueExpr = `(((_a << ${cnt}) | (_a >>> ${8 - cnt})) & 0xff)`; break;
      case 1: valueExpr = `(((_a >>> ${cnt}) | (_a << ${8 - cnt})) & 0xff)`; break;
      case 2: valueExpr = `(() => { const _full = (_a | (cpu.eflags.CF << 8)) & 0x1ff; const _c = ${cnt} % 9; const _rot = ((_full << _c) | (_full >>> (9 - _c))) & 0x1ff; cpu.eflags.CF = (_rot >>> 8) & 1; return _rot & 0xff; })()`; break;
      case 3: valueExpr = `(() => { const _full = (_a | (cpu.eflags.CF << 8)) & 0x1ff; const _c = ${cnt} % 9; const _rot = ((_full >>> _c) | (_full << (9 - _c))) & 0x1ff; cpu.eflags.CF = (_rot >>> 8) & 1; return _rot & 0xff; })()`; break;
      case 4: valueExpr = `(_a << ${cnt}) & 0xff`; break;
      case 5: valueExpr = `(_a >>> ${cnt}) & 0xff`; break;
      case 7: valueExpr = `(((_a & 0x80) ? (_a | 0xffffff00) : _a) >> ${cnt}) & 0xff`; break;
      default: return { error: `0xc0 /${d.regField}` };
    }
    return { jsCode: `{ const _a = ${readExpr}; const _r = ${valueExpr}; ${writeStmt("_r")} ${cnt !== 0 ? `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1;` : ""} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // Shift r/m32 by CL (0xd3)
  if (opcode === 0xd3) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
    const writeStmt = (v) => d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = (${v}) >>> 0;` : `write32(cpu.memory, ${d.operand.exprJs}, (${v}) >>> 0);`;
    let valueExpr;
    switch (d.regField) {
      case 0: valueExpr = `rol32(${readExpr}, _cnt)`; break;
      case 1: valueExpr = `ror32(${readExpr}, _cnt)`; break;
      case 4: valueExpr = `shl32(${readExpr}, _cnt)`; break;
      case 5: valueExpr = `shr32(${readExpr}, _cnt)`; break;
      case 7: valueExpr = `sar32(${readExpr}, _cnt)`; break;
      default: return { error: `0xd3 /${d.regField}` };
    }
    return { jsCode: `{ const _cnt = cpu.regs.ecx & 0x1f; const _r = ${valueExpr}; ${writeStmt("_r")} if (_cnt !== 0) { cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1; } } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // 0x80 / 0x82 — r/m8 op imm8 group
  if (opcode === 0x80 || opcode === 0x82) {
    const d = decodeModrm(mem, ip + 1);
    const imm = rb(mem, ip + 1 + d.len); const next = ip + 1 + d.len + 1;
    const readExpr = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeStmt = (val) => d.operand.kind === "reg"
      ? `write8reg(cpu, ${d.operand.reg}, ${val});`
      : `write8(cpu.memory, ${d.operand.exprJs}, ${val});`;
    let body;
    switch (d.regField) {
      case 0: body = `const _r = (_a + 0x${imm.toString(16)}) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0;`; break;
      case 1: body = `const _r = (_a | 0x${imm.toString(16)}) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0;`; break;
      case 2: body = `const _c = cpu.eflags.CF; const _r = (_a + 0x${imm.toString(16)} + _c) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = ((_a + 0x${imm.toString(16)} + _c) > 0xff) ? 1 : 0;`; break;
      case 3: body = `const _c = cpu.eflags.CF; const _r = (_a - 0x${imm.toString(16)} - _c) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < 0x${imm.toString(16)} + _c) ? 1 : 0;`; break;
      case 4: body = `const _r = (_a & 0x${imm.toString(16)}) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0;`; break;
      case 5: body = `const _r = (_a - 0x${imm.toString(16)}) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0;`; break;
      case 6: body = `const _r = (_a ^ 0x${imm.toString(16)}) & 0xff; ${writeStmt("_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0;`; break;
      case 7: body = `const _r = (_a - 0x${imm.toString(16)}) & 0xff; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < 0x${imm.toString(16)}) ? 1 : 0;`; break;
      default: return { error: `0x80 /${d.regField}` };
    }
    return { jsCode: `{ const _a = ${readExpr}; ${body} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // XOR r8, r/m8 (0x32) / CMP r8, r/m8 (0x3a)
  if (opcode === 0x32) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readB = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    return { jsCode: `{ const _a = read8reg(cpu, ${d.regField}); const _b = ${readB}; const _r = (_a ^ _b) & 0xff; write8reg(cpu, ${d.regField}, _r); cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x3a) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    const readB = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    return { jsCode: `{ const _a = read8reg(cpu, ${d.regField}); const _b = ${readB}; const _r = (_a - _b) & 0xff; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; cpu.eflags.CF = (_a < _b) ? 1 : 0; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // 0xf6 / 0xf7 group — TEST/NOT/NEG/MUL/IMUL/DIV/IDIV
  if (opcode === 0xf6 || opcode === 0xf7) {
    const wide = opcode === 0xf7;
    const d = decodeModrm(mem, ip + 1);
    const readExpr = wide
      ? (d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`)
      : (d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`);
    const writeStmt = (v) => wide
      ? (d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = (${v}) >>> 0;` : `write32(cpu.memory, ${d.operand.exprJs}, (${v}) >>> 0);`)
      : (d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v});` : `write8(cpu.memory, ${d.operand.exprJs}, ${v});`);

    if (d.regField === 0) { // TEST r/m, imm
      const imm = wide ? rd(mem, ip + 1 + d.len) : rb(mem, ip + 1 + d.len);
      const next = ip + 1 + d.len + (wide ? 4 : 1);
      const mask = wide ? "0xffffffff" : "0xff";
      const shiftAmt = wide ? 31 : 7;
      return { jsCode: `{ const _r = (${readExpr} & 0x${imm.toString(16)}) & ${mask}; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> ${shiftAmt}) & 1; cpu.eflags.CF = 0; cpu.eflags.OF = 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 2) { // NOT
      const next = ip + 1 + d.len;
      const v = wide ? `(~${readExpr}) >>> 0` : `(~${readExpr}) & 0xff`;
      return { jsCode: `${writeStmt(v)} cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 3) { // NEG
      const next = ip + 1 + d.len;
      const shiftAmt = wide ? 31 : 7;
      const v = wide ? `(-${readExpr}) >>> 0` : `(-${readExpr}) & 0xff`;
      return { jsCode: `{ const _a = ${readExpr}; const _r = ${v.replace(readExpr, "_a")}; ${writeStmt("_r")} cpu.eflags.CF = (_a !== 0) ? 1 : 0; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> ${shiftAmt}) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 6 && !wide) { // DIV r/m8
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _d = ${readExpr} & 0xff; if (_d === 0) throw new Error("divide by zero"); const _x = cpu.regs.eax & 0xffff; const _q = (_x / _d) | 0; const _r = _x % _d; if (_q > 0xff) throw new Error("DIV r/m8 overflow"); cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (_q & 0xff) | ((_r & 0xff) << 8)) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 7 && !wide) { // IDIV r/m8
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _d8 = ${readExpr} & 0xff; const _sd = (_d8 & 0x80) ? (_d8 - 256) : _d8; if (_sd === 0) throw new Error("divide by zero"); const _x = cpu.regs.eax & 0xffff; const _sx = (_x & 0x8000) ? (_x - 0x10000) : _x; const _q = (_sx / _sd) | 0; const _r = _sx - _q * _sd; cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (_q & 0xff) | ((_r & 0xff) << 8)) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 4 && !wide) { // MUL al, r/m8 → ax
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _a = read8reg(cpu, 0); const _b = ${readExpr} & 0xff; const _p = (_a * _b) & 0xffff; cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | _p) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 5 && !wide) { // IMUL al, r/m8 → ax (signed)
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _a = read8reg(cpu, 0); const _b = ${readExpr} & 0xff; const _sa = (_a & 0x80) ? (_a - 256) : _a; const _sb = (_b & 0x80) ? (_b - 256) : _b; const _p = (_sa * _sb) & 0xffff; cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | _p) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 4 && wide) { // MUL eax, r/m32
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _a = cpu.regs.eax >>> 0; const _b = ${readExpr} >>> 0; const _aLo = _a & 0xffff, _aHi = _a >>> 16, _bLo = _b & 0xffff, _bHi = _b >>> 16; const _ll = _aLo * _bLo, _lh = _aLo * _bHi, _hl = _aHi * _bLo, _hh = _aHi * _bHi; const _mid = (_ll >>> 16) + (_lh & 0xffff) + (_hl & 0xffff); cpu.regs.eax = (((_mid & 0xffff) << 16) | (_ll & 0xffff)) >>> 0; cpu.regs.edx = (_hh + (_lh >>> 16) + (_hl >>> 16) + (_mid >>> 16)) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 5 && wide) { // IMUL eax, r/m32
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _p = BigInt(cpu.regs.eax | 0) * BigInt(${readExpr} | 0); const _m = (1n << 32n) - 1n; cpu.regs.eax = Number(_p & _m) >>> 0; cpu.regs.edx = Number((_p >> 32n) & _m) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 6 && wide) { // DIV
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _d = ${readExpr} >>> 0; if (_d === 0) throw new Error("divide by zero"); const _div = (BigInt(cpu.regs.edx >>> 0) << 32n) | BigInt(cpu.regs.eax >>> 0); const _q = _div / BigInt(_d); const _r = _div % BigInt(_d); if (_q > 0xffffffffn) throw new Error("DIV overflow"); cpu.regs.eax = Number(_q) >>> 0; cpu.regs.edx = Number(_r) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (d.regField === 7 && wide) { // IDIV
      const next = ip + 1 + d.len;
      return { jsCode: `{ const _d = BigInt(${readExpr} | 0); if (_d === 0n) throw new Error("divide by zero"); const _div = (BigInt(cpu.regs.edx | 0) << 32n) | BigInt(cpu.regs.eax >>> 0); const _q = _div / _d; const _r = _div % _d; cpu.regs.eax = Number(_q & 0xffffffffn) >>> 0; cpu.regs.edx = Number(_r & 0xffffffffn) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    return { error: `0x${opcode.toString(16)} /${d.regField}` };
  }
  // XCHG r32, r/m32 (0x87)
  if (opcode === 0x87) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    if (d.operand.kind === "reg") {
      return { jsCode: `{ const _t = cpu.regs.${REG32[d.regField]}; cpu.regs.${REG32[d.regField]} = cpu.regs.${REG32[d.operand.reg]}; cpu.regs.${REG32[d.operand.reg]} = _t; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    return { jsCode: `{ const _a = cpu.regs.${REG32[d.regField]}; const _b = mem32(cpu.memory, ${d.operand.exprJs}); cpu.regs.${REG32[d.regField]} = _b; write32(cpu.memory, ${d.operand.exprJs}, _a); } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // XCHG eax, r32 (0x91-0x97)
  if (opcode >= 0x91 && opcode <= 0x97) {
    const r = REG32[opcode - 0x90]; const next = ip + 1;
    return { jsCode: `{ const _t = cpu.regs.eax; cpu.regs.eax = cpu.regs.${r}; cpu.regs.${r} = _t; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // RET imm16 (0xc2)
  if (opcode === 0xc2) {
    const popExtra = rw(mem, ip + 1);
    return { jsCode: `cpu.regs.eip = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4 + 0x${popExtra.toString(16)}) >>> 0;`,
             len: 3, control: "ret", targets: [] };
  }
  // RET — pop into eip, JS-return
  if (opcode === 0xc3) {
    return {
      jsCode: `cpu.regs.eip = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;`,
      len: 1, control: "ret", targets: [],
    };
  }
  // LEAVE
  if (opcode === 0xc9) {
    const next = ip + 1;
    return {
      jsCode: `cpu.regs.esp = cpu.regs.ebp >>> 0; cpu.regs.ebp = mem32(cpu.memory, cpu.regs.esp); cpu.regs.esp = (cpu.regs.esp + 4) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
      len: next - addr, control: "fall", targets: [next],
    };
  }

  // MOV eax, [imm32] / MOV [imm32], eax
  if (opcode === 0xa1) {
    const a = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `cpu.regs.eax = mem32(cpu.memory, 0x${a.toString(16)}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0xa3) {
    const a = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `write32(cpu.memory, 0x${a.toString(16)}, cpu.regs.eax); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV r32, imm32 — or MOV r16, imm16 with 0x66 prefix
  if (opcode >= 0xb8 && opcode <= 0xbf) {
    const reg = opcode - 0xb8;
    if (prefix66) {
      const v = rw(mem, ip + 1); const next = ip + 3;
      return { jsCode: `write16reg(cpu, ${reg}, 0x${v.toString(16)}); cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    const v = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: `cpu.regs.${REG32[reg]} = 0x${v.toString(16)}; cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // Helper for the ModR/M-based binary ops below.
  const modrmBinary = (op2bytes, opName, applyExpr, setFlagsFn) => {
    const d = decodeModrm(mem, ip + 1);
    const next = ip + 1 + d.len;
    const left = read32opExpr(d.operand);
    const right = `cpu.regs.${REG32[d.regField]}`;
    const code = setFlagsFn
      ? `{ const _a = ${left}; const _b = ${right}; ${setFlagsFn("_a", "_b")} ${write32opStmt(d.operand, applyExpr("_a", "_b"))} } cpu.regs.eip = 0x${next.toString(16)};`
      : `${write32opStmt(d.operand, applyExpr(left, right))} cpu.regs.eip = 0x${next.toString(16)};`;
    return { jsCode: code, len: next - addr, control: "fall", targets: [next] };
  };
  const modrmBinaryRev = (opName, applyExpr, setFlagsFn) => {
    const d = decodeModrm(mem, ip + 1);
    const next = ip + 1 + d.len;
    const left = `cpu.regs.${REG32[d.regField]}`;
    const right = read32opExpr(d.operand);
    const code = setFlagsFn
      ? `{ const _a = ${left}; const _b = ${right}; ${setFlagsFn("_a", "_b")} cpu.regs.${REG32[d.regField]} = (${applyExpr("_a", "_b")}) >>> 0; } cpu.regs.eip = 0x${next.toString(16)};`
      : `cpu.regs.${REG32[d.regField]} = (${applyExpr(left, right)}) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`;
    return { jsCode: code, len: next - addr, control: "fall", targets: [next] };
  };

  // ADD r/m, r (0x01) and ADD r, r/m (0x03)
  if (opcode === 0x01) return modrmBinary(null, "ADD", (a, b) => `(${a} + ${b}) >>> 0`, (a, b) => `setAddFlags(cpu, ${a}, ${b});`);
  if (opcode === 0x03) return modrmBinaryRev("ADD", (a, b) => `(${a} + ${b}) >>> 0`, (a, b) => `setAddFlags(cpu, ${a}, ${b});`);
  // SUB
  if (opcode === 0x29) return modrmBinary(null, "SUB", (a, b) => `(${a} - ${b}) >>> 0`, (a, b) => `setSubFlags(cpu, ${a}, ${b});`);
  if (opcode === 0x2b) return modrmBinaryRev("SUB", (a, b) => `(${a} - ${b}) >>> 0`, (a, b) => `setSubFlags(cpu, ${a}, ${b});`);
  // OR
  if (opcode === 0x09) return modrmBinary(null, "OR", (a, b) => `(${a} | ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} | ${b}) >>> 0);`);
  if (opcode === 0x0b) return modrmBinaryRev("OR", (a, b) => `(${a} | ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} | ${b}) >>> 0);`);
  // AND
  if (opcode === 0x21) return modrmBinary(null, "AND", (a, b) => `(${a} & ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} & ${b}) >>> 0);`);
  if (opcode === 0x23) return modrmBinaryRev("AND", (a, b) => `(${a} & ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} & ${b}) >>> 0);`);
  // XOR
  if (opcode === 0x31) return modrmBinary(null, "XOR", (a, b) => `(${a} ^ ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} ^ ${b}) >>> 0);`);
  if (opcode === 0x33) return modrmBinaryRev("XOR", (a, b) => `(${a} ^ ${b}) >>> 0`, (a, b) => `setLogicFlags(cpu, (${a} ^ ${b}) >>> 0);`);
  // CMP
  if (opcode === 0x39) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    return { jsCode: `setSubFlags(cpu, ${read32opExpr(d.operand)}, cpu.regs.${REG32[d.regField]}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x3b) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    return { jsCode: `setSubFlags(cpu, cpu.regs.${REG32[d.regField]}, ${read32opExpr(d.operand)}); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // TEST r/m, r
  if (opcode === 0x85) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    return { jsCode: `setLogicFlags(cpu, (${read32opExpr(d.operand)} & cpu.regs.${REG32[d.regField]}) >>> 0); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV r/m, r and r, r/m
  if (opcode === 0x89) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    if (prefix66) {
      return { jsCode: `${write16opStmt(d.operand, `read16reg(cpu, ${d.regField})`)} cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    return { jsCode: `${write32opStmt(d.operand, `cpu.regs.${REG32[d.regField]}`)} cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x8b) {
    const d = decodeModrm(mem, ip + 1); const next = ip + 1 + d.len;
    if (prefix66) {
      return { jsCode: `write16reg(cpu, ${d.regField}, ${read16opExpr(d.operand)}); cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    return { jsCode: `cpu.regs.${REG32[d.regField]} = ${read32opExpr(d.operand)}; cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // LEA
  if (opcode === 0x8d) {
    const d = decodeModrm(mem, ip + 1);
    if (d.operand.kind !== "mem") return { error: "LEA with register operand" };
    const next = ip + 1 + d.len;
    return { jsCode: `cpu.regs.${REG32[d.regField]} = (${d.operand.exprJs}) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // MOV r/m, imm  (0xc7 /0)
  if (opcode === 0xc7) {
    const d = decodeModrm(mem, ip + 1);
    if (d.regField !== 0) return { error: `0xc7 /${d.regField}` };
    if (prefix66) {
      const v = rw(mem, ip + 1 + d.len); const next = ip + 1 + d.len + 2;
      return { jsCode: `${write16opStmt(d.operand, `0x${v.toString(16)}`)} cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    const v = rd(mem, ip + 1 + d.len); const next = ip + 1 + d.len + 4;
    return { jsCode: `${write32opStmt(d.operand, `0x${v.toString(16)}`)} cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // Group 0x83 (r/m, imm8)
  if (opcode === 0x83) {
    const d = decodeModrm(mem, ip + 1);
    const imm = se8(rb(mem, ip + 1 + d.len));
    const next = ip + 1 + d.len + 1;
    const a = read32opExpr(d.operand);
    let body;
    switch (d.regField) {
      case 0: body = `setAddFlags(cpu, _a, ${imm}); ${write32opStmt(d.operand, `(_a + (${imm})) >>> 0`)}`; break;
      case 1: body = `${write32opStmt(d.operand, `(_a | (${imm})) >>> 0`)} setLogicFlags(cpu, (_a | (${imm})) >>> 0);`; break;
      case 2: body = `const _c = cpu.eflags.CF; const _r = (_a + (${imm}) + _c) >>> 0; ${write32opStmt(d.operand, "_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1; cpu.eflags.CF = ((_a + ((${imm}) >>> 0) + _c) > 0xffffffff) ? 1 : 0;`; break;
      case 3: body = `const _c = cpu.eflags.CF; const _r = (_a - (${imm}) - _c) >>> 0; ${write32opStmt(d.operand, "_r")} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1; cpu.eflags.CF = (_a < (((${imm}) >>> 0) + _c)) ? 1 : 0;`; break;
      case 4: body = `${write32opStmt(d.operand, `(_a & (${imm})) >>> 0`)} setLogicFlags(cpu, (_a & (${imm})) >>> 0);`; break;
      case 5: body = `setSubFlags(cpu, _a, ${imm}); ${write32opStmt(d.operand, `(_a - (${imm})) >>> 0`)}`; break;
      case 6: body = `${write32opStmt(d.operand, `(_a ^ (${imm})) >>> 0`)} setLogicFlags(cpu, (_a ^ (${imm})) >>> 0);`; break;
      case 7: body = `setSubFlags(cpu, _a, ${imm});`; break;
      default: return { error: `0x83 /${d.regField}` };
    }
    return { jsCode: `{ const _a = ${a}; ${body} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // Group 0x81 (r/m, imm32)
  if (opcode === 0x81) {
    const d = decodeModrm(mem, ip + 1);
    const imm = rd(mem, ip + 1 + d.len);
    const next = ip + 1 + d.len + 4;
    const a = read32opExpr(d.operand);
    let body;
    switch (d.regField) {
      case 0: body = `setAddFlags(cpu, _a, 0x${imm.toString(16)}); ${write32opStmt(d.operand, `(_a + 0x${imm.toString(16)}) >>> 0`)}`; break;
      case 1: body = `${write32opStmt(d.operand, `(_a | 0x${imm.toString(16)}) >>> 0`)} setLogicFlags(cpu, (_a | 0x${imm.toString(16)}) >>> 0);`; break;
      case 4: body = `${write32opStmt(d.operand, `(_a & 0x${imm.toString(16)}) >>> 0`)} setLogicFlags(cpu, (_a & 0x${imm.toString(16)}) >>> 0);`; break;
      case 5: body = `setSubFlags(cpu, _a, 0x${imm.toString(16)}); ${write32opStmt(d.operand, `(_a - 0x${imm.toString(16)}) >>> 0`)}`; break;
      case 6: body = `${write32opStmt(d.operand, `(_a ^ 0x${imm.toString(16)}) >>> 0`)} setLogicFlags(cpu, (_a ^ 0x${imm.toString(16)}) >>> 0);`; break;
      case 7: body = `setSubFlags(cpu, _a, 0x${imm.toString(16)});`; break;
      default: return { error: `0x81 /${d.regField}` };
    }
    return { jsCode: `{ const _a = ${a}; ${body} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // Shifts 0xc1 (r/m, imm8) and 0xd1 (r/m, 1)
  const shiftOp = (cnt, modrmStart) => {
    const d = decodeModrm(mem, modrmStart);
    const next = (opcode === 0xc1) ? (modrmStart + d.len + 1) : (modrmStart + d.len);
    const a = read32opExpr(d.operand);
    let valueExpr;
    let setFlags = `cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1;`;
    switch (d.regField) {
      case 0: valueExpr = `rol32(${a}, ${cnt})`; break;
      case 1: valueExpr = `ror32(${a}, ${cnt})`; break;
      case 2: { // RCL — through carry, 33-bit rotation via BigInt
        valueExpr = `(() => { const _full = (BigInt(${a}) | (BigInt(cpu.eflags.CF) << 32n)); const _c = BigInt(${cnt} % 33); const _rot = ((_full << _c) | (_full >> (33n - _c))) & ((1n << 33n) - 1n); cpu.eflags.CF = Number((_rot >> 32n) & 1n); return Number(_rot & 0xffffffffn) >>> 0; })()`;
        setFlags = ``;
        break;
      }
      case 3: { // RCR
        valueExpr = `(() => { const _full = (BigInt(${a}) | (BigInt(cpu.eflags.CF) << 32n)); const _c = BigInt(${cnt} % 33); const _rot = ((_full >> _c) | (_full << (33n - _c))) & ((1n << 33n) - 1n); cpu.eflags.CF = Number((_rot >> 32n) & 1n); return Number(_rot & 0xffffffffn) >>> 0; })()`;
        setFlags = ``;
        break;
      }
      case 4: valueExpr = `shl32(${a}, ${cnt})`; break;
      case 5: valueExpr = `shr32(${a}, ${cnt})`; break;
      case 7: valueExpr = `sar32(${a}, ${cnt})`; break;
      default: return { error: `shift /${d.regField}` };
    }
    return { jsCode: `{ const _r = ${valueExpr}; ${write32opStmt(d.operand, "_r")} ${setFlags} } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  };
  if (opcode === 0xc1) {
    const d = decodeModrm(mem, ip + 1);
    const cnt = rb(mem, ip + 1 + d.len) & 0x1f;
    return shiftOp(cnt, ip + 1);
  }
  if (opcode === 0xd1) return shiftOp(1, ip + 1);

  // IMUL r,r/m,imm32 (0x69) and imm8 (0x6b)
  if (opcode === 0x69) {
    const d = decodeModrm(mem, ip + 1); const imm = rd(mem, ip + 1 + d.len);
    const next = ip + 1 + d.len + 4;
    return { jsCode: `cpu.regs.${REG32[d.regField]} = (Math.imul(${read32opExpr(d.operand)} | 0, 0x${imm.toString(16)} | 0) >>> 0); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  if (opcode === 0x6b) {
    const d = decodeModrm(mem, ip + 1); const imm = se8(rb(mem, ip + 1 + d.len));
    const next = ip + 1 + d.len + 1;
    return { jsCode: `cpu.regs.${REG32[d.regField]} = (Math.imul(${read32opExpr(d.operand)} | 0, ${imm}) >>> 0); cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }
  // EAX-immediate short forms
  const eaxImm = (op, body) => {
    const v = rd(mem, ip + 1); const next = ip + 5;
    return { jsCode: body(v.toString(16)) + ` cpu.regs.eip = 0x${next.toString(16)};`, len: next - addr, control: "fall", targets: [next] };
  };
  if (opcode === 0x05) return eaxImm("ADD", v => `{ const _b = 0x${v}; setAddFlags(cpu, cpu.regs.eax, _b); cpu.regs.eax = (cpu.regs.eax + _b) >>> 0; }`);
  if (opcode === 0x2d) return eaxImm("SUB", v => `{ const _b = 0x${v}; setSubFlags(cpu, cpu.regs.eax, _b); cpu.regs.eax = (cpu.regs.eax - _b) >>> 0; }`);
  if (opcode === 0x25) return eaxImm("AND", v => `{ const _v = (cpu.regs.eax & 0x${v}) >>> 0; setLogicFlags(cpu, _v); cpu.regs.eax = _v; }`);
  if (opcode === 0x0d) return eaxImm("OR",  v => `{ const _v = (cpu.regs.eax | 0x${v}) >>> 0; setLogicFlags(cpu, _v); cpu.regs.eax = _v; }`);
  if (opcode === 0x35) return eaxImm("XOR", v => `{ const _v = (cpu.regs.eax ^ 0x${v}) >>> 0; setLogicFlags(cpu, _v); cpu.regs.eax = _v; }`);
  if (opcode === 0x3d) {
    if (prefix66) {
      const v = rw(mem, ip + 1); const next = ip + 3;
      return { jsCode: `setSubFlags(cpu, cpu.regs.eax & 0xffff, 0x${v.toString(16)}); cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    return eaxImm("CMP", v => `setSubFlags(cpu, cpu.regs.eax, 0x${v});`);
  }
  if (opcode === 0xa9) return eaxImm("TEST", v => `setLogicFlags(cpu, (cpu.regs.eax & 0x${v}) >>> 0);`);

  // INC/DEC r/m8 (0xfe)
  if (opcode === 0xfe) {
    const d = decodeModrm(mem, ip + 1);
    const next = ip + 1 + d.len;
    const readByte = d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`;
    const writeByte = (v) => d.operand.kind === "reg" ? `write8reg(cpu, ${d.operand.reg}, ${v})` : `write8(cpu.memory, ${d.operand.exprJs}, ${v})`;
    let op;
    if (d.regField === 0) op = `(_a + 1) & 0xff`;
    else if (d.regField === 1) op = `(_a - 1) & 0xff`;
    else return { error: `0xfe /${d.regField}` };
    return { jsCode: `{ const _a = ${readByte}; const _r = ${op}; ${writeByte("_r")}; cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 7) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // ---- Branches ----
  // JMP rel8 — emits a tail-call dispatch if target is outside our function.
  if (opcode === 0xeb) {
    const target = (ip + 2 + se8(rb(mem, ip + 1))) >>> 0;
    return { jsCode: goto_(target), len: 2, control: isOutOfBounds(target) ? "jmp_tail" : "jmp", targets: isOutOfBounds(target) ? [] : [target] };
  }
  // JMP rel32
  if (opcode === 0xe9) {
    const target = (ip + 5 + (rd(mem, ip + 1) | 0)) >>> 0;
    return { jsCode: goto_(target), len: 5, control: isOutOfBounds(target) ? "jmp_tail" : "jmp", targets: isOutOfBounds(target) ? [] : [target] };
  }
  // CALL rel32
  if (opcode === 0xe8) {
    const fallthrough = (ip + 5) >>> 0;
    const target = (fallthrough + (rd(mem, ip + 1) | 0)) >>> 0;
    const code =
      `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; ` +
      `write32(cpu.memory, cpu.regs.esp, 0x${fallthrough.toString(16)}); ` +
      `dispatch(cpu, 0x${target.toString(16)}, 0x${fallthrough.toString(16)});`;
    return { jsCode: code, len: 5, control: "call", targets: [fallthrough] };
  }
  // Jcc rel8
  if (opcode >= 0x70 && opcode <= 0x7f) {
    const target = (ip + 2 + se8(rb(mem, ip + 1))) >>> 0;
    const fallthrough = (ip + 2) >>> 0;
    const cond = jccCondJs(opcode & 0xf);
    const targets = [];
    if (!isOutOfBounds(target)) targets.push(target);
    if (!isOutOfBounds(fallthrough)) targets.push(fallthrough);
    return { jsCode: cond_(target, fallthrough, cond), len: 2, control: "jcc", targets };
  }
  // 0x0f xx
  if (opcode === 0x0f) {
    const op2 = rb(mem, ip + 1);
    if (op2 >= 0x80 && op2 <= 0x8f) { // Jcc rel32
      const target = (ip + 6 + (rd(mem, ip + 2) | 0)) >>> 0;
      const fallthrough = (ip + 6) >>> 0;
      const cond = jccCondJs(op2 & 0xf);
      const targets = [];
      if (!isOutOfBounds(target)) targets.push(target);
      if (!isOutOfBounds(fallthrough)) targets.push(fallthrough);
      return { jsCode: cond_(target, fallthrough, cond), len: 6, control: "jcc", targets };
    }
    // SETcc r/m8 (0x0f 90..9f)
    if (op2 >= 0x90 && op2 <= 0x9f) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const cond = jccCondJs(op2 & 0xf);
      const writeStmt = d.operand.kind === "reg"
        ? `write8reg(cpu, ${d.operand.reg}, _v);`
        : `write8(cpu.memory, ${d.operand.exprJs}, _v);`;
      return { jsCode: `{ const _v = (${cond}) ? 1 : 0; ${writeStmt} } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f b3 — BTR r/m32, r32 (variable bit reset)
    if (op2 === 0xb3) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const writeStmt = (v) => d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = (${v}) >>> 0;` : `write32(cpu.memory, ${d.operand.exprJs}, (${v}) >>> 0);`;
      return { jsCode: `{ const _a = ${readExpr}; const _b = cpu.regs.${REG32[d.regField]} & 0x1f; cpu.eflags.CF = (_a >>> _b) & 1; ${writeStmt("(_a & ~(1 << _b))")} } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f bc / 0x0f bd — BSF / BSR
    if (op2 === 0xbc || op2 === 0xbd) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const loop = op2 === 0xbc
        ? `for (let i = 0; i < 32; i++) if ((_a >>> i) & 1) { _bit = i; break; }`
        : `for (let i = 31; i >= 0; i--) if ((_a >>> i) & 1) { _bit = i; break; }`;
      return { jsCode: `{ const _a = ${readExpr}; if (_a === 0) cpu.eflags.ZF = 1; else { cpu.eflags.ZF = 0; let _bit = 0; ${loop} cpu.regs.${REG32[d.regField]} = _bit >>> 0; } } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f a3 — BT r/m32, r32
    if (op2 === 0xa3) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      return { jsCode: `{ const _a = ${readExpr}; const _b = cpu.regs.${REG32[d.regField]} & 0x1f; cpu.eflags.CF = (_a >>> _b) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f ab — BTS r/m32, r32
    if (op2 === 0xab) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const writeStmt = (v) => d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = (${v}) >>> 0;` : `write32(cpu.memory, ${d.operand.exprJs}, (${v}) >>> 0);`;
      return { jsCode: `{ const _a = ${readExpr}; const _b = cpu.regs.${REG32[d.regField]} & 0x1f; cpu.eflags.CF = (_a >>> _b) & 1; ${writeStmt("(_a | (1 << _b))")} } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f af — IMUL r32, r/m32 (no immediate)
    if (op2 === 0xaf) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const right = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      return { jsCode: `cpu.regs.${REG32[d.regField]} = (Math.imul(cpu.regs.${REG32[d.regField]} | 0, ${right} | 0)) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // 0x0f ba — BT/BTS/BTR/BTC r/m32, imm8
    if (op2 === 0xba) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len + 1;
      const imm = rb(mem, ip + 2 + d.len) & 0x1f;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const writeStmt = (v) => d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = (${v}) >>> 0;` : `write32(cpu.memory, ${d.operand.exprJs}, (${v}) >>> 0);`;
      let mutate = "";
      switch (d.regField) {
        case 4: break;
        case 5: mutate = writeStmt(`(_a | (1 << ${imm}))`); break;
        case 6: mutate = writeStmt(`(_a & ~(1 << ${imm}))`); break;
        case 7: mutate = writeStmt(`(_a ^ (1 << ${imm}))`); break;
        default: return { error: `0f ba /${d.regField}` };
      }
      return { jsCode: `{ const _a = ${readExpr}; cpu.eflags.CF = (_a >>> ${imm}) & 1; ${mutate} } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    if (op2 === 0xb6 || op2 === 0xb7 || op2 === 0xbe || op2 === 0xbf) {
      const d = decodeModrm(mem, ip + 2); const next = ip + 2 + d.len;
      const isWord = (op2 === 0xb7 || op2 === 0xbf);
      const isSigned = (op2 === 0xbe || op2 === 0xbf);
      const readExpr = isWord
        ? (d.operand.kind === "reg" ? `(cpu.regs.${REG32[d.operand.reg]} & 0xffff)` : `mem16(cpu.memory, ${d.operand.exprJs})`)
        : (d.operand.kind === "reg" ? `read8reg(cpu, ${d.operand.reg})` : `mem8(cpu.memory, ${d.operand.exprJs})`);
      const value = isSigned ? (isWord ? `signExtend16(${readExpr})` : `signExtend8(${readExpr})`) : readExpr;
      return { jsCode: `cpu.regs.${REG32[d.regField]} = (${value}) >>> 0; cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }
    // Indirect call/jmp via 0xff family appears as opcode 0xff, not 0x0f. So 0x0f tail is just unsupported.
    return { error: `0f ${op2.toString(16)}` };
  }
  // x87 floating-point (0xd8 - 0xdf): delegate the single instruction to the
  // interpreter. The lifted function still runs JS for everything else; only
  // the x87 instruction is interpreted. We still need to compute the length
  // to advance eip to the next case.
  if (opcode >= 0xd8 && opcode <= 0xdf) {
    const modrm = rb(mem, ip + 1);
    const mod = (modrm >> 6) & 0x3;
    let len;
    if (mod === 3) {
      len = 2; // opcode + modrm
    } else {
      // Memory form: same length as a normal ModR/M memory operand
      const d = decodeModrm(mem, ip + 1);
      len = 1 + d.len; // opcode byte + (modrm + disp + maybe SIB)
    }
    const next = ip + len;
    return { jsCode: `stepInterp(cpu, 0x${ip.toString(16)});`,
             len: next - addr, control: "fall", targets: [next] };
  }

  // 0xff group — call/jmp indirect, push r/m32, inc/dec r/m32
  if (opcode === 0xff) {
    const modrm = rb(mem, ip + 1);
    const mod = (modrm >> 6) & 0x3;
    const subOp = (modrm >> 3) & 0x7;
    const rm = modrm & 0x7;

    // /6 PUSH r/m32 — supported (but rare; functions usually push imm/reg)
    // /4 JMP r/m32 — indirect jump; if it's a SIB jump table, try static resolution.
    // /2 CALL r/m32 — indirect call; bail (vtable-style; would need runtime dispatch table).
    // /0 INC r/m32, /1 DEC r/m32 — supported.

    if (subOp === 0 || subOp === 1) {
      const d = decodeModrm(mem, ip + 1);
      const next = ip + 1 + d.len;
      const op = subOp === 0 ? "+" : "-";
      if (prefix66) {
        const readExpr = d.operand.kind === "reg" ? `read16reg(cpu, ${d.operand.reg})` : `mem16(cpu.memory, ${d.operand.exprJs})`;
        const writeStmt = d.operand.kind === "reg" ? `write16reg(cpu, ${d.operand.reg}, _r);` : `write16(cpu.memory, ${d.operand.exprJs}, _r);`;
        return { jsCode: `{ const _a = ${readExpr}; const _r = (_a ${op} 1) & 0xffff; ${writeStmt} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 15) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
                 len: next - addr, control: "fall", targets: [next] };
      }
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const writeStmt = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]} = _r;` : `write32(cpu.memory, ${d.operand.exprJs}, _r);`;
      return { jsCode: `{ const _a = ${readExpr}; const _r = (_a ${op} 1) >>> 0; ${writeStmt} cpu.eflags.ZF = (_r === 0) ? 1 : 0; cpu.eflags.SF = (_r >>> 31) & 1; } cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }

    if (subOp === 6) { // PUSH r/m32
      const d = decodeModrm(mem, ip + 1);
      const next = ip + 1 + d.len;
      const readExpr = d.operand.kind === "reg" ? `cpu.regs.${REG32[d.operand.reg]}` : `mem32(cpu.memory, ${d.operand.exprJs})`;
      return { jsCode: `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; write32(cpu.memory, cpu.regs.esp, ${readExpr}); cpu.regs.eip = 0x${next.toString(16)};`,
               len: next - addr, control: "fall", targets: [next] };
    }

    if (subOp === 4) {
      // JMP r/m32. Try static jump-table resolution for the canonical SIB
      // pattern: jmp dword ptr [reg*4 + disp32]
      if (mod === 0 && rm === 4) {
        const sib = rb(mem, ip + 2);
        const sibScale = 1 << ((sib >> 6) & 0x3);
        const indexIdx = (sib >> 3) & 0x7;
        const baseIdx = sib & 0x7;
        if (sibScale === 4 && indexIdx !== 4 && baseIdx === 5) {
          const tableBase = rd(mem, ip + 3);
          return {
            jsCode: `cpu.regs.eip = mem32(cpu.memory, ((cpu.regs.${REG32[indexIdx]} * 4) + 0x${tableBase.toString(16)}) >>> 0);`,
            len: 7,
            control: "jmp_table",
            tableBase,
            targets: [],
          };
        }
      }
      // Other indirect jumps — emit a tail-call dispatch on the runtime-computed
      // target. The lifted function ends here (return); whatever dispatch resolves
      // the target to runs to completion.
      const d = decodeModrm(mem, ip + 1);
      const targetExpr = d.operand.kind === "reg"
        ? `cpu.regs.${REG32[d.operand.reg]}`
        : `mem32(cpu.memory, ${d.operand.exprJs})`;
      return {
        jsCode: `dispatch(cpu, ${targetExpr}, 0); return;`,
        len: 1 + d.len,
        control: "jmp_tail",
        targets: [],
      };
    }

    if (subOp === 2) {
      // CALL r/m32 — runtime indirect dispatch. Target is computed at execution
      // time; the dispatcher resolves it to a lifted function or interpreter.
      const d = decodeModrm(mem, ip + 1);
      const next = ip + 1 + d.len;
      const targetExpr = d.operand.kind === "reg"
        ? `cpu.regs.${REG32[d.operand.reg]}`
        : `mem32(cpu.memory, ${d.operand.exprJs})`;
      const code =
        `cpu.regs.esp = (cpu.regs.esp - 4) >>> 0; ` +
        `write32(cpu.memory, cpu.regs.esp, 0x${next.toString(16)}); ` +
        `dispatch(cpu, ${targetExpr}, 0x${next.toString(16)});`;
      return { jsCode: code, len: next - addr, control: "call", targets: [next] };
    }

    // /3 CALL m16:32, /5 JMP m16:32 — bail (segmented far calls; obsolete in 32-bit flat)
    return { error: `indirect (0xff /${subOp})`, indirect: true };
  }

  return { error: `opcode 0x${opcode.toString(16)}` };
}

function jccCondJs(cc) {
  switch (cc) {
    case 0x0: return "cpu.eflags.OF === 1";
    case 0x1: return "cpu.eflags.OF === 0";
    case 0x2: return "cpu.eflags.CF === 1";
    case 0x3: return "cpu.eflags.CF === 0";
    case 0x4: return "cpu.eflags.ZF === 1";
    case 0x5: return "cpu.eflags.ZF === 0";
    case 0x6: return "cpu.eflags.CF === 1 || cpu.eflags.ZF === 1";
    case 0x7: return "cpu.eflags.CF === 0 && cpu.eflags.ZF === 0";
    case 0x8: return "cpu.eflags.SF === 1";
    case 0x9: return "cpu.eflags.SF === 0";
    case 0xa: return "false"; // JP — PF not tracked, treat as never taken
    case 0xb: return "true";  // JNP — complement
    case 0xc: return "cpu.eflags.SF !== cpu.eflags.OF";
    case 0xd: return "cpu.eflags.SF === cpu.eflags.OF";
    case 0xe: return "cpu.eflags.ZF === 1 || cpu.eflags.SF !== cpu.eflags.OF";
    case 0xf: return "cpu.eflags.ZF === 0 && cpu.eflags.SF === cpu.eflags.OF";
    default: throw new Error(`bad Jcc cc=${cc}`);
  }
}

// ---- Function-level lift: recursive disassembly bounded by [funcAddr, endAddr) ----
export function liftFunction(memory, funcAddr, endAddr) {
  const visited = new Map();
  const worklist = [funcAddr];
  const bounds = { funcStart: funcAddr, funcEnd: endAddr };

  while (worklist.length) {
    const a = worklist.pop();
    if (visited.has(a)) continue;
    if (a < funcAddr || a >= endAddr) {
      // Out-of-function targets are tail calls — handled inline by liftInstruction
      // (it emits dispatch+return). The instruction that referred to this address
      // shouldn't have added it to the worklist; if we got here, it's a bug.
      // Defensive: just skip it.
      continue;
    }
    let inst;
    try { inst = liftInstruction(memory, a, bounds); }
    catch (e) { return { status: "error", reason: `decode failed at 0x${a.toString(16)}: ${e.message}` }; }
    if (inst.error) {
      if (inst.indirect) return { status: "indirect", reason: `indirect at 0x${a.toString(16)}` };
      return { status: "unsupported", reason: `${inst.error} at 0x${a.toString(16)}` };
    }

    // Static jump-table resolution: read entries from the table until one
    // falls outside the function bounds. Each in-bounds entry becomes a
    // worklist target. If zero entries are in-bounds, fall back to runtime
    // indirect dispatch (the table targets are tail calls to other functions).
    if (inst.control === "jmp_table") {
      const tableTargets = [];
      const MAX_ENTRIES = 256;
      for (let i = 0; i < MAX_ENTRIES; i++) {
        const entryAddr = inst.tableBase + i * 4;
        if (entryAddr + 4 > memory.length) break;
        const target = (memory[entryAddr] | (memory[entryAddr + 1] << 8) |
                        (memory[entryAddr + 2] << 16) | (memory[entryAddr + 3] << 24)) >>> 0;
        if (target < funcAddr || target >= endAddr) break;
        tableTargets.push(target);
      }
      if (tableTargets.length === 0) {
        // No in-bounds targets — emit runtime tail-call dispatch on whatever
        // mem32(cpu.memory, ...) resolves to at execution time.
        inst.jsCode = inst.jsCode.replace(
          /cpu\.regs\.eip = mem32\(cpu\.memory, ([^)]+)\);/,
          `dispatch(cpu, mem32(cpu.memory, $1), 0); return;`,
        );
        inst.control = "jmp_tail";
        inst.targets = [];
      } else {
        inst.targets = tableTargets;
      }
    }

    visited.set(a, inst);
    for (const t of inst.targets) worklist.push(t);
  }

  // Emit function body
  const sortedAddrs = [...visited.keys()].sort((a, b) => a - b);
  const lines = [`export function fn_${hex(funcAddr)}(cpu) {`];
  lines.push(`  while (true) switch (cpu.regs.eip) {`);
  for (const a of sortedAddrs) {
    const inst = visited.get(a);
    // ret: pops eip and exits the JS function via return;
    // jmp_tail: jsCode already ends with `return;` (the dispatch+return pattern).
    // everything else: continue; re-enters the switch for the new eip.
    let tail;
    if (inst.control === "ret") tail = "return;";
    else if (inst.control === "jmp_tail") tail = "";
    else tail = "continue;";
    lines.push(`    case 0x${a.toString(16)}: ${inst.jsCode} ${tail}`);
  }
  lines.push(`    default: throw new Error("unmapped eip 0x" + cpu.regs.eip.toString(16) + " in fn_${hex(funcAddr)}");`);
  lines.push(`  }`);
  lines.push(`}`);
  return {
    status: "lifted",
    jsSource: lines.join("\n"),
    instCount: visited.size,
    byteSize: sortedAddrs[sortedAddrs.length - 1] - funcAddr + visited.get(sortedAddrs[sortedAddrs.length - 1]).len,
  };
}

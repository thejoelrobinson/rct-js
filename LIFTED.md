# Static Lifter — Coverage Report

The static lifter (`lifter/lift.js`) walks the same x86-32 decode tree as the interpreter (`harness/x86.js`) but emits JS strings instead of executing CPU mutations. One pass over `decompiled_all.c`'s 1,185 known function entries produces `generated/all.js` containing JS bodies for 93.9% of the binary's functions.

## Coverage (after Phase 9)

| Status      | Count | %    | Note |
|------------ |-------|------|------|
| **lifted**      | **1113** | **93.9%** | Pure JS, byte-equal to interpreter on all sampled inputs. |
| unsupported | 60    | 5.1% | Obsolete instructions (LES/LDS/BOUND/far calls) and likely data-as-code. |
| indirect    | 12    | 1.0% | Obsolete far call/jmp through memory (`0xff /3`, `/5`). |
| outOfBounds | 0     | 0%   | All tail-call jumps now handled via `dispatch(cpu, target, 0); return;`. |

**67,205 instructions** in the lifted bodies — most of the binary's executable code.

## Phase progression (this session)

| Phase | Lifted | Cumulative | Notes |
|-------|--------|---|-------|
| 7c (initial 30 opcodes) | 170  | 170  | First batch — proved viability |
| 7c (8-bit MOV / push imm / 8-bit ALU) | 393  | 393  | |
| 7c (shifts / cdq / 0xfe / segment-prefix) | 500  | 500  | |
| 8a-8b (loop, BT-reg, mul/r/m8, rep/string) | 539  | 539  | |
| 8c (jump-table detection) | 628  | 628  | Static `jmp [reg*4 + const]` resolution |
| 8c (`call [reg+disp]` runtime dispatch) | 954  | 954  | **+326 — biggest single jump** |
| 8d (ADC/SBB family + BTR/BSF/BSR) | 989  | 989  | |
| **9a-9b (x87 FPU)** | 1001 | 1001 | FPU stack model + interpreter delegation |
| **9c (tail-call dispatch)** | 1051 | 1051 | OOB → 0 |
| 9d (segment regs + SETcc + SAHF + IN/OUT + RCL/RCR + ENTER) | **1113** | **1113** | Final cleanup |

## Validation

`test/lifted.test.js` samples 50 lifted functions and runs each through both the interpreter and the generated JS, with random register state across multiple seeds. **All 50 sampled lifts produce byte-equal output to the interpreter** for every seed they execute on. The OOB-on-garbage-pointers cases throw at the same address on both sides.

This is differential testing as ground truth: the interpreter is the oracle (~1,800 lines, validated against the original binary across the 6 manual ports' tests), and the lifter must match it byte-for-byte.

## Architecture

- `harness/x86.js` (~1,800 lines, ~80 opcode families) — the interpreter:
  - All standard 32-bit ALU and ModR/M + SIB
  - 8-bit and 16-bit operand variants
  - Full ADC/SBB/RCL/RCR carry-aware family
  - Static and indirect jump tables
  - **Full x87 FPU**: 8-slot stack, FLD/FSTP/FILD/FISTP/FADD/FSUB/FMUL/FDIV/FCHS/FABS/FSQRT/FSIN/FCOS/FCOMP/FUCOMP/FNSTSW etc.
  - `rep`/`repne` + string ops (movsb, movsd, stosb, stosd, lodsb, lodsd, scasb, scasd, cmpsb, cmpsd)
  - All Jcc conditions, LOOP, LOOPE, LOOPNE, JECXZ
  - SETcc family
  - Segment-register pushes/pops (no-op in flat mode)
  - Port I/O (no-op stub)
  - x87 sync (WAIT), interrupt enable/disable (no-op), HLT (no-op)

- `lifter/lift.js` (~1,277 lines) — mirrors `step()` decode tree, emits JS strings
- `lifter/runtime.js` (~142 lines) — helpers + `dispatch(cpu, target, fallthrough)` with three modes:
  - Lifted target → call directly
  - Unlifted target with fallthrough → step interpreter until eip == fallthrough
  - Tail call (fallthrough = 0) → step interpreter until esp rises above entry value
- x87 instructions in lifted code use `stepInterp(cpu, addr)` which delegates to the interpreter for that single instruction. The lifted function still runs JS for everything else.

## Top remaining blockers (60 unsupported)

| Count | Blocker | Why we don't lift it |
|-------|---------|----------------------|
| 12 | `indirect` (`0xff /3`, `/5`) | Obsolete far call/jmp through memory; segment-relative addressing not supported. |
| 7  | `0xfe /7` | Invalid encoding — almost certainly data-as-code (lifter following control flow into a data section). |
| 7  | `0xc5` | LDS — load far pointer DS:reg. Obsolete in flat 32-bit. |
| 6  | `0x62` | BOUND — array bounds check. Obsolete. |
| 5  | `rep prefix on 0x66` | Rare combination: rep with 16-bit operand-size prefix. |
| 4  | `0xc4` | LES — load far pointer ES:reg. Obsolete. |
| 4  | `0x0f 66` | Likely garbage (no real meaning in 32-bit code). |
| 3  | `0x6d` | INSD — port I/O input string. |
| 3  | `0x9a` | Far call ptr16:32 — obsolete. |

Most of these are obsolete instructions that shouldn't appear in real 32-bit flat code. They may indicate the lifter is following control flow into data sections (jump tables that include data offsets, padding bytes, etc.). Fixing the underlying issue (better function-bound discovery) would close most of the remaining gap.

## How to use

```bash
npm run lift            # regenerate generated/all.js + manifest.json
npm test                # run all tests
```

```js
import { lifted } from "./generated/all.js";
import { setLiftedTable } from "./lifter/runtime.js";
setLiftedTable(lifted);

const cpu = makeCpu(memory);
cpu.regs.esp = stackTop - 4;
write32(memory, cpu.regs.esp, RET_SENTINEL);
cpu.regs.eip = 0x005df40c;
lifted[0x005df40c](cpu);
// cpu.regs.eax now contains the function's output
```

For unlifted addresses, dispatch to the interpreter:

```js
import { dispatch } from "./lifter/runtime.js";
dispatch(cpu, target_address, fallthrough_address);
// or for tail calls:
dispatch(cpu, target_address, 0);
```

# Ported Functions

| Address | OpenRCT2 name | Port | Description | Tests |
|---|---|---|---|---|
| `0x005df40c` | **`ScenarioRand()`** (`RotateEngine<uint32_t, 0x1234567F, 7, 3>::operator()`) | `src/rng.js` → `prngStep(state)` | Scenario PRNG. Two 32-bit seeds at `0x6e3b88`/`0x6e3b8c`. Algorithm verified line-for-line against `OpenRCT2/src/openrct2/core/Random.hpp:164`. | `test/rng.test.js` (1k+ fuzz inputs, 100-step chained sequence) |
| `0x00403a92` | *(unidentified — RCT1-specific address)* | `src/window.js` → `isHandleSet(global)` | Boolean predicate over `[0x5e91e0]`. Likely "main window handle valid" check. Compiler-emitted (.text). | `test/window.test.js` (200 random inputs) |
| `0x00441891` | *(unidentified)* | `src/struct_field.js` → `clearFieldCC(buf, esiOffset)` | Writes `0xFFFFFFFF` to `[esi + 0xCC]`. Likely "invalidate handle" or "reset entity field" helper. | `test/struct_field.test.js` (1 test) |
| `0x005df1ff` | *(unidentified)* | `src/saturate.js` → `saturatingIncrementByte(buf, off)` | Increments `[esi + 0x5]`; if it would wrap to 0, backs off to 0xFF. Saturating-clamp idiom. Tests the INC/JNE-with-ZF interaction. | `test/saturate.test.js` (256 inputs, all byte values) |
| `0x004269d0` | *(unidentified)* | `src/tooltip.js` → `clearTooltipGlobal(memory)` | Writes a 16-bit zero to `[0x87c3ac]` while preserving the surrounding word's high 16 bits. First port that exercises the `0x66` operand-size prefix on `0xc7 /0` (mov word ptr [...], imm16). | `test/tooltip.test.js` (1 test) |
| `0x0041fa6f` | *(unidentified — 3D-vector projection / coord transform)* | `src/coord_xform.js` → `coordTransform(struct, phase=7)` | **244-byte function, 7 phases, ~50 instructions.** Reads three input fields (signed s16 at +0xac and +0xae, unsigned u16 at +0xb0), applies fixed-point Q16 multiplications with 8 different coefficients, plus conditional clamps and threshold-based branching. Outputs three accumulators (ebx/ecx/ebp). The `phase` argument lets callers compute up to a chosen phase — used by the test to validate each progressive ret-overlay milestone. | `test/coord_xform.test.js` (7 milestones × 64 random inputs each + 200-input full-function fuzz, all byte-equal) |

**Total**: 6 functions ported, **26/26 tests passing**, all byte-equal to `rct.exe` running on the in-process x86-32 interpreter.

## Harness-level tests (no JS port — validate the interpreter)

| Test file | What it validates |
|---|---|
| `test/sib.test.js` | SIB addressing across 3 synthetic encodings (`[i*4+disp32]`, `[base+i*4]`, LEA `[i*2+base+disp8]`). |
| `test/sib_invivo.test.js` | Executes a fragment of `FUN_004314c5` (`movzx`/SIB-load/`sar`) directly from the binary's bytes by overlaying a `ret` after the SIB load. Proves SIB decoding works on Sawyer's actual code, not just synthetic encodings. |

The in-vivo technique — **overlay a `ret` byte to bound execution to a fragment of a real function** — is the methodological breakthrough of Phases 4–5. It lets us validate the interpreter on fragments of arbitrarily large functions without committing to a full function port. `test/sib_invivo.test.js` (a fragment of the real `FUN_004314c5`) demonstrates it on Sawyer's actual code.

## Methodology recap

Every entry passes byte-equal differential tests against the original `rct.exe`. Adding a function:

1. `objdump -d --start-address=<addr>` to see actual bytes/opcodes.
2. If interpreter doesn't yet support an opcode → add a case in `harness/x86.js`.
3. Write the JS port in `src/<area>.js`.
4. Write a fuzz test in `test/<area>.test.js` using `fc.assert` + `runOriginal()` + the JS port.
5. If `npm test` passes 100s+ of fuzz inputs, the port is canonical.

## Interpreter coverage (mnemonic-level)

**97.4% of instructions across `.text` + `CODESEG` are now supported by mnemonic** (up from 81.2% at end of Phase 2). Note: byte-level coverage is lower — supporting `mov` doesn't mean we handle every addressing mode. Counts come from `tools/coverage.js`.

Currently supported (by mnemonic):
- Stack/flow: `push`, `pop`, `pushal`, `popal`, `ret`, `call` (rel32), `leave`, `nop`, `jmp` (rel8/32), `Jcc` (most conditions, rel8/32)
- Moves: `mov` (most forms incl. r↔r, r↔m, immediates, direct addressing), `lea`, `movzx`/`movsx` (8/16-bit sources)
- Arithmetic: `add`, `sub`, `cmp`, `inc`, `dec` (32-bit + r/m8 inc/dec)
- Logic: `and`, `or`, `xor`, `test`
- Shifts/rotates: `rol`, `ror`, `shl`, `shr`, `sar` (via 0xc1)
- Multiplication: `imul r,r/m,imm32` and `imul r,r/m,imm8`

The `0x66` operand-size prefix is parsed but only changes width on a few opcodes; many 16-bit forms still need explicit handling.

## Tools

- `tools/coverage.js` — disassemble sections, count mnemonics, report supported/missing
- `tools/find_small.js` — scan all 1,185 known function entries; rank by instruction count to surface tiny port candidates
- `harness/diff.js` — pretty-print register/memory state diffs (used by `test/diff_demo.test.js`)

## Known deferred

- `FUN_005e43de` (called 73×) — uses 16-bit operand prefix on `mov`/`add` and tail-calls into another function. Need 16-bit operand-size support on more instructions to port cleanly.
- Floating point / SSE — not yet attempted (likely needed for ride physics).
- 16-bit operand-size prefix (`0x66`) is parsed but most opcodes don't yet branch on it. Affects `mov word ptr ...`, `add ax, ...`, etc. — common in CODESEG.

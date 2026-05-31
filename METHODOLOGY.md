# Porting a Windows x86 Binary to a Modern Language: A Repeatable Method

This document is the transferable deliverable of the rct-js project. RollerCoaster
Tycoon 1 (`binary/rct.exe`) was **test subject #1**; the goal was never a playable
game — it was to develop a **repeatable methodology** for taking a Windows program
originally written in x86 assembly and porting it to a modern language (here, JS),
then doing it again on the next binary.

All metrics below are measured from this project's tooling, not estimated.

---

## The core idea

A stripped binary has no source, no names, no types — but it **is its own
executable specification**. Every other artifact (decompiler output, a clean-room
reimplementation, your hand-written port) is a *hypothesis* about what the binary
does. The method is therefore built around one non-negotiable authority:

> **An in-process interpreter running the original binary is the oracle. Your port
> is correct iff it produces the same observable effects as the binary on the same
> input. Nothing else — not the decompiler, not a reference reimplementation —
> overrides it.**

Everything else is scaffolding to make hypotheses cheaply and check them against
that oracle.

---

## The pipeline (7 stages)

| # | Stage | Generalizable? | Tooling in this repo |
|---|-------|----------------|----------------------|
| 1 | **Extract** PE → sections at virtual addresses | ✅ any PE | `harness/loader-node.js`, `decompiled/data.bin` |
| 2 | **Decompile** to C (per-function) | ✅ any binary Ghidra eats | Ghidra → `decompiled/c/*.c` (1,214 fns) |
| 3 | **Auto-translate** C → target language | ✅ general (tree-sitter) | `tools/c-to-js/` → `ported/auto/*.js` (1,238 files) |
| 4 | **Shim** the OS/API boundary | ◐ per-OS, reusable across binaries | `runtime/win32/*.js` |
| 5 | **Oracle**: differential-test vs an in-process interpreter on the raw binary | ✅✅ **the crown jewel — needs no source** | `harness/x86.js`, `harness/emulator.js`, `tools/verify-fn.js`, `tools/diff-lockstep.js` |
| 6 | **Recover structure** from behavior (call graph, data layout) | ✅ general | `tools/trace-callgraph.js`, `tools/atlas-build.js` |
| 7 | **Rewrite** to idiomatic code, gated by the oracle | ✅ general | `runtime/native/`, per-function gate tests |

Stages 1–3 get you running-but-opaque code. Stage 4 is the only per-OS cost.
Stages 5–7 are where understanding and correctness come from, and they are the
reusable heart of the method.

### Why stage 5 is the crown jewel
The interpreter loads the binary's code section and executes it instruction by
instruction over the same memory model as your port. Given identical entry state
(registers + memory), the binary's output is ground truth **for free**, with no
source code, no symbols, and no reference implementation. This is what makes the
method work on binaries that have *nothing* else to compare against.

---

## What actually transfers vs. what is per-target

- **Transfers unchanged:** the differential-oracle pattern (stage 5), the
  structure-from-behavior tools (stage 6), the rewrite-gated-by-oracle loop
  (stage 7), and the C→target translator skeleton (stage 3).
- **Per-OS, write once / reuse across binaries:** the API shim layer (stage 4).
  For Win32 that's the kernel32/user32/ddraw/dsound surface.
- **Per-target, but cheap:** the decompile (stage 2 is push-button) and the
  list of struct base addresses for the atlas (stage 6).

---

## Measured results on test subject #1 (RCT1)

| Metric | Value | Source |
|--------|-------|--------|
| Decompiled functions | **1,214** | `decompiled/c/*.c` |
| Auto-translated + wired | **1,227** in dispatch | `ported/auto/_dispatch.js` |
| Hand-fixed (`@manual`) over translator bugs | **178** (~15%) | `grep -l '^// @manual' ported/auto/*.js` |
| Auto-translation oracle pass-rate (testable leaf fns) | **52.3%** (34/65), 98.5% consistent | `tools/bulk-diff-report.json` |
| Indirect-call sites invisible to static analysis | **277** | `grep callIndirect` |
| Indirect calls captured in one title-tick trace | **6,381** | `tools/dynamic-callgraph.json` |
| Call-graph edges recovered that static analysis missed | **+70 edges, +28 fns** | same |
| Struct fields recovered from the answer key (Peep/Ride) | **93 / 124** | `tools/struct-offsets.json` |
| Atlas entries (address→meaning) | **560**, 10 algorithm-matched | `tools/atlas.json` |
| End-to-end oracle-verified gameplay functions | **1** (0x43e7ef), 3/3 gate tests | `test/runtime/verify_peep_0x43e7ef.test.js` |

**Reading of these numbers:** push-button auto-translation gets ~half of leaf
functions byte-correct out of the box; the long tail needs the oracle + targeted
fixes. The static call graph is badly incomplete (277 unseen indirect sites) until
behavioral tracing fills it in. The "answer key" (below) recovers data layout
essentially for free where it exists.

---

## Recovering structure from behavior (stage 6)

Two techniques, both source-free:

1. **Dynamic call graph** (`tools/trace-callgraph.js`). Static import edges miss
   every indirect (function-pointer) call. Instead of bridging the interpreter
   into the OS layer, exploit that in a running port *all* indirect calls funnel
   through one dispatcher (`callIndirect`); hook it, recover the caller from the
   stack and the callee from the resolved target. One title-tick run recovered
   6,381 indirect calls and 70 edges the static graph never had.

2. **Data-layout atlas** (`tools/atlas-build.js`). Map each function to the struct
   fields it touches, by cross-referencing (a) which functions reference a struct
   array's base address, (b) the offset literals they use, and (c) an
   offset→field table. The atlas turns `heap.u8(p+0x3a)` into `peep.Happiness`.

### The "answer key" caveat (important for generalization)
RCT is an unusually *favorable* test subject: a clean-room reimplementation
(OpenRCT2) exists, providing exact struct layouts and readable algorithms. This
project used it freely — and validated the approach by having the atlas
**auto-rederive** struct offsets that a human had previously reverse-engineered by
hand (e.g. `0x42635e`'s peep fields matched its hand-written `@manual` note).

**But the method must not depend on an answer key, because most binaries have
none.** Two honest findings about its limits:
- OpenRCT2 implements **RCT2** algorithms; the binary is **RCT1**. They differ
  (observed: the binary writes `Happiness=128` where OpenRCT2 writes `250`). The
  answer key NAMES things and guides understanding; only the oracle proves bytes.
- The static offset-scan misses **register-based** struct access (the hottest peep
  code uses `unaff_ESI + 0x30`, not a base literal), so atlas field-coverage is a
  hint, not ground truth. The robust, source-free upgrade is a dynamic
  field-access trace via the heap watchpoint (`_heapWatch` / `_x86Watch`).

For a no-answer-key target, stages 5–6 still stand alone: the oracle gives
correctness, behavioral tracing gives structure; you lose only the human-readable
names, which you supply yourself as you go.

---

## The verification techniques (stage 5, concretely)

- **Synthetic-entry-state diff** (`tools/verify-fn.js`): build a valid struct
  instance from the atlas layout, seed registers + a few globals, run the function
  on both the interpreter and the port, compare. No full program run needed.
- **Compare WRITE-SETS, not absolute memory.** The interpreter image is the full
  PE (code+data); a from-`data.bin` port has a zero code region — so absolute
  memory *always* differs there. Capture each side's writes in the data region via
  the watchpoint hooks and compare those; exclude the stack (it legitimately
  differs). This is the single most important correctness subtlety in the harness.
- **Lockstep capture** (`tools/diff-lockstep.js`, `tools/capture-lockstep.js`):
  for functions that need realistic global state, capture full entry state during
  a real run and replay it into the interpreter. (Gated on a fast program tick;
  see Known Limits.)
- **Sub-divide at the OS boundary.** Functions that call OS APIs trap in the
  interpreter and can't be diffed whole; diff their pure-compute children and
  cover the parent end-to-end instead.

---

## The per-function rewrite loop (stage 7)

1. Pick a function the atlas has named and that is faithfully translated (no
   unsupported-`goto` artifacts — those aren't even correct translations yet).
2. Read the answer-key algorithm (if any) to understand intent; use the atlas to
   map its memory accesses to named fields.
3. Rewrite idiomatically (named field accessors, real control flow) in
   `runtime/native/<subsystem>/`.
4. **Gate it with the oracle** before committing — see a real pass, then commit.
   The same gate proves the rewrite stays correct forever.

**"Understood" =** every gameplay-critical address in the slice has a field-aware
atlas entry. **"Done" =** the slice's pure functions are byte-equivalent to the
interpreter; OS-calling functions are sub-divided or covered end-to-end.

---

## Known limits (carried forward honestly)

- **Program-tick performance wall.** Driving the binary into deep runtime state
  (full gameplay) is slow because unrecovered painter functions fall back to the
  interpreter. This blocks *whole-program* capture (lockstep, gameplay fixtures),
  but **not** the per-function method — synthetic entry state sidesteps it.
- **Auto-translator bug classes** (catalogued in project memory): byte-store
  emitted as `setU32`, `int3` mis-cast, dropped register-init at call sites,
  `goto` lowered as `return 0`, u16-read-as-u32. These are the ~15% that need
  hand-fixing; an oracle pass-rate gate surfaces them.

---

## Discipline rules learned (process, not code)

- **Never claim or commit a test as passing without reading a real run that shows
  it pass; never hand-write expected values.** Differential tests assert
  port == oracle (observed), never hand-computed constants.
- **Don't sink-cost into an unbounded rabbit hole** (e.g. a perf wall); record it
  and route around it.
- **A partial file view is not corruption** — read more, don't panic-revert.

---

## To repeat on the next binary

1. Decompile it with Ghidra; run the C→target translator (stages 1–3).
2. Reuse this repo's Win32 shim layer if it's a Win32 binary; else write stage 4
   for that OS once.
3. Stand up the interpreter oracle (stage 5) — already general; point it at the
   new binary.
4. Run the dynamic call trace + build the atlas (stage 6). Supply names yourself
   if no answer key exists.
5. Rewrite subsystem by subsystem, each gated by the oracle (stage 7).

The expensive, one-time costs are stages 4 and the translator. The repeatable,
per-binary work is stages 1–2 (cheap), 5–7 (the method).

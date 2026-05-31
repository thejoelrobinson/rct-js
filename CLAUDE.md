# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A port of RollerCoaster Tycoon 1 (the original Win32 PE binary, `binary/rct.exe`) to JavaScript. The binary's machine code is decompiled by Ghidra to C (`decompiled/c/*.c`, 1,214 functions, hex-named), then translated function-by-function to JS (`ported/auto/*.js`). The runtime loads only `decompiled/data.bin` (the PE data sections at their virtual addresses) — `rct.exe` itself is not loaded by the browser path. About 1,231 JS files in `ported/auto/`; roughly 100 are `// @manual` hand-fixes layered over the auto-translated baseline.

## Commands

- `npm test` — run the full vitest suite (`vitest run --root .`). **Caveat:** `--root .` globs the in-repo `.claude/worktrees/*` agent checkouts (currently ~18, and not gitignored), so it collects and runs a stale *copy* of every test from each worktree. A single-file run can report e.g. `6 failed | 4 passed` where the failures are all worktree copies and the real repo passes. **Trust only the result for files under the repo root, not under `.claude/worktrees/`** — or fix it properly by gitignoring `.claude/worktrees/` and adding a vitest `exclude` for it. Run a single real test with an explicit path: `npx vitest run test/runtime/<one>.test.js` and ignore the worktree-path duplicates in the output.
- `npm run test:watch` — vitest in watch mode
- `npm run dev` — serve `web/` over http-server on :3000 (browser boot uses `web/main-native.js`, the no-x86-interpreter path)
- `npm run lift` — `lifter/cli.js`, the legacy static x86 → JS lifter. NOT the runtime path; only used historically for the `generated/` output. Day-to-day work goes through the translator (Ghidra C → JS) instead.

### Verification (use these often)
- `npx vitest run --root . test/runtime/<one>.test.js` — single test file
- `node tools/diff-one.js --addr=0xNNNN` — diff one function against the x86 interpreter running raw `rct.exe`. The C source's return type drives the comparison mask. See `tools/bulk-diff-test.js` for the batch driver.
- `node tools/capture-replay-hashes.js` / `node tools/replay-verify.js` — TAS-style frame-hash gate over the GAME-BACK 640x480 surface. Fixture at `test/fixtures/title-screen-replay.json`. Wrapped as `test/runtime/title_replay.test.js`. This is the primary "did the rewrite break visible rendering" check.
- `node tools/probe-pixels-now.js` — measures non-zero pixels + distinct palette indices on the back buffer; the canonical smoke check after any rendering change.

## Architecture

**Runtime entry point: `runtime/harness.js`.** `createRuntime({dataBin, vfs, canvas})` builds a `Heap` (typed-array backed at the PE's virtual addresses), wires `state.fnDispatch` from `ported/auto/_dispatch.js` (auto-generated address → function map), and exposes `runInit()` and `runTick()`. **The boot sequence matters: `runInit()` creates the DDraw surfaces** (via `IDD_CreateSurface` during the binary's WinMain prelude); without it, `state.ddrawSurfaces` stays empty and there's nothing to render to. The first `runTick()` then fires the lazy init in `FUN_004385d8` (sets `DAT_00628cb8=1`, `cb9=1`, fade counter `=0x10`).

**The auto-translated JS style is verbose and not idiomatic:** registers are passed through a shared `regs` object (`runtime/regs.js`), every heap access goes through `heap.u8/u16/u32` and `heap.setU8/U16/U32`, control flow includes `labeled break/continue OUTER:` to mirror `goto LAB_xxx`, and most files name everything `FUN_xxxxxxxx` / `DAT_xxxxxxxx`. Hand-fixes are marked `// @manual — do not regenerate.` at the top; their headers document the specific translator bug class fixed.

**Recurring translator bug classes worth memorising** (full catalogue in the project memory at `/Users/joelrobinson/.claude/projects/-Users-joelrobinson-rct-js/memory/project_phase_r_terrain.md`):
- `setU32` emitted for byte stores (e.g., `*pbVar = byte` lowered as `setU32(p, v&0xffffffff)` corrupts the 3 trailing bytes — fix to `setU8`)
- `int3` pseudo-type mis-cast (Ghidra's 3-byte truncation lowered as a call to an `int3` opcode stub — replace with `X & 0xffffff`)
- Wrong register-init at call sites (`mov edi, [ebp]; add edi, x` dropped from the lift — must mirror the asm setup before the JS call)
- `goto LAB` lowered as `return 0` instead of `continue OUTER` / `break LAB`
- `u32` reads where the binary reads `u16` (packs two adjacent fields, blows up the comparison downstream)

**Why there is still an x86 interpreter in the runtime: `runtime/painter-bridge.js`.** The original binary's CODESEG includes ~17 painter functions Ghidra couldn't recover (they're targets of indirect jumptables Ghidra didn't follow). `painter-bridge.js` installs a `harness/x86.js` interpreter that loads `binary/rct.exe`'s code section into a cpu over the same `heap.bytes` and runs those addresses byte-equally. Several have been hand-ported on top: `ported/auto/extra_paint_436b50.js`, `extra_paint_4368d8.js`, `extra_paint_421d2c.js`. Hooks are installed via `setEipHook(addr, fn)` — see the `install4368d8Hooks` / `install421d2cHook` pattern around `runtime/painter-bridge.js:187`.

**The Win32 layer.** `runtime/win32/*.js` are real-implementation shims for the Win32 API surface the binary calls (kernel32 heap allocator, user32 message queue, DDraw surface management, DSound buffer pool with a Web Audio backend). These were written by hand, not lifted. The binary discovers them at boot via `LoadLibraryA` + `GetProcAddress`, so most shim modules export side-effect registrations at module-load time.

**Differential testing infrastructure.** `harness/emulator.js#runOriginal({funcAddr, init, observe, returnMemory})` runs the x86 interpreter on raw `rct.exe` and is the gold-standard reference. `tools/diff-one.js` is the per-function driver. `tools/diff-subsystem.js` extends it to a manifest of scenarios with curated register/memory state, but it's brittle (the scenario capture rarely covers every global the function reads). The replay-hash test (Phase S+B) is the more robust primary gate for rendering-chain changes; `diff-subsystem.js` stays useful as a debugging tool when a replay fails and you need to pin which call diverged.

**Browser path: `web/main-native.js`.** No x86 interpreter loaded in the browser; everything routes through `ported/auto/_dispatch.js`. The browser uses `requestAnimationFrame` to drive `runTick()` and then `presentFrame()` (in `runtime/canvas.js`) to copy the GAME-BACK 8bpp surface through the captured palette to RGBA on the canvas.

## Subsystem-rewrite workflow

The strategic move for the next slice of work is to replace whole subsystems of the auto-translated `ported/auto/` chain with idiomatic JS (named functions, real data structures, no `regs.*` plumbing) rather than fixing translator bugs one instruction at a time. The verification infrastructure for that workflow shipped in **commit `ac5b5bb` (Phase S+B)**.

The current fixture lives at `test/fixtures/title-screen-replay.json` — **read it for the live hashes; do not transcribe them here.** Duplicated hash tables in prose drift out of sync with every re-capture (they already did once, sending an agent chasing a phantom regression). The same rule applies to the `STATUS` header in `runtime/native/sprites/decoder.js`: state changes fast, so trust `npx vitest run test/runtime/title_replay.test.js` + `node tools/probe-pixels-now.js` over any committed prose about whether the gate is red/green.

### The one rule that governs this whole workflow

**The replay gate proves pixel-*neutrality*, NOT *correctness*.** It asserts byte-equality against a baseline captured from the current chain — bugs and all. So a rewrite that *fixes* a translator bug will turn it **red precisely because it is more correct**. An FNV-1a hash cannot tell you whether changed pixels got better or worse. This is the wall `decoder.js` has been stuck behind since Phase S+C: it is correct-vs-C-source, so it cannot be byte-equal to the buggy shipped chain.

Therefore **never let one commit both restructure code and change behavior.** Split every rewrite into two gated steps:

1. **Behavior-preserving rewrite (gated by the replay test).** Reproduce the existing chain's bugs *on purpose* (e.g. the dropped `* sprite_w` clip multiply in `9b438b`). Goal: idiomatic JS that is byte-identical to the baseline. `title_replay.test.js` **green** is the ship gate. If it's red here, the rewrite broke something — fix the rewrite, do NOT re-capture.
2. **Bug fix (gated by the interpreter diff, NOT by re-capture).** Now change behavior in an *isolated* commit. The gate for this step is `tools/diff-subsystem.js` against the x86 interpreter (the gold-standard oracle), run on a scenario that *actually exercises the changed path*. Only after the interpreter confirms the new pixels match the original binary do you re-capture the fixture (`node tools/capture-replay-hashes.js`) and commit the new hashes — with the interpreter-diff evidence in the commit body.

**Re-capturing the fixture to make a red test green is only ever valid in step 2, backed by interpreter evidence.** Re-capturing on faith ("it looks intentional") is not a gate — it just blesses whatever pixels you produced.

**Coverage caveat — the gate can be blind to the bug you're fixing.** The replay samples a *static* title backdrop (ticks 5/15/30 are byte-identical; `skipTitleIntro` is deliberately omitted, so the sprite-update gate stays closed). The blit chain still runs thousands of times rendering that backdrop — verified: during the gated boot `9b438b` fires ~25k×, `9b4911` ~18k×, `9b4660` ~4.4k×, `9b4457` ~1.4k× — so it is a strong gate for blit *math*. But if the backdrop never hits an edge case (e.g. a sprite with negative `topDelta` clipped off the top of the viewport — exactly the `decoder.js` wire-blocker), the correct and buggy versions hash *identically* and the gate proves nothing about that path. **Before relying on the replay gate to validate a fix, confirm the fix's path is actually exercised in the sampled frames; if it isn't, add a targeted scenario to `tools/capture-sprite-scenarios.js` and gate on the interpreter diff instead.**

**Standard workflow for any rendering-chain rewrite:**

1. Land the **behavior-preserving** rewrite (new file in `runtime/native/<subsystem>/`, wire via `setEipHook` in `runtime/painter-bridge.js`, then delete the subsumed `ported/auto/*.js` files). Bug-compat with the baseline is mandatory here.
2. Run `npx vitest run test/runtime/title_replay.test.js`.
3. **Green** → visible pixels are byte-identical, ship it.
4. **Red** → the rewrite broke something visible. Fix the rewrite. (Do NOT re-capture to paper over it — that is only valid for an intentional behavior change, which belongs in a separate commit per the two-step rule above.)
5. Land any **behavior change** as a separate commit, gated by `tools/diff-subsystem.js` against the x86 interpreter on a scenario that covers the changed path, then re-capture the fixture with the diff evidence in the commit body.

The replay gate is the primary check **for neutrality**. For any commit that intends to change pixels, the interpreter diff is the gate — it is not "debugging-only" in that case; it is the only oracle that knows what the original binary actually drew.

**Pending next work:** the originally-approved plan at `/Users/joelrobinson/.claude/plans/majestic-noodling-bentley.md` proposed the in-game RLE sprite decoder as the first subsystem rewrite. The verification gate now exists; the rewrite itself does not. The plan targeted the `9b35fa` chain, but profiling showed that chain doesn't fire from current harness state — the active sprite-blit chain is `9b438b → 9b4911 / 9b4660` (all already `@manual` hand-ported in the verbose translated style, 937 lines combined; a clean rewrite target is ~250 lines of idiomatic JS). Re-read the plan plus `harness/csg.js` (working standalone reference for the same RLE format) before starting.

## Skip helpers and known slow paths

`runtime/harness.js` exports `skipFadeIn(heap)` (sets fade counter to 1/2 and runs `FUN_0042f3a2` post-fade init) and `skipTitleIntro(heap)` (sets `cb9=0` and runs the 438aac default-arm cleanup). **`skipFadeIn` is safe to use anywhere**; the harness's per-tick time stays at ~80ms. **`skipTitleIntro` is dangerous**: it opens the `cb9==0` sprite-update gate at `4385d8:186`, after which an interpreter-fallback path becomes hot and a single `runTick()` can take minutes. The replay-hash fixture deliberately omits `skipTitleIntro` for this reason.

## Project-specific memory

The auto-memory at `/Users/joelrobinson/.claude/projects/-Users-joelrobinson-rct-js/memory/` carries detailed context that doesn't belong here — phase-by-phase commit narratives, the full translator-bug catalogue, the dual-pipeline history (lifter vs translator), and the painter-bridge architecture. Read `MEMORY.md` first for the index.

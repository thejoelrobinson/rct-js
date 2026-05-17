# Bridge FUN_0042a830 — toolbar widget-event-handler proc

## Result: bridge works end-to-end (with one workaround)

`0x42a830` is now registered in `state.fnDispatch` via `painter-bridge.js`'s
x86-interpreter shim. A bridge invocation with the same register state
`FUN_005e3ace` would set (`EBP=1` = mouse-down, `EDX=0` = pause widget,
`ESI=toolbar slot`, `EDI=widget ptr`) executes the binary's full dispatch
chain:

```
0x42a830 (jmp 0x42af5a)
  → 0x42a835     (BP=1 path)
  → 0x42b083     (DX=0 / widget 0 / pause)
  → 0x426f56     (game-cmd dispatch with ESI=2, EBX=1)
  → 0x427247     (XOR pause flag DAT_0099c169)
```

After the first click `DAT_0099c169 == 1`. A second click toggles it back
to `0` — proving the dispatch is deterministic and not a coincidence.

## Changes

1. **`lifter/extra-entries.json`** — appended one entry:
   ```json
   {"name": "FUN_extra_widget_42a830", "addr": "0x42a830", "section": "CODESEG"}
   ```
   The painter-bridge picks it up automatically via `loadPainterAddresses()`
   and installs a shim into `state.fnDispatch`. No code changes to
   `painter-bridge.js` were needed — the bridge ran cleanly, no
   `RET_SENTINEL` stack-underflow, so `NEEDS_PRE_PUSH` did NOT need
   extending.

2. **`test/runtime/bridge_42a830.test.js`** (new) — four tests:
   - registration: `state.fnDispatch.has(0x42a830)` is true
   - bridge side effect: `DAT_005f4a6a` (cmd depth) advances + `DAT_005f4a68`
     latches `EBX`, proving we made it through `0x426f56`
   - end-to-end: pause flag flips 0 → 1 on first click
   - reversibility: pause flag flips 1 → 0 on second click

The lifter CLI (`node lifter/cli.js`) was NOT run — it requires
`/tmp/rct_work/decompiled_all.c` which isn't present in this checkout.
The bridge doesn't need it; the lifter only produces `generated/all.js`
for the browser build. In node, the bridge installs from extras directly.

## Pre-existing bug discovered (NOT caused by this work)

`PTR_LAB_005f49a0` (the 16-entry game-command jumptable in DATASEG, intact
in `decompiled/data.bin`) gets ZEROED during the first `runtime.runTick()`.
Probe trace:

```
after createRuntime: PTR[0..3] = 0x44e623 0x4247e6 0x427247 0x5cf0dc  ✓
after runInit:       PTR[0..3] = 0x44e623 0x4247e6 0x427247 0x5cf0dc  ✓
after runTick:       PTR[0..3] = 0x0      0x0      0x0      0x0       ✗ wiped
```

Some x86-interpreter shim (or translator-side write) during tick 1 clobbers
this region. Without it, the indirect call inside `0x426f56` dereferences
null and `0x427247` never runs — so the bridge ran the entire binary chain
correctly but pause didn't toggle.

The test works around this by re-copying 16 dwords from the original
`data.bin` after `skipFadeIn()`. The wipe-cause investigation is logged
here for the next agent — likely candidates:
- One of the existing painter-bridge shims (e.g. PTR_LAB_005e2248 input-
  mode handlers) doing a stride-1 vs stride-4 write at boot.
- An untranslated `rep stos` clearing the wrong range.
- The phase-M translator stride bugs that were just reverted may be related.

Useful probe to chase it:
```js
// Before runTick, sample 0x5f49a0 every N interpreter steps in painter-bridge.js
// or wrap heap.setU32 to break on writes to 0x5f49a0..0x5f49e0.
```

## What the click chain actually does

With the bridge installed and the PTR table repaired, clicking widget 0
(pause) at toolbar coords (10, 10) fires the FULL post-`5e3ace` path:
- `0x42a830`'s `jmp` table routes by `BP` (event type) and `DX` (widget index)
- For `BP=1` (mouse-down) `DX=0` → calls `0x426f56(ESI=2, EBX=1, AX=0, CL=0)`
- `0x426f56` is the engine's generic "submit game-command" function — it
  bumps a cmd-depth counter, latches EBX as the cmd flags, then dispatches
  via `PTR_LAB_005f49a0[ESI]` (slot 2 = pause toggle = `0x427247`)
- `0x427247` requires `EBX & 1` and XORs `DAT_0099c169`

No sub-callees needed extra bridging — every CALL from inside the chain
was either a JS-ported function (`0x426f56`, `0x427247`) or already in
`.text`/`CODESEG` overlaid by `overlayCodeSections()`. The bridge is
self-contained.

## What is NOT yet wired

Widget indices 1..19 dispatch to other game-cmds (rotate, zoom, open-window,
etc). They would work the same way IF:
1. The PTR_LAB_005f49a0 wipe is fixed (so the per-cmd indirect resolves)
2. The boot fade-in counter is past 0x60 (handled by `skipFadeIn`)
3. The natural input chain through `FUN_005e38f5` is fixed (the `extraout_CX`
   register-leak still breaks the dequeue loop — see
   `agent-toolbar-findings.md` blocker #2)

With this bridge plus those two upstream fixes, all 20 toolbar widgets
become self-driving via natural `WM_LBUTTONDOWN` → enqueue → dispatch.

## Files

- `/Users/joelrobinson/rct-js/lifter/extra-entries.json` (+5 lines)
- `/Users/joelrobinson/rct-js/test/runtime/bridge_42a830.test.js` (new, 142 lines)
- `/Users/joelrobinson/rct-js/.claude/scratch/agent-42a830-findings.md` (this file)

## Tests

```
$ npx vitest run test/runtime/bridge_42a830.test.js
 Test Files  1 passed (1)
      Tests  4 passed (4)
   Duration  3.03s
```

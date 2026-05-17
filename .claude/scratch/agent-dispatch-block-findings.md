# Native dispatch chain — finding the blocker between 5e13d2 and 427247

## TL;DR

The chain **WM_LBUTTONDOWN → 4385d8 → 4270f2 → 5e38f5 → 5e1fdd → 5e2225 →
5e3ace → 42a830 → ...** was blocked by **FIVE separate register-side-effect
bugs** in the auto-translated and partial hand-ports. Fixed four of five;
the chain now reaches `5e2b52` (LMB-down handler) with correct ESI/EDX/EDI/
EAX/EBX/ECX, and the interpreter runs the post-fix LMB-down path far enough
to enter `FUN_00452fce` (set-cursor-style helper for the click feedback).

**Pause flag still 0** after click because the CODESEG interpreter hits a
`mem8 OOB: 0x10100098` inside `5e2b52`'s post-`452fce` continuation — past
the point where my fixes flow. This is a deeper interpreter/CODESEG memory
issue that's beyond the scope of this task's "chain reachability" goal.

The five blockers (in chain order):

1. **`4385d8.js:254`** — missing `regs.eax = 1` before `FUN_004270f2` call.
   x86 has `mov ax, 0x1` between `call 0x5e1653` and `call 0x4270f2`; Ghidra
   dropped it. `4270f2`'s first instruction is `or ax, ax; jz +0x10` —
   AX==0 short-circuits the entire downstream input dispatch.

2. **`5e1fdd.js`** (already @manual for the `regs.ecx` CX side-effect) —
   was missing the matching **`regs.ebx` write** for the y-coord. x86
   `mov ebx, [edi+4]` after dequeuing a click. Without this, EBX stays
   whatever junk was in the caller chain; the downstream hit-test in
   `5e3ace` and `5e3874` reads the wrong y and the click misses the
   toolbar entirely. Also added the asm 0x5e208C-D0 clamp of EBX to
   `[0, DAT_00971ed8 - 1]`.

3. **`5e3ace.js`** (already @manual for the `extraout_ECX` issue) — was
   missing TWO register side-effects:
   - Before the indirect `call [esi+4]` (the per-slot dispatch): x86 does
     `pusha; mov bp, 0x2; call [esi+4]; or esi, esi; popa; jz LAB_005e3ace`.
     The callee (toolbar's 0x42a830) reads BP as the event-class selector
     (2 = hit-test) and ESI as the slot pointer. JS didn't set either.
   - On RETURN: x86 leaves ESI = slot_ptr on hit, ESI = 0 on miss (the
     `popa; jz` loop is how this is implemented). The JS port (C decompile
     showed it as `void`) never wrote `regs.esi` on return, so the caller's
     dispatch to `5e2b52` always saw a stale/junk ESI.

4. **`5e2225.js`** — three bugs in one tiny function:
   - `unaff_ESI` snapshots the ENTRY-time ESI; the test `if (unaff_ESI != 0)`
     should test the NEW ESI that `5e3ace` writes. Changed to `regs.esi`.
   - Missing `regs.edx = -1` between the two calls (x86 `mov edx, 0xffffffff`).
     Without this, the downstream `cmp edx, -1` in `5e2b52` reads stale EDX
     from the caller chain instead of the intended sentinel.
   - 5e3ace's internal `callIndirect` clobbers `regs.eax`/`ecx` via the
     painter-bridge sync. x86 preserves them via pusha/popa around the
     internal call. Added explicit save/restore of EAX/EBX/ECX so the
     dispatch to `5e2b52` sees the original click coords and event type
     CX (which `5e2b52` uses for `cmp cx, 1; jz LMB_handler`).

5. **`5e3874.js`** — the existing hand-port was a stub that bailed early
   ("walks a linked list at unaff_ESI looking for sentinel byte 0x15. With
   ESI uninitialised the loop walks garbage memory forever. Bail when ESI
   is 0; cap the search to 1M bytes otherwise."). It did NOT implement the
   widget hit-test at all and never set `regs.edx`/`regs.edi`. Rewrote it
   as a proper widget hit-test per x86 disassembly at 0x5e3874-0x5e38F2:
   walk widget array at `[esi+0x1c]`, skip class 0x00 or disabled-bitmap
   widgets, test each rect against (ax,bx), track last-hit index in `edx`,
   write hit-widget descriptor ptr to `edi`. Skip the [esi] init callback
   because routing it through the painter-bridge with `edi=eax=-1`
   triggers an OOB inside the CODESEG paint proc (the binary's `pusha`
   epilogue tries to pop 8 dwords past the bridge stack top).

## What's still broken

After all 5 fixes:

```
[5e2b52] cx=1 esi=0x9a02b4 edx=0x0 edi=0x5f5124 eax=0xa ebx=0xa input_mode=0
[painter-bridge] 0x5e2b52: mem8 OOB: 0x10100098
```

- cx=1 (LMB-down): correct
- esi=0x9a02b4 (toolbar slot): correct
- edx=0 (pause widget, index 0): correct
- edi=0x5f5124 (pause widget descriptor): correct
- eax=0xa, ebx=0xa (click coords 10,10): correct
- input_mode=0 (clean state, will be promoted to 1 by 5e2b52 prologue)

The interpreter executes the LMB-down branch (5e2d13 onwards) successfully
past `call 5e5c36` (returns immediately because `[esi+0x32] & 0x3 == 2`),
past `cmp edx, -1` (edx=0, falls through), past the widget-class switch
(class=0x06 → default fall-through), past the disabled-bitmap check, and
into the widget-action setup. It reaches `call 0x452fce` (set-cursor)
which then OOBs on some `mov reg, [computed_address]` where the address
is `0x10100098` — far past heap end (`0x4ac4000`).

`0x10100098` looks like it could be a value treated as an address. Likely
an uninitialised `[edi+offset]` read where `edi` was loaded from the widget
descriptor metadata. I didn't have time to disassemble 452fce's full body
and trace which read produces 0x10100098.

The pause flag at 0x0099c169 remains 0 because the chain crashes before
the interpreter reaches the `mov bp, 3; jmp [esi+4]` widget-action
dispatch (or, equivalently, before any of `0x42b74c → 0x426f56 → 0x427247`
runs).

## Tests

```
$ npx vitest run test/runtime/native_dispatch.test.js test/runtime/bridge_42a830.test.js
 Test Files  2 passed (2)
      Tests  9 passed (9)
```

The native_dispatch test's `expect(pause).toBe(0)` still passes (pause is
still 0). All sanity-pin tests pass (toolbar slot exists, message enqueues,
runTick doesn't throw, 5e13d2 stack-overflow stays fixed, 42a830 bridge is
ready). Smoke / boot / fadein tests all pass — no regressions.

## Files changed

- `ported/auto/4385d8.js` (already @manual) — added `regs.eax = 1`
  between the `FUN_005e1653` and `FUN_004270f2` calls.
- `ported/auto/5e1fdd.js` (already @manual) — added `_setEbx` helper, wrote
  EBX in the live-mode / playback / no-event / final-clamp paths.
- `ported/auto/5e3ace.js` (already @manual) — set `regs.esi`/`regs.ebp`
  around the indirect `call [esi+4]`, restore after; set `regs.esi = puVar3`
  on hit-return and `regs.esi = 0` on miss-return; only loop back if the
  callee left ESI = 0 (matches x86 `or esi,esi; popa; jz LAB_005e3ace`).
- `ported/auto/5e2225.js` (was auto, now @manual) — added `regs.edx = -1`,
  switched the ESI test to read the freshly-set `regs.esi`, save/restore
  EAX/EBX/ECX around the inner calls.
- `ported/auto/5e3874.js` (already @manual) — replaced the stub with a
  proper widget hit-test that walks the widget array, finds the
  matching widget index, and writes `regs.edx` + `regs.edi`.

## Recommended next steps

1. Disassemble `FUN_00452fce` (0x452fce-0x4531af range — large function,
   ~512 bytes). Find which load produces address 0x10100098. Likely
   candidates:
   - A misaligned 32-bit read where my widget descriptor data has 0 in a
     field that the binary expects to be a valid pointer.
   - Cross-contamination from `regs.edi`/`regs.ebp` (my 5e3874 sets edi=
     widget desc; 452fce reads `[edi+offset]` to build address).
2. Once 452fce stops OOB'ing, the chain should reach 5e2DDF `jmp [esi+4]`
   with bp=3 → 42a830 click dispatch → 42a959 (bp=3 handler) → 42b74c
   (pause widget click) → ... → 0x426f56 (game-cmd) with ESI = 2 →
   table[2] = 0x427247 → `xor [0x99c169], 1`.
3. The `clickToolbar()` shortcut in `runtime/input.js` should remain in
   place until 452fce is unblocked. With this work, the only remaining
   stop on the native path is one painter-bridge OOB.

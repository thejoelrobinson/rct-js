# PTR_LAB_005f49a0 zero-out — root cause found and fixed

## Summary

The 16-entry game-command jumptable at `0x005f49a0..0x005f49e0` (intact
in `decompiled/data.bin` at boot, holding function pointers for pause,
place-track, sell-item, etc) was being zeroed during the first
`runtime.runTick()`. The previous agent (`bridge-0x42a830`) worked
around it by re-copying 16 dwords from raw `data.bin`. This investigation
found **two independent over-writes** clobbering the table and fixed both
at source.

## Bug #1 — translator stride bug in `ported/auto/40179d.js`

`FUN_0040179d` (the end-of-tick blit + dirty-flag reset) contains a clear
loop the auto-translator emitted with **u32 stride**:

```js
for (local_c = 0; local_c < 0xa00; local_c++) {
  heap.setU32(0x005f2420 + local_c * 4, 0);   // WRONG: u32 stride
}
```

The binary uses a **byte** store. The actual instruction at `0x4018c2` is:

```
c6 80 20 24 5f 00 00     MOV BYTE PTR [eax + 0x5f2420], 0
```

(opcode `c6` = `MOV r/m8, imm8`). So the loop should clear **2,560 BYTES**
starting at `0x5f2420`, ending at `0x5f2e20`. With u32 stride the
generated JS cleared **10,240 bytes** (4× as many), ending at `0x5f4e20`
— passing through `PTR_LAB_005f49a0` and zeroing all 16 dwords.

Source of the translator confusion: Ghidra's C decompilation says

```c
for (local_c = 0; local_c < 0xa00; local_c = local_c + 1) {
  (&DAT_005f2420)[local_c] = 0;
}
```

Ghidra default-types unrecognised `DAT_` symbols as `int*` so the
indexing came through as 4-byte. But every other reader/writer in the
codebase walks this region with byte stride — confirmed by:

- `4023b2.js:102/107/111` — `heap.u8` reads + `heap.setU8` writes
- `4015f0.js:43` — also a translator stride bug (writes 1 with u32 stride,
  the resulting 3 trailing zero bytes are mostly harmless overlap with
  other dirty-bytes; not in this fix's scope)
- `runtime/harness.js:486` (pre-fix) — already used byte `heap.bytes[i]`
  fills, which was correct stride but had the wrong bound (see Bug #2)

**Fix**: hand-port `40179d.js` (marked `@manual`) — changed the loop body
to `heap.setU8(0x005f2420 + local_c, 0)`.

## Bug #2 — over-fill bound in `runtime/harness.js`

The synthetic presenter-pump block in `runTick()` marked the whole
dirty-flag bitmap as dirty before calling `FUN_0040179d`:

```js
for (let i = 0; i < 0x5000; i++) heap.bytes[0x005f2420 + i] = 0xff;
```

The fill is byte-stride (correct) but **size 0x5000 is wrong**. The
dirty-flag table is at most `0xa00` bytes (the same bound `40179d`
clears at end-of-tick, and the same bound supports the maximum
800×600 surface FUN_004023b2 iterates over). The extra `0x5000 - 0xa00
= 0x4600` bytes overran the table and wrote `0xff` into globals at
`0x5f2e20..0x5f7420` — including `PTR_LAB_005f49a0`.

Even after Bug #1 was fixed, this over-fill still clobbered the table
(with `0xff` rather than `0`).

**Fix**: tightened the bound to `0xa00`.

## How the bug was found

1. Snapshot 64 bytes at `0x5f49a0` before and after `runTick()` → confirmed
   bug (all zero after).
2. Monkey-patched `heap.setU8/U16/U32/I8/I16/I32` to print a stack trace
   when any write fell inside `[0x5f49a0, 0x5f49e0]` during the first
   `runTick()`. Output:
   ```
   WRITE u32 addr=0x5f49a0 val=0x0
     at heap.setU32 (...)
     at FUN_0040179d (.../ported/auto/40179d.js:42:10)
     at Object.runTick (.../runtime/harness.js:329:9)
   ```
3. Confirmed the loop bound + the binary's actual byte-store opcode.
4. After hand-port fix, the watchpoint stopped firing — but the post-tick
   snapshot now showed `ffffffff…` instead of `00000000…`. Direct
   `heap.bytes[]` fills aren't caught by `setU*` wrappers — found the
   harness over-fill by reading the lines surrounding the second
   `FUN_0040179d` call in the stack trace.
5. After tightening the harness bound, all 64 bytes preserved → fix
   verified.

## Verification

`test/runtime/ptr_5f49a0_preserved.test.js` (new, 3 tests):
- Sanity: table loaded from data.bin at boot.
- Table survives one `runTick()` — every byte matches data.bin.
- Table survives two `runTick()`s — no per-tick drift.

All pass.

## Side effects on other tests

- `test/runtime/bridge_42a830.test.js`: the cmd-depth-counter assertion
  in the first test was relying on the broken-PTR behaviour (counter
  bumped + incomplete chain so dec didn't run). Updated the test to
  check `DAT_005f4a68` (EBX latch) — a more robust witness that doesn't
  net-to-zero across a complete call. The 3 other tests' `repairGameCmdTable`
  helper is now a no-op (writing bytes that match what's already there)
  — kept for defence-in-depth.

- `test/runtime/native_dispatch.test.js`: the pinned BLOCKER test
  expecting `runTick()` to throw `Maximum call stack size exceeded` in
  `FUN_005e13d2` no longer reproduces — the upstream memory corruption
  was apparently altering the paint-path dispatch enough to send 5e13d2
  into runaway recursion. With both fixes the recursion terminates
  normally. Inverted the test to assert `runTick()` does NOT throw,
  matching the docstring's stated intent ("when 5e13d2 is fixed, invert
  this test"). The downstream "input chain never fires" assertion (still
  a real blocker) is unchanged.

- `test/runtime/fadein.test.js`: 1 pre-existing failure
  (`Maximum call stack size exceeded` on second `runTick()` after
  `skipFadeIn`) reproduces both before and after this fix — not caused
  by this change.

## Files

- `/Users/joelrobinson/rct-js/ported/auto/40179d.js` — hand-ported, `@manual`. Fix: `setU32(addr + i*4)` → `setU8(addr + i)`.
- `/Users/joelrobinson/rct-js/runtime/harness.js` — bound `0x5000` → `0xa00` in the dirty-bitmap pre-fill.
- `/Users/joelrobinson/rct-js/test/runtime/ptr_5f49a0_preserved.test.js` — new verification test.
- `/Users/joelrobinson/rct-js/test/runtime/bridge_42a830.test.js` — updated witness in test #1; docstring refresh.
- `/Users/joelrobinson/rct-js/test/runtime/native_dispatch.test.js` — inverted the 5e13d2 BLOCKER assertion (now expects runTick to not throw).

## Related possible bugs (not fixed in this scope)

- `ported/auto/4015f0.js:43` — same translator stride pattern
  (`setU32(0x5f2420 + i*4, 1)` instead of `setU8(0x5f2420 + i, 1)`).
  Writes value `1` rather than `0`, so each iteration deposits `01 00 00 00`
  — only the leading byte is the intended dirty-mark, the trailing 3
  bytes mostly overlap subsequent cells and overwrite them with zero. Net
  effect: under-marks the bitmap (because next iteration's cell is
  partially zeroed before being intentionally set). The harness already
  bypasses this by force-filling with `0xff` before calling `40179d`, so
  the symptom is masked in practice. Worth fixing in a follow-up.

# Tickhang 2 — root cause + fix

## TL;DR

The post-fade-in tick hang is in **`FUN_00439135`** (the sprite list
walker called every tick from `FUN_004385d8`). The translator
dropped two register-passed operands at the call sites for
`FUN_00439288` / `FUN_00439822` AND mis-derived the linked-list
stride for the iterator. Hand-port of `FUN_00439135` (+ companion
hand-port of `FUN_00439822` for the same byte-vs-32-bit-store bug
class that hit `FUN_0042f6a8` in the previous round) clears the hang.

## Where the hang fires

`FUN_004385d8` (the per-tick driver) calls `FUN_00439135` inside its
post-fade-in inner loop (decompiled/c/4385d8.c:128). `FUN_00439135`
walks a singly-linked list anchored at `DAT_0087c398` (16-bit head),
sentinel `0xffff`. For each id it computes
`recordBase = 0x743b94 + id*0x100` and invokes the per-record
handlers.

## Three distinct translator bugs in this round

### Bug A — `FUN_00439135` stride wrong

The decompiled C looks like:

```c
uVar2 = (&DAT_00743b98)[(uint)uVar2 * 0x80];
```

`&DAT_00743b98` is a `ushort *` so `[idx]` = `idx * 2` bytes →
stride = `0x80 * 2 = 0x100`, which matches the binary (`shll $0x8, %esi`
then `pushw 0x4(%esi)`).

The translator naively emitted `idx * 0x80 * 4` (= 0x200 stride),
giving:

```js
uVar2 = ((heap.u32((0x00743b98) + (((uVar2) >>> 0) * 0x80) * 4)) & 0xffff);
```

i.e. it always reads the wrong word. Whether the loop hangs or just
walks the list incorrectly depends on what happens to live at
`0x743b98 + n*0x200`. In practice it often gives a non-`0xffff`
value forever.

### Bug B — `FUN_00439135` regs.esi pinned to base, not iterator

The binary computes `esi = 0x743b94 + uVar2 * 0x100` BEFORE each
`FUN_00439288` / `FUN_00439822` invocation, so callees receive a
fresh per-record pointer. The translator emitted

```js
(regs.esi = 0x743b94, regs.eax = FUN_00439822(heap));
```

every iteration — i.e. ESI is hard-pinned to the base address. All
callees end up reading record-0 fields no matter which sprite is
being processed. Even without the stride bug above, this means
`FUN_00439822` mutates record-0's queue slots forever.

### Bug C — `FUN_00439822` byte stores emitted as 32-bit stores

`FUN_00439822` is the per-sprite animation tick. The binary uses
`addb`/`incb` for every byte field update at `0xb0..0xc0`, `0x73`,
etc. The translator lowered each `*pcVar2 = *pcVar2 + 1` (where
`pcVar2` is a `char *`) as

```js
heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
```

which corrupts the 3 bytes following `pcVar2`. For uVar6=0, the
write to `0xb3` clobbers `0xb4`, `0xb5`, `0xb6` — and `0xb4` is the
NEXT iteration's loop key (`0xb0 + uVar6*4` at uVar6=1). The signed
read (`heap.i8`) compounds it: a byte that reads `0xff` becomes -1
in JS, then `-1 + 1 = 0` gets written as `0x00000000` four bytes
wide.

Also the translator turned `goto LAB_00439857` (the reset-and-restart
of the inner loop) into "early-return", silently leaving the queue
half-rotated. The actual jmp keeps ECX/EBP/EDI in place (the goto
target sits AFTER the xor-init, so the loop continues with the
same `uVar6` etc — the just-shifted slot gets re-examined).

## Fix

- Rewrote `ported/auto/439135.js` (`@manual`) to use the correct
  stride and set `regs.esi = recordBase` before each callee.
- Rewrote `ported/auto/439822.js` (`@manual`) to use `setU8` for the
  byte stores, correct unsigned compare for `cVar4`, and implement
  the reset-and-restart as a continue without resetting loop vars.

Both files are marked `// @manual — do not regenerate.`

## Verification

Direct invocation:

```
$ node /tmp/repro2_count.js
call 0: 1ms, anchor=0x5
call 1: 0ms, anchor=0x5
...
call 9: 0ms, anchor=0x5
total 1ms
```

10 successive calls to `FUN_00439135` complete in 1 ms total
(previously: hung indefinitely). Anchor value `0x5` confirms the
sprite list has live entries that we're now iterating correctly.

Original reproducer `/tmp/repro2.js` (50 `runTick` after
`skipFadeIn`) no longer hangs in 439135/439822 chain — but tick 2
now hits a **different** failure: `RangeError: Maximum call stack
size exceeded` inside `FUN_005e13d2`. That is a separate
translator bug (the recursive-painter clip function — see analysis
below) and is out of scope for this task (the brief assigned the
painter pipeline to a different agent).

## Downstream bug (out of scope)

`FUN_005e13d2` is a recursive paint-clip routine. In the binary,
the recursion is a `call rec; ...; jmp rec` (tail-jump) pattern at
`0x5e1421-0x5e1437` — one real call frame per level, with the
return-edge being a `jmp` back to the top of the same function.
Each call passes `dx = 0x20(%edi)` (and the post-call `jmp` is
preceded by `ax = 0x20(%edi)` + popped restored regs).

The translator's auto-output:
1. Treats the `jmp` as a `continue` of an outer while loop,
2. Does not set `regs.edx` (the recursive DX arg) before the
   recursive `FUN_005e13d2(heap)` call.

So every recursive call uses the same EDX/EAX bounds, never
narrows, and JS recurses until stack overflow. This needs a
hand-port that lowers the tail-jump as a do-while around the
recursive call sites. Out of scope here.

## Files touched (2)

- `ported/auto/439135.js` — hand-port (replaces auto-translation)
- `ported/auto/439822.js` — hand-port (replaces auto-translation)

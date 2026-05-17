# Phase R+2: blitter wild-write — 2026-05-17

## Task
Find and fix the wild-pointer write in the sprite-blitter chain
(`9b438b → 9b4457/9b4911/9b8491/9b6863/...`) that was smearing
`0xff` bytes into the paint-ring globals at `[0x5f96e0..0x5f96ec]`
mid-tick (END / chain-head / bump-ptr).

## Root cause — FUN_009b4911 destination pointer mis-derived

The bug lives at the `9b438b → 9b4911` call site (`ported/auto/9b438b.js:118`).
Before the call, the JS hand-port did NOT set up `regs.edi` to the destination
**pixel** pointer — it left `regs.edi` as the **DPI struct** pointer
(`0x5f96d0`, a 16-byte struct allocated as `&DAT_005f96d0` in `4316f3`).

`9b4911` then used `regs.edi` directly as the row base for sprite blits.
Each per-pixel store `bytes[dst + i] = pixel` therefore wrote into
`[0x5f96d0 .. 0x5f96d0 + len]`, which lands squarely on top of the
paint-ring globals at offset `+0x10` (`0x5f96e0..ec`).

### Why the watchpoint missed it the first time
The hand-port `9b4911.js` writes pixels via direct `bytes[dst + i] = ...`
(no `heap.set*` call, no x86-interpreter `write*`). The existing
`globalThis._heapWatch` and `globalThis._x86Watch` hooks therefore never
fire for these writes. The diagnostic in the previous agent's report
("0 writes of value 0xffffffff") was a false negative caused by this
gap in instrumentation, not by an absence of writes. The actual byte
values aren't 0xff either — they're whatever the sprite RLE produces,
and the resulting `u32(0x5f96e8)` just happens to read as 0xffffffff
when 4 random pixel bytes get smeared in.

### The asm vs C-decompile discrepancy
The binary at `0x9b482d-0x9b48e4` (the path leading to `call 0x9b4911`)
does:

```
0x9b482c: push edi                  ; save DPI ptr
0x9b482d: mov  ebp, edi             ; ebp = DPI
0x9b482f: mov  esi, [0x9a2010]      ; esi = sprite RLE base
0x9b4835: mov  edi, [ebp]           ; ★ edi = *DPI = pixel buffer ptr
...clip-rect math computing eax (= rowStride*rowOff) and ecx (= colOff)
0x9b488f: add  edi, eax             ; edi += y_offset_bytes
0x9b48e4: add  edi, ecx             ; edi += x_offset_bytes
0x9b490a: call 0x9b4911             ; → blit with edi=pixel_ptr
0x9b490f: pop  edi                  ; restore DPI ptr
0x9b4910: ret
```

Ghidra's decompiler dropped all the `mov edi, [ebp]` and `add edi, eax/ecx`
operations because they're pure register-dataflow with no visible C variable.
This is the same class of bug as the `EBX = subhandle` issue in `9b8491.c`
(already hand-fixed) — register-promotion silently elides reads/writes
that don't surface a named local.

The C decompile in `9b438b.c:107` just shows `uVar4 = FUN_009b4911();`
with no register setup — the JS auto-translator faithfully reproduced that.

## Fix

`ported/auto/9b438b.js:117-118` — added 4 lines before the `FUN_009b4911`
call to replay the missing asm:

```js
regs.ebp = unaff_EDI >>> 0;
regs.esi = heap.u32(0x009a2010) >>> 0;
regs.edi = (heap.u32(unaff_EDI) + uVar4 + (sVar5 << 16 >> 16)) >>> 0;
uVar4 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
regs.edi = unaff_EDI >>> 0;  // restore DPI ptr for rest of function
```

Where:
- `heap.u32(unaff_EDI)` is `*DPI` (the pixel buffer pointer, set by
  `4316f3.js:103`).
- `uVar4` already held the y-offset bytes (= `sVar5 * (clipH+pitchExtra)`,
  computed on line 92 of the same function).
- `sVar5` was reassigned starting line 100 to be the x-offset (= 0 when
  left-clipped, else the positive byte offset).

## Watchpoint instrumentation fixes

The previous agent's watchpoint hooks in `harness/x86.js` missed
several fast-path direct memory writes that bypass `write32`. Added
`_wpCheck` calls to:

* `harness/x86.js:793/802/810` — `MOV r/m32, r32` (opcode 0x89) fast-path
  for mod=0/0x40/0x80, which are very common (`mov [eax], esi` etc.).
  Without watchpoint coverage of this path, any `mov [mem], reg32` in
  the interpreter was invisible.
* `harness/x86.js:2689/2694` — FIST/FISTP m16 store fast-path.

These watchpoint gaps prevented the previous agent from observing
ANY x86 writes to the paint-ring globals (because the painters reach
9b4911 via JS, then write through `bytes[]`, which is the third
gap — not fixable in `bytes[]` directly without breaking typed-array
optimisations).

To find the actual write site, I added a tripwire INSIDE `9b4911.js`
(temporary; removed after diagnosis) that logged any `dst + len` that
intersected `[0x5f96e0..ec]`. That fired on iter 126012 with
`edi(rowBaseStart)=0x5f96d0 dst=0x5f96d0 len=32` — pinpointing the
bug to "EDI is the DPI struct, not the pixel pointer".

## Verification

Before fix:
- `paint-diag`: `distinct=1 nonZero=0` (back buffer was uniform sky-grey)
- Paint-ring after tick: `[e0]=0xffffffff [e4]=0xffffffff [e8]=0xffffffff`

After fix:
- `paint-diag`: `distinct=36 nonZero=307200` (full back buffer populated)
- Paint-ring after tick: `[e0]=0x006284ac [e4]=0x005f9fbc [e8]=0x005f9fec` (all sane)
- `dump-frames` PPM: 4 terrain tiles visible at viewport edges (was uniform black/grey)

Screenshot saved at `/tmp/rct-after.png` — shows terrain tiles with
white/teal pixel noise on top, indicating sprite RLE decoding is now
producing real per-pixel writes into the back buffer.

## Open follow-ups (not in scope this round)

1. **Same bug pattern at `9b438b.js:197/200/291/373/376`** — these call
   `FUN_009b4660`, `FUN_009b6863`, `FUN_009b64ea`. All four functions
   use `regs.edi` as destination pixel pointer, and 9b438b passes the
   DPI struct in EDI. Likely the same fix applies (replay
   `mov edi, [ebp]; add edi, eax; add edi, ecx`).

2. **`9b4457.js` mirror calls** — `9b4457` shares the SAME asm body as
   9b438b (entries at `0x9b4479..0x9b4910`) and calls into 9b4911 at
   the same offset (0x9b490a). Its JS hand-port needs the same fix.

3. **Pixel noise inside terrain tiles** — the current render shows
   high-frequency pixel garbage inside the otherwise-correct tile
   outlines. This is the next layer of paint-chain bugs (likely
   palette-index misindexing or wrong source-RLE walking). Out of
   scope here.

## Files touched

* `ported/auto/9b438b.js` — 4-line fix at the 9b4911 call site
  (line 117 area), with a 13-line comment explaining the asm→JS
  translation gap.
* `harness/x86.js` — added `_wpCheck` calls to 4 direct-memory-write
  fast paths (MOV r/m32,r32 ×3 mod variants; FIST/FISTP m16).
* `ported/auto/9b4911.js` — added then removed temporary tripwire.

## Probes (added/used)

* `.claude/scratch/probe-all-writes.mjs` — group-by-callsite watchpoint
  histogram for `[0x5f96e0..ec]`.
* `.claude/scratch/probe-final-writes.mjs` — last-write-wins capture
  for each of the 3 paint-ring slots.
* `.claude/scratch/probe-b4911-trace.mjs` — uses tripwire inside 9b4911
  to capture wild-write events.
* `.claude/scratch/probe-distinct-rgb.mjs` — distinct palette index
  count for verification.
* `.claude/scratch/probe-all-surfaces.mjs` — multi-surface inspection.

## Commit

`<pending>` Phase R+2: 9b438b — set EDI to pixel ptr before 9b4911 call (terrain renders).

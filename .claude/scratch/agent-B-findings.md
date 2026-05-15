# Agent B — Stride-bug audit findings

## Fixed in this branch
**`ported/auto/444a79.js`** — sprite-pool initialization (FUN_00444a79).

Four narrow stores the translator widened to setU32:

| Site | Binary instruction | Width | JS before | JS after |
|------|---------------------|-------|-----------|----------|
| `0x00444a79+0`  | `66 c7 05 c0 d1 8a 00 00 00` | WORD | `setU8(0x008ad1c0, 0)` | `setU16(0x008ad1c0, 0)` |
| `0x00444ab9+0`  | `c6 06 ff`                   | BYTE | `setU32(puVar5, 0xff)` | `setU8(puVar5, 0xff)` |
| `0x00444acd+0`  | `66 89 0d 94 c3 87 00`       | WORD | `setU32(0x0087c394, uVar2)` | `setU16(0x0087c394, uVar2&0xffff)` |
| `0x00444b00+0`  | `66 c7 05 a0 c3 87 00 88 13` | WORD | `setU32(0x0087c3a0, 5000)` | `setU16(0x0087c3a0, 5000)` |

Bug #3 is the most impactful: 0x0087c394..0x0087c39e is an array of six u16 list-head sentinels (sprite-category free-list heads), preseeded to 0xffff a few lines earlier. The `setU32(0x0087c394, 0)` clobbers 0x0087c396 from 0xffff to 0x0000, making sprite-category-1's head point at sprite 0 instead of "empty". Subsequent allocations from category 1 would walk into the free-list chain and corrupt it.

Tests stay green (66/66 in worktree). `paint-diag.js` GAME-BACK distinct count unchanged (4 → 4), so 444a79 was not the painter-blocking bug — but the fix is correct against the binary and lifts a real correctness hazard.

## Unfixed — same translator pattern, larger blast radius
**`ported/auto/44049c.js`** — sprite-list update helper (FUN_0044049c).

Translator emitted `(0x00743b98) + (uVar3 * 0x80) * 4` for what the binary actually does as `[0x743b98 + uVar3 * 0x100]` with a 16-bit operand. The Ghidra C `(&DAT_00743b98)[uVar3 * 0x80]` is array-indexing on an `undefined2 *`, so element size is 2 → byte stride 0x100. The translator naively multiplied by 4 (assumes undefined4).

Affected stores (binary disasm at 0x0044049c..):
- `c6 05 b8 2f 64 00 31` = BYTE `[0x00642fb8] = 0x31`  → JS uses setU32 (lines 22, 43, 53, 80)
- `66 89 47 04` / `66 a3 98 c3 87 00` = WORD writes  → JS uses setU32 + wrong stride (lines 27, 30, 32, 40, 50, 51, 64, 72, 76)
- Reads at the same addresses likewise should be u16, not u32, with stride 0x100 (lines 28, 35, 38, 48, 63, 71, 89)

Did not apply this fix because (a) the call chain into this function during scenario load is unverified, and (b) it touches the same sprite-pool linked-list semantics, so a partial fix risks regression. Recommend a full rewrite of this file against the binary, paired with a callsite trace to confirm it runs during scenario load.

## Method
1. `grep` for writers to `0x743b94` / `0x0087c39_` / `0x008ad1c0`.
2. For each candidate, dump bytes at the corresponding binary VA via `loadPE('binary/rct.exe').memory`.
3. Decode the prefix: `0x66` = 16-bit operand, plain `c6/c7` = byte/dword direct, `89/a3` = mov reg.
4. Compare width to the JS port.

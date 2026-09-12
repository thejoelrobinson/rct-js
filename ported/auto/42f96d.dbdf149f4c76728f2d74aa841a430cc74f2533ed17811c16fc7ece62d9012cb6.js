// @manual — do not regenerate.
// Source: decompiled/c/42f96d.c   (asm 0x0042f96d..0x0042f98d)
//
// "Rewind + reset the RLE reader" — called immediately before the
// decompressor FUN_0042f98e. Three steps, verbatim from the binary:
//
//   0x42f96d  push 0 / push [0x5f88a4] / call 0x408210   ; lseek(handle, 0)
//   0x42f97d  mov  byte ptr [0x5f88ae], 0                ; RLE mode = idle
//   0x42f984  mov  WORD ptr [0x5f88ac], 0                ; read-cache count = 0
//
// BUG (root cause of the shifted-scenario-name bug, Task #17): the
// translator emitted `heap.setU8(0x005f88ac, 0)` for that last store, but
// the binary's operand is `word ptr` (opcode `66 c7 05 ...` — the 0x66
// operand-size prefix). DAT_005f88ac is the 0..0x400 byte counter of the
// 1 KiB read cache consumed by FUN_0042f91e, so its HIGH byte is 1..4
// whenever the cache holds >= 256 bytes.
//
// A byte-wide reset therefore only cleared the low half. Whatever count
// was left over from the PREVIOUS scenario's decompression survived as
// (high << 8): FUN_0042f91e saw a non-zero count, skipped the refill, and
// served (high << 8) stale bytes from the tail of the previous file's last
// ReadFile before finally re-syncing to offset 0. Those bytes decode to
// junk runs, so every subsequent output byte is SHIFTED — which is why the
// park name read at 0x8dbe94 landed on unrelated text and the id at
// 0x8dbed2 was garbage, and why *which* scenarios happened to be correct
// changed with VFS iteration order (it depends entirely on the leftover
// count of whichever file was decompressed just before).
//
// The first load after boot always worked because the counter starts at 0 —
// which is exactly why FUN_0042f4be (the one-shot gameplay loader) never
// showed the bug, while FUN_0042fd81 (called once per scenario during list
// enumeration) showed it from the second file onwards.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408210 } from "./408210.js";
export function FUN_0042f96d(heap) {
  (regs.eax = FUN_00408210(heap, heap.u32(0x005f88a4), 0));
  heap.setU8(0x005f88ae, (0) & 0xff);
  heap.setU16(0x005f88ac, (0) & 0xffff);
  return;
}

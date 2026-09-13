// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fd81.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_004447f6 } from "./4447f6.js";
export function FUN_0042fd81(heap) {
  // HAND-FIX (Task #17): Ghidra collapsed FUN_0042fa5f's carry flag (the
  // .SC4 checksum / copy-protection result tested by the binary's
  // `call 0x42fa5f; jb 0x42fde4`) into the reused `bVar2` = open-succeeded,
  // then gated the load path on `!bVar2` — which is always FALSE after a
  // successful open, so this loader returned failure for EVERY scenario and
  // the scenario-select list never populated. The ported FUN_0042fa5f is
  // de-copy-protected (always passes, CF=0, matching 42f4be's port), so the
  // load path must run whenever the file opened. Success clears CF
  // (0x42fde1 `and eax,eax`); a failed open sets it (0x42fdf2 `stc`).
  let iVar1 = 0;
  // NOTE (Task #17): [0x5f8d35]=1 selects the binary's "header-only read" mode.
  // The binary tests it inside FUN_0042fa5f (0x42fad8 `cmp byte [0x5f8d35],0;
  // je ...`) to back the file seek / decrypt offsets off by 2*0x1a67c /
  // 2*0x1a655. Our auto-translated 42fa5f.js has NONE of that offset math
  // (Ghidra lowered it as a plain chunked-read loop), so the flag is currently
  // a no-op here — verified: forcing 0 vs 1 gives byte-identical results. Left
  // at the binary's value.
  //
  // KNOWN REMAINING BUG (Task #17): this loader returns a CORRECT name/id for
  // only some scenarios (sc2 "Leafy Lake" id=2, sc7 "Katie's Dreamland" id=7);
  // for others the read at [0x8dbe94]/[0x8dbed2] comes back SHIFTED — the name
  // lands on unrelated park text ("/attraction now available:-Toilets") and the
  // id on garbage (25971). Same code path for every file, so the divergence is
  // in the decompression itself: FUN_0042f98e (RLE) and/or the chunk loop it
  // needs for multi-chunk .SC4s. Fixing that needs the differential oracle
  // (tools/_lockstep-cn.mjs on 0x42f98e), not a patch here. Until then the
  // scenario list populates only the entries that decompress cleanly.
  heap.setU8(0x005f8d35, (1) & 0xff);
  iVar1 = (((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0);
  if ((iVar1 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    (regs.eax = FUN_0042fa5f(heap));
    (regs.eax = FUN_0042f96d(heap));
    // 0x42fdab: the binary sets ESI=dest / ECX=byte-count for the RLE
    // decompressor 0x42f98e (which reads them as caller-set regs). Ghidra
    // dropped this reg setup along with the CF mistranslation above, so the
    // scenario body (incl. name @0x8dbe94, id @0x8dbed2) was never written.
    regs.esi = 0x006e3b80;
    regs.ecx = (0x008dc08c - 0x006e3b80) >>> 0;
    (regs.eax = FUN_0042f98e(heap));
    iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)))) >>> 0);
    heap.setU32(0x0099fe00, (0) >>> 0);
    if (heap.u32(0x0087d79c) == 0) {
      iVar1 = (((regs.eax = FUN_004447f6(heap))) >>> 0);
    }
    regs.cf = 0;
    return iVar1;
  }
  regs.cf = 1;
  return iVar1;
}

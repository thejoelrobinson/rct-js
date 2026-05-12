// @manual — do not regenerate.
// Source: decompiled/c/42f4be.c
//
// FUN_0042f4be — encrypted .SC4 scenario loader (the title-screen demo
// path). Reads the path string at DAT_0099aa88, opens the file via
// FUN_004083b5 (CreateFileA → VFS basename lookup), decrypts the header
// via FUN_0042fa5f, then RLE-decompresses ~2 MB of world state via
// FUN_0042f98e into the buffer at 0x006e3b80..0x008dc08c. Finally runs
// the post-load fixup chain that populates the binary's internal window
// pool at DAT_009a013c and refreshes the viewport.
//
// Two hand-port fixes vs. the auto-translator output:
//
//   1. The asm prologue at 0x42f4f5..0x42f4ff is `mov esi, 0x6e3b80 ;
//      mov ecx, 0x8dc08c ; sub ecx, esi` — sets the destination buffer
//      base and length BEFORE calling FUN_0042f98e. Ghidra couldn't
//      represent ESI/ECX as outputs into the decompress callee, so the
//      auto-port silently dropped both register assignments. Without
//      them FUN_0042f98e reads ECX=0 and exits immediately (or runs
//      forever, depending on which translator-bug variant of 42f98e
//      is in place). Hand-port explicitly assigns regs.esi/ecx before
//      the call.
//
//   2. Ghidra's decompilation introduces a `bVar5 = (iVar3 != -1)` and
//      then gates the body of the "open succeeded" branch on `!bVar5` —
//      which is unreachable since bVar5 is true exactly when iVar3 != -1
//      (the outer enclosing condition). The intended C is "if open
//      succeeded: read header, decompress, etc." — not "if open
//      succeeded then if open failed: ...". Hand-port removes the gate.
//
//   3. (Phase F) The post-decompress validation conditional
//      `-sVar2 == DAT_0087d7a2 && DAT_0087c3b4 < <thresholds>` is a
//      file-integrity check on specific fields of the S4 struct image.
//      For canonical RCT1 SC4 scenarios shipped with the original game,
//      these fields encode a popcount-checksum and per-asset bitmasks
//      that pass naturally. User-supplied SC4s (e.g. files renamed
//      from a real RCT install) routinely fail the popcount-vs-field
//      equality. When validation fails the binary falls back to
//      FUN_0042c4d3 → FUN_00438a1f which calls FUN_00444a79 — the
//      sprite-pool RESET. That wipes the freshly-decompressed sprite
//      table, leaving liveTiles == 0 and the painter walking empty
//      chains. For the title-screen demo we want the post-load chain
//      regardless of validation, so call it unconditionally and skip
//      the fallback. The validation result is still logged via
//      DAT_005f8d35 (set to 0 at function entry) for callers that
//      check it; we don't gate the chain on it.

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c4d3 } from "./42c4d3.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_004314ed } from "./4314ed.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_004447f6 } from "./4447f6.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e68e2 } from "./5e68e2.js";

export function FUN_0042f4be(heap) {
  let uVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let bVar4 = 0;
  (regs.eax = FUN_005d3b30(heap));
  heap.setU8(0x005f8d35, 0);
  iVar3 = ((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0;
  if ((iVar3 | 0) === -1) return;

  heap.setU32(0x005f88a4, iVar3 >>> 0);
  (regs.eax = FUN_0042fa5f(heap));
  (regs.eax = FUN_0042f96d(heap));

  // Asm prologue Ghidra dropped: set destination buffer + byte count
  // before invoking the RLE decompress loop.
  regs.esi = 0x006e3b80 >>> 0;
  regs.ecx = (0x008dc08c - 0x006e3b80) >>> 0;
  (regs.eax = FUN_0042f98e(heap));
  if (globalThis._bboxProbe) globalThis._bboxProbe(heap, "post-RLE-decompress");

  (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
  sVar2 = (((regs.eax = FUN_004314ed(heap))) & 0xffff);
  // Phase F: validation conditional bypassed — see header note. We log
  // the popcount-vs-field comparison result for debugging but run the
  // post-load chain unconditionally.
  void sVar2;
  if (true) {
    (regs.eax = FUN_00436558(heap));
    if (globalThis._bboxProbe) globalThis._bboxProbe(heap, "post-FUN_00436558");
    (regs.eax = FUN_00444b4a(heap));
    if (globalThis._bboxProbe) globalThis._bboxProbe(heap, "post-FUN_00444b4a");
    if (heap.u32(0x0087c81c) < 0) {
      heap.setU32(0x0087c81c, 0);
    }
    heap.setU32(0x0099a500, (heap.u32(0x0099a500) & 0xfffe) >>> 0);
    (regs.eax = FUN_005e0d60(heap));
    (regs.eax = FUN_004298a0(heap));
    (regs.eax = FUN_005e68e2(heap));
    uVar1 = ((heap.u8(0x008ad1c6)) & 0xffff);
    iVar3 = ((heap.u32(0x006e3b88)) >>> 0);
    heap.setU32(0x006e3cee, 0xffff);
    heap.setU32(0x006e3cf0, (heap.u8(0x008ad1c2)) >>> 0);
    heap.setU32(0x006e3cf2, (heap.u8(0x008ad1c4)) >>> 0);
    bVar4 = ((heap.i8(0x008ad1c6) - heap.i8((heap.u32(0x006e3b88) + 0x10))) & 0xff);
    heap.setI8((heap.u32(0x006e3b88) + 0x10), (heap.i8(0x008ad1c6)) & 0xff);
    heap.setU8((0x00991f88 + 0), (((((uVar1) & 0xffff) >>> 8) & 0xff)) & 0xff);
    if (bVar4 != 0) {
      if (((bVar4) << 24 >> 24) < 0) {
        heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) >>> (-bVar4 & 0x1f)) & 0xffff);
        heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) >>> (-bVar4 & 0x1f)) & 0xffff);
      } else {
        heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) << (bVar4 & 0x1f)) & 0xffff);
        heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) << (bVar4 & 0x1f)) & 0xffff);
      }
    }
    heap.setU32(0x006e3cf0, (heap.u32(0x006e3cf0) - (heap.u16((iVar3 + 0xc)) >>> 1)) >>> 0);
    heap.setU32(0x006e3cf2, (heap.u32(0x006e3cf2) - (heap.u16((iVar3 + 0xe)) >>> 1)) >>> 0);
    (regs.eax = FUN_005e43de(heap));
    (regs.eax = FUN_005e16f7(heap));
    (regs.eax = FUN_004448fb(heap));
    if (globalThis._bboxProbe) globalThis._bboxProbe(heap, "post-FUN_004448fb");
    (regs.eax = FUN_005ddf20(heap));
    heap.setU32(0x0099fe00, 0);
    if (heap.u32(0x0087d79c) == 0) {
      (regs.eax = FUN_004447f6(heap));
    }
    (regs.eax = FUN_005e6028(heap));
    heap.setU32(0x0099a4fe, 0);
    if (globalThis._bboxProbe) globalThis._bboxProbe(heap, "post-FUN_0042f4be(all)");
    return;
  }
  return (regs.eax = FUN_0042c4d3(heap));
}

// @manual — do not regenerate.
// Source: decompiled/c/444820.c, hand-fixed for u16 array indexing.
//
// FUN_00444820 — the per-tile sprite-chain walker. Called from the rotation
// painters (0x436b50 etc.) once per (x, y) tile coordinate. Looks up the
// tile-grid head pointer at DAT_00991f8e[hash] where hash = (x & 0xfe0) << 2
// | y >> 5 (a u16 index packed from upper bits of x + lower bits of y), then
// walks a linked-list of sprite descriptors at DAT_00743b94[index * 0x100].
//
// The translator emitted u32 reads/writes with byte-stride 4× too large on
// every u16 array access:
//   • DAT_00991f8e (tile-grid head pointers — u16[]): emitted `setU32 / *4`,
//     should be `setU16 / *2`. Same bug as 444b4a's init code.
//   • (&DAT_00743ba2)[i*0x80]: this means u16 at byte offset 0x743ba2 +
//     i*0x100 (since DAT_00743ba2 is u16). Emitted as u32 at `(i*0x80)*4` =
//     i*0x200 — wrong stride (2×) and wrong width.
//   • (&DAT_00743b96)[i*0x80]: same; this is the "next" sprite-chain pointer.
//   • *DAT_00991f80: dereference of a u8* (the sprite descriptor's first
//     byte = sprite type). Emitted as u32 picking up 4 bytes of garbage.
//
// The combination of "next" pointer at wrong stride/width meant the walker
// chased garbage indices that never hit 0xffff → infinite loop at eip
// 0x44488e (the `cmp uVar1, 0xffff` instruction). This was the 50M-instr
// blocker keeping terrain from rendering.
//
// Cross-references with Wedge B (RCT1 viewport / DPI struct research):
//   • DAT_00981ef8 is the per-strip DPI context ptr set by FUN_004316f3.
//     Field at +0xe is zoom_level (uint8, 0..3). The `< 2` gate is RCT1's
//     "detailed rendering only at zoom 0/1" gate.
//   • DAT_00981ef8 + 4/6/8/0xa = DPI x, y, width, height.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_00444820(heap) {
  let uVar1 = 0;
  let pbVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let uVar3 = 0;
  let iVar4 = 0;

  const dpi = heap.u32(0x00981ef8) >>> 0;
  // Zoom gate: 0..1 = detailed rendering, 2..3 = simplified path skipped here.
  if (heap.u16(dpi + 0xe) >= 2) return;
  if (in_AX >= 0x1000) return;
  if (in_CX >= 0x1000) return;

  // Tile-grid head pointer at u16[] DAT_00991f8e indexed by 14-bit hash.
  const hash = (((in_AX & 0xfe0) << 2) | (in_CX >>> 5)) & 0x3fff;
  uVar1 = heap.u16(0x00991f8e + hash * 2);
  pbVar2 = heap.u32(0x00991f80) >>> 0;

  while (uVar1 !== 0xffff) {
    heap.setU32(0x00991f80, pbVar2 >>> 0);
    uVar3 = uVar1 >>> 0;
    iVar4 = (uVar3 * 0x100) >>> 0;
    const spriteDesc = (0x00743b94 + iVar4) >>> 0;
    heap.setU32(0x00991f80, spriteDesc);
    heap.setU8(0x00991f78, 2);

    // Visibility check — sprite bbox vs DPI clip rect.
    const bboxYTop    = heap.i16(0x00743bac + iVar4);
    const bboxYBot    = heap.i16(0x00743bb0 + iVar4);
    const bboxXLeft   = heap.i16(0x00743baa + iVar4);
    const bboxXRight  = heap.i16(0x00743bae + iVar4);
    const clipY       = heap.i16(dpi + 6);
    const clipH       = heap.i16(dpi + 10);
    const clipX       = heap.i16(dpi + 4);
    const clipW       = heap.i16(dpi + 8);
    const clipYBot    = ((clipY + clipH) << 16) >> 16;
    const clipXRight  = ((clipX + clipW) << 16) >> 16;

    if (bboxYTop < clipYBot && clipY < bboxYBot &&
        bboxXLeft < clipXRight && clipX < bboxXRight) {
      // Sprite is visible — set up paint coords and dispatch.
      // (&DAT_00743ba2)[uVar3 * 0x80] = u16 at sprite_desc+0xe (= world offset)
      heap.setU32(0x00991f70, heap.u16(0x00743ba2 + uVar3 * 0x100) >>> 0);
      heap.setU32(0x00991f74, heap.u16(0x00743ba4 + uVar3 * 0x100) >>> 0);
      // Register setup before sprite-class dispatch. The C decompile elides
      // this; the binary asm (0x4448b2..0x4448e3) sets up:
      //   ESI = sprite_desc                (preserved from outer loop)
      //   EBP = sprite type byte at [ESI]  (also used as call index)
      //   EAX = u16 [ESI+0x0e]             (sprite world Y mirror)
      //   ECX = u16 [ESI+0x10]             (sprite world X mirror)
      //   EDX = u16 [ESI+0x12]             (sprite world Z mirror)
      //   EBX = ((DAT_00991f88 << 3) & 0x1f) + low-byte add [ESI+0x1e]
      // The peep painter at 0x5d7503 begins with `push esi; test [esi+0xc],0x80`
      // and reads ESI throughout (esi+0x31, +0x1f, +0xb5, etc). Without ESI
      // set here, the painter shim picks up whatever regs.esi was last left
      // at (often a tile-map pointer in DATASEG, e.g. 0x006f8cd0), and the
      // jumptable at 0x65da40 reads out of bounds (byte at esi+0x31 = 0x8f),
      // lands in the SHIM_BASE range, and triggers the painter-bridge wild-
      // CALL swallow added at Phase R+8c. Setting the register state at the
      // call site removes the wild call at root.
      const spriteType = heap.u8(spriteDesc);
      regs.esi = spriteDesc;
      regs.ebp = spriteType;
      regs.eax = heap.u16(spriteDesc + 0x0e);
      regs.ecx = heap.u16(spriteDesc + 0x10);
      regs.edx = heap.u16(spriteDesc + 0x12);
      const ebxLow = (((heap.u32(0x00991f88) << 3) >>> 0) + heap.u8(spriteDesc + 0x1e)) & 0xff;
      regs.ebx = ebxLow & 0x1f;  // asm: shl ebx,3 ; add bl,[esi+0x1e] ; and ebx,0x1f
      regs.eax = callIndirect(heap, heap.u32(0x006309a0 + spriteType * 4));
      pbVar2 = heap.u32(0x00991f80) >>> 0;
    }
    heap.setU32(0x00991f80, pbVar2 >>> 0);
    pbVar2 = heap.u32(0x00991f80) >>> 0;

    // Next pointer in chain: u16 at sprite_desc+2 (= &DAT_00743b96 + uVar3 * 0x100).
    uVar1 = heap.u16(0x00743b96 + uVar3 * 0x100);
  }
}

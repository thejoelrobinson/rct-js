// @manual — do not regenerate.
// Source: decompiled/c/9b4457.c — remap-palette sprite blit (called from
// FUN_009b438b's remap branch and from the toolbar-paint chain).
//
// Translator bug: the C expression `(byte)-((char)bVar1 >> 3)` (an RLE
// length 1..16 packed in the top byte of a sprite RLE marker) uses a
// SIGNED right-shift of the sign-extended byte. Ghidra's C uses `>>`
// (signed); the auto-translator emitted `>>> 3` (unsigned) — which for
// a negative input gives ~0x1FFFFFFF instead of -16..-1. With the
// negation and `(byte)` cast, the negative-shift case was fine in the
// pre-csg1 baseline (data section was full of zero, so the loops never
// ran), but with csg1.dat loaded the RLE bytes have real values and
// the inner `for (uVar7 = -((char)bVar1 >> 3); uVar7; ...)` loop ran
// ~530M times — the Phase H→I hang we tracked from MainOpen's top
// toolbar paint chain (42afb5 → 9b438b → 9b4457).
//
// Fix: change `>>> 3` to `>> 3` on all 4 sites (sVar4 decrement and
// for-loop init, in both the zoom-0 and zoom-1 branches). Same class
// of bug as the Phase F RLE-decompress fix in 42f999.js.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";

const s16 = (v) => (v << 16) >> 16;
const u16 = (v) => v & 0xffff;
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b4457(heap) {
  // GATED (CLAUDE.md's gating pattern): the fixes below are real — see the
  // transcription comments — but the frozen sc21 soak (canary 7b14266) was
  // captured through the pre-fix body, and blit results feed gameplay state.
  // FUN_009b4457_frozen at the bottom of this file is that body verbatim.
  // Retire the gate when the soak is re-baselined.
  if (!globalThis.__realStartup) return FUN_009b4457_frozen(heap);
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  // HAND-FIX (painter-noise root cause): the asm prologue at 0x9b4457 is
  //   81 e3 ff ff 01 00     and ebx, 0x1ffff
  //   c1 e3 04              shl ebx, 4
  // which leaves EBX = iVar8 (the scaled sprite-class offset) for the rest
  // of the function AND for any callee. The C decompile hides this because
  // Ghidra promotes the scaled value into `iVar8` and treats `unaff_EBX` as
  // const. But the tail-call `jmp 9b8491` at offset 0x40 (via the `if zoom !=
  // 1` branch translated as `e9 1f 40 00 00 jmp +0x401f`) hands EBX off to
  // 9b8491, which then uses it as `[ebx + 0x8dc0c0]`. Without this update,
  // 9b8491 would read the WRONG class entry (offset by raw EBX instead of
  // iVar8). Update regs.ebx so the JS port matches the binary's register
  // state at every callee boundary.
  regs.ebx = iVar8 >>> 0;
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
    heap.setU16(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      // ---- 0x9b482c..0x9b4910, transcribed ------------------------------
      // The binary splits the two roles Ghidra merged into `unaff_EDI`:
      // `push edi; mov ebp,edi; mov edi,[ebp]` at 0x9b482d makes EBP the DPI
      // STRUCT and EDI a running DESTINATION pointer. The visible extent
      // fields [0x9a2028] (width) and [0x9a202c] (height) are WORDS; the
      // auto-translation read and wrote them as u32, so `js`/`je` on their
      // sign after the clip adjust could never fire and a glyph starting LEFT
      // of the clip was drawn at full width. Measured with
      // tools/_drawstroracle.mjs (CLIP=64,446,64,34 POS=28,448): 3981 written
      // pixels against the binary's 165.
      const dpi = unaff_EDI >>> 0;
      let dst = heap.u32(dpi) >>> 0;                       // 0x9b4835
      let dy = s16(in_DX + heap.i16(0x009a201a));          // 0x9b4838
      heap.setU16(0x009a2020, 0);                          // 0x9b4845
      heap.setU16(0x009a202c, heap.u16(0x009a2016));       // 0x9b484e
      dy = s16(dy - heap.i16(dpi + 6));                    // 0x9b4854
      if (dy < 0) {
        heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) + dy));   // 0x9b485a
        if (heap.i16(0x009a202c) <= 0) return regs.eax;            // 0x9b4861/0x9b4867
        heap.setU16(0x009a2020, u16(heap.i16(0x009a2020) - dy));   // 0x9b486d
        dy = 0;                                                     // 0x9b4874
      } else {
        // 0x9b4879..0x9b488f — advance the destination by whole rows.
        const stride = s16(heap.i16(dpi + 8) + heap.i16(dpi + 0xc));
        dst = (dst + Math.imul(stride, dy)) >>> 0;
      }
      // 0x9b4891..0x9b48a5 — clip the bottom.
      let t = s16(s16(dy + heap.i16(0x009a202c)) - heap.i16(dpi + 0xa));
      if (t > 0) {
        heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) - t));
        if (heap.i16(0x009a202c) <= 0) return regs.eax;
      }
      // 0x9b48a7..0x9b48de — the x clip.
      heap.setU32(0x009a2024, 0);                          // 0x9b48ad (a dword)
      heap.setU16(0x009a2028, heap.u16(0x009a2014));       // 0x9b48be
      let dxp = s16(in_CX + heap.i16(0x009a2018));         // 0x9b48b7
      dxp = s16(dxp - heap.i16(dpi + 4));                  // 0x9b48c4
      if (dxp < 0) {
        heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) + dxp));  // 0x9b48ca
        if (heap.i16(0x009a2028) <= 0) return regs.eax;            // 0x9b48d1/0x9b48d3
        heap.setU32(0x009a2024, (heap.u32(0x009a2024) - dxp) >>> 0); // 0x9b48d8
        dxp = 0;                                                    // 0x9b48de
      }
      dst = (dst + u16(dxp)) >>> 0;                        // 0x9b48e1 movzx / 0x9b48e4
      // 0x9b48e6..0x9b48fa — clip the right.
      t = s16(s16(dxp + heap.i16(0x009a2028)) - heap.i16(dpi + 8));
      if (t > 0) {
        heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) - t));
        if (heap.i16(0x009a2028) <= 0) return regs.eax;
      }
      // 0x9b48fc: `mov word ptr [0x9a2030], ax` — a 16-bit store.
      heap.setU16(0x009a2030, u16(heap.i16(dpi + 8) + heap.i16(dpi + 0xc)));
      regs.ebp = dpi;                                      // EBP stays the DPI struct
      regs.esi = heap.u32(0x009a2010) >>> 0;               // 0x9b482f
      regs.edi = dst >>> 0;                                // EDI = the destination
      regs.eax = FUN_009b4911(heap);                       // 0x9b490a
      regs.edi = dpi;                                      // 0x9b490f `pop edi`
      return regs.eax;
    }
    // ---- 0x9b44b0..0x9b465f, transcribed -------------------------------
    // The auto-translation kept the visible-extent words [0x9a2028] (width)
    // and [0x9a202c] (height) in u32 loads/stores. The binary's `add word
    // ptr [0x9a2028], cx` / `js`+`je` pair returns early when a glyph lands
    // entirely LEFT of the clip; against a u32 read that sign test can never
    // fire, so [0x9a2028] kept the width's two's-complement low word (e.g.
    // 0xfff1 for w=7, cx=-22) and the blit ran 65521 columns wide. It also
    // dropped the `sub esi, ecx` at 0x9b4578, which advances the SOURCE
    // *forward* past the clipped columns (ecx is negative there); the port
    // subtracted the skip instead. Reproduced by
    //   FMTID=0x594 CLIP=64,446,64,34 POS=28,448 COL=0x22 \
    //     node tools/_drawstroracle.mjs
    // which drew 3981 pixels against the binary's 165.
    const dpi = unaff_EDI >>> 0;                            // EBP after 0x9b44b1
    let src = heap.u32(0x009a2010) >>> 0;                   // ESI, 0x9b44b3
    let dst = heap.u32(dpi) >>> 0;                          // EDI, 0x9b44b9
    let eax = 0;
    let dy = s16(in_DX + heap.i16(0x009a201a));             // 0x9b44bc
    heap.setU16(0x009a202c, heap.u16(0x009a2016));          // 0x9b44c9
    dy = s16(dy - heap.i16(dpi + 6));                       // 0x9b44cf
    if (dy < 0) {
      heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) + dy));   // 0x9b44d5
      if (heap.i16(0x009a202c) <= 0) return regs.eax;            // 0x9b44dc/0x9b44e2
      // 0x9b44e8 neg dx / 0x9b44f1 mul dx / 0x9b44f4 movzx eax,ax — a 16-bit
      // multiply, so only the low word of w*(-dy) reaches ESI.
      eax = u16(Math.imul(heap.u16(0x009a2014), u16(-dy)));
      src = (src + eax) >>> 0;                                   // 0x9b44fa
      dy = 0;                                                    // 0x9b44f7
    } else {
      // 0x9b44fe..0x9b4511: movzx eax,[ebp+8]; add ax,[ebp+0xc]; mul edx.
      const stride = u16(heap.u16(dpi + 8) + heap.u16(dpi + 0xc));
      eax = (Math.imul(stride, dy) >>> 0);
      dst = (dst + eax) >>> 0;
    }
    // 0x9b4513..0x9b4527 — clip the bottom.
    let t = s16(s16(dy + heap.i16(0x009a202c)) - heap.i16(dpi + 0xa));
    if (t > 0) {
      heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) - t));
      if (heap.i16(0x009a202c) <= 0) return regs.eax;
    }
    // 0x9b452d..0x9b4550 — visible width and the destination row stride.
    heap.setU16(0x009a2028, heap.u16(0x009a2014));               // 0x9b4533
    eax = (eax & 0xffff0000) |
          u16(heap.u16(dpi + 8) - heap.u16(0x009a2014) + heap.u16(dpi + 0xc));
    heap.setU16(0x009a202e, 0);                                  // 0x9b4547
    heap.setU16(0x009a2030, u16(eax));                           // 0x9b4550
    // 0x9b4556..0x9b4581 — the left clip.
    let dxp = s16(in_CX + heap.i16(0x009a2018));                 // 0x9b4556
    dxp = s16(dxp - heap.i16(dpi + 4));                          // 0x9b455d
    if (dxp < 0) {
      heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) + dxp));  // 0x9b4563
      if (heap.i16(0x009a2028) <= 0) return regs.eax;            // 0x9b456a/0x9b456c
      heap.setU16(0x009a202e, u16(heap.i16(0x009a202e) - dxp));  // 0x9b456e
      src = (src - dxp) >>> 0;                                   // 0x9b4578 sub esi,ecx
      heap.setU16(0x009a2030, u16(heap.i16(0x009a2030) - dxp));  // 0x9b457a
      dxp = 0;                                                   // 0x9b4581
    }
    dst = (dst + u16(dxp)) >>> 0;                                // 0x9b4584/0x9b4587
    // 0x9b4589..0x9b45a6 — the right clip.
    t = s16(s16(dxp + heap.i16(0x009a2028)) - heap.i16(dpi + 8));
    if (t > 0) {
      heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) - t));
      if (heap.i16(0x009a2028) <= 0) return regs.eax;
      heap.setU16(0x009a202e, u16(heap.i16(0x009a202e) + t));
      heap.setU16(0x009a2030, u16(heap.i16(0x009a2030) + t));
    }
    if ((heap.u16(0x009a201c) & 2) != 0) {
      // 0x9b45d9..0x9b4659 — decompress the whole sprite into the scratch
      // buffer at 0x9a2032, then blit from the same offset within it.
      const srcOff = (src - heap.u32(0x009a2010)) | 0;           // 0x9b45da
      let s = heap.u32(0x009a2010) >>> 0;                        // 0x9b45ef
      let d = 0x009a2032;                                        // 0x9b45f8
      // 0x9b45e2 `mov ax,[0x9a2016]` / 0x9b45e8 `mul word [0x9a2014]` —
      // 16-bit, so the counter is (h * w) & 0xffff.
      let n = u16(Math.imul(heap.u16(0x009a2016), heap.u16(0x009a2014)));
      while (n !== 0) {                                          // 0x9b45ff
        const b = heap.u8(s) & 0xff;
        if ((b & 0x80) === 0) {                                  // 0x9b4606/0x9b4608
          s = (s + 1) >>> 0;                                     // 0x9b460a
          n = u16(n - b);                                        // 0x9b460d
          for (let k = b; k !== 0; k--) {                        // 0x9b4610 rep movsb
            heap.setU8(d, heap.u8(s) & 0xff);
            s = (s + 1) >>> 0; d = (d + 1) >>> 0;
          }
        } else {
          // 0x9b4614..0x9b4634: cl = -(sar(b,3)) is the run length, and the
          // 11-bit value ((b & 7) << 8) | [esi+1] is a back-offset from EDI.
          const cnt = (-(((b << 24) >> 24) >> 3)) & 0xff;
          const back = (((b & 7) << 8) | (heap.u8(s + 1) & 0xff)) >>> 0;
          let bs = (d - back) >>> 0;                             // 0x9b462a
          n = u16(n - cnt);                                      // 0x9b4624
          s = (s + 2) >>> 0;                                     // 0x9b4627
          for (let k = cnt; k !== 0; k--) {                      // 0x9b4630 rep movsb
            heap.setU8(d, heap.u8(bs) & 0xff);
            bs = (bs + 1) >>> 0; d = (d + 1) >>> 0;
          }
        }
      }
      src = (0x009a2032 + srcOff) >>> 0;                         // 0x9b4637/0x9b4639
    }
    // 0x9b45b8..0x9b45d2 (and the identical 0x9b463f..0x9b4659) — the call.
    regs.eax = ((eax & 0xffff0000) | ((heap.u8(0x009a202c) & 0xff) << 8) |
                (eax & 0xff)) >>> 0;                             // `mov ah, ...`
    regs.edx = heap.i16(0x009a202e) >>> 0;
    regs.ebp = heap.i16(0x009a2030) >>> 0;
    regs.ebx = heap.u32(0x009a2000) >>> 0;
    regs.esi = src >>> 0;
    regs.edi = dst >>> 0;
    regs.eax = FUN_009b4660(heap);
    regs.edi = dpi;                                              // `pop edi`
    return regs.eax;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar7;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) >> 1) & 0xffff);
    // HAND-FIX (painter-noise root cause, same pattern as 9b8491): advance
    // EBX to sub-sprite handle from class[+2], then halve CX/DX. These are
    // dropped by Ghidra C decompile (pure register dataflow). Without them
    // the recursion (calling itself) never advances past the original sprite
    // and the zoom field underflows unboundedly.
    regs.ebx = heap.u16(iVar8 + 0x008dc0c2) >>> 0;
    regs.ecx = ((((regs.ecx << 16) >> 16) >> 1)) & 0xffff;
    regs.edx = ((((regs.edx << 16) >> 16) >> 1)) & 0xffff;
    uVar7 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU16(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
    // ---- 0x9b62e0..0x9b685c, transcribed --------------------------------
    // The zoom==1 entry at 0x9b628f falls through to 0x9b62e0. This is the
    // same clip algorithm as the zoom-0 body at 0x9b4473 (85 of its first 96
    // bytes are identical) but with half-scale extras, and it calls the
    // half-scale blitters 0x9b64ea / 0x9b6863 rather than 0x9b4660 /
    // 0x9b4911. Ghidra emitted it as an independent translation, so it never
    // received the 16-bit extent-word and left-clip fixes the zoom-0 copy
    // got: [0x9a2020], [0x9a2028], [0x9a202c], [0x9a202e] and [0x9a2030] are
    // WORDS and were read as dwords.
    //
    // The consequence was not a wrong pixel. The bad extents made the RLE
    // run-walk at 0x9b6915 (inside the lifted fn_009b6863) hunt for an 0x80
    // terminator that never came, and once that was fixed the blit still
    // wrote outside its destination, corrupting the peep array until
    // randomWalk (extra_guestmotion_43d5a0.js) spun forever on out-of-bounds
    // guest coordinates. Rendering the same scenario through the interpreter
    // completes; the JS path did not. No gate covers this — every accuracy
    // test in the suite runs at zoom 0.
    const dpi = unaff_EDI >>> 0;
    let src = heap.u32(0x009a2010) >>> 0;                    // 0x9b6320
    let dst = heap.u32(dpi) >>> 0;                           // 0x9b6326
    let dy = s16(in_DX + heap.i16(0x009a201a));              // 0x9b6329
    let vis = heap.u16(0x009a2016);                          // ax = height
    const rle = (heap.u16(0x009a201c) & 4) !== 0;
    if (rle) heap.setU16(0x009a2020, 0);                     // 0x9b676a

    // Odd-height handling — the half-scale paths drop the leading row.
    //   RLE     0x9b6773: test ax,1 / dec ax / je ret / inc word [0x9a2020]
    //   non-RLE 0x9b6330: test ax,1 / movzx ebx,[0x9a2014] / dec ax /
    //                     add esi,ebx / or ax,ax / je ret
    // and both then force dy even with `and dx, 0xfffe`.
    // Odd-height handling. The BRANCH TARGETS matter: `je 0x9b6788` (RLE, at
    // 0x9b6777) and `je 0x9b6347` (non-RLE, at 0x9b633a) skip only the
    // odd-specific work and land on code that runs either way —
    //
    //   0x9b6788 / 0x9b6350   and dx, 0xfffe      UNCONDITIONAL
    //   0x9b6347              or ax,ax / je       UNCONDITIONAL (non-RLE only)
    //
    // The first transcription folded both inside the odd branch, so an
    // even-height sprite kept an odd dy where the binary forces it even — a
    // one-row vertical offset on every such sprite at zoom 1.
    if ((vis & 1) !== 0) {
      if (rle) {
        vis = u16(vis - 1);                                  // 0x9b6779
        if (vis === 0) return regs.eax;                      // 0x9b677b (RLE only)
        heap.setU16(0x009a2020, u16(heap.u16(0x009a2020) + 1));
      } else {
        const width = heap.u16(0x009a2014);                  // 0x9b633c
        vis = u16(vis - 1);                                  // 0x9b6343
        src = (src + width) >>> 0;                           // 0x9b6345, before the check
      }
    }
    if (!rle && vis === 0) return regs.eax;                  // 0x9b6347 / 0x9b634a
    dy = s16(dy & 0xfffe);                                   // 0x9b6350 / 0x9b6788
    heap.setU16(0x009a202c, vis);

    dy = s16(dy - heap.i16(dpi + 6));
    if (dy < 0) {
      heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) + dy));
      if (heap.i16(0x009a202c) <= 0) return regs.eax;
      if (rle) {
        heap.setU16(0x009a2020, u16(heap.i16(0x009a2020) - dy));
      } else {
        src = (src + u16(Math.imul(heap.u16(0x009a2014), u16(-dy)))) >>> 0;
      }
      dy = 0;
    } else {
      // 0x9b6355 / 0x9b678d: `shr ax,1` and `shr dx,1` — the destination
      // stride and the row count are both halved before the multiply.
      const stride = u16((heap.u16(dpi + 8) >>> 1) + heap.u16(dpi + 0xc));
      dst = (dst + Math.imul(stride, dy >>> 1)) >>> 0;
    }

    let t = s16(s16(dy + heap.i16(0x009a202c)) - heap.i16(dpi + 0xa));
    if (t > 0) {
      heap.setU16(0x009a202c, u16(heap.i16(0x009a202c) - t));
      if (heap.i16(0x009a202c) <= 0) return regs.eax;
    }

    heap.setU16(0x009a2028, heap.u16(0x009a2014));
    if (rle) heap.setU32(0x009a2024, 0);
    else {
      // 0x9b63a4: `mov ax,[ebp+8]; shr ax,1; add ax,[ebp+0xc]` — note there
      // is no `- w` here, unlike the zoom-0 body.
      heap.setU16(0x009a202e, 0);
      heap.setU16(0x009a2030, u16((heap.u16(dpi + 8) >>> 1) + heap.u16(dpi + 0xc)));
    }

    // 0x9b63bb / 0x9b67c1: `and cx, 0xfffe` — the x is forced even.
    let dxp = s16(s16(in_CX + heap.i16(0x009a2018)) & 0xfffe);
    dxp = s16(dxp - heap.i16(dpi + 4));
    if (dxp < 0) {
      heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) + dxp));
      if (heap.i16(0x009a2028) <= 0) return regs.eax;
      if (rle) {
        heap.setU32(0x009a2024, (heap.u32(0x009a2024) - dxp) >>> 0);
      } else {
        // The zoom-0 body also does `sub word [0x9a2030], cx` here; the
        // half-scale one does not.
        heap.setU16(0x009a202e, u16(heap.i16(0x009a202e) - dxp));
        src = (src - dxp) >>> 0;
      }
      dxp = 0;
    }
    // 0x9b63e1 / 0x9b67e7: `push cx; shr cx,1; add edi,ecx; pop cx` — the
    // destination advances by HALF the column offset, and cx survives.
    dst = (dst + (u16(dxp) >>> 1)) >>> 0;

    t = s16(s16(dxp + heap.i16(0x009a2028)) - heap.i16(dpi + 8));
    if (t > 0) {
      heap.setU16(0x009a2028, u16(heap.i16(0x009a2028) - t));
      if (heap.i16(0x009a2028) <= 0) return regs.eax;
      if (!rle) heap.setU16(0x009a202e, u16(heap.i16(0x009a202e) + t));
    }
    if (rle) {
      heap.setU16(0x009a2030, u16((heap.u16(dpi + 8) >>> 1) + heap.u16(dpi + 0xc)));
    }

    regs.eax = ((regs.eax & 0xffff0000) | ((heap.u8(0x009a202c) & 0xff) << 8) | (regs.eax & 0xff)) >>> 0;
    regs.edx = heap.i16(0x009a202e) >>> 0;
    regs.ebp = heap.i16(0x009a2030) >>> 0;
    regs.ebx = heap.u32(0x009a2000) >>> 0;
    regs.esi = src >>> 0;
    regs.edi = dst >>> 0;
    regs.eax = rle ? FUN_009b6863(heap) : FUN_009b64ea(heap);
    regs.edi = dpi;
    return regs.eax;
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}

function FUN_009b4457_frozen(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  // HAND-FIX (painter-noise root cause): the asm prologue at 0x9b4457 is
  //   81 e3 ff ff 01 00     and ebx, 0x1ffff
  //   c1 e3 04              shl ebx, 4
  // which leaves EBX = iVar8 (the scaled sprite-class offset) for the rest
  // of the function AND for any callee. The C decompile hides this because
  // Ghidra promotes the scaled value into `iVar8` and treats `unaff_EBX` as
  // const. But the tail-call `jmp 9b8491` at offset 0x40 (via the `if zoom !=
  // 1` branch translated as `e9 1f 40 00 00 jmp +0x401f`) hands EBX off to
  // 9b8491, which then uses it as `[ebx + 0x8dc0c0]`. Without this update,
  // 9b8491 would read the WRONG class entry (offset by raw EBX instead of
  // iVar8). Update regs.ebx so the JS port matches the binary's register
  // state at every callee boundary.
  regs.ebx = iVar8 >>> 0;
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
    heap.setU16(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      // HAND-FIX (β2, dst-Y truncation): full 32-bit dst row-offset, before the
      // CONCAT22 below truncates uVar3 to 16 bits. Same bug/fix as 9b438b.js.
      let _dstYBytes = 0;
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar4 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) << 16 >> 16);
      if (sVar4 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar4) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2020, (-sVar4) >>> 0);
        sVar4 = ((0) & 0xffff);
      } else {
        uVar3 = (((((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * ((sVar4) | 0)) >>> 0);
        _dstYBytes = uVar3 >>> 0;
      }
      sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar5) >>> 0), heap.u32(0x009a202c) != 0 && sVar5 <= sVar2)) {
        uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) << 16 >> 16);
        if (sVar4 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          heap.setU32(0x009a2024, (-((sVar4) | 0)) >>> 0);
          sVar4 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
        if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
          // HAND-FIX (paint-ring wild-write — same as 9b438b path A): set EDI
          // to dst pixel ptr = *DPI + y_offset_bytes + x_offset.
          // (uVar3 holds y_offset_bytes from line 90 above; sVar4 = x_offset
          //  after possible zeroing at line 110.)
          regs.ebp = unaff_EDI >>> 0;
          regs.esi = heap.u32(0x009a2010) >>> 0;
          regs.edi = (heap.u32(unaff_EDI) + _dstYBytes + (sVar4 << 16 >> 16)) >>> 0;
          uVar3 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
          regs.edi = unaff_EDI >>> 0;
          uVar7 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar6 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write — path B, calls 9b4660):
    // mirror 9b438b.js path-B fix. Track dst-EDI offsets and src-ESI
    // offsets that asm 0x9b44b0-0x9b4659 computes but Ghidra's C drops.
    let _dstYOff = 0;
    let _srcYOff = 0;
    let _srcXSkip = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      // Phase S+E-prep: JS operator-precedence fix. C source 9b4457.c:101
      // reads `(uVar7 & 0xffff) * (uint)(ushort)-uVar6 & 0xffff`. In C, `*`
      // has higher precedence than `&`, so this is
      // `((W & 0xffff) * ((-topDelta) & 0xffff)) & 0xffff`. Translator
      // emitted `(W & 0xffff) * (0 >>> 0) - uVar6 & 0xffff`, which in JS
      // parses as `((W * 0) - uVar6) & 0xffff` = `-uVar6 & 0xffff` and
      // drops the `* W` multiply. Affects zoom-0 remap bitmap blits for
      // sprites clipped above the viewport top (uVar6 sign-negative).
      uVar3 = ((((uVar7 & 0xffff) * (((((0) >>> 0) - uVar6) & 0xffff) >>> 0)) & 0xffff) >>> 0);
      _srcYOff = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar6 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6) >>> 0)) >>> 0);
      _dstYOff = uVar3 >>> 0;  // β2: full 32-bit y-offset (was truncated)
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      // HAND-FIX (β2, u16-as-u32): sprite WIDTH is a 16-bit load; reading the
      // full WH dword underflowed ROW_STRIDE, collapsing bitmap sprites. Same
      // as 9b438b.js. Verified vs the interpreter.
      heap.setU32(0x009a2030, ((heap.i16((unaff_EDI + 8)) - (heap.u32(0x009a2014) & 0xffff)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      // HAND-FIX (β2, COL_SKIP_B clobber): binary writes COL_SKIP_B as a
      // 16-bit word; setU32 overwrote the adjacent ROW_STRIDE (0x9a2030) with
      // 0 right after it was set, collapsing bitmap sprites into streaks.
      heap.setU16(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) << 16 >> 16);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU16(0x009a202e, (-sVar4) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar4) >>> 0);
        _srcXSkip = (-((sVar4 << 16) >> 16)) & 0xffff;
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU16(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar5) >>> 0);
      }
      const _dpiPtr = (heap.u32(unaff_EDI) + _dstYOff + (sVar4 & 0xffff)) >>> 0;
      const _srcOff = ((_srcYOff - _srcXSkip) | 0) & 0xffffffff;
      const _srcPtr = (heap.u32(0x009a2010) + _srcOff) >>> 0;
      const _setupRegs = () => {
        regs.ebp = (heap.i16(0x009a2030)) >>> 0;
        regs.edx = (heap.i16(0x009a202e)) >>> 0;
        regs.eax = ((heap.u8(0x009a202c) << 8) & 0xff00) >>> 0;
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.edi = _dpiPtr;
      };
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs();
        regs.esi = (0x009a2032 + _srcOff) >>> 0;
        uVar7 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar7;
      }
      _setupRegs();
      regs.esi = _srcPtr;
      uVar3 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar7;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) >> 1) & 0xffff);
    // HAND-FIX (painter-noise root cause, same pattern as 9b8491): advance
    // EBX to sub-sprite handle from class[+2], then halve CX/DX. These are
    // dropped by Ghidra C decompile (pure register dataflow). Without them
    // the recursion (calling itself) never advances past the original sprite
    // and the zoom field underflows unboundedly.
    regs.ebx = heap.u16(iVar8 + 0x008dc0c2) >>> 0;
    regs.ecx = ((((regs.ecx << 16) >> 16) >> 1)) & 0xffff;
    regs.edx = ((((regs.edx << 16) >> 16) >> 1)) & 0xffff;
    uVar7 = (((regs.eax = FUN_009b4457_frozen(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU16(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar3) << 16 >> 16)) >>> 0);
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write — path C, calls 9b6863):
    // mirror 9b438b.js path-C fix.
    let _dstYOff_C = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar6) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * (((((uVar6 >>> 1)) << 16 >> 16)) | 0)) >>> 0);
      _dstYOff_C = uVar3 & 0xffff;
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-((sVar4) | 0)) >>> 0);
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
        const _dstXOff_C = ((sVar4 & 0xffff) >>> 1);
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.esi = heap.u32(0x009a2010) >>> 0;
        regs.ebp = unaff_EDI >>> 0;
        regs.edi = (heap.u32(unaff_EDI) + _dstYOff_C + _dstXOff_C) >>> 0;
        uVar3 = (((regs.eax = FUN_009b6863(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        uVar7 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  // HAND-FIX (painter-noise / blitter-wild-write — path D, calls 9b64ea):
  // mirror 9b438b.js path-D fix.
  let _srcInterlace_D = 0;
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
    _srcInterlace_D = heap.u32(0x009a2014) & 0xffff;
  }
  uVar3 = ((CONCAT22(sVar4, sVar2)) >>> 0);
  if (sVar2 != 0) {
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    let _dstYOff_D = 0;
    let _srcYOff_D = 0;
    let _srcXSkip_D = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      // Phase S+E-prep: JS operator-precedence fix. C source 9b4457.c:280
      // mirrors line 101 for the zoom-1 remap bitmap path. Same bug class:
      // `(W & 0xffff) * (0 >>> 0) - uVar6 & 0xffff` parses in JS as
      // `(W*0) - (uVar6 & 0xffff)`, missing the `* W` multiply. C intends
      // `((W & 0xffff) * ((-uVar6) & 0xffff)) & 0xffff`.
      uVar3 = ((((uVar7 & 0xffff) * (((((0) >>> 0) - uVar6) & 0xffff) >>> 0)) & 0xffff) >>> 0);
      _srcYOff_D = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar6 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = (((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6 >>> 1) >>> 0)) >>> 0);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
      _dstYOff_D = uVar3 & 0xffff;
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU16(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU16(0x009a202e, (-sVar4) >>> 0);
        _srcXSkip_D = (-((sVar4 << 16) >> 16)) & 0xffff;
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU16(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      const _dstXOff_D = ((sVar4 & 0xffff) >>> 1);
      const _dpiPtr_D = (heap.u32(unaff_EDI) + _dstYOff_D + _dstXOff_D) >>> 0;
      const _srcOff_D = ((_srcInterlace_D + _srcYOff_D - _srcXSkip_D) | 0) & 0xffffffff;
      const _srcPtr_D = (heap.u32(0x009a2010) + _srcOff_D) >>> 0;
      const _setupRegs_D = () => {
        regs.ebp = (heap.i16(0x009a2030)) >>> 0;
        regs.edx = (heap.i16(0x009a202e)) >>> 0;
        regs.eax = ((heap.u8(0x009a202c) << 8) & 0xff00) >>> 0;
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.edi = _dpiPtr_D;
      };
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs_D();
        regs.esi = (0x009a2032 + _srcOff_D) >>> 0;
        uVar7 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar7;
      }
      _setupRegs_D();
      regs.esi = _srcPtr_D;
      uVar3 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}

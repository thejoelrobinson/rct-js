// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x5d7503 is an UNLABELED binary
// function (it sits past FUN_005d74b4's body; the family runs to ~0x5d849e).
// Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x5d7503 0x5d7b1f   (dispatcher + shape-37 paths)
//
// FUN_005d7503 — the VEHICLE sprite painter (sprite-type 0 entry of the
// 4-entry paint dispatch table at DATASEG 0x6309a0: {0x5d7503 vehicle,
// 0x439178 peep, 0x42d69f, 0x42e001}). Reached ONLY indirectly: FUN_00444820
// (the per-tile sprite-chain walker, @manual JS, live) does
//   callIndirect(heap, heap.u32(0x006309a0 + spriteType*4))
// per visible sprite. Entry contract (set up at 0x4448c0..0x4448e3):
//   ESI = sprite descriptor ptr        EBX = ((rot<<3) + [esi+0x1e]) & 0x1f
//   AX  = [esi+0x0e] (x)  CX = [esi+0x10] (y)  DX = [esi+0x12] (z)
//   EBP = sprite type (0)
//
// Body: push esi; if word[esi+0xc] has flag 0x80 → 0x5d8453 (NOT transcribed,
// throws). Else shr ebx,1 and dispatch on the vehicle SHAPE byte [esi+0x31]
// through the 64-entry jump table at DATASEG 0x65da40:
//   0x5d751d = generic vehicle handler (57 of 64 indices — transcribed here)
//   0x5d78fe = pop esi; ret            (indices 47-54,58,59,61,62 — trivial)
//   0x5d7dc5 (idx 7), 0x5d80c4 (31), 0x5d8347 (34), 0x5d7b1f (44),
//   0x5d77a6 (63) — special shapes, NOT transcribed (throw; the orchestrator
//   keeps the interpreter shim as a wired fallback for those).
// The generic handler branches on [esi+0x1f] (animation/track mode) and
// [esi+0x20] (crash/boat sub-state) to remap the direction index EBX into a
// row of the per-shape sprite-group table [0x65eb30 + shape*4] (8-byte rows:
// word image-base, i8 xoff, i8 yoff, i8 zoff, i8 bboxZ?, i8 bboxXY?, u8 imgFlags),
// adds the animation-frame byte [esi+0x4a] (16-bit add w/ carry bl→bh) and,
// if the per-shape flags word [0x5f7104 + shape*8] has bit 0x80, the extra
// frame byte [esi+0xc5]; ORs the body/trim colour remap ([esi+0x32]<<17 |
// [esi+0x33]<<24 | 0xa0000000) and calls the camera-rotation painter
// [0x432204 + rot*4] (bridged with callIndirect, same as 439178/444820).
// A b5-variant at 0x5d7900 ([esi+0xb5] >= 0x40, ebx%4==0: swinging/rocking
// cars) replaces the image word with a lookup in the 3-entry sub-row at
// row-0x18 + (ebx>>2)*6 indexed by ([esi+0xb5]-0x40)>>6, and SKIPS the
// [esi+0x4a] frame add (jmp 0x5d7598 lands past it).
// Then, at zoom < 2 with riders ([esi+0xb3] != 0) and a nonzero rider-image
// increment word [table-0x1a], up to 4 extra rider-overlay paint calls via
// the SECOND painter table [0x432e90 + rot*4], with rider tshirt colours from
// [esi+0x92..0x99], gated by [esi+0xb3] > 2/4/6; section 1 additionally
// applies the 0x100-flag stacked-rider offset ([table-0x20] + (c5-1)*
// [table-0x1e], 16-bit on bx, INSIDE the push/pop so it does not accumulate).
// Finally a second per-shape jump table at 0x65db34 picks the exit: shape 37
// (and most) → 0x5d78fe pop esi; ret. Tails 0x5d77a6/0x5d783c/0x5d78a4
// (shapes 2,20,44,45) are NOT transcribed (throw).
//
// Soak coverage (TICKS=8 gameplay soak, probe on [esi+0x31]): only shape 37
// is hit (96 crossings), flag-0x80 never set, [esi+0x20] always 0, with
// [esi+0x1f] in {0,1,2,6} and [esi+0xb5] in {0,0xff} — i.e. the main path,
// the b5>=0x40 variant, and the 0x5d7a0a al<9 frame remap.
//
// Register-exactness notes (validated vs interp via tools/_lockstep-auto.mjs):
//   - eax upper bits at the record load depend on the branch taken: the
//     0x5d7973 path does a full movzx eax,[esi+0x20] overwrite (and the
//     default sub-path leaves eax=(b20-5)<<2); the 0x5d7a0a paths zero the
//     upper bits via and eax,7/0xf/0xff after 8-bit subs; all other paths
//     only touch al. Tracked exactly in the `eax` local.
//   - exit eax = (eax & 0xffff0000) | (row byte7 << 8) | low byte of
//     (sext(row byte4) + dx): movsx ax / add ax,dx / mov ah are 16-bit and
//     8-bit partial writes, and the paint-call push/pop pairs restore it.
//   - add bl,imm8 / adc bh,0 is a 16-bit add whose carry stops at bh (never
//     touches the upper half of ebx).
//   - mov si,di / shr edi,16 at each paint call: esi keeps the sprite ptr's
//     upper half; edi becomes the zero-extended high half of the packed
//     (sext(byte5)<<16 | sext(byte6)) bbox pair.
//   - ecx and ebp are NOT saved across the paint calls (only eax/ebx/edx/
//     edi/esi are pushed) — the callee's exit ecx/ebp leak through, which
//     callIndirect reproduces naturally; the early-exit paths that load
//     ebp = dpi [0x981ef8] or ebp = shape table ptr are set explicitly.
//   - the exit stub 0x5d779b does movzx edi,[esi+0x31] → exit edi = shape.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

// Pre-flight guard for the wiring (runtime/painter-bridge.js): TRUE iff the
// JS body can run this sprite without hitting an untranscribed throw path.
// Reads exactly the dispatch state the body reads — the [esi+0xc] 0x80 flag,
// the shape byte, and BOTH jump tables (entry 0x65da40 + tail 0x65db34) —
// with no side effects, so the caller can route unhandled sprites to the
// interpreter shim from the START. The guard must run BEFORE the body: the
// unhandled-TAIL throw at 0x5d779b fires only after the paint calls have
// already landed, so a catch-and-rerun fallback would paint the sprite twice.
export function js5d7503CanHandle(heap, sprite) {
  if ((heap.u16((sprite + 0xc) >>> 0) & 0x80) !== 0) return false; // 0x5d8453
  const shape = heap.u8((sprite + 0x31) >>> 0);
  const t1 = heap.u32((0x0065da40 + shape * 4) >>> 0) >>> 0;
  if (t1 === 0x5d78fe) return true;   // trivial pop esi; ret — body handles
  if (t1 !== 0x5d751d) return false;  // special shapes (idx 7/31/34/44/63)
  // generic body, but shapes 2/20/44/45 exit through untranscribed tails
  return (heap.u32((0x0065db34 + shape * 4) >>> 0) >>> 0) === 0x5d78fe;
}

// add bl, v8 ; adc bh, 0  — 16-bit add with the carry stopping at bh.
function addBlAdcBh(ebx, v8) {
  const s = (ebx & 0xff) + v8;
  const bh = (((ebx >>> 8) & 0xff) + (s > 0xff ? 1 : 0)) & 0xff;
  return ((ebx & 0xffff0000) | (bh << 8) | (s & 0xff)) >>> 0;
}

export function FUN_005d7503(heap) {
  const sprite = regs.esi >>> 0;                       // 0x5d7503: push esi
  const savedEdx = regs.edx >>> 0;                     // edx is push/pop'd around every call
  // 0x5d7504: test word [esi+0xc], 0x80 ; jne 0x5d8453
  if ((heap.u16((sprite + 0xc) >>> 0) & 0x80) !== 0) {
    throw new Error("5d7503: unhandled flag-0x80 path 0x5d8453");
  }
  // 0x5d7510: movzx edi,[esi+0x31] ; shr ebx,1 ; jmp [edi*4 + 0x65da40]
  const shape0 = heap.u8((sprite + 0x31) >>> 0);
  let ebx = (regs.ebx >>> 1) >>> 0;
  const target = heap.u32((0x0065da40 + shape0 * 4) >>> 0) >>> 0;
  if (target === 0x5d78fe) {                           // pop esi; ret (no-op shapes)
    regs.edi = shape0;
    regs.ebx = ebx;
    return;
  }
  if (target !== 0x5d751d) {
    throw new Error(`5d7503: unhandled shape index ${shape0} -> 0x${target.toString(16)}`);
  }

  // ---- 0x5d751d: generic vehicle handler ----
  let eax = ((regs.eax & 0xffffff00) | heap.u8((sprite + 0x1f) >>> 0)) >>> 0; // mov al,[esi+0x1f]
  const al = eax & 0xff;
  const b20 = heap.u8((sprite + 0x20) >>> 0);
  let viaB5 = false;                                   // took the 0x5d7900 special block

  if ((al >= 0x2c && al <= 0x31) || al === 0) {
    // 0x5d7530
    if (b20 !== 0) {
      // ---- 0x5d7973: crash/boat-substate remap (full movzx eax overwrite) ----
      eax = b20 >>> 0;                                 // movzx eax,[esi+0x20]
      if (b20 === 1) {                                 // 0x5d79ae
        ebx = (ebx & 3) !== 0 ? ((ebx >>> 2) + 0x17c) >>> 0
                              : ((ebx >>> 2) + 0x50) >>> 0;
      } else if (b20 === 3) {                          // 0x5d79cf
        ebx = (ebx & 3) !== 0 ? ((ebx >>> 2) + 0x180) >>> 0
                              : ((ebx >>> 2) + 0x54) >>> 0;
      } else if (b20 === 2) {                          // add ebx,0x30 ; je
        ebx = (ebx + 0x30) >>> 0;
      } else if (b20 === 4) {                          // +0x30 +0x10 ; je
        ebx = (ebx + 0x40) >>> 0;
      } else {
        // +0x30 +0x10 -0x40 net 0 ; shr 2 ; +0xbc ; eax=(b20-5)<<2 ; add
        eax = (((b20 - 5) >>> 0) << 2) >>> 0;          // sub eax,5 ; shl eax,2
        ebx = (((ebx >>> 2) + 0xbc + eax) >>> 0);
      }
    } else if (heap.u8((sprite + 0xb5) >>> 0) >= 0x40) {
      // 0x5d7900: test ebx,3 ; jne 0x5d7547 (normal) ; else special block
      if ((ebx & 3) === 0) viaB5 = true;
    }
  } else {
    // ---- 0x5d79f0: al != 0 and not in 0x2c..0x31 ----
    if (b20 !== 0) {
      // 0x5d7ada
      if ((ebx & 3) === 0) {
        ebx = ((ebx >>> 2) + 0x58) >>> 0;
        if (heap.u8((sprite + 0x1f) >>> 0) !== 1) ebx = (ebx + 8) >>> 0;
        if (heap.u8((sprite + 0x20) >>> 0) !== 1) ebx = (ebx + 4) >>> 0;
      } else {
        ebx = ((ebx >>> 2) + 0x16c) >>> 0;
        if (heap.u8((sprite + 0x1f) >>> 0) !== 0x32) ebx = (ebx + 8) >>> 0;
        if (heap.u8((sprite + 0x20) >>> 0) !== 1) ebx = (ebx + 4) >>> 0;
      }
    } else if (al >= 0x32) {
      // 0x5d7a56 (all 8-bit ops on al; upper eax preserved)
      ebx = ebx >>> 2;
      let a = (al - 0x32) & 0xff;
      if (a >= 5) a = (a + 1) & 0xff;                  // cmp al,5 ; jb ; inc al
      if (a >= 2) a = (a + 1) & 0xff;                  // cmp al,2 ; jb ; inc al
      a = (a << 2) & 0xff;                             // shl al,2 (8-bit)
      eax = ((eax & 0xffffff00) | a) >>> 0;
      ebx = ((ebx & 0xffffff00) | ((ebx + a) & 0xff)) >>> 0; // add bl,al (no carry)
      ebx = (ebx + 0x14c) >>> 0;
    } else if ((ebx & 3) === 0) {
      // 0x5d7a0a (each sub-path masks the FULL eax after an 8-bit sub)
      ebx = ebx >>> 2;
      const a = heap.u8((sprite + 0x1f) >>> 0);        // mov al,[esi+0x1f] reload
      if (a < 9) {
        ebx = (ebx << 3) >>> 0;                        // shl ebx,3
        eax = ((a - 1) & 0xff) & 7;                    // dec al ; and eax,7
        ebx = ((ebx | eax) + 0x10) >>> 0;
      } else if (a < 0x18) {
        eax = ((((a - 9) & 0xff) & 0xf) << 2) >>> 0;   // sub al,9 ; and eax,0xf ; shl 2
        ebx = ((ebx | eax) + 0x80) >>> 0;
      } else {
        eax = (((a - 0x18) & 0xff) << 2) >>> 0;        // sub al,0x18 ; and eax,0xff ; shl 2
        ebx = ((ebx | eax) + 0xe4) >>> 0;
      }
    } else {
      // 0x5d7a93 (mov al reload; table lookups use the UNSHIFTED ebx)
      const a = heap.u8((sprite + 0x1f) >>> 0);
      eax = ((eax & 0xffffff00) | a) >>> 0;
      if (a === 3)      ebx = ((ebx >>> 2) + 0x154) >>> 0;             // 0x5d7a77
      else if (a === 7) ebx = ((ebx >>> 2) + 0x164) >>> 0;             // 0x5d7a85
      else if (a === 2) ebx = heap.u32((0x0065dd50 + ebx * 4) >>> 0) >>> 0;
      else if (a === 6) ebx = heap.u32((0x0065dd90 + ebx * 4) >>> 0) >>> 0;
      else if (a === 4) ebx = heap.u32((0x0065ddd0 + ebx * 4) >>> 0) >>> 0;
      else              ebx = heap.u32((0x0065de10 + ebx * 4) >>> 0) >>> 0;
    }
  }

  // ---- 0x5d7547 / 0x5d7910: sprite-group record load ----
  const shape = heap.u8((sprite + 0x31) >>> 0);        // movzx (edi|ebp),[esi+0x31]
  const tbl = heap.u32((0x0065eb30 + shape * 4) >>> 0) >>> 0;
  const rec = (tbl + ebx * 8) >>> 0;
  heap.setU16(0x0099a4e8, heap.i8((rec + 2) >>> 0) & 0xffff); // movsx ax ; store
  heap.setU16(0x0099a4ea, heap.i8((rec + 3) >>> 0) & 0xffff); // movsx cx ; store
  const zword = (heap.i8((rec + 4) >>> 0) + (savedEdx & 0xffff)) & 0xffff; // movsx ax ; add ax,dx
  heap.setU16(0x0099a4ec, zword);
  // movsx di,byte5 ; shl edi,16 ; movsx di,byte6 (edi upper was 0 from movzx shape)
  const edi = ((((heap.i8((rec + 5) >>> 0) & 0xffff) << 16) >>> 0)
             | (heap.i8((rec + 6) >>> 0) & 0xffff)) >>> 0;
  eax = ((eax & 0xffff0000) | (heap.u8((rec + 7) >>> 0) << 8) | (zword & 0xff)) >>> 0; // mov ah,byte7

  if (!viaB5) {
    // 0x5d758d: mov bx,[rec] ; 0x5d7592: add bl,[esi+0x4a] ; adc bh,0
    ebx = ((ebx & 0xffff0000) | heap.u16(rec)) >>> 0;
    ebx = addBlAdcBh(ebx, heap.u8((sprite + 0x4a) >>> 0));
  } else {
    // 0x5d7952: shr ebx,2 ; imul ebx,ebx,6 ; lea ebp,[ebx+ebp-0x18]
    const rowBase = (((ebx >>> 2) * 6) + tbl - 0x18) >>> 0;
    // movzx ebx,[esi+0xb5] ; sub ebx,0x40 ; shr ebx,6 ; mov bx,[ebp+ebx*2]
    let t = ((heap.u8((sprite + 0xb5) >>> 0) - 0x40) >>> 0) >>> 6;
    ebx = ((t & 0xffff0000) | heap.u16((rowBase + t * 2) >>> 0)) >>> 0;
    // jmp 0x5d7598 — SKIPS the [esi+0x4a] frame add
  }
  // 0x5d7598: movzx ecx,[esi+0x31] ; test word [ecx*8+0x5f7104],0x80
  if ((heap.u16((0x005f7104 + shape * 8) >>> 0) & 0x80) !== 0) {
    ebx = addBlAdcBh(ebx, heap.u8((sprite + 0xc5) >>> 0)); // add bl,[esi+0xc5] ; adc bh,0
  }

  // ---- 0x5d75b1: push eax/ebx/edx/edi/esi ; body paint call [0x432204+rot*4] ----
  const savedEax = eax, savedEbx = ebx, savedEdi = edi;
  {
    const cxr = (heap.u8((sprite + 0x32) >>> 0) << 17) >>> 0;   // movzx ecx ; shl 17
    const remap = (cxr | ((heap.u8((sprite + 0x33) >>> 0) << 24) >>> 0) | 0xa0000000) >>> 0;
    regs.eax = (savedEax & 0xffffff00) >>> 0;          // xor al,al
    regs.ecx = cxr;                                    // xor cl,cl (bit0-16 already 0)
    regs.ebx = (savedEbx | remap) >>> 0;               // or ebx,ebp
    regs.esi = ((sprite & 0xffff0000) | (savedEdi & 0xffff)) >>> 0; // mov si,di
    regs.edi = savedEdi >>> 16;                        // shr edi,0x10
    regs.edx = savedEdx;
    const rot = heap.u32(0x00991f88) >>> 0;
    regs.ebp = rot;                                    // mov ebp,[0x991f88]
    callIndirect(heap, heap.u32((0x00432204 + rot * 4) >>> 0));
  }
  // pops (esi/edi/edx/ebx/eax); ecx and ebp keep the callee's exit values
  regs.esi = sprite; regs.edi = savedEdi; regs.edx = savedEdx;
  regs.ebx = savedEbx; regs.eax = savedEax;

  // ---- 0x5d75ea: rider-overlay sections (zoom < 2, [esi+0xb3] != 0) ----
  let ebxAcc = savedEbx;                               // accumulates the -0x1a increments
  tail: {
    const dpi = heap.u32(0x00981ef8) >>> 0;            // mov ebp,[0x981ef8]
    if (heap.u16((dpi + 0xe) >>> 0) >= 2) { regs.ebp = dpi; break tail; }
    if (heap.u8((sprite + 0xb3) >>> 0) === 0) { regs.ebp = dpi; break tail; }
    const tbl2 = heap.u32((0x0065eb30 + heap.u8((sprite + 0x31) >>> 0) * 4) >>> 0) >>> 0;
    const inc = heap.u16((tbl2 - 0x1a) >>> 0);         // movzx ecx,word [ebp-0x1a]
    if (inc === 0) { regs.ebp = tbl2; regs.ecx = 0; break tail; }
    ebxAcc = (ebxAcc + inc) >>> 0;                     // add ebx,ecx (full 32-bit)

    // section 1 (colours [esi+0x92]/[esi+0x93]); bx tweaks are INSIDE push/pop
    let ebxCall = ebxAcc;
    // 0x5d762a: test word [shape*8+0x5f7104],0x100 ; movzx ecx,[esi+0xc5] ; jz
    if ((heap.u16((0x005f7104 + heap.u8((sprite + 0x31) >>> 0) * 8) >>> 0) & 0x100) !== 0) {
      const c5 = heap.u8((sprite + 0xc5) >>> 0);
      if (c5 !== 0) {
        let bx = ((ebxCall & 0xffff) + heap.u16((tbl2 - 0x20) >>> 0)) & 0xffff; // add bx,[ebp-0x20]
        const cx = (((c5 - 1) & 0xffff) * heap.u16((tbl2 - 0x1e) >>> 0)) & 0xffff; // dec ecx ; imul cx,[ebp-0x1e]
        bx = (bx + cx) & 0xffff;                       // add bx,cx
        ebxCall = ((ebxCall & 0xffff0000) | bx) >>> 0;
      }
    }
    riderCall(heap, sprite, savedEax, savedEdx, savedEdi, ebxCall, 0x92);
    regs.esi = sprite; regs.edi = savedEdi; regs.edx = savedEdx;
    regs.ebx = ebxAcc; regs.eax = savedEax;

    // sections 2..4 (colours 0x94/0x96/0x98), gated on [esi+0xb3] > 2/4/6
    for (const [gate, coff] of [[2, 0x94], [4, 0x96], [6, 0x98]]) {
      if (heap.u8((sprite + 0xb3) >>> 0) <= gate) break tail; // jbe 0x5d779b (ebp = callee exit)
      const tblS = heap.u32((0x0065eb30 + heap.u8((sprite + 0x31) >>> 0) * 4) >>> 0) >>> 0;
      ebxAcc = (ebxAcc + heap.u16((tblS - 0x1a) >>> 0)) >>> 0; // add ebx,[ebp-0x1a]
      riderCall(heap, sprite, savedEax, savedEdx, savedEdi, ebxAcc, coff);
      regs.esi = sprite; regs.edi = savedEdi; regs.edx = savedEdx;
      regs.ebx = ebxAcc; regs.eax = savedEax;
    }
  }

  // ---- 0x5d779b: movzx edi,[esi+0x31] ; jmp [edi*4 + 0x65db34] ----
  const shapeT = heap.u8((sprite + 0x31) >>> 0);
  regs.edi = shapeT;
  const t2 = heap.u32((0x0065db34 + shapeT * 4) >>> 0) >>> 0;
  if (t2 !== 0x5d78fe) {
    throw new Error(`5d7503: unhandled tail for shape ${shapeT} -> 0x${t2.toString(16)}`);
  }
  // 0x5d78fe: pop esi ; ret
  regs.esi = sprite;
  regs.eax = savedEax;
  regs.ebx = ebxAcc;
  regs.edx = savedEdx;
}

// One rider-overlay paint call: push regs are handled by the caller re-setting
// them after we return; here we build the call register file exactly as
// 0x5d764e../0x5d76ab../0x5d7708../0x5d7761.. do and bridge [0x432e90+rot*4].
function riderCall(heap, sprite, savedEax, savedEdx, savedEdi, ebxCall, colourOff) {
  const cxr = (heap.u8((sprite + colourOff) >>> 0) << 17) >>> 0;      // movzx ecx ; shl 17
  const remap = (cxr | ((heap.u8((sprite + colourOff + 1) >>> 0) << 24) >>> 0) | 0xa0000000) >>> 0;
  regs.eax = (savedEax & 0xffffff00) >>> 0;            // xor al,al
  regs.ecx = cxr;                                      // xor cl,cl (already 0)
  regs.ebx = (ebxCall | remap) >>> 0;                  // or ebx,ebp
  regs.esi = ((sprite & 0xffff0000) | (savedEdi & 0xffff)) >>> 0;     // mov si,di
  regs.edi = savedEdi >>> 16;                          // shr edi,0x10
  regs.edx = savedEdx;
  const rot = heap.u32(0x00991f88) >>> 0;
  regs.ebp = rot;                                      // mov ebp,[0x991f88]
  callIndirect(heap, heap.u32((0x00432e90 + rot * 4) >>> 0));
}

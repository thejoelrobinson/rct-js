// @manual — do not regenerate.
//
// FUN_005dbeeb — vehicle mode-flag query, the load-bearing callee of 0x5da274
// (returns the mode flags in eax that drive 5da274's 0x300/0x40/0x80/0x20/0x10/8
// dispatch). Reached via callNative(0x5dbeeb) from the JS 5da274 body ->
// runFunction -> the eip hook in painter-bridge.js.
//
// SHAPE (capstone reachability walk from 0x5dbeeb): 914 reachable instructions,
// SINGLE exit (ret 0x5dcd3f), 167 conditional branches, internal subroutines
// (call 0x5dc770 / 0x5dc983 / 0x5dca69 / 0x5dca6e within its own span), and
// external callees 0x5d9220 / 0x452fce / 0x5cfac7 / 0x5cfc50 / 0x5e53ca /
// 0x5df40c / 0x5dcd40 / 0x444927 / 0x4364c2 / 0x5d849e / 0x5d8623 / 0x5d870c.
// The function does NOT use the entry dl/dh (it reloads dx from [esi+0x3c] at
// 0x5dc1a8); it is type-gated via the per-type flag word [type*8 + 0x5f7104].
//
// COVERAGE — IMPORTANT (corrected ADDENDUM 20): the function body is NOT
// type-specific. It is one code path PARAMETERISED by the per-type flag word
// (f = u16[type*8 + 0x5f7104]) and the sprite fields; the "type-55 arm" framing
// in ADDENDUM 17 was about which *instructions* a type-55 sprite would cover.
// In THIS environment sc21.sc4 produces ONLY type 37 crossing 0x5dbeeb (never
// type 55 — game state is environment-sensitive, cf. ADDENDUM 18). So the
// type===55 gate was dead code here and the lockstep "memMis=0" was VACUOUS
// (armType55 never ran). Opening the gate to type 37 makes the transcription
// actually execute (72 calls/8 ticks) AND byte-exact: memMis=0, with the
// jl-0x5dca73 branch (33×) and the cx-dispatch fall-through (39×, cx in
// {0xa,0,0x3,0x1,0xf}) both genuinely exercised.
//
// HYBRID: armType55() runs a byte-exact JS prefix, then RETURNS a checkpoint
// EIP; the painter-bridge hook continues the real bytes in the interpreter from
// there (no re-run from 0x5dbeeb, so no double-fire of the JS-side stores).
// Current checkpoints: 0x5dc60d / 0x5dca73 (early branch exits), 0x5dc3b6 (the
// dominant type-37 jb arm, after the image-table lookup) and 0x5dc1a8 (the
// cx-rotate fall-through). false return = full fallback.
// Gated by __enable5dbeeb (oracle-only); production uses FUN_005dbeeb in
// 5dbeeb.js via _dispatch and is untouched.
//
// Oracle: tools/_lockstep-5dbeeb.mjs (per-call JS-vs-interp whole-heap + eax).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const F7104 = 0x005f7104;   // word[] per-vehicle-type flag table (idx = type*8)
const DC28 = 0x0065dc28, DC2C = 0x0065dc2c, DC30 = 0x0065dc30, DC34 = 0x0065dc34;
const DC38 = 0x0065dc38, DC40 = 0x0065dc40, DC48 = 0x0065dc48, DC4C = 0x0065dc4c;
const DC70 = 0x0065dc70, E6B7 = 0x0065e6b7, A74A0 = 0x008874a0;
// per-ride record fields (idx = ride_record_id * 0x260): +0x20 = type byte,
// +0x22 = status word, +0x13c/+0x13d = sub-status bytes; +0x5f5b7f = type LUT.
const A7420 = 0x00887420, A7422 = 0x00887422, A755C = 0x0088755c, A755D = 0x0088755d;
const S5B7F = 0x005f5b7f;
const AF10 = 0x0067af10, EF4 = 0x00971ef4;  // pointer tables: [0xcd]→base, [rotated]→entry
const DC4A = 0x0065dc4a, DC50 = 0x0065dc50, S5D02 = 0x005f5d02;  // 0x5dc450 delta block
const S59D8 = 0x006559d8;  // 0x5dca73 jl arm: subtype flag table (idx = subtype<<4)

const s8 = (v) => (v << 24) >> 24;
const s16 = (v) => (v << 16) >> 16;
const s32 = (v) => v | 0;

// Whole-function entry. Returns true if fully handled in JS; false to fall back
// to the interpreter (the hook re-runs the real bytes from 0x5dbeeb).
export function FUN_005dbeeb_js(heap) {
  const esi = regs.esi >>> 0;
  const type = heap.u8(esi + 0x31);
  // Gate = the types whose transcribed prefix is validated byte-exact by the
  // oracle. type 37 is the ACTUALLY-EXERCISED type here (memMis=0 over 72 calls);
  // type 55 is kept (transcribed, but never appears in this env so untestable).
  // The body is type-generic — adding a type just widens which sprites use the
  // JS prefix; all reach a checkpoint and hand the suffix to the interpreter.
  // __enable5dbeeb keeps this oracle-only; production falls back. Other types
  // fall back. Oracle: _lockstep-5dbeeb.mjs.
  if ((type !== 55 && type !== 37) || !globalThis.__enable5dbeeb) return false;
  return armType55(heap, esi, type);
}

// === Vehicle mode-flag update — hybrid JS-prefix (transcribed 0x5dbeeb..0x5dc16a)
// Instruction-by-instruction from the capstone disasm. Active for the gated types
// when __enable5dbeeb is set (oracle path); returns a checkpoint EIP to hand the
// untranscribed suffix to the interpreter. Validated byte-exact (memMis=0) on the
// type-37 path. Name kept as armType55 for continuity with ADDENDUM 17 notes.
function armType55(heap, esi, type) {
  const edi = type;                                          // 0x5dbeeb movzx edi,[esi+0x31]
  heap.setU32(DC2C, esi);                                    // 0x5dbeef mov [0x65dc2c],esi
  heap.setU32(DC40, 0);                                      // 0x5dbef5 mov [0x65dc40],0
  const f = heap.u16(F7104 + edi * 8);                       // per-type flag word
  let eax;

  // 0x5dbeff: test f,0x800 ; je 0x5dbf4d
  if (f & 0x800) {
    let bx = (heap.u16(esi + 0x36) >>> 2) & 0xffff;          // 0x5dbf0b/0f
    // 0x5dbf13 cmp bx,0x44; jb 0x5dbf1f ; 0x5dbf19 cmp bx,0x57; jb 0x5dbf4d
    if (!(bx < 0x44) && bx < 0x57) {
      // skip to 0x5dbf4d
    } else {
      // 0x5dbf1f: call 0x5d9220 -> ax
      regs.esi = esi;
      callNative(0x5d9220, []);
      const ax = regs.eax & 0xffff;
      const ebx = heap.u8(esi + 0x1f);                       // 0x5dbf24 movzx ebx,[esi+0x1f]
      // 0x5dbf28: cmp dword [ebx*4+0x65dc70],0 ; jl 0x5dbf3a
      let or40 = false;
      if (s32(heap.u32(DC70 + ebx * 4)) < 0) {
        if (!(s16(ax) > -0x23)) or40 = true;                 // 0x5dbf3a cmp ax,-0x23; jg 0x5dbf4d
      } else {
        if (!(s16(ax) > -0x46)) or40 = true;                 // 0x5dbf32 cmp ax,-0x46; jg 0x5dbf4d
      }
      // 0x5dbf40: cmp byte [esi+0x1f],8 ; je 0x5dbf4d
      if (or40 && heap.u8(esi + 0x1f) !== 8) {
        heap.setU32(DC40, (heap.u32(DC40) | 0x40) >>> 0);    // 0x5dbf46 or [0x65dc40],0x40
      }
    }
  }

  // 0x5dbf4d: test f,0x1000 ; je 0x5dbf82
  if (f & 0x1000) {
    const ebp = (heap.u8(esi + 0x30) * 0x260) >>> 0;         // 0x5dbf59/5d
    let v = heap.u8((ebp + A74A0) >>> 0) << 0x10;            // 0x5dbf63/6a movzx+shl 0x10
    if (heap.u8(E6B7) === 0) v = 0;                          // 0x5dbf6d/76
    heap.setU32(esi + 0x28, v >>> 0);                        // 0x5dbf78
    heap.setU32(esi + 0x2c, 0);                              // 0x5dbf7b
  }

  // 0x5dbf82: eax = [esi+0x2c] + [esi+0x28]
  eax = (heap.u32(esi + 0x2c) + heap.u32(esi + 0x28)) | 0;
  if (heap.u16(esi + 0x48) & 0x80) eax = 0;                  // 0x5dbf88 test [esi+0x48],0x80
  // 0x5dbf92: test [esi+0x48],0x400 ; je 0x5dbfc1
  if (heap.u16(esi + 0x48) & 0x400) {
    let d2 = s8(heap.u8(esi + 0xd2) - 1);                    // 0x5dbf9a dec byte [esi+0xd2]
    heap.setU8(esi + 0xd2, d2 & 0xff);
    if ((d2 & 0xff) === 0xba) heap.setU16(esi + 0x48, heap.u16(esi + 0x48) & 0xfbff); // 0x5dbfa0/a9
    if (!(s8(heap.u8(esi + 0xd2)) < 0)) {                    // 0x5dbfaf cmp [esi+0xd2],0; jl
      eax = 0;                                               // 0x5dbfb8
      heap.setU32(esi + 0x2c, 0);                            // 0x5dbfba
    }
  }
  heap.setU32(esi + 0x28, eax >>> 0);                        // 0x5dbfc1
  heap.setU32(DC30, eax >>> 0);                              // 0x5dbfc4
  heap.setU32(DC34, (Math.imul(eax >> 0xa, 0x2a)) | 0);     // 0x5dbfc9/cc/cf sar 0xa; imul 0x2a

  // 0x5dbfd4: cmp [0x65dc30],0 ; jge 0x5dbff5  — if the accumulate is negative,
  // walk the sprite chain via [esi+0x3e] (next-sprite index) to the head.
  if (s32(heap.u32(DC30)) < 0) {
    for (;;) {
      const ax = heap.u16(esi + 0x3e);                        // 0x5dbfdd mov ax,[esi+0x3e]
      if (s16(ax) === -1) break;                              // 0x5dbfe1 cmp ax,-1; je 0x5dbff5
      esi = (((ax & 0xffff) << 8) + 0x00743b94) >>> 0;        // 0x5dbfe7/ea/ed movzx/shl 8/add 0x743b94
    }                                                          // 0x5dbff3 jmp 0x5dbfdd
  }

  // 0x5dbff5: mov [0x65dc28],esi  — store the (possibly walked) sprite ptr.
  heap.setU32(DC28, esi >>> 0);
  // 0x5dbffb: movzx edi,[esi+0x31]  — edi reloaded = vehicle type. Note esi may
  // have been re-pointed by the chain walk above, but [esi+0x31] is still the
  // type byte of the walked sprite; mirror the binary by re-reading it here. (In
  // the no-walk path this equals `type`; reuse the flag word `f` for that type.)
  const ediR = heap.u8(esi + 0x31);
  const fR = (ediR === type) ? f : heap.u16(F7104 + ediR * 8);
  // 0x5dbfff: test fR,2    ; je 0x5dc010 ; 0x5dc00b call 0x5d870c
  // 0x5dc010: test fR,4    ; je 0x5dc021 ; 0x5dc01c call 0x5d8623
  // 0x5dc021: test fR,0x180; je 0x5dc032 ; 0x5dc02d call 0x5d849e
  // Each callee reads only esi on entry (verified: loads ax/al from [esi+..]
  // before any reg use), so delegating with esi+edi set is byte-exact. The
  // bodies still run in the interpreter via callNative — this push converts the
  // flag-dispatch shell, not the callee bodies, and advances the checkpoint.
  if (fR & 0x002) { regs.esi = esi >>> 0; regs.edi = ediR >>> 0; callNative(0x5d870c, []); }
  if (fR & 0x004) { regs.esi = esi >>> 0; regs.edi = ediR >>> 0; callNative(0x5d8623, []); }
  if (fR & 0x180) { regs.esi = esi >>> 0; regs.edi = ediR >>> 0; callNative(0x5d849e, []); }

  // 0x5dc032: movzx ebx,[esi+0x1f] ; 0x5dc036 mov eax,[ebx*4+0x65dc70]
  const ebx = heap.u8(esi + 0x1f);
  let eaxV = heap.u32(DC70 + ebx * 4);
  heap.setU32(DC38, 1);                                      // 0x5dc03d mov [0x65dc38],1
  heap.setU32(esi + 0x2c, eaxV >>> 0);                       // 0x5dc047 mov [esi+0x2c],eax
  // 0x5dc04a: eax=[0x65dc34] ; 0x5dc04f add eax,[esi+0x24] (32-bit wrap)
  eaxV = (heap.u32(DC34) + heap.u32(esi + 0x24)) | 0;
  heap.setU32(esi + 0x24, eaxV >>> 0);                       // 0x5dc052 mov [esi+0x24],eax

  // 0x5dc055: js 0x5dc60d  — eax negative. Target is a clean checkpoint (it
  // overwrites eax at 0x5dc615 before any read; only esi live).
  if (eaxV < 0) { regs.esi = esi >>> 0; return 0x005dc60d; }
  // 0x5dc05b: cmp eax,0x368a ; 0x5dc060 jl 0x5dca73 (signed; eax>=0 here).
  if (eaxV < 0x368a) {
    // === jl 0x5dca73 arm (33/72 type-37 calls). Body resolves to two esi-only
    // checkpoints: 0x5dcb60 (the common join) or 0x5dcb16 (the search-loop). ===
    // 0x5dca73/76/77/7d: [esi+0x2c] = trunc([esi+0x2c] / [DC38]) (signed idiv;
    // [DC38] is set to 1 at 0x5dc03d just before, so this is normally a no-op).
    const denom = s32(heap.u32(DC38));
    heap.setU32(esi + 0x2c, (Math.trunc(s32(heap.u32(esi + 0x2c)) / denom) | 0) >>> 0);
    // 0x5dca80/86: if [esi+0xcd]==2 -> 0x5dcb60
    if (heap.u8(esi + 0xcd) !== 2) {
      const sub = (heap.u16(esi + 0x36) >>> 2) & 0xffff;            // 0x5dca8f/93
      // 0x5dca9a/9d: test byte[(sub<<4)+0x6559d8],0x10 ; je 0x5dcb60
      if (heap.u8(((sub << 4) + S59D8) >>> 0) & 0x10) {
        heap.setU32(DC40, (heap.u32(DC40) | 8) >>> 0);              // 0x5dcaaa or [DC40],8
        // 0x5dcab1 cmp bx,1 jne 0x5dcb60 ; 0x5dcabb cmp esi,[DC2C] jne 0x5dcb60
        if (sub === 1 && heap.u32(DC2C) === (esi >>> 0)) {
          const ax2 = heap.u16(esi + 0x34);                        // 0x5dcac7
          if (s32(heap.u32(DC30)) < 0) {                           // 0x5dcacb jl 0x5dcb10
            // 0x5dcb10: cmp ax,0x16 ; ja 0x5dcb60 else fall to 0x5dcb16
            if (!(ax2 > 0x16)) { regs.esi = esi >>> 0; return 0x005dcb16; }
          } else {
            // 0x5dcad4..0x5dcb05: cx = 0x11, or 6 (flag 0x1000), or 0x14 (flag
            // 0x4000; minus 2 if [esi+0xcd]==6).
            const f2 = heap.u16(F7104 + heap.u8(esi + 0x31) * 8);
            let cxv = 0x11;
            if (f2 & 0x1000) cxv = 6;                              // 0x5dcae8
            if (f2 & 0x4000) { cxv = 0x14; if (heap.u8(esi + 0xcd) === 6) cxv -= 2; } // 0x5dcaf8/fc/05
            if (ax2 > cxv) { regs.esi = esi >>> 0; return 0x005dcb16; } // 0x5dcb09 ja 0x5dcb16
          }
        }
      }
    }
    // === 0x5dcb60 join (reached by the jl arm; the 0x5dcb16 search-loop path
    // still enters via the interpreter). Conditional [DC40]|=0x10, then walk the
    // sprite chain: loop back to 0x5dbffb for the next sprite, or fall to the
    // 0x5dcbad final-accumulation pass when the chain is exhausted. ===
    if (heap.u16(esi + 0x48) & 1) heap.setU32(DC40, (heap.u32(DC40) | 0x10) >>> 0); // 0x5dcb60/68
    if (s32(heap.u32(DC30)) >= 0) {                          // 0x5dcb6f jl 0x5dcb93
      const si = heap.u16(esi + 0x3e);                       // 0x5dcb78 mov si,[esi+0x3e]
      if (si !== 0xffff) {                                   // 0x5dcb7c cmp si,-1; je 0x5dcbad
        regs.esi = ((si << 8) + 0x00743b94) >>> 0;           // 0x5dcb82/85/88 next sprite
        return 0x005dbffb;                                    // 0x5dcb8e jmp 0x5dbffb (loop)
      }
    } else {                                                  // 0x5dcb93
      if (heap.u32(DC2C) !== (esi >>> 0)) {                  // 0x5dcb99 cmp esi,[DC2C]; je 0x5dcbad
        regs.esi = ((heap.u16(esi + 0x40) << 8) + 0x00743b94) >>> 0; // 0x5dcb9b/9f/a2
        return 0x005dbffb;                                    // 0x5dcba8 jmp 0x5dbffb (loop)
      }
    }
    // === 0x5dcbad final-accumulation pass: re-walk the chain from [DC2C]
    // accumulating count(ebx)/sum[esi+0x2c](eax)/sum[esi+0x46](ebp), then the
    // averaging math (two signed idivs) producing ecx. (The dx OR-accumulation
    // at 0x5dcbb7/bd is dead — cdq at 0x5dcbe0 overwrites edx before any read.) ===
    let sumEax = 0, sumBp = 0, count = 0, s = heap.u32(DC2C) >>> 0; // 0x5dcbad/b3/b5/ba
    for (;;) {                                                // loop top 0x5dcbbc
      count = (count + 1) | 0;                                // inc ebx
      sumBp = (sumBp + heap.u16(s + 0x46)) & 0xffff;          // 0x5dcbc1 add bp,[esi+0x46] (ebp hi stays 0)
      sumEax = (sumEax + heap.u32(s + 0x2c)) | 0;             // 0x5dcbc5 add eax,[esi+0x2c] (32-bit)
      const si = heap.u16(s + 0x3e);                          // 0x5dcbc8 mov si,[esi+0x3e]
      if (si === 0xffff) break;                               // 0x5dcbcc cmp si,-1; je 0x5dcbe0
      s = ((si << 8) + 0x00743b94) >>> 0;                     // 0x5dcbd2/d5/d8 next sprite
    }
    const esiF = heap.u32(DC2C) >>> 0;                        // 0x5dcbe1 mov esi,[DC2C] (first sprite)
    // 0x5dcbe0 cdq; 0x5dcbe7 idiv ebx; 0x5dcbe9 imul eax,0x15; 0x5dcbec sar eax,9
    let eax = (Math.imul(Math.trunc(sumEax / count) | 0, 0x15)) >> 9;
    let ecx = eax | 0;                                        // 0x5dcbef mov ecx,eax
    ecx = (ecx - (s32(heap.u32(esiF + 0x28)) >> 0xc)) | 0;    // 0x5dcbf1/f4/f7 eax=[esi+0x28];sar 0xc;sub ecx,eax
    // 0x5dcbf9..0x5dcc0a: edx=([esi+0x28]>>8)^2, sign-adjusted by [esi+0x28], >>4
    const e28 = s32(heap.u32(esiF + 0x28));                   // ebx=[esi+0x28] (sign test operand)
    let edx = Math.imul(e28 >> 8, e28 >> 8) | 0;              // sar edx,8 ; imul edx,edx
    if (e28 < 0) edx = (-edx) | 0;                            // or ebx,ebx; jns; neg edx
    edx = edx >> 4;                                           // sar edx,4
    // 0x5dcc0d eax=edx; cdq; 0x5dcc10 idiv ebp; 0x5dcc12 sub ecx,eax
    // (if sumBp==0 the binary #DEs; JS yields 0 — unreachable on the type-37 path,
    // confirmed by the oracle memMis=0 with sumBp the live divisor.)
    ecx = (ecx - (Math.trunc((edx | 0) / sumBp) | 0)) | 0;
    // 0x5dcc14 edx=type ; 0x5dcc18 test [type*8+0x5f7104],8 ; je 0x5dcd0c
    const ty = heap.u8(esiF + 0x31);
    if (heap.u16(F7104 + ty * 8) & 8) {
      // flag 8 set (NOT type 37 — unexercised, audit-verified): the big middle
      // (0x5dcc28..0x5dcd0a, more idivs + [esi+0xb6] clamping) is left to the
      // interpreter. Live-in: esi, ecx, AND ebp=sumBp (read at 0x5dcc65
      // `imul ebx,ebp`, never rewritten in the middle). edx=type is NOT needed
      // (overwritten by movzx edx,[esi+0xc3] at 0x5dcc78 before any read).
      regs.esi = esiF >>> 0; regs.ecx = ecx >>> 0; regs.ebp = sumBp >>> 0;
      return 0x005dcc28;
    }
    // CHECKPOINT 0x5dcd0c (flag 8 clear, the type-37 path) — esi + ecx live: the
    // 0x75-subtype tail (cmp bx,0x75 + [esi+0x34] range -> sub ecx,[esi+0x28]>>6),
    // the final [esi+0x2c]=ecx store, and the eax=[DC40]/ebx=[DC44] ret loads are
    // left to the interpreter.
    regs.esi = esiF >>> 0; regs.ecx = ecx >>> 0;
    return 0x005dcd0c;
  }

  // 0x5dc066: and word [esi+0xb8],0xfffd
  heap.setU16(esi + 0xb8, heap.u16(esi + 0xb8) & 0xfffd);
  heap.setU32(DC48, heap.u32(esi + 0xe) >>> 0);             // 0x5dc06e/75 eax=[esi+0xe]; [0x65dc48]=eax
  heap.setU16(DC4C, heap.u16(esi + 0x12));                  // 0x5dc071/7a cx=[esi+0x12]; [0x65dc4c]=cx
  // 0x5dc081: call 0x5e53ca — opens with pushal (preserves caller regs), reads
  // only esi. Delegate via the interpreter (byte-exact) with esi set.
  regs.esi = esi >>> 0;
  callNative(0x5e53ca, []);

  // === cx-dispatch 0x5dc086..0x5dc169 — self-contained (single entry, single
  // exit 0x5dc16a; all branches internal, no calls). cx = (u16[esi+0x36]>>2). ===
  const edi36 = heap.u16(esi + 0x36);          // 0x5dc086 movzx edi,[esi+0x36]
  const cx = (edi36 >>> 2) & 0xffff;           // 0x5dc08a/8d mov cx,di; shr cx,2

  // 0x5dc091: cmp cx,0x63 ; jne 0x5dc0dd
  if (cx === 0x63) {
    const r = (heap.u8(esi + 0x30) * 0x260) >>> 0;
    // 0x5dc0a1 test [r+0x887422],0x80 je 0x5dc0be ; 0x5dc0ac cmp [r+0x88755c],6 jne 0x5dc0be ;
    // 0x5dc0b5 cmp [r+0x88755d],4 jne 0x5dc0dd  — skip the BE block iff all three hold.
    const skip = (heap.u16((r + A7422) >>> 0) & 0x80) &&
                 heap.u8((r + A755C) >>> 0) === 6 &&
                 heap.u8((r + A755D) >>> 0) !== 4;
    if (!skip) {                               // 0x5dc0be:
      const e = (heap.u8(esi + 0xcf) << 0x10) >>> 0;
      if (s32(e) < s32(heap.u32(DC30))) {      // 0x5dc0ce jge 0x5dc0dd → only act if jl
        heap.setU32(esi + 0x2c, (((-(heap.u32(DC30) | 0)) << 4) | 0) >>> 0); // neg;shl 4
      }
    }
  }

  // 0x5dc0dd cmp cx,0 jne 0x5dc0f6 ; 0x5dc0f6 cmp cx,0x64 jne 0x5dc12d. Both arms
  // may reach the shared 0x5dc10e block; cx is one value so they're exclusive.
  let do10e = false;
  if (cx === 0) {
    const r = (heap.u8(esi + 0x30) * 0x260) >>> 0;
    if (heap.u8((r + A7420) >>> 0) === 0x2a) do10e = true; // 0x5dc0f4 je 0x5dc10e
  } else if (cx === 0x64) {
    const e = (heap.u8(esi + 0xcf) << 0x10) >>> 0;
    if (!(s32(e) <= s32(heap.u32(DC30)))) do10e = true;    // 0x5dc10c jle 0x5dc12d → else fall to 10e
  }
  if (do10e) {                                 // 0x5dc10e shared block
    const r = (heap.u8(esi + 0x30) * 0x260) >>> 0;
    const t = heap.u8((r + A7420) >>> 0);
    const v = heap.u8((t * 8 + S5B7F) >>> 0);  // movzx eax,[eax*8+0x5f5b7f]
    heap.setU32(esi + 0x2c, (v << 0x10) >>> 0);
  }

  // 0x5dc12d cmp cx,0x84 jne 0x5dc16a — gated by [esi+1]==0, !( [esi+0x48]&0x400 ),
  // [esi+0x34]>=8 (unsigned).
  if (cx === 0x84 && heap.u8(esi + 1) === 0 && !(heap.u16(esi + 0x48) & 0x400) &&
      heap.u16(esi + 0x34) >= 8) {
    heap.setU32(esi + 0x2c, (((-(heap.u32(DC30) | 0)) << 4) | 0) >>> 0); // 0x5dc149 neg;shl 4
    if (heap.u16(esi + 0x34) >= 0x18) {        // 0x5dc15b jb 0x5dc16a
      heap.setU16(esi + 0x48, heap.u16(esi + 0x48) | 0x400);
      heap.setU8(esi + 0xd2, 0x5a);
    }
  }

  // === 0x5dc16a..0x5dc1a7 — image-table lookup + bound check + image-id rotate ===
  // 0x5dc16a mov ax,[esi+0x34]; 0x5dc175 inc ax  → ax = (u16[esi+0x34]+1)&0xffff
  const ax = (heap.u16(esi + 0x34) + 1) & 0xffff;
  // 0x5dc16e movzx ecx,[esi+0xcd]; 0x5dc177 mov ecx,[ecx*4+0x67af10] (base ptr)
  const ecxBase = heap.u32(AF10 + heap.u8(esi + 0xcd) * 4) >>> 0;
  // 0x5dc17e mov edi,[ecx+edi*4]  (edi=edi36; entry ptr) ; 0x5dc181 cmp ax,[edi-2]
  const ptr = heap.u32((ecxBase + edi36 * 4) >>> 0) >>> 0;
  // 0x5dc185: jb 0x5dc3b6 — ax < u16[ptr-2] (unsigned). DOMINANT type-37 exit
  // (38/39). Transcribe the arm: store ax, the two pushal call-0x452fce gates,
  // then the 0x5dc450 image-delta block, checkpointing at 0x5dc51c.
  if (ax < heap.u16((ptr - 2) >>> 0)) {
    const t31 = heap.u8(esi + 0x31);
    const sub = (heap.u16(esi + 0x36) >>> 2) & 0xffff;
    // 0x5dc3c6 call-block iff type∈{0x2c,0x2d} && sub==0xf && ax==0xc; 0x5dc422
    // call-block iff [esi+1]==0 && sub==0x75 && ax==0x30. Neither holds for type
    // 37; if either does, hand the whole arm to the interpreter at 0x5dc3b6.
    const callBlock = ((t31 === 0x2c || t31 === 0x2d) && sub === 0xf && ax === 0xc) ||
                      (heap.u8(esi + 1) === 0 && sub === 0x75 && ax === 0x30);
    if (callBlock) {
      regs.esi = esi >>> 0; regs.eax = ax >>> 0; regs.ecx = ecxBase >>> 0; regs.edi = ptr >>> 0;
      return 0x005dc3b6;
    }
    heap.setU16(esi + 0x34, ax);                                        // 0x5dc3b6

    // The 0x5dc51c tail calls 0x5dcd40 (which reads ax/cx/dx = va/vc/vd) iff
    // esi==[DC28] && [DC30]>=0 (0x5dc51c/24). Rather than carry va/vc/vd (and
    // their dead-high16) into that checkpoint, hand the call path to the
    // interpreter at the clean 0x5dc450 checkpoint (only esi live) — it redoes
    // the delta block + call exactly. The common no-call path ([DC30]<0, the
    // only path type 37 takes) keeps the JS delta block below, where ax/cx/dx
    // are dead on the 0x5dc538 fall-through + jmp-0x5dc086 loop-back.
    if (heap.u32(DC28) === (esi >>> 0) && s32(heap.u32(DC30)) >= 0) {
      regs.esi = esi >>> 0; return 0x005dc450;
    }

    // === image-delta block 0x5dc450..0x5dc4cd (no-call path) ===
    // 0x5dc450/54/58/5f/62/69: edi = ax*0xa + [ [esi+0xcd]→0x67af10 ][ u16[esi+0x36] ]
    const cbase2 = heap.u32(AF10 + heap.u8(esi + 0xcd) * 4) >>> 0;
    const recPtr = (ax * 0xa + heap.u32((cbase2 + edi36 * 4) >>> 0)) >>> 0;
    let va = (heap.u16(recPtr) + heap.u16(esi + 0x38)) & 0xffff;        // 0x5dc46c/7b
    const vc = (heap.u16((recPtr + 2) >>> 0) + heap.u16(esi + 0x3a)) & 0xffff; // 0x5dc46f/85
    const rt = heap.u8(((heap.u8(esi + 0x30) * 0x260) + A7420) >>> 0);  // 0x5dc477/7f/89
    const bxv = s8(heap.u8((rt * 8 + S5D02) >>> 0)) & 0xffff;           // 0x5dc494 movsx bx
    const vd = (heap.u16((recPtr + 4) >>> 0) + heap.u16(esi + 0x3c) + bxv) & 0xffff; // 0x5dc473/90/9d
    let mask = 0;                                                       // 0x5dc4a0 xor ebx,ebx
    if (va !== heap.u16(DC48)) mask |= 1;                               // 0x5dc4a2/ab
    if (vc !== heap.u16(DC4A)) mask |= 2;                               // 0x5dc4ae/b7
    if (vd !== heap.u16(DC4C)) mask |= 4;                               // 0x5dc4ba/c3
    heap.setU32(esi + 0x24, (heap.u32(esi + 0x24) - heap.u32(DC50 + mask * 4)) >>> 0); // 0x5dc4c6/cd

    // === field stores 0x5dc4d0..0x5dc51b ===
    heap.setU16(DC48, va);                                              // 0x5dc4d0
    heap.setU16(DC4A, vc);                                              // 0x5dc4d6
    heap.setU16(DC4C, vd);                                              // 0x5dc4dd
    heap.setU8(esi + 0x1e, heap.u8((recPtr + 6) >>> 0));               // 0x5dc4e4/e7
    heap.setU8(esi + 0x20, heap.u8((recPtr + 8) >>> 0));               // 0x5dc4ea/ed
    const b7 = heap.u8((recPtr + 7) >>> 0);                            // 0x5dc4f0 movzx ebx,[edi+7]
    heap.setU8(esi + 0x1f, b7);                                        // 0x5dc4f4
    // 0x5dc4fb test [type*8+0x5f7104],0x200 ; 0x5dc507 cmp bl,0 -> zero 0x4a/4c/4e
    if ((heap.u16(F7104 + t31 * 8) & 0x200) && b7 !== 0) {
      heap.setU8(esi + 0x4a, 0);                                       // 0x5dc50c
      heap.setU16(esi + 0x4c, 0);                                      // 0x5dc510
      heap.setU16(esi + 0x4e, 0);                                      // 0x5dc516
    }

    // CHECKPOINT 0x5dc51c — esi + ebx live: 0x5dc545 `mov ebx,[ebx*4+0x65dc70]`
    // reads ebx (= u8[recPtr+7]). The call path was diverted above, so the tail
    // here is just the [esi+0x24]<0x368a branch (jl 0x5dca55) and the
    // jmp-0x5dc086 loop-back — both left to the interpreter; neither reads
    // ax/cx/dx, so eax/ecx/edx need not be set.
    regs.esi = esi >>> 0; regs.ebx = b7 >>> 0;
    return 0x005dc51c;
  }

  // 0x5dc18b..0x5dc1a1 — fall-through: build the image-id and look up its entry.
  const a38 = heap.u16(esi + 0x38);            // 0x5dc18b mov ax,[esi+0x38]
  let c = heap.u16(esi + 0x3a);                // 0x5dc18f mov cx,[esi+0x3a]
  c = ((c << 7) | (c >>> 9)) & 0xffff;         // 0x5dc193 rol cx,7
  c = (c | a38) & 0xffff;                       // 0x5dc197 or cx,ax
  c = ((c >>> 5) | (c << 11)) & 0xffff;        // 0x5dc19a ror cx,5
  const ediPtr = heap.u32(EF4 + c * 4) >>> 0;  // 0x5dc19e/a1 movzx edi,cx; mov edi,[edi*4+0x971ef4]

  // CHECKPOINT 0x5dc1a8 — esi + edi live: the dx-reload suffix reads esi
  // (mov dx,[esi+0x3c], movzx eax,[esi+0x36]) and walks edi (mov bl,[edi] @0x5dc1d1);
  // dx/eax/ebx/ecx are all (re)written before read.
  regs.esi = esi >>> 0;
  regs.edi = ediPtr >>> 0;
  return 0x005dc1a8;
  // TODO: the jl arm now runs in JS through the 0x5dcbad final-accumulation pass
  // (chain re-walk + 2 idivs) to checkpoint 0x5dcd0c (type-37, flag-8 clear) /
  // 0x5dcc28 (flag-8 set, unexercised, audit-verified). Remaining for the jl path:
  // the short 0x5dcd0c tail (0x75-subtype check + [esi+0x2c]=ecx store + the
  // eax=[DC40]/ebx=[DC44] ret loads) and the flag-8 middle (0x5dcc28..0x5dcd0a).
  // Other paths: the 0x5dc51c jb-arm tail ([esi+0x24]<0x368a → 0x5dca55, loop-back);
  // the 0x5dc450 delta-block + 0x5dcd40 call path; the rare 0x5dc1a8 fall-through.
}

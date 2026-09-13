// @manual — do not regenerate.
//
// FUN_00424e0f — periodic map-scan / fence+scenery aging sim helper, called
// once per game tick from 0x4388c5 (the per-tick sim chain). ~883 interp
// steps/call. Transcribed instruction-by-instruction from the capstone
// disassembly (CODESEG file off = va-0x41c000+0x1a600); the Ghidra C
// (decompiled/c/424e0f.c) is consulted but NOT trusted where it disagrees
// with the asm (e.g. it conflates the `jb` after the 0x425432 call with a
// pre-call comparison `bVar12`).
//
// Structure (verified against the disasm 0x424e0f..0x42500d):
//   ebp = 10  (loop counter)
//   loop @0x424e14 (10 iterations):
//     scramble a 14-bit free-running counter DAT_008d4228 into a tile index:
//       interleave odd/even bits into cx/dx, recombine, index [0x971ef4].
//     walk the tile-element chain at that index:
//       - skip elements whose (type & 0x3c)!=0 until the chain-end bit
//         ([p+1]&0x80); chain-end with non-zero type → break to 0x424fb3.
//       - first element with (type&0x3c)==0 (a SURFACE element):
//           if [p+5]&0xe0 != 0  -> goto LAB_00424f60 (recombine + 2nd walk)
//           bVar5 = ([p+5]&0x1f)<<2
//           if bVar5 > [p+2]     -> goto LAB_00424f13 (set [p+6]=1; 5e56d3)
//           call 0x425432 (can-stand check); if CF -> goto LAB_00424f08
//           else set up edi=esi, dl=[p+2], dh=dl+4 (+4 more if [p+4]&0x10),
//                goto LAB_00424eeb (neighbour-occlusion scan)
//     neighbour scan LAB_00424eeb (0x424eeb..0x424f06): walk edi chain while
//       higher elements occlude; the loop body @0x424f19 ages [esi+6]
//       (water/path animation: +0x10 wrap, xor 8, 5df40c roll, +1 step) and
//       on the LAB_00424f47 path calls 0x5e56d3(p, edi-ish) with di=[p+2]<<2,
//       si=di+0x10.
//     LAB_00424f08: if ([p+6]&7)!=1 -> LAB_00424f13 set [p+6]=1 + 5e56d3.
//     LAB_00424f60: recombine si from cx/ax (the exit CX/AX of whatever
//       callee last ran), index [0x971ef4] again, 2nd chain walk:
//         (type&0x3c)==0xc -> call 0x5df1ff(p, ebp)
//         (type&0x3c)==4 && [p+5]&0xf==5 -> call 0x42e48a(p, ebp)
//       until chain-end bit.
//     LAB_00424fb3: DAT_008d4228 = (DAT_008d4228+1)&0x3fff; dec ebp.
//   epilogue @0x424fca: ax = -0x4314ed(); if ax != [0x87d7a2] restart whole
//     fn from 0x424e0f; else a guarded news-item scan (0x887420 table,
//     stride 0x260, call 0x426f56) under tight gates.
//
// Every callee is delegated through callNative with binary-exact register
// staging so its CX/AX/CF round-trips faithfully (the recombine at
// LAB_00424f60 consumes the callee's exit CX/AX — modelling those by hand
// is the load-bearing risk the disasm-trust + callNative round-trip removes):
//   0x425432 (can-stand, CF), 0x5e56d3 (fence/scenery invalidate, CX/AX),
//   0x5df40c (rng roll, AL), 0x423677 (n/a here), 0x4314ed (peep-count, AX),
//   0x5df1ff / 0x42e48a (2nd-walk handlers, stack args), 0x426f56 (news).
//
// Oracle: tools/_lockstep-424e0f.mjs (whole-heap per-call compare vs the
// interpreter, calls=N memMis=0); reachable behind __forceInterp424e0f.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { callIndirect, state } from "../../runtime/win32/context.js";
import { FUN_005e56d3 } from "./5e56d3.js";
import { FUN_005df1ff } from "./5df1ff.js";
import { FUN_004314ed } from "./4314ed.js";

const CTR = 0x008d4228;       // 14-bit free-running scan counter (word)
const TILE_TBL = 0x00971ef4;  // dword[] tile-element chain heads


function rol16(v, n) { v &= 0xffff; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { v &= 0xffff; return ((v >>> n) | (v << (16 - n))) & 0xffff; }

// The entry bit-scramble (0x424e14..0x424e9f): interleave odd bits of the
// 14-bit counter into `cx` (uVar6) and even bits into `ax<<5` (uVar2),
// recombine into the [0x971ef4] index. Returns { idx, cx } where cx = uVar6.
function scrambleIndex(ctr) {
  let ax = ctr & 0xffff;
  let cx = 0, dx = 0;
  // 14 shr/rcl pairs alternating cx,dx — but the asm does 7 cx-rcl and 7
  // dx-rcl interleaved (shr ax,1; rcl cx,1; shr ax,1; rcl dx,1; ...). After
  // 14 shifts cx holds bits {1,3,5,7,9,11,13}, dx holds {0,2,4,6,8,10,12}
  // (each rcl pulls CF from the prior shr — CF = the LSB shifted out).
  for (let i = 0; i < 14; i++) {
    const cf = ax & 1;
    ax >>>= 1;
    if (i & 1) { dx = ((dx << 1) | cf) & 0xffff; }
    else       { cx = ((cx << 1) | cf) & 0xffff; }
  }
  // 0x424e74: shl dx,7 ; or cx,dx
  cx = (cx | ((dx << 7) & 0xffff)) & 0xffff;        // uVar6
  // 0x424e7b: ax = cx & 0x7f ; cx >>= 7 ; ax <<= 5 ; cx <<= 5
  let a = (cx & 0x7f);
  let c = (cx >>> 7) & 0xffff;
  a = (a << 5) & 0xffff;                            // uVar2 = (cx&0x7f)<<5
  c = (c << 5) & 0xffff;                            // uVar4 = (cx>>7)<<5
  // 0x424e8e: si = cx(=c) ; rol si,7 ; or si,ax ; ror si,5
  let si = rol16(c, 7);
  si = (si | a) & 0xffff;
  si = ror16(si, 5);
  return { idx: si, uVar6: cx, a, c };
}

// LAB_00424f60: recombine si = (cx<<7 | cx>>9 | ax-bits) then walk the chain
// at that index running the 2nd-pass handlers. Takes the live cx/ax (16-bit).
function secondWalk(heap, cxIn, axIn, ebp) {
  // 0x424f60: mov si,cx ; rol si,7 ; or si,ax ; ror si,5
  let si = rol16(cxIn & 0xffff, 7);
  si = (si | (axIn & 0xffff)) & 0xffff;
  si = ror16(si, 5);
  let p = heap.u32(TILE_TBL + si * 4) >>> 0;
  for (;;) {
    const t = heap.u8(p) & 0x3c;
    if (t === 0xc) {
      // push esi; push ebp; call 0x5df1ff
      regs.esi = p >>> 0;
      regs.ebp = ebp >>> 0;
      if (globalThis.__realStartup || state.executionMode === "pure-js") FUN_005df1ff(heap);
      else callNative(0x5df1ff, [p >>> 0, ebp >>> 0]);
    } else if (t === 4 && (heap.u8(p + 5) & 0xf) === 5) {
      regs.esi = p >>> 0;
      regs.ebp = ebp >>> 0;
      callNative(0x42e48a, [p >>> 0, ebp >>> 0]);
    }
    const chainEnd = (heap.u8(p + 1) & 0x80) !== 0;
    p = (p + 8) >>> 0;
    if (chainEnd) break;
  }
}

/**
 * @param {Heap} heap
 */
export function FUN_00424e0f_js(heap) {
  // The whole function may restart at 0x424e0f from the epilogue; bound it.
  for (let restart = 0; restart < 1024; restart++) {
    let ebp = 10;
    for (; ebp > 0; ebp--) {
      const ctr = heap.u16(CTR);
      const { idx, a, c } = scrambleIndex(ctr);
      let p = heap.u32(TILE_TBL + idx * 4) >>> 0;

      // First chain walk to the first SURFACE element ((type&0x3c)==0).
      let brokeToFb3 = false;
      let reachedSurface = false;
      while ((heap.u8(p) & 0x3c) !== 0) {
        const chainEnd = (heap.u8(p + 1) & 0x80) !== 0;
        p = (p + 8) >>> 0;
        if (chainEnd) { brokeToFb3 = true; break; } // 0x424eb4: jmp 0x424fb3
      }
      if (!brokeToFb3 && (heap.u8(p) & 0x3c) === 0) reachedSurface = true;

      if (!brokeToFb3 && reachedSurface) {
        // p = surface element. cx/ax live values for the LAB_00424f60
        // recombine default to the scramble's; callees may overwrite.
        let cxLive = regs.ecx & 0xffff, axLive = regs.eax & 0xffff;
        let didSecondWalk = false;

        if ((heap.u8(p + 5) & 0xe0) !== 0) {
          // 0x424ebd `jne 0x424f60` with NOTHING in between, so CX/AX are still
          // the scramble's own c/a from 0x424e86/0x424e8a. See the note on the
          // 0x424f13 path below for why passing regs here is wrong.
          secondWalk(heap, c, a, ebp);
          didSecondWalk = true;
        } else {
          const bVar5a = (heap.u8(p + 5) & 0x1f) << 2;
          if (bVar5a > heap.u8(p + 2)) {
            // 0x424ecf: ja 0x424f13 — set [p+6]=1 then 5e56d3, then FALL INTO
            // LAB_00424f60 (0x424f17 `jmp 0x424f47`, which runs off the end of
            // 0x424f5f into 0x424f60).
            //
            // NOTHING between 0x424e8a and this call touches AX or CX — the
            // path is all DL/ESI work — so 0x5e56d3 is entered with the live
            // scramble coords, and LAB_00424f60 then recombines ITS exit CX/AX.
            // We were entering it on whatever the previous callNative left
            // behind (the dropped-register-args class this file already fixes
            // for 0x425432), so its exit CX/AX were meaningless and the
            // recombine landed outside the 16384-entry tile table at
            // 0x971ef4 — reading WINDOW POOL bytes as tile-chain pointers.
            // Measured on the real title: 9319 out-of-range walks per tick out
            // of 9954 through this site, each scanning memory for a stray 0x80
            // bit. That is the whole of the 200-SECOND post-fade tick.
            //
            // Gated exactly like the 0x425432 staging below and for the same
            // recorded reason: correct coords change 0x5e56d3's result on the
            // varied gameplay map, and the frozen sc21 soak baseline was
            // captured with the stale ones.
            if (globalThis.__realStartup) {
              regs.eax = (regs.eax & 0xffff0000) | a;
              regs.ecx = (regs.ecx & 0xffff0000) | c;
            }
            setOneAndInvalidate(heap, p);
            secondWalk(heap, regs.ecx, regs.eax, ebp);
            didSecondWalk = true;
          } else {
            // call 0x425432 (can-stand). The asm keeps ax=(uVar6&0x7f)<<5 and
            // cx=(uVar6>>7)<<5 live from 0x424e86/0x424e8a through the call;
            // scrambleIndex computed these as locals a/c but never staged them
            // into regs, so the interp ran 0x425432 with STALE eax/ecx -> a
            // non-tile-aligned index into [0x971ef4] -> a -1 entry ->
            // `test byte[0xffffffff]` OOB. On the all-flat TITLE map every tile
            // reaches this branch, so it floods ~6300x/tick.
            //
            // GATED to __realStartup only: the frozen sc21 gameplay soak
            // (5b79d5b5) was captured with the stale-coords behaviour, and
            // staging the correct coords changes 0x425432's result on the
            // varied gameplay map — the map-scan then cascades into far more
            // work (heap diverges, soak slows to a crawl). The stale path is a
            // fast OOB-bail there and is heap-neutral on that map, so gameplay
            // keeps it byte-for-byte; only the title (real-startup) gets the
            // faithful aligned coords, killing the OOB flood.
            if (globalThis.__realStartup) {
              regs.eax = (regs.eax & 0xffff0000) | a;
              regs.ecx = (regs.ecx & 0xffff0000) | c;
            } else {
              regs.eax = (regs.eax & 0xffff0000) | (regs.eax & 0xffff);
            }
            let cannotStand;
            if (globalThis.__realStartup || state.executionMode === "pure-js") {
              callIndirect(heap, 0x425432);
              cannotStand = regs.cf;
            } else {
              callNative(0x425432, []);
              cannotStand = state.__painterCpu?.eflags.CF;
            }
            if (cannotStand) {
              // jb 0x424f08
              handleF08(heap, p, ebp);
              didSecondWalk = true;
            } else {
              // edi = esi(=p); dl=[p+2]; dh=dl+4 (+4 if [p+4]&0x10); LAB_00424eeb
              let edi = p >>> 0;
              const dl = heap.u8(p + 2);
              let dh = (dl + 4) & 0xff;
              if ((heap.u8(p + 4) & 0x10) !== 0) dh = (dl + 8) & 0xff;
              const r = neighbourScan(heap, p, edi, dl, dh, ebp);
              didSecondWalk = true; // neighbourScan always reaches a secondWalk/f60
            }
          }
        }
        // After any of these paths the code is at LAB_00424fb3; cx/ax already
        // consumed inside the chosen path's secondWalk.
        void cxLive; void axLive; void didSecondWalk;
      }

      // LAB_00424fb3: bump counter, continue loop.
      heap.setU16(CTR, (heap.u16(CTR) + 1) & 0x3fff);
    }

    // epilogue @0x424fca
    regs.eax = FUN_004314ed(heap) >>> 0;
    let ax = (-(regs.eax & 0xffff)) & 0xffff;
    if (ax !== heap.u16(0x87d7a2)) {
      continue; // jne 0x424e0f — restart whole function
    }
    // ax == [0x87d7a2]
    const v8dbed2 = heap.u16(0x8dbed2);
    if (v8dbed2 < 0x71 || v8dbed2 > 0x7f) return;             // jb/ja 0x42500d
    // cmp ax,-1 jl 0x43909f  (signed)
    const axS = (ax << 16) >> 16;
    if (axS < -1) { newsScan(heap); return; }
    // cmp [0x87c3b4],0x493e0 jg 0x43909f (signed)
    const cash = heap.i32 ? heap.i32(0x87c3b4) : (heap.u32(0x87c3b4) | 0);
    if ((cash | 0) > 0x493e0) { newsScan(heap); return; }
    return;
  }
}

// 0x43909f tail: the guarded news-item scan over [0x887420], stride 0x260,
// up to [0x8ad1c0]; first record with [rec]!=0xff fires 0x426f56 and returns.
function newsScan(heap) {
  for (let rec = 0x887420; rec < 0x8ad1c0; rec += 0x260) {
    if (heap.u8(rec) !== 0xff) {
      callNative(0x426f56, []);
      return;
    }
  }
}

// LAB_00424f13 helper: [p+6]=1 then call 0x5e56d3(p, edi). At 0x424f13 edi
// (pbVar11/unaff_EDI) is the surface element p in the direct-from-0x424ecf
// path. Pushes di=[p+2]<<2, si=di+0x10.
function setOneAndInvalidate(heap, p, edi) {
  heap.setU8(p + 6, 1);
  invalidate5e56d3(heap, p, edi === undefined ? p : edi);
}

// LAB_00424f47: push edi; push esi; di=[esi+2]<<2; si=di+0x10; call 0x5e56d3.
function invalidate5e56d3(heap, esi, edi) {
  let di = (heap.u8(esi + 2) << 2) & 0xffff;
  let si = (di + 0x10) & 0xffff;
  regs.edi = (regs.edi & 0xffff0000) | di;
  regs.esi = esi >>> 0;
  // The binary call signature is 5e56d3(pbVar9, pbVar11) via push esi/edi (it
  // pushes edi then esi at 0x424f47/8) but reads si/di registers internally.
  regs.esi = (regs.esi & 0xffff0000) | si; // mov si,di after add — wait, see note
  // NOTE: asm @0x424f49 movzx di,[esi+2]; shl di,2; mov si,di; add si,0x10.
  // So di = [esi+2]<<2 and si = di+0x10. esi low half is overwritten by si.
  FUN_005e56d3(heap);
}

// LAB_00424f08 (0x424f08): bl=[p+6]&7; if bl==1 goto LAB_00424f60 else
// LAB_00424f13 (set [p+6]=1 + 5e56d3).
function handleF08(heap, p, ebp) {
  const bl = heap.u8(p + 6) & 7;
  if (bl === 1) {
    secondWalk(heap, regs.ecx, regs.eax, ebp);
  } else {
    heap.setU8(p + 6, 1);
    invalidate5e56d3(heap, p, p);
    secondWalk(heap, regs.ecx, regs.eax, ebp);
  }
}

// LAB_00424eeb neighbour-occlusion scan (0x424eeb..0x424f06 + the aging body
// at 0x424f19..0x424f5f). edi walks the chain; when an upper element no longer
// occludes, the aging body runs and then LAB_00424f60 / LAB_00424f08.
function neighbourScan(heap, p, edi, dl, dh, ebp) {
  // The do/while at 0x424eeb: pbVar11=unaff_EDI; if ([edi+1]&0x80) -> aging
  // body (0x424f19); else advance edi (+8) and test occlusion conditions.
  for (let guard = 0; guard < 4096; guard++) {
    if ((heap.u8(edi + 1) & 0x80) !== 0) {
      // 0x424f19 aging body
      const before = heap.u8(p + 6);
      const sum = (before + 0x10) & 0xff;
      heap.setU8(p + 6, sum);
      if (sum >= before) {
        // jae 0x424f60 (no carry → not yet wrapped)
        secondWalk(heap, regs.ecx, regs.eax, ebp);
        return;
      }
      // xor [p+6],8 ; test [p+6],8
      let v = heap.u8(p + 6) ^ 8;
      heap.setU8(p + 6, v);
      if ((v & 8) !== 0) {
        // push eax; call 0x5df40c; and al,0x70; or [p+6],al; pop eax; -> f60
        const savedEax = regs.eax >>> 0;
        callNative(0x5df40c, []);
        const al = regs.eax & 0x70;
        heap.setU8(p + 6, heap.u8(p + 6) | al);
        regs.eax = savedEax;
        secondWalk(heap, regs.ecx, regs.eax, ebp);
        return;
      }
      // bl=[p+6]&7; if bl==6 -> f60 ; else inc bl; [p+6]=bl ; LAB_00424f47
      const bl = heap.u8(p + 6) & 7;
      if (bl === 6) {
        secondWalk(heap, regs.ecx, regs.eax, ebp);
        return;
      }
      heap.setU8(p + 6, (bl + 1) & 0xff);
      // LAB_00424f47: invalidate then f60
      invalidate5e56d3(heap, p, edi);
      secondWalk(heap, regs.ecx, regs.eax, ebp);
      return;
    }
    // advance: unaff_EDI = pbVar11+8 then test (0x424ef1 add edi,8)
    edi = (edi + 8) >>> 0;
    const bl = heap.u8(edi) & 0x3c;
    // while ((*edi&0x3c)==0x14 || [edi+0xb]<=dl ... ) loop continues; the
    // disasm @0x424ef9: cmp bl,0x14 je 0x424eeb (continue) ;
    //   cmp dl,[edi+3] jae 0x424eeb ; cmp dh,[edi+2] jb 0x424eeb ; else f08.
    if (bl === 0x14) continue;                       // je 0x424eeb
    if (dl >= heap.u8(edi + 3)) continue;            // jae 0x424eeb
    if (dh < heap.u8(edi + 2)) continue;             // jb 0x424eeb
    // fall through to LAB_00424f08
    handleF08(heap, p, ebp);
    return;
  }
}

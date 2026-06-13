// @manual — do not regenerate.
//
// FUN_005da274 — ride/vehicle per-sprite update, vtable slot 4 of
// PTR_LAB_005d97b4 (the per-vehicle state dispatch reached from the
// sprite-update walk at 0x5d952c: `call dword [edi*4 + 0x5d97b4]`,
// edi = [esi+0x50] = 4). ~330 interp steps/call, the top remaining
// interpreter consumer by total. NO Ghidra C exists.
//
// Transcribed instruction-by-instruction from the capstone disassembly
// (CODESEG file off = va-0x41c000+0x1a600). Reachability analysis from
// 0x5da274 (following branches, not calls) gives EXACTLY 175 instructions,
// a SINGLE exit (`ret` at 0x5db338), and 6 direct callees — all delegated
// through callNative so their heap effects + register exits round-trip
// byte-exactly:
//   0x5ddcbe (entry pre-update), 0x5dbeeb (mode-flag query -> eax),
//   0x5db5d7 (state-transition helper), 0x5db339 / 0x5db446 (crash/explode
//   arms), 0x5dbad0 (the 0x5dae71 tail helper).
// The deeper physics subtree (0x5db5d7 -> 0x5d89c0/44142c/441452/452fce,
// etc.) stays inside the interpreter via those callNative crossings.
//
// ENTRY register state (from the dispatcher at 0x5d94ea..0x5d952c):
//   esi = vehicle sprite base
//   dl  = [edi + 0x887424]  (ride mode byte; edi = ride*0x260)
//   dh  = [esi + 0x51]      (vehicle sub-state)
//   eax = (set by 0x5dbeeb below; entry eax is dead before the first read)
// and the byte global [0x65e6b7] (set by the dispatcher at 0x5d94e5).
//
// Structure (verified against the disasm 0x5da274..0x5db338):
//   call 0x5ddcbe
//   if ([0x65e6b7]==0 && dl==7) -> ret
//   if (dh==2): [esi+0x28]=0; [esi+0x2c]=0; if(--[esi+0xc0]==0){[esi+0x51]=0; dh=0}
//   eax = 0x5dbeeb()           (mode flags)
//   if ((eax&0x300) && dl==2 && dh==0) -> LAB_5da32a
//   if (eax&0x40) -> call 0x5db339; ret
//   if (eax&0x80) -> call 0x5db446; ret
//   if (eax&0x20):
//     dl==7 -> if(dh<=1){[esi+0x50]=5; 0x5db5d7(); [esi+0x51]=1; [esi+0xc0]=0; ret}
//                       else jmp LAB_5da335
//     dl==5 -> ARM_5daebd (position recompute; 0x5db5d7; then 0x5dae71 tail)
//     dl==4 -> xor word[esi+0x48],8; [esi+0x28]=0; jmp LAB_5da335
//     else   -> if(dh!=0){call 0x5db339; ret} else LAB_5da32a
//   else (eax&0x20==0): jmp LAB_5da335
//   LAB_5da32a: [esi+0x51]=1; [esi+0x28]=0; (fallthrough to LAB_5da335)
//   LAB_5da335 (the mode-bit tail): branches on dl==7 station logic,
//     then eax&0x10 (two dl-cases), then eax&8 (state advance), all -> ret.
//   ARM_5daebd .. 0x5dae71: recompute position fields, 0x5db5d7,
//     +0x6d14 to [esi+0x24], then call 0x5ddcbe; call 0x5dbad0; ret.
//
// Every store width is taken from the disasm (word [esi+0xc0], dword
// [esi+0x28]/[esi+0x2c]/[esi+0x24], word [esi+0x48]/[esi+0xb8], byte
// [esi+0x50]/[esi+0x51]/[esi+0x34..0x36]) — the #1 translator bug class
// (byte/word store widened to setU32) is avoided by transcribing widths.
//
// Oracle: tools/_lockstep-5da274.mjs (whole-heap per-call compare vs the
// interpreter, calls=N memMis=0); interpreter reachable behind
// __forceInterp5da274 (the eip-hook in painter-bridge.js).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const G_65e6b7 = 0x0065e6b7;   // byte global (set by dispatcher)
const TILE_TBL = 0x00971ef4;   // dword[] tile-element chain heads

function s32(v) { return v | 0; }

/**
 * @param {Heap} heap
 */
export function FUN_005da274_js(heap) {
  const esi = regs.esi >>> 0;
  _esi = esi;
  // edx low half: dl = ride mode, dh = sub-state. Track as plain numbers.
  let dl = regs.edx & 0xff;
  let dh = (regs.edx >>> 8) & 0xff;

  // 0x5da274: call 0x5ddcbe
  stageEdx(dl, dh);
  callNative(0x5ddcbe, []);
  // (0x5ddcbe is a void-ish pre-update; dl/dh unaffected — reload from our locals)

  // 0x5da279: cmp [0x65e6b7],0 ; jne 0x5da28b ; cmp dl,7 ; je 0x5db338 (ret)
  if (heap.u8(G_65e6b7) === 0) {
    if (dl === 7) return; // -> 0x5db338
  }

  // 0x5da28b: cmp dh,2 ; jne 0x5da2ad
  if (dh === 2) {
    heap.setU32(esi + 0x28, 0);          // mov dword [esi+0x28],0
    heap.setU32(esi + 0x2c, 0);          // mov dword [esi+0x2c],0
    const c = (heap.u16(esi + 0xc0) - 1) & 0xffff;
    heap.setU16(esi + 0xc0, c);          // dec word [esi+0xc0]
    if (c === 0) {                       // jne 0x5da2ad (so run when ==0)
      heap.setU8(esi + 0x51, 0);         // mov byte [esi+0x51],0
      dh = 0;                            // xor dh,dh
    }
  }

  // 0x5da2ad: push edx ; call 0x5dbeeb ; pop edx
  stageEdx(dl, dh);
  callNative(0x5dbeeb, []);
  const eax = regs.eax >>> 0;            // mode flags
  // edx restored from our preserved dl/dh (the binary `pop edx`s it).

  // 0x5da2b4: test eax,0x300 ; je 0x5da2c4 ; cmp dl,2 ; jne 0x5da2c4 ;
  //           or dh,dh ; je 0x5da32a
  let gotoLab32a = false;
  if ((eax & 0x300) !== 0 && dl === 2 && dh === 0) {
    gotoLab32a = true;
  }

  if (!gotoLab32a) {
    // 0x5da2c4: test eax,0x40 ; jne 0x5da4bc (call 0x5db339; ret)
    if ((eax & 0x40) !== 0) { stageEdx(dl, dh); callNative(0x5db339, []); return; }
    // 0x5da2cf: test eax,0x80 ; jne 0x5da4c6 (call 0x5db446; ret)
    if ((eax & 0x80) !== 0) { stageEdx(dl, dh); callNative(0x5db446, []); return; }

    // 0x5da2da: test eax,0x20 ; je 0x5da335
    if ((eax & 0x20) !== 0) {
      // 0x5da2e1: cmp dl,7 je 0x5da302 ; cmp dl,5 je 0x5daebd ; cmp dl,4 ...
      if (dl === 7) {
        // 0x5da302: cmp dh,1 ; ja 0x5da335
        if (dh > 1) {
          // fall to LAB_5da335
        } else {
          heap.setU8(esi + 0x50, 5);     // mov byte [esi+0x50],5
          stageEdx(dl, dh); callNative(0x5db5d7, []);
          heap.setU8(esi + 0x51, 1);     // mov byte [esi+0x51],1
          heap.setU16(esi + 0xc0, 0);    // mov word [esi+0xc0],0
          return;                        // jmp 0x5db338
        }
      } else if (dl === 5) {
        arm5daebd(heap, esi, dl, dh);
        return;
      } else if (dl === 4) {
        // 0x5da2f4: xor word [esi+0x48],8 ; [esi+0x28]=0 ; jmp 0x5da335
        heap.setU16(esi + 0x48, heap.u16(esi + 0x48) ^ 8);
        heap.setU32(esi + 0x28, 0);
        // fall to LAB_5da335
      } else {
        // 0x5da322: or dh,dh ; jne 0x5da4bc (call 0x5db339; ret)
        if (dh !== 0) { stageEdx(dl, dh); callNative(0x5db339, []); return; }
        gotoLab32a = true;
      }
    }
    // else (eax&0x20==0): jmp 0x5da335 (fall through)
  }

  if (gotoLab32a) {
    // LAB_5da32a: [esi+0x51]=1 ; [esi+0x28]=0 (fallthrough to LAB_5da335)
    heap.setU8(esi + 0x51, 1);
    heap.setU32(esi + 0x28, 0);
  }

  // ===== LAB_5da335: the mode-bit tail =====
  lab5da335(heap, esi, dl, dh, eax);
}

// LAB_00424f60-style scramble shared with 424e0f: rol cx,7; or cx,ax; ror cx,5.
function rol16(v, n) { v &= 0xffff; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { v &= 0xffff; return ((v >>> n) | (v << (16 - n))) & 0xffff; }

// LAB_5da335 (0x5da335..0x5da4b7), all paths -> ret (0x5db338).
function lab5da335(heap, esi, dl, dh, eax) {
  // 0x5da335: cmp dl,7 ; jne 0x5da409
  if (dl === 7) {
    // 0x5da33e: cmp dh,1 ; jb 0x5da3e9 ; ja 0x5da409
    if (dh < 1) {
      // 0x5da3e9: clamp [esi+0x28] >= 0xfffdfc9c, set [esi+0x2c] thresholds
      if (s32(heap.u32(esi + 0x28)) >= s32(0xfffdfc9c)) {   // cmp ...; jl skip
        heap.setU32(esi + 0x2c, 0xfffff31e);
      }
      if (s32(heap.u32(esi + 0x28)) < s32(0xfffdfc9c)) {    // jge 0x5da409
        heap.setU32(esi + 0x28, 0xfffdfc9c);
      }
      // fall to 0x5da409
    } else if (dh === 1) {
      // 0x5da34d: push eax; push edx; chain walk on tile table.
      // eax/edx preserved across the walk (pop at 0x5da3bd / 0x5da3d5).
      const found = stationChainWalk(heap, esi);
      if (!found) {
        // 0x5da3bf: [esi+0x28]=0; [esi+0x51]=2; [esi+0xc0]=0x96; jmp 0x5da409
        heap.setU32(esi + 0x28, 0);
        heap.setU8(esi + 0x51, 2);
        heap.setU16(esi + 0xc0, 0x96);
      } else {
        // 0x5da3d5: if [esi+0x28] <= 0x20364 -> [esi+0x2c]=0xce2 ; jmp 0x5da409
        if (s32(heap.u32(esi + 0x28)) <= 0x20364) {        // jg skips
          heap.setU32(esi + 0x2c, 0xce2);
        }
      }
      // fall to 0x5da409
    }
    // dh > 1 (ja): straight to 0x5da409
  }

  // 0x5da409: test eax,0x10 ; je 0x5da479
  if ((eax & 0x10) !== 0) {
    // 0x5da410: cmp dl,2 ; je 0x5da446
    if (dl === 2) {
      // 0x5da446: or dh,dh ; jne 0x5da479
      if (dh === 0) {
        heap.setU16(esi + 0xb8, heap.u16(esi + 0xb8) | 2);   // or word [esi+0xb8],2
        // cmp [esi+0x28], 0xfffda0fc ; jl 0x5da479
        if (s32(heap.u32(esi + 0x28)) >= s32(0xfffda0fc)) {
          heap.setU32(esi + 0x2c, 0xffffc34d);
          if (heap.u8(G_65e6b7) === 0) {                     // jne 0x5da479
            heap.setU16(esi + 0x48, heap.u16(esi + 0x48) | 0x80);
            heap.setU16(esi + 0xb8, heap.u16(esi + 0xb8) & 0xfffd);
          }
        }
      }
    } else {
      // 0x5da415: or word [esi+0xb8],2 ; cmp [esi+0x28],0x25f04 ; jg 0x5da479
      heap.setU16(esi + 0xb8, heap.u16(esi + 0xb8) | 2);
      if (s32(heap.u32(esi + 0x28)) <= 0x25f04) {
        heap.setU32(esi + 0x2c, 0x3cb3);
        if (heap.u8(G_65e6b7) === 0) {                       // jne 0x5da479
          heap.setU16(esi + 0x48, heap.u16(esi + 0x48) | 0x80);
          heap.setU16(esi + 0xb8, heap.u16(esi + 0xb8) & 0xfffd);
        }
      }
    }
  }

  // 0x5da479: test eax,8 ; je 0x5db338 (ret)
  if ((eax & 8) === 0) return;
  // 0x5da484: cmp dl,2 ; jne 0x5da493
  if (dl === 2) {
    // 0x5da489: cmp [esi+0x28],0 ; jge 0x5db338 (ret)
    if (s32(heap.u32(esi + 0x28)) >= 0) return;
  }
  // 0x5da493: [esi+0x50]=5 ; call 0x5db5d7 ; [esi+0x51]=0 ; [esi+0xc0]=0
  heap.setU8(esi + 0x50, 5);
  stageEdx(dl, dh); callNative(0x5db5d7, []);
  heap.setU8(esi + 0x51, 0);
  heap.setU16(esi + 0xc0, 0);
  // 0x5da4a9: cmp [esi+0x28],0 ; jge 0x5db338 (ret)
  if (s32(heap.u32(esi + 0x28)) >= 0) return;
  heap.setU8(esi + 0x51, 1);             // 0x5da4b3
  // jmp 0x5db338 (ret)
}

// 0x5da34f..0x5da3bb chain walk: locate the matching tile element, then test
// a pair of neighbour conditions. Returns true on the "match" exit (0x5da3d5),
// false on the "no-match" exit (0x5da3bf). eax/edx are saved+restored by the
// binary (push/pop) so callers' dl/dh/eax survive unchanged.
function stationChainWalk(heap, esi) {
  // 0x5da34f: ax=[esi+0x38]; cx=[esi+0x3a]; rol cx,7; or cx,ax; ror cx,5
  const ax0 = heap.u16(esi + 0x38);
  let cx = rol16(heap.u16(esi + 0x3a), 7);
  cx = (cx | ax0) & 0xffff;
  cx = ror16(cx, 5);
  let edi = heap.u32(TILE_TBL + cx * 4) >>> 0;
  // 0x5da36c: dx=[esi+0x3c]>>2 ; ax=[esi+0x36]>>2
  const dxw = (heap.u16(esi + 0x3c) >>> 2) & 0xffff;
  const axw = (heap.u16(esi + 0x36) >>> 2) & 0xffff;
  const dl2 = dxw & 0xff;
  const al2 = axw & 0xff;
  // 0x5da37c: walk while !( (*edi&0x3c)==8 && [edi+2]==dl && [edi+4]==al )
  for (let guard = 0; guard < 0x10000; guard++) {
    const bl = heap.u8(edi) & 0x3c;
    if (bl === 8 && heap.u8(edi + 2) === dl2 && heap.u8(edi + 4) === al2) break;
    edi = (edi + 8) >>> 0;
  }
  // 0x5da395: test [edi+1],0x80 ; jne 0x5da3bd (no-match)
  if ((heap.u8(edi + 1) & 0x80) !== 0) return false;
  // 0x5da39b: al=[edi+3]; cmp al,[edi+0xa]; jne 0x5da3a9
  if (heap.u8(edi + 3) === heap.u8(edi + 0xa)) {
    // cmp [edi+0xc],0x43 ; je 0x5da3d5 (match)
    if (heap.u8(edi + 0xc) === 0x43) return true;
  }
  // 0x5da3a9: test [edi+9],0x80 ; jne 0x5da3bd (no-match)
  if ((heap.u8(edi + 9) & 0x80) !== 0) return false;
  // 0x5da3af: al=[edi+3]; cmp al,[edi+0x12]; jne 0x5da3bd (no-match)
  if (heap.u8(edi + 3) !== heap.u8(edi + 0x12)) return false;
  // cmp [edi+0x14],0x43 ; je 0x5da3d5 (match) ; else 0x5da3bd (no-match)
  return heap.u8(edi + 0x14) === 0x43;
}

// ARM_5daebd (0x5daebd..0x5daf16) then the 0x5dae71 tail. dl==5, eax&0x20.
function arm5daebd(heap, esi, dl, dh) {
  // 0x5daebd: edx=[esi+0x1e]; [esi+0x34]=dl(byte); ax=[esi+0xe]&0xffe0;
  //           cx=[esi+0x10]&0xffe0; [esi+0x38]=ax; [esi+0x3a]=cx; edx>>=3
  let edx = heap.u8(esi + 0x1e);          // movzx edx, byte [esi+0x1e]
  heap.setU8(esi + 0x34, edx & 0xff);     // mov byte [esi+0x34], dl
  let ax = heap.u16(esi + 0xe) & 0xffe0;
  let cx = heap.u16(esi + 0x10) & 0xffe0;
  heap.setU16(esi + 0x38, ax);
  heap.setU16(esi + 0x3a, cx);
  edx = edx >>> 3;                        // shr edx,3
  // 0x5daedf: ax += word[edx*4+0x652478]; cx += word[edx*4+0x65247a]
  ax = (ax + heap.u16(0x652478 + edx * 4)) & 0xffff;
  cx = (cx + heap.u16(0x65247a + edx * 4)) & 0xffff;
  ax = (ax >>> 5) & 0xffff;               // shr ax,5
  cx = (cx >>> 5) & 0xffff;               // shr cx,5
  // 0x5daef7: ah = cl ; [esi+0x36]=ax(word)
  ax = (ax & 0x00ff) | ((cx & 0xff) << 8);
  heap.setU16(esi + 0x36, ax);
  heap.setU8(esi + 0x35, 0);              // mov byte [esi+0x35],0
  heap.setU8(esi + 0x50, 7);              // mov byte [esi+0x50],7
  stageEdx(dl, dh); callNative(0x5db5d7, []);
  // 0x5daf0a: xor dh,dh ; [esi+0x51]=dh(byte=0)
  heap.setU8(esi + 0x51, 0);
  // 0x5daf0f: add dword [esi+0x24], 0x6d14
  heap.setU32(esi + 0x24, (heap.u32(esi + 0x24) + 0x6d14) >>> 0);
  // jmp 0x5dae71: call 0x5ddcbe ; call 0x5dbad0 ; ret
  stageEdx(dl, 0); callNative(0x5ddcbe, []);
  stageEdx(dl, 0); callNative(0x5dbad0, []);
}

// Stage esi (the sprite base, the binary's `this`) and edx (dl/dh) into regs
// before a callNative so the register-arg callees see the binary-exact esi/dx
// the `call` site would have passed. A prior callNative may have left a
// callee's exit esi in regs.esi, so re-stage it from the captured local each
// time. `_esi` is set once per FUN_005da274_js entry.
let _esi = 0;
function stageEdx(dl, dh) {
  regs.esi = _esi >>> 0;
  regs.edx = (regs.edx & 0xffff0000) | ((dh & 0xff) << 8) | (dl & 0xff);
}

// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x444e08 is the fence/wall
// per-element painter (vtable slot 1 of PTR_LAB_00628a94, dispatched from
// FUN_extra_paint_4368d8's `call [edi + 0x628a94]` at 0x436a59 when the
// tile-element type byte ([esi] & 0x3c) selects slot 1). Everything here is
// transcribed from the capstone disassembly:
//   python3 tools/disasm-va.py 0x444e08 0x445110    (main body)
//   python3 tools/disasm-va.py 0x446c50 0x446de9    (banner/scrolling-text path)
// plus the validated hand-port ported/auto/extra_paint_444e08.js
// (paintBody444e08, oracle-evidence in its header) as the semantic crib for
// the main body — which this file REUSES for non-banner walls and DUPLICATES
// (specialized) for banner walls, because paintBody444e08 refuses banner
// walls at entry and existing files may not be modified.
//
// Entry contract (per FUN_extra_paint_4368d8's call site):
//   esi = tile element ptr (8-byte struct)   ecx = rotation (cl)
//   edx = element pixel-height (16-bit dx)   edi = element type & 0x3c
//   eax low16 = tile X coord                 ebx low16 = chain-max height
//
// Path map (soak-measured; see the oracle line in the commit/report):
//   1. Non-banner walls (plain/slope/cliff/door-case-0, any zoom) — handled
//      by the imported, already-validated paintBody444e08 (pure JS; its
//      only interpreter use is the 0x4238b4 supports call, which hits the
//      install4238b4Hook JS fast-path).
//   2. Banner walls ([esi+4]&8, zoom<=1, door nibble 0) whose scrolling-text
//      block is skipped (wall not facing camera, i.e. ((cl+([esi]>>6))&3)
//      not in {1,2}, or banner index [esi+7]==0xff) — NEW JS port below:
//      duplicated main body + hand-transcribed banner glue 0x446c69..0x446de4
//      (two 0x15-flagged paint calls through [4*camrot+0x432204] with the
//      per-direction template pair from [0x630c20+dir*8]).
//   3. Cold fallbacks, run byte-exactly in the embedded interpreter (same
//      step loop as tools/_lockstep-auto.mjs's runInterp, on the bridge cpu
//      state.__painterCpu, with any eip hook at 0x444e08 lifted around the
//      run so the real binary bytes execute):
//        a. shade-overlay mode ([0x991f8c]&0x40 && zoom==0) — calls
//           [4*rot+0x431bb8]; the 431bb8 JS body doesn't model exit regs
//           for interpreter callers (same reason paintBody444e08 defers it);
//        b. door cases 1..13 ([esi+5]&0xf != 0, jumptable 0x445110) —
//           door-frame/leaf handler family, cold;
//        c. the scrolling-text banner block 0x446d20..0x446dd6 — calls the
//           string-format/measure/scroll trio 0x458bcf/0x458a7c/0x45a95d
//           whose REAL binary bodies must run (ported/auto/458bcf.js is a
//           boot-time stub), i.e. the ADD.6-deferred subsystem. All three
//           gate predicates depend only on entry state the body never
//           mutates, so the fallback decision is taken before any side
//           effect and the whole call replays exactly.
//
// Register exactness notes (banner glue):
//   - the glue's push ecx/edx/ebp/esi at 0x446c70 are restored by the pops
//     at 0x446d06/0x446dda..ddc; edx is restored FULL-width (pop edx), so
//     the conditional `add dx,0x10` (camera-facing lift) does NOT persist
//     into the tail;
//   - `add cl,al ; and ecx,3` → full ecx = (cl + ([esi]>>6)) & 3 (the 8-bit
//     add wraps inside the &3);
//   - `mov eax,[dir*8+0x630c20]` is a FULL eax load, then al=0/ah=0x15
//     partial writes → eax at the paint call = (template & 0xffff0000)|0x1500;
//   - di=1/si=1 are 16-bit writes preserving the upper halves left by the
//     preceding slope-case dispatch (matches the crib's lo16 discipline);
//   - on the `cmp si,0xff ; je` skip path, `movzx esi,[esi+7]` has already
//     clobbered esi to 0xff — harmless because the tail reloads esi from
//     [esp] (modeled), but transcribed faithfully anyway;
//   - `dec ecx` after the pop is a full 32-bit dec (dir 0 → 0xffffffff,
//     which takes the jae skip).
//
// Validation gate: ADDR=0x444e08 TICKS=8 node tools/_lockstep-auto.mjs

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { step, runFunction, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";
import { paintBody444e08 } from "./extra_paint_444e08.js";
import { paintBody432204 } from "./extra_paint_432204.js";

const ADDR = 0x00444e08;
const DAT_DPI = 0x00981ef8;

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { n &= 15; return ((v >>> n) | (v << (16 - n))) & 0xffff; }
function sx16(v) { return (v << 16) >> 16; }

// Slope-case paint-block tables for door case 0, (e4&0xf0)==0 — duplicated
// from the machine-extracted tables in extra_paint_444e08.js (jumptables
// 0x446398 / 0x4463d8; that file's consts are module-private and existing
// files may not be modified). Only the CASE0 pair is needed here: the banner
// path is reachable only with ([esi+4]&0xf0)==0, which excludes the
// cliff-extension (0x446de9 / DE9_*) tables.
const CASE0_PLAIN = [
  [],  // 0x446c5c
  [{ebx: 0x5736, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5736, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446617
  [{ebx: 0x5737, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5737, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x44669e
  [{ebx: 0x5736, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5737, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x573e, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446833
  [{ebx: 0x5738, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5738, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446725
  [{ebx: 0x5734, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5734, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446b53
  [{ebx: 0x5737, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5738, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x573f, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}],  // 0x4468fb
  [],  // 0x446c5c
  [{ebx: 0x5735, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5735, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x4467ac
  [{ebx: 0x5735, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x5736, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x573d, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x446a8b
  [{ebx: 0x5733, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5733, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x446bda
  [],  // 0x446c5c
  [{ebx: 0x5735, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5738, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x5740, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x4469c3
  [],  // 0x446c5c
  [],  // 0x446c5c
  [],  // 0x446c5c
];
const CASE0_ALT = [
  [{ebx: 0x573b, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x573b, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x4463fb
  [{ebx: 0x573a, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x573a, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x446482
  [{ebx: 0x573c, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x573c, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x446509
  [{ebx: 0x5739, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x5739, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x446590
];

// Byte-exact interpreter run of the real binary body at ADDR from the current
// cpu state, with any eip hook at ADDR lifted (in the lockstep oracle that is
// the oracle's own hook; in a production wiring it would be this port's
// wrapper). Same loop shape as tools/_lockstep-auto.mjs runInterp: step until
// the matching `ret` pops the return address (esp rises above entry esp), so
// every stack byte the truth leg writes is written here too.
function runInterpBody(heap, cpu) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = ADDR;
  let n = 0;
  try {
    while ((cpu.regs.esp >>> 0) <= entryEsp) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("444e08: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

// Full JS body for BANNER walls whose scrolling-text block is skipped.
// Preconditions (guaranteed by the dispatcher below): [esi+5]&0xf == 0,
// [esi+4]&0xf0 == 0, [esi+4]&8 != 0, zoom <= 1, not shade-overlay mode, and
// NOT the scrolling-text sub-path. Main-body sections are a faithful copy of
// the validated paintBody444e08 (see extra_paint_444e08.js header for the
// per-section disasm map); the banner glue is new transcription.
function bannerWallBody(heap, cpu) {
  const esi0 = cpu.regs.esi >>> 0;     // tile element ptr
  const ecx0 = cpu.regs.ecx >>> 0;     // rotation (cl)
  const rot = ecx0 & 0xff;
  const dxH = cpu.regs.edx & 0xffff;   // element height (dx) at entry
  const e4 = heap.u8(esi0 + 4);
  const e6 = heap.u8(esi0 + 6);
  const dpi = heap.u32(DAT_DPI) >>> 0;
  const f8c = heap.u16(0x991f8c);

  const lo8 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
  const hi8 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };
  const lo16 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };

  // === 0x444e08: tags + cliff-mismatch bit ===
  heap.setU8(0x991f78, 6);
  heap.setU16(0x630c40, 0);
  const w72 = heap.u16(0x991f72);
  const w76 = heap.u16(0x991f76);
  const tIdx = ror16((rol16(w76, 7) | w72) & 0xffff, 5);
  let nb = heap.u32(0x971ef4 + tIdx * 4) >>> 0;
  while ((heap.u8(nb) & 0x3c) !== 0) nb = (nb + 8) >>> 0;    // skip to SURFACE entry
  const blH = (dxH >>> 2) & 0xff;
  let mismatch;
  if (blH === heap.u8(nb + 2)) {
    if ((e4 & 4) !== 0) {
      mismatch = (heap.u8(nb + 4) & 0x1f) !== heap.u8(0x630b41 + (e4 & 3));
    } else {
      mismatch = (heap.u8(nb + 4) & 0x1f) !== 0;
    }
  } else {
    mismatch = true;
  }
  if (mismatch) heap.setU16(0x630c40, heap.u16(0x630c40) | 1);

  // (0x444e7c shade-overlay block excluded by the dispatcher's predicates)

  // === 0x444ed3: swizzle key + image template ===
  const bpFence = (heap.u16(esi0 + 4) & 0xf0) >>> 4;         // == 0 here (banner)
  const idxNib = rol16(((((e6 << 4) & 0xff) << 8) | e6) & 0xffff, rot & 31) & 0xf;
  heap.setU32(0x99a4e8, heap.u32(0x630b48 + idxNib * 8) >>> 0);
  heap.setU32(0x630b2c, heap.u32(0x630b4c + idxNib * 8) >>> 0);
  const ax2 = (rol16(((((e6 >> 4) & 0xff) << 8) | e6) & 0xffff, rot & 31) >>> 4) & 0xf0;
  const key = (idxNib | ax2) >>> 0;
  cpu.regs.eax = ax2 >>> 0;
  cpu.regs.edi = key >>> 0;

  // === sprite-id base (ebx) ===
  let ebxV;
  if ((e4 & 4) !== 0) {
    ebxV = ((((e4 + ecx0) & 3) >>> 0) + 0x10) >>> 0;
  } else {
    ebxV = heap.u8(0x6309c0 + key);
  }
  let ebpIdx = (bpFence << 1) >>> 0;
  let esiR = esi0;
  if ((f8c & 1) !== 0) {
    while ((heap.u8(esiR) & 0x3c) !== 0) {
      esiR = (esiR + 8) >>> 0;
      if ((heap.u8(esiR - 7) & 0x80) !== 0) { ebpIdx = (ebpIdx + 1) >>> 0; break; }
    }
  }
  ebxV = (ebxV + heap.u32(0x630acc + ebpIdx * 4)) >>> 0;
  const f84 = heap.u16(0x991f84);
  if ((f84 & 1) === 0) {
    heap.setU32(0x99a4e8, 0x30003);
    heap.setU32(0x630b2c, 0x1a001a);
  }
  cpu.regs.ebx = ebxV;
  cpu.regs.esi = esiR;

  const camRot = heap.u32(0x991f88) >>> 0;

  const stageAndCall = (ebxVal, al, cl, ah, di16, si16, dxAdd, attachTable) => {
    lo8("eax", al);
    lo8("ecx", cl);
    lo16("edi", di16);
    lo16("esi", si16);
    hi8("eax", ah);
    heap.setU16(0x99a4ec, ((cpu.regs.edx & 0xffff) + dxAdd) & 0xffff);
    cpu.regs.ebx = ebxVal >>> 0;
    cpu.regs.ebp = camRot;
    const attach = attachTable && (heap.u32(0x628928) >>> 0) !== 0;
    paintBody432204(heap, cpu, camRot & 3, attach);
  };

  // === 0x444f7e: branch select — cliff-corner overlay vs default paint ===
  const c40 = heap.u16(0x630c40);
  let overlay = false;
  if ((c40 & 1) !== 0 && (f84 & 1) !== 0 && (f8c & 1) === 0) {
    cpu.regs.edi = dpi;                                      // 0x444fab reload
    overlay = heap.u16(dpi + 0x0e) === 0;
  }
  if (overlay) {
    cpu.regs.esi = esi0;                                     // 0x444fbd: esi=[esp+0xc]
    let firstEbx;
    if ((e4 & 4) === 0) {
      firstEbx = (heap.u8(0x630c42 + (key & 0xf)) + 0x20265889) >>> 0;
    } else {
      firstEbx = (((e4 + rot) & 3) + 0x2026588b) >>> 0;
    }
    stageAndCall(firstEbx, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, false);
    stageAndCall(ebxV, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, true);
  } else {
    stageAndCall(ebxV, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, false);
  }

  // === 0x4450e3: pop ebp (key), pop ecx; edi = dpi; zoom<=1 guaranteed ===
  cpu.regs.ebp = key >>> 0;
  cpu.regs.ecx = ecx0;
  cpu.regs.edi = dpi;
  heap.setU8(0x991f78, 7);
  cpu.regs.esi = esi0;                                       // mov esi,[esp]
  cpu.regs.ebx = 0;                                          // bl=[esi+5]&0xf == 0
  // === 0x44635d (door case 0), (e4&0xf0)==0 slope-case dispatch ===
  heap.setU8(0x991f78, 6);
  cpu.regs.ebp = key & 0xf;
  const blocks = (e4 & 4) === 0
    ? CASE0_PLAIN[key & 0xf]
    : CASE0_ALT[(e4 + heap.u8(0x991f88)) & 3];
  for (const b of blocks) {
    heap.setU16(0x99a4e8, b.e8);
    heap.setU16(0x99a4ea, b.ea);
    stageAndCall(b.ebx, b.al, b.cl, b.ah, b.di, b.si, 2, false);
  }
  // join 0x446c5c: pop esi / pop ebp / pop ecx
  cpu.regs.esi = esi0;
  cpu.regs.ebp = key >>> 0;
  cpu.regs.ecx = ecx0;

  // === 0x446c5f: test [esi+4],8 → taken; banner glue 0x446c69..0x446de4 ===
  heap.setU8(0x991f78, 3);
  // 0x446c70: push ecx / push edx / push ebp / push esi (restored below)
  const dxSave = cpu.regs.edx >>> 0;                         // pop edx @0x446ddb
  const dir6 = (heap.u8(esi0) >>> 6) & 0xff;                 // al=[esi]; shr al,6
  // mov ah,[esi+4]; test ah,4; (ah&3)==al → add dx,0x10 (camera-facing lift)
  if ((e4 & 4) !== 0 && (e4 & 3) === dir6) {
    lo16("edx", ((cpu.regs.edx & 0xffff) + 0x10) & 0xffff);
  }
  // add cl,al ; and ecx,3 → banner direction index
  const bDir = ((ecx0 & 0xff) + dir6) & 3;
  // mov eax,[bDir*8+0x630c20]; [0x99a4e8]=eax (u32)
  let eaxT = heap.u32(0x630c20 + bDir * 8) >>> 0;
  heap.setU32(0x99a4e8, eaxT);
  // add dx,2 ; [0x99a4ec]=dx ; sub dx,2
  heap.setU16(0x99a4ec, ((cpu.regs.edx & 0xffff) + 2) & 0xffff);
  // ebx = bDir*2 + 0x572b; push ecx; stage al=0,cl=0,di=1,si=1,ah=0x15;
  // ebp=[0x991f88]; call [4*ebp+0x432204]; pop ecx
  cpu.regs.eax = eaxT;
  cpu.regs.ecx = bDir >>> 0;
  cpu.regs.ebx = (bDir * 2 + 0x572b) >>> 0;
  lo8("eax", 0); lo8("ecx", 0); lo16("edi", 1); lo16("esi", 1); hi8("eax", 0x15);
  cpu.regs.ebp = camRot;
  paintBody432204(heap, cpu, camRot & 3, false);
  cpu.regs.ecx = bDir >>> 0;                                 // pop ecx
  // second sprite of the pair: eax=[bDir*8+0x630c24]; ebx=bDir*2+0x572c
  eaxT = heap.u32(0x630c24 + bDir * 8) >>> 0;
  heap.setU32(0x99a4e8, eaxT);
  cpu.regs.eax = eaxT;
  cpu.regs.ebx = (bDir * 2 + 0x572c) >>> 0;
  lo8("eax", 0); lo8("ecx", 0); lo16("edi", 1); lo16("esi", 1); hi8("eax", 0x15);
  cpu.regs.ebp = camRot;
  paintBody432204(heap, cpu, camRot & 3, false);
  cpu.regs.ecx = bDir >>> 0;                                 // pop ecx
  cpu.regs.esi = esi0;                                       // pop esi @0x446d06
  // dec ecx ; cmp ecx,2 ; jae 0x446dda  (32-bit dec: dir 0 → 0xffffffff)
  cpu.regs.ecx = (bDir - 1) >>> 0;
  if (bDir === 1 || bDir === 2) {
    // fall through to 0x446d11: movzx esi,[esi+7]; cmp si,0xff; je 0x446dda.
    // The dispatcher guarantees [esi0+7]==0xff here (else: interp fallback).
    cpu.regs.esi = heap.u8(esi0 + 7);                        // = 0xff, clobber
  }
  // 0x446dda: pop ebp / pop edx / pop ecx; [0x991f78]=6; jmp 0x447bcc
  cpu.regs.ebp = key >>> 0;
  cpu.regs.edx = dxSave >>> 0;
  cpu.regs.ecx = ecx0;
  heap.setU8(0x991f78, 6);

  // === tail 0x447bcc (copy of the validated crib tail; dx read live) ===
  cpu.regs.esi = esi0;                                       // mov esi,[esp]
  const dxT = cpu.regs.edx & 0xffff;                         // live dx at tail
  const blT = (((e4 + rot) & 3) | (e4 & 4)) & 0xff;
  cpu.regs.ebx = ((cpu.regs.ebx & 0xffff0000) | ((e4 & 4) << 8) | blT) >>> 0;
  const ringStore = (base, ctrAddr, lowByte, ahVal) => {
    const idx = heap.u8(ctrAddr);
    cpu.regs.edi = idx >>> 0;
    const eaxV = (0xffff0000 | (ahVal << 8) | (lowByte & 0xff)) >>> 0;
    cpu.regs.eax = eaxV;
    heap.setU32(base + idx * 2, eaxV);
    heap.setU8(ctrAddr, (idx + 1) & 0xff);
  };
  if ((key & 2) !== 0) {
    if (blT === 5) ringStore(0x999fdc, 0x99c166, (((dxT + 0x10) & 0xffff) >>> 4) & 0xff, 0x0a);
    else if ((key & 1) !== 0) ringStore(0x999fdc, 0x99c166, (dxT >>> 4) & 0xff, 0x0b);
    else ringStore(0x999fdc, 0x99c166, (dxT >>> 4) & 0xff, 0x0a);
  }
  if ((key & 4) !== 0) {
    if (blT === 6) ringStore(0x999f9a, 0x99c165, (((dxT + 0x10) & 0xffff) >>> 4) & 0xff, 0x0a);
    else if ((key & 8) !== 0) ringStore(0x999f9a, 0x99c165, (dxT >>> 4) & 0xff, 0x0b);
    else ringStore(0x999f9a, 0x99c165, (dxT >>> 4) & 0xff, 0x0a);
  }

  // === 0x447ce0: supports painter (push ecx/ebp; call 0x4238b4; pops) ===
  cpu.regs.esi = esi0;
  let axSup = 0;
  if ((e4 & 4) !== 0) axSup = (((e4 + rot) & 3) + 0x19) & 0xffff;
  lo16("eax", axSup);
  cpu.regs.ebx = (key & 0xf) >>> 0;
  cpu.regs.edi = heap.u8(0x630c42 + (key & 0xf)) !== 0 ? 1 : 0;
  cpu.regs.ebp = 0x20260000;
  {
    // Run the supports painter through the interpreter entry point; the
    // install4238b4Hook JS fast-path handles it (same route the crib takes).
    const sESP = cpu.regs.esp >>> 0;
    const sEIP = cpu.regs.eip >>> 0;
    const sCD = cpu.callDepth;
    runFunction(cpu, 0x004238b4, { stackTop: sESP, limit: 5_000_000 });
    cpu.regs.esp = sESP;
    cpu.regs.eip = sEIP;
    cpu.callDepth = sCD;
  }
  cpu.regs.ebp = key >>> 0;                                  // pop ebp
  cpu.regs.ecx = ecx0;                                       // pop ecx

  // === 0x447d2e: height-max update + segment-clear cascade ===
  cpu.regs.esi = esi0;                                       // mov esi,[esp]
  lo16("eax", heap.u16(0x991f72));
  const dxLive = cpu.regs.edx & 0xffff;                      // dx AFTER 0x4238b4
  lo16("ebx", (dxLive >>> 2) & 0xffff);
  lo16("ecx", heap.u16(0x991f76));
  let dxF = (dxLive + 0x20) & 0xffff;
  if ((e4 & 4) !== 0) dxF = (dxF + 0x10) & 0xffff;
  lo16("edx", dxF);
  if (sx16(heap.u16(0x991f28)) < sx16(dxF)) {
    heap.setU16(0x991f28, dxF);
    heap.setU8(0x991f2a, 0x20);
  }
  const clearSeg = (a) => heap.setU16(a, 0xffff);
  // (e4&0xf0)==0 always here (banner precondition) → first cascade branch
  clearSeg(0x991f14); clearSeg(0x991f18); clearSeg(0x991f1c); clearSeg(0x991f20);
  clearSeg(0x991f24); clearSeg(0x991f04); clearSeg(0x991f10); clearSeg(0x991f08);
  clearSeg(0x991f0c);
  // exit flags from `test [esi+4],0xf0` (taken je → ZF=1)
  cpu.eflags.CF = 0; cpu.eflags.OF = 0; cpu.eflags.ZF = 1; cpu.eflags.SF = 0;
  cpu.regs.esi = esi0;                                       // pop esi; ret
}

let _statsHooked = false;

export function FUN_00444e08(heap) {
  const cpu = state.__painterCpu;
  if (!cpu) throw new Error("444e08: painter-bridge cpu not installed");

  // Entry state: translator register cells are authoritative (the oracle and
  // any fnDispatch wiring stage them); mirror into the bridge cpu, which the
  // JS bodies and the embedded-interpreter fallback operate on.
  cpu.regs.eax = regs.eax >>> 0;
  cpu.regs.ebx = regs.ebx >>> 0;
  cpu.regs.ecx = regs.ecx >>> 0;
  cpu.regs.edx = regs.edx >>> 0;
  cpu.regs.esi = regs.esi >>> 0;
  cpu.regs.edi = regs.edi >>> 0;
  cpu.regs.ebp = regs.ebp >>> 0;
  if (typeof regs.esp === "number") cpu.regs.esp = regs.esp >>> 0;
  const entryEsp = cpu.regs.esp >>> 0;
  const entryEip = cpu.regs.eip >>> 0;
  const entryCD = cpu.callDepth;

  const esi0 = cpu.regs.esi >>> 0;
  const cl0 = cpu.regs.ecx & 0xff;
  const e4 = heap.u8(esi0 + 4);
  const e5 = heap.u8(esi0 + 5);
  const dpi = heap.u32(DAT_DPI) >>> 0;
  const zoom = heap.u16(dpi + 0x0e);
  const f8c = heap.u16(0x991f8c);

  // Cold-path predicates — all depend only on entry state the body never
  // mutates, so the routing decision is safe to take before any side effect.
  const shade = (f8c & 0x40) !== 0 && zoom === 0;            // 0x444e7c → 431bb8
  const door = !shade && zoom <= 1 && (e5 & 0x0f) !== 0;     // 0x445106 cases 1..13
  const banner = !shade && !door && zoom <= 1
    && (e4 & 0xf0) === 0 && (e4 & 8) !== 0;                  // 0x446c5f
  let scrollText = false;
  if (banner) {
    // 0x446d07: dec ecx; cmp ecx,2; jae skip — dir index (cl+([esi]>>6))&3
    const bDir = (cl0 + (heap.u8(esi0) >>> 6)) & 3;
    scrollText = (bDir === 1 || bDir === 2) && heap.u8(esi0 + 7) !== 0xff;
  }

  let path;
  try {
    if (shade || door || scrollText) {
      path = shade ? "interpShade" : door ? "interpDoor" : "interpScrollText";
      runInterpBody(heap, cpu);
    } else if (banner) {
      path = "jsBanner";
      bannerWallBody(heap, cpu);
    } else {
      path = "jsMain";
      const handled = paintBody444e08(heap, cpu, runFunction);
      if (!handled) {
        // Predicate drift safety net — should be unreachable; run the truth.
        path = "interpSafetyNet";
        runInterpBody(heap, cpu);
      }
    }
  } finally {
    // Leave the cpu positioned exactly as the hook found it; the caller
    // (oracle harness / production hook wrapper) simulates the final ret.
    cpu.regs.esp = entryEsp;
    cpu.regs.eip = entryEip;
    cpu.callDepth = entryCD;
  }

  // Exit registers back into the translator cells (oracle compares eax +
  // callee-saved/ecx informationally).
  regs.eax = cpu.regs.eax >>> 0;
  regs.ebx = cpu.regs.ebx >>> 0;
  regs.ecx = cpu.regs.ecx >>> 0;
  regs.edx = cpu.regs.edx >>> 0;
  regs.esi = cpu.regs.esi >>> 0;
  regs.edi = cpu.regs.edi >>> 0;
  regs.ebp = cpu.regs.ebp >>> 0;

  // Opt-in path coverage counters (DBG444E08=1): reported per soak so cold
  // vs hot routing is measurable, zero-cost otherwise.
  if (typeof process !== "undefined" && process.env && process.env.DBG444E08) {
    const s = (globalThis.__stats444e08 ||= {});
    s[path] = (s[path] || 0) + 1;
    if (!_statsHooked) {
      _statsHooked = true;
      process.on("exit", () => console.error("[444e08 stats]", JSON.stringify(globalThis.__stats444e08)));
    }
  }
}

// @manual — do not regenerate.
//
// FUN_extra_peepstate_439b86 — peep-state handler "walking" (vtable
// PTR_LAB_0062d4ac[ [peep+0x2b] ], dispatched from FUN_00439822's tail via
// callIndirect). Previously bridged whole through the x86 interpreter
// (lifter/extra-entries.json); ranked #1 interpreter consumer after the
// painter campaign (9,170 steps/tick).
//
// CODESEG body 0x439b86..0x43a106 (ret). No Ghidra C (the address is an
// extra entry); transcribed from the capstone disassembly. Structure:
//
//   1. inline call 0x439219 (peep tile-presence check, 1-in-16 subtick
//      gate): wrong subtick → continue; tile element gone → 44142c +
//      [esi+0x2b]=0 + 441452 and EARLY RET (the binary signals this exit
//      with ZF=1 → `je 0x43a106`); found → continue.
//   2. three emote blocks ([esi+0xc8] bits 0x10/0x40/0x80 → action ids
//      0x18/0x19/0x1c): rand<=0x3a8 gate, 5e53ca invalidate pair around
//      43c60b action-sprite refresh.
//   3. litter drop ([esi+0xca] bits 0x1c00, on-path, tick-phase match,
//      rand<=0x1000): bsf bit → btr; 0x4420e0 thought update; litter
//      type from [bitIdx+0x5f8064]; 0x42e062 creates the litter sprite.
//   4. call 0x43c751 (walking-movement core, 707 lines of untranslated
//      Ghidra C) — interpreter-delegated; then the [0x62d3f4]&1 gate.
//   5. water-float block ([esi+0x29]&0x18 == 8): snap sprite z to the
//      surface element's water level via 5e53ca/444927/5e53ca, then
//      44142c + state 0 + 441452 and ret.
//   6. stat decay trio 0x4428d6 / 0x442816 / 0x442867.
//   7. bench-sit seek (path-addition flag [0x630cb7]&8): free-edge pick
//      via rand, seat-occupancy scan over the tile's sprite quadrant
//      (0x991f8e table, sprites at 0x743b94 stride 0x100) → state 8,
//      target = tile center + [0x62d3d4] seat offsets.
//   8. bin-use seek ([0x630cb7]&4): bin-fullness byte [path+7] rotated
//      by 2*dir, free-edge pick → state 0x14, [0x632f98] offsets.
//   9. watch-ride seek ([0x630cb7]&0x10): no other watcher within 0xe0,
//      railing variant from [0x630cc5], invalidate via 5e59ec,
//      [esi+0xf3]=0x10.
//
// INTERPRETER-DELEGATED SUB-CALLS (callNative): 0x43c751 (untranslated),
// 0x4420e0 + 0x42e062 (translations contain risky extraout plumbing),
// and the stat trio 0x4428d6/0x442816/0x442867 — whose SHIPPING
// translations were found divergent from the binary while building this
// port's lockstep oracle (left as-is for their other callers; catalogued
// in PORTING-ROADMAP.md ADDENDUM 3):
//   - 442816: `dec byte [esi+0xc6]` lowered as heap.setU32 (corrupts
//     0xc7..0xc9 with sign-extension bytes — CLAUDE.md bug class #1);
//     drops the `mov al,0x17; mov ah,[esi+0xc5]` staging before 440fe3
//     and the `mov bx,[esi+0xa]; mov ax,0xc97` staging before 5e5301.
//   - 442867: same dropped 440fe3 staging (al=0x1b/ah=0xff) + 42c711
//     staging; dec-byte translated correctly there, gate values OK.
//   - 4428d6: `cmp word [0x87d7a0],2` read as u32; dropped 440fe3
//     staging (al=0x10/ah=0xff).
// UPDATE 2026-06-11: the stat-trio translations (and the 440fe3
// action-table read they route through) were hand-fixed — oracle:
// tools/_lockstep-statrio.mjs — and the trio now runs as JS via
// fnDispatch (interpreter reachable behind __forceInterpStatTrio).
// 0x43c751 is now the JS hand-port extra_peepwalk_43c751.js, reached
// via its fnDispatch entry (interpreter behind __forceInterp43c751).
//
// REGISTER FIDELITY: the walking core 0x43c751 consumes caller registers
// (Ghidra: unaff_EBX/unaff_EBP live-in — sound-pan packing and the
// CONCAT22 at line 167), so the port tracks the binary's exact register
// dataflow from entry to that call. Every callee on the way preserves
// all GPRs per its binary push/pop discipline EXCEPT 5df40c (clobbers
// only eax — by design, it's the RNG): 5e53ca and 42e062 are
// pushal/popal, 43c60b is push ebx + inner push eax/edx pairs, 4420e0
// pushes eax/edi + ebx/ecx/edx + pushal around its effect spawn. The JS
// callee calls are therefore wrapped with a full regs save/restore
// (callPreserved) so translated-JS internal regs pollution can't leak
// into the tracked state; callNative delegations return the exact
// interpreter exit registers by construction.
//
// Exit-register note: the production caller (439822) consumes ONLY the
// return value (regs.eax = callIndirect(...) as a tail call); the heap
// write-set is the correctness surface. Oracle:
// tools/_lockstep-439b86.mjs (whole-heap per-call compare vs the
// interpreter shim) + tools/painter-port-oracle.mjs dual soak.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
import { FUN_005df40c } from "./5df40c.js";
import { invalidateSpriteBbox } from "./extra_invalidate.js";  // faithful 5e53ca (the translated 5e53ca.js marks a stale dirty-grid rect — see extra_invalidate.js)
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005e59ec } from "./5e59ec.js";

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { n &= 15; return ((v >>> n) | (v << (16 - n))) & 0xffff; }
function ror8(v, n) { n &= 7; return ((v >>> n) | (v << (8 - n))) & 0xff; }
const lo16 = (r, v) => { regs[r] = ((regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const lo8 = (r, v) => { regs[r] = ((regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (r, v) => { regs[r] = ((regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };

// Run a JS callee whose binary preserves all GPRs: save the full regs
// state, call, restore — so translated-JS internal `regs.eax = …`
// pollution can't perturb the tracked register dataflow.
function callPreserved(heap, fn) {
  const eax = regs.eax, ecx = regs.ecx, edx = regs.edx, ebx = regs.ebx;
  const esi = regs.esi, edi = regs.edi, ebp = regs.ebp;
  const ret = fn(heap);
  regs.eax = eax; regs.ecx = ecx; regs.edx = edx; regs.ebx = ebx;
  regs.esi = esi; regs.edi = edi; regs.ebp = ebp;
  return ret;
}

// RNG: binary clobbers eax only (push ebx … pop ebx).
function rand32(heap) {
  return (regs.eax = callPreserved(heap, FUN_005df40c) >>> 0) >>> 0;
}

// Tile-pointer index from packed coords: ror16(rol16(cx,7)|ax, 5).
function tileIndex(heap, esi) {
  return ror16((rol16(heap.u16(esi + 0x26), 7) | heap.u16(esi + 0x24)) & 0xffff, 5);
}

// Scan the tile's element chain for a PATH element ([p]&0x3c == 4) whose
// base height matches [esi+0x28]. Mirrors the loop at 0x439db8 (and the
// identical copies at 0x439f1e / 0x43a042): test current, then advance,
// stop after the element whose +1 byte has bit 0x80 (chain end).
function pathScan(heap, esi) {
  let p = heap.u32(0x971ef4 + tileIndex(heap, esi) * 4) >>> 0;
  const dl = heap.u8(esi + 0x28);
  for (;;) {
    if ((heap.u8(p) & 0x3c) === 4 && dl === heap.u8(p + 2)) return p;
    const last = (heap.u8(p + 1) & 0x80) !== 0;
    p = (p + 8) >>> 0;
    if (last) return 0;
  }
}

export function FUN_extra_peepstate_439b86(heap) {
  const esi = regs.esi >>> 0;     // peep sprite ptr

  // === inline FUN_00439219 (0x439219) — the caller's `je 0x43a106`
  // takes the ZF=1 exit, which only the element-gone path produces ===
  heap.setU8(esi + 0xc4, (heap.u8(esi + 0xc4) + 1) & 0xff);
  const sub16 = heap.u16(esi + 0xa);
  if ((sub16 & 0xf) === (heap.u8(esi + 0xc4) & 0xf)) {
    // 0x439233: ax=[esi+0x24]; cx=tile-index; dl=[esi+0x28]; edi=chain
    lo16("eax", heap.u16(esi + 0x24));
    lo16("ecx", tileIndex(heap, esi));
    const want = (heap.u8(esi + 0x29) & 0x18) === 0 ? 4 : 0;
    const dl = heap.u8(esi + 0x28);
    lo8("edx", dl);
    lo8("ebx", want);
    let p = heap.u32(0x971ef4 + tileIndex(heap, esi) * 4) >>> 0;
    for (;;) {
      const typ = heap.u8(p) & 0x3c;
      hi8("edx", typ);                       // mov dh,[edi]; and dh,0x3c
      if (typ === want && dl === heap.u8(p + 2)) break;   // found → continue
      const last = (heap.u8(p + 1) & 0x80) !== 0;
      p = (p + 8) >>> 0;
      if (last) {
        regs.eax = FUN_0044142c(heap) | 0;
        heap.setU8(esi + 0x2b, 0);
        regs.eax = FUN_00441452(heap) | 0;
        return regs.eax;                     // ZF=1 exit → je 0x43a106
      }
    }
    regs.edi = p;                            // found element ptr
  } else {
    // 0x43921f..0x439232: ax=[esi+0xa] with al&=0xf; bl=[esi+0xc4]&0xf
    lo16("eax", (sub16 & 0xff00) | (sub16 & 0xf));
    lo8("ebx", heap.u8(esi + 0xc4) & 0xf);
  }

  // === emote blocks 0x439b91 / 0x439bc8 / 0x439bff ===
  const emote = (bit, actionId) => {
    if ((heap.u16(esi + 0xc8) & bit) !== 0 && heap.u8(esi + 0x71) >= 0xfe) {
      if ((rand32(heap) & 0xffff) <= 0x3a8) {
        invalidateSpriteBbox(heap);
        heap.setU8(esi + 0x71, actionId);
        heap.setU8(esi + 0x72, 0);
        heap.setU8(esi + 0x70, 0);
        callPreserved(heap, FUN_0043c60b);
        invalidateSpriteBbox(heap);
      }
    }
  };
  emote(0x10, 0x18);
  emote(0x40, 0x19);
  emote(0x80, 0x1c);

  // === litter drop 0x439c36 ===
  if ((heap.u16(esi + 0xca) & 0x1c00) !== 0 && (heap.u8(esi + 0x29) & 0x18) === 0) {
    lo16("eax", heap.u16(esi + 0xa) & 0x1ff);
    const tick = heap.u32(0x88741c) >>> 0;
    regs.ebx = ((tick & 0xffff0000) | (tick & 0x1ff)) >>> 0;   // mov ebx,[..]; and bx,0x1ff
    if ((regs.eax & 0xffff) === (regs.ebx & 0xffff)) {
      if ((rand32(heap) & 0xffff) <= 0x1000) {
        // mov ax,[esi+0xca]; and ax,0x1c00; bsf bx,ax; btr [esi+0xca],bx
        const bits = heap.u16(esi + 0xca) & 0x1c00;
        lo16("eax", bits);
        let bitIdx = 10;
        while (((bits >> bitIdx) & 1) === 0) bitIdx++;
        lo16("ebx", bitIdx);
        heap.setU16(esi + 0xca, heap.u16(esi + 0xca) & ~(1 << bitIdx) & 0xffff);
        heap.setU8(esi + 0x45, heap.u8(esi + 0x45) | 8);
        callNative(0x4420e0, []);            // thought update (preserves all GPRs)
        regs.ebx = bitIdx;                   // movzx ebx,bx
        lo16("ebp", heap.u8(0x5f8064 + bitIdx));   // movzx bp,[ebx+0x5f8064]
        const rnd = rand32(heap);
        regs.ebx = rnd;                      // mov ebx,eax
        lo16("eax", (((rnd & 7) - 3) + heap.u16(esi + 0xe)) & 0xffff);
        lo16("ecx", ((((rnd >>> 3) & 7) - 3) + heap.u16(esi + 0x10)) & 0xffff);
        lo16("edx", heap.u16(esi + 0x12));
        regs.ebx = (rnd >>> 6) & 3;          // shr ebx,6; and ebx,3 → direction
        callNative(0x42e062, []);            // create litter sprite (pushal/popal)
      }
    }
  }

  // === call 0x43c751 (walking-movement core) — via the fnDispatch entry
  // (JS hand-port extra_peepwalk_43c751.js; interpreter behind
  // __forceInterp43c751). Entry registers are binary-exact per the
  // tracking above (43c751 consumes caller ebx/ebp). ===
  state.fnDispatch.get(0x43c751)(heap);
  if ((heap.u16(0x62d3f4) & 1) === 0) return regs.eax;

  // === water-float block 0x439ce6 ([esi+0x29]&0x18 == 8) ===
  if ((heap.u8(esi + 0x29) & 0x18) === 8) {
    // find the SURFACE element of the peep's tile
    let surf = heap.u32(0x971ef4 + tileIndex(heap, esi) * 4) >>> 0;
    while ((heap.u8(surf) & 0x3c) !== 0) surf = (surf + 8) >>> 0;
    if ((heap.u8(surf + 5) & 0x1f) !== 0) {
      lo16("eax", heap.u16(esi + 0x0e));
      lo16("ecx", heap.u16(esi + 0x10));
      lo16("edx", heap.u16(esi + 0x12));
      invalidateSpriteBbox(heap);             // invalidate at old z (binary 5e53ca: pushal/popal, no reg effects)
      // mov dl,[edi+5]; and dx,0x1f; shl dx,4 — new z from water level
      lo16("edx", ((heap.u8(surf + 5) & 0x1f) << 4) & 0xffff);
      callPreserved(heap, FUN_00444927);     // move sprite (reads ax/cx/dx)
      invalidateSpriteBbox(heap);             // invalidate at new z
      regs.eax = FUN_0044142c(heap) | 0;
      heap.setU8(esi + 0x2b, 0);
      regs.eax = FUN_00441452(heap) | 0;
      return regs.eax;                       // jmp 0x43a106
    }
  }

  // === stat decay trio 0x439d58 — JS (the translations' corruptions are
  // fixed: see 442816/442867/4428d6.js headers + the 440fe3 action-table
  // fix; oracle: tools/_lockstep-statrio.mjs). The interpreter stays
  // reachable behind __forceInterpStatTrio for the oracles. Calls go
  // through fnDispatch so the lockstep can wrap them per-call. ===
  if (globalThis.__forceInterpStatTrio) {
    callNative(0x4428d6, []);
    callNative(0x442816, []);
    callNative(0x442867, []);
  } else {
    state.fnDispatch.get(0x4428d6)(heap);
    state.fnDispatch.get(0x442816)(heap);
    state.fnDispatch.get(0x442867)(heap);
  }

  // === bench-sit gate 0x439d67 ===
  let benchSeek = false;
  if ((heap.u16(esi + 0xca) & 0xa3e0) !== 0 &&
      (heap.u8(esi + 0x3e) < 0x80 || heap.u8(esi + 0x3a) < 0x80)) {
    benchSeek = true;
  } else if (heap.u8(esi + 0x3c) > 0xaa) {
    benchSeek = true;
  } else if (heap.u8(esi + 0x38) <= 0x32) {
    benchSeek = true;
  }
  if (benchSeek && (heap.u8(esi + 0x29) & 0x1c) === 0) {
    // === bench scan 0x439d98 ===
    const path = pathScan(heap, esi);
    if (path !== 0 &&
        (heap.u8(0x630cb7 + (heap.u8(path + 5) & 0xf)) & 8) !== 0) {
      const edges = (heap.u8(path + 6) & 0xf) ^ 0xf;   // free-corner mask
      if (edges !== 0) {
        let dir = rand32(heap) & 3;
        while (((edges >> dir) & 1) === 0) dir = (dir + 1) & 3;   // bt/inc loop
        // seat-occupancy scan over the tile's sprite quadrant
        const x = heap.u16(esi + 0x0e), y = heap.u16(esi + 0x10);
        const z = heap.u16(esi + 0x12);
        let freeSeats = 3;
        let cur = heap.u16(0x991f8e + (((x & 0xfe0) << 2) | (y >>> 5)) * 2);
        while (cur !== 0xffff) {
          const sp = ((cur << 8) + 0x743b94) >>> 0;
          if (heap.u8(sp + 8) === 4 && heap.u8(sp + 0x2b) === 8 &&
              z === heap.u16(sp + 0x12) && dir === (heap.u8(sp + 0x37) & 3)) {
            // btr ebp, ([sp+0x37]&4)>>2
            freeSeats &= ~(1 << ((heap.u8(sp + 0x37) & 4) >>> 2));
          }
          cur = heap.u16(sp + 2);
        }
        if (freeSeats !== 0) {
          let pick = freeSeats ^ 3;                    // xor ebp,3
          if (pick === 0) {                            // both free → rand bit 27
            const sv = regs.eax >>> 0;                 // push eax
            const hit = (rand32(heap) & 0x8000000) !== 0;
            regs.eax = sv;                             // pop eax
            if (hit) pick = 1;
          }
          heap.setU8(esi + 0x37, (((pick & 1) << 2) | dir) & 0xff);
          regs.eax = FUN_0044142c(heap) | 0;
          heap.setU8(esi + 0x2b, 8);                   // state: sitting
          regs.eax = FUN_00441452(heap) | 0;
          heap.setU8(esi + 0x2c, 0);
          const k = heap.u8(esi + 0x37) & 7;
          heap.setU16(esi + 0x32, ((x & 0xffe0) + heap.u16(0x62d3d4 + k * 4)) & 0xffff);
          heap.setU16(esi + 0x34, ((y & 0xffe0) + heap.u16(0x62d3d6 + k * 4)) & 0xffff);
          heap.setU8(esi + 0x36, 3);
          return regs.eax;                             // ret 0x439ee4
        }
      }
    }
  }

  // === bin-use 0x439ee5 ===
  if ((heap.u16(esi + 0xca) & 0x1c00) !== 0 && (heap.u8(esi + 0x29) & 0x18) === 0) {
    const path = pathScan(heap, esi);
    if (path !== 0 &&
        (heap.u8(0x630cb7 + (heap.u8(path + 5) & 0xf)) & 4) !== 0) {
      const edges = (heap.u8(path + 6) & 0xf) ^ 0xf;
      if (edges !== 0) {
        const fullness = heap.u8(path + 7);            // mov cl,[edi+7]
        const rnd = rand32(heap);
        let dir = rnd & 3;
        let rot = ror8(fullness, (2 * dir) & 7);       // ror al,cl twice
        let found = -1;
        for (let k = 0; k < 4; k++) {                  // bp=4 countdown
          if ((rot & 3) !== 0 && ((edges >> dir) & 1) !== 0) { found = dir; break; }
          dir = (dir + 1) & 3;
          rot = ror8(rot, 2);
        }
        if (found >= 0) {
          heap.setU8(esi + 0x37, found & 0xff);
          regs.eax = FUN_0044142c(heap) | 0;
          heap.setU8(esi + 0x2b, 0x14);                // state: using bin
          regs.eax = FUN_00441452(heap) | 0;
          heap.setU8(esi + 0x2c, 0);
          const k = heap.u8(esi + 0x37) & 3;
          const x = heap.u16(esi + 0x0e), y = heap.u16(esi + 0x10);
          heap.setU16(esi + 0x32, ((x & 0xffe0) + heap.u16(0x632f98 + k * 4)) & 0xffff);
          heap.setU16(esi + 0x34, ((y & 0xffe0) + heap.u16(0x632f9a + k * 4)) & 0xffff);
          heap.setU8(esi + 0x36, 3);
          return regs.eax;                             // ret 0x439fce
        }
      }
    }
  }

  // === watch-ride 0x439fcf ===
  if (heap.u8(esi + 0x3a) >= 0x30) return regs.eax;
  if (heap.u8(esi + 0x38) < 0x55) return regs.eax;
  if (heap.u8(esi + 0x2b) !== 5) return regs.eax;
  if ((heap.u8(esi + 0xe1) & 0xc0) !== 0xc0 &&
      (heap.u8(esi + 0xe3) & 0xc0) !== 0xc0) return regs.eax;
  if ((rand32(heap) & 0xffff) > 0xccc) return regs.eax;
  if ((heap.u8(esi + 0x29) & 0x18) !== 0) return regs.eax;
  const path = pathScan(heap, esi);
  if (path === 0) return regs.eax;
  if ((heap.u8(0x630cb7 + (heap.u8(path + 5) & 0xf)) & 0x10) === 0) return regs.eax;
  // no other guest already watching within 0xe0 (chebyshev)
  let g = heap.u16(0x87c398);
  while (g !== 0xffff) {
    const sp = ((g << 8) + 0x743b94) >>> 0;
    if (heap.u8(sp + 0x2e) === 1 && heap.u8(sp + 0x2f) === 2) {
      const gx = heap.u16(sp + 0x0e);
      if (gx !== 0x8000) {
        let dxa = (gx - heap.u16(esi + 0x0e)) & 0xffff;
        if (dxa & 0x8000) dxa = (-dxa) & 0xffff;
        let dya = (heap.u16(sp + 0x10) - heap.u16(esi + 0x10)) & 0xffff;
        if (dya & 0x8000) dya = (-dya) & 0xffff;
        const m = dxa > dya ? dxa : dya;
        if (m < 0xe0) return regs.eax;                 // someone's already there
      }
    }
    g = heap.u16(sp + 4);
  }
  // claim the railing: swap the path-addition variant byte
  const variant = heap.u8(0x630cc5 + (heap.u8(path + 5) & 0xf));
  heap.setU8(path + 5, ((heap.u8(path + 5) & 0xf0) | variant) & 0xff);
  // invalidate the tile (push edi/esi … call 5e59ec … pop esi/edi)
  {
    const svEsi = regs.esi >>> 0, svEdi = regs.edi >>> 0;
    lo16("eax", heap.u16(esi + 0x24));
    lo16("ecx", heap.u16(esi + 0x26));
    const dz = ((heap.u8(path + 2) << 2) & 0xffff);
    lo16("edi", dz);
    lo16("esi", (dz + 0x20) & 0xffff);
    regs.eax = FUN_005e59ec(heap) | 0;
    regs.esi = svEsi;
    regs.edi = svEdi;
  }
  heap.setU8(esi + 0xf3, 0x10);
  return regs.eax;                                     // ret 0x43a106
}

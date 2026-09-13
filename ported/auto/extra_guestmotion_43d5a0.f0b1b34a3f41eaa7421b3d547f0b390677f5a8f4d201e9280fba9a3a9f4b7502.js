// @manual — do not regenerate.
//
// FUN_extra_guestmotion_43d5a0 — guest motion handler (binary
// 0x43d5a0..0x43da7f). Dispatched per-peep-type via PTR [0x62d3fc]
// (type 0 = guest) from the walking core 0x43c751 when the current
// target point is reached (43c49e CF=0 exit): picks the peep's next
// walk target — corridor follow, junction choice (random / wide-path
// prune via the 43d464 walk scorer / pathfinding via 0x4415e6 toward
// a target ride station, the park gate, or the spawn points), and the
// off-path random wander. Ranked top gameplay interpreter consumer
// after the 43c751 port (3,977 steps/tick, ~4.5k steps/call).
//
// No Ghidra C exists for this address (jumptable target Ghidra never
// recovered) — transcribed from the capstone disassembly
// (CODESEG file off = va-0x41c000+0x1a600). Structure:
//
//   1. ([esi+0x29]&0x18)!=0 → off-path random wander (43d5ac): up to
//      3 random directions checked with the banner-fence test 0x43d404
//      (both tile sides) + terrain-walkable test 0x43c6b2 (both
//      inlined below); the 4th candidate is accepted unchecked.
//   2. on-path: find the PATH element at [esi+0x28] height on the
//      current tile (no element → the function's only CF=1 exit);
//      edges nibble [elem+6]&0xf minus the came-from direction.
//      Dead end → stat trio 4428d6/442816/442867 (JS, oracle-fixed in
//      283a209) then turn around; corridor → take the single edge.
//   3. junction, [esi+0x2a]!=0: state 0xd → pathfind to the park gate
//      ([0x87c3c2] target), state 0xe → pathfind to a spawn point
//      ([0x87c3ca]/[0x87c3d0] by sprite-index parity), else random.
//   4. junction, [esi+0x2a]==0: check-map action gate ([esi+0xca]&4 +
//      RNG bands, action 0x15 via 43c60b + sprite invalidate); wide-
//      path prune ([esi+0xca]&0xa3e0 clear + RNG >= 0x888: drop edges
//      whose 43d464 walk score <= 1, restore the set if all pruned);
//      then [esi+0xc8]&1 → gate pathfind, target ride [esi+0xc5] open
//      → nearest-station selection (second-best tracked in [0x6293ac],
//      preferred when ride flag 0x887496&0x20 + peep flag [esi+0x2f]&1)
//      staged into [0x6293bc/be/c0], [0x6293c8]=0xf0, pathfind 4415e6;
//      else random pick among the candidate edges.
//   5. accept (43d933): bounds-check the stepped tile (fail → random
//      wander), store direction [esi+0x78], target point
//      [esi+0x32/34] = tile center, [esi+0x36] = 2 (or RNG (al&7)+2
//      when not queuing).
//
// Delegated callee: 0x4415e6 (pathfind dispatcher; returns the chosen
// direction in EBP or -1) runs via callNative — ported/auto/4415e6.js
// is NOT used on this path (it has a goto-truncation early-return in
// its element-scan loop and never writes the EBP result this caller
// consumes). JS callees: 5df40c RNG (clobbers eax only), the stat trio
// + 43c60b under full snap/restore (their binary bodies preserve the
// registers this caller consumes; the binary call site additionally
// push/pops eax), 5e53ca via extra_invalidate (pushal/popal).
//
// Exit CF is consumed by the caller (extra_peepwalk reads
// state.__painterCpu.eflags.CF after the dispatch): CF=1 only on the
// no-path-element exit, CF=0 ('and eax,eax') everywhere else — set
// explicitly on the painter cpu at every exit.
//
// Wired at the extra_peepwalk_43c751.js dispatch site (handler ==
// 0x43d5a0). Native callers (bridged peep handlers running 0x43c751
// raw) keep executing the original bytes, same as the 43c751 port.
// __forceInterp43d5a0 keeps the interpreter path reachable for the
// oracles.
//
// Oracle: tools/_lockstep-43d5a0.mjs (whole-heap per-call compare vs
// the interpreter from identical entry state, interpreter kept live,
// exit regs + CF compared) + tools/painter-port-oracle.mjs dual soak
// (FORCE_INTERP=43d5a0).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_004428d6 } from "./4428d6.js";
import { FUN_00442816 } from "./442816.js";
import { FUN_00442867 } from "./442867.js";
import { invalidateSpriteBbox as invalidateSprite } from "./extra_invalidate.js";

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { n &= 15; return ((v >>> n) | (v << (16 - n))) & 0xffff; }
function abs16(v) { v &= 0xffff; return (v & 0x8000) ? (0x10000 - v) & 0xffff : v; }
function bsf(v) { return 31 - Math.clz32(v & -v); }
const lo16 = (r, v) => { regs[r] = ((regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const lo8 = (r, v) => { regs[r] = ((regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (r, v) => { regs[r] = ((regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };

const setCF = (v) => { if (state.__painterCpu) state.__painterCpu.eflags.CF = v ? 1 : 0; };

function snapRegs() {
  return { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
           esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
}
function restoreRegs(s) {
  regs.eax = s.eax; regs.ecx = s.ecx; regs.edx = s.edx; regs.ebx = s.ebx;
  regs.esi = s.esi; regs.edi = s.edi; regs.ebp = s.ebp;
}
function callPreserved(heap, fn) {
  const s = snapRegs();
  const ret = fn(heap);
  restoreRegs(s);
  return ret;
}
// RNG: binary clobbers eax only (push ebx … pop ebx). FUN_005df40c
// stages its result on regs.eax (it has no JS return value) — capture
// it BEFORE restoring the snapshot. (extra_peepwalk_43c751.js
// originally piped callPreserved's undefined return into regs.eax,
// zeroing every RNG draw — caught by this port's lockstep oracle.)
function rand32(heap) {
  const s = snapRegs();
  FUN_005df40c(heap);
  const v = regs.eax >>> 0;
  restoreRegs(s);
  regs.eax = v;
  return v;
}

// === inline 0x43d404 — banner-fence test at (ax,cx) for direction bx.
// CF=1 blocked. Pure (eax/ecx/esi pushed/popped in the binary; ebx
// read-only): scans the tile chain for the first type-0x14 element;
// allowed iff its [elem+6] direction nibble (0xf << dir*4) is fully
// set; no banner element → allowed. Out-of-range coords → blocked.
function fence43d404(heap, ax, cx, dir) {
  if ((ax & 0xffff) > 0xfff || (cx & 0xffff) > 0xfff) return 1;
  let p = heap.u32(0x971ef4 + ror16(rol16(cx, 7) | (ax & 0xffff), 5) * 4) >>> 0;
  for (;;) {
    if ((heap.u8(p) & 0x3c) === 0x14) {
      const mask = (0xf << ((dir & 3) << 2)) & 0xffff;
      return (heap.u16(p + 6) & mask) === mask ? 0 : 1;
    }
    p = (p + 8) >>> 0;
    if ((heap.u8(p - 7) & 0x80) !== 0) return 0;
  }
}

// === inline 0x43c6b2 — terrain-walkable test at (ax,cx). CF=1
// blocked. Pure (ebx/edx/edi/esi pushed/popped; eax/ecx untouched):
// surface water level ([surf+5]&0x1f)<<2 (8-bit shl) must not exceed
// the surface height; then every element above the surface whose
// [base..clearance] band intersects [h .. h+4(+4 when [surf+4]&0x10)]
// blocks, except PATH (4), banner (0x14), and small scenery (0xc)
// whose object entry [0x6e1ec8 + [elem+4]*8] has flag 1.
function terrain43c6b2(heap, ax, cx) {
  if ((ax & 0xffff) > 0xfff || (cx & 0xffff) > 0xfff) return 1;
  let p = heap.u32(0x971ef4 + ror16(rol16(cx, 7) | (ax & 0xffff), 5) * 4) >>> 0;
  while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0;
  const water = ((heap.u8(p + 5) & 0x1f) << 2) & 0xff;
  if (water > heap.u8(p + 2)) return 1;
  const dl = heap.u8(p + 2);
  let dh = (dl + 4) & 0xff;
  if ((heap.u8(p + 4) & 0x10) !== 0) dh = (dh + 4) & 0xff;
  let q = p;
  for (;;) {
    if ((heap.u8(q + 1) & 0x80) !== 0) return 0;
    q = (q + 8) >>> 0;
    if (dl >= heap.u8(q + 3)) continue;
    if (dh < heap.u8(q + 2)) continue;
    const bl = heap.u8(q) & 0x3c;
    if (bl === 4 || bl === 0x14) continue;
    if (bl !== 0xc) return 1;
    if ((heap.u16(0x6e1ec8 + heap.u8(q + 4) * 8) & 1) !== 0) continue;
    return 1;
  }
}

// === inline 0x43d464 — walk scorer: follow the path from (ax,cx,dl)
// in direction `dir` for up to 0x19 tiles. Pure (caller push/pops
// ebx/esi/ebp; edi is read-only inside; eax is the return).
// Returns al: 0 dead end, 1 park entrance, 2 ride entrance / walk-in
// shop, 3 junction, 4 park gate, 5 too long. ah = ride id for 1/2.
// `elem` is the path element the peep stands on (entry edi) — its
// slope raises dl when leaving up-slope.
function score43d464(heap, ax, cx, dl, dir, elem) {
  if ((heap.u8(elem + 4) & 4) !== 0 && (heap.u8(elem + 4) & 3) === dir) {
    dl = (dl + 4) & 0xff;
  }
  let steps = 0;
  for (;;) {
    ax = (ax + heap.u16(0x652478 + dir * 4)) & 0xffff;
    cx = (cx + heap.u16(0x65247a + dir * 4)) & 0xffff;
    steps = (steps + 1) & 0xff;
    if (steps > 0x19) return { al: 5, ah: null };
    let p = heap.u32(0x971ef4 + ror16(rol16(cx, 7) | ax, 5) * 4) >>> 0;
    let matched = 0;
    for (;;) {
      const bl = heap.u8(p) & 0x3c;
      if (bl === 4) {
        // PATH height/slope match (43d52d)
        const e4 = heap.u8(p + 4);
        if ((e4 & 4) === 0) {
          if (dl === heap.u8(p + 2)) { matched = p; break; }
        } else {
          const sd = e4 & 3;
          if (sd === dir) {
            if (dl === heap.u8(p + 2)) { matched = p; break; }
          } else if ((sd ^ 2) === dir &&
                     ((heap.u8(p + 2) + 4) & 0xff) === dl) {
            matched = p; break;
          }
        }
      } else if (dl === heap.u8(p + 2)) {
        if (bl === 0x10) {
          // ENTRANCE (43d4d0)
          const e4 = heap.u8(p + 4);
          if (e4 === 0 || e4 === 1) {
            if ((heap.u8(p) & 3) === dir) {
              return { al: e4 === 0 ? 2 : 1, ah: heap.u8(p + 7) };
            }
          } else if (e4 === 2) {
            return { al: 4, ah: null };
          }
        } else if (bl === 8) {
          // TRACK: walk-in shop (43d509)
          const rt = heap.u8(0x887420 + heap.u8(p + 7) * 0x260);
          if ((heap.u32(0x5f5b78 + rt * 8) & 0x20000) !== 0) {
            return { al: 2, ah: heap.u8(p + 7) };
          }
        }
      }
      const last = (heap.u8(p + 1) & 0x80) !== 0;
      p = (p + 8) >>> 0;
      if (last) return { al: 0, ah: null };
    }
    // matched path element (43d55d)
    let edges = heap.u8(matched + 6) & 0xf;
    const came = dir ^ 2;
    dl = heap.u8(matched + 2);
    edges &= ~(1 << came);
    if (edges === 0) return { al: 0, ah: null };
    const nd = bsf(edges);
    if ((edges & ~(1 << nd)) !== 0) return { al: 3, ah: null };
    dir = nd;
    if ((heap.u8(matched + 4) & 4) !== 0 && (heap.u8(matched + 4) & 3) === dir) {
      dl = (dl + 4) & 0xff;
    }
  }
}

// === 0x43d933 — accept direction regs.eax: bounds-check the stepped
// tile; returns false when out of bounds (caller re-enters the random
// wander, like the binary's `ja 43d5ac`).
function accept(heap, esi) {
  const dir = regs.eax >>> 0;
  let bx = (heap.u16(esi + 0x24) + heap.u16(0x652478 + dir * 4)) & 0xffff;
  let dx = (heap.u16(esi + 0x26) + heap.u16(0x65247a + dir * 4)) & 0xffff;
  lo16("ebx", bx);
  lo16("edx", dx);
  if (bx > 0xfff || dx > 0xfff) return false;
  heap.setU8(esi + 0x78, regs.eax & 0xff);
  bx = (bx + 0x10) & 0xffff;
  dx = (dx + 0x10) & 0xffff;
  lo16("ebx", bx);
  lo16("edx", dx);
  heap.setU16(esi + 0x32, bx);
  heap.setU16(esi + 0x34, dx);
  heap.setU8(esi + 0x36, 2);
  if (heap.u8(esi + 0x2b) !== 6) {
    rand32(heap);
    lo8("eax", ((regs.eax & 7) + 2) & 0xff);
    heap.setU8(esi + 0x36, regs.eax & 0xff);
  }
  setCF(0);                                               // and eax,eax; ret
  return true;
}

// === 0x43d5ac — off-path random wander. Always terminates through
// accept() (the 4th candidate is unchecked; an out-of-bounds accept
// re-enters with a fresh RNG draw, exactly the binary's `ja 43d5ac`).
function randomWalk(heap, esi) {
  for (;;) {
    rand32(heap);
    regs.eax = (regs.eax & 3) >>> 0;
    let dir = regs.eax >>> 0;
    let passed = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      const savedDir = dir;                               // push eax
      regs.ebx = dir >>> 0;                               // mov ebx, eax
      let ax = heap.u16(esi + 0x24), cx = heap.u16(esi + 0x26);
      lo16("eax", ax); lo16("ecx", cx);
      let cf = fence43d404(heap, ax, cx, dir);
      if (!cf) {
        ax = (ax + heap.u16(0x652478 + dir * 4)) & 0xffff;
        cx = (cx + heap.u16(0x65247a + dir * 4)) & 0xffff;
        lo16("eax", ax); lo16("ecx", cx);
        regs.ebx = (regs.ebx ^ 2) >>> 0;
        cf = fence43d404(heap, ax, cx, dir ^ 2);
        if (!cf) {
          regs.ebx = (regs.ebx ^ 2) >>> 0;
          cf = terrain43c6b2(heap, ax, cx);
        }
      }
      regs.eax = savedDir >>> 0;                          // pop eax
      if (!cf) { passed = true; break; }
      dir = (dir + 1) & 3;                                // inc eax; and eax,3
      regs.eax = dir >>> 0;
    }
    // after 3 failures regs.eax already holds the 4th candidate
    // (d+3, the binary's 43d66d inc/and ran inside the loop above) —
    // accepted unchecked.
    void passed;
    if (accept(heap, esi)) return regs.eax;
  }
}

// === 0x43d925 — random pick among the candidate edge set (lo16 of
// regs.ebx at entry).
function randomPick(heap, esi) {
  const bx = regs.ebx & 0xffff;
  for (;;) {
    rand32(heap);
    regs.eax = (regs.eax & 3) >>> 0;
    if (((bx >>> (regs.eax & 15)) & 1) !== 0) break;
  }
  if (accept(heap, esi)) return regs.eax;
  return randomWalk(heap, esi);
}

// Shared tail of the three pathfind blocks: 4415e6 returns the chosen
// direction in EBP (or -1).
function pathfindTail(heap, esi) {
  if ((regs.ebp >>> 0) === 0xffffffff) return randomPick(heap, esi);
  regs.eax = regs.ebp >>> 0;
  if (accept(heap, esi)) return regs.eax;
  return randomWalk(heap, esi);
}

// === 0x43d8d4 / 0x43d99b — pathfind toward the park gate target
// globals [0x87c3c2/c4/c6].
function gatePathfind(heap, esi) {
  const sB = regs.ebx >>> 0, sS = regs.esi >>> 0;         // push ebx; push esi
  lo16("eax", heap.u16(esi + 0x24));
  lo16("ecx", heap.u16(esi + 0x26));
  lo8("edx", heap.u8(esi + 0x28));
  heap.setU16(0x6293bc, heap.u16(0x87c3c2));
  heap.setU16(0x6293be, heap.u16(0x87c3c4));
  const blv = (heap.u16(0x87c3c6) >>> 2) & 0xffff;
  lo16("ebx", blv);
  heap.setU8(0x6293c0, blv & 0xff);
  heap.setU8(0x6293c8, 0);
  callNative(0x4415e6, []);
  regs.esi = sS; regs.ebx = sB;                           // pop esi; pop ebx
  return pathfindTail(heap, esi);
}

// === 0x43d9f3 — pathfind toward a spawn point ([0x87c3ca] or
// [0x87c3d0] by sprite-index parity).
function spawnPathfind(heap, esi) {
  const sB = regs.ebx >>> 0, sS = regs.esi >>> 0;         // push ebx; push esi
  heap.setU16(0x6293bc, heap.u16(0x87c3ca));
  heap.setU16(0x6293be, heap.u16(0x87c3cc));
  let blv = (heap.u8(0x87c3ce) << 2) & 0xffff;
  heap.setU8(0x6293c0, blv & 0xff);
  if ((heap.u16(esi + 0xa) & 1) !== 0) {
    heap.setU16(0x6293bc, heap.u16(0x87c3d0));
    heap.setU16(0x6293be, heap.u16(0x87c3d2));
    blv = (heap.u8(0x87c3d4) << 2) & 0xffff;
    heap.setU8(0x6293c0, blv & 0xff);
  }
  lo16("ebx", blv);
  lo16("eax", heap.u16(esi + 0x24));
  lo16("ecx", heap.u16(esi + 0x26));
  lo8("edx", heap.u8(esi + 0x28));
  heap.setU8(0x6293c8, 0);
  callNative(0x4415e6, []);
  regs.esi = sS; regs.ebx = sB;                           // pop esi; pop ebx
  return pathfindTail(heap, esi);
}

// === 0x43d7db — nearest-station selection for the target ride
// (regs.ebp = ride*0x260 at entry), then pathfind with
// [0x6293c8]=0xf0.
function rideStationPathfind(heap, esi) {
  const rideOff = regs.ebp >>> 0;
  const sB = regs.ebx >>> 0, sS = regs.esi >>> 0, sD = regs.edi >>> 0;
  let dx = 0xffff;
  heap.setU32(0x6293ac, 0xffffffff);
  let edi = 0xffffffff;
  for (let i = 0; i < 4; i++) {
    const axv = heap.u16(0x887462 + rideOff + i * 2);
    if (axv === 0xffff) continue;
    const xx = ((axv & 0xff) << 5) & 0xffff;              // xchg ah,cl; shl ax,5
    const yy = (((axv >>> 8) & 0xff) << 5) & 0xffff;      // shl cx,5
    const dist = (abs16(xx - heap.u16(esi + 0x24)) +
                  abs16(yy - heap.u16(esi + 0x26))) & 0xffff;
    if (dist < dx) {
      heap.setU32(0x6293ac, edi >>> 0);
      edi = i;
      dx = dist;
    } else if (heap.u32(0x6293ac) === 0xffffffff) {
      heap.setU32(0x6293ac, i);
    }
  }
  if (edi === 0xffffffff) edi = 0;
  if (heap.u32(0x6293ac) !== 0xffffffff &&
      (heap.u8(0x887496 + rideOff) & 0x20) !== 0 &&
      (heap.u8(esi + 0x2f) & 1) !== 0) {
    edi = heap.u32(0x6293ac) >>> 0;
  }
  let axv = heap.u16(0x887462 + rideOff + edi * 2);
  if (dx === 0xffff) axv = heap.u16(0x88744a + rideOff + edi * 2);
  heap.setU16(0x6293bc, ((axv & 0xff) << 5) & 0xffff);
  heap.setU16(0x6293be, (((axv >>> 8) & 0xff) << 5) & 0xffff);
  const blv = heap.u8(0x887452 + edi + rideOff);
  lo8("ebx", blv);
  heap.setU8(0x6293c0, blv);
  regs.edi = sD;                                          // pop edi
  lo16("eax", heap.u16(esi + 0x24));
  lo16("ecx", heap.u16(esi + 0x26));
  lo8("edx", heap.u8(esi + 0x28));
  heap.setU8(0x6293c8, 0xf0);
  callNative(0x4415e6, []);
  regs.esi = sS; regs.ebx = sB;                           // pop esi; pop ebx
  return pathfindTail(heap, esi);
}

export function FUN_extra_guestmotion_43d5a0(heap) {
  const esi = regs.esi >>> 0;                             // peep sprite ptr
  lo8("edx", heap.u8(esi + 0x29) & 0x18);
  if ((regs.edx & 0xff) !== 0) return randomWalk(heap, esi);

  // === 43d676: locate the PATH element under the peep ===
  const ax0 = heap.u16(esi + 0x24), cx0 = heap.u16(esi + 0x26);
  const dlH = heap.u8(esi + 0x28);
  lo16("eax", ax0); lo16("ecx", cx0); lo8("edx", dlH);
  let edi = heap.u32(0x971ef4 + ror16(rol16(cx0, 7) | ax0, 5) * 4) >>> 0;
  for (;;) {
    regs.edi = edi;
    if (dlH === heap.u8(edi + 2)) {
      const bl = heap.u8(edi) & 0x3c;
      lo8("ebx", bl);
      if (bl === 4) break;
    }
    edi = (edi + 8) >>> 0;
    if ((heap.u8(edi - 7) & 0x80) !== 0) {
      regs.edi = edi;
      setCF(1);                                           // 43d6b1: stc; ret
      return regs.eax;
    }
  }

  // === 43d6b3: edges nibble minus came-from ===
  lo8("ebx", heap.u8(edi + 6));
  regs.eax = heap.u8(esi + 0x78);                         // movzx
  lo16("ebx", regs.ebx & 0xf);                            // and bx,0xf
  let edges = regs.ebx & 0xffff;
  if (edges === 0) return randomWalk(heap, esi);
  regs.eax = (regs.eax ^ 2) >>> 0;                        // xor ax,2 (value <= 3)
  const came = regs.eax & 15;
  edges &= ~(1 << came);                                  // btr bx,ax
  lo16("ebx", edges);
  if (edges === 0) {
    // dead end: came-from only — stat trio fires, then turn around
    edges |= 1 << came;                                   // bts bx,ax
    lo16("ebx", edges);
    const s = snapRegs();                                 // push eax (+ preserved bodies)
    FUN_004428d6(heap);
    FUN_00442816(heap);
    FUN_00442867(heap);
    restoreRegs(s);                                       // pop eax
  }
  let bp = bsf(edges);                                    // bsf bp,bx
  lo16("ebp", bp);
  const rest = edges & ~(1 << bp);                        // btr bx,bp
  lo16("ebx", rest);
  if (rest === 0) {
    regs.eax = bp >>> 0;                                  // movzx eax,bp
    if (accept(heap, esi)) return regs.eax;
    return randomWalk(heap, esi);
  }
  lo16("ebx", edges);                                     // bts bx,bp

  // === junction ===
  if (heap.u8(esi + 0x2a) !== 0) {
    // 43d98d
    if (heap.u8(esi + 0x2b) === 0xd) return gatePathfind(heap, esi);
    if (heap.u8(esi + 0x2b) === 0xe) return spawnPathfind(heap, esi);
    return randomPick(heap, esi);
  }

  // 43d709: check-map action gate
  if ((heap.u16(esi + 0xca) & 4) !== 0) {
    rand32(heap);
    const r = regs.eax & 0xffff;
    let doCheck;
    if (r < 0x666) {
      doCheck = true;
    } else if ((heap.u16(esi + 0xc8) & 1) === 0 && heap.u8(esi + 0xc5) === 0xff) {
      doCheck = false;
    } else {
      doCheck = r <= 0x2492;
    }
    if (doCheck && heap.u8(esi + 0x71) >= 0xfe) {
      heap.setU8(esi + 0x71, 0x15);
      heap.setU8(esi + 0x72, 0);
      heap.setU8(esi + 0x70, 0);
      callPreserved(heap, FUN_0043c60b);                  // push ebx … pop ebx
      invalidateSprite(heap);                             // 5e53ca (pushal/popal)
    }
  }

  // 43d757: wide-path prune
  if ((heap.u16(esi + 0xca) & 0xa3e0) === 0) {
    rand32(heap);
    if ((regs.eax & 0xffff) >= 0x888) {
      const orig = edges;                                 // push ebx
      let cur = edges;
      for (let dir2 = 0; dir2 < 4; dir2++) {              // ebp loop
        if (((cur >>> dir2) & 1) === 0) continue;
        const s = snapRegs();                             // push ebx/esi/ebp
        lo16("eax", heap.u16(esi + 0x24));
        lo16("ecx", heap.u16(esi + 0x26));
        lo8("edx", heap.u8(esi + 0x28));
        regs.ebp = dir2 >>> 0;
        const sc = score43d464(heap, heap.u16(esi + 0x24), heap.u16(esi + 0x26),
                               heap.u8(esi + 0x28), dir2, regs.edi >>> 0);
        lo8("eax", sc.al);
        if (sc.ah !== null) hi8("eax", sc.ah);
        const exitEAX = regs.eax;                         // scorer's eax survives the pops
        restoreRegs(s);
        regs.eax = exitEAX;
        if (sc.al <= 1) cur &= ~(1 << dir2);              // btr bx,bp
        lo16("ebx", cur);
      }
      regs.ebp = 4;                                       // loop exit value
      edges = (cur & 0xffff) === 0 ? orig : cur;          // pop ebx / add esp,4
      lo16("ebx", edges);
    }
  }

  // 43d7a5
  if ((heap.u16(esi + 0xc8) & 1) !== 0) return gatePathfind(heap, esi);
  if (heap.u8(esi + 0xc5) === 0xff) return randomPick(heap, esi);
  regs.ebp = (heap.u8(esi + 0xc5) * 0x260) >>> 0;         // movzx + imul
  if (heap.u8(0x887441 + regs.ebp) !== 1) return randomPick(heap, esi);
  return rideStationPathfind(heap, esi);
}

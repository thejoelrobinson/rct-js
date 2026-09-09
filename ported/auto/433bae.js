// @manual — do not regenerate.
// Source: decompiled/c/433bae.c
//
// Hand-port to fix the three `goto LAB_00433d04` sites that the auto
// translator lowered to `return 0`. LAB_00433d04 lives inside the
// outer `if (DAT_006288ec != 0xffffffff)` block and represents the
// continue-of-outer-loop:
//
//   LAB_00433d04:
//     uVar5 = uVar12;
//     uVar12 = uVar5 + 1;
//     iVar9 = DAT_005f96e4;
//     if (uVar12 < DAT_006288f0) {
//       ...body...
//       goto LAB_00433d04;   // ← bump uVar12 and re-enter
//     }
//
// The three goto sites are:
//   - line 40 C (inside the first processing pass, before LAB):
//     if (iVar10 == 0) goto LAB_00433d04;   // chain empty → skip ahead
//   - line 103 C (inside LAB body, walking the chain):
//     if (iVar9 == 0) goto LAB_00433d04;    // chain exhausted → next bucket
//   - line 160 C (fall-through at end of LAB body):
//     goto LAB_00433d04;                    // unconditional re-enter
//
// As `return 0`s the function bailed after a single hash bucket, leaving
// 32 of 33 chain buckets unsorted per strip. See
// .claude/scratch/agent-433bae-findings.md and
// .claude/scratch/agent-terrain3-findings.md.
//
// Restructure:
//   FIRST_PASS: {
//     ...first-processing code (lines 36-94 C, runs once)...
//     // goto at line 40 → break FIRST_PASS (drops into the loop below)
//   }
//   OUTER: while (true) {
//     // LAB_00433d04 head: bump uVar12, check gate, return when done
//     uVar5 = uVar12;
//     uVar12 = uVar5 + 1;
//     iVar9 = heap.u32(0x005f96e4);
//     if (!(uVar12 < heap.u32(0x006288f0))) return;
//     ...LAB body (lines 100-159 C)...
//     // goto at line 103 → continue OUTER
//     // goto at line 160 → continue OUTER (fall-through has same effect)
//   }
//
// After the gate fails we `return`; the auto-translator's `return 0` was
// wrong even for the failing-gate case, but the outer wrapper at
// `if (DAT_006288ec != 0xffffffff)` simply falls through to the
// function-end `return;`, which has no return value (void function).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";

// 0x433c97..0x433cd6, and the byte-identical copy at 0x433dad..0x433dec:
//
//   push edi ; mov edi, [0x991f88]
//   cmp ax,[ebp+0xc] ; rcl di,1      cmp bx,[ebp+0xe] ; rcl di,1
//   cmp cx,[ebp+0xa] ; rcl di,1      rol ecx,0x10
//   cmp dx,[ebp+4]   ; rcl di,1      cmp si,[ebp+6]   ; rcl di,1
//   cmp cx,[ebp+8]   ; rcl di,1      rol ecx,0x10
//   cmp byte ptr [edi + 0x62892c], 0 ; pop edi
//
// `rcl di, 1` is a SIXTEEN-bit rotate-through-carry, so the six unsigned-compare
// carries land in DI's low six bits, DI's own top six are rotated out, and
// EDI's high half keeps whatever [0x991f88] had. The occlusion table is then
// indexed by that EDI *directly* and read as a BYTE.
//
// The auto-translation emitted `heap.u32(0x0062892c + index * 4)`: a dword load
// at four times the index, so it sampled unrelated table entries and returned
// the wrong answer for some pairs. That mis-orders the paint list, and a paint
// entry sorted behind the ground gets overdrawn — measured as a 14x5 sprite
// missing at screen (312,30) in the playable configuration (56 px).
//
// GATED (CLAUDE.md's gating pattern): the frozen sc21 soak (canary 7b14266)
// was captured through the buggy lookup, and the paint order it produces feeds
// gameplay state. Keep the pre-fix expression verbatim off the __realStartup
// path; retire the gate when the soak is re-baselined.
function occludes(heap, ax, bx, ecx, dx, si, other) {
  if (!globalThis.__realStartup) {
    const uVar8 = ax, uVar1 = bx, uVar4 = ecx, uVar2 = dx, uVar3 = si, iVar9 = other;
    return heap.u32((0x0062892c) + (CONCAT22((((heap.u32(0x00991f88) >>> 0x10)) << 16 >> 16), (((((heap.i16(0x00991f88) << 1 | ((uVar8 < heap.u16((iVar9 + 0xc))) & 0xffff)) << 1 | ((uVar1 < heap.u16((iVar9 + 0xe))) & 0xffff)) << 1 | ((((uVar4) & 0xffff) < heap.u16((iVar9 + 10))) & 0xffff)) << 1 | ((uVar2 < heap.u16((iVar9 + 4))) & 0xffff)) << 1 | ((uVar3 < heap.u16((iVar9 + 6))) & 0xffff)) << 1 | ((((((uVar4) >>> 0) >>> 0x10) & 0xffff) < heap.u16((iVar9 + 8))) & 0xffff))) * 4) != 0;
  }
  const seed = heap.u32(0x00991f88) >>> 0;
  let di = seed & 0xffff;
  const rcl = (cf) => { di = ((di << 1) | (cf ? 1 : 0)) & 0xffff; };
  rcl((ax & 0xffff) < heap.u16(other + 0xc));
  rcl((bx & 0xffff) < heap.u16(other + 0xe));
  rcl((ecx & 0xffff) < heap.u16(other + 0xa));
  rcl((dx & 0xffff) < heap.u16(other + 4));
  rcl((si & 0xffff) < heap.u16(other + 6));
  rcl(((ecx >>> 0x10) & 0xffff) < heap.u16(other + 8));
  return heap.u8((0x0062892c + (((seed & 0xffff0000) | di) >>> 0)) >>> 0) !== 0;
}

export function FUN_00433bae(heap) {
  // diagnostic — wiped on regen (hand-ported, but keep the trace hook for parity)
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_00433bae");
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  let iVar11 = 0;
  let uVar12 = 0;
  iVar9 = ((heap.u32(0x005f96e8)) >>> 0);
  heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 0x30) >>> 0);
  heap.setU32(0x005f96e4, (iVar9) >>> 0);
  heap.setU32((iVar9 + 0x20), (0) & 0xffffffff);
  uVar12 = ((heap.u32(0x006288ec)) >>> 0);
  if (heap.u32(0x006288ec) != 0xffffffff) {
    do {
      iVar10 = ((heap.u32((0x006284ec) + (uVar12) * 4)) >>> 0);
      if (iVar10 != 0) {
        heap.setI32((iVar9 + 0x20), (iVar10) & 0xffffffff);
        do {
          iVar9 = ((iVar10) >>> 0);
          iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0);
        } while (heap.i32((iVar9 + 0x20)) != 0);
      }
      uVar12 = ((uVar12 + 1) >>> 0);
      iVar10 = ((heap.u32(0x005f96e4)) >>> 0);
    } while (uVar12 <= heap.u32(0x006288f0));

    // First processing pass (lines 36-94 C). On `goto LAB_00433d04`
    // we `break FIRST_PASS` to fall into the OUTER loop below.
    FIRST_PASS: {
      do {
        iVar9 = ((iVar10) >>> 0);
        iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0);
        uVar12 = ((heap.u32(0x006288ec)) >>> 0);
        if (iVar10 == 0) {
          break FIRST_PASS;
        }
        uVar8 = ((heap.u16(0x006288ec)) & 0xffff);
      } while (heap.u16((iVar10 + 0x14)) < uVar8);
      heap.setU32(0x006288f4, (iVar9) >>> 0);
      while (iVar9 = ((heap.i32((iVar9 + 0x20))) >>> 0), iVar10 = ((heap.u32(0x006288f4)) >>> 0), iVar9 != 0) {
        uVar1 = ((heap.u16((iVar9 + 0x14))) & 0xffff);
        uVar6 = ((0) & 0xff);
        if (((uVar8 + 1) & 0xffff) < uVar1) {
          heap.setU8((iVar9 + 0x17), (0x80) & 0xff);
          iVar10 = ((heap.u32(0x006288f4)) >>> 0);
          break;
        }
        if (uVar1 == ((uVar8 + 1) & 0xffff)) {
          uVar6 = ((3) & 0xff);
        }
        if (uVar1 == uVar8) {
          uVar6 = ((3) & 0xff);
        }
        heap.setU8((iVar9 + 0x17), (uVar6) & 0xff);
      }
      while (iVar9 = ((iVar10) >>> 0), iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0), uVar12 = ((heap.u32(0x006288ec)) >>> 0), iVar10 != 0 && (bVar7 = ((heap.u8((iVar10 + 0x17)) & 0x81) & 0xff), -1 < (((bVar7) << 24 >> 24) | 0))) {
        if (bVar7 != 0) {
          heap.setU8((iVar10 + 0x17), (heap.u8((iVar10 + 0x17)) & 0xfe) & 0xff);
          uVar8 = ((heap.u16((iVar10 + 4))) & 0xffff);
          uVar1 = ((heap.u16((iVar10 + 6))) & 0xffff);
          uVar4 = ((heap.u32((iVar10 + 8))) >>> 0);
          uVar2 = ((heap.u16((iVar10 + 0xc))) & 0xffff);
          uVar3 = ((heap.u16((iVar10 + 0xe))) & 0xffff);
          heap.setU32(0x006288f8, (iVar9) >>> 0);
          while (iVar11 = ((iVar10) >>> 0), iVar9 = ((heap.i32((iVar11 + 0x20))) >>> 0), iVar10 = ((heap.u32(0x006288f8)) >>> 0), iVar9 != 0 && (bVar7 = ((heap.u8((iVar9 + 0x17)) & 0x82) & 0xff), iVar10 = ((heap.u32(0x006288f8)) >>> 0), -1 < (((bVar7) << 24 >> 24) | 0))) {
            iVar10 = ((iVar9) >>> 0);
            if ((bVar7 != 0) && occludes(heap, uVar8, uVar1, uVar4, uVar2, uVar3, iVar9)) {
              heap.setU32((iVar11 + 0x20), (heap.u32((iVar9 + 0x20))) & 0xffffffff);
              LOCK();
              iVar10 = ((heap.i32((heap.u32(0x006288f8) + 0x20))) >>> 0);
              heap.setI32((heap.u32(0x006288f8) + 0x20), (iVar9) & 0xffffffff);
              UNLOCK();
              heap.setI32((iVar9 + 0x20), (iVar10) & 0xffffffff);
              iVar10 = ((iVar11) >>> 0);
            }
          }
        }
      }
    } /* FIRST_PASS */

    // OUTER loop = LAB_00433d04 in the C source.
    // Each `goto LAB_00433d04` is now `continue OUTER`.
    // When the gate `uVar12 < DAT_006288f0` fails, we return (void).
    OUTER: while (true) {
      uVar5 = ((uVar12) >>> 0);
      uVar12 = ((uVar5 + 1) >>> 0);
      iVar9 = ((heap.u32(0x005f96e4)) >>> 0);
      if (!(uVar12 < heap.u32(0x006288f0))) {
        return;
      }
      // Inner: find the first chain node with hash >= uVar12.
      // `goto LAB_00433d04` here → continue OUTER (chain exhausted before
      // finding a node with hash >= uVar12; bump and try next bucket).
      let gotoLab = false;
      do {
        iVar10 = ((iVar9) >>> 0);
        iVar9 = ((heap.i32((iVar10 + 0x20))) >>> 0);
        if (iVar9 == 0) {
          gotoLab = true;
          break;
        }
      } while (heap.u16((iVar9 + 0x14)) < ((uVar12) & 0xffff));
      if (gotoLab) {
        continue OUTER;
      }
      uVar8 = ((((uVar5) << 16 >> 16) + 2) & 0xffff);
      heap.setU32(0x006288f4, (iVar10) >>> 0);
      while (iVar10 = ((heap.i32((iVar10 + 0x20))) >>> 0), iVar9 = ((heap.u32(0x006288f4)) >>> 0), iVar10 != 0) {
        uVar1 = ((heap.u16((iVar10 + 0x14))) & 0xffff);
        bVar7 = ((0) & 0xff);
        if (uVar8 < uVar1) {
          heap.setU8((iVar10 + 0x17), (0x80) & 0xff);
          iVar9 = ((heap.u32(0x006288f4)) >>> 0);
          break;
        }
        if (uVar1 == uVar8) {
          bVar7 = ((3) & 0xff);
        }
        if (uVar1 == ((uVar12) & 0xffff)) {
          bVar7 = ((bVar7 | 1) & 0xff);
        }
        heap.setU8((iVar10 + 0x17), (bVar7) & 0xff);
      }
      while (iVar10 = ((iVar9) >>> 0), iVar9 = ((heap.i32((iVar10 + 0x20))) >>> 0), iVar9 != 0 && (bVar7 = ((heap.u8((iVar9 + 0x17)) & 0x81) & 0xff), -1 < (((bVar7) << 24 >> 24) | 0))) {
        if (bVar7 != 0) {
          heap.setU8((iVar9 + 0x17), (heap.u8((iVar9 + 0x17)) & 0xfe) & 0xff);
          uVar8 = ((heap.u16((iVar9 + 4))) & 0xffff);
          uVar1 = ((heap.u16((iVar9 + 6))) & 0xffff);
          uVar4 = ((heap.u32((iVar9 + 8))) >>> 0);
          uVar2 = ((heap.u16((iVar9 + 0xc))) & 0xffff);
          uVar3 = ((heap.u16((iVar9 + 0xe))) & 0xffff);
          heap.setU32(0x006288f8, (iVar10) >>> 0);
          while (iVar11 = ((iVar9) >>> 0), iVar10 = ((heap.i32((iVar11 + 0x20))) >>> 0), iVar9 = ((heap.u32(0x006288f8)) >>> 0), iVar10 != 0 && (bVar7 = ((heap.u8((iVar10 + 0x17)) & 0x82) & 0xff), iVar9 = ((heap.u32(0x006288f8)) >>> 0), -1 < (((bVar7) << 24 >> 24) | 0))) {
            iVar9 = ((iVar10) >>> 0);
            if ((bVar7 != 0) && occludes(heap, uVar8, uVar1, uVar4, uVar2, uVar3, iVar10)) {
              heap.setU32((iVar11 + 0x20), (heap.u32((iVar10 + 0x20))) & 0xffffffff);
              LOCK();
              iVar9 = ((heap.i32((heap.u32(0x006288f8) + 0x20))) >>> 0);
              heap.setI32((heap.u32(0x006288f8) + 0x20), (iVar10) & 0xffffffff);
              UNLOCK();
              heap.setI32((iVar10 + 0x20), (iVar9) & 0xffffffff);
              iVar9 = ((iVar11) >>> 0);
            }
          }
        }
      }
      // Fall-through: line 160 C `goto LAB_00433d04;` → continue OUTER.
      continue OUTER;
    } /* OUTER */
  }
  return;
}

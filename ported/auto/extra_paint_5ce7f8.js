// @manual — do not regenerate.
//
// FUN_extra_paint_5ce7f8 — small-scenery per-element painter, vtable slot 2
// in PTR_LAB_00628a94 (the per-element painter table dispatched from
// FUN_extra_paint_4368d8's body at 0x436a59 via `call [edi + 0x628a94]`).
// Reached when the tile-element type byte ([esi] & 0x3c) selects slot 2,
// i.e. small-scenery elements (trees, lamps, benches, fences, etc.).
//
// CODESEG body, ~590 disasm lines. Ghidra emitted no C decompile for the
// 0x5ce7f8 entry itself (it lifted only the rotation-table targets 5ce923 /
// 5ced51 which are unrelated peep-path trackers; the actual sub-painters
// for scenery live in PTR_LAB_005f6274[scenery_class]'s rotation tables
// at addresses like 0x4eb***, 0x4ec***, 0x4ed***, 0x4ee***).
//
// Phase R+11 profiler showed this function takes ~3.5% of per-tick wall
// time: 71 calls/tick × ~28µs each ≈ 2ms/tick. Hand-porting the prologue
// (which is run on EVERY call and does the per-element setup before the
// scenery-class jump dispatch) drops the per-call interpreter cost
// dramatically. The actual scenery sub-painter (at the jmp target) still
// runs through the bridge since those CODESEG functions have no JS port.
//
// Profile of hot path inputs (sampled at 0x5ce7f8 entry, 71 calls/tick × 5):
//   [0x991f8c] & 0x20:                       ALL ZERO (skip first block,
//                                            je 0x5ce89f immediately)
//   [esi+7] & 0xf (cliff-edge bits):         ALL ZERO
//   [esi+0] & 0x40 (override flag):          rarely set
//   [esi+4] (scenery class):                 varies (1, 2, 3, a, c, etc.)
//   [esi+5] (slope/orient):                  0 or 0x80
//
// What the function does on the hot path:
//   1. Test [0x991f8c] & 0x20 — ALWAYS 0 in our scene → skip first block,
//      jump directly to 0x5ce89f.
//   2. At 0x5ce89f: read scenery-def index [esi+7], set DAT_991f78=3,
//      compute scenery_def_base = DAT_887420 + 0x260 * index.
//   3. Build two 32-bit "sprite-flags" words at DAT_6522e8 / DAT_6522ec
//      from scenery_def[0x1e..0x20] (the 3 colour-shade bytes) with the
//      shifts/OR pattern (val<<17)|(val2<<24)|0x20000000.
//   4. If [esi+0] & 0x40 set: override both flags to 0x204e0000 (the
//      "ghost / under-construction" colour scheme).
//   5. Read scenery_class = [DAT_887420 + 0x260*index]; index the painter
//      class table at DAT_5f6274[scenery_class*4] → ebx.
//   6. Index again by [esi+4] (sub-type): ebx = [ebx + [esi+4]*4].
//   7. mov bp, ax (al = [esi+5]); andl ebp, 0xf.
//   8. push esi; jmpl [ebx + ecx*4] — sub-painter rotation dispatch.
//
// Cold paths (NOT ported, will fall back to runFunction):
//   - [0x991f8c] & 0x20 != 0: the first block (0x5ce807..0x5ce89c) — the
//     entrance/exit highlight + ghost-overlay sprite. Profile = 0 hits.
//   - btl test at 0x5ce82c failing: still falls through to 0x5ce89f (covered
//     by the always-runs second block).
//
// Calling convention on entry (per FUN_extra_paint_4368d8 caller setup,
// see extra_paint_4368d8.js):
//   esi = tile element ptr (8-byte struct)
//   eax low = tile X coord, ecx low = (rotation) used in `jmp [ebx+ecx*4]`
//   edx = element pixel-height (16-bit, pre-shifted by 2)
//   ecx full = rotation (low byte cl is the index)
//   edi = element type & 0x3c (vtable index — clobbered by our DPI/index loads)
//   ebx = chain-max height in low 16-bit (low byte = bl)
//
// Return: the sub-painter rets directly to 0x5ce7f8's caller (the binary's
// dispatch is `jmp`, not `call`). Our setEipHook auto-rets after the hook
// body returns, which matches: caller's saved return-addr is at [esp] and
// the auto-ret pops + jumps to it.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { step as _x86Step } from "../../harness/x86.js";

// Static data tables read by the function.
const TBL_887420 = 0x00887420;    // scenery def array, stride 0x260
const TBL_654c68 = 0x00654c68;    // entrance/exit btl bitmap, stride 4
const TBL_5f5d02 = 0x005f5d02;    // signed byte table, stride 8 (cold block)
const TBL_5f6274 = 0x005f6274;    // painter-class ptr table

// Scratch globals the function writes (per-call sprite paint state).
const DAT_6522E8 = 0x006522e8;    // sprite-flags lo (colour-recolor 1)
const DAT_6522EC = 0x006522ec;    // sprite-flags hi (colour-recolor 2)
const DAT_991F78 = 0x00991f78;    // per-element "current painter id" tag
const DAT_991F8C = 0x00991f8c;    // global render flags

// Cold-block scratch globals (only touched on the rarely-taken bit-0x20 path).
// const DAT_99A4E8 = 0x0099a4e8;
// const DAT_99A4EA = 0x0099a4ea;
// const DAT_99A4EC = 0x0099a4ec;

/** Invoke the bridge cpu's interpreter on a sub-callee, preserving the cpu's
 * outer ESP/EIP/callDepth. Same pattern as extra_paint_421d2c.js's helper. */
function callBridge(cpu, runFunction, fnAddr) {
  if (fnAddr === 0) return;
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, fnAddr, { stackTop: savedESP, limit: 5_000_000 });
  } catch (_) {
    // sub-painter errors non-fatal; matches bridge tolerance.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
}

/** Fall-back: run the original binary body from `addr` via the bridge cpu.
 * Used when a cold input is detected mid-body — we've already done partial
 * JS work, so we re-enter the binary at the matching cold-branch label
 * rather than re-running the entire entry (would double-fire side effects). */
function runBodyFrom(heap, cpu, runFunction, addr) {
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, addr, { stackTop: savedESP, limit: 5_000_000 });
  } catch (_) {
    // tail-branch errors non-fatal.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
  return true;
}

/** The hot-path JS body. Inputs come from cpu.regs / heap (just like the
 * binary). Returns true if the JS body fully handled the call; false if a
 * cold branch was detected and the caller should fall back to runFunction.
 */
function paintBody5ce7f8(heap, cpu, runFunction) {
  // === 0x5ce7f8: testw $0x20, [0x991f8c]; je 0x5ce89f ===
  const f8c = heap.u16(DAT_991F8C);
  if ((f8c & 0x20) !== 0) {
    // COLD: entrance/exit highlight + ghost-overlay block (0x5ce807..0x5ce89c).
    // Profile = 0 hits on the title scene. Fall back to interp.
    return false;
  }
  // Falls through to 0x5ce89f (the always-runs body).

  // === 0x5ce89f: movzbl 0x7(%esi), %edi  — scenery def index ===
  const esi0 = cpu.regs.esi >>> 0;
  const sceneryIdx = heap.u8(esi0 + 7) & 0xff;

  // === 0x5ce8a3: movb $0x3, [0x991f78] ===
  heap.setU8(DAT_991F78, 0x03);

  // === 0x5ce8aa: edi = sceneryIdx * 0x260; scenery_def_base = 0x887420 + edi ===
  const defOfs = (sceneryIdx * 0x260) >>> 0;
  const defBase = (TBL_887420 + defOfs) >>> 0;

  // === 0x5ce8b0..0x5ce8cc: build sprite-flags lo word @ DAT_6522e8 ===
  //   eax = (u8 [0x88743e + ofs]) << 0x11
  //   ebx = (u8 [0x88743f + ofs]) << 0x18
  //   ebx = (ebx | eax) | 0x20000000
  //   [0x6522e8] = ebx
  const c1 = heap.u8(defBase + 0x1e) & 0xff;  // shade 1 byte
  const c2 = heap.u8(defBase + 0x1f) & 0xff;  // shade 2 byte
  // JS shifts of >=32 are undefined behaviour on signed types; force >>> 0 final.
  // (c1 << 0x11) is fine in 32-bit; (c2 << 0x18) likewise.
  let flagsLo = (((c1 << 0x11) >>> 0) | ((c2 << 0x18) >>> 0) | 0x20000000) >>> 0;
  heap.setU32(DAT_6522E8, flagsLo);

  // === 0x5ce8d2..0x5ce8e2: build sprite-flags hi word @ DAT_6522ec ===
  //   ebx = (u8 [0x887440 + ofs]) << 0x11
  //   ebx = ebx | 0x20000000
  //   [0x6522ec] = ebx
  const c3 = heap.u8(defBase + 0x20) & 0xff;  // shade 3 byte
  let flagsHi = (((c3 << 0x11) >>> 0) | 0x20000000) >>> 0;
  heap.setU32(DAT_6522EC, flagsHi);

  // === 0x5ce8e8: testb $0x40, [esi+0]; je 0x5ce901 ===
  // If bit 6 of byte 0 (the "ghost / under-construction" flag) is set,
  // override both colour flags to the standard ghost-tint sprite-id.
  if ((heap.u8(esi0) & 0x40) !== 0) {
    heap.setU32(DAT_6522E8, 0x204e0000);
    heap.setU32(DAT_6522EC, 0x204e0000);
  }

  // === 0x5ce901: eax = scenery_class = [defBase + 0]; ebx = [0x5f6274 + 4*eax] ===
  const sceneryClass = heap.u8(defBase) & 0xff;
  const classBase = heap.u32(TBL_5f6274 + 4 * sceneryClass) >>> 0;
  if (classBase === 0) {
    // No painter class registered. Fall back to interp to mirror the binary's
    // (likely OOB-faulting) behaviour exactly. Rare / shouldn't fire.
    return false;
  }

  // === 0x5ce90f: eax = [esi+4]; ebx = [classBase + 4*eax] — sub-class ptr ===
  const subtype = heap.u8(esi0 + 4) & 0xff;
  const subClassPtr = heap.u32(classBase + 4 * subtype) >>> 0;
  if (subClassPtr === 0) {
    return false;
  }

  // === 0x5ce916..0x5ce91d: al = [esi+5]; bp = ax; ebp &= 0xf ===
  //
  // Register state at the dispatch jmp, per the binary's exact prologue:
  //   - eax: 0x5ce90f `movzbl 0x4(%esi), %eax` zeroed bits 8..31 then loaded
  //     subtype into low byte; 0x5ce916 `movb 0x5(%esi), %al` overwrote that
  //     low byte with e5. So eax = e5 (bits 0..7), all higher bits = 0.
  //   - ebx: 0x5ce913 `mov (%ebx,%eax,4), %ebx` set ebx to subClassPtr.
  //     The 0x5ce920 `jmp *(%ebx, %ecx, 4)` dereferences but doesn't change ebx
  //     itself; it remains subClassPtr at sub-painter entry.
  //   - ecx: untouched since entry — caller (4368d8 per-elem loop) had set
  //     ecx low byte to the rotation index (0..3). Upper bits 0.
  //   - edx: untouched since entry — caller passed dx = element height pre-
  //     shifted; preserves the binary's behaviour for the sub-painter.
  //   - edi: 0x5ce8aa `imull $0x260, %edi, %edi` set edi to 0x260*sceneryIdx
  //     and nothing since touches it (5ce901 uses edi as index but doesn't
  //     modify it). So edi = 0x260 * sceneryIdx at jmp.
  //   - esi: untouched since entry — tile elem ptr (the pushed esi at 0x5ce91c
  //     is for the sub-painter's `pop esi; ret`, not a value change).
  //   - ebp: 0x5ce919 `mov %ax, %bp` set bp = e5; 0x5ce91d `andl $0xf, %ebp`
  //     masks the full 32-bit ebp to low nibble. So ebp = e5 & 0xf.
  const e5 = heap.u8(esi0 + 5) & 0xff;
  const newEbp = e5 & 0xf;
  const newEdi = (sceneryIdx * 0x260) >>> 0;

  // Set up registers for the scenery sub-painter dispatch.
  cpu.regs.eax = (e5 & 0xff) >>> 0;       // movzbl chain → e5 in low byte, upper zero
  cpu.regs.ebx = subClassPtr >>> 0;
  cpu.regs.edi = newEdi;                  // 0x260 * sceneryIdx, preserved through prologue
  cpu.regs.ebp = newEbp >>> 0;
  // ecx, edx, esi unchanged from entry.
  // Mirror to translator regs so any JS-ported sub-callee sees the same state.
  regs.eax = cpu.regs.eax;
  regs.ebx = cpu.regs.ebx;
  regs.ecx = cpu.regs.ecx;
  regs.edx = cpu.regs.edx;
  regs.edi = cpu.regs.edi;
  regs.esi = cpu.regs.esi;
  regs.ebp = cpu.regs.ebp;

  // Stack setup for the sub-painter call.
  //
  // In the binary:
  //   5ce91c: push esi          ; stack = [E, R, ...]  (E = pushed esi, R = caller R)
  //   5ce920: jmp [ebx + ecx*4] ; eip = subFn          (no push)
  //   subFn body... ends with `pop esi; ret` (pops E into esi, then rets to R)
  //
  // CRITICAL: scenery sub-painters explicitly READ the pushed esi via
  //   `movl (%esp), %esi`        (e.g. 0x4eb3f4 inside 0x4eb335)
  // partway through their body — they need the real tile-elem ptr there to
  // re-read [esi+5] / [esi+7]. So we MUST place the real esi value at the
  // "pushed esi" slot — runFunction can't do this because it always writes
  // RET_SENTINEL into the same slot.
  //
  // Manual stack layout (addresses ascending; esp grows down):
  //   [origESP - 8] = RET_SENTINEL   (where subFn's `ret` after pop lands)
  //   [origESP - 4] = esi0           (the pushed-esi slot the subFn reads/pops)
  //   [origESP    ] = caller_R       (caller's return; untouched)
  // esp at subFn entry = origESP - 4 (top of stack = esi0).
  //   subFn: ... `mov (%esp), %esi` → sees esi0 ✓
  //   subFn epilogue:
  //     pop esi → esi = esi0,         esp = origESP    (binary-equivalent)
  //     ret     → eip = caller_R     (binary-equivalent ✓ — wait, that's wrong)
  //
  // ... and on second thought, the sub-painter's pop+ret already lands on
  // the caller_R if we don't intervene. But then the interpreter keeps
  // running at caller_R (the binary code in 4368d8 per-elem loop) until
  // it eventually rets all the way back through the bridge's outer
  // setup. That's expensive — we want to exit the step loop early via
  // RET_SENTINEL.
  //
  // So we use this layout instead (one extra "spacer" push):
  //   [origESP - 12] = RET_SENTINEL     (top at subFn entry; subFn's pop reads)
  //                                     Wait no — we want pop to give esi0.
  //
  // The right layout (re-derived):
  //   [origESP - 8] = esi0              (sub-painter's `pop esi` reads this)
  //   [origESP - 4] = RET_SENTINEL      (sub-painter's `ret` reads this → exit)
  //   [origESP    ] = caller_R          (untouched; the hook's auto-ret pops)
  // esp at subFn entry = origESP - 8.
  //   subFn: `mov (%esp), %esi` reads [origESP - 8] = esi0 ✓
  //   subFn: pop esi → esi=esi0, esp=origESP-4
  //   subFn: ret    → eip=RET_SENTINEL → step loop exits
  // After step loop: cpu.esp = origESP (post-ret). Hook's auto-ret reads
  // [origESP] = caller_R. ✓

  const RET_SENTINEL = 0xdeadbeef >>> 0;
  const origESP = cpu.regs.esp >>> 0;

  const rot = cpu.regs.ecx & 0x3;
  const subFn = heap.u32(subClassPtr + 4 * rot) >>> 0;

  if (subFn !== 0) {
    const savedEIP = cpu.regs.eip >>> 0;
    const savedCallDepth = cpu.callDepth;

    heap.setU32((origESP - 8) >>> 0, esi0);
    heap.setU32((origESP - 4) >>> 0, RET_SENTINEL);
    cpu.regs.esp = (origESP - 8) >>> 0;
    cpu.regs.eip = subFn >>> 0;
    cpu.callDepth = 0;
    cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;

    // Manual step loop (mirrors runFunction's, but without its mandatory
    // RET_SENTINEL write at [stackTop-4] which would clobber our esi0).
    try {
      let steps = 0;
      const LIMIT = 5_000_000;
      while (_x86Step(cpu)) {
        if (++steps > LIMIT) {
          throw new Error(`5ce7f8 sub-painter step limit (${LIMIT}) at eip 0x${cpu.regs.eip.toString(16)}`);
        }
      }
    } catch (_) {
      // sub-painter errors non-fatal; matches bridge tolerance.
    }

    cpu.regs.eip = savedEIP;
    cpu.callDepth = savedCallDepth;
  }
  // Restore esp to origESP so the hook's auto-ret pops the caller's return.
  cpu.regs.esp = origESP;

  return true;
}

/** Install the setEipHook at 0x5ce7f8 on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install5ce7f8Hook(cpu, runFunction, setEipHook, heap) {
  setEipHook(0x005ce7f8, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_5ce7f8");
    }
    let handled = false;
    try {
      handled = paintBody5ce7f8(heap, cpu, runFunction);
    } catch (e) {
      // Any JS port error: fall back to running the full binary body via
      // bridge, so we don't break correctness. Log once-ish (limit noise).
      if (!install5ce7f8Hook._warned) {
        install5ce7f8Hook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[5ce7f8 port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    if (!handled) {
      // Fall back: run the binary body from 0x5ce7f8 via the bridge cpu.
      runBodyFrom(heap, cpu, runFunction, 0x005ce7f8);
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 4368d8 loop.
  });
}

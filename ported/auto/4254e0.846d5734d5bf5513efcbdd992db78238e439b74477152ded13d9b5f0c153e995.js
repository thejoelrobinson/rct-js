// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x4254e0 is the ENTRANCE-element
// per-tile painter — vtable slot 4 of PTR_LAB_00628a94 (its pointer sits at
// DATASEG 0x628aa4; the only reference in the binary), dispatched from
// FUN_extra_paint_4368d8's `call [edi + 0x628a94]` when the tile-element
// type byte selects slot 4. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x4254e0 0x426070
//
// Entry contract (the 444e08/4254e0 per-element convention):
//   esi = tile element ptr        ecx = rotation (full ecx or'd into the
//   edx = element pixel-height dx       case-2 jumptable index — 0..3 live)
//   edi = element type & 0x3c (overwritten by the movzx dispatch below)
//
// Structure:
//   head:  [0x991f78]=0xb; shade-overlay block (f8c&0x40 && zoom==0 &&
//          scenery-quadrant flag [0x5f4970+((e4<<4)|e5lo)]&0xf) — one paint
//          call; COLD, NOT ported (guard routes to interp);
//   0x42556d: movzx edi,[esi+4]; jmp [edi*4 + 0x425578]  (3 cases)
//   case 0 0x425584 — RIDE ENTRANCE: not observed in the sc21 soak; NOT
//          ported (guard routes to interp);
//   case 1 0x425840 — RIDE EXIT: [0x991f78]=3; image ebx = 0x9230+ecx; two
//          rotation-parity-mirrored blocks, each = two paint calls through
//          [4*rot+0x432204] (ah=0x2b; bbox pairs (2,2)+(2,0x1b) resp.
//          (2,2)+(0x1b,2); [0x99a4ec]=dx) then an edge-strip ring store
//          (even: [0x99c165]/[0x999f9a]; odd: [0x99c166]/[0x999fdc];
//          u32 = 0xffff0000 | 0x600 | ((dx>>4)&0xff), stride-2, counter++)
//          — PORTED below;
//   case 2 0x425a1c — PARK ENTRANCE: [0x991f78]=8; 12-entry jumptable on
//          ((e5lo)<<2)|ecx at 0x425a38: e5lo==0 (sign middle) paints the
//          arch + the PARK-NAME SCROLLING TEXT via the string trio
//          0x458bcf/0x458a7c/0x45a95d (the ADD.6-deferred subsystem, real
//          bodies must run) — NOT ported (guard routes to interp); e5lo 1/2
//          (side posts) are a single paint call each, image
//          0x923f + rot*3 + (e5lo-1), ah=0x4f, bbox (2,2), [0x99a4ec]=dx —
//          PORTED below;
//   tails: both ported cases end with the same shape (case 1 has its own
//          copy w/ dx+=0x30 at 0x4259af; case 2's common tail at 0x425fd3
//          w/ dx+=0x50): pop esi/ecx; parity-selected supports call
//          `call 0x4238b4` (ax=0, edi=parity, ebp=0x20260000; eip-hooked JS
//          fast-path); 9-word segment clear [0x991f04..0x991f24]=0xffff;
//          16-bit dx += 0x30/0x50 ON THE 4238B4 CALLEE'S EXIT DX (the
//          binary does not save edx around the supports call); SIGNED
//          height-max compare (jge) on [0x991f28], loser also writes
//          [0x991f2a]=0x20; ret.
//
// Register exactness:
//   - the paint-call register file is partial-write faithful: al/ah/cl are
//     byte writes on the LIVE eax/ecx (upper bits = previous callee's exit),
//     di/si are 16-bit writes (esi upper half = element-ptr high bits, edi
//     upper = 0 from the movzx dispatch), ebx is a full imm32 load;
//   - edx is NEVER saved by this fn: each [0x99a4ec]=dx store and the tail
//     dx+=imm use whatever the previous callee exited with — replicated by
//     always reading live regs.edx (callIndirect/callNative sync it);
//   - exit regs = the last callee's exit file + the tail's explicit writes,
//     esi/ecx restored by the pops (element ptr / rotation).
//
// Oracle: ADDR=0x4254e0 TICKS=n tools/_lockstep-auto.mjs (organic crossings,
// ~10/tick in sc21) behind __forceInterp4254e0.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect, state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { step, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";

const ADDR = 0x004254e0;

// Pre-flight guard for the wiring: TRUE iff the JS body covers this call.
// Reads only entry state the body never mutates, so the routing decision is
// safe to take before any side effect (the head's [0x991f78]=0xb store is
// re-done identically by the interpreter on the fallback path).
export function js4254e0CanHandle(heap, esi, ecx) {
  if ((heap.u16(0x00991f8c) & 0x40) !== 0) {
    const dpi = heap.u32(0x00981ef8) >>> 0;
    if (heap.u16((dpi + 0x0e) >>> 0) === 0) return false; // shade-overlay arm
  }
  const e4 = heap.u8((esi + 4) >>> 0);
  if (e4 === 1) return true;                              // ride exit
  if (e4 !== 2) return false;                             // ride entrance / garbage
  const e5lo = heap.u8((esi + 5) >>> 0) & 0x0f;
  // park entrance: side posts only; middle (e5lo 0) runs the string trio.
  return (e5lo === 1 || e5lo === 2) && (ecx >>> 0) <= 3;
}

// One `call [4*rot + 0x432204]` block: partial-write register staging per the
// asm, bbox globals, then the bridged indirect call (paintBody432204 JS via
// fnDispatch, exactly as 5d7503/439178 bridge it).
function paint432204(heap, o) {
  regs.ebx = o.ebx >>> 0;                                        // mov ebx, imm32
  regs.eax = ((regs.eax & 0xffff0000) | (o.ah << 8) | o.al) >>> 0; // mov al / mov ah
  regs.ecx = ((regs.ecx & 0xffffff00) | o.cl) >>> 0;             // mov cl
  regs.edi = ((regs.edi & 0xffff0000) | o.di) >>> 0;             // mov di
  regs.esi = ((regs.esi & 0xffff0000) | o.si) >>> 0;             // mov si
  heap.setU16(0x0099a4e8, o.e8);
  heap.setU16(0x0099a4ea, o.ea);
  heap.setU16(0x0099a4ec, regs.edx & 0xffff);                    // mov [..], dx (live)
  const rot = heap.u32(0x00991f88) >>> 0;
  regs.ebp = rot;                                                // mov ebp,[0x991f88]
  callIndirect(heap, heap.u32((0x00432204 + rot * 4) >>> 0));
}

// Shared tail: parity supports call + segment clears + dx bump + height max.
function tailCommon(heap, esi0, ecx0, dxAdd) {
  regs.esi = esi0;                                               // pop esi
  regs.ecx = ecx0;                                               // pop ecx
  regs.eax = (regs.eax & 0xffff0000) >>> 0;                      // xor ax,ax
  regs.edi = (ecx0 & 1) !== 0 ? 1 : 0;                           // mov edi, parity
  regs.ebp = 0x20260000;
  callNative(0x4238b4, []);                                      // supports painter
  for (const a of [0x991f14, 0x991f08, 0x991f0c, 0x991f04, 0x991f10,
                   0x991f18, 0x991f1c, 0x991f20, 0x991f24]) {
    heap.setU16(a, 0xffff);
  }
  // 16-bit add on the SUPPORTS CALLEE'S exit dx (binary never saved edx).
  const dx = ((regs.edx & 0xffff) + dxAdd) & 0xffff;
  regs.edx = ((regs.edx & 0xffff0000) | dx) >>> 0;
  const cur = (heap.u16(0x00991f28) << 16) >> 16;                // signed cmp / jge
  if (cur < ((dx << 16) >> 16)) {
    heap.setU16(0x00991f28, dx);
    heap.setU8(0x00991f2a, 0x20);
  }
}

// Byte-exact interpreter run of the real binary body from the current cpu
// state, with any eip hook at ADDR lifted — the 444e08-orchestrator pattern.
// The run executes the body's real `ret` (esp rises above entry); the caller
// (wiring hook / oracle) restores esp and simulates the final ret itself, so
// the same return slot is popped once from its point of view.
function runInterpBody(heap, cpu) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = ADDR;
  let n = 0;
  try {
    while ((cpu.regs.esp >>> 0) <= entryEsp) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("4254e0: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

export function FUN_004254e0(heap) {
  const esi0 = regs.esi >>> 0;
  const ecx0 = regs.ecx >>> 0;

  // Route unported arms (shade-overlay, ride entrance, park-sign middle with
  // its string trio) through the embedded interpreter — INSIDE the fn, so the
  // lockstep oracle (which invokes the fn directly, bypassing any wiring
  // guard) exercises the same routing production does. Predicates read only
  // entry state; no side effect has happened yet.
  if (!js4254e0CanHandle(heap, esi0, ecx0)) {
    const cpu = state.__painterCpu;
    if (!cpu) throw new Error("4254e0: painter-bridge cpu not installed");
    // Translator cells are authoritative (wiring hook / oracle staged them).
    cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0;
    cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
    if (typeof regs.esp === "number") cpu.regs.esp = regs.esp >>> 0;
    const entryEsp = cpu.regs.esp >>> 0;
    const entryEip = cpu.regs.eip >>> 0;
    const entryCD = cpu.callDepth;
    try {
      runInterpBody(heap, cpu);
    } finally {
      cpu.regs.esp = entryEsp;
      cpu.regs.eip = entryEip;
      cpu.callDepth = entryCD;
    }
    regs.eax = cpu.regs.eax >>> 0; regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0; regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0; regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    return;
  }

  heap.setU8(0x00991f78, 0x0b);                                  // 0x4254e0
  const e4 = heap.u8((esi0 + 4) >>> 0);
  regs.edi = e4 >>> 0;                                           // 0x42556d movzx

  if (e4 === 1) {
    // ---- case 1 @0x425840: RIDE EXIT ----
    heap.setU8(0x00991f78, 3);
    // push ecx ; push esi (restored in tailCommon)
    const image = (0x9230 + ecx0) >>> 0;                         // add ebx,ecx (full)
    if ((ecx0 & 1) === 0) {
      // block A (rotation even)
      paint432204(heap, { al: 0, cl: 0, di: 0x1c, si: 2, ah: 0x2b, ebx: image, e8: 2, ea: 2 });
      paint432204(heap, { al: 0, cl: 0, di: 0x1c, si: 2, ah: 0x2b, ebx: (image + 4) >>> 0, e8: 2, ea: 0x1b });
      const cnt = heap.u8(0x0099c165);                           // ring: back edge
      regs.edi = cnt >>> 0;                                      // movzx edi,[0x99c165]
      regs.eax = (0xffff0000 | 0x0600 | (((regs.edx & 0xffff) >>> 4) & 0xff)) >>> 0;
      heap.setU32((0x00999f9a + cnt * 2) >>> 0, regs.eax);
      heap.setU8(0x0099c165, (cnt + 1) & 0xff);
    } else {
      // block B (rotation odd) — mirrored bboxes, other ring
      paint432204(heap, { al: 0, cl: 0, di: 2, si: 0x1c, ah: 0x2b, ebx: image, e8: 2, ea: 2 });
      paint432204(heap, { al: 0, cl: 0, di: 2, si: 0x1c, ah: 0x2b, ebx: (image + 4) >>> 0, e8: 0x1b, ea: 2 });
      const cnt = heap.u8(0x0099c166);
      regs.edi = cnt >>> 0;
      regs.eax = (0xffff0000 | 0x0600 | (((regs.edx & 0xffff) >>> 4) & 0xff)) >>> 0;
      heap.setU32((0x00999fdc + cnt * 2) >>> 0, regs.eax);
      heap.setU8(0x0099c166, (cnt + 1) & 0xff);
    }
    tailCommon(heap, esi0, ecx0, 0x30);                          // 0x4259af.. own tail copy
    return;
  }

  // ---- case 2 @0x425a1c: PARK ENTRANCE, side posts (guard ensured e5lo 1/2) ----
  heap.setU8(0x00991f78, 8);
  const e5lo = heap.u8((esi0 + 5) >>> 0) & 0x0f;
  regs.ebx = (((e5lo << 2) | ecx0) >>> 0);                       // dispatch index (then overwritten)
  // 8 bodies are identical except the image id: 0x923f + rot*3 + (e5lo-1)
  // (verified against all 8 jumptable targets 0x425bac..0x425f9a).
  const image = (0x923f + ecx0 * 3 + (e5lo - 1)) >>> 0;
  paint432204(heap, { al: 0, cl: 0, di: 0x1c, si: 0x1c, ah: 0x4f, ebx: image, e8: 2, ea: 2 });
  tailCommon(heap, esi0, ecx0, 0x50);                            // 0x425fd3.. common tail
}

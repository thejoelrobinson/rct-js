// @manual — do not regenerate.
//
// FUN_extra_paint_432204 — sprite paint-slot allocator, the SECOND rotation
// jumptable (PTR_LAB_00432204), sibling of PTR_LAB_00431bb8 (already ported
// in extra_paint_431bb8.js). 4 entries indexed by camera rotation
// (DAT_00991f88, 0..3):
//
//   PTR_LAB_00432204[0] = 0x00432214   (rotation 0)
//   PTR_LAB_00432204[1] = 0x004323b8   (rotation 1)
//   PTR_LAB_00432204[2] = 0x0043256d   (rotation 2)
//   PTR_LAB_00432204[3] = 0x00432727   (rotation 3)
//
// Dispatched via `call [4*rot + 0x432204]` from MANY per-element painters
// that still run in the bridge interpreter: 0x5dff38 (fence, vtable slot 5
// of PTR_LAB_00628a94 — 4 calls/invocation), 0x444e08 (wall, slot 1),
// the 0x42094b / 0x420502 palette-swizzle cold tails, the small-scenery
// sub-painters reached from 0x5ce7f8, and the selected-tile overlay in
// 0x4368d8. The 2026-06-10 scenario soak (tools/probe-painter-rank.js,
// __fnSteps accounting) ranked the interpreter-run CALLERS of this table
// as 4 of the top 5 step consumers — and the ~65-instruction body of these
// entries, executed inline inside those callers, is the bulk of their cost.
// Porting the table to JS cuts every one of those callers at once.
//
// Differences vs the 431bb8 sibling (verified instruction-by-instruction
// against the capstone disassembly cited inline below):
//   - the packed-z high half adds word [0x99a4ec] (not dx):
//       bp = sx8(ah) + [0x99a4ec]; edx = (bp << 16) | entry_dx_low
//   - the bbox X2/Y2 block computes from sx8(al)/sx8(cl)+tile-offsets and is
//     written FIRST; the slot top-left ([ebp+0xc/0xe]) is computed AFTER the
//     DPI clip checks from the [0x99a4e8]/[0x99a4ea] extent globals + entry
//     di/si (the binary's callers preload [0x99a4e8..ec] with the sprite's
//     bbox extents before the call)
//   - the DPI clip happens BEFORE most slot-field writes: a culled call
//     leaves ONLY [slot+0], [slot+0x10], [slot+0x12], [0x6288fc], [0x6288fe]
//     written — the rest of the slot stays untouched and the allocator does
//     NOT advance. The hand-port mirrors that write order exactly.
//   - per-rotation bucket-index formula differs (cx+ax / cx-ax+0x1000 /
//     -(cx+ax)+0x2000 / ax-cx+0x1000).
//
// REGISTER WRITE-BACK MATTERS HERE: unlike 431bb8 (whose only caller is the
// JS-ported 421d2c hot path), this table's callers run IN THE INTERPRETER
// and continue executing after the auto-ret with whatever cpu.regs holds.
// The body therefore writes back the binary's full exit register state on
// every path (success, allocator-full, each of the 4 clip-culls), including
// the 16-bit-only partial writes (high halves of eax/ecx/esi preserved from
// entry) and eflags (`stc` on the culled exits, `and ax,ax` on success).
//
// Oracle evidence: tools/painter-port-oracle.mjs — dual scenario-play soak
// (JS hooks vs hooks force-disabled), comparing a full-heap FNV-1a hash
// (stack region excluded) after every tick. Byte-equal across the soak ⇒
// the port's heap writes AND register write-back are indistinguishable from
// the interpreter running the original bytes.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";

// Paint-slot allocator pointers + parent-link (shared with 431bb8).
const PTR_PAINT_HEAD = 0x005f96e8;
const PTR_PAINT_CAP  = 0x005f96e0;
const PTR_PARENT     = 0x00628928;

const DAT_991F70 = 0x00991f70;   // tile X screen offset (u16)
const DAT_991F74 = 0x00991f74;   // tile Y screen offset (u16)
const DAT_991F78 = 0x00991f78;   // current-painter id tag (u16)
const DAT_991F7C = 0x00991f7c;   // tile element ptr (u32)
const DAT_991F80 = 0x00991f80;   // tile element ptr recursion-save (u32)

// Caller-preloaded sprite bbox extent globals.
const DAT_99A4E8 = 0x0099a4e8;   // bbox size X (u16)
const DAT_99A4EA = 0x0099a4ea;   // bbox size Y (u16)
const DAT_99A4EC = 0x0099a4ec;   // bbox size Z (u16)

const TBL_SPRHDR = 0x008dc0b8;   // sprite header table (16-byte stride)
const DAT_DPI    = 0x00981ef8;   // DPI ptr

const DAT_6288FC = 0x006288fc;   // sprite anchor screen-X
const DAT_6288FE = 0x006288fe;   // sprite anchor screen-Y

const DAT_BUCKET_TABLE = 0x006284ec;
const DAT_BUCKET_MIN   = 0x006288ec;
const DAT_BUCKET_MAX   = 0x006288f0;

function sx8(v) { return ((v << 24) >> 24); }
function sx16(v) { return ((v << 16) >> 16); }

// Faithful 16-bit CMP flags (mirrors harness/x86.js's 66-prefixed 0x3b
// handler) — the culled exits leave these flags + STC's CF=1 for the
// interpreter caller that resumes after the auto-ret.
function cmp16Flags(cpu, a, b) {
  a &= 0xffff; b &= 0xffff;
  const r = (a - b) & 0xffff;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 15) & 1;
  const sa = (a << 16) >> 16, sb = (b << 16) >> 16, sr = (r << 16) >> 16;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 15) & 1;
  cpu.eflags.CF = 1;   // stc at 0x4328dc overrides the cmp's CF
}

// Faithful 32-bit CMP flags (allocator-full exit), then STC.
function cmp32FlagsStc(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a - b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
  cpu.eflags.CF = 1;   // stc
}

/**
 * Shared body for all four rotation entries. Mirrors the binary's exact
 * write order and register effects. Returns nothing; all state goes through
 * heap + cpu.regs/eflags.
 */
export function paintBody432204(heap, cpu, rot) {
  const eax0 = cpu.regs.eax >>> 0;
  const ecx0 = cpu.regs.ecx >>> 0;
  const edx0 = cpu.regs.edx >>> 0;
  const ebx0 = cpu.regs.ebx >>> 0;
  const edi0 = cpu.regs.edi >>> 0;
  const esi0 = cpu.regs.esi >>> 0;

  // === prologue: [0x628928] = 0 ===
  heap.setU32(PTR_PARENT, 0);

  // === bp = sx8(ah) + [0x99a4ec]; edx = (bp<<16) | entry_dx_low ===
  // (0x43221e movsx bp,ah; 0x432222 add bp,[0x99a4ec]; shl edx,16;
  //  mov dx,bp; ror edx,16 — the ror SWAPS halves: high=bp, low=old dx.)
  const bp16 = (sx8((eax0 >>> 8) & 0xff) + heap.u16(DAT_99A4EC)) & 0xffff;
  const dxLow0 = edx0 & 0xffff;
  const edxPacked = (((bp16 << 16) >>> 0) | dxLow0) >>> 0;
  cpu.regs.edx = edxPacked;

  // === slot = [0x5f96e8]; if slot >= [0x5f96e0] → stc; ret ===
  const slotPtr = heap.u32(PTR_PAINT_HEAD) >>> 0;
  const slotCap = heap.u32(PTR_PAINT_CAP) >>> 0;
  cpu.regs.ebp = slotPtr;
  if (slotPtr >= slotCap) {
    cmp32FlagsStc(cpu, slotPtr, slotCap);   // cmp ebp,[0x5f96e0]; ... stc; ret
    return;
  }

  // === [slot+0] = entry ebx (sprite id + flags) ===
  heap.setU32(slotPtr, ebx0);

  // === ax = sx8(al); cx = sx8(cl); rotation-specific transform; +tile ofs ===
  let ax = sx8(eax0 & 0xff) & 0xffff;
  let cx = sx8(ecx0 & 0xff) & 0xffff;
  if (rot === 1) {            // 0x4323f3: xchg cx,ax; neg ax
    const t = ax; ax = cx; cx = t;
    ax = (-ax) & 0xffff;
  } else if (rot === 2) {     // 0x4325a8: neg cx; neg ax
    cx = (-cx) & 0xffff;
    ax = (-ax) & 0xffff;
  } else if (rot === 3) {     // 0x432762: xchg cx,ax; neg cx
    const t = ax; ax = cx; cx = t;
    cx = (-cx) & 0xffff;
  }
  ax = (ax + heap.u16(DAT_991F70)) & 0xffff;
  cx = (cx + heap.u16(DAT_991F74)) & 0xffff;

  // === ebxOff = (entry ebx & 0x1ffff) << 4 (sprite header offset) ===
  const ebxOff = ((ebx0 & 0x1ffff) << 4) >>> 0;

  // === bbox X2/Y2 calc (rotation-specific; 16-bit; sar = signed >>1) ===
  // rot0 (0x432267): bx=ax; neg ax; ax+=cx; cx+=bx; sar cx,1; sub cx,dx
  // rot1 (0x432410): neg ax; bx=ax; sub ax,cx; add cx,bx; sar; sub
  // rot2 (0x4325c6): bx=ax; sub ax,cx; neg cx; sub cx,bx; sar; sub
  // rot3 (0x43277f): bx=ax; add ax,cx; neg cx; add cx,bx; sar; sub
  // NOTE: `sub cx, dx` uses dx AFTER the packing ror — i.e. entry dx_low.
  let bx;
  if (rot === 0) {
    bx = ax;
    ax = ((-ax) + cx) & 0xffff;
    cx = (cx + bx) & 0xffff;
  } else if (rot === 1) {
    ax = (-ax) & 0xffff;
    bx = ax;
    ax = (ax - cx) & 0xffff;
    cx = (cx + bx) & 0xffff;
  } else if (rot === 2) {
    bx = ax;
    ax = (ax - cx) & 0xffff;
    cx = (-cx) & 0xffff;
    cx = (cx - bx) & 0xffff;
  } else {
    bx = ax;
    ax = (ax + cx) & 0xffff;
    cx = (-cx) & 0xffff;
    cx = (cx + bx) & 0xffff;
  }
  cx = (sx16(cx) >> 1) & 0xffff;   // sar cx, 1
  cx = (cx - dxLow0) & 0xffff;     // sub cx, dx (entry dx low)

  // === [slot+0x10] = ax; [slot+0x12] = cx (written even on later cull) ===
  heap.setU16(slotPtr + 0x10, ax);
  heap.setU16(slotPtr + 0x12, cx);

  // === sprite anchor: += header x/y offsets; store [0x6288fc/fe] ===
  ax = (ax + heap.u16(ebxOff + (TBL_SPRHDR + 0x04))) & 0xffff;  // +0x8dc0bc
  cx = (cx + heap.u16(ebxOff + (TBL_SPRHDR + 0x06))) & 0xffff;  // +0x8dc0be
  heap.setU16(DAT_6288FC, ax);
  heap.setU16(DAT_6288FE, cx);
  ax = (ax + heap.u16(ebxOff + (TBL_SPRHDR + 0x00))) & 0xffff;  // +0x8dc0b8 (w)
  cx = (cx + heap.u16(ebxOff + (TBL_SPRHDR + 0x02))) & 0xffff;  // +0x8dc0ba (h)

  // === DPI clip checks (signed 16-bit jle → 0x4328dc stc; ret) ===
  // ebx = [0x981ef8] from here on (observable on every later exit path).
  const dpi = heap.u32(DAT_DPI) >>> 0;
  cpu.regs.ebx = dpi;
  const cull = (axExit, cxExit, cmpA, cmpB) => {
    // Exit register state at the culled jle: low halves of eax/ecx as at
    // the compare; esi/edi untouched (entry); ebp=slot; ebx=dpi; edx packed.
    // Flags: the 16-bit cmp's ZF/SF/OF survive; stc then forces CF=1.
    cpu.regs.eax = ((eax0 & 0xffff0000) | (axExit & 0xffff)) >>> 0;
    cpu.regs.ecx = ((ecx0 & 0xffff0000) | (cxExit & 0xffff)) >>> 0;
    cmp16Flags(cpu, cmpA, cmpB);
  };
  const dpiX = heap.u16(dpi + 0x04);
  const dpiY = heap.u16(dpi + 0x06);
  if (sx16(ax) <= sx16(dpiX)) { cull(ax, cx, ax, dpiX); return; }
  if (sx16(cx) <= sx16(dpiY)) { cull(ax, cx, cx, dpiY); return; }
  const dpiRight = (dpiX + heap.u16(dpi + 0x08)) & 0xffff;
  const anchorX = heap.u16(DAT_6288FC);
  if (sx16(dpiRight) <= sx16(anchorX)) { cull(dpiRight, cx, dpiRight, anchorX); return; }
  const dpiBottom = (dpiY + heap.u16(dpi + 0x0a)) & 0xffff;
  const anchorY = heap.u16(DAT_6288FE);
  if (sx16(dpiBottom) <= sx16(anchorY)) { cull(dpiBottom, cx, dpiBottom, anchorY); return; }

  // === slot top-left from the [0x99a4e8/ea] extent globals + entry di/si ===
  // push dx; dx=[0x99a4ec]; rotation-specific load+transform; +tile offsets;
  // di+=ax; si+=cx. (dx is popped at ret — entry dx_low restored; the high
  // half keeps bp from the packing, i.e. edx stays edxPacked.)
  let di = edi0 & 0xffff;
  let si = esi0 & 0xffff;
  if (rot === 0) {
    // 0x4322f8: ax=[0x99a4e8]; cx=[0x99a4ea]; dec di; dec si
    ax = heap.u16(DAT_99A4E8);
    cx = heap.u16(DAT_99A4EA);
    di = (di - 1) & 0xffff;
    si = (si - 1) & 0xffff;
  } else if (rot === 1) {
    // 0x4324a1: cx=[0x99a4e8]; ax=[0x99a4ea]; dec di; xchg si,di; neg di; neg ax
    cx = heap.u16(DAT_99A4E8);
    ax = heap.u16(DAT_99A4EA);
    di = (di - 1) & 0xffff;
    const t = si; si = di; di = t;
    di = (-di) & 0xffff;
    ax = (-ax) & 0xffff;
  } else if (rot === 2) {
    // 0x432657: ax=[0x99a4e8]; cx=[0x99a4ea]; neg si; neg cx; neg di; neg ax
    ax = heap.u16(DAT_99A4E8);
    cx = heap.u16(DAT_99A4EA);
    si = (-si) & 0xffff;
    cx = (-cx) & 0xffff;
    di = (-di) & 0xffff;
    ax = (-ax) & 0xffff;
  } else {
    // 0x432810: cx=[0x99a4e8]; ax=[0x99a4ea]; dec si; xchg si,di; neg si; neg cx
    cx = heap.u16(DAT_99A4E8);
    ax = heap.u16(DAT_99A4EA);
    si = (si - 1) & 0xffff;
    const t = si; si = di; di = t;
    si = (-si) & 0xffff;
    cx = (-cx) & 0xffff;
  }
  ax = (ax + heap.u16(DAT_991F70)) & 0xffff;
  cx = (cx + heap.u16(DAT_991F74)) & 0xffff;
  di = (di + ax) & 0xffff;
  si = (si + cx) & 0xffff;

  // === slot finalization (success path only) ===
  // [slot+8] is stored at 0x432321 with edx = (bp<<16) | [0x99a4ec] — the
  // `mov dx, [0x99a4ec]` at 0x4322f1 has replaced the low half and the
  // restoring `pop dx` only happens at the ret. (First port stored
  // edxPacked here — i.e. entry dx_low — which mis-sorted overlapping
  // slots; caught by tools/_lockstep-432204.mjs at slot+0x8.)
  const edxAtStore = (((bp16 << 16) >>> 0) | heap.u16(DAT_99A4EC)) >>> 0;
  heap.setU16(slotPtr + 0x0c, di);
  heap.setU32(slotPtr + 0x08, edxAtStore);
  heap.setU16(slotPtr + 0x0e, si);
  heap.setU8 (slotPtr + 0x16, 0);
  heap.setU16(slotPtr + 0x04, ax);
  heap.setU16(slotPtr + 0x06, cx);
  heap.setU32(slotPtr + 0x18, 0);
  heap.setU32(slotPtr + 0x1c, 0);
  heap.setU16(slotPtr + 0x24, heap.u16(DAT_991F78));
  heap.setU32(slotPtr + 0x28, heap.u32(DAT_991F7C) >>> 0);
  heap.setU32(slotPtr + 0x2c, heap.u32(DAT_991F80) >>> 0);
  heap.setU32(PTR_PARENT, slotPtr);

  // === bucket index (rotation-specific 16-bit formula) ===
  // rot0 (0x432365): edi=movzx(cx); add di,ax
  // rot1 (0x432515): edi=movzx(cx); sub di,ax; add di,0x1000
  // rot2 (0x4326cc): edi=movzx(cx); add di,ax; neg di; add di,0x2000
  // rot3 (0x432884): edi=movzx(ax); sub di,cx; add di,0x1000
  // then: jns +3 / xor di,di; shr di,5; cap 0xff.
  let bkt;
  if (rot === 0)      bkt = (cx + ax) & 0xffff;
  else if (rot === 1) bkt = ((cx - ax) + 0x1000) & 0xffff;
  else if (rot === 2) bkt = ((-((cx + ax) & 0xffff)) + 0x2000) & 0xffff;
  else                bkt = ((ax - cx) + 0x1000) & 0xffff;
  if ((bkt & 0x8000) !== 0) bkt = 0;   // jns → signed-16 < 0 clears
  bkt = (bkt >>> 5) & 0xffff;
  if (bkt > 0xff) bkt = 0xff;

  heap.setU16(slotPtr + 0x14, bkt);
  // xchg [4*bkt + 0x6284ec], ebx — old head chains into slot.
  const bucketAddr = (bkt * 4 + DAT_BUCKET_TABLE) >>> 0;
  const oldHead = heap.u32(bucketAddr) >>> 0;
  heap.setU32(bucketAddr, slotPtr);
  heap.setU32(slotPtr + 0x20, oldHead);
  if (bkt < (heap.u32(DAT_BUCKET_MIN) >>> 0)) heap.setU32(DAT_BUCKET_MIN, bkt);
  if (bkt > (heap.u32(DAT_BUCKET_MAX) >>> 0)) heap.setU32(DAT_BUCKET_MAX, bkt);
  heap.setU32(PTR_PAINT_HEAD, (slotPtr + 0x30) >>> 0);

  // === pop dx (edx low half returns to entry dx_low; high half keeps bp —
  //     i.e. final edx = edxPacked, already written above) ; and ax,ax ; ret ===
  cpu.regs.eax = ((eax0 & 0xffff0000) | ax) >>> 0;
  cpu.regs.ecx = ((ecx0 & 0xffff0000) | cx) >>> 0;
  cpu.regs.esi = ((esi0 & 0xffff0000) | si) >>> 0;
  cpu.regs.edi = bkt >>> 0;            // movzx wrote full edi; 16-bit ops keep hi 0
  // Success-path ebx: `mov ebx, ebp; xchg [4*bkt+0x6284ec], ebx` leaves the
  // OLD bucket head in ebx (NOT the dpi ptr — that was overwritten at the
  // xchg; caught by tools/_lockstep-432204.mjs reg-diff).
  cpu.regs.ebx = oldHead >>> 0;
  // ebp already = slotPtr; edx already = edxPacked.
  cpu.eflags.CF = 0;                   // and ax,ax clears CF/OF
  cpu.eflags.OF = 0;
  cpu.eflags.ZF = ax === 0 ? 1 : 0;
  cpu.eflags.SF = (ax >>> 15) & 1;
}

/**
 * Install setEipHooks for all four PTR_LAB_00432204 entries on the bridge
 * cpu. Called once from runtime/painter-bridge.js. Mirrors the
 * install431bb8Hooks pattern. The body covers every path of the binary
 * function (no cold branches), so no runFunction fallback is needed —
 * except the oracle's force-interp switch (globalThis.__forceInterp432204),
 * which routes through the recursion-safe clear/re-install dance so
 * tools/painter-port-oracle.mjs can A/B the port against the raw bytes.
 */
export function install432204Hooks(cpu, runFunction, setEipHook, heap) {
  const variants = [
    [0x00432214, 0],
    [0x004323b8, 1],
    [0x0043256d, 2],
    [0x00432727, 3],
  ];
  for (const [addr, rot] of variants) {
    const hookFn = (cpu) => {
      if (typeof globalThis._renderTrace === "function") {
        globalThis._renderTrace(`FUN_extra_paint_432204[${rot}]`);
      }
      if (globalThis.__forceInterp432204) {
        // Oracle A/B switch: run the original bytes instead of the JS body.
        const savedESP = cpu.regs.esp >>> 0;
        const savedEIP = cpu.regs.eip >>> 0;
        const savedCallDepth = cpu.callDepth;
        clearEipHook(addr);
        try {
          runFunction(cpu, addr, { stackTop: savedESP, limit: 5_000_000 });
        } catch (_) { /* matches bridge tolerance */ }
        finally { _setEipHook(addr, hookFn); }
        cpu.regs.esp = savedESP;
        cpu.regs.eip = savedEIP;
        cpu.callDepth = savedCallDepth;
        return;
      }
      try {
        paintBody432204(heap, cpu, rot);
      } catch (e) {
        if (!install432204Hooks._warned) {
          install432204Hooks._warned = true;
          if (typeof console !== "undefined") {
            console.warn(`[432204 port rot=${rot}] threw: ${(e.message || e).slice(0, 160)}`);
          }
        }
      }
      // setEipHook's auto-ret pops the caller's return address and resumes.
    };
    setEipHook(addr >>> 0, hookFn);
  }
}

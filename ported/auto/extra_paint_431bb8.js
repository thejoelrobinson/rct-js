// @manual — do not regenerate.
//
// FUN_extra_paint_431bb8 — base-tile (surface) sprite-paint rotation sub-painter.
// PTR_LAB_00431bb8 is a 4-entry jumptable, indexed by camera-rotation
// (DAT_00991f88, range 0..3):
//
//   PTR_LAB_00431bb8[0] = 0x00431bc8   (rotation 0)
//   PTR_LAB_00431bb8[1] = 0x00431d4b   (rotation 1)
//   PTR_LAB_00431bb8[2] = 0x00431edc   (rotation 2)
//   PTR_LAB_00431bb8[3] = 0x0043206f   (rotation 3)
//
// Dispatched from extra_paint_421d2c.js's hot path (the terrain per-element
// painter, vtable slot 0 of PTR_LAB_00628a94) at the 0x421ff5 site:
//   mov ebp, [0x991f88]
//   call [4*ebp + 0x431bb8]
//
// 421d2c's pre-call register setup (from extra_paint_421d2c.js:286-303):
//   eax  = (eax & 0xffff0000) | 0xff00   ; al=0, ah=0xff
//   ecx  = ecx & 0xffff0000              ; cl=0
//   edi  = (edi & 0xffff0000) | 0x0020   ; di=0x20
//   esi  = (esi & 0xffff0000) | 0x0020   ; si=0x20
//   ebx  = sprite-id + palette flags     ; the actual sprite descriptor
//   ebp  = rotation (DAT_00991f88)       ; full dword
//   edx  = entry dx (pixel height << 1, preserved from 4368d8 caller)
//
// Phase R+13a diagnostic identified this sub-painter as the LARGEST consumer
// of interpreter-fallback wall time when the cb9==0 sprite-update gate opens:
// it fires on every terrain-tile paint (~954 calls/tick) and each call spends
// ~200µs running through ~80 0x66-prefixed insns in harness/x86.js. Hand-
// porting drops the per-call cost to single-digit microseconds.
//
// What the painter does (all four variants share this structure, differing
// only in the rotation-specific DI/SI/AX/CX deltas in step 3):
//
//   1. DAT_00628928 = 0           ; clear "parent paint slot" link
//   2. dx = ((dx + (int8)ah) << 16) | (dx & 0xffff)   ; pack new dx-hi from
//        movsx-ah + add, then `shl edx,16; mov dx, bp; ror edx,16` =
//        keep old dx-low, write bp into high word.
//   3. ebp = DAT_005f96e8         ; paint-slot allocator pointer
//      if (ebp >= DAT_005f96e0) jmp epilogue ; allocator full → STC; RET
//      [ebp+0x00] = ebx           ; sprite id+flags
//      ax = (int8)al              ; sign-extend al → ax (al=0 → ax=0)
//      cx = (int8)cl              ; sign-extend cl → cx (cl=0 → cx=0)
//   4. Rotation-specific transform on (ax, cx, di, si):
//        rot 0: di-=1; si-=1
//        rot 1: di-=1; swap(di,si); swap(ax,cx); di=-di; ax=-ax
//        rot 2: si=-si; cx=-cx; di=-di; ax=-ax
//        rot 3: si-=1; swap(di,si); swap(ax,cx); si=-si; cx=-cx
//   5. ax += DAT_00991f70 (tile X screen offset)
//      cx += DAT_00991f74 (tile Y screen offset)
//      ebx = (ebx & 0x1ffff) << 4  ; sprite-id bits → byte offset into
//                                  ;  the sprite header table at 0x8dc0b8
//      di += ax; si += cx          ; final bbox top-left
//      [ebp+0x0c] = di             ; bbox X1
//      [ebp+0x08] = edx            ; packed (z-hi << 16) | (z-lo)
//      [ebp+0x0e] = si             ; bbox Y1
//   6. Compute bbox X2/Y2 from the rotation-specific (di, si, ax, cx):
//        rot 0:  X2 = -di+si       Y2 = ((di+ax)>>0) - dx_low
//        rot 1:  X2 = -di-si       Y2 = ((-di+ax)>>0) - dx_low
//                  (push ax; neg di; ax=di; sub di,si; add si,ax)
//        rot 2:  X2 = di-si        Y2 = (-si - di)>>0 - dx_low  (then sub dx)
//                  (push ax; ax=di; sub di,si; neg si; sub si,ax; sub si,dx)
//        rot 3:  X2 = di+si        Y2 = (-si + di)>>0 - dx_low
//                  (push ax; ax=di; add di,si; neg si; add si,ax; sub si,dx)
//      [ebp+0x10] = di; [ebp+0x12] = si
//   7. di += [ebx + 0x8dc0bc] (sprite x-offset)
//      si += [ebx + 0x8dc0be] (sprite y-offset)
//      DAT_006288fc = di         ; sprite anchor screen-X
//      DAT_006288fe = si         ; sprite anchor screen-Y
//      di += [ebx + 0x8dc0b8] (sprite width); si += [ebx + 0x8dc0ba] (height)
//   8. DPI clip check: ebx = [DAT_00981ef8]   (DPI ptr)
//      if (di <= [ebx+0x4]) jmp epilogue   ; sprite below clip-top
//      if (si <= [ebx+0x6]) jmp epilogue   ; sprite right of clip-left
//      if ([ebx+0x4] + [ebx+0x8] <= DAT_006288fc) jmp epilogue ; off-bottom
//      if ([ebx+0x6] + [ebx+0xa] <= DAT_006288fe) jmp epilogue ; off-right
//   9. Slot finalization:
//      [ebp+0x16] = 0 (byte)     ; collision-type tag
//      [ebp+0x04] = ax           ; tile X (screen)
//      [ebp+0x06] = cx           ; tile Y (screen)
//      [ebp+0x18] = 0            ; child-slot ptr (none)
//      [ebp+0x1c] = 0            ; next-slot ptr (none, set later by chain)
//      [ebp+0x24] = DAT_00991f78 ; (word) current-painter id
//      [ebp+0x28] = DAT_00991f7c ; tile element ptr
//      [ebp+0x2c] = DAT_00991f80 ; tile element ptr (recursion-save)
//      DAT_00628928 = ebp        ; this slot becomes the current "parent"
//  10. Bucket-link: di = (cx + ax) >> 5; clamp to 0..0xff;
//      [ebp+0x14] = di           ; bucket index
//      ebx = ebp
//      atomic xchg ebx, [edi*4 + 0x6284EC]   ; ebx = old head; bucket=ebp
//      [ebp+0x20] = ebx          ; chain old head into slot
//      if (di < DAT_006288ec) DAT_006288ec = di   ; update min-bucket
//      if (di > DAT_006288f0) DAT_006288f0 = di   ; update max-bucket
//      DAT_005f96e8 += 0x30      ; advance slot allocator
//  11. ret (with ZF cleared via `and ax, ax`)
//
// The four entries share the bulk of the body — only step 3's deltas and
// step 6's bbox X2/Y2 formula differ. Implemented as a single JS function
// with a rotation parameter (0..3).
//
// Cold paths: none on the hot terrain path. The only branch out of the
// painter is the "allocator full" epilogue at 0x432200 which sets CF
// (`stc; ret`) — caller's `add bx, [edi+8*ebp+0x5f48d0]` precedes the
// call but doesn't check CF, so the STC bit is harmless. We simulate
// the same exit-with-no-slot path silently.
//
// Calling convention return: same as the binary — ret with cpu.regs as
// modified. setEipHook auto-rets to caller (the 421d2c callBridge frame).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

// Paint-slot allocator pointers + parent-link.
const PTR_PAINT_HEAD = 0x005f96e8;   // current free slot (advances by 0x30)
const PTR_PAINT_CAP  = 0x005f96e0;   // end-of-arena cap
const PTR_PARENT     = 0x00628928;   // "current parent paint slot" link

// Per-tile transient state (set by 4368d8 / 421d2c before this is called).
const DAT_991F70 = 0x00991f70;       // tile X screen offset (u16, low byte of ax)
const DAT_991F74 = 0x00991f74;       // tile Y screen offset (u16)
const DAT_991F78 = 0x00991f78;       // current-painter id tag (u16)
const DAT_991F7C = 0x00991f7c;       // tile element ptr (u32)
const DAT_991F80 = 0x00991f80;       // tile element ptr saved during recursion (u32)

// Sprite-header table (sprite-id<<4 indexes a 16-byte-per-entry header).
// Fields at +0x8/+0xa = sprite width/height (s16); +0xc/+0xe = x/y anchor.
const TBL_SPRHDR = 0x008dc0b8;       // base; +0..+0xa fields used

// DPI ptr (drawing pixel info — clip rect).
const DAT_DPI = 0x00981ef8;

// Sprite anchor scratch globals (per-call).
const DAT_6288FC = 0x006288fc;
const DAT_6288FE = 0x006288fe;

// Bucket-index aggregator globals.
const DAT_BUCKET_TABLE = 0x006284ec; // 256 × u32 head pointers, indexed by di
const DAT_BUCKET_MIN   = 0x006288ec; // min-used bucket index (u32)
const DAT_BUCKET_MAX   = 0x006288f0; // max-used bucket index (u32)

// Helper: sign-extend 8 → 16 (returns 16-bit value).
function sx8to16(v) { return ((v << 24) >> 24) & 0xffff; }
// Helper: sign-extend 16 → 32.
function sx16to32(v) { return ((v << 16) >> 16) | 0; }

/**
 * Paint a single base-tile sprite slot. `rotation` selects one of the 4
 * jumptable variants (0=0x431bc8, 1=0x431d4b, 2=0x431edc, 3=0x43206f).
 * Returns true (always — the painter never "fails" in a way the caller
 * observes; the only abort is "allocator full" which is silent and benign).
 */
function paintBody431bb8(heap, cpu, rotation) {
  // === 0x431bc8 / 0x431d4b / 0x431edc / 0x43206f: preamble (identical) ===
  heap.setU32(PTR_PARENT, 0);                 // mov [0x628928], 0

  // Pack new dx:
  //   movsx bp, ah         ; bp = sign-extend(ah)
  //   add   bp, dx         ; bp += dx (low 16)
  //   shl   edx, 0x10      ; edx = (old_dx_low) << 16
  //   mov   dx, bp         ; edx low 16 = bp
  //   ror   edx, 0x10      ; swap halves → high=bp, low=old_dx_low
  // Net: edx = (bp << 16) | (old_dx_low). But wait — after `shl edx, 0x10`
  // the LOW 16 is 0. Then `mov dx, bp` makes low = bp. Then `ror edx, 0x10`
  // swaps halves: high = old_low_pre_shift, low = bp.
  // i.e. edx = (old_dx_low << 16) | bp.
  const edx0 = cpu.regs.edx >>> 0;
  const ah0 = (cpu.regs.eax >>> 8) & 0xff;
  const dxLow0 = edx0 & 0xffff;
  const bp16 = (sx8to16(ah0) + dxLow0) & 0xffff;
  const edxPacked = (((dxLow0 << 16) >>> 0) | bp16) >>> 0;

  // === 0x431be2/d65/ef6/089: ebp = DAT_005f96e8 (paint head) ===
  const slotPtr = heap.u32(PTR_PAINT_HEAD) >>> 0;
  const slotCap = heap.u32(PTR_PAINT_CAP) >>> 0;
  if (slotPtr >= slotCap) {
    // Epilogue 0x432200: `stc; ret`. Caller doesn't observe CF; just exit.
    cpu.eflags.CF = 1;
    return true;
  }

  // === 0x431bf4/.../: [ebp+0] = ebx (sprite id + flags) ===
  const ebx0 = cpu.regs.ebx >>> 0;
  heap.setU32(slotPtr + 0x00, ebx0);

  // === ax = movsx(al), cx = movsx(cl) ===
  const al0 = cpu.regs.eax & 0xff;
  const cl0 = cpu.regs.ecx & 0xff;
  let ax = sx8to16(al0);
  let cx = sx8to16(cl0);
  let di = cpu.regs.edi & 0xffff;
  let si = cpu.regs.esi & 0xffff;

  // === Step 3 — rotation-specific (di, si, ax, cx) pre-add transforms ===
  // (Performed BEFORE the tile-offset add. Each rotation does its own
  // dec/xchg/neg sequence on entry-(di,si,ax,cx) — see the asm dumps in
  // the header comment.)
  if (rotation === 0) {
    // 0x431bff: dec di; dec si  (no xchg, no neg yet)
    di = (di - 1) & 0xffff;
    si = (si - 1) & 0xffff;
  } else if (rotation === 1) {
    // 0x431d82: dec di; xchg di,si; xchg ax,cx; neg di; neg ax
    di = (di - 1) & 0xffff;
    let t = di; di = si; si = t;
    t = ax; ax = cx; cx = t;
    di = (-di) & 0xffff;
    ax = (-ax) & 0xffff;
  } else if (rotation === 2) {
    // 0x431f13: neg si; neg cx; neg di; neg ax
    si = (-si) & 0xffff;
    cx = (-cx) & 0xffff;
    di = (-di) & 0xffff;
    ax = (-ax) & 0xffff;
  } else /* rotation === 3 */ {
    // 0x4320a6: dec si; xchg di,si; xchg ax,cx; neg si; neg cx
    si = (si - 1) & 0xffff;
    let t = di; di = si; si = t;
    t = ax; ax = cx; cx = t;
    si = (-si) & 0xffff;
    cx = (-cx) & 0xffff;
  }

  // === add ax, [0x991f70]; add cx, [0x991f74] ===
  ax = (ax + heap.u16(DAT_991F70)) & 0xffff;
  cx = (cx + heap.u16(DAT_991F74)) & 0xffff;

  // === ebx = (ebx & 0x1ffff) << 4  (sprite-id → 16-byte stride offset) ===
  const ebxOffset = ((ebx0 & 0x1ffff) << 4) >>> 0;

  // === add di, ax; add si, cx — di/si become the bbox top-left in screen px ===
  di = (di + ax) & 0xffff;
  si = (si + cx) & 0xffff;

  // === [ebp+0xc] = di; [ebp+0x8] = edx; [ebp+0xe] = si ===
  heap.setU16(slotPtr + 0x0c, di);
  heap.setU32(slotPtr + 0x08, edxPacked);
  heap.setU16(slotPtr + 0x0e, si);

  // === Now compute bbox bottom-right (di, si) for slot[0x10/0x12]. ===
  // The asm re-derives a copy: `mov di,ax; mov si,cx` then push ax;
  // applies rotation-specific transform; sar si, 0 (no-op); sub si, dx.
  // Note: at this point the asm reuses (di, si) as scratch — they're
  // NOT the bbox top-left anymore (which we've already written above).
  let xdi = ax & 0xffff;
  let xsi = cx & 0xffff;
  const savedAx = ax;

  if (rotation === 0) {
    // 0x431c33: mov ax, di; neg di; add di, si; add si, ax
    //         (then sar si,0; sub si, dx — common tail)
    ax = xdi;
    xdi = (-xdi) & 0xffff;
    xdi = (xdi + xsi) & 0xffff;
    xsi = (xsi + ax) & 0xffff;
  } else if (rotation === 1) {
    // 0x431dbf: neg di; mov ax, di; sub di, si; add si, ax
    xdi = (-xdi) & 0xffff;
    ax = xdi;
    xdi = (xdi - xsi) & 0xffff;
    xsi = (xsi + ax) & 0xffff;
  } else if (rotation === 2) {
    // 0x431f4f: mov ax, di; sub di, si; neg si; sub si, ax
    ax = xdi;
    xdi = (xdi - xsi) & 0xffff;
    xsi = (-xsi) & 0xffff;
    xsi = (xsi - ax) & 0xffff;
  } else /* rotation === 3 */ {
    // 0x4320e3: mov ax, di; add di, si; neg si; add si, ax
    ax = xdi;
    xdi = (xdi + xsi) & 0xffff;
    xsi = (-xsi) & 0xffff;
    xsi = (xsi + ax) & 0xffff;
  }
  // Common tail in this block: `sar si, 0` (no-op — shift by 0); `sub si, dx`.
  // dx here is the LOW 16 bits of the packed edxPacked computed above — i.e.
  // the ORIGINAL dx_low (we stored old_dx_low in the low half, bp in high).
  // So subtract edxPacked & 0xffff = dxLow0.
  xsi = (xsi - dxLow0) & 0xffff;
  ax = savedAx;  // pop ax

  // === [ebp+0x10] = xdi; [ebp+0x12] = xsi (bbox bottom-right) ===
  heap.setU16(slotPtr + 0x10, xdi);
  heap.setU16(slotPtr + 0x12, xsi);

  // === add di, [ebx+0x8dc0bc] (sprite x-offset); add si, [ebx+0x8dc0be] ===
  // Note: the asm at this point still has di/si from the TOP-LEFT bbox write
  // (the inner `mov di,ax; mov si,cx` were on a fresh path that's now done;
  // the next reads at 0x431c4f resume from the slot's [ebp+0xc/0xe] values
  // implicitly via di/si NOT being clobbered after the push/pop block. Let's
  // verify: the asm sequence is...
  //
  //   mov [ebp+0xc], di     ; bbox X1 (di_with_offset already)
  //   mov [ebp+0x8], edx
  //   mov [ebp+0xe], si     ; bbox Y1
  //   mov di, ax            ; reset di = ax
  //   mov si, cx            ; reset si = cx
  //   push ax
  //   ... rotation-specific bbox-X2/Y2 calc ...
  //   sar si, 0
  //   sub si, dx
  //   pop ax
  //   mov [ebp+0x10], di    ; bbox X2 — but di here is the SCRATCH di
  //   mov [ebp+0x12], si    ; bbox Y2
  //   add di, [ebx+0x8dc0bc] ; sprite x-offset added to SCRATCH di
  //   add si, [ebx+0x8dc0be]
  //
  // So the di used for sprite-anchor calc is the SCRATCH di (xdi above), not
  // the bbox-X1 di. We continue with xdi/xsi for the next steps.
  const spriteXOfs = heap.i16(ebxOffset + (TBL_SPRHDR + 0x04));  // +0xbc - 0xb8 = 0x04
  const spriteYOfs = heap.i16(ebxOffset + (TBL_SPRHDR + 0x06));
  xdi = (xdi + spriteXOfs) & 0xffff;
  xsi = (xsi + spriteYOfs) & 0xffff;

  // === DAT_006288fc = di; DAT_006288fe = si (sprite anchor screen px) ===
  heap.setU16(DAT_6288FC, xdi);
  heap.setU16(DAT_6288FE, xsi);

  // === add di, [ebx+0x8dc0b8]; add si, [ebx+0x8dc0ba] ===
  const spriteW = heap.i16(ebxOffset + (TBL_SPRHDR + 0x00));     // +0xb8 - 0xb8 = 0
  const spriteH = heap.i16(ebxOffset + (TBL_SPRHDR + 0x02));     // +0xba - 0xb8 = 2
  xdi = (xdi + spriteW) & 0xffff;
  xsi = (xsi + spriteH) & 0xffff;

  // === DPI clip checks (signed 16-bit comparisons via `jng` = jle signed) ===
  //   ebx = [0x981ef8]   (DPI ptr)
  //   cmp di, [ebx+0x4]; jng epilogue   (sprite_x + width <= dpi_x)
  //   cmp si, [ebx+0x6]; jng epilogue
  //   di = [ebx+0x4] + [ebx+0x8]; cmp di, [0x6288fc]; jng epilogue
  //   di = [ebx+0x6] + [ebx+0xa]; cmp di, [0x6288fe]; jng epilogue
  const dpi = heap.u32(DAT_DPI) >>> 0;
  if (dpi === 0) {
    // No DPI: caller's slot becomes a "ghost" allocation. We have to STILL
    // commit the slot writes the binary committed before this check (it's a
    // late check). Skip the bucket-link / allocator advance since the binary
    // would `jng` out at this point.
    return true;
  }
  const dpiX = heap.i16(dpi + 0x04);
  const dpiY = heap.i16(dpi + 0x06);
  const dpiW = heap.i16(dpi + 0x08);
  const dpiH = heap.i16(dpi + 0x0a);
  // sprite_x + width (16-bit signed) <= dpi_x → cull
  if (sx16to32(xdi) <= sx16to32(dpiX)) return true;
  if (sx16to32(xsi) <= sx16to32(dpiY)) return true;
  // dpi_x + dpi_w (16-bit signed) <= sprite_anchor_x → cull
  const dpiRight = (dpiX + dpiW) & 0xffff;
  if (sx16to32(dpiRight) <= sx16to32(heap.u16(DAT_6288FC))) return true;
  const dpiBottom = (dpiY + dpiH) & 0xffff;
  if (sx16to32(dpiBottom) <= sx16to32(heap.u16(DAT_6288FE))) return true;

  // === 0x431cbd: [ebp+0x16] = 0 (byte); [ebp+0x4] = ax; [ebp+0x6] = cx ===
  // === [ebp+0x18] = 0; [ebp+0x1c] = 0 ===
  heap.setU8(slotPtr + 0x16, 0);
  heap.setU16(slotPtr + 0x04, ax);
  heap.setU16(slotPtr + 0x06, cx);
  heap.setU32(slotPtr + 0x18, 0);
  heap.setU32(slotPtr + 0x1c, 0);

  // === Per-slot metadata copy from DAT_991F78/7C/80 ===
  heap.setU16(slotPtr + 0x24, heap.u16(DAT_991F78));
  heap.setU32(slotPtr + 0x28, heap.u32(DAT_991F7C));
  heap.setU32(slotPtr + 0x2c, heap.u32(DAT_991F80));

  // === DAT_00628928 = ebp (slotPtr becomes the current parent) ===
  heap.setU32(PTR_PARENT, slotPtr);

  // === Bucket index: di = movzx(cx) + ax; if signed di < 0, di = 0;
  //                  di >>= 5; cap at 0xff ===
  // The asm `movzx edi, cx` zero-extends cx into edi (32-bit).
  // Then `add di, ax` (16-bit add, wrap). Then `jns +3; xor di,di` — i.e.
  // if signed-16 di < 0, clear to 0. Then `shr di, 5` (unsigned 16-bit
  // shift). Then `cmp di, 0xff; jna +4; mov di, 0xff` — cap.
  let bktDi = ((cx & 0xffff) + ax) & 0xffff;
  if ((bktDi & 0x8000) !== 0) bktDi = 0;   // signed-16 < 0 → 0
  bktDi = (bktDi >>> 5) & 0xffff;
  if (bktDi > 0xff) bktDi = 0xff;

  // === [ebp+0x14] = di (bucket index, u16) ===
  heap.setU16(slotPtr + 0x14, bktDi);

  // === atomic xchg ebx, [edi*4 + 0x6284ec] ; old head goes into ebx ===
  // Then `mov [ebp+0x20], ebx` (chain old head into slot). The xchg is
  // semantically: oldHead = bucket[di]; bucket[di] = slotPtr; slotChain = oldHead.
  const bucketAddr = (bktDi * 4 + DAT_BUCKET_TABLE) >>> 0;
  const oldHead = heap.u32(bucketAddr) >>> 0;
  heap.setU32(bucketAddr, slotPtr);
  heap.setU32(slotPtr + 0x20, oldHead);

  // === if (di < DAT_006288ec) DAT_006288ec = di  ; update min-bucket ===
  // The asm uses `jnc` (jump-if-not-carry-set) on `cmp edi, [0x6288ec]`. CMP
  // sets CF when the unsigned subtraction borrows, i.e. when edi < mem.
  // `jnc` skips the write when CF is clear (di >= mem). So we update when
  // di < currentMin.
  if (bktDi < heap.u32(DAT_BUCKET_MIN)) heap.setU32(DAT_BUCKET_MIN, bktDi);
  // === if (di > DAT_006288f0) DAT_006288f0 = di  ; update max-bucket ===
  // The asm uses `jna` (jump-if-not-above = jump-if-CF-or-ZF) → skip when
  // di <= mem; write when di > mem.
  if (bktDi > heap.u32(DAT_BUCKET_MAX)) heap.setU32(DAT_BUCKET_MAX, bktDi);

  // === add [0x5f96e8], 0x30  (advance paint-slot allocator by 48 bytes) ===
  heap.setU32(PTR_PAINT_HEAD, (slotPtr + 0x30) >>> 0);

  // === and ax, ax  (clear ZF/SF) ; ret ===
  // No observable effect on caller (421d2c discards eflags after callBridge).
  return true;
}

/**
 * Install setEipHooks for all four PTR_LAB_00431bb8 entries on the bridge
 * cpu. Called once from runtime/painter-bridge.js. Mirrors the
 * install4368d8Hooks / install421d2cHook pattern.
 */
export function install431bb8Hooks(cpu, runFunction, setEipHook, heap) {
  const variants = [
    [0x00431bc8, 0],
    [0x00431d4b, 1],
    [0x00431edc, 2],
    [0x0043206f, 3],
  ];
  for (const [addr, rot] of variants) {
    setEipHook(addr >>> 0, (cpu) => {
      if (typeof globalThis._renderTrace === "function") {
        globalThis._renderTrace(`FUN_extra_paint_431bb8[${rot}]`);
      }
      try {
        paintBody431bb8(heap, cpu, rot);
      } catch (e) {
        // Any JS port error: silently swallow. The slot just won't be
        // allocated; caller (421d2c) doesn't read return state. Log once.
        if (!install431bb8Hooks._warned) {
          install431bb8Hooks._warned = true;
          if (typeof console !== "undefined") {
            console.warn(`[431bb8 port rot=${rot}] threw: ${(e.message || e).slice(0, 160)}`);
          }
        }
      }
      // setEipHook's auto-ret pops the saved return address and resumes.
    });
  }
}

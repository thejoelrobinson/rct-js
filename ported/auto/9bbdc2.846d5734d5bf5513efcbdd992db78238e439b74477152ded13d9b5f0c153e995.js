// @manual - do not regenerate.
//
// Hand-ported from rct.exe disassembly at VA 0x9bbdc2 (CodeSeg) - Ghidra
// never lifted this; it is reached only via the indirect call
// `(*DAT_009b22f0[i])()` set up in FUN_009bbff8 / FUN_009bc041 and
// switched per viewport-entry through DAT_009b22f0 indexed by
// DAT_008d7eb6.
//
// What it does: scanline span-render of one row of a sprite into the
// active DDraw surface. The caller has set up:
//   - DAT_009b2280  = current viewport-entry pointer (set by 9bbff8)
//   - DAT_0099fb7c  = surface base ptr  (set by 9bb9f5)
//   - DAT_0099fb84  = surface row width (used pixels per row)
//   - DAT_0099fb88  = surface stride padding (extra bytes per row)
//   - DAT_009b22a8[ebp_in*4] = pointer to the sprite-line stream for row `ebp_in`
//   - regs.eax = caller's first byte index in destination row (X start)
//   - regs.ebx = row index (multiplied by stride to compute base)
//   - regs.ecx = number of column pixels remaining (loop count for outer row)
//   - regs.edx = unused-input (saved as 0x9b2290 then decremented as row counter)
//   - regs.esi = sprite source X (subsprite X within the line stream)
//   - regs.edi = sprite source Y (subsprite Y within the line stream)
//   - regs.ebp = which sprite-line stream to use (index into DAT_009b22a8)
//
// Layout of a sprite-line stream entry pointed to by DAT_009b22a8[ebp]:
//   byte+0: sprite_width  (so masks below work as width-1)
//   byte+1: sprite_height (so masks below work as height-1)
//   byte+2..: stream of (skip_byte, run_data) pairs - the inner xchg
//             loop reads a control byte at [stream + 2*ecx + 0] = sprite
//             pixel value to place; if it equals 0xFF the loop bumps to
//             the next column and continues.
//
// For each non-transparent pixel:
//   xchg al, [ebx+esi]     ; surface[ebx+esi] swapped with new pixel
//   inc DAT_009b227c       ; deferred-undo cache count
//   [edi] = (offset<<8) | original_byte    ; remember for FUN_009bc184 to restore
//
// FUN_009bc184 walks DAT_009aa27c popping (offset<<8|byte) entries and
// writing the original byte back into DAT_0099fb7c[offset>>8]. So this
// routine is the "draw sprite, remembering originals so we can erase
// later" primitive used by the title-screen sprite walker.
//
// Address values used (all literals from the disassembly):
//   0x9b227c  cache count           0x9b2284  saved EAX (X start)
//   0x9b2288  saved EBX (row idx)   0x9b228c  saved ECX (col count)
//   0x9b2290  saved EDX (row count) 0x9b2294  sprite_width
//   0x9b2298  sprite_width-1 mask   0x9b229c  sprite_height-1 mask
//   0x9b22a0  saved EDI&mask        0x9b22a4  total stride
//   0x9b22a8  base of stream-table  0x9aa27c  base of undo cache
//   0x99fb7c  surface base ptr      0x99fb84  surface row width
//   0x99fb88  surface stride padding
//
// This is a faithful x86 translation. We model registers via runtime/regs.js.
// All memory ops go through `heap` which shares its byte buffer with the
// DDraw surface allocator, so `surface_base + offset` is a real heap address.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_009bbdc2(heap) {
  // Snapshot caller registers (the function is reached via an indirect
  // call from FUN_009bc041; arguments arrive in EAX/EBX/ECX/EDX/ESI/EDI/EBP).
  let eax = regs.eax >>> 0;
  let ebx = regs.ebx >>> 0;
  let ecx = regs.ecx >>> 0;
  let edx = regs.edx >>> 0;
  let esi = regs.esi >>> 0;
  let edi = regs.edi >>> 0;
  let ebp = regs.ebp >>> 0;

  // 0x9bbdc2: mov ebp,[ebp*4+0x9b22a8]    - resolve sprite stream pointer
  ebp = heap.u32((0x9b22a8 + ebp * 4) >>> 0) >>> 0;

  // 0x9bbdc9-0x9bbdda: mov [0x9b2284], eax / [0x9b2288], ebx / etc.
  heap.setU32(0x9b2284, eax);
  heap.setU32(0x9b2288, ebx);
  heap.setU32(0x9b228c, ecx);
  heap.setU32(0x9b2290, edx);

  // 0x9bbde0: movzx eax, byte [ebp+0]    - sprite_width
  // 0x9bbde4: movzx ebx, byte [ebp+1]    - sprite_height
  eax = heap.u8(ebp + 0);
  ebx = heap.u8(ebp + 1);

  // 0x9bbde8: mov [0x9b2294], eax        - sprite_width
  heap.setU32(0x9b2294, eax);

  // 0x9bbded: dec eax / 0x9bbdee: dec ebx
  eax = (eax - 1) >>> 0;
  ebx = (ebx - 1) >>> 0;

  // 0x9bbdef-0x9bbdf4: store width-1, height-1 masks
  heap.setU32(0x9b2298, eax);
  heap.setU32(0x9b229c, ebx);

  // 0x9bbdfa: and edi, eax     ; mask source X by width-1
  // 0x9bbdfc: and esi, ebx     ; mask source Y by height-1
  edi = (edi & eax) >>> 0;
  esi = (esi & ebx) >>> 0;

  // 0x9bbdfe: mov [0x9b22a0], edi
  heap.setU32(0x9b22a0, edi);

  // 0x9bbe04: add ebp, 2       ; ebp now points at sprite pixel stream
  ebp = (ebp + 2) >>> 0;

  // 0x9bbe07: movzx ebx, word [0x99fb88]  ; stride padding
  // 0x9bbe0e: add bx,  word [0x99fb84]    ; + row width  -> total stride
  ebx = (heap.u16(0x99fb88) + heap.u16(0x99fb84)) & 0xffff;

  // 0x9bbe15: mov [0x9b22a4], ebx     ; total stride
  heap.setU32(0x9b22a4, ebx);

  // 0x9bbe1b: imul ebx, [0x9b2288]    ; * caller_ebx (row idx)
  ebx = Math.imul(ebx, heap.i32(0x9b2288)) >>> 0;

  // 0x9bbe22: add  ebx, [0x9b2284]    ; + caller_eax (X start) -> base offset
  ebx = (ebx + heap.u32(0x9b2284)) >>> 0;

  // 0x9bbe28: mov ecx, esi    ; ecx = column index in source line
  ecx = esi >>> 0;

  // 0x9bbe2a: mov edi, [0x9b227c]  ; cache count
  // 0x9bbe30: shl edi, 2           ; * 4
  // 0x9bbe33: mov esi, [0x99fb7c]  ; surface base
  // 0x9bbe39: add edi, 0x9aa27c    ; cache slot pointer
  edi = ((heap.u32(0x9b227c) << 2) + 0x9aa27c) >>> 0;
  esi = heap.u32(0x99fb7c) >>> 0;

  // ---- Outer loop: 0x9bbe3f .. 0x9bbeae (per row of caller's ECX columns) ----
  while (true) {
    // 0x9bbe3f: mov al, [ebp + ecx*2 + 0]   ; sprite pixel control
    let al = heap.u8((ebp + ecx * 2) >>> 0);

    // 0x9bbe43: cmp al, 0xff   0x9bbe45: jz pop_continue (skip)
    if (al !== 0xff) {
      // 0x9bbe47: cmp dword [0x9b227c], 0x1f38   0x9bbe51: ja skip
      if (heap.u32(0x9b227c) <= 0x1f38) {
        // 0x9bbe53: push ebx / 0x9bbe54: push ecx
        const saved_ebx = ebx;
        const saved_ecx = ecx;

        // 0x9bbe55: sub eax, [0x9b22a0]
        let eax_local = (al - heap.u32(0x9b22a0)) >>> 0;

        // 0x9bbe5b: mov edx, [0x9b228c]   ; original column count
        let edx_local = heap.u32(0x9b228c);

        // 0x9bbe61: and eax, [0x9b2298]   ; mask by width-1
        eax_local = (eax_local & heap.u32(0x9b2298)) >>> 0;

        // 0x9bbe67: add edx, ebx          ; end_offset
        edx_local = (edx_local + ebx) >>> 0;

        // 0x9bbe69: add ebx, eax          ; start offset
        ebx = (ebx + eax_local) >>> 0;

        // 0x9bbe6b: cmp ebx, edx / 0x9bbe6d: jnc skip
        if (ebx >>> 0 < edx_local >>> 0) {
          // 0x9bbe6f: mov ah, [ebp + ecx*2 + 1]    (sprite pixel value byte)
          let ah = heap.u8((ebp + ecx * 2 + 1) >>> 0);
          // 0x9bbe73: mov ecx, [0x9b2294]    ; sprite_width  -> column step
          ecx = heap.u32(0x9b2294);

          // ---- Inner span loop: 0x9bbe79 .. 0x9bbe95 ----
          while (true) {
            // 0x9bbe79: mov al, ah
            let pix = ah & 0xff;
            // 0x9bbe7b: xchg al, [ebx+esi]
            const surfaceAddr = (ebx + esi) >>> 0;
            const orig = heap.u8(surfaceAddr);
            heap.setU8(surfaceAddr, pix);
            pix = orig;
            // 0x9bbe7e: inc dword [0x9b227c]
            heap.setU32(0x9b227c, (heap.u32(0x9b227c) + 1) >>> 0);
            // 0x9bbe84: shl ebx, 8 / 0x9bbe87: mov bl, al
            // 0x9bbe89: mov [edi], ebx     ; cache (offset<<8)|orig
            const cachePacked = (((ebx & 0xffffff) << 8) | (pix & 0xff)) >>> 0;
            heap.setU32(edi, cachePacked);
            // 0x9bbe8b: shr ebx, 8         ; restore offset value
            // (we kept ebx unchanged, no need to actually shr/shl)
            // 0x9bbe8e: add edi, 4
            edi = (edi + 4) >>> 0;
            // 0x9bbe91: add ebx, ecx       ; advance to next column
            ebx = (ebx + ecx) >>> 0;
            // 0x9bbe93: cmp ebx, edx / 0x9bbe95: jc loop
            if (ebx >>> 0 >= edx_local >>> 0) break;
            // ah carries forward (mov al, ah at top reuses it)
          }
        }
        // 0x9bbe97: pop ecx / 0x9bbe98: pop ebx
        ecx = saved_ecx >>> 0;
        ebx = saved_ebx >>> 0;
      }
    }

    // 0x9bbe99: inc ecx
    ecx = (ecx + 1) >>> 0;
    // 0x9bbe9a: add ebx, [0x9b22a4]   ; advance row by stride
    ebx = (ebx + heap.u32(0x9b22a4)) >>> 0;
    // 0x9bbea0: and ecx, [0x9b229c]   ; wrap column by sprite_height-1 mask
    ecx = (ecx & heap.u32(0x9b229c)) >>> 0;
    // 0x9bbea6: dec dword [0x9b2290]  ; row counter
    const remaining = (heap.u32(0x9b2290) - 1) >>> 0;
    heap.setU32(0x9b2290, remaining);
    // 0x9bbeac: jnz top
    if (remaining === 0) break;
  }

  // 0x9bbeae: ret
  // Reflect register-effects observable to wrappers (they pop EAX/EBX/ECX/EDX
  // afterwards so those don't matter; ESI/EDI/EBP are dead on exit).
  regs.eax = eax >>> 0;
  regs.ebx = ebx >>> 0;
  regs.ecx = ecx >>> 0;
  regs.edx = edx >>> 0;
  regs.esi = esi >>> 0;
  regs.edi = edi >>> 0;
  regs.ebp = ebp >>> 0;
  return 0;
}

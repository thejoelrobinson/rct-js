// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42afb5.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the unscaled-mode
// top toolbar (call 2 in the unscaled branch). EBP at WindowCreate time
// = 0x42afb5 → stored at window+0x0 → invoked indirectly by FUN_005e3f31.
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = phase sentinel (-1 = initial open / hover-id resolve,
//         anything else = paint event at body 0x42afd3)
//
// Disassembly (the EDI == -1 path — fires at boot):
//   0042afb5  cmp edi, -1
//   0042afb8  jnz 0x42afd3                 ; paint body — see below
//   0042afba  mov eax, 0x20026060          ; default cursor / hover sprite
//   0042afbf  test byte [0x6326bd], 1      ; check "demo / paused" flag
//   0042afc6  jnz 0x42afcd
//   0042afc8  mov eax, 0x20026062          ; alternate hover sprite
//   0042afcd  mov [0x5f514e], eax          ; publish hover-sprite id
//   0042afd2  ret
//
// EDI != -1 path (0x42afd3..0x42b076) — top-toolbar paint body:
//   0042afd3  mov ax,  word [esi+0x20]    ; window left  (ax)
//   0042afd7  mov cx,  word [esi+0x22]    ; window top   (cx)
//   0042afdb  mov bx,  word [esi+0x24]    ; window width (bx)
//   0042afdf  mov dx,  word [esi+0x26]    ; window height(dx)
//   0042afe3  add bx, ax                  ; bx = right
//   0042afe6  add dx, cx                  ; dx = bottom
//   0042afe9  dec bx                      ; right - 1  (inclusive)
//   0042afeb  dec dx                      ; bottom - 1
//   0042afed  mov ebp, 0xa                ; sprite #10 = solid-fill helper
//   0042aff2  call 0x9b30f1               ; blit toolbar background fill
//   0042aff7  movzx ebp, byte [0x99ad4c]  ; hover-sprite index (cursor)
//   0042affe  or ebp, 0x1000000           ; flag = "blit cursor"
//   0042b004  call 0x9b30f1               ; blit cursor sprite
//   0042b009  btr  dword [esi+0x14], 0xb  ; clear widget-state bit 0xb
//   0042b00e  push esi
//   0042b00f  mov  cl, -0x6c              ; widget id 0x14 (= toolbar-mode)
//   0042b011  call 0x5e3b2b               ; window-by-id lookup → ZF
//   0042b016  pop esi
//   0042b017  je 0x42b01e                 ; ZF=1 means "not found"
//   0042b019  bts  dword [esi+0x14], 0xb  ; "found" → set bit 0xb
//   0042b01e  btr  dword [esi+0x14], 0x2  ; clear widget-state bit 2
//   0042b023  test byte [0x6326bd], 1     ; demo / paused flag
//   0042b02a  jne 0x42b031
//   0042b02c  bts  dword [esi+0x14], 0x2  ; not-paused → set bit 2
//   0042b031  call 0x5e4400               ; paint widget tree (Window paint helper)
//   0042b036  push esi
//   0042b037  mov cx, word [0x5f5246]     ; sprite-pos x (widget rect.left)
//   0042b03e  mov dx, word [0x5f524a]     ; sprite-pos y (widget rect.top)
//   0042b045  add cx, word [esi+0x20]     ; → screen x
//   0042b049  add dx, word [esi+0x22]     ; → screen y
//   0042b04d  mov ebx, 0x606c             ; sprite id (toolbar logo / clock)
//   0042b052  movzx eax, byte [0x87cba5]  ; current player palette idx 1
//   0042b059  movzx ebp, byte [0x87cba6]  ; current player palette idx 2
//   0042b060  shl eax, 0x11               ; pack into bits 17+
//   0042b063  shl ebp, 0x18               ; pack into bits 24+
//   0042b066  or eax, 0xa0000000          ; "remap colours" flag
//   0042b06b  or ebx, eax
//   0042b06d  or ebx, ebp
//   0042b06f  call 0x9b438b               ; sprite + remap blit
//   0042b074  pop esi
//   0042b075  ret

import { regs } from "../../runtime/regs.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e4400 } from "./5e4400.js";
import { FUN_009b438b } from "./9b438b.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042afb5(heap) {
  // 0x42afb5..b8: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // 0x42afd3..0x42b075 — top toolbar paint body.
    const esi = regs.esi >>> 0;

    // 0x42afd3..eb: compute inclusive (left,top) → (right,bottom-1) rect
    // from the window struct's screen rect.
    const left   = heap.u16(esi + 0x20);
    const top    = heap.u16(esi + 0x22);
    const width  = heap.u16(esi + 0x24);
    const height = heap.u16(esi + 0x26);
    const right  = ((left + width  - 1) & 0xffff);
    const bottom = ((top  + height - 1) & 0xffff);

    // 0x42afed..f2: solid background fill (sprite/op id 0xa).
    regs.eax = left;
    regs.ebx = right;
    regs.ecx = top;
    regs.edx = bottom;
    regs.ebp = 0xa;
    FUN_009b30f1(heap);

    // 0x42aff7..b004: blit cursor / hover sprite id from DAT_0099ad4c
    // with the "draw cursor" flag bit 24 set. Same coords still in regs.
    regs.eax = left;
    regs.ebx = right;
    regs.ecx = top;
    regs.edx = bottom;
    regs.ebp = (heap.u8(0x0099ad4c) | 0x01000000) >>> 0;
    FUN_009b30f1(heap);

    // 0x42b009: btr bit 0xb of [esi+0x14].
    let w14 = heap.u32(esi + 0x14) >>> 0;
    w14 = (w14 & ~(1 << 0xb)) >>> 0;
    heap.setU32(esi + 0x14, w14);

    // 0x42b00e..19: widget-id lookup. The callee leaves ZF set exactly when
    // the toolbar window is absent; preserve that branch before restoring
    // ESI from the call's push/pop pair.
    regs.ecx = (regs.ecx & 0xffffff00) | 0x94;
    regs.esi = esi;
    FUN_005e3b2b(heap);
    const toolbarWindowFound = regs.zf === 0;
    regs.esi = esi;
    if (toolbarWindowFound) w14 = (w14 | (1 << 0xb)) >>> 0;

    // 0x42b01e: btr bit 2 of [esi+0x14].
    w14 = heap.u32(esi + 0x14) >>> 0;
    w14 = (w14 & ~(1 << 2)) >>> 0;
    // 0x42b023..2c: if [0x6326bd] & 1 == 0 → bts bit 2.
    if ((heap.u8(0x006326bd) & 1) === 0) {
      w14 = (w14 | (1 << 2)) >>> 0;
    }
    heap.setU32(esi + 0x14, w14);

    // 0x42b031: paint helper — walks the window's widget array.
    regs.esi = esi;
    FUN_005e4400(heap);

    // 0x42b036..6f: blit a remapped sprite (logo / clock face) at
    // screen-coords from widget #(?). The remap colours come from the
    // current scenario's palette palette indices.
    const cx = ((heap.u16(0x005f5246) + heap.u16(esi + 0x20)) & 0xffff) >>> 0;
    const dx = ((heap.u16(0x005f524a) + heap.u16(esi + 0x22)) & 0xffff) >>> 0;
    let ebx = 0x606c >>> 0;
    const palA = heap.u8(0x0087cba5) >>> 0;
    const palB = heap.u8(0x0087cba6) >>> 0;
    const eaxRemap = ((palA << 0x11) | 0xa0000000) >>> 0;
    ebx = (ebx | eaxRemap | (palB << 0x18)) >>> 0;
    regs.ecx = cx;
    regs.edx = dx;
    regs.ebx = ebx;
    regs.eax = eaxRemap;
    regs.ebp = (palB << 0x18) >>> 0;
    regs.esi = esi;
    FUN_009b438b(heap);
    regs.esi = esi;
    return;
  }

  // 0x42afba..c8: pick hover-sprite id based on demo/paused flag.
  let eax = 0x20026060 >>> 0;
  if ((heap.u8(0x006326bd) & 1) === 0) {
    eax = 0x20026062 >>> 0;
  }
  // 0x42afcd: publish chosen sprite id at DAT_005f514e.
  heap.setU32(0x005f514e, eax);
  regs.eax = eax;
}

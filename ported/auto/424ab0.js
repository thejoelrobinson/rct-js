// @manual — do not regenerate.
//
// Hand-port of the cmd-0x13 game-command handler at binary 0x424ab0 (the LAND
// EDGE / corner-style AREA tool — the command the live viewport land-drag
// issues from the land-tool callback 0x42aeb7 with esi=0x13). Ghidra never
// recovered this function (it is a jumptable target, no decompiled/c/424ab0.c),
// so the JS dispatcher FUN_00426f56 reached it via callIndirect(0x424ab0),
// which has NO JS function in fnDispatch -> returned 0 -> wrote nothing. This
// faithful port (cited from the byte-disasm below) makes cmd 0x13 mutate the
// world surface bytes for the drag rect exactly as the binary interpreter does.
//
// DISASM (CODESEG, va2off = VA-0x41c000+0x1a600), the area loop:
//   0x424ab0  mov byte [0x99c167],0xc          ; cursor-mode marker
//   0x424aba  add ax,di; add cx,bp; sar ax,1; sar cx,1; add ax,0x10; add cx,0x10
//   0x424ace  call 0x423677                    ; centre-tile invalidate (ax,cx)
//   0x424ad3  mov [0x99a4f6],ax / [0x99a4f8],cx / [0x99a4fa],dx
//   0x424aea  xor bh,bh                         ; bh = changed-corner counter
//   0x424aec  mov dword [0x5f494c],0            ; cost accumulator = 0
//   0x424af6  cmp byte [0x99c169],0 ; jne done  ; sub-window suppression
//   0x424b03  test dword [0x87c3bc],4 ; jne done
//   loop over ax in [x1..di] step 0x20, cx in [y1..bp] step 0x20:
//     0x424b15  cmp ax,0xfff ja skip ; cmp cx,0xfff ja skip   (bounds)
//     0x424b2a  call 0x425432 ; jb skip          ; validation: surface byte7&0x20 (land-owned)
//     0x424b35  si=cx rol7 | ax ror5 ; esi=[esi*4+0x971ef4]  ; tile-ptr -> walk to surface
//     0x424b4d  while byte[esi]&0x3c: esi+=8
//     0x424b5b  cmp dl,0xff je skipDl            ; dl=[0x5f4102] corner-A direction (0xff=no change)
//       0x424b60  dh' = byte[esi+5]>>5 ; cmp dl,dh' je skipDl
//       0x424b6a  cost += [edx&7 *4 + 0x5f4950]  ; per-corner cost table
//       0x424b7c  test bl,1 je skipDl            ; APPLY gate
//       0x424b81  shl dl,5 ; byte[esi+5]=(byte[esi+5]&0x1f)|dl
//       0x424b8b  call 0x5e5562 ; call 0x423677 ; call 0x42e18b   (invalidate/repaint)
//     0x424b9e  cmp dh,0xff je skipDh            ; dh=[0x5f4101] corner-B direction
//       0x424ba3  dl' = byte[esi+4]>>5 ; cmp dl',dh je skipDh
//       0x424bad  inc bh                          ; count a changed corner
//       0x424baf  test bl,1 je skipDh ; shl dh,5 ; byte[esi+4]=(byte[esi+4]&0x1f)|dh ; call 0x5e5562
//     0x424bc5  test bl,1 je skip2               ; APPLY
//       0x424bca  test byte[esi+5],0xe0 jne skip2 ; only when corner-A style is 0
//       0x424bd0  dl=byte[esi+6]&7 ; cmp dl,1 je skip2
//       0x424bdb  byte[esi+6]=1 ; call 0x5e5562   ; set the ownership-edge flag
//     0x424be5  cx+=0x20; cmp cx,bp jle loop
//     0x424bf3  ax+=0x20; cmp ax,di jle loop
//   0x424c01  movzx ebx,bh ; imul ebx,0x64 ; add ebx,[0x5f494c]   ; ret EBX = cost
//
// REGISTER CONTRACT (from the issuing site 0x42aeb7): AX=rectX1, CX=rectY1,
// DI=rectX2, BP=rectY2 (all = tile*32), DL=[0x5f4102], DH=[0x5f4101], BL bit0=
// APPLY, ESI=cmd(0x13, ignored here). Returns EBX = corner-count*0x64 + cost.

import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0042e18b } from "./42e18b.js";
import { FUN_005e5562 } from "./5e5562.js";

const COST_TABLE = 0x005f4950; // int32[8] per-corner cost
const TILE_PTRS = 0x00971ef4;  // tile-pointer table

// Resolve the surface tile-element for tile coords packed from ax=tileX*32,
// cx=tileY*32 (the binary's `si = cx rol7 | ax ; si ror5` packing == tileX +
// tileY*128 when ax/cx are multiples of 32), then walk the chain to the surface
// (byte0 & 0x3c == 0). Caller has already bounds-checked ax,cx < 0x1000.
function surfacePtr(heap, ax, cx) {
  let si = (((cx << 7) | (cx >>> 9)) & 0xffff);
  si = (si | (ax & 0xffff)) & 0xffff;
  si = (((si >>> 5) | (si << 11)) & 0xffff); // ror 5
  let p = heap.u32(TILE_PTRS + si * 4) >>> 0;
  while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0;
  return p;
}

export function FUN_00424ab0(heap) {
  let ax = regs.eax & 0xffff;   // rect x1 (tile*32)
  let cx = regs.ecx & 0xffff;   // rect y1
  const di = regs.edi & 0xffff; // rect x2
  const bp = regs.ebp & 0xffff; // rect y2
  const bl = regs.ebx & 0xff;   // flags (bit0 = APPLY)
  const dl0 = regs.edx & 0xff;        // corner-A direction (0xff = no change)
  const dh0 = (regs.edx >>> 8) & 0xff; // corner-B direction (0xff = no change)
  const apply = (bl & 1) !== 0;

  heap.setU8(0x0099c167, 0x0c);

  // Centre-tile invalidate: ax=(x1+x2)/2+0x10, cx=(y1+y2)/2+0x10.
  let cAx = (((((ax + di) & 0xffff) << 16) >> 17) + 0x10) & 0xffff; // sar ax,1 then +0x10
  let cCx = (((((cx + bp) & 0xffff) << 16) >> 17) + 0x10) & 0xffff;
  regs.eax = cAx; regs.ecx = cCx;     // edx (dh:dl) is passed through to 0x99a4fa
  FUN_00423677(heap);
  // [0x99a4f6/4f8/4fa] = the centre ax/cx/dx (cursor hover globals).
  heap.setU16(0x0099a4f6, regs.eax & 0xffff);
  heap.setU16(0x0099a4f8, regs.ecx & 0xffff);
  heap.setU16(0x0099a4fa, regs.edx & 0xffff);

  let bh = 0;                              // changed-corner counter (for cost)
  heap.setU32(0x005f494c, 0);              // cost accumulator

  // sub-window suppression / construction-mode gates.
  if (heap.u8(0x0099c169) !== 0 || (heap.u32(0x0087c3bc) & 4) !== 0) {
    return finish(bh);
  }

  // Outer loop over x (ax..di step 0x20), inner over y (cx..bp step 0x20).
  // do-while: body runs once, then `+=0x20; cmp r,limit; jle` continues.
  let x = ax;
  do {
    let y = cx;
    do {
      // bounds: cmp ax,0xfff ja skip ; cmp cx,0xfff ja skip
      if ((x & 0xffff) <= 0xfff && (y & 0xffff) <= 0xfff) {
        // validation: resolve surface, require land-owned (byte7 & 0x20).
        const p = surfacePtr(heap, x, y);
        if ((heap.u8(p + 7) & 0x20) !== 0) {
          // corner-A (dl): write byte[esi+5] high-3-bits.
          if (dl0 !== 0xff) {
            const cur = (heap.u8(p + 5) >>> 5) & 0xff;
            if (dl0 !== cur) {
              heap.setU32(0x005f494c,
                (heap.u32(0x005f494c) + (heap.i32(COST_TABLE + (dl0 & 7) * 4) | 0)) >>> 0);
              if (apply) {
                heap.setU8(p + 5, (heap.u8(p + 5) & 0x1f) | ((dl0 << 5) & 0xff));
                regs.eax = x; regs.ecx = y; FUN_005e5562(heap);
                regs.eax = x; regs.ecx = y; FUN_00423677(heap);
                regs.eax = x; regs.ecx = y; FUN_0042e18b(heap);
              }
            }
          }
          // corner-B (dh): write byte[esi+4] high-3-bits, count it.
          if (dh0 !== 0xff) {
            const cur = (heap.u8(p + 4) >>> 5) & 0xff;
            if (dh0 !== cur) {
              bh = (bh + 1) & 0xff;
              if (apply) {
                heap.setU8(p + 4, (heap.u8(p + 4) & 0x1f) | ((dh0 << 5) & 0xff));
                regs.eax = x; regs.ecx = y; FUN_005e5562(heap);
              }
            }
          }
          // ownership-edge flag byte[esi+6]=1, only when corner-A style==0.
          if (apply && (heap.u8(p + 5) & 0xe0) === 0 && (heap.u8(p + 6) & 7) !== 1) {
            heap.setU8(p + 6, 1);
            regs.eax = x; regs.ecx = y; FUN_005e5562(heap);
          }
        }
      }
      y = (y + 0x20) & 0xffff;          // cx += 0x20
    } while (sle16(y, bp));             // cmp cx,bp; jle loop
    x = (x + 0x20) & 0xffff;            // ax += 0x20
  } while (sle16(x, di));               // cmp ax,di; jle loop

  return finish(bh);

  function finish(bhCount) {
    const cost = (((bhCount & 0xff) * 0x64) + (heap.u32(0x005f494c) | 0)) | 0;
    regs.ebx = cost >>> 0;
    regs.eax = cost >>> 0;
    return cost >>> 0;
  }
}

// signed 16-bit <= compare (mirrors `cmp r,m ; jle`)
function sle16(a, b) {
  const sa = (a << 16) >> 16, sb = (b << 16) >> 16;
  return sa <= sb;
}

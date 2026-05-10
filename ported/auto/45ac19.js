// @manual — do not regenerate.
//
// Hand-port of FUN_0045ac19 (RCT1 title-screen sprite-walker target picker).
// Sets the "target" half of the walker state (DAT_008d7eaf/b1/b3/b5/b7) and
// arms the per-tick countdown DAT_008d7eac = 0x780 (a *16-bit* word).
//
// Disassembly transcript at 0x45ac19 (84 bytes):
//   movzx ebx, byte ptr [008d7eaa]
//   mov   cx,  word  ptr [006e3b80]
//   mov   ebx, dword ptr [ebx*4 + 0064bc70]
//   and   ecx, 7
//   mov   ebx, dword ptr [ebx + ecx*4]      ; ebx = node ptr
//   call  FUN_005df40c                       ; RNG step → AL = random byte
//   mul   byte  ptr [ebx+1]                  ; AX = AL * count
//   movzx ecx, ah                            ; ECX = scaled index
//   mov   al,  byte  ptr [ecx+ebx+2]         ; AL = direction-table[ECX]
//   call  FUN_0045ac6f                       ; sets BL/BH/CL/CH from AL
//   mov   [008d7eaf], al                     ; target sprite-direction
//   mov   [008d7eb1], bl
//   mov   [008d7eb3], bh
//   mov   [008d7eb5], cl
//   mov   [008d7eb7], ch                     ;  ← walker target sprite-id
//   mov   word [008d7eac], 0x0780            ;  ← 16-bit countdown (1920 ticks)
//   ret
//
// The auto-translator emits setU8 for [008d7eac] which truncates 0x780 → 0x80,
// breaking FUN_0045acae's countdown logic. Fixed here with setU16.

import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_0045ac6f } from "./45ac6f.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045ac19(heap) {
  // ebx = ptr_table[ DAT_008d7eaa * 4 + 0x64bc70 ]
  const aaIdx = heap.u8(0x008d7eaa);
  let ebx = heap.u32(0x0064bc70 + aaIdx * 4) >>> 0;

  // cx = DAT_006e3b80; ecx = cx & 7
  const cxMod8 = heap.u16(0x006e3b80) & 7;

  // ebx = sub_table[ebx + cxMod8 * 4]   (node pointer)
  ebx = heap.u32((ebx + cxMod8 * 4) >>> 0) >>> 0;
  regs.ebx = ebx;

  // call FUN_005df40c — updates DAT_006e3b88/8c and leaves
  // EAX = ror(prev_DAT_006e3b88, 3) (a pseudo-random 32-bit value).
  FUN_005df40c(heap);

  // mul byte ptr [ebx+1] — AX = AL * [ebx+1]; AH gets the high byte.
  const al = regs.eax & 0xff;
  const mulBy = heap.u8((ebx + 1) >>> 0);
  const ax = (al * mulBy) & 0xffff;
  const ah = (ax >>> 8) & 0xff;

  // movzx ecx, ah
  const ecx = ah & 0xff;
  regs.ecx = ecx;

  // mov al, byte ptr [ecx + ebx + 2]
  const newAl = heap.u8((ecx + ebx + 2) >>> 0);
  regs.eax = (regs.eax & ~0xff) | newAl;

  // call FUN_0045ac6f — sets BL/BH/CL/CH in regs.ebx/ecx
  FUN_0045ac6f(heap);

  // Store target half. AL still equals newAl (FUN_0045ac6f preserves AL).
  heap.setU8(0x008d7eaf, regs.eax & 0xff);
  heap.setU8(0x008d7eb1, regs.ebx & 0xff);
  heap.setU8(0x008d7eb3, (regs.ebx >>> 8) & 0xff);
  heap.setU8(0x008d7eb5, regs.ecx & 0xff);
  heap.setU8(0x008d7eb7, (regs.ecx >>> 8) & 0xff);

  // 16-bit countdown — *not* a byte. Auto-translator emits setU8(0x780)
  // which truncates to 0x80. Fixed here.
  heap.setU16(0x008d7eac, 0x0780);

  // Return EAX (= AL = random direction) so callers' wrapper sees a defined value.
  return regs.eax;
}

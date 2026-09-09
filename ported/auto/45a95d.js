// @manual — do not regenerate.
// 16-entry scrolling-text raster cache, 0x45a95d..0x45aad2. Keys contain the
// unsigned string id, two argument dwords, scroll offset and path id. EBX
// returns the cached sprite id. Cache pixels and glyph widths are BYTES.
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";

function compareWord(a, b) {
  const result = (a - b) & 65535;
  regs.cf = a < b ? 1 : 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15; regs.of = ((a ^ b) & (a ^ result)) >>> 15 & 1;
}
function add32(name, value) {
  const left = regs[name] >>> 0, result = (left + value) >>> 0;
  regs[name] = result; regs.cf = result < left ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0; regs.sf = result >>> 31;
  regs.of = (~(left ^ value) & (left ^ result)) >>> 31 & 1;
}
export function FUN_0045a95d(heap, format = FUN_00458bcf) {
  regs.ebx = heap.u32(0x981ef8);
  compareWord(heap.u16(regs.ebx + 0xe), 0);
  if (!regs.zf) { regs.ebx = 0x400; return regs.eax >>> 0; }
  heap.setU32(0x64baf8, heap.u32(0x64baf8) + 1);
  regs.ebx = 0; regs.edi = 0x6439d8; regs.edx = 0xffffffff;
  do {
    const age = heap.u32(regs.edi + 0xe);
    if (regs.edx >= age) {
      regs.edx = age;
      heap.setU32(0x64bafc, regs.ebx); heap.setU32(0x64bb00, regs.edi);
    }
    let match = (regs.eax & 65535) === heap.u16(regs.edi);
    if (match) {
      regs.esi = heap.u32(0x971e86);
      match = regs.esi === heap.u32(regs.edi + 2);
    }
    if (match) {
      regs.esi = heap.u32(0x971e8a);
      match = regs.esi === heap.u32(regs.edi + 6);
    }
    if (match && (regs.ecx & 65535) === heap.u16(regs.edi + 0xa) && (regs.ebp & 65535) === heap.u16(regs.edi + 0xc)) {
      regs.eax = heap.u32(0x64baf8);
      heap.setU32(regs.edi + 0xe, regs.eax);
      add32("ebx", 0x3f0);
      return regs.eax >>> 0;
    }
    regs.ebx++; regs.edi += 0x812;
  } while (regs.ebx < 16);
  regs.edi = heap.u32(0x64bb00);
  heap.setU16(regs.edi, regs.eax);
  regs.eax = heap.u32(0x971e86); heap.setU32(regs.edi + 2, regs.eax);
  regs.eax = heap.u32(0x971e8a); heap.setU32(regs.edi + 6, regs.eax);
  heap.setU16(regs.edi + 0xa, regs.ecx); heap.setU16(regs.edi + 0xc, regs.ebp);
  regs.eax = heap.u32(0x64baf8); heap.setU32(regs.edi + 0xe, regs.eax);
  regs.edi += 0x12; regs.eax = 0; regs.ecx = 0x200;
  // REP STOSD does not clear DF: preserve the original direction contract.
  while (regs.ecx) { heap.setU32(regs.edi, 0); regs.edi = (regs.edi + (regs.df ? -4 : 4)) >>> 0; regs.ecx--; }
  regs.edi = heap.u32(0x64bb00); regs.eax = heap.u16(regs.edi);
  regs.edi = 0x99a888; regs.ecx = 0x971e86;
  regs.cf = regs.of = regs.sf = 0; regs.zf = 1; // XOR EAX,EAX before REP
  const result = format(heap);
  if (typeof result === "number") regs.eax = result >>> 0;
  regs.edi = heap.u32(0x64bb00);
  regs.ebp = heap.u16(regs.edi + 0xc); regs.ecx = heap.u16(regs.edi + 0xa);
  add32("edi", 0x12); regs.ebp = heap.u32(0x64bb08 + regs.ebp * 4); regs.esi = 0x99a888;
  while (true) {
    const character = heap.u8(regs.esi++);
    regs.eax = ((regs.eax & 0xffffff00) | character) >>> 0;
    if (character === 0) { regs.esi = 0x99a888; continue; }
    if (character >= 0x8e && character < 0x9c) {
      regs.eax = character - 0x8e; regs.edx = heap.u32(0x93a464);
      regs.eax = heap.u8(regs.edx + regs.eax * 4);
      heap.setU8(0x64bb04, regs.eax); continue;
    }
    if (character < 0x20) { regs.eax = ((regs.eax & 0xffffff00) | ((character - 0x20) & 255)) >>> 0; continue; }
    regs.eax = character - 0x20;
    regs.edx = heap.u8(0x99a6c8 + regs.eax); regs.ebx = 0x6432d8 + regs.eax * 8;
    do {
      if (regs.ecx) { regs.ecx = (regs.ecx - 1) >>> 0; }
      else {
        regs.eax = heap.u16(regs.ebp);
        if (regs.eax === 0xffff) {
          regs.ebx = heap.u32(0x64bafc); add32("ebx", 0x3f0);
          return regs.eax >>> 0;
        }
        if (regs.eax < 0x8000) {
          let destination = (regs.edi + regs.eax) >>> 0;
          let column = heap.u8(regs.ebx);
          const color = heap.u8(0x64bb04);
          do {
            if (column & 1) heap.setU8(destination, color);
            column >>>= 1; destination = (destination + 0x40) >>> 0;
          } while (column);
          regs.eax = color; // AH shifted to zero; upper EAX was MOVZX'ed.
        }
        regs.ebp = (regs.ebp + 2) >>> 0;
      }
      regs.ebx = (regs.ebx + 1) >>> 0; regs.edx = (regs.edx - 1) >>> 0;
    } while (regs.edx);
  }
}

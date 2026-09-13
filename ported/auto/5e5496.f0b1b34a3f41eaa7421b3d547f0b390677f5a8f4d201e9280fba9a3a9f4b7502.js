// @manual — do not regenerate.
// Invalidate a sprite's screen bounds in each unzoomed viewport. The original
// brackets all general registers with PUSHAD/POPAD and returns ZF=1/CF=SF=OF=0.
import { regs } from "../../runtime/regs.js";
import { FUN_005e117d_exact } from "./5e117d.js";
const NAMES = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];
const signed = value => value << 16 >> 16;
function word(name, value) { regs[name] = ((regs[name] & 0xffff0000) | (value & 65535)) >>> 0; }
function add(name, value) {
  const before = regs[name] & 65535, result = (before + value) & 65535;
  word(name, result);
  regs.cf = before + value > 65535 ? 1 : 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15; regs.of = (~(before ^ value) & (before ^ result)) >>> 15 & 1;
}
export function FUN_005e5496(heap, invalidate = FUN_005e117d_exact) {
  const saved = Object.fromEntries(NAMES.map(name => [name, regs[name]]));
  try {
    const left = heap.u16(regs.esi + 0x16), top = heap.u16(regs.esi + 0x18);
    if (left !== 0x8000) {
      const right = heap.u16(regs.esi + 0x1a), bottom = heap.u16(regs.esi + 0x1c);
      for (let cursor = 0x9a121c; ; cursor = (cursor + 4) >>> 0) {
        const viewport = heap.u32(cursor);
        if (!viewport) break;
        if (heap.u8(viewport + 0x10) !== 0) continue;
        const x = heap.u16(viewport + 8), y = heap.u16(viewport + 0xa);
        if (signed(right) <= signed(x) || signed(bottom) <= signed(y)) continue;
        const endX = (x + heap.u16(viewport + 0xc)) & 65535;
        if (signed(left) >= signed(endX)) continue;
        const clippedLeft = signed(left) < signed(x) ? x : left;
        const clippedRight = signed(right) > signed(endX) ? endX : right;
        const endY = (y + heap.u16(viewport + 0xe)) & 65535;
        if (signed(top) >= signed(endY)) continue;
        const clippedTop = signed(top) < signed(y) ? y : top;
        const clippedBottom = signed(bottom) > signed(endY) ? endY : bottom;
        // AX/BX/DX/BP/ECX are restored around each call, even if the child
        // changes them. EDI retains the cursor's upper half through MOV DI.
        Object.assign(regs, saved);
        regs.esi = viewport; regs.edi = ((cursor & 0xffff0000) | endY) >>> 0;
        regs.ecx = (regs.ecx & 0xffffff00) >>> 0;
        word("eax", clippedLeft - x); word("ebx", clippedTop - y);
        word("edx", clippedRight - x); word("ebp", clippedBottom - y);
        add("eax", heap.u16(viewport + 4)); add("ebx", heap.u16(viewport + 6));
        add("edx", heap.u16(viewport + 4)); add("ebp", heap.u16(viewport + 6));
        invalidate(heap);
      }
    }
    regs.cf = regs.sf = regs.of = 0; regs.zf = 1;
    return saved.eax >>> 0;
  } finally { Object.assign(regs, saved); }
}

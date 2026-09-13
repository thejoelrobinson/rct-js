// @manual — do not regenerate.
// Resolve a viewport target to AX/CX/DX. DL selects ride, peep, vehicle or
// packed coordinates; ESI is preserved. 0x429c3d..0x429d40.
import { regs } from "../../runtime/regs.js";
import { FUN_00423677_exact } from "./423677.js";

const word = (name, value) => { regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0; };
function compare(a, b, bits) {
  const result = (a - b) & (bits === 8 ? 255 : 65535);
  regs.cf = a < b ? 1 : 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> (bits - 1); regs.of = ((a ^ b) & (a ^ result)) >>> (bits - 1) & 1;
}
function logic(value, bits) {
  regs.cf = regs.of = 0; regs.zf = value === 0 ? 1 : 0; regs.sf = value >>> (bits - 1) & 1;
}
function add(name, right, bits = 32) {
  const left = bits === 32 ? regs[name] >>> 0 : regs[name] & 65535;
  const result = bits === 32 ? (left + right) >>> 0 : (left + right) & 65535;
  if (bits === 32) regs[name] = result; else word(name, result);
  regs.cf = left + right > (bits === 32 ? 0xffffffff : 65535) ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0; regs.sf = result >>> (bits - 1) & 1;
  regs.of = (~(left ^ right) & (left ^ result)) >>> (bits - 1) & 1;
}
function shiftRight16(name) {
  const value = regs[name] >>> 0;
  regs[name] = value >>> 16; regs.cf = value >>> 15 & 1;
  regs.zf = regs[name] === 0 ? 1 : 0; regs.sf = 0;
  // OF is undefined for multi-bit shifts; the interpreter retains it.
}
export function FUN_00429c3d(heap, terrain = FUN_00423677_exact) {
  const savedEsi = regs.esi;
  const kind = regs.edx & 255;
  const invalid = () => { word("eax", 0x8000); return regs.eax >>> 0; };
  const coordinates = address => {
    word("eax", heap.u16(address + 0xe));
    word("ecx", heap.u16(address + 0x10));
    word("edx", heap.u16(address + 0x12));
  };
  try {
    compare(kind, 1, 8);
    if (kind === 1) {
      regs.esi = Math.imul(regs.ecx, 0x260) >>> 0;
      word("eax", heap.u16((regs.esi + 0x887448) >>> 0));
      compare(regs.eax & 65535, 65535, 16);
      if (regs.zf) return invalid();
      const packed = regs.eax & 65535;
      word("eax", (packed & 255) << 5); word("ecx", (packed >>> 8) << 5);
      add("eax", 16, 16); add("ecx", 16, 16);
      terrain(heap);
      logic((regs.edx & 0xffff0000) >>> 0, 32);
      if (!regs.zf) shiftRight16("edx");
      return regs.eax >>> 0;
    }
    compare(kind, 2, 8);
    if (kind === 2) {
      regs.esi = (regs.ecx & 65535) << 8; add("esi", 0x743b94);
      coordinates(regs.esi);
      compare(regs.eax & 65535, 0x8000, 16);
      if (!regs.zf) return regs.eax >>> 0;
      const action = heap.u8(regs.esi + 0x2b);
      compare(action, 3, 8);
      if (!regs.zf) { compare(action, 7, 8); if (!regs.zf) return invalid(); }
      regs.edx = heap.u8(regs.esi + 0x68) * 0x260;
      logic(heap.u16(regs.edx + 0x887422) & 1, 16);
      if (regs.zf) return invalid();
      regs.ecx = heap.u8(regs.esi + 0x6a);
      regs.edx = heap.u16(regs.edx + regs.ecx * 2 + 0x88747e) << 8;
      add("edx", 0x743b94);
      regs.ecx = (regs.ecx & 0xffffff00) | heap.u8(regs.esi + 0x6b);
      while (true) {
        logic(regs.ecx & 255, 8);
        if (regs.zf) break;
        regs.ecx = (regs.ecx & 0xffffff00) | ((regs.ecx - 1) & 255);
        regs.edx = heap.u16(regs.edx + 0x3e) << 8;
        add("edx", 0x743b94);
      }
      coordinates(regs.edx);
      return regs.eax >>> 0;
    }
    compare(kind, 3, 8);
    if (kind === 3) {
      regs.esi = (regs.ecx & 65535) << 8; add("esi", 0x743b94);
      coordinates(regs.esi);
      return regs.eax >>> 0;
    }
    compare(kind, 5, 8);
    if (kind === 5) {
      word("eax", regs.ecx); shiftRight16("ecx"); terrain(heap);
      return regs.eax >>> 0;
    }
    return invalid();
  } finally { regs.esi = savedEsi; }
}

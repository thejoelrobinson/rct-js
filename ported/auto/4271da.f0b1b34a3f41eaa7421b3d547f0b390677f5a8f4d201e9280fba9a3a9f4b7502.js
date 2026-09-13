// @manual — do not regenerate.
// Source: binary/rct.exe @ 0x4271da..0x427246.

import { regs } from "../../runtime/regs.js";
import { FUN_00458678 } from "./458678.js";
import { FUN_005e4400 } from "./5e4400.js";
import { FUN_005e5bd8_exact } from "./5e5bd8.js";

const setLo16 = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
};

export function FUN_004271da(heap) {
  if ((regs.edi >>> 0) === 0xffffffff) return regs.eax >>> 0;

  FUN_005e4400(heap);
  const window = regs.esi >>> 0;
  const savedEsi = regs.esi >>> 0;

  setLo16("ecx", heap.u16(window + 0x20) + 0x78);
  setLo16("edx", heap.u16(window + 0x22) + 0x10);
  setLo16("ebx", heap.u16(0x005f4a94));
  setLo16("ebp", 0x00ee);
  regs.esi = 0x005f4a98;
  if (heap.u16(0x005f4a96) !== 0xffff) setLo16("edx", (regs.edx & 0xffff) - 0x0a);
  FUN_00458678(heap);
  regs.esi = savedEsi;

  setLo16("ebx", heap.u16(0x005f4a96));
  if ((regs.ebx & 0xffff) === 0xffff) return regs.eax >>> 0;
  setLo16("ecx", heap.u16(window + 0x20) + 0x78);
  setLo16("edx", heap.u16(window + 0x22) + 0x1a);
  setLo16("ebp", 0x00ee);
  regs.esi = 0x005f4a98;
  FUN_00458678(heap);
  regs.esi = savedEsi;
  return regs.eax >>> 0;
}

export function FUN_004271bb(heap) {
  const event = regs.ebp & 0xffff;
  const eventResult = (event - 5) & 0xffff;
  regs.cf = event < 5 ? 1 : 0;
  regs.zf = eventResult === 0 ? 1 : 0;
  regs.sf = eventResult >>> 15;
  regs.of = ((event ^ 5) & (event ^ eventResult)) >>> 15 & 1;
  if (!regs.zf) return regs.eax >>> 0;
  const before = heap.u16(regs.esi + 0x15a);
  const count = (before + 1) & 0xffff;
  heap.setU16(regs.esi + 0x15a, count);
  const result = (count - 7) & 0xffff;
  regs.cf = count < 7 ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = ((count ^ 7) & (count ^ result)) >>> 15 & 1;
  if (regs.cf) return regs.eax >>> 0;
  return FUN_005e5bd8_exact(heap, (targetHeap, address) => {
    if (address !== 0x4271bb) throw new Error(`unexpected build-window callback 0x${address.toString(16)}`);
    return FUN_004271bb(targetHeap);
  });
}

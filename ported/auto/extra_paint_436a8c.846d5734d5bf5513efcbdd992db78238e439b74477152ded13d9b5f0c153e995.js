// @manual — do not regenerate.
//
// Off-map terrain painters at PTR_LAB_00436a8c. 0x4367cb tail-jumps here
// after saving EAX and ECX; each rotation computes a screen-space Y and
// invokes the same 0x431bb8 paint-slot allocator used by the in-map terrain
// painter. The binary ends with `pop ecx; pop eax; ret`, so the hook must
// consume those two saved values before the bridge supplies the final ret.

import { paintBody431bb8 } from "./extra_paint_431bb8.js";

const RET_SENTINEL = 0xdeadbeef >>> 0;

function u16(value) { return value & 0xffff; }
function i16(value) { return (value << 16) >> 16; }

function readU32(memory, address) {
  return (memory[address] | (memory[address + 1] << 8) |
    (memory[address + 2] << 16) | (memory[address + 3] << 24)) >>> 0;
}

function restoreCallerRegs(cpu) {
  const esp = cpu.regs.esp >>> 0;
  const top = readU32(cpu.memory, esp);
  if (top !== RET_SENTINEL) {
    cpu.regs.ecx = top;
    cpu.regs.eax = readU32(cpu.memory, esp + 4);
    cpu.regs.esp = (esp + 8) >>> 0;
    return;
  }
  cpu.regs.ecx = readU32(cpu.memory, esp + 4);
  cpu.regs.eax = readU32(cpu.memory, esp + 8);
}

function paintOffMap(heap, cpu, rotation) {
  let ax = cpu.regs.eax & 0xffff;
  let cx = cpu.regs.ecx & 0xffff;
  let dx;

  if (rotation === 1) {
    ax = u16(ax + 0x20);
    dx = u16(cx - ax);
    cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | ax;
  } else if (rotation === 2) {
    ax = u16(ax + 0x20);
    cx = u16(cx + 0x20);
    dx = u16(-(ax + cx));
    cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | ax;
    cpu.regs.ecx = (cpu.regs.ecx & 0xffff0000) | cx;
  } else if (rotation === 3) {
    cx = u16(cx + 0x20);
    dx = u16(ax - cx);
    cpu.regs.ecx = (cpu.regs.ecx & 0xffff0000) | cx;
  } else {
    dx = u16(ax + cx);
  }

  dx = u16(i16(dx) >> 1);
  const dpi = cpu.regs.edi >>> 0;
  const top = i16(u16(dx - 0x10));
  if (i16(u16(top + 0x20)) <= heap.i16(dpi + 6)) return;

  const bottom = i16(u16(top - 0x14 - heap.u16(dpi + 0x0a)));
  if (bottom >= heap.i16(dpi + 6)) return;

  heap.setU16(0x00991f70, ax);
  heap.setU16(0x00991f74, cx);
  heap.setU8(0x00991f78, 0);

  const edxHigh = cpu.regs.edx & 0xffff0000;
  cpu.regs.edx = edxHigh | 0x10;
  cpu.regs.ebx = 0x579f;
  cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | 0xff00;
  cpu.regs.ecx &= 0xffffff00;
  cpu.regs.edi = (cpu.regs.edi & 0xffff0000) | 0x20;
  cpu.regs.esi = (cpu.regs.esi & 0xffff0000) | 0x20;
  cpu.regs.ebp = heap.u32(0x00991f88) >>> 0;
  paintBody431bb8(heap, cpu, cpu.regs.ebp & 3);
}

export function install436a8cHooks(setEipHook, heap) {
  const variants = [
    [0x00436a9c, 0],
    [0x00436aa4, 1],
    [0x00436ab0, 2],
    [0x00436ac3, 3],
  ];
  for (const [address, rotation] of variants) {
    setEipHook(address, (cpu) => {
      if (typeof globalThis._renderTrace === "function") {
        globalThis._renderTrace(`FUN_extra_paint_${address.toString(16)}`);
      }
      paintOffMap(heap, cpu, rotation);
      restoreCallerRegs(cpu);
    });
  }
}

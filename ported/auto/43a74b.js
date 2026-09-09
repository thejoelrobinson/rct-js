// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43a74b is an extra entry
// (lifter/extra-entries.json, FUN_extra_peepstate_43a74b) Ghidra never split
// out. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43a74b 0x43a756
//
// FUN_0043a74b — peep-state handler for state 4: entry 4 of the peep-state
// vtable PTR_0062d4ac (pointer at 0x62d4bc), reached ONLY via the dispatch
// tail of FUN_00439822 (0x439906: movzx edi,[esi+0x2b]; jmp [edi*4+0x62d4ac];
// no E8/E9 sites target it). Entry: ESI = peep sprite ptr, EDI = 4.
//
// The body is a TWO-instruction sub-state dispatcher:
//   0x43a74b: movzx edi, byte [esi+0x2c]     ; ride sub-state
//   0x43a74f: jmp dword [edi*4 + 0x62d50c]   ; tail-jmp into the handler
// Sub-state table at DATASEG 0x62d50c (16 entries):
//   0:0x43a756  1-3:0x43ab17  4:0x43ba77  5:0x43ba97  6:0x43bb9e
//   7:0x43bb9f  8:0x43c210  9:0x43c2ec  10,11:NULL  12:0x43b2a6
//   13:0x43c065  14:0x43b387  15:0x43b910
// The handler family is a multi-thousand-instruction subsystem (ride
// enter/board/ride/exit sequencing) — NOT transcribed here. This port keeps
// the family in the interpreter: the tail-jmp is bridged with callNative
// (raw interp on the bridge cpu, full register file synced in and back out),
// which is exactly what the binary's `jmp` does from the caller's point of
// view (the handler's ret returns to the dispatcher's caller; the harness
// simulates our final ret). NULL slots (sub-states 10/11) are followed
// faithfully into callNative(0) — the binary would wild-jump there too;
// they are unreachable in valid states.
//
// Register-exactness: movzx edi is a FULL 32-bit write (zero-extend) and
// happens unconditionally; all other exit registers/eax are the handler's
// interpreter exit file, synced by callNative.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

export function FUN_0043a74b(heap) {
  // 0x43a74b: movzx edi, byte [esi+0x2c]
  regs.edi = heap.u8(((regs.esi >>> 0) + 0x2c) >>> 0) >>> 0;
  // 0x43a74f: jmp dword [edi*4 + 0x62d50c]  (tail — bridged via callNative)
  callNative(heap.u32((0x0062d50c + regs.edi * 4) >>> 0), []);
}

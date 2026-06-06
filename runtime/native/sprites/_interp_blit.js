// GROUND-TRUTH ORACLE (temporary, β2 adjudication).
//
// Routes the in-game sprite-blit entrypoints (0x9b438b / 9b4457 / 9b4660 /
// 9b4911) through the x86 interpreter executing the ORIGINAL rct.exe code,
// which installPainterBridge() already overlaid onto heap.bytes during
// createRuntime(). The interpreter handles the whole blit subtree internally
// (its real CALL instructions reach 9b4457/4660/4911/64ea/6863/8491 directly),
// so only the JS-reachable entrypoints need routing here.
//
// Purpose: the replay-hash gate proves pixel-NEUTRALITY, not correctness, and
// diff-subsystem can't adjudicate (its scenario captures don't seed full global
// state, so BOTH the old chain and decoder.js fail it identically). This module
// produces the only ground truth that accounts for full state: the title-screen
// back-buffer hash as drawn by the original binary's own blit code. Compare it
// against the old-chain hash and the decoder.js hash to learn which is correct.
//
// NOT production code — the 4 shims only import this while capturing the oracle.
import { regs } from "../../regs.js";
import { makeCpu, runFunction } from "../../../harness/x86.js";

let _cpu = null;
// Diagnostics so we can confirm the oracle actually executed the blits rather
// than erroring out on every call (which would yield a meaningless sparse hash).
export const stats = { calls: 0, errors: 0, steps: 0, byAddr: {}, lastErr: null };
globalThis.__interpBlitStats = stats;

export function interpBlit(heap, addr) {
  if (!_cpu) {
    _cpu = makeCpu(heap.bytes);
    _cpu.bailOnWildJump = true;
  }
  const cpu = _cpu;
  stats.calls++;
  stats.byAddr[addr] = (stats.byAddr[addr] || 0) + 1;
  // Diagnostic: log the dst pointer (regs.edi) the JS outer passed to an inner
  // blitter, keyed by blit index (incremented externally on SRC_BASE writes).
  if (globalThis.__ediLog && (addr === 0x9b4660 || addr === 0x9b4911)) {
    globalThis.__ediLog.push([(globalThis.__blitN | 0), regs.edi >>> 0]);
  }
  // One-shot entry dump for the first 0x9b438b call (β2 clip-bug diagnosis).
  if (addr === 0x9b438b && globalThis.__dumpBlit0 && !stats._dumped) {
    stats._dumped = true;
    const edi = regs.edi >>> 0;
    const i16 = (a) => { const v = heap.u16(a); return v >= 0x8000 ? v - 0x10000 : v; };
    console.error(`[blit0 entry] eax=0x${(regs.eax>>>0).toString(16)} ebx=0x${(regs.ebx>>>0).toString(16)} ecx=${regs.ecx<<16>>16} edx=${regs.edx<<16>>16} edi=0x${edi.toString(16)}`);
    console.error(`[blit0 DPI@edi] x=${i16(edi+4)} y=${i16(edi+6)} w=${i16(edi+8)} h=${i16(edi+10)} pitchExtra=${i16(edi+12)} zoom=${i16(edi+14)} px=0x${(heap.u32(edi)>>>0).toString(16)}`);
  }
  // Sync translator-side regs → cpu (mirror of painter-bridge's eip-hook prelude).
  cpu.regs.eax = regs.eax >>> 0;
  cpu.regs.ecx = regs.ecx >>> 0;
  cpu.regs.edx = regs.edx >>> 0;
  cpu.regs.ebx = regs.ebx >>> 0;
  cpu.regs.esi = regs.esi >>> 0;
  cpu.regs.edi = regs.edi >>> 0;
  cpu.regs.ebp = regs.ebp >>> 0;
  // Reset eflags/FPU so a leading conditional jump doesn't inherit stale flags.
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
  try {
    stats.steps += runFunction(cpu, addr >>> 0, {
      stackTop: heap.bytes.byteLength,
      limit: globalThis.__painterStepLimit || 50_000_000,
    });
  } catch (e) {
    // Mirror painter-bridge: swallow wild-shim / OOB so the boot continues and
    // the rest of the frame still renders. A swallowed blit just leaves those
    // pixels unwritten — visible in the hash, which is the point.
    stats.errors++;
    stats.lastErr = (e && e.message) ? e.message.slice(0, 120) : String(e);
  }
  regs.eax = cpu.regs.eax >>> 0;
  regs.ecx = cpu.regs.ecx >>> 0;
  regs.edx = cpu.regs.edx >>> 0;
  regs.ebx = cpu.regs.ebx >>> 0;
  regs.esi = cpu.regs.esi >>> 0;
  regs.edi = cpu.regs.edi >>> 0;
  regs.ebp = cpu.regs.ebp >>> 0;
  return regs.eax;
}

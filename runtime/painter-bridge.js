// Bridge that lets state.fnDispatch invoke functions Ghidra couldn't recover
// (the rotation-painter jumptable targets in CODESEG). For each painter
// address, registers a shim that:
//   1. Builds a cpu over heap.bytes (shared memory — writes flow back).
//   2. Mirrors the translator-side `regs` (runtime/regs.js) into cpu.regs.
//   3. Runs the function via the x86 interpreter, which handles the 0x66
//      operand-size prefix that's pervasive in these painters (the static
//      lifter mis-decodes 0x66 on register opcodes — see run.js's blanket
//      drop). The interpreter is the byte-equal oracle, so this is safe.
//   4. Mirrors cpu.regs back into `regs` so the caller's expectations match
//      the binary's calling convention (eax = return value, esi/edi/ebp
//      callee-preserved, etc.).
//
// The painter set comes from lifter/extra-entries.json — the 20 functions
// whose addresses we extracted from the 5 rotation jumptables (PTR_LAB_
// 00431bb8 / 00432204 / 00434e98 / 00436b40 / 005e5874). Each table is
// indexed by DAT_00991f88 (camera rotation, 0..3).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { makeCpu, runFunction } from "../harness/x86.js";
import { loadPEFromBytes } from "../harness/loader.js";
import { regs } from "./regs.js";
import { state } from "./win32/context.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXTRA_ENTRIES = resolve(HERE, "..", "lifter", "extra-entries.json");

function loadPainterAddresses() {
  const json = JSON.parse(readFileSync(EXTRA_ENTRIES, "utf8"));
  return json
    .filter((x) => x.addr !== undefined)
    .map((x) => (typeof x.addr === "string" ? parseInt(x.addr, 16) : x.addr));
}

// Overlay the .text and CODESEG byte ranges from rct.exe into `memory`.
// tools/extract-data.js strips these from data.bin (translator and lifter
// don't need them), but the painter bridge runs the *interpreter* — it
// needs the raw bytes at the painter addresses + any CODESEG callees,
// plus the rotation-jumptable contents at 0x431bb8 / 0x432204 / 0x434e98
// / 0x436b40 / 0x005e5874 (which sit inside CODESEG).
export function overlayCodeSections(memory, exeBytes) {
  const pe = loadPEFromBytes(exeBytes);
  let copied = 0;
  for (const s of pe.sections) {
    if (s.name !== ".text" && s.name !== "CODESEG") continue;
    const dst = pe.imageBase + s.virtualAddress;
    const len = Math.min(s.sizeOfRawData, s.virtualSize);
    memory.set(pe.memory.subarray(dst, dst + len), dst);
    copied += len;
  }
  return copied;
}

export function installPainterBridge(heap, opts = {}) {
  const memory = heap.bytes;

  // Load code-section bytes. In Node we can read rct.exe directly. In the
  // browser, callers must pass `opts.exeBytes` (a Uint8Array of rct.exe).
  let exeBytes = opts.exeBytes;
  if (!exeBytes) {
    try {
      const exePath = resolve(HERE, "..", "binary", "rct.exe");
      exeBytes = readFileSync(exePath);
    } catch (e) {
      if (typeof console !== "undefined") {
        console.warn(`[painter-bridge] no rct.exe available; painters will not run: ${e.message}`);
      }
      return 0;
    }
  }
  const codeBytes = overlayCodeSections(memory, exeBytes);
  if (typeof console !== "undefined") {
    console.log(`[painter-bridge] overlaid ${codeBytes.toLocaleString()} code bytes from rct.exe`);
  }

  const cpu = makeCpu(memory);
  // Carve a private stack region from the top of memory. The translator
  // uses heap.allocFrame() which decrements heap.sp from memory.byteLength
  // down; reserve the top 64 KB exclusively for the painter cpu's ESP.
  const STACK_REGION = 64 * 1024;
  const STACK_TOP = memory.byteLength;
  heap.sp = Math.min(heap.sp, STACK_TOP - STACK_REGION);

  const painters = loadPainterAddresses();
  let bridged = 0;
  for (const addr of painters) {
    state.fnDispatch.set(addr, function _paintShim(_heap, ..._args) {
      // Sync translator regs → cpu.regs. We sync the integer GPRs; eflags
      // and FPU aren't expected to be live across the call boundary.
      cpu.regs.eax = regs.eax >>> 0;
      cpu.regs.ecx = regs.ecx >>> 0;
      cpu.regs.edx = regs.edx >>> 0;
      cpu.regs.ebx = regs.ebx >>> 0;
      cpu.regs.esi = regs.esi >>> 0;
      cpu.regs.edi = regs.edi >>> 0;
      cpu.regs.ebp = regs.ebp >>> 0;
      try {
        runFunction(cpu, addr, { stackTop: STACK_TOP, limit: 50_000_000 });
      } catch (e) {
        if (typeof console !== "undefined") {
          console.warn(`[painter-bridge] 0x${addr.toString(16)}: ${(e.message || e).slice(0, 160)}`);
        }
      }
      // Sync back. eax holds the return value per Win32/cdecl.
      regs.eax = cpu.regs.eax >>> 0;
      regs.ecx = cpu.regs.ecx >>> 0;
      regs.edx = cpu.regs.edx >>> 0;
      regs.ebx = cpu.regs.ebx >>> 0;
      regs.esi = cpu.regs.esi >>> 0;
      regs.edi = cpu.regs.edi >>> 0;
      regs.ebp = cpu.regs.ebp >>> 0;
      return regs.eax;
    });
    bridged++;
  }
  return bridged;
}

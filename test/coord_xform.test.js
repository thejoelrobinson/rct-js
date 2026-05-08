// Progressive ret-overlay validation of FUN_0041fa6f.
//
// We push the `0xc3` overlay further into the function in milestones, each
// validating one structural phase. The final milestone is the function's
// natural ret at 0x41fb63 (no overlay needed — the original binary returns
// there).
//
// At each milestone we compare the harness-executed register state against
// a JS port that computes only up to that milestone. Any mismatch points at
// either a missing opcode in the interpreter or a misread of the asm.

import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { loadPE } from "../harness/loader-node.js";
import { makeCpu, runFunction } from "../harness/x86.js";
import { coordTransform } from "../src/coord_xform.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

const FUNC_START = 0x0041fa6f;
const NATURAL_RET = 0x0041fb63;

function setup(retOverlayAddr) {
  const image = loadPE(RCT_EXE);
  const stack = 0x10000;
  const memory = new Uint8Array(image.totalSize + stack);
  memory.set(image.memory, 0);
  if (retOverlayAddr !== null) memory[retOverlayAddr] = 0xc3;
  return { memory, stackTop: image.totalSize + stack };
}

function runWithInputs(retOverlay, { ediBase, w_ac, w_ae, w_b0 }) {
  const { memory, stackTop } = setup(retOverlay);
  const writeWord = (addr, w) => {
    memory[addr]     =  w        & 0xff;
    memory[addr + 1] = (w >>> 8) & 0xff;
  };
  writeWord(ediBase + 0xac, w_ac);
  writeWord(ediBase + 0xae, w_ae);
  writeWord(ediBase + 0xb0, w_b0);

  const cpu = makeCpu(memory);
  cpu.regs.edi = ediBase;
  cpu.regs.ebx = 0xaaaaaaaa; cpu.regs.ecx = 0xbbbbbbbb; cpu.regs.ebp = 0xcccccccc; // sentinels
  runFunction(cpu, FUNC_START, { stackTop });
  return { ebx: cpu.regs.ebx >>> 0, ecx: cpu.regs.ecx >>> 0, ebp: cpu.regs.ebp >>> 0 };
}

// JS-port slices: each function reproduces the work done up to a milestone.
// We share the helpers from the real port to avoid divergence.
function structFromInputs({ w_ac, w_ae, w_b0 }) {
  const buf = new Uint8Array(0x200);
  buf[0xac]     =  w_ac        & 0xff;
  buf[0xac + 1] = (w_ac >>> 8) & 0xff;
  buf[0xae]     =  w_ae        & 0xff;
  buf[0xae + 1] = (w_ae >>> 8) & 0xff;
  buf[0xb0]     =  w_b0        & 0xff;
  buf[0xb0 + 1] = (w_b0 >>> 8) & 0xff;
  return buf;
}

const DEFAULT_INPUTS = { ediBase: 0x900000, w_ac: 0x1234, w_ae: 0xfedc, w_b0: 0x0150 };

describe("FUN_0041fa6f progressive port (ret-overlay validation)", () => {
  // Milestone helper: run the harness with a ret-overlay at `atAddr`, compare
  // against `coordTransform(struct, phase)` which computes only up to that phase.
  const checkMilestone = (label, atAddr, phase) => {
    it(`milestone: ${label}`, () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 0xffff }),
          fc.integer({ min: 0, max: 0xffff }),
          fc.integer({ min: 0, max: 0xffff }),
          (w_ac, w_ae, w_b0) => {
            const harness = runWithInputs(atAddr, { ediBase: 0x900000, w_ac, w_ae, w_b0 });
            const port = coordTransform(structFromInputs({ w_ac, w_ae, w_b0 }), phase);
            return harness.ebx === port.ebx && harness.ecx === port.ecx && harness.ebp === port.ebp;
          },
        ),
        { numRuns: 64 },
      );
    });
  };

  // ret-overlay address ⟶ JS port phase number (run only that many phases)
  checkMilestone("phase 1 done — ebx/ecx/ebp from field 0xac",        0x41faab, 1);
  checkMilestone("phase 2 done — ebx adds clamped(0xae) contribution", 0x41facf, 2);
  checkMilestone("phase 3 done — ecx adds (0xae-100) contribution",    0x41fae4, 3);
  checkMilestone("phase 4 done — ebp adds (0xae-100) contribution",    0x41faf9, 4);
  checkMilestone("phase 5 done — ebx adds clamped(0xb0) contribution", 0x41fb17, 5);
  checkMilestone("phase 6 done — branchy thresholds applied",          0x41fb51, 6);

  // The natural ret — no overlay needed. Full function execution end-to-end.
  it("milestone: full function (natural ret) — byte-equal across 200 random inputs", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 0xffff }),
        fc.integer({ min: 0, max: 0xffff }),
        fc.integer({ min: 0, max: 0xffff }),
        (w_ac, w_ae, w_b0) => {
          const harness = runWithInputs(null, { ediBase: 0x900000, w_ac, w_ae, w_b0 });
          const port = coordTransform(structFromInputs({ w_ac, w_ae, w_b0 }));
          return harness.ebx === port.ebx && harness.ecx === port.ecx && harness.ebp === port.ebp;
        },
      ),
      { numRuns: 200 },
    );
  });
});

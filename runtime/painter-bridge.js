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

import { makeCpu, runFunction, setEipHook, setShimInvoker } from "../harness/x86.js";
import { loadPEFromBytes } from "../harness/loader.js";
import { getShim, invokeShim } from "../harness/shims.js";
import { regs } from "./regs.js";
import { state } from "./win32/context.js";
import { FUN_00444927 } from "../ported/auto/444927.js";
import { FUN_00452fce } from "../ported/auto/452fce.js";
import { install4368d8Hooks } from "../ported/auto/extra_paint_4368d8.js";
import { install421d2cHook } from "../ported/auto/extra_paint_421d2c.js";
// Phase R+12: hand-port scaffold for fence/wall per-element painter (stub).
import { install444e08Hook } from "../ported/auto/extra_paint_444e08.js";
// Phase R+12b: hand-port for small-scenery per-element painter.
import { install5ce7f8Hook } from "../ported/auto/extra_paint_5ce7f8.js";
// Phase R+14b: hand-port for palette-swizzle helper #1 of 4 called from
// the tail of 0x421d2c (terrain painter).
import { install420d9cHook } from "../ported/auto/extra_paint_420d9c.js";

// Node-only fs/path/url accessors. Top-level-await dynamic imports so the
// browser (which has no `node:` scheme) can still load this module — the
// imports reject and we leave the helpers null. Browser callers must pass
// opts.exeBytes + opts.painterAddresses to installPainterBridge instead.
let _nodeFs = null, _nodePath = null, _nodeUrl = null;
try { _nodeFs   = await import("node:fs");   } catch (_) {}
try { _nodePath = await import("node:path"); } catch (_) {}
try { _nodeUrl  = await import("node:url");  } catch (_) {}

function nodeReadExtraEntries() {
  if (!_nodeFs || !_nodePath || !_nodeUrl) return null;
  const here = _nodePath.dirname(_nodeUrl.fileURLToPath(import.meta.url));
  const path = _nodePath.resolve(here, "..", "lifter", "extra-entries.json");
  return JSON.parse(_nodeFs.readFileSync(path, "utf8"));
}

function nodeReadExe() {
  if (!_nodeFs || !_nodePath || !_nodeUrl) return null;
  const here = _nodePath.dirname(_nodeUrl.fileURLToPath(import.meta.url));
  return _nodeFs.readFileSync(_nodePath.resolve(here, "..", "binary", "rct.exe"));
}

function loadPainterAddresses(opts) {
  if (Array.isArray(opts?.painterAddresses)) return opts.painterAddresses;
  const json = opts?.extraEntriesJson || nodeReadExtraEntries();
  if (!json) return [];
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
    try { exeBytes = nodeReadExe(); } catch (_) {}
    if (!exeBytes) {
      if (typeof console !== "undefined") {
        console.warn(`[painter-bridge] no rct.exe available; painters will not run`);
      }
      return 0;
    }
  }
  const codeBytes = overlayCodeSections(memory, exeBytes);
  if (typeof console !== "undefined") {
    console.log(`[painter-bridge] overlaid ${codeBytes.toLocaleString()} code bytes from rct.exe`);
  }

  const cpu = makeCpu(memory);
  // Painters that wild-jump into low memory (e.g. a NULL slot in a sprite-class
  // vtable like 0x628a94[15]=0) should bail cleanly instead of executing
  // 70 000+ zero-byte instructions before some downstream OOB aborts the tick.
  cpu.bailOnWildJump = true;

  // Register a shim invoker for the bridge cpu. When the interpreter's EIP
  // lands in SHIM_BASE (>= 0xF0000000), it dispatches to this function. We
  // need this for two reasons:
  //
  //   (1) Painters legitimately CALL Win32 imports (KERNEL32 timing helpers,
  //       USER32 cursor helpers, etc.). Without an invoker the interpreter
  //       throws and the bridge's per-painter try/catch turns each into a
  //       `shim invoked but no invoker registered` warning.
  //
  //   (2) Painters occasionally compute a bogus CALL target that lands in
  //       SHIM_BASE but doesn't correspond to any registered IAT entry (e.g.
  //       0x5d7503 the peep painter, which after Phase R+7 lifted sprite
  //       coverage from 1/31 → 31/31, fires ~12 times per tick and produces
  //       one warning per tick with eip=0xfff9a6f0, a value that's not in the
  //       static IAT [0xF0000000..0xF0000338] or the dynamic-sentinel range
  //       [0xF1000000+]. The "return address" pushed for that call also lands
  //       in DATASEG (0x6f8cd0) — so the control flow has already gone off
  //       the rails before the CALL fires. Following the bogus return would
  //       just let the interpreter walk into data and throw a different
  //       opcode error on the next step (empirically `unsupported 0x8f /3`).
  //
  //       Rather than crashing the entire painter run, silently treat unknown
  //       sentinels as a bridge-only `WildShimError` and let the painter-shim
  //       try/catch below recognize it and stay silent. The 11/12 healthy
  //       peep invocations continue to render; pixel counts and palette
  //       diversity are unaffected (the bad peep was producing nothing
  //       useful either way).
  setShimInvoker((c, sentinel) => {
    const spec = getShim(sentinel);
    if (spec) {
      // Real IAT entry — delegate to the standard invoker, which handles
      // arg unpacking, eax write-back, and stdcall esp adjustment.
      invokeShim(c, sentinel);
      return;
    }
    // Unknown sentinel — bail out of runFunction. Throw a tagged error the
    // outer try/catch can swallow silently.
    const err = new Error(`wild shim eip=0x${sentinel.toString(16)}`);
    err._wildShim = true;
    throw err;
  });

  // Install a JS hook for FUN_00444927 (sprite tile-grid relink + bbox).
  // When a bridge-shim runs binary code that CALLs 0x444927 (e.g. the per-sprite
  // update vtable target at 0x5da274), the interpreter's chain-walk loop at
  // 0x444985 deadlocks because the bridge-cpu's bucket-chain state diverges
  // from what the binary expects (the chain index at sprite+0xa is a stride-1
  // u16 that the JS hand-port computes correctly while the bridge cpu may
  // observe a not-yet-relinked state when called mid-update). Replace the
  // entire native call with the JS hand-port, which already handles all four
  // rotation branches inline and writes the post-relink bbox to esi+0x16..0x1c.
  // The hook syncs cpu.regs ↔ regs so the hand-port reads the right inputs.
  setEipHook(0x444927, (cpu) => {
    // Sync cpu → regs so FUN_00444927 reads bridge-cpu's register state.
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    try { FUN_00444927(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // Sync back regs → cpu. The hand-port only writes regs.eax (the return
    // value) — but the binary's 0x444927 prologue saves eax/ecx/edi and the
    // epilogue restores them. Mirror that by leaving cpu.regs.eax/ecx/edi
    // unchanged from their pre-call values (they're already in cpu.regs from
    // before this hook fired). Sync only the writeable regs back.
    cpu.regs.edx = regs.edx >>> 0;
    cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
  });

  // Install JS hooks for the per-tile surface painters at PTR_LAB_004368c8
  // (0x4368d8 / 0x4368e0 / 0x4368ec / 0x4368ff). The native body throws
  // `mem8 OOB: 0xa200460` warnings when the tile-element chain walk at
  // 0x4369e7 hits a corrupt tile_pointers entry (esi walks off into
  // 0xa2000000-range garbage); the bridge catches the throw but the
  // warnings clog logs and the interpreter runs these ~9,000+ times per
  // 5 ticks. The JS port uses a bounded chain walk and stays in JS for
  // the hot loop, dispatching per-element painters via runFunction on
  // the same bridge cpu to preserve the CODESEG-only callees' behaviour.
  install4368d8Hooks(cpu, runFunction, setEipHook, heap);

  // Install JS hook for FUN_extra_paint_421d2c (terrain surface per-element
  // painter at PTR_LAB_00628a94[0]). Dispatched from the per-element loop in
  // 0x4368d8's body; Phase R+11 profiler showed it consuming ~65% of per-
  // tick wall time (954 calls/tick × ~200µs each in the interpreter). The
  // JS port handles the hot path inline (preamble + palette swizzle + base-
  // tile sub-painter dispatch) and falls back to `runFunction` for cold
  // tails (slope-extra, cliff-edge, corner-heights jumptable). Sub-painter
  // dispatches into PTR_LAB_00431bb8 still go through the bridge.
  install421d2cHook(cpu, runFunction, setEipHook, heap);

  // Install a JS hook for FUN_00452fce (sound-queue / pan helper). Called
  // from the LMB-down handler at 0x5e2b52 (CODESEG, runs in the bridge cpu)
  // with EAX=event-class, EBX=screen coord or 0x8001. The native body falls
  // through to a DirectSound vtable call via DAT_005ec05c+0xc — whose slot
  // contains a synthetic proc address (0x10100xxx range, registered by
  // runtime/win32/dsound.js). The bridge cpu can't execute synthetic addrs,
  // so it OOBs with `mem8 OOB: 0x10100098`. The JS port routes the same
  // call through callIndirect, which looks up the synthetic addr in
  // state.fnDispatch and dispatches to the real JS DirectSound impl.
  setEipHook(0x452fce, (cpu) => {
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    try { FUN_00452fce(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // Native 0x452fce prologue pushes ecx/edx/edi/esi/ebp (asm 0x452fe2-6,
    // before the 0x8001 branch test) and the epilogue at 0x4531aa pops them
    // back, so all five are callee-preserved. The JS port only writes to
    // regs.eax via internal callIndirect side-effects — leave cpu's saved
    // regs unchanged. Sync nothing back: cpu.regs already holds the entry
    // values for ecx/edx/edi/esi/ebp, and eax is also unchanged (the asm
    // doesn't preserve eax, but the C decompile's path writes nothing
    // meaningful to eax that the caller observes here).
  });

  // ######################################################################
  // Phase R+12 (agent A77) — fence/wall per-element painter scaffold.
  // ######################################################################
  // FUN_extra_paint_444e08 — vtable slot 1 of PTR_LAB_00628a94 (fence/wall
  // elements). Dispatched from FUN_extra_paint_4368d8's per-element loop
  // alongside 0x421d2c (terrain). Profile (Phase R+11) ranks it the second-
  // hottest per-element painter: 232 calls/tick × ~166 µs each = ~38 ms/tick
  // (13 % of per-tick wall time).
  //
  // Phase R+12 ships only the install scaffold: hook + recursion-safe
  // fallback (clearEipHook + re-install around runBodyFrom). The JS body
  // is a STUB that always returns false, so behaviour is byte-equal to no
  // hook (verified via title_replay hash comparison: stub mode and
  // hook-disabled mode produce identical frame hashes).
  //
  // The full hand-port is documented in extra_paint_444e08.js's header
  // (preamble + sub-painter dispatch + tail step-loop) and is non-trivial
  // due to the 0x44635d sub-dispatcher sprawl reached via the door/banner
  // tail jumptable. Follow-up phase (R+12.next) will swap the stub for the
  // real port; the scaffold here lets that swap be a single-file change.
  install444e08Hook(cpu, runFunction, setEipHook, heap);

  // ====================================================================
  // Phase R+12b region — small-scenery per-element painter hand-port.
  // ====================================================================
  // FUN_extra_paint_5ce7f8 — vtable slot 2 of PTR_LAB_00628a94 (small
  // scenery: trees, lamps, benches, fences, etc.). Dispatched from
  // FUN_extra_paint_4368d8's per-element loop alongside 0x421d2c (terrain)
  // and 0x444e08 (wall). Phase R+11 profiler showed it consuming ~3.5% of
  // per-tick wall time (71 calls/tick × ~28 µs each ≈ 2 ms/tick). The JS
  // port handles the hot prologue inline (skip-bit-0x20 branch, scenery-
  // def fields, sprite-flags dword writes, sub-painter dispatch via
  // DAT_5f6274[class][subtype][rotation]) and falls back to runFunction for
  // cold inputs ([0x991f8c] & 0x20 set, or an unregistered scenery class /
  // subtype). The actual scenery sub-painters at 4eb***/4ec***/4ed*** still
  // run through the bridge cpu via a manual step-loop — those CODESEG
  // painters have no JS port, and they explicitly read the pushed-esi
  // slot via `mov (%esp), %esi` so the stack layout must match exactly.
  install5ce7f8Hook(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // ######################################################################
  // Phase R+14b region — palette-swizzle helper #1 of 4 (0x421d2c tail).
  // ######################################################################
  // ######################################################################
  // FUN_extra_paint_420d9c is the first of four CODESEG-only helpers
  // dispatched at 0x4225c0..0x4225cf in FUN_extra_paint_421d2c's tail
  // (the palette-swizzle block). Sibling helpers (0x420f4c / 0x420502 /
  // 0x42094b) remain on the interpreter path until separately ported.
  // Phase R+13a (commit 55e72f7) flagged these four as the dominant
  // interpreter-fallback cost once the cb9==0 sprite-update gate opens.
  //
  // The hand-port covers:
  //   - the bounds-check + tile-pointer chain walk (hot)
  //   - the al/ah/cl/ch compare → either early-return or push-to-paint-ring
  //     via FUN_00433b76 (hot — title scene with [0x991f8c]&1==0)
  //
  // Cold fallback to runFunction (with clearEipHook recursion guard):
  //   - the [0x991f8c]&1 branch (multi-call rotation-painter loop at
  //     0x420e4c..0x420f17). Never fires on title (profile: f8c=0x900).
  //
  // Distinct region from Phase R+12 (444e08), R+12b (5ce7f8), R+11
  // (421d2c), and any parallel agent-G hand-port of 0x431bb8.
  install420d9cHook(cpu, runFunction, setEipHook, heap);

  // Carve a private stack region from the top of memory. The translator
  // uses heap.allocFrame() which decrements heap.sp from memory.byteLength
  // down; reserve the top 64 KB exclusively for the painter cpu's ESP.
  const STACK_REGION = 64 * 1024;
  const STACK_TOP = memory.byteLength;
  heap.sp = Math.min(heap.sp, STACK_TOP - STACK_REGION);

  const painters = loadPainterAddresses(opts);
  // Some "painter" addresses are NOT standalone functions — they're internal
  // jump labels of a larger function whose dispatcher prologue does
  // `push eax; push ecx; jmp [edx*4 + tbl]` (where edx = camera-rotation
  // index from DAT_00991f88). The painter body assumes those 2 saves are
  // already on the stack and unwinds them with `pop ecx; pop eax; ret` at
  // its tail. When the bridge invokes the painter directly with a fresh
  // RET_SENTINEL-only stack, the trailing 2 pops read past stackTop and
  // mem32 throws OOB at addr = mem.length (= 0x4ac4000 for default 64MB
  // heap). Affected jumptables: PTR_LAB_004368c8 (4 painters @ 0x4368d8/
  // 0x4368e0/0x4368ec/0x4368ff, common epilogue at 0x436a73) and
  // PTR_LAB_00436a8c (4 painters @ 0x436a9c/0x436aa4/0x436ab0/0x436ac3,
  // common epilogue at 0x436b27). Pre-push two dwords so the epilogue
  // unwinds cleanly back to RET_SENTINEL.
  const NEEDS_PRE_PUSH = new Set([
    0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
    0x436a9c, 0x436aa4, 0x436ab0, 0x436ac3,
  ]);
  let bridged = 0;
  for (const addr of painters) {
    const prePush = NEEDS_PRE_PUSH.has(addr) ? 2 : 0;
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
      // Reset eflags and FPU state to avoid cross-call contamination. runFunction
      // only resets esp/eip/callDepth — without this, a conditional jump in the
      // first instructions of the next painter inherits CF/ZF/SF/OF from the
      // previous painter's last ALU op, leading to taken/not-taken paths the
      // binary would never hit. Empirically, leaving eflags dirty pushed EAX
      // into a value that addressed 0x4ac4000 (just past heap end) in 0x4368d8.
      cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
      cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
      // Pre-push saved regs for jump-target painters (see NEEDS_PRE_PUSH
      // above). Lower stackTop by 8 and write the 2 expected dword slots:
      // memory layout (low → high): [RET_SENTINEL][saved_ecx][saved_eax].
      // We seed with the current EAX/ECX so if the painter accidentally
      // reads them via mov-from-mem they get sane values; the pop sequence
      // restores EAX/ECX to these same values, then ret pops RET_SENTINEL.
      let stackTop = STACK_TOP;
      if (prePush) {
        stackTop = STACK_TOP - 8;
        // [stackTop+0..3] = saved ecx, [stackTop+4..7] = saved eax.
        const m = memory;
        const ax = cpu.regs.eax >>> 0, cx = cpu.regs.ecx >>> 0;
        m[stackTop+0] = cx & 0xff; m[stackTop+1] = (cx>>>8)&0xff; m[stackTop+2] = (cx>>>16)&0xff; m[stackTop+3] = (cx>>>24)&0xff;
        m[stackTop+4] = ax & 0xff; m[stackTop+5] = (ax>>>8)&0xff; m[stackTop+6] = (ax>>>16)&0xff; m[stackTop+7] = (ax>>>24)&0xff;
      }
      try {
        runFunction(cpu, addr, { stackTop, limit: 50_000_000 });
      } catch (e) {
        // _wildShim is raised by the shim invoker above when a painter
        // computes a bogus CALL target into SHIM_BASE that doesn't match
        // any registered IAT/dynamic sentinel. The painter has already
        // gone off the rails; bail silently rather than logging.
        if (e && e._wildShim) {
          // intentionally silent — see setShimInvoker comment above.
        } else if (typeof console !== "undefined") {
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

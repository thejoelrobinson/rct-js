#!/usr/bin/env node
// tools/_flagcheck.mjs — static flag-contract scanner (ADDENDUM 84).
//
// The 0x425432 lesson (ADD 83): a fn can be heap+eax-clean in the oracle yet
// UNWIREABLE because a caller consumes its exit FLAGS (`call fn ; jb ...`) and
// JS ports don't model eflags unless hand-written to. This tool mechanises the
// check: for each target address, find every direct `call` site in .text +
// CODESEG and classify the NEXT instruction. Flag consumers: Jcc (short 0x70-
// 0x7F, near 0x0F 0x80-0x8F), SETcc (0x0F 0x90-0x9F), ADC/SBB (0x10-0x1D,
// 0x80-0x83 /2,/3), CMOVcc (0x0F 0x40-0x4F), LAHF (0x9F), PUSHF (0x9C).
// A jump/branch AT the next byte does not prove the flags come from the CALL
// (could test a register) — but `call ; jcc` with no intervening ALU is the
// binary's dominant CF/ZF-return idiom, so treat any hit as "verify by hand".
//
//   node tools/_flagcheck.mjs 0x425432 0x5e3652 ...
//   ADDRS=... node tools/_flagcheck.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exe = readFileSync(resolve(ROOT, "binary/rct.exe"));
const SECS = [[".text", 0x401000, 0x400, 0x1a600 - 0x400], ["CODESEG", 0x41c000, 0x1a600, 0x1e5400 - 0x1a600]];

const targets = (process.env.ADDRS ? process.env.ADDRS.split(",") : process.argv.slice(2)).map((s) => parseInt(s, 16) >>> 0);
if (!targets.length) { console.log("usage: node tools/_flagcheck.mjs 0xADDR [...]"); process.exit(1); }

// Walk forward over FLAG-TRANSPARENT instructions (push/pop/mov/lea/nop —
// they neither read nor write eflags) before classifying, up to `maxSkip`
// instructions. Stops at any flag WRITER (alu/test/cmp/inc/shift — the exit
// flags are dead past it) or anything unrecognised (conservative: unknown).
// This catches the `call ; pop edi ; jb` idiom that a next-byte-only check
// misses (0x441a10's real caller at 0x43c370 does exactly that; the first
// version of this tool wrongly reported it flag-safe).
function classifyNext(off, depth = 0) {
  if (depth > 4) return null;
  const b0 = exe[off], b1 = exe[off + 1];
  if (b0 >= 0x70 && b0 <= 0x7f) return `Jcc short (0x${b0.toString(16)})`;
  if (b0 === 0x0f && b1 >= 0x80 && b1 <= 0x8f) return `Jcc near (0x0f${b1.toString(16)})`;
  if (b0 === 0x0f && b1 >= 0x90 && b1 <= 0x9f) return `SETcc (0x0f${b1.toString(16)})`;
  if (b0 === 0x0f && b1 >= 0x40 && b1 <= 0x4f) return `CMOVcc (0x0f${b1.toString(16)})`;
  if ((b0 >= 0x10 && b0 <= 0x15) || (b0 >= 0x18 && b0 <= 0x1d)) return `ADC/SBB (0x${b0.toString(16)})`;
  if ((b0 === 0x80 || b0 === 0x81 || b0 === 0x83) && [2, 3].includes((b1 >> 3) & 7)) return `ADC/SBB imm (/${(b1 >> 3) & 7})`;
  if (b0 === 0x9f) return "LAHF";
  if (b0 === 0x9c) return "PUSHF";
  if (b0 === 0x66) { const r = classifyNext(off + 1, depth + 1); return r ? `66h+${r}` : null; }
  // flag-transparent single-byte forms: push r32 / pop r32 / nop / xchg eax,r
  if ((b0 >= 0x50 && b0 <= 0x5f) || b0 === 0x90 || (b0 >= 0x91 && b0 <= 0x97)) {
    const r = classifyNext(off + 1, depth + 1); return r ? `…skip; ${r}` : null;
  }
  // mov r32, imm32
  if (b0 >= 0xb8 && b0 <= 0xbf) { const r = classifyNext(off + 5, depth + 1); return r ? `…skip; ${r}` : null; }
  // mov r/m forms + lea: 0x88-0x8b, 0x8d — need modrm length; handle the
  // common short encodings (reg-reg mod=11 → 2 bytes; disp8 → 3; disp32 → 6)
  if ((b0 >= 0x88 && b0 <= 0x8b) || b0 === 0x8d) {
    const mod = (b1 >> 6) & 3, rm = b1 & 7;
    let len = 2;
    if (rm === 4 && mod !== 3) len += 1;                    // SIB
    if (mod === 1) len += 1; else if (mod === 2) len += 4;
    else if (mod === 0 && rm === 5) len += 4;
    const r = classifyNext(off + len, depth + 1); return r ? `…skip; ${r}` : null;
  }
  return null;
}

for (const t of targets) {
  const hits = [];
  let sites = 0;
  for (const [name, va, off, len] of SECS) {
    for (let i = 0; i < len - 5; i++) {
      if (exe[off + i] !== 0xe8) continue;
      const rel = exe.readInt32LE(off + i + 1);
      const site = va + i;
      if (((site + 5 + rel) >>> 0) !== t) continue;
      sites++;
      const cls = classifyNext(off + i + 5);
      if (cls) hits.push({ site, cls });
    }
  }
  const verdict = hits.length ? "FLAG-CONSUMED — hand wrapper must set cpu eflags" : (sites ? "no flag consumers at any call site" : "no direct call sites (indirect/vtable reach)");
  console.log(`0x${t.toString(16)}: ${sites} direct call site(s) — ${verdict}`);
  for (const h of hits.slice(0, 8)) console.log(`    0x${h.site.toString(16)}: call ; ${h.cls}`);
}

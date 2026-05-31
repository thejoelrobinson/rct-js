// Shared return-type → comparison-mask logic for the diff-* tools.
//
// The x86 interpreter only sets the low bits of EAX that match the C return
// type (al for char, ax for short), while ported JS often returns a full
// 32-bit value. To compare apples-to-apples we mask both sides to the C
// return-type width. `void` returns have no meaningful EAX — compare memory
// mutations instead. Source of truth is the Ghidra C decompile signature in
// decompiled/c/<addr>.c (e.g. `ushort FUN_009b4660(void) { ... }`).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

const BYTE_TYPES = new Set(["char", "byte", "uchar", "undefined1", "bool"]);
const WORD_TYPES = new Set(["short", "ushort", "undefined2", "wchar_t"]);

/**
 * @param {number} addr - function RVA, e.g. 0x9b4660
 * @returns {{mask:number, isVoid:boolean, type:string|null}}
 */
export function returnMaskFor(addr) {
  const hex = (addr >>> 0).toString(16).padStart(6, "0");
  let cSrc = "";
  try {
    cSrc = readFileSync(resolve(ROOT, `decompiled/c/${hex}.c`), "utf8");
  } catch {
    // No C source (e.g. CODESEG painter Ghidra missed) → default to 32-bit.
    return { mask: 0xffffffff, isVoid: false, type: null };
  }
  const m = cSrc.match(/^\s*([A-Za-z_][\w\s*]*?)\s+FUN_/m);
  if (!m) return { mask: 0xffffffff, isVoid: false, type: null };
  const t = m[1].trim().replace(/\s+/g, " ").replace(/\s*\*$/, "*");
  if (t === "void") return { mask: 0, isVoid: true, type: t };
  if (BYTE_TYPES.has(t)) return { mask: 0xff, isVoid: false, type: t };
  if (WORD_TYPES.has(t)) return { mask: 0xffff, isVoid: false, type: t };
  return { mask: 0xffffffff, isVoid: false, type: t }; // int/uint/pointer/etc.
}

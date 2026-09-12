// Models x86 general-purpose registers + key flags across translated calls.
//
// Background: Ghidra's decompiler frequently emits functions that read
// `in_EAX`, `unaff_ESI`, `in_DX`, etc. — the value the caller had in that
// register at the moment the call was made. The naive translation
// initializes these to 0, which loses information the binary actually
// uses (return values flowing into the next call's first byte are common
// — e.g. `FUN_X(); FUN_Y();` where Y reads `in_AL` from X's return).
//
// We model the register file as a single shared mutable cell per
// register: the translator wraps every direct/indirect ported call so
// the result is captured into `regs.eax`, and register-reading callees
// initialize their `in_*`/`unaff_*` locals from `regs.<reg>` at entry.
// JS is single-threaded so single cells behave exactly like CPU registers.
//
// 8/16-bit "in_" reads (in_AL, in_AX, in_BX, ...) are derived from the
// 32-bit cells via bitmask at the use site (see translator's REG_INIT_*).
//
// `unaff_*` is Ghidra's "register live on entry but not assigned in
// this function" — semantically identical to `in_*` for our purposes.
// We model both from the same underlying cells.

export const regs = {
  eax: 0, ebx: 0, ecx: 0, edx: 0,
  esi: 0, edi: 0, ebp: 0,
  zf: 0, cf: 0, sf: 0, of: 0, df: 0,
};

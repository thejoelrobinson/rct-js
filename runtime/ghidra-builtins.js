// Ghidra pseudo-functions emitted by the decompiler when the source x86
// instruction can't be expressed as plain C. These are well-defined per
// Ghidra docs (Decompiler/source/ghidra_help/decompile.htm).
//
// Reference: https://github.com/NationalSecurityAgency/ghidra/blob/master/Ghidra/Features/Decompiler/src/decompile/cpp/funcdata.cc
//
// Naming convention (from Ghidra):
//   CONCAT<H><L>(hi, lo)   — concatenate H bytes hi with L bytes lo (big-endian-ish)
//   CARRY<N>(a, b)         — unsigned overflow flag of a+b at N bytes
//   SBORROW<N>(a, b)       — signed-borrow flag of a-b at N bytes (matches OF after SUB)
//   SCARRY<N>(a, b)        — signed overflow of a+b at N bytes (matches OF after ADD)
//
// All functions take/return Number values; 32-bit results are produced via
// `>>> 0`. Anything wider is folded to fit in 53 mantissa bits as a Number;
// see CONCAT44 below for the 64-bit edge case.

// ---- CONCAT helpers ----
// CONCAT<H><L>(hi, lo) returns the (H+L)-byte value with `hi` in the high
// position and `lo` in the low position. Sizes are in bytes.

export const CONCAT11 = (hi, lo) =>
  (((hi & 0xff) << 8) | (lo & 0xff)) & 0xffff;

export const CONCAT12 = (hi, lo) =>
  (((hi & 0xff) << 16) | (lo & 0xffff)) >>> 0;

export const CONCAT13 = (hi, lo) =>
  // 24-bit lo + 8-bit hi → 32-bit
  (((hi & 0xff) << 24) | (lo & 0xffffff)) >>> 0;

export const CONCAT14 = (hi, lo) => {
  // 8-bit hi + 32-bit lo → 40 bits. JS Numbers handle 40 bits fine.
  const h = (hi & 0xff) * 0x100000000;
  const l = lo >>> 0;
  return h + l;
};

export const CONCAT21 = (hi, lo) =>
  (((hi & 0xffff) << 8) | (lo & 0xff)) >>> 0;

export const CONCAT22 = (hi, lo) =>
  (((hi & 0xffff) << 16) | (lo & 0xffff)) >>> 0;

export const CONCAT24 = (hi, lo) => {
  // 16-bit hi + 32-bit lo → 48 bits. Within Number's safe range.
  const h = (hi & 0xffff) * 0x100000000;
  const l = lo >>> 0;
  return h + l;
};

export const CONCAT31 = (hi, lo) =>
  // 24-bit hi + 8-bit lo → 32-bit
  ((((hi & 0xffffff) << 8) >>> 0) | (lo & 0xff)) >>> 0;

export const CONCAT44 = (hi, lo) => {
  // 32-bit hi + 32-bit lo → 64-bit. This exceeds Number precision (53 bits)
  // for high values. We return as Number — callers that need full precision
  // should consume hi/lo separately. Diff-tests will surface where the loss
  // matters; if it does, switch this and consumers to BigInt.
  const h = (hi >>> 0) * 0x100000000;
  const l = lo >>> 0;
  return h + l;
};

// ---- CARRY (unsigned overflow flag of a+b) ----
// Returns 1 if a+b would overflow N-byte unsigned arithmetic, else 0.

export const CARRY1 = (a, b) =>
  (((a & 0xff) + (b & 0xff)) > 0xff) ? 1 : 0;

export const CARRY2 = (a, b) =>
  (((a & 0xffff) + (b & 0xffff)) > 0xffff) ? 1 : 0;

export const CARRY4 = (a, b) =>
  (((a >>> 0) + (b >>> 0)) > 0xffffffff) ? 1 : 0;

// ---- SBORROW (signed-overflow flag after a - b) ----
// Returns 1 if subtracting b from a would set the signed-overflow flag in
// x86's OF after SUB. Equivalent to: ((a XOR b) AND (a XOR result)) sign bit.

const sborrowN = (a, b, signBit, mask) => {
  a = a & mask;
  b = b & mask;
  const r = (a - b) & mask;
  return (((a ^ b) & (a ^ r)) & signBit) !== 0 ? 1 : 0;
};

export const SBORROW2 = (a, b) => sborrowN(a, b, 0x8000, 0xffff);
export const SBORROW4 = (a, b) => sborrowN(a >>> 0, b >>> 0, 0x80000000, 0xffffffff);

// ---- SCARRY (signed-overflow flag after a + b) ----
// Returns 1 if adding b to a would set OF in x86 after ADD. Formula:
// (NOT (a XOR b)) AND (a XOR result) sign bit.

const scarryN = (a, b, signBit, mask) => {
  a = a & mask;
  b = b & mask;
  const r = (a + b) & mask;
  return ((~(a ^ b) & (a ^ r)) & signBit) !== 0 ? 1 : 0;
};

export const SCARRY2 = (a, b) => scarryN(a, b, 0x8000, 0xffff);
// SCARRY4 isn't currently in the import surface but defined for completeness.
export const SCARRY4 = (a, b) => scarryN(a >>> 0, b >>> 0, 0x80000000, 0xffffffff);

// ---- One-off operators / placeholders ----

// LOCK is the x86 lock prefix marker. We're single-threaded; no-op.
export const LOCK = () => {};

// RtlUnwind is the SEH unwind primitive. Real implementation requires
// stack-frame walking — for now a no-op. Will need attention if the binary
// raises and catches Win32 exceptions.
export const RtlUnwind = () => {};

// `Arguments` and `ExceptionList` are placeholder symbols Ghidra uses when
// it sees stack accesses to caller-saved areas (varargs / SEH chain). Real
// values would be addresses on the stack; for now we return 0 (NULL).
export const Arguments = () => 0;
export const ExceptionList = () => 0;

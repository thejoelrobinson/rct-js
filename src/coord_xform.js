// Port of FUN_0041fa6f — a 244-byte coordinate-transform function that reads
// three input fields (signed words at +0xac, +0xae and an unsigned word at
// +0xb0) and accumulates three outputs (ebx, ecx, ebp) via fixed-point
// multiplication and conditional clamping.
//
// We don't yet know its OpenRCT2 name; the structural shape (three accumulator
// outputs, three input axes, magic coefficients that look like fixed-point
// trigonometric values) suggests a 3D-vector projection used somewhere in the
// peep / ride animation pipeline. For now we name it descriptively.
//
// Inputs:
//   `struct` — Uint8Array large enough to cover bytes 0xac..0xb1
//
// Output: { ebx, ecx, ebp } — three uint32 accumulators

function readS16(buf, off) {
  const w = buf[off] | (buf[off + 1] << 8);
  return (w & 0x8000) ? (w | 0xffff0000) : w;
}
function readU16(buf, off) {
  return (buf[off] | (buf[off + 1] << 8)) >>> 0;
}
function fixedMul(value, coeff) {
  // Signed 32×32 → low 32 bits of product, then unsigned shift right 16.
  // Mirrors x86 `imul reg, reg, imm32` followed by `shr reg, 16`.
  return ((Math.imul(value | 0, coeff | 0) >>> 0) >>> 16) >>> 0;
}
function uadd(a, b) { return ((a >>> 0) + (b >>> 0)) >>> 0; }

// `phase`: integer 1..7 — compute up through that phase only. Allows
// progressive validation against ret-overlay milestones.
export function coordTransform(struct, phase = 7) {
  let ebx = 0, ecx = 0, ebp = 0;

  // ---- Phase 1: field 0xac (signed s16) → three direct contributions ----
  let v = readS16(struct, 0xac);
  ebx = uadd(ebx, fixedMul(v, 0x147a));
  ecx = uadd(ecx, fixedMul(v, 0xcccc));
  ebp = uadd(ebp, fixedMul(v, 0x428f));
  if (phase < 2) return { ebx, ecx, ebp };

  // ---- Phase 2: field 0xae (signed s16) clamped to [-250, 0] → ebx ----
  v = readS16(struct, 0xae);
  if (v >= 0) v = 0;
  if (v < -250) v = -250;
  ebx = uadd(ebx, fixedMul(v, 0xffffc290 | 0));
  if (phase < 3) return { ebx, ecx, ebp };

  // ---- Phase 3: (field 0xae - 100) → ecx ----
  v = readS16(struct, 0xae) - 100;
  ecx = uadd(ecx, fixedMul(v, 0xffff3334 | 0));
  if (phase < 4) return { ebx, ecx, ebp };

  // ---- Phase 4: (field 0xae - 100) → ebp ----
  v = readS16(struct, 0xae) - 100;
  ebp = uadd(ebp, fixedMul(v, 0xffffc71d | 0));
  if (phase < 5) return { ebx, ecx, ebp };

  // ---- Phase 5: field 0xb0 (unsigned u16) clamped to [0, 0x96] → ebx ----
  let u = readU16(struct, 0xb0);
  if (u > 0x96) u = 0x96;
  ebx = uadd(ebx, fixedMul(u, 0x6666));
  if (phase < 6) return { ebx, ecx, ebp };

  // ---- Phase 6: field 0xb0 (re-read, unsigned) with two thresholds ----
  u = readU16(struct, 0xb0);
  if (u > 0x118) {                              // 280
    ecx = uadd(ecx, 0x177);
    ebp = uadd(ebp, 0xc8);
  }
  if (u > 0x136) {                              // 310
    ecx = uadd(ecx, 0x352);
    ebp = uadd(ebp, 0x190);
    ebx = ebx >>> 1;
  }
  // imul eax, eax, 0x10000 ; shr eax, 0x10  — for u16 inputs this is identity.
  ecx = uadd(ecx, u);
  if (phase < 7) return { ebx, ecx, ebp };

  // ---- Phase 7: field 0xb0 (re-read, unsigned) → ebp ----
  u = readU16(struct, 0xb0);
  ebp = uadd(ebp, fixedMul(u, 0x5555));

  return { ebx, ecx, ebp };
}

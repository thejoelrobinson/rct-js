// Port of FUN_005df40c — RCT1 scenario PRNG.
//
// Two 32-bit seeds at 0x6e3b88 (state[0]) and 0x6e3b8c (state[1]).
// Each call mutates both and returns the new state[1].
//
// Asm reference:
//   push  ebx
//   mov   ebx, [0x6e3b8c]      ; ebx = s1
//   xor   ebx, 0x1234567f      ; mix
//   ror   ebx, 7
//   mov   eax, [0x6e3b88]      ; eax = s0
//   add   [0x6e3b88], ebx      ; s0 += mixed_s1
//   ror   eax, 3               ; old_s0 rotated
//   mov   [0x6e3b8c], eax      ; new s1 = ROR(old_s0, 3)
//   pop   ebx
//   ret                        ; eax = new s1 is the return value

export const RNG_S0_ADDR = 0x6e3b88;
export const RNG_S1_ADDR = 0x6e3b8c;

function ror32(x, n) { return (((x >>> n) | (x << (32 - n))) >>> 0); }

export function prngStep(state) {
  const oldS0 = state[0] >>> 0;
  const mixedS1 = ror32(((state[1] ^ 0x1234567f) >>> 0), 7);
  state[0] = (oldS0 + mixedS1) >>> 0;
  state[1] = ror32(oldS0, 3);
  return state[1];
}

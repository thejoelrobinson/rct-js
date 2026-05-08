// Port of FUN_005df1ff — saturating byte increment of [esi + 0x5].
// Increment, but if the result wraps to 0 (was 0xff), back off to 0xff.
// Idiom: "tick a counter, capped at 255."
//
// Asm:
//   inc byte ptr [esi + 0x5]
//   jne +3                       ; result != 0 -> skip
//   dec byte ptr [esi + 0x5]
//   ret

export function saturatingIncrementByte(buf, offset) {
  const v = (buf[offset] + 1) & 0xff;
  // If it wrapped to 0, undo (saturate at 255).
  buf[offset] = v === 0 ? 0xff : v;
}

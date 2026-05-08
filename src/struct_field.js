// Port of FUN_00441891 — write 0xFFFFFFFF (sentinel "no value") to a struct
// field at offset 0xCC. Almost certainly an "invalidate" or "clear handle"
// helper called when an entity is reset.
//
// Asm:
//   mov dword ptr [esi + 0xcc], 0xffffffff
//   ret

// Generic "memcpy-style" port — caller passes a Uint8Array (struct buffer) and
// the base offset of esi within it. We mimic the same write.
export function clearFieldCC(buf, esiOffset) {
  for (let i = 0; i < 4; i++) buf[esiOffset + 0xcc + i] = 0xff;
}

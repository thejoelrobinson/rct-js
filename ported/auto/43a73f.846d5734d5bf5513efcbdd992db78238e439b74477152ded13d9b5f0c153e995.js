// @manual — do not regenerate.
// 0x43a73f — peep states 2 AND 7 share this sub-state dispatcher; it is
// byte-for-byte identical to 0x43a74b (movzx edi,[esi+0x2c] ;
// jmp [edi*4 + 0x62d50c]), so the same JS bridge body serves both
// addresses. This file exists so the address-keyed oracles
// (tools/_lockstep-auto.mjs) and the wiring can resolve the fn under its
// own address; see ported/auto/43a74b.js for the transcription notes.

export { FUN_0043a74b as FUN_0043a73f } from "./43a74b.js";

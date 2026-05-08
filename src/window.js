// Port of FUN_00403a92 — boolean predicate over a global at 0x5e91e0.
// Likely a "is the main window/handle valid" check given context (called from
// FUN_00401120's update region path).
//
// Asm:
//   push ebp; mov ebp,esp; push ebx; push esi; push edi
//   cmp [0x5e91e0], 0
//   je  zero_branch
//   mov eax, 1
//   jmp end
// zero_branch:
//   xor eax, eax
// end:
//   pop edi; pop esi; pop ebx; leave; ret

export const HANDLE_GLOBAL_ADDR = 0x5e91e0;

export function isHandleSet(globalValue) {
  return (globalValue >>> 0) !== 0 ? 1 : 0;
}

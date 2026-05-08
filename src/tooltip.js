// Port of FUN_004269d0 — clear a 16-bit global at 0x87c3ac to 0.
// Likely a "reset tooltip / window state ID" idiom.
//
// Asm:
//   mov word ptr [0x87c3ac], 0
//   ret

export const TOOLTIP_GLOBAL_ADDR = 0x87c3ac;

export function clearTooltipGlobal(memory) {
  // Writes a 16-bit zero. Two adjacent bytes.
  memory[TOOLTIP_GLOBAL_ADDR]     = 0;
  memory[TOOLTIP_GLOBAL_ADDR + 1] = 0;
}

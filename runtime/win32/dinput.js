// runtime/win32/dinput.js — DirectInput stubs.
//
// Return failure so the game falls back to standard window messages
// (WM_KEYDOWN/WM_LBUTTONDOWN) for input. That fallback is what we'll
// eventually drive from runtime/input.js → user32.postWindowMessage.

const DIERR_OLDDIRECTINPUTVERSION = 0x80040086 | 0;

export function DirectInputCreateA(heap, hinst, dwVersion, ppDI, punkOuter) {
  if (ppDI) heap.setU32(ppDI, 0);
  return DIERR_OLDDIRECTINPUTVERSION;
}
export function DirectInputCreateW(heap, hinst, dwVersion, ppDI, punkOuter) {
  return DirectInputCreateA(heap, hinst, dwVersion, ppDI, punkOuter);
}

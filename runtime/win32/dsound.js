// runtime/win32/dsound.js — DirectSound stubs.
//
// Returning failure causes RCT to skip its sound system entirely. Web Audio
// integration is a follow-up; for now the game runs silent.

const DSERR_NODRIVER = 0x88780078 | 0;

export function DirectSoundCreate(heap, lpcGuid, ppDS, pUnkOuter) {
  if (ppDS) heap.setU32(ppDS, 0);
  return DSERR_NODRIVER;
}
export function DirectSoundEnumerateA(heap, lpDSEnumCallback, lpContext) {
  return 0;   // S_OK with zero callbacks invoked
}
export function DirectSoundCaptureCreate(heap, lpcGuid, ppDSC, pUnkOuter) {
  if (ppDSC) heap.setU32(ppDSC, 0);
  return DSERR_NODRIVER;
}

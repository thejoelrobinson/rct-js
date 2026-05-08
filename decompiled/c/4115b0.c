
void FUN_004115b0(void)

{
  MMRESULT MVar1;
  
  FUN_0041174a();
  MVar1 = midiOutGetVolume((HMIDIOUT)0xffffffff,&DAT_005f02e8);
  if (MVar1 == 0) {
    DAT_005ec1d0 = 1;
  }
  return;
}


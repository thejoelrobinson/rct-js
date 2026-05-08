
undefined4 FUN_0041181d(int param_1,int param_2)

{
  MMRESULT MVar1;
  
  if ((DAT_005ec1d0 != 0) &&
     (MVar1 = midiOutSetVolume((HMIDIOUT)0xffffffff,param_2 * 0x10000 + param_1), MVar1 == 0)) {
    DAT_005ec1d4 = 1;
    return 1;
  }
  return 0;
}


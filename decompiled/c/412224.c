
MMRESULT FUN_00412224(undefined4 *param_1,LPMMCKINFO param_2,MMCKINFO *param_3)

{
  MMRESULT MVar1;
  
  mmioSeek((HMMIO)*param_1,param_3->dwDataOffset + 4,0);
  param_2->ckid = 0x61746164;
  MVar1 = mmioDescend((HMMIO)*param_1,param_2,param_3,0x10);
  return MVar1;
}


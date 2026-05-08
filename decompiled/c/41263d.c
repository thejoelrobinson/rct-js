
MMRESULT FUN_0041263d(undefined4 *param_1,LPMMCKINFO param_2,LPMMIOINFO param_3)

{
  MMRESULT local_8;
  
  param_2->ckid = 0x61746164;
  param_2->cksize = 0;
  local_8 = mmioCreateChunk((HMMIO)*param_1,param_2,0);
  if (local_8 == 0) {
    local_8 = mmioGetInfo((HMMIO)*param_1,param_3,0);
  }
  return local_8;
}


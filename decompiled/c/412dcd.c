
MMRESULT FUN_00412dcd(undefined4 *param_1,LPMMCKINFO param_2,MMCKINFO *param_3,LONG param_4)

{
  MMRESULT local_8;
  
  mmioSeek((HMMIO)*param_1,param_3->dwDataOffset + 4,0);
  param_2->ckid = 0x61746164;
  local_8 = mmioDescend((HMMIO)*param_1,param_2,param_3,0x10);
  if (local_8 == 0) {
    mmioSeek((HMMIO)*param_1,param_4,1);
    local_8 = 0;
  }
  return local_8;
}


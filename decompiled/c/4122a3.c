
MMRESULT FUN_004122a3(HMMIO param_1,uint param_2,int param_3,int param_4,uint *param_5)

{
  MMRESULT MVar1;
  _MMIOINFO local_5c;
  uint local_14;
  uint local_10;
  uint local_c;
  MMRESULT local_8;
  
  local_8 = 0;
  MVar1 = mmioGetInfo(param_1,&local_5c,0);
  local_8 = (MMRESULT)(MVar1 != 0);
  if (local_8 == 0) {
    local_14 = param_2;
    if (*(uint *)(param_4 + 4) < param_2) {
      local_14 = *(uint *)(param_4 + 4);
    }
    *(int *)(param_4 + 4) = *(int *)(param_4 + 4) - local_14;
    for (local_c = 0; local_c < local_14; local_c = local_c + local_10) {
      if (local_5c.pchNext == local_5c.pchEndRead) {
        local_8 = mmioAdvance(param_1,&local_5c,0);
        if (local_8 != 0) goto LAB_004123e9;
        local_8 = 0;
        if (local_5c.pchNext == local_5c.pchEndRead) {
          local_8 = 0xe103;
          goto LAB_004123e9;
        }
      }
      local_10 = (int)local_5c.pchEndRead - (int)local_5c.pchNext;
      if (local_14 - local_c < local_10) {
        local_10 = local_14 - local_c;
      }
      FUN_004138d0(local_c + param_3,local_5c.pchNext,local_10);
      local_5c.pchNext = local_5c.pchNext + local_10;
    }
    local_8 = mmioSetInfo(param_1,&local_5c,0);
    if (local_8 == 0) {
      *param_5 = local_14;
      return 0;
    }
  }
LAB_004123e9:
  *param_5 = 0;
  return local_8;
}


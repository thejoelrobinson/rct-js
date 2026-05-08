
MMRESULT FUN_004126ba(HMMIO param_1,uint param_2,int param_3,undefined4 param_4,int *param_5,
                     LPMMIOINFO param_6)

{
  uint local_c;
  MMRESULT local_8;
  
  local_8 = 0;
  *param_5 = 0;
  local_c = 0;
  do {
    if (param_2 <= local_c) {
      return local_8;
    }
    if (param_6->pchEndWrite == param_6->pchNext) {
      param_6->dwFlags = param_6->dwFlags | 0x10000000;
      local_8 = mmioAdvance(param_1,param_6,1);
      if (local_8 != 0) {
        return local_8;
      }
    }
    *param_6->pchNext = *(char *)(local_c + param_3);
    param_6->pchNext = param_6->pchNext + 1;
    *param_5 = *param_5 + 1;
    local_c = local_c + 1;
  } while( true );
}


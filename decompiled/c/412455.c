
MMRESULT FUN_00412455(LPSTR param_1,int *param_2,short *param_3,LPMMCKINFO param_4,
                     LPMMCKINFO param_5)

{
  HMMIO pHVar1;
  LONG LVar2;
  MMRESULT MVar3;
  _MMCKINFO local_20;
  char local_c [4];
  MMRESULT local_8;
  
  local_c[0] = -1;
  local_c[1] = -1;
  local_c[2] = -1;
  local_c[3] = -1;
  local_8 = 0;
  pHVar1 = mmioOpenA(param_1,(LPMMIOINFO)0x0,0x11002);
  *param_2 = (int)pHVar1;
  if (*param_2 == 0) {
    local_8 = 0xe104;
  }
  else {
    param_5->fccType = 0x45564157;
    param_5->cksize = 0;
    local_8 = mmioCreateChunk((HMMIO)*param_2,param_5,0x20);
    if (local_8 == 0) {
      param_4->ckid = 0x20746d66;
      param_4->cksize = 0x10;
      local_8 = mmioCreateChunk((HMMIO)*param_2,param_4,0);
      if (local_8 == 0) {
        if (*param_3 == 1) {
          LVar2 = mmioWrite((HMMIO)*param_2,(char *)param_3,0x10);
          if (LVar2 != 0x10) {
            return 0xe104;
          }
        }
        else {
          LVar2 = mmioWrite((HMMIO)*param_2,(char *)param_3,(ushort)param_3[8] + 0x12);
          if (LVar2 != (ushort)param_3[8] + 0x12) {
            return 0xe104;
          }
        }
        local_8 = mmioAscend((HMMIO)*param_2,param_4,0);
        if (local_8 == 0) {
          local_20.ckid = 0x74636166;
          local_20.cksize = 0;
          local_8 = mmioCreateChunk((HMMIO)*param_2,&local_20,0);
          if (local_8 == 0) {
            LVar2 = mmioWrite((HMMIO)*param_2,local_c,4);
            if (LVar2 == 4) {
              MVar3 = mmioAscend((HMMIO)*param_2,&local_20,0);
              if (MVar3 == 0) {
                local_8 = 0;
              }
              else {
                local_8 = 0xe104;
              }
            }
            else {
              local_8 = 0xe104;
            }
          }
        }
      }
    }
  }
  return local_8;
}


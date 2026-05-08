
void FUN_004015f0(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  int iVar2;
  int local_30;
  int local_24;
  int local_14;
  
  iVar2 = param_4;
  iVar1 = param_3;
  if (param_3 < param_1) {
    param_3 = param_1;
    param_1 = iVar1;
  }
  if (param_4 < param_2) {
    param_4 = param_2;
    param_2 = iVar2;
  }
  if ((((param_1 <= DAT_005f15c4) && (-1 < param_3)) && (param_2 <= DAT_005f1b34)) && (-1 < param_4)
     ) {
    if (param_1 < 0) {
      param_1 = 0;
    }
    if (DAT_005f15c4 < param_3) {
      param_3 = DAT_005f15c4;
    }
    if (param_2 < 0) {
      param_2 = 0;
    }
    if (DAT_005f1b34 < param_4) {
      param_4 = DAT_005f1b34;
    }
    if ((0 < param_3 - param_1) && (0 < param_4 - param_2)) {
      iVar1 = (int)(param_1 + (param_1 >> 0x1f & 0x3fU)) >> 6;
      iVar2 = (int)(param_2 + (param_2 >> 0x1f & 7U)) >> 3;
      local_30 = iVar2 * 0x14 + iVar1;
      iVar1 = (((int)(param_3 + (param_3 >> 0x1f & 0x3fU)) >> 6) - iVar1) + 1;
      for (local_24 = 0; local_24 < (((int)(param_4 + (param_4 >> 0x1f & 7U)) >> 3) - iVar2) + 1;
          local_24 = local_24 + 1) {
        for (local_14 = 0; local_14 < iVar1; local_14 = local_14 + 1) {
          (&DAT_005f2420)[local_30] = 1;
          local_30 = local_30 + 1;
          DAT_005e9158 = DAT_005e9158 + 1;
        }
        local_30 = local_30 + (0x14 - iVar1);
      }
    }
  }
  return;
}


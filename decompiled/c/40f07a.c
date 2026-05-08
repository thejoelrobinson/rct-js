
undefined4 FUN_0040f07a(int *param_1,int param_2,int param_3)

{
  int iVar1;
  undefined4 uVar2;
  
  if (DAT_005ec080 == (HDC)0x0) {
    uVar2 = 0;
  }
  else {
    iVar1 = StretchDIBits(DAT_005ec080,param_2,param_3,param_1[2] - *param_1,param_1[3] - param_1[1]
                          ,*param_1,DAT_005ec08c - param_1[3],param_1[2] - *param_1,
                          param_1[3] - param_1[1],DAT_005ec088,DAT_005ec084,0,0xcc0020);
    if (iVar1 == -1) {
      FUN_00404b57(s_DibBatchFastBlt_Error_005ec0a4);
      uVar2 = FUN_00414210(0);
    }
    else {
      uVar2 = 1;
    }
  }
  return uVar2;
}


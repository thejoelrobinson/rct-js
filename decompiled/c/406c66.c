
undefined4 FUN_00406c66(undefined4 param_1,int *param_2)

{
  int iVar1;
  undefined4 uVar2;
  
  iVar1 = FUN_004113d9(param_1,*param_2,0);
  *param_2 = iVar1;
  if (DAT_005ebedc == 0) {
    uVar2 = 2;
  }
  else if ((DAT_005ec148 == 0) || (DAT_005ec1c4 != 0)) {
    uVar2 = 1;
  }
  else if (*param_2 < 1) {
    uVar2 = 3;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}


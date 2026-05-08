
undefined4 FUN_00406bdf(undefined4 param_1,undefined4 param_2)

{
  undefined4 uVar1;
  int iVar2;
  
  if ((DAT_005ebedc == 0) || (DAT_005ebee0 == 0)) {
    uVar1 = 2;
  }
  else if ((DAT_005ec148 == 0) || (DAT_005ec1c4 != 0)) {
    uVar1 = 1;
  }
  else {
    iVar2 = FUN_00411324(DAT_005ebee0,param_1,param_2);
    if (iVar2 == 0) {
      uVar1 = 3;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


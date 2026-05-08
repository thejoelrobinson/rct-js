
undefined4 FUN_0040d432(int param_1,undefined4 param_2,undefined4 param_3)

{
  undefined4 uVar1;
  int iVar2;
  
  if (DAT_005ebfdc == 0) {
    uVar1 = 0;
  }
  else {
    iVar2 = FUN_0040d8ee(param_1);
    if (iVar2 != 0) {
      FUN_0040d575(param_1);
    }
    iVar2 = FUN_0040cd89(param_1,param_2,param_3);
    if (iVar2 == 0) {
      *(undefined4 *)(&DAT_005f03a4 + param_1 * 0x16c) = 0;
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


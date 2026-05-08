
undefined4 FUN_0040bb01(undefined4 *param_1,undefined4 *param_2)

{
  int iVar1;
  int iVar2;
  undefined4 uVar3;
  undefined4 local_70 [4];
  undefined4 local_60;
  undefined4 local_4c;
  
  if ((DAT_005ebf64 == 0) && (DAT_005ebf34 != (int *)0x0)) {
    _memset(local_70,0,0x6c);
    local_70[0] = 0x6c;
    do {
      iVar1 = (**(code **)(*DAT_005ebf34 + 100))(DAT_005ebf34,0,local_70,1,0);
      if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(), iVar2 == 0)) break;
    } while (iVar1 == -0x7789fe3e);
    if (iVar1 == 0) {
      *param_1 = local_4c;
      *param_2 = local_60;
      DAT_005ebf64 = 1;
      uVar3 = 1;
    }
    else {
      uVar3 = 0;
    }
  }
  else {
    uVar3 = 0;
  }
  return uVar3;
}



undefined4 FUN_0040a88b(int *param_1,int param_2,int param_3)

{
  undefined4 uVar1;
  int iVar2;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  if (DAT_005ebf54 == 0) {
    local_18 = param_2;
    local_10 = (param_1[2] - *param_1) + param_2;
    local_14 = param_3;
    local_c = (param_1[3] - param_1[1]) + param_3;
    uVar1 = FUN_0040a611(param_1,&local_18);
  }
  else {
    if ((DAT_005ebf60 != (int *)0x0) && (DAT_005ebf5c != 0)) {
      do {
        local_8 = (**(code **)(*DAT_005ebf60 + 0x1c))
                            (DAT_005ebf60,param_2,param_3,DAT_005ebf5c,param_1,0x10);
        if ((local_8 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(), iVar2 == 0)) break;
      } while (local_8 == -0x7789fe3e);
      if (local_8 == 0) {
        return 1;
      }
    }
    uVar1 = 0;
  }
  return uVar1;
}


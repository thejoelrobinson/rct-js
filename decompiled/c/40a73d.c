
undefined4 FUN_0040a73d(undefined4 param_1,int *param_2,undefined4 param_3)

{
  int iVar1;
  tagRECT local_30;
  undefined4 local_20;
  undefined4 local_1c;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  if ((DAT_005ebf5c != (int *)0x0) && (DAT_005ebf60 != (int *)0x0)) {
    if (DAT_005ebf54 == 0) {
      local_18 = *param_2;
      local_14 = param_2[1];
      local_10 = param_2[2];
      local_c = param_2[3];
      GetClientRect(DAT_005e916c,&local_30);
      ClientToScreen(DAT_005e916c,(LPPOINT)&local_30);
      *param_2 = *param_2 + local_30.left;
      param_2[1] = param_2[1] + local_30.top;
      param_2[2] = param_2[2] + local_30.left;
      param_2[3] = param_2[3] + local_30.top;
    }
    local_20 = param_3;
    local_1c = param_3;
    (**(code **)(*DAT_005ebf5c + 0x74))(DAT_005ebf5c,8,&local_20);
    do {
      local_8 = (**(code **)(*DAT_005ebf60 + 0x14))
                          (DAT_005ebf60,param_2,DAT_005ebf5c,param_1,0x1000000,0);
      if ((local_8 == -0x7789fe3e) && (iVar1 = FUN_00408d5d(), iVar1 == 0)) break;
    } while (local_8 == -0x7789fe3e);
    if (DAT_005ebf54 == 0) {
      *param_2 = local_18;
      param_2[1] = local_14;
      param_2[2] = local_10;
      param_2[3] = local_c;
    }
    if (local_8 == 0) {
      return 1;
    }
  }
  return 0;
}


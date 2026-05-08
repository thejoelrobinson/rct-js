
void FUN_00409af7(int param_1,int *param_2)

{
  int iVar1;
  int iVar2;
  undefined4 local_1c;
  undefined4 local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  if (((DAT_005ebf54 != 0) && (DAT_005ebf40 != (int *)0x0)) && (param_1 != 0)) {
    local_8 = param_2[2] - *param_2;
    local_c = param_2[3] - param_2[1];
    if ((0 < local_8) && (0 < local_c)) {
      if (0x40 < local_8) {
        local_8 = 0x40;
        param_2[2] = *param_2 + 0x40;
      }
      if (0x40 < local_c) {
        local_c = 0x40;
        param_2[3] = param_2[1] + 0x40;
      }
      local_18 = 0;
      local_1c = 0;
      local_14 = local_8;
      local_10 = local_c;
      do {
        iVar1 = (**(code **)(*DAT_005ebf40 + 0x14))
                          (DAT_005ebf40,&local_1c,*(undefined4 *)(param_1 + 0x80),param_2,0x1000000,
                           0);
        if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(), iVar2 == 0)) break;
      } while (iVar1 == -0x7789fe3e);
      DAT_005f138c = local_8;
      DAT_005f12a4 = local_c;
    }
  }
  return;
}


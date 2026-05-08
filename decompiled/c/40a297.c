
undefined4
FUN_0040a297(int param_1,int *param_2,int param_3,int param_4,int param_5,undefined4 param_6)

{
  undefined4 uVar1;
  int iVar2;
  undefined4 local_20;
  undefined4 local_1c;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  if (DAT_005ebf54 == 0) {
    local_18 = param_4;
    local_10 = (param_2[2] - *param_2) + param_4;
    local_14 = param_5;
    local_c = (param_2[3] - param_2[1]) + param_5;
    uVar1 = FUN_0040a006(param_1,param_2,param_3,&local_18,param_6);
  }
  else {
    if ((((param_1 != 0) && (param_3 != 0)) && (*(int *)(param_3 + 0x80) != 0)) &&
       (*(int *)(param_1 + 0x80) != 0)) {
      local_20 = param_6;
      local_1c = param_6;
      (**(code **)(**(int **)(param_1 + 0x80) + 0x74))(*(undefined4 *)(param_1 + 0x80),8,&local_20);
      do {
        local_8 = (**(code **)(**(int **)(param_3 + 0x80) + 0x1c))
                            (*(undefined4 *)(param_3 + 0x80),param_4,param_5,
                             *(undefined4 *)(param_1 + 0x80),param_2,0x11);
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


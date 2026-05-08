
undefined4 FUN_0040a006(int param_1,undefined4 param_2,int param_3,int *param_4,undefined4 param_5)

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
  
  if ((((param_1 != 0) && (param_3 != 0)) && (*(int *)(param_3 + 0x80) != 0)) &&
     (*(int *)(param_1 + 0x80) != 0)) {
    if (DAT_005ebf54 == 0) {
      local_18 = *param_4;
      local_14 = param_4[1];
      local_10 = param_4[2];
      local_c = param_4[3];
      GetClientRect(DAT_005e916c,&local_30);
      ClientToScreen(DAT_005e916c,(LPPOINT)&local_30);
      *param_4 = *param_4 + local_30.left;
      param_4[1] = param_4[1] + local_30.top;
      param_4[2] = param_4[2] + local_30.left;
      param_4[3] = param_4[3] + local_30.top;
    }
    local_20 = param_5;
    local_1c = param_5;
    (**(code **)(**(int **)(param_1 + 0x80) + 0x74))(*(undefined4 *)(param_1 + 0x80),8,&local_20);
    do {
      local_8 = (**(code **)(**(int **)(param_3 + 0x80) + 0x14))
                          (*(undefined4 *)(param_3 + 0x80),param_4,*(undefined4 *)(param_1 + 0x80),
                           param_2,0x1008000,0);
      if ((local_8 == -0x7789fe3e) && (iVar1 = FUN_00408d5d(), iVar1 == 0)) break;
    } while (local_8 == -0x7789fe3e);
    if (DAT_005ebf54 == 0) {
      *param_4 = local_18;
      param_4[1] = local_14;
      param_4[2] = local_10;
      param_4[3] = local_c;
    }
    if (local_8 == 0) {
      return 1;
    }
  }
  return 0;
}


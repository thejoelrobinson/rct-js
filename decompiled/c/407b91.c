
undefined4 FUN_00407b91(int *param_1)

{
  int iVar1;
  byte local_8 [4];
  
  if (*param_1 == 0) {
    return 0;
  }
  iVar1 = (**(code **)(*(int *)*param_1 + 0x24))(*param_1,local_8);
  if (iVar1 == 0) {
    if ((local_8[0] & 1) != 0) {
      return 1;
    }
    if ((local_8[0] & 4) != 0) {
      return 1;
    }
  }
  return 0;
}


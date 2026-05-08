
undefined4 FUN_00418bc0(undefined4 *param_1)

{
  undefined4 uVar1;
  int iVar2;
  int iVar3;
  
  iVar2 = FUN_00417ce0(param_1[4]);
  if (iVar2 == 0) {
    return 0;
  }
  if (param_1 == (undefined4 *)&DAT_005ee780) {
    iVar2 = 0;
  }
  else {
    if (param_1 != (undefined4 *)&DAT_005ee7a0) {
      return 0;
    }
    iVar2 = 1;
  }
  DAT_005f0284 = DAT_005f0284 + 1;
  if ((param_1[3] & 0x10c) != 0) {
    return 0;
  }
  if ((&DAT_005f02e0)[iVar2] == 0) {
    iVar3 = FUN_004133c0(0x1000);
    (&DAT_005f02e0)[iVar2] = iVar3;
    if (iVar3 == 0) {
      param_1[2] = param_1 + 5;
      *param_1 = param_1 + 5;
      param_1[6] = 2;
      param_1[1] = 2;
      goto LAB_00418c60;
    }
  }
  uVar1 = (&DAT_005f02e0)[iVar2];
  param_1[6] = 0x1000;
  param_1[2] = uVar1;
  *param_1 = uVar1;
  param_1[1] = 0x1000;
LAB_00418c60:
  param_1[3] = param_1[3] | 0x1102;
  return 1;
}


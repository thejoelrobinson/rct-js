
undefined4 FUN_00417280(int *param_1,int *param_2,uint param_3,uint param_4)

{
  uint uVar1;
  
  if ((param_3 != 4) &&
     (((param_4 < 2 || (0x7fffffff < param_4)) || ((param_3 != 0 && (param_3 != 0x40)))))) {
    return 0xffffffff;
  }
  param_4 = param_4 & 0xfffffffe;
  FUN_00417140(param_1);
  FUN_00418ce0(param_1);
  uVar1 = param_1[3] & 0xffffc2f3;
  param_1[3] = uVar1;
  if ((param_3 & 4) == 0) {
    if (param_2 == (int *)0x0) {
      param_2 = (int *)FUN_004133c0(param_4);
      if (param_2 == (int *)0x0) {
        DAT_005f0284 = DAT_005f0284 + 1;
        return 0xffffffff;
      }
      uVar1 = param_1[3] | 0x408;
    }
    else {
      uVar1 = uVar1 | 0x500;
    }
    param_1[3] = uVar1;
  }
  else {
    param_2 = param_1 + 5;
    param_1[3] = uVar1 | 4;
    param_4 = 2;
  }
  param_1[6] = param_4;
  param_1[2] = (int)param_2;
  *param_1 = (int)param_2;
  param_1[1] = 0;
  return 0;
}


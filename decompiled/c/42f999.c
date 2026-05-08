
undefined1 FUN_0042f999(void)

{
  undefined1 uVar1;
  
  if (DAT_005f88ae != '\0') {
    if (DAT_005f88ae < '\0') {
      if (DAT_005f8d34 != '\0') {
        DAT_005f8d34 = DAT_005f8d34 + -1;
        return DAT_005f8cb4;
      }
    }
    else if (DAT_005f8d34 != '\0') {
      DAT_005f8d34 = DAT_005f8d34 + -1;
      uVar1 = FUN_0042f91e();
      return uVar1;
    }
  }
  DAT_005f8d34 = FUN_0042f91e();
  if (-1 < DAT_005f8d34) {
    DAT_005f88ae = 1;
    uVar1 = FUN_0042f91e();
    return uVar1;
  }
  DAT_005f88ae = 0xff;
  DAT_005f8d34 = -DAT_005f8d34;
  DAT_005f8cb4 = FUN_0042f91e();
  return DAT_005f8cb4;
}


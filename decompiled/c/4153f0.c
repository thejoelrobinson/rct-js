
undefined4 FUN_004153f0(undefined4 param_1)

{
  int iVar1;
  
  if (DAT_005f0248 != (code *)0x0) {
    iVar1 = (*DAT_005f0248)(param_1);
    if (iVar1 != 0) {
      return 1;
    }
  }
  return 0;
}


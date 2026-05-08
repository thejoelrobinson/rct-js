
undefined4 FUN_0040d8ee(int param_1)

{
  undefined4 uVar1;
  
  if (*(int *)(&DAT_005f03a0 + param_1 * 0x16c) == 0) {
    uVar1 = 0;
  }
  else if (*(int *)(&DAT_005f0500 + param_1 * 0x16c) == 0) {
    uVar1 = 1;
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}



undefined4 FUN_0040d94b(int param_1)

{
  undefined4 uVar1;
  
  if (*(int *)(&DAT_005f0500 + param_1 * 0x16c) == 0) {
    uVar1 = *(undefined4 *)(&DAT_005f03a4 + param_1 * 0x16c);
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}



void FUN_004033fa(undefined4 param_1)

{
  uint uVar1;
  
  uVar1 = DAT_005e91d0 + 1 & 0x3f;
  if (uVar1 != DAT_005e91d4) {
    *(undefined4 *)(&DAT_005f15e0 + DAT_005e91d0 * 8) = param_1;
    *(undefined4 *)(&DAT_005f15e4 + DAT_005e91d0 * 8) = 0;
    DAT_005e91d8 = DAT_005e91d0;
    DAT_005e91d0 = uVar1;
  }
  return;
}


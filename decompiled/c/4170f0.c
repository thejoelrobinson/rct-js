
int FUN_004170f0(int param_1)

{
  int iVar1;
  
  if (param_1 == 0) {
    iVar1 = FUN_004171c0(0);
    return iVar1;
  }
  iVar1 = FUN_00417140(param_1);
  if (iVar1 != 0) {
    return -1;
  }
  if ((*(uint *)(param_1 + 0xc) & 0x4000) != 0) {
    iVar1 = FUN_00418b60(*(undefined4 *)(param_1 + 0x10));
    return -(uint)(iVar1 != 0);
  }
  return 0;
}


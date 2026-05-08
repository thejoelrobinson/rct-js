
undefined4 FUN_00405a70(int param_1)

{
  int iVar1;
  undefined4 uVar2;
  
  iVar1 = *(int *)(param_1 + 0x54);
  uVar2 = *(undefined4 *)(param_1 + 8);
  if (DAT_005f1290 < 0x20) {
    if (iVar1 != 0) {
      *(short *)(&DAT_005f12c0 + DAT_005f1290 * 6) = (short)*(undefined4 *)(param_1 + 0xc);
      *(short *)(&DAT_005f12c2 + DAT_005f1290 * 6) = (short)uVar2;
      *(short *)(&DAT_005f12c4 + DAT_005f1290 * 6) = (short)iVar1;
      DAT_005f1290 = DAT_005f1290 + 1;
    }
    uVar2 = 1;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}


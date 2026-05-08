
void FUN_005e6906(void)

{
  int iVar1;
  undefined4 extraout_ECX;
  undefined2 extraout_DX;
  int unaff_ESI;
  undefined4 uVar2;
  
  FUN_005e698a();
  DAT_009a0124 = extraout_DX;
  uVar2 = extraout_ECX;
  FUN_00458bcf();
  FUN_00458bcf(uVar2);
  FUN_00458bcf();
  DAT_009a0118 = 0;
  iVar1 = FUN_004039ff(&DAT_0099fe18,&DAT_0099ff18,&DAT_009a0018,&DAT_009a0118,&DAT_009a0120);
  if (iVar1 != 0) {
    DAT_009a0128 = *(undefined1 *)(unaff_ESI + 0x174);
    DAT_009a0126 = *(undefined2 *)(unaff_ESI + 0x30);
  }
  return;
}


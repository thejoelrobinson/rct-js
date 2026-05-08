
undefined8 FUN_004405f3(void)

{
  int *piVar1;
  int iVar2;
  undefined4 in_EAX;
  undefined4 uVar3;
  undefined2 extraout_var;
  undefined4 in_EDX;
  undefined2 extraout_var_00;
  int unaff_EBX;
  int unaff_ESI;
  
  piVar1 = (int *)(unaff_ESI + 0xa0);
  iVar2 = *piVar1;
  *piVar1 = *piVar1 - unaff_EBX;
  if (SBORROW4(iVar2,unaff_EBX) != *piVar1 < 0) {
    *(undefined4 *)(unaff_ESI + 0xa0) = 0;
  }
  *(int *)(unaff_ESI + 0xa4) = *(int *)(unaff_ESI + 0xa4) + unaff_EBX;
  *(short *)(DAT_006293b0 + unaff_ESI) = *(short *)(DAT_006293b0 + unaff_ESI) + (short)unaff_EBX;
  FUN_005e5301();
  DAT_0099c163 = DAT_008d7ea4;
  uVar3 = FUN_004429db();
  FUN_00452fce(CONCAT22(extraout_var_00,*(undefined2 *)(unaff_ESI + 0x10)),
               CONCAT22(extraout_var,*(undefined2 *)(unaff_ESI + 0xe)),-unaff_EBX,uVar3);
  return CONCAT44(in_EDX,in_EAX);
}


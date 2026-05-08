
undefined2 FUN_00435a29(void)

{
  short sVar1;
  undefined2 uVar2;
  short extraout_CX;
  int extraout_EDX;
  char cVar3;
  short unaff_BX;
  
  sVar1 = FUN_00431510();
  cVar3 = (char)unaff_BX;
  if (cVar3 != '\0') {
    DAT_00628a36 = extraout_CX + 0x1f;
    DAT_00628a34 = sVar1 + 0x1f;
    DAT_00628a2c = extraout_EDX;
    DAT_00628a30 = sVar1;
    DAT_00628a32 = extraout_CX;
    DAT_00628a3a = cVar3;
    if (cVar3 == '\x04') {
      DAT_00628a38 = (*(byte *)(extraout_EDX + 5) & 0x1f) << 4;
      DAT_00628a34 = sVar1 + 0x1f;
      DAT_00628a36 = extraout_CX + 0x1f;
    }
    else {
      DAT_00628a38 = unaff_BX;
      FUN_00423677();
    }
                    /* WARNING: Could not recover jumptable at 0x00435acf. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    uVar2 = (*(code *)(&PTR_LAB_00435ad8)[DAT_00991f88])();
    return uVar2;
  }
  return 0x8000;
}


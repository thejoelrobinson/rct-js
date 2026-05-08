
undefined2 FUN_0043424f(void)

{
  short sVar1;
  undefined2 uVar2;
  short extraout_CX;
  char unaff_BL;
  
  sVar1 = FUN_00431510();
  if (unaff_BL != '\0') {
    DAT_00628a34 = sVar1 + 0x1f;
    DAT_00628a36 = extraout_CX + 0x1f;
    DAT_00628a30 = sVar1;
    DAT_00628a32 = extraout_CX;
    FUN_00423677();
                    /* WARNING: Could not recover jumptable at 0x004342b7. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    uVar2 = (*(code *)(&PTR_LAB_004342c0)[DAT_00991f88])();
    return uVar2;
  }
  return 0x8000;
}


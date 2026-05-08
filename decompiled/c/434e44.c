
undefined2 FUN_00434e44(void)

{
  short *psVar1;
  short sVar2;
  undefined2 uVar3;
  short unaff_BX;
  int unaff_ESI;
  
  sVar2 = FUN_005e3ace();
  if ((((unaff_ESI != 0) && (psVar1 = *(short **)(unaff_ESI + 8), psVar1 != (short *)0x0)) &&
      (psVar1[2] <= sVar2)) &&
     ((((short)(sVar2 - psVar1[2]) < *psVar1 && (psVar1[3] <= unaff_BX)) &&
      ((short)(unaff_BX - psVar1[3]) < psVar1[1])))) {
                    /* WARNING: Could not recover jumptable at 0x00434e91. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    uVar3 = (*(code *)(&PTR_LAB_00434e98)[DAT_00991f88])();
    return uVar3;
  }
  return 0x8000;
}


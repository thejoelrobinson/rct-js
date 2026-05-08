
void FUN_00453900(void)

{
  undefined2 unaff_DI;
  
  if ((DAT_006326bc == '\0') && (DAT_006323fc != -1)) {
                    /* WARNING: Could not recover jumptable at 0x00453927. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    DAT_00632600 = unaff_DI;
    (*(code *)(&PTR_LAB_00453930)[DAT_00991f88])();
    return;
  }
  return;
}


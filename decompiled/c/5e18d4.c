
void FUN_005e18d4(void)

{
  int unaff_ESI;
  
  if (*(int *)(unaff_ESI + 8) != 0) {
                    /* WARNING: Could not recover jumptable at 0x005e18e5. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (*(code *)(&PTR_LAB_005e18ec)[DAT_00991f88])();
    return;
  }
  return;
}


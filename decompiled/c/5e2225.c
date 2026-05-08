
void FUN_005e2225(void)

{
  int unaff_ESI;
  
  FUN_005e3ace();
  if (unaff_ESI != 0) {
    FUN_005e3874();
  }
                    /* WARNING: Could not recover jumptable at 0x005e223f. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_005e2248)[DAT_00991f36])();
  return;
}


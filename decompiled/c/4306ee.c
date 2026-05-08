
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004306ee(void)

{
  if ((_DAT_0099a500 & 1) != 0) {
    if (DAT_005f9430 == 0) {
                    /* WARNING: Could not recover jumptable at 0x00430715. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (*(code *)(&PTR_LAB_0043071c)[*DAT_005f942c])();
      return;
    }
    DAT_005f9430 = DAT_005f9430 + -1;
  }
  return;
}


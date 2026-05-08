
void FUN_00429361(void)

{
  if (DAT_0087d718 != -0x80000000) {
    return;
  }
                    /* WARNING: Could not recover jumptable at 0x00429375. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_0042937c)[DAT_0087d0d0])();
  return;
}


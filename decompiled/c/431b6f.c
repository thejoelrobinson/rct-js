
void FUN_00431b6f(void)

{
  int iVar1;
  undefined4 unaff_EBP;
  undefined4 *puVar2;
  
  DAT_00628928 = 0;
  puVar2 = &DAT_006284ec;
  DAT_005f96e8 = unaff_EBP;
  for (iVar1 = 0x100; iVar1 != 0; iVar1 = iVar1 + -1) {
    *puVar2 = 0;
    puVar2 = puVar2 + 1;
  }
  DAT_006288ec = 0xffffffff;
  DAT_006288f0 = 0;
  DAT_00628924 = 0;
  DAT_00628920 = 0;
  return;
}



void FUN_004528d6(void)

{
  short sVar1;
  short *psVar2;
  
  if (DAT_006323f4 != -1) {
    psVar2 = &DAT_00632448;
    sVar1 = 6;
    do {
      if (*psVar2 != -1) {
        if (psVar2[0xc] != -1) {
          FUN_00407a41(psVar2 + 2);
        }
        if (psVar2[0x1a] != -1) {
          FUN_00407a41(psVar2 + 0x10);
        }
        *psVar2 = -1;
      }
      psVar2 = psVar2 + 0x1e;
      sVar1 = sVar1 + -1;
    } while (sVar1 != 0);
  }
  return;
}


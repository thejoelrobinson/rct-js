
void FUN_004531b0(void)

{
  int iVar1;
  short *psVar2;
  
  if (DAT_006323f4 != -1) {
    psVar2 = &DAT_00632608;
    do {
      if (*psVar2 != -1) {
        iVar1 = FUN_00407b91(psVar2 + 1);
        if (iVar1 != 1) {
          FUN_00407a41(psVar2 + 1);
          *psVar2 = -1;
        }
      }
      psVar2 = psVar2 + 0xb;
    } while (psVar2 < &DAT_0063268c);
  }
  return;
}



void FUN_0044ecfb(void)

{
  char extraout_CL;
  char cVar1;
  char cVar2;
  int unaff_ESI;
  char *pcVar3;
  
  cVar1 = '\0';
  cVar2 = '\0';
  pcVar3 = &DAT_00887420;
  do {
    if ((*pcVar3 != -1) && (cVar1 = cVar1 + '\x01', (pcVar3[0xfd] & 8U) != 0)) {
      pcVar3[0xfd] = pcVar3[0xfd] & 0xf7;
      cVar2 = cVar2 + '\x01';
    }
    pcVar3 = pcVar3 + 0x260;
  } while (pcVar3 < &DAT_008ad1c0);
  if (cVar2 != '\0') {
    FUN_005e43de();
    cVar1 = extraout_CL;
  }
  if (cVar1 != *(char *)(unaff_ESI + 0x158)) {
    *(char *)(unaff_ESI + 0x158) = cVar1;
    pcVar3 = &DAT_00887420;
    cVar1 = '\0';
    do {
      if (*pcVar3 != -1) {
        *(char *)(unaff_ESI + 0x58) = cVar1;
                    /* WARNING: Could not recover jumptable at 0x0044ed64. Too many branches */
                    /* WARNING: Treating indirect jump as call */
        (*(code *)(&PTR_LAB_0044ed6c)[*(ushort *)(unaff_ESI + 0x16a)])(0);
        return;
      }
      pcVar3 = pcVar3 + 0x260;
      cVar1 = cVar1 + '\x01';
    } while (pcVar3 < &DAT_008ad1c0);
    *(undefined1 *)(unaff_ESI + 0x159) = 0xff;
    FUN_005e43de();
  }
  return;
}


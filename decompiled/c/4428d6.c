
void FUN_004428d6(void)

{
  byte *pbVar1;
  byte bVar2;
  int unaff_ESI;
  
  if ((1 < DAT_0087d7a0) &&
     (*(char *)(unaff_ESI + 0xf4) = *(char *)(unaff_ESI + 0xf4) + '\x01',
     *(char *)(unaff_ESI + 0xf4) == -2)) {
    *(undefined1 *)(unaff_ESI + 0xf4) = 0xdc;
    FUN_00440fe3();
    pbVar1 = (byte *)(unaff_ESI + 0x3b);
    bVar2 = *pbVar1;
    *pbVar1 = *pbVar1 - 0x1e;
    if (bVar2 < 0x1e) {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
  }
  return;
}


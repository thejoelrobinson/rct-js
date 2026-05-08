
void FUN_00442816(void)

{
  byte *pbVar1;
  char *pcVar2;
  byte bVar3;
  int unaff_ESI;
  
  if (*(char *)(unaff_ESI + 0xc5) != -1) {
    if ((*(char *)(unaff_ESI + 0xc6) == '\x1e') || (*(char *)(unaff_ESI + 0xc6) == '<')) {
      FUN_00440fe3();
      pbVar1 = (byte *)(unaff_ESI + 0x3b);
      bVar3 = *pbVar1;
      *pbVar1 = *pbVar1 - 0x1e;
      if (bVar3 < 0x1e) {
        *(undefined1 *)(unaff_ESI + 0x3b) = 0;
      }
    }
    pcVar2 = (char *)(unaff_ESI + 0xc6);
    *pcVar2 = *pcVar2 + -1;
    if (*pcVar2 == '\0') {
      *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
      FUN_005e5301();
    }
  }
  return;
}


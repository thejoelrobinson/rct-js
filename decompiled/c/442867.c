
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00442867(void)

{
  byte *pbVar1;
  char *pcVar2;
  byte bVar3;
  int unaff_ESI;
  
  if ((*(ushort *)(unaff_ESI + 200) & 1) != 0) {
    if (((*(char *)(unaff_ESI + 0xc6) == '\x01') || (*(char *)(unaff_ESI + 0xc6) == '\x1e')) ||
       (*(char *)(unaff_ESI + 0xc6) == '<')) {
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
      *(undefined1 *)(unaff_ESI + 0xc6) = 0x5a;
      DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
      unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
      FUN_0042c711();
    }
  }
  return;
}


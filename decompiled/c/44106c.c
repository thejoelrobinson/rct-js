
void FUN_0044106c(void)

{
  int in_EAX;
  char cVar1;
  uint uVar2;
  uint uVar3;
  int unaff_ESI;
  
  cVar1 = '\x14';
  if ((((*(uint *)(&DAT_005f5b78 + in_EAX * 8) & 0x800000) != 0) ||
      (cVar1 = '\x15', (*(uint *)(&DAT_005f5b78 + in_EAX * 8) & 0x1000000) != 0)) ||
     (cVar1 = '\x16', (*(uint *)(&DAT_005f5b78 + in_EAX * 8) & 0x2000000) != 0)) {
    uVar2 = 0;
    do {
      while( true ) {
        if (*(char *)(unaff_ESI + 0xb0 + uVar2 * 4) == -1) {
          return;
        }
        uVar3 = uVar2;
        if (cVar1 != *(char *)(unaff_ESI + 0xb0 + uVar2 * 4)) break;
        for (; uVar3 < 4; uVar3 = uVar3 + 1) {
          *(undefined4 *)(unaff_ESI + 0xb0 + uVar3 * 4) =
               *(undefined4 *)(unaff_ESI + 0xb4 + uVar3 * 4);
        }
        *(undefined1 *)(unaff_ESI + 0xb0 + uVar3 * 4) = 0xff;
        *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 1;
      }
      uVar2 = uVar2 + 1;
    } while (uVar2 < 5);
  }
  return;
}


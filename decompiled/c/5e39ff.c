
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e39ff(void)

{
  char cVar1;
  undefined4 uVar2;
  short sVar3;
  uint uVar4;
  int unaff_ESI;
  char *pcVar5;
  
  uVar2 = 0xffff;
  if ((((DAT_00991f36 == '\x05') || (DAT_00991f36 == '\x02')) &&
      (DAT_00991f37 == *(char *)(unaff_ESI + 0x174))) &&
     ((DAT_00991f38 == *(short *)(unaff_ESI + 0x30) && ((DAT_00991f30 & 1) != 0)))) {
    uVar2 = _DAT_00991f3c;
  }
  sVar3 = -1;
  if ((((DAT_00991f30 >> 3 & 1) != 0) && (DAT_00991f5a == *(char *)(unaff_ESI + 0x174))) &&
     (DAT_00991f58 == *(short *)(unaff_ESI + 0x30))) {
    sVar3 = DAT_00991f5c;
  }
  uVar4 = 0;
  for (pcVar5 = *(char **)(unaff_ESI + 0x1c); cVar1 = *pcVar5, cVar1 != '\x15';
      pcVar5 = pcVar5 + 0x10) {
    if ((((cVar1 == '\x04') || (cVar1 == '\x02')) && ((*(uint *)(pcVar5 + 10) & 0x80000000) != 0))
       && ((((*(byte *)(unaff_ESI + 0x14 + ((int)uVar4 >> 3)) >> (uVar4 & 7) & 1) != 0 ||
            ((short)uVar2 == (short)uVar4)) || (sVar3 == (short)uVar4)))) {
      FUN_005e117d();
    }
    uVar4 = uVar4 + 1;
  }
  return;
}


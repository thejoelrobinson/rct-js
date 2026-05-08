
ushort FUN_0044f8e7(void)

{
  char cVar1;
  ushort uVar2;
  uint uVar3;
  char *unaff_ESI;
  
  uVar3 = 0;
  uVar2 = 0;
  do {
    if (*(short *)(unaff_ESI + uVar3 * 2 + 0x2a) != -1) {
      uVar2 = uVar2 + 1;
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  cVar1 = unaff_ESI[4];
  if ((((cVar1 != '\x02') && (cVar1 != '\x03')) && (cVar1 != '\x17')) && (*unaff_ESI != '\x16')) {
    return uVar2;
  }
  if (1 < uVar2) {
    DAT_00991efc = 0x44c;
    return uVar2;
  }
  return uVar2;
}


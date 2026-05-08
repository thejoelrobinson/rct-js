
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e5ce2(void)

{
  ushort uVar1;
  ushort unaff_BX;
  short unaff_BP;
  int unaff_ESI;
  undefined2 *puVar2;
  
  DAT_00991f30 = DAT_00991f30 & 0xfffffff9;
  if ((short)unaff_BX < 0) {
    DAT_00991f30 = DAT_00991f30 | 2;
  }
  DAT_009a15bd = FUN_005e5b80();
  _DAT_009a15c4 = (unaff_BX & 0x7fff) * 10 + 0xb;
  _DAT_009a15c0 = unaff_BP + 3;
  DAT_009a1244 = unaff_BX & 0x7fff;
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_009a15bc;
  if ((DAT_009a15bd & 0x80) != 0) {
    *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 0x10;
  }
  puVar2 = &DAT_009a1248;
  uVar1 = DAT_009a1244;
  do {
    *puVar2 = 0;
    puVar2 = puVar2 + 1;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  _DAT_009a1246 = 0xffff;
  _DAT_009a13d8 = 0;
  _DAT_009a13dc = 0;
  DAT_00991f36 = 5;
  return;
}


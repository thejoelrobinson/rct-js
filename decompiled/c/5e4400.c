
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e4400(void)

{
  short sVar1;
  byte *pbVar2;
  int unaff_ESI;
  int unaff_EDI;
  
  if (((*(ushort *)(unaff_ESI + 0x32) & 0x10) != 0) && ((*(ushort *)(unaff_ESI + 0x32) & 0x20) == 0)
     ) {
    FUN_009b30f1();
  }
  pbVar2 = *(byte **)(unaff_ESI + 0x1c);
  _DAT_0099fe02 = 0x34;
  _DAT_0099fe06 = 0;
  DAT_009a13e4 = -1;
  if ((((DAT_00991f36 == '\x05') || (DAT_00991f36 == '\x02')) &&
      (DAT_00991f37 == *(char *)(unaff_ESI + 0x174))) &&
     ((DAT_00991f38 == *(short *)(unaff_ESI + 0x30) && ((DAT_00991f30 & 1) != 0)))) {
    DAT_009a13e4 = (short)_DAT_00991f3c;
  }
  DAT_009a13e6 = -1;
  if ((((DAT_00991f30 >> 3 & 1) != 0) && (DAT_00991f5a == *(char *)(unaff_ESI + 0x174))) &&
     (DAT_00991f58 == *(short *)(unaff_ESI + 0x30))) {
    DAT_009a13e6 = DAT_00991f5c;
  }
  _DAT_009a13e0 = *(uint *)(unaff_ESI + 0x10);
  _DAT_009a13e8 = *(uint *)(unaff_ESI + 0x14);
  while (((*(ushort *)(unaff_ESI + 0x32) & 0x20) == 0 &&
         ((((sVar1 = *(short *)(unaff_EDI + 4) - *(short *)(unaff_ESI + 0x20),
            *(short *)(pbVar2 + 4) < sVar1 ||
            ((short)(sVar1 + *(short *)(unaff_EDI + 8)) <= *(short *)(pbVar2 + 2))) ||
           (sVar1 = *(short *)(unaff_EDI + 6) - *(short *)(unaff_ESI + 0x22),
           *(short *)(pbVar2 + 8) < sVar1)) ||
          ((short)(sVar1 + *(short *)(unaff_EDI + 10)) <= *(short *)(pbVar2 + 6)))))) {
    pbVar2 = pbVar2 + 0x10;
    DAT_009a13e4 = DAT_009a13e4 + -1;
    DAT_009a13e6 = DAT_009a13e6 + -1;
    _DAT_009a13e8 = _DAT_009a13e8 >> 1;
    _DAT_009a13e0 = _DAT_009a13e0 >> 1;
    if (*pbVar2 == 0x15) {
      if ((*(ushort *)(unaff_ESI + 0x32) & 0x600) != 0) {
        FUN_005e0e07(unaff_ESI);
      }
      return;
    }
  }
                    /* WARNING: Could not recover jumptable at 0x005e4523. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_005e452c)[*pbVar2])();
  return;
}


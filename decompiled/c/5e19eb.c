
void FUN_005e19eb(void)

{
  byte bVar1;
  short sVar2;
  short sVar3;
  short sVar4;
  short sVar5;
  short in_AX;
  short sVar6;
  short sVar7;
  short sVar8;
  short unaff_BX;
  short sVar9;
  short sVar10;
  int unaff_ESI;
  short *unaff_EDI;
  
  sVar6 = unaff_EDI[4];
  sVar9 = unaff_EDI[5];
  unaff_EDI[4] = in_AX;
  unaff_EDI[5] = unaff_BX;
  bVar1 = *(byte *)(unaff_EDI + 8);
  if ((sVar9 >> (bVar1 & 0x1f) == unaff_BX >> (bVar1 & 0x1f)) &&
     (sVar6 >> (bVar1 & 0x1f) == in_AX >> (bVar1 & 0x1f))) {
    return;
  }
  if ((*(ushort *)(unaff_ESI + 0x32) & 0x40) == 0) {
    sVar6 = unaff_EDI[2];
    sVar9 = *unaff_EDI;
    sVar8 = unaff_EDI[4];
    sVar10 = unaff_EDI[3];
    sVar2 = unaff_EDI[1];
    sVar3 = unaff_EDI[5];
    sVar4 = unaff_EDI[6];
    sVar5 = unaff_EDI[7];
    bVar1 = *(byte *)(unaff_EDI + 8);
    sVar7 = unaff_EDI[2];
    if (sVar7 < 0) {
      *unaff_EDI = *unaff_EDI + sVar7;
      unaff_EDI[2] = 0;
      sVar7 = sVar7 << (bVar1 & 0x1f);
      unaff_EDI[6] = unaff_EDI[6] + sVar7;
      unaff_EDI[4] = unaff_EDI[4] - sVar7;
    }
    sVar7 = (unaff_EDI[2] + *unaff_EDI) - DAT_00971ed6;
    if (sVar7 != 0 && DAT_00971ed6 <= (short)(unaff_EDI[2] + *unaff_EDI)) {
      *unaff_EDI = *unaff_EDI - sVar7;
      unaff_EDI[6] = unaff_EDI[6] - (sVar7 << (bVar1 & 0x1f));
    }
    if (0 < *unaff_EDI) {
      sVar7 = unaff_EDI[3];
      if (sVar7 < 0) {
        unaff_EDI[1] = unaff_EDI[1] + sVar7;
        unaff_EDI[3] = 0;
        sVar7 = sVar7 << (bVar1 & 0x1f);
        unaff_EDI[7] = unaff_EDI[7] + sVar7;
        unaff_EDI[5] = unaff_EDI[5] - sVar7;
      }
      sVar7 = (unaff_EDI[3] + unaff_EDI[1]) - DAT_00971ed8;
      if (sVar7 != 0 && DAT_00971ed8 <= (short)(unaff_EDI[3] + unaff_EDI[1])) {
        unaff_EDI[1] = unaff_EDI[1] - sVar7;
        unaff_EDI[7] = unaff_EDI[7] - (sVar7 << (bVar1 & 0x1f));
      }
      if (0 < unaff_EDI[1]) {
        FUN_005e1b3e();
      }
    }
    unaff_EDI[7] = sVar5;
    unaff_EDI[6] = sVar4;
    unaff_EDI[5] = sVar3;
    unaff_EDI[1] = sVar2;
    unaff_EDI[3] = sVar10;
    unaff_EDI[4] = sVar8;
    *unaff_EDI = sVar9;
    unaff_EDI[2] = sVar6;
    return;
  }
  sVar6 = unaff_EDI[2];
  sVar9 = unaff_EDI[3];
  sVar8 = *unaff_EDI + sVar6;
  sVar10 = unaff_EDI[1] + sVar9;
  if (sVar6 < 0) {
    sVar6 = 0;
  }
  if (sVar9 < 0) {
    sVar9 = 0;
  }
  if (DAT_00971ed6 < sVar8) {
    sVar8 = DAT_00971ed6;
  }
  if (DAT_00971ed8 < sVar10) {
    sVar10 = DAT_00971ed8;
  }
  if ((sVar6 < sVar8) && (sVar9 < sVar10)) {
    FUN_005e12eb();
    return;
  }
  return;
}


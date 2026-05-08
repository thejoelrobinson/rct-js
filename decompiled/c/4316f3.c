
void FUN_004316f3(void)

{
  byte bVar1;
  int *piVar2;
  ushort in_AX;
  uint uVar3;
  uint uVar4;
  short in_DX;
  int iVar5;
  ushort unaff_BX;
  uint uVar6;
  short unaff_BP;
  short sVar7;
  ushort uVar8;
  int unaff_ESI;
  int iVar9;
  int iVar10;
  int *unaff_EDI;
  int *piVar11;
  
  DAT_00991f8c = *(ushort *)(unaff_ESI + 0x12);
  DAT_005f96ce = (ushort)*(byte *)(unaff_ESI + 0x10);
  uVar8 = -1 << (*(byte *)(unaff_ESI + 0x10) & 0x1f);
  DAT_005f96c4 = in_AX & uVar8;
  DAT_005f96c6 = unaff_BX & uVar8;
  DAT_005f96c8 = in_DX - in_AX & uVar8;
  DAT_005f96ca = unaff_BP - unaff_BX & uVar8;
  bVar1 = *(byte *)(unaff_ESI + 0x10);
  DAT_005f96cc = -((((short)DAT_005f96c8 >> (bVar1 & 0x1f)) - (short)unaff_EDI[2]) -
                  (short)unaff_EDI[3]);
  DAT_005f96c0 = *unaff_EDI +
                 (int)(short)((((short)(DAT_005f96c4 - (*(ushort *)(unaff_ESI + 8) & uVar8)) >>
                               (bVar1 & 0x1f)) + *(short *)(unaff_ESI + 4)) - (short)unaff_EDI[1]) +
                 (int)(short)((short)unaff_EDI[2] + (short)unaff_EDI[3]) *
                 (int)(short)((((short)(DAT_005f96c6 - (*(ushort *)(unaff_ESI + 10) & uVar8)) >>
                               (bVar1 & 0x1f)) + *(short *)(unaff_ESI + 6)) -
                             *(short *)((int)unaff_EDI + 6));
  piVar11 = &DAT_005f96d0;
  uVar4 = DAT_005f96c4 & 0xffffffe0;
  DAT_005f96d6 = DAT_005f96c6;
  DAT_005f96da = DAT_005f96ca;
  DAT_005f96de = DAT_005f96ce;
  do {
    uVar3 = (uint)DAT_005f96c4;
    uVar6 = (uint)DAT_005f96c8;
    iVar5 = DAT_005f96c0;
    sVar7 = DAT_005f96cc;
    if ((int)uVar3 <= (int)uVar4) {
      uVar6 = uVar6 - (uVar4 - uVar3);
      iVar9 = (int)(uVar4 - uVar3) >> ((byte)DAT_005f96ce & 0x1f);
      iVar5 = DAT_005f96c0 + iVar9;
      sVar7 = DAT_005f96cc + (short)iVar9;
      uVar3 = uVar4;
    }
    uVar4 = uVar4 + 0x20;
    iVar9 = uVar6 + uVar3;
    if ((int)uVar4 <= iVar9) {
      iVar10 = iVar9 - uVar4;
      iVar9 = iVar9 - iVar10;
      sVar7 = sVar7 + (short)(iVar10 >> ((byte)DAT_005f96ce & 0x1f));
    }
    *(short *)(piVar11 + 1) = (short)uVar3;
    *(short *)(piVar11 + 2) = (short)iVar9 - (short)uVar3;
    *piVar11 = iVar5;
    *(short *)(piVar11 + 3) = sVar7;
    if ((DAT_00991f8c & 1) != 0) {
      FUN_009b30bc();
    }
    DAT_005f96e0 = &DAT_006284ac;
    DAT_00981ef8 = piVar11;
    FUN_00431b6f();
    FUN_00436b2a();
    FUN_00433bae();
    FUN_00433e1c();
    piVar2 = DAT_00981ef8;
    if (*(int *)(&DAT_00628a3c + (uint)DAT_008d7eb4 * 4) != -1) {
      FUN_009b30f1();
      piVar11 = piVar2;
    }
    FUN_00431ad7();
  } while ((short)uVar4 < (short)(DAT_005f96c4 + DAT_005f96c8));
  return;
}


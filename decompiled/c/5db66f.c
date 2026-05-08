
void FUN_005db66f(void)

{
  short sVar1;
  ushort uVar2;
  uint extraout_ECX;
  uint extraout_ECX_00;
  uint extraout_ECX_01;
  uint extraout_ECX_02;
  uint extraout_ECX_03;
  uint uVar3;
  ushort uVar4;
  ushort extraout_DX;
  ushort uVar5;
  int iVar6;
  uint uVar7;
  uint uVar8;
  int unaff_ESI;
  ushort uVar9;
  bool bVar10;
  undefined6 uVar11;
  
  iVar6 = (uint)*(byte *)(unaff_ESI + 0x30) * 0x260;
  sVar1 = CONCAT11((char)((ushort)(*(short *)(unaff_ESI + 0x10) +
                                  (&DAT_0065247a)[((byte)(&DAT_008874a1)[iVar6] & 3) * 2]) >> 5),
                   (char)((ushort)(*(short *)(unaff_ESI + 0xe) +
                                  (&DAT_00652478)[((byte)(&DAT_008874a1)[iVar6] & 3) * 2]) >> 5));
  if (sVar1 == *(short *)(&DAT_008874a2 + iVar6)) {
    *(undefined1 *)(unaff_ESI + 0x51) = 1;
    *(short *)(unaff_ESI + 0x36) = sVar1;
    return;
  }
  *(undefined1 *)(unaff_ESI + 0x51) = 0;
  uVar2 = FUN_005df40c();
  uVar8 = (uint)uVar2;
  if ((short)uVar2 < 0) {
    uVar5 = (((*(ushort *)(&DAT_008874a2 + iVar6) & 0xff) * 0x20 -
             (&DAT_00652478)[(*(ushort *)(&DAT_008874a1 + iVar6) & 3) * 2]) + 0x10) -
            *(short *)(unaff_ESI + 0xe);
    uVar2 = uVar5;
    if ((short)uVar5 < 0) {
      uVar2 = -uVar5;
    }
    uVar4 = (((*(ushort *)(&DAT_008874a2 + iVar6) >> 8) * 0x20 -
             (&DAT_0065247a)[(*(ushort *)(&DAT_008874a1 + iVar6) & 3) * 2]) + 0x10) -
            *(short *)(unaff_ESI + 0x10);
    uVar9 = uVar4;
    if ((short)uVar4 < 0) {
      uVar9 = -uVar4;
    }
    if (uVar9 < uVar2) {
      uVar8 = 2;
      if ((short)uVar5 < 0) {
        uVar8 = 0;
      }
    }
    else {
      uVar8 = 1;
      if ((short)uVar4 < 0) {
        uVar8 = 3;
      }
    }
  }
  uVar7 = uVar8 & 3;
  uVar3 = extraout_ECX;
  if (uVar7 != extraout_ECX) {
    uVar5 = *(short *)(unaff_ESI + 0x38) + (&DAT_00652478)[uVar7 * 2];
    bVar10 = CARRY2(*(ushort *)(unaff_ESI + 0x3a),(&DAT_0065247a)[uVar7 * 2]);
    uVar11 = FUN_005db615();
    uVar2 = (ushort)((uint6)uVar11 >> 0x20);
    uVar8 = (uint)uVar11;
    uVar3 = extraout_ECX_00;
    if (!bVar10) goto LAB_005db808;
  }
  uVar7 = uVar8 + 1 & 3;
  if (uVar7 != uVar3) {
    uVar5 = *(short *)(unaff_ESI + 0x38) + (&DAT_00652478)[uVar7 * 2];
    bVar10 = CARRY2(*(ushort *)(unaff_ESI + 0x3a),(&DAT_0065247a)[uVar7 * 2]);
    uVar11 = FUN_005db615();
    uVar2 = (ushort)((uint6)uVar11 >> 0x20);
    uVar8 = (uint)uVar11;
    uVar3 = extraout_ECX_01;
    if (!bVar10) goto LAB_005db808;
  }
  uVar7 = uVar8 - 1 & 3;
  if (uVar7 != uVar3) {
    uVar5 = *(short *)(unaff_ESI + 0x38) + (&DAT_00652478)[uVar7 * 2];
    bVar10 = CARRY2(*(ushort *)(unaff_ESI + 0x3a),(&DAT_0065247a)[uVar7 * 2]);
    uVar11 = FUN_005db615();
    uVar2 = (ushort)((uint6)uVar11 >> 0x20);
    uVar8 = (uint)uVar11;
    uVar3 = extraout_ECX_02;
    if (!bVar10) goto LAB_005db808;
  }
  uVar8 = uVar8 + 2 & 3;
  if (uVar8 != uVar3) {
    uVar5 = *(short *)(unaff_ESI + 0x38) + (&DAT_00652478)[uVar8 * 2];
    bVar10 = CARRY2(*(ushort *)(unaff_ESI + 0x3a),(&DAT_0065247a)[uVar8 * 2]);
    FUN_005db615();
    uVar3 = extraout_ECX_03;
    uVar2 = extraout_DX;
    if (!bVar10) goto LAB_005db808;
  }
  uVar5 = *(short *)(unaff_ESI + 0x38) + (&DAT_00652478)[uVar3 * 2];
  uVar2 = *(short *)(unaff_ESI + 0x3a) + (&DAT_0065247a)[uVar3 * 2];
LAB_005db808:
  *(ushort *)(unaff_ESI + 0x36) = CONCAT11((char)(uVar2 >> 5),(char)(uVar5 >> 5));
  return;
}


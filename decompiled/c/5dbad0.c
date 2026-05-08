
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_005dbad0(void)

{
  char cVar1;
  byte bVar2;
  ushort uVar3;
  ushort uVar4;
  ushort uVar5;
  undefined2 uVar6;
  int iVar7;
  int iVar8;
  short sVar9;
  ushort uVar10;
  ushort extraout_CX;
  ushort extraout_CX_00;
  undefined2 extraout_CX_01;
  undefined2 extraout_CX_02;
  byte bVar11;
  ushort extraout_DX;
  undefined1 uVar12;
  byte *pbVar13;
  int unaff_ESI;
  uint uVar14;
  bool bVar15;
  
  DAT_0065dc40 = 0;
  DAT_0065dc30 = *(int *)(unaff_ESI + 0x2c) + *(int *)(unaff_ESI + 0x28);
  *(int *)(unaff_ESI + 0x28) = DAT_0065dc30;
  DAT_0065dc34 = (DAT_0065dc30 >> 10) * 0x2a;
  if ((*(ushort *)(&DAT_005f7104 + (uint)*(byte *)(unaff_ESI + 0x31) * 8) & 0x180) != 0) {
    FUN_005d849e();
  }
  DAT_0065dc38 = 1;
  *(undefined4 *)(unaff_ESI + 0x2c) = 0;
  iVar7 = DAT_0065dc34 + *(int *)(unaff_ESI + 0x24);
  *(int *)(unaff_ESI + 0x24) = iVar7;
  if (0x3689 < iVar7) {
    *(ushort *)(unaff_ESI + 0xb8) = *(ushort *)(unaff_ESI + 0xb8) & 0xfffd;
    _DAT_0065dc48 = *(undefined4 *)(unaff_ESI + 0xe);
    DAT_0065dc4c = *(undefined2 *)(unaff_ESI + 0x12);
    FUN_005e53ca();
LAB_005dbb4f:
    *(char *)(unaff_ESI + 0x35) = *(char *)(unaff_ESI + 0x35) + '\x01';
    sVar9 = (*(ushort *)(unaff_ESI + 0x36) >> 8) * 0x20 + 0x10;
    uVar3 = ((*(ushort *)(unaff_ESI + 0x36) & 0xff) * 0x20 + 0x10) - *(short *)(unaff_ESI + 0xe);
    if ((short)uVar3 < 0) {
      uVar10 = sVar9 - *(short *)(unaff_ESI + 0x10);
      if ((short)uVar10 < 0) {
        uVar4 = -uVar3;
        uVar5 = -uVar10;
        uVar12 = 0x18;
        if ((uVar5 <= (ushort)(uVar3 * -4)) && (uVar12 = 0, uVar4 <= (ushort)(uVar10 * -4))) {
          uVar12 = 0x1c;
        }
      }
      else {
        uVar4 = -uVar3;
        uVar12 = 8;
        uVar5 = uVar10;
        if ((uVar10 <= (ushort)(uVar3 * -4)) && (uVar12 = 0, uVar4 <= (ushort)(uVar10 * 4))) {
          uVar12 = 4;
        }
      }
    }
    else {
      uVar10 = sVar9 - *(short *)(unaff_ESI + 0x10);
      uVar4 = uVar3;
      if ((short)uVar10 < 0) {
        uVar5 = -uVar10;
        uVar12 = 0x18;
        if ((uVar5 <= (ushort)(uVar3 * 4)) && (uVar12 = 0x10, uVar3 <= (ushort)(uVar10 * -4))) {
          uVar12 = 0x14;
        }
      }
      else {
        uVar12 = 8;
        uVar5 = uVar10;
        if ((uVar10 <= (ushort)(uVar3 * 4)) && (uVar12 = 0x10, uVar3 <= (ushort)(uVar10 * 4))) {
          uVar12 = 0xc;
        }
      }
    }
    *(undefined1 *)(unaff_ESI + 0x34) = uVar12;
    if ((ushort)(uVar4 + uVar5) < 0xd) {
      FUN_005db66f();
    }
    if ((*(byte *)(unaff_ESI + 0x35) & 1) == 0) {
      cVar1 = *(char *)(unaff_ESI + 0x1e);
      if (cVar1 != *(char *)(unaff_ESI + 0x34)) {
        bVar11 = (*(char *)(unaff_ESI + 0x34) + '\x10') - cVar1 & 0x1e;
        if (bVar11 < 0x10) {
          bVar2 = cVar1 - 2;
          if (bVar11 < 8) {
            *(char *)(unaff_ESI + 0x35) = *(char *)(unaff_ESI + 0x35) + -1;
          }
        }
        else {
          bVar2 = cVar1 + 2;
          if (0x18 < bVar11) {
            *(char *)(unaff_ESI + 0x35) = *(char *)(unaff_ESI + 0x35) + -1;
          }
        }
        *(byte *)(unaff_ESI + 0x1e) = bVar2 & 0x1e;
      }
    }
    uVar14 = (*(ushort *)(unaff_ESI + 0x1e) | *(byte *)(unaff_ESI + 0x35) & 1) & 0x1f;
    bVar15 = CARRY2(*(ushort *)(unaff_ESI + 0x10),*(ushort *)(&DAT_0065e6be + uVar14 * 8));
    uVar3 = FUN_005dcd40();
    if (bVar15) {
      *(undefined4 *)(unaff_ESI + 0x24) = 0;
      if (*(char *)(unaff_ESI + 0x1e) == *(char *)(unaff_ESI + 0x34)) {
        *(byte *)(unaff_ESI + 0x1e) = *(byte *)(unaff_ESI + 0x1e) ^ 0x10;
        FUN_005db66f();
        *(byte *)(unaff_ESI + 0x1e) = *(byte *)(unaff_ESI + 0x1e) ^ 0x10;
      }
      goto LAB_005dbe58;
    }
    uVar10 = uVar3 & 0xffe0;
    bVar15 = uVar10 < *(ushort *)(unaff_ESI + 0x38);
    if ((uVar10 != *(ushort *)(unaff_ESI + 0x38)) ||
       (bVar15 = (extraout_CX & 0xffe0) < *(ushort *)(unaff_ESI + 0x3a), uVar5 = uVar3,
       uVar4 = extraout_CX, (extraout_CX & 0xffe0) != *(ushort *)(unaff_ESI + 0x3a))) {
      uVar5 = FUN_005db615();
      if (bVar15) {
        if ((*(char *)(unaff_ESI + 0x51) == '\x01') &&
           (iVar7 = (uint)*(byte *)(unaff_ESI + 0x30) * 0x260,
           CONCAT11((char)(extraout_DX >> 5),(char)(uVar3 >> 5)) ==
           *(short *)(&DAT_008874a2 + iVar7))) {
          if (((&DAT_008874a1)[iVar7] & 1) == 0) {
            uVar5 = extraout_CX_00;
          }
          bVar15 = (uVar5 & 0x1f) < 0x10;
          if ((uVar5 & 0x1f) == 0x10) {
            *(undefined4 *)(unaff_ESI + 0x24) = 0;
            uVar6 = FUN_005dcd40();
            if (!bVar15) {
              *(ushort *)(unaff_ESI + 0x38) = uVar10;
              *(ushort *)(unaff_ESI + 0x3a) = extraout_DX;
              for (pbVar13 = (byte *)(&DAT_00971ef4)
                                     [(ushort)((ushort)(extraout_DX << 7 | extraout_DX >> 9 | uVar10
                                                       ) >> 5 | (extraout_DX >> 9) << 0xb)];
                  ((*pbVar13 & 0x3c) != 8 ||
                  ((byte)(*(ushort *)(unaff_ESI + 0x3c) >> 2) != pbVar13[2])); pbVar13 = pbVar13 + 8
                  ) {
              }
              *(short *)(unaff_ESI + 0x36) =
                   (short)CONCAT31((int3)(((uint)pbVar13[4] << 2) >> 8),
                                   (byte)((uint)pbVar13[4] << 2) | (&DAT_008874a1)[iVar7] & 3);
              *(undefined2 *)(unaff_ESI + 0x34) = 0;
              *(undefined1 *)(unaff_ESI + 0x50) = 4;
              _DAT_0065dc48 = CONCAT22(extraout_CX_02,uVar6);
            }
          }
          else {
            *(undefined4 *)(unaff_ESI + 0x24) = 0;
            uVar6 = FUN_005dcd40();
            if (!bVar15) {
              _DAT_0065dc48 = CONCAT22(extraout_CX_01,uVar6);
            }
          }
        }
        else {
          *(undefined4 *)(unaff_ESI + 0x24) = 0;
          if (*(char *)(unaff_ESI + 0x1e) == *(char *)(unaff_ESI + 0x34)) {
            FUN_005db66f();
          }
        }
LAB_005dbe58:
        FUN_00444927();
        FUN_005e53ca();
        goto LAB_005dbe76;
      }
      *(ushort *)(unaff_ESI + 0x38) = uVar10;
      *(ushort *)(unaff_ESI + 0x3a) = extraout_DX;
      uVar4 = extraout_CX_00;
    }
    *(int *)(unaff_ESI + 0x24) = *(int *)(unaff_ESI + 0x24) - *(int *)(&DAT_0065e6c0 + uVar14 * 8);
    _DAT_0065dc48 = CONCAT22(uVar4,uVar5);
    if (*(int *)(unaff_ESI + 0x24) < 0x368a) goto LAB_005dbe58;
    DAT_0065dc38 = DAT_0065dc38 + 1;
    goto LAB_005dbb4f;
  }
LAB_005dbe76:
  iVar7 = *(int *)(unaff_ESI + 0x28) >> 8;
  iVar7 = iVar7 * iVar7;
  if (*(int *)(unaff_ESI + 0x28) < 0) {
    iVar7 = -iVar7;
  }
  iVar7 = -(((*(int *)(unaff_ESI + 0x28) >> 1) + (iVar7 >> 5)) /
           (int)(uint)*(ushort *)(unaff_ESI + 0x46));
  if ((*(ushort *)(&DAT_005f7104 + (uint)*(byte *)(unaff_ESI + 0x31) * 8) & 8) != 0) {
    uVar14 = (uint)*(byte *)(unaff_ESI + 0xc2);
    iVar8 = uVar14 * 0x4000;
    if ((*(ushort *)(unaff_ESI + 0x48) & 8) != 0) {
      iVar8 = uVar14 * -0x4000;
    }
    iVar7 = iVar7 + (int)((iVar8 - *(int *)(unaff_ESI + 0x28)) *
                         (uint)*(byte *)(unaff_ESI + 0xc3) * 2) /
                    (int)(uVar14 * *(ushort *)(unaff_ESI + 0x46) >> 2);
  }
  *(int *)(unaff_ESI + 0x2c) = iVar7;
  return DAT_0065dc40;
}


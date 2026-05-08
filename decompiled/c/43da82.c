
undefined4 FUN_0043da82(void)

{
  char *pcVar1;
  byte *pbVar2;
  short sVar3;
  byte bVar6;
  undefined4 in_EAX;
  uint uVar4;
  undefined4 uVar5;
  ushort uVar7;
  undefined2 extraout_var;
  undefined1 extraout_DL;
  uint in_EDX;
  undefined2 extraout_var_00;
  short sVar8;
  undefined4 unaff_EBX;
  ushort uVar9;
  ushort uVar10;
  int unaff_ESI;
  uint uVar11;
  int iVar12;
  
  uVar11 = in_EDX & 0xff;
  iVar12 = uVar11 * 0x260;
  if ((in_EDX & 0x100) == 0) {
    bVar6 = *(byte *)(unaff_ESI + 0x3a);
    uVar7 = 0x1ff;
    uVar9 = (ushort)bVar6;
    if ((&DAT_00887510)[uVar11 * 0x130] != -1) {
      uVar7 = 0;
      sVar3 = (*(byte *)(unaff_ESI + 0x43) & 0xf) * 100;
      sVar8 = (ushort)(*(byte *)(unaff_ESI + 0x43) >> 4) * 100;
      if ((sVar3 <= (short)(&DAT_00887512)[uVar11 * 0x130]) &&
         ((short)(&DAT_00887512)[uVar11 * 0x130] <= sVar8)) {
        uVar7 = 2;
      }
      sVar3 = sVar3 + (ushort)bVar6 * -2;
      uVar10 = (ushort)bVar6;
      sVar8 = sVar8 + uVar10;
      if ((sVar3 <= (short)(&DAT_00887512)[uVar11 * 0x130]) &&
         ((short)(&DAT_00887512)[uVar11 * 0x130] <= sVar8)) {
        uVar7 = uVar7 | 0x10;
      }
      if (((short)(sVar3 + uVar10 * -2) <= (short)(&DAT_00887512)[uVar11 * 0x130]) &&
         ((short)(&DAT_00887512)[uVar11 * 0x130] <= (short)(sVar8 + uVar10))) {
        uVar7 = uVar7 | 0x80;
      }
      uVar4 = *(byte *)(unaff_ESI + 0x44) & 3;
      if ((*(short *)(&DAT_0062d620 + uVar4 * 4) <= *(short *)(&DAT_00887514 + iVar12)) &&
         (*(short *)(&DAT_00887514 + iVar12) <= *(short *)(&DAT_0062d622 + uVar4 * 4))) {
        uVar7 = uVar7 | 4;
      }
      sVar3 = *(short *)(&DAT_0062d620 + uVar4 * 4) + uVar9 * -2;
      sVar8 = *(short *)(&DAT_0062d622 + uVar4 * 4) + uVar9;
      if ((sVar3 <= *(short *)(&DAT_00887514 + iVar12)) &&
         (*(short *)(&DAT_00887514 + iVar12) <= sVar8)) {
        uVar7 = uVar7 | 0x20;
      }
      if (((short)(sVar3 + uVar9 * -2) <= *(short *)(&DAT_00887514 + iVar12)) &&
         (*(short *)(&DAT_00887514 + iVar12) <= (short)(sVar8 + uVar9))) {
        uVar7 = uVar7 | 0x100;
      }
    }
    uVar9 = (&DAT_00887516)[uVar11 * 0x130];
    uVar10 = uVar7 | 0x200;
    if (((uVar9 != 0xffff) &&
        (uVar10 = uVar7 | 0x400, uVar9 < (ushort)(&DAT_00887508)[uVar11 * 0x130])) &&
       (uVar10 = uVar7 | 0x200,
       (ushort)((short)((uint)uVar9 * (uint)bVar6 >> 8) + (&DAT_00887516)[uVar11 * 0x130]) <
       (ushort)(&DAT_00887508)[uVar11 * 0x130])) {
      uVar10 = uVar7;
    }
    sVar3 = 0;
    if ((uVar10 & 0x200) != 0) {
      sVar3 = 0xf;
    }
    if ((uVar10 & 0x400) != 0) {
      sVar3 = sVar3 + 0x28;
    }
    if ((uVar10 & 0x600) != 0) {
      sVar3 = sVar3 + -0x2d;
    }
    if ((uVar10 & 6) == 6) {
      sVar3 = sVar3 + 0x46;
    }
    else {
      if ((uVar10 & 6) != 0) {
        sVar3 = sVar3 + 0xf;
      }
      if ((uVar10 & 0x30) == 0x30) {
        sVar3 = sVar3 + 0x23;
      }
      else {
        if ((uVar10 & 0x30) != 0) {
          sVar3 = sVar3 + 10;
        }
        if ((uVar10 & 0x180) == 0x180) {
          sVar3 = sVar3 + 10;
        }
        else {
          sVar3 = sVar3 + -0x3c;
        }
      }
    }
    sVar8 = sVar3;
    if ((0x8c9 < *(ushort *)(unaff_ESI + 0x7a)) &&
       (sVar8 = sVar3 + -10, 0x1193 < *(ushort *)(unaff_ESI + 0x7a))) {
      sVar8 = sVar3 + -0x23;
    }
    if (*(ushort *)(unaff_ESI + 0x7a) < 0x2ef) {
      sVar8 = sVar8 + 10;
    }
    bVar6 = *(byte *)(unaff_ESI + 0x68);
    pbVar2 = (byte *)(unaff_ESI + 0x7c + (uint)(bVar6 >> 5) * 4 + ((int)(bVar6 & 0x1f) >> 3));
    uVar11 = bVar6 & 7;
    bVar6 = *pbVar2;
    *pbVar2 = *pbVar2 | '\x01' << uVar11;
    if ((bVar6 >> uVar11 & 1) != 0) {
      sVar8 = sVar8 + 10;
    }
    pcVar1 = (char *)(unaff_ESI + 0x2f);
    *pcVar1 = *pcVar1 + '\x01';
    if (*pcVar1 == '\0') {
      *(char *)(unaff_ESI + 0x2f) = *(char *)(unaff_ESI + 0x2f) + -1;
    }
    bVar6 = (&DAT_00887420)[iVar12];
    pbVar2 = (byte *)(unaff_ESI + 0x48 + (uint)(bVar6 >> 5) * 4 + ((int)(bVar6 & 0x1f) >> 3));
    uVar11 = bVar6 & 7;
    bVar6 = *pbVar2;
    *pbVar2 = *pbVar2 | '\x01' << uVar11;
    if ((bVar6 >> uVar11 & 1) != 0) {
      sVar8 = sVar8 + 10;
    }
    FUN_004413c5();
    sVar8 = (ushort)*(byte *)(unaff_ESI + 0x3b) + sVar8;
    if (0xff < sVar8) {
      sVar8 = 0xff;
    }
    if (sVar8 < 0) {
      sVar8 = 0;
    }
    *(char *)(unaff_ESI + 0x3b) = (char)sVar8;
    uVar7 = 0x100 - sVar8;
    if ((short)uVar7 < 0x40) {
      uVar7 = 0x40;
    }
    if (200 < (short)uVar7) {
      uVar7 = 200;
    }
    uVar11 = (uint)*(byte *)(unaff_ESI + 0x3e);
    if (uVar11 < 0x81) {
      uVar11 = 0x80;
    }
    sVar3 = (ushort)*(byte *)(unaff_ESI + 0x3d) +
            ((ushort)((short)(((uint)*(ushort *)(&DAT_00887514 + iVar12) * (uint)uVar7 >> 9) *
                              uVar11 >> 7) << 1) >> (*(byte *)(unaff_ESI + 0x44) & 3));
    if (sVar3 < 0) {
      sVar3 = 0;
    }
    if (0xff < sVar3) {
      sVar3 = 0xff;
    }
    *(char *)(unaff_ESI + 0x3d) = (char)sVar3;
  }
  else {
    *(undefined1 *)(unaff_ESI + 0x3a) = *(undefined1 *)(unaff_ESI + 0x3b);
    *(undefined1 *)(unaff_ESI + 0x3c) = *(undefined1 *)(unaff_ESI + 0x3d);
    *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 2;
    uVar5 = FUN_005df40c();
    if (((((((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar12] * 8) & 0x100000) != 0)
           && ((&DAT_00887510)[uVar11 * 0x130] != -1)) &&
          ((ushort)(&DAT_00887512)[uVar11 * 0x130] < 0x3e9)) &&
         (((0xb3 < *(byte *)(unaff_ESI + 0x3a) && (99 < *(byte *)(unaff_ESI + 0x38))) &&
          ((*(byte *)(unaff_ESI + 0x3c) < 0xa1 &&
           ((0x1d < *(byte *)(unaff_ESI + 0x3e) && (0x13 < *(byte *)(unaff_ESI + 0x3f))))))))) &&
        (*(byte *)(unaff_ESI + 0x40) < 0xab)) &&
       ((bVar6 = (byte)((uint)uVar5 >> 8), 0x80 < bVar6 ||
        ((*(byte *)(unaff_ESI + 0x2f) < 8 && (bVar6 < 0x41)))))) {
      *(undefined1 *)(unaff_ESI + 0xc5) = extraout_DL;
      *(undefined1 *)(unaff_ESI + 0xc6) = 200;
      uVar5 = FUN_00441891();
      FUN_005e5301();
    }
    if ((199 < *(byte *)(unaff_ESI + 0x3a)) && (*(byte *)(unaff_ESI + 0x43) <= (byte)uVar5)) {
      pbVar2 = (byte *)(unaff_ESI + 0x43);
      bVar6 = *pbVar2;
      *pbVar2 = *pbVar2 + 0x10;
      if (0xef < bVar6) {
        *(char *)(unaff_ESI + 0x43) = *(char *)(unaff_ESI + 0x43) + -0x10;
      }
    }
    if ((((0xd6 < *(byte *)(unaff_ESI + 0x3a)) && (*(byte *)(unaff_ESI + 0x3c) < 0x79)) &&
        ((&DAT_00887510)[uVar11 * 0x130] != -1)) &&
       ((ushort)(&DAT_00887512)[uVar11 * 0x130] < 0x3e9)) {
      FUN_00440fe3();
      uVar11 = FUN_005df40c();
      if ((uVar11 & 7) < 3) {
        FUN_00452fce(CONCAT22(extraout_var_00,*(undefined2 *)(unaff_ESI + 0x10)),
                     CONCAT22(extraout_var,*(undefined2 *)(unaff_ESI + 0xe)),unaff_EBX,
                     (uVar11 & 7) + 0x29);
      }
    }
    *(int *)(&DAT_00887520 + iVar12) = *(int *)(&DAT_00887520 + iVar12) + 1;
    (&DAT_0088751d)[iVar12] = (&DAT_0088751d)[iVar12] | 1;
  }
  return in_EAX;
}


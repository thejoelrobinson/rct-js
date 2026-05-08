
undefined4 FUN_00442290(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort uVar3;
  int iVar4;
  undefined4 uVar5;
  short extraout_CX;
  ushort uVar6;
  ushort uVar7;
  ushort in_DX;
  int iVar8;
  byte *pbVar9;
  ushort uVar10;
  uint uVar11;
  undefined6 uVar12;
  
  uVar12 = FUN_00423677();
  if ((ushort)((uint6)uVar12 >> 0x20) <= in_DX) {
    uVar6 = extraout_CX - 0xa0;
    DAT_006293d0 = 0;
    DAT_006293d2 = 0;
    DAT_006293d4 = 0;
    DAT_006293d6 = 0;
    iVar4 = 0;
    uVar7 = (short)uVar12 - 0xa0;
    do {
      do {
        uVar3 = uVar7;
        iVar8 = iVar4;
        if ((uVar3 < 0xfff) && (uVar6 < 0xfff)) {
          uVar7 = uVar6 << 7 | uVar6 >> 9 | uVar3;
          pbVar9 = (byte *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
          do {
            bVar2 = *pbVar9 & 0x3c;
            if (bVar2 == 0xc) {
              DAT_006293d0 = DAT_006293d0 + 1;
            }
            else if (bVar2 == 0x18) {
              DAT_006293d0 = DAT_006293d0 + 1;
            }
            else if (bVar2 == 8) {
              iVar4 = (uint)pbVar9[7] * 0x260;
              if ((&DAT_00887420)[iVar4] == '!') {
                if ((&DAT_0088752c)[iVar4] != -1) {
                  DAT_006293d4 = DAT_006293d4 | 1;
                }
              }
              else if (((&DAT_00887420)[iVar4] == '\x19') && ((&DAT_0088752c)[iVar4] != -1)) {
                DAT_006293d4 = DAT_006293d4 | 2;
              }
            }
            else if (bVar2 == 4) {
              bVar2 = pbVar9[5] & 0xf;
              if (bVar2 == 5) {
                DAT_006293d2 = DAT_006293d2 + 1;
              }
              else if (((((bVar2 == 8) || (bVar2 == 9)) || (bVar2 == 10)) ||
                       ((bVar2 == 0xb || (bVar2 == 0xc)))) || (bVar2 == 0xd)) {
                DAT_006293d6 = DAT_006293d6 + 1;
              }
            }
            pbVar1 = pbVar9 + 1;
            pbVar9 = pbVar9 + 8;
          } while ((*pbVar1 & 0x80) == 0);
        }
        bVar2 = (char)iVar8 + 1;
        iVar4 = CONCAT31((int3)((uint)iVar8 >> 8),bVar2);
        uVar7 = uVar3 + 0x20;
      } while (bVar2 < 0xb);
      uVar6 = uVar6 + 0x20;
      bVar2 = (char)((uint)iVar8 >> 8) + 1;
      iVar4 = (uint)bVar2 << 8;
      uVar10 = DAT_0087c39c;
      uVar7 = uVar3 - 0x140;
    } while (bVar2 < 0xb);
    while (uVar10 != 0xffff) {
      uVar11 = (uint)uVar10;
      uVar7 = (short)uVar12 - (&DAT_00743ba2)[uVar11 * 0x80];
      if ((short)uVar7 < 0) {
        uVar7 = -uVar7;
      }
      uVar6 = extraout_CX - (&DAT_00743ba4)[uVar11 * 0x80];
      if ((short)uVar6 < 0) {
        uVar6 = -uVar6;
      }
      if (uVar7 < uVar6) {
        uVar7 = uVar6;
      }
      if (uVar7 < 0xa1) {
        DAT_006293d6 = DAT_006293d6 + 1;
      }
      uVar10 = (&DAT_00743b98)[uVar11 * 0x80];
    }
    uVar5 = (int)uVar12;
    if ((4 < DAT_006293d2) && (DAT_006293d6 < 0x14)) {
      return uVar5;
    }
    if ((0x27 < DAT_006293d0) && (DAT_006293d6 < 8)) {
      return uVar5;
    }
    if ((DAT_006293d4 == 1) && (DAT_006293d6 < 0x14)) {
      return uVar5;
    }
    if (DAT_006293d6 < 2) {
      return uVar5;
    }
  }
  return (int)uVar12;
}


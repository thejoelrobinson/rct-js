
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004531f6(void)

{
  byte bVar1;
  undefined2 uVar2;
  undefined4 uVar3;
  undefined4 uVar4;
  bool bVar5;
  int iVar6;
  undefined2 *puVar7;
  undefined4 uVar8;
  short sVar9;
  short sVar10;
  short sVar11;
  uint uVar12;
  byte *pbVar13;
  ushort uVar14;
  ushort uVar15;
  int unaff_ESI;
  
  puVar7 = DAT_00632408;
  iVar6 = DAT_006323fc;
  uVar8 = _DAT_006326c4;
  if ((*(char *)(unaff_ESI + 0xbb) != -1) || (*(char *)(unaff_ESI + 0xbd) != -1)) {
    uVar3 = *(undefined4 *)(unaff_ESI + 0x16);
    uVar4 = *(undefined4 *)(unaff_ESI + 0x1a);
    sVar10 = (short)uVar3;
    if (sVar10 != -0x8000) {
      sVar9 = *(short *)(DAT_006323fc + 8);
      sVar11 = *(short *)(DAT_006323fc + 10);
      uVar15 = *(ushort *)(DAT_006323fc + 0xc) >> 2;
      uVar14 = *(ushort *)(DAT_006323fc + 0xc) >> 2;
      if (*(char *)(DAT_00632400 + 0x174) == '\0') {
        sVar9 = sVar9 - uVar15;
        sVar11 = sVar11 - uVar14;
      }
      DAT_006326c4 = (short)uVar4;
      _DAT_006326c0 = uVar3;
      uVar8 = uVar4;
      if ((sVar9 < DAT_006326c4) &&
         (DAT_006326c6 = (short)((uint)uVar4 >> 0x10), sVar11 < DAT_006326c6)) {
        sVar9 = sVar9 + *(short *)(DAT_006323fc + 0xc);
        sVar11 = sVar11 + *(short *)(DAT_006323fc + 0xe);
        if (*(char *)(DAT_00632400 + 0x174) == '\0') {
          sVar9 = sVar9 + uVar15 * 2;
          sVar11 = sVar11 + uVar14 * 2;
        }
        if ((sVar10 <= sVar9) &&
           (DAT_006326c2 = (short)((uint)uVar3 >> 0x10), bVar5 = DAT_006326c2 <= sVar11, bVar5)) {
          sVar10 = sVar10 + DAT_006326c4;
          uVar12 = (uint)DAT_00971ed6;
          if (uVar12 < 0x40) {
            uVar12 = 0x40;
          }
          _DAT_006326c4 = uVar4;
          DAT_00632408[1] =
               (short)((int)((uint)(ushort)(((short)((sVar10 >> 1) - *(short *)(DAT_006323fc + 8))
                                            >> (*(byte *)(DAT_006323fc + 0x10) & 0x1f)) +
                                           *(short *)(DAT_006323fc + 4)) << 0x10) / (int)uVar12 +
                       -0x8000 >> 4);
          uVar12 = (uint)DAT_00971ed8;
          if (uVar12 < 0x40) {
            uVar12 = 0x40;
          }
          puVar7[2] = (short)((int)((uint)(ushort)(((short)(((short)(DAT_006326c2 + DAT_006326c6) >>
                                                            1) - *(short *)(iVar6 + 10)) >>
                                                   (*(byte *)(iVar6 + 0x10) & 0x1f)) +
                                                  *(short *)(iVar6 + 6)) << 0x10) / (int)uVar12 +
                              -0x8000 >> 4);
          uVar12 = *(uint *)(unaff_ESI + 0x28);
          if (((&DAT_005f72ef)[(uint)*(byte *)(unaff_ESI + 0x31) * 4] & 1) != 0) {
            uVar12 = uVar12 << 1;
          }
          if ((int)uVar12 < 0) {
            uVar12 = -uVar12;
          }
          uVar2 = *(undefined2 *)(unaff_ESI + 10);
          puVar7[3] = (short)((uVar12 >> 5) * 0x1588 >> 0xe) + 0x2b11 +
                      *(char *)(unaff_ESI + 0xbf) * 0x10;
          *puVar7 = uVar2;
          *(undefined1 *)(puVar7 + 4) = 0;
          if (*(ushort *)(unaff_ESI + 0xe) != 0x8000) {
            uVar14 = *(ushort *)(unaff_ESI + 0x10) >> 9;
            pbVar13 = (byte *)(&DAT_00971ef4)
                              [(ushort)((ushort)((*(ushort *)(unaff_ESI + 0x10) & 0xffe0) << 7 |
                                                 uVar14 | *(ushort *)(unaff_ESI + 0xe) & 0xffe0) >>
                                        5 | uVar14 << 0xb)];
            bVar1 = *pbVar13;
            while ((bVar1 & 0x3c) != 0) {
              pbVar13 = pbVar13 + 8;
              bVar1 = *pbVar13;
            }
            if (*(ushort *)(unaff_ESI + 0x12) < (ushort)((ushort)pbVar13[2] * 4)) {
              *(undefined1 *)(puVar7 + 4) = 0x30;
            }
          }
          DAT_00632408 = DAT_00632408 + 5;
          return;
        }
      }
    }
  }
  _DAT_006326c4 = uVar8;
  return;
}


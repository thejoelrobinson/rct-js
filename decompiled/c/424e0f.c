
void FUN_00424e0f(void)

{
  byte *pbVar1;
  ushort uVar2;
  short sVar3;
  ushort uVar4;
  ushort extraout_CX;
  ushort extraout_CX_00;
  ushort extraout_CX_01;
  byte bVar5;
  ushort uVar6;
  byte bVar7;
  int iVar8;
  byte *pbVar9;
  char *pcVar10;
  byte *unaff_EDI;
  byte *pbVar11;
  bool bVar12;
  
code_r0x00424e0f:
  iVar8 = 10;
LAB_00424e14:
  uVar6 = ((((((ushort)((DAT_008d4228 >> 1 & 1) != 0) << 1 | (ushort)((DAT_008d4228 >> 3 & 1) != 0))
              << 1 | (ushort)((DAT_008d4228 >> 5 & 1) != 0)) << 1 |
            (ushort)((DAT_008d4228 >> 7 & 1) != 0)) << 1 | (ushort)((DAT_008d4228 >> 9 & 1) != 0))
           << 1 | (ushort)((DAT_008d4228 >> 0xb & 1) != 0)) << 1 |
          (ushort)((DAT_008d4228 >> 0xd & 1) != 0);
  uVar2 = (((((((ushort)((DAT_008d4228 & 1) != 0) << 1 | (ushort)((DAT_008d4228 >> 2 & 1) != 0)) <<
               1 | (ushort)((DAT_008d4228 >> 4 & 1) != 0)) << 1 |
             (ushort)((DAT_008d4228 >> 6 & 1) != 0)) << 1 | (ushort)((DAT_008d4228 >> 8 & 1) != 0))
            << 1 | (ushort)((DAT_008d4228 >> 10 & 1) != 0)) << 1 |
          (ushort)((DAT_008d4228 >> 0xc & 1) != 0)) << 5;
  uVar4 = uVar6 << 5;
  pbVar9 = (byte *)(&DAT_00971ef4)
                   [(ushort)((ushort)(uVar6 << 0xc | uVar2) >> 5 | (uVar4 >> 9) << 0xb)];
  do {
    if ((*pbVar9 & 0x3c) == 0) {
      pbVar11 = unaff_EDI;
      if ((pbVar9[5] & 0xe0) != 0) goto LAB_00424f60;
      bVar5 = (pbVar9[5] & 0x1f) << 2;
      bVar12 = bVar5 < pbVar9[2];
      if (!bVar12 && bVar5 != pbVar9[2]) goto LAB_00424f13;
      uVar2 = FUN_00425432();
      uVar4 = extraout_CX;
      if (bVar12) goto LAB_00424f08;
      bVar5 = pbVar9[2];
      bVar7 = bVar5 + 4;
      unaff_EDI = pbVar9;
      if ((pbVar9[4] & 0x10) != 0) {
        bVar7 = bVar5 + 8;
      }
      goto LAB_00424eeb;
    }
    pbVar11 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
  } while ((*pbVar11 & 0x80) == 0);
  goto LAB_00424fb3;
  while (((unaff_EDI = pbVar11 + 8, (*unaff_EDI & 0x3c) == 0x14 || (pbVar11[0xb] <= bVar5)) ||
         (bVar7 < pbVar11[10]))) {
LAB_00424eeb:
    pbVar11 = unaff_EDI;
    if ((pbVar11[1] & 0x80) != 0) {
      pbVar1 = pbVar9 + 6;
      bVar5 = *pbVar1;
      *pbVar1 = *pbVar1 + 0x10;
      if (bVar5 < 0xf0) goto LAB_00424f60;
      pbVar9[6] = pbVar9[6] ^ 8;
      if ((pbVar9[6] & 8) != 0) {
        bVar5 = FUN_005df40c();
        pbVar9[6] = pbVar9[6] | bVar5 & 0x70;
        uVar4 = extraout_CX_00;
        goto LAB_00424f60;
      }
      if ((pbVar9[6] & 7) == 6) goto LAB_00424f60;
      pbVar9[6] = (pbVar9[6] & 7) + 1;
      goto LAB_00424f47;
    }
  }
LAB_00424f08:
  pbVar11 = unaff_EDI;
  if ((pbVar9[6] & 7) != 1) {
LAB_00424f13:
    pbVar9[6] = 1;
LAB_00424f47:
    uVar2 = FUN_005e56d3(pbVar9,pbVar11);
    uVar4 = extraout_CX_01;
  }
LAB_00424f60:
  uVar2 = uVar4 << 7 | uVar4 >> 9 | uVar2;
  pbVar9 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
  do {
    if ((*pbVar9 & 0x3c) == 0xc) {
      FUN_005df1ff();
    }
    else if (((*pbVar9 & 0x3c) == 4) && ((pbVar9[5] & 0xf) == 5)) {
      FUN_0042e48a();
    }
    pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    unaff_EDI = pbVar11;
  } while ((*pbVar1 & 0x80) == 0);
LAB_00424fb3:
  DAT_008d4228 = DAT_008d4228 + 1;
  DAT_008d4228 = DAT_008d4228 & 0x3fff;
  iVar8 = iVar8 + -1;
  if (iVar8 == 0) goto code_r0x00424fca;
  goto LAB_00424e14;
code_r0x00424fca:
  sVar3 = FUN_004314ed();
  if (-sVar3 == DAT_0087d7a2) {
    if (((0x70 < DAT_008dbed2) && (DAT_008dbed2 < 0x80)) &&
       ((-sVar3 < -1 || (300000 < DAT_0087c3b4)))) {
      uVar4 = FUN_005df40c();
      if (uVar4 < 0x42) {
        pcVar10 = &DAT_00887420;
        do {
          if (*pcVar10 != -1) {
            FUN_00426f56();
            return;
          }
          pcVar10 = pcVar10 + 0x260;
        } while (pcVar10 < &DAT_008ad1c0);
      }
      return;
    }
    return;
  }
  goto code_r0x00424e0f;
}


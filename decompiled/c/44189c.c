
void FUN_0044189c(void)

{
  byte *pbVar1;
  uint uVar2;
  ushort in_AX;
  ushort in_CX;
  undefined2 in_DX;
  byte bVar3;
  byte bVar4;
  ushort uVar5;
  uint uVar6;
  uint unaff_EBP;
  ushort uVar7;
  ushort uVar8;
  byte *pbVar9;
  ushort unaff_DI;
  
code_r0x0044189c:
  in_AX = in_AX + (&DAT_00652478)[unaff_EBP * 2];
  in_CX = in_CX + (&DAT_0065247a)[unaff_EBP * 2];
  bVar3 = (char)((ushort)in_DX >> 8) + 1;
  if (200 < bVar3) {
    return;
  }
  uVar7 = DAT_006293bc - in_AX;
  if ((short)uVar7 < 0) {
    uVar7 = -uVar7;
  }
  uVar5 = DAT_006293be - in_CX;
  if ((short)uVar5 < 0) {
    uVar5 = -uVar5;
  }
  uVar8 = uVar7;
  if (uVar7 <= uVar5) {
    uVar8 = uVar5;
    uVar5 = uVar7;
  }
  bVar4 = DAT_006293c0 - (byte)in_DX;
  if ((char)bVar4 < '\0') {
    bVar4 = -bVar4;
  }
  uVar7 = uVar8 + (uVar5 >> 1) + (ushort)bVar4;
  if ((uVar7 <= unaff_DI) &&
     (((uVar7 < unaff_DI || (bVar3 < DAT_006293c1)) &&
      (unaff_DI = uVar7, DAT_006293c1 = bVar3, uVar7 == 0)))) {
    return;
  }
  uVar7 = in_CX * 0x80 | in_CX >> 9 | in_AX;
  pbVar9 = (byte *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
  do {
    if ((*pbVar9 & 0x3c) == 4) {
      if (((pbVar9[4] & 4) == 0) || ((pbVar9[4] & 3) == unaff_EBP)) {
        bVar4 = pbVar9[2];
      }
      else {
        if ((pbVar9[4] & 3 ^ 2) != unaff_EBP) goto LAB_00441933;
        bVar4 = pbVar9[2] + 4;
      }
      if (((byte)in_DX == bVar4) && (pbVar9[4] != 0 || DAT_006293c8 != '\0')) break;
    }
LAB_00441933:
    pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return;
    }
  } while( true );
  in_DX = CONCAT11(bVar3,pbVar9[2]);
  uVar6 = (uint)(pbVar9[6] & (&DAT_00630e58)[pbVar9[6]]) & ~(1 << ((unaff_EBP ^ 2) & 0x1f));
  unaff_EBP = 0;
  if (uVar6 != 0) {
    for (; (uVar6 >> unaff_EBP & 1) == 0; unaff_EBP = unaff_EBP + 1) {
    }
  }
  if (uVar6 == 0) {
    return;
  }
  uVar6 = uVar6 & ~(1 << (unaff_EBP & 0x1f));
  if (uVar6 != 0) {
    if (DAT_006293c4._2_2_ != 0) {
      DAT_006293c4._0_1_ = (char)DAT_006293c4 + -1;
    }
    DAT_006293c4._0_1_ = (char)DAT_006293c4 + -1;
    uVar2 = DAT_006293c4;
    if ((char)DAT_006293c4 < '\0') {
      return;
    }
    do {
      uVar6 = uVar6 & ~(1 << (unaff_EBP & 0x1f));
      DAT_006293c4 = uVar2 & 0xffff;
      FUN_0044189c(pbVar9,in_DX,uVar6,in_AX);
      DAT_006293c4 = uVar2;
      unaff_EBP = 0;
      if (uVar6 != 0) {
        for (; (uVar6 >> unaff_EBP & 1) == 0; unaff_EBP = unaff_EBP + 1) {
        }
      }
    } while (uVar6 != 0);
    return;
  }
  if (((pbVar9[4] & 4) != 0) && ((pbVar9[4] & 3) == unaff_EBP)) {
    in_DX = CONCAT11(bVar3,pbVar9[2] + 4);
  }
  DAT_006293c4._2_2_ = DAT_006293c4._2_2_ + 1;
  goto code_r0x0044189c;
}


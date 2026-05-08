
void FUN_004415e6(void)

{
  byte *pbVar1;
  uint uVar2;
  char cVar3;
  short sVar4;
  uint in_EAX;
  uint in_ECX;
  uint extraout_ECX;
  byte in_DL;
  byte extraout_DL;
  undefined1 uVar5;
  uint uVar6;
  ushort uVar7;
  int unaff_ESI;
  byte *pbVar8;
  undefined4 local_c;
  uint local_8;
  
  uVar5 = 0x10;
  if (*(char *)(unaff_ESI + 0x2e) != '\x01') {
    if ((*(ushort *)(unaff_ESI + 200) & 4) == 0) {
      if (((((*(ushort *)(unaff_ESI + 200) & 1) == 0) || (0x59 < *(byte *)(unaff_ESI + 0xc6))) &&
          (uVar5 = 0xe, (*(ushort *)(unaff_ESI + 0xca) & 4) == 0)) &&
         (uVar5 = 0xc, (*(ushort *)(unaff_ESI + 200) & 1) == 0)) {
        uVar5 = 8;
      }
    }
    else {
      uVar7 = FUN_005df40c();
      in_ECX = extraout_ECX;
      in_DL = extraout_DL;
      if (uVar7 < 0x1c72) {
        *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) & 0xfffb;
      }
    }
  }
  uVar6 = 0xf;
  if (((unaff_ESI != -1) &&
      (CONCAT11((char)(DAT_006293be >> 5),(char)(DAT_006293bc >> 5)) == *(short *)(unaff_ESI + 0xcc)
      )) && (DAT_006293c0 == *(char *)(unaff_ESI + 0xce))) {
    uVar6 = 0;
    do {
      if ((CONCAT11((char)(in_ECX >> 5),(char)(in_EAX >> 5)) ==
           *(short *)(unaff_ESI + 0xd0 + uVar6 * 4)) &&
         (in_DL == *(byte *)(unaff_ESI + 0xd2 + uVar6 * 4))) {
        uVar6 = *(ushort *)(unaff_ESI + 0xd3 + uVar6 * 4) & 0xf;
        goto LAB_004416c9;
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    uVar6 = 0xf;
  }
LAB_004416c9:
  uVar7 = (ushort)in_ECX << 7 | (ushort)in_ECX >> 9 | (ushort)in_EAX;
  pbVar8 = (byte *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
LAB_004416e1:
  DAT_006293c4._0_1_ = uVar5;
  if ((in_DL != pbVar8[2]) || ((*pbVar8 & 0x3c) != 4)) goto LAB_004416f0;
  uVar6 = (pbVar8[6] & (&DAT_00630e58)[pbVar8[6]]) & uVar6;
  if (uVar6 != 0) {
    local_8 = 0;
    if (uVar6 != 0) {
      for (; (uVar6 >> local_8 & 1) == 0; local_8 = local_8 + 1) {
      }
    }
    uVar6 = uVar6 & ~(1 << (local_8 & 0x1f));
    if (uVar6 != 0) {
      uVar6 = uVar6 | 1 << (local_8 & 0x1f);
      local_8 = 0xffffffff;
      local_c = 0xffff00ff;
      while( true ) {
        uVar2 = 0;
        if (uVar6 != 0) {
          for (; (uVar6 >> uVar2 & 1) == 0; uVar2 = uVar2 + 1) {
          }
        }
        if (uVar6 == 0) break;
        uVar6 = uVar6 & ~(1 << (uVar2 & 0x1f));
        DAT_006293c1 = 0xff;
        DAT_006293c4._2_2_ = 0;
        DAT_006293c4._1_1_ = 0;
        FUN_0044189c();
        if ((local_c._2_2_ == -1) && (DAT_006293c1 < (byte)local_c)) {
          local_c = CONCAT31(0xffff00,DAT_006293c1);
          local_8 = uVar2;
        }
      }
    }
    goto LAB_004417af;
  }
  goto LAB_004417aa;
LAB_004416f0:
  pbVar1 = pbVar8 + 1;
  pbVar8 = pbVar8 + 8;
  if ((*pbVar1 & 0x80) != 0) goto LAB_004417aa;
  goto LAB_004416e1;
LAB_004417aa:
  local_8 = 0xffffffff;
LAB_004417af:
  cVar3 = DAT_006293c0;
  if ((unaff_ESI != -1) && (local_8 != 0xffffffff)) {
    sVar4 = CONCAT11((char)(DAT_006293be >> 5),(char)(DAT_006293bc >> 5));
    if ((sVar4 != *(short *)(unaff_ESI + 0xcc)) || (DAT_006293c0 != *(char *)(unaff_ESI + 0xce))) {
      *(short *)(unaff_ESI + 0xcc) = sVar4;
      *(char *)(unaff_ESI + 0xce) = cVar3;
      *(undefined1 *)(unaff_ESI + 0xcf) = 0;
      *(undefined4 *)(unaff_ESI + 0xd0) = 0xffffffff;
      *(undefined4 *)(unaff_ESI + 0xd4) = 0xffffffff;
      *(undefined4 *)(unaff_ESI + 0xd8) = 0xffffffff;
      *(undefined4 *)(unaff_ESI + 0xdc) = 0xffffffff;
    }
    uVar6 = 0;
    sVar4 = CONCAT11((char)(in_ECX >> 5),(char)(in_EAX >> 5));
    do {
      if ((sVar4 == *(short *)(unaff_ESI + 0xd0 + uVar6 * 4)) &&
         (in_DL == *(byte *)(unaff_ESI + 0xd2 + uVar6 * 4))) goto LAB_00441885;
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    uVar6 = (uint)*(byte *)(unaff_ESI + 0xcf);
    *(char *)(unaff_ESI + 0xcf) = *(char *)(unaff_ESI + 0xcf) + '\x01';
    *(byte *)(unaff_ESI + 0xcf) = *(byte *)(unaff_ESI + 0xcf) & 3;
    *(short *)(unaff_ESI + 0xd0 + uVar6 * 4) = sVar4;
    *(byte *)(unaff_ESI + 0xd2 + uVar6 * 4) = in_DL;
    *(undefined1 *)(unaff_ESI + 0xd3 + uVar6 * 4) = 0xf;
LAB_00441885:
    pbVar8 = (byte *)(unaff_ESI + 0xd3 + uVar6 * 4 + ((int)(short)(ushort)local_8 >> 3));
    *pbVar8 = *pbVar8 & ~('\x01' << ((ushort)local_8 & 7));
  }
  return;
}


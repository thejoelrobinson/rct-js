
undefined8 FUN_005d37d4(void)

{
  byte *pbVar1;
  short sVar2;
  byte bVar3;
  byte bVar4;
  short sVar5;
  ushort uVar6;
  short sVar7;
  undefined4 in_EAX;
  ushort uVar8;
  ushort uVar9;
  short sVar10;
  ushort uVar11;
  byte *pbVar12;
  uint in_EDX;
  uint uVar13;
  uint uVar14;
  short *psVar15;
  ushort *puVar16;
  ushort *puVar17;
  uint uVar18;
  byte *pbVar19;
  char *pcVar20;
  
  DAT_00652308 = (byte)in_EDX;
  uVar18 = in_EDX & 0xff;
  pbVar19 = &DAT_00887420 + uVar18 * 0x260;
  if (*pbVar19 != 0x14) {
    uVar13 = 0;
    do {
      uVar8 = (&DAT_0088744a)[uVar18 * 0x130 + uVar13];
      if (uVar8 != 0xffff) {
        uVar6 = (uVar8 & 0xff) << 5;
        uVar8 = (uVar8 >> 8) << 5;
        bVar3 = pbVar19[uVar13 + 0x32];
        while( true ) {
          uVar9 = uVar8 << 7 | uVar8 >> 9 | uVar6;
          pbVar12 = (byte *)(&DAT_00971ef4)[(ushort)(uVar9 >> 5 | uVar9 << 0xb)];
          while ((((bVar3 != pbVar12[2] || (bVar4 = *pbVar12, (bVar4 & 0x3c) != 8)) ||
                  (pbVar12[7] != DAT_00652308)) ||
                 (((pbVar12[5] & 0xf) != 0 ||
                  (((&DAT_006559d8)[(uint)pbVar12[4] * 0x10] & 0x10) == 0))))) {
            pbVar1 = pbVar12 + 1;
            pbVar12 = pbVar12 + 8;
            if ((*pbVar1 & 0x80) != 0) goto LAB_005d396a;
          }
          uVar9 = CONCAT11(pbVar12[5],(char)uVar13 << 4) & 0x8fff;
          pbVar12[5] = (byte)uVar9 | (byte)(uVar9 >> 8);
          if ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar19 * 8) & 8) != 0) break;
          uVar14 = bVar4 & 3;
          uVar6 = uVar6 - (&DAT_00652478)[uVar14 * 2];
          uVar8 = uVar8 - (&DAT_0065247a)[uVar14 * 2];
        }
        pcVar20 = (&PTR_DAT_00652498)[pbVar12[4]];
        while (pcVar20[10] != -1) {
          sVar2 = *(short *)(pcVar20 + 0xb);
          sVar5 = *(short *)(pcVar20 + 0xd);
          sVar7 = sVar2;
          sVar10 = sVar5;
          switch(bVar4 & 3) {
          case 1:
            sVar10 = -sVar2;
            sVar7 = sVar5;
            break;
          case 2:
            sVar10 = -sVar5;
            sVar7 = -sVar2;
            break;
          case 3:
            sVar7 = -sVar5;
            sVar10 = sVar2;
          }
          uVar9 = (sVar10 + uVar8) * 0x80 | (ushort)(sVar10 + uVar8) >> 9 | sVar7 + uVar6;
          pbVar12 = (byte *)(&DAT_00971ef4)[(ushort)(uVar9 >> 5 | uVar9 << 0xb)];
          while ((((byte)((char)(*(short *)(pcVar20 + 0xf) >> 2) + bVar3) != pbVar12[2] ||
                  ((*pbVar12 & 0x3c) != 8)) ||
                 (((&DAT_006559d8)[(uint)pbVar12[4] * 0x10] & 0x10) == 0))) {
            pbVar1 = pbVar12 + 1;
            pbVar12 = pbVar12 + 8;
            if ((*pbVar1 & 0x80) != 0) goto LAB_005d396a;
          }
          uVar9 = CONCAT11(pbVar12[5],(char)uVar13 << 4) & 0x8fff;
          pbVar12[5] = (byte)uVar9 | (byte)(uVar9 >> 8);
          pcVar20 = pcVar20 + 10;
        }
      }
LAB_005d396a:
      uVar13 = uVar13 + 1;
    } while (uVar13 < 4);
  }
  uVar13 = 0;
  psVar15 = &DAT_006522f6;
  do {
    LOCK();
    sVar2 = (&DAT_00887462)[uVar18 * 0x130 + uVar13];
    (&DAT_00887462)[uVar18 * 0x130 + uVar13] = -1;
    UNLOCK();
    if (sVar2 != -1) {
      *psVar15 = sVar2;
      psVar15 = psVar15 + 1;
    }
    LOCK();
    sVar2 = (&DAT_0088746a)[uVar18 * 0x130 + uVar13];
    (&DAT_0088746a)[uVar18 * 0x130 + uVar13] = -1;
    UNLOCK();
    if (sVar2 != -1) {
      *psVar15 = sVar2;
      psVar15 = psVar15 + 1;
    }
    uVar13 = uVar13 + 1;
  } while (uVar13 < 4);
  *psVar15 = -1;
  puVar16 = &DAT_006522f6;
  do {
    uVar8 = *puVar16;
    puVar17 = puVar16;
    if (uVar8 == 0xffff) {
      return CONCAT44(in_EDX,in_EAX);
    }
    while (puVar17 = puVar17 + 1, *puVar17 != 0xffff) {
      if (uVar8 == *puVar17) goto LAB_005d3b25;
    }
    uVar6 = (uVar8 & 0xff) * 0x20;
    uVar9 = (uVar8 >> 8) * 0x20;
    pbVar19 = (byte *)(&DAT_00971ef4)
                      [(ushort)((ushort)((uVar8 >> 8) << 0xc | uVar6) >> 5 | (uVar9 >> 9) << 0xb)];
    do {
      if ((((*pbVar19 & 0x3c) == 0x10) && (DAT_00652308 == pbVar19[7])) && (pbVar19[4] < 2)) {
        uVar13 = *pbVar19 & 3;
        uVar11 = uVar9 + (&DAT_0065247a)[uVar13 * 2];
        uVar11 = uVar11 * 0x80 | uVar11 >> 9 | uVar6 + (&DAT_00652478)[uVar13 * 2];
        pbVar12 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
        do {
          if ((((*pbVar12 & 0x3c) == 8) && (DAT_00652308 == pbVar12[7])) &&
             ((pbVar19[2] == pbVar12[2] &&
              (((byte)(&DAT_006559d8)[(uint)pbVar12[4] << 4 | pbVar12[5] & 0xf] >>
                ((byte)(((char)uVar13 - *pbVar12) + 2) & 3) & 1) != 0)))) {
            uVar13 = 0;
            if (pbVar12[4] != 0x65) {
              uVar13 = (uint)(pbVar12[5] >> 4);
            }
            uVar13 = uVar13 & 7;
            if (pbVar19[4] == 0) {
              if ((&DAT_00887462)[uVar18 * 0x130 + uVar13] != -1) break;
              (&DAT_00887462)[uVar18 * 0x130 + uVar13] = uVar8;
            }
            else {
              if ((&DAT_0088746a)[uVar18 * 0x130 + uVar13] != -1) break;
              (&DAT_0088746a)[uVar18 * 0x130 + uVar13] = uVar8;
            }
            uVar11 = CONCAT11(pbVar19[5],(char)uVar13) & 0x8fff;
            pbVar19[5] = (char)uVar11 << 4 | (byte)(uVar11 >> 8);
            goto LAB_005d3b16;
          }
          pbVar1 = pbVar12 + 1;
          pbVar12 = pbVar12 + 8;
        } while ((*pbVar1 & 0x80) == 0);
        FUN_00448bb1();
        FUN_0042693f();
        FUN_00448331();
        FUN_00448bbc();
        FUN_005e5562();
        FUN_00436795();
      }
      else {
LAB_005d3b16:
        pbVar19 = pbVar19 + 8;
      }
    } while ((pbVar19[-7] & 0x80) == 0);
LAB_005d3b25:
    puVar16 = puVar16 + 1;
  } while( true );
}


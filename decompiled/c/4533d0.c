
void FUN_004533d0(void)

{
  uint uVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 extraout_ECX_01;
  undefined4 extraout_ECX_02;
  uint3 uVar6;
  undefined2 uVar8;
  undefined3 uVar7;
  int iVar5;
  ushort uVar9;
  char cVar11;
  int iVar10;
  uint uVar12;
  ushort uVar13;
  undefined *puVar14;
  ushort *puVar16;
  int iVar17;
  undefined1 *puVar18;
  ushort *puVar19;
  undefined *puVar15;
  
  if (((DAT_006323f4 != -1) && (DAT_006326bc == '\0')) && ((DAT_006326bd & 1) != 0)) {
    DAT_006323fc = -1;
    puVar15 = DAT_009a1164;
    do {
      puVar14 = puVar15 + -0x178;
      if (puVar14 < &DAT_009a013c) goto LAB_00453459;
      iVar17 = *(int *)(puVar15 + -0x170);
      puVar15 = puVar14;
    } while ((iVar17 == 0) || ((*(ushort *)(iVar17 + 0x12) & 0x800) == 0));
    DAT_006323fc = iVar17;
    if (iVar17 != -1) {
      DAT_00632404 = 0;
      DAT_00632400 = puVar14;
      if ((*(char *)(iVar17 + 0x10) != '\0') &&
         (DAT_00632404 = 0x23, *(char *)(iVar17 + 0x10) != '\x01')) {
        DAT_00632404 = 0x46;
      }
LAB_00453459:
      DAT_00632408 = &DAT_0063240c;
      for (uVar9 = DAT_0087c396; uVar13 = DAT_0087c396, uVar9 != 0xffff;
          uVar9 = (&DAT_00743b98)[(uint)uVar9 * 0x80]) {
        if ((*(short *)(&DAT_00743bd2 + (uint)uVar9 * 0x100) != -1) &&
           (FUN_004531f6(), in_ECX = extraout_ECX, (ushort *)0x632447 < DAT_00632408))
        goto LAB_004534d1;
      }
      while ((uVar13 != 0xffff &&
             ((*(short *)(&DAT_00743bd2 + (uint)uVar13 * 0x100) != -1 ||
              (FUN_004531f6(), in_ECX = extraout_ECX_00, DAT_00632408 < &DAT_00632448))))) {
        uVar13 = (&DAT_00743b98)[(uint)uVar13 * 0x80];
      }
LAB_004534d1:
      puVar19 = &DAT_00632448;
      do {
        if (*puVar19 != 0xffff) {
          for (puVar16 = &DAT_0063240c; puVar16 < DAT_00632408; puVar16 = puVar16 + 5) {
            if (*puVar19 == *puVar16) goto LAB_00453525;
          }
          if (puVar19[0xc] != 0xffff) {
            FUN_00407a41(puVar19 + 2);
            in_ECX = extraout_ECX_01;
          }
          if (puVar19[0x1a] != 0xffff) {
            FUN_00407a41(puVar19 + 0x10);
            in_ECX = extraout_ECX_02;
          }
          *puVar19 = 0xffff;
        }
LAB_00453525:
        puVar19 = puVar19 + 0x1e;
      } while (puVar19 < &DAT_006325b0);
      puVar19 = &DAT_0063240c;
LAB_00453535:
      for (; puVar19 < DAT_00632408; puVar19 = puVar19 + 5) {
        uVar9 = puVar19[2];
        iVar17 = CONCAT22((short)((uint)in_ECX >> 0x10),0xffff);
        if ((short)uVar9 < 0) {
          uVar9 = -uVar9;
        }
        if (0xfff < uVar9) {
          uVar9 = 0xfff;
        }
        if (0x800 < uVar9) {
          uVar6 = (uint3)((uint)iVar17 >> 8);
          iVar17 = CONCAT31(uVar6,(char)((short)-(uVar9 - 0xc00) >> 2));
          cVar11 = (char)((short)-(uVar9 - 0xc00) >> 10);
          if ((cVar11 != '\0') && (iVar17 = CONCAT31(uVar6,0xff), cVar11 < '\0')) {
            iVar17 = (uint)uVar6 << 8;
          }
        }
        uVar9 = puVar19[1];
        iVar10 = (int)(short)uVar9;
        if ((short)uVar9 < 0) {
          uVar9 = -uVar9;
        }
        if (0xfff < uVar9) {
          uVar9 = 0xfff;
        }
        if (0x800 < uVar9) {
          uVar8 = (undefined2)((uint)iVar17 >> 0x10);
          bVar3 = (byte)iVar17;
          iVar17 = CONCAT22(uVar8,CONCAT11((char)((short)-(uVar9 - 0xc00) >> 2),bVar3));
          bVar2 = (byte)((short)-(uVar9 - 0xc00) >> 10);
          if ((bVar2 != 0) &&
             (iVar17 = CONCAT22(uVar8,CONCAT11(0xff,bVar3)), (short)((ushort)bVar2 << 8) < 0)) {
            iVar17 = CONCAT22(uVar8,(ushort)bVar3);
          }
        }
        bVar2 = (byte)((uint)iVar17 >> 8);
        if (bVar2 <= (byte)iVar17) {
          iVar17 = CONCAT31((int3)((uint)iVar17 >> 8),bVar2);
        }
        uVar7 = (undefined3)((uint)iVar17 >> 8);
        bVar2 = (byte)iVar17 - DAT_00632404;
        if ((byte)iVar17 < DAT_00632404) {
          bVar2 = 0;
        }
        in_ECX = CONCAT31(uVar7,bVar2);
        uVar9 = *puVar19;
        uVar12 = (uint)puVar19[3];
        puVar16 = &DAT_00632448;
        do {
          if (uVar9 == *puVar16) goto LAB_00453617;
          puVar16 = puVar16 + 0x1e;
        } while (puVar16 < &DAT_006325b0);
        puVar16 = &DAT_00632448;
        bVar3 = 0;
        while (*puVar16 != 0xffff) {
          puVar16 = puVar16 + 0x1e;
          bVar3 = bVar3 + 1;
          if (DAT_005f8d5d <= bVar3) goto code_r0x004535f9;
        }
        *puVar16 = uVar9;
        puVar16[0xc] = 0xffff;
        puVar16[0x1a] = 0xffff;
        *(undefined1 *)(puVar16 + 1) = 0x30;
LAB_00453617:
        bVar3 = (byte)puVar16[1];
        if (bVar3 != (byte)puVar19[4]) {
          if (bVar3 < (byte)puVar19[4]) {
            bVar3 = bVar3 + 4;
          }
          else {
            bVar3 = bVar3 - 4;
          }
        }
        *(byte *)(puVar16 + 1) = bVar3;
        bVar4 = bVar2 - bVar3;
        if (bVar2 < bVar3) {
          bVar4 = 0;
        }
        in_ECX = CONCAT31(uVar7,bVar4);
        iVar17 = (uint)uVar9 * 0x100;
        puVar18 = &DAT_00743b94 + iVar17;
        uVar9 = ((ushort)((ushort)(byte)(&DAT_00743c50)[iVar17] * (ushort)bVar4) >> 3) + 0xe001;
        if ((short)uVar9 < -10000) {
          uVar9 = 0xd8f0;
        }
        iVar5 = (int)(short)uVar9;
        bVar2 = (&DAT_00743c4f)[iVar17];
        uVar1 = (uint)bVar2;
        if (bVar2 == 0xff) {
          if (puVar16[0xc] != 0xffff) {
            puVar16[0xc] = 0xffff;
            FUN_00407a41(puVar16 + 2);
          }
        }
        else {
          if (puVar16[0xc] != 0xffff) {
            if ((ushort)bVar2 == puVar16[0xc]) {
              if (uVar9 != puVar16[0xd]) {
                puVar16[0xd] = uVar9;
                FUN_00407e33(puVar16 + 2,iVar5);
              }
              if (((ushort)iVar10 != puVar16[0xe]) &&
                 (puVar16[0xe] = (ushort)iVar10, DAT_005f8d59 != '\0')) {
                FUN_00407dd4(puVar16 + 2,iVar10);
              }
              if ((ushort)uVar12 != puVar16[0xf]) {
                puVar16[0xf] = (ushort)uVar12;
                FUN_00407d75(puVar16 + 2,uVar12);
              }
              goto LAB_0045377a;
            }
            FUN_00407a41(puVar16 + 2);
          }
          puVar16[0xc] = (ushort)uVar1;
          FUN_004077b3(uVar1,puVar16 + 2,1,1);
          puVar16[0xe] = (ushort)iVar10;
          puVar16[0xd] = (ushort)iVar5;
          puVar16[0xf] = (ushort)uVar12;
          iVar17 = iVar10;
          if (DAT_005f8d59 == '\0') {
            iVar17 = 0;
          }
          FUN_00407c42(puVar16 + 2,(&DAT_0063268c)[uVar1],iVar5,iVar17,uVar12);
        }
LAB_0045377a:
        uVar9 = ((ushort)((ushort)(byte)puVar18[0xbe] * (ushort)(byte)in_ECX) >> 3) + 0xe001;
        if ((short)uVar9 < -10000) {
          uVar9 = 0xd8f0;
        }
        iVar17 = (int)(short)uVar9;
        bVar2 = puVar18[0xbd];
        uVar1 = (uint)bVar2;
        if (bVar2 == 0xff) {
          if (puVar16[0x1a] != 0xffff) {
            puVar16[0x1a] = 0xffff;
            FUN_00407a41(puVar16 + 0x10,puVar18,puVar16,iVar10,uVar12,in_ECX);
          }
        }
        else {
          if (puVar16[0x1a] != 0xffff) {
            if ((ushort)bVar2 == puVar16[0x1a]) {
              if (uVar9 != puVar16[0x1b]) {
                puVar16[0x1b] = uVar9;
                FUN_00407e33(puVar16 + 0x10,iVar17,puVar18,puVar16,iVar10,uVar12);
              }
              if (((ushort)iVar10 != puVar16[0x1c]) &&
                 (puVar16[0x1c] = (ushort)iVar10, DAT_005f8d59 != '\0')) {
                FUN_00407dd4(puVar16 + 0x10,iVar10,puVar18,puVar16,iVar10,uVar12);
              }
              goto LAB_00453891;
            }
            FUN_00407a41(puVar16 + 0x10,puVar18);
          }
          puVar16[0x1a] = (ushort)uVar1;
          FUN_004077b3(uVar1,puVar16 + 0x10,1,1,puVar18);
          puVar16[0x1c] = (ushort)iVar10;
          puVar16[0x1b] = (ushort)iVar17;
          puVar16[0x1d] = (ushort)uVar12;
          iVar5 = iVar10;
          if (DAT_005f8d59 == '\0') {
            iVar5 = 0;
          }
          FUN_00407c42(puVar16 + 0x10,(&DAT_0063268c)[uVar1],iVar17,iVar5,0,puVar18,puVar16,iVar10,
                       uVar12);
        }
LAB_00453891:
      }
    }
  }
  return;
code_r0x004535f9:
  puVar19 = puVar19 + 5;
  goto LAB_00453535;
}


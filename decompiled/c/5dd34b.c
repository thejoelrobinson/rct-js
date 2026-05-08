
uint FUN_005dd34b(void)

{
  byte bVar1;
  short sVar2;
  short sVar3;
  byte *pbVar4;
  ushort uVar5;
  ushort uVar6;
  uint in_EAX;
  int iVar7;
  uint uVar8;
  ushort extraout_CX;
  uint extraout_ECX;
  uint uVar9;
  int iVar10;
  byte extraout_DL;
  undefined4 extraout_EDX;
  undefined4 uVar11;
  uint uVar12;
  uint uVar13;
  uint unaff_EBX;
  int iVar14;
  uint uVar15;
  byte *pbVar16;
  byte *unaff_ESI;
  byte *pbVar17;
  undefined1 *puVar18;
  byte *unaff_EDI;
  bool bVar19;
  byte bVar20;
  short local_24;
  
  bVar20 = unaff_ESI[0x78];
  bVar1 = unaff_ESI[0x79];
  uVar15 = (uint)(ushort)((ushort)bVar20 * (ushort)bVar1);
  uVar5 = FUN_00444d07();
  if ((ushort)((ushort)bVar20 * (ushort)bVar1) <= uVar5) {
    if ((unaff_EBX & 1) != 0) {
      uVar5 = extraout_CX;
      if (unaff_ESI[4] == 8) {
        uVar6 = (short)in_EAX - (&DAT_00652478)[(*unaff_EDI & 3) * 2];
        in_EAX = (uint)uVar6;
        uVar5 = extraout_CX - (&DAT_0065247a)[(*unaff_EDI & 3) * 2];
        pbVar16 = unaff_EDI + 2;
        uVar6 = uVar5 * 0x80 | uVar5 >> 9 | uVar6;
        for (unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar6 >> 5 | uVar6 << 0xb)];
            (*pbVar16 != unaff_EDI[2] || ((*unaff_EDI & 0x3c) != 8)); unaff_EDI = unaff_EDI + 8) {
        }
      }
      DAT_0065dc4e = 0xffff;
      iVar14 = 0;
      do {
        FUN_005ddbe1(uVar15);
        uVar12 = extraout_ECX & 0xffffff00;
        uVar11 = extraout_EDX;
        pbVar16 = (byte *)0xffffffff;
        pbVar17 = unaff_ESI;
        do {
          uVar9 = uVar12;
          unaff_ESI = pbVar17;
          iVar7 = FUN_00444bd4(iVar14,pbVar17,uVar11);
          *pbVar17 = 0;
          pbVar17[0x30] = extraout_DL;
          if (pbVar16 == (byte *)0xffffffff) {
            iVar7 = FUN_00444c74();
            iVar10 = -1;
            do {
              iVar10 = iVar10 + 1;
            } while (*(short *)(unaff_ESI + iVar10 * 2 + 0x5e) != -1);
            *(undefined2 *)(unaff_ESI + iVar10 * 2 + 0x5e) = *(undefined2 *)(pbVar17 + 10);
          }
          pbVar17[0x31] = (byte)iVar7;
          pbVar17[1] = 0;
          if (pbVar16 != (byte *)0xffffffff) {
            pbVar17[1] = 1;
          }
          uVar12 = *(uint *)(&DAT_005f6f1c + iVar7 * 8);
          uVar13 = uVar12 >> 10;
          *(short *)(pbVar17 + 0x44) = (short)uVar13;
          uVar12 = (uVar13 << 10 | uVar12 & 0x3ff) >> 1;
          iVar14 = iVar14 - uVar12;
          *(int *)(pbVar17 + 0x24) = iVar14;
          if ((*(ushort *)(&DAT_005f7104 + iVar7 * 8) & 0x4000) == 0) {
            iVar14 = iVar14 - uVar12;
          }
          pbVar17[0x14] = (&DAT_005f7106)[iVar7 * 8];
          pbVar17[9] = (&DAT_005f7107)[iVar7 * 8];
          pbVar17[0x15] = (&DAT_005f7108)[iVar7 * 8];
          *(undefined2 *)(pbVar17 + 0x46) = *(undefined2 *)(&DAT_005f6f20 + iVar7 * 8);
          pbVar17[0xb2] = (&DAT_005f6f23)[iVar7 * 8];
          pbVar17[0xc2] = (&DAT_005f7109)[iVar7 * 8];
          pbVar17[0xc3] = (&DAT_005f710a)[iVar7 * 8];
          pbVar17[0x28] = 0;
          pbVar17[0x29] = 0;
          pbVar17[0x2a] = 0;
          pbVar17[0x2b] = 0;
          pbVar17[0x2c] = 0;
          pbVar17[0x2d] = 0;
          pbVar17[0x2e] = 0;
          pbVar17[0x2f] = 0;
          pbVar17[0x4a] = 0;
          pbVar17[0x4c] = 0;
          pbVar17[0x4d] = 0;
          pbVar17[0x4e] = 0;
          pbVar17[0x4f] = 0;
          pbVar17[0xb5] = 0;
          pbVar17[0xba] = 0;
          pbVar17[0xb6] = 0;
          pbVar17[0xb7] = 0;
          pbVar17[0xb8] = 0;
          pbVar17[0xb9] = 0;
          pbVar17[0xbb] = 0xff;
          pbVar17[0xbd] = 0xff;
          pbVar17[0x3e] = 0xff;
          pbVar17[0x3f] = 0xff;
          pbVar17[0xc4] = 0;
          pbVar17[0xc5] = 0;
          pbVar17[200] = 0;
          pbVar17[0xc9] = 0;
          pbVar17[0xca] = 0;
          pbVar17[0xcb] = 0;
          pbVar17[0xcc] = 0xff;
          pbVar17[0x1f] = 0;
          pbVar17[0x20] = 0;
          pbVar17[0x52] = 0xff;
          pbVar17[0x53] = 0xff;
          pbVar17[0x54] = 0xff;
          pbVar17[0x55] = 0xff;
          pbVar17[0x56] = 0xff;
          pbVar17[0x57] = 0xff;
          pbVar17[0x58] = 0xff;
          pbVar17[0x59] = 0xff;
          pbVar17[0x5a] = 0xff;
          pbVar17[0x5b] = 0xff;
          pbVar17[0x5c] = 0xff;
          pbVar17[0x5d] = 0xff;
          pbVar17[0x5e] = 0xff;
          pbVar17[0x5f] = 0xff;
          pbVar17[0x60] = 0xff;
          pbVar17[0x61] = 0xff;
          pbVar17[0x62] = 0xff;
          pbVar17[99] = 0xff;
          pbVar17[100] = 0xff;
          pbVar17[0x65] = 0xff;
          pbVar17[0x66] = 0xff;
          pbVar17[0x67] = 0xff;
          pbVar17[0x68] = 0xff;
          pbVar17[0x69] = 0xff;
          pbVar17[0x6a] = 0xff;
          pbVar17[0x6b] = 0xff;
          pbVar17[0x6c] = 0xff;
          pbVar17[0x6d] = 0xff;
          pbVar17[0x6e] = 0xff;
          pbVar17[0x6f] = 0xff;
          pbVar17[0x70] = 0xff;
          pbVar17[0x71] = 0xff;
          pbVar17[0x72] = 0xff;
          pbVar17[0x73] = 0xff;
          pbVar17[0x74] = 0xff;
          pbVar17[0x75] = 0xff;
          pbVar17[0x76] = 0xff;
          pbVar17[0x77] = 0xff;
          pbVar17[0x78] = 0xff;
          pbVar17[0x79] = 0xff;
          pbVar17[0x7a] = 0xff;
          pbVar17[0x7b] = 0xff;
          pbVar17[0x7c] = 0xff;
          pbVar17[0x7d] = 0xff;
          pbVar17[0x7e] = 0xff;
          pbVar17[0x7f] = 0xff;
          pbVar17[0x80] = 0xff;
          pbVar17[0x81] = 0xff;
          pbVar17[0x82] = 0xff;
          pbVar17[0x83] = 0xff;
          pbVar17[0x84] = 0xff;
          pbVar17[0x85] = 0xff;
          pbVar17[0x86] = 0xff;
          pbVar17[0x87] = 0xff;
          pbVar17[0x88] = 0xff;
          pbVar17[0x89] = 0xff;
          pbVar17[0x8a] = 0xff;
          pbVar17[0x8b] = 0xff;
          pbVar17[0x8c] = 0xff;
          pbVar17[0x8d] = 0xff;
          pbVar17[0x8e] = 0xff;
          pbVar17[0x8f] = 0xff;
          pbVar17[0x90] = 0xff;
          pbVar17[0x91] = 0xff;
          local_24 = (short)in_EAX;
          if ((*(ushort *)(&DAT_005f7104 + iVar7 * 8) & 0x8000) == 0) {
            bVar20 = (*(ushort *)(&DAT_005f7104 + iVar7 * 8) & 0x1000) != 0;
            if (((*(ushort *)(&DAT_005f7104 + iVar7 * 8) & 0x4000) != 0) &&
               (bVar20 = 5, (uVar9 & 0x100) == 0)) {
              bVar20 = 6;
            }
            pbVar17[0xcd] = bVar20;
            *(short *)(pbVar17 + 0x38) = local_24;
            *(ushort *)(pbVar17 + 0x3a) = uVar5;
            pbVar17[0x1e] = (*unaff_EDI & 3) << 3;
            *(ushort *)(pbVar17 + 0x3c) = (ushort)unaff_EDI[2] << 2;
            pbVar17[0x4b] = (unaff_EDI[5] & 0x70) >> 4;
            FUN_00444927();
            *(short *)(pbVar17 + 0x36) =
                 (short)CONCAT31((int3)(((uint)unaff_EDI[4] << 2) >> 8),
                                 (byte)((uint)unaff_EDI[4] << 2) | pbVar17[0x1e] >> 3);
            pbVar17[0x34] = 0x1f;
            pbVar17[0x35] = 0;
            pbVar17[0x48] = 2;
            pbVar17[0x49] = 0;
            pbVar17[0x50] = 0;
            pbVar17[0x51] = 0;
          }
          else {
            pbVar17[0xcd] = 0;
            sVar2 = *(short *)(&DAT_0065ea84 + (*unaff_EDI & 3) * 4);
            sVar3 = *(short *)(&DAT_0065ea86 + (*unaff_EDI & 3) * 4);
            uVar12 = (uint)(ushort)(uVar5 + sVar3);
            *(short *)(pbVar17 + 0x38) = local_24 + sVar2;
            *(ushort *)(pbVar17 + 0x3a) = uVar5 + sVar3;
            bVar20 = unaff_EDI[2];
            *(ushort *)(pbVar17 + 0x3c) = (ushort)bVar20 * 4;
            pbVar17[0x4b] = (unaff_EDI[5] & 0x70) >> 4;
            uVar13 = (uint)(ushort)((ushort)bVar20 * 4 +
                                   (short)(char)(&DAT_005f5d02)[(uint)*unaff_ESI * 8]);
            *(ushort *)(pbVar17 + 0x36) = (ushort)unaff_EDI[4] << 2;
            pbVar17[0x34] = 0;
            pbVar17[0x35] = 0;
            pbVar17[0x50] = 0;
            pbVar17[0x51] = 0;
            pbVar17[0x48] = 0;
            pbVar17[0x49] = 0;
            do {
              uVar8 = FUN_005df40c(uVar13,uVar12);
              pbVar17[0x1e] = (byte)(uVar8 & 0xffffff1e);
              bVar19 = CARRY2((ushort)((uVar8 & 0xffffff1e) >> 0x15) & 0xff,local_24 + sVar2);
              FUN_005dcfee();
            } while (bVar19);
            FUN_00444927();
          }
          pbVar17[0xb3] = 0;
          pbVar17[0xb4] = 0;
          if (DAT_0065dc4e != 0xffff) {
            *(undefined2 *)(&DAT_00743bd6 + (uint)DAT_0065dc4e * 0x100) =
                 *(undefined2 *)(pbVar17 + 10);
          }
          LOCK();
          UNLOCK();
          if (DAT_0065dc4e == 0xffff) {
            DAT_0065dc3c = pbVar17;
          }
          uVar6 = *(ushort *)(pbVar17 + 10);
          *(ushort *)(pbVar17 + 0x40) = DAT_0065dc4e;
          DAT_0065dc4e = uVar6;
          if (pbVar16 != (byte *)0xffffffff) {
            *(undefined2 *)(pbVar16 + 0x3e) = *(undefined2 *)(pbVar17 + 10);
          }
          uVar6 = DAT_0065dc4e;
          pbVar4 = DAT_0065dc3c;
          bVar20 = (char)uVar9 + 1;
          uVar12 = CONCAT31((int3)(uVar9 >> 8),bVar20);
          pbVar16 = pbVar17;
          pbVar17 = unaff_ESI;
        } while (bVar20 < unaff_ESI[0x79]);
      } while ((char)(uVar9 >> 8) != '\x01');
      *(ushort *)(DAT_0065dc3c + 0x40) = DAT_0065dc4e;
      *(undefined2 *)(&DAT_00743bd6 + (uint)uVar6 * 0x100) = *(undefined2 *)(pbVar4 + 10);
      *(ushort *)(unaff_ESI + 2) = *(ushort *)(unaff_ESI + 2) | 1;
      uVar15 = 0;
      do {
        unaff_ESI[uVar15 + 0x3a] = unaff_ESI[uVar15 + 0x3a] & 0x80 | 1;
        uVar15 = uVar15 + 1;
      } while (uVar15 < 4);
      if (((*(uint *)(&DAT_005f5b78 + (uint)*unaff_ESI * 8) & 0x10000) == 0) && (*unaff_ESI != 0x29)
         ) {
        uVar15 = (uint)CONCAT11(unaff_ESI[0x78],bVar20);
        iVar14 = 0;
        do {
          puVar18 = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + iVar14 * 2 + 0x5e) * 0x100;
          if ((*(ushort *)
                (&DAT_005f7104 +
                (uint)(byte)(&DAT_00743bc5)
                            [(uint)*(ushort *)(unaff_ESI + iVar14 * 2 + 0x5e) * 0x100] * 8) & 0x8000
              ) == 0) {
            FUN_005dbeeb();
          }
          while( true ) {
            *(ushort *)(puVar18 + 0x48) = *(ushort *)(puVar18 + 0x48) & 0xfffd;
            if (*(ushort *)(puVar18 + 0x3e) == 0xffff) break;
            puVar18 = &DAT_00743b94 + (uint)*(ushort *)(puVar18 + 0x3e) * 0x100;
          }
          iVar14 = iVar14 + 1;
          bVar20 = (char)(uVar15 >> 8) - 1;
          uVar15 = (uint)bVar20 << 8;
        } while (bVar20 != 0);
      }
      in_EAX = FUN_005dd8dd();
    }
    return in_EAX;
  }
  DAT_00991efc = 0x3dc;
  return in_EAX;
}


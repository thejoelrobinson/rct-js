
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_005dbeeb(void)

{
  ushort *puVar1;
  undefined1 *puVar2;
  short sVar3;
  ushort uVar4;
  short sVar5;
  int iVar6;
  undefined4 uVar7;
  ushort extraout_var;
  uint uVar9;
  byte bVar10;
  ushort uVar11;
  ushort extraout_CX;
  ushort extraout_CX_00;
  ushort extraout_CX_01;
  ushort extraout_var_00;
  ushort extraout_var_01;
  char cVar13;
  short sVar14;
  undefined4 extraout_EDX;
  undefined4 extraout_EDX_00;
  undefined4 extraout_EDX_01;
  undefined4 extraout_EDX_02;
  int iVar15;
  int iVar16;
  undefined1 *unaff_EBP;
  undefined2 uVar17;
  undefined1 *unaff_ESI;
  undefined1 *puVar18;
  uint uVar19;
  byte *pbVar20;
  short *psVar21;
  bool bVar22;
  undefined8 uVar23;
  undefined4 uVar8;
  undefined *puVar12;
  
  bVar10 = unaff_ESI[0x31];
  DAT_0065dc40 = 0;
  DAT_0065dc2c = unaff_ESI;
  if (((*(ushort *)(&DAT_005f7104 + (uint)bVar10 * 8) & 0x800) != 0) &&
     ((*(ushort *)(unaff_ESI + 0x36) >> 2 < 0x44 || (0x56 < *(ushort *)(unaff_ESI + 0x36) >> 2)))) {
    sVar3 = FUN_005d9220();
    if (*(int *)(&DAT_0065dc70 + (uint)(byte)unaff_ESI[0x1f] * 4) < 0) {
      if (-0x23 < sVar3) goto LAB_005dbf4d;
    }
    else if (-0x46 < sVar3) goto LAB_005dbf4d;
    if (unaff_ESI[0x1f] != '\b') {
      DAT_0065dc40 = DAT_0065dc40 | 0x40;
    }
  }
LAB_005dbf4d:
  if ((*(ushort *)(&DAT_005f7104 + (uint)bVar10 * 8) & 0x1000) != 0) {
    unaff_EBP = (undefined1 *)((uint)(byte)unaff_ESI[0x30] * 0x260);
    iVar6 = (uint)(byte)(&DAT_008874a0)[(int)unaff_EBP] << 0x10;
    if (DAT_0065e6b7 == '\0') {
      iVar6 = 0;
    }
    *(int *)(unaff_ESI + 0x28) = iVar6;
    *(undefined4 *)(unaff_ESI + 0x2c) = 0;
  }
  DAT_0065dc30 = *(int *)(unaff_ESI + 0x2c) + *(int *)(unaff_ESI + 0x28);
  if ((*(ushort *)(unaff_ESI + 0x48) & 0x80) != 0) {
    DAT_0065dc30 = 0;
  }
  if ((*(ushort *)(unaff_ESI + 0x48) & 0x400) != 0) {
    unaff_ESI[0xd2] = unaff_ESI[0xd2] + -1;
    if (unaff_ESI[0xd2] == -0x46) {
      *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xfbff;
    }
    if (-1 < (char)unaff_ESI[0xd2]) {
      DAT_0065dc30 = 0;
      *(undefined4 *)(unaff_ESI + 0x2c) = 0;
    }
  }
  *(int *)(unaff_ESI + 0x28) = DAT_0065dc30;
  DAT_0065dc34 = (DAT_0065dc30 >> 10) * 0x2a;
  DAT_0065dc28 = unaff_ESI;
  if (DAT_0065dc30 < 0) {
    for (; DAT_0065dc28 = unaff_ESI, *(ushort *)(unaff_ESI + 0x3e) != 0xffff;
        unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x3e) * 0x100) {
    }
  }
LAB_005dbffb:
  uVar19 = (uint)(byte)unaff_ESI[0x31];
  if ((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 2) != 0) {
    FUN_005d870c();
  }
  if ((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 4) != 0) {
    FUN_005d8623();
  }
  if ((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 0x180) != 0) {
    FUN_005d849e();
  }
  uVar19 = (uint)(byte)unaff_ESI[0x1f];
  DAT_0065dc38 = 1;
  *(undefined4 *)(unaff_ESI + 0x2c) = *(undefined4 *)(&DAT_0065dc70 + uVar19 * 4);
  iVar6 = DAT_0065dc34 + *(int *)(unaff_ESI + 0x24);
  *(int *)(unaff_ESI + 0x24) = iVar6;
  if (iVar6 < 0) {
    *(ushort *)(unaff_ESI + 0xb8) = *(ushort *)(unaff_ESI + 0xb8) & 0xfffd;
    _DAT_0065dc48 = *(undefined4 *)(unaff_ESI + 0xe);
    DAT_0065dc4c = *(short *)(unaff_ESI + 0x12);
    FUN_005e53ca();
    goto LAB_005dc62d;
  }
  if (0x3689 < iVar6) {
    *(ushort *)(unaff_ESI + 0xb8) = *(ushort *)(unaff_ESI + 0xb8) & 0xfffd;
    _DAT_0065dc48 = *(undefined4 *)(unaff_ESI + 0xe);
    DAT_0065dc4c = *(short *)(unaff_ESI + 0x12);
    uVar23 = FUN_005e53ca();
    do {
      uVar7 = (undefined4)((ulonglong)uVar23 >> 0x20);
      iVar6 = (int)uVar23;
      uVar11 = *(ushort *)(unaff_ESI + 0x36) >> 2;
      if (((uVar11 == 99) &&
          (((iVar6 = (uint)(byte)unaff_ESI[0x30] * 0x260,
            ((&DAT_00887422)[(uint)(byte)unaff_ESI[0x30] * 0x130] & 0x80) == 0 ||
            ((&DAT_0088755c)[iVar6] != '\x06')) || ((&DAT_0088755d)[iVar6] == '\x04')))) &&
         (iVar6 = (uint)(byte)unaff_ESI[0xcf] * 0x10000, iVar6 < DAT_0065dc30)) {
        iVar6 = DAT_0065dc30 * -0x10;
        *(int *)(unaff_ESI + 0x2c) = iVar6;
      }
      if (((uVar11 == 0) &&
          (iVar6 = (uint)(byte)unaff_ESI[0x30] * 0x260, (&DAT_00887420)[iVar6] == '*')) ||
         ((uVar11 == 100 && (iVar6 = (uint)(byte)unaff_ESI[0xcf] * 0x10000, DAT_0065dc30 < iVar6))))
      {
        iVar6 = (uint)(byte)(&DAT_005f5b7f)
                            [(uint)(byte)(&DAT_00887420)[(uint)(byte)unaff_ESI[0x30] * 0x260] * 8]
                << 0x10;
        *(int *)(unaff_ESI + 0x2c) = iVar6;
      }
      if (((uVar11 == 0x84) && (unaff_ESI[1] == '\0')) &&
         (((*(ushort *)(unaff_ESI + 0x48) & 0x400) == 0 && (7 < *(ushort *)(unaff_ESI + 0x34))))) {
        iVar6 = DAT_0065dc30 * -0x10;
        *(int *)(unaff_ESI + 0x2c) = iVar6;
        if (0x17 < *(ushort *)(unaff_ESI + 0x34)) {
          *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 0x400;
          unaff_ESI[0xd2] = 0x5a;
        }
      }
      uVar9 = CONCAT22((short)((uint)iVar6 >> 0x10),*(short *)(unaff_ESI + 0x34) + 1U);
      puVar12 = (&PTR_PTR_0067af10)[(byte)unaff_ESI[0xcd]];
      pbVar20 = *(byte **)(puVar12 + (uint)*(ushort *)(unaff_ESI + 0x36) * 4);
      if ((ushort)(*(short *)(unaff_ESI + 0x34) + 1U) < *(ushort *)(pbVar20 + -2)) {
LAB_005dc3b6:
        *(short *)(unaff_ESI + 0x34) = (short)uVar9;
        if ((((unaff_ESI[0x31] == ',') || (unaff_ESI[0x31] == '-')) &&
            (uVar8 = CONCAT22((short)(uVar19 >> 0x10),*(ushort *)(unaff_ESI + 0x36) >> 2),
            *(ushort *)(unaff_ESI + 0x36) >> 2 == 0xf)) && ((short)uVar9 == 0xc)) {
          FUN_00452fce(uVar7,puVar12,uVar8,uVar9,pbVar20,unaff_ESI,unaff_EBP,&stack0x00000000,uVar8,
                       uVar7,puVar12);
        }
        if (((unaff_ESI[1] == '\0') && (*(ushort *)(unaff_ESI + 0x36) >> 2 == 0x75)) &&
           ((short)uVar9 == 0x30)) {
          FUN_00452fce(uVar7,puVar12,0x75,uVar9,pbVar20,unaff_ESI,unaff_EBP,&stack0x00000000,0x75,
                       uVar7,puVar12,uVar9);
        }
        psVar21 = (short *)((uint)*(ushort *)(unaff_ESI + 0x34) * 10 +
                           *(int *)((&PTR_PTR_0067af10)[(byte)unaff_ESI[0xcd]] +
                                   (uint)*(ushort *)(unaff_ESI + 0x36) * 4));
        sVar3 = psVar21[1];
        sVar5 = *psVar21 + *(short *)(unaff_ESI + 0x38);
        uVar8 = CONCAT22((short)(uVar9 >> 0x10),sVar5);
        sVar14 = psVar21[2] + *(short *)(unaff_ESI + 0x3c) +
                 (short)(char)(&DAT_005f5d02)
                              [(uint)(byte)(&DAT_00887420)[(uint)(byte)unaff_ESI[0x30] * 0x260] * 8]
        ;
        uVar7 = CONCAT22((short)((uint)uVar7 >> 0x10),sVar14);
        uVar19 = (uint)(sVar5 != DAT_0065dc48);
        if ((short)(sVar3 + *(short *)(unaff_ESI + 0x3a)) != DAT_0065dc4a) {
          uVar19 = uVar19 | 2;
        }
        if (sVar14 != DAT_0065dc4c) {
          uVar19 = uVar19 | 4;
        }
        *(int *)(unaff_ESI + 0x24) = *(int *)(unaff_ESI + 0x24) - *(int *)(uVar19 * 4 + 0x65dc50);
        _DAT_0065dc48 = CONCAT22(sVar3 + *(short *)(unaff_ESI + 0x3a),sVar5);
        DAT_0065dc4c = sVar14;
        unaff_ESI[0x1e] = (char)psVar21[3];
        unaff_ESI[0x20] = (char)psVar21[4];
        bVar10 = *(byte *)((int)psVar21 + 7);
        uVar19 = (uint)bVar10;
        unaff_ESI[0x1f] = bVar10;
        unaff_EBP = (undefined1 *)(uint)(byte)unaff_ESI[0x31];
        if (((*(ushort *)(&DAT_005f7104 + (int)unaff_EBP * 8) & 0x200) != 0) && (bVar10 != 0)) {
          unaff_ESI[0x4a] = 0;
          *(undefined2 *)(unaff_ESI + 0x4c) = 0;
          *(undefined2 *)(unaff_ESI + 0x4e) = 0;
        }
        uVar23 = CONCAT44(uVar7,uVar8);
        if ((unaff_ESI == DAT_0065dc28) &&
           (bVar22 = false, uVar23 = CONCAT44(uVar7,uVar8), -1 < DAT_0065dc30)) {
          unaff_EBP = (undefined1 *)(uint)*(ushort *)(unaff_ESI + 0x40);
          uVar23 = FUN_005dcd40();
          if (bVar22) {
            DAT_0065dc34 = DAT_0065dc34 - (*(int *)(unaff_ESI + 0x24) + 1);
            *(int *)(unaff_ESI + 0x24) =
                 *(int *)(unaff_ESI + 0x24) - (*(int *)(unaff_ESI + 0x24) + 1);
            while( true ) {
              iVar6 = (int)unaff_EBP * 0x100;
              unaff_EBP = &DAT_00743b94 + iVar6;
              if ((&DAT_00743b95)[iVar6] == '\0') break;
              unaff_EBP = (undefined1 *)(uint)*(ushort *)(&DAT_00743bd4 + iVar6);
            }
            uVar9 = *(int *)(unaff_ESI + 0x28) - *(int *)(&DAT_00743bbc + iVar6);
            if ((int)uVar9 < 0) {
              uVar9 = -uVar9;
            }
            if ((0xe0000 < uVar9) &&
               ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x40) == 0)) {
              DAT_0065dc40 = DAT_0065dc40 | 0x80;
            }
            if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x4000) == 0) {
              iVar16 = *(int *)(unaff_ESI + 0x28);
              *(int *)(unaff_ESI + 0x28) = *(int *)(&DAT_00743bbc + iVar6) >> 1;
              *(int *)(&DAT_00743bbc + iVar6) = iVar16 >> 1;
              DAT_0065dc40 = DAT_0065dc40 | 2;
            }
            else {
              *(int *)(unaff_ESI + 0x28) =
                   *(int *)(unaff_ESI + 0x28) - (*(int *)(unaff_ESI + 0x28) >> 2);
              DAT_0065dc40 = DAT_0065dc40 | 2;
            }
            goto LAB_005dc98a;
          }
        }
      }
      else {
        uVar11 = *(ushort *)(unaff_ESI + 0x3a) << 7 | *(ushort *)(unaff_ESI + 0x3a) >> 9 |
                 *(ushort *)(unaff_ESI + 0x38);
        pbVar20 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
        uVar11 = *(ushort *)(unaff_ESI + 0x36) >> 2;
        uVar19 = CONCAT31((int3)(uVar19 >> 8),(&DAT_006545b4)[(uint)uVar11 * 8]);
        DAT_0065e6b9 = CONCAT11((&DAT_006545b4)[(uint)uVar11 * 8],(&DAT_006545b2)[(uint)uVar11 * 8])
        ;
        for (; (((uVar19 = CONCAT31((int3)(uVar19 >> 8),*pbVar20) & 0xffffff3c, (char)uVar19 != '\b'
                 || ((byte)(*(ushort *)(unaff_ESI + 0x3c) >> 2) != pbVar20[2])) ||
                ((pbVar20[5] & 0xf) != 0)) || ((byte)uVar11 != pbVar20[4])); pbVar20 = pbVar20 + 8)
        {
        }
        bVar22 = true;
        if ((byte)unaff_ESI[0xcd] < 2) {
LAB_005dc259:
          uVar23 = FUN_005cfac7();
          if ((!bVar22) &&
             (uVar11 = extraout_CX,
             CONCAT11((&DAT_006545b5)[(uint)pbVar20[4] * 8],(&DAT_006545b3)[(uint)pbVar20[4] * 8])
             == DAT_0065e6b9)) {
LAB_005dc28d:
            uVar7 = (undefined4)uVar23;
            *(short *)(unaff_ESI + 0x38) = (short)uVar23;
            *(ushort *)(unaff_ESI + 0x3a) = uVar11;
            *(short *)(unaff_ESI + 0x3c) = (short)((ulonglong)uVar23 >> 0x20);
            unaff_EBP = (undefined1 *)(uint)(byte)unaff_ESI[0x31];
            if ((((*(ushort *)(&DAT_005f7104 + (int)unaff_EBP * 8) & 0x4000) != 0) &&
                ((byte)unaff_ESI[0xcd] < 7)) &&
               ((pbVar20[4] == 0 ||
                ((unaff_EBP = (undefined1 *)((uint)(byte)unaff_ESI[0x30] * 0x260),
                 ((&DAT_00887422)[(uint)(byte)unaff_ESI[0x30] * 0x130] & 0x10) != 0 &&
                 (((pbVar20[4] == 3 || (pbVar20[4] == 2)) || (pbVar20[4] == 1)))))))) {
              uVar17 = (undefined2)((uint)unaff_EBP >> 0x10);
              unaff_EBP = (undefined1 *)CONCAT22(uVar17,0x8000);
              puVar1 = (ushort *)(unaff_ESI + 0x48);
              uVar11 = *puVar1;
              *puVar1 = *puVar1 & 0xffbf;
              if ((uVar11 >> 6 & 1) == 0) {
                unaff_EBP = (undefined1 *)CONCAT22(uVar17,0xa3d);
              }
              uVar4 = FUN_005df40c();
              uVar23 = CONCAT44(extraout_EDX,uVar7);
              uVar11 = extraout_CX_00;
              if (uVar4 <= (ushort)unaff_EBP) {
                unaff_ESI[0xcd] = unaff_ESI[0xcd] + '\x02';
                uVar23 = CONCAT44(extraout_EDX,uVar7);
              }
            }
            if ((unaff_ESI[0xcd] != '\0') && ((byte)unaff_ESI[0xcd] < 5)) {
              sVar3 = CONCAT11((char)(uVar11 >> 5),(char)((ushort)uVar23 >> 5));
              uVar7 = CONCAT22((short)((ulonglong)uVar23 >> 0x10),sVar3);
              uVar11 = (ushort)((ulonglong)uVar23 >> 0x20) >> 2;
              uVar8 = CONCAT22((short)((ulonglong)uVar23 >> 0x30),uVar11);
              unaff_EBP = (undefined1 *)((uint)(byte)unaff_ESI[0x30] * 0x260);
              cVar13 = (char)uVar11;
              if ((sVar3 == *(short *)(&DAT_0088750c + (int)unaff_EBP)) &&
                 (cVar13 == (&DAT_0088750f)[(int)unaff_EBP])) {
                unaff_ESI[0xcd] = 3;
                uVar23 = CONCAT44(uVar8,uVar7);
              }
              else {
                uVar23 = CONCAT44(uVar8,uVar7);
                if ((sVar3 == *(short *)(&DAT_0088750a + (int)unaff_EBP)) &&
                   (uVar23 = CONCAT44(uVar8,uVar7), cVar13 == (&DAT_0088750e)[(int)unaff_EBP])) {
                  unaff_ESI[0xcd] = 4;
                  uVar23 = CONCAT44(uVar8,uVar7);
                }
              }
            }
            uVar7 = (undefined4)((ulonglong)uVar23 >> 0x20);
            *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xfffe;
            if ((*pbVar20 & 0x80) != 0) {
              *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 1;
            }
            uVar19 = uVar19 & 0xffffff03;
            uVar9 = CONCAT31((int3)(CONCAT22((short)((ulonglong)uVar23 >> 0x10),
                                             (ushort)pbVar20[4] << 2) >> 8),
                             (byte)((ushort)pbVar20[4] << 2) | (byte)uVar19);
            *(short *)(unaff_ESI + 0x36) = (short)uVar9;
            bVar10 = (pbVar20[5] >> 4) << 1;
            puVar12 = (undefined *)(uint)bVar10;
            unaff_ESI[0xcf] = bVar10;
            if (pbVar20[4] == 0x72) {
              pbVar20[5] = pbVar20[5] & 0xf;
              pbVar20[5] = pbVar20[5] | 0x30;
              FUN_004364c2(uVar7,puVar12);
            }
            uVar9 = uVar9 & 0xffff0000;
            goto LAB_005dc3b6;
          }
        }
        else {
          if (unaff_ESI[0xcd] == '\a') {
            unaff_ESI[0xcd] = 6;
            bVar22 = false;
            goto LAB_005dc259;
          }
          if (unaff_ESI[0xcd] == '\b') {
            unaff_ESI[0xcd] = 5;
            bVar22 = false;
            goto LAB_005dc259;
          }
          bVar10 = unaff_ESI[0xcd];
          bVar22 = bVar10 < 4;
          if (4 < bVar10) goto LAB_005dc259;
          if (bVar10 == 4) {
            unaff_ESI[0xcd] = 1;
            goto LAB_005dc259;
          }
          unaff_ESI[0xcd] = 2;
          uVar23 = FUN_005cfc50();
          if (!bVar22) {
            uVar19 = CONCAT31((int3)(uVar19 >> 8),(char)(uVar19 >> 8));
            uVar23 = CONCAT44((int)((ulonglong)uVar23 >> 0x20),(uint)uVar23 >> 0x10);
            uVar11 = extraout_var_00;
            goto LAB_005dc28d;
          }
        }
        DAT_0065dc40 = DAT_0065dc40 | 0x20;
        DAT_0065dc34 = DAT_0065dc34 - (*(int *)(unaff_ESI + 0x24) + 1);
        *(int *)(unaff_ESI + 0x24) = *(int *)(unaff_ESI + 0x24) - (*(int *)(unaff_ESI + 0x24) + 1);
        uVar19 = (uint)(byte)unaff_ESI[0x1f];
LAB_005dc98a:
        do {
          do {
            if (-1 < *(int *)(unaff_ESI + 0x24)) goto LAB_005dca55;
            uVar19 = *(uint *)(&DAT_0065dc70 + uVar19 * 4);
            *(uint *)(unaff_ESI + 0x2c) = *(int *)(unaff_ESI + 0x2c) + uVar19;
            DAT_0065dc38 = DAT_0065dc38 + 1;
LAB_005dc62d:
            if (((*(ushort *)(unaff_ESI + 0x36) >> 2 == 0) &&
                ((&DAT_00887420)[(uint)(byte)unaff_ESI[0x30] * 0x260] == '*')) &&
               (DAT_0065dc30 < -0x7ffff)) {
              *(int *)(unaff_ESI + 0x2c) = DAT_0065dc30 * -2;
            }
            if ((*(ushort *)(unaff_ESI + 0x36) >> 2 == 99) &&
               (-DAT_0065dc30 != (uint)(byte)unaff_ESI[0xcf] * 0x10000 &&
                DAT_0065dc30 <= (int)((uint)(byte)unaff_ESI[0xcf] * -0x10000))) {
              *(int *)(unaff_ESI + 0x2c) = DAT_0065dc30 * -0x10;
            }
            sVar3 = *(short *)(unaff_ESI + 0x34) + -1;
            if (sVar3 == -1) {
              uVar11 = *(ushort *)(unaff_ESI + 0x3a) << 7 | *(ushort *)(unaff_ESI + 0x3a) >> 9 |
                       *(ushort *)(unaff_ESI + 0x38);
              pbVar20 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
              uVar11 = *(ushort *)(unaff_ESI + 0x36) >> 2;
              uVar19 = CONCAT31((int3)(uVar19 >> 8),(&DAT_006545b5)[(uint)uVar11 * 8]);
              DAT_0065e6b9 = CONCAT11((&DAT_006545b5)[(uint)uVar11 * 8],
                                      (&DAT_006545b3)[(uint)uVar11 * 8]);
              for (; ((uVar19 = CONCAT31((int3)(uVar19 >> 8),*pbVar20) & 0xffffff3c,
                      (char)uVar19 != '\b' ||
                      ((byte)(*(ushort *)(unaff_ESI + 0x3c) >> 2) != pbVar20[2])) ||
                     (((pbVar20[5] & 0xf) != 0 || ((byte)uVar11 != pbVar20[4]))));
                  pbVar20 = pbVar20 + 8) {
              }
              bVar22 = true;
              if ((byte)unaff_ESI[0xcd] < 2) {
LAB_005dc76d:
                FUN_005cfc50();
                uVar7 = extraout_EDX_01;
                if ((!bVar22) &&
                   (uVar11 = extraout_var, uVar4 = extraout_var_01,
                   CONCAT11((&DAT_006545b4)[(uint)pbVar20[4] * 8],
                            (&DAT_006545b2)[(uint)pbVar20[4] * 8]) == DAT_0065e6b9)) {
LAB_005dc7a7:
                  *(ushort *)(unaff_ESI + 0x38) = uVar11;
                  *(ushort *)(unaff_ESI + 0x3a) = uVar4;
                  *(ushort *)(unaff_ESI + 0x3c) = (ushort)uVar7;
                  if ((unaff_ESI[0xcd] != '\0') && ((byte)unaff_ESI[0xcd] < 5)) {
                    sVar3 = CONCAT11((char)(uVar4 >> 5),(char)(uVar11 >> 5));
                    iVar6 = (uint)(byte)unaff_ESI[0x30] * 0x260;
                    cVar13 = (char)((ushort)uVar7 >> 2);
                    if ((sVar3 == *(short *)(&DAT_0088750c + iVar6)) &&
                       (cVar13 == (&DAT_0088750f)[iVar6])) {
                      unaff_ESI[0xcd] = 3;
                    }
                    else if ((sVar3 == *(short *)(&DAT_0088750a + iVar6)) &&
                            (cVar13 == (&DAT_0088750e)[iVar6])) {
                      unaff_ESI[0xcd] = 4;
                    }
                  }
                  if ((*pbVar20 & 0x80) == 0) {
                    puVar1 = (ushort *)(unaff_ESI + 0x48);
                    uVar11 = *puVar1;
                    *puVar1 = *puVar1 & 0xfffe;
                    if ((((uVar11 & 1) != 0) && (*(short *)(unaff_ESI + 0x3e) == -1)) &&
                       (DAT_0065dc30 < 0)) {
                      DAT_0065dc40 = DAT_0065dc40 | 0x100;
                    }
                  }
                  else {
                    if (((DAT_0065dc30 < 0) && (*(short *)(unaff_ESI + 0x3e) == -1)) &&
                       ((*(ushort *)(&DAT_00652309 + (uint)pbVar20[4] * 2) & 0x20) == 0)) {
                      DAT_0065dc40 = DAT_0065dc40 | 0x200;
                    }
                    *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 1;
                  }
                  iVar6 = CONCAT31((int3)(((uint)pbVar20[4] << 2) >> 8),
                                   (byte)((uint)pbVar20[4] << 2) | (byte)(uVar19 >> 8) & 3);
                  *(short *)(unaff_ESI + 0x36) = (short)iVar6;
                  unaff_ESI[0xcf] = (pbVar20[5] >> 4) << 1;
                  sVar3 = *(short *)(*(int *)((&PTR_PTR_0067af10)[(byte)unaff_ESI[0xcd]] + iVar6 * 4
                                             ) + -2) + -1;
                  goto LAB_005dc89e;
                }
              }
              else {
                if (unaff_ESI[0xcd] == '\a') {
                  unaff_ESI[0xcd] = 5;
                  bVar22 = false;
                  goto LAB_005dc76d;
                }
                if (unaff_ESI[0xcd] == '\b') {
                  unaff_ESI[0xcd] = 6;
                  bVar22 = false;
                  goto LAB_005dc76d;
                }
                bVar22 = (byte)unaff_ESI[0xcd] < 5;
                if (!bVar22) goto LAB_005dc76d;
                bVar22 = (byte)unaff_ESI[0xcd] < 3;
                if (unaff_ESI[0xcd] == 3) {
                  unaff_ESI[0xcd] = 1;
                  bVar22 = false;
                  goto LAB_005dc76d;
                }
                unaff_ESI[0xcd] = 2;
                uVar11 = FUN_005cfac7();
                uVar7 = extraout_EDX_00;
                uVar4 = extraout_CX_01;
                if (!bVar22) goto LAB_005dc7a7;
              }
              DAT_0065dc40 = DAT_0065dc40 | 0x20;
              iVar6 = *(int *)(unaff_ESI + 0x24) + -0x368a;
              uVar23 = CONCAT44(uVar7,iVar6);
              DAT_0065dc34 = DAT_0065dc34 - iVar6;
              *(int *)(unaff_ESI + 0x24) = *(int *)(unaff_ESI + 0x24) - iVar6;
              uVar19 = (uint)(byte)unaff_ESI[0x1f];
              goto LAB_005dc538;
            }
LAB_005dc89e:
            *(short *)(unaff_ESI + 0x34) = sVar3;
            psVar21 = (short *)((uint)*(ushort *)(unaff_ESI + 0x34) * 10 +
                               *(int *)((&PTR_PTR_0067af10)[(byte)unaff_ESI[0xcd]] +
                                       (uint)*(ushort *)(unaff_ESI + 0x36) * 4));
            sVar3 = *psVar21;
            sVar5 = psVar21[1];
            sVar14 = psVar21[2] + *(short *)(unaff_ESI + 0x3c) +
                     (short)(char)(&DAT_005f5d02)
                                  [(uint)(byte)(&DAT_00887420)[(uint)(byte)unaff_ESI[0x30] * 0x260]
                                   * 8];
            uVar19 = (uint)((short)(sVar3 + *(short *)(unaff_ESI + 0x38)) != DAT_0065dc48);
            if ((short)(sVar5 + *(short *)(unaff_ESI + 0x3a)) != DAT_0065dc4a) {
              uVar19 = uVar19 | 2;
            }
            if (sVar14 != DAT_0065dc4c) {
              uVar19 = uVar19 | 4;
            }
            *(int *)(unaff_ESI + 0x24) =
                 *(int *)(unaff_ESI + 0x24) + *(int *)(uVar19 * 4 + 0x65dc50);
            _DAT_0065dc48 =
                 CONCAT22(sVar5 + *(short *)(unaff_ESI + 0x3a),sVar3 + *(short *)(unaff_ESI + 0x38))
            ;
            DAT_0065dc4c = sVar14;
            unaff_ESI[0x1e] = (char)psVar21[3];
            unaff_ESI[0x20] = (char)psVar21[4];
            bVar10 = *(byte *)((int)psVar21 + 7);
            uVar19 = (uint)bVar10;
            unaff_ESI[0x1f] = bVar10;
            unaff_EBP = (undefined1 *)(uint)(byte)unaff_ESI[0x31];
            if (((*(ushort *)(&DAT_005f7104 + (int)unaff_EBP * 8) & 0x200) != 0) && (bVar10 != 0)) {
              unaff_ESI[0x4a] = 0;
              *(undefined2 *)(unaff_ESI + 0x4c) = 0;
              *(undefined2 *)(unaff_ESI + 0x4e) = 0;
            }
          } while ((unaff_ESI != DAT_0065dc28) || (bVar22 = false, -1 < DAT_0065dc30));
          unaff_EBP = (undefined1 *)(uint)*(ushort *)(unaff_ESI + 0x42);
          FUN_005dcd40();
        } while (!bVar22);
        DAT_0065dc34 = DAT_0065dc34 - (*(int *)(unaff_ESI + 0x24) + -0x368a);
        *(int *)(unaff_ESI + 0x24) =
             *(int *)(unaff_ESI + 0x24) - (*(int *)(unaff_ESI + 0x24) + -0x368a);
        iVar6 = (int)unaff_EBP * 0x100;
        unaff_EBP = &DAT_00743b94 + iVar6;
        uVar9 = *(int *)(DAT_0065dc2c + 0x28) - *(int *)(&DAT_00743bbc + iVar6);
        if ((int)uVar9 < 0) {
          uVar9 = -uVar9;
        }
        uVar23 = CONCAT44(extraout_EDX_02,uVar9);
        if ((0xe0000 < uVar9) &&
           ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x40) == 0)) {
          DAT_0065dc40 = DAT_0065dc40 | 0x80;
        }
        if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x4000) == 0) {
          iVar16 = *(int *)(DAT_0065dc2c + 0x28);
          uVar23 = CONCAT44(extraout_EDX_02,*(int *)(&DAT_00743bbc + iVar6) >> 1);
          *(int *)(DAT_0065dc2c + 0x28) = *(int *)(&DAT_00743bbc + iVar6) >> 1;
          *(int *)(&DAT_00743bbc + iVar6) = iVar16 >> 1;
          DAT_0065dc40 = DAT_0065dc40 | 4;
        }
        else {
          *(int *)(unaff_ESI + 0x28) =
               *(int *)(unaff_ESI + 0x28) - (*(int *)(unaff_ESI + 0x28) >> 2);
          DAT_0065dc40 = DAT_0065dc40 | 4;
        }
      }
LAB_005dc538:
      if (*(int *)(unaff_ESI + 0x24) < 0x368a) goto LAB_005dca55;
      uVar19 = *(uint *)(&DAT_0065dc70 + uVar19 * 4);
      *(uint *)(unaff_ESI + 0x2c) = *(int *)(unaff_ESI + 0x2c) + uVar19;
      DAT_0065dc38 = DAT_0065dc38 + 1;
    } while( true );
  }
  goto LAB_005dca73;
LAB_005dca55:
  FUN_00444927();
  FUN_005e53ca();
LAB_005dca73:
  *(int *)(unaff_ESI + 0x2c) = *(int *)(unaff_ESI + 0x2c) / DAT_0065dc38;
  uVar19 = DAT_0065dc40;
  puVar2 = DAT_0065dc2c;
  if ((((unaff_ESI[0xcd] != '\x02') &&
       (((&DAT_006559d8)[(uint)(*(ushort *)(unaff_ESI + 0x36) >> 2) * 0x10] & 0x10) != 0)) &&
      (DAT_0065dc40 = DAT_0065dc40 | 8, *(ushort *)(unaff_ESI + 0x36) >> 2 == 1)) &&
     (unaff_ESI == DAT_0065dc2c)) {
    if (DAT_0065dc30 < 0) {
      if (*(ushort *)(unaff_ESI + 0x34) < 0x17) goto LAB_005dcb16;
    }
    else {
      uVar11 = 0x11;
      if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x1000) != 0) {
        uVar11 = 6;
      }
      if (((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x4000) != 0) &&
         (uVar11 = 0x14, unaff_ESI[0xcd] == '\x06')) {
        uVar11 = 0x12;
      }
      if (uVar11 < *(ushort *)(unaff_ESI + 0x34)) {
LAB_005dcb16:
        DAT_0065dc40 = uVar19 | 9;
        DAT_0065dc44 = -1;
        do {
          do {
            iVar6 = DAT_0065dc44;
            DAT_0065dc44 = iVar6 + 1;
          } while (CONCAT11((char)(*(ushort *)(unaff_ESI + 0x3a) >> 5),
                            (char)(*(ushort *)(unaff_ESI + 0x38) >> 5)) !=
                   (&DAT_0088744a)[(uint)(byte)unaff_ESI[0x30] * 0x130 + DAT_0065dc44]);
        } while ((char)(*(ushort *)(unaff_ESI + 0x3c) >> 2) !=
                 (&DAT_00887453)[(uint)(byte)unaff_ESI[0x30] * 0x260 + iVar6]);
      }
    }
  }
  if ((*(ushort *)(unaff_ESI + 0x48) & 1) != 0) {
    DAT_0065dc40 = DAT_0065dc40 | 0x10;
  }
  if (DAT_0065dc30 < 0) {
    if (unaff_ESI == DAT_0065dc2c) goto LAB_005dcbad;
    unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x40) * 0x100;
    goto LAB_005dbffb;
  }
  if (*(ushort *)(unaff_ESI + 0x3e) != 0xffff) {
    unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x3e) * 0x100;
    goto LAB_005dbffb;
  }
LAB_005dcbad:
  iVar6 = 0;
  uVar19 = 0;
  iVar16 = 0;
  puVar18 = DAT_0065dc2c;
  while( true ) {
    iVar16 = iVar16 + 1;
    uVar19 = (uint)(ushort)((short)uVar19 + *(short *)(puVar18 + 0x46));
    iVar6 = iVar6 + *(int *)(puVar18 + 0x2c);
    if (*(ushort *)(puVar18 + 0x3e) == 0xffff) break;
    puVar18 = &DAT_00743b94 + (uint)*(ushort *)(puVar18 + 0x3e) * 0x100;
  }
  iVar15 = *(int *)(DAT_0065dc2c + 0x28) >> 8;
  iVar15 = iVar15 * iVar15;
  if (*(int *)(DAT_0065dc2c + 0x28) < 0) {
    iVar15 = -iVar15;
  }
  iVar6 = (((iVar6 / iVar16) * 0x15 >> 9) - (*(int *)(DAT_0065dc2c + 0x28) >> 0xc)) -
          (int)(CONCAT44(iVar15 >> 0x1f,iVar15 >> 4) / (longlong)(int)uVar19);
  if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)DAT_0065dc2c[0x31] * 8) & 8) == 0) goto LAB_005dcd0c;
  uVar9 = (uint)(byte)DAT_0065dc2c[0xc2];
  if (*(ushort *)(DAT_0065dc2c + 0x36) >> 2 == 0x32) {
    if (DAT_0065dc2c[0xcd] != '\x05') goto LAB_005dcc4c;
LAB_005dcc5e:
    uVar9 = (int)uVar9 >> 1;
  }
  else if (*(ushort *)(DAT_0065dc2c + 0x36) >> 2 == 0x33) {
    if (DAT_0065dc2c[0xcd] == '\x06') goto LAB_005dcc5e;
LAB_005dcc4c:
    uVar9 = uVar9 - ((int)uVar9 >> 2);
  }
  iVar16 = uVar9 * 0x4000;
  if ((*(ushort *)(DAT_0065dc2c + 0x48) & 8) != 0) {
    iVar16 = uVar9 * -0x4000;
  }
  iVar16 = (int)((iVar16 - *(int *)(DAT_0065dc2c + 0x28)) * (uint)(byte)DAT_0065dc2c[0xc3] * 2) /
           (int)(uVar9 * uVar19 >> 2);
  uVar19 = (uint)(byte)DAT_0065dc2c[0x31];
  if ((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 0x2000) == 0) {
LAB_005dccf7:
    uVar19 = *(uint *)(puVar2 + 0x28);
    if ((int)uVar19 < 0) {
      uVar19 = -uVar19;
    }
    if (uVar19 < 0x10001) {
      iVar6 = 0;
    }
  }
  else {
    if (iVar16 < 0) {
      iVar16 = iVar16 >> 4;
    }
    if ((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 4) != 0) {
      sVar3 = *(short *)(DAT_0065dc2c + 0xb6);
      if (0x200 < sVar3) {
        sVar3 = 0x200;
      }
      if (sVar3 < -0x200) {
        sVar3 = -0x200;
      }
      *(short *)(DAT_0065dc2c + 0xb6) = sVar3;
    }
    if (puVar2[0x1f] == '\0') goto LAB_005dccf7;
    if (iVar16 < 0) {
      iVar16 = 0;
    }
    if (((*(ushort *)(&DAT_005f7104 + uVar19 * 8) & 4) != 0) && (puVar2[0x1f] == '\x02')) {
      *(undefined2 *)(puVar2 + 0xb6) = 0;
    }
  }
  iVar6 = iVar6 + iVar16;
LAB_005dcd0c:
  if (((*(ushort *)(puVar2 + 0x36) >> 2 == 0x75) && (0x2f < *(ushort *)(puVar2 + 0x34))) &&
     (*(ushort *)(puVar2 + 0x34) < 0x81)) {
    iVar6 = iVar6 - (*(int *)(puVar2 + 0x28) >> 6);
  }
  *(int *)(puVar2 + 0x2c) = iVar6;
  return DAT_0065dc40;
}


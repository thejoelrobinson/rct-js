
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_0043c751(void)

{
  short sVar1;
  ushort uVar2;
  byte bVar4;
  uint uVar3;
  byte extraout_CL;
  byte extraout_CL_00;
  byte extraout_CL_01;
  ushort uVar5;
  ushort extraout_CX;
  ushort extraout_CX_00;
  ushort extraout_CX_01;
  ushort extraout_CX_02;
  ushort extraout_CX_03;
  ushort extraout_CX_04;
  undefined2 uVar6;
  uint extraout_ECX;
  uint extraout_ECX_00;
  undefined4 extraout_ECX_01;
  uint extraout_ECX_02;
  uint extraout_ECX_03;
  byte bVar7;
  undefined1 extraout_DL;
  undefined1 extraout_DL_00;
  ushort uVar8;
  undefined2 extraout_DX;
  ushort extraout_DX_00;
  ushort extraout_DX_01;
  ushort extraout_DX_02;
  byte bVar10;
  undefined2 extraout_var;
  undefined2 extraout_var_00;
  int extraout_EDX;
  uint uVar9;
  char cVar11;
  ushort uVar12;
  uint unaff_EBX;
  uint unaff_EBP;
  int unaff_ESI;
  uint uVar13;
  byte *pbVar14;
  uint uVar15;
  int iVar16;
  bool bVar17;
  undefined8 uVar18;
  undefined6 uVar19;
  byte *pbVar20;
  uint uStack_8;
  uint uStack_4;
  
  _DAT_0062d3f4 = 0;
  DAT_006293d9 = *(char *)(unaff_ESI + 0x71);
  if (DAT_006293d9 == -2) {
    *(undefined1 *)(unaff_ESI + 0x71) = 0xff;
  }
  bVar17 = *(byte *)(unaff_ESI + 0x2b) < 6;
  if (*(byte *)(unaff_ESI + 0x2b) == 6) {
    *(short *)(unaff_ESI + 0x7a) = *(short *)(unaff_ESI + 0x7a) + 1;
    uVar2 = *(ushort *)(unaff_ESI + 0x74);
    bVar17 = uVar2 != 0xffff;
    if (uVar2 != 0xffff) {
      uVar13 = (uint)uVar2;
      uVar2 = (&DAT_00743ba2)[uVar13 * 0x80] - *(short *)(unaff_ESI + 0xe);
      if ((short)uVar2 < 0) {
        uVar2 = -uVar2;
      }
      uVar5 = (&DAT_00743ba4)[uVar13 * 0x80] - *(short *)(unaff_ESI + 0x10);
      if ((short)uVar5 < 0) {
        uVar5 = -uVar5;
      }
      uVar8 = (&DAT_00743ba6)[uVar13 * 0x80] - *(short *)(unaff_ESI + 0x12);
      if ((short)uVar8 < 0) {
        uVar8 = -uVar8;
      }
      bVar17 = uVar8 < 10;
      if (uVar8 < 0xb) {
        uVar8 = uVar5;
        if (uVar2 < uVar5) {
          uVar8 = uVar2;
          uVar2 = uVar5;
        }
        uVar2 = uVar2 + (uVar8 >> 1);
        uVar3 = (uint)uVar2;
        if (uVar2 < 8) goto LAB_0043c84c;
        if (0xc < uVar2) {
          unaff_EBX = *(uint *)(unaff_ESI + 0xe) & 0xffe0ffe0;
          bVar17 = (*(uint *)(&DAT_00743ba2 + uVar13 * 0x80) & 0xffe0ffe0) < unaff_EBX;
          if ((*(uint *)(&DAT_00743ba2 + uVar13 * 0x80) & 0xffe0ffe0) != unaff_EBX)
          goto LAB_0043c875;
        }
        bVar10 = (&DAT_00743bb2)[uVar13 * 0x100];
        bVar17 = bVar10 < *(byte *)(unaff_ESI + 0x1e);
        if (bVar10 == *(byte *)(unaff_ESI + 0x1e)) {
          switch(bVar10 >> 3 & 3) {
          case 0:
            uVar2 = *(ushort *)(unaff_ESI + 0xe);
            uVar3 = (uint)uVar2;
            bVar17 = uVar2 < (ushort)(&DAT_00743ba2)[uVar13 * 0x80];
            if ((short)uVar2 < (short)(&DAT_00743ba2)[uVar13 * 0x80]) {
LAB_0043c84c:
              if (*(byte *)(unaff_ESI + 0x71) < 0xfe) {
                uStack_4 = 0x43c857;
                uVar3 = FUN_0043c49e();
              }
              if (*(char *)(unaff_ESI + 0x71) == -1) {
                *(undefined1 *)(unaff_ESI + 0x71) = 0xfe;
                *(undefined1 *)(unaff_ESI + 0x6f) = 2;
                if (DAT_006293d9 != -2) {
                  uStack_4 = 0x43c873;
                  uVar3 = FUN_005e53ca();
                }
              }
              return uVar3;
            }
            break;
          case 1:
            uVar2 = *(ushort *)(unaff_ESI + 0x10);
            uVar3 = (uint)uVar2;
            bVar17 = uVar2 < (ushort)(&DAT_00743ba4)[uVar13 * 0x80];
            if ((short)(&DAT_00743ba4)[uVar13 * 0x80] < (short)uVar2) goto LAB_0043c84c;
            break;
          case 2:
            uVar2 = *(ushort *)(unaff_ESI + 0xe);
            uVar3 = (uint)uVar2;
            bVar17 = uVar2 < (ushort)(&DAT_00743ba2)[uVar13 * 0x80];
            if ((short)(&DAT_00743ba2)[uVar13 * 0x80] < (short)uVar2) goto LAB_0043c84c;
            break;
          case 3:
            uVar2 = *(ushort *)(unaff_ESI + 0x10);
            uVar3 = (uint)uVar2;
            bVar17 = uVar2 < (ushort)(&DAT_00743ba4)[uVar13 * 0x80];
            if ((short)uVar2 < (short)(&DAT_00743ba4)[uVar13 * 0x80]) goto LAB_0043c84c;
          }
        }
      }
    }
  }
LAB_0043c875:
  uStack_4 = 0x43c87a;
  uVar13 = FUN_0043c49e();
  uStack_8 = extraout_ECX;
  uVar6 = extraout_var;
  if (!bVar17) {
    bVar17 = false;
    _DAT_0062d3f4 = _DAT_0062d3f4 | 1;
    unaff_EBX = (uint)*(byte *)(unaff_ESI + 0x2e);
    uStack_4 = 0x43c88f;
    uVar13 = (**(code **)(&DAT_0062d3fc + unaff_EBX * 4))();
    if (bVar17) {
      return uVar13;
    }
    uStack_4 = 0x43c896;
    uVar13 = FUN_0043c49e();
    uStack_8 = extraout_ECX_00;
    uVar6 = extraout_var_00;
    if (!bVar17) {
      return uVar13;
    }
  }
  uVar2 = (ushort)uVar13;
  uVar5 = (ushort)uStack_8;
  uVar15 = CONCAT22((short)(unaff_EBX >> 0x10),uVar2) & 0xffffffe0;
  uVar3 = CONCAT22(uVar6,uVar5) & 0xffffffe0;
  uVar12 = (ushort)uVar15;
  uVar8 = (ushort)uVar3;
  if ((uVar12 == *(ushort *)(unaff_ESI + 0x24)) && (uVar8 == *(ushort *)(unaff_ESI + 0x26))) {
LAB_0043c8b4:
    uStack_4 = 0x43c8b9;
    FUN_0043d38b();
    uStack_4 = 0x43c8be;
    FUN_005e53ca();
    uStack_4 = 0x43c8c3;
    FUN_00444927();
    uStack_4 = 0x43c8c8;
    uVar13 = FUN_005e53ca();
    return uVar13;
  }
  if (((short)uVar2 < 0x20) || ((((short)uVar5 < 0x20 || (0xfdf < uVar2)) || (0xfdf < uVar5)))) {
    if (*(char *)(unaff_ESI + 0x2a) == '\x01') {
      _DAT_0062d3f4 = _DAT_0062d3f4 | 2;
    }
  }
  else {
    bVar10 = (byte)(*(ushort *)(unaff_ESI + 0x12) >> 2);
    bVar7 = bVar10 - 5;
    if (bVar10 < 5) {
      bVar7 = 0;
    }
    bVar10 = bVar10 + 1;
    pbVar14 = (byte *)(&DAT_00971ef4)
                      [(ushort)((ushort)(uVar8 << 7 | uVar8 >> 9 | uVar12) >> 5 |
                               (uVar8 >> 9) << 0xb)];
    do {
      uVar15 = CONCAT31((int3)(uVar15 >> 8),*pbVar14) & 0xffffff3c;
      cVar11 = (char)uVar15;
      uStack_4 = uVar13;
      if (cVar11 == '\x04') {
        if ((bVar7 <= pbVar14[2]) && (pbVar14[2] <= bVar10)) {
          DAT_006293c9 = ((&DAT_00630cb7)[pbVar14[5] & 0xf] & 0x20) != 0;
          bVar17 = false;
          uVar13 = FUN_0042547b();
          if (bVar17) {
            if (*(char *)(unaff_ESI + 0x2a) == '\0') goto LAB_0043c992;
          }
          else if (*(char *)(unaff_ESI + 0x2a) == '\x01') goto LAB_0043c992;
          uVar2 = extraout_CX_01;
          if ((*(char *)(unaff_ESI + 0x2e) == '\0') && ((pbVar14[4] & 0xf0) == 0)) {
            if (pbVar14[7] == 0xff) {
              *(undefined1 *)(unaff_ESI + 0x79) = 0xff;
            }
            else if (*(char *)(unaff_ESI + 0x2b) == '\x06') {
              if (pbVar14[7] != *(byte *)(unaff_ESI + 0x68)) goto LAB_0043d02c;
            }
            else if (pbVar14[7] != *(byte *)(unaff_ESI + 0x79)) {
              *(undefined1 *)(unaff_ESI + 0xf4) = 0;
              bVar17 = false;
              uVar19 = FUN_0043e304();
              uVar13 = (uint)uVar19;
              bVar10 = (byte)((uint6)uVar19 >> 0x20);
              if (!bVar17) {
                *(byte *)(unaff_ESI + 0x79) = bVar10;
                goto LAB_0043c992;
              }
              *(byte *)(unaff_ESI + 0x79) = bVar10;
              iVar16 = (uint)bVar10 * 0x260;
              bVar10 = (byte)((uint6)uVar19 >> 0x28);
              uVar15 = (uint)bVar10;
              LOCK();
              uVar6 = *(undefined2 *)(&DAT_00887472 + uVar15 * 2 + iVar16);
              *(undefined2 *)(&DAT_00887472 + uVar15 * 2 + iVar16) = *(undefined2 *)(unaff_ESI + 10)
              ;
              UNLOCK();
              (&DAT_0088747a)[iVar16 + uVar15] = (&DAT_0088747a)[iVar16 + uVar15] + '\x01';
              *(undefined2 *)(unaff_ESI + 0x74) = uVar6;
              FUN_0044142c();
              *(undefined1 *)(unaff_ESI + 0x68) = extraout_DL_00;
              *(byte *)(unaff_ESI + 0x69) = bVar10;
              *(undefined1 *)(unaff_ESI + 0x2b) = 6;
              *(undefined1 *)(unaff_ESI + 0xf5) = 0;
              uVar18 = FUN_00441452();
              uVar3 = (uint)((ulonglong)uVar18 >> 0x20);
              *(undefined1 *)(unaff_ESI + 0x2c) = 10;
              *(undefined1 *)(unaff_ESI + 0x36) = 2;
              *(undefined2 *)(unaff_ESI + 0x7a) = 0;
              uVar2 = extraout_CX_03;
              if ((*(ushort *)(unaff_ESI + 200) & 8) != 0) {
                DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
                unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
                uVar9 = uVar3 & 0xff;
                DAT_00971e8a._2_2_ = (&DAT_00887442)[uVar9 * 0x130];
                _DAT_00971e8e = (&DAT_00887444)[uVar9 * 0x98];
                FUN_0042c711(iVar16,unaff_ESI,1,&stack0xffffffec,uVar15,uVar3,extraout_ECX_01,
                             (int)uVar18);
              }
            }
          }
          else {
            *(undefined1 *)(unaff_ESI + 0x79) = 0xff;
            if (*(char *)(unaff_ESI + 0x2b) == '\x06') {
LAB_0043d02c:
              FUN_0043e792();
              FUN_0044142c();
              *(undefined1 *)(unaff_ESI + 0x2b) = 1;
              uVar13 = FUN_00441452();
              uVar2 = extraout_CX_02;
            }
          }
          bVar10 = pbVar14[2];
          uVar5 = (ushort)bVar10;
          bVar7 = pbVar14[4];
          *(short *)(unaff_ESI + 0x24) = (short)uVar13;
          *(ushort *)(unaff_ESI + 0x26) = uVar2;
          *(byte *)(unaff_ESI + 0x28) = bVar10;
          *(byte *)(unaff_ESI + 0x29) = bVar7 & 7;
          if (*(char *)(unaff_ESI + 0x2e) == '\0') {
            bVar10 = *(byte *)(unaff_ESI + 0xef);
            *(byte *)(unaff_ESI + 0xef) = *(byte *)(unaff_ESI + 0xef) & 0xc0;
            *(byte *)(unaff_ESI + 0xef) = *(byte *)(unaff_ESI + 0xef) | (bVar10 & 0x1f) << 1;
            if (((DAT_006293c9 != '\0') &&
                (*(byte *)(unaff_ESI + 0xef) = *(byte *)(unaff_ESI + 0xef) | 1,
                (*(byte *)(unaff_ESI + 0xef) & 0x3e) != 0)) &&
               ((*(byte *)(unaff_ESI + 0xef) & 0xc0) == 0)) {
              uVar8 = FUN_005df40c();
              uVar5 = extraout_DX_00;
              if (uVar8 < 0x2aab) {
                FUN_00440fe3();
                pbVar14 = (byte *)(unaff_ESI + 0x3b);
                bVar10 = *pbVar14;
                *pbVar14 = *pbVar14 - 0x11;
                uVar5 = extraout_DX_01;
                if (bVar10 < 0x11) {
                  *(undefined1 *)(unaff_ESI + 0x3b) = 0;
                }
              }
              *(byte *)(unaff_ESI + 0xef) = *(byte *)(unaff_ESI + 0xef) | 0xc0;
            }
            if (((*(byte *)(unaff_ESI + 0xef) & 0xc0) != 0) &&
               (uVar8 = FUN_005df40c(), uVar5 = extraout_DX_02, uVar2 = extraout_CX_04,
               uVar8 < 0x1112)) {
              *(char *)(unaff_ESI + 0xef) = *(char *)(unaff_ESI + 0xef) + -0x40;
            }
            uVar2 = (&DAT_00991f8e)[(ushort)((ushort)((uVar13 & 0xfe0) << 2) | uVar2 >> 5)];
            uVar13 = 0;
            while (uVar2 != 0xffff) {
              uVar15 = (uint)uVar2;
              iVar16 = uVar15 * 0x100;
              uVar3 = uVar13;
              if ((&DAT_00743b94)[iVar16] == '\x01') {
                if ((&DAT_00743bbf)[iVar16] == '\x05') {
                  uVar2 = (&DAT_00743ba6)[uVar15 * 0x80] + uVar5 * -4;
                  if ((short)uVar2 < 0) {
                    uVar2 = -uVar2;
                  }
                  if (uVar2 < 0x11) {
                    uVar3 = uVar13 + 0x10000;
                  }
                }
              }
              else if ((&DAT_00743b94)[iVar16] == '\x03') {
                uVar2 = (&DAT_00743ba6)[uVar15 * 0x80] + uVar5 * -4;
                if ((short)uVar2 < 0) {
                  uVar2 = -uVar2;
                }
                if (uVar2 < 0x11) {
                  uVar3 = CONCAT31((int3)(uVar13 >> 8),(char)uVar13 + '\x01');
                  if ((byte)(&DAT_00743b95)[iVar16] < 2) {
                    uVar3 = CONCAT22((short)(uVar13 >> 0x10),
                                     CONCAT11((char)(uVar13 >> 8) + '\x01',(char)uVar13));
                  }
                }
              }
              uVar13 = uVar3;
              uVar2 = (&DAT_00743b96)[uVar15 * 0x80];
            }
            if (((0x9ffff < uVar13) && (*(char *)(unaff_ESI + 0x2b) == '\x05')) &&
               (uVar2 = FUN_005df40c(), uVar13 = extraout_ECX_02, uVar2 < 0x5556)) {
              FUN_00440fe3();
              pbVar14 = (byte *)(unaff_ESI + 0x3b);
              bVar10 = *pbVar14;
              *pbVar14 = *pbVar14 - 0xe;
              uVar13 = extraout_ECX_03;
              if (bVar10 < 0xe) {
                *(undefined1 *)(unaff_ESI + 0x3b) = 0;
              }
            }
            uVar6 = (undefined2)uVar13;
            if (2 < (byte)uVar13) {
              uVar6 = (undefined2)CONCAT31((int3)(uVar13 >> 8),3);
            }
            if (2 < (byte)((ushort)uVar6 >> 8)) {
              uVar6 = CONCAT11(3,(char)uVar6);
            }
            uVar13 = CONCAT11(*(undefined1 *)(unaff_ESI + 0xe3),*(undefined1 *)(unaff_ESI + 0xe3)) &
                     0xffffff0f;
            uVar2 = CONCAT11((char)(uVar13 >> 8),(char)uVar13 << 2 | (byte)((ushort)uVar6 >> 8)) &
                    0xc0ff;
            bVar7 = (byte)uVar2;
            bVar4 = (byte)(uVar2 >> 8);
            bVar10 = bVar7 | bVar4;
            *(byte *)(unaff_ESI + 0xe3) = bVar10;
            if (bVar4 == 0) {
              uVar13 = CONCAT11(bVar10,bVar10) & 0xffffff03;
              uVar2 = CONCAT11((byte)(uVar13 >> 8) >> 2,(char)uVar13) & 0x3ff;
              bVar10 = (byte)uVar6;
              if ((2 < (byte)((char)uVar2 + (char)(uVar2 >> 8) + ((bVar7 & 0x30) >> 4))) &&
                 (uVar2 = FUN_005df40c(), bVar10 = extraout_CL_00, uVar2 < 0x2aab)) {
                FUN_00440fe3();
                pbVar14 = (byte *)(unaff_ESI + 0x3b);
                bVar10 = *pbVar14;
                *pbVar14 = *pbVar14 - 0x11;
                if (bVar10 < 0x11) {
                  *(undefined1 *)(unaff_ESI + 0x3b) = 0;
                }
                *(byte *)(unaff_ESI + 0xe3) = *(byte *)(unaff_ESI + 0xe3) | 0xc0;
                bVar10 = extraout_CL_01;
              }
            }
            else {
              uVar2 = FUN_005df40c();
              bVar10 = extraout_CL;
              if (uVar2 < 0x1112) {
                *(char *)(unaff_ESI + 0xe3) = *(char *)(unaff_ESI + 0xe3) + -0x40;
              }
            }
            uVar13 = CONCAT11(*(undefined1 *)(unaff_ESI + 0xe1),*(undefined1 *)(unaff_ESI + 0xe1)) &
                     0xffffff0f;
            uVar2 = CONCAT11((char)(uVar13 >> 8),(char)uVar13 << 2 | bVar10) & 0xc0ff;
            bVar7 = (byte)uVar2;
            bVar4 = (byte)(uVar2 >> 8);
            bVar10 = bVar7 | bVar4;
            *(byte *)(unaff_ESI + 0xe1) = bVar10;
            if (bVar4 == 0) {
              uVar13 = CONCAT11(bVar10,bVar10) & 0xffffff03;
              uVar2 = CONCAT11((byte)(uVar13 >> 8) >> 2,(char)uVar13) & 0x3ff;
              if ((2 < (byte)((char)uVar2 + (char)(uVar2 >> 8) + ((bVar7 & 0x30) >> 4))) &&
                 (uVar2 = FUN_005df40c(), uVar2 < 0x2aab)) {
                FUN_00440fe3();
                pbVar14 = (byte *)(unaff_ESI + 0x3b);
                bVar10 = *pbVar14;
                *pbVar14 = *pbVar14 - 0x11;
                if (bVar10 < 0x11) {
                  *(undefined1 *)(unaff_ESI + 0x3b) = 0;
                }
                *(byte *)(unaff_ESI + 0xe1) = *(byte *)(unaff_ESI + 0xe1) | 0xc0;
              }
            }
            else {
              uVar2 = FUN_005df40c();
              if (uVar2 < 0x1112) {
                *(char *)(unaff_ESI + 0xe1) = *(char *)(unaff_ESI + 0xe1) + -0x40;
              }
            }
          }
          goto LAB_0043c8b4;
        }
      }
      else {
        if (((cVar11 == '\b') && (bVar7 <= pbVar14[2])) &&
           ((pbVar14[2] <= bVar10 &&
            (iVar16 = (uint)pbVar14[7] * 0x260,
            (*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar16] * 8) & 0x20000) != 0))))
        {
          if (((*(char *)(unaff_ESI + 0x2e) == '\0') &&
              (*(undefined1 *)(unaff_ESI + 0xf4) = 0, (&DAT_00887441)[iVar16] == '\x01')) &&
             (pbVar14[7] != *(byte *)(unaff_ESI + 0x79))) {
            if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar16] * 8) & 0x200000) == 0
               ) {
              if (pbVar14[7] == *(byte *)(unaff_ESI + 0xc5)) {
                *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
              }
              *(undefined1 *)(unaff_ESI + 0x70) = DAT_006293d8;
              FUN_0044142c();
              *(byte *)(unaff_ESI + 0x68) = pbVar14[7];
              *(undefined1 *)(unaff_ESI + 0x2b) = 0x11;
              *(undefined1 *)(unaff_ESI + 0x2c) = 0;
              FUN_00441452();
              return uStack_4;
            }
            *(undefined1 *)(unaff_ESI + 0xf4) = 0;
            bVar17 = false;
            pbVar20 = pbVar14;
            FUN_0043e304(iVar16,CONCAT22((short)(uVar3 >> 0x10),CONCAT11(bVar10,bVar7)));
            if (bVar17) {
              uVar13 = (uint)pbVar14[7];
              if ((short)(&DAT_00887508)[uVar13 * 0x130] != 0) {
                (&DAT_00887524)[uVar13 * 0x98] =
                     (&DAT_00887524)[uVar13 * 0x98] + (int)(short)(&DAT_00887508)[uVar13 * 0x130];
                (&DAT_0088751d)[uVar13 * 0x260] = (&DAT_0088751d)[uVar13 * 0x260] | 2;
                DAT_0099c167 = 0x14;
                DAT_006293b0 = 0xe6;
                FUN_004405f3();
              }
              *(ushort *)(unaff_ESI + 0x32) = uVar12 + 0x10;
              *(ushort *)(unaff_ESI + 0x34) = uVar8 + 0x10;
              *(undefined1 *)(unaff_ESI + 0x36) = 3;
              FUN_0044142c();
              *(byte *)(unaff_ESI + 0x68) = pbVar20[7];
              *(undefined1 *)(unaff_ESI + 0x2b) = 7;
              *(undefined1 *)(unaff_ESI + 0x2c) = 0x13;
              FUN_00441452();
              *(undefined1 *)(unaff_ESI + 0xe2) = 0;
              *(short *)(&DAT_008874f0 + extraout_EDX * 0x260) =
                   *(short *)(&DAT_008874f0 + extraout_EDX * 0x260) + 1;
              if ((*(ushort *)(unaff_ESI + 200) & 8) != 0) {
                DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
                unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
                DAT_00971e8a._2_2_ = (&DAT_00887442)[(uint)*(byte *)(unaff_ESI + 0x68) * 0x130];
                _DAT_00971e8e = (&DAT_00887444)[(uint)*(byte *)(unaff_ESI + 0x68) * 0x98];
                FUN_0042c711(pbVar20,unaff_ESI,unaff_EBP,&uStack_8,uVar15);
              }
              return uStack_4;
            }
          }
          goto LAB_0043c992;
        }
        if (((cVar11 == '\x10') && (bVar7 <= pbVar14[2])) && (pbVar14[2] <= bVar10)) {
          if (pbVar14[4] == 1) {
            _DAT_0062d3f4 = _DAT_0062d3f4 | 4;
            DAT_0062d3f6 = pbVar14;
          }
          if (pbVar14[4] == 0) {
            if (*(char *)(unaff_ESI + 0x2e) == '\0') {
              if (*(char *)(unaff_ESI + 0x2b) == '\x06') {
                *(undefined1 *)(unaff_ESI + 0x2c) = 0xb;
                *(undefined1 *)(unaff_ESI + 0x70) = DAT_006293d8;
                return uVar13;
              }
              if (pbVar14[7] != *(byte *)(unaff_ESI + 0x79)) {
                *(undefined1 *)(unaff_ESI + 0xf4) = 0;
                bVar17 = false;
                uStack_4 = 0x43ce95;
                FUN_0043e304();
                bVar10 = (byte)extraout_DX;
                if (bVar17) {
                  *(undefined1 *)(unaff_ESI + 0x70) = DAT_006293d8;
                  *(byte *)(unaff_ESI + 0x79) = bVar10;
                  iVar16 = (uint)bVar10 * 0x260;
                  bVar10 = (byte)((ushort)extraout_DX >> 8);
                  LOCK();
                  uVar6 = *(undefined2 *)(&DAT_00887472 + (uint)bVar10 * 2 + iVar16);
                  *(undefined2 *)(&DAT_00887472 + (uint)bVar10 * 2 + iVar16) =
                       *(undefined2 *)(unaff_ESI + 10);
                  UNLOCK();
                  (&DAT_0088747a)[iVar16 + (uint)bVar10] =
                       (&DAT_0088747a)[iVar16 + (uint)bVar10] + '\x01';
                  *(undefined2 *)(unaff_ESI + 0x74) = uVar6;
                  uStack_4 = 0x43ced3;
                  FUN_0044142c();
                  *(undefined1 *)(unaff_ESI + 0x68) = extraout_DL;
                  *(byte *)(unaff_ESI + 0x69) = bVar10;
                  *(undefined1 *)(unaff_ESI + 0x2b) = 6;
                  *(undefined1 *)(unaff_ESI + 0xf5) = 0;
                  uStack_4 = 0x43cee9;
                  uVar18 = FUN_00441452();
                  uStack_4 = (uint)uVar18;
                  *(undefined1 *)(unaff_ESI + 0x2c) = 0xb;
                  *(undefined2 *)(unaff_ESI + 0x7a) = 0;
                  if ((*(ushort *)(unaff_ESI + 200) & 8) != 0) {
                    DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
                    unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
                    uVar13 = (uint)((ulonglong)uVar18 >> 0x20) & 0xff;
                    DAT_00971e8a._2_2_ = (&DAT_00887442)[uVar13 * 0x130];
                    _DAT_00971e8e = (&DAT_00887444)[uVar13 * 0x98];
                    FUN_0042c711(iVar16,unaff_ESI,unaff_EBP & 0xffff0000);
                  }
                  return uStack_4;
                }
                *(byte *)(unaff_ESI + 0x79) = bVar10;
              }
              goto LAB_0043c992;
            }
          }
          else if (pbVar14[4] == 2) {
            if ((*(char *)(unaff_ESI + 0x2e) != '\0') || ((pbVar14[5] & 0xf) != 0))
            goto LAB_0043c992;
            if ((*pbVar14 & 3) != *(byte *)(unaff_ESI + 0x78)) {
              if ((((*pbVar14 & 3 ^ 2) == *(byte *)(unaff_ESI + 0x78)) &&
                  (*(char *)(unaff_ESI + 0x2b) == '\x05')) &&
                 (((*(ushort *)(unaff_ESI + 200) & 1) != 0 || ((_DAT_0087c3bc & 1) == 0)))) {
                sVar1 = (&DAT_0065247a)[(uint)*(byte *)(unaff_ESI + 0x78) * 2];
                *(short *)(unaff_ESI + 0x32) =
                     *(short *)(unaff_ESI + 0x32) +
                     (&DAT_00652478)[(uint)*(byte *)(unaff_ESI + 0x78) * 2];
                *(short *)(unaff_ESI + 0x34) = *(short *)(unaff_ESI + 0x34) + sVar1;
                *(undefined1 *)(unaff_ESI + 0x36) = 9;
                uStack_4 = 0x43ce01;
                FUN_005e53ca();
                uStack_4 = 0x43ce06;
                FUN_00444927();
                uStack_4 = 0x43ce0b;
                FUN_005e53ca();
                uStack_4 = 0x43ce10;
                FUN_0044142c();
                *(undefined1 *)(unaff_ESI + 0x2b) = 0xe;
                uStack_4 = 0x43ce19;
                uStack_4 = FUN_00441452();
                *(undefined1 *)(unaff_ESI + 0x37) = 0;
                if ((*(ushort *)(unaff_ESI + 200) & 8) != 0) {
                  DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
                  unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
                  FUN_0042c711(pbVar14,unaff_ESI,unaff_EBP);
                }
                return uStack_4;
              }
              goto LAB_0043c992;
            }
            if (*(char *)(unaff_ESI + 0x2b) != '\r') goto LAB_0043c992;
            if ((_DAT_0087c3bc & 1) == 0) goto LAB_0043ccb4;
            uVar2 = (DAT_0087c3c4 + (&DAT_0065247a)[(uint)DAT_0087c3c8 * 2]) * 0x80 |
                    (ushort)(DAT_0087c3c4 + (&DAT_0065247a)[(uint)DAT_0087c3c8 * 2]) >> 9 |
                    DAT_0087c3c2 + (&DAT_00652478)[(uint)DAT_0087c3c8 * 2];
            pbVar14 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
            goto LAB_0043cc63;
          }
          *(undefined1 *)(unaff_ESI + 0x79) = 0xff;
          goto LAB_0043c992;
        }
      }
      pbVar20 = pbVar14 + 1;
      pbVar14 = pbVar14 + 8;
    } while ((*pbVar20 & 0x80) == 0);
    uStack_4 = 0x43c96f;
    uVar19 = FUN_00423677();
    uStack_4 = (uint)uVar19;
    uVar2 = (short)((uint6)uVar19 >> 0x20) - *(short *)(unaff_ESI + 0x12);
    if ((short)uVar2 < 0) {
      uVar2 = -uVar2;
    }
    if ((uVar2 < 4) || ((*(char *)(unaff_ESI + 0x2e) == '\x01' && (uVar2 < 0x21)))) {
      *(undefined1 *)(unaff_ESI + 0x79) = 0xff;
      uStack_8._0_2_ = extraout_CX;
      if (*(char *)(unaff_ESI + 0x2b) == '\x06') {
        uStack_4 = 0x43cf5a;
        FUN_0043e792();
        uStack_4 = 0x43cf5f;
        FUN_0044142c();
        *(undefined1 *)(unaff_ESI + 0x2b) = 1;
        uStack_4 = 0x43cf68;
        uStack_4 = FUN_00441452();
        uStack_8._0_2_ = extraout_CX_00;
      }
      bVar17 = false;
      FUN_00425432();
      if (!bVar17) {
        uVar2 = (ushort)uStack_4 & 0xffe0;
        pbVar14 = (byte *)(&DAT_00971ef4)
                          [(ushort)((ushort)(((ushort)uStack_8 & 0xffe0) << 7 |
                                             (ushort)uStack_8 >> 9 | uVar2) >> 5 |
                                   ((ushort)uStack_8 >> 9) << 0xb)];
        bVar10 = *pbVar14;
        while ((bVar10 & 0x3c) != 0) {
          pbVar14 = pbVar14 + 8;
          bVar10 = *pbVar14;
        }
        if ((pbVar14[5] & 0x1f) == 0) {
          *(ushort *)(unaff_ESI + 0x24) = uVar2;
          *(ushort *)(unaff_ESI + 0x26) = (ushort)uStack_8 & 0xffe0;
          bVar10 = pbVar14[2];
          *(undefined1 *)(unaff_ESI + 0x29) = 8;
          *(byte *)(unaff_ESI + 0x28) = bVar10;
          goto LAB_0043c8b4;
        }
      }
    }
  }
LAB_0043c992:
  *(byte *)(unaff_ESI + 0x78) = *(byte *)(unaff_ESI + 0x78) ^ 2;
  uVar2 = (*(ushort *)(unaff_ESI + 0xe) & 0xffe0) + 0x10;
  *(ushort *)(unaff_ESI + 0x32) = uVar2;
  *(ushort *)(unaff_ESI + 0x34) = (*(ushort *)(unaff_ESI + 0x10) & 0xffe0) + 0x10;
  *(undefined1 *)(unaff_ESI + 0x36) = 5;
  return (uint)uVar2;
LAB_0043cc63:
  do {
    if (((*pbVar14 & 0x3c) == 4) && (pbVar14[4] >> 4 != 0)) {
      if ((pbVar14[4] & 4) == 0) {
        bVar10 = pbVar14[2];
      }
      else if ((pbVar14[4] & 3) == DAT_0087c3c8) {
        bVar10 = pbVar14[2];
      }
      else {
        if ((pbVar14[4] & 3 ^ 2) != DAT_0087c3c8) goto LAB_0043cca7;
        bVar10 = pbVar14[2] + 4;
      }
      if ((byte)(DAT_0087c3c6 >> 2) == bVar10) {
        uStack_4 = uVar15;
        if (DAT_0087c3c0 != 0) {
          uVar13 = (uint)DAT_0087c3c0;
          if ((*(ushort *)(unaff_ESI + 0xca) & 0x4000) != 0) {
            if (*(char *)(unaff_ESI + 0xf0) == '\x02') {
              uVar13 = (uint)(DAT_0087c3c0 >> 1);
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) & 0xbfff;
              *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
            }
            if (*(char *)(unaff_ESI + 0xf0) == '\0') {
              uVar13 = 0;
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) & 0xbfff;
              *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
            }
          }
          if (*(uint *)(unaff_ESI + 0xa0) < uVar13) goto LAB_0043c992;
          _DAT_0087d720 = _DAT_0087d720 + uVar13;
          DAT_0099c167 = 0x10;
          DAT_006293b0 = 0xe4;
          uStack_8 = 0x43cd44;
          uVar13 = FUN_004405f3();
          *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) | 0x20;
        }
        _DAT_0087d71c = _DAT_0087d71c + 1;
        uStack_8 = uStack_4;
        uStack_4 = uVar13;
        FUN_005e5301();
        *(undefined1 *)(unaff_ESI + 0x37) = 1;
        sVar1 = (&DAT_0065247a)[(uint)*(byte *)(unaff_ESI + 0x78) * 2];
        *(short *)(unaff_ESI + 0x32) =
             *(short *)(unaff_ESI + 0x32) + (&DAT_00652478)[(uint)*(byte *)(unaff_ESI + 0x78) * 2];
        *(short *)(unaff_ESI + 0x34) = *(short *)(unaff_ESI + 0x34) + sVar1;
        *(undefined1 *)(unaff_ESI + 0x36) = 7;
        uStack_4 = 0x43cd9b;
        FUN_005e53ca();
        uStack_4 = 0x43cda0;
        FUN_00444927();
        uStack_4 = 0x43cda5;
        uVar13 = FUN_005e53ca();
        return uVar13;
      }
    }
LAB_0043cca7:
    pbVar20 = pbVar14 + 1;
    pbVar14 = pbVar14 + 8;
    uStack_8 = uVar15;
  } while ((*pbVar20 & 0x80) == 0);
LAB_0043ccb4:
  *(undefined1 *)(unaff_ESI + 0x2b) = 0xe;
  *(undefined1 *)(unaff_ESI + 0x37) = 1;
  _DAT_0087c81e = _DAT_0087c81e + -1;
  uStack_4 = 0x43ccc8;
  FUN_00441452();
  goto LAB_0043c992;
}


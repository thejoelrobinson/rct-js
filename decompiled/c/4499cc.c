
void FUN_004499cc(void)

{
  ushort *puVar1;
  undefined2 uVar2;
  undefined2 uVar3;
  undefined4 uVar4;
  byte bVar5;
  uint uVar6;
  ushort uVar7;
  int iVar8;
  char cVar10;
  byte bVar11;
  ushort uVar9;
  uint uVar12;
  int iVar13;
  byte *pbVar14;
  byte *pbVar15;
  short sVar16;
  undefined1 *unaff_EDI;
  
  FUN_0045389c();
  pbVar14 = &DAT_00887420;
  uVar6 = 0;
  do {
    if (*pbVar14 != 0xff) {
      if ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar14 * 8) & 0x80000) != 0) {
        if ((pbVar14[0x21] == 1) && ((pbVar14[0x76] & 0x20) != 0)) {
          if ((*(ushort *)(pbVar14 + 2) & 0xc0) != 0) {
            if (pbVar14[0x13c] == 7) {
              if (((DAT_0088741c & 7) == 0) && (pbVar14[0x15c] != 0xff)) {
                pbVar14[0x15c] = pbVar14[0x15c] + 1;
              }
            }
            else {
              if (pbVar14[0x15c] != 0xff) {
                pbVar14[0x15c] = pbVar14[0x15c] + 1;
              }
              if ((pbVar14[0x15c] == 0xff) && (pbVar14[0x13c] == 0)) goto LAB_00449a8a;
            }
          }
          if (pbVar14[0x10c] == 0xff) {
            pbVar15 = *(byte **)(&DAT_005f66c8 + (uint)*pbVar14 * 4);
            bVar5 = FUN_005df40c();
            pbVar14[0x10c] = pbVar15[((ushort)((ushort)bVar5 * (ushort)*pbVar15) >> 8) + 1];
            pbVar14[0x138] = 0;
            pbVar14[0x139] = 0;
            pbVar14[0x13a] = 0;
            pbVar14[0x13b] = 0;
          }
        }
        else {
LAB_00449a8a:
          pbVar14[0x10c] = 0xff;
        }
        if (pbVar14[0x10c] != 0xff) {
          bVar5 = pbVar14[0x10c];
          uVar4 = *(undefined4 *)(pbVar14 + 0x138);
          unaff_EDI = (undefined1 *)0x5622;
          if ((*(ushort *)(pbVar14 + 2) & 0xc0) != 0) {
            sVar16 = (ushort)pbVar14[0x15c] * 0x46;
            if (pbVar14[0x13c] != 7) {
              sVar16 = (ushort)pbVar14[0x15c] * -0x46;
            }
            unaff_EDI = (undefined1 *)(uint)(ushort)(sVar16 + 0x5622);
          }
          FUN_00453900();
          *(undefined4 *)(pbVar14 + 0x138) = uVar4;
          pbVar14[0x10c] = bVar5;
        }
      }
      if (*pbVar14 != 0x14) {
        uVar12 = 0;
LAB_00449b12:
        uVar9 = *(ushort *)(pbVar14 + uVar12 * 2 + 0x2a);
        if (uVar9 != 0xffff) {
          bVar5 = 0;
          if (pbVar14[4] == 0xc) {
            if ((pbVar14[0x21] != 0) && ((*(ushort *)(pbVar14 + 2) & 0x480) == 0)) {
              if ((*(ushort *)(pbVar14 + 2) & 0x10) == 0) {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (pbVar14[0x78] <= (byte)iVar8) {
                    uVar9 = FUN_0044a2a8();
                    *(ushort *)(pbVar14 + 2) = *(ushort *)(pbVar14 + 2) | 0x10;
                    pbVar14[0xfd] = pbVar14[0xfd] | 0xc;
                    goto LAB_00449ce9;
                  }
                } while (((&DAT_00743be4)[(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] ==
                          '\x02') ||
                        ((&DAT_00743be4)[(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] ==
                         '\x03'));
              }
              else {
                iVar8 = -1;
                bVar5 = 0;
                do {
                  iVar8 = iVar8 + 1;
                  if (pbVar14[0x78] <= (byte)iVar8) goto LAB_00449ce9;
                  iVar13 = (uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100;
                } while (((&DAT_00743be4)[iVar13] == '\x02') ||
                        ((byte)(&DAT_00743c62)[iVar13] < pbVar14[0x80]));
                *(ushort *)(pbVar14 + 2) = *(ushort *)(pbVar14 + 2) & 0xffef;
                if ((&DAT_00743c47)[iVar13] != '\0') {
                  *(undefined2 *)(pbVar14 + 0x134) =
                       (&DAT_00743b9e)[(uint)*(ushort *)(&DAT_00743be6 + iVar13) * 0x80];
                  pbVar14[0xfd] = pbVar14[0xfd] | 0xc;
                }
              }
            }
          }
          else if (pbVar14[4] == 0xd) {
            if ((pbVar14[0x21] != 0) && ((*(ushort *)(pbVar14 + 2) & 0x480) == 0)) {
              if ((*(ushort *)(pbVar14 + 2) & 0x10) == 0) {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (pbVar14[0x78] <= (byte)iVar8) {
                    *(ushort *)(pbVar14 + 2) = *(ushort *)(pbVar14 + 2) | 0x10;
                    pbVar14[0xfd] = pbVar14[0xfd] | 0xc;
                    bVar5 = 1;
                    break;
                  }
                } while ((&DAT_00743be4)[(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] ==
                         '\x02');
              }
              else {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (pbVar14[0x78] <= (byte)iVar8) {
                    bVar5 = 1;
                    goto LAB_00449ceb;
                  }
                  bVar11 = (byte)((ushort)((ushort)pbVar14[0x80] * 0x20) >> 8);
                } while (((byte)(&DAT_00743c62)
                                [(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] < bVar11) ||
                        ((bVar5 = (byte)((ushort)pbVar14[0x80] * 0x20),
                         (byte)(&DAT_00743c62)
                               [(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] <= bVar11 &&
                         ((byte)(&DAT_00743be5)
                                [(uint)*(ushort *)(pbVar14 + iVar8 * 2 + 0x5e) * 0x100] < bVar5))));
                *(ushort *)(pbVar14 + 2) = *(ushort *)(pbVar14 + 2) & 0xffef;
              }
            }
          }
          else if (((*(ushort *)(pbVar14 + 2) & 0x480) == 0) && (pbVar14[0x21] != 0)) {
            uVar7 = CONCAT11(pbVar14[uVar12 + 0x3a],1) & 0x7fff;
            bVar5 = (byte)uVar7;
            cVar10 = (char)(uVar7 >> 8);
            if (cVar10 != '\0') {
              if ((cVar10 != '\x7f') && ((DAT_0088741c & 0x1f) == 0)) {
                pbVar14[uVar12 + 0x3a] = pbVar14[uVar12 + 0x3a] - 1;
              }
              bVar5 = 0;
            }
          }
          else {
            bVar5 = 0;
            if (((pbVar14[uVar12 + 0x3a] & 0x7f) != 0) &&
               (((pbVar14[uVar12 + 0x3a] & 0x7f) != 0x7f && ((DAT_0088741c & 0x1f) == 0)))) {
              pbVar14[uVar12 + 0x3a] = pbVar14[uVar12 + 0x3a] - 1;
            }
          }
          goto LAB_00449ceb;
        }
        goto LAB_00449d6a;
      }
LAB_00449d74:
      *(short *)(pbVar14 + 0xd2) = *(short *)(pbVar14 + 0xd2) + 1;
      if (0x3bf < *(ushort *)(pbVar14 + 0xd2)) {
        pbVar14[0xd2] = 0;
        pbVar14[0xd3] = 0;
        LOCK();
        pbVar15 = pbVar14 + 0xd0;
        pbVar15[0] = 0;
        pbVar15[1] = 0;
        UNLOCK();
        LOCK();
        uVar2 = *(undefined2 *)(pbVar14 + 0xd4);
        *(undefined2 *)(pbVar14 + 0xd4) = *(undefined2 *)pbVar15;
        UNLOCK();
        LOCK();
        uVar3 = *(undefined2 *)(pbVar14 + 0xd6);
        *(undefined2 *)(pbVar14 + 0xd6) = uVar2;
        UNLOCK();
        LOCK();
        uVar2 = *(undefined2 *)(pbVar14 + 0xd8);
        *(undefined2 *)(pbVar14 + 0xd8) = uVar3;
        UNLOCK();
        LOCK();
        uVar3 = *(undefined2 *)(pbVar14 + 0xda);
        *(undefined2 *)(pbVar14 + 0xda) = uVar2;
        UNLOCK();
        LOCK();
        uVar2 = *(undefined2 *)(pbVar14 + 0xdc);
        *(undefined2 *)(pbVar14 + 0xdc) = uVar3;
        UNLOCK();
        LOCK();
        uVar3 = *(undefined2 *)(pbVar14 + 0xde);
        *(undefined2 *)(pbVar14 + 0xde) = uVar2;
        UNLOCK();
        LOCK();
        uVar2 = *(undefined2 *)(pbVar14 + 0xe0);
        *(undefined2 *)(pbVar14 + 0xe0) = uVar3;
        UNLOCK();
        LOCK();
        uVar3 = *(undefined2 *)(pbVar14 + 0xe2);
        *(undefined2 *)(pbVar14 + 0xe2) = uVar2;
        UNLOCK();
        LOCK();
        uVar2 = *(undefined2 *)(pbVar14 + 0xe4);
        *(undefined2 *)(pbVar14 + 0xe4) = uVar3;
        UNLOCK();
        *(undefined2 *)(pbVar14 + 0xe6) = uVar2;
        pbVar14[0xfd] = pbVar14[0xfd] | 1;
        uVar12 = (uint)*(ushort *)(pbVar14 + 0xe8);
        if ((&DAT_005f5e88)[(uint)*pbVar14 * 4] != 0xff) {
          uVar12 = uVar12 - *(ushort *)
                             (&DAT_0062d580 + (uint)(byte)(&DAT_005f5e88)[(uint)*pbVar14 * 4] * 8);
          if ((&DAT_005f5e89)[(uint)*pbVar14 * 4] != 0xff) {
            uVar12 = (int)((uVar12 + *(ushort *)(pbVar14 + 0x144)) -
                          (uint)*(ushort *)
                                 (&DAT_0062d580 +
                                 (uint)(byte)(&DAT_005f5e89)[(uint)*pbVar14 * 4] * 8)) >> 1;
          }
        }
        *(uint *)(pbVar14 + 0x160) =
             (uint)(ushort)(*(short *)(pbVar14 + 0xd4) + *(short *)(pbVar14 + 0xd6) +
                            *(short *)(pbVar14 + 0xd8) + *(short *)(pbVar14 + 0xda) +
                            *(short *)(pbVar14 + 0xdc) + *(short *)(pbVar14 + 0xde) +
                            *(short *)(pbVar14 + 0xe0) + *(short *)(pbVar14 + 0xe2) +
                            *(short *)(pbVar14 + 0xe4) + *(short *)(pbVar14 + 0xe6)) * 0xc * uVar12;
        pbVar14[0xfd] = pbVar14[0xfd] | 2;
        if (*(ushort *)(pbVar14 + 0x132) != 0xffff) {
          *(uint *)(pbVar14 + 0x164) =
               (uint)*(ushort *)(pbVar14 + 0x132) * -0x10 + *(int *)(pbVar14 + 0x160);
        }
      }
      if ((((*pbVar14 == 0x12) && ((*(ushort *)(pbVar14 + 2) & 1) != 0)) &&
          (((*(ushort *)(pbVar14 + 2) & 0x4c0) == 0 || (pbVar14[0x13c] != 0)))) &&
         (uVar9 = *(ushort *)(pbVar14 + 0xf8), uVar7 = uVar9 + (ushort)pbVar14[0x80] * 0x800,
         *(ushort *)(pbVar14 + 0xf8) = uVar7, uVar9 >> 0xe != uVar7 >> 0xe)) {
        FUN_005e59ec();
        unaff_EDI = (undefined1 *)((uint)pbVar14[0xef] << 2);
        FUN_005e59ec();
      }
      if ((((DAT_0088741c & 3) == 0) && (*pbVar14 == 0x15)) && (pbVar14[0x10d] != 0)) {
        pbVar14[0x126] = pbVar14[0x126] + 1;
        if (0x2f < pbVar14[0x126]) {
          pbVar14[0x10d] = pbVar14[0x10d] - 1;
          unaff_EDI = &DAT_00743b94 + (uint)*(ushort *)(pbVar14 + 0x10e) * 0x100;
          *(short *)(&DAT_00743bc6 + (uint)*(ushort *)(pbVar14 + 0x10e) * 0x100) =
               *(short *)(&DAT_00743bc6 + (uint)*(ushort *)(pbVar14 + 0x10e) * 0x100) + 1;
        }
        uVar12 = 0;
        do {
          uVar9 = *(ushort *)(pbVar14 + uVar12 * 2 + 0x2a);
          if (uVar9 != 0xffff) {
            for (pbVar15 = (byte *)(&DAT_00971ef4)
                                   [(ushort)((ushort)((uVar9 >> 8) << 0xc | (uVar9 & 0xff) << 5) >>
                                             5 | ((ushort)((uVar9 >> 8) << 5) >> 9) << 0xb)];
                ((*pbVar15 & 0x3c) != 8 || (pbVar14[uVar12 + 0x32] != pbVar15[2]));
                pbVar15 = pbVar15 + 8) {
            }
            unaff_EDI = (undefined1 *)((*pbVar15 & 3) << 2 | DAT_00991f88);
            FUN_005e585a(pbVar15);
          }
          uVar12 = uVar12 + 1;
        } while (uVar12 < 4);
      }
      if ((DAT_0088741c & 0xff) == 0) {
        if ((*(ushort *)(pbVar14 + 2) & 0x480) != 0) {
          pbVar14[0x14c] = pbVar14[0x14c] + 1;
        }
        if ((DAT_0088741c & 0x1fff) == 0) {
          bVar5 = pbVar14[0x14c] + pbVar14[0x14d] + pbVar14[0x14e] + pbVar14[0x14f] + pbVar14[0x150]
                  + pbVar14[0x151] + pbVar14[0x152];
          bVar5 = (byte)(CONCAT11(CARRY1(bVar5,pbVar14[0x153]),bVar5 + pbVar14[0x153]) >> 1);
          if (100 < bVar5) {
            bVar5 = 100;
          }
          pbVar14[0x149] = bVar5;
          LOCK();
          bVar5 = pbVar14[0x14c];
          pbVar14[0x14c] = 0;
          UNLOCK();
          LOCK();
          bVar11 = pbVar14[0x14d];
          pbVar14[0x14d] = bVar5;
          UNLOCK();
          LOCK();
          bVar5 = pbVar14[0x14e];
          pbVar14[0x14e] = bVar11;
          UNLOCK();
          LOCK();
          bVar11 = pbVar14[0x14f];
          pbVar14[0x14f] = bVar5;
          UNLOCK();
          LOCK();
          bVar5 = pbVar14[0x150];
          pbVar14[0x150] = bVar11;
          UNLOCK();
          LOCK();
          bVar11 = pbVar14[0x151];
          pbVar14[0x151] = bVar5;
          UNLOCK();
          LOCK();
          bVar5 = pbVar14[0x152];
          pbVar14[0x152] = bVar11;
          UNLOCK();
          pbVar14[0x153] = bVar5;
          pbVar14[0xfd] = pbVar14[0xfd] | 0x10;
        }
        if (((*(ushort *)(pbVar14 + 2) & 0x4c0) == 0) && (pbVar14[0x21] != 0)) {
          bVar5 = pbVar14[0x148];
          uVar7 = (ushort)(DAT_006e3b80 - *(short *)(pbVar14 + 0x130)) >> 3;
          uVar9 = 0;
          if (((uVar7 != 0) &&
              (((uVar9 = (ushort)(bVar5 >> 3), uVar7 != 1 &&
                (uVar9 = (ushort)(bVar5 >> 2), uVar7 != 2)) &&
               (uVar9 = (ushort)(bVar5 >> 1), 4 < uVar7)))) && (uVar9 = (ushort)bVar5, 7 < uVar7)) {
            uVar9 = (ushort)bVar5 << 1;
          }
          pbVar15 = pbVar14 + 0x146;
          *(ushort *)pbVar15 = *(short *)pbVar15 - (bVar5 + uVar9);
          if (*(short *)pbVar15 < 0) {
            pbVar14[0x146] = 0;
            pbVar14[0x147] = 0;
          }
          pbVar14[0xfd] = pbVar14[0xfd] | 0x10;
          uVar9 = *(ushort *)(pbVar14 + 0x146);
          uVar12 = FUN_005df40c();
          if (((uVar12 & 0xfffff) <= 0x6500 - uVar9) &&
             (FUN_004516de(), 0x6500 - uVar9 != 0xffffffff)) {
            FUN_0045174b();
          }
        }
      }
      if (((*(ushort *)(pbVar14 + 2) & 0x1c0) != 0) && ((DAT_0088741c >> 1 & 0xff) == uVar6)) {
        FUN_004519c9();
      }
      if ((DAT_0088741c & 0x7ff) == 0) {
        pbVar15 = pbVar14 + 0x14b;
        *pbVar15 = *pbVar15 + 1;
        if (*pbVar15 == 0) {
          pbVar14[0x14b] = pbVar14[0x14b] - 1;
        }
        if (((((&DAT_00631c74)[pbVar14[0x14a]] != 0) &&
             (*(int *)(&DAT_005f5658 + (uint)*pbVar14 * 4) != 0)) &&
            ((byte)(&DAT_00631c74)[pbVar14[0x14a]] <= pbVar14[0x14b])) &&
           ((*(ushort *)(pbVar14 + 2) & 0x5c0) == 0)) {
          *(ushort *)(pbVar14 + 2) = *(ushort *)(pbVar14 + 2) | 0x100;
          pbVar14[0x13d] = 1;
          uVar12 = 0;
          do {
            pbVar14[0x140] = (byte)uVar12;
            if (*(short *)(pbVar14 + uVar12 * 2 + 0x4a) != -1) goto LAB_0044a22e;
            uVar12 = uVar12 + 1;
          } while (uVar12 < 4);
          pbVar14[0x140] = 0;
        }
      }
    }
LAB_0044a22e:
    pbVar14 = pbVar14 + 0x260;
    uVar6 = uVar6 + 1;
    if (0xfe < uVar6) {
      FUN_00453bf8();
      return;
    }
  } while( true );
LAB_00449ce9:
  bVar5 = 1;
LAB_00449ceb:
  if (bVar5 == 0) {
    puVar1 = (ushort *)(pbVar14 + uVar12 + 0x3a);
    uVar7 = *puVar1;
    *puVar1 = *puVar1 & 0xff7f;
    if ((uVar7 >> 7 & 1) == 0) goto LAB_00449d6a;
  }
  else {
    puVar1 = (ushort *)(pbVar14 + uVar12 + 0x3a);
    uVar7 = *puVar1;
    *puVar1 = *puVar1 | 0x80;
    if ((uVar7 >> 7 & 1) != 0) goto LAB_00449d6a;
  }
  for (pbVar15 = (byte *)(&DAT_00971ef4)
                         [(ushort)((ushort)((uVar9 >> 8) << 0xc | (uVar9 & 0xff) << 5) >> 5 |
                                  ((ushort)((uVar9 >> 8) << 5) >> 9) << 0xb)];
      ((*pbVar15 & 0x3c) != 8 || (pbVar14[uVar12 + 0x32] != pbVar15[2])); pbVar15 = pbVar15 + 8) {
  }
  pbVar15[5] = pbVar15[5] & 0x7f;
  if (bVar5 != 0) {
    pbVar15[5] = pbVar15[5] | 0x80;
  }
  FUN_005e59ec(pbVar15,unaff_EDI);
LAB_00449d6a:
  uVar12 = uVar12 + 1;
  if (3 < uVar12) goto LAB_00449d74;
  goto LAB_00449b12;
}


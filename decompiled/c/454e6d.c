
void thunk_FUN_0045534a(void)

{
  ushort *puVar1;
  undefined2 *puVar2;
  undefined2 uVar3;
  short in_AX;
  short sVar4;
  short sVar5;
  undefined4 in_ECX;
  uint uVar6;
  ushort uVar7;
  undefined4 in_EDX;
  undefined4 extraout_EDX;
  uint extraout_EDX_00;
  short unaff_BX;
  int iVar8;
  short unaff_BP;
  undefined4 *unaff_ESI;
  undefined4 *puVar9;
  bool bVar10;
  
  if (unaff_BP != 2) {
    uVar7 = (ushort)in_EDX;
    if (unaff_BP == 1) {
      if (uVar7 == 2) {
        if (unaff_ESI != (undefined4 *)0x0) {
          (*(code *)unaff_ESI[1])
                    (CONCAT22((short)CONCAT31((int3)((uint)in_ECX >> 8),
                                              *(undefined1 *)(unaff_ESI + 0x5d)),
                              *(undefined2 *)(unaff_ESI + 0xc)));
          FUN_005e3b2b();
          LOCK();
          puVar2 = (undefined2 *)unaff_ESI[2];
          unaff_ESI[2] = 0;
          UNLOCK();
          if (puVar2 != (undefined2 *)0x0) {
            *puVar2 = 0;
          }
          FUN_005e43de();
          DAT_009a1164 = DAT_009a1164 + -0x178;
          if (DAT_009a1164 - (int)unaff_ESI != 0 && (int)unaff_ESI <= DAT_009a1164) {
            uVar6 = (uint)(DAT_009a1164 - (int)unaff_ESI) >> 1;
            puVar9 = unaff_ESI + 0x5e;
            for (; uVar6 != 0; uVar6 = uVar6 - 1) {
              *(undefined2 *)unaff_ESI = *(undefined2 *)puVar9;
              puVar9 = (undefined4 *)((int)puVar9 + 2);
              unaff_ESI = (undefined4 *)((int)unaff_ESI + 2);
            }
          }
          FUN_005e6a83();
        }
        return;
      }
      if ((3 < uVar7) && (uVar7 < 7)) {
        if (((DAT_00991f30 >> 3 & 1) != 0) &&
           ((*(char *)(unaff_ESI + 0x5d) == DAT_00991f5a &&
            (*(short *)(unaff_ESI + 0xc) == DAT_00991f58)))) {
          FUN_005e687d();
          in_EDX = extraout_EDX;
        }
        DAT_00632f03 = '\0';
        if (((((short)in_EDX == 4) && (*(short *)(unaff_ESI + 0x59) == 0)) && (unaff_ESI[2] != 0))
           && ((*(ushort *)(unaff_ESI[2] + 0x12) & 0x800) == 0)) {
          DAT_00632f03 = '\x01';
        }
        sVar4 = (short)in_EDX + -4;
        iVar8 = CONCAT22((short)((uint)in_EDX >> 0x10),sVar4);
        *(short *)(unaff_ESI + 0x59) = sVar4;
        *(undefined2 *)(unaff_ESI + 0x5a) = 0;
        LOCK();
        puVar2 = (undefined2 *)unaff_ESI[2];
        unaff_ESI[2] = 0;
        UNLOCK();
        if (puVar2 != (undefined2 *)0x0) {
          *puVar2 = 0;
        }
        unaff_ESI[3] = (&DAT_00632db0)[iVar8];
        unaff_ESI[6] = (&DAT_00632dbc)[iVar8];
        *unaff_ESI = (&PTR_DAT_00632d98)[iVar8];
        unaff_ESI[1] = (&PTR_thunk_FUN_0045534a_00632da4)[iVar8];
        unaff_ESI[5] = 0;
        unaff_ESI[7] = (&PTR_DAT_00632d8c)[iVar8];
        FUN_00455a66();
        FUN_005e43de();
        (*(code *)unaff_ESI[1])();
        (*(code *)*unaff_ESI)(puVar2,unaff_ESI,2,&stack0x00000000);
        FUN_005e412c();
        FUN_005e43de();
        if ((DAT_00632f03 != '\0') && (unaff_ESI[2] != 0)) {
          puVar1 = (ushort *)(unaff_ESI[2] + 0x12);
          *puVar1 = *puVar1 | 0x800;
        }
        if ((*(short *)(unaff_ESI + 0x59) == 0) &&
           ((&DAT_00743bbf)[(uint)*(ushort *)(unaff_ESI + 0xc) * 0x100] == '\t')) {
          (*(code *)unaff_ESI[1])();
        }
        return;
      }
      if (uVar7 == 0xb) {
        if ((unaff_ESI[2] != 0) && (uVar6 = unaff_ESI[0x57], uVar6 != 0xffffffff)) {
          if ((uVar6 & 0x80000000) == 0) {
            bVar10 = ((uint)unaff_ESI[0x58] >> 0xf & 1) != 0;
          }
          else {
            bVar10 = 0xff8bc46b < (uVar6 & 0xffff) << 8;
          }
          FUN_005e68e2();
          if (!bVar10) {
            FUN_005e18d4();
          }
          return;
        }
      }
      else {
        bVar10 = uVar7 < 0xd;
        if (uVar7 == 0xd) {
          FUN_005e680e();
          if (!bVar10) {
            uVar7 = *(ushort *)(unaff_ESI + 0xc);
            *(undefined2 *)((int)unaff_ESI + 0x166) = (&DAT_00743ba2)[(uint)uVar7 * 0x80];
            FUN_0044151b();
            FUN_005e53ca();
            FUN_00444927();
            FUN_0044142c();
            (&DAT_00743bbf)[(uint)uVar7 * 0x100] = 9;
            FUN_00441452();
            return;
          }
        }
        else {
          bVar10 = uVar7 < 0xc;
          if (uVar7 != 0xc) {
            bVar10 = uVar7 == 10;
            if (!bVar10) {
              return;
            }
            FUN_005e5fcb();
            if (bVar10) {
              uVar3 = *(undefined2 *)(unaff_ESI + 0xc);
              FUN_005e3f31();
              unaff_ESI[7] = &DAT_00632eac;
              unaff_ESI[3] = unaff_ESI[3] | 0x1c;
              FUN_005e412c();
              *(ushort *)((int)unaff_ESI + 0x32) = *(ushort *)((int)unaff_ESI + 0x32) | 0x10;
              *(undefined2 *)(unaff_ESI + 0xc) = uVar3;
            }
            return;
          }
          FUN_005e680e();
          if (!bVar10) {
            FUN_00424db7();
            FUN_005e0c2f();
            DAT_0099a4e6 = *(undefined2 *)(unaff_ESI + 0xc);
            FUN_005e6028();
            return;
          }
        }
      }
    }
    else {
      if (unaff_BP == 0) {
        if ((((DAT_00991f30 >> 3 & 1) != 0) && (*(char *)(unaff_ESI + 0x5d) == DAT_00991f5a)) &&
           (*(short *)(unaff_ESI + 0xc) == DAT_00991f58)) {
          FUN_005e687d();
        }
        return;
      }
      if (unaff_BP == 6) {
        *(short *)(unaff_ESI + 0x5a) = *(short *)(unaff_ESI + 0x5a) + 1;
        FUN_005e5301();
        return;
      }
      if (unaff_BP == 7) {
        if (uVar7 != 0xd) {
          if (uVar7 != 0xc) {
            return;
          }
          return;
        }
        DAT_00991f64 = 0xffffffff;
        sVar4 = unaff_BX;
        FUN_00431510();
        if ((char)unaff_BX != '\0') {
          DAT_00991f68 = in_AX + -1;
          DAT_00991f6a = sVar4 + 0x10;
          *(short *)(unaff_ESI + 0x5b) = *(short *)(unaff_ESI + 0x5b) + 1;
          if (0x2f < *(ushort *)(unaff_ESI + 0x5b)) {
            *(undefined2 *)(unaff_ESI + 0x5b) = 0;
          }
          iVar8 = (uint)*(ushort *)(unaff_ESI + 0xc) * 0x100;
          DAT_00991f64 = *(int *)((&PTR_DAT_0062d640)[(uint)(byte)(&DAT_00743bc1)[iVar8] * 2] + 0x58
                                 ) + (uint)(*(ushort *)(unaff_ESI + 0x5b) >> 2) |
                         (uint)(byte)(&DAT_00743bc4)[iVar8] << 0x11 |
                         (uint)(byte)(&DAT_00743bc5)[iVar8] << 0x18 | 0xa0000000;
          return;
        }
      }
      else if (unaff_BP == 8) {
        if (uVar7 == 0xd) {
          sVar4 = FUN_00435005();
          if (sVar4 != -0x8000) {
            sVar4 = sVar4 + 0x10;
            sVar5 = unaff_BX + 0x20;
            bVar10 = false;
            FUN_0042547b(sVar5,sVar4);
            if (!bVar10) {
              bVar10 = 0xfd < (byte)(extraout_EDX_00 >> 2);
              FUN_00436fae(extraout_EDX_00,sVar5,sVar4);
              if (((!bVar10) || (DAT_00991efc == 0x3b7)) || (DAT_00991efc == 0x4db)) {
                iVar8 = (uint)*(ushort *)(unaff_ESI + 0xc) * 0x100;
                FUN_00444927();
                FUN_005e53ca();
                FUN_0044142c();
                (&DAT_00743bbf)[iVar8] = 0;
                FUN_00441452();
                (&DAT_00743c05)[iVar8] = 0xff;
                (&DAT_00743c01)[iVar8] = 0;
                (&DAT_00743c04)[iVar8] = 0;
                (&DAT_00743c02)[iVar8] = 0;
                (&DAT_00743c58)[iVar8] = 0;
                FUN_005e687d();
                DAT_00991f64 = 0xffffffff;
                return;
              }
            }
            FUN_00427108();
            return;
          }
        }
        else {
          if (uVar7 != 0xc) {
            return;
          }
          sVar4 = FUN_00434fbb();
          if (sVar4 != -0x8000) {
            FUN_00426f56();
            return;
          }
        }
      }
      else {
        if (unaff_BP == 0x10) goto LAB_0045532f;
        if (unaff_BP == 0xb) {
          if (uVar7 != 0xd) {
            if (uVar7 != 0xc) {
              return;
            }
            FUN_00424de2();
            FUN_005e0c5a();
            DAT_0099a4e6 = 0xffff;
            FUN_005e6028();
            return;
          }
          uVar7 = *(ushort *)(unaff_ESI + 0xc);
          iVar8 = (uint)uVar7 * 0x100;
          if ((&DAT_00743bbf)[iVar8] == '\t') {
            FUN_00444927();
            FUN_005e53ca();
            if ((&DAT_00743ba2)[(uint)uVar7 * 0x80] != -0x8000) {
              FUN_0044142c();
              (&DAT_00743bbf)[iVar8] = 0;
              FUN_00441452();
              (&DAT_00743c05)[iVar8] = 0xff;
              (&DAT_00743c01)[iVar8] = 0;
              (&DAT_00743c04)[iVar8] = 0;
              (&DAT_00743c02)[iVar8] = 0;
              (&DAT_00743c58)[iVar8] = 0;
            }
            DAT_00991f64 = 0xffffffff;
            return;
          }
        }
      }
    }
    return;
  }
  FUN_00455a66();
LAB_0045532f:
  FUN_00455ade();
  return;
}


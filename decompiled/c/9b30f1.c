
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_009b30f1(void)

{
  undefined1 uVar1;
  undefined4 uVar2;
  ushort uVar3;
  undefined4 in_EAX;
  short in_CX;
  ushort uVar4;
  short sVar5;
  uint uVar6;
  short sVar7;
  ushort uVar8;
  undefined4 in_EDX;
  short unaff_BX;
  short sVar9;
  ushort uVar10;
  int iVar11;
  uint unaff_EBP;
  uint uVar12;
  uint uVar13;
  undefined4 *puVar14;
  undefined1 *puVar15;
  byte *pbVar16;
  undefined2 *puVar17;
  int iVar18;
  int iVar19;
  int *unaff_EDI;
  ushort local_1a;
  
  sVar9 = (short)in_EAX;
  if (((((sVar9 <= unaff_BX) && (sVar7 = (short)in_EDX, in_CX <= sVar7)) &&
       ((short)unaff_EDI[1] <= unaff_BX)) &&
      ((sVar9 < (short)((short)unaff_EDI[1] + (short)unaff_EDI[2]) &&
       (*(short *)((int)unaff_EDI + 6) <= sVar7)))) &&
     (in_CX < (short)(*(short *)((int)unaff_EDI + 6) + *(short *)((int)unaff_EDI + 10)))) {
    uVar1 = (undefined1)unaff_EBP;
    if ((unaff_EBP & 0x1000000) != 0) {
      uVar10 = sVar9 - (short)unaff_EDI[1];
      uVar3 = uVar10;
      local_1a = 0;
      if ((short)uVar10 < 0) {
        uVar3 = 0;
        local_1a = uVar10;
      }
      sVar9 = (unaff_BX - (short)unaff_EDI[1]) + 1;
      if ((short)unaff_EDI[2] < sVar9) {
        sVar9 = (short)unaff_EDI[2];
      }
      uVar10 = in_CX - *(short *)((int)unaff_EDI + 6);
      if ((short)uVar10 < 0) {
        local_1a = local_1a ^ uVar10;
        uVar10 = 0;
      }
      sVar7 = (sVar7 - *(short *)((int)unaff_EDI + 6)) + 1;
      if (*(short *)((int)unaff_EDI + 10) < sVar7) {
        sVar7 = *(short *)((int)unaff_EDI + 10);
      }
      sVar7 = sVar7 - uVar10;
      uVar6 = (uint)(short)uVar10;
      puVar15 = (undefined1 *)
                ((ushort)((short)unaff_EDI[3] + (short)unaff_EDI[2]) * uVar6 + (uint)uVar3 +
                *unaff_EDI);
      iVar11 = unaff_EDI[3];
      iVar19 = unaff_EDI[2];
      do {
        uVar6 = CONCAT22((ushort)(uVar6 >> 0x11) |
                         (ushort)(((uint)((local_1a & 1) != 0) << 0x1f) >> 0x10),sVar9 - uVar3);
        do {
          if ((int)(uVar6 ^ 0x80000000) < 0) {
            *puVar15 = uVar1;
          }
          puVar15 = puVar15 + 1;
          sVar5 = (short)uVar6 + -1;
          uVar6 = CONCAT22((short)((uVar6 ^ 0x80000000) >> 0x10),sVar5);
        } while (sVar5 != 0);
        local_1a = local_1a ^ 1;
        puVar15 = puVar15 + (ushort)(((short)iVar11 + (short)iVar19) - (sVar9 - uVar3));
        sVar7 = sVar7 + -1;
      } while (sVar7 != 0);
      return CONCAT44(in_EDX,in_EAX);
    }
    if ((unaff_EBP & 0x4000000) != 0) {
      DAT_009aa034 = 0;
      uVar3 = sVar9 - (short)unaff_EDI[1];
      if ((short)uVar3 < 0) {
        DAT_009aa034 = (ushort)-uVar3 & 0x3f;
        uVar3 = 0;
      }
      sVar9 = (unaff_BX - (short)unaff_EDI[1]) + 1;
      if ((short)unaff_EDI[2] < sVar9) {
        sVar9 = (short)unaff_EDI[2];
      }
      DAT_009aa038 = 0;
      sVar5 = in_CX - *(short *)((int)unaff_EDI + 6);
      if (sVar5 < 0) {
        DAT_009aa038 = (ushort)-sVar5 & 0x3f;
        sVar5 = 0;
      }
      sVar7 = (sVar7 - *(short *)((int)unaff_EDI + 6)) + 1;
      if (*(short *)((int)unaff_EDI + 10) < sVar7) {
        sVar7 = *(short *)((int)unaff_EDI + 10);
      }
      puVar17 = (undefined2 *)
                ((uint)(ushort)((short)unaff_EDI[2] + (short)unaff_EDI[3]) * (int)sVar5 +
                 (uint)uVar3 + *unaff_EDI);
      DAT_009aa03c = (uint)(ushort)(sVar9 - uVar3);
      _DAT_009aa040 = (uint)(ushort)(sVar7 - sVar5);
      _DAT_009aa044 = (ushort)((short)unaff_EDI[2] + (short)unaff_EDI[3]) - DAT_009aa03c;
      uVar6 = unaff_EBP & 0x7f;
      if ((uVar6 != 0) && ((unaff_EBP & 0x18000000) == 0)) {
        iVar11 = DAT_009aa038 * 0x40 +
                 (&DAT_008dc0b4)[(uint)*(ushort *)(&DAT_009aa244 + uVar6 * 2) * 4];
        do {
          uVar6 = DAT_009aa03c >> 1;
          uVar12 = DAT_009aa034;
          if ((DAT_009aa03c & 1) != 0) {
            uVar12 = DAT_009aa034 + 1;
            *(undefined1 *)puVar17 = *(undefined1 *)(DAT_009aa034 + iVar11);
            uVar12 = uVar12 & 0x3f;
            puVar17 = (undefined2 *)((int)puVar17 + 1);
          }
          for (; uVar6 != 0; uVar6 = uVar6 - 1) {
            uVar13 = uVar12 + 1 & 0x3f;
            *puVar17 = CONCAT11(*(undefined1 *)(uVar13 + iVar11),*(undefined1 *)(uVar12 + iVar11));
            puVar17 = puVar17 + 1;
            uVar12 = uVar13 + 1 & 0x3f;
          }
          DAT_009aa038 = DAT_009aa038 + 1;
          iVar19 = iVar11 + 0x40;
          if (0x3f < DAT_009aa038) {
            DAT_009aa038 = 0;
            iVar19 = iVar11 + -0xfc0;
          }
          puVar17 = (undefined2 *)((int)puVar17 + _DAT_009aa044);
          _DAT_009aa040 = _DAT_009aa040 - 1;
          iVar11 = iVar19;
        } while (_DAT_009aa040 != 0);
        return CONCAT44(in_EDX,in_EAX);
      }
      iVar11 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + uVar6 * 4) * 4];
      if ((unaff_EBP & 0x8000000) != 0) {
        iVar11 = iVar11 + 1;
      }
      if ((unaff_EBP & 0x10000000) != 0) {
        iVar11 = iVar11 + -1;
      }
      iVar19 = DAT_009aa038 * 0x40;
      do {
        uVar6 = DAT_009aa03c >> 1;
        uVar12 = DAT_009aa034;
        if ((DAT_009aa03c & 1) != 0) {
          uVar12 = DAT_009aa034 + 1;
          *(undefined1 *)puVar17 = *(undefined1 *)((uint)*(byte *)(DAT_009aa034 + iVar19) + iVar11);
          uVar12 = uVar12 & 0x3f;
          puVar17 = (undefined2 *)((int)puVar17 + 1);
        }
        for (; uVar6 != 0; uVar6 = uVar6 - 1) {
          *(undefined1 *)puVar17 = *(undefined1 *)((uint)*(byte *)(uVar12 + iVar19) + iVar11);
          uVar12 = uVar12 + 1 & 0x3f;
          *(undefined1 *)((int)puVar17 + 1) =
               *(undefined1 *)((uint)*(byte *)(uVar12 + iVar19) + iVar11);
          puVar17 = puVar17 + 1;
          uVar12 = uVar12 + 1 & 0x3f;
        }
        DAT_009aa038 = DAT_009aa038 + 1;
        iVar18 = iVar19 + 0x40;
        if (0x3f < DAT_009aa038) {
          DAT_009aa038 = 0;
          iVar18 = iVar19 + -0xfc0;
        }
        puVar17 = (undefined2 *)((int)puVar17 + _DAT_009aa044);
        _DAT_009aa040 = _DAT_009aa040 - 1;
        iVar19 = iVar18;
      } while (_DAT_009aa040 != 0);
      return CONCAT44(in_EDX,in_EAX);
    }
    uVar3 = sVar9 - (short)unaff_EDI[1];
    if ((short)uVar3 < 0) {
      uVar3 = 0;
    }
    sVar9 = (unaff_BX - (short)unaff_EDI[1]) + 1;
    if ((short)unaff_EDI[2] < sVar9) {
      sVar9 = (short)unaff_EDI[2];
    }
    uVar10 = sVar9 - uVar3;
    sVar9 = in_CX - *(short *)((int)unaff_EDI + 6);
    if (sVar9 < 0) {
      sVar9 = 0;
    }
    sVar7 = (sVar7 - *(short *)((int)unaff_EDI + 6)) + 1;
    if (*(short *)((int)unaff_EDI + 10) < sVar7) {
      sVar7 = *(short *)((int)unaff_EDI + 10);
    }
    uVar8 = sVar7 - sVar9;
    if ((unaff_EBP & 0x2000000) != 0) {
      if (*(ushort *)((int)unaff_EDI + 0xe) == 1) {
        uVar10 = uVar10 >> 1;
        uVar8 = uVar8 >> 1;
        pbVar16 = (byte *)((uint)(ushort)((*(ushort *)(unaff_EDI + 2) >> 1) + (short)unaff_EDI[3]) *
                           (int)sVar9 + (uint)uVar3 + *unaff_EDI);
        iVar11 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + (unaff_EBP & 0x7f) * 4) * 4];
        uVar3 = *(ushort *)(unaff_EDI + 2);
        iVar19 = unaff_EDI[3];
        uVar4 = uVar10;
        do {
          do {
            *pbVar16 = *(byte *)((uint)*pbVar16 + iVar11);
            pbVar16 = pbVar16 + 1;
            uVar4 = uVar4 - 1;
          } while (uVar4 != 0);
          pbVar16 = pbVar16 + (short)(((uVar3 >> 1) + (short)iVar19) - uVar10);
          uVar8 = uVar8 - 1;
          uVar4 = uVar10;
        } while (uVar8 != 0);
        return CONCAT44(in_EDX,in_EAX);
      }
      if (*(ushort *)((int)unaff_EDI + 0xe) < 2) {
        pbVar16 = (byte *)((uint)(ushort)((short)unaff_EDI[2] + (short)unaff_EDI[3]) * (int)sVar9 +
                           (uint)uVar3 + *unaff_EDI);
        iVar11 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + (unaff_EBP & 0x7f) * 4) * 4];
        iVar19 = unaff_EDI[2];
        iVar18 = unaff_EDI[3];
        uVar3 = uVar10;
        do {
          do {
            *pbVar16 = *(byte *)((uint)*pbVar16 + iVar11);
            pbVar16 = pbVar16 + 1;
            uVar3 = uVar3 - 1;
          } while (uVar3 != 0);
          pbVar16 = pbVar16 + (short)(((short)iVar19 + (short)iVar18) - uVar10);
          uVar8 = uVar8 - 1;
          uVar3 = uVar10;
        } while (uVar8 != 0);
        return CONCAT44(in_EDX,in_EAX);
      }
      uVar10 = uVar10 >> 2;
      uVar8 = uVar8 >> 2;
      pbVar16 = (byte *)((uint)(ushort)((*(ushort *)(unaff_EDI + 2) >> 2) + (short)unaff_EDI[3]) *
                         (int)sVar9 + (uint)uVar3 + *unaff_EDI);
      iVar11 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + (unaff_EBP & 0x7f) * 4) * 4];
      uVar3 = *(ushort *)(unaff_EDI + 2);
      iVar19 = unaff_EDI[3];
      uVar4 = uVar10;
      do {
        do {
          *pbVar16 = *(byte *)((uint)*pbVar16 + iVar11);
          pbVar16 = pbVar16 + 1;
          uVar4 = uVar4 - 1;
        } while (uVar4 != 0);
        pbVar16 = pbVar16 + (short)(((uVar3 >> 2) + (short)iVar19) - uVar10);
        uVar8 = uVar8 - 1;
        uVar4 = uVar10;
      } while (uVar8 != 0);
      return CONCAT44(in_EDX,in_EAX);
    }
    puVar14 = (undefined4 *)
              ((uint)(ushort)((short)unaff_EDI[2] + (short)unaff_EDI[3]) * (int)sVar9 + (uint)uVar3
              + *unaff_EDI);
    uVar2 = CONCAT31(CONCAT21(CONCAT11(uVar1,uVar1),uVar1),uVar1);
    iVar11 = unaff_EDI[2];
    iVar19 = unaff_EDI[3];
    do {
      if ((uVar10 & 1) != 0) {
        *(undefined1 *)puVar14 = uVar1;
        puVar14 = (undefined4 *)((int)puVar14 + 1);
      }
      uVar6 = (uint)(uVar10 >> 2);
      if ((uVar10 >> 1 & 1) != 0) {
        *(short *)puVar14 = (short)uVar2;
        puVar14 = (undefined4 *)((int)puVar14 + 2);
      }
      for (; uVar6 != 0; uVar6 = uVar6 - 1) {
        *puVar14 = uVar2;
        puVar14 = puVar14 + 1;
      }
      puVar14 = (undefined4 *)
                ((int)puVar14 + ((uint)(ushort)((short)iVar11 + (short)iVar19) - (uint)uVar10));
      uVar8 = uVar8 - 1;
    } while (uVar8 != 0);
  }
  return CONCAT44(in_EDX,in_EAX);
}



/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_005e613e(void)

{
  byte bVar1;
  ushort uVar2;
  uint in_EAX;
  undefined4 uVar3;
  uint uVar4;
  uint uVar5;
  uint uVar6;
  short sVar7;
  undefined2 extraout_CX;
  undefined2 extraout_CX_00;
  undefined4 extraout_ECX;
  uint uVar8;
  short sVar9;
  byte *pbVar10;
  byte *pbVar11;
  undefined4 extraout_EDX;
  char cVar12;
  short sVar13;
  undefined2 uVar14;
  undefined4 unaff_EBX;
  uint uVar15;
  int iVar16;
  undefined4 unaff_EBP;
  int unaff_ESI;
  ushort uVar17;
  int iVar18;
  undefined8 uVar19;
  
  DAT_0099fdf0 = (short)in_EAX;
  sVar13 = (short)unaff_EBX;
  DAT_0099fdf2 = sVar13;
  if ((_DAT_0099a500 & 1) == 0) {
    uVar19 = FUN_00431510();
    pbVar11 = (byte *)((ulonglong)uVar19 >> 0x20);
    uVar6 = (uint)uVar19;
    cVar12 = (char)unaff_EBX;
    if (cVar12 == '\x03') {
      uVar8 = (uint)pbVar11[7];
      iVar16 = uVar8 * 0x260;
      if ((*pbVar11 & 0x3c) == 0x10) {
        if (pbVar11[4] != 0) {
          DAT_005f54f0 = 0x56d;
          if (1 < (byte)(&DAT_00887497)[iVar16]) {
            DAT_005f54f0 = 0x56e;
          }
          DAT_005f54f2 = (&DAT_00887442)[uVar8 * 0x130];
          _DAT_005f54f4 = (undefined2)(&DAT_00887444)[uVar8 * 0x98];
          _DAT_005f54f6 = (undefined2)((uint)(&DAT_00887444)[uVar8 * 0x98] >> 0x10);
          uVar5 = (pbVar11[5] & 0x70) >> 4;
          uVar15 = uVar5;
          do {
            if ((&DAT_0088744a)[uVar8 * 0x130 + uVar15] == -1) {
              uVar5 = uVar5 - 1;
            }
            uVar15 = uVar15 - 1;
          } while (-1 < (int)uVar15);
          _DAT_005f54fa = (short)uVar5 + 1;
          return uVar6;
        }
        DAT_005f54f2 = 0x56b;
        if (1 < (byte)(&DAT_00887497)[iVar16]) {
          DAT_005f54f2 = 0x56c;
        }
        _DAT_005f54f4 = (&DAT_00887442)[uVar8 * 0x130];
        _DAT_005f54f6 = (undefined2)(&DAT_00887444)[uVar8 * 0x98];
        _DAT_005f54f8 = (short)((uint)(&DAT_00887444)[uVar8 * 0x98] >> 0x10);
        uVar4 = (pbVar11[5] & 0x70) >> 4;
        uVar15 = uVar4;
        uVar5 = uVar4;
        do {
          if ((&DAT_0088744a)[uVar8 * 0x130 + uVar5] == -1) {
            uVar15 = uVar15 - 1;
          }
          uVar5 = uVar5 - 1;
        } while (-1 < (int)uVar5);
        _DAT_005f54fc = (short)uVar15 + 1;
        uVar17 = 0;
        if ((&DAT_00887462)[uVar8 * 0x130 + uVar4] != -1) {
          uVar17 = (ushort)(byte)(&DAT_0088747a)[iVar16 + uVar4];
        }
        _DAT_005f5500 = CONCAT22(DAT_005f5500_2,uVar17);
        _DAT_005f54fe = 0x4f3;
        if ((uVar17 != 0) && (_DAT_005f54fe = 0x4f4, uVar17 != 1)) {
          _DAT_005f54fe = 0x4f5;
        }
        DAT_005f54f0 = 0x7ee;
        return uVar6;
      }
      bVar1 = pbVar11[4];
      if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
        DAT_005f54f2 = (&DAT_00887442)[uVar8 * 0x130];
        _DAT_005f54f4 = (undefined2)(&DAT_00887444)[uVar8 * 0x98];
        _DAT_005f54f6 = (undefined2)((uint)(&DAT_00887444)[uVar8 * 0x98] >> 0x10);
        uVar3 = FUN_0044c219(pbVar11,extraout_ECX);
        _DAT_005f54f8 = sVar13;
        _DAT_005f54fa = (short)uVar3;
        _DAT_005f54fc = (short)((uint)uVar3 >> 0x10);
        DAT_005f54f0 = 0x7ee;
        return uVar6;
      }
      DAT_005f54f2 = 0x569;
      if (1 < (byte)(&DAT_00887497)[iVar16]) {
        DAT_005f54f2 = 0x56a;
      }
      _DAT_005f54f4 = (&DAT_00887442)[uVar8 * 0x130];
      _DAT_005f54f6 = (undefined2)(&DAT_00887444)[uVar8 * 0x98];
      _DAT_005f54f8 = (short)((uint)(&DAT_00887444)[uVar8 * 0x98] >> 0x10);
      bVar1 = (&DAT_00887420)[iVar16];
      _DAT_005f54fa = *(short *)(&DAT_005f5806 + (uint)bVar1 * 8) + 2;
      uVar5 = (pbVar11[5] & 0x70) >> 4;
      uVar15 = uVar5;
      do {
        if ((&DAT_0088744a)[uVar8 * 0x130 + uVar15] == -1) {
          uVar5 = uVar5 - 1;
        }
        uVar15 = uVar15 - 1;
      } while (-1 < (int)uVar15);
      _DAT_005f54fc = (short)uVar5 + 1;
      _DAT_005f5500 = FUN_0044c219(pbVar11,extraout_ECX);
      _DAT_005f54fe = (ushort)bVar1;
      DAT_005f54f0 = 0x7ee;
      return uVar6;
    }
    if (cVar12 == '\x02') {
      bVar1 = *pbVar11;
      if (bVar1 == 0) {
        uVar8 = (uint)pbVar11[0x30];
        DAT_005f54f2 = 0x4c8;
        _DAT_005f54f4 = (&DAT_00887442)[uVar8 * 0x130];
        _DAT_005f54f6 = (undefined2)(&DAT_00887444)[uVar8 * 0x98];
        _DAT_005f54f8 = (short)((uint)(&DAT_00887444)[uVar8 * 0x98] >> 0x10);
        _DAT_005f54fa =
             *(short *)(&DAT_005f5802 + (uint)(byte)(&DAT_00887420)[uVar8 * 0x260] * 8) + 2;
        for (pbVar10 = pbVar11; pbVar10[1] != 0;
            pbVar10 = &DAT_00743b94 + (uint)*(ushort *)(pbVar10 + 0x40) * 0x100) {
        }
        iVar16 = -1;
        do {
          iVar18 = iVar16;
          iVar16 = iVar18 + 1;
        } while (*(short *)(pbVar10 + 10) != *(short *)(&DAT_0088747e + iVar16 * 2 + uVar8 * 0x260))
        ;
        sVar13 = (short)iVar18 + 2;
        _DAT_005f54fc = sVar13;
        _DAT_005f5500 = FUN_0044c219(pbVar10,pbVar11,0);
        _DAT_005f54fe = sVar13;
        DAT_005f54f0 = 0x7ee;
        return uVar6;
      }
      if (bVar1 == 1) goto LAB_005e6524;
      if ((bVar1 == 2) && (pbVar11[1] == 8)) {
        return uVar6;
      }
    }
    else if (cVar12 == '\b') {
      DAT_005f54f0 = DAT_0087c3ac;
      DAT_005f54f2 = (undefined2)DAT_0087c3b0;
      _DAT_005f54f4 = (undefined2)((uint)DAT_0087c3b0 >> 0x10);
      return uVar6;
    }
    iVar16 = unaff_ESI;
    in_EAX = FUN_005e3ace();
    if (((unaff_ESI != 0) && (pbVar11 = *(byte **)(unaff_ESI + 8), pbVar11 != (byte *)0x0)) &&
       (pbVar11[0x10] < 2)) {
      uVar2 = (DAT_0099fdf0 - *(short *)(pbVar11 + 4) << (pbVar11[0x10] & 0x1f)) +
              *(short *)(pbVar11 + 8);
      in_EAX = (uint)uVar2;
      sVar13 = (DAT_0099fdf2 - *(short *)(pbVar11 + 6) << (pbVar11[0x10] & 0x1f)) +
               *(short *)(pbVar11 + 10);
      unaff_EBP = CONCAT22((short)((uint)unaff_EBP >> 0x10),0xffff);
      for (uVar17 = DAT_0087c398; uVar17 != 0xffff; uVar17 = (&DAT_00743b98)[(uint)uVar17 * 0x80]) {
        iVar18 = (uint)uVar17 * 0x100;
        if (*(short *)(&DAT_00743baa + iVar18) != -0x8000) {
          sVar7 = ((short)(*(short *)(&DAT_00743baa + iVar18) + *(short *)(&DAT_00743bae + iVar18))
                  >> 1) - uVar2;
          if (sVar7 < 0) {
            sVar7 = -sVar7;
          }
          sVar9 = ((short)(*(short *)(&DAT_00743bac + iVar18) + *(short *)(&DAT_00743bb0 + iVar18))
                  >> 1) - sVar13;
          if (sVar9 < 0) {
            sVar9 = -sVar9;
          }
          if ((!SCARRY2(sVar7,sVar9)) && ((ushort)(sVar7 + sVar9) < (ushort)unaff_EBP)) {
            unaff_EBP = CONCAT22((short)((uint)unaff_EBP >> 0x10),sVar7 + sVar9);
            pbVar11 = &DAT_00743b94 + iVar18;
          }
        }
      }
      if ((ushort)unaff_EBP < 0x21) {
        unaff_EBX = CONCAT31((int3)(CONCAT22((short)((uint)unaff_EBX >> 0x10),sVar13) >> 8),2);
        unaff_ESI = iVar16;
LAB_005e6524:
        uVar14 = (undefined2)unaff_EBX;
        if (pbVar11[0x2e] != 0) {
          DAT_005f54f0 = 0x5ca;
          DAT_005f54f2 = *(undefined2 *)(pbVar11 + 0x22);
          _DAT_005f54f4 = (undefined2)*(undefined4 *)(pbVar11 + 0x9c);
          _DAT_005f54f6 = (undefined2)((uint)*(undefined4 *)(pbVar11 + 0x9c) >> 0x10);
          uVar19 = FUN_00440143(pbVar11,unaff_EBX);
          _DAT_005f54f8 = uVar14;
          _DAT_005f54fa = extraout_CX_00;
          _DAT_005f54fc = (short)((ulonglong)uVar19 >> 0x20);
          _DAT_005f54fe = (ushort)((ulonglong)uVar19 >> 0x30);
          return (uint)uVar19;
        }
        DAT_005f54f0 = 0x5c8;
        if ((*(ushort *)(pbVar11 + 200) & 8) != 0) {
          DAT_005f54f0 = 0x5c9;
        }
        _DAT_005f54f6 = *(undefined2 *)(pbVar11 + 0x22);
        _DAT_005f54f8 = (short)*(undefined4 *)(pbVar11 + 0x9c);
        _DAT_005f54fa = (short)((uint)*(undefined4 *)(pbVar11 + 0x9c) >> 0x10);
        FUN_00440143(pbVar11,unaff_EBX);
        _DAT_005f54fc = uVar14;
        _DAT_005f54fe = extraout_CX;
        _DAT_005f5500 = extraout_EDX;
        uVar6 = FUN_0043fdfb(unaff_ESI,unaff_EBX);
        DAT_005f54f2 = (undefined2)unaff_EBP;
        _DAT_005f54f4 = (undefined2)((uint)unaff_EBP >> 0x10);
        return uVar6;
      }
    }
  }
  return in_EAX;
}


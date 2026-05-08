
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_005d6a1d(void)

{
  byte bVar1;
  short sVar2;
  ushort uVar3;
  undefined4 in_EAX;
  uint uVar4;
  short sVar5;
  ushort uVar6;
  uint in_ECX;
  uint extraout_ECX;
  byte *pbVar7;
  uint in_EDX;
  uint uVar8;
  short *psVar9;
  undefined4 unaff_EBX;
  char *pcVar10;
  int iVar11;
  byte *pbVar12;
  undefined4 unaff_ESI;
  uint uVar13;
  undefined8 uVar14;
  undefined6 uVar15;
  short sStack_20;
  short sVar16;
  
  uVar15 = CONCAT24(DAT_0099a4e2,in_EAX);
  DAT_006522ab = (char)unaff_EBX;
  DAT_00652289 = (undefined1)((uint)unaff_EBX >> 8);
  if (DAT_00656b34 == '\x14') {
    if (DAT_006522ab == '\0') {
      DAT_0099a02c._0_2_ = 0xffff;
      DAT_0099a4de = (short)in_EAX;
      DAT_0099a4e0 = (short)in_ECX;
      uVar15 = FUN_00423677();
      DAT_0099a4e4 = DAT_00652290;
    }
    DAT_0099a4e2 = (undefined2)((uint6)uVar15 >> 0x20);
    if (DAT_006522ab == '\x01') {
      DAT_006522ac = 0;
    }
    if (DAT_006522ab == '\x03') {
      DAT_006522ac = DAT_006522ac & 0xffff0000;
    }
    if (_DAT_00656b6c == 0) {
      if (DAT_006522ab == '\0') {
        _DAT_0099a020 = _DAT_0099a020 & 0xfff7 | 6;
        FUN_0043642b();
      }
      return CONCAT44(in_EDX,in_EAX);
    }
                    /* WARNING: Could not recover jumptable at 0x005d6e48. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    uVar14 = (*(code *)(&PTR_LAB_005d6e50)[DAT_00652290])((short)uVar15);
    return uVar14;
  }
  uVar8 = in_EDX;
  if (DAT_006522ab == '\0') {
    DAT_0099a02c._0_2_ = 0xffff;
    DAT_0099a4de = (short)in_EAX;
    DAT_0099a4e0 = (short)in_ECX;
    uVar15 = FUN_00423677();
    uVar8 = in_EDX & 0xffff;
    DAT_0099a4e4 = DAT_00652290;
    in_ECX = extraout_ECX;
  }
  if (DAT_006522ab == '\x01') {
    DAT_006522ac = 0;
  }
  if (DAT_006522ab == '\x03') {
    DAT_006522ac = DAT_006522ac & 0xffff0000;
  }
  uVar13 = (uint)DAT_00652290;
  pbVar12 = &DAT_00656b6c;
  while( true ) {
    DAT_0099a4e2 = (undefined2)((uint6)uVar15 >> 0x20);
    sVar16 = (short)uVar15;
    pcVar10 = (char *)(uint)*pbVar12;
    if (*pbVar12 == 0xff) break;
    sStack_20 = (short)in_ECX;
    if (DAT_006522ab == '\0') {
      for (pcVar10 = (&PTR_DAT_00652498)[(int)pcVar10]; *pcVar10 != -1; pcVar10 = pcVar10 + 10) {
        if ((pcVar10[9] & 1U) == 0) {
          switch(uVar13 & 3) {
          case 0:
            sVar2 = sVar16 + *(short *)(pcVar10 + 1);
            sVar5 = sStack_20 + *(short *)(pcVar10 + 3);
            break;
          case 1:
            sVar2 = sVar16 + *(short *)(pcVar10 + 3);
            sVar5 = sStack_20 - *(short *)(pcVar10 + 1);
            break;
          case 2:
            sVar2 = sVar16 - *(short *)(pcVar10 + 1);
            sVar5 = sStack_20 - *(short *)(pcVar10 + 3);
            break;
          case 3:
            sVar2 = sVar16 - *(short *)(pcVar10 + 3);
            sVar5 = sStack_20 + *(short *)(pcVar10 + 1);
          }
          psVar9 = (short *)&DAT_0099a02c;
          while (*psVar9 != -1) {
            if (((sVar2 == *psVar9) && (sVar5 == psVar9[1])) ||
               (psVar9 = psVar9 + 2, &DAT_0099a4dc <= psVar9)) goto LAB_005d6b52;
          }
          *psVar9 = sVar2;
          psVar9[1] = sVar5;
          psVar9[2] = -1;
        }
LAB_005d6b52:
      }
    }
    if ((DAT_006522ab == '\x01') || (DAT_006522ab == '\x02')) {
      uVar4 = (uint)CONCAT11((char)uVar13,DAT_006522ab != '\x01');
      DAT_00991efe = 0x3b1;
      FUN_00426f56(uVar13,unaff_ESI,pbVar12,&stack0xffffffe8,pcVar10);
      DAT_006522ac = DAT_006522ac + uVar4;
      if (uVar4 == 0x80000000) {
        DAT_006522ac = 0x80000000;
      }
      if (DAT_006522ac == 0x80000000) break;
    }
    if (DAT_006522ab == '\x03') {
      for (pcVar10 = (&PTR_DAT_00652498)[*pbVar12]; *pcVar10 != -1; pcVar10 = pcVar10 + 10) {
        switch(uVar13 & 3) {
        case 0:
          uVar3 = sVar16 + *(short *)(pcVar10 + 1);
          uVar6 = sStack_20 + *(short *)(pcVar10 + 3);
          break;
        case 1:
          uVar3 = sVar16 + *(short *)(pcVar10 + 3);
          uVar6 = sStack_20 - *(short *)(pcVar10 + 1);
          break;
        case 2:
          uVar3 = sVar16 - *(short *)(pcVar10 + 1);
          uVar6 = sStack_20 - *(short *)(pcVar10 + 3);
          break;
        case 3:
          uVar3 = sVar16 - *(short *)(pcVar10 + 3);
          uVar6 = sStack_20 + *(short *)(pcVar10 + 1);
        }
        if ((uVar3 < 0x1000) && (uVar6 < 0x1000)) {
          uVar3 = uVar6 << 7 | uVar6 >> 9 | uVar3;
          pbVar7 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
          bVar1 = *pbVar7;
          while ((bVar1 & 0x3c) != 0) {
            pbVar7 = pbVar7 + 8;
            bVar1 = *pbVar7;
          }
          uVar6 = (ushort)pbVar7[2] * 4;
          uVar3 = uVar6;
          if (((pbVar7[4] & 0xf) != 0) && (uVar3 = uVar6 + 0x10, (pbVar7[4] & 0x10) != 0)) {
            uVar3 = uVar6 + 0x20;
          }
          if (((pbVar7[5] & 0x1f) != 0) && (uVar6 = (pbVar7[5] & 0x1f) << 4, uVar3 < uVar6)) {
            uVar3 = uVar6;
          }
          sVar2 = ((short)uVar8 - *(short *)(&DAT_00653ef9 + (uint)*pbVar12 * 10)) +
                  *(short *)(pcVar10 + 5) + (short)DAT_006522ac;
          if (sVar2 < (short)uVar3) {
            DAT_006522ac._0_2_ = (short)DAT_006522ac - (sVar2 - uVar3);
          }
        }
      }
    }
    iVar11 = (uint)*pbVar12 * 10;
    switch(uVar13 & 3) {
    case 0:
      uVar4 = (uint)(ushort)(sVar16 + *(short *)(&DAT_00653efd + iVar11));
      in_ECX = (uint)(ushort)(sStack_20 + *(short *)(&DAT_00653eff + iVar11));
      break;
    case 1:
      uVar4 = (uint)(ushort)(sVar16 + *(short *)(&DAT_00653eff + iVar11));
      in_ECX = (uint)(ushort)(sStack_20 - *(short *)(&DAT_00653efd + iVar11));
      break;
    case 2:
      uVar4 = (uint)(ushort)(sVar16 - *(short *)(&DAT_00653efd + iVar11));
      in_ECX = (uint)(ushort)(sStack_20 - *(short *)(&DAT_00653eff + iVar11));
      break;
    case 3:
      uVar4 = (uint)(ushort)(sVar16 - *(short *)(&DAT_00653eff + iVar11));
      in_ECX = (uint)(ushort)(sStack_20 + *(short *)(&DAT_00653efd + iVar11));
    }
    uVar13 = (uVar13 & 3) + (uint)(byte)((&DAT_00653ef8)[iVar11] - (&DAT_00653ef7)[iVar11]) & 3;
    if (((&DAT_00653ef8)[iVar11] & 4) != 0) {
      uVar13 = uVar13 | 4;
    }
    uVar8 = (uint)(ushort)(((short)uVar8 - *(short *)(&DAT_00653ef9 + iVar11)) +
                          *(short *)(&DAT_00653efb + iVar11));
    if ((uVar13 & 4) == 0) {
      uVar4 = (uint)(ushort)((short)uVar4 + (&DAT_00652478)[uVar13 * 2]);
      in_ECX = (uint)(ushort)((short)in_ECX + (&DAT_0065247a)[uVar13 * 2]);
    }
    uVar15 = CONCAT24(DAT_0099a4e2,uVar4);
    pbVar12 = pbVar12 + 2;
  }
  if (DAT_006522ab == '\0') {
    _DAT_0099a020 = _DAT_0099a020 & 0xfff7 | 6;
    FUN_0043642b();
  }
  return CONCAT44(in_EDX,in_EAX);
}



/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_005e65cf(void)

{
  byte bVar1;
  undefined4 in_EAX;
  undefined4 uVar2;
  undefined4 uVar3;
  undefined4 extraout_ECX;
  char unaff_BL;
  uint uVar4;
  int iVar5;
  undefined4 unaff_ESI;
  uint uVar6;
  uint uVar7;
  bool bVar8;
  undefined8 uVar9;
  byte *pbVar10;
  
  if ((_DAT_0099a500 & 1) != 0) {
    return in_EAX;
  }
  uVar9 = FUN_00431510();
  pbVar10 = (byte *)((ulonglong)uVar9 >> 0x20);
  uVar3 = (undefined4)uVar9;
  if (unaff_BL == '\x03') {
    if ((*pbVar10 & 0x3c) == 4) {
      return uVar3;
    }
    uVar4 = (uint)pbVar10[7];
    iVar5 = uVar4 * 0x260;
    if ((&DAT_00887441)[iVar5] == '\0') {
      DAT_005f54f0 = 0x4c1;
      if ((*pbVar10 & 0x3c) == 0x10) {
        DAT_005f54f2 = 0x56b;
        if (pbVar10[4] != 0) {
          DAT_005f54f2 = 0x56d;
        }
      }
      else {
        bVar1 = pbVar10[4];
        if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
          DAT_005f54f2 = (&DAT_00887442)[uVar4 * 0x130];
          _DAT_005f54f4 = (undefined2)(&DAT_00887444)[uVar4 * 0x98];
          _DAT_005f54f6 = (undefined2)((uint)(&DAT_00887444)[uVar4 * 0x98] >> 0x10);
          return uVar3;
        }
        DAT_005f54f2 = 0x569;
      }
      if (1 < (byte)(&DAT_00887497)[iVar5]) {
        DAT_005f54f2 = DAT_005f54f2 + 1;
      }
      _DAT_005f54f4 = (&DAT_00887442)[uVar4 * 0x130];
      _DAT_005f54f6 = (undefined2)(&DAT_00887444)[uVar4 * 0x98];
      _DAT_005f54f8 = (undefined2)((uint)(&DAT_00887444)[uVar4 * 0x98] >> 0x10);
      _DAT_005f54fa = *(short *)(&DAT_005f5806 + (uint)(byte)(&DAT_00887420)[iVar5] * 8) + 2;
      uVar6 = (*(ushort *)(pbVar10 + 5) & 0x70) >> 4;
      uVar7 = uVar6;
      do {
        if ((&DAT_0088744a)[uVar4 * 0x130 + uVar6] == -1) {
          uVar7 = uVar7 - 1;
        }
        uVar6 = uVar6 - 1;
      } while (-1 < (int)uVar6);
      _DAT_005f54fc = (short)uVar7 + 1;
      return uVar3;
    }
  }
  else if (unaff_BL == '\x02') {
    if (*pbVar10 != 0) {
      return uVar3;
    }
    uVar4 = (uint)pbVar10[0x30];
    if ((&DAT_00887441)[uVar4 * 0x260] == '\0') {
      DAT_005f54f0 = 0x4c1;
      DAT_005f54f2 = (&DAT_00887442)[uVar4 * 0x130];
      _DAT_005f54f4 = (undefined2)(&DAT_00887444)[uVar4 * 0x98];
      _DAT_005f54f6 = (undefined2)((uint)(&DAT_00887444)[uVar4 * 0x98] >> 0x10);
      return uVar3;
    }
  }
  else {
    bVar8 = (DAT_00991f30 & 0x48) == 0x48;
    if (!bVar8) {
      uVar3 = extraout_ECX;
      uVar2 = FUN_005e3b2b();
      uVar9 = CONCAT44(pbVar10,uVar2);
      if (bVar8) {
        uVar3 = FUN_005e3b2b(unaff_ESI,pbVar10,uVar3);
        uVar9 = CONCAT44(pbVar10,uVar3);
        if (bVar8) {
          return uVar3;
        }
      }
    }
    uVar4 = (uint)((ulonglong)uVar9 >> 0x20);
    uVar3 = (undefined4)uVar9;
    if (unaff_BL == '\x05') {
      DAT_005f54f0 = 0x4c2;
      DAT_005f54f2 = *(undefined2 *)(&DAT_006e1ecc + (uint)*(byte *)(uVar4 + 4) * 8);
      return uVar3;
    }
    if (unaff_BL == '\x06') {
      DAT_005f54f0 = 0x4c2;
      DAT_005f54f2 = (*(byte *)(uVar4 + 4) >> 4) + 0x4d1;
      return uVar3;
    }
    if (unaff_BL == '\a') {
      DAT_005f54f0 = 0x4c2;
      DAT_005f54f2 = (*(byte *)(uVar4 + 5) & 0xf) + 0x632;
      return uVar3;
    }
    if (unaff_BL == '\t') {
      DAT_005f54f0 = 0x4c2;
      DAT_005f54f2 = *(undefined2 *)(&DAT_0099fc3c + (uVar4 >> 8 & 0xff) * 2);
      return uVar3;
    }
    if (unaff_BL == '\n') {
      DAT_005f54f0 = 0x4c2;
      DAT_005f54f2 = (*(ushort *)(uVar4 + 4) & 0x3ff) + 0x7de;
      return uVar3;
    }
  }
  return uVar3;
}


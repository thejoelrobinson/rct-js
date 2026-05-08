
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_009b3e87(void)

{
  byte bVar1;
  ushort uVar2;
  uint in_EAX;
  uint uVar3;
  uint uVar4;
  short in_CX;
  short sVar5;
  short in_DX;
  short sVar6;
  short sVar7;
  int unaff_EBX;
  byte *pbVar8;
  byte *pbVar9;
  int unaff_EDI;
  byte *pbVar10;
  
  if ((*(ushort *)(&DAT_008dc0c0 + unaff_EBX) & 0x20) != 0) {
    return in_EAX;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + unaff_EBX) & 0x10) != 0) {
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + -1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) >> 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) >> 1;
    uVar3 = FUN_009b35fa();
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + 1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) << 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) << 1;
    return uVar3;
  }
  pbVar8 = *(byte **)((int)&DAT_008dc0b4 + unaff_EBX);
  uVar3 = *(uint *)(&DAT_008dc0b8 + unaff_EBX);
  _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + unaff_EBX);
  _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + unaff_EBX);
  sVar6 = (short)((uint)_DAT_009a2018 >> 0x10);
  DAT_009a2014 = (short)uVar3;
  DAT_009a2016 = (ushort)(uVar3 >> 0x10);
  DAT_009a2010 = pbVar8;
  _DAT_009a2014 = uVar3;
  if ((_DAT_009a201c & 4) != 0) {
    uVar4 = CONCAT22(sVar6,DAT_009a2016);
    DAT_009a2020 = 0;
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = CONCAT22(sVar6,DAT_009a2016 - 1);
      if ((ushort)(DAT_009a2016 - 1) == 0) {
        DAT_009a2020 = 0;
        return uVar4;
      }
      DAT_009a2020 = 1;
    }
    sVar7 = (short)uVar4;
    if ((uVar4 & 2) != 0) {
      sVar5 = sVar7 + -2;
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),sVar5);
      if (sVar5 == 0 || sVar7 < 2) {
        return uVar4;
      }
      DAT_009a2020 = DAT_009a2020 + 2;
    }
    _DAT_009a202c = (ushort)uVar4;
    sVar6 = (in_DX + sVar6 & 0xfffcU) - *(short *)(unaff_EDI + 6);
    if (sVar6 < 0) {
      _DAT_009a202c = _DAT_009a202c + sVar6;
      if ((short)_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      DAT_009a2020 = DAT_009a2020 - sVar6;
      sVar6 = 0;
    }
    sVar7 = _DAT_009a202c;
    sVar5 = sVar6 + _DAT_009a202c + -1;
    if ((sVar5 == 0 || (short)(sVar6 + _DAT_009a202c) < 1) ||
       (_DAT_009a202c = _DAT_009a202c - sVar5, _DAT_009a202c != 0 && sVar5 <= sVar7)) {
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2014);
      _DAT_009a2024 = 0;
      DAT_009a2028 = DAT_009a2014;
      sVar6 = (in_CX + _DAT_009a2018 & 0xfffcU) - *(short *)(unaff_EDI + 4);
      if (sVar6 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar6;
        if (DAT_009a2028 < 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        _DAT_009a2024 = -(int)sVar6;
        sVar6 = 0;
      }
      sVar7 = DAT_009a2028;
      sVar5 = sVar6 + DAT_009a2028 + -1;
      if ((sVar5 == 0 || (short)(sVar6 + DAT_009a2028) < 1) ||
         (DAT_009a2028 = DAT_009a2028 - sVar5, DAT_009a2028 != 0 && sVar5 <= sVar7)) {
        uVar4 = FUN_009b41e4();
        uVar3 = _DAT_009a2014;
      }
    }
    _DAT_009a2014 = uVar3;
    return uVar4;
  }
  uVar2 = DAT_009a2016;
  if ((uVar3 & 0x10000) != 0) {
    uVar2 = DAT_009a2016 - 1;
  }
  if ((uVar2 & 2) != 0) {
    uVar2 = uVar2 - 2;
  }
  uVar4 = CONCAT22(sVar6,uVar2);
  if (uVar2 != 0) {
    sVar6 = (in_DX + sVar6 & 0xfffcU) - *(short *)(unaff_EDI + 6);
    _DAT_009a202c = uVar2;
    if (sVar6 < 0) {
      _DAT_009a202c = uVar2 + sVar6;
      if ((short)_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * (uint)(ushort)-sVar6 & 0xffff;
      sVar6 = 0;
    }
    uVar2 = _DAT_009a202c;
    sVar7 = sVar6 + _DAT_009a202c + -1;
    if ((sVar7 == 0 || (short)(sVar6 + _DAT_009a202c) < 1) ||
       (_DAT_009a202c = _DAT_009a202c - sVar7, _DAT_009a202c != 0 && sVar7 <= (short)uVar2)) {
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2014);
      DAT_009a2028 = DAT_009a2014;
      DAT_009a202e = 0;
      sVar6 = (in_CX + _DAT_009a2018 & 0xfffcU) - *(short *)(unaff_EDI + 4);
      if (sVar6 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar6;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        DAT_009a202e = -sVar6;
        sVar6 = 0;
      }
      sVar7 = DAT_009a2028;
      sVar5 = sVar6 + DAT_009a2028 + -1;
      if (sVar5 != 0 && 0 < (short)(sVar6 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar5;
        if (DAT_009a2028 == 0 || sVar7 < sVar5) {
          return uVar4;
        }
        DAT_009a202e = DAT_009a202e + sVar5;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar6 = DAT_009a2016 * DAT_009a2014;
        pbVar10 = &DAT_009a2032;
        while (sVar6 != 0) {
          bVar1 = *pbVar8;
          uVar3 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar9 = pbVar8 + 1;
            sVar6 = sVar6 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar8 = pbVar8 + 2;
            pbVar9 = pbVar10 + -(uint)(CONCAT11(bVar1,*pbVar9) & 0x7ff);
            for (uVar3 = (uint)(byte)-((char)bVar1 >> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar10 = *pbVar9;
              pbVar9 = pbVar9 + 1;
              pbVar10 = pbVar10 + 1;
            }
          }
          else {
            sVar6 = sVar6 - (ushort)bVar1;
            for (; pbVar8 = pbVar8 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar10 = *pbVar8;
              pbVar10 = pbVar10 + 1;
            }
          }
        }
        uVar3 = FUN_009b40aa();
        return uVar3;
      }
      uVar4 = FUN_009b40aa();
      uVar3 = _DAT_009a2014;
    }
  }
  _DAT_009a2014 = uVar3;
  return uVar4;
}


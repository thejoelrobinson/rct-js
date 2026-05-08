
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_009b35fa(void)

{
  byte bVar1;
  short sVar2;
  uint in_EAX;
  uint uVar3;
  short in_CX;
  short in_DX;
  short sVar4;
  short sVar5;
  short sVar6;
  uint unaff_EBX;
  uint uVar7;
  int iVar8;
  byte *pbVar9;
  byte *pbVar10;
  int unaff_EDI;
  byte *pbVar11;
  
  uVar7 = unaff_EBX & 0x1ffff;
  iVar8 = uVar7 * 0x10;
  if (*(short *)(unaff_EDI + 0xe) == 0) {
    pbVar9 = (byte *)(&DAT_008dc0b4)[uVar7 * 4];
    uVar7 = *(uint *)(&DAT_008dc0b8 + iVar8);
    _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + iVar8);
    _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + iVar8);
    sVar5 = (short)((uint)_DAT_009a2018 >> 0x10);
    DAT_009a2014 = (short)uVar7;
    DAT_009a2016 = (short)(uVar7 >> 0x10);
    DAT_009a2010 = pbVar9;
    _DAT_009a2014 = uVar7;
    if ((_DAT_009a201c & 4) != 0) {
      uVar3 = CONCAT22(sVar5,DAT_009a2016);
      DAT_009a2020 = 0;
      _DAT_009a202c = DAT_009a2016;
      sVar2 = (in_DX + sVar5) - *(short *)(unaff_EDI + 6);
      if (sVar2 < 0) {
        _DAT_009a202c = DAT_009a2016 + sVar2;
        if (_DAT_009a202c < 0) {
          DAT_009a2020 = 0;
          return uVar3;
        }
        if (_DAT_009a202c == 0) {
          DAT_009a2020 = 0;
          return uVar3;
        }
        DAT_009a2020 = -sVar2;
        sVar2 = 0;
      }
      sVar6 = _DAT_009a202c;
      sVar4 = sVar2 + _DAT_009a202c + -1;
      if ((sVar4 == 0 || (short)(sVar2 + _DAT_009a202c) < 1) ||
         (_DAT_009a202c = _DAT_009a202c - sVar4, _DAT_009a202c != 0 && sVar4 <= sVar6)) {
        uVar3 = CONCAT22(sVar5,DAT_009a2014);
        _DAT_009a2024 = 0;
        DAT_009a2028 = DAT_009a2014;
        sVar5 = (in_CX + _DAT_009a2018) - *(short *)(unaff_EDI + 4);
        if (sVar5 < 0) {
          DAT_009a2028 = DAT_009a2014 + sVar5;
          if (DAT_009a2028 < 0) {
            _DAT_009a2024 = 0;
            return uVar3;
          }
          if (DAT_009a2028 == 0) {
            _DAT_009a2024 = 0;
            return uVar3;
          }
          _DAT_009a2024 = -(int)sVar5;
          sVar5 = 0;
        }
        sVar2 = DAT_009a2028;
        sVar6 = sVar5 + DAT_009a2028 + -1;
        if ((sVar6 == 0 || (short)(sVar5 + DAT_009a2028) < 1) ||
           (DAT_009a2028 = DAT_009a2028 - sVar6, DAT_009a2028 != 0 && sVar6 <= sVar2)) {
          uVar3 = FUN_009b38bc();
          uVar7 = _DAT_009a2014;
        }
      }
      _DAT_009a2014 = uVar7;
      return uVar3;
    }
    uVar3 = CONCAT22(sVar5,DAT_009a2016);
    _DAT_009a202c = DAT_009a2016;
    sVar5 = (in_DX + sVar5) - *(short *)(unaff_EDI + 6);
    if (sVar5 < 0) {
      _DAT_009a202c = DAT_009a2016 + sVar5;
      if (_DAT_009a202c < 0) {
        return uVar3;
      }
      if (_DAT_009a202c == 0) {
        return uVar3;
      }
      uVar3 = (uVar7 & 0xffff) * (uint)(ushort)-sVar5 & 0xffff;
      sVar5 = 0;
    }
    sVar2 = _DAT_009a202c;
    sVar6 = sVar5 + _DAT_009a202c + -1;
    if ((sVar6 == 0 || (short)(sVar5 + _DAT_009a202c) < 1) ||
       (_DAT_009a202c = _DAT_009a202c - sVar6, _DAT_009a202c != 0 && sVar6 <= sVar2)) {
      uVar3 = CONCAT22((short)(uVar3 >> 0x10),DAT_009a2014);
      DAT_009a2028 = DAT_009a2014;
      DAT_009a202e = 0;
      sVar5 = (in_CX + _DAT_009a2018) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar3;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar3;
        }
        DAT_009a202e = -sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = sVar5 + DAT_009a2028 + -1;
      if (sVar6 != 0 && 0 < (short)(sVar5 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar6;
        if (DAT_009a2028 == 0 || sVar2 < sVar6) {
          return uVar3;
        }
        DAT_009a202e = DAT_009a202e + sVar6;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar5 = DAT_009a2016 * DAT_009a2014;
        pbVar11 = &DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = *pbVar9;
          uVar7 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(bVar1,*pbVar10) & 0x7ff);
            for (uVar7 = (uint)(byte)-((char)bVar1 >> 3); uVar7 != 0; uVar7 = uVar7 - 1) {
              *pbVar11 = *pbVar10;
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          }
          else {
            sVar5 = sVar5 - (ushort)bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar7 != 0; uVar7 = uVar7 - 1) {
              *pbVar11 = *pbVar9;
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar7 = FUN_009b37b8();
        return uVar7;
      }
      uVar3 = FUN_009b37b8();
      uVar7 = _DAT_009a2014;
    }
    _DAT_009a2014 = uVar7;
    return uVar3;
  }
  if (*(short *)(unaff_EDI + 0xe) != 1) {
    uVar7 = FUN_009b3e87();
    return uVar7;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + iVar8) & 0x20) != 0) {
    return in_EAX;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + iVar8) & 0x10) != 0) {
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + -1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) >> 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) >> 1;
    uVar7 = FUN_009b35fa();
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + 1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) << 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) << 1;
    return uVar7;
  }
  pbVar9 = (byte *)(&DAT_008dc0b4)[uVar7 * 4];
  uVar7 = *(uint *)(&DAT_008dc0b8 + iVar8);
  _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + iVar8);
  _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + iVar8);
  sVar5 = (short)((uint)_DAT_009a2018 >> 0x10);
  DAT_009a2014 = (short)uVar7;
  DAT_009a2016 = (short)(uVar7 >> 0x10);
  DAT_009a2010 = pbVar9;
  _DAT_009a2014 = uVar7;
  if ((_DAT_009a201c & 4) != 0) {
    uVar3 = CONCAT22(sVar5,DAT_009a2016);
    DAT_009a2020 = 0;
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = CONCAT22(sVar5,DAT_009a2016 + -1);
      if ((short)(DAT_009a2016 + -1) == 0) {
        DAT_009a2020 = 0;
        return uVar3;
      }
      DAT_009a2020 = 1;
    }
    _DAT_009a202c = (short)uVar3;
    sVar5 = (in_DX + sVar5 & 0xfffeU) - *(short *)(unaff_EDI + 6);
    if (sVar5 < 0) {
      _DAT_009a202c = _DAT_009a202c + sVar5;
      if (_DAT_009a202c < 0) {
        return uVar3;
      }
      if (_DAT_009a202c == 0) {
        return uVar3;
      }
      DAT_009a2020 = DAT_009a2020 - sVar5;
      sVar5 = 0;
    }
    sVar2 = _DAT_009a202c;
    sVar6 = sVar5 + _DAT_009a202c + -1;
    if ((sVar6 == 0 || (short)(sVar5 + _DAT_009a202c) < 1) ||
       (_DAT_009a202c = _DAT_009a202c - sVar6, _DAT_009a202c != 0 && sVar6 <= sVar2)) {
      uVar3 = CONCAT22((short)(uVar3 >> 0x10),DAT_009a2014);
      _DAT_009a2024 = 0;
      DAT_009a2028 = DAT_009a2014;
      sVar5 = (in_CX + _DAT_009a2018 & 0xfffeU) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          _DAT_009a2024 = 0;
          return uVar3;
        }
        if (DAT_009a2028 == 0) {
          _DAT_009a2024 = 0;
          return uVar3;
        }
        _DAT_009a2024 = -(int)sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = sVar5 + DAT_009a2028 + -1;
      if ((sVar6 == 0 || (short)(sVar5 + DAT_009a2028) < 1) ||
         (DAT_009a2028 = DAT_009a2028 - sVar6, DAT_009a2028 != 0 && sVar6 <= sVar2)) {
        uVar3 = FUN_009b3d13();
        uVar7 = _DAT_009a2014;
      }
    }
    _DAT_009a2014 = uVar7;
    return uVar3;
  }
  sVar2 = DAT_009a2016;
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = DAT_009a2016 + -1;
  }
  uVar3 = CONCAT22(sVar5,sVar2);
  if (sVar2 != 0) {
    sVar5 = (in_DX + sVar5 & 0xfffeU) - *(short *)(unaff_EDI + 6);
    _DAT_009a202c = sVar2;
    if (sVar5 < 0) {
      _DAT_009a202c = sVar2 + sVar5;
      if (_DAT_009a202c < 0) {
        return uVar3;
      }
      if (_DAT_009a202c == 0) {
        return uVar3;
      }
      uVar3 = (uVar7 & 0xffff) * (uint)(ushort)-sVar5 & 0xffff;
      sVar5 = 0;
    }
    sVar2 = _DAT_009a202c;
    sVar6 = sVar5 + _DAT_009a202c + -1;
    if ((sVar6 == 0 || (short)(sVar5 + _DAT_009a202c) < 1) ||
       (_DAT_009a202c = _DAT_009a202c - sVar6, _DAT_009a202c != 0 && sVar6 <= sVar2)) {
      uVar3 = CONCAT22((short)(uVar3 >> 0x10),DAT_009a2014);
      DAT_009a2028 = DAT_009a2014;
      DAT_009a202e = 0;
      sVar5 = (in_CX + _DAT_009a2018 & 0xfffeU) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar3;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar3;
        }
        DAT_009a202e = -sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = sVar5 + DAT_009a2028 + -1;
      if (sVar6 != 0 && 0 < (short)(sVar5 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar6;
        if (DAT_009a2028 == 0 || sVar2 < sVar6) {
          return uVar3;
        }
        DAT_009a202e = DAT_009a202e + sVar6;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar5 = DAT_009a2016 * DAT_009a2014;
        pbVar11 = &DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = *pbVar9;
          uVar7 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(bVar1,*pbVar10) & 0x7ff);
            for (uVar7 = (uint)(byte)-((char)bVar1 >> 3); uVar7 != 0; uVar7 = uVar7 - 1) {
              *pbVar11 = *pbVar10;
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          }
          else {
            sVar5 = sVar5 - (ushort)bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar7 != 0; uVar7 = uVar7 - 1) {
              *pbVar11 = *pbVar9;
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar7 = FUN_009b3bf1();
        return uVar7;
      }
      uVar3 = FUN_009b3bf1();
      uVar7 = _DAT_009a2014;
    }
  }
  _DAT_009a2014 = uVar7;
  return uVar3;
}


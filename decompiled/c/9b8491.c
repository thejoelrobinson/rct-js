
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_009b8491(void)

{
  byte bVar1;
  ushort uVar2;
  uint in_EAX;
  uint uVar3;
  uint uVar4;
  short in_CX;
  short sVar5;
  short in_DX;
  ushort uVar6;
  short sVar7;
  short sVar8;
  int unaff_EBX;
  byte *pbVar9;
  byte *pbVar10;
  int unaff_EDI;
  byte *pbVar11;
  
  if ((*(ushort *)(&DAT_008dc0c0 + unaff_EBX) & 0x20) != 0) {
    return in_EAX;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + unaff_EBX) & 0x10) != 0) {
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + -1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) >> 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) >> 1;
    *(short *)(unaff_EDI + 8) = *(short *)(unaff_EDI + 8) >> 1;
    *(short *)(unaff_EDI + 10) = *(short *)(unaff_EDI + 10) >> 1;
    uVar3 = FUN_009b4457();
    *(short *)(unaff_EDI + 0xe) = *(short *)(unaff_EDI + 0xe) + 1;
    *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) << 1;
    *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) << 1;
    *(short *)(unaff_EDI + 8) = *(short *)(unaff_EDI + 8) << 1;
    *(short *)(unaff_EDI + 10) = *(short *)(unaff_EDI + 10) << 1;
    return uVar3;
  }
  pbVar9 = *(byte **)((int)&DAT_008dc0b4 + unaff_EBX);
  uVar3 = *(uint *)(&DAT_008dc0b8 + unaff_EBX);
  _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + unaff_EBX);
  _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + unaff_EBX);
  sVar7 = (short)((uint)_DAT_009a2018 >> 0x10);
  DAT_009a2014 = (short)uVar3;
  DAT_009a2016 = (ushort)(uVar3 >> 0x10);
  DAT_009a2010 = pbVar9;
  _DAT_009a2014 = uVar3;
  if ((_DAT_009a201c & 4) != 0) {
    uVar4 = CONCAT22(sVar7,DAT_009a2016);
    DAT_009a2020 = 0;
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = CONCAT22(sVar7,DAT_009a2016 - 1);
      if ((ushort)(DAT_009a2016 - 1) == 0) {
        DAT_009a2020 = 0;
        return uVar4;
      }
      DAT_009a2020 = 1;
    }
    sVar8 = (short)uVar4;
    if ((uVar4 & 2) != 0) {
      sVar5 = sVar8 + -2;
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),sVar5);
      if (sVar5 == 0 || sVar8 < 2) {
        return uVar4;
      }
      DAT_009a2020 = DAT_009a2020 + 2;
    }
    _DAT_009a202c = (ushort)uVar4;
    uVar2 = (in_DX + sVar7 & 0xfffcU) - *(short *)(unaff_EDI + 6);
    if ((short)uVar2 < 0) {
      _DAT_009a202c = _DAT_009a202c + uVar2;
      if ((short)_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      DAT_009a2020 = DAT_009a2020 - uVar2;
      uVar2 = 0;
    }
    else {
      uVar4 = (int)(short)((*(ushort *)(unaff_EDI + 8) >> 2) + *(short *)(unaff_EDI + 0xc)) *
              (int)(short)(uVar2 >> 2);
    }
    sVar7 = _DAT_009a202c;
    sVar8 = (uVar2 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
    if ((sVar8 == 0 || (short)(uVar2 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
       (_DAT_009a202c = _DAT_009a202c - sVar8, _DAT_009a202c != 0 && sVar8 <= sVar7)) {
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2014);
      _DAT_009a2024 = 0;
      DAT_009a2028 = DAT_009a2014;
      sVar7 = (in_CX + _DAT_009a2018 & 0xfffcU) - *(short *)(unaff_EDI + 4);
      if (sVar7 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar7;
        if (DAT_009a2028 < 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        _DAT_009a2024 = -(int)sVar7;
        sVar7 = 0;
      }
      sVar8 = DAT_009a2028;
      sVar5 = (sVar7 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
      if ((sVar5 == 0 || (short)(sVar7 + DAT_009a2028) < *(short *)(unaff_EDI + 8)) ||
         (DAT_009a2028 = DAT_009a2028 - sVar5, DAT_009a2028 != 0 && sVar5 <= sVar8)) {
        DAT_009a2030 = (*(ushort *)(unaff_EDI + 8) >> 2) + *(short *)(unaff_EDI + 0xc);
        uVar4 = FUN_009b8aa9();
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
  uVar4 = CONCAT22(sVar7,uVar2);
  if (uVar2 != 0) {
    uVar6 = (in_DX + sVar7 & 0xfffcU) - *(short *)(unaff_EDI + 6);
    if ((short)uVar6 < 0) {
      _DAT_009a202c = uVar2 + uVar6;
      if ((short)_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * (uint)(ushort)-uVar6 & 0xffff;
      uVar6 = 0;
    }
    else {
      uVar4 = (uint)(ushort)((*(ushort *)(unaff_EDI + 8) >> 2) + *(short *)(unaff_EDI + 0xc)) *
              (uint)(uVar6 >> 2);
      _DAT_009a202c = uVar2;
    }
    uVar2 = _DAT_009a202c;
    sVar7 = (uVar6 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
    if ((sVar7 == 0 || (short)(uVar6 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
       (_DAT_009a202c = _DAT_009a202c - sVar7, _DAT_009a202c != 0 && sVar7 <= (short)uVar2)) {
      DAT_009a2028 = DAT_009a2014;
      DAT_009a2030 = (*(ushort *)(unaff_EDI + 8) >> 2) + *(short *)(unaff_EDI + 0xc);
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2030);
      DAT_009a202e = 0;
      sVar7 = (in_CX + _DAT_009a2018 & 0xfffcU) - *(short *)(unaff_EDI + 4);
      if (sVar7 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar7;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        DAT_009a202e = -sVar7;
        sVar7 = 0;
      }
      sVar8 = DAT_009a2028;
      sVar5 = (sVar7 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
      if (sVar5 != 0 && *(short *)(unaff_EDI + 8) <= (short)(sVar7 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar5;
        if (DAT_009a2028 == 0 || sVar8 < sVar5) {
          return uVar4;
        }
        DAT_009a202e = DAT_009a202e + sVar5;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar7 = DAT_009a2016 * DAT_009a2014;
        pbVar11 = &DAT_009a2032;
        while (sVar7 != 0) {
          bVar1 = *pbVar9;
          uVar3 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar7 = sVar7 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(bVar1,*pbVar10) & 0x7ff);
            for (uVar3 = (uint)(byte)-((char)bVar1 >> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar10;
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          }
          else {
            sVar7 = sVar7 - (ushort)bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar9;
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b8705();
        return uVar3;
      }
      uVar4 = FUN_009b8705();
      uVar3 = _DAT_009a2014;
    }
  }
  _DAT_009a2014 = uVar3;
  return uVar4;
}


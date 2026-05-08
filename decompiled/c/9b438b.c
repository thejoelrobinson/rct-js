
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_009b438b(void)

{
  byte bVar1;
  short sVar2;
  uint in_EAX;
  uint uVar3;
  uint uVar4;
  short in_CX;
  short sVar5;
  short sVar6;
  short in_DX;
  ushort uVar7;
  uint unaff_EBX;
  int iVar8;
  byte *pbVar9;
  byte *pbVar10;
  int unaff_EDI;
  byte *pbVar11;
  
  DAT_009a2000 = unaff_EBX & 0x60000000;
  if (DAT_009a2000 != 0) {
    if ((unaff_EBX & 0x80000000) == 0) {
      uVar3 = unaff_EBX >> 0x11 & 0x7f;
    }
    else {
      uVar3 = unaff_EBX >> 0x11 & 0x7f;
      if (uVar3 != 0x27) {
        iVar8 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + uVar3 * 4) * 4];
        _DAT_009aa237 = *(undefined4 *)(iVar8 + 0xf3);
        _DAT_009aa23b = *(undefined4 *)(iVar8 + 0xf7);
        _DAT_009aa23f = *(undefined4 *)(iVar8 + 0xfb);
        iVar8 = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + (unaff_EBX >> 0x18 & 0x1f) * 4) * 4];
        _DAT_009aa20e = *(undefined4 *)(iVar8 + 0xf3);
        _DAT_009aa212 = *(undefined4 *)(iVar8 + 0xf7);
        _DAT_009aa216 = *(undefined4 *)(iVar8 + 0xfb);
        DAT_009a200c = &DAT_009aa144;
        uVar3 = FUN_009b4457();
        return uVar3;
      }
    }
    in_EAX = (&DAT_008dc0b4)[*(int *)(&DAT_009aa06c + uVar3 * 4) * 4];
    DAT_009a200c = (undefined *)in_EAX;
  }
  uVar3 = unaff_EBX & 0x1ffff;
  iVar8 = uVar3 * 0x10;
  if (*(short *)(unaff_EDI + 0xe) == 0) {
    pbVar9 = (byte *)(&DAT_008dc0b4)[uVar3 * 4];
    uVar3 = *(uint *)(&DAT_008dc0b8 + iVar8);
    _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + iVar8);
    _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + iVar8);
    sVar5 = (short)((uint)_DAT_009a2018 >> 0x10);
    DAT_009a2014 = (short)uVar3;
    DAT_009a2016 = (short)(uVar3 >> 0x10);
    DAT_009a2010 = pbVar9;
    _DAT_009a2014 = uVar3;
    if ((_DAT_009a201c & 4) != 0) {
      uVar4 = CONCAT22(sVar5,DAT_009a2016);
      DAT_009a2020 = 0;
      _DAT_009a202c = DAT_009a2016;
      sVar5 = (in_DX + sVar5) - *(short *)(unaff_EDI + 6);
      if (sVar5 < 0) {
        _DAT_009a202c = DAT_009a2016 + sVar5;
        if (_DAT_009a202c < 0) {
          DAT_009a2020 = 0;
          return uVar4;
        }
        if (_DAT_009a202c == 0) {
          DAT_009a2020 = 0;
          return uVar4;
        }
        DAT_009a2020 = -sVar5;
        sVar5 = 0;
      }
      else {
        uVar4 = (int)(short)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 0xc)) * (int)sVar5;
      }
      sVar2 = _DAT_009a202c;
      sVar6 = (sVar5 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
      if ((sVar6 == 0 || (short)(sVar5 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
         (_DAT_009a202c = _DAT_009a202c - sVar6, _DAT_009a202c != 0 && sVar6 <= sVar2)) {
        uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2014);
        _DAT_009a2024 = 0;
        DAT_009a2028 = DAT_009a2014;
        sVar5 = (in_CX + _DAT_009a2018) - *(short *)(unaff_EDI + 4);
        if (sVar5 < 0) {
          DAT_009a2028 = DAT_009a2014 + sVar5;
          if (DAT_009a2028 < 0) {
            _DAT_009a2024 = 0;
            return uVar4;
          }
          if (DAT_009a2028 == 0) {
            _DAT_009a2024 = 0;
            return uVar4;
          }
          _DAT_009a2024 = -(int)sVar5;
          sVar5 = 0;
        }
        sVar2 = DAT_009a2028;
        sVar6 = (sVar5 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
        if ((sVar6 == 0 || (short)(sVar5 + DAT_009a2028) < *(short *)(unaff_EDI + 8)) ||
           (DAT_009a2028 = DAT_009a2028 - sVar6, DAT_009a2028 != 0 && sVar6 <= sVar2)) {
          DAT_009a2030 = *(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 0xc);
          uVar4 = FUN_009b4911();
          uVar3 = _DAT_009a2014;
        }
      }
      _DAT_009a2014 = uVar3;
      return uVar4;
    }
    uVar4 = CONCAT22(sVar5,DAT_009a2016);
    _DAT_009a202c = DAT_009a2016;
    uVar7 = (in_DX + sVar5) - *(short *)(unaff_EDI + 6);
    if ((short)uVar7 < 0) {
      _DAT_009a202c = DAT_009a2016 + uVar7;
      if (_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * (uint)(ushort)-uVar7 & 0xffff;
      uVar7 = 0;
    }
    else {
      uVar4 = (uint)(ushort)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 0xc)) * (uint)uVar7;
    }
    sVar5 = _DAT_009a202c;
    sVar2 = (uVar7 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
    if ((sVar2 == 0 || (short)(uVar7 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
       (_DAT_009a202c = _DAT_009a202c - sVar2, _DAT_009a202c != 0 && sVar2 <= sVar5)) {
      DAT_009a2028 = DAT_009a2014;
      DAT_009a2030 = (*(short *)(unaff_EDI + 8) - DAT_009a2014) + *(short *)(unaff_EDI + 0xc);
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2030);
      DAT_009a202e = 0;
      sVar5 = (in_CX + _DAT_009a2018) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        DAT_009a202e = -sVar5;
        DAT_009a2030 = DAT_009a2030 - sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = (sVar5 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
      if (sVar6 != 0 && *(short *)(unaff_EDI + 8) <= (short)(sVar5 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar6;
        if (DAT_009a2028 == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        DAT_009a202e = DAT_009a202e + sVar6;
        DAT_009a2030 = DAT_009a2030 + sVar6;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar5 = DAT_009a2016 * DAT_009a2014;
        pbVar11 = &DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = *pbVar9;
          uVar3 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(bVar1,*pbVar10) & 0x7ff);
            for (uVar3 = (uint)(byte)-((char)bVar1 >> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar10;
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          }
          else {
            sVar5 = sVar5 - (ushort)bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar9;
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b4660();
        return uVar3;
      }
      uVar4 = FUN_009b4660();
      uVar3 = _DAT_009a2014;
    }
    _DAT_009a2014 = uVar3;
    return uVar4;
  }
  if (*(short *)(unaff_EDI + 0xe) != 1) {
    uVar3 = FUN_009b8491();
    return uVar3;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + iVar8) & 0x20) != 0) {
    return in_EAX;
  }
  if ((*(ushort *)(&DAT_008dc0c0 + iVar8) & 0x10) != 0) {
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
  pbVar9 = (byte *)(&DAT_008dc0b4)[uVar3 * 4];
  uVar3 = *(uint *)(&DAT_008dc0b8 + iVar8);
  _DAT_009a2018 = *(undefined4 *)(&DAT_008dc0bc + iVar8);
  _DAT_009a201c = *(uint *)(&DAT_008dc0c0 + iVar8);
  sVar5 = (short)((uint)_DAT_009a2018 >> 0x10);
  DAT_009a2014 = (short)uVar3;
  DAT_009a2016 = (short)(uVar3 >> 0x10);
  DAT_009a2010 = pbVar9;
  _DAT_009a2014 = uVar3;
  if ((_DAT_009a201c & 4) != 0) {
    uVar4 = CONCAT22(sVar5,DAT_009a2016);
    DAT_009a2020 = 0;
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = CONCAT22(sVar5,DAT_009a2016 + -1);
      if ((short)(DAT_009a2016 + -1) == 0) {
        DAT_009a2020 = 0;
        return uVar4;
      }
      DAT_009a2020 = 1;
    }
    _DAT_009a202c = (short)uVar4;
    uVar7 = (in_DX + sVar5 & 0xfffeU) - *(short *)(unaff_EDI + 6);
    if ((short)uVar7 < 0) {
      _DAT_009a202c = _DAT_009a202c + uVar7;
      if (_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      DAT_009a2020 = DAT_009a2020 - uVar7;
      uVar7 = 0;
    }
    else {
      uVar4 = (int)(short)((*(ushort *)(unaff_EDI + 8) >> 1) + *(short *)(unaff_EDI + 0xc)) *
              (int)(short)(uVar7 >> 1);
    }
    sVar5 = _DAT_009a202c;
    sVar2 = (uVar7 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
    if ((sVar2 == 0 || (short)(uVar7 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
       (_DAT_009a202c = _DAT_009a202c - sVar2, _DAT_009a202c != 0 && sVar2 <= sVar5)) {
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2014);
      _DAT_009a2024 = 0;
      DAT_009a2028 = DAT_009a2014;
      sVar5 = (in_CX + _DAT_009a2018 & 0xfffeU) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          _DAT_009a2024 = 0;
          return uVar4;
        }
        _DAT_009a2024 = -(int)sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = (sVar5 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
      if ((sVar6 == 0 || (short)(sVar5 + DAT_009a2028) < *(short *)(unaff_EDI + 8)) ||
         (DAT_009a2028 = DAT_009a2028 - sVar6, DAT_009a2028 != 0 && sVar6 <= sVar2)) {
        DAT_009a2030 = (*(ushort *)(unaff_EDI + 8) >> 1) + *(short *)(unaff_EDI + 0xc);
        uVar4 = FUN_009b6863();
        uVar3 = _DAT_009a2014;
      }
    }
    _DAT_009a2014 = uVar3;
    return uVar4;
  }
  sVar2 = DAT_009a2016;
  if ((uVar3 & 0x10000) != 0) {
    sVar2 = DAT_009a2016 + -1;
  }
  uVar4 = CONCAT22(sVar5,sVar2);
  if (sVar2 != 0) {
    uVar7 = (in_DX + sVar5 & 0xfffeU) - *(short *)(unaff_EDI + 6);
    if ((short)uVar7 < 0) {
      _DAT_009a202c = sVar2 + uVar7;
      if (_DAT_009a202c < 0) {
        return uVar4;
      }
      if (_DAT_009a202c == 0) {
        return uVar4;
      }
      uVar4 = (uVar3 & 0xffff) * (uint)(ushort)-uVar7 & 0xffff;
      uVar7 = 0;
    }
    else {
      uVar4 = (uint)(ushort)((*(ushort *)(unaff_EDI + 8) >> 1) + *(short *)(unaff_EDI + 0xc)) *
              (uint)(uVar7 >> 1);
      _DAT_009a202c = sVar2;
    }
    sVar5 = _DAT_009a202c;
    sVar2 = (uVar7 + _DAT_009a202c) - *(short *)(unaff_EDI + 10);
    if ((sVar2 == 0 || (short)(uVar7 + _DAT_009a202c) < *(short *)(unaff_EDI + 10)) ||
       (_DAT_009a202c = _DAT_009a202c - sVar2, _DAT_009a202c != 0 && sVar2 <= sVar5)) {
      DAT_009a2028 = DAT_009a2014;
      DAT_009a2030 = (*(ushort *)(unaff_EDI + 8) >> 1) + *(short *)(unaff_EDI + 0xc);
      uVar4 = CONCAT22((short)(uVar4 >> 0x10),DAT_009a2030);
      DAT_009a202e = 0;
      sVar5 = (in_CX + _DAT_009a2018 & 0xfffeU) - *(short *)(unaff_EDI + 4);
      if (sVar5 < 0) {
        DAT_009a2028 = DAT_009a2014 + sVar5;
        if (DAT_009a2028 < 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        if (DAT_009a2028 == 0) {
          DAT_009a202e = 0;
          return uVar4;
        }
        DAT_009a202e = -sVar5;
        sVar5 = 0;
      }
      sVar2 = DAT_009a2028;
      sVar6 = (sVar5 + DAT_009a2028) - *(short *)(unaff_EDI + 8);
      if (sVar6 != 0 && *(short *)(unaff_EDI + 8) <= (short)(sVar5 + DAT_009a2028)) {
        DAT_009a2028 = DAT_009a2028 - sVar6;
        if (DAT_009a2028 == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        DAT_009a202e = DAT_009a202e + sVar6;
      }
      if ((_DAT_009a201c & 2) != 0) {
        sVar5 = DAT_009a2016 * DAT_009a2014;
        pbVar11 = &DAT_009a2032;
        while (sVar5 != 0) {
          bVar1 = *pbVar9;
          uVar3 = (uint)bVar1;
          if ((char)bVar1 < '\0') {
            pbVar10 = pbVar9 + 1;
            sVar5 = sVar5 - (ushort)(byte)-((char)bVar1 >> 3);
            pbVar9 = pbVar9 + 2;
            pbVar10 = pbVar11 + -(uint)(CONCAT11(bVar1,*pbVar10) & 0x7ff);
            for (uVar3 = (uint)(byte)-((char)bVar1 >> 3); uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar10;
              pbVar10 = pbVar10 + 1;
              pbVar11 = pbVar11 + 1;
            }
          }
          else {
            sVar5 = sVar5 - (ushort)bVar1;
            for (; pbVar9 = pbVar9 + 1, uVar3 != 0; uVar3 = uVar3 - 1) {
              *pbVar11 = *pbVar9;
              pbVar11 = pbVar11 + 1;
            }
          }
        }
        uVar3 = FUN_009b64ea();
        return uVar3;
      }
      uVar4 = FUN_009b64ea();
      uVar3 = _DAT_009a2014;
    }
  }
  _DAT_009a2014 = uVar3;
  return uVar4;
}


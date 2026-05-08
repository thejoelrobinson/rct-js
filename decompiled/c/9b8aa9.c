
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 FUN_009b8aa9(void)

{
  undefined1 in_AL;
  undefined1 uVar1;
  byte bVar5;
  ushort uVar2;
  ushort uVar3;
  ushort uVar4;
  short sVar6;
  short sVar7;
  short sVar8;
  uint uVar9;
  uint uVar10;
  undefined2 uVar13;
  ushort *puVar11;
  ushort *puVar12;
  int unaff_ESI;
  ushort *puVar14;
  undefined1 *unaff_EDI;
  undefined1 *puVar15;
  
  uVar13 = (undefined2)((uint)_DAT_009a2020 >> 0x10);
  if ((DAT_009a2000 & 0x20000000) != 0) {
    if ((DAT_009a2000 & 0x40000000) != 0) {
      uVar1 = 0;
      puVar12 = (ushort *)
                (CONCAT22(uVar13,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
      do {
        sVar6 = _DAT_009a202c;
        uVar3 = *puVar12;
        DAT_009aa032 = (byte)uVar3;
        bVar5 = (byte)((uVar3 & 0xffffff7f) >> 8);
        uVar2 = (ushort)(byte)(uVar3 & 0xffffff7f);
        uVar9 = (uint)bVar5;
        puVar12 = (ushort *)((int)puVar12 + uVar2 + 2);
        if ((uVar3 & 0x100) == 0) {
LAB_009b9d09:
          uVar4 = uVar2;
          if ((uVar9 & 2) != 0) {
            uVar9 = (uint)(ushort)((short)uVar9 + 2);
            uVar4 = uVar2 - 2;
            if (uVar4 == 0 || (short)uVar2 < 2) goto LAB_009ba89f;
          }
          sVar7 = (short)(uVar9 - _DAT_009a2024);
          if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
            uVar4 = uVar4 + sVar7;
            if (((short)uVar4 < 0) || (uVar4 == 0)) goto LAB_009ba89f;
            sVar7 = 0;
          }
          sVar8 = (sVar7 + uVar4) - DAT_009a2028;
          uVar2 = uVar4;
          if (((sVar8 == 0 || (short)(sVar7 + uVar4) < DAT_009a2028) ||
              (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= (short)uVar4)) &&
             (uVar2 = (ushort)(uVar2 + 3) >> 2, uVar2 != 0)) {
            LOCK();
            UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b9d6f. Too many branches */
                    /* WARNING: Treating indirect jump as call */
            DAT_009a200c = puVar12;
            uVar1 = (*(code *)(&PTR_DAT_009b9d78)[uVar2])();
            return uVar1;
          }
        }
        else {
          uVar9 = (uint)(ushort)(bVar5 + 1);
          uVar2 = uVar2 - 1;
          if (uVar2 != 0) goto LAB_009b9d09;
        }
LAB_009ba89f:
        if ((uVar3 & 0x80) != 0) {
          _DAT_009a202c = _DAT_009a202c + -1;
          if (_DAT_009a202c == 0) {
            return uVar1;
          }
          do {
            uVar3 = *puVar12;
            DAT_009aa032 = (byte)uVar3;
            puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          _DAT_009a202c = sVar6 + -2;
          if (_DAT_009a202c == 0) {
            return uVar1;
          }
          do {
            uVar3 = *puVar12;
            DAT_009aa032 = (byte)uVar3;
            puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          _DAT_009a202c = sVar6 + -3;
          if (_DAT_009a202c == 0) {
            return uVar1;
          }
          do {
            uVar3 = *puVar12;
            DAT_009aa032 = (byte)uVar3;
            puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          _DAT_009a202c = sVar6 + -4;
          if (_DAT_009a202c == 0) {
            return uVar1;
          }
        }
      } while( true );
    }
    uVar1 = 0;
    puVar12 = (ushort *)
              (CONCAT22(uVar13,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
    do {
      sVar6 = _DAT_009a202c;
      uVar3 = *puVar12;
      DAT_009aa032 = (byte)uVar3;
      bVar5 = (byte)((uVar3 & 0xffffff7f) >> 8);
      uVar2 = (ushort)(byte)(uVar3 & 0xffffff7f);
      uVar9 = (uint)bVar5;
      puVar12 = (ushort *)((int)puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
LAB_009b8c41:
        uVar4 = uVar2;
        if ((uVar9 & 2) != 0) {
          uVar9 = (uint)(ushort)((short)uVar9 + 2);
          uVar4 = uVar2 - 2;
          if (uVar4 == 0 || (short)uVar2 < 2) goto LAB_009b9458;
        }
        sVar7 = (short)(uVar9 - _DAT_009a2024);
        if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
          uVar4 = uVar4 + sVar7;
          if (((short)uVar4 < 0) || (uVar4 == 0)) goto LAB_009b9458;
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar4) - DAT_009a2028;
        uVar2 = uVar4;
        if (((sVar8 == 0 || (short)(sVar7 + uVar4) < DAT_009a2028) ||
            (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= (short)uVar4)) &&
           (uVar2 = (ushort)(uVar2 + 3) >> 2, uVar2 != 0)) {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b8ca7. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar12;
          uVar1 = (*(code *)(&PTR_DAT_009b8cb0)[uVar2])();
          return uVar1;
        }
      }
      else {
        uVar9 = (uint)(ushort)(bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b8c41;
      }
LAB_009b9458:
      if ((uVar3 & 0x80) != 0) {
        _DAT_009a202c = _DAT_009a202c + -1;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -2;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -3;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -4;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
      }
    } while( true );
  }
  if ((DAT_009a2000 & 0x40000000) != 0) {
    uVar1 = 0;
    puVar12 = (ushort *)
              (CONCAT22(uVar13,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
    do {
      sVar6 = _DAT_009a202c;
      uVar3 = *puVar12;
      DAT_009aa032 = (byte)uVar3;
      bVar5 = (byte)((uVar3 & 0xffffff7f) >> 8);
      uVar2 = (ushort)(byte)(uVar3 & 0xffffff7f);
      uVar9 = (uint)bVar5;
      puVar12 = (ushort *)((int)puVar12 + uVar2 + 2);
      if ((uVar3 & 0x100) == 0) {
LAB_009b9535:
        uVar4 = uVar2;
        if ((uVar9 & 2) != 0) {
          uVar9 = (uint)(ushort)((short)uVar9 + 2);
          uVar4 = uVar2 - 2;
          if (uVar4 == 0 || (short)uVar2 < 2) goto LAB_009b9c2c;
        }
        sVar7 = (short)(uVar9 - _DAT_009a2024);
        if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
          uVar4 = uVar4 + sVar7;
          if (((short)uVar4 < 0) || (uVar4 == 0)) goto LAB_009b9c2c;
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar4) - DAT_009a2028;
        uVar2 = uVar4;
        if (((sVar8 == 0 || (short)(sVar7 + uVar4) < DAT_009a2028) ||
            (uVar2 = uVar4 - sVar8, uVar2 != 0 && sVar8 <= (short)uVar4)) &&
           (uVar2 = (ushort)(uVar2 + 3) >> 2, uVar2 != 0)) {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b959b. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar12;
          uVar1 = (*(code *)(&PTR_DAT_009b95a4)[uVar2])();
          return uVar1;
        }
      }
      else {
        uVar9 = (uint)(ushort)(bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b9535;
      }
LAB_009b9c2c:
      if ((uVar3 & 0x80) != 0) {
        _DAT_009a202c = _DAT_009a202c + -1;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -2;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -3;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -4;
        if (_DAT_009a202c == 0) {
          return uVar1;
        }
      }
    } while( true );
  }
  puVar12 = (ushort *)(CONCAT22(uVar13,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
  do {
    uVar3 = *puVar12;
    DAT_009aa032 = (byte)uVar3;
    puVar14 = puVar12 + 1;
    bVar5 = (byte)((uVar3 & 0xffffff7f) >> 8);
    uVar2 = (ushort)(byte)(uVar3 & 0xffffff7f);
    uVar9 = (uint)bVar5;
    puVar11 = (ushort *)((int)puVar14 + (uint)uVar2);
    if ((uVar3 & 0x100) == 0) {
LAB_009b8afc:
      uVar3 = uVar2;
      if ((uVar9 & 2) != 0) {
        uVar9 = (uint)(ushort)((short)uVar9 + 2);
        puVar14 = puVar14 + 1;
        uVar3 = uVar2 - 2;
        if (uVar3 == 0 || (short)uVar2 < 2) goto LAB_009b8b54;
      }
      uVar10 = uVar9 - _DAT_009a2024;
      sVar6 = (short)uVar10;
      if (uVar10 == 0 || (int)uVar9 < _DAT_009a2024) {
        puVar14 = (ushort *)((int)puVar14 - uVar10);
        uVar3 = uVar3 + sVar6;
        if (((short)uVar3 < 0) || (uVar3 == 0)) goto LAB_009b8b54;
        sVar6 = 0;
        puVar15 = unaff_EDI;
      }
      else {
        puVar15 = unaff_EDI + (uVar10 >> 2);
      }
      sVar7 = (sVar6 + uVar3) - DAT_009a2028;
      uVar2 = uVar3;
      if ((sVar7 == 0 || (short)(sVar6 + uVar3) < DAT_009a2028) ||
         (uVar2 = uVar3 - sVar7, uVar2 != 0 && sVar7 <= (short)uVar3)) {
        for (uVar3 = (ushort)(uVar2 + 3) >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
          in_AL = (undefined1)*puVar14;
          *puVar15 = in_AL;
          puVar14 = puVar14 + 2;
          puVar15 = puVar15 + 1;
        }
      }
    }
    else {
      uVar9 = (uint)(ushort)(bVar5 + 1);
      puVar14 = (ushort *)((int)puVar12 + 3);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) goto LAB_009b8afc;
    }
LAB_009b8b54:
    sVar6 = _DAT_009a202c;
    puVar12 = puVar11;
    if ((DAT_009aa032 & 0x80) != 0) {
      unaff_EDI = unaff_EDI + DAT_009a2030;
      _DAT_009a202c = _DAT_009a202c + -1;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
      do {
        uVar3 = *puVar12;
        DAT_009aa032 = (byte)uVar3;
        puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      _DAT_009a202c = sVar6 + -2;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
      do {
        uVar3 = *puVar12;
        DAT_009aa032 = (byte)uVar3;
        puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      _DAT_009a202c = sVar6 + -3;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
      do {
        uVar3 = *puVar12;
        DAT_009aa032 = (byte)uVar3;
        puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      _DAT_009a202c = sVar6 + -4;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
    }
  } while( true );
}


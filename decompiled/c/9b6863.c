
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 FUN_009b6863(void)

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
LAB_009b7923:
          sVar7 = (short)(uVar9 - _DAT_009a2024);
          if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
            uVar2 = uVar2 + sVar7;
            if (((short)uVar2 < 0) || (uVar2 == 0)) goto LAB_009b843f;
            sVar7 = 0;
          }
          sVar8 = (sVar7 + uVar2) - DAT_009a2028;
          uVar4 = uVar2;
          if (((sVar8 == 0 || (short)(sVar7 + uVar2) < DAT_009a2028) ||
              (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= (short)uVar2)) &&
             (uVar2 = (ushort)(uVar4 + 1) >> 1, uVar2 != 0)) {
            LOCK();
            UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b7971. Too many branches */
                    /* WARNING: Treating indirect jump as call */
            DAT_009a200c = puVar12;
            uVar1 = (*(code *)(&PTR_DAT_009b7978)[uVar2])();
            return uVar1;
          }
        }
        else {
          uVar9 = (uint)(ushort)(bVar5 + 1);
          uVar2 = uVar2 - 1;
          if (uVar2 != 0) goto LAB_009b7923;
        }
LAB_009b843f:
        if ((uVar3 & 0x80) != 0) {
          _DAT_009a202c = _DAT_009a202c + -1;
          if (_DAT_009a202c == 0) {
            return 0;
          }
          do {
            uVar3 = *puVar12;
            DAT_009aa032 = (byte)uVar3;
            puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
          } while ((uVar3 & 0x80) == 0);
          _DAT_009a202c = sVar6 + -2;
          if (_DAT_009a202c == 0) {
            return 0;
          }
        }
      } while( true );
    }
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
LAB_009b6991:
        sVar7 = (short)(uVar9 - _DAT_009a2024);
        if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
          uVar2 = uVar2 + sVar7;
          if (((short)uVar2 < 0) || (uVar2 == 0)) goto LAB_009b7130;
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar2) - DAT_009a2028;
        uVar4 = uVar2;
        if (((sVar8 == 0 || (short)(sVar7 + uVar2) < DAT_009a2028) ||
            (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= (short)uVar2)) &&
           (uVar2 = (ushort)(uVar4 + 1) >> 1, uVar2 != 0)) {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b69df. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar12;
          uVar1 = (*(code *)(&PTR_DAT_009b69e8)[uVar2])();
          return uVar1;
        }
      }
      else {
        uVar9 = (uint)(ushort)(bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b6991;
      }
LAB_009b7130:
      if ((uVar3 & 0x80) != 0) {
        _DAT_009a202c = _DAT_009a202c + -1;
        if (_DAT_009a202c == 0) {
          return 0;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -2;
        if (_DAT_009a202c == 0) {
          return 0;
        }
      }
    } while( true );
  }
  if ((DAT_009a2000 & 0x40000000) != 0) {
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
LAB_009b71bb:
        sVar7 = (short)(uVar9 - _DAT_009a2024);
        if (uVar9 - _DAT_009a2024 == 0 || (int)uVar9 < _DAT_009a2024) {
          uVar2 = uVar2 + sVar7;
          if (((short)uVar2 < 0) || (uVar2 == 0)) goto LAB_009b7898;
          sVar7 = 0;
        }
        sVar8 = (sVar7 + uVar2) - DAT_009a2028;
        uVar4 = uVar2;
        if (((sVar8 == 0 || (short)(sVar7 + uVar2) < DAT_009a2028) ||
            (uVar4 = uVar2 - sVar8, uVar4 != 0 && sVar8 <= (short)uVar2)) &&
           (uVar2 = (ushort)(uVar4 + 1) >> 1, uVar2 != 0)) {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b7209. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar12;
          uVar1 = (*(code *)(&PTR_DAT_009b7210)[uVar2])();
          return uVar1;
        }
      }
      else {
        uVar9 = (uint)(ushort)(bVar5 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b71bb;
      }
LAB_009b7898:
      if ((uVar3 & 0x80) != 0) {
        _DAT_009a202c = _DAT_009a202c + -1;
        if (_DAT_009a202c == 0) {
          return 0;
        }
        do {
          uVar3 = *puVar12;
          DAT_009aa032 = (byte)uVar3;
          puVar12 = (ushort *)((int)puVar12 + (DAT_009aa032 & 0x7f) + 2);
        } while ((uVar3 & 0x80) == 0);
        _DAT_009a202c = sVar6 + -2;
        if (_DAT_009a202c == 0) {
          return 0;
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
LAB_009b68b6:
      uVar10 = uVar9 - _DAT_009a2024;
      sVar6 = (short)uVar10;
      if (uVar10 == 0 || (int)uVar9 < _DAT_009a2024) {
        puVar14 = (ushort *)((int)puVar14 - uVar10);
        uVar2 = uVar2 + sVar6;
        if (((short)uVar2 < 0) || (uVar2 == 0)) goto LAB_009b68fa;
        sVar6 = 0;
        puVar15 = unaff_EDI;
      }
      else {
        puVar15 = unaff_EDI + (uVar10 >> 1);
      }
      sVar7 = (sVar6 + uVar2) - DAT_009a2028;
      uVar3 = uVar2;
      if ((sVar7 == 0 || (short)(sVar6 + uVar2) < DAT_009a2028) ||
         (uVar3 = uVar2 - sVar7, uVar3 != 0 && sVar7 <= (short)uVar2)) {
        for (uVar3 = (ushort)(uVar3 + 1) >> 1; uVar3 != 0; uVar3 = uVar3 - 1) {
          in_AL = (undefined1)*puVar14;
          *puVar15 = in_AL;
          puVar14 = puVar14 + 1;
          puVar15 = puVar15 + 1;
        }
      }
    }
    else {
      uVar9 = (uint)(ushort)(bVar5 + 1);
      puVar14 = (ushort *)((int)puVar12 + 3);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) goto LAB_009b68b6;
    }
LAB_009b68fa:
    sVar6 = _DAT_009a202c;
    puVar12 = puVar11;
    if ((DAT_009aa032 & 0x80) != 0) {
      unaff_EDI = unaff_EDI + DAT_009a2030;
      _DAT_009a202c = _DAT_009a202c + -1;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
      do {
        uVar3 = *puVar11;
        DAT_009aa032 = (byte)uVar3;
        puVar11 = (ushort *)((int)puVar11 + (DAT_009aa032 & 0x7f) + 2);
      } while ((uVar3 & 0x80) == 0);
      _DAT_009a202c = sVar6 + -2;
      puVar12 = puVar11;
      if (_DAT_009a202c == 0) {
        return in_AL;
      }
    }
  } while( true );
}


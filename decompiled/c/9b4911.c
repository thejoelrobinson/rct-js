
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_009b4911(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  ushort uVar2;
  short sVar3;
  ushort uVar4;
  uint uVar6;
  short sVar7;
  short sVar8;
  int iVar9;
  undefined2 uVar11;
  ushort *puVar10;
  int unaff_ESI;
  ushort *puVar12;
  ushort *puVar13;
  ushort *unaff_EDI;
  ushort *puVar14;
  ushort *puVar15;
  uint uVar5;
  
  uVar11 = (undefined2)((uint)_DAT_009a2020 >> 0x10);
  if ((DAT_009a2000 & 0x20000000) != 0) {
    if ((DAT_009a2000 & 0x40000000) != 0) {
      puVar10 = (ushort *)
                (CONCAT22(uVar11,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
      do {
        uVar2 = *puVar10;
        DAT_009aa032 = (byte)uVar2;
        uVar6 = (uint)(ushort)(DAT_009aa032 & 0x7f);
        puVar10 = (ushort *)((int)puVar10 + uVar6 + 2);
        iVar9 = (uint)(uVar2 >> 8) - _DAT_009a2024;
        if (iVar9 == 0 || (int)(uint)(uVar2 >> 8) < _DAT_009a2024) {
          uVar4 = (ushort)(DAT_009aa032 & 0x7f) + (short)iVar9;
          uVar6 = (uint)uVar4;
          if ((-1 < (short)uVar4) && (uVar4 != 0)) {
            iVar9 = 0;
            goto LAB_009b583f;
          }
        }
        else {
LAB_009b583f:
          sVar3 = (short)uVar6;
          sVar7 = (short)iVar9 + sVar3;
          sVar8 = sVar7 - DAT_009a2028;
          if ((sVar8 == 0 || sVar7 < DAT_009a2028) ||
             (uVar6 = (uint)(ushort)(sVar3 - sVar8), (ushort)(sVar3 - sVar8) != 0 && sVar8 <= sVar3)
             ) {
            LOCK();
            UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b585a. Too many branches */
                    /* WARNING: Treating indirect jump as call */
            DAT_009a200c = puVar10;
            uVar1 = (*(code *)(&PTR_DAT_009b5864)[uVar6])();
            return uVar1;
          }
        }
        if (((uVar2 & 0x80) != 0) && (_DAT_009a202c = _DAT_009a202c + -1, _DAT_009a202c == 0)) {
          return 0;
        }
      } while( true );
    }
    puVar10 = (ushort *)
              (CONCAT22(uVar11,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
    do {
      uVar2 = *puVar10;
      DAT_009aa032 = (byte)uVar2;
      uVar6 = (uint)(ushort)(DAT_009aa032 & 0x7f);
      puVar10 = (ushort *)((int)puVar10 + uVar6 + 2);
      iVar9 = (uint)(uVar2 >> 8) - _DAT_009a2024;
      if (iVar9 == 0 || (int)(uint)(uVar2 >> 8) < _DAT_009a2024) {
        uVar4 = (ushort)(DAT_009aa032 & 0x7f) + (short)iVar9;
        uVar6 = (uint)uVar4;
        if ((-1 < (short)uVar4) && (uVar4 != 0)) {
          iVar9 = 0;
          goto LAB_009b4a07;
        }
      }
      else {
LAB_009b4a07:
        sVar3 = (short)uVar6;
        sVar7 = (short)iVar9 + sVar3;
        sVar8 = sVar7 - DAT_009a2028;
        if ((sVar8 == 0 || sVar7 < DAT_009a2028) ||
           (uVar6 = (uint)(ushort)(sVar3 - sVar8), (ushort)(sVar3 - sVar8) != 0 && sVar8 <= sVar3))
        {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b4a22. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar10;
          uVar1 = (*(code *)(&PTR_DAT_009b4a2c)[uVar6])();
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (_DAT_009a202c = _DAT_009a202c + -1, _DAT_009a202c == 0)) {
        return 0;
      }
    } while( true );
  }
  if ((DAT_009a2000 & 0x40000000) != 0) {
    puVar10 = (ushort *)
              (CONCAT22(uVar11,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
    do {
      uVar2 = *puVar10;
      DAT_009aa032 = (byte)uVar2;
      uVar6 = (uint)(ushort)(DAT_009aa032 & 0x7f);
      puVar10 = (ushort *)((int)puVar10 + uVar6 + 2);
      iVar9 = (uint)(uVar2 >> 8) - _DAT_009a2024;
      if (iVar9 == 0 || (int)(uint)(uVar2 >> 8) < _DAT_009a2024) {
        uVar4 = (ushort)(DAT_009aa032 & 0x7f) + (short)iVar9;
        uVar6 = (uint)uVar4;
        if ((-1 < (short)uVar4) && (uVar4 != 0)) {
          iVar9 = 0;
          goto LAB_009b5123;
        }
      }
      else {
LAB_009b5123:
        sVar3 = (short)uVar6;
        sVar7 = (short)iVar9 + sVar3;
        sVar8 = sVar7 - DAT_009a2028;
        if ((sVar8 == 0 || sVar7 < DAT_009a2028) ||
           (uVar6 = (uint)(ushort)(sVar3 - sVar8), (ushort)(sVar3 - sVar8) != 0 && sVar8 <= sVar3))
        {
          LOCK();
          UNLOCK();
                    /* WARNING: Could not recover jumptable at 0x009b513e. Too many branches */
                    /* WARNING: Treating indirect jump as call */
          DAT_009a200c = puVar10;
          uVar1 = (*(code *)(&PTR_DAT_009b5148)[uVar6])();
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (_DAT_009a202c = _DAT_009a202c + -1, _DAT_009a202c == 0)) {
        return 0;
      }
    } while( true );
  }
  puVar10 = (ushort *)(CONCAT22(uVar11,*(undefined2 *)(unaff_ESI + _DAT_009a2020 * 2)) + unaff_ESI);
  do {
    DAT_009aa032 = (byte)*puVar10;
    puVar12 = puVar10 + 1;
    uVar6 = (uint)(*puVar10 >> 8);
    uVar5 = (uint)(ushort)(DAT_009aa032 & 0x7f);
    puVar10 = (ushort *)((int)puVar12 + uVar5);
    iVar9 = uVar6 - _DAT_009a2024;
    if (iVar9 == 0 || (int)uVar6 < _DAT_009a2024) {
      puVar12 = (ushort *)((int)puVar12 - iVar9);
      uVar2 = (ushort)(DAT_009aa032 & 0x7f) + (short)iVar9;
      uVar5 = (uint)uVar2;
      if ((-1 < (short)uVar2) && (uVar2 != 0)) {
        iVar9 = 0;
        puVar14 = unaff_EDI;
        goto LAB_009b4972;
      }
    }
    else {
      puVar14 = (ushort *)((int)unaff_EDI + iVar9);
LAB_009b4972:
      sVar3 = (short)uVar5;
      sVar7 = (short)iVar9 + sVar3;
      sVar8 = sVar7 - DAT_009a2028;
      if ((sVar8 == 0 || sVar7 < DAT_009a2028) ||
         (uVar5 = (uint)(ushort)(sVar3 - sVar8), (ushort)(sVar3 - sVar8) != 0 && sVar8 <= sVar3)) {
        puVar13 = puVar12;
        puVar15 = puVar14;
        if ((uVar5 & 1) != 0) {
          puVar15 = (ushort *)((int)puVar14 + 1);
          puVar13 = (ushort *)((int)puVar12 + 1);
          *(char *)puVar14 = (char)*puVar12;
        }
        uVar6 = uVar5 >> 2;
        if ((uVar5 >> 1 & 1) != 0) {
          *puVar15 = *puVar13;
          puVar13 = puVar13 + 1;
          puVar15 = puVar15 + 1;
        }
        for (; uVar6 != 0; uVar6 = uVar6 - 1) {
          *(undefined4 *)puVar15 = *(undefined4 *)puVar13;
          puVar13 = puVar13 + 2;
          puVar15 = puVar15 + 2;
        }
      }
    }
    if ((DAT_009aa032 & 0x80) != 0) {
      unaff_EDI = (ushort *)((int)unaff_EDI + (uint)DAT_009a2030);
      _DAT_009a202c = _DAT_009a202c + -1;
      if (_DAT_009a202c == 0) {
        return in_EAX;
      }
    }
  } while( true );
}


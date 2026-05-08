
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e13d2(void)

{
  ushort *puVar1;
  int iVar2;
  short sVar3;
  short sVar4;
  short sVar5;
  short sVar6;
  short sVar7;
  short in_AX;
  short sVar8;
  short sVar9;
  short in_DX;
  short unaff_BX;
  short unaff_BP;
  undefined4 *unaff_ESI;
  undefined4 *puVar10;
  undefined4 *puVar11;
  
  puVar10 = unaff_ESI;
  while (puVar11 = puVar10, sVar7 = DAT_0099fb98, sVar6 = DAT_0099fb96, sVar5 = DAT_0099fb94,
        sVar4 = DAT_0099fb92, sVar3 = DAT_0099fb90, iVar2 = DAT_0099fb8c, puVar10 = puVar11 + 0x5e,
        puVar10 < DAT_009a1164) {
    if ((((*(short *)(puVar11 + 0x66) < in_DX) && (*(short *)((int)puVar11 + 0x19a) < unaff_BP)) &&
        (in_AX < (short)(*(short *)(puVar11 + 0x66) + *(short *)(puVar11 + 0x67)))) &&
       ((unaff_BX < (short)(*(short *)((int)puVar11 + 0x19a) + *(short *)((int)puVar11 + 0x19e)) &&
        ((*(ushort *)((int)puVar11 + 0x1aa) & 0x10) == 0)))) {
      if (in_AX < *(short *)(puVar11 + 0x66)) {
        FUN_005e13d2();
        in_AX = *(short *)(puVar11 + 0x66);
        puVar10 = unaff_ESI;
      }
      else if ((short)(*(short *)(puVar11 + 0x66) + *(short *)(puVar11 + 0x67)) < in_DX) {
        FUN_005e13d2();
        in_AX = *(short *)(puVar11 + 0x66) + *(short *)(puVar11 + 0x67);
        puVar10 = unaff_ESI;
      }
      else if (unaff_BX < *(short *)((int)puVar11 + 0x19a)) {
        FUN_005e13d2();
        unaff_BX = *(short *)((int)puVar11 + 0x19a);
        puVar10 = unaff_ESI;
      }
      else {
        if (unaff_BP <= (short)(*(short *)((int)puVar11 + 0x19a) + *(short *)((int)puVar11 + 0x19e))
           ) {
          return;
        }
        FUN_005e13d2();
        unaff_BX = *(short *)((int)puVar11 + 0x19a) + *(short *)((int)puVar11 + 0x19e);
        puVar10 = unaff_ESI;
      }
    }
  }
  sVar9 = *(short *)(unaff_ESI + 8);
  if (in_AX < sVar9) {
    in_AX = sVar9;
  }
  if ((short)(sVar9 + *(short *)(unaff_ESI + 9)) < in_DX) {
    in_DX = sVar9 + *(short *)(unaff_ESI + 9);
  }
  sVar9 = *(short *)((int)unaff_ESI + 0x22);
  if (unaff_BX < sVar9) {
    unaff_BX = sVar9;
  }
  sVar9 = sVar9 + *(short *)((int)unaff_ESI + 0x26);
  if (sVar9 < unaff_BP) {
    unaff_BP = sVar9;
  }
  if ((in_DX <= in_AX) || (unaff_BP <= unaff_BX)) {
    return;
  }
  do {
    sVar9 = in_AX - sVar3;
    DAT_0099fb8c = iVar2;
    DAT_0099fb90 = sVar3;
    DAT_0099fb94 = sVar5;
    DAT_0099fb98 = sVar7;
    if (sVar9 == 0 || in_AX < sVar3) {
LAB_005e1566:
      sVar9 = DAT_0099fb94;
      sVar8 = (DAT_0099fb90 + DAT_0099fb94) - in_DX;
      if (sVar8 != 0 && in_DX <= (short)(DAT_0099fb90 + DAT_0099fb94)) {
        DAT_0099fb94 = DAT_0099fb94 - sVar8;
        if (DAT_0099fb94 == 0 || sVar9 < sVar8) goto LAB_005e1637;
        DAT_0099fb98 = DAT_0099fb98 + sVar8;
      }
      sVar9 = unaff_BX - sVar4;
      DAT_0099fb92 = sVar4;
      DAT_0099fb96 = sVar6;
      if (sVar9 != 0 && sVar4 <= unaff_BX) {
        DAT_0099fb92 = sVar4 + sVar9;
        DAT_0099fb96 = sVar6 - sVar9;
        if (DAT_0099fb96 == 0 || sVar6 < sVar9) goto LAB_005e1637;
        DAT_0099fb8c = DAT_0099fb8c + (uint)(ushort)(DAT_0099fb94 + DAT_0099fb98) * (int)sVar9;
      }
      sVar9 = DAT_0099fb96;
      sVar8 = (DAT_0099fb92 + DAT_0099fb96) - unaff_BP;
      if ((sVar8 == 0 || (short)(DAT_0099fb92 + DAT_0099fb96) < unaff_BP) ||
         (DAT_0099fb96 = DAT_0099fb96 - sVar8, DAT_0099fb96 != 0 && sVar8 <= sVar9)) {
        _DAT_009a0129 =
             *(undefined2 *)
              (s___________________________________009a1517 +
              (*(byte *)(unaff_ESI[7] + 1) & 0x7f) * 2);
        (*(code *)*unaff_ESI)();
        (*(code *)*unaff_ESI)();
      }
    }
    else {
      DAT_0099fb90 = sVar3 + sVar9;
      DAT_0099fb94 = sVar5 - sVar9;
      if (DAT_0099fb94 != 0 && sVar9 <= sVar5) {
        DAT_0099fb98 = sVar7 + sVar9;
        DAT_0099fb8c = iVar2 + sVar9;
        goto LAB_005e1566;
      }
    }
LAB_005e1637:
    do {
      puVar10 = unaff_ESI + 0x5e;
      if (DAT_009a1164 <= puVar10) {
        DAT_0099fb8c = iVar2;
        DAT_0099fb90 = sVar3;
        DAT_0099fb92 = sVar4;
        DAT_0099fb94 = sVar5;
        DAT_0099fb96 = sVar6;
        DAT_0099fb98 = sVar7;
        return;
      }
      puVar1 = (ushort *)((int)unaff_ESI + 0x1aa);
      unaff_ESI = puVar10;
    } while ((*puVar1 & 0x10) == 0);
  } while( true );
}


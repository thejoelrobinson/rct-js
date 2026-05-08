
void FUN_005e117d(void)

{
  uint uVar1;
  ushort in_AX;
  ushort uVar2;
  short sVar3;
  short in_DX;
  short sVar4;
  ushort unaff_BX;
  ushort uVar5;
  undefined1 *puVar6;
  short unaff_BP;
  short sVar7;
  short sVar8;
  
  if ((short)in_AX < 0) {
    in_AX = 0;
  }
  if ((short)unaff_BX < 0) {
    unaff_BX = 0;
  }
  if (DAT_00971ed6 < in_DX) {
    in_DX = DAT_00971ed6;
  }
  if (DAT_00971ed8 < unaff_BP) {
    unaff_BP = DAT_00971ed8;
  }
  if (((short)in_AX < in_DX) && ((short)unaff_BX < unaff_BP)) {
    uVar2 = in_AX >> (DAT_00971eee & 0x1f);
    uVar5 = unaff_BX >> (DAT_00971eef & 0x1f);
    sVar7 = (((ushort)(unaff_BP - 1U) >> (DAT_00971eef & 0x1f)) - uVar5) + 1;
    sVar3 = (short)DAT_00971ee6;
    puVar6 = &DAT_0099ad63 + (ushort)(uVar5 * sVar3 + uVar2);
    sVar4 = (((ushort)(in_DX - 1U) >> (DAT_00971eee & 0x1f)) - uVar2) + 1;
    uVar1 = (uint)DAT_00971ee6 >> 0x10;
    sVar8 = sVar4;
    do {
      do {
        *puVar6 = 0xff;
        puVar6 = puVar6 + 1;
        sVar8 = sVar8 + -1;
      } while (sVar8 != 0);
      puVar6 = puVar6 + CONCAT22((short)uVar1,sVar3 - sVar4);
      sVar7 = sVar7 + -1;
      sVar8 = sVar4;
    } while (sVar7 != 0);
  }
  return;
}


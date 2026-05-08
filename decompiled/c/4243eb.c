
undefined8 FUN_004243eb(void)

{
  undefined4 in_EAX;
  short sVar1;
  ushort uVar2;
  short sVar3;
  ushort uVar4;
  uint in_EDX;
  uint extraout_EDX;
  uint uVar5;
  uint unaff_EBX;
  uint uVar6;
  undefined4 unaff_EBP;
  uint uVar7;
  undefined4 unaff_ESI;
  int iVar8;
  undefined *puVar9;
  int unaff_EDI;
  
  if ((DAT_00991f8c & 8) == 0) {
    if ((DAT_00991f2b & 1) == 0) {
LAB_004247d8:
      return CONCAT44(in_EDX,in_EAX);
    }
    DAT_005f4728 = 0xffff;
    uVar4 = (ushort)in_EDX;
    uVar5 = in_EDX;
    uVar6 = unaff_EBX;
    if (uVar4 < *(ushort *)(&DAT_00991f04 + unaff_EBX * 4)) {
      DAT_005f4728 = uVar4;
      uVar2 = uVar4 - *(short *)(&DAT_005f438a + unaff_EDI * 2);
      if ((short)uVar2 < 0) goto LAB_004247d8;
      iVar8 = DAT_00991f88 * 2;
      puVar9 = &DAT_005f419a + iVar8;
      uVar7 = (uint)(byte)puVar9[unaff_EBX * 8];
      if (uVar2 <= *(ushort *)(&DAT_00991f04 + uVar7 * 4)) {
        puVar9 = (undefined *)(iVar8 + 0x5f41e2);
        uVar7 = (uint)(byte)puVar9[unaff_EBX * 8];
        if (uVar2 <= *(ushort *)(&DAT_00991f04 + uVar7 * 4)) {
          puVar9 = (undefined *)(iVar8 + 0x5f422a);
          uVar7 = (uint)(byte)puVar9[unaff_EBX * 8];
          if (uVar2 <= *(ushort *)(&DAT_00991f04 + uVar7 * 4)) {
            puVar9 = (undefined *)(iVar8 + 0x5f4272);
            uVar7 = (uint)(byte)puVar9[unaff_EBX * 8];
            if (uVar2 <= *(ushort *)(&DAT_00991f04 + uVar7 * 4)) goto LAB_004247e0;
          }
        }
      }
      if (3 < (byte)puVar9[unaff_EBX * 8 + 1]) {
LAB_004247e0:
        return CONCAT44(in_EDX,in_EAX);
      }
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      unaff_EBX = uVar7;
      in_EDX = extraout_EDX;
    }
    if (((((&DAT_00991f06)[unaff_EBX * 4] & 0x20) == 0) &&
        (5 < (short)((short)in_EDX - *(short *)(&DAT_00991f04 + unaff_EBX * 4)))) &&
       (*(short *)(&DAT_005f43a0 + unaff_EDI * 4) != 0)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(unaff_EBP,unaff_EDI);
      sVar3 = *(short *)(&DAT_00991f04 + unaff_EBX * 4) + 6;
      uVar7 = in_EDX;
    }
    else {
      sVar3 = *(short *)(&DAT_00991f04 + unaff_EBX * 4);
      uVar7 = in_EDX;
    }
    in_EDX = uVar5;
    uVar5 = uVar7 & 0xffff;
    uVar4 = sVar3 + 0x10U & 0xfff0;
    if ((ushort)uVar7 < uVar4) {
      uVar4 = (ushort)uVar7;
    }
    sVar1 = uVar4 - sVar3;
    if (sVar1 != 0 && sVar3 <= (short)uVar4) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(unaff_EBP,uVar5,unaff_EDI);
    }
    uVar4 = sVar3 + sVar1;
    while( true ) {
      uVar2 = uVar4 + 0x10;
      if ((ushort)uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = (ushort)uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) break;
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(unaff_EBP,uVar5,unaff_EDI);
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if ((ushort)uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = (ushort)uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) break;
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if ((ushort)uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = (ushort)uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) break;
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar4 = uVar4 + sVar3;
      uVar2 = uVar4 + 0x10;
      if ((ushort)uVar5 < (ushort)(uVar4 + 0x10)) {
        uVar2 = (ushort)uVar5;
      }
      sVar3 = uVar2 - uVar4;
      if (uVar2 < uVar4 || sVar3 == 0) break;
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar4 = uVar4 + sVar3;
    }
    *(ushort *)(&DAT_00991f04 + unaff_EBX * 4) = DAT_005f4728;
    (&DAT_00991f06)[unaff_EBX * 4] = 0x20;
    if ((short)in_EAX != 0) {
      DAT_0099a4ec = (short)in_EDX;
      uVar7 = (uint)(ushort)((short)in_EAX + DAT_0099a4ec);
      DAT_0099a4e8 = (ushort)(byte)(&DAT_005f4188)[uVar6 * 2];
      DAT_0099a4ea = (ushort)(byte)(&DAT_005f4189)[uVar6 * 2];
      uVar5 = in_EDX;
      while( true ) {
        uVar2 = (ushort)uVar5;
        uVar4 = uVar2 + 0x10;
        if ((ushort)uVar7 < (ushort)(uVar2 + 0x10)) {
          uVar4 = (ushort)uVar7;
        }
        sVar3 = uVar4 - uVar2;
        if (uVar4 < uVar2 || sVar3 == 0) break;
        in_EAX = (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])
                           (unaff_EBP,uVar7,unaff_EDI,uVar5,sVar3,uVar6,unaff_ESI);
        uVar5 = (uint)(ushort)(uVar2 + sVar3);
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}


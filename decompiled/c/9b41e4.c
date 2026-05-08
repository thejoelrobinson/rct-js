
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_009b41e4(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  byte bVar4;
  ushort uVar2;
  ushort uVar3;
  short sVar5;
  short sVar6;
  uint uVar7;
  ushort *puVar8;
  int unaff_ESI;
  
  if ((DAT_009a2000 & 0x20000000) != 0) {
    puVar8 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
    do {
      uVar1 = *puVar8;
      DAT_009aa032 = (char)uVar1;
      bVar4 = (byte)((uVar1 & 0xffffff7f) >> 8);
      uVar2 = (ushort)(byte)(uVar1 & 0xffffff7f);
      uVar7 = (uint)bVar4;
      puVar8 = (ushort *)((int)puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
LAB_009b42b6:
        uVar3 = uVar2;
        if ((uVar7 & 2) != 0) {
          uVar7 = (uint)(ushort)((short)uVar7 + 2);
          uVar3 = uVar2 - 2;
          if (uVar3 == 0 || (short)uVar2 < 2) goto LAB_009b42fe;
        }
        sVar5 = (short)(uVar7 - _DAT_009a2024);
        if (uVar7 - _DAT_009a2024 == 0 || (int)uVar7 < _DAT_009a2024) {
          uVar3 = uVar3 + sVar5;
          if (((short)uVar3 < 0) || (uVar3 == 0)) goto LAB_009b42fe;
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar3 + -1;
        uVar2 = uVar3;
        if (((sVar6 == 0 || (short)(sVar5 + uVar3) < 1) ||
            (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= (short)uVar3)) &&
           ((ushort)(uVar2 + 3) >> 2 != 0)) {
          DAT_0099c164 = 1;
          return 0;
        }
      }
      else {
        uVar7 = (uint)(ushort)(bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b42b6;
      }
LAB_009b42fe:
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while( true );
  }
  if ((DAT_009a2000 & 0x40000000) != 0) {
    puVar8 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
    do {
      uVar1 = *puVar8;
      DAT_009aa032 = (char)uVar1;
      bVar4 = (byte)((uVar1 & 0xffffff7f) >> 8);
      uVar2 = (ushort)(byte)(uVar1 & 0xffffff7f);
      uVar7 = (uint)bVar4;
      puVar8 = (ushort *)((int)puVar8 + uVar2 + 2);
      if ((uVar1 & 0x100) == 0) {
LAB_009b4339:
        uVar3 = uVar2;
        if ((uVar7 & 2) != 0) {
          uVar7 = (uint)(ushort)((short)uVar7 + 2);
          uVar3 = uVar2 - 2;
          if (uVar3 == 0 || (short)uVar2 < 2) goto LAB_009b4381;
        }
        sVar5 = (short)(uVar7 - _DAT_009a2024);
        if (uVar7 - _DAT_009a2024 == 0 || (int)uVar7 < _DAT_009a2024) {
          uVar3 = uVar3 + sVar5;
          if (((short)uVar3 < 0) || (uVar3 == 0)) goto LAB_009b4381;
          sVar5 = 0;
        }
        sVar6 = sVar5 + uVar3 + -1;
        uVar2 = uVar3;
        if (((sVar6 == 0 || (short)(sVar5 + uVar3) < 1) ||
            (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= (short)uVar3)) &&
           ((ushort)(uVar2 + 3) >> 2 != 0)) {
          DAT_0099c164 = 1;
          return 0;
        }
      }
      else {
        uVar7 = (uint)(ushort)(bVar4 + 1);
        uVar2 = uVar2 - 1;
        if (uVar2 != 0) goto LAB_009b4339;
      }
LAB_009b4381:
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while( true );
  }
  puVar8 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
  do {
    uVar1 = *puVar8;
    DAT_009aa032 = (char)uVar1;
    bVar4 = (byte)((uVar1 & 0xffffff7f) >> 8);
    uVar2 = (ushort)(byte)(uVar1 & 0xffffff7f);
    uVar7 = (uint)bVar4;
    puVar8 = (ushort *)((int)puVar8 + uVar2 + 2);
    if ((uVar1 & 0x100) == 0) {
LAB_009b4233:
      uVar3 = uVar2;
      if ((uVar7 & 2) != 0) {
        uVar7 = (uint)(ushort)((short)uVar7 + 2);
        uVar3 = uVar2 - 2;
        if (uVar3 == 0 || (short)uVar2 < 2) goto LAB_009b427b;
      }
      sVar5 = (short)(uVar7 - _DAT_009a2024);
      if (uVar7 - _DAT_009a2024 == 0 || (int)uVar7 < _DAT_009a2024) {
        uVar3 = uVar3 + sVar5;
        if (((short)uVar3 < 0) || (uVar3 == 0)) goto LAB_009b427b;
        sVar5 = 0;
      }
      sVar6 = sVar5 + uVar3 + -1;
      uVar2 = uVar3;
      if (((sVar6 == 0 || (short)(sVar5 + uVar3) < 1) ||
          (uVar2 = uVar3 - sVar6, uVar2 != 0 && sVar6 <= (short)uVar3)) &&
         ((ushort)(uVar2 + 3) >> 2 != 0)) {
        DAT_0099c164 = 1;
        return in_EAX;
      }
    }
    else {
      uVar7 = (uint)(ushort)(bVar4 + 1);
      uVar2 = uVar2 - 1;
      if (uVar2 != 0) goto LAB_009b4233;
    }
LAB_009b427b:
    if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while( true );
}

